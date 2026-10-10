import { apiFetch } from './request';
import { LearningItem, AiAssistantConfig, ModuleCategory, WebUser, VisitorStats } from '../types';
import { initialItems, initialAiConfig } from '../data/initialData';

const LOCAL_STORAGE_ITEMS_KEY = 'toan10_cached_items';
const LOCAL_STORAGE_AI_KEY = 'toan10_cached_ai';
const AUTH_TOKEN_KEY = 'toan10_admin_token';
const REGISTERED_USER_KEY = 'toan10_registered_user';
const VISITOR_ID_KEY = 'toan10_visitor_uuid';

function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  } catch {
    return 'v_' + Math.random().toString(36).substring(2, 10);
  }
}

export function getStoredUser(): WebUser | null {
  try {
    const raw = localStorage.getItem(REGISTERED_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: WebUser | null): void {
  if (user) {
    localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(REGISTERED_USER_KEY);
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

function getAuthHeaders(token?: string | null): HeadersInit {
  const t = token || getStoredToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (t) {
    headers['Authorization'] = `Bearer ${t}`;
  }
  return headers;
}

export async function getLearningItems(type?: ModuleCategory | string): Promise<LearningItem[]> {
  try {
    const url = type && type !== 'ai-assistant' ? `/api/items?type=${type}` : '/api/items';
    const res = await apiFetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data: LearningItem[] = await res.json();
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    console.warn('API items fetch failed, using fallback storage:', err);
    const cached = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
    if (cached) {
      try {
        const parsed: LearningItem[] = JSON.parse(cached);
        if (type && type !== 'ai-assistant') {
          return parsed.filter(i => i.type === type);
        }
        return parsed;
      } catch (e) {}
    }
    // Default fallback to initial items
    if (type && type !== 'ai-assistant') {
      return initialItems.filter(i => i.type === type);
    }
    return initialItems;
  }
}

export async function createLearningItem(item: Partial<LearningItem>, token?: string): Promise<LearningItem> {
  const res = await apiFetch('/api/items', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Thao tác không thành công.' }));
    throw new Error(errorData.error || 'Lỗi khi tạo học liệu');
  }

  return await res.json();
}

export async function updateLearningItem(id: string, item: Partial<LearningItem>, token?: string): Promise<LearningItem> {
  const res = await apiFetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Thao tác không thành công.' }));
    throw new Error(errorData.error || 'Lỗi khi cập nhật học liệu');
  }

  return await res.json();
}

export async function deleteLearningItem(id: string, token?: string): Promise<void> {
  const res = await apiFetch(`/api/items/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Thao tác không thành công.' }));
    throw new Error(errorData.error || 'Lỗi khi xóa học liệu');
  }
}

export async function reorderLearningItems(orderedIds: string[], token?: string): Promise<void> {
  const res = await apiFetch('/api/items/reorder', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ orderedIds }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Thao tác không thành công.' }));
    throw new Error(errorData.error || 'Lỗi sắp xếp thứ tự');
  }
}

export async function getAiConfig(): Promise<AiAssistantConfig> {
  try {
    const res = await apiFetch('/api/ai-config');
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    localStorage.setItem(LOCAL_STORAGE_AI_KEY, JSON.stringify(data));
    return data;
  } catch (err) {
    const cached = localStorage.getItem(LOCAL_STORAGE_AI_KEY);
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return initialAiConfig;
  }
}

export async function updateAiConfig(config: Partial<AiAssistantConfig>, token?: string): Promise<AiAssistantConfig> {
  const res = await apiFetch('/api/ai-config', {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(config),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Thao tác không thành công.' }));
    throw new Error(errorData.error || 'Lỗi khi cập nhật cấu hình AI');
  }

  return await res.json();
}

export async function loginAdmin(password: string, username?: string): Promise<{ success: boolean; token: string; username: string }> {
  const res = await apiFetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, username: (username || '').trim() }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Mật khẩu hoặc tên đăng nhập không chính xác' }));
    throw new Error(err.error || 'Đăng nhập thất bại');
  }

  const data = await res.json();
  setStoredToken(data.token);
  return data;
}

export async function verifyAdminSession(token?: string): Promise<boolean> {
  const t = token || getStoredToken();
  if (!t) return false;

  try {
    const res = await apiFetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${t}` },
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data.isAuthenticated);
  } catch {
    return false;
  }
}

export async function changeAdminPassword(oldPassword: string, newPassword: string, token?: string): Promise<void> {
  const res = await apiFetch('/api/auth/change-password', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Không thể đổi mật khẩu' }));
    throw new Error(err.error || 'Không thể đổi mật khẩu');
  }
}

export async function resetToSampleCurriculum(token?: string): Promise<void> {
  const res = await apiFetch('/api/reset-sample', {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Không thể khôi phục dữ liệu mẫu');
  }
}

// --- WEB USER APIS ---

export async function registerWebUser(
  fullName: string,
  phone: string,
  className?: string,
  school?: string
): Promise<WebUser> {
  const res = await apiFetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, phone, className, school }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Không thể ghi danh' }));
    throw new Error(err.error || 'Lỗi ghi danh người dùng');
  }

  const data = await res.json();
  if (data.user) {
    setStoredUser(data.user);
  }
  return data.user;
}

export async function trackUserActivity(params: {
  phone: string;
  fullName?: string;
  itemId: string;
  itemTitle: string;
  category: string;
}): Promise<WebUser | null> {
  try {
    const res = await apiFetch('/api/users/track-activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.user) {
      setStoredUser(data.user);
    }
    return data.user;
  } catch {
    return null;
  }
}

export async function recordUserGameScore(params: {
  phone: string;
  fullName?: string;
  gameId: string;
  gameTitle: string;
  score: number;
  maxScore: number;
}): Promise<WebUser | null> {
  try {
    const res = await apiFetch('/api/users/record-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data.user) {
      setStoredUser(data.user);
    }
    return data.user;
  } catch {
    return null;
  }
}

export async function getWebUsers(token?: string): Promise<WebUser[]> {
  const res = await apiFetch('/api/users', {
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Không thể tải danh sách người dùng web');
  }

  return await res.json();
}

export async function deleteWebUser(idOrPhone: string, token?: string): Promise<void> {
  const res = await apiFetch(`/api/users/${encodeURIComponent(idOrPhone)}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Không thể xóa người dùng');
  }
}

export async function clearAllWebUsers(token?: string): Promise<void> {
  const res = await apiFetch('/api/users/clear-all', {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Không thể xóa dữ liệu');
  }
}

// --- VISITOR ANALYTICS APIS ---

export async function getVisitorStats(): Promise<VisitorStats> {
  const res = await apiFetch('/api/visitors/stats');
  if (!res.ok) {
    throw new Error('Không thể tải thống kê lượt truy cập');
  }
  return await res.json();
}

export async function recordWebappVisit(params?: {
  page?: string;
  userName?: string;
  isRegistered?: boolean;
}): Promise<VisitorStats | null> {
  try {
    const visitorId = getOrCreateVisitorId();
    const res = await apiFetch('/api/visitors/record-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        page: params?.page || 'home',
        userName: params?.userName,
        isRegistered: params?.isRegistered
      }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Record visit failed:', err);
    return null;
  }
}

export async function resetVisitorStats(token?: string): Promise<void> {
  const res = await apiFetch('/api/visitors/reset', {
    method: 'POST',
    headers: getAuthHeaders(token),
  });
  if (!res.ok) {
    throw new Error('Không thể đặt lại thống kê');
  }
}

