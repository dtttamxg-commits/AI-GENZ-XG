import { apiFetch } from '../services/request';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCw, Download, Printer,
  ChevronLeft, ChevronRight, ExternalLink, Sparkles, BookOpen,
  Upload, CheckCircle, Info, Image as ImageIcon, RefreshCw, Network,
  Monitor, CheckCircle2, ShieldCheck, Layers
} from 'lucide-react';
import { MindMapItem } from '../data/mindmapsData';
import { generateMindMapSvg } from '../data/mindmapSvgTemplates';

interface MindMapModalProps {
  mindmap: MindMapItem;
  allMindmaps: MindMapItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectMindMap: (item: MindMapItem) => void;
  onUploadSuccess?: (filename: string) => void;
}

export const MindMapModal: React.FC<MindMapModalProps> = ({
  mindmap,
  allMindmaps,
  isOpen,
  onClose,
  onSelectMindMap,
  onUploadSuccess
}) => {
  const [scale, setScale] = useState(1);
  const [isFitMode, setIsFitMode] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'web' | 'image' | 'branches'>('web');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 900, height: 700 });

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseName = mindmap.filename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
  const htmlUrl = mindmap.htmlUrl || ((mindmap as any).url?.endsWith('.html') ? (mindmap as any).url : `/mindmaps/${baseName}.html`);
  const [imgSrc, setImgSrc] = useState(`/mindmaps/${baseName}.svg?t=${Date.now()}`);

  const fallbackDataUri = useMemo(() => {
    try {
      const svg = generateMindMapSvg(mindmap);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    } catch {
      return '';
    }
  }, [mindmap]);

  const currentIndex = allMindmaps.findIndex(m => m.id === mindmap.id);
  const prevMindmap = currentIndex > 0 ? allMindmaps[currentIndex - 1] : null;
  const nextMindmap = currentIndex < allMindmaps.length - 1 ? allMindmaps[currentIndex + 1] : null;

  // Measure container dimensions for optimal auto-fit
  useEffect(() => {
    if (!isOpen) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setContainerSize({ width: rect.width, height: rect.height });
        }
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 100);
    window.addEventListener('resize', updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSize);
    };
  }, [isOpen, activeTab, isFullscreen]);

  // Optimal Fit Scale Calculation (Mind Map Canvas is 1600 x 1050)
  const fitScale = useMemo(() => {
    const padX = 32;
    const padY = 32;
    const availW = Math.max(300, containerSize.width - padX);
    const availH = Math.max(400, containerSize.height - padY);
    const s = Math.min(availW / 1600, availH / 1050);
    return Math.max(0.25, Math.min(s, 1.4));
  }, [containerSize]);

  const effectiveScale = isFitMode ? fitScale : scale;

  // Reset controls when mindmap changes
  useEffect(() => {
    setScale(1);
    setIsFitMode(true);
    setRotation(0);
    setImageLoaded(false);
    setImageError(false);
    setActiveTab('web');
    setUploadSuccessMsg('');
    const now = Date.now();
    setImgSrc(`/mindmaps/${baseName}.svg?t=${now}`);
  }, [mindmap.id, mindmap.filename, baseName]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && prevMindmap) {
        onSelectMindMap(prevMindmap);
      } else if (e.key === 'ArrowRight' && nextMindmap) {
        onSelectMindMap(nextMindmap);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, prevMindmap, nextMindmap, onSelectMindMap, onClose, isFullscreen]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setIsFitMode(false);
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setIsFitMode(false);
    setScale(prev => Math.max(prev - 0.2, 0.4));
  };

  const handleResetFit = () => {
    setIsFitMode(true);
    setScale(1);
    setRotation(0);
  };

  const handleActualSize = () => {
    setIsFitMode(false);
    setScale(1);
    setRotation(0);
  };

  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleImageError = () => {
    setImageError(true);
    if (fallbackDataUri) {
      setImgSrc(fallbackDataUri);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    if (activeTab === 'web') {
      link.href = htmlUrl;
      link.download = `${baseName}.html`;
    } else {
      link.href = imgSrc;
      link.download = `${baseName}.svg`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(htmlUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh (.png, .jpg, .jpeg, .webp).');
      return;
    }

    setIsUploading(true);
    setUploadSuccessMsg('');

    try {
      const ext = (file.name.match(/\.(png|jpe?g|webp)$/i)?.[0] || '.png').toLowerCase();
      const targetFilename = `${baseName}${ext}`;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
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
          setImgSrc(`/mindmaps/${targetFilename}?t=${now}`);
          setImageError(false);
          setImageLoaded(true);
          setUploadSuccessMsg('🎉 Đã tải lên và cập nhật ảnh sơ đồ tư duy thành công!');
          if (onUploadSuccess) {
            onUploadSuccess(targetFilename);
          }
          setTimeout(() => setUploadSuccessMsg(''), 4500);
        } else {
          alert('Không thể lưu ảnh sơ đồ tư duy trên máy chủ.');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải ảnh lên.');
      setIsUploading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md ${isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'} animate-in fade-in duration-200`}>
      <div className={`bg-slate-900 w-full ${isFullscreen ? 'h-full rounded-none' : 'max-w-6xl h-[94vh] rounded-3xl'} shadow-2xl flex flex-col overflow-hidden border border-slate-700/80`}>
        
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${mindmap.themeColor.badgeBg} ${mindmap.themeColor.badgeText} shadow-xs`}>
              {mindmap.baiCode || mindmap.chapterRoman}
            </span>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold text-white truncate flex items-center gap-2">
                <span>{mindmap.title}</span>
              </h2>
              <p className="text-xs text-slate-400 truncate hidden sm:block">
                {mindmap.topic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Open full page in new tab */}
            <a
              href={htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Mở toàn bộ sơ đồ tư duy trên tab trình duyệt riêng"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mở tab mới</span>
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Xem toàn màn hình'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload feedback banner */}
        {uploadSuccessMsg && (
          <div className="bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 flex items-center justify-between animate-in slide-in-from-top-2">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              {uploadSuccessMsg}
            </span>
            <button onClick={() => setUploadSuccessMsg('')} className="text-emerald-200 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Toolbar & View Tabs */}
        <div className="px-4 sm:px-6 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 text-xs text-slate-300">
          {/* Main View Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Mở trực tiếp trên web</span>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Xem dạng ảnh</span>
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'branches'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Nhánh tư duy ({mindmap.keyBranches.length})</span>
            </button>
          </div>

          {/* Interactive Zoom & Display Controls */}
          {(activeTab === 'web' || activeTab === 'image') && (
            <div className="flex items-center gap-1 text-slate-300">
              {/* Fit Mode Button */}
              <button
                onClick={handleResetFit}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  isFitMode
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
                title="Tự động thu phóng vừa vặn toàn bộ ảnh trong màn hình"
              >
                <span>Vừa màn hình</span>
                {isFitMode && <span className="text-[10px]">({Math.round(fitScale * 100)}%)</span>}
              </button>

              {/* 100% Size Button */}
              <button
                onClick={handleActualSize}
                className={`px-2 py-1.5 rounded-lg hover:bg-slate-800 font-bold text-xs cursor-pointer ${
                  !isFitMode && scale === 1 ? 'text-amber-400' : 'text-slate-300'
                }`}
                title="Kích thước gốc (100%)"
              >
                100%
              </button>

              {/* Zoom Buttons */}
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {activeTab === 'image' && (
                <button
                  onClick={handleRotate}
                  className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                  title="Xoay 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              )}

              <span className="w-px h-4 bg-slate-700 mx-1" />

              {/* Download & Print */}
              <button
                onClick={handleDownload}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Tải tệp về máy tính"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải về</span>
              </button>
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                title="In sơ đồ"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-auto bg-slate-950 flex items-center justify-center p-2 sm:p-4 select-none"
        >
          {activeTab === 'web' ? (
            /* Direct Web View Mode (Iframe with Full-Scale Auto-Fit to prevent cutoff) */
            <div className="w-full h-full overflow-auto flex items-center justify-center relative">
              <div
                style={{
                  width: Math.round(1600 * effectiveScale),
                  height: Math.round(1050 * effectiveScale),
                  transition: 'width 0.15s ease-out, height 0.15s ease-out'
                }}
                className="relative flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-700/60"
              >
                <iframe
                  src={(mindmap as any).htmlContent ? undefined : htmlUrl}
                  srcDoc={(mindmap as any).htmlContent || undefined}
                  title={mindmap.title}
                  style={{
                    width: 1600,
                    height: 1050,
                    transform: `scale(${effectiveScale})`,
                    transformOrigin: 'top left'
                  }}
                  className="border-0 bg-white"
                />
              </div>

              {/* Indicator badge */}
              <div className="absolute bottom-3 right-4 z-10 pointer-events-none hidden sm:block">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-amber-400 backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sơ đồ tư duy số tương tác mở trực tiếp trên web</span>
                </span>
              </div>
            </div>
          ) : activeTab === 'image' ? (
            /* Full Image View Mode */
            <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
              <div
                style={{
                  transform: `scale(${effectiveScale}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.15s ease-out'
                }}
                className="max-w-full max-h-full flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={imgSrc}
                  alt={mindmap.title}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                  className="max-w-none max-h-[82vh] object-contain rounded-xl shadow-2xl bg-white select-none pointer-events-auto"
                />
              </div>
            </div>
          ) : (
            /* Branches Breakdown Mode */
            <div className="w-full h-full bg-slate-900 text-slate-100 overflow-y-auto p-6 sm:p-10">
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                    {mindmap.chapterRoman}: {mindmap.chapterTitle}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {mindmap.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {mindmap.description}
                  </p>
                </div>

                <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <Network className="w-4 h-4 text-amber-400" />
                    <span>Các nhánh phân nhánh tư duy trọng tâm</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mindmap.keyBranches.map((branch, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                          {branch}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {mindmap.highlights && mindmap.highlights.length > 0 && (
                  <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 shadow-lg">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Điểm nhấn kiến thức và mẹo giải nhanh</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mindmap.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-slate-900/80 text-amber-200 text-xs font-medium border border-slate-700"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {prevMindmap && (
            <button
              onClick={() => onSelectMindMap(prevMindmap)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white shadow-xl transition-transform hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center border border-slate-700"
              title={`Xem ${prevMindmap.baiCode || prevMindmap.chapterRoman}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {nextMindmap && (
            <button
              onClick={() => onSelectMindMap(nextMindmap)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white shadow-xl transition-transform hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center border border-slate-700"
              title={`Xem ${nextMindmap.baiCode || nextMindmap.chapterRoman}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
