import { LearningItem } from '../types';

export interface SimulationItemMetadata extends LearningItem {
  chapterNumber: number;
  chapterRoman: string;
  chapterTitle: string;
  badge?: '3D Math Lab' | 'Trực Quan Oxy' | 'Tương Tác Số' | 'Hình Học Động';
  tags: string[];
}

export const CURRICULUM_SIMULATIONS: SimulationItemMetadata[] = [
  // ==========================================
  // CHƯƠNG I: MỆNH ĐỀ VÀ TẬP HỢP
  // ==========================================
  {
    id: 'sim-tap-hop-va-cac-phep-toan',
    type: 'simulation',
    title: 'Tập Hợp & Các Phép Toán Trên Tập Hợp',
    topic: 'Chương I: Mệnh đề và tập hợp',
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề & Tập hợp',
    description: 'Mô phỏng tương tác sinh động các phép toán tập hợp: Phép Giao (A ∩ B), Phép Hợp (A ∪ B), Phép Hiệu (A \\ B) và Phần bù qua biểu đồ Venn trực quan.',
    url: 'https://taphopvacacpheptoan-toan10.vercel.app',
    badge: 'Tương Tác Số',
    tags: ['Biểu đồ Venn', 'Giao & Hợp', 'Tập hợp con'],
    displayOrder: 1,
    isSample: true,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z'
  },
  {
    id: 'sim-tap-hop-tren-truc-so',
    type: 'simulation',
    title: 'Mô Phỏng Tập Hợp Trên Trục Số Thực',
    topic: 'Chương I: Mệnh đề và tập hợp',
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề & Tập hợp',
    description: 'Biểu diễn trực quan các tập hợp con của số thực ℝ trên trục số: khoảng (a; b), đoạn [a; b], nửa khoảng [a; b), và thực hành các phép toán giao, hợp, hiệu trên trục số.',
    url: 'https://mophongtaphoptrentrucso-toan10-hazel.vercel.app',
    badge: 'Trực Quan Oxy',
    tags: ['Trục số thực ℝ', 'Khoảng & Đoạn', 'Phép toán trục số'],
    displayOrder: 2,
    isSample: true,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z'
  },

  // ==========================================
  // CHƯƠNG II: BẤT PHƯƠNG TRÌNH & HỆ BPT BẬC NHẤT HAI ẨN
  // ==========================================
  {
    id: 'sim-bat-phuong-trinh-bac-nhat-hai-an',
    type: 'simulation',
    title: 'Miền Nghiệm Bất Phương Trình Bậc Nhất Hai Ẩn',
    topic: 'Chương II: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    description: 'Khám phá đường thẳng bờ d: ax + by = c, kéo thả điểm thử M(x₀, y₀) để xác định nửa mặt phẳng nghiệm của bất phương trình bậc nhất hai ẩn trên hệ trục Oxy.',
    url: 'https://batphuongtrinhbacnhathaian-toan10-p.vercel.app',
    badge: 'Trực Quan Oxy',
    tags: ['Đường thẳng bờ d', 'Nửa mặt phẳng', 'Điểm thử M'],
    displayOrder: 3,
    isSample: true,
    createdAt: '2026-09-02T08:00:00.000Z',
    updatedAt: '2026-09-02T08:00:00.000Z'
  },
  {
    id: 'sim-he-bat-phuong-trinh-bac-nhat-hai-an',
    type: 'simulation',
    title: 'Miền Nghiệm Hệ Bất Phương Trình Bậc Nhất Hai Ẩn',
    topic: 'Chương II: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    description: 'Xác định miền đa giác nghiệm của hệ bất phương trình bậc nhất hai ẩn bằng phép giao các nửa mặt phẳng; ứng dụng tìm giá trị lớn nhất / nhỏ nhất của biểu thức F(x, y).',
    url: 'https://hebatphuongtrinhbacnhathaian-toan10-delta.vercel.app/',
    badge: 'Trực Quan Oxy',
    tags: ['Miền đa giác', 'Hệ BPT', 'Quy hoạch tuyến tính'],
    displayOrder: 4,
    isSample: true,
    createdAt: '2026-09-02T08:00:00.000Z',
    updatedAt: '2026-09-02T08:00:00.000Z'
  },

  // ==========================================
  // CHƯƠNG III: HỆ THỨC LƯỢNG TRONG TAM GIÁC
  // ==========================================
  {
    id: 'sim-gia-tri-luong-giac-cua-mot-goc',
    type: 'simulation',
    title: 'Giá Trị Lượng Giác Của Một Góc (0° Đến 180°)',
    topic: 'Chương III: Hệ thức lượng trong tam giác',
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    description: 'Mô phỏng nửa đường tròn đơn vị: thay đổi góc α từ 0° đến 180°, quan sát trực tiếp tọa độ điểm M(cosα, sinα), trục tang, trục cotang và dấu của các giá trị lượng giác.',
    url: 'https://giatriluonggiaccuamotgoc-toan10-xgs.vercel.app/',
    badge: 'Hình Học Động',
    tags: ['Nửa đường tròn đơn vị', 'sin, cos, tan, cot', 'Góc nhọn & Góc tù'],
    displayOrder: 5,
    isSample: true,
    createdAt: '2026-09-03T08:00:00.000Z',
    updatedAt: '2026-09-03T08:00:00.000Z'
  },
  {
    id: 'sim-gia-tri-luong-giac-0-den-180',
    type: 'simulation',
    title: 'Khám Phá Mối Quan Hệ Lượng Giác Góc 0° Đến 180°',
    topic: 'Chương III: Hệ thức lượng trong tam giác',
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    description: 'Khám phá các tính chất và công thức lượng giác của hai góc bù nhau: sin(180° - α) = sinα, cos(180° - α) = -cosα, hai góc phụ nhau và các hằng đẳng thức lượng giác cơ bản.',
    url: 'https://giatriluonggiactu0den180-toan10-xi.vercel.app',
    badge: 'Tương Tác Số',
    tags: ['Góc bù nhau', 'Góc phụ nhau', 'Hằng đẳng thức'],
    displayOrder: 6,
    isSample: true,
    createdAt: '2026-09-03T08:00:00.000Z',
    updatedAt: '2026-09-03T08:00:00.000Z'
  },
  {
    id: 'sim-he-thuc-luong-tam-giac',
    type: 'simulation',
    title: 'Hệ Thức Lượng Trong Tam Giác: Định Lý Cosin & Sin',
    topic: 'Chương III: Hệ thức lượng trong tam giác',
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    description: 'Kéo thả các đỉnh tam giác ABC tùy ý để kiểm chứng hệ thức định lý Cosin a² = b² + c² - 2bc·cosA, định lý Sin a/sinA = b/sinB = c/sinC = 2R và bán kính đường tròn ngoại tiếp.',
    url: 'https://hethucluongtrongtamgiac-toan10.vercel.app/',
    badge: 'Hình Học Động',
    tags: ['Định lý Cosin', 'Định lý Sin', 'Đường tròn ngoại tiếp R'],
    displayOrder: 7,
    isSample: true,
    createdAt: '2026-09-03T08:00:00.000Z',
    updatedAt: '2026-09-03T08:00:00.000Z'
  },
  {
    id: 'sim-he-thuc-luong-giai-tam-giac-3d',
    type: 'simulation',
    title: 'Mô Phỏng Giải Tam Giác & Công Thức Diện Tích',
    topic: 'Chương III: Hệ thức lượng trong tam giác',
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    description: 'Thực hành giải tam giác: tính cạnh, góc, công thức diện tích Heron S = √(p(p-a)(p-b)(p-c)), S = 1/2ab·sinC = pr, bán kính đường tròn nội tiếp r và ứng dụng đo đạc thực tế.',
    url: 'https://hethucluongtrongtamgiac-toan10-three.vercel.app',
    badge: '3D Math Lab',
    tags: ['Công thức Heron', 'Giải tam giác', 'Ứng dụng thực tế'],
    displayOrder: 8,
    isSample: true,
    createdAt: '2026-09-03T08:00:00.000Z',
    updatedAt: '2026-09-03T08:00:00.000Z'
  },

  // ==========================================
  // CHƯƠNG IV: VECTƠ
  // ==========================================
  {
    id: 'sim-vector-explorer-3d',
    type: 'simulation',
    title: 'Vector Explorer 3D: Khái Niệm Mở Đầu Về Vectơ',
    topic: 'Chương IV: Vectơ',
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ trong hình học',
    description: 'Phòng thí nghiệm 3D Math Lab tương tác không gian: tìm hiểu điểm đầu, điểm cuối, độ dài vectơ, giá của vectơ, hai vectơ cùng phương, cùng hướng, ngược hướng và vectơ-không.',
    url: 'https://vector-explorer3-d-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['3D Không gian', 'Cùng phương & Cùng hướng', 'Độ dài vectơ'],
    displayOrder: 9,
    isSample: true,
    createdAt: '2026-09-04T08:00:00.000Z',
    updatedAt: '2026-09-04T08:00:00.000Z'
  },
  {
    id: 'sim-vector-operations-3d',
    type: 'simulation',
    title: 'Vector Operations 3D Labs: Tổng & Hiệu Của Hai Vectơ',
    topic: 'Chương IV: Vectơ',
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ trong hình học',
    description: 'Dựng trực quan vectơ tổng và hiệu trong không gian 3D: kiểm chứng Quy tắc ba điểm (AB + BC = AC), Quy tắc hình bình hành và Quy tắc trừ (OB - OA = AB).',
    url: 'https://vector-operations3-dlabs-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Quy tắc ba điểm', 'Quy tắc hình bình hành', 'Hiệu hai vectơ'],
    displayOrder: 10,
    isSample: true,
    createdAt: '2026-09-04T08:00:00.000Z',
    updatedAt: '2026-09-04T08:00:00.000Z'
  },
  {
    id: 'sim-vector-scalar-3d',
    type: 'simulation',
    title: 'Vector Scalar 3D Lab: Tích Của Vectơ Với Một Số Thực',
    topic: 'Chương IV: Vectơ',
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ trong hình học',
    description: 'Kéo thanh trượt số thực k để quan sát vectơ k·a: thay đổi độ dài, đảo chiều khi k < 0; kiểm chứng điều kiện hai vectơ cùng phương và tính chất trung điểm, trọng tâm.',
    url: 'https://vectorscalar3dlab-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Nhân vectơ với số k', 'Cùng phương', 'Trung điểm & Trọng tâm'],
    displayOrder: 11,
    isSample: true,
    createdAt: '2026-09-04T08:00:00.000Z',
    updatedAt: '2026-09-04T08:00:00.000Z'
  },
  {
    id: 'sim-tich-vo-huong-hai-vector',
    type: 'simulation',
    title: 'Tích Vô Hướng Của Hai Vectơ & Góc Giữa Hai Vectơ',
    topic: 'Chương IV: Vectơ',
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ trong hình học',
    description: 'Mô phỏng góc giữa hai vectơ từ 0° đến 180°, tính tích vô hướng a·b = |a||b|cos(a, b), kiểm chứng điều kiện vuông góc a ⊥ b ⇔ a·b = 0 và hình chiếu trực giao.',
    url: 'https://tichvohuongcuahaivector-toan10.vercel.app',
    badge: 'Trực Quan Oxy',
    tags: ['Tích vô hướng', 'Góc giữa hai vectơ', 'Vuông góc (a·b = 0)'],
    displayOrder: 12,
    isSample: true,
    createdAt: '2026-09-04T08:00:00.000Z',
    updatedAt: '2026-09-04T08:00:00.000Z'
  },

  // ==========================================
  // CHƯƠNG VI: HÀM SỐ, ĐỒ THỊ VÀ ỨNG DỤNG
  // ==========================================
  {
    id: 'sim-kham-pha-ham-so',
    type: 'simulation',
    title: 'Khám Phá Hàm Số: Tập Xác Định & Chiều Biến Thiên',
    topic: 'Chương VI: Hàm số, đồ thị và ứng dụng',
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    description: 'Khám phá trực quan khái niệm hàm số y = f(x), xác định tập xác định D, kiểm tra điểm thuộc đồ thị và xét tính chất hàm số đồng biến, nghịch biến trên các khoảng.',
    url: 'https://khamphahamso-toan10.vercel.app',
    badge: 'Trực Quan Oxy',
    tags: ['Tập xác định D', 'Đồng biến & Nghịch biến', 'Đồ thị hàm số'],
    displayOrder: 13,
    isSample: true,
    createdAt: '2026-09-05T08:00:00.000Z',
    updatedAt: '2026-09-05T08:00:00.000Z'
  },
  {
    id: 'sim-parabola-3d-math-lab',
    type: 'simulation',
    title: 'Parabola 3D Math Lab: Khảo Sát Hàm Số Bậc Hai',
    topic: 'Chương VI: Hàm số, đồ thị và ứng dụng',
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    description: 'Phòng thí nghiệm 3D khảo sát đồ thị Parabol y = ax² + bx + c: thay đổi thanh trượt hệ số a, b, c để quan sát tức thời tọa độ đỉnh I(-b/2a; -Δ/4a), trục đối xứng và bề lõm.',
    url: 'https://parabola3-d-math-lab-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Đồ thị Parabol', 'Đỉnh I & Trục đối xứng', 'Bảng biến thiên'],
    displayOrder: 14,
    isSample: true,
    createdAt: '2026-09-05T08:00:00.000Z',
    updatedAt: '2026-09-05T08:00:00.000Z'
  },

  // ==========================================
  // CHƯƠNG VII: PHƯƠNG PHÁP TOẠ ĐỘ TRONG MẶT PHẲNG
  // ==========================================
  {
    id: 'sim-line-equation-3d-lab',
    type: 'simulation',
    title: 'Line Equation 3D Lab: Phương Trình Đường Thẳng Oxy',
    topic: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp toạ độ trong mặt phẳng',
    description: 'Mô phỏng 3D phương trình đường thẳng: kéo điểm đi qua M(x₀, y₀), xoay vectơ chỉ phương u và vectơ pháp tuyến n để thiết lập phương trình tham số và phương trình tổng quát ax + by + c = 0.',
    url: 'https://lineequation3dlab.vercel.app',
    badge: '3D Math Lab',
    tags: ['PT tham số', 'PT tổng quát', 'VTPT & VTCP'],
    displayOrder: 15,
    isSample: true,
    createdAt: '2026-09-06T08:00:00.000Z',
    updatedAt: '2026-09-06T08:00:00.000Z'
  },
  {
    id: 'sim-twoline-3d-math-lab',
    type: 'simulation',
    title: 'Two Line 3D Math Lab: Vị Trí Tương Đối, Góc & Khoảng Cách',
    topic: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp toạ độ trong mặt phẳng',
    description: 'Khảo sát 4 vị trí tương đối giữa hai đường thẳng (cắt nhau, song song, trùng nhau, vuông góc); tính góc giữa hai đường thẳng và tính khoảng cách từ điểm M(x₀, y₀) đến đường thẳng.',
    url: 'https://twoline3dmathlab-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Vị trí tương đối', 'Góc giữa hai đường', 'Khoảng cách d(M, Δ)'],
    displayOrder: 16,
    isSample: true,
    createdAt: '2026-09-06T08:00:00.000Z',
    updatedAt: '2026-09-06T08:00:00.000Z'
  },
  {
    id: 'sim-circle-geometry-3d-lab',
    type: 'simulation',
    title: 'Circle Geometry 3D Lab: Đường Tròn Trong Mặt Phẳng Toạ Độ',
    topic: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp toạ độ trong mặt phẳng',
    description: 'Phòng thí nghiệm đường tròn Oxy: thay đổi tâm I(a; b) và bán kính R, phân tích phương trình chính tắc (x - a)² + (y - b)² = R² và phương trình tiếp tuyến của đường tròn.',
    url: 'https://circlegeomestry3dlab-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Tâm I & Bán kính R', 'Phương trình chính tắc', 'Tiếp tuyến đường tròn'],
    displayOrder: 17,
    isSample: true,
    createdAt: '2026-09-06T08:00:00.000Z',
    updatedAt: '2026-09-06T08:00:00.000Z'
  },
  {
    id: 'sim-conic-explorer-3d-lab',
    type: 'simulation',
    title: 'Conic Explorer 3D Lab: Khám Phá Ba Đường Conic',
    topic: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp toạ độ trong mặt phẳng',
    description: 'Khám phá không gian 3D tương tác ba đường Conic: Elip (x²/a² + y²/b² = 1), Hypebol (x²/a² - y²/b² = 1) và Parabol (y² = 2px); quan sát tiêu điểm F₁, F₂, tiêu cự và các quỹ đạo thiên thể thực tế.',
    url: 'https://conicexplorer3dlab-toan10.vercel.app',
    badge: '3D Math Lab',
    tags: ['Đường Elip', 'Đường Hypebol', 'Đường Parabol', 'Tiêu điểm F₁, F₂'],
    displayOrder: 18,
    isSample: true,
    createdAt: '2026-09-06T08:00:00.000Z',
    updatedAt: '2026-09-06T08:00:00.000Z'
  }
];

export const CHAPTER_SIMULATION_GROUPS = [
  {
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    title: 'Mệnh Đề Và Tập Hợp',
    description: 'Nền tảng logic toán học, các phép toán giao, hợp, hiệu và biểu diễn tập hợp số thực trên trục số.',
    count: 2,
    badgeColor: 'border-blue-200 bg-blue-50/70 text-blue-700'
  },
  {
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    title: 'Bất Phương Trình & Hệ BPT Bậc Nhất Hai Ẩn',
    description: 'Biểu diễn miền nghiệm trên mặt phẳng tọa độ Oxy và bài toán quy hoạch tuyến tính tối ưu thực tế.',
    count: 2,
    badgeColor: 'border-emerald-200 bg-emerald-50/70 text-emerald-700'
  },
  {
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    title: 'Hệ Thức Lượng Trong Tam Giác',
    description: 'Nửa đường tròn đơn vị, giá trị lượng giác từ 0° đến 180°, định lý Cosin, định lý Sin và giải tam giác.',
    count: 4,
    badgeColor: 'border-amber-200 bg-amber-50/70 text-amber-700'
  },
  {
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    title: 'Vectơ Trong Mặt Phẳng & Không Gian 3D',
    description: 'Các quy tắc cộng, trừ vectơ, nhân vectơ với số thực và tích vô hướng trong các phòng thí nghiệm 3D.',
    count: 4,
    badgeColor: 'border-purple-200 bg-purple-50/70 text-purple-700'
  },
  {
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    title: 'Hàm Số, Đồ Thị Và Ứng Dụng',
    description: 'Khảo sát hàm số, tập xác định, tính đơn điệu và phòng thí nghiệm 3D đồ thị Parabol bậc hai.',
    count: 2,
    badgeColor: 'border-rose-200 bg-rose-50/70 text-rose-700'
  },
  {
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    title: 'Phương Pháp Toạ Độ Trong Mặt Phẳng',
    description: 'Phương trình đường thẳng, đường tròn Oxy, vị trí tương đối và phòng thí nghiệm 3D ba đường Conic.',
    count: 4,
    badgeColor: 'border-cyan-200 bg-cyan-50/70 text-cyan-700'
  }
];
