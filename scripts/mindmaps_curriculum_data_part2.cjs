// Chapters IV to IX (Lessons 7 to 27z)

const MINDMAPS_DATA_PART2 = [
  // ==================== CHƯƠNG IV: VECTƠ ====================
  {
    id: 'mindmap-bai-07',
    baiCode: 'Bài 7',
    lessonNumber: 7,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 7: Các khái niệm mở đầu về vectơ',
    shortTitle: 'Khái niệm mở đầu vectơ',
    filenameBase: 'Bai07_Cac-khai-niem-mo-dau-vecto',
    centerTitle: 'KHÁI NIỆM MỞ ĐẦU VECTƠ',
    description: 'Đoạn thẳng có hướng, phương và hướng, độ dài vectơ, vectơ-không, cùng phương, cùng hướng và hai vectơ bằng nhau.',
    branches: [
      {
        title: '1. Khái Niệm Vectơ',
        badge: 'Định nghĩa',
        points: [
          'Vectơ là một đoạn thẳng có hướng (đã chỉ rõ điểm đầu A và điểm cuối B), ký hiệu AB hoặc a.',
          'Giá của vectơ: Đường thẳng đi qua điểm đầu và điểm cuối của vectơ.',
          'Độ dài vectơ: Khoảng cách giữa điểm đầu và điểm cuối, ký hiệu |AB| = AB.'
        ]
      },
      {
        title: '2. Phương & Hướng',
        badge: 'Phương hướng',
        points: [
          'Hai vectơ cùng phương nếu giá của chúng song song hoặc trùng nhau.',
          'Hai vectơ cùng phương thì có thể cùng hướng hoặc ngược hướng.',
          'Nếu hai vectơ không cùng phương thì không thể so sánh hướng.'
        ]
      },
      {
        title: '3. Vectơ-Không (0)',
        badge: 'Đặc biệt',
        points: [
          'Vectơ-không là vectơ có điểm đầu và điểm cuối trùng nhau, ký hiệu 0 hoặc AA.',
          'Độ dài: |0| = 0.',
          'Quy ước: Vectơ 0 cùng phương và cùng hướng với mọi vectơ.'
        ]
      },
      {
        title: '4. Hai Vectơ Bằng Nhau',
        badge: 'Quan hệ',
        points: [
          'Hai vectơ a và b bằng nhau nếu chúng CÙNG HƯỚNG và CÙNG ĐỘ DÀI: a = b ⇔ (|a| = |b| và a ↑↑ b).',
          'Vectơ đối: a và b đối nhau nếu CÙNG ĐỘ DÀI nhưng NGƯỢC HƯỚNG: b = -a.',
          'Ứng dụng: Tứ giác ABCD là hình bình hành ⇔ AB = DC.'
        ]
      }
    ],
    highlights: [
      'Vectơ là đoạn thẳng có hướng',
      'Cùng phương: Giá song song hoặc trùng nhau',
      'Hai vectơ bằng nhau: Cùng hướng và cùng độ dài'
    ]
  },
  {
    id: 'mindmap-bai-08',
    baiCode: 'Bài 8',
    lessonNumber: 8,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 8: Tổng và hiệu của hai vectơ',
    shortTitle: 'Tổng và hiệu hai vectơ',
    filenameBase: 'Bai08_Tong-va-hieu-hai-vecto',
    centerTitle: 'TỔNG & HIỆU HAI VECTƠ',
    description: 'Quy tắc tam giác (ba điểm), quy tắc hình bình hành, quy tắc hiệu và tính chất trung điểm, trọng tâm tam giác.',
    branches: [
      {
        title: '1. Quy Tắc Tam Giác (Ba Điểm)',
        badge: 'Quy tắc cộng',
        points: [
          'Với ba điểm A, B, C bất kỳ: AB + BC = AC.',
          'Quy tắc nối đuôi: Điểm cuối của vectơ trước là điểm đầu của vectơ sau.',
          'Mở rộng quy tắc đa giác: A₁A₂ + A₂A₃ + ... + A_{n-1}An = A₁An.'
        ]
      },
      {
        title: '2. Quy Tắc Hình Bình Hành',
        badge: 'Hình bình hành',
        points: [
          'Nếu ABCD là hình bình hành: AB + AD = AC (vectơ đường chéo xuất phát từ chung gốc A).',
          'Ứng dụng: Hợp lực của hai lực đồng quy trong vật lý: F = F₁ + F₂.'
        ]
      },
      {
        title: '3. Hiệu Hai Vectơ & Quy Tắc Trừ',
        badge: 'Quy tắc trừ',
        points: [
          'Vectơ đối: a + (-a) = 0. Hiệu: a - b = a + (-b).',
          'Quy tắc chung gốc: Với ba điểm O, A, B bất kỳ: OB - OA = AB (ngọn trừ gốc).',
          'Quy tắc đảo: AB = -BA.'
        ]
      },
      {
        title: '4. Tính Chất Trung Điểm & Trọng Tâm',
        badge: 'Hình học',
        points: [
          'I là trung điểm AB ⇔ IA + IB = 0; Với điểm M bất kỳ: MA + MB = 2MI.',
          'G là trọng tâm tam giác ABC ⇔ GA + GB + GC = 0; Với điểm M bất kỳ: MA + MB + MC = 3MG.',
          'Kỹ năng phân tích một vectơ thành tổ hợp các vectơ cơ sở.'
        ]
      }
    ],
    highlights: [
      'Quy tắc 3 điểm: AB + BC = AC',
      'Quy tắc hình bình hành: AB + AD = AC',
      'Trung điểm I: MA + MB = 2MI · Trọng tâm G: MA + MB + MC = 3MG'
    ]
  },
  {
    id: 'mindmap-bai-09',
    baiCode: 'Bài 9',
    lessonNumber: 9,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 9: Tích của một vectơ với một số',
    shortTitle: 'Tích vectơ với một số',
    filenameBase: 'Bai09_Tich-vecto-voi-mot-so',
    centerTitle: 'TÍCH VECTƠ VỚI MỘT SỐ',
    description: 'Định nghĩa tích k·a, tính chất phép nhân, điều kiện hai vectơ cùng phương và phân tích vectơ.',
    branches: [
      {
        title: '1. Định Nghĩa Tích k·a',
        badge: 'Định nghĩa',
        points: [
          'Tích của số thực k với vectơ a là một vectơ, ký hiệu k·a.',
          'Độ dài: |k·a| = |k| · |a|.',
          'Hướng: k·a cùng hướng với a khi k > 0; ngược hướng với a khi k < 0.',
          'Quy ước: 0·a = 0; k·0 = 0.'
        ]
      },
      {
        title: '2. Các Tính Chất Của Phép Nhân',
        badge: 'Tính chất',
        points: [
          'Phân phối với phép cộng vectơ: k(a + b) = ka + kb.',
          'Phân phối với phép cộng số: (h + k)a = ha + ka.',
          'Kết hợp: h(ka) = (hk)a.',
          'Phần tử đơn vị: 1·a = a; (-1)·a = -a.'
        ]
      },
      {
        title: '3. Điều Kiện Hai Vectơ Cùng Phương',
        badge: 'Cùng phương',
        points: [
          'Hai vectơ a và b (b ≠ 0) cùng phương ⇔ tồn tại số k sao cho a = kb.',
          'Ứng dụng chứng minh ba điểm thẳng hàng: A, B, C thẳng hàng ⇔ tồn tại k sao cho AB = k·AC.',
          'Ứng dụng chứng minh hai đường thẳng song song: AB = k·CD (với AB và CD không cùng nằm trên một đường thẳng).'
        ]
      },
      {
        title: '4. Phân Tích Vectơ (Biểu Diễn)',
        badge: 'Cơ sở',
        points: [
          'Định lý: Cho hai vectơ không cùng phương e₁ và e₂. Mọi vectơ a đều biểu diễn duy nhất dạng: a = x·e₁ + y·e₂.',
          'Phương pháp: Đưa các vectơ về chung gốc hoặc biểu diễn qua các cạnh của hình đã cho.'
        ]
      }
    ],
    highlights: [
      '|k·a| = |k|·|a| · cùng hướng khi k > 0, ngược hướng khi k < 0',
      'A, B, C thẳng hàng ⇔ AB = k·AC',
      'Định lý biểu diễn một vectơ theo hai vectơ không cùng phương'
    ]
  },
  {
    id: 'mindmap-bai-10',
    baiCode: 'Bài 10',
    lessonNumber: 10,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 10: Vectơ trong mặt phẳng tọa độ',
    shortTitle: 'Vectơ trong tọa độ Oxy',
    filenameBase: 'Bai10_Vecto-trong-mat-phang-toa-do',
    centerTitle: 'VECTƠ TRONG TỌA ĐỘ OXY',
    description: 'Trục và hệ tọa độ Oxy, tọa độ của điểm và vectơ, tọa độ các phép toán, trung điểm, trọng tâm và khoảng cách.',
    branches: [
      {
        title: '1. Hệ Trục Tọa Độ Oxy',
        badge: 'Hệ tọa độ',
        points: [
          'Gồm hai trục Ox ⊥ Oy tại O. Vectơ đơn vị trên Ox là i = (1; 0), trên Oy là j = (0; 1) (|i| = |j| = 1, i ⊥ j).',
          'Tọa độ của vectơ u: u = x·i + y·j ⇔ u = (x; y).',
          'Tọa độ của điểm M: OM = x·i + y·j ⇔ M(x; y).'
        ]
      },
      {
        title: '2. Tọa Độ Các Phép Toán Vectơ',
        badge: 'Phép toán',
        points: [
          'Cho u = (x₁; y₁), v = (x₂; y₂):',
          'Tổng: u + v = (x₁ + x₂; y₁ + y₂); Hiệu: u - v = (x₁ - x₂; y₁ - y₂).',
          'Tích với số k: k·u = (k·x₁; k·y₁).',
          'Cùng phương: u và v cùng phương (v ≠ 0) ⇔ x₁/x₂ = y₁/y₂.'
        ]
      },
      {
        title: '3. Tọa Độ Vectơ Nối Hai Điểm & Độ Dài',
        badge: 'Điểm & Độ dài',
        points: [
          'Cho A(x_A; y_A) và B(x_B; y_B): AB = (x_B - x_A; y_B - y_A) (ngọn trừ gốc).',
          'Độ dài vectơ: |u| = √(x² + y²).',
          'Khoảng cách giữa hai điểm: AB = |AB| = √[(x_B - x_A)² + (y_B - y_A)²].'
        ]
      },
      {
        title: '4. Tọa Độ Trung Điểm & Trọng Tâm',
        badge: 'Điểm đặc biệt',
        points: [
          'Trung điểm I của AB: x_I = (x_A + x_B)/2; y_I = (y_A + y_B)/2.',
          'Trọng tâm G của tam giác ABC: x_G = (x_A + x_B + x_C)/3; y_G = (y_A + y_B + y_C)/3.'
        ]
      }
    ],
    highlights: [
      'u = (x; y) ⇔ u = x·i + y·j',
      'AB = (x_B - x_A; y_B - y_A) · Khoảng cách AB = √[(Δx)² + (Δy)²]',
      'Tọa độ trung điểm I và trọng tâm G'
    ]
  },
  {
    id: 'mindmap-bai-11',
    baiCode: 'Bài 11',
    lessonNumber: 11,
    isReview: false,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Bài 11: Tích vô hướng của hai vectơ',
    shortTitle: 'Tích vô hướng hai vectơ',
    filenameBase: 'Bai11_Tich-vo-huong-hai-vecto',
    centerTitle: 'TÍCH VÔ HƯỚNG HAI VECTƠ',
    description: 'Góc giữa hai vectơ, định nghĩa tích vô hướng, biểu thức tọa độ, điều kiện vuông góc và ứng dụng hình học.',
    branches: [
      {
        title: '1. Góc Giữa Hai Vectơ',
        badge: 'Góc',
        points: [
          'Cho hai vectơ a và b khác 0. Từ O vẽ OA = a, OB = b. Góc AOB (0° ≤ (a, b) ≤ 180°) là góc giữa hai vectơ.',
          'Hai vectơ cùng hướng: góc bằng 0°; ngược hướng: góc bằng 180°.',
          'Hai vectơ vuông góc: (a, b) = 90° ⇔ a ⊥ b.'
        ]
      },
      {
        title: '2. Định Nghĩa Tích Vô Hướng',
        badge: 'Định nghĩa',
        points: [
          'Tích vô hướng của hai vectơ a và b là một SỐ THỰC, ký hiệu a · b.',
          'Công thức hình học: a · b = |a| · |b| · cos(a, b).',
          'Bình phương vô hướng: a² = a · a = |a|² (luôn ≥ 0).',
          'Điều kiện vuông góc: a ⊥ b ⇔ a · b = 0 (với a, b ≠ 0).'
        ]
      },
      {
        title: '3. Biểu Thức Tọa Độ Của Tích Vô Hướng',
        badge: 'Tọa độ',
        points: [
          'Cho a = (x₁; y₁), b = (x₂; y₂): a · b = x₁·x₂ + y₁·y₂ (hoành nhân hoành + tung nhân tung).',
          'Độ dài: |a| = √(x₁² + y₁²).',
          'Góc giữa hai vectơ: cos(a, b) = (x₁·x₂ + y₁·y₂) / [√(x₁² + y₁²) · √(x₂² + y₂²)].',
          'Hai vectơ vuông góc: a ⊥ b ⇔ x₁·x₂ + y₁·y₂ = 0.'
        ]
      },
      {
        title: '4. Tính Chất & Ứng Dụng Vật Lý',
        badge: 'Ứng dụng',
        points: [
          'Giao hoán: a · b = b · a; Phân phối: a · (b + c) = a · b + a · c.',
          'Công cơ học trong Vật lý: A = F · s = |F| · |s| · cosα.'
        ]
      }
    ],
    highlights: [
      'a · b = |a|·|b|·cos(a, b) · Bình phương vô hướng a² = |a|²',
      'Biểu thức tọa độ: a · b = x₁x₂ + y₁y₂',
      'Điều kiện vuông góc: a ⊥ b ⇔ x₁x₂ + y₁y₂ = 0'
    ]
  },
  {
    id: 'mindmap-bai-11z',
    baiCode: 'Ôn tập Chương IV',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 4,
    chapterRoman: 'Chương IV',
    chapterTitle: 'Vectơ',
    title: 'Ôn tập Chương IV: Vectơ',
    shortTitle: 'Tổng kết Chương IV',
    filenameBase: 'Bai11z_OnTap_ChuongIV_Vecto',
    centerTitle: 'TỔNG ÔN CHƯƠNG IV',
    description: 'Hệ thống hóa toàn diện hình học vectơ, quy tắc biến đổi hình học và công cụ tọa độ giải toán phẳng.',
    branches: [
      {
        title: '1. Hệ Thống Quy Tắc Vectơ Hình Học',
        badge: 'Quy tắc',
        points: [
          'Quy tắc 3 điểm: AB + BC = AC · Quy tắc trừ: OB - OA = AB.',
          'Quy tắc hình bình hành: AB + AD = AC.',
          'Hệ thức trung điểm: MA + MB = 2MI · Hệ thức trọng tâm: MA + MB + MC = 3MG.'
        ]
      },
      {
        title: '2. Bản Đồ Tọa Độ Vectơ Trong Oxy',
        badge: 'Tọa độ',
        points: [
          'Tọa độ: u = (x; y) ⇔ u = x·i + y·j; AB = (x_B - x_A; y_B - y_A).',
          'Độ dài: |u| = √(x² + y²); Khoảng cách AB = √[(Δx)² + (Δy)²].',
          'Trung điểm: I = (A + B)/2; Trọng tâm: G = (A + B + C)/3.'
        ]
      },
      {
        title: '3. Tích Vô Hướng & Ứng Dụng',
        badge: 'Tích vô hướng',
        points: [
          'Hình học: a · b = |a|·|b|·cosα; Tọa độ: a · b = x₁x₂ + y₁y₂.',
          'Chứng minh vuông góc: a ⊥ b ⇔ a · b = 0 ⇔ x₁x₂ + y₁y₂ = 0.',
          'Tính góc giữa hai đường thẳng / vectơ qua công thức cos.'
        ]
      },
      {
        title: '4. Các Dạng Toán Thường Gặp',
        badge: 'Dạng toán',
        points: [
          'Dạng 1: Phân tích vectơ và chứng minh ba điểm thẳng hàng.',
          'Dạng 2: Tìm tọa độ điểm thỏa mãn đẳng thức vectơ (tìm đỉnh D của hình bình hành).',
          'Dạng 3: Bài toán tìm quỹ tích điểm thỏa mãn |MA + MB| = k hoặc MA · MB = 0.'
        ]
      }
    ],
    highlights: [
      'Sơ đồ liên kết quy tắc cộng, trừ & tích vectơ',
      'Chuyển đổi linh hoạt giữa ngôn ngữ hình học thuần túy và tọa độ',
      'Ứng dụng tích vô hướng giải bài toán góc và khoảng cách'
    ]
  },

  // ==================== CHƯƠNG V: CÁC SỐ ĐẶC TRƯNG MẪU SỐ LIỆU ====================
  {
    id: 'mindmap-bai-12',
    baiCode: 'Bài 12',
    lessonNumber: 12,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 12: Số gần đúng và sai số',
    shortTitle: 'Số gần đúng và sai số',
    filenameBase: 'Bai12_So-gan-dung-va-sai-so',
    centerTitle: 'SỐ GẦN ĐÚNG & SAI SỐ',
    description: 'Số gần đúng, sai số tuyệt đối, độ chính xác d, sai số tương đối và quy tắc làm tròn số chuẩn.',
    branches: [
      {
        title: '1. Khái Niệm Số Gần Đúng',
        badge: 'Định nghĩa',
        points: [
          'Trong thực tế đo đạc, tính toán, ta thường chỉ nhận được số gần đúng a của số đúng ā.',
          'Ký hiệu: a ≈ ā. Ví dụ: π ≈ 3,14; √2 ≈ 1,414.'
        ]
      },
      {
        title: '2. Sai Số Tuyệt Đối & Độ Chính Xác',
        badge: 'Sai số',
        points: [
          'Sai số tuyệt đối: Δ_a = |ā - a| (thường không biết chính xác vì không biết ā).',
          'Độ chính xác d: Nếu Δ_a ≤ d thì ta viết ā = a ± d.',
          'Ý nghĩa: Số đúng ā nằm trong đoạn [a - d; a + d].'
        ]
      },
      {
        title: '3. Sai Số Tương Đối',
        badge: 'Đánh giá',
        points: [
          'Sai số tương đối: δ_a = Δ_a / |a| ≤ d / |a|.',
          'Thường biểu diễn dưới dạng phần trăm (%). δ_a càng nhỏ thì phép đo càng chính xác.'
        ]
      },
      {
        title: '4. Quy Tắc Làm Tròn Số Chuẩn',
        badge: 'Quy tắc',
        points: [
          'Nếu chữ số ngay sau hàng làm tròn < 5: Giữ nguyên hàng làm tròn.',
          'Nếu chữ số ngay sau hàng làm tròn ≥ 5: Tăng hàng làm tròn thêm 1 đơn vị.',
          'Làm tròn theo độ chính xác d: Làm tròn số a đến hàng cao hơn hàng của chữ số khác 0 đầu tiên của d một bậc.'
        ]
      }
    ],
    highlights: [
      'Sai số tuyệt đối Δ_a = |ā - a| ≤ d',
      'Số đúng ā nằm trong khoảng [a - d; a + d]',
      'Quy tắc làm tròn số dựa vào độ chính xác d'
    ]
  },
  {
    id: 'mindmap-bai-13',
    baiCode: 'Bài 13',
    lessonNumber: 13,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 13: Các số đặc trưng đo xu thế trung tâm',
    shortTitle: 'Số đặc trưng xu thế trung tâm',
    filenameBase: 'Bai13_So-dac-trung-xu-the-trung-tam',
    centerTitle: 'ĐO XU THẾ TRUNG TÂM',
    description: 'Số trung bình, trung vị, tứ phân vị Q1, Q2, Q3 và mốt của mẫu số liệu không ghép nhóm.',
    branches: [
      {
        title: '1. Số Trung Bình (x̄)',
        badge: 'Trung bình',
        points: [
          'Công thức: x̄ = (x₁ + x₂ + ... + x_n) / n = ∑(n_i · x_i) / n.',
          'Ý nghĩa: Đại diện cho mức độ trung bình của toàn bộ mẫu số liệu.',
          'Hạn chế: Rất nhạy cảm và bị ảnh hưởng mạnh bởi các giá trị ngoại lệ (quá lớn hoặc quá bé).'
        ]
      },
      {
        title: '2. Số Trung Vị (Me)',
        badge: 'Trung vị',
        points: [
          'Sắp xếp mẫu số liệu theo thứ tự không giảm: x₁ ≤ x₂ ≤ ... ≤ x_n.',
          'Nếu n lẻ: Me = x_{(n+1)/2} (chính giữa).',
          'Nếu n chẵn: Me = (x_{n/2} + x_{n/2 + 1}) / 2 (trung bình cộng 2 số ở giữa).',
          'Ưu điểm: Không bị ảnh hưởng bởi giá trị ngoại lệ bất thường.'
        ]
      },
      {
        title: '3. Tứ Phân Vị (Q₁, Q₂, Q₃)',
        badge: 'Tứ phân vị',
        points: [
          'Tứ phân vị thứ hai: Q₂ = Me (chia mẫu thành 2 nửa bằng nhau: nửa dưới và nửa trên).',
          'Tứ phân vị thứ nhất: Q₁ = trung vị của nửa số liệu bên dưới Q₂.',
          'Tứ phân vị thứ ba: Q₃ = trung vị của nửa số liệu bên trên Q₂.',
          'Bộ tứ phân vị chia mẫu số liệu thành 4 phần xấp xỉ 25% mỗi phần.'
        ]
      },
      {
        title: '4. Mốt (Mo)',
        badge: 'Mốt',
        points: [
          'Định nghĩa: Giá trị có tần số xuất hiện LỚN NHẤT trong mẫu số liệu.',
          'Một mẫu có thể có 1 mốt, nhiều mốt hoặc không có mốt.',
          'Ý nghĩa: Thường dùng trong khảo sát thị trường, cỡ giày, kích thước phổ biến nhất.'
        ]
      }
    ],
    highlights: [
      'Số trung bình x̄ = ∑x_i / n (đại diện tổng thể)',
      'Trung vị Me (không bị ảnh hưởng bởi giá trị đột biến)',
      'Bộ tứ phân vị Q₁, Q₂, Q₃ chia mẫu thành 4 phần 25%'
    ]
  },
  {
    id: 'mindmap-bai-14',
    baiCode: 'Bài 14',
    lessonNumber: 14,
    isReview: false,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Bài 14: Các số đặc trưng đo độ phân tán',
    shortTitle: 'Số đặc trưng đo độ phân tán',
    filenameBase: 'Bai14_So-dac-trung-do-phan-tan',
    centerTitle: 'ĐO ĐỘ PHÂN TÁN',
    description: 'Khoảng biến thiên, khoảng tứ phân vị, giá trị ngoại lệ, phương sai và độ lệch chuẩn.',
    branches: [
      {
        title: '1. Khoảng Biến Thiên (R)',
        badge: 'Biến thiên',
        points: [
          'Định nghĩa: R = x_max - x_min (hiệu số giữa giá trị lớn nhất và giá trị nhỏ nhất).',
          'Ý nghĩa: Đo độ phân tán của toàn bộ mẫu số liệu.',
          'Hạn chế: Chỉ phụ thuộc vào 2 giá trị cực biên, dễ bị méo mó bởi giá trị ngoại lệ.'
        ]
      },
      {
        title: '2. Khoảng Tứ Phân Vị (ΔQ)',
        badge: 'Khoảng tứ phân',
        points: [
          'Định nghĩa: ΔQ = Q₃ - Q₁.',
          'Ý nghĩa: Đo độ phân tán của 50% số liệu ở chính giữa.',
          'Ưu điểm: Không bị ảnh hưởng bởi các giá trị bất thường ở hai đầu.'
        ]
      },
      {
        title: '3. Giá Trị Ngoại Lệ (Bất Thường)',
        badge: 'Ngoại lệ',
        points: [
          'Giá trị x được gọi là ngoại lệ nếu:',
          'x < Q₁ - 1,5 · ΔQ  HOẶC  x > Q₃ + 1,5 · ΔQ.',
          'Quy tắc 1.5 IQR giúp phát hiện dữ liệu nhập sai hoặc hiện tượng đột biến trong thí nghiệm.'
        ]
      },
      {
        title: '4. Phương Sai (s²) & Độ Lệch Chuẩn (s)',
        badge: 'Phương sai & s',
        points: [
          'Phương sai: s² = ∑(x_i - x̄)² / n = (1/n) · ∑x_i² - (x̄)².',
          'Độ lệch chuẩn: s = √(s²).',
          'Ý nghĩa: Đo mức độ phân tán của các số liệu xung quanh số trung bình x̄.',
          's càng nhỏ: số liệu càng tập trung và ổn định; s càng lớn: số liệu càng phân tán rời rạc.'
        ]
      }
    ],
    highlights: [
      'Khoảng biến thiên R = x_max - x_min',
      'Khoảng tứ phân vị ΔQ = Q₃ - Q₁',
      'Quy tắc phát hiện giá trị ngoại lệ: [Q₁ - 1.5ΔQ; Q₃ + 1.5ΔQ]',
      'Độ lệch chuẩn s = √(s²) đo mức độ ổn định'
    ]
  },
  {
    id: 'mindmap-bai-14z',
    baiCode: 'Ôn tập Chương V',
    lessonNumber: null,
    isReview: true,
    chapterNumber: 5,
    chapterRoman: 'Chương V',
    chapterTitle: 'Các số đặc trưng của mẫu số liệu không ghép nhóm',
    title: 'Ôn tập Chương V: Các số đặc trưng của mẫu số liệu',
    shortTitle: 'Tổng kết Chương V',
    filenameBase: 'Bai14z_OnTap_ChuongV_So-dac-trung',
    centerTitle: 'TỔNG ÔN CHƯƠNG V',
    description: 'Bảng đối chiếu toàn diện số đặc trưng xu thế trung tâm và độ phân tán, kỹ năng bấm máy Casio và đọc biểu đồ hộp (Box plot).',
    branches: [
      {
        title: '1. So Sánh Đo Xu Thế Trung Tâm',
        badge: 'Trung tâm',
        points: [
          'x̄ (Trung bình): Phù hợp khi số liệu phân bố đều, không có đột biến.',
          'Me (Trung vị): Tốt nhất khi mẫu số liệu có giá trị ngoại lệ quá lệch.',
          'Mo (Mốt): Dùng cho dữ liệu định tính, khảo sát thị hiếu thị trường.'
        ]
      },
      {
        title: '2. So Sánh Đo Độ Phân Tán',
        badge: 'Phân tán',
        points: [
          'R (Biến thiên): Đo độ trải rộng toàn bộ.',
          'ΔQ (Khoảng tứ phân vị): Đo độ trải 50% ở giữa.',
          's², s (Phương sai, độ lệch chuẩn): Đo độ ổn định xung quanh trung bình.'
        ]
      },
      {
        title: '3. Biểu Đồ Hộp (Box Plot)',
        badge: 'Biểu đồ',
        points: [
          '5 số tóm tắt: min, Q₁, Me (Q₂), Q₃, max.',
          'Hộp thể hiện khoảng [Q₁; Q₃] với vạch trung vị Me bên trong.',
          'Râu hộp kéo dài tới min và max (không kể các điểm ngoại lệ).'
        ]
      },
      {
        title: '4. Kỹ Năng Bấm Máy Tính Casio',
        badge: 'Casio',
        points: [
          'Bật chế độ Thống kê (Menu 6 ➔ 1: 1-Variable).',
          'Bật cột tần số (Shift ➔ Menu ➔ Giảm ➔ Thống kê ➔ Mở tần số).',
          'Nhập bảng số liệu ➔ Nhấn OPTN ➔ 3 (1-Variable Calc) để đọc x̄, s, min, Q₁, Me, Q₃, max.'
        ]
      }
    ],
    highlights: [
      'Bảng phân loại: Đo xu thế trung tâm vs Đo độ phân tán',
      'Quy trình dựng biểu đồ hộp 5 số tóm tắt',
      'Thao tác Casio đọc nhanh mọi số đặc trưng'
    ]
  }
];

module.exports = {
  MINDMAPS_DATA_PART2
};
