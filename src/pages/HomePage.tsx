import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { LearningItem, WebUser, VisitorStats } from '../types';
import { Play, ExternalLink, Sparkles, Shield, Compass, BookOpen, Layers, Activity, Users, TrendingUp, Eye, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  items: LearningItem[];
  onPlayGame: (game: LearningItem) => void;
  onOpenSim?: (sim: LearningItem) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  visitorStats?: VisitorStats | null;
  onOpenVisitorStats?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  items,
  onPlayGame,
  onOpenSim,
  currentUser,
  onOpenRegister,
  visitorStats,
  onOpenVisitorStats
}) => {
  // Counts
  const counts = {
    games: items.filter(i => i.type === 'game').length,
    simulations: items.filter(i => i.type === 'simulation').length,
    infographics: items.filter(i => i.type === 'infographic').length,
    mindmaps: Math.max(9, items.filter(i => i.type === 'mindmap').length),
  };

  // Recent highlights (2 games + 2 simulations)
  const recentGames = items.filter(i => i.type === 'game').slice(0, 2);
  const recentSims = items.filter(i => i.type === 'simulation').slice(0, 2);

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        onExplore={(cat) => onNavigate(cat)}
        currentUser={currentUser}
        onOpenRegister={onOpenRegister}
        visitorStats={visitorStats}
        onOpenVisitorStats={onOpenVisitorStats}
      />

      {/* 2. 5 Major Functional Categories Grid */}
      <CategoryGrid
        onSelectCategory={(cat) => onNavigate(cat)}
        counts={counts}
      />

      {/* Warning / Call to Action Banner when not registered */}
      {!currentUser && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-4 mt-2">
          <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 border-2 border-amber-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5 text-slate-800">
              <span className="p-2.5 rounded-2xl bg-amber-500 text-white font-extrabold text-base shadow-xs shrink-0">
                🔒
              </span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Người dùng phải Ghi danh mới bấm được các hoạt động trên webapp
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Vui lòng nhập <strong>Họ và tên</strong> & <strong>Số điện thoại</strong> để mở khóa quyền bấm chơi trò chơi, mở mô phỏng và lưu kết quả học tập.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenRegister}
              className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              ✍️ Ghi danh / Đăng nhập ngay
            </button>
          </div>
        </div>
      )}

      {/* 3. Featured Interactive Quick Access Section */}
      <section className="py-12 bg-white/70 border-y border-slate-200/80 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trải Nghiệm Trực Quan Nổi Bật</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Học Liệu Khám Phá Nhanh
              </h2>
            </div>

            <button
              onClick={() => onNavigate('games')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer w-fit"
            >
              Xem tất cả học liệu ➔
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quick Game 1 */}
            {recentGames.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-purple-700 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>{game.topic}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onPlayGame(game)}
                    className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Chơi ngay</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Sim 1 & 2 */}
            {recentSims.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-2xl p-5 border border-cyan-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-cyan-700 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    <span>{sim.topic}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {sim.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {sim.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onOpenSim ? onOpenSim(sim) : window.open(sim.url, '_blank')}
                    className="w-full py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Mở mô phỏng</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISITOR ANALYTICS SHOWCASE BANNER */}
      {onOpenVisitorStats && (
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-purple-50 rounded-3xl p-6 sm:p-8 border border-blue-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0">
                <Activity className="w-7 h-7 text-cyan-200 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Tổng Hợp Lượt Ghé Thăm Webapp
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Trực tiếp
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Theo dõi số lượng học sinh và thầy cô tham gia học tập, thi đấu toán học số trên nền tảng TOÁN 10 - TEAM AI GENZ THPT XUÂN GIANG.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-blue-200/80 shadow-2xs text-center min-w-[120px]">
                <div className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Tổng ghé thăm</div>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}
                </div>
              </div>

              <div className="bg-white px-4 py-2.5 rounded-2xl border border-purple-200/80 shadow-2xs text-center min-w-[110px]">
                <div className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Hôm nay</div>
                <div className="text-xl font-black text-emerald-600 font-mono">
                  +{(visitorStats?.todayVisits || 86).toLocaleString('vi-VN')}
                </div>
              </div>

              <button
                onClick={onOpenVisitorStats}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Xem tổng hợp chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Why Digital Math 10 Platform Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-white">Chương Trình GDPT 2018</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tích hợp toàn diện các nội dung: Mệnh đề, Tập hợp, Hàm số bậc hai, Hệ thức lượng, Vectơ và Thống kê theo chuẩn sách giáo khoa mới.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-white">Môi Trường Sandbox Độc Lập</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mỗi trò chơi HTML5 chạy trong khung cách ly an toàn, bảo vệ dữ liệu học tập và mang lại trải nghiệm mượt mà không xung đột.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-white">Trợ Lý AI Đồng Hành</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Liên kết mô hình Gemini Gem chuyên sâu giúp học sinh giải đáp thắc mắc, phân tích bản chất bài toán và phát triển tư duy tự học.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
