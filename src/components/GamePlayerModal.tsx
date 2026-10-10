import React, { useState, useEffect, useRef } from 'react';
import {
  X, Maximize2, Minimize2, RotateCcw, AlertTriangle, Shield, Play,
  Trophy, CheckCircle2, User, UserPlus, Save
} from 'lucide-react';
import { LearningItem, WebUser } from '../types';

// Tự gửi điểm về trang chính khi trò chơi hiện ô kết quả #final-score ("đạt / tối đa").
const SCORE_REPORTER = `<script>(function(){var lastAt=0;function send(){var el=document.getElementById('final-score');if(!el||el.closest('.hidden'))return;var m=(el.textContent||'').match(/([0-9]+(?:[.,][0-9]+)?) *[/] *([0-9]+)/);if(!m||Date.now()-lastAt<1500)return;lastAt=Date.now();parent.postMessage({type:'GAME_SCORE',score:Math.round(parseFloat(m[1].replace(',','.'))),maxScore:Number(m[2])},'*');}function watch(){var el=document.getElementById('final-score');if(el)new MutationObserver(function(){setTimeout(send,300);}).observe(el,{childList:true,characterData:true,subtree:true});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();})();<\/script>`;

const withScoreReporter = (html?: string) => {
  if (!html) return html;
  return /<\/body>/i.test(html) ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, SCORE_REPORTER + '</body>') : html + SCORE_REPORTER;
};

interface GamePlayerModalProps {
  game: LearningItem | null;
  onClose: () => void;
  currentUser?: WebUser | null;
  onOpenRegister?: () => void;
  onSaveScore?: (gameId: string, gameTitle: string, score: number, maxScore: number) => Promise<void>;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({
  game,
  onClose,
  currentUser,
  onOpenRegister,
  onSaveScore
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Score state
  const [scoreInput, setScoreInput] = useState<string>('');
  const [maxScoreInput, setMaxScoreInput] = useState<string>('100');
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Existing score for this user
  const existingScore = currentUser?.gameScores?.find(g => g.gameId === game?.id);

  useEffect(() => {
    if (existingScore) {
      setScoreInput(existingScore.score.toString());
      setMaxScoreInput((existingScore.maxScore || 100).toString());
    } else {
      setScoreInput('');
      setMaxScoreInput('100');
    }
  }, [game?.id, existingScore]);

  // Listen for score postMessage from iframe if supported
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        // Chỉ nhận điểm từ đúng khung trò chơi đang mở
        if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
        const data = e.data;
        if (data && typeof data === 'object') {
          if (data.type === 'GAME_SCORE' || data.type === 'GAME_OVER' || typeof data.score === 'number') {
            const detectedScore = Number(data.score) || 0;
            const detectedMax = Number(data.maxScore) || 100;
            setScoreInput(detectedScore.toString());
            setMaxScoreInput(detectedMax.toString());

            if (currentUser && onSaveScore && game) {
              onSaveScore(game.id, game.title, detectedScore, detectedMax);
              setSaveSuccess(true);
              setTimeout(() => setSaveSuccess(false), 3000);
            }
          }
        }
      } catch {}
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentUser, onSaveScore, game]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn('Error attempting fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Error exiting fullscreen:', err);
      });
      setIsFullscreen(false);
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleManualSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenRegister) onOpenRegister();
      return;
    }
    const s = Number(scoreInput);
    const m = Number(maxScoreInput) || 100;
    if (isNaN(s)) {
      alert('Vui lòng nhập điểm số hợp lệ.');
      return;
    }

    setIsSavingScore(true);
    try {
      if (onSaveScore) {
        await onSaveScore(game.id, game.title, s, m);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi lưu điểm');
    } finally {
      setIsSavingScore(false);
    }
  };

  const hasHtml = Boolean(game.htmlContent);
  const hasUrl = Boolean(game.url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="relative flex flex-col w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-800/90 border-b border-slate-700 text-white shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30 shrink-0">
              <Play className="w-4 h-4 fill-purple-400" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-sm sm:text-base text-slate-100 truncate">
                {game.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-purple-300 font-medium">{game.topic}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Shield className="w-3 h-3" /> Môi trường Sandbox cách ly an toàn
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleReload}
              title="Tải lại trò chơi"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title="Đóng (Esc)"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Stage (Iframe Sandbox) */}
        <div className="relative flex-1 bg-slate-950 overflow-hidden">
          {hasHtml ? (
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={`/sandbox/game/${game.id}`}
              srcDoc={withScoreReporter(game.htmlContent)}
              title={game.title}
              className="w-full h-full border-0 bg-transparent"
              sandbox="allow-scripts allow-forms allow-modals"
              loading="lazy"
            />
          ) : hasUrl ? (
            <iframe
              key={iframeKey}
              src={game.url}
              title={game.title}
              className="w-full h-full border-0 bg-slate-900"
              sandbox="allow-scripts allow-forms allow-modals"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-amber-400 mb-3" />
              <p className="text-base font-semibold text-slate-200">Trò chơi này chưa có nội dung HTML khả dụng</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Giáo viên có thể cập nhật tệp HTML hoặc bổ sung mã nguồn trong trang Quản trị giáo viên.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar / Score Submission & Description */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
          
          {/* User Score Recording Area */}
          <div className="flex flex-wrap items-center gap-2">
            {currentUser ? (
              <form onSubmit={handleManualSaveScore} className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <strong className="text-white">{currentUser.fullName}:</strong>
                </span>

                <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <input
                    type="number"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    placeholder="Điểm"
                    min="0"
                    className="w-12 bg-transparent text-right font-mono font-bold text-white text-xs focus:outline-hidden"
                  />
                  <span className="text-slate-400">/</span>
                  <input
                    type="number"
                    value={maxScoreInput}
                    onChange={(e) => setMaxScoreInput(e.target.value)}
                    placeholder="Tổng"
                    min="1"
                    className="w-10 bg-transparent text-slate-300 font-mono text-xs focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSavingScore}
                  className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3 h-3" />
                  <span>{isSavingScore ? 'Đang lưu...' : 'Lưu điểm'}</span>
                </button>

                {saveSuccess && (
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã lưu vào hồ sơ!</span>
                  </span>
                )}
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Chưa ghi danh:</span>
                <button
                  onClick={onOpenRegister}
                  className="px-2.5 py-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Ghi danh để lưu điểm thi đấu này</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-400 shrink-0">
            <span className="truncate max-w-xs hidden lg:inline text-[11px]">
              {game.description || 'Trò chơi tương tác thực hành Toán 10.'}
            </span>
            <span className="text-[11px] text-slate-400">
              Nhấn <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded-sm text-slate-300 font-mono">Esc</kbd> để thoát
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
