import React from 'react';
import {
  Gamepad2, Compass, FileText, Network, Bot, ShieldCheck, Home,
  UserPlus, User, Lock, Sparkles, Phone, Users, Activity, Eye, TrendingUp
} from 'lucide-react';
import { WebUser, VisitorStats } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, initialAdminTab?: string) => void;
  isAdmin: boolean;
  currentUser: WebUser | null;
  onOpenUserModal: () => void;
  visitorStats?: VisitorStats | null;
  onOpenVisitorStats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  currentUser,
  onOpenUserModal,
  visitorStats,
  onOpenVisitorStats
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark with math accent */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg tracking-tight font-mono">10</span>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                TOÁN 10
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600/90 -mt-1">
                TEAM AI GENZ · THPT XUÂN GIANG
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'text-blue-700 bg-blue-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>Trang chủ</span>
            </button>

            <button
              onClick={() => onNavigate('games')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'games'
                  ? 'text-purple-700 bg-purple-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>Trò chơi</span>
            </button>

            <button
              onClick={() => onNavigate('simulations')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'simulations'
                  ? 'text-cyan-700 bg-cyan-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-600" />
              <span>Mô phỏng</span>
            </button>

            <button
              onClick={() => onNavigate('infographics')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'infographics'
                  ? 'text-emerald-700 bg-emerald-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Infographic</span>
            </button>

            <button
              onClick={() => onNavigate('mindmaps')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'mindmaps'
                  ? 'text-amber-700 bg-amber-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Network className="w-4 h-4 text-amber-600" />
              <span>Sơ đồ tư duy</span>
            </button>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentView === 'ai-assistant'
                  ? 'text-indigo-700 bg-indigo-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Trợ lý AI</span>
            </button>
          </nav>

          {/* Zone 3: Login Actions for Users and Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* NÚT TỔNG HỢP SỐ LƯỢT NGƯỜI GHÉ THĂM WEBAPP */}
            <button
              onClick={onOpenVisitorStats}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50/70 to-purple-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/90 text-blue-900 transition-all cursor-pointer shadow-2xs group"
              title="Bấm để xem báo cáo tổng hợp số lượt người ghé thăm webapp (Thời gian thực)"
            >
              <div className="relative w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <Eye className="w-3.5 h-3.5 text-cyan-200" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white animate-pulse"></span>
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-700 leading-none">
                  Lượt ghé thăm
                </div>
                <div className="text-xs font-black text-slate-900 font-mono mt-0.5 flex items-center gap-1">
                  <span>{(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}</span>
                  <span className="text-[10px] font-semibold text-emerald-600 font-sans">lượt</span>
                </div>
              </div>
            </button>

            {/* 1. NÚT ĐĂNG NHẬP / GHI DANH NGƯỜI DÙNG */}
            {currentUser ? (
              <button
                onClick={onOpenUserModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/90 text-blue-900 transition-all cursor-pointer shadow-2xs group"
                title="Bấm để xem lịch sử khám phá và điểm số các trò chơi"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-tight truncate max-w-[140px] flex items-center gap-1">
                    <span className="truncate">{currentUser.fullName}</span>
                    {currentUser.className && (
                      <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold text-[10px] shrink-0">
                        {currentUser.className}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-blue-600 font-mono flex items-center gap-1">
                    <span>{currentUser.totalClicks || 0} lượt</span>
                    <span>·</span>
                    <span>{currentUser.gameScores?.length || 0} game</span>
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenUserModal}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer ring-2 ring-blue-500/20"
                title="Ghi danh Họ tên và Số điện thoại để tham gia hoạt động"
              >
                <UserPlus className="w-4 h-4" />
                <span className="font-bold tracking-tight">Ghi danh học tập</span>
              </button>
            )}

            {/* 2. NÚT ĐĂNG NHẬP QUẢN TRỊ / ADMIN */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onNavigate('admin', 'users')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
                  title="Quản lý người dùng web và tải Google Sheets"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quản lý người dùng web</span>
                </button>

                <button
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                    currentView === 'admin'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-800 text-white border-slate-800 hover:bg-slate-900'
                  }`}
                  title="Vào trang Quản trị hệ thống"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Quản trị</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900 shadow-xs'
                }`}
                title="Đăng nhập Quản trị viên"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold tracking-tight">Đăng nhập Admin</span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1.5 scrollbar-none border-t border-slate-100 items-center">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'home' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onNavigate('games')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'games' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Trò chơi
          </button>
          <button
            onClick={() => onNavigate('simulations')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'simulations' ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Mô phỏng
          </button>
          <button
            onClick={() => onNavigate('infographics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'infographics' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Infographic
          </button>
          <button
            onClick={() => onNavigate('mindmaps')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'mindmaps' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Sơ đồ tư duy
          </button>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
              currentView === 'ai-assistant' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Trợ lý AI
          </button>

          {/* Quick buttons in mobile bar */}
          <button
            onClick={onOpenVisitorStats}
            className="px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200"
            title="Xem báo cáo tổng hợp số lượt người ghé thăm webapp"
          >
            <Eye className="w-3 h-3 text-blue-600" />
            <span className="font-mono font-black">{(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}</span>
            <span>lượt ghé thăm</span>
          </button>

          <button
            onClick={onOpenUserModal}
            className={`px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              currentUser
                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                : 'bg-blue-600 text-white shadow-xs'
            }`}
          >
            <User className="w-3 h-3" />
            <span>{currentUser ? currentUser.fullName.split(' ').slice(-1)[0] : 'Ghi danh học tập'}</span>
          </button>

          {isAdmin ? (
            <>
              <button
                onClick={() => onNavigate('admin', 'users')}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-pointer flex items-center gap-1"
              >
                <Users className="w-3 h-3 text-emerald-700" />
                <span>QL Người dùng</span>
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap bg-slate-900 text-white cursor-pointer flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Quản trị</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('admin')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-800 text-white hover:bg-slate-900'
              }`}
            >
              <Lock className="w-3 h-3 text-blue-400" />
              <span>Đăng nhập Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
