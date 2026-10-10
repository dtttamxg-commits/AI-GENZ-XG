// Chapters VI to IX (Lessons 15 to 27z)

const MINDMAPS_DATA_PART3 = [
  // ==================== CHƯƠNG VI: HÀM SỐ, ĐỒ THỊ VÀ ỨNG DỤNG ====================
  {
    id: 'mindmap-bai-15',
    baiCode: 'Bài 15',
    lessonNumber: 15,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 15: Hàm số và đồ thị',
    shortTitle: 'Hàm số và đồ thị',
    filenameBase: 'Bai15_Ham-so',
    centerTitle: 'HÀM SỐ & ĐỒ THỊ',
    description: 'Định nghĩa hàm số, tập xác định D, tập giá trị, các cách cho hàm số, đồ thị và tính đồng biến / nghịch biến.',
    branches: [
      {
        title: '1. Khái Niệm Hàm Số',
        badge: 'Định nghĩa',
        points: [
          'Hàm số y = f(x): Quy tắc đặt tương ứng mỗi x ∈ D với DUY NHẤT một giá trị y ∈ R.',
          'Biến số: x (độc lập); Hàm số: y (phụ thuộc).',
          'Tập xác định D: Tập hợp các giá trị của x làm cho biểu thức f(x) có nghĩa.',
          'Tập giá trị T: {f(x) | x ∈ D}.'
        ]
      },
      {
        title: '2. Các Cách Cho Một Hàm Số',
        badge: 'Biểu diễn',
        points: [
          'Bằng công thức đại số (phổ biến nhất, ví dụ: y = 2x² - 3x + 1).',
          'Bằng bảng số liệu (thường gặp trong thực tế đo đạc, thống kê).',
          'Bằng biểu đồ / đồ thị trực quan.'
        ]
      },
      {
        title: '3. Đồ Thị Của Hàm Số',
        badge: 'Đồ thị',
        points: [
          'Tập hợp các điểm M(x; f(x)) trên mặt phẳng tọa độ Oxy với x ∈ D.',
          'Điểm M(x₀; y₀) thuộc đồ thị ⇔ x₀ ∈ D và y₀ = f(x₀).'
        ]
      },
      {
        title: '4. Sự Đồng Biến & Nghịch Biến',
        badge: 'Biến thiên',
        points: [
          'Hàm số đồng biến (tăng) trên K ⇔ ∀x₁, x₂ ∈ K: x₁ < x₂ ⇒ f(x₁) < f(x₂) (đồ thị đi lên từ trái sang phải).',
          'Hàm số nghịch biến (giảm) trên K ⇔ ∀x₁, x₂ ∈ K: x₁ < x₂ ⇒ f(x₁) > f(x₂) (đồ thị đi xuống từ trái sang phải).'
        ]
      }
    ],
    highlights: [
      'Tập xác định D là tập các giá trị x để f(x) có nghĩa',
      'Đồng biến: x tăng ➔ y tăng (đồ thị đi lên)',
      'Nghịch biến: x tăng ➔ y giảm (đồ thị đi xuống)'
    ]
  },
  {
    id: 'mindmap-bai-16',
    baiCode: 'Bài 16',
    lessonNumber: 16,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 16: Hàm số bậc hai',
    shortTitle: 'Hàm số bậc hai',
    filenameBase: 'Bai16_Ham-so-bac-hai',
    centerTitle: 'HÀM SỐ BẬC HAI',
    description: 'Dạng y = ax² + bx + c (a ≠ 0), tọa độ đỉnh I, trục đối xứng, bảng biến thiên và hình dạng Parabol.',
    branches: [
      {
        title: '1. Dạng Chuẩn & Tập Xác Định',
        badge: 'Dạng chuẩn',
        points: [
          'Dạng tổng quát: y = ax² + bx + c (với a, b, c ∈ R và a ≠ 0).',
          'Tập xác định: D = R.',
          'Biệt thức: Δ = b² - 4ac (hoặc Δ\' = b\'² - ac).'
        ]
      },
      {
        title: '2. Đỉnh I & Trục Đối Xứng',
        badge: 'Đỉnh & Trục',
        points: [
          'Đỉnh Parabol: I(-b / (2a); -Δ / (4a)).',
          'Trục đối xứng: Đường thẳng x = -b / (2a) (đi qua đỉnh I và song song với Oy).',
          'Bề lõm: a > 0 bề lõm quay lên trên (I là điểm thấp nhất, min); a < 0 bề lõm quay xuống dưới (I là điểm cao nhất, max).'
        ]
      },
      {
        title: '3. Chiều Biến Thiên & Bảng Biến Thiên',
        badge: 'Biến thiên',
        points: [
          'Khi a > 0: Nghịch biến trên (-∞; -b/(2a)), đồng biến trên (-b/(2a); +∞). Giá trị nhỏ nhất là -Δ/(4a).',
          'Khi a < 0: Đồng biến trên (-∞; -b/(2a)), nghịch biến trên (-b/(2a); +∞). Giá trị lớn nhất là -Δ/(4a).'
        ]
      },
      {
        title: '4. Cách Vẽ Đồ Thị Parabol (P)',
        badge: 'Vẽ đồ thị',
        points: [
          'Bước 1: Xác định tọa độ đỉnh I(-b/(2a); -Δ/(4a)).',
          'Bước 2: Vẽ trục đối xứng x = -b/(2a).',
          'Bước 3: Tìm giao điểm với Oy: (0; c) và giao điểm với Ox (nghiệm phương trình ax² + bx + c = 0 nếu có).',
          'Bước 4: Lấy thêm các điểm đối xứng qua trục và vẽ đường cong parabol trơn mượt.'
        ]
      },
      {
        title: '5. Ứng Dụng Thực Tế Của Parabol',
        badge: 'Ứng dụng',
        points: [
          'Quỹ đạo chuyển động ném xiên của vật thể dưới tác dụng của trọng lực.',
          'Thiết kế cổng vòm Parabol, cầu treo dây võng, gương hội tụ chảo parabol.',
          'Bài toán tìm diện tích lớn nhất, doanh thu lớn nhất, chi phí tối thiểu.'
        ]
      }
    ],
    highlights: [
      'Đỉnh I(-b/(2a); -Δ/(4a)) · Trục đối xứng x = -b/(2a)',
      'a > 0: Parabol ngửa lên (I là đáy min)',
      'a < 0: Parabol úp xuống (I là đỉnh max)'
    ]
  },
  {
    id: 'mindmap-bai-17',
    baiCode: 'Bài 17',
    lessonNumber: 17,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 17: Dấu của tam thức bậc hai',
    shortTitle: 'Dấu tam thức bậc hai',
    filenameBase: 'Bai17_Dau-tam-thuc-bac-hai',
    centerTitle: 'DẤU TAM THỨC BẬC HAI',
    description: 'Định lý dấu tam thức bậc hai f(x) = ax² + bx + c (a ≠ 0), bảng xét dấu trong 3 trường hợp Δ và giải BPT bậc hai.',
    branches: [
      {
        title: '1. Khái Niệm Tam Thức Bậc Hai',
        badge: 'Khái niệm',
        points: [
          'Biểu thức dạng f(x) = ax² + bx + c (a ≠ 0).',
          'Nghiệm của tam thức là nghiệm của phương trình ax² + bx + c = 0.',
          'Biệt thức Δ = b² - 4ac.'
        ]
      },
      {
        title: '2. Định Lý Về Dấu Của Tam Thức Bậc Hai',
        badge: 'Định lý cốt lõi',
        points: [
          'TH1 (Δ < 0): f(x) CÙNG DẤU VỚI HỆ SỐ a với MỌI x ∈ R.',
          'TH2 (Δ = 0): f(x) CÙNG DẤU VỚI a với mọi x ≠ -b/(2a); tại x = -b/(2a) thì f(x) = 0.',
          'TH3 (Δ > 0): Phương trình có 2 nghiệm x₁ < x₂.',
          '➔ "Trong trái, ngoài cùng": f(x) TRÁI DẤU với a khi x₁ < x < x₂; CÙNG DẤU với a khi x < x₁ hoặc x > x₂.'
        ]
      },
      {
        title: '3. Bất Phương Trình Bậc Hai Một Ẩn',
        badge: 'BPT bậc hai',
        points: [
          'Dạng: ax² + bx + c > 0 (hoặc ≥ 0, < 0, ≤ 0) với a ≠ 0.',
          'Quy trình giải: Tính Δ ➔ Tìm nghiệm ➔ Lập bảng xét dấu ➔ Kết luận tập nghiệm S.'
        ]
      },
      {
        title: '4. Điều Kiện Để f(x) Không Đổi Dấu Trên R',
        badge: 'Tham số m',
        points: [
          'f(x) > 0 với mọi x ∈ R ⇔ a > 0 và Δ < 0.',
          'f(x) ≥ 0 với mọi x ∈ R ⇔ a > 0 và Δ ≤ 0.',
          'f(x) < 0 với mọi x ∈ R ⇔ a < 0 và Δ < 0.',
          'f(x) ≤ 0 với mọi x ∈ R ⇔ a < 0 và Δ ≤ 0.'
        ]
      }
    ],
    highlights: [
      'Δ < 0: f(x) cùng dấu với a với mọi x ∈ R',
      'Δ > 0: Quy tắc "Trong trái, ngoài cùng"',
      'Điều kiện f(x) > 0 ∀x ∈ R: a > 0 và Δ < 0'
    ]
  },
  {
    id: 'mindmap-bai-18',
    baiCode: 'Bài 18',
    lessonNumber: 18,
    isReview: false,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Bài 18: Phương trình quy về phương trình bậc hai',
    shortTitle: 'PT quy về bậc hai',
    filenameBase: 'Bai18_Phuong-trinh-quy-ve-bac-hai',
    centerTitle: 'PT QUY VỀ BẬC HAI',
    description: 'Hai dạng phương trình chứa căn cơ bản: √(f(x)) = √(g(x)) và √(f(x)) = g(x), kỹ năng bình phương và thử lại nghiệm.',
    branches: [
      {
        title: '1. Dạng 1: √(ax² + bx + c) = √(dx² + ex + f)',
        badge: 'Dạng căn = căn',
        points: [
          'Bước 1: Bình phương hai vế đưa về phương trình bậc hai: ax² + bx + c = dx² + ex + f.',
          'Bước 2: Giải phương trình bậc hai tìm các giá trị x.',
          'Bước 3: Thay các giá trị x tìm được vào một trong hai biểu thức dưới căn (hoặc vào cả 2 vế của PT ban đầu) để kiểm tra.',
          'Bước 4: Kết luận các nghiệm thỏa mãn.'
        ]
      },
      {
        title: '2. Dạng 2: √(ax² + bx + c) = dx + e',
        badge: 'Dạng căn = bậc nhất',
        points: [
          'Cách 1 (Bình phương & thử lại): Bình phương hai vế ax² + bx + c = (dx + e)² ➔ Giải tìm x ➔ Thử lại vào PT ban đầu ➔ Kết luận.',
          'Cách 2 (Điều kiện tương đương): PT ⇔ { dx + e ≥ 0 ; ax² + bx + c = (dx + e)² }.',
          'Lưu ý: Bắt buộc vế phải dx + e phải KHÔNG ÂM trước khi bình phương.'
        ]
      },
      {
        title: '3. Phương Pháp Đặt Ẩn Phụ',
        badge: 'Ẩn phụ',
        points: [
          'Nhận dạng biểu thức lặp lại: Đặt t = √(ax² + bx + c) (điều kiện t ≥ 0).',
          'Đưa phương trình phức tạp về phương trình bậc hai theo t đơn giản.',
          'Giải tìm t thỏa mãn t ≥ 0 rồi thế ngược lại để tìm x.'
        ]
      },
      {
        title: '4. Bẫy & Lỗi Sai Thường Gặp',
        badge: 'Lưu ý',
        points: [
          'Quên thử lại nghiệm dẫn đến nhận nghiệm ngoại lai (nghiệm giả mạo).',
          'Khai triển sai hằng đẳng thức (dx + e)² = d²x² + 2dex + e².',
          'Chuyển vế quên đổi dấu khi rút gọn phương trình.'
        ]
      }
    ],
    highlights: [
      '√(f) = √(g): Bình phương hai vế rồi thử lại nghiệm',
      '√(f) = g: Điều kiện bắt buộc g ≥ 0 rồi bình phương',
      'Luôn kiểm tra nghiệm để loại trừ nghiệm ngoại lai'
    ]
  },
  {
    id: 'mindmap-bai-18z',
    baiCode: 'Ôn tập Chương VI',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 6,
    chapterRoman: 'Chương VI',
    chapterTitle: 'Hàm số, đồ thị và ứng dụng',
    title: 'Ôn tập Chương VI: Hàm số, đồ thị và ứng dụng',
    shortTitle: 'Tổng kết Chương VI',
    filenameBase: 'Bai18z_OnTap_ChuongVI_Ham-so-do-thi',
    centerTitle: 'TỔNG ÔN CHƯƠNG VI',
    description: 'Hệ thống hóa toàn bộ lý thuyết hàm số, khảo sát Parabol bậc hai, định lý dấu tam thức và phương trình chứa căn.',
    branches: [
      {
        title: '1. Bản Đồ Hàm Số & Parabol',
        badge: 'Parabol',
        points: [
          'y = ax² + bx + c: Đỉnh I(-b/(2a); -Δ/(4a)), trục đối xứng x = -b/(2a).',
          'Bảng biến thiên theo dấu của a.',
          'Sự tương giao giữa Parabol và đường thẳng: Số nghiệm = số giao điểm.'
        ]
      },
      {
        title: '2. Cẩm Nang Xét Dấu Tam Thức Bậc Hai',
        badge: 'Xét dấu',
        points: [
          'Δ < 0: f(x) cùng dấu với a ∀x ∈ R.',
          'Δ = 0: f(x) cùng dấu với a ∀x ≠ -b/(2a).',
          'Δ > 0: Trong trái dấu với a, ngoài cùng dấu với a.',
          'Ứng dụng giải BPT bậc hai và hệ BPT bậc hai.'
        ]
      },
      {
        title: '3. Chiến Lược Giải PT Chứa Căn',
        badge: 'PT chứa căn',
        points: [
          '√(f) = √(g) ➔ Bình phương ➔ Thử lại.',
          '√(f) = g ➔ Điều kiện g ≥ 0 ➔ Bình phương ➔ Giải hệ.',
          'Đặt ẩn phụ: Tìm đại lượng chung t = √(biểu thức).'
        ]
      },
      {
        title: '4. Bài Toán Ứng Dụng Tối Ưu',
        badge: 'Thực tế',
        points: [
          'Bài toán lợi nhuận: Lập hàm bậc hai P(x) = ax² + bx + c (a < 0).',
          'Lợi nhuận tối đa đạt tại đỉnh x = -b/(2a).',
          'Bài toán hình học: Diện tích lớn nhất của mảnh đất rào chắn.'
        ]
      }
    ],
    highlights: [
      'Khảo sát toàn diện Parabol y = ax² + bx + c',
      'Quy tắc xét dấu tam thức bậc hai giải BPT',
      'Kỹ năng giải phương trình chứa căn không sót nghiệm'
    ]
  },

  // ==================== CHƯƠNG VII: PHƯƠNG PHÁP TỌA ĐỘ TRONG MẶT PHẲNG ====================
  {
    id: 'mindmap-bai-19',
    baiCode: 'Bài 19',
    lessonNumber: 19,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 19: Phương trình đường thẳng',
    shortTitle: 'Phương trình đường thẳng',
    filenameBase: 'Bai19_Phuong-trinh-duong-thang',
    centerTitle: 'PT ĐƯỜNG THẲNG',
    description: 'Vectơ chỉ phương, vectơ pháp tuyến, PT tham số, PT chính tắc và PT tổng quát của đường thẳng.',
    branches: [
      {
        title: '1. VTCP & VTPT Của Đường Thẳng',
        badge: 'Vectơ',
        points: [
          'Vectơ chỉ phương (VTCP) u ≠ 0: Giá song song hoặc trùng với đường thẳng d.',
          'Vectơ pháp tuyến (VTPT) n ≠ 0: Giá vuông góc với đường thẳng d.',
          'Quan hệ: u ⊥ n ⇔ u · n = 0. Nếu u = (a; b) thì n = (-b; a) hoặc (b; -a).'
        ]
      },
      {
        title: '2. Phương Trình Tham Số & Chính Tắc',
        badge: 'Tham số',
        points: [
          'Đi qua M₀(x₀; y₀) và có VTCP u = (u₁; u₂):',
          'PT tham số: { x = x₀ + u₁·t ; y = y₀ + u₂·t } (t ∈ R là tham số).',
          'PT chính tắc (khi u₁, u₂ ≠ 0): (x - x₀)/u₁ = (y - y₀)/u₂.'
        ]
      },
      {
        title: '3. Phương Trình Tổng Quát',
        badge: 'Tổng quát',
        points: [
          'Đi qua M₀(x₀; y₀) và có VTPT n = (a; b): a(x - x₀) + b(y - y₀) = 0.',
          'Dạng rút gọn: ax + by + c = 0 (với a² + b² ≠ 0, c = -ax₀ - by₀).',
          'Đặc biệt: a = 0 ➔ by + c = 0 (song song Ox); b = 0 ➔ ax + c = 0 (song song Oy); c = 0 (qua O).'
        ]
      },
      {
        title: '4. PT Đoạn Chắn & Hệ Số Góc',
        badge: 'Dạng đặc biệt',
        points: [
          'PT theo đoạn chắn: Cắt Ox tại A(a; 0) và Oy tại B(0; b) (a, b ≠ 0): x/a + y/b = 1.',
          'PT theo hệ số góc: y = kx + m (với k = tanα = u₂/u₁ là hệ số góc).'
        ]
      }
    ],
    highlights: [
      'VTCP u = (a; b) ➔ VTPT n = (-b; a)',
      'PT tham số: { x = x₀ + at; y = y₀ + bt }',
      'PT tổng quát: ax + by + c = 0 (a² + b² ≠ 0)'
    ]
  },
  {
    id: 'mindmap-bai-20',
    baiCode: 'Bài 20',
    lessonNumber: 20,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 20: Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách',
    shortTitle: 'Vị trí tương đối, góc, khoảng cách',
    filenameBase: 'Bai20_Vi-tri-tuong-doi-goc-khoang-cach',
    centerTitle: 'VỊ TRÍ, GÓC & KHOẢNG CÁCH',
    description: 'Vị trí tương đối cắt nhau, song song, trùng nhau, góc giữa hai đường thẳng và khoảng cách từ điểm đến đường thẳng.',
    branches: [
      {
        title: '1. Vị Trí Tương Đối Giữa Hai Đường Thẳng',
        badge: 'Vị trí',
        points: [
          'Xét d₁: a₁x + b₁y + c₁ = 0 và d₂: a₂x + b₂y + c₂ = 0. Giải hệ phương trình 2 đường thẳng:',
          '1) Cắt nhau: Hệ có 1 nghiệm duy nhất (a₁/a₂ ≠ b₁/b₂). Điểm cắt là nghiệm của hệ.',
          '2) Song song: Hệ vô nghiệm (a₁/a₂ = b₁/b₂ ≠ c₁/c₂).',
          '3) Trùng nhau: Hệ có vô số nghiệm (a₁/a₂ = b₁/b₂ = c₁/c₂).'
        ]
      },
      {
        title: '2. Hai Đường Thẳng Vuông Góc',
        badge: 'Vuông góc',
        points: [
          'd₁ ⊥ d₂ ⇔ n₁ ⊥ n₂ ⇔ a₁·a₂ + b₁·b₂ = 0.',
          'Đường thẳng song song với ax + by + c = 0 có dạng: ax + by + c\' = 0 (c\' ≠ c).',
          'Đường thẳng vuông góc với ax + by + c = 0 có dạng: bx - ay + m = 0.'
        ]
      },
      {
        title: '3. Góc Giữa Hai Đường Thẳng',
        badge: 'Góc',
        points: [
          'Góc giữa hai đường thẳng φ luôn là góc nhọn hoặc vuông: 0° ≤ φ ≤ 90°.',
          'Công thức cosin góc: cosφ = |cos(n₁, n₂)| = |a₁a₂ + b₁b₂| / [√(a₁² + b₁²) · √(a₂² + b₂²)].'
        ]
      },
      {
        title: '4. Khoảng Cách Từ Điểm Đến Đường Thẳng',
        badge: 'Khoảng cách',
        points: [
          'Cho điểm M(x₀; y₀) và đường thẳng Δ: ax + by + c = 0.',
          'Khoảng cách: d(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²).',
          'Khoảng cách giữa hai đường thẳng song song d₁: ax + by + c₁ = 0 và d₂: ax + by + c₂ = 0:',
          'd(d₁, d₂) = |c₁ - c₂| / √(a² + b²).'
        ]
      }
    ],
    highlights: [
      'd₁ ⊥ d₂ ⇔ a₁a₂ + b₁b₂ = 0',
      'cosφ = |a₁a₂ + b₁b₂| / [√(a₁²+b₁²)·√(a₂²+b₂²)]',
      'd(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²)'
    ]
  },
  {
    id: 'mindmap-bai-21',
    baiCode: 'Bài 21',
    lessonNumber: 21,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 21: Đường tròn trong mặt phẳng tọa độ',
    shortTitle: 'Đường tròn trong Oxy',
    filenameBase: 'Bai21_Duong-tron-trong-mat-phang-toa-do',
    centerTitle: 'ĐƯỜNG TRÒN TRONG OXY',
    description: 'Phương trình chính tắc, phương trình tổng quát, điều kiện là đường tròn, phương trình tiếp tuyến.',
    branches: [
      {
        title: '1. Phương Trình Chính Tắc',
        badge: 'Chính tắc',
        points: [
          'Đường tròn (C) tâm I(a; b), bán kính R > 0:',
          '(x - a)² + (y - b)² = R².',
          'Đặc biệt tâm O(0; 0): x² + y² = R².'
        ]
      },
      {
        title: '2. Phương Trình Tổng Quát',
        badge: 'Tổng quát',
        points: [
          'Khai triển: x² + y² - 2ax - 2by + c = 0.',
          'Điều kiện để phương trình là đường tròn: a² + b² - c > 0.',
          'Khi đó: Tâm I(a; b) và bán kính R = √(a² + b² - c).'
        ]
      },
      {
        title: '3. Phương Trình Tiếp Tuyến Của Đường Tròn',
        badge: 'Tiếp tuyến',
        points: [
          'Tiếp tuyến tại điểm M₀(x₀; y₀) ∈ (C) tâm I(a; b):',
          'VTPT của tiếp tuyến chính là IM₀ = (x₀ - a; y₀ - b).',
          'Phương trình tiếp tuyến: (x₀ - a)(x - x₀) + (y₀ - b)(y - y₀) = 0.',
          'Điều kiện tiếp xúc: Đường thẳng Δ tiếp xúc (C) ⇔ d(I, Δ) = R.'
        ]
      },
      {
        title: '4. Vị Trí Tương Đối Đường Thẳng & Đường Tròn',
        badge: 'Vị trí',
        points: [
          'd(I, Δ) > R: Không giao nhau (0 điểm chung).',
          'd(I, Δ) = R: Tiếp xúc nhau (1 điểm chung duy nhất, tiếp điểm).',
          'd(I, Δ) < R: Cắt nhau tại 2 điểm phân biệt (dây cung có độ dài AB = 2√(R² - d²)).'
        ]
      }
    ],
    highlights: [
      'Chính tắc: (x - a)² + (y - b)² = R²',
      'Tổng quát: x² + y² - 2ax - 2by + c = 0 (a² + b² - c > 0)',
      'Điều kiện tiếp xúc: d(I, Δ) = R'
    ]
  },
  {
    id: 'mindmap-bai-22',
    baiCode: 'Bài 22',
    lessonNumber: 22,
    isReview: false,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Bài 22: Ba đường conic',
    shortTitle: 'Ba đường conic',
    filenameBase: 'Bai22_Ba-duong-conic',
    centerTitle: 'BA ĐƯỜNG CONIC',
    description: 'Đường Elip, Hypebol, Parabol: định nghĩa, phương trình chính tắc, tiêu điểm, tiêu cự và ứng dụng thiên văn.',
    branches: [
      {
        title: '1. Đường Elip (E)',
        badge: 'Elip',
        points: [
          'Định nghĩa: MF₁ + MF₂ = 2a (2a > 2c).',
          'PT chính tắc: x²/a² + y²/b² = 1 (với a > b > 0 và b² = a² - c²).',
          'Tiêu điểm: F₁(-c; 0), F₂(c; 0); Tiêu cự: F₁F₂ = 2c.',
          'Các đỉnh: A₁(-a; 0), A₂(a; 0), B₁(-b; 0), B₂(b; 0). Trục lớn: 2a; Trục bé: 2b.'
        ]
      },
      {
        title: '2. Đường Hypebol (H)',
        badge: 'Hypebol',
        points: [
          'Định nghĩa: |MF₁ - MF₂| = 2a (0 < 2a < 2c).',
          'PT chính tắc: x²/a² - y²/b² = 1 (với a, b > 0 và b² = c² - a²).',
          'Tiêu điểm: F₁(-c; 0), F₂(c; 0); Tiêu cự: 2c.',
          'Các đỉnh: A₁(-a; 0), A₂(a; 0). Trục thực: 2a; Trục ảo: 2b. Đường tiệm cận: y = ±(b/a)x.'
        ]
      },
      {
        title: '3. Đường Parabol (P)',
        badge: 'Parabol',
        points: [
          'Định nghĩa: MF = d(M, Δ) (tập hợp các điểm cách đều tiêu điểm F và đường chuẩn Δ).',
          'PT chính tắc: y² = 2px (với tham số tiêu p > 0).',
          'Tiêu điểm: F(p/2; 0); Đường chuẩn Δ: x = -p/2.',
          'Đỉnh O(0; 0); Trục đối xứng là trục hoành Ox.'
        ]
      },
      {
        title: '4. Ứng Dụng Thực Tiễn Của Ba Conic',
        badge: 'Ứng dụng',
        points: [
          'Elip: Quỹ đạo chuyển động của các hành tinh quay quanh Mặt Trời (Định luật Kepler).',
          'Hypebol: Quỹ đạo sao chổi không chu kỳ, hệ thống định vị dẫn đường LORAN.',
          'Parabol: Gương phản xạ đèn xe, chảo thu vệ tinh viễn thông, kính viễn vọng.'
        ]
      }
    ],
    highlights: [
      'Elip: x²/a² + y²/b² = 1 (b² = a² - c²)',
      'Hypebol: x²/a² - y²/b² = 1 (b² = c² - a²)',
      'Parabol: y² = 2px (F(p/2; 0), Δ: x = -p/2)'
    ]
  },
  {
    id: 'mindmap-bai-22z',
    baiCode: 'Ôn tập Chương VII',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 7,
    chapterRoman: 'Chương VII',
    chapterTitle: 'Phương pháp tọa độ trong mặt phẳng',
    title: 'Ôn tập Chương VII: Phương pháp tọa độ trong mặt phẳng',
    shortTitle: 'Tổng kết Chương VII',
    filenameBase: 'Bai22z_OnTap_ChuongVII_Toa-do-mat-phang',
    centerTitle: 'TỔNG ÔN CHƯƠNG VII',
    description: 'Bản đồ công thức hình học giải tích Oxy: đường thẳng, đường tròn, khoảng cách, góc và ba đường conic.',
    branches: [
      {
        title: '1. Hệ Thống Phương Trình Đường Thẳng',
        badge: 'Đường thẳng',
        points: [
          'Tham số: { x = x₀ + at; y = y₀ + bt } · Tổng quát: ax + by + c = 0.',
          'Góc: cosφ = |a₁a₂ + b₁b₂| / [√(a₁²+b₁²)√(a₂²+b₂²)].',
          'Khoảng cách: d(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²).'
        ]
      },
      {
        title: '2. Phương Trình Đường Tròn',
        badge: 'Đường tròn',
        points: [
          '(x - a)² + (y - b)² = R² ⇔ x² + y² - 2ax - 2by + c = 0 (a² + b² - c > 0).',
          'Tiếp tuyến tại M₀: (x₀ - a)(x - x₀) + (y₀ - b)(y - y₀) = 0.',
          'Vị trí tương đối với đường thẳng dựa vào d(I, Δ) so với R.'
        ]
      },
      {
        title: '3. Bảng So Sánh 3 Đường Conic',
        badge: 'Ba Conic',
        points: [
          'Elip: x²/a² + y²/b² = 1 (a² = b² + c²).',
          'Hypebol: x²/a² - y²/b² = 1 (c² = a² + b²).',
          'Parabol: y² = 2px (F(p/2; 0), đường chuẩn x = -p/2).'
        ]
      },
      {
        title: '4. Các Kỹ Năng Giải Toán Thường Gặp',
        badge: 'Kỹ năng',
        points: [
          'Viết PT tiếp tuyến đi qua điểm hoặc song song/vuông góc với đường thẳng cho trước.',
          'Tìm điểm đối xứng, hình chiếu vuông góc của điểm lên đường thẳng.',
          'Lập phương trình Conic khi biết các yếu tố hình học.'
        ]
      }
    ],
    highlights: [
      'Bảng tra cứu công thức tọa độ Oxy toàn diện',
      'Phân biệt nhanh 3 phương trình Conic',
      'Phương pháp giải các bài toán vị trí tương đối và khoảng cách'
    ]
  },

  // ==================== CHƯƠNG VIII: ĐẠI SỐ TỔ HỢP ====================
  {
    id: 'mindmap-bai-23',
    baiCode: 'Bài 23',
    lessonNumber: 23,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 23: Quy tắc đếm',
    shortTitle: 'Quy tắc đếm',
    filenameBase: 'Bai23_Quy-tac-dem',
    centerTitle: 'QUY TẮC ĐẾM',
    description: 'Quy tắc cộng (phương án độc lập), quy tắc nhân (công đoạn liên tiếp) và sơ đồ cây quyết định.',
    branches: [
      {
        title: '1. Quy Tắc Cộng (Phương Án)',
        badge: 'Quy tắc cộng',
        points: [
          'Một công việc có thể hoàn thành bởi MỘT TRONG HAI phương án độc lập:',
          'Phương án 1 có m cách thực hiện.',
          'Phương án 2 có n cách thực hiện (không trùng với phương án 1).',
          'Tổng số cách hoàn thành công việc: m + n cách.'
        ]
      },
      {
        title: '2. Quy Tắc Nhân (Công Đoạn)',
        badge: 'Quy tắc nhân',
        points: [
          'Một công việc phải trải qua HAI CÔNG ĐOẠN LIÊN TIẾP:',
          'Công đoạn 1 có m cách thực hiện.',
          'Với mỗi cách của CĐ1, công đoạn 2 có n cách thực hiện.',
          'Tổng số cách hoàn thành công việc: m · n cách.'
        ]
      },
      {
        title: '3. Sơ Đồ Cây (Tree Diagram)',
        badge: 'Sơ đồ cây',
        points: [
          'Biểu diễn trực quan từng bước phân nhánh của quá trình đếm.',
          'Gốc cây là điểm khởi đầu, mỗi nhánh là một lựa chọn ở từng giai đoạn.',
          'Số lá cây ở tầng cuối cùng chính là tổng số kết quả có thể xảy ra.'
        ]
      },
      {
        title: '4. Phân Biệt Cộng & Nhân',
        badge: 'Mẹo phân biệt',
        points: [
          'Dấu hiệu cộng: Chỉ cần làm XONG một phương án là công việc đã HOÀN THÀNH.',
          'Dấu hiệu nhân: Phải làm XONG CẢ các công đoạn nối tiếp nhau thì công việc mới hoàn thành.',
          'Các bài toán điển hình: Lập số tự nhiên thỏa mãn điều kiện, chọn đường đi, xếp trang phục.'
        ]
      }
    ],
    highlights: [
      'Quy tắc cộng: Các phương án độc lập (m + n)',
      'Quy tắc nhân: Các công đoạn liên tiếp (m · n)',
      'Sơ đồ hình cây đếm trực quan không sót kết quả'
    ]
  },
  {
    id: 'mindmap-bai-24',
    baiCode: 'Bài 24',
    lessonNumber: 24,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 24: Hoán vị, chỉnh hợp và tổ hợp',
    shortTitle: 'Hoán vị, chỉnh hợp, tổ hợp',
    filenameBase: 'Bai24_Hoan-vi-chinh-hop-to-hop',
    centerTitle: 'HOÁN VỊ, CHỈNH HỢP, TỔ HỢP',
    description: 'Giai thừa n!, định nghĩa hoán vị P_n, chỉnh hợp A_n^k, tổ hợp C_n^k và kỹ năng phân biệt có thứ tự / không thứ tự.',
    branches: [
      {
        title: '1. Giai Thừa & Hoán Vị (P_n)',
        badge: 'Hoán vị',
        points: [
          'Giai thừa: n! = 1 · 2 · 3 ... · n (quy ước: 0! = 1, 1! = 1).',
          'Hoán vị của n phần tử: Sắp xếp THỨ TỰ tất cả n phần tử khác nhau.',
          'Công thức: P_n = n! = n(n - 1)...2·1.',
          'Ví dụ: Xếp 5 học sinh vào 1 hàng dọc có P₅ = 5! = 120 cách.'
        ]
      },
      {
        title: '2. Chỉnh Hợp (A_n^k)',
        badge: 'Chỉnh hợp',
        points: [
          'Định nghĩa: Chọn k phần tử từ n phần tử (1 ≤ k ≤ n) VÀ SẮP XẾP THỨ TỰ k phần tử đó.',
          'Công thức: A_n^k = n! / (n - k)! = n(n - 1)...(n - k + 1).',
          'Đặc biệt: A_n^n = P_n = n!.',
          'Ví dụ: Chọn ban cán sự gồm 1 lớp trưởng, 1 lớp phó từ 40 bạn: A₄₀² cách.'
        ]
      },
      {
        title: '3. Tổ Hợp (C_n^k)',
        badge: 'Tổ hợp',
        points: [
          'Định nghĩa: Chọn k phần tử từ n phần tử (0 ≤ k ≤ n) KHÔNG QUAN TÂM THỨ TỰ.',
          'Công thức: C_n^k = n! / [k! · (n - k)!] = A_n^k / k!.',
          'Tính chất đối xứng: C_n^k = C_n^{n - k}.',
          'Công thức Pascal: C_n^k = C_{n - 1}^{k - 1} + C_{n - 1}^k.'
        ]
      },
      {
        title: '4. Bí Quyết Phân Biệt A_n^k & C_n^k',
        badge: 'Bí quyết',
        points: [
          'CÂU HỎI VÀNG: "Thay đổi thứ tự các phần tử có tạo ra kết quả mới không?"',
          'CÓ THỨ TỰ (chức vụ, số nhà, chữ số, trao giải Nhất-Nhì) ➔ DÙNG CHỈNH HỢP A_n^k.',
          'KHÔNG THỨ TỰ (chọn nhóm người, rút thăm, chọn bi cùng loại) ➔ DÙNG TỔ HỢP C_n^k.'
        ]
      }
    ],
    highlights: [
      'Hoán vị P_n = n!',
      'Chỉnh hợp A_n^k = n! / (n - k)! (CÓ thứ tự)',
      'Tổ hợp C_n^k = n! / [k!(n - k)!] (KHÔNG thứ tự)'
    ]
  },
  {
    id: 'mindmap-bai-25',
    baiCode: 'Bài 25',
    lessonNumber: 25,
    isReview: false,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Bài 25: Nhị thức Newton',
    shortTitle: 'Nhị thức Newton',
    filenameBase: 'Bai25_Nhi-thuc-Newton',
    centerTitle: 'NHỊ THỨC NEWTON',
    description: 'Khai triển nhị thức Newton với số mũ n = 4, n = 5, tam giác Pascal và tìm hệ số của x^k.',
    branches: [
      {
        title: '1. Khai Triển (a + b)⁴',
        badge: 'Mũ 4',
        points: [
          '(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.',
          'Hệ số theo tổ hợp: C₄⁰ = 1, C₄¹ = 4, C₄² = 6, C₄³ = 4, C₄⁴ = 1.',
          'Số hạng có lũy thừa của a giảm dần từ 4 về 0, lũy thừa của b tăng dần từ 0 lên 4.',
          'Tổng số mũ của a và b trong mỗi số hạng luôn bằng 4.'
        ]
      },
      {
        title: '2. Khai Triển (a + b)⁵',
        badge: 'Mũ 5',
        points: [
          '(a + b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵.',
          'Hệ số theo tổ hợp: C₅⁰ = 1, C₅¹ = 5, C₅² = 10, C₅³ = 10, C₅⁴ = 5, C₅⁵ = 1.',
          'Khai triển có đúng 6 số hạng (n + 1 số hạng).'
        ]
      },
      {
        title: '3. Tam Giác Pascal',
        badge: 'Tam giác Pascal',
        points: [
          'Dòng 0: 1',
          'Dòng 1: 1  1',
          'Dòng 2: 1  2  1',
          'Dòng 3: 1  3  3  1',
          'Dòng 4: 1  4  6  4  1',
          'Dòng 5: 1  5  10  10  5  1',
          'Quy tắc cộng: Mỗi số bằng tổng hai số ngay phía trên nó: C_n^k = C_{n-1}^{k-1} + C_{n-1}^k.'
        ]
      },
      {
        title: '4. Phương Pháp Tìm Hệ Số Của x^k',
        badge: 'Dạng toán',
        points: [
          'Bước 1: Viết số hạng tổng quát của khai triển.',
          'Bước 2: Gom toàn bộ phần hệ số số học và phần biến số x có số mũ.',
          'Bước 3: Cho số mũ của x bằng k để giải tìm số hạng tương ứng.',
          'Bước 4: Tính giá trị hệ số và kết luận (chú ý phân biệt "hệ số" và "số hạng").'
        ]
      }
    ],
    highlights: [
      '(a+b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴',
      '(a+b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵',
      'Tam giác Pascal cho các hệ số khai triển'
    ]
  },
  {
    id: 'mindmap-bai-25z',
    baiCode: 'Ôn tập Chương VIII',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 8,
    chapterRoman: 'Chương VIII',
    chapterTitle: 'Đại số tổ hợp',
    title: 'Ôn tập Chương VIII: Đại số tổ hợp',
    shortTitle: 'Tổng kết Chương VIII',
    filenameBase: 'Bai25z_OnTap_ChuongVIII_Dai-so-to-hop',
    centerTitle: 'TỔNG ÔN CHƯƠNG VIII',
    description: 'Sơ đồ cây quyết định phương pháp đếm, bảng đối chiếu Hoán vị - Chỉnh hợp - Tổ hợp và khai triển Newton.',
    branches: [
      {
        title: '1. Sơ Đồ Cây Quyết Định Phương Pháp Đếm',
        badge: 'Quyết định',
        points: [
          'Bài toán đếm ➔ Có phân giai đoạn không? Có: Quy tắc nhân; Độc lập: Quy tắc cộng.',
          'Có chọn phần tử không? Không: Hoán vị P_n = n!.',
          'Có thứ tự không? Có: Chỉnh hợp A_n^k; Không: Tổ hợp C_n^k.'
        ]
      },
      {
        title: '2. Bảng Đối Chiếu P_n, A_n^k, C_n^k',
        badge: 'Bảng đối chiếu',
        points: [
          'P_n: Xếp n phần tử khác nhau vào n vị trí.',
          'A_n^k: Chọn k từ n VÀ xếp thứ tự k phần tử.',
          'C_n^k: Chọn k từ n KHÔNG xếp thứ tự.',
          'Mối liên hệ: A_n^k = k! · C_n^k.'
        ]
      },
      {
        title: '3. Cẩm Nang Nhị Thức Newton',
        badge: 'Newton',
        points: [
          'Ghi nhớ dãy hệ số Pascal mũ 4: 1 - 4 - 6 - 4 - 1.',
          'Dãy hệ số Pascal mũ 5: 1 - 5 - 10 - 10 - 5 - 1.',
          'Tính tổng các hệ số: Cho a = 1, b = 1 ➔ Tổng hệ số của (1+1)ⁿ = 2ⁿ.'
        ]
      },
      {
        title: '4. Các Bẫy Đếm Thường Gặp',
        badge: 'Bẫy đếm',
        points: [
          'Đếm trùng phần tử do các trường hợp không rời nhau.',
          'Quên điều kiện chữ số đầu tiên a ≠ 0 trong bài toán lập số tự nhiên.',
          'Nhầm lẫn giữa chọn có thứ tự và không thứ tự.'
        ]
      }
    ],
    highlights: [
      'Sơ đồ phân nhánh chọn công cụ đếm chuẩn xác',
      'Mối liên hệ A_n^k = k! · C_n^k',
      'Kỹ thuật tính nhanh hệ số nhị thức Newton'
    ]
  },

  // ==================== CHƯƠNG IX: TÍNH XÁC SUẤT THEO ĐỊNH NGHĨA CỔ ĐIỂN ====================
  {
    id: 'mindmap-bai-26',
    baiCode: 'Bài 26',
    lessonNumber: 26,
    isReview: false,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Bài 26: Biến cố và định nghĩa cổ điển của xác suất',
    shortTitle: 'Biến cố & xác suất cổ điển',
    filenameBase: 'Bai26_Bien-co-va-dinh-nghia-co-dien-xac-suat',
    centerTitle: 'BIẾN CỐ & XÁC SUẤT CỔ ĐIỂN',
    description: 'Phép thử ngẫu nhiên, không gian mẫu Ω, biến cố A, định nghĩa xác suất cổ điển P(A) = n(A)/n(Ω) và các tính chất.',
    branches: [
      {
        title: '1. Phép Thử & Không Gian Mẫu',
        badge: 'Phép thử & Ω',
        points: [
          'Phép thử ngẫu nhiên T: Hành động không thể đoán trước kết quả nhưng biết trước tập hợp mọi kết quả có thể xảy ra.',
          'Không gian mẫu Ω: Tập hợp TẤT CẢ các kết quả có thể xảy ra của phép thử.',
          'Số phần tử không gian mẫu: Ký hiệu n(Ω) hoặc |Ω|.'
        ]
      },
      {
        title: '2. Khái Niệm Biến Cố',
        badge: 'Biến cố',
        points: [
          'Biến cố A: Tập con của không gian mẫu (A ⊂ Ω).',
          'Biến cố chắc chắn: Luôn xảy ra, chính là Ω. P(Ω) = 1.',
          'Biến cố không thể: Không bao giờ xảy ra, chính là ∅. P(∅) = 0.',
          'Biến cố đối Ā: Xảy ra khi và chỉ khi A KHÔNG xảy ra. Ā = Ω \\ A.'
        ]
      },
      {
        title: '3. Định Nghĩa Cổ Điển Của Xác Suất',
        badge: 'Công thức cổ điển',
        points: [
          'Giả sử các kết quả của không gian mẫu Ω đồng khả năng xảy ra.',
          'Xác suất của biến cố A: P(A) = n(A) / n(Ω).',
          'Trong đó: n(A) là số kết quả thuận lợi cho A; n(Ω) là số kết quả có thể xảy ra.'
        ]
      },
      {
        title: '4. Các Tính Chất Cơ Bản Của Xác Suất',
        badge: 'Tính chất',
        points: [
          'Mức xác suất luôn nằm trong đoạn [0; 1]: 0 ≤ P(A) ≤ 1.',
          'P(∅) = 0; P(Ω) = 1.',
          'Quy tắc biến cố đối: P(Ā) = 1 - P(A) ⇔ P(A) + P(Ā) = 1.'
        ]
      }
    ],
    highlights: [
      'Công thức cổ điển: P(A) = n(A) / n(Ω)',
      '0 ≤ P(A) ≤ 1 với mọi biến cố A',
      'Quy tắc biến cố đối: P(A) = 1 - P(Ā)'
    ]
  },
  {
    id: 'mindmap-bai-27',
    baiCode: 'Bài 27',
    lessonNumber: 27,
    isReview: false,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Bài 27: Thực hành tính xác suất trong thực tiễn',
    shortTitle: 'Thực hành tính xác suất',
    filenameBase: 'Bai27_Thuc-hanh-tinh-xac-suat',
    centerTitle: 'THỰC HÀNH TÍNH XÁC SUẤT',
    description: 'Quy trình 4 bước tính xác suất bằng tổ hợp, kỹ năng dùng biến cố đối, bài toán gieo xúc xắc, chọn bi và thực tế.',
    branches: [
      {
        title: '1. Quy Trình 4 Bước Chuẩn Hóa',
        badge: 'Quy trình',
        points: [
          'Bước 1: Mô tả phép thử và tính số phần tử không gian mẫu n(Ω) (dùng C_n^k hoặc quy tắc nhân).',
          'Bước 2: Xác định biến cố A và các điều kiện thuận lợi.',
          'Bước 3: Tính số kết quả thuận lợi n(A) (dùng tổ hợp, chỉnh hợp, quy tắc đếm).',
          'Bước 4: Áp dụng công thức P(A) = n(A) / n(Ω) và rút gọn phân số.'
        ]
      },
      {
        title: '2. Chiến Thuật Dùng Biến Cố Đối',
        badge: 'Biến cố đối',
        points: [
          'Dấu hiệu nhận biết: Đề bài chứa các từ "ít nhất một", "có ít nhất", "không quá".',
          'Thay vì chia nhiều trường hợp phức tạp của A, ta xét biến cố đối Ā (thường chỉ có 1 trường hợp duy nhất).',
          'Tính n(Ā) ➔ P(Ā) = n(Ā) / n(Ω) ➔ P(A) = 1 - P(Ā).'
        ]
      },
      {
        title: '3. Các Mô Hình Xác Suất Cổ Điển',
        badge: 'Mô hình',
        points: [
          'Mô hình hộp bi: Chọn ngẫu nhiên k viên bi từ hộp có nhiều màu.',
          'Mô hình quân bài / xúc xắc / đồng xu: Số mặt, tính chẵn lẻ, tổng số chấm.',
          'Mô hình kiểm tra sản phẩm: Chọn ngẫu nhiên sản phẩm từ lô hàng có phế phẩm.'
        ]
      },
      {
        title: '4. Ứng Dụng Trong Thực Tiễn',
        badge: 'Thực tế',
        points: [
          'Đánh giá rủi ro trong bảo hiểm và đầu tư tài chính.',
          'Kiểm định chất lượng trong sản xuất công nghiệp và nông nghiệp.',
          'Dự đoán xác suất trúng thưởng trong các trò chơi quay số hợp pháp.'
        ]
      }
    ],
    highlights: [
      'Quy trình 4 bước tính xác suất chuẩn bằng tổ hợp',
      'Chiến thuật "ít nhất một" ➔ Dùng biến cố đối P(A) = 1 - P(Ā)',
      'Ứng dụng thực tế trong kiểm định và bảo hiểm'
    ]
  },
  {
    id: 'mindmap-bai-27z',
    baiCode: 'Ôn tập Chương IX',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 9,
    chapterRoman: 'Chương IX',
    chapterTitle: 'Tính xác suất theo định nghĩa cổ điển',
    title: 'Ôn tập Chương IX: Xác suất cổ điển',
    shortTitle: 'Tổng kết Chương IX',
    filenameBase: 'Bai27z_OnTap_ChuongIX_Xac-suat-co-dien',
    centerTitle: 'TỔNG ÔN CHƯƠNG IX',
    description: 'Bản đồ khái niệm không gian mẫu và biến cố, cẩm nang tính xác suất cổ điển, các bẫy thường gặp và tổng ôn thi Toán 10.',
    branches: [
      {
        title: '1. Bản Đồ Khái Niệm Xác Suất',
        badge: 'Bản đồ',
        points: [
          'Phép thử ngẫu nhiên ➔ Không gian mẫu Ω.',
          'Biến cố A ⊂ Ω ➔ Số kết quả thuận lợi n(A).',
          'Xác suất cổ điển: P(A) = n(A) / n(Ω) với 0 ≤ P(A) ≤ 1.',
          'Biến cố đối Ā: P(A) = 1 - P(Ā).'
        ]
      },
      {
        title: '2. Phối Hợp Tổ Hợp Trong Tính Xác Suất',
        badge: 'Phối hợp',
        points: [
          'n(Ω) thường được tính bằng C_N^k (chọn k từ N phần tử).',
          'n(A) thường được tính bằng tích các tổ hợp thành phần: C_{N₁}^{k₁} · C_{N₂}^{k₂}...',
          'Quy tắc: Luôn kiểm tra k₁ + k₂ + ... = k.'
        ]
      },
      {
        title: '3. Các Bẫy Xác Suất Thường Gặp',
        badge: 'Bẫy đề thi',
        points: [
          'Bẫy tính thiếu trường hợp khi phân loại thuận lợi.',
          'Bẫy đếm lặp (tính trùng kết quả) khi các biến cố thành phần không xung khắc.',
          'Nhầm lẫn giữa không gian mẫu khi có hoàn lại và không hoàn lại.'
        ]
      },
      {
        title: '4. Tổng Ôn Thi Học Kỳ II Môn Toán 10',
        badge: 'Ôn thi HK2',
        points: [
          'Chương VII: Tọa độ phẳng Oxy (Đường thẳng, đường tròn, 3 Conic).',
          'Chương VIII: Đại số tổ hợp (Quy tắc đếm, A_n^k, C_n^k, Newton).',
          'Chương IX: Xác suất cổ điển P(A) = n(A)/n(Ω).',
          'Chúc các em học sinh ôn tập tốt và đạt kết quả cao nhất!'
        ]
      }
    ],
    highlights: [
      'Công thức cốt lõi P(A) = n(A) / n(Ω)',
      'Phối hợp nhịp nhàng giữa giải tích tổ hợp và xác suất',
      'Cẩm nang tránh bẫy đếm trùng và thiếu trường hợp'
    ]
  }
];

module.exports = {
  MINDMAPS_DATA_PART3
};
