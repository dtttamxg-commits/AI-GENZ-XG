import { LearningItem } from '../types';

export interface InfographicLesson {
  id: string;
  baiCode: string; // e.g. "Bài 1", "Bài 2", "Ôn tập Chương I"
  lessonNumber: number | null; // null for review
  isReview: boolean;
  chapterNumber: number; // 1 to 9
  chapterRoman: string; // "Chương I" to "Chương IX"
  chapterTitle: string; // e.g. "Mệnh đề và tập hợp"
  title: string; // e.g. "Bài 1: Mệnh đề toán học"
  shortTitle: string; // e.g. "Mệnh đề toán học"
  filename: string; // e.g. "Bai01_Menh-de.png"
  description: string;
  keyFormulas: string[];
  highlights: string[];
  themeColor: {
    gradient: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    lightBg: string;
    accent: string;
  };
}

export const CHAPTER_CONFIGS = [
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

export const ALL_36_INFOGRAPHICS: InfographicLesson[] = [
  // ==================== CHƯƠNG I ====================
  {
    id: 'info-bai-01',
    baiCode: 'Bài 1',
    lessonNumber: 1,
    isReview: false,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Bài 1: Mệnh đề toán học',
    shortTitle: 'Mệnh đề toán học',
    filename: 'Bai01_Menh-de.png',
    description: 'Định nghĩa mệnh đề logic, mệnh đề chứa biến, mệnh đề phủ định P̄, mệnh đề kéo theo P ⇒ Q, mệnh đề đảo, mệnh đề tương đương P ⇔ Q, các ký hiệu với mọi (∀) và tồn tại (∃).',
    keyFormulas: [
      'P ⇒ Q sai khi P đúng & Q sai',
      'P̄ phủ định của P',
      'Ký hiệu: ∀ (với mọi), ∃ (tồn tại)',
      'Phủ định của ∀x, P(x) là ∃x, P̄(x)'
    ],
    highlights: ['Khái niệm mệnh đề', 'Mệnh đề kéo theo & đảo', 'Ký hiệu ∀ và ∃'],
    themeColor: {
      gradient: 'from-indigo-600 to-blue-600',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      badgeText: 'text-indigo-700',
      border: 'border-indigo-200',
      lightBg: 'bg-indigo-50/50',
      accent: 'text-indigo-600'
    }
  },
  {
    id: 'info-bai-02',
    baiCode: 'Bài 2',
    lessonNumber: 2,
    isReview: false,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Bài 2: Tập hợp và các phép toán trên tập hợp',
    shortTitle: 'Tập hợp và các phép toán',
    filename: 'Bai02_Tap-hop-va-cac-phep-toan.png',
    description: 'Khái niệm tập con, tập hợp bằng nhau, các tập hợp số N ⊂ Z ⊂ Q ⊂ R, các phép toán giao (A ∩ B), hợp (A ∪ B), hiệu (A \\ B), phần bù C_R(A) và các khoảng, đoạn, nửa khoảng trên R.',
    keyFormulas: [
      'Giao: A ∩ B = {x | x ∈ A và x ∈ B}',
      'Hợp: A ∪ B = {x | x ∈ A hoặc x ∈ B}',
      'Hiệu: A \\ B = {x | x ∈ A và x ∉ B}',
      'Khoảng (a; b), đoạn [a; b], nửa khoảng'
    ],
    highlights: ['Tập con & bằng nhau', 'Giao, hợp, hiệu, phần bù', 'Khoảng & đoạn trên R'],
    themeColor: {
      gradient: 'from-indigo-600 to-blue-600',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      badgeText: 'text-indigo-700',
      border: 'border-indigo-200',
      lightBg: 'bg-indigo-50/50',
      accent: 'text-indigo-600'
    }
  },
  {
    id: 'info-bai-02z',
    baiCode: 'Ôn tập Chương I',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Ôn tập Chương I: Mệnh đề & Tập hợp',
    shortTitle: 'Tổng kết Mệnh đề & Tập hợp',
    filename: 'Bai02z_OnTap_ChuongI_Menh-de-tap-hop.png',
    description: 'Bản đồ tư duy tóm lược toàn bộ cốt lõi logic mệnh đề, bảng chân trị, các phép toán tập hợp và kỹ năng biểu diễn các khoảng nghiệm trên trục số thực.',
    keyFormulas: [
      'Hệ thống hóa toàn bộ lý thuyết Chương I',
      'Kỹ năng biểu diễn trục số giao & hợp',
      'Các bẫy mệnh đề thường gặp trong kiểm tra'
    ],
    highlights: ['Sơ đồ tư duy toàn chương', 'Bảng quy tắc phủ định', 'Trục số tập hợp R'],
    themeColor: {
      gradient: 'from-indigo-700 to-violet-700',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },

  // ==================== CHƯƠNG II ====================
  {
    id: 'info-bai-03',
    baiCode: 'Bài 3',
    lessonNumber: 3,
    isReview: false,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Bài 3: Bất phương trình bậc nhất hai ẩn',
    shortTitle: 'BPT bậc nhất hai ẩn',
    filename: 'Bai03_BPT-bac-nhat-hai-an.png',
    description: 'Dạng tổng quát ax + by ≤ c (hoặc <, >, ≥), xác định cặp nghiệm (x₀; y₀), cách biểu diễn hình học miền nghiệm bằng bờ đường thẳng ax + by = c trên mặt phẳng Oxy.',
    keyFormulas: [
      'Dạng: ax + by ≤ c (a² + b² ≠ 0)',
      'Bờ đường thẳng d: ax + by = c',
      'Chọn điểm thử O(0; 0) để xác định nửa mặt phẳng'
    ],
    highlights: ['Dạng chuẩn BPT hai ẩn', 'Quy tắc điểm thử O(0;0)', 'Biểu diễn nửa mặt phẳng'],
    themeColor: {
      gradient: 'from-sky-600 to-cyan-600',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      border: 'border-sky-200',
      lightBg: 'bg-sky-50/50',
      accent: 'text-sky-600'
    }
  },
  {
    id: 'info-bai-04',
    baiCode: 'Bài 4',
    lessonNumber: 4,
    isReview: false,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Bài 4: Hệ bất phương trình bậc nhất hai ẩn',
    shortTitle: 'Hệ BPT bậc nhất hai ẩn',
    filename: 'Bai04_He-BPT-bac-nhat-hai-an.png',
    description: 'Biểu diễn miền nghiệm của hệ BPT bậc nhất hai ẩn (giao của các nửa mặt phẳng), xác định miền đa giác và phương pháp tìm giá trị lớn nhất, nhỏ nhất của biểu thức F(x, y) = ax + by tại các đỉnh đa giác.',
    keyFormulas: [
      'Miền nghiệm là giao các nửa mặt phẳng',
      'Miền đa giác lồi có các đỉnh A, B, C...',
      'F(x,y) đạt max/min tại một trong các đỉnh'
    ],
    highlights: ['Giao các nửa mặt phẳng', 'Miền đa giác nghiệm', 'Bài toán cực trị kinh tế F(x,y)'],
    themeColor: {
      gradient: 'from-sky-600 to-cyan-600',
      badgeBg: 'bg-sky-100 text-sky-800',
      badgeText: 'text-sky-700',
      border: 'border-sky-200',
      lightBg: 'bg-sky-50/50',
      accent: 'text-sky-600'
    }
  },
  {
    id: 'info-bai-04z',
    baiCode: 'Ôn tập Chương II',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Ôn tập Chương II: BPT & Hệ BPT bậc nhất hai ẩn',
    shortTitle: 'Tổng kết BPT bậc nhất hai ẩn',
    filename: 'Bai04z_OnTap_ChuongII_BPT-he-BPT-bac-nhat-hai-an.png',
    description: 'Tóm lược quy trình từng bước vẽ miền nghiệm, quy tắc gạch bỏ phần không phải nghiệm và chiến thuật giải bài toán thực tế sản xuất tối ưu lợi nhuận.',
    keyFormulas: [
      'Bước 1: Vẽ các bờ đường thẳng',
      'Bước 2: Chọn điểm kiểm tra & gạch miền',
      'Bước 3: Tìm tọa độ các đỉnh & tính F(x,y)'
    ],
    highlights: ['Quy trình 3 bước chuẩn hóa', 'Mẹo vẽ đồ thị nhanh', 'Tối ưu hóa đa giác lồi'],
    themeColor: {
      gradient: 'from-sky-700 to-blue-700',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/50',
      accent: 'text-blue-600'
    }
  },

  // ==================== CHƯƠNG III ====================
  {
    id: 'info-bai-05',
    baiCode: 'Bài 5',
    lessonNumber: 5,
    isReview: false,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Bài 5: Giá trị lượng giác của một góc từ 0° đến 180°',
    shortTitle: 'Giá trị lượng giác 0° - 180°',
    filename: 'Bai05_GTLG-goc-0-180.png',
    description: 'Nửa đường tròn đơn vị, định nghĩa sin, cos, tan, cot, dấu của các giá trị lượng giác trong góc nhọn và góc tù, mối quan hệ giữa hai góc bù nhau (sin(180°-α) = sinα, cos(180°-α) = -cosα).',
    keyFormulas: [
      'sin²α + cos²α = 1',
      'tanα = sinα/cosα, cotα = cosα/sinα',
      'sin(180° - α) = sinα',
      'cos(180° - α) = -cosα'
    ],
    highlights: ['Nửa đường tròn đơn vị', 'Góc bù nhau & phụ nhau', 'Hằng đẳng thức lượng giác'],
    themeColor: {
      gradient: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/50',
      accent: 'text-emerald-600'
    }
  },
  {
    id: 'info-bai-06',
    baiCode: 'Bài 6',
    lessonNumber: 6,
    isReview: false,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Bài 6: Hệ thức lượng trong tam giác',
    shortTitle: 'Hệ thức lượng trong tam giác',
    filename: 'Bai06_He-thuc-luong-trong-tam-giac.png',
    description: 'Định lý côsin: a² = b² + c² - 2bc.cosA, định lý sin: a/sinA = b/sinB = c/sinC = 2R, công thức trung tuyến m_a² = (2b² + 2c² - a²)/4 và 5 công thức tính diện tích S tam giác.',
    keyFormulas: [
      'ĐL Côsin: a² = b² + c² - 2bc·cosA',
      'ĐL Sin: a/sinA = b/sinB = c/sinC = 2R',
      'S = 1/2·ab·sinC = abc/(4R) = pr',
      'Heron: S = √[p(p-a)(p-b)(p-c)]'
    ],
    highlights: ['Định lý Côsin & Sin', '5 công thức diện tích S', 'Độ dài đường trung tuyến'],
    themeColor: {
      gradient: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/50',
      accent: 'text-emerald-600'
    }
  },
  {
    id: 'info-bai-06z',
    baiCode: 'Ôn tập Chương III',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Ôn tập Chương III: Hệ thức lượng trong tam giác',
    shortTitle: 'Tổng kết Hệ thức lượng',
    filename: 'Bai06z_OnTap_ChuongIII_He-thuc-luong.png',
    description: 'Bảng tra cứu toàn diện công thức giải tam giác (biết 3 cạnh, biết 2 cạnh 1 góc, biết 1 cạnh 2 góc) và bài toán đo đạc thực tế.',
    keyFormulas: [
      'Cẩm nang chọn định lý giải tam giác',
      'Mối liên hệ giữa R, r và nửa chu vi p',
      'Ứng dụng đo khoảng cách & chiều cao không với tới'
    ],
    highlights: ['Sơ đồ phân loại giải tam giác', 'Bài toán đo đạc thực tế', 'Bảng công thức bỏ túi'],
    themeColor: {
      gradient: 'from-emerald-700 to-green-700',
      badgeBg: 'bg-teal-100 text-teal-800',
      badgeText: 'text-teal-700',
      border: 'border-teal-200',
      lightBg: 'bg-teal-50/50',
      accent: 'text-teal-600'
    }
  },

  // ==================== CHƯƠNG IV ====================
  {
    id: 'info-bai-07',
    baiCode: 'Bài 7',
    lessonNumber: 7,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 7: Các khái niệm mở đầu về vectơ',
    shortTitle: 'Khái niệm mở đầu vectơ',
    filename: 'Bai07_Cac-khai-niem-mo-dau-vecto.png',
    description: 'Đoạn thẳng có hướng, phương và hướng, độ dài vectơ |a|, vectơ-không (0), hai vectơ cùng phương, hai vectơ cùng hướng/ngược hướng, hai vectơ bằng nhau.',
    keyFormulas: [
      'Vectơ là đoạn thẳng có hướng',
      'Độ dài |AB| = AB',
      'Vectơ-không cùng hướng với mọi vectơ',
      'a = b khi cùng hướng & cùng độ dài'
    ],
    highlights: ['Đoạn thẳng có hướng', 'Cùng phương & cùng hướng', 'Vectơ bằng nhau'],
    themeColor: {
      gradient: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },
  {
    id: 'info-bai-08',
    baiCode: 'Bài 8',
    lessonNumber: 8,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 8: Tổng và hiệu của hai vectơ',
    shortTitle: 'Tổng và hiệu hai vectơ',
    filename: 'Bai08_Tong-va-hieu-hai-vecto.png',
    description: 'Quy tắc tam giác (ba điểm) AB + BC = AC, quy tắc hình bình hành AB + AD = AC, quy tắc trừ AB - AC = CB, tính chất trung điểm I và trọng tâm G của tam giác.',
    keyFormulas: [
      'Quy tắc 3 điểm: AB + BC = AC',
      'Quy tắc hình bình hành: AB + AD = AC',
      'Quy tắc trừ: OB - OA = AB',
      'Trung điểm I: IA + IB = 0; MA + MB = 2MI'
    ],
    highlights: ['Quy tắc 3 điểm', 'Quy tắc hình bình hành', 'Quy tắc trung điểm & trọng tâm'],
    themeColor: {
      gradient: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },
  {
    id: 'info-bai-09',
    baiCode: 'Bài 9',
    lessonNumber: 9,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 9: Tích của một vectơ với một số',
    shortTitle: 'Tích vectơ với một số',
    filename: 'Bai09_Tich-vecto-voi-mot-so.png',
    description: 'Định nghĩa tích k.a, hướng phụ thuộc vào dấu của k, tính chất kết hợp, phân phối, điều kiện hai vectơ cùng phương (a = k.b) và điều kiện ba điểm A, B, C thẳng hàng.',
    keyFormulas: [
      '|k·a| = |k|·|a|',
      'k > 0: k·a cùng hướng a; k < 0: ngược hướng',
      'a, b cùng phương ⇔ a = k·b (b ≠ 0)',
      'A, B, C thẳng hàng ⇔ AB = k·AC'
    ],
    highlights: ['Phép nhân số với vectơ', 'Điều kiện 2 vectơ cùng phương', 'Chứng minh 3 điểm thẳng hàng'],
    themeColor: {
      gradient: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },
  {
    id: 'info-bai-10',
    baiCode: 'Bài 10',
    lessonNumber: 10,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 10: Vectơ trong mặt phẳng tọa độ',
    shortTitle: 'Vectơ trong tọa độ Oxy',
    filename: 'Bai10_Vecto-trong-mat-phang-toa-do.png',
    description: 'Trục tọa độ, vectơ đơn vị i và j, tọa độ u = (x; y) ⇔ u = x.i + y.j, tọa độ điểm M, biểu thức tọa độ của tổng, hiệu, nhân số, tọa độ vectơ AB = (xB - xA; yB - yA), trung điểm, trọng tâm.',
    keyFormulas: [
      'u = (x; y) ⇔ u = x·i + y·j',
      'AB = (xB - xA; yB - yA)',
      'Trung điểm I: ((xA+xB)/2; (yA+yB)/2)',
      'Trọng tâm G: ((xA+xB+xC)/3; (yA+yB+yC)/3)'
    ],
    highlights: ['Tọa độ vectơ & điểm', 'Cộng trừ vectơ theo tọa độ', 'Tọa độ trung điểm & trọng tâm'],
    themeColor: {
      gradient: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },
  {
    id: 'info-bai-11',
    baiCode: 'Bài 11',
    lessonNumber: 11,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 11: Tích vô hướng của hai vectơ',
    shortTitle: 'Tích vô hướng hai vectơ',
    filename: 'Bai11_Tich-vo-huong-hai-vecto.png',
    description: 'Góc giữa hai vectơ, định nghĩa u.v = |u|.|v|.cos(u, v), bình phương vô hướng u² = |u|², biểu thức tọa độ u.v = x1.x2 + y1.y2, công thức tính góc và điều kiện vuông góc u ⊥ v ⇔ x1.x2 + y1.y2 = 0.',
    keyFormulas: [
      'u · v = |u|·|v|·cos(u, v)',
      'Biểu thức tọa độ: u · v = x₁x₂ + y₁y₂',
      'Độ dài: |u| = √(x² + y²)',
      'cos(u, v) = (x₁x₂ + y₁y₂) / (√(x₁²+y₁²)·√(x₂²+y₂²))'
    ],
    highlights: ['Định nghĩa tích vô hướng', 'Biểu thức tọa độ tích vô hướng', 'Điều kiện vuông góc 2 vectơ'],
    themeColor: {
      gradient: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-100 text-violet-800',
      badgeText: 'text-violet-700',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/50',
      accent: 'text-violet-600'
    }
  },
  {
    id: 'info-bai-11z',
    baiCode: 'Ôn tập Chương IV',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Ôn tập Chương IV: Vectơ',
    shortTitle: 'Tổng kết Vectơ toàn diện',
    filename: 'Bai11z_OnTap_ChuongIV_Vecto.png',
    description: 'Hệ thống hóa toàn bộ kiến thức vectơ: từ hình học tổng hợp (quy tắc 3 điểm, hình bình hành) đến đại số tọa độ Oxy và tích vô hướng.',
    keyFormulas: [
      'Cầu nối giữa hình học và tọa độ Oxy',
      'Bảng tổng hợp công thức vectơ cốt lõi',
      'Ứng dụng chứng minh hình học & tính góc'
    ],
    highlights: ['Sơ đồ phân nhánh vectơ', 'Bảng đối chiếu hình học & tọa độ', 'Kỹ thuật phân tích vectơ'],
    themeColor: {
      gradient: 'from-purple-700 to-indigo-700',
      badgeBg: 'bg-purple-100 text-purple-800',
      badgeText: 'text-purple-700',
      border: 'border-purple-200',
      lightBg: 'bg-purple-50/50',
      accent: 'text-purple-600'
    }
  },

  // ==================== CHƯƠNG V ====================
  {
    id: 'info-bai-12',
    baiCode: 'Bài 12',
    lessonNumber: 12,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 12: Số gần đúng và sai số',
    shortTitle: 'Số gần đúng và sai số',
    filename: 'Bai12_So-gan-dung-va-sai-so.png',
    description: 'Số đúng ā, số gần đúng a, sai số tuyệt đối Δa = |ā - a| ≤ d, độ chính xác d, sai số tương đối δa = Δa/|a|, quy tắc làm tròn số và xác định chữ số có nghĩa/chữ số đáng tin.',
    keyFormulas: [
      'Sai số tuyệt đối: Δa = |ā - a| ≤ d',
      'Sai số tương đối: δa = Δa / |a| ≤ d / |a|',
      'Quy tắc làm tròn theo độ chính xác d',
      'Chữ số có nghĩa'
    ],
    highlights: ['Sai số tuyệt đối & tương đối', 'Độ chính xác d', 'Quy tắc làm tròn số chuẩn'],
    themeColor: {
      gradient: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-100 text-amber-800',
      badgeText: 'text-amber-800',
      border: 'border-amber-200',
      lightBg: 'bg-amber-50/50',
      accent: 'text-amber-600'
    }
  },
  {
    id: 'info-bai-13',
    baiCode: 'Bài 13',
    lessonNumber: 13,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 13: Các số đặc trưng đo xu thế trung tâm',
    shortTitle: 'Số đo xu thế trung tâm',
    filename: 'Bai13_So-dac-trung-xu-the-trung-tam.png',
    description: 'Số trung bình x̄, trung vị Me (chia mẫu số liệu thành 2 phần bằng nhau), các tứ phân vị Q1, Q2, Q3 (chia 4 phần), và mốt Mo (giá trị có tần số lớn nhất).',
    keyFormulas: [
      'Số trung bình: x̄ = (x₁ + x₂ + ... + x_n) / n',
      'Trung vị Me = Q₂',
      'Tứ phân vị: Q₁, Q₂, Q₃',
      'Mốt Mo: giá trị xuất hiện nhiều nhất'
    ],
    highlights: ['Số trung bình x̄', 'Trung vị Me & Tứ phân vị Q₁, Q₂, Q₃', 'Mốt Mo trong thực tế'],
    themeColor: {
      gradient: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-100 text-amber-800',
      badgeText: 'text-amber-800',
      border: 'border-amber-200',
      lightBg: 'bg-amber-50/50',
      accent: 'text-amber-600'
    }
  },
  {
    id: 'info-bai-14',
    baiCode: 'Bài 14',
    lessonNumber: 14,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 14: Các số đặc trưng đo độ phân tán',
    shortTitle: 'Số đo độ phân tán',
    filename: 'Bai14_So-dac-trung-do-phan-tan.png',
    description: 'Khoảng biến thiên R = x_max - x_min, khoảng tứ phân vị ΔQ = Q3 - Q1, xác định giá trị ngoại lệ (ngoại lai), phương sai s² và độ lệch chuẩn s = √(s²).',
    keyFormulas: [
      'Khoảng biến thiên: R = x_max - x_min',
      'Khoảng tứ phân vị: ΔQ = Q₃ - Q₁',
      'Phương sai: s² = 1/n · Σ(x_i - x̄)²',
      'Độ lệch chuẩn: s = √(s²)'
    ],
    highlights: ['Khoảng biến thiên & tứ phân vị', 'Nhận diện giá trị ngoại lệ', 'Phương sai & độ lệch chuẩn'],
    themeColor: {
      gradient: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-100 text-amber-800',
      badgeText: 'text-amber-800',
      border: 'border-amber-200',
      lightBg: 'bg-amber-50/50',
      accent: 'text-amber-600'
    }
  },
  {
    id: 'info-bai-14z',
    baiCode: 'Ôn tập Chương V',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Ôn tập Chương V: Các số đặc trưng của mẫu số liệu',
    shortTitle: 'Tổng kết Thống kê mô tả',
    filename: 'Bai14z_OnTap_ChuongV_So-dac-trung.png',
    description: 'Sơ đồ so sánh tính đại diện của số trung bình và trung vị khi có giá trị ngoại lai; ý nghĩa của phương sai và độ lệch chuẩn trong đánh giá độ ổn định.',
    keyFormulas: [
      'So sánh x̄ và Me khi có ngoại lai',
      'Mô hình hộp (Box-plot) trực quan',
      'Ý nghĩa thực tiễn của độ lệch chuẩn s'
    ],
    highlights: ['So sánh xu thế trung tâm & phân tán', 'Xử lý số liệu ngoại lai', 'Ý nghĩa thực tế của thống kê'],
    themeColor: {
      gradient: 'from-orange-700 to-amber-700',
      badgeBg: 'bg-orange-100 text-orange-800',
      badgeText: 'text-orange-700',
      border: 'border-orange-200',
      lightBg: 'bg-orange-50/50',
      accent: 'text-orange-600'
    }
  },

  // ==================== CHƯƠNG VI ====================
  {
    id: 'info-bai-15',
    baiCode: 'Bài 15',
    lessonNumber: 15,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 15: Hàm số và đồ thị',
    shortTitle: 'Hàm số và đồ thị',
    filename: 'Bai15_Ham-so.png',
    description: 'Khái niệm hàm số y = f(x), tập xác định D, tập giá trị, đồ thị hàm số, hàm số đồng biến (tăng) và nghịch biến (giảm) trên một khoảng (a; b).',
    keyFormulas: [
      'Tập xác định D = {x ∈ R | f(x) có nghĩa}',
      'Đồng biến: x₁ < x₂ ⇒ f(x₁) < f(x₂)',
      'Nghịch biến: x₁ < x₂ ⇒ f(x₁) > f(x₂)',
      'Điểm M(x₀; y₀) ∈ đồ thị ⇔ y₀ = f(x₀)'
    ],
    highlights: ['Tập xác định D', 'Đồng biến & nghịch biến', 'Đọc đồ thị hàm số'],
    themeColor: {
      gradient: 'from-rose-600 to-pink-600',
      badgeBg: 'bg-rose-100 text-rose-800',
      badgeText: 'text-rose-700',
      border: 'border-rose-200',
      lightBg: 'bg-rose-50/50',
      accent: 'text-rose-600'
    }
  },
  {
    id: 'info-bai-16',
    baiCode: 'Bài 16',
    lessonNumber: 16,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 16: Hàm số bậc hai',
    shortTitle: 'Hàm số bậc hai',
    filename: 'Bai16_Ham-so-bac-hai.png',
    description: 'Dạng y = ax² + bx + c (a ≠ 0), parabol có đỉnh I(-b/(2a); -Δ/(4a)), trục đối xứng x = -b/(2a), bề lõm quay lên khi a > 0 và quay xuống khi a < 0, bảng biến thiên.',
    keyFormulas: [
      'Đỉnh Parabol: I(-b/(2a); -Δ/(4a))',
      'Trục đối xứng: x = -b/(2a)',
      'a > 0: Bề lõm quay lên, min tại đỉnh',
      'a < 0: Bề lõm quay xuống, max tại đỉnh'
    ],
    highlights: ['Tọa độ đỉnh I & trục đối xứng', 'Bảng biến thiên theo dấu a', 'Vẽ đồ thị parabol'],
    themeColor: {
      gradient: 'from-rose-600 to-pink-600',
      badgeBg: 'bg-rose-100 text-rose-800',
      badgeText: 'text-rose-700',
      border: 'border-rose-200',
      lightBg: 'bg-rose-50/50',
      accent: 'text-rose-600'
    }
  },
  {
    id: 'info-bai-17',
    baiCode: 'Bài 17',
    lessonNumber: 17,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 17: Dấu của tam thức bậc hai',
    shortTitle: 'Dấu của tam thức bậc hai',
    filename: 'Bai17_Dau-tam-thuc-bac-hai.png',
    description: 'Tam thức f(x) = ax² + bx + c (a ≠ 0), định lý dấu dựa vào biệt thức Δ: Δ < 0 (cùng dấu a); Δ = 0 (cùng dấu a trừ nghiệm kép); Δ > 0 (trong trái ngoài cùng), giải bất phương trình bậc hai.',
    keyFormulas: [
      'Δ < 0: a·f(x) > 0 với mọi x ∈ R',
      'Δ = 0: a·f(x) > 0 với mọi x ≠ -b/(2a)',
      'Δ > 0: "Trong trái dấu a, ngoài cùng dấu a"',
      'Nghiệm BPT bậc hai: ax² + bx + c > 0'
    ],
    highlights: ['Định lý dấu tam thức bậc hai', 'Quy tắc "Trong trái - Ngoài cùng"', 'Giải BPT bậc hai ax² + bx + c > 0'],
    themeColor: {
      gradient: 'from-rose-600 to-pink-600',
      badgeBg: 'bg-rose-100 text-rose-800',
      badgeText: 'text-rose-700',
      border: 'border-rose-200',
      lightBg: 'bg-rose-50/50',
      accent: 'text-rose-600'
    }
  },
  {
    id: 'info-bai-18',
    baiCode: 'Bài 18',
    lessonNumber: 18,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 18: Phương trình quy về phương trình bậc hai',
    shortTitle: 'Phương trình quy về bậc hai',
    filename: 'Bai18_Phuong-trinh-quy-ve-bac-hai.png',
    description: 'Hai dạng phương trình chứa căn căn bản: √(ax² + bx + c) = √(dx² + ex + f) và √(ax² + bx + c) = dx + e; phương pháp bình phương 2 vế và thử lại nghiệm ngoại lai.',
    keyFormulas: [
      'Dạng 1: √(f(x)) = √(g(x)) ⇒ f(x) = g(x)',
      'Dạng 2: √(f(x)) = g(x) ⇒ f(x) = [g(x)]²',
      'Thử lại nghiệm vào PT ban đầu để loại nghiệm ngoại lai'
    ],
    highlights: ['2 dạng phương trình căn thức', 'Quy trình bình phương khử căn', 'Kỹ năng loại nghiệm ngoại lai'],
    themeColor: {
      gradient: 'from-rose-600 to-pink-600',
      badgeBg: 'bg-rose-100 text-rose-800',
      badgeText: 'text-rose-700',
      border: 'border-rose-200',
      lightBg: 'bg-rose-50/50',
      accent: 'text-rose-600'
    }
  },
  {
    id: 'info-bai-18z',
    baiCode: 'Ôn tập Chương VI',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Ôn tập Chương VI: Hàm số, đồ thị và ứng dụng',
    shortTitle: 'Tổng kết Hàm số & Ứng dụng',
    filename: 'Bai18z_OnTap_ChuongVI_Ham-so-do-thi.png',
    description: 'Sơ đồ tư duy toàn chương: khảo sát hàm bậc hai, xét dấu tam thức bậc hai, giải phương trình và ứng dụng bài toán tối ưu quỹ đạo vật ném, diện tích tối đa.',
    keyFormulas: [
      'Mối liên hệ giữa đồ thị parabol & tam thức',
      'Ứng dụng tìm min/max thực tế (doanh thu, diện tích)',
      'Bảng phân loại bài tập trọng tâm kiểm tra'
    ],
    highlights: ['Tổng kết Hàm số & Parabol', 'Ứng dụng tối ưu hóa thực tế', 'Chiến lược giải toán chứa căn'],
    themeColor: {
      gradient: 'from-pink-700 to-rose-700',
      badgeBg: 'bg-pink-100 text-pink-800',
      badgeText: 'text-pink-700',
      border: 'border-pink-200',
      lightBg: 'bg-pink-50/50',
      accent: 'text-pink-600'
    }
  },

  // ==================== CHƯƠNG VII ====================
  {
    id: 'info-bai-19',
    baiCode: 'Bài 19',
    lessonNumber: 19,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 19: Phương trình đường thẳng',
    shortTitle: 'Phương trình đường thẳng',
    filename: 'Bai19_Phuong-trinh-duong-thang.png',
    description: 'Vectơ chỉ phương u = (u₁; u₂), vectơ pháp tuyến n = (a; b) với u ⊥ n, phương trình tham số {x = x₀ + t·u₁, y = y₀ + t·u₂}, và phương trình tổng quát ax + by + c = 0.',
    keyFormulas: [
      'VTPT n = (a; b) ⊥ VTCP u = (-b; a)',
      'PTTQ: a(x - x₀) + b(y - y₀) = 0 ⇔ ax + by + c = 0',
      'PT tham số: x = x₀ + t·u₁, y = y₀ + t·u₂',
      'Hệ số góc k = -a/b (với b ≠ 0)'
    ],
    highlights: ['VTCP & VTPT', 'PT tham số & PT tổng quát', 'Chuyển đổi giữa các dạng PT'],
    themeColor: {
      gradient: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/50',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'info-bai-20',
    baiCode: 'Bài 20',
    lessonNumber: 20,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 20: Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách',
    shortTitle: 'Vị trí tương đối, Góc & Khoảng cách',
    filename: 'Bai20_Vi-tri-tuong-doi-goc-khoang-cach.png',
    description: 'Vị trí tương đối qua hệ phương trình hoặc tỉ số hệ số (cắt nhau, song song, trùng nhau), góc giữa hai đường thẳng (0° ≤ φ ≤ 90°) và công thức tính khoảng cách từ điểm M₀ đến đường thẳng Δ.',
    keyFormulas: [
      'cosφ = |a₁a₂ + b₁b₂| / (√(a₁²+b₁²) · √(a₂²+b₂²))',
      'Δ₁ ⊥ Δ₂ ⇔ a₁a₂ + b₁b₂ = 0',
      'Khoảng cách: d(M₀, Δ) = |ax₀ + by₀ + c| / √(a² + b²)'
    ],
    highlights: ['Vị trí tương đối 2 đường thẳng', 'Góc giữa 2 đường thẳng', 'Công thức khoảng cách điểm đến đường thẳng'],
    themeColor: {
      gradient: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/50',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'info-bai-21',
    baiCode: 'Bài 21',
    lessonNumber: 21,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 21: Đường tròn trong mặt phẳng tọa độ',
    shortTitle: 'Đường tròn trong tọa độ Oxy',
    filename: 'Bai21_Duong-tron-trong-mat-phang-toa-do.png',
    description: 'Phương trình chính tắc (x - a)² + (y - b)² = R² (tâm I(a; b), bán kính R), dạng tổng quát x² + y² - 2ax - 2by + c = 0 (điều kiện a² + b² - c > 0) và phương trình tiếp tuyến của đường tròn tại M₀(x₀; y₀).',
    keyFormulas: [
      'Chính tắc: (x - a)² + (y - b)² = R²',
      'Khai triển: x² + y² - 2ax - 2by + c = 0',
      'Bán kính: R = √(a² + b² - c) (a² + b² - c > 0)',
      'Tiếp tuyến tại M₀: (x₀ - a)(x - x₀) + (y₀ - b)(y - y₀) = 0'
    ],
    highlights: ['Tâm I(a; b) & Bán kính R', 'Điều kiện phương trình đường tròn', 'Phương trình tiếp tuyến tại điểm'],
    themeColor: {
      gradient: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/50',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'info-bai-22',
    baiCode: 'Bài 22',
    lessonNumber: 22,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 22: Ba đường conic',
    shortTitle: 'Ba đường conic (Elip, Hypebol, Parabol)',
    filename: 'Bai22_Ba-duong-conic.png',
    description: 'Phương trình chính tắc Elip (x²/a² + y²/b² = 1 với a² = b² + c²), Hypebol (x²/a² - y²/b² = 1 với c² = a² + b²) và Parabol (y² = 2px), các tiêu điểm, đỉnh, trục đối xứng và ứng dụng đời sống.',
    keyFormulas: [
      'Elip: x²/a² + y²/b² = 1 (a > b > 0, c² = a² - b²)',
      'Hypebol: x²/a² - y²/b² = 1 (c² = a² + b²)',
      'Parabol: y² = 2px (p > 0, tiêu điểm F(p/2; 0))',
      'Tiêu cự F₁F₂ = 2c'
    ],
    highlights: ['Phương trình chính tắc Elip', 'Phương trình Hypebol & Parabol', 'Tiêu điểm & ứng dụng thực tế'],
    themeColor: {
      gradient: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      badgeText: 'text-blue-700',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/50',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'info-bai-22z',
    baiCode: 'Ôn tập Chương VII',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Ôn tập Chương VII: Phương pháp tọa độ trong mặt phẳng',
    shortTitle: 'Tổng kết Hình học tọa độ Oxy',
    filename: 'Bai22z_OnTap_ChuongVII_Toa-do-mat-phang.png',
    description: 'Bảng tra cứu toàn diện công thức Oxy: đường thẳng, góc, khoảng cách, đường tròn và ba đường conic; phương pháp chuyển hóa hình học thuần túy sang đại số.',
    keyFormulas: [
      'Bảng tổng hợp công thức đường thẳng & đường tròn',
      'So sánh các yếu tố đặc trưng của 3 đường Conic',
      'Phương pháp giải bài toán tọa độ thực tế'
    ],
    highlights: ['Bảng tra cứu Oxy toàn diện', 'Hệ thống hóa 3 đường conic', 'Chiến thuật giải toán hình học giải tích'],
    themeColor: {
      gradient: 'from-indigo-700 to-blue-700',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      badgeText: 'text-indigo-700',
      border: 'border-indigo-200',
      lightBg: 'bg-indigo-50/50',
      accent: 'text-indigo-600'
    }
  },

  // ==================== CHƯƠNG VIII ====================
  {
    id: 'info-bai-23',
    baiCode: 'Bài 23',
    lessonNumber: 23,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 23: Quy tắc đếm',
    shortTitle: 'Quy tắc đếm (Cộng & Nhân)',
    filename: 'Bai23_Quy-tac-dem.png',
    description: 'Quy tắc cộng (hai hành động xung khắc/loại trừ nhau), quy tắc nhân (hai công đoạn kế tiếp nhau) và phương pháp sơ đồ hình cây để trực quan hóa mọi khả năng xảy ra.',
    keyFormulas: [
      'Quy tắc cộng: Phương án 1 (m cách) HOẶC Phương án 2 (n cách) ⇒ m + n cách',
      'Quy tắc nhân: Công đoạn 1 (m cách) VÀ Công đoạn 2 (n cách) ⇒ m · n cách',
      'Sơ đồ hình cây (Tree Diagram)'
    ],
    highlights: ['Quy tắc cộng (HOẶC)', 'Quy tắc nhân (VÀ / LIÊN TIẾP)', 'Sơ đồ hình cây'],
    themeColor: {
      gradient: 'from-teal-600 to-emerald-600',
      badgeBg: 'bg-teal-100 text-teal-800',
      badgeText: 'text-teal-700',
      border: 'border-teal-200',
      lightBg: 'bg-teal-50/50',
      accent: 'text-teal-600'
    }
  },
  {
    id: 'info-bai-24',
    baiCode: 'Bài 24',
    lessonNumber: 24,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 24: Hoán vị, Chỉnh hợp và Tổ hợp',
    shortTitle: 'Hoán vị, Chỉnh hợp, Tổ hợp',
    filename: 'Bai24_Hoan-vi-chinh-hop-to-hop.png',
    description: 'Hoán vị P_n = n! (sắp xếp n phần tử), Chỉnh hợp A_n^k = n!/(n-k)! (chọn k phần tử và có thứ tự), Tổ hợp C_n^k = n!/(k!(n-k)!) (chọn k phần tử không phân biệt thứ tự) và tính chất tổ hợp.',
    keyFormulas: [
      'Hoán vị: P_n = n! = 1·2·...·n',
      'Chỉnh hợp (CÓ thứ tự): A_n^k = n! / (n - k)!',
      'Tổ hợp (KHÔNG thứ tự): C_n^k = n! / [k!·(n - k)!]',
      'Tính chất: C_n^k = C_n^(n-k); C_n^k + C_n^(k+1) = C_(n+1)^(k+1)'
    ],
    highlights: ['Hoán vị P_n', 'Chỉnh hợp A_n^k (Có thứ tự)', 'Tổ hợp C_n^k (Không thứ tự)'],
    themeColor: {
      gradient: 'from-teal-600 to-emerald-600',
      badgeBg: 'bg-teal-100 text-teal-800',
      badgeText: 'text-teal-700',
      border: 'border-teal-200',
      lightBg: 'bg-teal-50/50',
      accent: 'text-teal-600'
    }
  },
  {
    id: 'info-bai-25',
    baiCode: 'Bài 25',
    lessonNumber: 25,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 25: Nhị thức Newton',
    shortTitle: 'Nhị thức Newton',
    filename: 'Bai25_Nhi-thuc-Newton.png',
    description: 'Công thức khai triển nhị thức Newton với số mũ n = 4 và n = 5: (a + b)⁴ và (a + b)⁵, tính đối xứng của hệ số nhị thức, tam giác Pascal và ứng dụng tính tổng đại số các hệ số.',
    keyFormulas: [
      '(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴',
      '(a + b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵',
      'Hệ số tổ hợp: C_n^0, C_n^1, ..., C_n^n',
      'Tam giác Pascal'
    ],
    highlights: ['Khai triển (a + b)⁴ và (a + b)⁵', 'Tam giác Pascal trực quan', 'Tìm hệ số của x^k'],
    themeColor: {
      gradient: 'from-teal-600 to-emerald-600',
      badgeBg: 'bg-teal-100 text-teal-800',
      badgeText: 'text-teal-700',
      border: 'border-teal-200',
      lightBg: 'bg-teal-50/50',
      accent: 'text-teal-600'
    }
  },
  {
    id: 'info-bai-25z',
    baiCode: 'Ôn tập Chương VIII',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Ôn tập Chương VIII: Đại số tổ hợp',
    shortTitle: 'Tổng kết Đại số tổ hợp',
    filename: 'Bai25z_OnTap_ChuongVIII_Dai-so-to-hop.png',
    description: 'Sơ đồ tư duy lựa chọn quy tắc đếm (khi nào dùng Cộng, Nhân, Hoán vị, Chỉnh hợp, Tổ hợp) và bảng mẹo nhận diện từ khóa trong đề thi.',
    keyFormulas: [
      'Sơ đồ phân nhánh lựa chọn công cụ đếm',
      'Phân biệt bài toán có thứ tự vs không thứ tự',
      'Phương pháp phần bù trong bài toán đếm'
    ],
    highlights: ['Sơ đồ quyết định công cụ đếm', 'Mẹo phân biệt A và C', 'Phương pháp phần bù'],
    themeColor: {
      gradient: 'from-emerald-700 to-teal-700',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/50',
      accent: 'text-emerald-600'
    }
  },

  // ==================== CHƯƠNG IX ====================
  {
    id: 'info-bai-26',
    baiCode: 'Bài 26',
    lessonNumber: 26,
    isReview: false,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Bài 26: Biến cố và định nghĩa cổ điển của xác suất',
    shortTitle: 'Biến cố & Xác suất cổ điển',
    filename: 'Bai26_Bien-co-va-dinh-nghia-co-dien-xac-suat.png',
    description: 'Phép thử ngẫu nhiên, không gian mẫu Ω, biến cố A, kết quả thuận lợi n(A), định nghĩa xác suất cổ điển P(A) = n(A) / n(Ω) khi các kết quả đồng khả năng; tính chất 0 ≤ P(A) ≤ 1, P(∅) = 0, P(Ω) = 1.',
    keyFormulas: [
      'Xác suất cổ điển: P(A) = n(A) / n(Ω)',
      'Không gian mẫu Ω (n(Ω) phần tử)',
      '0 ≤ P(A) ≤ 1; P(∅) = 0; P(Ω) = 1',
      'Điều kiện: các kết quả có cùng khả năng xuất hiện'
    ],
    highlights: ['Không gian mẫu Ω', 'Biến cố & số kết quả thuận lợi', 'Công thức P(A) = n(A)/n(Ω)'],
    themeColor: {
      gradient: 'from-purple-600 to-fuchsia-600',
      badgeBg: 'bg-purple-100 text-purple-800',
      badgeText: 'text-purple-700',
      border: 'border-purple-200',
      lightBg: 'bg-purple-50/50',
      accent: 'text-purple-600'
    }
  },
  {
    id: 'info-bai-27',
    baiCode: 'Bài 27',
    lessonNumber: 27,
    isReview: false,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Bài 27: Thực hành tính xác suất trong một số bài toán đơn giản',
    shortTitle: 'Thực hành tính xác suất',
    filename: 'Bai27_Thuc-hanh-tinh-xac-suat.png',
    description: 'Sử dụng công cụ tổ hợp (C_n^k, quy tắc nhân) để tính n(Ω) và n(A), quy tắc biến cố đối P(Ā) = 1 - P(A), bài toán rút thẻ, gieo xúc xắc, chọn ngẫu nhiên tổ công tác.',
    keyFormulas: [
      'Biến cố đối: P(Ā) = 1 - P(A)',
      'Tính n(Ω) bằng tổ hợp: n(Ω) = C_n^k',
      'Quy tắc đếm gián tiếp (phần bù)',
      'Ứng dụng gieo đồng xu & xúc xắc'
    ],
    highlights: ['Dùng tổ hợp C tính số khả năng', 'Quy tắc biến cố đối P(Ā) = 1 - P(A)', 'Bài toán thực tế thường gặp'],
    themeColor: {
      gradient: 'from-purple-600 to-fuchsia-600',
      badgeBg: 'bg-purple-100 text-purple-800',
      badgeText: 'text-purple-700',
      border: 'border-purple-200',
      lightBg: 'bg-purple-50/50',
      accent: 'text-purple-600'
    }
  },
  {
    id: 'info-bai-27z',
    baiCode: 'Ôn tập Chương IX',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Ôn tập Chương IX: Xác suất cổ điển',
    shortTitle: 'Tổng kết Xác suất cổ điển',
    filename: 'Bai27z_OnTap_ChuongIX_Xac-suat-co-dien.png',
    description: 'Cẩm nang sơ đồ tổng kết các bước giải bài toán xác suất lớp 10, phân loại bài toán xuôi - bài toán biến cố đối và các lỗi sai kinh điển cần tránh.',
    keyFormulas: [
      'Bước 1: Mô tả & đếm số phần tử n(Ω)',
      'Bước 2: Xác định biến cố A & đếm n(A)',
      'Bước 3: Lập tỉ số P(A) = n(A) / n(Ω)',
      'Mẹo phát hiện từ khóa "ít nhất một" ⇒ dùng P(Ā)'
    ],
    highlights: ['Quy trình giải 3 bước chuẩn', 'Chiến thuật dùng biến cố đối', 'Các bẫy xác suất kinh điển'],
    themeColor: {
      gradient: 'from-fuchsia-700 to-purple-700',
      badgeBg: 'bg-fuchsia-100 text-fuchsia-800',
      badgeText: 'text-fuchsia-700',
      border: 'border-fuchsia-200',
      lightBg: 'bg-fuchsia-50/50',
      accent: 'text-fuchsia-600'
    }
  }
];

// Helper to convert an InfographicLesson to a LearningItem
export function infographicToLearningItem(info: InfographicLesson, order: number): LearningItem {
  return {
    id: info.id,
    type: 'infographic',
    title: info.title,
    topic: `${info.chapterRoman}: ${info.chapterTitle}`,
    description: info.description,
    url: `/infographics/${info.filename}`,
    thumbnailUrl: `/infographics/${info.filename}`,
    displayOrder: order,
    isSample: true,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z'
  };
}

export const initial36InfographicItems: LearningItem[] = ALL_36_INFOGRAPHICS.map((info, idx) =>
  infographicToLearningItem(info, idx + 1)
);
