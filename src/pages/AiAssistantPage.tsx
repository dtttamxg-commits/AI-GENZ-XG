import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Bot, Sparkles, Copy, Check, HelpCircle, ShieldAlert, BookOpen } from 'lucide-react';
import { AiAssistantConfig, WebUser } from '../types';
import { AiRobot3DIcon } from '../components/Math3DIcons';

interface AiAssistantPageProps {
  config: AiAssistantConfig;
  onBack: () => void;
  isAdmin: boolean;
  onOpenAdmin: (category: string) => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  requireRegistration?: (action: () => void, message?: string) => boolean;
  onTrackActivity?: (itemId: string, itemTitle: string, category: string) => void;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({
  config,
  onBack,
  isAdmin,
  onOpenAdmin,
  currentUser,
  onOpenRegister,
  requireRegistration,
  onTrackActivity
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleOpenGem = () => {
    const targetUrl = config.gemUrl || 'https://gemini.google.com/gem/1sNQ_g_lknAeqd4EvBxCrDZuZGsY402RU?usp=sharing';
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          if (onTrackActivity) onTrackActivity('gemini-gem', 'Hỏi Trợ lý AI Gemini', 'ai-assistant');
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }, 'Vui lòng ghi danh (Họ tên và Số điện thoại) để tương tác cùng Trợ lý AI!');
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    if (onTrackActivity) onTrackActivity('gemini-gem', 'Hỏi Trợ lý AI Gemini', 'ai-assistant');
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPrompt = (prompt: string, index: number) => {
    if (!currentUser) {
      if (requireRegistration) {
        requireRegistration(() => {
          navigator.clipboard.writeText(prompt);
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000);
        }, 'Vui lòng ghi danh (Họ tên và Số điện thoại) để sao chép câu hỏi gợi ý và hỏi Trợ lý AI!');
      } else if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
    });
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Registration Requirement Warning Banner */}
      {!currentUser && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500 text-white font-extrabold text-sm shrink-0">
              🔒 Bắt buộc
            </span>
            <div className="text-xs sm:text-sm">
              <strong>Người dùng phải Ghi danh mới bấm tương tác với Trợ lý AI!</strong> Nhập Họ tên và Số điện thoại để bắt đầu trò chuyện và hỏi đáp bài tập.
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

      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại Trang chủ</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => onOpenAdmin('ai-assistant')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cập nhật link Gem (GV)</span>
          </button>
        )}
      </div>

      {/* Main Hero Card for AI Assistant */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-indigo-500/20 shadow-2xl">
        {/* Ambient lighting glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* 3D Robot Mascot Icon */}
          <div className="p-3 bg-indigo-600/20 rounded-3xl border border-indigo-400/30 shadow-lg mb-6 hover:scale-105 transition-transform duration-300">
            <AiRobot3DIcon className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>

          {/* Heading */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold tracking-wide mb-3">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Google Gemini AI · Bản quyền giáo dục</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {config.assistantTitle || 'TRỢ LÝ AI TOÁN 10 - ĐỒNG HÀNH CÙNG HỌC SINH LỚP 10'}
          </h1>

          {/* Prompt exact description */}
          <p className="text-base sm:text-lg text-indigo-100/90 leading-relaxed max-w-2xl font-medium mb-8">
            {config.assistantDescription || 'Các bạn có thể đặt câu hỏi, tìm hướng giải bài toán và khám phá kiến thức cùng trợ lý AI.'}
          </p>

          {/* Large CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleOpenGem}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              <span>TRÒ CHUYỆN VỚI TRỢ LÝ TOÁN 10</span>
              <ExternalLink className="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-4 text-xs text-indigo-300/80">
            * Liên kết sẽ mở ứng dụng Gemini trong tab mới với giao diện đầy đủ tính năng của Google
          </div>
        </div>
      </div>

      {/* Student Guide & Account Access Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        
        {/* Card 1: Hướng dẫn đăng nhập & sử dụng */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3>Hướng Dẫn Truy Cập Cho Học Sinh</h3>
            </div>
            
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Sử dụng tài khoản Google cá nhân hoặc tài khoản trường học để đăng nhập vào Google Gemini.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Có thể bấm biểu tượng <strong>Tải ảnh</strong> (máy ảnh) trên Gemini để chụp đề bài trong sách giáo khoa Toán 10.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Yêu cầu trợ lý giải thích từng bước giải thay vì chỉ lấy đáp số để nắm vững phương pháp tư duy.</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
            {config.welcomeGuide}
          </div>
        </div>

        {/* Card 2: Lời khuyên học tập an toàn */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3>Lời Khuyên Khi Học Cùng AI</h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">•</span>
                <span><strong>Không chép lời giải:</strong> Hãy coi AI như một người gia sư đồng hành giúp gợi ý khi bị tắc ý tưởng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">•</span>
                <span><strong>Kiểm tra lại công thức:</strong> Đối chiếu kết quả với SGK Toán 10 hoặc hỏi lại thầy cô bộ môn.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">•</span>
                <span><strong>Đặt câu hỏi sâu:</strong> Hãy hỏi &quot;Tại sao lại áp dụng công thức này?&quot; để hiểu bản chất định lý.</span>
              </li>
            </ul>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span>Áp dụng chuẩn GDPT mới 2018</span>
            <span className="font-medium text-indigo-600">Chủ động tư duy</span>
          </div>
        </div>
      </div>

      {/* Sample Grade 10 Math Prompts for Instant Copy */}
      <div className="mt-10 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2>Câu Hỏi Gợi Ý Chuẩn Chương Trình Toán 10</h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">Nhấn để sao chép vào khay nhớ tạm</span>
        </div>

        <div className="space-y-2.5">
          {config.samplePrompts.map((prompt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/60 hover:border-indigo-200 transition-colors group"
            >
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <span className="font-mono font-bold text-indigo-600 text-xs mt-0.5">#{idx + 1}</span>
                <span className="leading-snug">{prompt}</span>
              </div>
              <button
                onClick={() => handleCopyPrompt(prompt, idx)}
                title="Sao chép câu hỏi này"
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-300 shadow-2xs hover:bg-slate-50 transition-all shrink-0 cursor-pointer"
              >
                {copiedIndex === idx ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
