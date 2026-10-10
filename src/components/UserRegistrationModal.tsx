import React, { useState } from 'react';
import {
  X, UserCheck, Phone, User, Sparkles, CheckCircle2,
  Gamepad2, Compass, FileText, Network, LogOut, RefreshCw, Trophy,
  GraduationCap, School
} from 'lucide-react';
import { WebUser } from '../types';
import { registerWebUser } from '../services/api';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: WebUser | null;
  onUserChange: (user: WebUser | null) => void;
  promptMessage?: string;
}

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  promptMessage
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = fullName.trim();
    const cleanPhone = phone.replace(/[\s\-\.]/g, '').trim();
    const cleanClass = className.trim();
    const cleanSchool = school.trim();

    if (!cleanName) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
      setError('Vui lòng nhập số điện thoại hợp lệ (từ 8 đến 15 chữ số).');
      return;
    }

    if (!cleanClass || !cleanSchool) { setError('Vui lòng nhập Lớp và Trường.'); return; }
    setIsSubmitting(true);
    try {
      const user = await registerWebUser(cleanName, cleanPhone, cleanClass, cleanSchool);
      onUserChange(user);
      setIsSwitching(false);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi ghi danh. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    onUserChange(null);
    setFullName('');
    setPhone('');
    setClassName('');
    setSchool('');
    setIsSwitching(false);
  };

  // If user already logged in and not switching account, show their current profile & activities
  if (currentUser && !isSwitching) {
    const totalEarned = (currentUser.gameScores || []).reduce((acc, g) => acc + g.score, 0);
    const totalPossible = (currentUser.gameScores || []).reduce((acc, g) => acc + g.maxScore, 0);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-extrabold text-2xl shadow-inner shrink-0">
                {currentUser.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 text-[11px] font-semibold mb-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  <span>Đã ghi danh tham gia</span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight truncate">
                  {currentUser.fullName}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-blue-100">
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3" /> {currentUser.phone}
                  </span>
                  {currentUser.className && (
                    <span className="flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-md">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-200" /> Lớp: {currentUser.className}
                    </span>
                  )}
                  {currentUser.school && (
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md truncate max-w-[200px]" title={currentUser.school}>
                      <School className="w-3.5 h-3.5 text-blue-200" /> {currentUser.school}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Class & School detail banner if not yet filled */}
            {(!currentUser.className || !currentUser.school) && (
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-900 text-xs flex items-center justify-between gap-2">
                <span className="text-[11px]">
                  Nhập đủ Lớp và Trường để giáo viên theo dõi hoạt động học tập.
                </span>
                <button
                  onClick={() => {
                    setFullName(currentUser.fullName);
                    setPhone(currentUser.phone);
                    setClassName(currentUser.className || '');
                    setSchool(currentUser.school || '');
                    setIsSwitching(true);
                  }}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-bold text-[11px] whitespace-nowrap cursor-pointer hover:bg-blue-700"
                >
                  Cập nhật ngay
                </button>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                <span className="text-xs font-semibold text-blue-700 block">Lượt khám phá</span>
                <span className="text-2xl font-extrabold text-blue-900 mt-1 block">
                  {currentUser.totalClicks || 0}
                </span>
                <span className="text-[11px] text-blue-600">lần tương tác</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                <span className="text-xs font-semibold text-purple-700 block">Điểm trò chơi</span>
                <span className="text-2xl font-extrabold text-purple-900 mt-1 block">
                  {totalEarned} <span className="text-sm font-normal text-purple-600">/ {totalPossible || 0}</span>
                </span>
                <span className="text-[11px] text-purple-600">
                  {totalPossible > 0 ? `${Math.round((totalEarned / totalPossible) * 100)}% thành tích` : 'Chưa thi đấu'}
                </span>
              </div>
            </div>

            {/* Games Completed */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Trò chơi đã tham gia ({currentUser.gameScores?.length || 0})</span>
              </h4>
              {(!currentUser.gameScores || currentUser.gameScores.length === 0) ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 text-center">
                  Bạn chưa ghi nhận kết quả trò chơi nào. Hãy vào mục <strong className="text-purple-600">Trò chơi</strong> để thử sức và lưu điểm nhé!
                </div>
              ) : (
                <div className="space-y-2">
                  {currentUser.gameScores.map((game, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{game.gameTitle}</div>
                        <div className="text-[11px] text-slate-500">Đã chơi {game.playCount || 1} lượt</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-purple-700">
                          {game.score} / {game.maxScore}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {Math.round((game.score / (game.maxScore || 1)) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Explorations clicked */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Nội dung đã khám phá ({currentUser.explorations?.length || 0})</span>
              </h4>
              {(!currentUser.explorations || currentUser.explorations.length === 0) ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 text-center">
                  Mỗi khi bạn mở bài học, mô phỏng, infographic hay trò chơi, hệ thống sẽ tự động ghi nhớ tại đây!
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
                  {currentUser.explorations.map((exp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700"
                    >
                      <span className="truncate max-w-[200px]">{exp.itemTitle}</span>
                      <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-md font-mono text-[10px] font-bold">
                        {exp.clickCount} lần
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setFullName(currentUser.fullName);
                setPhone(currentUser.phone);
                setClassName(currentUser.className || '');
                setSchool(currentUser.school || '');
                setIsSwitching(true);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đổi thông tin</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Tiếp tục học tập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form View
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-3">
            <UserCheck className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-extrabold tracking-tight">
            Đăng Nhập / Ghi Danh Người Dùng
          </h3>
          <p className="text-xs text-blue-100 mt-1 leading-relaxed">
            Nhập Họ tên, Số điện thoại cùng Lớp và Trường học để mở khóa tham gia các trò chơi, bài học, lưu điểm số và bảng xếp hạng học tập.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {promptMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">
                {promptMessage}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Họ và tên của bạn <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0987654321"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Số điện thoại dùng làm định danh để tự động lưu điểm trò chơi và các bài học bạn đã khám phá.
            </p>
          </div>

          {/* BỔ SUNG MỤC LỚP VÀ TRƯỜNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Lớp học <span className="text-slate-400 font-normal lowercase">(ví dụ: 10A1)</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required maxLength={200}
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Ví dụ: 10A1, 10A2..."
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Trường học <span className="text-slate-400 font-normal lowercase">(tên trường)</span>
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required maxLength={200}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Ví dụ: THPT Xuân Giang"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {/* Quick Perks */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Quyền lợi sau khi ghi danh:</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
              <li>Mở khóa toàn bộ 25+ trò chơi Toán 10 tương tác trên web.</li>
              <li>Lưu lại điểm số và xếp hạng thi đua theo từng lớp và từng trường.</li>
              <li>Xem lại lịch sử các bài học, sơ đồ tư duy và mô phỏng đã bấm.</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            {isSwitching && (
              <button
                type="button"
                onClick={() => setIsSwitching(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Đang ghi danh...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Xác Nhận & Bắt Đầu Khám Phá</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

