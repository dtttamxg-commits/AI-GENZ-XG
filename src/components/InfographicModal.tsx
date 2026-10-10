import { apiFetch } from '../services/request';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X, ZoomIn, ZoomOut, Maximize2, RotateCw, Download, Printer,
  ChevronLeft, ChevronRight, ExternalLink, Sparkles, BookOpen,
  Upload, CheckCircle, Info, Image as ImageIcon, RefreshCw
} from 'lucide-react';
import { InfographicLesson } from '../data/infographicsData';
import { generateInfographicSvg } from '../data/infographicSvgTemplates';

interface InfographicModalProps {
  lesson: InfographicLesson;
  allLessons: InfographicLesson[];
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: InfographicLesson) => void;
  onUploadSuccess?: (filename: string) => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({
  lesson,
  allLessons,
  isOpen,
  onClose,
  onSelectLesson,
  onUploadSuccess
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'web' | 'image' | 'summary'>('web');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [imageVersion, setImageVersion] = useState(() => Date.now());
  const [isFitMode, setIsFitMode] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 900, height: 700 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(`/infographics/${lesson.filename}?t=${Date.now()}`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseName = lesson.filename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
  const htmlUrl = (lesson as any).htmlUrl || ((lesson as any).url?.endsWith('.html') ? (lesson as any).url : `/infographics/${baseName}.html`);

  const fallbackDataUri = useMemo(() => {
    try {
      const svg = generateInfographicSvg(lesson);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    } catch {
      return '';
    }
  }, [lesson]);

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

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
  }, [isOpen, activeTab]);

  // Optimal Fit Scale Calculation (A4 Canvas is 794 x 1123)
  const fitScale = useMemo(() => {
    const padX = 32;
    const padY = 32;
    const availW = Math.max(300, containerSize.width - padX);
    const availH = Math.max(400, containerSize.height - padY);
    const s = Math.min(availW / 794, availH / 1123);
    return Math.max(0.35, Math.min(s, 1.25));
  }, [containerSize]);

  const effectiveScale = isFitMode ? fitScale : scale;

  // Reset controls when lesson changes
  useEffect(() => {
    setScale(1);
    setIsFitMode(true);
    setRotation(0);
    setImageLoaded(false);
    setImageError(false);
    setActiveTab('web');
    setUploadSuccessMsg('');
    const now = Date.now();
    setImageVersion(now);
    setImgSrc(`/infographics/${lesson.filename}?t=${now}`);
  }, [lesson.id, lesson.filename]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && prevLesson) {
        onSelectLesson(prevLesson);
      } else if (e.key === 'ArrowRight' && nextLesson) {
        onSelectLesson(nextLesson);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, prevLesson, nextLesson, onSelectLesson, onClose]);

  if (!isOpen) return null;

  const imageUrl = `/infographics/${lesson.filename}?t=${imageVersion}`;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = lesson.filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccessMsg('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await apiFetch('/api/upload-infographic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: lesson.filename,
            lessonId: lesson.id,
            base64Data
          })
        });

        if (res.ok) {
          const now = Date.now();
          setImageVersion(now);
          setImgSrc(base64Data);
          setImageError(false);
          setImageLoaded(true);
          setUploadSuccessMsg(`🎉 Đã tải lên và lưu thành công ảnh của cô cho ${lesson.baiCode}!`);
          if (onUploadSuccess) onUploadSuccess(lesson.filename);
        } else {
          alert('Không thể lưu tệp hình ảnh. Vui lòng thử lại.');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert('Có lỗi khi tải tệp ảnh.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4">
      {/* Container */}
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Top Header Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase shadow-xs ${
              lesson.isReview ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {lesson.baiCode}
            </span>

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-2">
                <span>{lesson.title}</span>
              </h2>
              <p className="text-xs text-slate-400 truncate">
                {lesson.chapterRoman}: {lesson.chapterTitle} • Tệp: <span className="font-mono text-slate-300">{lesson.filename}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Tab Switch */}
            <div className="hidden sm:flex items-center bg-slate-700/60 p-0.5 rounded-xl border border-slate-600/60 text-xs mr-2">
              <button
                onClick={() => setActiveTab('web')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'web' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Mở trực tiếp trên web
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'image' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Dạng ảnh / Poster
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'summary' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Công thức cốt lõi
              </button>
            </div>

            <a
              href={activeTab === 'web' ? htmlUrl : imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Mở toàn màn hình trên tab mới của trình duyệt"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mở tab mới</span>
            </a>

            <button
              onClick={handleDownload}
              title="Tải ảnh về máy"
              className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              title="In tài liệu"
              className="p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer hidden md:flex"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              title="Đóng (Esc)"
              className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Zoom / Pan Controls (Image mode) */}
        {activeTab === 'image' && (
          <div className="bg-slate-800/80 border-b border-slate-700/60 px-4 py-2 flex items-center justify-between text-xs text-slate-300 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">Điều khiển xem:</span>
              <button
                onClick={handleZoomIn}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" /> Phóng to (+25%)
              </button>
              <button
                onClick={handleZoomOut}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" /> Thu nhỏ (-25%)
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg cursor-pointer"
              >
                Chuẩn ({Math.round(scale * 100)}%)
              </button>
              <button
                onClick={handleRotate}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" /> Xoay 90°
              </button>
            </div>

            {/* Quick Upload / Replace Button */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 font-bold text-xs transition-colors cursor-pointer shadow-xs border border-emerald-400/40"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang lưu ảnh...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>📸 Tải / Thay ảnh của cô (PNG, JPG)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto bg-slate-950 p-2 sm:p-4 flex items-center justify-center relative select-none"
        >
          {uploadSuccessMsg && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-emerald-600/90 text-white text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
              <CheckCircle className="w-4 h-4" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          {activeTab === 'web' ? (
            /* Interactive Web View Mode (Scaled Auto-Fit to prevent cutoff) */
            <div className="w-full h-full overflow-auto flex items-center justify-center relative">
              <div
                style={{
                  width: Math.round(794 * effectiveScale),
                  height: Math.round(1123 * effectiveScale),
                  transition: 'width 0.15s ease-out, height 0.15s ease-out'
                }}
                className="relative flex-shrink-0 shadow-2xl rounded-2xl overflow-hidden bg-white border border-slate-700/60"
              >
                <iframe
                  src={(lesson as any).htmlContent ? undefined : htmlUrl}
                  srcDoc={(lesson as any).htmlContent || undefined}
                  title={lesson.title}
                  style={{
                    width: 794,
                    height: 1123,
                    transform: `scale(${effectiveScale})`,
                    transformOrigin: 'top left'
                  }}
                  className="border-0 bg-white"
                />
              </div>
              <div className="absolute bottom-3 right-4 z-10 pointer-events-none hidden sm:block">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-emerald-400 backdrop-blur-md border border-slate-700/80 shadow-lg">
                  ⚡ Infographic số tương tác mở trực tiếp trên web
                </span>
              </div>
            </div>
          ) : activeTab === 'image' ? (
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
              {!imageError ? (
                <div
                  className="transition-transform duration-150 origin-center max-w-full max-h-full flex items-center justify-center"
                  style={{
                    transform: `scale(${scale}) rotate(${rotation}deg)`
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={lesson.title}
                    title="Bấm vào ảnh để phóng to / thu nhỏ"
                    onClick={() => setScale(prev => prev === 1 ? 1.5 : 1)}
                    onLoad={() => {
                      setImageLoaded(true);
                      setImageError(false);
                    }}
                    onError={() => {
                      if (imgSrc !== fallbackDataUri && fallbackDataUri) {
                        setImgSrc(fallbackDataUri);
                      } else {
                        setImageError(true);
                        setImageLoaded(false);
                      }
                    }}
                    className={`max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl transition-all duration-200 border border-slate-800 ${
                      scale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                    } ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
                      <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                      <p className="text-sm">Đang tải bản đồ Infographic...</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback Rich Vector Infographic Poster if image file is not on disk yet */
                <div className="max-w-3xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                    {lesson.baiCode} • {lesson.chapterRoman}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
                    {lesson.description}
                  </p>

                  {/* Key Formulas Box */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 sm:p-5 mb-6 text-left">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Kiến thức & Công thức trọng tâm của bài:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {lesson.keyFormulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-900 border border-slate-700/70 px-3 py-2 rounded-lg text-xs font-mono text-emerald-200 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{formula}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload helper */}
                  <div className="bg-slate-800/80 border border-dashed border-emerald-500/50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left text-xs text-slate-300">
                      <p className="font-semibold text-white">Chưa lưu tệp hình ảnh {lesson.filename} trên máy chủ?</p>
                      <p className="text-slate-400 mt-0.5">Bạn có thể tải tệp hình ảnh từ máy tính để hiển thị đồ họa gốc ngay lập tức.</p>
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isUploading ? 'Đang lưu...' : `Tải lên tệp ${lesson.filename}`}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Formula & Summary Tab */
            <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 overflow-auto max-h-full">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Bảng Tra Cứu Công Thức & Kiến Thức Cốt Lõi</h3>
                  <p className="text-xs text-slate-400">{lesson.title} ({lesson.chapterRoman}: {lesson.chapterTitle})</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Tóm tắt nội dung bài học</h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {lesson.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Hệ thống công thức then chốt</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.keyFormulas.map((f, i) => (
                      <div key={i} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <code className="text-xs font-semibold text-slate-100 font-mono mt-0.5">{f}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Kỹ năng & Lưu ý trọng tâm</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-4 py-3 bg-slate-800/90 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div>
            {prevLesson ? (
              <button
                onClick={() => onSelectLesson(prevLesson)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Bài trước:</span>
                <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{prevLesson.baiCode}</span>
              </button>
            ) : (
              <div />
            )}
          </div>

          <div className="text-center font-medium text-slate-300">
            Bài {currentIndex + 1} / {allLessons.length}
          </div>

          <div>
            {nextLesson ? (
              <button
                onClick={() => onSelectLesson(nextLesson)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Bài sau:</span>
                <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-xs">{nextLesson.baiCode}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
