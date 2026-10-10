const fs = require('fs');
const path = require('path');
const { CHAPTER_PALETTES, escapeXml, publicMindDir, distMindDir } = require('./mindmap_common.cjs');
const { ALL_36_CURRICULUM_MINDMAPS } = require('./mindmaps_curriculum_full.cjs');

// Generate SVG string for a mindmap item
function generateSvgForMindmap(item) {
  const width = 1600;
  const height = 1050;
  const palette = CHAPTER_PALETTES[item.chapterNumber] || CHAPTER_PALETTES[1];
  const branches = item.branches || [];

  const half = Math.ceil(branches.length / 2);
  const leftBranches = branches.slice(0, half);
  const rightBranches = branches.slice(half);

  const centerX = width / 2;
  const centerY = 525;

  // Generate left branches
  const leftNodes = leftBranches.map((branch, i) => {
    const total = leftBranches.length;
    const ySpacing = (height - 300) / (total + 1);
    const cardCenterY = 175 + (i + 1) * ySpacing;
    const cardX = 45;
    const cardW = 415;
    const cardH = 150 + Math.max(0, (branch.points.length - 3) * 22);
    const cardTopY = cardCenterY - cardH / 2;
    const connectionPointX = cardX + cardW;

    // Bezier curve from center to left card connection point
    const controlX1 = centerX - 180;
    const controlX2 = connectionPointX + 100;
    const pathD = `M ${centerX - 165} ${centerY} C ${controlX1} ${centerY}, ${controlX2} ${cardCenterY}, ${connectionPointX} ${cardCenterY}`;

    const pointsList = branch.points.map((p, idx) => {
      const cleanP = escapeXml(p);
      const isLong = cleanP.length > 55;
      const line1 = isLong ? cleanP.substring(0, 52) + '...' : cleanP;
      return `
        <g transform="translate(18, ${58 + idx * 28})">
          <circle cx="0" cy="0" r="4.5" fill="${palette.primary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12.5" font-weight="500" fill="#334155">
            ${line1}
          </text>
        </g>
      `;
    }).join('\n');

    return `
      <!-- Left Branch ${i + 1} Connector -->
      <path d="${pathD}" fill="none" stroke="${palette.secondary}" stroke-width="4.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="${connectionPointX}" cy="${cardCenterY}" r="7" fill="${palette.primary}" stroke="#ffffff" stroke-width="2" />

      <!-- Left Branch Card -->
      <g transform="translate(${cardX}, ${cardTopY})">
        <!-- Card shadow & background -->
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${palette.border}" stroke-width="2" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="${cardW}" height="42" rx="18" fill="${palette.light}" opacity="0.9" />
        <rect x="0" y="24" width="${cardW}" height="18" fill="${palette.light}" opacity="0.9" />
        
        <!-- Left color stripe -->
        <rect x="0" y="0" width="8" height="${cardH}" rx="4" fill="${palette.primary}" />

        <!-- Card Header -->
        <text x="20" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="${palette.text}">
          ${escapeXml(branch.title)}
        </text>
        <g transform="translate(${cardW - 85}, 10)">
          <rect width="70" height="22" rx="6" fill="${palette.badgeBg}" stroke="${palette.border}" stroke-width="1" />
          <text x="35" y="15" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${palette.text}" text-anchor="middle">
            ${escapeXml(branch.badge || `Nhánh ${i + 1}`)}
          </text>
        </g>

        <!-- Points list -->
        ${pointsList}
      </g>
    `;
  }).join('\n');

  // Generate right branches
  const rightNodes = rightBranches.map((branch, i) => {
    const total = rightBranches.length;
    const ySpacing = (height - 300) / (total + 1);
    const cardCenterY = 175 + (i + 1) * ySpacing;
    const cardX = width - 460;
    const cardW = 415;
    const cardH = 150 + Math.max(0, (branch.points.length - 3) * 22);
    const cardTopY = cardCenterY - cardH / 2;
    const connectionPointX = cardX;

    // Bezier curve from center to right card connection point
    const controlX1 = centerX + 180;
    const controlX2 = connectionPointX - 100;
    const pathD = `M ${centerX + 165} ${centerY} C ${controlX1} ${centerY}, ${controlX2} ${cardCenterY}, ${connectionPointX} ${cardCenterY}`;

    const pointsList = branch.points.map((p, idx) => {
      const cleanP = escapeXml(p);
      const isLong = cleanP.length > 55;
      const line1 = isLong ? cleanP.substring(0, 52) + '...' : cleanP;
      return `
        <g transform="translate(18, ${58 + idx * 28})">
          <circle cx="0" cy="0" r="4.5" fill="${palette.secondary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12.5" font-weight="500" fill="#334155">
            ${line1}
          </text>
        </g>
      `;
    }).join('\n');

    return `
      <!-- Right Branch ${half + i + 1} Connector -->
      <path d="${pathD}" fill="none" stroke="${palette.secondary}" stroke-width="4.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="${connectionPointX}" cy="${cardCenterY}" r="7" fill="${palette.primary}" stroke="#ffffff" stroke-width="2" />

      <!-- Right Branch Card -->
      <g transform="translate(${cardX}, ${cardTopY})">
        <!-- Card shadow & background -->
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${palette.border}" stroke-width="2" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="${cardW}" height="42" rx="18" fill="${palette.light}" opacity="0.9" />
        <rect x="0" y="24" width="${cardW}" height="18" fill="${palette.light}" opacity="0.9" />
        
        <!-- Right color stripe -->
        <rect x="${cardW - 8}" y="0" width="8" height="${cardH}" rx="4" fill="${palette.secondary}" />

        <!-- Card Header -->
        <text x="20" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="${palette.text}">
          ${escapeXml(branch.title)}
        </text>
        <g transform="translate(${cardW - 95}, 10)">
          <rect width="80" height="22" rx="6" fill="${palette.badgeBg}" stroke="${palette.border}" stroke-width="1" />
          <text x="40" y="15" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${palette.text}" text-anchor="middle">
            ${escapeXml(branch.badge || `Nhánh ${half + i + 1}`)}
          </text>
        </g>

        <!-- Points list -->
        ${pointsList}
      </g>
    `;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
    <filter id="centerShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.18" />
    </filter>
    <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.primary}" />
      <stop offset="100%" stop-color="${palette.secondary}" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="${palette.light}" />
    </linearGradient>
    <pattern id="patternDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="1.5" fill="#94a3b8" opacity="0.22" />
    </pattern>
  </defs>

  <!-- Background Layer -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <circle cx="180" cy="180" r="320" fill="${palette.secondary}" opacity="0.04" />
  <circle cx="${width - 180}" cy="${height - 180}" r="360" fill="${palette.primary}" opacity="0.04" />
  <rect width="${width}" height="${height}" fill="url(#patternDots)" />

  <!-- Outer Border Frame -->
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="24" fill="none" stroke="${palette.border}" stroke-width="2" opacity="0.8" />

  <!-- TOP HEADER BANNER -->
  <g transform="translate(45, 36)">
    <rect width="${width - 90}" height="84" rx="20" fill="#ffffff" stroke="${palette.border}" stroke-width="1.5" filter="url(#cardShadow)" />
    
    <!-- Chapter Tag Badge -->
    <rect x="24" y="20" width="136" height="44" rx="12" fill="${palette.light}" stroke="${palette.border}" stroke-width="1.5" />
    <text x="92" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="${palette.text}" text-anchor="middle">
      ${escapeXml(item.chapterRoman)}
    </text>

    <!-- Title & Subtitle -->
    <text x="180" y="44" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="22" font-weight="900" fill="#0f172a">
      ${escapeXml(item.title)}
    </text>
    <text x="180" y="68" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">
      Sơ đồ tư duy kiến thức cốt lõi · GDPT 2018 · Môn Toán 10 (${escapeXml(item.chapterTitle)})
    </text>

    <!-- Right Badge: Standard GDPT 2018 -->
    <g transform="translate(${width - 365}, 22)">
      <rect width="250" height="40" rx="12" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5" />
      <circle cx="24" cy="20" r="7" fill="#10b981" />
      <text x="42" y="25" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">
        Sơ đồ tư duy chuẩn kiến thức
      </text>
    </g>
  </g>

  <!-- LEFT & RIGHT BRANCHES -->
  ${leftNodes}
  ${rightNodes}

  <!-- CENTER CORE HUB (TÂM SƠ ĐỒ) -->
  <g transform="translate(${centerX}, ${centerY})">
    <!-- Glowing pulse rings -->
    <circle cx="0" cy="0" r="175" fill="${palette.primary}" opacity="0.06" />
    <circle cx="0" cy="0" r="150" fill="${palette.secondary}" opacity="0.1" />
    <circle cx="0" cy="0" r="125" fill="${palette.secondary}" opacity="0.15" />

    <!-- Center Card Box -->
    <rect x="-155" y="-95" width="310" height="190" rx="30" fill="url(#centerGrad)" filter="url(#centerShadow)" stroke="#ffffff" stroke-width="3" />
    
    <!-- Center text elements -->
    <text x="0" y="-45" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff" opacity="0.9" text-anchor="middle" letter-spacing="1.5">
      TRỌNG TÂM KIẾN THỨC
    </text>
    <text x="0" y="-12" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">
      ${escapeXml(item.centerTitle)}
    </text>
    <text x="0" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#ffffff" opacity="0.95" text-anchor="middle">
      Toán 10 · ${escapeXml(item.baiCode)}
    </text>

    <!-- Branch count badge -->
    <rect x="-95" y="42" width="190" height="30" rx="10" fill="#ffffff" opacity="0.25" />
    <text x="0" y="62" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
      ${branches.length} NHÁNH PHÂN TÍCH
    </text>
  </g>

  <!-- BOTTOM HIGHLIGHTS FOOTER -->
  <g transform="translate(45, ${height - 76})">
    <rect width="${width - 90}" height="48" rx="14" fill="#ffffff" stroke="${palette.border}" stroke-width="1.5" filter="url(#cardShadow)" />
    <text x="24" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="${palette.text}">
      ĐIỂM NHẤN CỐT LÕI:
    </text>
    <text x="175" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12.5" font-weight="600" fill="#475569">
      ${escapeXml(item.highlights.join('   •   '))}
    </text>
  </g>
</svg>`;
}

// Generate Standalone Interactive HTML Viewer for a mindmap
function generateHtmlForMindmap(item, svgContent) {
  const palette = CHAPTER_PALETTES[item.chapterNumber] || CHAPTER_PALETTES[1];

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sơ Đồ Tư Duy Toán 10 – ${escapeXml(item.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      background: #0f172a;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      overflow: hidden;
      color: #f8fafc;
      user-select: none;
    }
    
    /* Top Toolbar */
    .top-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 50;
    }

    .title-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chapter-badge {
      background: ${palette.primary};
      color: #fff;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .lesson-title {
      font-size: 15px;
      font-weight: 800;
      color: #fff;
    }

    .lesson-chapter {
      font-size: 12px;
      color: #94a3b8;
      margin-left: 4px;
    }

    .btn-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 7px 12px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn:hover {
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.3);
    }
    .btn-primary {
      background: ${palette.primary};
      border-color: ${palette.secondary};
      color: #fff;
    }
    .btn-primary:hover {
      filter: brightness(1.15);
    }

    /* Main Viewport */
    .viewport {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
    }
    .viewport:active {
      cursor: grabbing;
    }

    .svg-container {
      transform-origin: center center;
      transition: transform 0.08s ease-out;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
      background: #ffffff;
    }

    .svg-container svg {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }

    /* Bottom Info Drawer */
    .bottom-bar {
      position: fixed;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 30px;
      padding: 6px 18px;
      font-size: 12px;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 40;
    }

    @media print {
      .top-toolbar, .bottom-bar { display: none !important; }
      body, .viewport { background: #fff !important; }
      .svg-container { box-shadow: none !important; transform: none !important; }
    }
  </style>
</head>
<body>
  <!-- Top Navigation Toolbar -->
  <div class="top-toolbar">
    <div class="title-area">
      <span class="chapter-badge">${escapeXml(item.chapterRoman)}</span>
      <div>
        <span class="lesson-title">${escapeXml(item.title)}</span>
        <span class="lesson-chapter">· ${escapeXml(item.chapterTitle)}</span>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn" id="btnFit" title="Thu phóng vừa khít màn hình">🔍 Vừa màn hình</button>
      <button class="btn" id="btnZoomIn" title="Phóng to">+</button>
      <button class="btn" id="btnZoomOut" title="Thu nhỏ">-</button>
      <button class="btn" id="btnReset" title="Tỷ lệ 100%">100%</button>
      <button class="btn" id="btnDownloadSvg" title="Tải ảnh vector SVG">📥 Tải SVG</button>
      <button class="btn" id="btnPrint" title="In sơ đồ khổ A4">🖨️ In A4</button>
      <button class="btn btn-primary" id="btnFullscreen" title="Xem toàn màn hình">⛶ Toàn màn hình</button>
    </div>
  </div>

  <!-- Interactive Pan & Zoom Viewport -->
  <div class="viewport" id="viewport">
    <div class="svg-container" id="svgContainer" style="width: 1600px; height: 1050px;">
      ${svgContent}
    </div>
  </div>

  <!-- Bottom Helper Bar -->
  <div class="bottom-bar">
    <span>💡 Kéo chuột để di chuyển (Pan)</span>
    <span>•</span>
    <span>Lăn con trỏ chuột để phóng to/thu nhỏ</span>
    <span>•</span>
    <span id="zoomLabel">Zoom: 100%</span>
  </div>

  <script>
    const viewport = document.getElementById('viewport');
    const container = document.getElementById('svgContainer');
    const zoomLabel = document.getElementById('zoomLabel');

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function updateTransform() {
      container.style.transform = \`translate(\${posX}px, \${posY}px) scale(\${scale})\`;
      zoomLabel.textContent = \`Zoom: \${Math.round(scale * 100)}%\`;
    }

    function fitToScreen() {
      const vWidth = viewport.clientWidth - 40;
      const vHeight = viewport.clientHeight - 40;
      const scaleX = vWidth / 1600;
      const scaleY = vHeight / 1050;
      scale = Math.min(scaleX, scaleY);
      posX = 0;
      posY = 0;
      updateTransform();
    }

    // Auto-fit on load and resize
    window.addEventListener('resize', fitToScreen);
    window.addEventListener('DOMContentLoaded', fitToScreen);
    setTimeout(fitToScreen, 80);

    // Zoom Buttons
    document.getElementById('btnFit').addEventListener('click', fitToScreen);
    document.getElementById('btnReset').addEventListener('click', () => { scale = 1; posX = 0; posY = 0; updateTransform(); });
    document.getElementById('btnZoomIn').addEventListener('click', () => { scale = Math.min(scale + 0.15, 3.0); updateTransform(); });
    document.getElementById('btnZoomOut').addEventListener('click', () => { scale = Math.max(scale - 0.15, 0.3); updateTransform(); });

    // Mouse Pan & Drag
    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Wheel Zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      scale = Math.min(Math.max(scale * zoomFactor, 0.3), 3.0);
      updateTransform();
    }, { passive: false });

    // Download SVG
    document.getElementById('btnDownloadSvg').addEventListener('click', () => {
      const svgData = container.innerHTML;
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '${item.filenameBase}.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    // Print
    document.getElementById('btnPrint').addEventListener('click', () => { window.print(); });

    // Fullscreen
    document.getElementById('btnFullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  </script>
</body>
</html>`;
}

// Build all 36 mindmaps
console.log('Generating authentic Mind Map files for all 36 lessons...');

ALL_36_CURRICULUM_MINDMAPS.forEach((item, idx) => {
  const baseName = item.filenameBase;
  const svg = generateSvgForMindmap(item);
  const html = generateHtmlForMindmap(item, svg);

  // 1. Write SVG to public/mindmaps and dist/mindmaps
  fs.writeFileSync(path.join(publicMindDir, `${baseName}.svg`), svg, 'utf8');
  fs.writeFileSync(path.join(publicMindDir, `SoDoTuDuy_${baseName}.svg`), svg, 'utf8');
  fs.writeFileSync(path.join(distMindDir, `${baseName}.svg`), svg, 'utf8');
  fs.writeFileSync(path.join(distMindDir, `SoDoTuDuy_${baseName}.svg`), svg, 'utf8');

  // 2. Write HTML to public/mindmaps and dist/mindmaps
  fs.writeFileSync(path.join(publicMindDir, `${baseName}.html`), html, 'utf8');
  fs.writeFileSync(path.join(publicMindDir, `SoDoTuDuy_${baseName}.html`), html, 'utf8');
  fs.writeFileSync(path.join(distMindDir, `${baseName}.html`), html, 'utf8');
  fs.writeFileSync(path.join(distMindDir, `SoDoTuDuy_${baseName}.html`), html, 'utf8');

  console.log(`[${idx + 1}/36] Generated Mind Map: ${item.chapterRoman} - ${item.title}`);
});

console.log('All 36 Mind Maps successfully generated in public/mindmaps and dist/mindmaps!');
