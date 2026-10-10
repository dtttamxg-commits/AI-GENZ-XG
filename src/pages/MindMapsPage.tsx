import { apiFetch } from '../services/request';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft, Search, Filter, ExternalLink, PlusCircle, Network,
  Image as ImageIcon, Sparkles, BookOpen, Layers, LayoutGrid,
  CheckCircle2, FolderUp, RefreshCw, Maximize2, Download, Info,
  Upload, Eye, ChevronRight, Monitor
} from 'lucide-react';
import { LearningItem, WebUser } from '../types';
import { MindMap3DIcon } from '../components/Math3DIcons';
import {
  STANDARD_MINDMAPS,
  MINDMAP_CHAPTER_CONFIGS,
  MindMapItem
} from '../data/mindmapsData';
import { generateMindMapSvg } from '../data/mindmapSvgTemplates';
import { MindMapModal } from '../components/MindMapModal';
import { BatchMindMapUploader } from '../components/BatchMindMapUploader';

interface MindMapsPageProps {
  items: LearningItem[];
  onBack: () => void;
  isAdmin: boolean;
  onOpenAdmin: (category: string) => void;
  onRefreshData?: () => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  requireRegistration?: (action: () => void, message?: string) => boolean;
  onTrackActivity?: (itemId: string, itemTitle: string, category: string) => void;
}

export const MindMapsPage: React.FC<MindMapsPageProps> = ({
  items,
  onBack,
  isAdmin,
  onOpenAdmin,
  onRefreshData,
  currentUser,
  onOpenRegister,
  requireRegistration,
  onTrackActivity
}) => {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'ALL'>('ALL');
  const [viewMode, setViewMode] = useState<'by-chapter' | 'all-list'>('by-chapter');
  
  // Modals state
  const [selectedMindmap, setSelectedMindmap] = useState<MindMapItem | null>(null);
  const [isBatchUploaderOpen, setIsBatchUploaderOpen] = useState(false);
  
  // Status of files on disk
  const [existingFiles, setExistingFiles] = useState<Set<string>>(new Set());
  const [isCheckingFiles, setIsCheckingFiles] = useState(false);
  const [imageTimestamps, setImageTimestamps] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Check which mindmap files exist on disk
  const checkServerFiles = async () => {
    setIsCheckingFiles(true);
    try {
      const res = await apiFetch('/api/mindmaps/status');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.files)) {
          setExistingFiles(new Set(data.files.map((f: string) => f.toLowerCase())));
        }
      }
    } catch (err) {
      console.warn('Could not check mindmaps status:', err);
    } finally {
      setIsCheckingFiles(false);
    }
  };

  useEffect(() => {
    checkServerFiles();
  }, []);

  // Combine standard mindmaps with items from store
  const mergedMindmaps: MindMapItem[] = useMemo(() => {
    const storeMindmaps = items.filter(item => item.type === 'mindmap');
    
    // Map standard mindmaps, merging any store updates (e.g. updated url, driveUrl)
    const list: MindMapItem[] = STANDARD_MINDMAPS.map(std => {
      const foundInStore = storeMindmaps.find(
        sm => sm.id === std.id || sm.url?.includes(std.filename) || sm.title === std.title
      );
      if (foundInStore) {
        return {
          ...std,
          url: foundInStore.url || std.url,
          thumbnailUrl: foundInStore.thumbnailUrl || foundInStore.url || std.thumbnailUrl,
          driveUrl: foundInStore.url?.includes('drive.google.com') ? foundInStore.url : std.driveUrl,
          description: foundInStore.description || std.description
        };
      }
      return std;
    });

    // Also include any custom mindmaps added by teacher that don't match standard IDs
    storeMindmaps.forEach(custom => {
      const isAlreadyIncluded = list.some(
        m => m.id === custom.id || (custom.url && m.url === custom.url) || m.title === custom.title
      );
      if (!isAlreadyIncluded) {
        // Infer chapter from topic
        let chNum = 1;
        const match = custom.topic?.match(/\b(\d+)\b/);
        if (match) chNum = parseInt(match[1], 10);

        const chConfig = MINDMAP_CHAPTER_CONFIGS.find(c => c.number === chNum) || MINDMAP_CHAPTER_CONFIGS[0];

        list.push({
          id: custom.id,
          chapterNumber: chNum,
          chapterRoman: chConfig.roman,
          chapterTitle: custom.topic || chConfig.title,
          title: custom.title,
          topic: custom.topic,
          filename: custom.url?.startsWith('/mindmaps/')
            ? custom.url.replace('/mindmaps/', '').split('?')[0]
            : `custom-${custom.id}.png`,
          description: custom.description || 'Sơ đồ tư duy Toán 10 được giáo viên bổ sung.',
          keyBranches: ['Kiến thức trọng tâm', 'Ví dụ vận dụng', 'Phương pháp giải toán'],
          highlights: ['Sơ đồ giáo viên biên soạn'],
          themeColor: {
            gradient: chConfig.gradient,
            badgeBg: 'bg-amber-50',
            badgeText: 'text-amber-800',
            border: 'border-amber-200',
            lightBg: 'bg-amber-50/40',
            accent: 'amber'
          },
          url: custom.url,
          thumbnailUrl: custom.thumbnailUrl || custom.url,
          driveUrl: custom.url?.includes('drive.google.com') ? custom.url : undefined
        });
      }
    });

    return list;
  }, [items]);

  // Card upload handler
  const handleCardUpload = async (mindmap: MindMapItem, file: File) => {
    try {
      const ext = (file.name.match(/\.(png|jpe?g|webp)$/i)?.[0] || '.png').toLowerCase();
      const baseName = mindmap.filename.replace(/\.[^/.]+$/, '');
      const targetFilename = `${baseName}${ext}`;

      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const res = await apiFetch('/api/upload-mindmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: targetFilename,
          mindmapId: mindmap.id,
          title: mindmap.title,
          topic: mindmap.topic,
          chapterNumber: mindmap.chapterNumber,
          base64Data
        })
      });

      if (res.ok) {
        const now = Date.now();
        setImageTimestamps(prev => ({
          ...prev,
          [mindmap.filename]: now,
          [targetFilename]: now,
          [baseName]: now
        }));
        setExistingFiles(prev => new Set([
          ...prev,
          targetFilename.toLowerCase(),
          mindmap.filename.toLowerCase(),
          baseName.toLowerCase()
        ]));
        if (onRefreshData) onRefreshData();
        showToast(`🎉 Đã tải lên và hiển thị ảnh sơ đồ tư duy của cô cho ${mindmap.chapterRoman}!`);
      } else {
        alert('Không thể lưu ảnh sơ đồ. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải ảnh sơ đồ lên.');
    }
  };

  // Filter mindmaps
  const filteredMindmaps = useMemo(() => {
    return mergedMindmaps.filter(item => {
      // Chapter filter
      if (selectedChapter !== 'ALL' && item.chapterNumber !== selectedChapter) {
        return false;
      }

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const fullContent = (
          item.title + ' ' +
          item.chapterRoman + ' ' +
          item.chapterTitle + ' ' +
          item.description + ' ' +
          item.topic + ' ' +
          item.filename + ' ' +
          item.keyBranches.join(' ')
        ).toLowerCase();
        if (!fullContent.includes(query)) return false;
      }

      return true;
    });
  }, [mergedMindmaps, selectedChapter, search]);

  // Group by chapter
  const groupedByChapter = useMemo(() => {
    const map = new Map<number, MindMapItem[]>();
    MINDMAP_CHAPTER_CONFIGS.forEach(ch => map.set(ch.number, []));

    filteredMindmaps.forEach(item => {
      const arr = map.get(item.chapterNumber) || [];
      arr.push(item);
      map.set(item.chapterNumber, arr);
    });

    return MINDMAP_CHAPTER_CONFIGS.map(ch => ({
      config: ch,
      mindmaps: map.get(ch.number) || []
    })).filter(g => g.mindmaps.length > 0);
  }, [filteredMindmaps]);

  // Count uploaded files
  const uploadedCount = useMemo(() => {
    return mergedMindmaps.filter(m => {
      const fn = m.filename.toLowerCase();
      const base = fn.replace(/\.[^/.]+$/, '');
      const stripped = base.replace(/^sodotuduy_/i, '');
      return (
        existingFiles.has(fn) ||
        existingFiles.has(base) ||
        existingFiles.has(stripped) ||
        existingFiles.has(stripped + '.png') ||
        !m.isSample ||
        imageTimestamps[m.filename] !== undefined
      );
    }).length;
  }, [mergedMindmaps, existingFiles, imageTimestamps]);

  const handleOpenMindmap = (item: MindMapItem) => {
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onTrackActivity) onTrackActivity(item.id, item.title, 'mindmap');
          setSelectedMindmap(item);
        }, `Vui lòng ghi danh (Họ tên và Số điện thoại) để xem Sơ đồ tư duy "${item.title}"!`);
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    if (onTrackActivity) onTrackActivity(item.id, item.title, 'mindmap');
    setSelectedMindmap(item);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Registration Requirement Warning Banner */}
      {!currentUser && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500 text-white font-extrabold text-sm shrink-0">
              🔒 Bắt buộc
            </span>
            <div className="text-xs sm:text-sm">
              <strong>Người dùng phải Ghi danh mới bấm xem được các Sơ đồ tư duy!</strong> Nhập Họ tên và Số điện thoại để mở khóa toàn bộ sơ đồ trực quan.
            </div>
          </div>
          <button
            onClick={onOpenRegister}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs whitespace-nowrap"
          >
            ✍️ Ghi danh / Đăng nhập ngay
          </button>
        </div>
      )}

      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-700 transition-colors group cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại Trang chủ</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Batch upload button */}
          <button
            onClick={() => setIsBatchUploaderOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Tải lên và đồng bộ nhiều ảnh sơ đồ tư duy cùng lúc"
          >
            <FolderUp className="w-4 h-4 text-amber-600" />
            <span>Đồng bộ nhiều ảnh (Batch)</span>
          </button>

          {/* Refresh files status */}
          <button
            onClick={checkServerFiles}
            disabled={isCheckingFiles}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            title="Làm mới trạng thái tệp trên máy chủ"
          >
            <RefreshCw className={`w-4 h-4 ${isCheckingFiles ? 'animate-spin text-amber-600' : ''}`} />
          </button>

          {isAdmin && (
            <button
              onClick={() => onOpenAdmin('mindmaps')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-amber-700 transition-colors w-fit cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm Sơ đồ tư duy (GV)</span>
            </button>
          )}
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 shadow-xs flex-shrink-0">
            <MindMap3DIcon className="w-14 h-14 sm:w-16 sm:h-16" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wide">
                Chuyên mục Sơ Đồ Tư Duy
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đầy đủ {MINDMAP_CHAPTER_CONFIGS.length} Chương Toán 10
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sơ Đồ Tư Duy Toán 10 Theo Từng Chương
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Hệ thống hóa toàn bộ các chương trình Toán lớp 10 bằng sơ đồ liên kết phân nhánh, hiển thị trực quan từng ảnh theo từng mục bài học, hỗ trợ cô tải và thay ảnh trực tiếp từ máy tính.
            </p>
          </div>
        </div>

        {/* Status card */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[240px]">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Ảnh sơ đồ của cô</span>
              <span className="text-amber-700 font-extrabold">{uploadedCount}/{mergedMindmaps.length} tệp</span>
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((uploadedCount / Math.max(1, mergedMindmaps.length)) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-amber-800/80 mt-2">
              💡 Cô có thể nhấn nút <strong className="font-semibold">"Tải / Thay ảnh"</strong> ngay trên từng thẻ sơ đồ để cập nhật ảnh của mình.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="my-6 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sơ đồ, chương, kiến thức nhánh..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                onClick={() => setViewMode('by-chapter')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'by-chapter'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Theo từng mục (Chương)</span>
              </button>
              <button
                onClick={() => setViewMode('all-list')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'all-list'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Tất cả lưới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedChapter('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedChapter === 'ALL'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Tất cả ({mergedMindmaps.length})
          </button>
          {MINDMAP_CHAPTER_CONFIGS.map(ch => {
            const count = mergedMindmaps.filter(m => m.chapterNumber === ch.number).length;
            const isSelected = selectedChapter === ch.number;
            return (
              <button
                key={ch.number}
                onClick={() => setSelectedChapter(ch.number)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{ch.roman}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Display by Chapter or Grid */}
      {filteredMindmaps.length > 0 ? (
        viewMode === 'by-chapter' ? (
          <div className="space-y-12">
            {groupedByChapter.map(({ config, mindmaps }) => (
              <div key={config.number} className="space-y-5">
                {/* Chapter Section Header */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${config.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs`}>
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-900 font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      {config.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${config.accentText}`}>
                          {config.roman}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-500">
                          {config.badge}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {config.title}
                      </h2>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-slate-600 sm:text-right max-w-md">
                    {config.description}
                  </div>
                </div>

                {/* Grid of Mindmap Cards for this Chapter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mindmaps.map((mm) => (
                    <MindMapCard
                      key={mm.id}
                      mindmap={mm}
                      existingFiles={existingFiles}
                      imageTimestamp={imageTimestamps[mm.filename]}
                      onOpenModal={() => handleOpenMindmap(mm)}
                      onUploadFile={(file) => handleCardUpload(mm, file)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMindmaps.map((mm) => (
              <MindMapCard
                key={mm.id}
                mindmap={mm}
                existingFiles={existingFiles}
                imageTimestamp={imageTimestamps[mm.filename]}
                onOpenModal={() => handleOpenMindmap(mm)}
                onUploadFile={(file) => handleCardUpload(mm, file)}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Network className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {search ? 'Không tìm thấy sơ đồ tư duy phù hợp' : 'Chuyên mục đang được cập nhật'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
            {search
              ? 'Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.'
              : 'Cô có thể tải lên sơ đồ tư duy bằng nút "Đồng bộ nhiều ảnh" hoặc "Thêm sơ đồ tư duy".'}
          </p>
          <button
            onClick={() => setIsBatchUploaderOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors cursor-pointer"
          >
            Tải ảnh sơ đồ tư duy ngay
          </button>
        </div>
      )}

      {/* High-res Mind Map Modal */}
      {selectedMindmap && (
        <MindMapModal
          mindmap={selectedMindmap}
          allMindmaps={mergedMindmaps}
          isOpen={!!selectedMindmap}
          onClose={() => setSelectedMindmap(null)}
          onSelectMindMap={setSelectedMindmap}
          onUploadSuccess={(filename) => {
            const now = Date.now();
            setImageTimestamps(prev => ({ ...prev, [filename]: now }));
            setExistingFiles(prev => new Set([...prev, filename.toLowerCase()]));
          }}
        />
      )}

      {/* Batch Uploader Modal */}
      <BatchMindMapUploader
        isOpen={isBatchUploaderOpen}
        onClose={() => setIsBatchUploaderOpen(false)}
        existingFiles={existingFiles}
        onUploadCompleted={(updatedFilenames) => {
          const now = Date.now();
          const newTimestamps = { ...imageTimestamps };
          const newFiles = new Set(existingFiles);
          updatedFilenames.forEach(fn => {
            newTimestamps[fn] = now;
            newFiles.add(fn.toLowerCase());
            newFiles.add(fn.replace(/\.[^/.]+$/, '').toLowerCase());
          });
          setImageTimestamps(newTimestamps);
          setExistingFiles(newFiles);
          if (onRefreshData) onRefreshData();
          showToast(`🎉 Đã đồng bộ thành công ${updatedFilenames.length} ảnh sơ đồ tư duy của cô!`);
        }}
      />
    </div>
  );
};

// ==================== MIND MAP CARD COMPONENT ====================
interface MindMapCardProps {
  mindmap: MindMapItem;
  existingFiles: Set<string>;
  imageTimestamp?: number;
  onOpenModal: () => void;
  onUploadFile: (file: File) => void;
}

const MindMapCard: React.FC<MindMapCardProps> = ({
  mindmap,
  existingFiles,
  imageTimestamp,
  onOpenModal,
  onUploadFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const baseName = mindmap.filename.replace(/\.[^/.]+$/, '').toLowerCase();
  const stripped = baseName.replace(/^sodotuduy_/i, '');
  const isUploadedOnDisk =
    existingFiles.has(mindmap.filename.toLowerCase()) ||
    existingFiles.has(baseName) ||
    existingFiles.has(stripped) ||
    existingFiles.has(stripped + '.png') ||
    !mindmap.isSample ||
    !!imageTimestamp;

  const imageUrl = useMemo(() => {
    const t = imageTimestamp || 0;
    if (mindmap.thumbnailUrl?.startsWith('/mindmaps/') || mindmap.thumbnailUrl?.startsWith('data:image')) {
      return `${mindmap.thumbnailUrl}${mindmap.thumbnailUrl.includes('?') ? '&' : '?'}t=${t}`;
    }
    if (mindmap.url?.startsWith('/mindmaps/') && !mindmap.url.endsWith('.html')) {
      return `${mindmap.url}${mindmap.url.includes('?') ? '&' : '?'}t=${t}`;
    }
    return `/mindmaps/${stripped}.svg?t=${t}`;
  }, [mindmap.filename, mindmap.url, mindmap.thumbnailUrl, stripped, imageTimestamp]);

  const fallbackDataUri = useMemo(() => {
    try {
      const svg = generateMindMapSvg(mindmap);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    } catch {
      return '';
    }
  }, [mindmap]);

  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  useEffect(() => {
    setCurrentSrc(imageUrl);
    setImageError(false);
  }, [imageUrl]);

  const handleImageError = () => {
    if (!imageError && fallbackDataUri) {
      setImageError(true);
      setCurrentSrc(fallbackDataUri);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh (.png, .jpg, .jpeg, .webp).');
      return;
    }

    setIsUploading(true);
    try {
      await onUploadFile(file);
      setImageError(false);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Card Image Thumbnail */}
        <div
          onClick={onOpenModal}
          className="relative aspect-video w-full bg-slate-900 cursor-pointer overflow-hidden border-b border-slate-100 flex items-center justify-center group-hover:brightness-95 transition-all"
        >
          <img
            src={currentSrc}
            alt={mindmap.title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay hover badge */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span>Phóng to xem</span>
            </span>
          </div>

          {/* Chapter badge top-left */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-lg text-[11px] font-bold shadow-xs ${mindmap.themeColor.badgeBg} ${mindmap.themeColor.badgeText}`}>
              {mindmap.chapterRoman}
            </span>
          </div>

          {/* Uploaded Indicator badge top-right */}
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-600/95 text-white shadow-md flex items-center gap-1.5 backdrop-blur-md border border-amber-400/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Sơ đồ số GDPT 2018</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold mb-2">
            <Network className="w-3.5 h-3.5 text-amber-600" />
            <span className="truncate">{mindmap.topic}</span>
          </div>

          <h3
            onClick={onOpenModal}
            className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {mindmap.title}
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {mindmap.description}
          </p>

          {/* Branches pills */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {mindmap.keyBranches.slice(0, 3).map((branch, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-medium truncate max-w-[200px] border border-amber-100"
                title={branch}
              >
                • {branch}
              </span>
            ))}
            {mindmap.keyBranches.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-semibold">
                +{mindmap.keyBranches.length - 3} nhánh
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Open Modal Button */}
        <button
          onClick={onOpenModal}
          className="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
        >
          <Monitor className="w-4 h-4 text-amber-200 group-hover/btn:scale-110 transition-transform" />
          <span>Mở Sơ đồ tư duy</span>
        </button>

        {/* Quick Open in New Tab Button */}
        <a
          href={mindmap.htmlUrl || `/mindmaps/${stripped}.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors shadow-2xs flex items-center justify-center"
          title="Mở toàn bộ sơ đồ trên tab mới"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Quick Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors shadow-2xs flex items-center justify-center cursor-pointer disabled:opacity-60"
          title="Tải ảnh sơ đồ tư duy của cô cho bài này từ máy tính"
        >
          <Upload className={`w-4 h-4 ${isUploading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
