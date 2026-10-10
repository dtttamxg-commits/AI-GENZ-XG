import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Search, Filter, Play, PlusCircle, Gamepad2, Info,
  Sparkles, Dices, LayoutGrid, Layers, CheckCircle2, Bookmark,
  Compass, BarChart3, Split, Flame, Target, ChevronRight
} from 'lucide-react';
import { LearningItem, WebUser } from '../types';
import { GamePlayerModal } from '../components/GamePlayerModal';
import { GameController3DIcon } from '../components/Math3DIcons';

interface GamesPageProps {
  items: LearningItem[];
  onBack: () => void;
  isAdmin: boolean;
  onOpenAdmin: (category: string) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  onPlayGame?: (game: LearningItem) => void;
  requireRegistration?: (action: () => void, message?: string) => boolean;
}

// Chapter metadata definition for scientific ordering (CT GDPT 2018 Toán 10)
interface ChapterMeta {
  key: string;
  number: number;
  title: string;
  shortName: string;
  color: {
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    buttonHover: string;
    accent: string;
  };
  iconName: string;
}

const CHAPTER_METAS: ChapterMeta[] = [
  {
    key: 'ch1',
    number: 1,
    title: 'Chương 1: Mệnh đề & Tập hợp',
    shortName: 'Ch.1 Mệnh đề & Tập hợp',
    color: {
      bgLight: 'from-blue-500/10 to-indigo-500/5',
      border: 'border-indigo-200 hover:border-indigo-400',
      text: 'text-indigo-900',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      buttonHover: 'hover:bg-indigo-600',
      accent: 'bg-indigo-600 text-white'
    },
    iconName: 'ch1'
  },
  {
    key: 'ch2',
    number: 2,
    title: 'Chương 2: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    shortName: 'Ch.2 BPT bậc nhất 2 ẩn',
    color: {
      bgLight: 'from-emerald-500/10 to-teal-500/5',
      border: 'border-emerald-200 hover:border-emerald-400',
      text: 'text-emerald-900',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      buttonHover: 'hover:bg-emerald-600',
      accent: 'bg-emerald-600 text-white'
    },
    iconName: 'ch2'
  },
  {
    key: 'ch3',
    number: 3,
    title: 'Chương 3: Hệ thức lượng trong tam giác',
    shortName: 'Ch.3 Hệ thức lượng tam giác',
    color: {
      bgLight: 'from-amber-500/10 to-orange-500/5',
      border: 'border-amber-200 hover:border-amber-400',
      text: 'text-amber-900',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      buttonHover: 'hover:bg-amber-600',
      accent: 'bg-amber-600 text-white'
    },
    iconName: 'ch3'
  },
  {
    key: 'ch4',
    number: 4,
    title: 'Chương 4: Vectơ',
    shortName: 'Ch.4 Vectơ',
    color: {
      bgLight: 'from-purple-500/10 to-violet-500/5',
      border: 'border-purple-200 hover:border-purple-400',
      text: 'text-purple-900',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      buttonHover: 'hover:bg-purple-600',
      accent: 'bg-purple-600 text-white'
    },
    iconName: 'ch4'
  },
  {
    key: 'ch5',
    number: 5,
    title: 'Chương 5: Các số đặc trưng của mẫu số liệu không ghép nhóm',
    shortName: 'Ch.5 Thống kê mô tả',
    color: {
      bgLight: 'from-cyan-500/10 to-sky-500/5',
      border: 'border-cyan-200 hover:border-cyan-400',
      text: 'text-cyan-900',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      buttonHover: 'hover:bg-cyan-600',
      accent: 'bg-cyan-600 text-white'
    },
    iconName: 'ch5'
  },
  {
    key: 'ch6',
    number: 6,
    title: 'Chương 6: Hàm số, đồ thị & ứng dụng',
    shortName: 'Ch.6 Hàm số & Tam thức',
    color: {
      bgLight: 'from-rose-500/10 to-pink-500/5',
      border: 'border-rose-200 hover:border-rose-400',
      text: 'text-rose-900',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
      buttonHover: 'hover:bg-rose-600',
      accent: 'bg-rose-600 text-white'
    },
    iconName: 'ch6'
  },
  {
    key: 'ch7',
    number: 7,
    title: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    shortName: 'Ch.7 Tọa độ Oxy & Conic',
    color: {
      bgLight: 'from-blue-500/10 to-indigo-500/5',
      border: 'border-blue-200 hover:border-blue-400',
      text: 'text-blue-900',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      buttonHover: 'hover:bg-blue-600',
      accent: 'bg-blue-600 text-white'
    },
    iconName: 'ch7'
  },
  {
    key: 'ch8',
    number: 8,
    title: 'Chương 8: Đại số tổ hợp',
    shortName: 'Ch.8 Đại số tổ hợp',
    color: {
      bgLight: 'from-orange-500/10 to-amber-500/5',
      border: 'border-orange-200 hover:border-orange-400',
      text: 'text-orange-900',
      badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
      buttonHover: 'hover:bg-orange-600',
      accent: 'bg-orange-600 text-white'
    },
    iconName: 'ch8'
  }
];

// Helper to determine chapter metadata for any game
function getChapterForGame(game: LearningItem): ChapterMeta {
  const id = (game.id || '').toLowerCase();
  const t = (game.topic || '').toLowerCase();

  // Ch1: Mệnh đề & Tập hợp (B1, B2)
  if (id.includes('game-01') || id.includes('game-02') || id.includes('menh-de') || id.includes('tap-hop') || t.includes('chương 1')) {
    return CHAPTER_METAS[0];
  }
  // Ch2: Bất phương trình & Hệ BPT (B3, B4)
  if (id.includes('game-03') || id.includes('game-04') || id.includes('mien-nghiem') || t.includes('chương 2')) {
    return CHAPTER_METAS[1];
  }
  // Ch3: Hệ thức lượng trong tam giác (B5, B6)
  if (id.includes('game-05') || id.includes('game-06') || id.includes('vong-tron-luong-giac') || id.includes('he-thuc-luong') || id.includes('tam-giac') || t.includes('chương 3')) {
    return CHAPTER_METAS[2];
  }
  // Ch4: Vectơ (B7, B8, B9, B11)
  if (id.includes('game-07') || id.includes('game-08') || id.includes('game-09') || id.includes('game-11') || id.includes('vector') || id.includes('vecto') || t.includes('chương 4')) {
    return CHAPTER_METAS[3];
  }
  // Ch5: Thống kê mô tả (B12, B13, B14)
  if (id.includes('game-12') || id.includes('game-13') || id.includes('game-14') || id.includes('sai-so') || id.includes('du-lieu') || id.includes('phan-tan') || t.includes('chương 5')) {
    return CHAPTER_METAS[4];
  }
  // Ch6: Hàm số & Tam thức (B15, B16, B17, B18)
  if (id.includes('game-15') || id.includes('game-16') || id.includes('game-17') || id.includes('game-18') || id.includes('ham-so') || id.includes('parabol') || id.includes('bang-dau') || id.includes('tam-thuc') || id.includes('phuong-trinh') || t.includes('chương 6')) {
    return CHAPTER_METAS[5];
  }
  // Ch7: Tọa độ phẳng Oxy & Conic (B19, B20, B21, B22)
  if (id.includes('game-19') || id.includes('game-20') || id.includes('game-21') || id.includes('game-22') || id.includes('duong-thang') || id.includes('duong-tron') || id.includes('conic') || t.includes('chương 7')) {
    return CHAPTER_METAS[6];
  }
  // Ch8: Đại số tổ hợp (B23, B24, B25)
  if (id.includes('game-23') || id.includes('game-24') || id.includes('game-25') || id.includes('quy-tac-dem') || id.includes('hoan-vi') || id.includes('newton') || t.includes('chương 8')) {
    return CHAPTER_METAS[7];
  }

  return {
    key: 'custom',
    number: 99,
    title: game.topic || 'Học liệu bổ sung',
    shortName: game.topic || 'Bổ sung',
    color: {
      bgLight: 'from-slate-500/10 to-gray-500/5',
      border: 'border-slate-200 hover:border-slate-400',
      text: 'text-slate-900',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
      buttonHover: 'hover:bg-slate-800',
      accent: 'bg-slate-800 text-white'
    },
    iconName: 'default'
  };
}

export const GamesPage: React.FC<GamesPageProps> = ({
  items,
  onBack,
  isAdmin,
  onOpenAdmin,
  currentUser,
  onOpenRegister,
  onPlayGame,
  requireRegistration
}) => {
  const [search, setSearch] = useState('');
  const [selectedChapterKey, setSelectedChapterKey] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'buttons' | 'cards'>('buttons');
  const [playingGame, setPlayingGame] = useState<LearningItem | null>(null);

  // Filter only game items
  const allGames = useMemo(() => {
    return items.filter(item => item.type === 'game');
  }, [items]);

  // Group games scientifically by chapter
  const gamesWithChapter = useMemo(() => {
    return allGames.map(game => ({
      game,
      chapter: getChapterForGame(game)
    }));
  }, [allGames]);

  // Filtered games based on search & chapter selection
  const filteredGamesWithChapter = useMemo(() => {
    return gamesWithChapter.filter(({ game, chapter }) => {
      const matchSearch = (game.title + ' ' + (game.description || '') + ' ' + (game.topic || ''))
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchChapter = selectedChapterKey === 'ALL' || chapter.key === selectedChapterKey;
      return matchSearch && matchChapter;
    });
  }, [gamesWithChapter, search, selectedChapterKey]);

  // Group filtered games by chapter for scientific sectioning
  const groupedByChapter = useMemo(() => {
    const map = new Map<string, { meta: ChapterMeta; items: LearningItem[] }>();

    filteredGamesWithChapter.forEach(({ game, chapter }) => {
      if (!map.has(chapter.key)) {
        map.set(chapter.key, { meta: chapter, items: [] });
      }
      map.get(chapter.key)!.items.push(game);
    });

    // Sort chapters in numerical order (Chương 1 -> 7 -> Custom)
    return Array.from(map.values()).sort((a, b) => a.meta.number - b.meta.number);
  }, [filteredGamesWithChapter]);

  // Launch game with strict registration enforcement
  const handleLaunchGame = (game: LearningItem) => {
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onPlayGame) onPlayGame(game);
          else setPlayingGame(game);
        }, `Vui lòng ghi danh (Họ tên và Số điện thoại) để bắt đầu chơi trò chơi "${game.title}"!`);
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }

    if (onPlayGame) {
      onPlayGame(game);
    } else {
      setPlayingGame(game);
    }
  };

  // Pick a random game for student excitement
  const handlePickRandomGame = () => {
    if (allGames.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allGames.length);
    handleLaunchGame(allGames[randomIndex]);
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
              <strong>Người dùng phải Ghi danh mới bấm chơi được các trò chơi!</strong> Nhập Họ tên và Số điện thoại để mở khóa 25+ game và lưu điểm số thi đấu.
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

      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors group cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại Trang chủ</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePickRandomGame}
            title="Thử thách một trò ngẫu nhiên"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>🎲 Trò chơi ngẫu nhiên</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => onOpenAdmin('games')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:bg-purple-700 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm trò chơi mới (GV)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Page Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8 border border-purple-800/40">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-inner backdrop-blur-xs shrink-0">
              <GameController3DIcon className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Thư Viện Trò Chơi Toán 10 – Chuẩn GDPT 2018</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Kho Trò Chơi Toán Học 10
              </h1>
              <p className="text-sm sm:text-base text-purple-100/90 mt-1.5 max-w-2xl leading-relaxed">
                Mỗi trò chơi là một <strong>nút bấm khám phá khoa học</strong> được phân loại chính xác theo từng chương bài học. Trải nghiệm HTML5 độc lập, bảo mật và tương tác cao.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex md:flex-col gap-3 shrink-0 bg-white/5 border border-white/10 p-3.5 sm:p-4 rounded-2xl backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-amber-300">{allGames.length}</span>
              <span className="text-xs text-purple-200 leading-tight">Trò chơi<br />sẵn sàng</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 8/8 Chương
              </span>
              <span className="text-[11px] text-purple-300">đầy đủ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Navigation Bar & Chapter Filter Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm mb-8 space-y-4">
        {/* Search & View Mode Switch */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm trò chơi theo tên, chủ đề, định lý..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Hiển thị:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('buttons')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'buttons'
                    ? 'bg-white text-purple-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Nút bấm khoa học</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-purple-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ chi tiết</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scientific Chapter Tabs Buttons */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-purple-600" />
            <span>Phân Loại Khoa Học Theo Chương Trình Toán 10:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedChapterKey('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedChapterKey === 'ALL'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Tất cả các trò ({allGames.length})
            </button>

            {CHAPTER_METAS.map((ch) => {
              const countInChapter = allGames.filter(g => getChapterForGame(g).key === ch.key).length;
              return (
                <button
                  key={ch.key}
                  onClick={() => setSelectedChapterKey(ch.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedChapterKey === ch.key
                      ? `${ch.color.accent} border-transparent shadow-xs font-bold`
                      : `bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100`
                  }`}
                >
                  <span>{ch.shortName}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedChapterKey === ch.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {countInChapter}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN GAMES CONTENT */}
      {filteredGamesWithChapter.length > 0 ? (
        <div className="space-y-10">
          {groupedByChapter.map(({ meta, items: chapterGames }) => (
            <section key={meta.key} className="space-y-4">
              {/* Scientific Chapter Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${meta.color.badgeBg}`}>
                    CHƯƠNG {meta.number}
                  </span>
                  <h2 className={`text-lg sm:text-xl font-bold ${meta.color.text}`}>
                    {meta.title}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {chapterGames.length} trò chơi
                </span>
              </div>

              {/* View Mode 1: BẢNG NÚT BẤM KHOA HỌC (Interactive Scientific Button Matrix) */}
              {viewMode === 'buttons' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chapterGames.map((game, idx) => (
                    <button
                      key={game.id}
                      onClick={() => handleLaunchGame(game)}
                      className={`group text-left relative overflow-hidden bg-gradient-to-br ${meta.color.bgLight} bg-white rounded-2xl border ${meta.color.border} p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-purple-500`}
                    >
                      {/* Top Row: Chapter Badge + Order indicator */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold tracking-tight ${meta.color.badgeBg}`}>
                            {game.topic || meta.shortName}
                          </span>
                          <span className="text-slate-400 group-hover:text-purple-600 text-xs font-mono font-semibold transition-colors">
                            #{idx + 1}
                          </span>
                        </div>

                        {/* Game Title as prominent button heading */}
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug line-clamp-2">
                          {game.title}
                        </h3>

                        {/* Short highlight description */}
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {game.description || 'Trò chơi tương tác thực hành toán học.'}
                        </p>
                      </div>

                      {/* Bottom Button Action Bar */}
                      <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors flex items-center gap-1">
                          <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>HTML5 Tương tác</span>
                        </span>

                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${meta.color.accent} text-xs font-bold shadow-xs group-hover:scale-105 transition-transform`}>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Chơi ngay</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* View Mode 2: DẠNG THẺ CHI TIẾT (Expanded Cards) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapterGames.map((game) => (
                    <div
                      key={game.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold mb-2">
                          <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>{game.topic}</span>
                          {game.isSample && (
                            <>
                              <span aria-hidden="true" className="text-slate-300">·</span>
                              <span className="text-slate-500 font-normal">Mẫu chuẩn GDPT</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                          {game.title}
                        </h3>

                        <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {game.description || 'Trò chơi rèn luyện kiến thức Toán học lớp 10.'}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => handleLaunchGame(game)}
                          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Chơi ngay</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {search ? 'Không tìm thấy trò chơi phù hợp với từ khóa' : 'Chưa có trò chơi trong chuyên mục này'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md mx-auto">
            {search
              ? 'Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc chọn "Tất cả các trò".'
              : 'Giáo viên có thể tải lên trò chơi HTML độc lập mới bất cứ lúc nào trong trang Quản trị giáo viên.'}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {search && (
              <button
                onClick={() => setSearch('')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Xóa tìm kiếm
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => onOpenAdmin('games')}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
              >
                Tải lên trò chơi ngay
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pedagogical info card at bottom */}
      <div className="mt-14 bg-purple-50/70 border border-purple-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-purple-900">Hướng dẫn dành cho học sinh & giáo viên</h4>
            <p className="text-xs text-purple-800/80 mt-0.5">
              Tất cả các trò chơi đều được đóng gói độc lập theo chuẩn HTML5. Học sinh có thể nhấn phím <kbd className="px-1.5 py-0.5 bg-white border border-purple-200 rounded text-[11px] font-mono text-purple-900">Esc</kbd> để thoát màn hình chơi, tải lại trò chơi hoặc mở toàn màn hình.
            </p>
          </div>
        </div>
        <button
          onClick={handlePickRandomGame}
          className="shrink-0 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
        >
          🎲 Chơi trò ngẫu nhiên
        </button>
      </div>

      {/* Sandboxed Game Player Modal */}
      {playingGame && (
        <GamePlayerModal
          game={playingGame}
          onClose={() => setPlayingGame(null)}
        />
      )}
    </div>
  );
};
