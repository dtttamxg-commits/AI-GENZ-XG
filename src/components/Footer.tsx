import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, Activity, Eye } from 'lucide-react';
import { VisitorStats } from '../types';

interface FooterProps {
  visitorStats?: VisitorStats | null;
  onOpenVisitorStats?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ visitorStats, onOpenVisitorStats }) => {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/70 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-lg">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-900 font-extrabold text-base tracking-tight">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              TOÁN 10 – KHÔNG GIAN HỌC TẬP SỐ
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Thư viện học liệu số hóa môn Toán lớp 10 theo chương trình GDPT 2018: Trò chơi toán học, App mô phỏng, Infographic, Sơ đồ tư duy và Trợ lý AI thông minh.
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-700">
              Sản phẩm học liệu số sáng tạo của <span className="text-blue-700">TEAM AI GENZ 10A1, THPT XUÂN GIANG</span>.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2.5">
            {/* Nút tổng hợp số lượt ghé thăm webapp */}
            {onOpenVisitorStats && (
              <button
                onClick={onOpenVisitorStats}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-900 text-xs font-bold border border-blue-200 shadow-2xs cursor-pointer transition-all group"
                title="Bấm để xem báo cáo tổng hợp chi tiết số lượt người ghé thăm webapp"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>
                  Đã có <strong className="font-mono text-blue-800">{(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}</strong> lượt ghé thăm webapp
                </span>
                <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-semibold">
                  Xem chi tiết
                </span>
              </button>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Học Toán thú vị · Khám phá sáng tạo · Chinh phục tri thức</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bản quyền: TEAM AI GENZ 10A1, THPT XUÂN GIANG</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>
            © {new Date().getFullYear()} Bản quyền thuộc về <strong className="font-bold text-slate-900">TEAM AI GENZ 10A1, THPT XUÂN GIANG</strong>. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 font-medium text-slate-600">
            <span>TEAM AI GENZ</span>
            <span>·</span>
            <span>Lớp 10A1</span>
            <span>·</span>
            <span>Trường THPT Xuân Giang</span>
            <span>·</span>
            <span>GDPT 2018</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
