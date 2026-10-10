import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Search, Filter, ExternalLink, PlusCircle, Compass, Layers,
  Eye, Copy, Check, Sparkles, Box, Maximize2, X, BookOpen, ChevronRight,
  Share2, RotateCcw, Lightbulb, Grid, CheckCircle2
} from 'lucide-react';
import { LearningItem, WebUser } from '../types';
import { Simulation3DIcon } from '../components/Math3DIcons';
import { CURRICULUM_SIMULATIONS, CHAPTER_SIMULATION_GROUPS, SimulationItemMetadata } from '../data/simulationsData';

interface SimulationsPageProps {
  items: LearningItem[];
  onBack: () => void;
  isAdmin: boolean;
  onOpenAdmin: (category: string) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  requireRegistration?: (action: () => void, message?: string) => boolean;
  onTrackActivity?: (itemId: string, itemTitle: string, category: string) => void;
}

export const SimulationsPage: React.FC<SimulationsPageProps> = ({
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
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'algebra' | 'geometry' | '3d'>('all');
  const [viewMode, setViewMode] = useState<'chapters' | 'grid'>('chapters');
  
  // Modal Preview state
  const [previewSim, setPreviewSim] = useState<SimulationItemMetadata | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Combine loaded simulations with rich metadata from CURRICULUM_SIMULATIONS
  const allSimulations = useMemo(() => {
    const rawSims = items.filter(item => item.type === 'simulation');
    
    // Map with rich metadata if available
    const metadataMap = new Map<string, SimulationItemMetadata>();
    CURRICULUM_SIMULATIONS.forEach(s => {
      metadataMap.set(s.url?.toLowerCase().trim() || '', s);
      metadataMap.set(s.id, s);
    });

    return rawSims.map((sim, index) => {
      const matched = metadataMap.get(sim.url?.toLowerCase().trim() || '') || metadataMap.get(sim.id);
      if (matched) {
        return {
          ...sim,
          chapterNumber: matched.chapterNumber,
          chapterRoman: matched.chapterRoman,
          chapterTitle: matched.chapterTitle,
          badge: matched.badge,
          tags: matched.tags || []
        } as SimulationItemMetadata;
      }

      // Fallback inference if added dynamically by teacher
      let chNum = 1;
      let chRoman = 'Toán 10';
      let chTitle = sim.topic || 'Học liệu mô phỏng';
      const topicLower = (sim.topic || '').toLowerCase();
      if (topicLower.includes('chương 1') || topicLower.includes('chương i') || topicLower.includes('mệnh đề') || topicLower.includes('tập hợp')) {
        chNum = 1; chRoman = 'Chương I'; chTitle = 'Mệnh đề & Tập hợp';
      } else if (topicLower.includes('chương 2') || topicLower.includes('chương ii') || topicLower.includes('bất phương trình')) {
        chNum = 2; chRoman = 'Chương II'; chTitle = 'Bất phương trình & Hệ BPT bậc nhất hai ẩn';
      } else if (topicLower.includes('chương 3') || topicLower.includes('chương iii') || topicLower.includes('lượng giác') || topicLower.includes('hệ thức lượng')) {
        chNum = 3; chRoman = 'Chương III'; chTitle = 'Hệ thức lượng trong tam giác';
      } else if (topicLower.includes('chương 4') || topicLower.includes('chương iv') || topicLower.includes('vectơ') || topicLower.includes('vector')) {
        chNum = 4; chRoman = 'Chương IV'; chTitle = 'Vectơ trong hình học';
      } else if (topicLower.includes('chương 6') || topicLower.includes('chương vi') || topicLower.includes('hàm số') || topicLower.includes('parabol')) {
        chNum = 6; chRoman = 'Chương VI'; chTitle = 'Hàm số, đồ thị & ứng dụng';
      } else if (topicLower.includes('chương 7') || topicLower.includes('chương vii') || topicLower.includes('toạ độ') || topicLower.includes('đường thẳng') || topicLower.includes('conic')) {
        chNum = 7; chRoman = 'Chương VII'; chTitle = 'Phương pháp toạ độ trong mặt phẳng';
      }

      const is3D = (sim.title + ' ' + (sim.url || '')).toLowerCase().includes('3d') || (sim.title + ' ' + (sim.url || '')).toLowerCase().includes('lab');

      return {
        ...sim,
        chapterNumber: chNum,
        chapterRoman: chRoman,
        chapterTitle: chTitle,
        badge: is3D ? '3D Math Lab' : 'Trực Quan Oxy',
        tags: [chRoman, is3D ? '3D Lab' : 'Tương tác']
      } as SimulationItemMetadata;
    }).sort((a, b) => (a.chapterNumber - b.chapterNumber) || (a.displayOrder - b.displayOrder));
  }, [items]);

  // Topic filter options
  const topics = useMemo(() => {
    const set = new Set<string>();
    allSimulations.forEach(s => {
      if (s.topic) set.add(s.topic);
    });
    return Array.from(set);
  }, [allSimulations]);

  // Filtered simulations
  const filtered = useMemo(() => {
    return allSimulations.filter(s => {
      const matchSearch = (s.title + ' ' + s.description + ' ' + s.topic + ' ' + (s.tags?.join(' ') || '')).toLowerCase().includes(search.toLowerCase());
      const matchTopic = selectedTopic === 'ALL' || s.topic === selectedTopic;
      
      let matchCategory = true;
      if (categoryFilter === 'algebra') {
        matchCategory = [1, 2, 6].includes(s.chapterNumber);
      } else if (categoryFilter === 'geometry') {
        matchCategory = [3, 4, 7].includes(s.chapterNumber);
      } else if (categoryFilter === '3d') {
        matchCategory = s.badge === '3D Math Lab' || (s.title + ' ' + (s.url || '')).toLowerCase().includes('3d');
      }

      return matchSearch && matchTopic && matchCategory;
    });
  }, [allSimulations, search, selectedTopic, categoryFilter]);

  // Group filtered simulations by chapters
  const groupedByChapter = useMemo(() => {
    const groups: { [key: number]: SimulationItemMetadata[] } = {};
    filtered.forEach(sim => {
      const ch = sim.chapterNumber || 1;
      if (!groups[ch]) groups[ch] = [];
      groups[ch].push(sim);
    });
    return groups;
  }, [filtered]);

  const handleOpenExternal = (url?: string, simTitle?: string, simId?: string) => {
    if (!url) {
      alert('Đường link mô phỏng này chưa được cấu hình. Vui lòng liên hệ giáo viên.');
      return;
    }
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onTrackActivity && simId) onTrackActivity(simId, simTitle || 'Mô phỏng Toán 10', 'simulation');
          window.open(url, '_blank', 'noopener,noreferrer');
        }, `Vui lòng ghi danh (Họ tên và Số điện thoại) để mở mô phỏng "${simTitle || 'Toán 10'}"!`);
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    if (onTrackActivity && simId) onTrackActivity(simId, simTitle || 'Mô phỏng Toán 10', 'simulation');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenPreview = (sim: SimulationItemMetadata) => {
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onTrackActivity) onTrackActivity(sim.id, sim.title, 'simulation');
          setPreviewSim(sim);
          setIframeLoading(true);
        }, `Vui lòng ghi danh (Họ tên và Số điện thoại) để mở mô phỏng "${sim.title}"!`);
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    if (onTrackActivity) onTrackActivity(sim.id, sim.title, 'simulation');
    setPreviewSim(sim);
    setIframeLoading(true);
  };

  const handleCopyLink = (sim: SimulationItemMetadata, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sim.url) return;
    navigator.clipboard.writeText(sim.url).then(() => {
      setCopiedId(sim.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      // fallback
    });
  };

  const count3D = useMemo(() => {
    return allSimulations.filter(s => s.badge === '3D Math Lab' || (s.title + ' ' + (s.url || '')).toLowerCase().includes('3d')).length;
  }, [allSimulations]);

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
              <strong>Người dùng phải Ghi danh mới bấm mở được các ứng dụng mô phỏng!</strong> Nhập Họ tên và Số điện thoại để mở khóa toàn bộ mô phỏng trực quan.
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

      {/* 1. Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-cyan-700 transition-colors group cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại Trang chủ</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => onOpenAdmin('simulations')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-cyan-700 transition-colors w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Thêm App mô phỏng (GV)</span>
          </button>
        )}
      </div>

      {/* 2. Page Header & Scientific Intro */}
      <div className="bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-10 border border-cyan-800/40">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 opacity-15 hidden lg:block pointer-events-none">
          <Simulation3DIcon className="w-72 h-72 text-cyan-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3.5 border border-cyan-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toán Học Tương Tác Số GDPT 2018</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Kho Ứng Dụng Mô Phỏng Toán 10
          </h1>

          <p className="text-sm sm:text-base text-cyan-100/90 mt-3 leading-relaxed">
            Hệ thống 18 ứng dụng mô phỏng số và phòng thí nghiệm 3D Math Lab tương tác trực quan, được sắp xếp khoa học theo đúng mạch kiến thức chuẩn sách giáo khoa Toán 10.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-cyan-800/60">
            <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">{allSimulations.length}</div>
              <div className="text-xs text-slate-300 mt-0.5">Ứng dụng mô phỏng</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-300">6</div>
              <div className="text-xs text-slate-300 mt-0.5">Mạch chương trọng tâm</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{count3D}</div>
              <div className="text-xs text-slate-300 mt-0.5">Phòng thí nghiệm 3D Lab</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-2xl p-3 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">100%</div>
              <div className="text-xs text-slate-300 mt-0.5">Tương tác trực tiếp</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Interactive Filter Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs mb-8 space-y-4">
        {/* Top Controls: Search + Topic Select + View Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên mô phỏng (vectơ, parabol, miền nghiệm, conic...)"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all placeholder:text-slate-400"
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

          <div className="flex flex-wrap items-center gap-2">
            {topics.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-slate-500 hidden sm:inline" />
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 cursor-pointer"
                >
                  <option value="ALL">Tất cả chủ đề ({allSimulations.length})</option>
                  {topics.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}

            {/* View Mode Toggle: Chapters vs Grid */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('chapters')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'chapters'
                    ? 'bg-white text-cyan-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sắp xếp theo Chương GDPT 2018"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Theo Chương</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-cyan-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Xem tất cả dưới dạng lưới"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Xem dạng Lưới</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills by Category */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium mr-1">Phân loại nhanh:</span>
          
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-cyan-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({allSimulations.length})
          </button>

          <button
            onClick={() => setCategoryFilter('algebra')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              categoryFilter === 'algebra'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            Đại số & Hàm số (Chương I, II, VI)
          </button>

          <button
            onClick={() => setCategoryFilter('geometry')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              categoryFilter === 'geometry'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Hình học & Tọa độ (Chương III, IV, VII)
          </button>

          <button
            onClick={() => setCategoryFilter('3d')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              categoryFilter === '3d'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>Phòng thí nghiệm 3D Math Lab ({count3D})</span>
          </button>
        </div>
      </div>

      {/* 4. Pedagogical Tips Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Gợi ý thao tác dành cho Giáo viên & Học sinh:</span> Mỗi ứng dụng mô phỏng cho phép bạn kéo thả thanh trượt tham số (hệ số góc, đỉnh parabol, tọa độ vectơ, góc lượng giác). Bạn có thể bấm <strong className="text-amber-950 font-semibold">"Xem trực tiếp"</strong> để thao tác ngay trên trang, hoặc <strong className="text-amber-950 font-semibold">"Mở toàn màn hình"</strong> để trình chiếu trong tiết dạy.
        </div>
      </div>

      {/* 5. Main Content: Grouped by Chapter OR Flat Grid */}
      {filtered.length > 0 ? (
        viewMode === 'chapters' ? (
          /* ================= CHAPTER GROUPED VIEW ================= */
          <div className="space-y-12">
            {CHAPTER_SIMULATION_GROUPS.map((group) => {
              const chapterItems = groupedByChapter[group.chapterNumber] || [];
              if (chapterItems.length === 0) return null;

              return (
                <section
                  key={group.chapterNumber}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
                >
                  {/* Chapter Section Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                        {group.chapterRoman.replace('Chương ', '')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                            {group.chapterRoman}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-medium text-slate-500">
                            {chapterItems.length} ứng dụng mô phỏng
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                          {group.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right">
                      {group.description}
                    </p>
                  </div>

                  {/* Simulations Grid for this Chapter */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {chapterItems.map((item) => (
                      <SimulationCard
                        key={item.id}
                        item={item}
                        onPreview={() => handleOpenPreview(item)}
                        onOpenExternal={() => handleOpenExternal(item.url, item.title, item.id)}
                        onCopyLink={(e) => handleCopyLink(item, e)}
                        isCopied={copiedId === item.id}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* ================= FLAT GRID VIEW ================= */
          <div>
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
              <span>Hiển thị <strong>{filtered.length}</strong> ứng dụng mô phỏng</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <SimulationCard
                  key={item.id}
                  item={item}
                  onPreview={() => handleOpenPreview(item)}
                  onOpenExternal={() => handleOpenExternal(item.url, item.title, item.id)}
                  onCopyLink={(e) => handleCopyLink(item, e)}
                  isCopied={copiedId === item.id}
                />
              ))}
            </div>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {search ? 'Không tìm thấy mô phỏng phù hợp' : 'Chuyên mục này đang được cập nhật'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
            {search
              ? 'Vui lòng thử tìm kiếm với từ khóa khác (ví dụ: parabol, vectơ, miền nghiệm, elip) hoặc bấm đặt lại bộ lọc.'
              : 'Giáo viên có thể thêm các đường dẫn mô phỏng số trong trang quản trị.'}
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedTopic('ALL'); setCategoryFilter('all'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700 transition-colors cursor-pointer"
          >
            Xem toàn bộ mô phỏng
          </button>
        </div>
      )}

      {/* 6. Interactive Modal Preview (Embedded Iframe Viewer) */}
      {previewSim && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border border-slate-700/50">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0 border border-cyan-400/30">
                  <Box className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {previewSim.topic}
                    </span>
                    {previewSim.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/20">
                        {previewSim.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {previewSim.title}
                  </h3>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenExternal(previewSim.url)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  title="Mở ứng dụng trong tab mới"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Mở toàn màn hình</span>
                </button>

                <button
                  onClick={() => {
                    if (previewSim.url) {
                      navigator.clipboard.writeText(previewSim.url);
                      setCopiedId(previewSim.id);
                      setTimeout(() => setCopiedId(null), 2000);
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Sao chép liên kết"
                >
                  {copiedId === previewSim.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => setPreviewSim(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-300 transition-colors cursor-pointer ml-1"
                  title="Đóng xem trước"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Iframe Area */}
            <div className="relative flex-1 w-full bg-slate-950">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-300 gap-3 z-10">
                  <div className="w-10 h-10 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs sm:text-sm font-medium">Đang tải ứng dụng mô phỏng toán học...</p>
                  <p className="text-[11px] text-slate-400">Nếu mô phỏng không hiển thị trong khung, vui lòng bấm nút "Mở toàn màn hình".</p>
                </div>
              )}

              {previewSim.url && (
                <iframe
                  src={previewSim.url}
                  title={previewSim.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIframeLoading(false)}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
              <div className="truncate max-w-xl">
                <span className="font-semibold text-slate-800">Mục tiêu:</span> {previewSim.description}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenExternal(previewSim.url)}
                  className="text-cyan-700 hover:text-cyan-800 font-semibold underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Mở trong cửa sổ mới</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// INDIVIDUAL SIMULATION CARD COMPONENT
// ==========================================
interface SimulationCardProps {
  item: SimulationItemMetadata;
  onPreview: () => void;
  onOpenExternal: () => void;
  onCopyLink: (e: React.MouseEvent) => void;
  isCopied: boolean;
}

const SimulationCard: React.FC<SimulationCardProps> = ({
  item,
  onPreview,
  onOpenExternal,
  onCopyLink,
  isCopied
}) => {
  const is3D = item.badge === '3D Math Lab' || (item.title + ' ' + (item.url || '')).toLowerCase().includes('3d');

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-cyan-400 shadow-xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Accent Top Border Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all ${
        is3D ? 'bg-gradient-to-r from-indigo-500 to-cyan-500' : 'bg-gradient-to-r from-cyan-500 to-teal-500'
      }`} />

      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
              {item.chapterRoman || 'Toán 10'}
            </span>

            {item.badge && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                is3D ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60' : 'bg-cyan-50 text-cyan-700 border border-cyan-200/60'
              }`}>
                {item.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onCopyLink}
              title="Sao chép liên kết"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {item.description || 'Mô phỏng toán học tương tác môn Toán lớp 10.'}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          onClick={onPreview}
          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          title="Xem trực tiếp trong ứng dụng"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem trực tiếp</span>
        </button>

        <button
          onClick={onOpenExternal}
          className="py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
          title="Mở toàn màn hình trong tab mới"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Mở toàn màn hình</span>
        </button>
      </div>
    </div>
  );
};
