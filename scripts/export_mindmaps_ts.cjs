const fs = require('fs');
const path = require('path');
const { ALL_36_CURRICULUM_MINDMAPS } = require('./mindmaps_curriculum_full.cjs');

const targetFile = path.resolve(__dirname, '../src/data/mindmapsData.ts');

const CHAPTER_CONFIGS = [
  {
    number: 1,
    roman: 'Chương I',
    title: 'Mệnh đề và tập hợp',
    badge: 'Đại số & Logic',
    colorName: 'indigo',
    gradient: 'from-indigo-600 to-blue-600',
    headerBg: 'bg-indigo-50/70 border-indigo-100',
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-600',
    description: 'Nền tảng logic toán học, mệnh đề kéo theo, tương đương và các phép toán tập hợp trên trục số.'
  },
  {
    number: 2,
    roman: 'Chương II',
    title: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    badge: 'Đại số & Tối ưu',
    colorName: 'sky',
    gradient: 'from-sky-600 to-cyan-600',
    headerBg: 'bg-sky-50/70 border-sky-100',
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-600',
    description: 'Biểu diễn miền nghiệm trên mặt phẳng Oxy và giải bài toán quy hoạch tuyến tính thực tế.'
  },
  {
    number: 3,
    roman: 'Chương III',
    title: 'Hệ thức lượng trong tam giác',
    badge: 'Hình học & Lượng giác',
    colorName: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
    headerBg: 'bg-emerald-50/70 border-emerald-100',
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-600',
    description: 'Giá trị lượng giác 0°-180°, định lý Côsin, định lý Sin và 5 công thức tính diện tích tam giác.'
  },
  {
    number: 4,
    roman: 'Chương IV',
    title: 'Vectơ',
    badge: 'Hình học phẳng',
    colorName: 'violet',
    gradient: 'from-violet-600 to-purple-600',
    headerBg: 'bg-violet-50/70 border-violet-100',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-600',
    description: 'Quy tắc cộng trừ vectơ, tích với một số, hệ tọa độ Oxy và tích vô hướng của hai vectơ.'
  },
  {
    number: 5,
    roman: 'Chương V',
    title: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    badge: 'Thống kê mô tả',
    colorName: 'amber',
    gradient: 'from-amber-600 to-orange-600',
    headerBg: 'bg-amber-50/70 border-amber-100',
    accentText: 'text-amber-800',
    accentBg: 'bg-amber-600',
    description: 'Số gần đúng, sai số, số trung bình, trung vị, tứ phân vị, phương sai và độ lệch chuẩn.'
  },
  {
    number: 6,
    roman: 'Chương VI',
    title: 'Hàm số, đồ thị và ứng dụng',
    badge: 'Giải tích & Đại số',
    colorName: 'rose',
    gradient: 'from-rose-600 to-pink-600',
    headerBg: 'bg-rose-50/70 border-rose-100',
    accentText: 'text-rose-700',
    accentBg: 'bg-rose-600',
    description: 'Hàm số bậc hai, tọa độ đỉnh parabol, định lý dấu tam thức bậc hai và phương trình chứa căn.'
  },
  {
    number: 7,
    roman: 'Chương VII',
    title: 'Phương pháp tọa độ trong mặt phẳng',
    badge: 'Hình học giải tích',
    colorName: 'blue',
    gradient: 'from-blue-600 to-indigo-600',
    headerBg: 'bg-blue-50/70 border-blue-100',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-600',
    description: 'Phương trình đường thẳng, khoảng cách, góc, phương trình đường tròn và ba đường conic (Elip, Hypebol, Parabol).'
  },
  {
    number: 8,
    roman: 'Chương VIII',
    title: 'Đại số tổ hợp',
    badge: 'Tổ hợp & Đếm',
    colorName: 'teal',
    gradient: 'from-teal-600 to-emerald-600',
    headerBg: 'bg-teal-50/70 border-teal-100',
    accentText: 'text-teal-700',
    accentBg: 'bg-teal-600',
    description: 'Quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp và khai triển nhị thức Newton.'
  },
  {
    number: 9,
    roman: 'Chương IX',
    title: 'Tính xác suất theo định nghĩa cổ điển',
    badge: 'Xác suất cổ điển',
    colorName: 'purple',
    gradient: 'from-purple-600 to-fuchsia-600',
    headerBg: 'bg-purple-50/70 border-purple-100',
    accentText: 'text-purple-700',
    accentBg: 'bg-purple-600',
    description: 'Không gian mẫu, biến cố, công thức cổ điển P(A) = n(A)/n(Ω) và quy tắc biến cố đối.'
  }
];

const THEME_COLORS = {
  1: { gradient: 'from-indigo-600 to-blue-600', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-800', border: 'border-indigo-200', lightBg: 'bg-indigo-50/50', accent: 'text-indigo-600' },
  2: { gradient: 'from-sky-600 to-cyan-600', badgeBg: 'bg-sky-100', badgeText: 'text-sky-800', border: 'border-sky-200', lightBg: 'bg-sky-50/50', accent: 'text-sky-600' },
  3: { gradient: 'from-emerald-600 to-teal-600', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-800', border: 'border-emerald-200', lightBg: 'bg-emerald-50/50', accent: 'text-emerald-600' },
  4: { gradient: 'from-violet-600 to-purple-600', badgeBg: 'bg-violet-100', badgeText: 'text-violet-800', border: 'border-violet-200', lightBg: 'bg-violet-50/50', accent: 'text-violet-600' },
  5: { gradient: 'from-amber-600 to-orange-600', badgeBg: 'bg-amber-100', badgeText: 'text-amber-800', border: 'border-amber-200', lightBg: 'bg-amber-50/50', accent: 'text-amber-600' },
  6: { gradient: 'from-rose-600 to-pink-600', badgeBg: 'bg-rose-100', badgeText: 'text-rose-800', border: 'border-rose-200', lightBg: 'bg-rose-50/50', accent: 'text-rose-600' },
  7: { gradient: 'from-blue-600 to-indigo-600', badgeBg: 'bg-blue-100', badgeText: 'text-blue-800', border: 'border-blue-200', lightBg: 'bg-blue-50/50', accent: 'text-blue-600' },
  8: { gradient: 'from-teal-600 to-emerald-600', badgeBg: 'bg-teal-100', badgeText: 'text-teal-800', border: 'border-teal-200', lightBg: 'bg-teal-50/50', accent: 'text-teal-600' },
  9: { gradient: 'from-purple-600 to-fuchsia-600', badgeBg: 'bg-purple-100', badgeText: 'text-purple-800', border: 'border-purple-200', lightBg: 'bg-purple-50/50', accent: 'text-purple-600' }
};

const itemsCode = ALL_36_CURRICULUM_MINDMAPS.map((item) => {
  const theme = THEME_COLORS[item.chapterNumber] || THEME_COLORS[1];
  const baseName = item.filenameBase;
  const keyBranches = item.branches.map(b => b.title);

  return `  {
    id: ${JSON.stringify(item.id)},
    baiCode: ${JSON.stringify(item.baiCode)},
    lessonNumber: ${JSON.stringify(item.lessonNumber)},
    isReview: ${Boolean(item.isReview)},
    chapterNumber: ${item.chapterNumber},
    chapterRoman: ${JSON.stringify(item.chapterRoman)},
    chapterTitle: ${JSON.stringify(item.chapterTitle)},
    title: ${JSON.stringify(item.title)},
    topic: ${JSON.stringify(`${item.chapterRoman}: ${item.shortTitle}`)},
    filename: ${JSON.stringify(`${baseName}.svg`)},
    htmlUrl: ${JSON.stringify(`/mindmaps/${baseName}.html`)},
    description: ${JSON.stringify(item.description)},
    keyBranches: ${JSON.stringify(keyBranches)},
    highlights: ${JSON.stringify(item.highlights)},
    themeColor: ${JSON.stringify(theme)},
    url: ${JSON.stringify(`/mindmaps/${baseName}.svg`)},
    thumbnailUrl: ${JSON.stringify(`/mindmaps/${baseName}.svg`)},
    isSample: false
  }`;
}).join(',\n');

const fileContent = `import { LearningItem } from '../types';

export interface MindMapItem {
  id: string;
  baiCode?: string; // e.g. "Bài 1", "Bài 2", "Ôn tập Chương I"
  lessonNumber?: number | null;
  isReview?: boolean;
  chapterNumber: number; // 1 to 9, or 0 for additional/custom
  chapterRoman: string;
  chapterTitle: string;
  title: string;
  topic: string;
  filename: string;
  htmlUrl?: string;
  description: string;
  keyBranches: string[];
  highlights: string[];
  themeColor: {
    gradient: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    lightBg: string;
    accent: string;
  };
  url?: string;
  thumbnailUrl?: string;
  driveUrl?: string;
  isSample?: boolean;
}

export const MINDMAP_CHAPTER_CONFIGS = ${JSON.stringify(CHAPTER_CONFIGS, null, 2)};

// --- 36 BÀI SƠ ĐỒ TƯ DUY TOÁN 10 ĐẦY ĐỦ (27 BÀI HỌC + 9 BÀI ÔN TẬP CHƯƠNG) KHOA HỌC GDPT 2018 ---
export const ALL_36_MINDMAPS: MindMapItem[] = [
${itemsCode}
];

export const CHAPTER_OVERVIEW_MINDMAPS: MindMapItem[] = [];
export const STANDARD_MINDMAPS: MindMapItem[] = ALL_36_MINDMAPS;

export function convertMindMapToLearningItem(mm: MindMapItem): LearningItem {
  return {
    id: mm.id,
    type: 'mindmap',
    title: mm.title,
    topic: mm.topic,
    description: mm.description,
    url: mm.url,
    thumbnailUrl: mm.thumbnailUrl,
    displayOrder: mm.chapterNumber,
    isSample: mm.isSample ?? false,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  };
}
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log('Successfully written src/data/mindmapsData.ts with all 36 authentic Mind Maps!');
