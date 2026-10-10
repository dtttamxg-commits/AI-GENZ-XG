import { LearningItem, AiAssistantConfig } from '../types';
import { initial36InfographicItems } from './infographicsData';
import { STANDARD_MINDMAPS } from './mindmapsData';
import { CURRICULUM_SIMULATIONS } from './simulationsData';
import { CURRICULUM_GAMES } from './games/curriculumGames';

export const initialMindmapItems: LearningItem[] = STANDARD_MINDMAPS.map((mm) => ({
  id: mm.id,
  type: 'mindmap' as const,
  title: mm.title,
  topic: `${mm.chapterRoman}: ${mm.chapterTitle}`,
  description: mm.description,
  url: mm.url || `/mindmaps/${mm.filename}`,
  thumbnailUrl: mm.thumbnailUrl || `/mindmaps/${mm.filename}`,
  displayOrder: mm.chapterNumber,
  isSample: mm.isSample ?? false,
  createdAt: '2026-09-09T08:00:00.000Z',
  updatedAt: '2026-09-09T08:00:00.000Z'
}));

export const initialAiConfig: AiAssistantConfig = {
  gemUrl: 'https://gemini.google.com/gem/1sNQ_g_lknAeqd4EvBxCrDZuZGsY402RU?usp=sharing',
  assistantTitle: 'TRỢ LÝ AI TOÁN 10 - ĐỒNG HÀNH CÙNG HỌC SINH LỚP 10',
  assistantDescription: 'Các bạn có thể đặt câu hỏi, tìm hướng giải bài toán và khám phá kiến thức cùng trợ lý AI chuyên biệt cho Toán lớp 10.',
  welcomeGuide: 'Trợ lý AI được tích hợp qua công nghệ Google Gemini. Các bạn có thể sử dụng tài khoản Google học tập của mình để đăng nhập, tải ảnh đề bài hoặc nhập văn bản câu hỏi Toán 10 để nhận hướng dẫn giải chi tiết từng bước.',
  samplePrompts: [
    'Giải thích ý nghĩa hình học của tích vô hướng hai vectơ u · v trong mặt phẳng toạ độ Oxy?',
    'Cho tam giác ABC có a=7, b=8, c=5. Hướng dẫn các bước áp dụng định lý Cosin để tính góc A và diện tích tam giác?',
    'Cách xác định toạ độ đỉnh, trục đối xứng và lập bảng biến thiên của hàm số y = -2x² + 4x + 1?',
    'Làm thế nào để biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn trên hệ toạ độ Oxy?',
    'Phân biệt các số đặc trưng đo xu thế trung tâm: Số trung bình, Trung vị (Me), Tứ phân vị (Q1, Q2, Q3) và Mốt (Mo)?'
  ]
};

export const allCurriculumGames: LearningItem[] = [
  ...CURRICULUM_GAMES
];

export const initialItems: LearningItem[] = [
  // --- 1. TẤT CẢ TRÒ CHƠI TOÁN HỌC (GAMES) ĐẦY ĐỦ CÁC CHƯƠNG ---
  ...allCurriculumGames,

  // --- 2. KHO APP MÔ PHỎNG TOÁN 10 CHUẨN GDPT 2018 (18 ỨNG DỤNG TƯƠNG TÁC SỐ) ---
  ...CURRICULUM_SIMULATIONS,

  // --- 3. INFOGRAPHIC TOÁN 10 (ĐỦ 36 BÀI & ÔN TẬP TỪ CHƯƠNG I ĐẾN IX) ---
  ...initial36InfographicItems,

  // --- 4. SƠ ĐỒ TƯ DUY TOÁN 10 (MIND MAPS CÁC CHƯƠNG & CHỦ ĐỀ) ---
  ...initialMindmapItems
];
