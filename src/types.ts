export type ModuleCategory = 'games' | 'simulations' | 'infographics' | 'mindmaps' | 'ai-assistant';

export interface LearningItem {
  id: string;
  type: 'game' | 'simulation' | 'infographic' | 'mindmap';
  title: string;
  description: string;
  topic: string; // e.g. "Chương 1: Mệnh đề & Tập hợp"
  url?: string; // External resource link (e.g. GeoGebra, Google Drive)
  htmlContent?: string; // Embedded HTML content for standalone games
  thumbnailUrl?: string;
  displayOrder: number;
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AiAssistantConfig {
  gemUrl: string;
  assistantTitle: string;
  assistantDescription: string;
  welcomeGuide: string;
  samplePrompts: string[];
}

export interface UserExploration {
  itemId: string;
  itemTitle: string;
  category: string; // 'game' | 'simulation' | 'infographic' | 'mindmap' | 'ai-assistant' | 'other'
  clickCount: number;
  lastClickedAt: string;
}

export interface UserGameScore {
  gameId: string;
  gameTitle: string;
  score: number;
  maxScore: number;
  completedAt: string;
  playCount: number;
}

export interface WebUser {
  id: string;
  fullName: string;
  phone: string;
  className?: string; // Lớp học (ví dụ: 10A1)
  school?: string; // Trường học (ví dụ: THPT Xuân Giang)
  registeredAt: string;
  lastActiveAt: string;
  totalClicks: number;
  explorations: UserExploration[];
  gameScores: UserGameScore[];
}

export interface TeacherUser {
  isAuthenticated: boolean;
  username: string;
  token?: string;
}

export interface VisitorRecord {
  id: string;
  timestamp: string;
  page: string;
  device: string; // 'Mobile' | 'Desktop' | 'Tablet'
  browser: string;
  userName?: string;
  isRegistered?: boolean;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  registeredUsersCount: number;
  totalInteractions: number;
  dailyVisits: Record<string, number>;
  pageViews: Record<string, number>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  recentVisitors: VisitorRecord[];
  lastUpdated: string;
}
