import React from 'react';
import { Compass, Sparkles, BookOpen, ChevronRight, Layers, UserPlus, UserCheck, Activity, Eye, TrendingUp } from 'lucide-react';
import { WebUser, VisitorStats } from '../types';

interface HeroProps {
  onExplore: (category: string) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  visitorStats?: VisitorStats | null;
  onOpenVisitorStats?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  currentUser,
  onOpenRegister,
  visitorStats,
  onOpenVisitorStats
}) => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      {/* Background ambient lighting and subtle gradient mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Callouts */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            {/* Tagline / Subtitle & Team Attribution */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs sm:text-sm font-semibold tracking-wide border border-blue-200/60 shadow-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Học Toán thú vị – Khám phá sáng tạo</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-bold border border-indigo-200/80 shadow-xs">
                <span>© TEAM AI GENZ 10A1, THPT XUÂN GIANG</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-tight">
              TOÁN 10 – KHÁM PHÁ <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                TOÁN HỌC SỐ
              </span>
            </h1>

            {/* Welcome Greeting */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Chào mừng các bạn đến với không gian học tập Toán 10! Hãy lựa chọn hoạt động yêu thích để bắt đầu hành trình khám phá.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {currentUser ? (
                <button
                  onClick={onOpenRegister}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Hồ sơ: {currentUser.fullName} ({currentUser.totalClicks || 0} lượt khám phá)</span>
                </button>
              ) : (
                <button
                  onClick={onOpenRegister}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer ring-2 ring-indigo-400/40"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Ghi danh học tập (Bắt buộc để tham gia)</span>
                </button>
              )}

              <button
                onClick={() => onExplore('games')}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Chơi trò chơi Toán học</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExplore('simulations')}
                className="px-5 py-3 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-cyan-600" />
                <span>Mở App mô phỏng</span>
              </button>

              {/* Nút tổng hợp số lượt người ghé thăm webapp */}
              {onOpenVisitorStats && (
                <button
                  onClick={onOpenVisitorStats}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 hover:from-blue-100 hover:to-indigo-100 text-blue-950 font-bold text-sm border border-blue-200/90 shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                  title="Bấm để xem báo cáo tổng hợp chi tiết số lượt người ghé thăm webapp"
                >
                  <div className="relative">
                    <Activity className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <span>
                    Tổng hợp lượt ghé thăm:{' '}
                    <strong className="font-mono text-blue-700">
                      {(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}
                    </strong>
                  </span>
                </button>
              )}
            </div>

            {/* Key Curriculum Focus Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-lg border border-slate-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-indigo-500" /> Mệnh đề & Tập hợp
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-lg border border-slate-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-blue-500" /> Hàm số bậc hai & Parabol
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-lg border border-slate-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-purple-500" /> Vectơ & Tọa độ Oxy
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-lg border border-slate-200/60 shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-emerald-500" /> Hệ thức lượng tam giác
              </span>
            </div>
          </div>

          {/* Right Column: 3D Educational Graphic Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-br from-white/95 via-blue-50/50 to-indigo-50/40 p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 backdrop-blur-sm">
              
              {/* Floating formula badges */}
              <div className="absolute -top-3 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-md">
                y = ax² + bx + c
              </div>
              <div className="absolute -bottom-3 -left-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-md">
                |u| = √(x² + y²)
              </div>

              {/* Central Math Simulation Mock Display */}
              <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    Mặt phẳng Oxy · Không gian số
                  </span>
                  <span className="text-blue-400">GDPT 2018</span>
                </div>

                <div className="py-6 flex flex-col items-center justify-center relative">
                  {/* Decorative 3D Axes Graphic */}
                  <svg viewBox="0 0 240 130" className="w-full h-36" fill="none">
                    {/* Grid */}
                    <line x1="20" y1="35" x2="220" y2="35" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="20" y1="65" x2="220" y2="65" stroke="#334155" strokeWidth="1.5" />
                    <line x1="20" y1="95" x2="220" y2="95" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="60" y1="10" x2="60" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="120" y1="10" x2="120" y2="120" stroke="#334155" strokeWidth="1.5" />
                    <line x1="180" y1="10" x2="180" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Parabola curve */}
                    <path
                      d="M40 105C75 105 100 25 120 25C140 25 165 105 200 105"
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Vertex point */}
                    <circle cx="120" cy="25" r="5" fill="#f43f5e" />
                    {/* Vector arrow */}
                    <line x1="120" y1="65" x2="165" y2="40" stroke="#34d399" strokeWidth="2.5" />
                    <polygon points="165,40 156,42 161,48" fill="#34d399" />
                  </svg>

                  <div className="mt-2 text-center text-xs text-slate-300">
                    <span className="text-cyan-400 font-semibold">Tương tác trực quan</span> · Kiểm chứng lý thuyết qua thực nghiệm số
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
                  <div className="bg-slate-800/60 p-1.5 rounded-lg">
                    <div className="text-white font-bold font-mono">100%</div>
                    <div>Tương tác</div>
                  </div>
                  <div className="bg-slate-800/60 p-1.5 rounded-lg">
                    <div className="text-white font-bold font-mono">HTML5</div>
                    <div>Chạy tức thì</div>
                  </div>
                  <div className="bg-slate-800/60 p-1.5 rounded-lg">
                    <div className="text-white font-bold font-mono">Gemini</div>
                    <div>Trợ lý số</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
