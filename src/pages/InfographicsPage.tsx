import { apiFetch } from '../services/request';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft, Search, Filter, ExternalLink, PlusCircle, FileText,
  Image as ImageIcon, Sparkles, BookOpen, Layers, LayoutGrid,
  CheckCircle2, FolderUp, RefreshCw, Dices, ChevronRight,
  Maximize2, Eye, Download, Info, Upload
} from 'lucide-react';
import { LearningItem, WebUser } from '../types';
import { Infographic3DIcon } from '../components/Math3DIcons';
import {
  ALL_36_INFOGRAPHICS,
  CHAPTER_CONFIGS,
  InfographicLesson
} from '../data/infographicsData';
import { generateInfographicSvg } from '../data/infographicSvgTemplates';
import { InfographicModal } from '../components/InfographicModal';
import { BatchInfographicUploader } from '../components/BatchInfographicUploader';

interface InfographicsPageProps {
  items: LearningItem[];
  onBack: () => void;
  isAdmin: boolean;
  onOpenAdmin: (category: string) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  requireRegistration?: (action: () => void, message?: string) => boolean;
  onTrackActivity?: (itemId: string, itemTitle: string, category: string) => void;
}

export const InfographicsPage: React.FC<InfographicsPageProps> = ({
  items,
  onBack,
  isAdmin,
  onOpenAdmin,
  currentUser,
  onOpenRegister,
  requireRegistration,
  onTrackActivity
}) => {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'ALL'>('ALL');
  const [lessonTypeFilter, setLessonTypeFilter] = useState<'all' | 'lessons' | 'reviews'>('all');
  const [viewMode, setViewMode] = useState<'by-chapter' | 'all-list' | 'matrix'>('by-chapter');
  
  // Modal state
  const [selectedLesson, setSelectedLesson] = useState<InfographicLesson | null>(null);
  const [isBatchUploaderOpen, setIsBatchUploaderOpen] = useState(false);
  
  // Status of files on disk
  const [existingFiles, setExistingFiles] = useState<Set<string>>(new Set());
  const [isCheckingFiles, setIsCheckingFiles] = useState(false);
  const [imageTimestamps, setImageTimestamps] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Check which infographic files exist on disk
  const checkServerFiles = async () => {
    setIsCheckingFiles(true);
    try {
      const res = await apiFetch('/api/infographics/status');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.files)) {
          setExistingFiles(new Set(data.files.map((f: string) => f.toLowerCase())));
        }
      }
    } catch (err) {
      console.warn('Could not check infographics status:', err);
    } finally {
      setIsCheckingFiles(false);
    }
  };

  useEffect(() => {
    checkServerFiles();
  }, []);

  const handleCardUpload = async (lesson: InfographicLesson, file: File) => {
    try {
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

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
        setImageTimestamps(prev => ({ ...prev, [lesson.filename]: now }));
        setExistingFiles(prev => new Set([...prev, lesson.filename.toLowerCase()]));
        showToast(`🎉 Đã tải lên và hiển thị ảnh của cô cho ${lesson.baiCode}!`);
      } else {
        alert('Không thể lưu ảnh. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải ảnh lên.');
    }
  };

  // Merge standard 36 infographics with custom ones added via Admin
  const mergedLessons: InfographicLesson[] = useMemo(() => {
    const storeInfographics = items.filter(item => item.type === 'infographic');
    
    // Map standard infographics, merging any store updates (e.g. updated url, description)
    const list: InfographicLesson[] = ALL_36_INFOGRAPHICS.map(std => {
      const foundInStore = storeInfographics.find(
        si => si.id === std.id || (si.url && si.url.includes(std.filename)) || si.title === std.title
      );
      if (foundInStore) {
        return {
          ...std,
          url: foundInStore.url,
          htmlContent: foundInStore.htmlContent,
          description: foundInStore.description || std.description
        } as any;
      }
      return std;
    });

    // Also include any custom infographics added by teacher
    storeInfographics.forEach(custom => {
      const isAlreadyIncluded = list.some(
        l => l.id === custom.id || (custom.url && l.filename && custom.url.includes(l.filename)) || l.title === custom.title
      );
      if (!isAlreadyIncluded) {
        let chNum = 1;
        const match = custom.topic?.match(/\b(\d+)\b/);
        if (match) chNum = parseInt(match[1], 10);
        if (chNum < 1 || chNum > 9) chNum = 1;

        const chConfig = CHAPTER_CONFIGS.find(c => c.number === chNum) || CHAPTER_CONFIGS[0];
        const isHtml = Boolean(custom.htmlContent || custom.url?.endsWith('.html'));

        list.push({
          id: custom.id,
          baiCode: isHtml ? 'HTML Tương tác' : 'Bổ sung',
          lessonNumber: null,
          isReview: false,
          chapterNumber: chNum,
          chapterRoman: chConfig.roman,
          chapterTitle: custom.topic || chConfig.title,
          title: custom.title,
          shortTitle: custom.title,
          filename: custom.url?.startsWith('/infographics/')
            ? custom.url.replace('/infographics/', '').split('?')[0]
            : `custom-${custom.id}.${isHtml ? 'html' : 'png'}`,
          description: custom.description || 'Infographic Toán 10 được giáo viên bổ sung.',
          keyFormulas: ['Kiến thức trọng tâm bài học'],
          highlights: [isHtml ? 'Tệp HTML tương tác trực tiếp' : 'Tài liệu giáo viên biên soạn'],
          themeColor: {
            gradient: chConfig.gradient,
            badgeBg: 'bg-emerald-50',
            badgeText: 'text-emerald-800',
            border: 'border-emerald-200',
            lightBg: 'bg-emerald-50/40',
            accent: 'emerald'
          },
          url: custom.url,
          htmlContent: custom.htmlContent
        } as any);
      }
    });

    return list;
  }, [items]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return mergedLessons.filter(lesson => {
      // Chapter filter
      if (selectedChapter !== 'ALL' && lesson.chapterNumber !== selectedChapter) {
        return false;
      }

      // Lesson type filter
      if (lessonTypeFilter === 'lessons' && lesson.isReview) return false;
      if (lessonTypeFilter === 'reviews' && !lesson.isReview) return false;

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const fullContent = (
          lesson.title + ' ' +
          lesson.baiCode + ' ' +
          lesson.chapterTitle + ' ' +
          lesson.description + ' ' +
          lesson.filename + ' ' +
          lesson.keyFormulas.join(' ')
        ).toLowerCase();
        if (!fullContent.includes(query)) return false;
      }

      return true;
    });
  }, [mergedLessons, selectedChapter, lessonTypeFilter, search]);

  // Group by chapter
  const groupedByChapter = useMemo(() => {
    const map = new Map<number, InfographicLesson[]>();
    CHAPTER_CONFIGS.forEach(ch => map.set(ch.number, []));
    
    filteredLessons.forEach(lesson => {
      const arr = map.get(lesson.chapterNumber) || [];
      arr.push(lesson);
      map.set(lesson.chapterNumber, arr);
    });

    return CHAPTER_CONFIGS.map(ch => ({
      config: ch,
      lessons: map.get(ch.number) || []
    })).filter(g => g.lessons.length > 0);
  }, [filteredLessons]);

  const handleOpenLesson = (lesson: InfographicLesson) => {
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onTrackActivity) onTrackActivity(lesson.id, lesson.title, 'infographic');
          setSelectedLesson(lesson);
        }, `Vui lòng ghi danh (Họ tên và Số điện thoại) để xem Infographic bài học "${lesson.title}"!`);
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    if (onTrackActivity) onTrackActivity(lesson.id, lesson.title, 'infographic');
    setSelectedLesson(lesson);
  };

  const handleRandomLesson = () => {
    if (filteredLessons.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredLessons.length);
    handleOpenLesson(filteredLessons[randomIndex]);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Registration Requirement Warning Banner */}
      {!currentUser && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500 text-white font-extrabold text-sm shrink-0">
              🔒 Bắt buộc
            </span>
            <div className="text-xs sm:text-sm">
              <strong>Người dùng phải Ghi danh mới bấm xem được các Infographic!</strong> Nhập Họ tên và Số điện thoại để mở khóa toàn bộ học liệu hình ảnh.
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

      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors group cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại Trang chủ</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsBatchUploaderOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <FolderUp className="w-4 h-4 text-emerald-600" />
            <span>Đồng bộ 36 tệp PNG ({existingFiles.size}/36)</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => onOpenAdmin('infographics')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm mới (GV)</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-10 border border-emerald-500/30">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-emerald-100 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chương trình GDPT 2018 Toán lớp 10</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              KHO INFOGRAPHIC TOÁN 10
            </h1>
            <p className="text-base sm:text-lg text-emerald-100 font-medium mt-1">
              Bản Đồ Tri Thức Số – Hệ Thống Hóa Toàn Diện Theo Từng Bài Học
            </p>

            <p className="text-xs sm:text-sm text-emerald-50/90 mt-3 leading-relaxed">
              Trực quan hóa toàn bộ 27 bài học cốt lõi và 9 bài ôn tập tổng kết của 9 chương môn Toán 10.
              Học sinh dễ dàng ghi nhớ công thức, nắm vững phương pháp giải và chuẩn bị cho các bài kiểm tra.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 text-center">
                <span className="block text-xl sm:text-2xl font-black text-white">9</span>
                <span className="text-[11px] text-emerald-100">Chương học</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 text-center">
                <span className="block text-xl sm:text-2xl font-black text-white">27</span>
                <span className="text-[11px] text-emerald-100">Bài học SGK</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 text-center">
                <span className="block text-xl sm:text-2xl font-black text-white">9</span>
                <span className="text-[11px] text-emerald-100">Ôn tập chương</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 text-center">
                <span className="block text-xl sm:text-2xl font-black text-amber-300">36</span>
                <span className="text-[11px] text-emerald-100">Bản đồ số</span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Card on the Right */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 lg:w-80 shrink-0 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Khám phá thông minh</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 font-medium">Toán 10</span>
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed mb-4">
                Lựa chọn một bài học ngẫu nhiên để ôn luyện nhanh công thức và phương pháp giải trong 5 phút.
              </p>
            </div>

            <button
              onClick={handleRandomLesson}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Dices className="w-4 h-4 text-emerald-700" />
              <span>Học ngẫu nhiên một bài</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Selection Pill Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Lọc theo Chương học:
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Đang hiển thị {filteredLessons.length} / 36 Infographic
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedChapter('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedChapter === 'ALL'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Tất cả (36 bài)
          </button>

          {CHAPTER_CONFIGS.map(ch => {
            const count = ALL_36_INFOGRAPHICS.filter(l => l.chapterNumber === ch.number).length;
            const isSelected = selectedChapter === ch.number;
            return (
              <button
                key={ch.number}
                onClick={() => setSelectedChapter(ch.number)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? `${ch.accentBg} text-white shadow-md`
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{ch.roman}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Toolbar: Search, Type Filter & View Mode */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 mb-8 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên bài học (Bài 6, Vectơ, Parabol, Tổ hợp...)"
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filter by Type & View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type filter */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setLessonTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                lessonTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (36)
            </button>
            <button
              onClick={() => setLessonTypeFilter('lessons')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                lessonTypeFilter === 'lessons' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              27 Bài học
            </button>
            <button
              onClick={() => setLessonTypeFilter('reviews')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                lessonTypeFilter === 'reviews' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              9 Ôn tập
            </button>
          </div>

          {/* View mode toggle */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl text-xs border border-slate-200/60">
            <button
              onClick={() => setViewMode('by-chapter')}
              title="Xem theo từng Chương"
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'by-chapter' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Theo Chương</span>
            </button>
            <button
              onClick={() => setViewMode('all-list')}
              title="Xem danh sách liên tục"
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'all-list' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tất cả bài</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              title="Ma trận nút bấm nhanh"
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'matrix' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nút nhanh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredLessons.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Không tìm thấy bài học nào phù hợp</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Không có kết quả khớp với từ khóa "{search}". Bạn có thể thử tìm theo số bài (ví dụ: Bài 6) hoặc chủ đề (ví dụ: Vectơ).
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedChapter('ALL'); setLessonTypeFilter('all'); }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : viewMode === 'by-chapter' ? (
        /* MODE 1: GROUPED BY CHAPTER */
        <div className="space-y-12">
          {groupedByChapter.map(({ config, lessons }) => (
            <div key={config.number} className="relative">
              {/* Chapter Header */}
              <div className={`p-5 sm:p-6 rounded-2xl border ${config.headerBg} mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradient} text-white font-black text-lg flex items-center justify-center shadow-md shrink-0`}>
                    {config.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-extrabold uppercase tracking-wider ${config.accentText}`}>
                        {config.roman}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                        {config.badge}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                      {config.title}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-slate-600 bg-white/80 px-3.5 py-2 rounded-xl border border-slate-200/80">
                  <span>{lessons.length} Infographic bài học</span>
                </div>
              </div>

              {/* Lesson Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map(lesson => (
                  <InfographicCard
                    key={lesson.id}
                    lesson={lesson}
                    onOpen={() => handleOpenLesson(lesson)}
                    hasFileOnServer={existingFiles.has(lesson.filename.toLowerCase())}
                    timestamp={imageTimestamps[lesson.filename]}
                    onDirectUpload={(file) => handleCardUpload(lesson, file)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'all-list' ? (
        /* MODE 2: SEQUENTIAL LIST OF ALL 36 LESSONS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => (
            <InfographicCard
              key={lesson.id}
              lesson={lesson}
              onOpen={() => handleOpenLesson(lesson)}
              hasFileOnServer={existingFiles.has(lesson.filename.toLowerCase())}
              timestamp={imageTimestamps[lesson.filename]}
              onDirectUpload={(file) => handleCardUpload(lesson, file)}
            />
          ))}
        </div>
      ) : (
        /* MODE 3: COMPACT MATRIX / QUICK BUTTON LAUNCHPAD */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Ma Trận Nút Bấm Nhanh 36 Infographic</h3>
              <p className="text-xs text-slate-500 mt-0.5">Bấm một chạm vào bất kỳ bài học nào để phóng to Infographic trên toàn màn hình</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {filteredLessons.length} bài
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredLessons.map(lesson => {
              const hasFile = existingFiles.has(lesson.filename.toLowerCase());
              return (
                <button
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className={`group p-3.5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between h-32 ${
                    lesson.isReview
                      ? 'bg-amber-50/50 hover:bg-amber-50 border-amber-200 hover:border-amber-400'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        lesson.isReview ? 'bg-amber-200 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {lesson.baiCode}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${hasFile ? 'bg-emerald-500' : 'bg-slate-300'}`} title={hasFile ? 'Đã có tệp ảnh' : 'Chưa lưu tệp'} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 leading-snug">
                      {lesson.shortTitle}
                    </h4>
                  </div>

                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200/50">
                    <span className="truncate">{lesson.chapterRoman}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-extrabold animate-bounce border border-emerald-400/40">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Infographic Viewer Modal */}
      {selectedLesson && (
        <InfographicModal
          lesson={selectedLesson}
          allLessons={filteredLessons}
          isOpen={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onSelectLesson={(l) => setSelectedLesson(l)}
          onUploadSuccess={(filename) => {
            const now = Date.now();
            setImageTimestamps(prev => ({ ...prev, [filename]: now }));
            setExistingFiles(prev => new Set([...prev, filename.toLowerCase()]));
            showToast(`🎉 Đã cập nhật ảnh của cô cho ${selectedLesson.baiCode}!`);
          }}
        />
      )}

      {/* Batch Uploader Modal */}
      <BatchInfographicUploader
        isOpen={isBatchUploaderOpen}
        onClose={() => setIsBatchUploaderOpen(false)}
        onUploadCompleted={(updatedFilenames) => {
          const now = Date.now();
          setImageTimestamps(prev => {
            const next = { ...prev };
            updatedFilenames.forEach(f => { next[f] = now; });
            return next;
          });
          checkServerFiles();
          showToast(`🎉 Đã lưu thành công ${updatedFilenames.length} ảnh của cô vào hệ thống!`);
        }}
        existingFiles={existingFiles}
      />
    </div>
  );
};

/* --- SUB-COMPONENT: Individual Infographic Card --- */
interface InfographicCardProps {
  lesson: InfographicLesson;
  onOpen: () => void;
  hasFileOnServer: boolean;
  timestamp?: number;
  onDirectUpload?: (file: File) => Promise<void> | void;
}

const InfographicCard: React.FC<InfographicCardProps> = ({
  lesson,
  onOpen,
  hasFileOnServer,
  timestamp,
  onDirectUpload
}) => {
  const imageUrl = `/infographics/${lesson.filename}?v=${timestamp || 1}`;
  const baseName = lesson.filename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
  const htmlUrl = `/infographics/${baseName}.html`;
  const [currentSrc, setCurrentSrc] = useState(imageUrl);
  const cardFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingThis, setIsUploadingThis] = useState(false);

  const fallbackUri = useMemo(() => {
    try {
      const svg = generateInfographicSvg(lesson);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    } catch {
      return '';
    }
  }, [lesson]);

  useEffect(() => {
    setCurrentSrc(`/infographics/${lesson.filename}?v=${timestamp || 1}`);
  }, [lesson.filename, timestamp]);

  const handleCardFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onDirectUpload) {
      setIsUploadingThis(true);
      await onDirectUpload(file);
      setIsUploadingThis(false);
    }
  };

  return (
    <div
      onClick={onOpen}
      className={`group relative bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between overflow-hidden ${
        lesson.isReview
          ? 'border-amber-200/90 hover:border-amber-400'
          : 'border-slate-200 hover:border-emerald-400'
      }`}
    >
      {/* Top Banner & Thumbnail Preview */}
      <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden flex items-center justify-center">
        <img
          src={currentSrc}
          alt={lesson.title}
          onError={() => {
            if (currentSrc !== fallbackUri && fallbackUri) {
              setCurrentSrc(fallbackUri);
            }
          }}
          className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
        />

        {/* Floating Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-md backdrop-blur-md ${
            lesson.isReview
              ? 'bg-amber-600/90 text-white'
              : 'bg-emerald-600/90 text-white'
          }`}>
            {lesson.baiCode}
          </span>
          {hasFileOnServer && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 text-emerald-800 shadow-xs backdrop-blur-md">
              Ảnh của cô
            </span>
          )}
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
          <span className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Phóng to Infographic</span>
          </span>
        </div>

        {/* Status dot */}
        <div className="absolute bottom-2 right-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 backdrop-blur-md ${
              hasFileOnServer
                ? 'bg-emerald-500/80 text-white'
                : 'bg-slate-800/80 text-slate-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${hasFileOnServer ? 'bg-white' : 'bg-amber-400'}`} />
            {hasFileOnServer ? 'Đã lưu' : 'Sẵn sàng'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 mb-1.5">
            <span>{lesson.chapterRoman}: {lesson.chapterTitle}</span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
            {lesson.title}
          </h3>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>

          {/* Formula Chips */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {lesson.keyFormulas.slice(0, 2).map((formula, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-[11px] truncate max-w-full"
              >
                {formula}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer with Explicit Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-2">
          <input
            type="file"
            ref={cardFileInputRef}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleCardFilePicked}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover/btn:scale-110 transition-transform" />
            <span>Mở Infographic</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              cardFileInputRef.current?.click();
            }}
            disabled={isUploadingThis}
            title="Tải lên ảnh của cô cho bài học này (.png, .jpg, .webp)"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center justify-center cursor-pointer shrink-0 font-bold"
          >
            {isUploadingThis ? (
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
            ) : (
              <Upload className="w-4 h-4 text-emerald-700" />
            )}
          </button>

          <a
            href={htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Mở trực tiếp trên web trong tab mới của trình duyệt"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
