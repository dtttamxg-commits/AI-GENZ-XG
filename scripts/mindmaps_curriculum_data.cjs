// Complete curriculum data for all 36 lessons of Toán 10 (GDPT 2018)
// 27 Standard Lessons + 9 Chapter Reviews across 9 Chapters

const MINDMAPS_DATA = [
  // ==================== CHƯƠNG I: MỆNH ĐỀ VÀ TẬP HỢP ====================
  {
    id: 'mindmap-bai-01',
    baiCode: 'Bài 1',
    lessonNumber: 1,
    isReview: false,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Bài 1: Mệnh đề toán học',
    shortTitle: 'Mệnh đề toán học',
    filenameBase: 'Bai01_Menh-de',
    centerTitle: 'MỆNH ĐỀ TOÁN HỌC',
    description: 'Khái niệm mệnh đề logic, mệnh đề chứa biến, mệnh đề phủ định, mệnh đề kéo theo, mệnh đề đảo, mệnh đề tương đương và ký hiệu với mọi (∀), tồn tại (∃).',
    branches: [
      {
        title: '1. Khái Niệm Mệnh Đề',
        badge: 'Cơ bản',
        points: [
          'Mệnh đề logic: Khẳng định có tính đúng hoặc sai, không thể vừa đúng vừa sai.',
          'Mệnh đề chứa biến P(x): Khẳng định đúng/sai tùy thuộc vào giá trị của x ∈ X.',
          'Ví dụ: "Số 17 là số nguyên tố" (Đúng); "x + 2 > 5" (Mệnh đề chứa biến).'
        ]
      },
      {
        title: '2. Mệnh Đề Phủ Định (P̄)',
        badge: 'Phủ định',
        points: [
          'Định nghĩa: P̄ đúng khi P sai; P̄ sai khi P đúng.',
          'Ký hiệu: P̄ (đọc là phủ định của mệnh đề P).',
          'Quy tắc: Phủ định của "là" là "không là", "bằng" là "khác", "mọi" là "tồn tại".'
        ]
      },
      {
        title: '3. Mệnh Đề Kéo Theo & Đảo',
        badge: 'Logic suy luận',
        points: [
          'Mệnh đề kéo theo P ⇒ Q: "Nếu P thì Q". Chỉ sai khi P đúng mà Q sai.',
          'Định lý: P là điều kiện đủ để có Q; Q là điều kiện cần để có P.',
          'Mệnh đề đảo: Mệnh đề đảo của P ⇒ Q là Q ⇒ P (không nhất thiết cùng chân trị).'
        ]
      },
      {
        title: '4. Ký Hiệu Với Mọi (∀) & Tồn Tại (∃)',
        badge: 'Lượng từ',
        points: [
          '"∀x ∈ X, P(x)" đúng khi P(x) đúng với TẤT CẢ các phần tử x trong X.',
          '"∃x ∈ X, P(x)" đúng khi có ÍT NHẤT một phần tử x₀ ∈ X sao cho P(x₀) đúng.',
          'Quy tắc phủ định: Phủ định của "∀x, P(x)" là "∃x, P̄(x)"; phủ định của "∃x, P(x)" là "∀x, P̄(x)".'
        ]
      },
      {
        title: '5. Mệnh Đề Tương Đương & Lưu Ý',
        badge: 'Tổng kết',
        points: [
          'Mệnh đề tương đương P ⇔ Q: Đúng khi cả P và Q cùng đúng hoặc cùng sai.',
          'Thuật ngữ: "P khi và chỉ khi Q", "P là điều kiện cần và đủ để có Q".',
          'Lưu ý: Câu hỏi, câu cảm thán, câu cầu khiến KHÔNG phải là mệnh đề logic.'
        ]
      }
    ],
    highlights: [
      'P ⇒ Q chỉ sai khi P đúng & Q sai',
      'Phủ định của ∀x, P(x) là ∃x, P̄(x)',
      'Điều kiện cần và đủ trong mệnh đề tương đương'
    ]
  },
  {
    id: 'mindmap-bai-02',
    baiCode: 'Bài 2',
    lessonNumber: 2,
    isReview: false,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Bài 2: Tập hợp và các phép toán trên tập hợp',
    shortTitle: 'Tập hợp và phép toán',
    filenameBase: 'Bai02_Tap-hop-va-cac-phep-toan',
    centerTitle: 'TẬP HỢP & PHÉP TOÁN',
    description: 'Khái niệm tập con, tập hợp bằng nhau, các tập hợp số N ⊂ Z ⊂ Q ⊂ R, các phép toán giao, hợp, hiệu, phần bù và các khoảng đoạn trên trục số R.',
    branches: [
      {
        title: '1. Khái Niệm Tập Hợp & Tập Con',
        badge: 'Tập hợp',
        points: [
          'Phần tử: x ∈ A (thuộc) hoặc x ∉ A (không thuộc). Tập rỗng: ∅.',
          'Tập con: A ⊂ B ⇔ (∀x, x ∈ A ⇒ x ∈ B). Mọi tập hợp đều có ∅ ⊂ A và A ⊂ A.',
          'Tập hợp bằng nhau: A = B ⇔ (A ⊂ B và B ⊂ A).'
        ]
      },
      {
        title: '2. Các Tập Hợp Số Chuẩn',
        badge: 'Tập số',
        points: [
          'Số tự nhiên N = {0, 1, 2, ...}; N* = {1, 2, 3, ...}.',
          'Số nguyên Z = {..., -2, -1, 0, 1, 2, ...}.',
          'Số hữu tỉ Q = {a/b | a, b ∈ Z, b ≠ 0}; Số vô tỉ I.',
          'Quan hệ bao hàm: N ⊂ Z ⊂ Q ⊂ R.'
        ]
      },
      {
        title: '3. Phép Toán Giao & Hợp',
        badge: 'Giao & Hợp',
        points: [
          'Phép giao (A ∩ B): Tập hợp các phần tử thuộc CẢ A và B. x ∈ A ∩ B ⇔ (x ∈ A và x ∈ B).',
          'Phép hợp (A ∪ B): Tập hợp các phần tử thuộc A HOẶC thuộc B. x ∈ A ∪ B ⇔ (x ∈ A hoặc x ∈ B).',
          'Công thức số phần tử: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).'
        ]
      },
      {
        title: '4. Phép Toán Hiệu & Phần Bù',
        badge: 'Hiệu & Bù',
        points: [
          'Hiệu (A \\ B): Phần tử thuộc A nhưng KHÔNG thuộc B. x ∈ A \\ B ⇔ (x ∈ A và x ∉ B).',
          'Phần bù C_B(A): Khi A ⊂ B, phần bù của A trong B là B \\ A.',
          'Phần bù trên R: C_R(A) = R \\ A.'
        ]
      },
      {
        title: '5. Các Tập Con Của Số Thực R',
        badge: 'Khoảng & Đoạn',
        points: [
          'Khoảng (a; b) = {x ∈ R | a < x < b}; Đoạn [a; b] = {x ∈ R | a ≤ x ≤ b}.',
          'Nửa khoảng [a; b) = {x ∈ R | a ≤ x < b}; (a; b] = {x ∈ R | a < x ≤ b}.',
          'Vô cực: (-∞; a), [a; +∞), (-∞; +∞) = R. Kỹ năng biểu diễn & gạch bỏ trên trục số.'
        ]
      }
    ],
    highlights: [
      'Giao ∩ (lấy phần chung) · Hợp ∪ (lấy tất cả)',
      'Hiệu A \\ B (thuộc A, bỏ B)',
      'Quy tắc biểu diễn khoảng đoạn trên trục số thực R'
    ]
  },
  {
    id: 'mindmap-bai-02z',
    baiCode: 'Ôn tập Chương I',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 1,
    chapterRoman: 'Chương I',
    chapterTitle: 'Mệnh đề và tập hợp',
    title: 'Ôn tập Chương I: Mệnh đề & Tập hợp',
    shortTitle: 'Tổng kết Chương I',
    filenameBase: 'Bai02z_OnTap_ChuongI_Menh-de-tap-hop',
    centerTitle: 'TỔNG ÔN CHƯƠNG I',
    description: 'Hệ thống hóa toàn bộ kiến thức logic mệnh đề, bảng chân trị, các phép toán tập hợp và kỹ năng giải toán trên trục số thực.',
    branches: [
      {
        title: '1. Bản Đồ Logic Mệnh Đề',
        badge: 'Logic',
        points: [
          'Chân trị mệnh đề: Đúng (Đ) hoặc Sai (S). Mệnh đề phủ định P̄ ngược chân trị.',
          'Mệnh đề kéo theo P ⇒ Q (Sai duy nhất khi Đ ⇒ S).',
          'Mệnh đề tương đương P ⇔ Q (Đúng khi cùng chân trị Đ-Đ hoặc S-S).'
        ]
      },
      {
        title: '2. Phủ Định Mệnh Đề Chứa Biến',
        badge: 'Kỹ năng',
        points: [
          'Đổi ∀ thành ∃ và phủ định tính chất: P̄: "∃x ∈ X, P̄(x)".',
          'Đổi ∃ thành ∀ và phủ định tính chất: P̄: "∀x ∈ X, P̄(x)".',
          'Ví dụ: "Mọi số nguyên tố đều lẻ" ➔ Phủ định: "Tồn tại số nguyên tố chẵn" (Đúng: số 2).'
        ]
      },
      {
        title: '3. Hệ Thống Phép Toán Tập Hợp',
        badge: 'Tập hợp',
        points: [
          'A ∩ B (Giao) ➔ Phần tử chung của hai tập.',
          'A ∪ B (Hợp) ➔ Ghép toàn bộ phần tử của cả hai tập.',
          'A \\ B (Hiệu) ➔ Giữ lại phần thuộc A, xóa bỏ phần thuộc B.',
          'C_E(A) (Phần bù) ➔ E \\ A khi A ⊂ E.'
        ]
      },
      {
        title: '4. Kỹ Thuật Trục Số & Biểu Diễn Khoảng',
        badge: 'Trục số',
        points: [
          'Bước 1: Sắp xếp các mút từ nhỏ đến lớn trên trục số.',
          'Bước 2: Dùng ngoặc tròn () cho mút mở, ngoặc vuông [] cho mút đóng.',
          'Bước 3: Giao ∩ (lấy phần cùng không bị gạch); Hợp ∪ (lấy phần thuộc ít nhất một tập).'
        ]
      },
      {
        title: '5. Các Dạng Bài Tập Thường Gặp',
        badge: 'Đề thi',
        points: [
          'Dạng 1: Xét tính đúng sai của mệnh đề và tìm mệnh đề phủ định.',
          'Dạng 2: Tìm giao, hợp, hiệu của các tập hợp hữu hạn và khoảng số thực.',
          'Dạng 3: Bài toán tìm tham số m để A ∩ B = ∅ hoặc A ⊂ B.'
        ]
      }
    ],
    highlights: [
      'Bảng chân trị mệnh đề kéo theo & tương đương',
      'Kỹ năng đổi lượng từ ∀ ↔ ∃ khi phủ định',
      'Chiến thuật tìm tham số m trên trục số thực'
    ]
  },

  // ==================== CHƯƠNG II: BẤT PHƯƠNG TRÌNH & HỆ BPT BẬC NHẤT HAI ẨN ====================
  {
    id: 'mindmap-bai-03',
    baiCode: 'Bài 3',
    lessonNumber: 3,
    isReview: false,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Bài 3: Bất phương trình bậc nhất hai ẩn',
    shortTitle: 'BPT bậc nhất hai ẩn',
    filenameBase: 'Bai03_BPT-bac-nhat-hai-an',
    centerTitle: 'BPT BẬC NHẤT HAI ẨN',
    description: 'Dạng tổng quát ax + by ≤ c, xác định nghiệm (x₀; y₀), cách vẽ đường thẳng bờ và biểu diễn miền nghiệm nửa mặt phẳng.',
    branches: [
      {
        title: '1. Dạng Tổng Quát & Khái Niệm',
        badge: 'Định nghĩa',
        points: [
          'Dạng chuẩn: ax + by < c; ax + by ≤ c; ax + by > c; ax + by ≥ c (với a² + b² ≠ 0).',
          'Nghiệm: Cặp số (x₀; y₀) là nghiệm nếu khi thay vào BPT ta được khẳng định đúng.',
          'Số nghiệm: BPT bậc nhất hai ẩn luôn có vô số nghiệm.'
        ]
      },
      {
        title: '2. Đường Thẳng Bờ',
        badge: 'Hình học',
        points: [
          'Đường thẳng bờ d: ax + by = c chia mặt phẳng Oxy thành hai nửa mặt phẳng đối nhau.',
          'Nếu BPT chứa dấu ≤ hoặc ≥: Miền nghiệm chứa cả đường thẳng bờ (nét liền).',
          'Nếu BPT chứa dấu < hoặc >: Miền nghiệm không chứa đường thẳng bờ (nét đứt).'
        ]
      },
      {
        title: '3. Phương Pháp Xác Định Miền Nghiệm',
        badge: 'Quy trình',
        points: [
          'Bước 1: Vẽ đường thẳng d: ax + by = c (tìm 2 điểm cắt trục Ox, Oy).',
          'Bước 2: Lấy điểm thử M(x₀; y₀) không thuộc d (thường chọn gốc O(0; 0) nếu c ≠ 0).',
          'Bước 3: Tính ax₀ + by₀ so sánh với c.',
          'Bước 4: Kết luận miền nghiệm chứa M nếu đúng, không chứa M nếu sai.'
        ]
      },
      {
        title: '4. Các Lưu Ý Khi Làm Bài',
        badge: 'Kỹ năng',
        points: [
          'Khi c = 0 (đường thẳng qua O): Chọn điểm thử M(1; 0) hoặc M(0; 1).',
          'Đọc kỹ đề bài: Gạch bỏ phần không là nghiệm hay gạch bỏ miền nghiệm.',
          'Nhớ quy ước nét liền (chứa bờ) và nét đứt (không chứa bờ).'
        ]
      }
    ],
    highlights: [
      'Dạng ax + by ≤ c (a² + b² ≠ 0)',
      'Đường thẳng bờ d chia Oxy thành 2 nửa mặt phẳng',
      'Phương pháp điểm thử O(0; 0) nhanh và chính xác'
    ]
  },
  {
    id: 'mindmap-bai-04',
    baiCode: 'Bài 4',
    lessonNumber: 4,
    isReview: false,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Bài 4: Hệ bất phương trình bậc nhất hai ẩn',
    shortTitle: 'Hệ BPT bậc nhất hai ẩn',
    filenameBase: 'Bai04_He-BPT-bac-nhat-hai-an',
    centerTitle: 'HỆ BPT BẬC NHẤT HAI ẨN',
    description: 'Hệ BPT bậc nhất hai ẩn, miền nghiệm là giao các nửa mặt phẳng, xác định miền đa giác và bài toán tìm cực trị F(x, y) = ax + by.',
    branches: [
      {
        title: '1. Khái Niệm Hệ BPT Hai Ẩn',
        badge: 'Định nghĩa',
        points: [
          'Hệ gồm từ hai BPT bậc nhất hai ẩn trở lên.',
          'Nghiệm: Cặp (x₀; y₀) là nghiệm của hệ nếu nó đồng thời thỏa mãn TẤT CẢ các BPT trong hệ.',
          'Miền nghiệm: Giao của các miền nghiệm của từng BPT thành phần.'
        ]
      },
      {
        title: '2. Cách Biểu Diễn Miền Nghiệm',
        badge: 'Quy trình',
        points: [
          'Bước 1: Trên cùng hệ trục Oxy, vẽ các đường thẳng bờ của từng BPT.',
          'Bước 2: Dùng điểm thử xác định và gạch bỏ miền không phải là nghiệm của từng BPT.',
          'Bước 3: Phần mặt phẳng không bị gạch (kể cả bờ thích hợp) chính là miền nghiệm của hệ.'
        ]
      },
      {
        title: '3. Miền Đa Giác & Điểm Đỉnh',
        badge: 'Hình học',
        points: [
          'Miền nghiệm thường là miền đa giác lồi (tam giác, tứ giác) hoặc miền không bị chặn.',
          'Tọa độ các đỉnh A, B, C... được xác định bằng cách giải hệ phương trình hai đường thẳng cắt nhau.',
          'Kiểm tra tính thuộc miền nghiệm của các cạnh và đỉnh đa giác.'
        ]
      },
      {
        title: '4. Bài Toán Tìm Giá Trị Lớn Nhất / Nhỏ Nhất',
        badge: 'Tối ưu hóa',
        points: [
          'Hàm mục tiêu: F(x, y) = ax + by trên miền đa giác lồi A₁A₂...An.',
          'Định lý cực trị: F(x, y) đạt giá trị lớn nhất (max) và nhỏ nhất (min) tại một trong các ĐỈNH của đa giác.',
          'Quy tắc giải: Tính F tại tất cả các đỉnh rồi so sánh để kết luận max, min.'
        ]
      },
      {
        title: '5. Ứng Dụng Thực Tiễn Sản Xuất',
        badge: 'Thực tế',
        points: [
          'Lập mô hình toán học: Gọi x, y là số sản phẩm/nguyên liệu cần tìm (x ≥ 0, y ≥ 0).',
          'Lập hệ ràng buộc dựa trên định mức thời gian, nhân công, vốn đầu tư.',
          'Lập hàm lợi nhuận F(x, y) và giải tối ưu để đạt lợi nhuận tối đa.'
        ]
      }
    ],
    highlights: [
      'Miền nghiệm là phần giao của các nửa mặt phẳng',
      'Định lý: Cực trị F(x, y) luôn đạt tại một trong các đỉnh đa giác',
      'Mô hình hóa bài toán kinh tế thực tế'
    ]
  },
  {
    id: 'mindmap-bai-04z',
    baiCode: 'Ôn tập Chương II',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 2,
    chapterRoman: 'Chương II',
    chapterTitle: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    title: 'Ôn tập Chương II: BPT & Hệ BPT bậc nhất hai ẩn',
    shortTitle: 'Tổng kết Chương II',
    filenameBase: 'Bai04z_OnTap_ChuongII_BPT-he-BPT-bac-nhat-hai-an',
    centerTitle: 'TỔNG ÔN CHƯƠNG II',
    description: 'Tổng kết phương pháp giải BPT, hệ BPT bậc nhất hai ẩn và chiến thuật giải bài toán quy hoạch tuyến tính đạt điểm tối đa.',
    branches: [
      {
        title: '1. Sơ Đồ Quy Trình Vẽ Miền Nghiệm',
        badge: 'Quy trình',
        points: [
          'Vẽ bờ ➔ Lấy điểm thử O(0; 0) ➔ Gạch miền không thỏa ➔ Xác định miền nghiệm chung.',
          'Chú ý quy ước: nét đứt cho dấu (<, >), nét liền cho dấu (≤, ≥).',
          'Miền nghiệm rỗng nếu các nửa mặt phẳng không có điểm chung.'
        ]
      },
      {
        title: '2. Kỹ Thuật Xác Định Tọa Độ Đỉnh',
        badge: 'Đại số',
        points: [
          'Giao điểm của d₁: a₁x + b₁y = c₁ và d₂: a₂x + b₂y = c₂.',
          'Sử dụng máy tính Casio giải hệ phương trình bậc nhất 2 ẩn để tìm tọa độ đỉnh nhanh chóng.',
          'Kiểm tra lại xem đỉnh có thuộc miền nghiệm của các BPT còn lại hay không.'
        ]
      },
      {
        title: '3. Phương Pháp Đỉnh Tối Ưu F(x, y)',
        badge: 'Cực trị',
        points: [
          'Lập bảng giá trị F(A), F(B), F(C), F(D)...',
          'Giá trị lớn nhất: max {F(A), F(B), F(C), ...}.',
          'Giá trị nhỏ nhất: min {F(A), F(B), F(C), ...}.',
          'Nếu miền nghiệm không bị chặn: kiểm tra thêm hướng tăng giảm của F.'
        ]
      },
      {
        title: '4. Các Bẫy & Lỗi Thường Gặp',
        badge: 'Lưu ý',
        points: [
          'Quên điều kiện không âm: x ≥ 0, y ≥ 0 trong bài toán thực tế.',
          'Nhầm lẫn giữa miền gạch bỏ và miền nghiệm.',
          'Tính sai tọa độ đỉnh do nhầm dấu hệ phương trình.'
        ]
      }
    ],
    highlights: [
      'Quy trình 3 bước chuẩn vẽ miền nghiệm',
      'Định lý đỉnh cho hàm mục tiêu F(x, y) = ax + by',
      'Bí quyết mô hình hóa bài toán thực tế'
    ]
  },

  // ==================== CHƯƠNG III: HỆ THỨC LƯỢNG TRONG TAM GIÁC ====================
  {
    id: 'mindmap-bai-05',
    baiCode: 'Bài 5',
    lessonNumber: 5,
    isReview: false,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Bài 5: Giá trị lượng giác của một góc từ 0° đến 180°',
    shortTitle: 'Giá trị lượng giác 0°-180°',
    filenameBase: 'Bai05_GTLG-goc-0-180',
    centerTitle: 'GTLG TỪ 0° ĐẾN 180°',
    description: 'Nửa đường tròn đơn vị, định nghĩa sin, cos, tan, cot, dấu của GTLG trong góc nhọn/tù, hai góc bù nhau và phụ nhau.',
    branches: [
      {
        title: '1. Nửa Đường Tròn Đơn Vị',
        badge: 'Định nghĩa',
        points: [
          'Nửa đường tròn tâm O bán kính R = 1 nằm phía trên trục hoành (y ≥ 0).',
          'Điểm M(x₀; y₀) trên nửa đường tròn sao cho góc xOM = α (0° ≤ α ≤ 180°).',
          'Tọa độ: sinα = y₀; cosα = x₀; tanα = y₀/x₀ (x₀ ≠ 0); cotα = x₀/y₀ (y₀ ≠ 0).'
        ]
      },
      {
        title: '2. Dấu Của Các Giá Trị Lượng Giác',
        badge: 'Quy tắc dấu',
        points: [
          'Góc nhọn (0° < α < 90°): sinα > 0, cosα > 0, tanα > 0, cotα > 0.',
          'Góc vuông (α = 90°): sin90° = 1, cos90° = 0, tan90° không xác định, cot90° = 0.',
          'Góc tù (90° < α < 180°): sinα > 0, cosα < 0, tanα < 0, cotα < 0.',
          'Ghi nhớ: sin luôn DƯƠNG trên cả khoảng (0°; 180°).'
        ]
      },
      {
        title: '3. Quan Hệ Giữa Hai Góc Bù Nhau',
        badge: 'Góc bù nhau',
        points: [
          'sin(180° - α) = sinα (sin bằng nhau).',
          'cos(180° - α) = -cosα (cos đối dấu).',
          'tan(180° - α) = -tanα; cot(180° - α) = -cotα.',
          'Ví dụ: sin150° = sin30° = 1/2; cos120° = -cos60° = -1/2.'
        ]
      },
      {
        title: '4. Quan Hệ Giữa Hai Góc Phụ Nhau',
        badge: 'Góc phụ nhau',
        points: [
          'Hai góc phụ nhau: α + β = 90°.',
          'sin(90° - α) = cosα; cos(90° - α) = sinα.',
          'tan(90° - α) = cotα; cot(90° - α) = tanα.'
        ]
      },
      {
        title: '5. Các Hằng Đẳng Thức Lượng Giác Cơ Bản',
        badge: 'Công thức',
        points: [
          'sin²α + cos²α = 1 (với mọi 0° ≤ α ≤ 180°).',
          '1 + tan²α = 1/cos²α (α ≠ 90°).',
          '1 + cot²α = 1/sin²α (0° < α < 180°).',
          'tanα · cotα = 1.'
        ]
      }
    ],
    highlights: [
      'sin²α + cos²α = 1 với mọi góc α',
      'sin(180° - α) = sinα; cos(180° - α) = -cosα',
      'sin luôn dương trong tam giác (0° < α < 180°)'
    ]
  },
  {
    id: 'mindmap-bai-06',
    baiCode: 'Bài 6',
    lessonNumber: 6,
    isReview: false,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Bài 6: Hệ thức lượng trong tam giác',
    shortTitle: 'Hệ thức lượng tam giác',
    filenameBase: 'Bai06_He-thuc-luong-trong-tam-giac',
    centerTitle: 'HỆ THỨC LƯỢNG TAM GIÁC',
    description: 'Định lý côsin, định lý sin, công thức trung tuyến và 5 công thức tính diện tích tam giác.',
    branches: [
      {
        title: '1. Định Lý Côsin',
        badge: 'ĐL Côsin',
        points: [
          'a² = b² + c² - 2bc · cosA; b² = a² + c² - 2ac · cosB; c² = a² + b² - 2ab · cosC.',
          'Hệ quả tính góc: cosA = (b² + c² - a²) / (2bc).',
          'Ứng dụng: Biết 2 cạnh và góc xen giữa (SAS) hoặc biết cả 3 cạnh (SSS).'
        ]
      },
      {
        title: '2. Định Lý Sin',
        badge: 'ĐL Sin',
        points: [
          'a/sinA = b/sinB = c/sinC = 2R (với R là bán kính đường tròn ngoại tiếp).',
          'Hệ quả: a = 2R · sinA; b = 2R · sinB; c = 2R · sinC.',
          'Ứng dụng: Biết 1 cạnh và 2 góc (ASA) hoặc biết 2 cạnh và 1 góc đối (SSA).'
        ]
      },
      {
        title: '3. Công Thức Đường Trung Tuyến',
        badge: 'Trung tuyến',
        points: [
          'm_a² = (2b² + 2c² - a²) / 4 (độ dài trung tuyến kẻ từ A).',
          'm_b² = (2a² + 2c² - b²) / 4; m_c² = (2a² + 2b² - c²) / 4.',
          'Hệ quả: m_a² + m_b² + m_c² = 3/4 · (a² + b² + c²).'
        ]
      },
      {
        title: '4. 5 Công Thức Tính Diện Tích Tam Giác (S)',
        badge: 'Diện tích S',
        points: [
          '1) S = 1/2 · a · h_a = 1/2 · b · h_b = 1/2 · c · h_c.',
          '2) S = 1/2 · ab · sinC = 1/2 · bc · sinA = 1/2 · ca · sinB.',
          '3) S = abc / (4R) (R là bán kính ngoại tiếp).',
          '4) S = p · r (p = (a+b+c)/2 là nửa chu vi, r là bán kính nội tiếp).',
          '5) Heron: S = √[p(p - a)(p - b)(p - c)].'
        ]
      },
      {
        title: '5. Giải Tam Giác & Đo Đạc Thực Tế',
        badge: 'Thực tiễn',
        points: [
          'Giải tam giác: Tìm các cạnh và góc còn lại khi biết một số yếu tố ban đầu.',
          'Bài toán đo chiều cao cây/tháp khi không thể tới gốc.',
          'Bài toán đo khoảng cách giữa hai điểm bị ngăn cách bởi hồ nước hoặc chướng ngại vật.'
        ]
      }
    ],
    highlights: [
      'ĐL Côsin: a² = b² + c² - 2bc · cosA',
      'ĐL Sin: a/sinA = b/sinB = c/sinC = 2R',
      '5 công thức diện tích: 1/2·ah, 1/2·ab·sinC, abc/(4R), pr, Heron'
    ]
  },
  {
    id: 'mindmap-bai-06z',
    baiCode: 'Ôn tập Chương III',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 3,
    chapterRoman: 'Chương III',
    chapterTitle: 'Hệ thức lượng trong tam giác',
    title: 'Ôn tập Chương III: Hệ thức lượng trong tam giác',
    shortTitle: 'Tổng kết Chương III',
    filenameBase: 'Bai06z_OnTap_ChuongIII_He-thuc-luong',
    centerTitle: 'TỔNG ÔN CHƯƠNG III',
    description: 'Bản đồ chọn công thức giải tam giác, quan hệ giữa bán kính R, r và nửa chu vi, bảng tra cứu công thức bỏ túi.',
    branches: [
      {
        title: '1. Cẩm Nang Chọn Định Lý Giải Tam Giác',
        badge: 'Chiến thuật',
        points: [
          'Biết 3 cạnh (SSS) ➔ Dùng ĐL Côsin tính các góc, Heron tính diện tích.',
          'Biết 2 cạnh & góc kẹp giữa (SAS) ➔ Dùng ĐL Côsin tính cạnh thứ ba.',
          'Biết 1 cạnh & 2 góc (AAS/ASA) ➔ Tính góc thứ 3, dùng ĐL Sin tính các cạnh còn lại.',
          'Biết 2 cạnh & 1 góc đối (SSA) ➔ Dùng ĐL Sin (chú ý xét 1 hoặc 2 nghiệm).'
        ]
      },
      {
        title: '2. Mối Quan Hệ Bán Kính R & r',
        badge: 'Bán kính',
        points: [
          'R = abc / (4S) = a / (2sinA).',
          'r = S / p = √[(p - a)(p - b)(p - c) / p].',
          'Tam giác vuông tại A: R = a/2; r = (b + c - a)/2.'
        ]
      },
      {
        title: '3. Nhận Dạng Tam Giác Đặc Biệt',
        badge: 'Hình học',
        points: [
          'Tam giác vuông: a² = b² + c² hoặc sin²A = sin²B + sin²C.',
          'Tam giác cân: b = c hoặc sinB = sinC.',
          'Tam giác đều: a = b = c hoặc cosA + cosB + cosC = 3/2.'
        ]
      },
      {
        title: '4. Ứng Dụng Đo Đạc Thực Tế',
        badge: 'Ứng dụng',
        points: [
          'Đo chiều cao tòa nhà / ngọn núi: Dùng giác kế đo 2 góc nâng từ hai vị trí cách nhau d.',
          'Đo khoảng cách giữa hai hòn đảo: Thiết lập tam giác với 2 điểm đo trên bờ.',
          'Quy tắc làm tròn kết quả đo theo yêu cầu của đề bài.'
        ]
      }
    ],
    highlights: [
      'Sơ đồ phân loại 4 trường hợp giải tam giác',
      'Mối liên hệ giữa R, r và diện tích S',
      'Kỹ thuật đo đạc gián tiếp ngoài thực địa'
    ]
  }
];

module.exports = {
  MINDMAPS_DATA
};
