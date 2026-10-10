import {downloadApiFile} from '../services/request';
import React, { useState, useEffect } from 'react';
import {
  Users, TrendingUp, Calendar, Globe, Smartphone, Monitor, Tablet,
  RefreshCw, Download, X, Activity, CheckCircle2, ShieldCheck,
  Eye, Sparkles, BarChart3, Clock, ArrowUpRight, Award, Compass,
  Gamepad2, FileText, Network, Bot, School
} from 'lucide-react';
import { VisitorStats, VisitorRecord } from '../types';
import { getVisitorStats, resetVisitorStats } from '../services/api';

interface VisitorStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: VisitorStats | null;
  onRefresh: () => Promise<void>;
  isAdmin?: boolean;
  token?: string;
}

export const VisitorStatsModal: React.FC<VisitorStatsModalProps> = ({
  isOpen,
  onClose,
  stats: propStats,
  onRefresh,
  isAdmin = false,
  token
}) => {
  const [localStats, setLocalStats] = useState<VisitorStats | null>(propStats);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'pages' | 'recent'>('overview');
  const [resetMessage, setResetMessage] = useState('');

  useEffect(() => {
    if (propStats) {
      setLocalStats(propStats);
    }
  }, [propStats]);

  useEffect(() => {
    if (isOpen) {
      handleManualRefresh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    setResetMessage('');
    try {
      await onRefresh();
      const fresh = await getVisitorStats();
      setLocalStats(fresh);
    } catch (err) {
      console.warn('Refresh visitor stats failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleReset = async () => {
    if (!isAdmin) return;
    if (window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn đặt lại bộ đếm số lượt ghé thăm webapp về ban đầu?')) {
      try {
        await resetVisitorStats(token);
        await handleManualRefresh();
        setResetMessage('Đã thiết lập lại dữ liệu thành công!');
        setTimeout(() => setResetMessage(''), 3000);
      } catch (err: any) {
        alert(err.message || 'Lỗi khi đặt lại bộ đếm');
      }
    }
  };

  const currentStats = localStats || propStats;
  const totalVisits = currentStats?.totalVisits || 0;
  const uniqueVisitors = currentStats?.uniqueVisitors || 0;
  const todayVisits = currentStats?.todayVisits || 0;
  const registeredCount = currentStats?.registeredUsersCount || 0;
  const totalInteractions = currentStats?.totalInteractions || 0;

  // Compute daily visits array
  const dailyEntries = Object.entries(currentStats?.dailyVisits || {})
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .slice(-10);

  const maxDailyVisit = Math.max(...dailyEntries.map(([_, count]) => count), 1);

  // Compute page views
  const pageViewEntries = Object.entries(currentStats?.pageViews || {}).sort((a, b) => b[1] - a[1]);
  const totalPageViews = pageViewEntries.reduce((acc, [_, count]) => acc + count, 0) || 1;

  const getPageMeta = (key: string) => {
    switch (key) {
      case 'home':
        return { name: 'Trang chủ', color: 'bg-blue-500', text: 'text-blue-700', icon: Globe };
      case 'games':
        return { name: 'Trò chơi Toán học', color: 'bg-purple-500', text: 'text-purple-700', icon: Gamepad2 };
      case 'simulations':
        return { name: 'Mô phỏng GeoGebra', color: 'bg-cyan-500', text: 'text-cyan-700', icon: Compass };
      case 'infographics':
        return { name: 'Infographic Toán 10', color: 'bg-emerald-500', text: 'text-emerald-700', icon: FileText };
      case 'mindmaps':
        return { name: 'Sơ đồ tư duy', color: 'bg-amber-500', text: 'text-amber-700', icon: Network };
      case 'ai-assistant':
        return { name: 'Trợ lý AI Gem', color: 'bg-indigo-500', text: 'text-indigo-700', icon: Bot };
      case 'admin':
        return { name: 'Quản trị hệ thống', color: 'bg-slate-700', text: 'text-slate-800', icon: ShieldCheck };
      default:
        return { name: key, color: 'bg-slate-400', text: 'text-slate-700', icon: Eye };
    }
  };

  const deviceData = currentStats?.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 };
  const totalDevices = (deviceData.mobile + deviceData.desktop + deviceData.tablet) || 1;

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  const formatDateTime = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 px-6 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-inner shrink-0">
              <Activity className="w-6 h-6 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Tổng Hợp Số Lượt Người Ghé Thăm
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Trực tuyến
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium mt-0.5">
                TOÁN 10 · TEAM AI GENZ 10A1, THPT XUÂN GIANG · Thống kê lưu lượng học tập
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Làm mới số liệu"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-300' : ''}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>

            <a
              href="#"
              onClick={async (e) => { e.preventDefault(); try { await downloadApiFile("/api/visitors/export-csv", "Thong_ke.csv"); } catch (error: any) { alert(error.message); } }}
              download="Bao_cao_tong_hop_luot_ghe_tham_Toan10.csv"
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Tải báo cáo chi tiết về máy"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel/CSV</span>
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Tổng quan số liệu</span>
            </button>

            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'daily'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Biểu đồ theo ngày</span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'pages'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Lượt xem chuyên mục</span>
            </button>

            <button
              onClick={() => setActiveTab('recent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'recent'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Lượt truy cập gần đây</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 hidden md:block whitespace-nowrap font-mono">
            Cập nhật: {currentStats?.lastUpdated ? formatDateTime(currentStats.lastUpdated) : 'Vừa xong'}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {resetMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resetMessage}</span>
            </div>
          )}

          {/* 5 KEY KPI METRIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            
            {/* 1. Tổng lượt ghé thăm */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 p-4 rounded-2xl border border-blue-200/80 shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-800">Tổng ghé thăm</span>
                <Globe className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-mono tracking-tight">
                {totalVisits.toLocaleString('vi-VN')}
              </div>
              <div className="text-[11px] text-blue-700 font-medium mt-1 flex items-center gap-1">
                <span>Toàn bộ lượt truy cập web</span>
              </div>
            </div>

            {/* 2. Khách duy nhất */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50/60 p-4 rounded-2xl border border-purple-200/80 shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-purple-600 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-800">Người ghé thăm</span>
                <Users className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 font-mono tracking-tight">
                {uniqueVisitors.toLocaleString('vi-VN')}
              </div>
              <div className="text-[11px] text-purple-700 font-medium mt-1">
                Khách độc lập / thiết bị
              </div>
            </div>

            {/* 3. Lượt ghé thăm hôm nay */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-4 rounded-2xl border border-emerald-200/80 shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">Hôm nay</span>
                <Calendar className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-mono tracking-tight flex items-baseline gap-1">
                <span>+{todayVisits.toLocaleString('vi-VN')}</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-1">
                Lượt ghé thăm trong ngày
              </div>
            </div>

            {/* 4. Học sinh ghi danh */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-4 rounded-2xl border border-amber-200/80 shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-amber-600 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">Đã ghi danh</span>
                <School className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-mono tracking-tight">
                {registeredCount.toLocaleString('vi-VN')}
              </div>
              <div className="text-[11px] text-amber-700 font-medium mt-1">
                Học sinh & thầy cô
              </div>
            </div>

            {/* 5. Tổng lượt tương tác */}
            <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-50 to-cyan-50/60 p-4 rounded-2xl border border-indigo-200/80 shadow-2xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-indigo-600 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800">Lượt tương tác</span>
                <Sparkles className="w-4 h-4 opacity-75 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {totalInteractions.toLocaleString('vi-VN')}
              </div>
              <div className="text-[11px] text-indigo-700 font-medium mt-1">
                Lượt bấm khám phá bài học
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {(activeTab === 'overview' || activeTab === 'daily') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Xu Hướng Lượt Ghé Thăm (10 ngày gần nhất)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Trung bình: ~{Math.round(dailyEntries.reduce((acc, [_, c]) => acc + c, 0) / (dailyEntries.length || 1))} lượt/ngày
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-44 pt-6 pb-2 flex items-end gap-2 sm:gap-3 px-2 border-b border-slate-100">
                {dailyEntries.map(([dateStr, count], idx) => {
                  const heightPercent = Math.max(12, Math.round((count / maxDailyVisit) * 100));
                  const isLatest = idx === dailyEntries.length - 1;
                  return (
                    <div key={dateStr} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {count} lượt ({formatDate(dateStr)})
                      </div>
                      
                      <span className="text-[11px] font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors font-mono">
                        {count}
                      </span>
                      
                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-xs ${
                          isLatest
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                            : 'bg-gradient-to-t from-blue-600 to-indigo-400'
                        }`}
                      ></div>

                      <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-2 whitespace-nowrap">
                        {formatDate(dateStr)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block"></span>
                    <span>Ngày trước</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span>
                    <span>Hôm nay (Thời gian thực)</span>
                  </div>
                </div>
                <span>Dữ liệu lưu trữ máy chủ liên tục</span>
              </div>
            </div>
          )}

          {/* DEVICE BREAKDOWN SECTION (Shown in overview and pages) */}
          {(activeTab === 'overview' || activeTab === 'pages') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Device Chart */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-extrabold text-slate-900">
                      Thiết Bị Truy Cập
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    100% người dùng
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Mobile */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                        Điện thoại di động (Mobile)
                      </span>
                      <span className="font-mono text-slate-900">
                        {deviceData.mobile} lượt ({Math.round((deviceData.mobile / totalDevices) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${(deviceData.mobile / totalDevices) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Desktop */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                        Máy tính / Laptop (Desktop)
                      </span>
                      <span className="font-mono text-slate-900">
                        {deviceData.desktop} lượt ({Math.round((deviceData.desktop / totalDevices) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${(deviceData.desktop / totalDevices) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tablet */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Tablet className="w-3.5 h-3.5 text-emerald-600" />
                        Máy tính bảng (Tablet)
                      </span>
                      <span className="font-mono text-slate-900">
                        {deviceData.tablet} lượt ({Math.round((deviceData.tablet / totalDevices) * 100)}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${(deviceData.tablet / totalDevices) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Page Views */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-extrabold text-slate-900">
                      Phân Bố Theo Chuyên Mục
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    Top quan tâm
                  </span>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {pageViewEntries.map(([key, count]) => {
                    const meta = getPageMeta(key);
                    const percent = Math.round((count / totalPageViews) * 100);
                    const Icon = meta.icon;
                    return (
                      <div key={key} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-6 h-6 rounded-lg ${meta.color} text-white flex items-center justify-center shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {meta.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                          <span className="font-extrabold text-slate-900">{count} lượt</span>
                          <span className="text-[11px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-semibold">
                            {percent}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* RECENT VISITORS LOG TABLE */}
          {(activeTab === 'overview' || activeTab === 'recent') && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Nhật Ký Khách Ghé Thăm Gần Đây (Mới nhất)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {currentStats?.recentVisitors?.length || 0} lượt gần đây
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-64 overflow-y-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="py-2.5 px-3">Thời gian</th>
                      <th className="py-2.5 px-3">Người dùng</th>
                      <th className="py-2.5 px-3">Chuyên mục</th>
                      <th className="py-2.5 px-3">Thiết bị</th>
                      <th className="py-2.5 px-3">Trình duyệt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentStats?.recentVisitors && currentStats.recentVisitors.length > 0 ? (
                      currentStats.recentVisitors.map((entry, index) => {
                        const meta = getPageMeta(entry.page);
                        return (
                          <tr key={entry.id || index} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2 px-3 font-mono text-slate-500 whitespace-nowrap">
                              {formatDateTime(entry.timestamp)}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className="font-bold text-slate-900">
                                {entry.userName || 'Khách ghé thăm'}
                              </span>
                              {entry.isRegistered && (
                                <span className="ml-1.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded">
                                  Học sinh
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 font-semibold ${meta.text}`}>
                                {meta.name}
                              </span>
                            </td>
                            <td className="py-2 px-3 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 text-slate-600">
                                {entry.device === 'Mobile' ? (
                                  <Smartphone className="w-3 h-3 text-blue-500" />
                                ) : entry.device === 'Tablet' ? (
                                  <Tablet className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Monitor className="w-3 h-3 text-indigo-500" />
                                )}
                                {entry.device}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-slate-500 font-mono whitespace-nowrap">
                              {entry.browser || 'Web Browser'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400">
                          Chưa có nhật ký truy cập.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN ACTIONS: RESET COUNTER */}
          {isAdmin && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-rose-900">
              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  Quyền Quản Trị: Đặt lại bộ đếm lượt ghé thăm
                </div>
                <div className="text-[11px] text-rose-700">
                  Dành riêng cho giáo viên / quản trị viên khi cần xóa và khởi tạo lại số liệu.
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                Đặt lại bộ đếm
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100/90 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Thư viện học liệu số Toán 10 · TEAM AI GENZ 10A1, THPT XUÂN GIANG</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href="#"
              onClick={async (e) => { e.preventDefault(); try { await downloadApiFile("/api/visitors/export-csv", "Thong_ke.csv"); } catch (error: any) { alert(error.message); } }}
              download="Bao_cao_tong_hop_luot_ghe_tham_Toan10.csv"
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Tải file Excel / CSV</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
