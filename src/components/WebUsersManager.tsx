import React, { useState, useEffect } from 'react';
import {
  Users, Download, FileSpreadsheet, Search, RefreshCw, Trash2,
  Eye, CheckCircle2, Trophy, Sparkles, Phone, Calendar, ArrowUpDown,
  ExternalLink, Copy, Check, AlertCircle, BarChart3, HelpCircle,
  GraduationCap, School
} from 'lucide-react';
import { WebUser } from '../types';
import { getWebUsers, deleteWebUser, clearAllWebUsers } from '../services/api';

interface WebUsersManagerProps {
  token?: string;
}

export const WebUsersManager: React.FC<WebUsersManagerProps> = ({ token }) => {
  const [users, setUsers] = useState<WebUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<WebUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<WebUser | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const data = await getWebUsers(token);
      setUsers(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải danh sách người dùng web.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (user: WebUser) => {
    try {
      await deleteWebUser(user.id || user.phone, token);
      setUsers(prev => prev.filter(u => u.id !== user.id && u.phone !== user.phone));
      setUserToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa người dùng');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa TOÀN BỘ dữ liệu người dùng và lịch sử khám phá không?')) {
      try {
        await clearAllWebUsers(token);
        setUsers([]);
      } catch (err: any) {
        alert(err.message || 'Lỗi khi xóa dữ liệu');
      }
    }
  };

  // Generate CSV content for Google Sheets / Excel
  const generateCsvData = (): string => {
    const headers = [
      'STT',
      'Họ và tên người đăng nhập',
      'Số điện thoại',
      'Lớp',
      'Trường',
      'Thời gian ghi danh',
      'Lần hoạt động cuối',
      'Tổng số lượt bấm',
      'Những khám phá đã bấm',
      'Điểm trò chơi (Đạt / Tổng điểm)',
      'Tổng điểm đạt được'
    ];

    const rows = users.map((u, index) => {
      const explorationsStr = (u.explorations || [])
        .map(e => `${e.itemTitle} (${e.clickCount} lượt)`)
        .join('; ');

      const gameScoresStr = (u.gameScores || [])
        .map(g => `${g.gameTitle}: ${g.score}/${g.maxScore}`)
        .join('; ');

      const totalEarned = (u.gameScores || []).reduce((acc, g) => acc + g.score, 0);
      const totalPossible = (u.gameScores || []).reduce((acc, g) => acc + g.maxScore, 0);
      const totalScoreStr = totalPossible > 0
        ? `${totalEarned}/${totalPossible} (${Math.round((totalEarned / totalPossible) * 100)}%)`
        : 'Chưa tham gia';

      const regDate = u.registeredAt ? new Date(u.registeredAt).toLocaleString('vi-VN') : '';
      const lastActiveDate = u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleString('vi-VN') : '';

      return [
        (index + 1).toString(),
        u.fullName,
        u.phone,
        u.className || '',
        u.school || '',
        regDate,
        lastActiveDate,
        (u.totalClicks || 0).toString(),
        explorationsStr || 'Chưa có',
        gameScoresStr || 'Chưa có điểm',
        totalScoreStr
      ];
    });

    const csvRows = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))
    ];

    // \uFEFF is the UTF-8 Byte Order Mark so Google Sheets and Excel recognize Vietnamese without encoding errors
    return '\uFEFF' + csvRows.join('\r\n');
  };

  // Direct CSV download
  const handleDownloadGoogleSheetsCsv = () => {
    const csv = generateCsvData();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.download = `Danh_sach_nguoi_dung_Toan10_${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy table for pasting directly into Google Sheets (TSV format)
  const handleCopyForGoogleSheets = async () => {
    const headers = [
      'STT',
      'Họ và tên người đăng nhập',
      'Số điện thoại',
      'Lớp',
      'Trường',
      'Thời gian ghi danh',
      'Lần hoạt động cuối',
      'Tổng số lượt bấm',
      'Những khám phá đã bấm',
      'Điểm trò chơi (Đạt / Tổng điểm)',
      'Tổng điểm đạt được'
    ];

    const rows = users.map((u, index) => {
      const explorationsStr = (u.explorations || [])
        .map(e => `${e.itemTitle} (${e.clickCount} lượt)`)
        .join('; ');

      const gameScoresStr = (u.gameScores || [])
        .map(g => `${g.gameTitle}: ${g.score}/${g.maxScore}`)
        .join('; ');

      const totalEarned = (u.gameScores || []).reduce((acc, g) => acc + g.score, 0);
      const totalPossible = (u.gameScores || []).reduce((acc, g) => acc + g.maxScore, 0);
      const totalScoreStr = totalPossible > 0
        ? `${totalEarned}/${totalPossible} (${Math.round((totalEarned / totalPossible) * 100)}%)`
        : 'Chưa tham gia';

      const regDate = u.registeredAt ? new Date(u.registeredAt).toLocaleString('vi-VN') : '';
      const lastActiveDate = u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleString('vi-VN') : '';

      return [
        (index + 1).toString(),
        u.fullName,
        u.phone,
        u.className || '',
        u.school || '',
        regDate,
        lastActiveDate,
        (u.totalClicks || 0).toString(),
        explorationsStr || 'Chưa có',
        gameScoresStr || 'Chưa có điểm',
        totalScoreStr
      ];
    });

    const tsvContent = [
      headers.join('\t'),
      ...rows.map(r => r.join('\t'))
    ].join('\n');

    try {
      await navigator.clipboard.writeText(tsvContent);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch {
      alert('Không thể sao chép tự động, vui lòng dùng nút Tải Google Sheets.');
    }
  };

  // Filter users
  const filteredUsers = users.filter(u => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(term) ||
      u.phone.includes(term) ||
      (u.className && u.className.toLowerCase().includes(term)) ||
      (u.school && u.school.toLowerCase().includes(term)) ||
      (u.explorations || []).some(e => e.itemTitle.toLowerCase().includes(term))
    );
  });

  // Aggregate statistics
  const totalExplorationClicks = users.reduce((acc, u) => acc + (u.totalClicks || 0), 0);
  const totalUsersWithScores = users.filter(u => (u.gameScores?.length || 0) > 0).length;
  const totalCompletedGames = users.reduce((acc, u) => acc + (u.gameScores?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* 1. Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Người dùng đã ghi danh</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{users.length}</div>
            <span className="text-[11px] text-blue-600 font-medium">Học sinh / Giáo viên</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Tổng lượt khám phá</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalExplorationClicks}</div>
            <span className="text-[11px] text-amber-600 font-medium">Lượt tương tác học liệu</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500">Đã tham gia trò chơi</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalUsersWithScores}</div>
            <span className="text-[11px] text-purple-600 font-medium">{totalCompletedGames} lượt ghi nhận điểm</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-100">Xuất báo cáo kết quả</span>
            <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
          </div>
          <div className="mt-2">
            <button
              onClick={handleDownloadGoogleSheetsCsv}
              className="w-full py-2.5 px-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải Google Sheets (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Action & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên học sinh, số điện thoại hoặc bài đã xem..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Google Sheets Export Button */}
          <button
            onClick={handleDownloadGoogleSheetsCsv}
            title="Tải tệp CSV chuẩn UTF-8 tương thích 100% với Google Sheets và Excel"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
            <span>Tải Google Sheets</span>
          </button>

          {/* Copy Table for Google Sheets */}
          <button
            onClick={handleCopyForGoogleSheets}
            title="Sao chép toàn bộ bảng dữ liệu. Bạn chỉ cần mở Google Sheets và nhấn Ctrl+V để dán trực tiếp!"
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Sao chép dán Sheets</span>
              </>
            )}
          </button>

          {/* Refresh */}
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            title="Làm mới dữ liệu người dùng"
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          {/* Open Google Sheets Online */}
          <a
            href="https://sheets.new"
            target="_blank"
            rel="noopener noreferrer"
            title="Mở một trang tính Google Sheets mới trong tab mới"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Mở Sheets mới</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Clear All */}
          {users.length > 0 && (
            <button
              onClick={handleClearAll}
              title="Xóa toàn bộ dữ liệu người dùng"
              className="p-2.5 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Helpful Guidance Note */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Mẹo tiện ích:</strong> Nút <strong>Tải Google Sheets</strong> xuất tệp CSV mã hóa UTF-8 tiếng Việt chuẩn (có BOM). Bạn có thể mở trực tiếp trong Excel hoặc tải lên Google Sheets (vào <em>Tệp ➔ Nhập ➔ Tải lên</em>) sẽ hiển thị đúng tên, số điện thoại, danh sách khám phá và điểm số 100%!
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 4. Main Web Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">STT</th>
                <th className="py-3.5 px-4 min-w-[180px]">Họ và tên người đăng nhập</th>
                <th className="py-3.5 px-3 min-w-[120px]">Số điện thoại</th>
                <th className="py-3.5 px-3 min-w-[90px]">Lớp</th>
                <th className="py-3.5 px-3 min-w-[150px]">Trường</th>
                <th className="py-3.5 px-3 text-center min-w-[90px]">Lượt bấm</th>
                <th className="py-3.5 px-4 min-w-[240px]">Những khám phá đã bấm</th>
                <th className="py-3.5 px-4 min-w-[200px]">Điểm trò chơi (Đạt / Tổng)</th>
                <th className="py-3.5 px-3 min-w-[120px]">Thời gian</th>
                <th className="py-3.5 px-3 text-center w-20">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <Users className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">Chưa có người dùng nào ghi danh</p>
                    <p className="text-xs mt-1">Khi học sinh hoặc giáo viên bấm nút "Ghi danh" và trải nghiệm các học liệu, dữ liệu sẽ tự động xuất hiện tại đây.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const totalEarned = (user.gameScores || []).reduce((acc, g) => acc + g.score, 0);
                  const totalPossible = (user.gameScores || []).reduce((acc, g) => acc + g.maxScore, 0);
                  const hasScores = (user.gameScores?.length || 0) > 0;

                  return (
                    <tr key={user.id || user.phone} className="hover:bg-slate-50/80 transition-colors">
                      {/* STT */}
                      <td className="py-4 px-4 text-center font-mono text-slate-400 font-semibold">
                        {index + 1}
                      </td>

                      {/* Họ và tên */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 uppercase text-xs">
                            {user.fullName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{user.fullName}</div>
                            <span className="text-[11px] text-slate-400">ID: {user.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* Số điện thoại */}
                      <td className="py-4 px-3 font-mono font-semibold text-blue-700">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs">
                          <Phone className="w-3 h-3 text-blue-500" />
                          <span>{user.phone}</span>
                        </div>
                      </td>

                      {/* Lớp */}
                      <td className="py-4 px-3">
                        {user.className ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{user.className}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">—</span>
                        )}
                      </td>

                      {/* Trường */}
                      <td className="py-4 px-3 max-w-[170px]">
                        {user.school ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium truncate" title={user.school}>
                            <School className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{user.school}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">—</span>
                        )}
                      </td>

                      {/* Số lượt bấm */}
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono font-bold text-xs">
                          {user.totalClicks || 0}
                        </span>
                      </td>

                      {/* Những khám phá đã bấm */}
                      <td className="py-4 px-4">
                        {(!user.explorations || user.explorations.length === 0) ? (
                          <span className="text-xs text-slate-400 italic">Chưa bấm học liệu</span>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex flex-wrap gap-1 max-w-sm">
                              {user.explorations.slice(0, 3).map((exp, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 max-w-[200px] truncate"
                                  title={`${exp.itemTitle}: ${exp.clickCount} lượt bấm`}
                                >
                                  <span className="truncate">{exp.itemTitle}</span>
                                  <span className="font-mono font-bold text-blue-600">({exp.clickCount})</span>
                                </span>
                              ))}
                              {user.explorations.length > 3 && (
                                <button
                                  onClick={() => setSelectedUser(user)}
                                  className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline ml-1 cursor-pointer"
                                >
                                  +{user.explorations.length - 3} mục khác
                                </button>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Đã khám phá {user.explorations.length} chủ đề khác nhau
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Điểm các trò chơi */}
                      <td className="py-4 px-4">
                        {!hasScores ? (
                          <span className="text-xs text-slate-400 italic">Chưa thi đấu trò chơi</span>
                        ) : (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-purple-700">
                                {totalEarned} / {totalPossible}
                              </span>
                              <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 font-semibold font-mono">
                                {Math.round((totalEarned / (totalPossible || 1)) * 100)}%
                              </span>
                            </div>

                            {/* Details tags */}
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.gameScores.slice(0, 2).map((gs, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-[10px] text-purple-900"
                                >
                                  <span className="truncate max-w-[120px]">{gs.gameTitle}:</span>
                                  <strong className="font-mono">{gs.score}/{gs.maxScore}</strong>
                                </span>
                              ))}
                              {user.gameScores.length > 2 && (
                                <button
                                  onClick={() => setSelectedUser(user)}
                                  className="text-[10px] font-bold text-purple-600 underline cursor-pointer"
                                >
                                  +{user.gameScores.length - 2} trò khác
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Thời gian */}
                      <td className="py-4 px-3 text-slate-500 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Ghi danh:</span>
                          <span className="font-medium text-[11px]">
                            {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString('vi-VN') : '—'}
                          </span>
                        </div>
                        {user.lastActiveAt && (
                          <div className="mt-1">
                            <span className="text-slate-400 text-[10px] block">Gần nhất:</span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(user.lastActiveAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Thao tác */}
                      <td className="py-4 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedUser(user)}
                            title="Xem chi tiết hoạt động của học sinh"
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setUserToDelete(user)}
                            title="Xóa người dùng"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Hiển thị <strong>{filteredUsers.length}</strong> / <strong>{users.length}</strong> người dùng đã ghi danh
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Tự động đồng bộ với máy chủ theo thời gian thực</span>
          </div>
        </div>
      </div>

      {/* 5. Detailed User Activity Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Hồ sơ chi tiết hoạt động</span>
                <h3 className="text-xl font-extrabold mt-0.5">{selectedUser.fullName}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-blue-100">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5" /> {selectedUser.phone}
                  </span>
                  {selectedUser.className && (
                    <span className="flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-md">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-200" /> Lớp: {selectedUser.className}
                    </span>
                  )}
                  {selectedUser.school && (
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">
                      <School className="w-3.5 h-3.5 text-blue-200" /> {selectedUser.school}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block">Tổng lượt bấm</span>
                  <span className="text-xl font-extrabold text-blue-700 font-mono mt-1 block">
                    {selectedUser.totalClicks || 0}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block">Số bài đã khám phá</span>
                  <span className="text-xl font-extrabold text-amber-700 font-mono mt-1 block">
                    {selectedUser.explorations?.length || 0}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block">Trò chơi đã hoàn thành</span>
                  <span className="text-xl font-extrabold text-purple-700 font-mono mt-1 block">
                    {selectedUser.gameScores?.length || 0}
                  </span>
                </div>
              </div>

              {/* Game Scores Detail */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-purple-600" />
                  <span>Chi tiết điểm số các trò chơi ({selectedUser.gameScores?.length || 0})</span>
                </h4>
                {(!selectedUser.gameScores || selectedUser.gameScores.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">Học sinh chưa hoàn thành trò chơi nào.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedUser.gameScores.map((game, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/80 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{game.gameTitle}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Số lần chơi: <strong className="font-mono">{game.playCount || 1}</strong> · Cập nhật:{' '}
                            {game.completedAt ? new Date(game.completedAt).toLocaleString('vi-VN') : ''}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-base text-purple-700">
                            {game.score} / {game.maxScore}
                          </span>
                          <span className="text-[11px] text-purple-600 block font-semibold">
                            {Math.round((game.score / (game.maxScore || 1)) * 100)}% điểm
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Explorations List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Danh sách nội dung và bài học đã bấm ({selectedUser.explorations?.length || 0})</span>
                </h4>
                {(!selectedUser.explorations || selectedUser.explorations.length === 0) ? (
                  <p className="text-xs text-slate-400 italic">Chưa ghi nhận lượt bấm nào.</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {selectedUser.explorations.map((exp, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-slate-800">{exp.itemTitle}</div>
                          <div className="text-[10px] text-slate-400">
                            Chuyên mục: <span className="font-medium text-slate-600">{exp.category}</span>
                            {exp.lastClickedAt && ` · Lần cuối: ${new Date(exp.lastClickedAt).toLocaleString('vi-VN')}`}
                          </div>
                        </div>
                        <span className="font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs shrink-0">
                          {exp.clickCount} lượt bấm
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">
              Xóa người dùng này?
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Bạn có chắc chắn muốn xóa bản ghi của học sinh <strong>{userToDelete.fullName}</strong> ({userToDelete.phone})? Mọi dữ liệu lượt bấm và điểm thi sẽ bị hủy.
            </p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteUser(userToDelete)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
