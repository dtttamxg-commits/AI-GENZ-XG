import {apiFetch} from './services/request';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { GamesPage } from './pages/GamesPage';
import { SimulationsPage } from './pages/SimulationsPage';
import { InfographicsPage } from './pages/InfographicsPage';
import { MindMapsPage } from './pages/MindMapsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { AdminPage } from './pages/AdminPage';
import { GamePlayerModal } from './components/GamePlayerModal';
import { UserRegistrationModal } from './components/UserRegistrationModal';
import { VisitorStatsModal } from './components/VisitorStatsModal';
import { LearningItem, AiAssistantConfig, WebUser, VisitorStats } from './types';
import { initialItems, initialAiConfig } from './data/initialData';
import {
  getLearningItems, getAiConfig, verifyAdminSession,
  getStoredToken, setStoredToken, getStoredUser, setStoredUser,
  trackUserActivity, recordUserGameScore, getVisitorStats, recordWebappVisit
} from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<string>('games');
  const [items, setItems] = useState<LearningItem[]>(initialItems);
  const [aiConfig, setAiConfig] = useState<AiAssistantConfig>(initialAiConfig);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activePlayingGame, setActivePlayingGame] = useState<LearningItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Visitor Tracking State
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState<boolean>(false);
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null);

  // Registered Student / Visitor User State
  const [currentUser, setCurrentUser] = useState<WebUser | null>(() => getStoredUser());
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [registerPrompt, setRegisterPrompt] = useState<string>('');

  // Sync with window.location hash for browser history / direct links (e.g. #admin, #games)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'games', 'simulations', 'infographics', 'mindmaps', 'ai-assistant', 'admin'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: string, initialAdminTab?: string) => {
    setCurrentView(view);
    if (initialAdminTab) {
      setAdminTab(initialAdminTab);
    }
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load items and AI config
  const refreshAllData = useCallback(async () => {
    try {
      const [fetchedItems, fetchedAi] = await Promise.all([
        getLearningItems(),
        getAiConfig()
      ]);
      setItems(fetchedItems);
      setAiConfig(fetchedAi);
    } catch (err) {
      console.warn('Error fetching data, using cached/initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch visitor statistics
  const fetchVisitorStats = useCallback(async () => {
    try {
      const stats = await getVisitorStats();
      setVisitorStats(stats);
    } catch (err) {
      console.warn('Failed to load visitor stats:', err);
    }
  }, []);

  // Record visit on initial mount and route change
  useEffect(() => {
    const trackVisit = async () => {
      const updated = await recordWebappVisit({
        page: currentView,
        userName: currentUser?.fullName,
        isRegistered: Boolean(currentUser)
      });
      if (updated) {
        setVisitorStats(updated);
      } else {
        fetchVisitorStats();
      }
    };
    trackVisit();
  }, [currentView, currentUser, fetchVisitorStats]);

  // Check admin session on initial mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getStoredToken();
      if (token) {
        const valid = await verifyAdminSession(token);
        setIsAdmin(valid);
      }
    };
    checkAuth();
    refreshAllData();
  }, [refreshAllData]);

  const handleLoginSuccess = (token: string) => {
    setStoredToken(token);
    setIsAdmin(true);
  };

  const handleLogout = async () => {
    try { await apiFetch("/api/auth/logout", {method:"POST"}); } catch {}
    setStoredToken(null);
    setIsAdmin(false);
    navigateTo('home');
  };

  const handleUserChange = (user: WebUser | null) => {
    setCurrentUser(user);
    setStoredUser(user);
    if (user && pendingAction) {
      const actionToExecute = pendingAction;
      setPendingAction(null);
      setRegisterPrompt('');
      setTimeout(() => {
        actionToExecute();
      }, 250);
    }
  };

  // Universal guard: user must be registered to click actions
  const requireRegistration = useCallback((action: () => void, message?: string): boolean => {
    if (!currentUser) {
      setRegisterPrompt(message || 'Vui lòng ghi danh (Họ và tên & Số điện thoại) để bấm tham gia hoạt động này!');
      setPendingAction(() => action);
      setIsUserModalOpen(true);
      return false;
    }
    action();
    return true;
  }, [currentUser]);

  // Activity tracking function
  const handleTrackActivity = useCallback(async (itemId: string, itemTitle: string, category: string) => {
    if (currentUser) {
      try {
        const updated = await trackUserActivity({
          phone: currentUser.phone,
          fullName: currentUser.fullName,
          itemId,
          itemTitle,
          category
        });
        if (updated) {
          setCurrentUser(updated);
        }
      } catch (err) {
        console.warn('Track activity failed:', err);
      }
    }
  }, [currentUser]);

  // Game score recording function
  const handleSaveGameScore = async (gameId: string, gameTitle: string, score: number, maxScore: number) => {
    if (currentUser) {
      const updated = await recordUserGameScore({
        phone: currentUser.phone,
        fullName: currentUser.fullName,
        gameId,
        gameTitle,
        score,
        maxScore
      });
      if (updated) {
        setCurrentUser(updated);
      }
    }
  };

  const handlePlayGame = (game: LearningItem) => {
    if (!currentUser) {
      requireRegistration(() => {
        handleTrackActivity(game.id, game.title, 'game');
        setActivePlayingGame(game);
      }, `Vui lòng ghi danh (Họ và tên & Số điện thoại) để bắt đầu chơi trò chơi "${game.title}"!`);
      return;
    }
    handleTrackActivity(game.id, game.title, 'game');
    setActivePlayingGame(game);
  };

  const handleOpenSimFromHome = (sim: LearningItem) => {
    if (!currentUser) {
      requireRegistration(() => {
        handleTrackActivity(sim.id, sim.title, 'simulation');
        window.open(sim.url, '_blank', 'noopener,noreferrer');
      }, `Vui lòng ghi danh (Họ và tên & Số điện thoại) để mở ứng dụng mô phỏng "${sim.title}"!`);
      return;
    }
    handleTrackActivity(sim.id, sim.title, 'simulation');
    window.open(sim.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Universal Top Navigation Bar with user & admin buttons */}
      <Header
        currentView={currentView}
        onNavigate={(view, tab) => navigateTo(view, tab)}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onOpenUserModal={() => {
          setRegisterPrompt('');
          setIsUserModalOpen(true);
        }}
        visitorStats={visitorStats}
        onOpenVisitorStats={() => setIsVisitorModalOpen(true)}
      />

      {/* Global Registration Status Alert Bar */}
      {!currentUser ? (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xs">
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium text-center sm:text-left">
              <span className="px-2 py-0.5 rounded-md bg-white/20 font-bold text-xs uppercase tracking-wider shrink-0">
                🔒 Bắt buộc
              </span>
              <span>
                Người dùng phải <strong>Ghi danh (Họ tên & Số điện thoại)</strong> mới bấm được các trò chơi và hoạt động trên webapp!
              </span>
            </div>
            <button
              onClick={() => {
                setRegisterPrompt('Vui lòng ghi danh Họ và tên cùng Số điện thoại để bắt đầu khám phá.');
                setIsUserModalOpen(true);
              }}
              className="shrink-0 px-3.5 py-1 rounded-lg bg-white text-amber-900 hover:bg-amber-50 font-extrabold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              ✍️ Đăng nhập / Ghi danh ngay
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-600 text-white shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 py-1.5 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span>
                Học viên: <strong>{currentUser.fullName}</strong> ({currentUser.phone}) · Đã ghi nhận <strong>{currentUser.totalClicks || 0} lượt bấm</strong> & <strong>{currentUser.gameScores?.length || 0} trò chơi</strong>
              </span>
            </div>
            <button
              onClick={() => {
                setRegisterPrompt('');
                setIsUserModalOpen(true);
              }}
              className="text-emerald-100 hover:text-white underline font-semibold cursor-pointer"
            >
              Xem kết quả & hồ sơ
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Page Content View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={(view) => navigateTo(view)}
            items={items}
            onPlayGame={handlePlayGame}
            onOpenSim={handleOpenSimFromHome}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('');
              setIsUserModalOpen(true);
            }}
            visitorStats={visitorStats}
            onOpenVisitorStats={() => setIsVisitorModalOpen(true)}
          />
        )}

        {currentView === 'games' && (
          <GamesPage
            items={items}
            onBack={() => navigateTo('home')}
            isAdmin={isAdmin}
            onOpenAdmin={(category) => navigateTo('admin', category)}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('Vui lòng ghi danh để bấm chơi các trò chơi Toán 10.');
              setIsUserModalOpen(true);
            }}
            onPlayGame={handlePlayGame}
            requireRegistration={requireRegistration}
          />
        )}

        {currentView === 'simulations' && (
          <SimulationsPage
            items={items}
            onBack={() => navigateTo('home')}
            isAdmin={isAdmin}
            onOpenAdmin={(category) => navigateTo('admin', category)}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('Vui lòng ghi danh để bấm mở các ứng dụng mô phỏng.');
              setIsUserModalOpen(true);
            }}
            requireRegistration={requireRegistration}
            onTrackActivity={handleTrackActivity}
          />
        )}

        {currentView === 'infographics' && (
          <InfographicsPage
            items={items}
            onBack={() => navigateTo('home')}
            isAdmin={isAdmin}
            onOpenAdmin={(category) => navigateTo('admin', category)}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('Vui lòng ghi danh để bấm xem các Infographic bài học.');
              setIsUserModalOpen(true);
            }}
            requireRegistration={requireRegistration}
            onTrackActivity={handleTrackActivity}
          />
        )}

        {currentView === 'mindmaps' && (
          <MindMapsPage
            items={items}
            onBack={() => navigateTo('home')}
            isAdmin={isAdmin}
            onOpenAdmin={(category) => navigateTo('admin', category)}
            onRefreshData={refreshAllData}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('Vui lòng ghi danh để bấm xem các Sơ đồ tư duy bài học.');
              setIsUserModalOpen(true);
            }}
            requireRegistration={requireRegistration}
            onTrackActivity={handleTrackActivity}
          />
        )}

        {currentView === 'ai-assistant' && (
          <AiAssistantPage
            config={aiConfig}
            onBack={() => navigateTo('home')}
            isAdmin={isAdmin}
            onOpenAdmin={() => navigateTo('admin', 'ai-assistant')}
            currentUser={currentUser}
            onOpenRegister={() => {
              setRegisterPrompt('Vui lòng ghi danh để bấm tương tác cùng Trợ lý AI.');
              setIsUserModalOpen(true);
            }}
            requireRegistration={requireRegistration}
            onTrackActivity={handleTrackActivity}
          />
        )}

        {currentView === 'admin' && (
          <AdminPage
            items={items}
            aiConfig={aiConfig}
            isAuthenticated={isAdmin}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onRefreshData={refreshAllData}
            initialTab={adminTab}
            onBackToHome={() => navigateTo('home')}
            visitorStats={visitorStats}
            onOpenVisitorStats={() => setIsVisitorModalOpen(true)}
          />
        )}
      </main>

      {/* 3. Global Floating Game Player Modal with Score Record */}
      {activePlayingGame && (
        <GamePlayerModal
          game={activePlayingGame}
          onClose={() => setActivePlayingGame(null)}
          currentUser={currentUser}
          onOpenRegister={() => {
            setRegisterPrompt('Vui lòng ghi danh để lưu điểm số trò chơi.');
            setIsUserModalOpen(true);
          }}
          onSaveScore={handleSaveGameScore}
        />
      )}

      {/* 4. User Registration & Profile Modal */}
      <UserRegistrationModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setRegisterPrompt('');
        }}
        currentUser={currentUser}
        onUserChange={handleUserChange}
        promptMessage={registerPrompt}
      />

      {/* 5. Visitor Statistics Summary Modal */}
      <VisitorStatsModal
        isOpen={isVisitorModalOpen}
        onClose={() => setIsVisitorModalOpen(false)}
        stats={visitorStats}
        onRefresh={fetchVisitorStats}
        isAdmin={isAdmin}
        token={getStoredToken() || undefined}
      />

      {/* 6. Educational Footer */}
      <Footer
        visitorStats={visitorStats}
        onOpenVisitorStats={() => setIsVisitorModalOpen(true)}
      />
    </div>
  );
}
