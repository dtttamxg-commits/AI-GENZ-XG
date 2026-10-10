import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import {
  GameController3DIcon,
  Simulation3DIcon,
  Infographic3DIcon,
  MindMap3DIcon,
  AiRobot3DIcon
} from './Math3DIcons';

interface CategoryGridProps {
  onSelectCategory: (category: string) => void;
  counts: {
    games: number;
    simulations: number;
    infographics: number;
    mindmaps: number;
  };
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory, counts }) => {
  const categories = [
    {
      id: 'games',
      title: 'Trò Chơi Toán Học',
      subtitle: '24 Trò chơi tương tác số mở trực tiếp trên web',
      description: 'Bao phủ toàn diện 8 chương Toán 10 GDPT 2018: Mệnh đề, Tập hợp, BPT, Lượng giác, Vectơ, Thống kê, Hàm số, Oxy & Tổ hợp.',
      badge: `${counts.games} trò chơi chuẩn GDPT`,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <GameController3DIcon className="w-18 h-18 sm:w-20 sm:h-20" />,
      gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'border-purple-200/80 hover:border-purple-400',
      shadowColor: 'hover:shadow-purple-500/15',
      accentColor: 'text-purple-700 group-hover:text-purple-800',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
      btnLabel: 'Khám phá trò chơi'
    },
    {
      id: 'simulations',
      title: 'App Mô Phỏng Toán Học',
      subtitle: '18 Ứng dụng số & Phòng thí nghiệm 3D Lab',
      description: 'Quan sát đồ thị hàm số, hình học toạ độ Oxy, hệ thức lượng tam giác, miền nghiệm và vectơ trong không gian 3D tương tác.',
      badge: `${counts.simulations} app mô phỏng`,
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      icon: <Simulation3DIcon className="w-18 h-18 sm:w-20 sm:h-20" />,
      gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      borderColor: 'border-cyan-200/80 hover:border-cyan-400',
      shadowColor: 'hover:shadow-cyan-500/15',
      accentColor: 'text-cyan-700 group-hover:text-cyan-800',
      buttonBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white',
      btnLabel: 'Xem kho mô phỏng'
    },
    {
      id: 'infographics',
      title: 'Infographic Toán 10',
      subtitle: '36 bản đồ thị giác theo từng bài học SGK',
      description: 'Hệ thống hóa toàn diện 27 bài học và 9 bài ôn tập chương (GDPT 2018) qua hình ảnh trực quan, sắc nét và dễ ghi nhớ.',
      badge: `${counts.infographics} bài học chuẩn hóa`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <Infographic3DIcon className="w-18 h-18 sm:w-20 sm:h-20" />,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'border-emerald-200/80 hover:border-emerald-400',
      shadowColor: 'hover:shadow-emerald-500/15',
      accentColor: 'text-emerald-700 group-hover:text-emerald-800',
      buttonBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
      btnLabel: 'Xem Infographic'
    },
    {
      id: 'mindmaps',
      title: 'Sơ Đồ Tư Duy Toán 10',
      subtitle: 'Liên kết kiến thức logic & Cây bài học',
      description: 'Khái quát hóa toàn bộ chương trình Toán 10 bằng sơ đồ phân nhánh liên kết khái niệm và phương pháp giải.',
      badge: `${counts.mindmaps} sơ đồ tư duy`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: <MindMap3DIcon className="w-18 h-18 sm:w-20 sm:h-20" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderColor: 'border-amber-200/80 hover:border-amber-400',
      shadowColor: 'hover:shadow-amber-500/15',
      accentColor: 'text-amber-700 group-hover:text-amber-800',
      buttonBg: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white',
      btnLabel: 'Khám phá sơ đồ'
    },
    {
      id: 'ai-assistant',
      title: 'TRỢ LÝ AI TOÁN 10',
      subtitle: 'Đồng hành cùng học sinh lớp 10',
      description: 'Tích hợp Gemini Gem: Các bạn có thể đặt câu hỏi, tải ảnh bài tập và tìm hướng giải chi tiết mọi dạng bài Toán 10.',
      badge: 'Trực tuyến 24/7',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: <AiRobot3DIcon className="w-18 h-18 sm:w-20 sm:h-20" />,
      gradient: 'from-indigo-500/10 via-violet-500/5 to-transparent',
      borderColor: 'border-indigo-200/80 hover:border-indigo-400',
      shadowColor: 'hover:shadow-indigo-500/15',
      accentColor: 'text-indigo-700 group-hover:text-indigo-800',
      buttonBg: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white',
      btnLabel: 'Trò chuyện với trợ lý Toán 10'
    }
  ];

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            5 Danh Mục Học Liệu Số Trọng Tâm
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Lựa chọn chuyên mục để trải nghiệm học liệu số đa phương tiện, tối ưu cho học sinh và giáo viên lớp 10.
          </p>
        </div>

        {/* 5 Cards Grid: 3 cards top row, 2 cards bottom row (balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.slice(0, 3).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative bg-white rounded-3xl p-6 sm:p-7 border ${cat.borderColor} shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cat.shadowColor} cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10">
                {/* Header: 3D icon & Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-2 rounded-2xl bg-slate-50/80 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className={`text-xl font-bold text-slate-900 ${cat.accentColor} transition-colors tracking-tight`}>
                  {cat.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                  {cat.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all ${cat.buttonBg}`}
                >
                  <span>{cat.btnLabel}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: 2 wide cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {categories.slice(3, 5).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative bg-white rounded-3xl p-6 sm:p-7 border ${cat.borderColor} shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cat.shadowColor} cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-2 rounded-2xl bg-slate-50/80 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-slate-900 ${cat.accentColor} transition-colors tracking-tight`}>
                  {cat.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                  {cat.subtitle}
                </p>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all ${cat.buttonBg}`}
                >
                  <span>{cat.btnLabel}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
