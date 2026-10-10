import { apiFetch } from '../services/request';
import React, { useState, useRef } from 'react';
import {
  Lock, LogOut, Plus, Edit2, Trash2, Eye, ArrowUp, ArrowDown, UploadCloud,
  Check, AlertCircle, Save, X, ExternalLink, RefreshCw, KeyRound, Download,
  Gamepad2, Compass, FileText, Network, Bot, ShieldCheck, Search, Users, User,
  FileCode, Image as ImageIcon, Link2, Play, CheckCircle, Sparkles, Activity
} from 'lucide-react';
import { LearningItem, AiAssistantConfig, ModuleCategory, VisitorStats } from '../types';
import {
  loginAdmin, changeAdminPassword, createLearningItem, updateLearningItem,
  deleteLearningItem, reorderLearningItems, updateAiConfig, resetToSampleCurriculum,
  getStoredToken
} from '../services/api';
import { GamePlayerModal } from '../components/GamePlayerModal';
import { WebUsersManager } from '../components/WebUsersManager';

interface AdminPageProps {
  items: LearningItem[];
  aiConfig: AiAssistantConfig;
  isAuthenticated: boolean;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
  onRefreshData: () => Promise<void>;
  initialTab?: string;
  onBackToHome: () => void;
  visitorStats?: VisitorStats | null;
  onOpenVisitorStats?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  items,
  aiConfig,
  isAuthenticated,
  onLoginSuccess,
  onLogout,
  onRefreshData,
  initialTab = 'games',
  onBackToHome,
  visitorStats,
  onOpenVisitorStats
}) => {
  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Item Form Modal (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LearningItem | null>(null);
  const [uploadMode, setUploadMode] = useState<'html' | 'image' | 'url'>('html');
  const [formData, setFormData] = useState({
    type: 'game' as 'game' | 'simulation' | 'infographic' | 'mindmap',
    title: '',
    topic: '',
    description: '',
    url: '',
    htmlContent: '',
    thumbnailUrl: ''
  });
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation Modal
  const [itemToDelete, setItemToDelete] = useState<LearningItem | null>(null);

  // Preview Modal
  const [previewItem, setPreviewItem] = useState<LearningItem | null>(null);

  // AI Config Editor State
  const [aiForm, setAiForm] = useState<AiAssistantConfig>({ ...aiConfig });
  const [aiSaveSuccess, setAiSaveSuccess] = useState(false);

  // Change Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search filter inside admin
  const [adminSearch, setAdminSearch] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await loginAdmin(passwordInput, usernameInput);
      onLoginSuccess(res.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Mật khẩu hoặc tên đăng nhập không chính xác');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Open Add Modal
  const openAddModal = (category: string) => {
    let targetType: 'game' | 'simulation' | 'infographic' | 'mindmap' = 'game';
    if (category === 'games' || category === 'game') targetType = 'game';
    else if (category === 'simulations' || category === 'simulation') targetType = 'simulation';
    else if (category === 'infographics' || category === 'infographic') targetType = 'infographic';
    else if (category === 'mindmaps' || category === 'mindmap') targetType = 'mindmap';

    setEditingItem(null);
    setFormData({
      type: targetType,
      title: '',
      topic: '',
      description: '',
      url: '',
      htmlContent: '',
      thumbnailUrl: ''
    });
    setUploadMode(targetType === 'game' ? 'html' : targetType === 'simulation' ? 'url' : 'image');
    setUploadedFileName('');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: LearningItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      topic: item.topic,
      description: item.description || '',
      url: item.url || '',
      htmlContent: item.htmlContent || '',
      thumbnailUrl: item.thumbnailUrl || ''
    });
    if (item.htmlContent) {
      setUploadMode('html');
      setUploadedFileName('Mã nguồn HTML đã lưu');
    } else if (item.url && (item.url.startsWith('/infographics/') || item.url.startsWith('/mindmaps/') || item.url.startsWith('data:image'))) {
      setUploadMode('image');
      setUploadedFileName('Ảnh đã lưu');
    } else {
      setUploadMode(item.type === 'simulation' ? 'url' : 'html');
      setUploadedFileName(item.url ? `Liên kết: ${item.url}` : '');
    }
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle HTML File Upload (For Games, Infographics, and Mindmaps)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
      setFormError('Chỉ hỗ trợ tệp định dạng .html hoặc .htm');
      return;
    }

    // Size limit: 2,5 MB
    if (file.size > 2.5 * 1024 * 1024) {
      setFormError('Kích thước tệp quá lớn (tối đa 2,5 MB).');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;
    setUploadedFileName(`${file.name} (${fileSizeFormatted})`);
    setFormError('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/^[A-Za-z0-9]+[_-]/, '').replace(/[_-]/g, ' ').trim();

      // For infographic or mindmap, also attempt saving the .html file on server
      let uploadedUrl = '';
      if (formData.type === 'infographic' || formData.type === 'mindmap') {
        try {
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const uploadEndpoint = formData.type === 'mindmap' ? '/api/upload-mindmap' : '/api/upload-infographic';
          const defaultFolder = formData.type === 'mindmap' ? '/mindmaps/' : '/infographics/';
          const base64Data = btoa(unescape(encodeURIComponent(content)));
          const res = await apiFetch(uploadEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: safeName, base64Data })
          });
          if (res.ok) {
            const d = await res.json();
            uploadedUrl = d.url || `${defaultFolder}${safeName}`;
          }
        } catch (err) {
          console.warn('Could not save HTML file directly on server, keeping embedded content:', err);
        }
      }

      setFormData(prev => ({
        ...prev,
        htmlContent: content,
        url: uploadedUrl || prev.url,
        // Auto-fill title if empty
        title: prev.title.trim() ? prev.title : cleanTitle
      }));
    };
    reader.onerror = () => {
      setFormError('Lỗi khi đọc tệp từ máy tính.');
    };
    reader.readAsText(file);
  };

  // Handle Image Upload (For Infographics and Mindmaps)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Vui lòng chọn tệp hình ảnh (.png, .jpg, .jpeg, .webp, .svg).');
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setFormError('Kích thước ảnh quá lớn (tối đa 2,5 MB).');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;
    setUploadedFileName(`${file.name} (${fileSizeFormatted})`);
    setFormError('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/^[A-Za-z0-9]+[_-]/, '').replace(/[_-]/g, ' ').trim();
      try {
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uploadEndpoint = formData.type === 'mindmap' ? '/api/upload-mindmap' : '/api/upload-infographic';
        const defaultFolder = formData.type === 'mindmap' ? '/mindmaps/' : '/infographics/';
        const res = await apiFetch(uploadEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: safeName, base64Data })
        });
        if (res.ok) {
          const d = await res.json();
          setFormData(prev => ({
            ...prev,
            url: d.url || `${defaultFolder}${safeName}`,
            thumbnailUrl: d.url || `${defaultFolder}${safeName}`,
            title: prev.title.trim() ? prev.title : cleanTitle
          }));
          return;
        }
      } catch (err) {
        console.warn('Direct upload error, falling back to base64:', err);
      }
      setFormData(prev => ({
        ...prev,
        url: base64Data,
        thumbnailUrl: base64Data,
        title: prev.title.trim() ? prev.title : cleanTitle
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Learning Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Vui lòng nhập tên học liệu.');
      return;
    }

    if (!formData.topic.trim()) {
      setFormError('Vui lòng chọn hoặc nhập chủ đề / bài học.');
      return;
    }

    // Validation according to requested requirements
    if (formData.type === 'game' && !formData.htmlContent && !formData.url) {
      setFormError('Vui lòng tải lên tệp HTML trò chơi (.html, .htm) hoặc cung cấp đường link.');
      return;
    }

    if (formData.type === 'simulation' && !formData.url) {
      setFormError('Vui lòng cung cấp đường link URL mô phỏng (GeoGebra hoặc web app).');
      return;
    }

    if ((formData.type === 'infographic' || formData.type === 'mindmap') && !formData.url && !formData.htmlContent) {
      setFormError(`Vui lòng tải lên ảnh hoặc tệp HTML cho ${formData.type === 'infographic' ? 'Infographic' : 'Sơ đồ tư duy'} (hoặc cung cấp đường link liên kết).`);
      return;
    }

    // Validate URL protocol ONLY if it's an external link (not internal /infographics/, /mindmaps/ or data:image)
    if (formData.url) {
      const trimmedUrl = formData.url.trim();
      const isInternal = trimmedUrl.startsWith('/') || trimmedUrl.startsWith('data:');
      if (!isInternal && !trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
        setFormError('Đường link URL ngoài phải bắt đầu bằng https:// hoặc http://');
        return;
      }
    }

    setIsSaving(true);
    try {
      if (editingItem) {
        await updateLearningItem(editingItem.id, formData);
      } else {
        await createLearningItem(formData);
      }
      await onRefreshData();
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Lỗi khi lưu học liệu');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteLearningItem(itemToDelete.id);
      await onRefreshData();
      setItemToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Không thể xóa học liệu');
    }
  };

  // Handle Move Item Order
  const handleMoveOrder = async (item: LearningItem, direction: 'up' | 'down') => {
    const list = items
      .filter(i => i.type === item.type)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const currentIndex = list.findIndex(i => i.id === item.id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const reordered = [...list];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    const orderedIds = reordered.map(i => i.id);
    try {
      await reorderLearningItems(orderedIds);
      await onRefreshData();
    } catch (err) {
      console.warn('Reorder failed:', err);
    }
  };

  // Handle Save AI Config
  const handleSaveAiConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAiConfig(aiForm);
      setAiSaveSuccess(true);
      setTimeout(() => setAiSaveSuccess(false), 3000);
      await onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật cấu hình AI');
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
      return;
    }

    try {
      await changeAdminPassword(oldPassword, newPassword);
      alert('Đổi mật khẩu thành công. Cô vui lòng đăng nhập lại bằng mật khẩu mới.');
      onLogout();
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwdMessage({ type: 'error', text: err.message || 'Đổi mật khẩu thất bại' });
    }
  };

  // Reset Sample Curriculum
  const handleResetSample = async () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục lại dữ liệu mẫu chuẩn chương trình Toán 10? Các học liệu đã tạo sẽ được làm mới.')) {
      try {
        await resetToSampleCurriculum();
        await onRefreshData();
        alert('Đã khôi phục thành công dữ liệu mẫu!');
      } catch (err: any) {
        alert(err.message || 'Lỗi khi khôi phục');
      }
    }
  };

  // ================= RENDER LOGIN FORM IF NOT AUTHENTICATED =================
  if (!isAuthenticated) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-slate-900/20">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Quản Trị Hệ Thống
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Đăng nhập để thêm, chỉnh sửa học liệu số môn Toán 10 và cập nhật cấu hình hệ thống.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tên đăng nhập quản trị
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Nhập tên đăng nhập quản trị..."
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoggingIn ? 'Đang xác thực...' : 'Đăng nhập Quản trị viên'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={onBackToHome}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              ← Quay lại Trang chủ
            </button>
            <span className="text-slate-400 font-medium">Bảo mật hệ thống</span>
          </div>
        </div>
      </div>
    );
  }

  // Current category items for table
  const categoryItems = items
    .filter(i => {
      if (activeTab === 'games') return i.type === 'game';
      if (activeTab === 'simulations') return i.type === 'simulation';
      if (activeTab === 'infographics') return i.type === 'infographic';
      if (activeTab === 'mindmaps') return i.type === 'mindmap';
      return false;
    })
    .filter(i => {
      if (!adminSearch) return true;
      return (i.title + ' ' + i.topic + ' ' + (i.description || '')).toLowerCase().includes(adminSearch.toLowerCase());
    })
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Bảng Quản Trị Học Liệu Toán 10
            </h1>
            <p className="text-xs text-slate-500">
              Phiên làm việc: Quản trị viên · Lưu trữ đám mây liên tục
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenVisitorStats && (
            <button
              onClick={onOpenVisitorStats}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
              title="Báo cáo tổng hợp số lượt người ghé thăm webapp"
            >
              <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>
                Thống kê lượt ghé thăm:{' '}
                <strong className="font-mono text-blue-900">
                  {(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')}
                </strong>
              </span>
            </button>
          )}

          <button
            onClick={onBackToHome}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Về Trang chủ
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="my-6 flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 scrollbar-none">
        <button
          onClick={() => setActiveTab('games')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'games' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-purple-600" />
          <span>Trò chơi ({items.filter(i => i.type === 'game').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulations')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'simulations' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4 text-cyan-600" />
          <span>Mô phỏng ({items.filter(i => i.type === 'simulation').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('infographics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'infographics' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Infographic ({items.filter(i => i.type === 'infographic').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('mindmaps')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'mindmaps' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Network className="w-4 h-4 text-amber-600" />
          <span>Sơ đồ tư duy ({items.filter(i => i.type === 'mindmap').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" />
          <span>Quản lý người dùng web</span>
        </button>

        {onOpenVisitorStats && (
          <button
            onClick={onOpenVisitorStats}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer border border-blue-200/80 shadow-2xs"
            title="Mở bảng thống kê tổng hợp số lượt ghé thăm webapp"
          >
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Thống kê ghé thăm ({(visitorStats?.totalVisits || 1358).toLocaleString('vi-VN')})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('ai-assistant')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'ai-assistant' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>Cấu hình Trợ lý AI Gem</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <KeyRound className="w-4 h-4 text-slate-500" />
          <span>Cài đặt & Sao lưu</span>
        </button>
      </div>

      {/* ================= SECTION 1: ITEMS TABLE (FOR 4 MODULES) ================= */}
      {activeTab !== 'ai-assistant' && activeTab !== 'settings' && activeTab !== 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Action Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Lọc trong danh mục..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => openAddModal(activeTab)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>
                {activeTab === 'games' && 'Thêm Trò Chơi (Tải tệp HTML)'}
                {activeTab === 'infographics' && 'Thêm Infographic (Dạng ảnh hoặc HTML)'}
                {activeTab === 'mindmaps' && 'Thêm Sơ Đồ Tư Duy (Dạng ảnh hoặc HTML)'}
                {activeTab === 'simulations' && 'Thêm Mô Phỏng (GeoGebra / URL)'}
              </span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-3 px-4 w-14 text-center">Thứ tự</th>
                  <th className="py-3 px-4">Tên học liệu & Mô tả</th>
                  <th className="py-3 px-4">Chủ đề</th>
                  <th className="py-3 px-4">Loại lưu trữ</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveOrder(item, 'up')}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                          title="Di chuyển lên"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-slate-600 font-semibold">{idx + 1}</span>
                        <button
                          disabled={idx === categoryItems.length - 1}
                          onClick={() => handleMoveOrder(item, 'down')}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                          title="Di chuyển xuống"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-md">
                        {item.description || 'Không có mô tả'}
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                        {item.topic}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-xs text-slate-600">
                      {item.htmlContent ? (
                        <span className="inline-flex items-center gap-1.5 text-purple-700 font-semibold bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg">
                          <FileCode className="w-3.5 h-3.5" />
                          <span>Tệp HTML độc lập</span>
                        </span>
                      ) : item.url && (item.url.startsWith('/infographics/') || item.url.startsWith('/mindmaps/') || item.url.startsWith('data:image')) ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Ảnh tải lên</span>
                        </span>
                      ) : item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg"
                        >
                          <Link2 className="w-3.5 h-3.5" />
                          <span>URL ngoài</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-md">Chưa cấu hình</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewItem(item)}
                          title="Xem trước"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          title="Chỉnh sửa"
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setItemToDelete(item)}
                          title="Xóa"
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categoryItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      Chưa có học liệu nào trong danh mục này. Hãy nhấn &quot;Thêm mới&quot; để tải lên.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: AI ASSISTANT CONFIG ================= */}
      {activeTab === 'ai-assistant' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-3xl shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Cấu Hình Trợ Lý AI Toán 10 (Gemini Gem)</h2>
              <p className="text-xs text-slate-500">Giáo viên có thể nhập đường link Gem được tạo riêng cho Toán lớp 10.</p>
            </div>
          </div>

          <form onSubmit={handleSaveAiConfig} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Đường link Gem của Gemini (URL) <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={aiForm.gemUrl}
                onChange={(e) => setAiForm({ ...aiForm, gemUrl: e.target.value })}
                placeholder="https://gemini.google.com/gems/..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Khi học sinh bấm &quot;TRÒ CHUYỆN VỚI TRỢ LÝ TOÁN 10&quot;, liên kết này sẽ được mở trong tab mới.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tiêu đề hiển thị
              </label>
              <input
                type="text"
                value={aiForm.assistantTitle}
                onChange={(e) => setAiForm({ ...aiForm, assistantTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mô tả giới thiệu
              </label>
              <textarea
                rows={2}
                value={aiForm.assistantDescription}
                onChange={(e) => setAiForm({ ...aiForm, assistantDescription: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hướng dẫn đăng nhập & sử dụng cho học sinh
              </label>
              <textarea
                rows={3}
                value={aiForm.welcomeGuide}
                onChange={(e) => setAiForm({ ...aiForm, welcomeGuide: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {aiSaveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Đã lưu cấu hình Trợ lý AI thành công!</span>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Trợ Lý AI</span>
            </button>
          </form>
        </div>
      )}

      {/* ================= SECTION 3: SETTINGS & BACKUP ================= */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Đổi mật khẩu */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
              <KeyRound className="w-5 h-5 text-slate-700" />
              <h2 className="text-lg font-bold text-slate-900">Đổi Mật Khẩu Quản Trị</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mật khẩu mới (tối thiểu 12 ký tự)</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              {pwdMessage && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  pwdMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  {pwdMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{pwdMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                Cập nhật mật khẩu
              </button>
            </form>
          </div>

          {/* Card: Sao lưu & Dữ liệu mẫu */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">Sao Lưu & Dữ Liệu Chương Trình</h2>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dữ liệu được lưu trữ trực tiếp vào cơ sở lưu trữ của ứng dụng. Bạn có thể khôi phục lại gói học liệu mẫu chuẩn chương trình GDPT 2018 (Mệnh đề, Parabol, Vectơ, Thống kê) bất cứ lúc nào.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={handleResetSample}
                className="w-full py-2.5 px-4 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Khôi phục Dữ liệu Mẫu Chuẩn Toán 10</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 4: QUẢN LÝ NGƯỜI DÙNG WEB ================= */}
      {activeTab === 'users' && (
        <WebUsersManager token={getStoredToken() || undefined} />
      )}

      {/* ================= MODAL: ADD / EDIT LEARNING ITEM ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${
                  formData.type === 'game' ? 'bg-purple-100 text-purple-700' :
                  formData.type === 'simulation' ? 'bg-cyan-100 text-cyan-700' :
                  formData.type === 'infographic' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {formData.type === 'game' && <Gamepad2 className="w-5 h-5" />}
                  {formData.type === 'simulation' && <Compass className="w-5 h-5" />}
                  {formData.type === 'infographic' && <FileText className="w-5 h-5" />}
                  {formData.type === 'mindmap' && <Network className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {editingItem ? 'Chỉnh Sửa Học Liệu' : (
                      formData.type === 'game' ? 'Thêm Trò Chơi Mới (Tải lên tệp HTML)' :
                      formData.type === 'infographic' ? 'Thêm Infographic Mới (Dạng Ảnh hoặc Tệp HTML)' :
                      formData.type === 'mindmap' ? 'Thêm Sơ Đồ Tư Duy Mới (Dạng Ảnh hoặc Tệp HTML)' :
                      'Thêm Mô Phỏng Mới (GeoGebra / URL)'
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formData.type === 'game' ? 'Hỗ trợ tệp độc lập .html hoặc .htm nhúng trực tiếp trên web' :
                     formData.type === 'infographic' ? 'Hỗ trợ tải lên ảnh minh họa hoặc tệp HTML tương tác' :
                     formData.type === 'mindmap' ? 'Hỗ trợ tải lên sơ đồ dạng ảnh hoặc tệp HTML tương tác' :
                     'Dán đường dẫn web app hoặc GeoGebra môn Toán 10'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-5 space-y-4">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục học liệu</label>
                <select
                  value={formData.type}
                  disabled={Boolean(editingItem)}
                  onChange={(e) => {
                    const newType = e.target.value as any;
                    setFormData({ ...formData, type: newType });
                    if (newType === 'game') setUploadMode('html');
                    else if (newType === 'simulation') setUploadMode('url');
                    else if (uploadMode === 'url') setUploadMode('image');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                >
                  <option value="game">Trò chơi Toán học (Tải tệp HTML độc lập)</option>
                  <option value="simulation">Mô phỏng Toán học (GeoGebra / URL)</option>
                  <option value="infographic">Infographic Toán 10 (Dạng ảnh hoặc tệp HTML)</option>
                  <option value="mindmap">Sơ đồ tư duy Toán 10 (Dạng ảnh hoặc tệp HTML)</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên học liệu <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Đấu Trường Vectơ Oxy..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Topic / Chapter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bài học hoặc Chủ đề <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Ví dụ: Chương 5: Vectơ & Tọa độ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả nội dung rèn luyện của học liệu..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* ================= 1. SECTION CHO TRÒ CHƠI: TẢI TỆP HTML ================= */}
              {formData.type === 'game' && (
                <div className="p-4.5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                      <FileCode className="w-4 h-4 text-purple-600" />
                      <span>Tải lên tệp HTML trò chơi từ máy tính <span className="text-rose-500">*</span></span>
                    </label>
                    <span className="text-[11px] font-medium text-purple-700">Hỗ trợ .html, .htm</span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".html,.htm"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all w-fit"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Chọn tệp HTML trò chơi (.html)...</span>
                    </button>

                    {uploadedFileName && (
                      <span className="text-xs text-purple-900 font-bold bg-white px-3 py-1.5 rounded-lg border border-purple-200 truncate max-w-sm flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{uploadedFileName}</span>
                      </span>
                    )}
                  </div>

                  {formData.htmlContent && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 pt-2 border-t border-purple-200/60">
                      <button
                        type="button"
                        onClick={() => setPreviewItem({
                          id: 'preview-game',
                          type: 'game',
                          title: formData.title || 'Xem thử trò chơi',
                          topic: formData.topic || 'Toán 10',
                          description: formData.description,
                          htmlContent: formData.htmlContent,
                          displayOrder: 0,
                          createdAt: '',
                          updatedAt: ''
                        })}
                        className="px-3 py-1.5 bg-white border border-purple-300 hover:bg-purple-100/50 text-purple-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 text-purple-600" />
                        <span>Chạy thử trò chơi ngay</span>
                      </button>
                      <span className="text-[11px] text-purple-700 italic">Mã nguồn HTML đã nạp thành công, học sinh chơi trực tiếp trên web</span>
                    </div>
                  )}

                  <p className="text-[11px] text-purple-800/80 leading-relaxed">
                    Lưu ý: Tệp HTML độc lập nên nhúng sẵn CSS và JavaScript trong tệp để hoạt động trơn tru trong môi trường Sandbox bảo mật.
                  </p>
                </div>
              )}

              {/* ================= 2. SECTION CHO INFOGRAPHIC & SƠ ĐỒ TƯ DUY: HÌNH ẢNH HOẶC TỆP HTML ================= */}
              {(formData.type === 'infographic' || formData.type === 'mindmap') && (
                <div className="p-4.5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Chọn hình thức thêm {formData.type === 'infographic' ? 'Infographic' : 'Sơ đồ tư duy'} <span className="text-rose-500">*</span></span>
                    </label>
                  </div>

                  {/* Segmented control for Image vs HTML vs URL */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-xl border border-emerald-200 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setUploadMode('image')}
                      className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        uploadMode === 'image'
                          ? 'bg-emerald-600 text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/60'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>1. Dạng Hình Ảnh</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUploadMode('html')}
                      className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        uploadMode === 'html'
                          ? 'bg-purple-600 text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50/60'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>2. Dạng Tệp HTML</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        uploadMode === 'url'
                          ? 'bg-blue-600 text-white shadow-xs font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-blue-50/60'
                      }`}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>3. Link Drive / Web</span>
                    </button>
                  </div>

                  {/* Mode 1: Image Upload */}
                  {uploadMode === 'image' && (
                    <div className="pt-1">
                      <input
                        type="file"
                        ref={imageInputRef}
                        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={() => imageInputRef.current?.click()}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all w-fit"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Chọn tệp ảnh từ máy (PNG, JPG, SVG, WEBP)...</span>
                        </button>
                        {uploadedFileName && (
                          <span className="text-xs text-emerald-950 font-bold bg-white px-3 py-1.5 rounded-lg border border-emerald-200 truncate max-w-sm flex items-center gap-1.5 shadow-2xs">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{uploadedFileName}</span>
                          </span>
                        )}
                      </div>

                      {formData.url && (formData.url.startsWith('data:image') || formData.url.startsWith('/infographics/') || formData.url.startsWith('/mindmaps/')) && (
                        <div className="mt-3 p-2 bg-white rounded-xl border border-emerald-200 inline-block shadow-2xs">
                          <img
                            src={formData.url}
                            alt="Preview"
                            className="h-32 rounded-lg object-contain bg-slate-50 border border-slate-100"
                          />
                        </div>
                      )}

                      <p className="text-[11px] text-emerald-800 mt-2 leading-relaxed">
                        Hệ thống tự động lưu trữ ảnh lên máy chủ và hiển thị sắc nét trong trang {formData.type === 'infographic' ? 'Infographic' : 'Sơ đồ tư duy'}.
                      </p>
                    </div>
                  )}

                  {/* Mode 2: HTML File Upload */}
                  {uploadMode === 'html' && (
                    <div className="pt-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".html,.htm"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-all w-fit"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>Chọn tệp HTML tương tác (.html, .htm)...</span>
                        </button>
                        {uploadedFileName && (
                          <span className="text-xs text-purple-950 font-bold bg-white px-3 py-1.5 rounded-lg border border-purple-200 truncate max-w-sm flex items-center gap-1.5 shadow-2xs">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{uploadedFileName}</span>
                          </span>
                        )}
                      </div>

                      {formData.htmlContent && (
                        <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-purple-200/60">
                          <button
                            type="button"
                            onClick={() => setPreviewItem({
                              id: 'preview-html-doc',
                              type: formData.type,
                              title: formData.title || 'Xem thử tệp HTML',
                              topic: formData.topic || 'Toán 10',
                              description: formData.description,
                              htmlContent: formData.htmlContent,
                              url: formData.url,
                              displayOrder: 0,
                              createdAt: '',
                              updatedAt: ''
                            })}
                            className="px-3 py-1.5 bg-white border border-purple-300 hover:bg-purple-50 text-purple-800 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Play className="w-3.5 h-3.5 text-purple-600" />
                            <span>Xem thử tệp HTML tương tác</span>
                          </button>
                          <span className="text-[11px] text-purple-700 italic">Mã nguồn HTML đã sẵn sàng hiển thị tương tác trực tiếp</span>
                        </div>
                      )}

                      <p className="text-[11px] text-purple-800 mt-2 leading-relaxed">
                        Hỗ trợ tệp sơ đồ tư duy dạng web (Markmap, HTML Canvas, SVG, D3.js) hoặc infographic dạng tương tác.
                      </p>
                    </div>
                  )}

                  {/* Mode 3: Drive / URL Link */}
                  {uploadMode === 'url' && (
                    <div className="pt-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Đường link liên kết ngoài (Google Drive, URL)
                      </label>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Dán đường dẫn chia sẻ quyền xem công khai trên Google Drive (bất kỳ ai có liên kết đều xem được).
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ================= 3. SECTION CHO MÔ PHỎNG ================= */}
              {formData.type === 'simulation' && (
                <div className="p-4 rounded-2xl bg-cyan-50/70 border-2 border-cyan-200">
                  <label className="block text-xs font-bold text-cyan-950 mb-1 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-600" />
                    <span>Đường link ứng dụng Mô phỏng (GeoGebra / Web) <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://www.geogebra.org/m/..."
                    className="w-full px-3 py-2 bg-white border border-cyan-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  <p className="text-[11px] text-cyan-800 mt-1.5">
                    Dán đường link app GeoGebra môn Toán 10 hoặc liên kết ứng dụng mô phỏng trực quan.
                  </p>
                </div>
              )}

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Đang lưu...' : 'Lưu học liệu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION ================= */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Xác Nhận Xóa Học Liệu
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Bạn có chắc chắn muốn xóa học liệu <strong>&quot;{itemToDelete.title}&quot;</strong>? Thao tác này sẽ xóa vĩnh viễn khỏi thư viện.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREVIEW MODAL ================= */}
      {previewItem && (
        previewItem.type === 'game' ? (
          <GamePlayerModal
            game={previewItem}
            onClose={() => setPreviewItem(null)}
          />
        ) : previewItem.htmlContent ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
            <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 max-w-4xl w-full border border-slate-700 shadow-2xl flex flex-col h-[85vh]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                    <FileCode className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{previewItem.title}</h3>
                    <p className="text-xs text-slate-400">{previewItem.topic}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 mt-3 rounded-2xl overflow-hidden bg-white border border-slate-700/60 relative">
                <iframe
                  srcDoc={previewItem.htmlContent}
                  title={previewItem.title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400 mt-3">
                <span>Chế độ xem trước tệp HTML tương tác</span>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        ) : previewItem.url && (previewItem.url.startsWith('/infographics/') || previewItem.url.startsWith('/mindmaps/') || previewItem.url.startsWith('data:image')) ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
            <div className="bg-slate-900 rounded-3xl p-5 max-w-2xl w-full border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-white">
                <h3 className="font-bold text-sm sm:text-base">{previewItem.title}</h3>
                <button onClick={() => setPreviewItem(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="py-4 flex justify-center max-h-[70vh] overflow-auto">
                <img src={previewItem.url} alt={previewItem.title} className="max-h-[65vh] object-contain rounded-xl" />
              </div>
              <div className="flex items-center justify-end pt-3 border-t border-slate-800">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Xem Trước Liên Kết Học Liệu</h3>
                <button onClick={() => setPreviewItem(null)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-2 text-xs sm:text-sm">
                <div><strong>Tên:</strong> {previewItem.title}</div>
                <div><strong>Chủ đề:</strong> {previewItem.topic}</div>
                <div><strong>Đường dẫn:</strong> <a href={previewItem.url} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{previewItem.url}</a></div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    if (previewItem.url) window.open(previewItem.url, '_blank', 'noopener,noreferrer');
                    setPreviewItem(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở trong tab mới</span>
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
