import 'dotenv/config';
import seed from './backend/seed.json';
import { currentStore as storeProxy, saveStore, storeMiddleware, putAsset, assetNames } from './backend/persistence.mjs';
import { hashPassword, passwordMatches } from './backend/passwords.mjs';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { initialItems, initialAiConfig } from './src/data/initialData';
import { ALL_36_INFOGRAPHICS } from './src/data/infographicsData';
import { generateInfographicSvg } from './src/data/infographicSvgTemplates';
import { STANDARD_MINDMAPS } from './src/data/mindmapsData';
import { generateMindMapSvg } from './src/data/mindmapSvgTemplates';
import { LearningItem, AiAssistantConfig, WebUser } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = process.env.VERCEL ? process.cwd() : path.dirname(__filename);

interface VisitorStatsStore {
  totalVisits: number;
  uniqueVisitorIds: string[];
  dailyVisits: Record<string, number>;
  pageViews: Record<string, number>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  recentVisitors: {
    id: string;
    timestamp: string;
    page: string;
    device: string;
    browser: string;
    userName?: string;
    isRegistered?: boolean;
  }[];
  lastUpdated: string;
}

interface ServerStore {
  items: LearningItem[];
  aiConfig: AiAssistantConfig;
  adminUsername: string;
  passwordHash: string;
  users: WebUser[];
  visitorStats?: VisitorStatsStore;
}

const currentStore = storeProxy as ServerStore & {sessions: Record<string,number>; assets: Record<string,string>};

function getInitialVisitorStats(): VisitorStatsStore {
  return { totalVisits: 0, uniqueVisitorIds: [], dailyVisits: {}, pageViews: {},
    deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 }, recentVisitors: [], lastUpdated: new Date().toISOString() };
}
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'TeamAIgenz';
function initialStore() {
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (!password || password.length < 12 || password.length > 256) throw new Error('Cần ADMIN_INITIAL_PASSWORD tối thiểu 12 ký tự để khởi tạo.');
  return { items: structuredClone(seed.items), aiConfig: structuredClone(seed.aiConfig),
    adminUsername: DEFAULT_ADMIN_USERNAME, passwordHash: hashPassword(password), users: [],
    visitorStats: getInitialVisitorStats(), sessions: {}, assets: {} };
}
function createSessionToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const key = crypto.createHash('sha256').update(token).digest('hex');
  currentStore.sessions ||= {};
  for (const [k, expiry] of Object.entries(currentStore.sessions)) {
    if (Number(expiry) < Date.now()) delete currentStore.sessions[k];
  }
  currentStore.sessions[key] = Date.now() + 24 * 60 * 60 * 1000;
  saveStore();
  return token;
}
function verifySession(token?: string): boolean {
  if (!token || token.length > 128) return false;
  const key = crypto.createHash('sha256').update(token).digest('hex');
  return Number(currentStore.sessions?.[key] || 0) > Date.now();
}

// Middleware to authenticate admin requests
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (verifySession(token)) {
    next();
  } else {
    res.status(401).json({ error: 'Yêu cầu đăng nhập quản trị viên để thực hiện thao tác này.' });
  }
}

export function createApp() {
  const app = express();


  // JSON Body Parser with 50MB limit for HTML games & high-res images
  app.use(express.json({ limit: '4mb' }));
  app.use(express.urlencoded({ extended: true, limit: '4mb' }));

  app.get('/api/health', (_req, res) => res.json({ok:true, service:'toan10-api'}));
  const useStore = storeMiddleware(initialStore);
  app.use(['/api', '/sandbox', '/mindmaps', '/infographics'], useStore);
  app.get('/api/readiness', (_req, res) => res.json({ok:true, database:'connected'}));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
    next();
  });

  // Helper to ensure target directories exist
  const getInfographicsDirs = () => {
    const publicDir = path.resolve(__dirname, 'public/infographics');
    const distDir = path.resolve(__dirname, 'dist/infographics');


    return { publicDir, distDir };
  };

  const getMindmapsDirs = () => {
    const publicDir = path.resolve(__dirname, 'public/mindmaps');
    const distDir = path.resolve(__dirname, 'dist/mindmaps');


    return { publicDir, distDir };
  };

  // Dedicated Mind Map Image Provider: Serves PNG/JPG/WEBP/SVG files with zero-cache headers
  // MUST be placed BEFORE express.static to prevent browser from caching default SVGs or stale files!
  app.get('/mindmaps/:filename', (req: Request, res: Response) => {
    const uploadedUrl = currentStore.assets?.['mindmaps/' + path.basename(req.params.filename)];
    if (uploadedUrl) { res.redirect(302, uploadedUrl); return; }
    const rawFilename = path.basename(req.params.filename);
    const { publicDir: mindPublic, distDir: mindDist } = getMindmapsDirs();
    
    // Always tell browser not to cache uploaded images to prevent showing stale photos
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const baseName = rawFilename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
    const rasterExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const searchDirs = [mindPublic, mindDist].filter(d => fs.existsSync(d));

    // Candidate base names in order of strict specificity
    const candidateBases: string[] = [
      baseName
    ];
    if (baseName.startsWith('SoDoTuDuy_')) {
      candidateBases.push(baseName.replace(/^SoDoTuDuy_/i, ''));
    } else {
      candidateBases.push(`SoDoTuDuy_${baseName}`);
    }

    // 1. Direct exact file check in search directories
    for (const d of searchDirs) {
      const exactPath = path.join(d, rawFilename);
      if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
        const ext = path.extname(exactPath).toLowerCase();
        if (ext === '.html') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.sendFile(exactPath);
          return;
        }
        if (ext === '.png') res.setHeader('Content-Type', 'image/png');
        else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
        else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
        else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        res.sendFile(exactPath);
        return;
      }
    }

    // 2. High priority: Check based on whether caller requested HTML or Image
    const isExplicitHtml = rawFilename.toLowerCase().endsWith('.html');
    const isImageRequest = /\.(png|jpe?g|webp|svg)$/i.test(rawFilename);

    if (isExplicitHtml) {
      for (const d of searchDirs) {
        for (const b of candidateBases) {
          const htmlPath = path.join(d, b + '.html');
          if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.sendFile(htmlPath);
            return;
          }
        }
      }
    }

    // Check raster image on disk
    for (const d of searchDirs) {
      for (const b of candidateBases) {
        for (const ext of rasterExtensions) {
          const rasterPath = path.join(d, b + ext);
          if (fs.existsSync(rasterPath) && fs.statSync(rasterPath).isFile()) {
            if (ext === '.png') res.setHeader('Content-Type', 'image/png');
            else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
            else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
            res.sendFile(rasterPath);
            return;
          }
        }
      }
    }

    // Check SVG image on disk (renders directly in <img> tags or image viewers)
    for (const d of searchDirs) {
      for (const b of candidateBases) {
        const svgPath = path.join(d, b + '.svg');
        if (fs.existsSync(svgPath) && fs.statSync(svgPath).isFile()) {
          res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
          res.sendFile(svgPath);
          return;
        }
      }
    }

    // If NOT an image request, also check .html
    if (!isImageRequest) {
      for (const d of searchDirs) {
        for (const b of candidateBases) {
          const htmlPath = path.join(d, b + '.html');
          if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.sendFile(htmlPath);
            return;
          }
        }
      }
    }

    // 4. Match mindmap by filename and generate SVG dynamically as last fallback
    const matched = STANDARD_MINDMAPS.find(m =>
      m.filename.toLowerCase() === rawFilename.toLowerCase() ||
      m.filename.toLowerCase().replace(/\.(png|svg|jpg|jpeg|webp)$/i, '') === baseName.toLowerCase() ||
      m.id.toLowerCase() === baseName.toLowerCase() ||
      candidateBases.some(b => m.filename.toLowerCase().includes(b.toLowerCase()))
    );

    if (matched) {
      const svg = generateMindMapSvg(matched);
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.send(svg);
      return;
    }

    res.status(404).send('Không tìm thấy sơ đồ tư duy.');
  });

  // Dedicated Infographic Image Provider: Serves PNG/JPG/WEBP/SVG files with zero-cache headers
  app.get('/infographics/:filename', (req: Request, res: Response) => {
    const uploadedUrl = currentStore.assets?.['infographics/' + path.basename(req.params.filename)];
    if (uploadedUrl) { res.redirect(302, uploadedUrl); return; }
    const rawFilename = path.basename(req.params.filename);
    const { publicDir, distDir } = getInfographicsDirs();
    
    // Always tell browser not to cache uploaded images to prevent showing stale "ảnh khác"
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // List of candidates to search
    const baseName = rawFilename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
    const candidateExtensions = ['.html', '.png', '.jpg', '.jpeg', '.webp', '.svg'];
    const searchDirs = [publicDir, distDir].filter(d => fs.existsSync(d));
    
    // 1. Direct file check in public and dist
    for (const d of searchDirs) {
      const exactPath = path.join(d, rawFilename);
      if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) {
        const ext = path.extname(exactPath).toLowerCase();
        if (ext === '.html') res.setHeader('Content-Type', 'text/html; charset=utf-8');
        else if (ext === '.png') res.setHeader('Content-Type', 'image/png');
        else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
        else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
        else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        res.sendFile(exactPath);
        return;
      }
    }

    // 2. If the request specifically wants .html or has .html candidate
    const isHtmlRequest = rawFilename.toLowerCase().endsWith('.html') || (req.headers.accept && req.headers.accept.includes('text/html'));
    if (isHtmlRequest) {
      for (const d of searchDirs) {
        const htmlPath = path.join(d, baseName + '.html');
        if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.sendFile(htmlPath);
          return;
        }
      }
    }

    // 3. Check for image extensions for the same lesson (images only so img tags don't get html)
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
    for (const d of searchDirs) {
      for (const ext of imageExtensions) {
        const altPath = path.join(d, baseName + ext);
        if (fs.existsSync(altPath) && fs.statSync(altPath).isFile()) {
          if (ext === '.png') res.setHeader('Content-Type', 'image/png');
          else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
          else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
          else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
          res.sendFile(altPath);
          return;
        }
      }
    }

    // 4. Match lesson by filename and generate SVG dynamically as last fallback
    const matched = ALL_36_INFOGRAPHICS.find(l =>
      l.filename.toLowerCase() === rawFilename.toLowerCase() ||
      l.filename.toLowerCase().replace(/\.(png|svg|jpg|jpeg|webp|html)$/i, '') === baseName.toLowerCase()
    );

    if (matched) {
      const svg = generateInfographicSvg(matched);
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      res.send(svg);
      return;
    }

    res.status(404).send('Không tìm thấy bản đồ infographic.');
  });

  // Serve general static files from public directory AFTER dedicated handlers
  app.use(express.static(path.resolve(__dirname, 'public')));

  // --- INFOGRAPHIC FILE UPLOAD & STATUS ENDPOINTS ---
  app.get('/api/infographics/status', (_req: Request, res: Response) => {
    try {
      const { publicDir } = getInfographicsDirs();
      const diskFiles = [...(fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : []), ...assetNames('infographics')];
      const fileSet = new Set<string>();
      diskFiles.forEach(f => {
        fileSet.add(f.toLowerCase());
        fileSet.add(f.toLowerCase().replace(/\.(svg|jpg|jpeg|webp|html)$/i, '.png'));
        fileSet.add(f.toLowerCase().replace(/\.(png|jpg|jpeg|webp|html)$/i, '.svg'));
        fileSet.add(f.toLowerCase().replace(/\.(png|jpg|jpeg|webp|svg)$/i, '.html'));
      });
      ALL_36_INFOGRAPHICS.forEach(l => {
        fileSet.add(l.filename.toLowerCase());
        fileSet.add(l.filename.toLowerCase().replace(/\.png$/i, '.svg'));
      });
      res.json({ files: Array.from(fileSet), totalLessons: ALL_36_INFOGRAPHICS.length });
    } catch (err) {
      res.status(500).json({ error: 'Không thể đọc thư mục infographic' });
    }
  });

  app.post('/api/upload-infographic', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { filename, base64Data, lessonId } = req.body;
      if (!filename || !base64Data) {
        res.status(400).json({ error: 'Thiếu tên tệp hoặc dữ liệu hình ảnh.' });
        return;
      }
      const safeFilename = path.basename(filename);
      const { publicDir, distDir } = getInfographicsDirs();

      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      const buffer = matches && matches.length === 3
        ? Buffer.from(matches[2], 'base64')
        : Buffer.from(base64Data, 'base64');

      // Write to public/infographics
      const assetUrl = await putAsset('infographics', safeFilename, buffer);

      // Update store item if matched
      let updatedStore = false;
      const targetId = lessonId || (ALL_36_INFOGRAPHICS.find(l => l.filename.toLowerCase() === safeFilename.toLowerCase())?.id);
      if (targetId) {
        currentStore.items = currentStore.items.map(item => {
          if (item.id === targetId || item.url?.includes(safeFilename)) {
            updatedStore = true;
            return {
              ...item,
              url: assetUrl,
              thumbnailUrl: assetUrl,
              updatedAt: new Date().toISOString()
            };
          }
          return item;
        });
        if (updatedStore) {
          saveStore();
        }
      }

      res.json({
        success: true,
        filename: safeFilename,
        url: assetUrl
      });
    } catch (err) {
      console.error('Error uploading infographic:', err);
      res.status(500).json({ error: 'Lỗi khi lưu tệp hình ảnh infographic.' });
    }
  });

  app.post('/api/batch-upload-infographics', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { files } = req.body;
      if (!Array.isArray(files) || files.length === 0) {
        res.status(400).json({ error: 'Danh sách tệp không hợp lệ.' });
        return;
      }
      const { publicDir, distDir } = getInfographicsDirs();
      const uploaded: string[] = [];

      for (const file of files) {
        if (file.filename && file.base64Data) {
          const safeFilename = path.basename(file.filename);
          const matches = file.base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          const buffer = matches && matches.length === 3
            ? Buffer.from(matches[2], 'base64')
            : Buffer.from(file.base64Data, 'base64');

          const assetUrl = await putAsset('infographics', safeFilename, buffer);
          uploaded.push(safeFilename);

          // Update store item
          const targetId = file.lessonId || (ALL_36_INFOGRAPHICS.find(l => l.filename.toLowerCase() === safeFilename.toLowerCase())?.id);
          if (targetId) {
            currentStore.items = currentStore.items.map(item => {
              if (item.id === targetId || item.url?.includes(safeFilename)) {
                return {
                  ...item,
                  url: assetUrl,
                  thumbnailUrl: assetUrl,
                  updatedAt: new Date().toISOString()
                };
              }
              return item;
            });
          }
        }
      }
      saveStore();
      res.json({ success: true, uploadedCount: uploaded.length, files: uploaded });
    } catch (err) {
      console.error('Error batch uploading infographics:', err);
      res.status(500).json({ error: 'Lỗi khi tải lên hàng loạt infographic.' });
    }
  });

  // --- MINDMAP FILE UPLOAD & STATUS ENDPOINTS ---
  app.get('/api/mindmaps/status', (_req: Request, res: Response) => {
    try {
      const { publicDir, distDir } = getMindmapsDirs();
      const publicFiles = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];
      const distFiles = fs.existsSync(distDir) ? fs.readdirSync(distDir) : [];
      const allDiskFiles = Array.from(new Set([...publicFiles, ...distFiles, ...assetNames('mindmaps')]));

      // Only count raster images (.png, .jpg, .jpeg, .webp) as actual user-uploaded mindmaps!
      // SVG files are default/vector templates, so they should NOT mark a card as "Ảnh cô đã tải".
      const uploadedFileSet = new Set<string>();
      const uploadedChapterNumbers = new Set<number>();

      allDiskFiles.forEach(f => {
        if (/\.(png|jpe?g|webp|html|svg)$/i.test(f)) {
          const lower = f.toLowerCase();
          uploadedFileSet.add(lower);
          const base = lower.replace(/\.(png|jpe?g|webp|html|svg)$/i, '');
          uploadedFileSet.add(base);
          uploadedFileSet.add(base + '.png');
          uploadedFileSet.add(base + '.html');
          uploadedFileSet.add(base + '.svg');
          uploadedFileSet.add(base + '.jpg');

          if (base.startsWith('sodotuduy_')) {
            const stripped = base.replace(/^sodotuduy_/i, '');
            uploadedFileSet.add(stripped);
            uploadedFileSet.add(stripped + '.png');
            uploadedFileSet.add(stripped + '.html');
            uploadedFileSet.add(stripped + '.svg');
          } else {
            uploadedFileSet.add(`sodotuduy_${base}`);
            uploadedFileSet.add(`sodotuduy_${base}.png`);
            uploadedFileSet.add(`sodotuduy_${base}.html`);
            uploadedFileSet.add(`sodotuduy_${base}.svg`);
          }

          // Match standard mindmap to find chapter number
          const matched = STANDARD_MINDMAPS.find(m =>
            m.filename.toLowerCase().replace(/\.[^/.]+$/, '') === base ||
            m.filename.toLowerCase() === lower ||
            m.filename.toLowerCase().replace(/^sodotuduy_/i, '').replace(/\.[^/.]+$/, '') === base.replace(/^sodotuduy_/i, '')
          );
          if (matched) {
            uploadedChapterNumbers.add(matched.chapterNumber);
          }
        }
      });

      // Also check if currentStore has non-sample uploaded items with custom filenames
      currentStore.items.filter(i => i.type === 'mindmap' && !i.isSample).forEach(item => {
        if (item.url && !item.url.endsWith('.svg')) {
          const fn = path.basename(item.url.split('?')[0]).toLowerCase();
          if (allDiskFiles.some(d => d.toLowerCase() === fn && /\.(png|jpe?g|webp)$/i.test(d))) {
            uploadedFileSet.add(fn);
            if (item.displayOrder) uploadedChapterNumbers.add(item.displayOrder);
          }
        }
      });

      res.json({
        files: Array.from(uploadedFileSet),
        uploadedChapters: Array.from(uploadedChapterNumbers),
        totalUploaded: uploadedChapterNumbers.size,
        totalMindmaps: STANDARD_MINDMAPS.length
      });
    } catch (err) {
      res.status(500).json({ error: 'Không thể đọc thư mục sơ đồ tư duy' });
    }
  });

  app.post('/api/upload-mindmap', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { filename, base64Data, mindmapId, title, topic, description, chapterNumber } = req.body;
      if (!filename || !base64Data) {
        res.status(400).json({ error: 'Thiếu tên tệp hoặc dữ liệu hình ảnh sơ đồ tư duy.' });
        return;
      }
      const safeFilename = path.basename(filename);
      const { publicDir, distDir } = getMindmapsDirs();

      const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      const buffer = matches && matches.length === 3
        ? Buffer.from(matches[2], 'base64')
        : Buffer.from(base64Data, 'base64');

      // Write to public/mindmaps
      const assetUrl = await putAsset('mindmaps', safeFilename, buffer);

      const baseName = safeFilename.replace(/\.(png|jpg|jpeg|webp|svg)$/i, "");
      // Find standard mindmap if any
      const matchedStandard = STANDARD_MINDMAPS.find(m =>
        m.id === mindmapId ||
        m.filename.toLowerCase() === safeFilename.toLowerCase() ||
        m.filename.toLowerCase().replace(/\.[^/.]+$/, '') === baseName.toLowerCase()
      );

      let updatedStore = false;
      const targetId = mindmapId || matchedStandard?.id;
      
      if (targetId) {
        currentStore.items = currentStore.items.map(item => {
          if (item.id === targetId || item.url?.includes(baseName) || item.url?.includes(safeFilename)) {
            updatedStore = true;
            return {
              ...item,
              url: assetUrl,
              thumbnailUrl: assetUrl,
              isSample: false,
              updatedAt: new Date().toISOString()
            };
          }
          return item;
        });
      }

      if (!updatedStore) {
        // Create new mindmap item if not existing
        const now = new Date().toISOString();
        const newItem: LearningItem = {
          id: targetId || `mindmap-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          type: 'mindmap',
          title: title || matchedStandard?.title || `Sơ Đồ Tư Duy: ${safeFilename.replace(/\.[^/.]+$/, '')}`,
          description: description || matchedStandard?.description || 'Sơ đồ tư duy Toán 10 được giáo viên tải lên.',
          topic: topic || matchedStandard?.topic || (chapterNumber ? `Chương ${chapterNumber}` : 'Chủ đề Toán 10'),
          url: assetUrl,
          thumbnailUrl: assetUrl,
          displayOrder: chapterNumber || matchedStandard?.chapterNumber || 1,
          isSample: false,
          createdAt: now,
          updatedAt: now
        };
        currentStore.items.push(newItem);
        updatedStore = true;
      }

      if (updatedStore) {
        saveStore();
      }

      res.json({
        success: true,
        filename: safeFilename,
        url: assetUrl
      });
    } catch (err) {
      console.error('Error uploading mindmap:', err);
      res.status(500).json({ error: 'Lỗi khi lưu tệp hình ảnh sơ đồ tư duy.' });
    }
  });

  app.post('/api/batch-upload-mindmaps', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { files } = req.body;
      if (!Array.isArray(files) || files.length === 0) {
        res.status(400).json({ error: 'Danh sách tệp không hợp lệ.' });
        return;
      }
      const { publicDir, distDir } = getMindmapsDirs();
      const uploaded: string[] = [];

      for (const file of files) {
        if (file.filename && file.base64Data) {
          const safeFilename = path.basename(file.filename);
          const baseName = safeFilename.replace(/\.(png|jpg|jpeg|webp|svg)$/i, '');
          const matches = file.base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          const buffer = matches && matches.length === 3
            ? Buffer.from(matches[2], 'base64')
            : Buffer.from(file.base64Data, 'base64');

          const assetUrl = await putAsset('mindmaps', safeFilename, buffer);
          uploaded.push(safeFilename);

          // Update store item
          const matchedStandard = STANDARD_MINDMAPS.find(m =>
            m.id === file.mindmapId ||
            m.filename.toLowerCase() === safeFilename.toLowerCase() ||
            m.filename.toLowerCase().replace(/\.[^/.]+$/, '') === baseName.toLowerCase()
          );
          const targetId = file.mindmapId || matchedStandard?.id;

          let matched = false;
          currentStore.items = currentStore.items.map(item => {
            if (item.id === targetId || item.url?.includes(baseName) || item.url?.includes(safeFilename)) {
              matched = true;
              return {
                ...item,
                url: assetUrl,
                thumbnailUrl: assetUrl,
                isSample: false,
                updatedAt: new Date().toISOString()
              };
            }
            return item;
          });

          if (!matched && matchedStandard) {
            currentStore.items.push({
              id: matchedStandard.id,
              type: 'mindmap',
              title: matchedStandard.title,
              description: matchedStandard.description,
              topic: matchedStandard.topic,
              url: assetUrl,
              thumbnailUrl: assetUrl,
              displayOrder: matchedStandard.chapterNumber,
              isSample: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
          }
        }
      }
      saveStore();
      res.json({ success: true, uploadedCount: uploaded.length, files: uploaded });
    } catch (err) {
      console.error('Error batch uploading mindmaps:', err);
      res.status(500).json({ error: 'Lỗi khi tải lên hàng loạt sơ đồ tư duy.' });
    }
  });

  // --- AUTH ENDPOINTS ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password || password.length > 256) {
      res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu quản trị.' });
      return;
    }

    const expectedUsername = (currentStore.adminUsername || DEFAULT_ADMIN_USERNAME).toLowerCase();
    const inputUsername = (username || '').trim().toLowerCase();
    const isUsernameMatch = inputUsername === expectedUsername;
    
    const isPasswordMatch = passwordMatches(password, currentStore.passwordHash);

    if (isUsernameMatch && isPasswordMatch) {
      const token = createSessionToken();
      res.json({
        success: true,
        token,
        username: currentStore.adminUsername || DEFAULT_ADMIN_USERNAME
      });
    } else {
      res.status(401).json({
        error: 'Tên đăng nhập hoặc mật khẩu quản trị không chính xác.'
      });
    }
  });

  app.get('/api/auth/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    const isValid = verifySession(token);
    res.json({
      isAuthenticated: isValid,
      username: isValid ? (currentStore.adminUsername || DEFAULT_ADMIN_USERNAME) : null
    });
  });

  app.use('/api/users', (req, res, next) => {
    for (const field of ['fullName','phone','className','school']) {
      if (req.body?.[field] !== undefined && (typeof req.body[field] !== 'string' || req.body[field].length > 200)) {
        res.status(400).json({error:'Thông tin ghi danh không hợp lệ.'}); return;
      }
    }
    next();
  });
  app.post('/api/auth/logout', requireAdmin, (req, res) => {
    const token = req.headers.authorization!.slice(7);
    delete currentStore.sessions[crypto.createHash('sha256').update(token).digest('hex')];
    saveStore(); res.json({success:true});
  });
  // --- WEB USERS MANAGEMENT & ACTIVITY TRACKING ENDPOINTS ---
  app.get('/api/users', requireAdmin, (_req: Request, res: Response) => {
    res.json(currentStore.users || []);
  });

  app.post('/api/users/register', (req: Request, res: Response) => {
    try {
      const { fullName, phone, className, school } = req.body;
      const trimmedName = (fullName || '').trim();
      const trimmedPhone = (phone || '').replace(/[\s\-\.]/g, '').trim();
      const trimmedClass = (className || '').trim();
      const trimmedSchool = (school || '').trim();

      if (!trimmedName || !trimmedPhone || !trimmedClass || !trimmedSchool) {
        res.status(400).json({ error: 'Vui lòng nhập đầy đủ Họ tên, Số điện thoại, Lớp và Trường.' });
        return;
      }

      if (!/^\+?[0-9]{8,15}$/.test(trimmedPhone)) {
        res.status(400).json({ error: 'Số điện thoại phải gồm 8–15 chữ số, có thể bắt đầu bằng +.' });
        return;
      }

      const now = new Date().toISOString();
      if (!currentStore.users) {
        currentStore.users = [];
      }

      let user = currentStore.users.find(u => u.phone === trimmedPhone);
      if (user) {
        user.fullName = trimmedName;
        if (trimmedClass) user.className = trimmedClass;
        if (trimmedSchool) user.school = trimmedSchool;
        user.lastActiveAt = now;
      } else {
        user = {
          id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          fullName: trimmedName,
          phone: trimmedPhone,
          className: trimmedClass,
          school: trimmedSchool,
          registeredAt: now,
          lastActiveAt: now,
          totalClicks: 0,
          explorations: [],
          gameScores: []
        };
        currentStore.users.push(user);
      }

      saveStore();
      res.json({ success: true, user });
    } catch (err) {
      console.error('Error registering web user:', err);
      res.status(500).json({ error: 'Lỗi hệ thống khi ghi danh người dùng.' });
    }
  });

  app.post('/api/users/track-activity', (req: Request, res: Response) => {
    try {
      const { phone, fullName, itemId, itemTitle, category } = req.body;
      const cleanPhone = (phone || '').replace(/[\s\-\.]/g, '').trim();
      if (!cleanPhone) {
        res.status(400).json({ error: 'Thiếu số điện thoại người dùng.' });
        return;
      }

      const now = new Date().toISOString();
      if (!currentStore.users) currentStore.users = [];

      let user = currentStore.users.find(u => u.phone === cleanPhone);
      if (!user) {
        user = {
          id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          fullName: (fullName || 'Người dùng học tập').trim(),
          phone: cleanPhone,
          registeredAt: now,
          lastActiveAt: now,
          totalClicks: 0,
          explorations: [],
          gameScores: []
        };
        currentStore.users.push(user);
      }

      user.totalClicks = (user.totalClicks || 0) + 1;
      user.lastActiveAt = now;

      if (itemId && itemTitle) {
        if (!user.explorations) user.explorations = [];
        let exp = user.explorations.find(e => e.itemId === itemId);
        if (exp) {
          exp.clickCount = (exp.clickCount || 0) + 1;
          exp.lastClickedAt = now;
          exp.itemTitle = itemTitle;
          exp.category = category || exp.category;
        } else {
          user.explorations.push({
            itemId,
            itemTitle,
            category: category || 'general',
            clickCount: 1,
            lastClickedAt: now
          });
        }
      }

      saveStore();
      res.json({ success: true, user });
    } catch (err) {
      console.error('Error tracking activity:', err);
      res.status(500).json({ error: 'Lỗi ghi nhận hoạt động.' });
    }
  });

  app.post('/api/users/record-score', (req: Request, res: Response) => {
    try {
      const { phone, fullName, gameId, gameTitle, score, maxScore } = req.body;
      const cleanPhone = (phone || '').replace(/[\s\-\.]/g, '').trim();
      if (!cleanPhone || !gameId) {
        res.status(400).json({ error: 'Thiếu thông tin người dùng hoặc trò chơi.' });
        return;
      }

      const numScore = Number(score) || 0;
      const numMax = Number(maxScore) || 100;
      const now = new Date().toISOString();
      if (!currentStore.users) currentStore.users = [];

      let user = currentStore.users.find(u => u.phone === cleanPhone);
      if (!user) {
        user = {
          id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          fullName: (fullName || 'Người chơi Toán 10').trim(),
          phone: cleanPhone,
          registeredAt: now,
          lastActiveAt: now,
          totalClicks: 0,
          explorations: [],
          gameScores: []
        };
        currentStore.users.push(user);
      }

      user.totalClicks = (user.totalClicks || 0) + 1;
      user.lastActiveAt = now;
      if (!user.gameScores) user.gameScores = [];

      const existingScore = user.gameScores.find(g => g.gameId === gameId);
      if (existingScore) {
        existingScore.score = Math.max(existingScore.score, numScore);
        existingScore.maxScore = numMax;
        existingScore.completedAt = now;
        existingScore.playCount = (existingScore.playCount || 0) + 1;
        existingScore.gameTitle = gameTitle || existingScore.gameTitle;
      } else {
        user.gameScores.push({
          gameId,
          gameTitle: gameTitle || 'Trò chơi Toán 10',
          score: numScore,
          maxScore: numMax,
          completedAt: now,
          playCount: 1
        });
      }

      saveStore();
      res.json({ success: true, user });
    } catch (err) {
      console.error('Error recording game score:', err);
      res.status(500).json({ error: 'Lỗi lưu điểm trò chơi.' });
    }
  });

  app.delete('/api/users/:idOrPhone', requireAdmin, (req: Request, res: Response) => {
    const { idOrPhone } = req.params;
    const initialLen = (currentStore.users || []).length;
    currentStore.users = (currentStore.users || []).filter(u => u.id !== idOrPhone && u.phone !== idOrPhone);
    if (currentStore.users.length !== initialLen) {
      saveStore();
      res.json({ success: true, message: 'Đã xóa người dùng thành công.' });
    } else {
      res.status(404).json({ error: 'Không tìm thấy người dùng.' });
    }
  });

  app.post('/api/users/clear-all', requireAdmin, (_req: Request, res: Response) => {
    currentStore.users = [];
    saveStore();
    res.json({ success: true, message: 'Đã xóa toàn bộ danh sách người dùng.' });
  });

  app.get(['/api/users/export-csv', '/api/users/export-sheets'], requireAdmin, (_req: Request, res: Response) => {
    try {
      const users = currentStore.users || [];
      const rows: string[] = [];

      // Google Sheets and Excel UTF-8 CSV headers
      rows.push([
        'STT',
        'Họ và tên',
        'Số điện thoại',
        'Lớp',
        'Trường',
        'Thời gian ghi danh',
        'Lần hoạt động cuối',
        'Tổng số lượt bấm',
        'Những khám phá đã bấm',
        'Điểm các trò chơi (Đạt/Tổng điểm)',
        'Tổng điểm đạt được'
      ].map(f => `"${f.replace(/"/g, '""')}"`).join(','));

      users.forEach((u, index) => {
        const explorationsStr = (u.explorations || [])
          .map(e => `${e.itemTitle} (${e.clickCount} lượt)`)
          .join('; ');

        const gameScoresStr = (u.gameScores || [])
          .map(g => `${g.gameTitle}: ${g.score}/${g.maxScore}`)
          .join('; ');

        const totalEarned = (u.gameScores || []).reduce((acc, g) => acc + g.score, 0);
        const totalPossible = (u.gameScores || []).reduce((acc, g) => acc + g.maxScore, 0);
        const totalStr = totalPossible > 0 ? `${totalEarned}/${totalPossible} (${Math.round((totalEarned / totalPossible) * 100)}%)` : 'Chưa thi đấu';

        const regDate = u.registeredAt ? new Date(u.registeredAt).toLocaleString('vi-VN') : '';
        const lastActiveDate = u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleString('vi-VN') : '';

        const row = [
          (index + 1).toString(),
          u.fullName,
          u.phone,
          u.className || '',
          u.school || '',
          regDate,
          lastActiveDate,
          (u.totalClicks || 0).toString(),
          explorationsStr || 'Chưa có',
          gameScoresStr || 'Chưa tham gia',
          totalStr
        ].map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',');

        rows.push(row);
      });

      // \uFEFF is Byte Order Mark (BOM) ensuring Excel & Google Sheets open UTF-8 Vietnamese flawlessly
      const csvContent = '\uFEFF' + rows.join('\r\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="Danh_sach_nguoi_dung_Toan10_THPT_XuanGiang.csv"');
      res.send(csvContent);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      res.status(500).json({ error: 'Lỗi xuất file CSV' });
    }
  });

  // --- VISITOR ANALYTICS & TRAFFIC TRACKING ENDPOINTS ---
  const getAggregatedVisitorStats = () => {
    if (!currentStore.visitorStats) {
      currentStore.visitorStats = getInitialVisitorStats();
    }
    const vs = currentStore.visitorStats;
    const today = new Date().toISOString().split('T')[0];
    const registeredUsersCount = (currentStore.users || []).length;
    const totalInteractions = (currentStore.users || []).reduce((acc, u) => acc + (u.totalClicks || 0), 0);

    return {
      totalVisits: vs.totalVisits || 0,
      uniqueVisitors: (vs.uniqueVisitorIds || []).length,
      todayVisits: vs.dailyVisits?.[today] || 0,
      registeredUsersCount,
      totalInteractions,
      dailyVisits: vs.dailyVisits || {},
      pageViews: vs.pageViews || {},
      deviceBreakdown: vs.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 },
      recentVisitors: (vs.recentVisitors || []).slice(0, 60),
      lastUpdated: vs.lastUpdated || new Date().toISOString()
    };
  };

  app.get('/api/visitors/stats', (req: Request, res: Response) => {
    try {
      const stats = getAggregatedVisitorStats();
      if (!verifySession(req.headers.authorization?.replace(/^Bearer /, ''))) stats.recentVisitors = [];
      res.json(stats);
    } catch (err) {
      console.error('Error fetching visitor stats:', err);
      res.status(500).json({ error: 'Không thể tải thống kê lượt truy cập.' });
    }
  });

  app.post('/api/visitors/record-visit', (req: Request, res: Response) => {
    try {
      if (!currentStore.visitorStats) {
        currentStore.visitorStats = getInitialVisitorStats();
      }
      const vs = currentStore.visitorStats;
      const { page, visitorId, userAgent: customUa, userName, isRegistered } = req.body;
      const ua = customUa || req.headers['user-agent'] || '';

      // Detect device
      let device = 'Desktop';
      if (/tablet|ipad|playbook|silk/i.test(ua)) {
        device = 'Tablet';
      } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
        device = 'Mobile';
      }

      // Detect browser
      let browser = 'Khác';
      if (/coc_coc_browser|coccoc/i.test(ua)) browser = 'Cốc Cốc';
      else if (/edg/i.test(ua)) browser = 'Edge';
      else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
      else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
      else if (/safari/i.test(ua)) browser = 'Safari';

      const today = new Date().toISOString().split('T')[0];
      const validPage = (page && typeof page === 'string') ? page : 'home';

      // Increment total visits
      vs.totalVisits = (vs.totalVisits || 0) + 1;

      // Unique visitors
      if (visitorId && typeof visitorId === 'string') {
        if (!vs.uniqueVisitorIds) vs.uniqueVisitorIds = [];
        if (!vs.uniqueVisitorIds.includes(visitorId)) {
          vs.uniqueVisitorIds.push(visitorId);
          if (vs.uniqueVisitorIds.length > 5000) {
            vs.uniqueVisitorIds.shift();
          }
        }
      }

      // Daily visits
      if (!vs.dailyVisits) vs.dailyVisits = {};
      vs.dailyVisits[today] = (vs.dailyVisits[today] || 0) + 1;

      // Page views
      if (!vs.pageViews) vs.pageViews = {};
      vs.pageViews[validPage] = (vs.pageViews[validPage] || 0) + 1;

      // Device breakdown
      if (!vs.deviceBreakdown) vs.deviceBreakdown = { mobile: 0, desktop: 0, tablet: 0 };
      if (device === 'Mobile') vs.deviceBreakdown.mobile = (vs.deviceBreakdown.mobile || 0) + 1;
      else if (device === 'Tablet') vs.deviceBreakdown.tablet = (vs.deviceBreakdown.tablet || 0) + 1;
      else vs.deviceBreakdown.desktop = (vs.deviceBreakdown.desktop || 0) + 1;

      // Recent visitors log
      if (!vs.recentVisitors) vs.recentVisitors = [];
      const newVisitorEntry = {
        id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        page: validPage,
        device,
        browser,
        userName: (userName || (isRegistered ? 'Học sinh ghi danh' : 'Khách ghé thăm')).trim(),
        isRegistered: Boolean(isRegistered)
      };
      vs.recentVisitors.unshift(newVisitorEntry);
      if (vs.recentVisitors.length > 60) {
        vs.recentVisitors.pop();
      }

      vs.lastUpdated = new Date().toISOString();
      saveStore();

      const stats = getAggregatedVisitorStats();
      if (!verifySession(req.headers.authorization?.replace(/^Bearer /, ''))) stats.recentVisitors = [];
      res.json(stats);
    } catch (err) {
      console.error('Error recording visitor:', err);
      res.status(500).json({ error: 'Lỗi ghi nhận lượt truy cập.' });
    }
  });

  app.post('/api/visitors/reset', requireAdmin, (_req: Request, res: Response) => {
    currentStore.visitorStats = getInitialVisitorStats();
    saveStore();
    res.json({ success: true, message: 'Đã thiết lập lại bộ đếm lượt ghé thăm webapp.' });
  });

  app.get('/api/visitors/export-csv', requireAdmin, (_req: Request, res: Response) => {
    try {
      const stats = getAggregatedVisitorStats();
      const rows: string[][] = [];

      rows.push(['BÁO CÁO TỔNG HỢP SỐ LƯỢT NGƯỜI GHÉ THĂM WEBAPP TOÁN 10']);
      rows.push(['Bản quyền: TEAM AI GENZ 10A1, THPT XUÂN GIANG']);
      rows.push([`Thời gian xuất báo cáo: ${new Date().toLocaleString('vi-VN')}`]);
      rows.push([]);

      // Section 1: KPI tổng quát
      rows.push(['1. TỔNG QUAN LƯỢT TRUY CẬP']);
      rows.push(['Chỉ số', 'Số lượng']);
      rows.push(['Tổng số lượt ghé thăm (Total Visits)', stats.totalVisits.toString()]);
      rows.push(['Khách ghé thăm duy nhất (Unique Visitors)', stats.uniqueVisitors.toString()]);
      rows.push(['Lượt ghé thăm hôm nay', stats.todayVisits.toString()]);
      rows.push(['Số học sinh / người dùng đã ghi danh', stats.registeredUsersCount.toString()]);
      rows.push(['Tổng số lượt tương tác & khám phá học liệu', stats.totalInteractions.toString()]);
      rows.push([]);

      // Section 2: Theo ngày
      rows.push(['2. THỐNG KÊ LƯỢT GHÉ THĂM THEO NGÀY']);
      rows.push(['Ngày', 'Số lượt ghé thăm']);
      const sortedDays = Object.keys(stats.dailyVisits).sort();
      sortedDays.forEach(dateStr => {
        rows.push([dateStr, (stats.dailyVisits[dateStr] || 0).toString()]);
      });
      rows.push([]);

      // Section 3: Theo chuyên mục
      rows.push(['3. PHÂN BỐ LƯỢT XEM THEO CHUYÊN MỤC']);
      rows.push(['Chuyên mục học liệu', 'Số lượt xem']);
      const pageLabels: Record<string, string> = {
        home: 'Trang chủ',
        games: 'Trò chơi Toán học',
        simulations: 'Mô phỏng GeoGebra',
        infographics: 'Infographic Toán 10',
        mindmaps: 'Sơ đồ tư duy',
        'ai-assistant': 'Trợ lý AI Gem',
        admin: 'Quản trị'
      };
      Object.entries(stats.pageViews).forEach(([key, count]) => {
        rows.push([pageLabels[key] || key, count.toString()]);
      });
      rows.push([]);

      // Section 4: Theo thiết bị
      rows.push(['4. PHÂN BỐ THEO LOẠI THIẾT BỊ']);
      rows.push(['Loại thiết bị', 'Số lượt']);
      rows.push(['Điện thoại di động (Mobile)', (stats.deviceBreakdown.mobile || 0).toString()]);
      rows.push(['Máy tính (Desktop / Laptop)', (stats.deviceBreakdown.desktop || 0).toString()]);
      rows.push(['Máy tính bảng (Tablet)', (stats.deviceBreakdown.tablet || 0).toString()]);
      rows.push([]);

      // Section 5: Danh sách khách ghé thăm gần nhất
      rows.push(['5. NHẬT KÝ KHÁCH GHÉ THĂM GẦN ĐÂY']);
      rows.push(['STT', 'Thời gian', 'Người dùng', 'Trạng thái', 'Trang xem', 'Thiết bị', 'Trình duyệt']);
      stats.recentVisitors.forEach((v, idx) => {
        rows.push([
          (idx + 1).toString(),
          new Date(v.timestamp).toLocaleString('vi-VN'),
          v.userName || 'Khách ghé thăm',
          v.isRegistered ? 'Đã ghi danh' : 'Vãng lai',
          pageLabels[v.page] || v.page,
          v.device,
          v.browser
        ]);
      });

      const csvContent = '\uFEFF' + rows.map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="Bao_cao_tong_hop_luot_ghe_tham_Toan10.csv"');
      res.send(csvContent);
    } catch (err) {
      console.error('Error exporting visitor CSV:', err);
      res.status(500).json({ error: 'Lỗi xuất báo cáo thống kê lượt truy cập.' });
    }
  });

  app.post('/api/auth/change-password', requireAdmin, (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    if (typeof newPassword !== 'string' || newPassword.length < 12 || newPassword.length > 256) {
      res.status(400).json({ error: 'Mật khẩu mới phải có từ 12 đến 256 ký tự.' });
      return;
    }

    if (!passwordMatches(oldPassword, currentStore.passwordHash)) {
      res.status(400).json({ error: 'Mật khẩu hiện tại không đúng.' });
      return;
    }

    currentStore.passwordHash = hashPassword(newPassword);
    currentStore.sessions = {};
    saveStore();
    res.json({ success: true, message: 'Đổi mật khẩu quản trị thành công!' });
  });

  // --- LEARNING ITEMS ENDPOINTS ---
  app.get('/api/items', (req: Request, res: Response) => {
    const type = req.query.type as string | undefined;
    let list = currentStore.items;
    if (type) {
      list = list.filter(item => item.type === type);
    }
    // Sort by displayOrder ascending, then by createdAt
    const sorted = [...list].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    res.json(sorted);
  });

  app.get('/api/items/:id', (req: Request, res: Response) => {
    const item = currentStore.items.find(i => i.id === req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Không tìm thấy học liệu.' });
      return;
    }
    res.json(item);
  });

  app.post('/api/items', requireAdmin, (req: Request, res: Response) => {
    const { type, title, description, topic, url, htmlContent, thumbnailUrl } = req.body;

    if (!type || !title || !topic) {
      res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ: Loại học liệu, Tên học liệu và Chủ đề.' });
      return;
    }

    if (type === 'game' && !htmlContent && !url) {
      res.status(400).json({ error: 'Trò chơi cần có tệp mã nguồn HTML hoặc đường link liên kết.' });
      return;
    }

    if ((type === 'simulation' || type === 'infographic' || type === 'mindmap') && !url) {
      res.status(400).json({ error: 'Vui lòng cung cấp đường link URL hợp lệ.' });
      return;
    }

    // Determine next displayOrder in this category
    const maxOrder = currentStore.items
      .filter(i => i.type === type)
      .reduce((max, i) => Math.max(max, i.displayOrder || 0), 0);

    const now = new Date().toISOString();
    const newItem: LearningItem = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      title: title.trim(),
      description: (description || '').trim(),
      topic: topic.trim(),
      url: url ? url.trim() : undefined,
      htmlContent: htmlContent || undefined,
      thumbnailUrl: thumbnailUrl ? thumbnailUrl.trim() : undefined,
      displayOrder: maxOrder + 1,
      isSample: false,
      createdAt: now,
      updatedAt: now
    };

    currentStore.items.push(newItem);
    saveStore();

    res.status(201).json(newItem);
  });

  app.put('/api/items/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const index = currentStore.items.findIndex(i => i.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Không tìm thấy học liệu để chỉnh sửa.' });
      return;
    }

    const prev = currentStore.items[index];
    const { title, description, topic, url, htmlContent, thumbnailUrl, displayOrder } = req.body;

    const updatedItem: LearningItem = {
      ...prev,
      title: title !== undefined ? title.trim() : prev.title,
      description: description !== undefined ? description.trim() : prev.description,
      topic: topic !== undefined ? topic.trim() : prev.topic,
      url: url !== undefined ? url.trim() : prev.url,
      htmlContent: htmlContent !== undefined ? htmlContent : prev.htmlContent,
      thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl.trim() : prev.thumbnailUrl,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : prev.displayOrder,
      updatedAt: new Date().toISOString()
    };

    currentStore.items[index] = updatedItem;
    saveStore();

    res.json(updatedItem);
  });

  app.delete('/api/items/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const index = currentStore.items.findIndex(i => i.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Không tìm thấy học liệu để xóa.' });
      return;
    }

    const removed = currentStore.items.splice(index, 1)[0];
    saveStore();

    res.json({ success: true, message: 'Đã xóa học liệu thành công.', deleted: removed });
  });

  app.post('/api/items/reorder', requireAdmin, (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      res.status(400).json({ error: 'Danh sách ID thứ tự không hợp lệ.' });
      return;
    }

    orderedIds.forEach((id: string, index: number) => {
      const item = currentStore.items.find(i => i.id === id);
      if (item) {
        item.displayOrder = index + 1;
      }
    });

    saveStore();
    res.json({ success: true, message: 'Đã cập nhật thứ tự hiển thị.' });
  });

  // --- AI ASSISTANT CONFIG ENDPOINTS ---
  app.get('/api/ai-config', (_req: Request, res: Response) => {
    res.json(currentStore.aiConfig);
  });

  app.put('/api/ai-config', requireAdmin, (req: Request, res: Response) => {
    const { gemUrl, assistantTitle, assistantDescription, welcomeGuide, samplePrompts } = req.body;

    if (!gemUrl) {
      res.status(400).json({ error: 'Vui lòng cung cấp đường dẫn URL Gem của Gemini.' });
      return;
    }

    currentStore.aiConfig = {
      gemUrl: gemUrl.trim(),
      assistantTitle: assistantTitle ? assistantTitle.trim() : currentStore.aiConfig.assistantTitle,
      assistantDescription: assistantDescription ? assistantDescription.trim() : currentStore.aiConfig.assistantDescription,
      welcomeGuide: welcomeGuide ? welcomeGuide.trim() : currentStore.aiConfig.welcomeGuide,
      samplePrompts: Array.isArray(samplePrompts) ? samplePrompts : currentStore.aiConfig.samplePrompts
    };

    saveStore();
    res.json(currentStore.aiConfig);
  });

  // --- STANDALONE SANDBOX GAME SERVER ---
  app.get('/sandbox/game/:id', (req: Request, res: Response) => {
    const item = currentStore.items.find(i => i.id === req.params.id);
    if (!item || item.type !== 'game') {
      res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <body style="font-family:sans-serif; text-align:center; padding:40px; background:#0f172a; color:#f8fafc;">
            <h2>Không tìm thấy trò chơi</h2>
            <p>Trò chơi không tồn tại hoặc đã bị xóa.</p>
          </body>
        </html>
      `);
      return;
    }

    if (item.htmlContent) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.send(item.htmlContent);
      return;
    }

    if (item.url) {
      const relPath = item.url.replace(/^\//, '');
      const filePath = path.join(__dirname, 'public', relPath);
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <body style="font-family:sans-serif; text-align:center; padding:40px; background:#0f172a; color:#f8fafc;">
          <h2>Không tìm thấy nội dung trò chơi</h2>
          <p>Trò chơi chưa có nội dung HTML khả dụng.</p>
        </body>
      </html>
    `);
  });

  // --- BACKUP & RESTORE ---
  app.get('/api/backup', requireAdmin, (_req: Request, res: Response) => {
    res.json({
      exportedAt: new Date().toISOString(),
      items: currentStore.items,
      aiConfig: currentStore.aiConfig
    });
  });

  app.post('/api/reset-sample', requireAdmin, (_req: Request, res: Response) => {
    currentStore.items = [...initialItems];
    currentStore.aiConfig = { ...initialAiConfig };
    saveStore();
    res.json({ success: true, message: 'Đã khôi phục dữ liệu mẫu chuẩn chương trình Toán 10.' });
  });

  app.use('/api', (_req, res) => res.status(404).json({error:'Không tìm thấy API.'}));
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).json({error:err.status === 413 ? 'Tệp quá lớn. Mỗi ảnh tối đa 2,5 MB; tải từng ảnh.' : 'Yêu cầu không hợp lệ hoặc máy chủ chưa sẵn sàng.'});
  });
  return app;
}
