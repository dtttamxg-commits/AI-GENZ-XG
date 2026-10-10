const fs = require('fs');
const path = require('path');
const { buildGameHtml, gamesDir } = require('./template_engine.cjs');

// 8. GAME 18: GIẢI MÃ PHƯƠNG TRÌNH QUY VỀ BẬC HAI
const g18 = buildGameHtml({
  id: 'game-18-giai-ma-phuong-trinh',
  title: 'Giải Mã Phương Trình Quy Về Bậc Hai',
  subTitle: 'Phương trình chứa căn bậc hai: √(f(x)) = √(g(x)) và √(f(x)) = g(x)',
  chapterBadge: 'Chương 3: Phương Trình Bậc Hai',
  accentColor: '#14B8A6',
  stages: ['Dạng √(f(x)) = √(g(x))', 'Dạng √(f(x)) = g(x)', 'Loại nghiệm ngoại lai', 'Ứng dụng giải toán'],
  questions: [
    {
      stage: 1,
      question: 'Để giải phương trình dạng √(f(x)) = √(g(x)), bước biến đổi căn bản nhất là gì?',
      options: [
        { label: 'Bình phương hai vế để được f(x) = g(x), sau đó thay nghiệm vào thử lại hoặc đặt điều kiện f(x) ≥ 0' },
        { label: 'Lấy căn bậc hai hai vế' },
        { label: 'Chia cả hai vế cho f(x)' },
        { label: 'Cộng hai vế với 1' }
      ],
      correct: 0,
      explanation: 'Theo SGK Toán 10: Bình phương hai vế phương trình √(f(x)) = √(g(x)) ta được phương trình hệ quả f(x) = g(x). Sau khi giải tìm nghiệm, ta thử lại vào phương trình ban đầu để loại bỏ nghiệm ngoại lai.'
    },
    {
      stage: 1,
      question: 'Số nghiệm của phương trình √(x² - 3x + 2) = √(x - 1) là:',
      options: [
        { label: '2 nghiệm (x = 1 và x = 3)' },
        { label: '1 nghiệm' },
        { label: 'Vô nghiệm' },
        { label: '3 nghiệm' }
      ],
      correct: 0,
      explanation: 'Bình phương hai vế: x² - 3x + 2 = x - 1 ⇔ x² - 4x + 3 = 0 ⇔ x = 1 hoặc x = 3. Thử lại: x = 1 (căn bằng 0) và x = 3 (căn bằng √2), cả hai đều thỏa mãn.'
    },
    {
      stage: 2,
      question: 'Khi giải phương trình √(f(x)) = g(x), điều kiện bắt buộc để vế phải có thể bằng căn bậc hai là:',
      options: [
        { label: 'g(x) ≥ 0' },
        { label: 'g(x) ≤ 0' },
        { label: 'g(x) ≠ 0' },
        { label: 'Không cần điều kiện gì của g(x)' }
      ],
      correct: 0,
      explanation: 'Vì vế trái √(f(x)) ≥ 0 nên vế phải g(x) bắt buộc phải không âm (g(x) ≥ 0) thì phương trình mới có thể có nghiệm.'
    },
    {
      stage: 2,
      question: 'Giải phương trình √(2x - 1) = x - 2. Nghiệm của phương trình là:',
      options: [
        { label: 'x = 5 (nghiệm x = 1 bị loại vì vế phải âm)' },
        { label: 'x = 1 và x = 5' },
        { label: 'x = 1' },
        { label: 'Vô nghiệm' }
      ],
      correct: 0,
      explanation: 'Bình phương hai vế: 2x - 1 = (x - 2)² = x² - 4x + 4 ⇔ x² - 6x + 5 = 0 ⇔ x = 1 hoặc x = 5. Với x = 1 thì vế phải 1 - 2 = -1 < 0 (loại). Với x = 5 thì 5 - 2 = 3 > 0, √(9) = 3 (thỏa mãn). Vậy chỉ có nghiệm x = 5.'
    },
    {
      stage: 3,
      question: 'Nghiệm ngoại lai trong việc giải phương trình chứa căn phát sinh do nguyên nhân nào?',
      options: [
        { label: 'Phép bình phương hai vế nói chung là phép biến đổi hệ quả (không tương đương nếu chưa xét dấu)' },
        { label: 'Cộng trừ hai vế' },
        { label: 'Nhân hai vế với một số' },
        { label: 'Chuyển vế đổi dấu' }
      ],
      correct: 0,
      explanation: 'Bình phương hai vế A = B ⇒ A² = B² chỉ là phép suy ra hệ quả, có thể nảy sinh nghiệm của phương trình A = -B (khi B < 0).'
    },
    {
      stage: 3,
      question: 'Tập nghiệm của phương trình √(3x² - 9x + 1) = x - 2 là:',
      options: [
        { label: 'S = {3}' },
        { label: 'S = {3; -½}' },
        { label: 'S = ∅' },
        { label: 'S = {2}' }
      ],
      correct: 0,
      explanation: 'Bình phương hai vế: 3x² - 9x + 1 = x² - 4x + 4 ⇔ 2x² - 5x - 3 = 0 ⇔ x = 3 hoặc x = -1/2. Điều kiện x - 2 ≥ 0 ⇔ x ≥ 2. Vậy loại x = -1/2, nhận x = 3.'
    },
    {
      stage: 4,
      question: 'Phương trình √(x² - 4) = x - 2 có nghiệm là:',
      options: [
        { label: 'x = 2' },
        { label: 'x = -2' },
        { label: 'x = 0' },
        { label: 'Vô số nghiệm' }
      ],
      correct: 0,
      explanation: 'Bình phương: x² - 4 = x² - 4x + 4 ⇔ 4x = 8 ⇔ x = 2. Thử lại: √(0) = 2 - 2 = 0 (thỏa mãn). Vậy nghiệm là x = 2.'
    },
    {
      stage: 4,
      question: 'Khoảng cách d từ một trạm cứu hộ đến bờ biển được mô hình hóa bởi phương trình √(x² + 9) = 5. Giá trị x > 0 là:',
      options: [
        { label: 'x = 4' },
        { label: 'x = 16' },
        { label: 'x = 2' },
        { label: 'x = 3' }
      ],
      correct: 0,
      explanation: '√(x² + 9) = 5 ⇔ x² + 9 = 25 ⇔ x² = 16 ⇔ x = 4 (do x > 0).'
    }
  ]
});

// 9. GAME 19: GIẢI MÃ ĐƯỜNG THẲNG TRONG OXY
const g19 = buildGameHtml({
  id: 'game-19-giai-ma-duong-thang',
  title: 'Giải Mã Phương Trình Đường Thẳng Oxy',
  subTitle: 'Vectơ chỉ phương u, vectơ pháp tuyến n, phương trình tham số & tổng quát',
  chapterBadge: 'Chương 7: Tọa Độ Mặt Phẳng',
  accentColor: '#3B82F6',
  stages: ['VTCP & VTPT', 'PT Tổng quát ax+by+c=0', 'PT Tham số', 'Chuyển đổi dạng PT'],
  questions: [
    {
      stage: 1,
      question: 'Vectơ chỉ phương <span class="vec">u</span> và vectơ pháp tuyến <span class="vec">n</span> của cùng một đường thẳng có mối quan hệ gì?',
      options: [
        { label: '<span class="vec">u</span> ⊥ <span class="vec">n</span> (tích vô hướng <span class="vec">u</span> · <span class="vec">n</span> = 0)' },
        { label: '<span class="vec">u</span> cùng phương <span class="vec">n</span>' },
        { label: '|<span class="vec">u</span>| = |<span class="vec">n</span>|' },
        { label: '<span class="vec">u</span> = -<span class="vec">n</span>' }
      ],
      correct: 0,
      explanation: 'VTCP song song hoặc trùng với đường thẳng, còn VTPT vuông góc với đường thẳng. Do đó VTCP vuông góc với VTPT, tức <span class="vec">u</span> · <span class="vec">n</span> = 0.'
    },
    {
      stage: 1,
      question: 'Nếu đường thẳng Δ có một vectơ pháp tuyến <span class="vec">n</span> = (a; b) thì một vectơ chỉ phương của Δ là:',
      options: [
        { label: '<span class="vec">u</span> = (-b; a) hoặc (b; -a)' },
        { label: '<span class="vec">u</span> = (a; b)' },
        { label: '<span class="vec">u</span> = (a; -b)' },
        { label: '<span class="vec">u</span> = (b; a)' }
      ],
      correct: 0,
      explanation: 'Vì a·(-b) + b·a = -ab + ab = 0, nên (-b; a) hoặc (b; -a) là một VTCP của đường thẳng.'
    },
    {
      stage: 2,
      question: 'Đường thẳng đi qua điểm M(x₀; y₀) và nhận <span class="vec">n</span> = (a; b) làm VTPT có phương trình tổng quát là:',
      options: [
        { label: 'a(x - x₀) + b(y - y₀) = 0' },
        { label: 'b(x - x₀) + a(y - y₀) = 0' },
        { label: 'a(x + x₀) + b(y + y₀) = 0' },
        { label: '(x - x₀)/a = (y - y₀)/b' }
      ],
      correct: 0,
      explanation: 'Phương trình tổng quát xuất phát từ điều kiện <span class="vec">n</span> · <span class="vec">M₀M</span> = 0 ⇔ a(x - x₀) + b(y - y₀) = 0.'
    },
    {
      stage: 2,
      question: 'Đường thẳng Δ: 2x - 3y + 5 = 0 có một vectơ pháp tuyến là:',
      options: [
        { label: '<span class="vec">n</span> = (2; -3)' },
        { label: '<span class="vec">n</span> = (2; 3)' },
        { label: '<span class="vec">n</span> = (3; 2)' },
        { label: '<span class="vec">n</span> = (-3; 2)' }
      ],
      correct: 0,
      explanation: 'Hệ số của x và y trong phương trình tổng quát ax + by + c = 0 chính là tọa độ của một VTPT: <span class="vec">n</span> = (a; b) = (2; -3).'
    },
    {
      stage: 3,
      question: 'Phương trình tham số của đường thẳng đi qua A(1; 2) và có VTCP <span class="vec">u</span> = (3; -1) là:',
      options: [
        { label: 'x = 1 + 3t, y = 2 - t (t ∈ R)' },
        { label: 'x = 3 + t, y = -1 + 2t' },
        { label: 'x = 1 - 3t, y = 2 - t' },
        { label: 'x = 2 + 3t, y = 1 - t' }
      ],
      correct: 0,
      explanation: 'Dạng tham số: x = x₀ + u₁t và y = y₀ + u₂t. Thay x₀ = 1, y₀ = 2, u₁ = 3, u₂ = -1 ta được x = 1 + 3t, y = 2 - t.'
    },
    {
      stage: 3,
      question: 'Điểm nào sau đây thuộc đường thẳng tham số x = 2 - t, y = 3 + 2t?',
      options: [
        { label: 'A(1; 5) (ứng với t = 1)' },
        { label: 'B(2; 3)' },
        { label: 'C(0; 7)' },
        { label: 'Cả ba điểm trên đều thuộc đường thẳng' }
      ],
      correct: 3,
      explanation: 'Với t = 0 được (2; 3); với t = 1 được (1; 5); với t = 2 được (0; 7). Vậy cả 3 điểm đều thuộc đường thẳng!'
    },
    {
      stage: 4,
      question: 'Đường thẳng đi qua hai điểm A(1; 3) và B(3; 7) có vectơ chỉ phương là:',
      options: [
        { label: '<span class="vec">AB</span> = (2; 4) cùng phương (1; 2)' },
        { label: '<span class="vec">AB</span> = (4; 10)' },
        { label: '<span class="vec">AB</span> = (2; -4)' },
        { label: '<span class="vec">AB</span> = (-2; 4)' }
      ],
      correct: 0,
      explanation: '<span class="vec">AB</span> = (3 - 1; 7 - 3) = (2; 4) = 2(1; 2).'
    },
    {
      stage: 4,
      question: 'Phương trình tổng quát của đường thẳng đi qua gốc tọa độ O(0; 0) và có hệ số góc k = 2 là:',
      options: [
        { label: '2x - y = 0' },
        { label: 'x - 2y = 0' },
        { label: '2x + y = 0' },
        { label: 'y = 2' }
      ],
      correct: 0,
      explanation: 'y = kx = 2x ⇔ 2x - y = 0.'
    }
  ]
});

// 10. GAME 20: ĐỊNH VỊ ĐƯỜNG THẲNG (VỊ TRÍ TƯƠNG ĐỐI, GÓC, KHOẢNG CÁCH)
const g20 = buildGameHtml({
  id: 'game-20-dinh-vi-duong-thang',
  title: 'Định Vị Đường Thẳng: Vị Trí, Góc & Khoảng Cách',
  subTitle: 'Cắt nhau, song song, trùng nhau, góc giữa 2 đường & khoảng cách d(M, Δ)',
  chapterBadge: 'Chương 7: Tọa Độ Mặt Phẳng',
  accentColor: '#6366F1',
  stages: ['Vị trí tương đối', 'Góc giữa hai đường thẳng', 'Công thức khoảng cách', 'Vận dụng tổng hợp'],
  questions: [
    {
      stage: 1,
      question: 'Hai đường thẳng d₁: 2x - y + 1 = 0 và d₂: 4x - 2y + 5 = 0 có vị trí tương đối thế nào?',
      options: [
        { label: 'Song song với nhau' },
        { label: 'Cắt nhau nhưng không vuông góc' },
        { label: 'Trùng nhau' },
        { label: 'Vuông góc với nhau' }
      ],
      correct: 0,
      explanation: 'Tỉ số các hệ số: 2/4 = (-1)/(-2) = 1/2 ≠ 1/5. Do đó d₁ và d₂ song song với nhau.'
    },
    {
      stage: 1,
      question: 'Hai đường thẳng d₁: a₁x + b₁y + c₁ = 0 và d₂: a₂x + b₂y + c₂ = 0 vuông góc với nhau khi và chỉ khi:',
      options: [
        { label: 'a₁a₂ + b₁b₂ = 0' },
        { label: 'a₁b₂ - a₂b₁ = 0' },
        { label: 'a₁/a₂ = b₁/b₂' },
        { label: 'a₁a₂ - b₁b₂ = 0' }
      ],
      correct: 0,
      explanation: 'Hai đường thẳng vuông góc khi hai VTPT của chúng vuông góc: <span class="vec">n₁</span> · <span class="vec">n₂</span> = 0 ⇔ a₁a₂ + b₁b₂ = 0.'
    },
    {
      stage: 2,
      question: 'Góc giữa hai đường thẳng bất kỳ luôn có số đo nằm trong đoạn nào?',
      options: [
        { label: '[0°; 90°]' },
        { label: '[0°; 180°]' },
        { label: '(0°; 90°)' },
        { label: '[0°; 360°]' }
      ],
      correct: 0,
      explanation: 'Quy ước trong hình học: Góc giữa hai đường thẳng luôn là góc nhọn hoặc góc vuông, tức nằm trong đoạn [0°; 90°].'
    },
    {
      stage: 2,
      question: 'Công thức tính khoảng cách từ điểm M(x₀; y₀) đến đường thẳng Δ: ax + by + c = 0 là:',
      options: [
        { label: 'd(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²)' },
        { label: 'd(M, Δ) = (ax₀ + by₀ + c) / √(a² + b²)' },
        { label: 'd(M, Δ) = |ax₀ + by₀ + c| / (a² + b²)' },
        { label: 'd(M, Δ) = |ax₀ + by₀| / √(a² + b²)' }
      ],
      correct: 0,
      explanation: 'Khoảng cách từ điểm đến đường thẳng: d(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²).'
    },
    {
      stage: 3,
      question: 'Tính khoảng cách từ gốc tọa độ O(0; 0) đến đường thẳng Δ: 3x - 4y + 10 = 0?',
      options: [
        { label: 'd(O, Δ) = 2' },
        { label: 'd(O, Δ) = 10' },
        { label: 'd(O, Δ) = 5' },
        { label: 'd(O, Δ) = 2,5' }
      ],
      correct: 0,
      explanation: 'd(O, Δ) = |3(0) - 4(0) + 10| / √(3² + (-4)²) = 10 / √25 = 10 / 5 = 2.'
    },
    {
      stage: 3,
      question: 'Giao điểm của hai đường thẳng d₁: x + y - 4 = 0 và d₂: 2x - y - 2 = 0 là:',
      options: [
        { label: '(2; 2)' },
        { label: '(1; 3)' },
        { label: '(3; 1)' },
        { label: '(0; 4)' }
      ],
      correct: 0,
      explanation: 'Giải hệ: { x + y = 4; 2x - y = 2 }. Cộng hai phương trình: 3x = 6 ⇒ x = 2; thay vào y = 4 - 2 = 2. Giao điểm là (2; 2).'
    },
    {
      stage: 4,
      question: 'Góc giữa hai đường thẳng d₁: x + 2y - 1 = 0 và d₂: 2x - y + 5 = 0 bằng:',
      options: [
        { label: '90°' },
        { label: '45°' },
        { label: '60°' },
        { label: '0°' }
      ],
      correct: 0,
      explanation: 'a₁a₂ + b₁b₂ = 1·2 + 2·(-1) = 2 - 2 = 0. Tích vô hướng hai VTPT bằng 0 nên hai đường thẳng vuông góc (góc 90°).'
    },
    {
      stage: 4,
      question: 'Khoảng cách giữa hai đường thẳng song song d₁: 3x + 4y - 1 = 0 và d₂: 3x + 4y + 9 = 0 bằng:',
      options: [
        { label: '2' },
        { label: '10' },
        { label: '1,5' },
        { label: '8' }
      ],
      correct: 0,
      explanation: 'Chọn điểm M(-3; 0) thuộc d₂ (vì 3(-3)+9=0). d(d₁, d₂) = d(M, d₁) = |3(-3) + 4(0) - 1| / √(3² + 4²) = |-10| / 5 = 2.'
    }
  ]
});

// 11. GAME 21: TRUY TÌM TÂM ĐƯỜNG TRÒN
const g21 = buildGameHtml({
  id: 'game-21-truy-tim-tam-duong-tron',
  title: 'Truy Tìm Tâm & Bán Kính Đường Tròn Oxy',
  subTitle: 'Phương trình chính tắc (x-a)² + (y-b)² = R² & phương trình tiếp tuyến',
  chapterBadge: 'Chương 7: Đường Tròn Oxy',
  accentColor: '#0EA5E9',
  stages: ['Tâm I & Bán kính R', 'Dạng khai triển x²+y²-2ax-2by+c=0', 'Điều kiện là đường tròn', 'Phương trình tiếp tuyến'],
  questions: [
    {
      stage: 1,
      question: 'Phương trình đường tròn tâm I(a; b), bán kính R có dạng chính tắc là:',
      options: [
        { label: '(x - a)² + (y - b)² = R²' },
        { label: '(x + a)² + (y + b)² = R²' },
        { label: '(x - a)² - (y - b)² = R²' },
        { label: '(x - a) + (y - b) = R' }
      ],
      correct: 0,
      explanation: 'Định nghĩa: Tập hợp điểm M(x; y) cách tâm I(a; b) một khoảng R có phương trình IM² = R² ⇔ (x - a)² + (y - b)² = R².'
    },
    {
      stage: 1,
      question: 'Đường tròn (C): (x - 3)² + (y + 2)² = 25 có tâm I và bán kính R là:',
      options: [
        { label: 'I(3; -2), R = 5' },
        { label: 'I(-3; 2), R = 25' },
        { label: 'I(3; -2), R = 25' },
        { label: 'I(-3; 2), R = 5' }
      ],
      correct: 0,
      explanation: 'So sánh với (x - a)² + (y - b)² = R²: a = 3, b = -2, R² = 25 ⇒ R = 5. Tâm I(3; -2), R = 5.'
    },
    {
      stage: 2,
      question: 'Phương trình x² + y² - 2ax - 2by + c = 0 là phương trình đường tròn khi và chỉ khi:',
      options: [
        { label: 'a² + b² - c > 0' },
        { label: 'a² + b² - c ≥ 0' },
        { label: 'a² + b² - c < 0' },
        { label: 'a² + b² = c' }
      ],
      correct: 0,
      explanation: 'Bán kính R = √(a² + b² - c). Để tồn tại đường tròn có bán kính dương thì biểu thức dưới căn phải dương: a² + b² - c > 0.'
    },
    {
      stage: 2,
      question: 'Xác định tâm I và bán kính R của đường tròn (C): x² + y² - 4x + 6y - 12 = 0?',
      options: [
        { label: 'I(2; -3), R = 5' },
        { label: 'I(-2; 3), R = 5' },
        { label: 'I(4; -6), R = 12' },
        { label: 'I(2; -3), R = 25' }
      ],
      correct: 0,
      explanation: 'a = (-4)/(-2) = 2; b = 6/(-2) = -3; c = -12. R = √(2² + (-3)² - (-12)) = √(4 + 9 + 12) = √25 = 5. Tâm I(2; -3), R = 5.'
    },
    {
      stage: 3,
      question: 'Đường tròn có đường kính AB với A(1; 1) và B(5; 3) có tâm là:',
      options: [
        { label: 'I(3; 2) (trung điểm của AB)' },
        { label: 'I(2; 1)' },
        { label: 'I(4; 2)' },
        { label: 'I(6; 4)' }
      ],
      correct: 0,
      explanation: 'Tâm đường tròn đường kính AB chính là trung điểm I của đoạn thẳng AB: x_I = (1 + 5)/2 = 3; y_I = (1 + 3)/2 = 2 ⇒ I(3; 2).'
    },
    {
      stage: 3,
      question: 'Phương trình tiếp tuyến của đường tròn (C): (x - 1)² + (y - 2)² = 25 tại điểm M(4; 6) là:',
      options: [
        { label: '3x + 4y - 36 = 0' },
        { label: '4x + 3y - 25 = 0' },
        { label: '3x - 4y + 12 = 0' },
        { label: 'x + 2y - 16 = 0' }
      ],
      correct: 0,
      explanation: 'Tiếp tuyến đi qua M(4; 6) và nhận <span class="vec">IM</span> = (4 - 1; 6 - 2) = (3; 4) làm VTPT: 3(x - 4) + 4(y - 6) = 0 ⇔ 3x + 4y - 36 = 0.'
    },
    {
      stage: 4,
      question: 'Vị trí tương đối của đường thẳng Δ: x + y - 2 = 0 và đường tròn (C): x² + y² = 2 là:',
      options: [
        { label: 'Tiếp xúc nhau (vì d(O, Δ) = R = √2)' },
        { label: 'Cắt nhau tại 2 điểm phân biệt' },
        { label: 'Không giao nhau' },
        { label: 'Đi qua tâm đường tròn' }
      ],
      correct: 0,
      explanation: 'Tâm O(0; 0), R = √2. Khoảng cách d(O, Δ) = |0 + 0 - 2| / √(1² + 1²) = 2 / √2 = √2 = R. Khoảng cách bằng bán kính nên đường thẳng tiếp xúc với đường tròn.'
    },
    {
      stage: 4,
      question: 'Phương trình đường tròn đi qua gốc tọa độ O(0; 0) và có tâm I(3; 4) là:',
      options: [
        { label: '(x - 3)² + (y - 4)² = 25' },
        { label: '(x - 3)² + (y - 4)² = 5' },
        { label: '(x + 3)² + (y + 4)² = 25' },
        { label: 'x² + y² = 25' }
      ],
      correct: 0,
      explanation: 'Bán kính R = IO = √(3² + 4²) = 5. Phương trình là (x - 3)² + (y - 4)² = 25.'
    }
  ]
});

// 12. GAME 22: KHÁM PHÁ BA ĐƯỜNG CONIC
const g22 = buildGameHtml({
  id: 'game-22-kham-pha-ba-duong-conic',
  title: 'Khám Phá Ba Đường Conic: Elip, Hypebol & Parabol',
  subTitle: 'Phương trình chính tắc, tiêu điểm, tiêu cự, trục đối xứng & ứng dụng vũ trụ',
  chapterBadge: 'Chương 7: Ba Đường Conic',
  accentColor: '#A855F7',
  stages: ['Đường Elip (E)', 'Đường Hypebol (H)', 'Đường Parabol (P)', 'Nhận diện & Ứng dụng'],
  questions: [
    {
      stage: 1,
      question: 'Phương trình chính tắc của đường Elip (E) có dạng:',
      options: [
        { label: 'x²/a² + y²/b² = 1 (với a > b > 0)' },
        { label: 'x²/a² - y²/b² = 1' },
        { label: 'y² = 2px' },
        { label: 'x² + y² = R²' }
      ],
      correct: 0,
      explanation: 'Phương trình chính tắc của đường Elip trong SGK: x²/a² + y²/b² = 1 với a > b > 0 và mối liên hệ a² = b² + c².'
    },
    {
      stage: 1,
      question: 'Cho Elip (E): x²/25 + y²/9 = 1. Tiêu cự 2c của elip bằng bao nhiêu?',
      options: [
        { label: '2c = 8 (vì c² = 25 - 9 = 16 ⇒ c = 4)' },
        { label: '2c = 10' },
        { label: '2c = 6' },
        { label: '2c = 16' }
      ],
      correct: 0,
      explanation: 'a² = 25, b² = 9 ⇒ c² = a² - b² = 25 - 9 = 16 ⇒ c = 4. Tiêu cự là 2c = 2·4 = 8.'
    },
    {
      stage: 2,
      question: 'Phương trình chính tắc của đường Hypebol (H) có dạng:',
      options: [
        { label: 'x²/a² - y²/b² = 1 (với a > 0, b > 0)' },
        { label: 'x²/a² + y²/b² = 1' },
        { label: 'y² = 2px' },
        { label: 'xy = 1' }
      ],
      correct: 0,
      explanation: 'Hypebol có phương trình chính tắc là hiệu hai bình phương: x²/a² - y²/b² = 1 với c² = a² + b².'
    },
    {
      stage: 2,
      question: 'Mối quan hệ giữa a, b, c trong đường Hypebol (H): x²/a² - y²/b² = 1 là:',
      options: [
        { label: 'c² = a² + b²' },
        { label: 'a² = b² + c²' },
        { label: 'b² = a² + c²' },
        { label: 'c = a + b' }
      ],
      correct: 0,
      explanation: 'Trong hypebol, tiêu cự 2c lớn hơn trục thực 2a, nên c² = a² + b² (khác với elip là a² = b² + c²).'
    },
    {
      stage: 3,
      question: 'Phương trình chính tắc của Parabol (P) có dạng:',
      options: [
        { label: 'y² = 2px (với tham số tiêu p > 0)' },
        { label: 'y = ax² + bx + c' },
        { label: 'x² - y² = 1' },
        { label: 'x²/a² + y²/b² = 1' }
      ],
      correct: 0,
      explanation: 'Phương trình chính tắc của parabol trong hệ tọa độ Oxy chuẩn có đỉnh tại gốc O là y² = 2px (p > 0).'
    },
    {
      stage: 3,
      question: 'Parabol y² = 8x có tham số tiêu p và tiêu điểm F là:',
      options: [
        { label: 'p = 4, F(2; 0)' },
        { label: 'p = 8, F(4; 0)' },
        { label: 'p = 2, F(1; 0)' },
        { label: 'p = 4, F(0; 2)' }
      ],
      correct: 0,
      explanation: '2p = 8 ⇒ p = 4. Tiêu điểm F có tọa độ (p/2; 0) = (4/2; 0) = (2; 0).'
    },
    {
      stage: 4,
      question: 'Quỹ đạo chuyển động của các hành tinh trong hệ Mặt Trời quanh Mặt Trời theo định luật Kepler I là:',
      options: [
        { label: 'Đường Elip với Mặt Trời nằm ở một trong hai tiêu điểm' },
        { label: 'Đường tròn hoàn hảo' },
        { label: 'Đường Parabol' },
        { label: 'Đường Hypebol' }
      ],
      correct: 0,
      explanation: 'Định luật Kepler thứ nhất: Mọi hành tinh đều chuyển động quanh Mặt Trời theo các quỹ đạo elip với Mặt Trời là một tiêu điểm.'
    },
    {
      stage: 4,
      question: 'Gương phản xạ trong đèn pin hoặc kính thiên văn thường có mặt cắt là đường gì để hội tụ các tia sáng song song tại tiêu điểm?',
      options: [
        { label: 'Parabol' },
        { label: 'Elip' },
        { label: 'Hypebol' },
        { label: 'Đường thẳng' }
      ],
      correct: 0,
      explanation: 'Tính chất quang học kì diệu của Parabol: Mọi tia sáng xuất phát từ tiêu điểm phản xạ qua mặt cong parabol đều cho chùm tia song song với trục đối xứng (và ngược lại).'
    }
  ]
});

// 13. GAME 23: QUY TẮC ĐẾM
const g23 = buildGameHtml({
  id: 'game-23-quy-tac-dem',
  title: 'Quy Tắc Đếm: Quy Tắc Cộng & Quy Tắc Nhân',
  subTitle: 'Phương pháp phân chia trường hợp, các công đoạn liên tiếp & sơ đồ hình cây',
  chapterBadge: 'Chương 8: Đại Số Tổ Hợp',
  accentColor: '#F97316',
  stages: ['Quy tắc cộng', 'Quy tắc nhân', 'Phối hợp cộng & nhân', 'Sơ đồ hình cây'],
  questions: [
    {
      stage: 1,
      question: 'Khi một công việc có thể hoàn thành bởi một trong hai phương án A (có m cách) HOẶC phương án B (có n cách, không trùng lặp), số cách hoàn thành công việc là:',
      options: [
        { label: 'm + n cách (Quy tắc cộng)' },
        { label: 'm · n cách' },
        { label: 'm - n cách' },
        { label: 'm / n cách' }
      ],
      correct: 0,
      explanation: 'Quy tắc cộng áp dụng cho các <strong>phương án độc lập/loại trừ nhau</strong>: Chỉ cần thực hiện một trong hai phương án là xong công việc ⇒ m + n cách.'
    },
    {
      stage: 1,
      question: 'Một học sinh có 5 áo sơ mi trắng và 4 áo sơ mi xanh. Bạn có bao nhiêu cách chọn 1 chiếc áo sơ mi để mặc đi học?',
      options: [
        { label: '5 + 4 = 9 cách' },
        { label: '5 · 4 = 20 cách' },
        { label: '5 cách' },
        { label: '4 cách' }
      ],
      correct: 0,
      explanation: 'Chọn 1 áo trắng HOẶC 1 áo xanh. Áp dụng quy tắc cộng: 5 + 4 = 9 cách chọn.'
    },
    {
      stage: 2,
      question: 'Khi một công việc phải hoàn thành qua hai công đoạn LIÊN TIẾP: công đoạn 1 có m cách, công đoạn 2 có n cách. Số cách hoàn thành công việc là:',
      options: [
        { label: 'm · n cách (Quy tắc nhân)' },
        { label: 'm + n cách' },
        { label: 'm^n cách' },
        { label: 'n^m cách' }
      ],
      correct: 0,
      explanation: 'Quy tắc nhân áp dụng cho các <strong>công đoạn liên tiếp nối nhau</strong>: Phải thực hiện hết tất cả các công đoạn mới hoàn thành công việc ⇒ m · n cách.'
    },
    {
      stage: 2,
      question: 'Từ Hà Nội đi Đà Nẵng có 3 cách di chuyển (máy bay, tàu hỏa, xe khách). Từ Đà Nẵng đi TP.HCM có 4 cách. Số cách đi từ Hà Nội đến TP.HCM qua Đà Nẵng là:',
      options: [
        { label: '3 · 4 = 12 cách' },
        { label: '3 + 4 = 7 cách' },
        { label: '3⁴ = 81 cách' },
        { label: '4³ = 64 cách' }
      ],
      correct: 0,
      explanation: 'Hành trình gồm 2 công đoạn liên tiếp: HN → ĐN (3 cách), sau đó ĐN → HCM (4 cách). Theo quy tắc nhân: 3 · 4 = 12 cách.'
    },
    {
      stage: 3,
      question: 'Có bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau lập từ các chữ số {1, 2, 3, 4, 5}?',
      options: [
        { label: '5 · 4 · 3 = 60 số' },
        { label: '5³ = 125 số' },
        { label: '5 + 4 + 3 = 12 số' },
        { label: '20 số' }
      ],
      correct: 0,
      explanation: 'Gọi số cần lập là abc: Chữ số a có 5 cách chọn; chữ số b có 4 cách (khác a); chữ số c có 3 cách (khác a, b). Theo quy tắc nhân: 5 · 4 · 3 = 60 số.'
    },
    {
      stage: 3,
      question: 'Một thực đơn trưa gồm 3 món khai vị, 5 món chính và 4 món tráng miệng. Hỏi có bao nhiêu cách chọn một bữa ăn đủ 3 món?',
      options: [
        { label: '3 · 5 · 4 = 60 cách' },
        { label: '3 + 5 + 4 = 12 cách' },
        { label: '20 cách' },
        { label: '15 cách' }
      ],
      correct: 0,
      explanation: 'Phải chọn đủ 3 món liên tiếp: khai vị (3) × món chính (5) × tráng miệng (4) = 60 cách.'
    },
    {
      stage: 4,
      question: 'Có bao nhiêu biển số xe gồm 4 chữ số (từ 0 đến 9), các chữ số có thể lặp lại?',
      options: [
        { label: '10 · 10 · 10 · 10 = 10 000 số' },
        { label: '9 · 10 · 10 · 10 = 9 000 số' },
        { label: '10! số' },
        { label: '5 040 số' }
      ],
      correct: 0,
      explanation: 'Mỗi vị trí trong 4 vị trí đều có 10 sự lựa chọn (từ 0 đến 9): 10⁴ = 10 000 biển số.'
    },
    {
      stage: 4,
      question: 'Gieo một con xúc xắc cân đối hai lần liên tiếp. Số phần tử của không gian mẫu (số kết quả có thể xảy ra) là:',
      options: [
        { label: '6 · 6 = 36' },
        { label: '6 + 6 = 12' },
        { label: '6' },
        { label: '2⁶ = 64' }
      ],
      correct: 0,
      explanation: 'Lần gieo thứ nhất có 6 kết quả, lần gieo thứ hai có 6 kết quả. Số kết quả là 6 · 6 = 36.'
    }
  ]
});

// 14. GAME 24: HOÁN VỊ, CHỈNH HỢP VÀ TỔ HỢP
const g24 = buildGameHtml({
  id: 'game-24-hoan-vi-chinh-hop-to-hop',
  title: 'Hoán Vị, Chỉnh Hợp & Tổ Hợp',
  subTitle: 'P_n = n!, Chỉnh hợp A_n^k, Tổ hợp C_n^k & nghệ thuật phân biệt bài toán',
  chapterBadge: 'Chương 8: Đại Số Tổ Hợp',
  accentColor: '#EAB308',
  stages: ['Hoán vị P_n', 'Chỉnh hợp A_n^k', 'Tổ hợp C_n^k', 'Phân biệt A & C'],
  questions: [
    {
      stage: 1,
      question: 'Số hoán vị của n phần tử (kí hiệu P_n) được tính bởi công thức:',
      options: [
        { label: 'P_n = n! = n · (n - 1) · ... · 1' },
        { label: 'P_n = n²' },
        { label: 'P_n = 2^n' },
        { label: 'P_n = n · (n + 1) / 2' }
      ],
      correct: 0,
      explanation: 'Định nghĩa hoán vị: Sắp xếp thứ tự n phần tử có P_n = n! (giai thừa của n).'
    },
    {
      stage: 1,
      question: 'Có bao nhiêu cách xếp 5 học sinh thành một hàng dọc?',
      options: [
        { label: 'P₅ = 5! = 120 cách' },
        { label: '5 cách' },
        { label: '25 cách' },
        { label: '60 cách' }
      ],
      correct: 0,
      explanation: 'Xếp 5 học sinh vào 5 vị trí thứ tự là một hoán vị của 5: P₅ = 5! = 5 · 4 · 3 · 2 · 1 = 120 cách.'
    },
    {
      stage: 2,
      question: 'Chỉnh hợp chập k của n phần tử (A_n^k) khác với Tổ hợp chập k của n phần tử (C_n^k) ở điểm mấu chốt nào?',
      options: [
        { label: 'Chỉnh hợp CÓ phân biệt thứ tự sắp xếp; Tổ hợp KHÔNG phân biệt thứ tự (chỉ chọn nhóm)' },
        { label: 'Chỉnh hợp không có thứ tự; Tổ hợp có thứ tự' },
        { label: 'Chỉnh hợp lấy tất cả n phần tử; Tổ hợp chỉ lấy 1' },
        { label: 'Không có điểm gì khác nhau' }
      ],
      correct: 0,
      explanation: 'Điểm cốt lõi: Chọn k người và xếp vào các chức vụ (hoặc thứ tự) là Chỉnh hợp A_n^k. Chọn k người đi lao động (bình đẳng, không phân biệt thứ tự) là Tổ hợp C_n^k.'
    },
    {
      stage: 2,
      question: 'Công thức tính số chỉnh hợp chập k của n phần tử là:',
      options: [
        { label: 'A_n^k = n! / (n - k)!' },
        { label: 'A_n^k = n! / (k! · (n - k)!)' },
        { label: 'A_n^k = n! · k!' },
        { label: 'A_n^k = (n - k)! / n!' }
      ],
      correct: 0,
      explanation: 'A_n^k = n! / (n - k)! = n(n - 1)...(n - k + 1).'
    },
    {
      stage: 3,
      question: 'Công thức tính số tổ hợp chập k của n phần tử là:',
      options: [
        { label: 'C_n^k = n! / (k! · (n - k)!)' },
        { label: 'C_n^k = n! / (n - k)!' },
        { label: 'C_n^k = k! / n!' },
        { label: 'C_n^k = A_n^k · k!' }
      ],
      correct: 0,
      explanation: 'Số tổ hợp: C_n^k = n! / [k! · (n - k)!] = A_n^k / k!.'
    },
    {
      stage: 3,
      question: 'Một lớp có 30 học sinh. Có bao nhiêu cách chọn ra một ban cán sự gồm 1 Lớp trưởng, 1 Lớp phó và 1 Bí thư?',
      options: [
        { label: 'A₃₀³ = 30 · 29 · 28 = 24 360 cách (vì các vị trí có phân biệt chức vụ/thứ tự)' },
        { label: 'C₃₀³ = 4 060 cách' },
        { label: '30³ = 27 000 cách' },
        { label: '90 cách' }
      ],
      correct: 0,
      explanation: 'Vì 3 vị trí đảm nhiệm 3 chức vụ khác nhau nên bài toán có phân biệt thứ tự ⇒ Chỉnh hợp A₃₀³ = 24 360.'
    },
    {
      stage: 4,
      question: 'Có bao nhiêu cách chọn một nhóm 3 học sinh từ 10 học sinh để tham gia dọn vệ sinh?',
      options: [
        { label: 'C₁₀³ = 10! / (3! · 7!) = 120 cách' },
        { label: 'A₁₀³ = 720 cách' },
        { label: '30 cách' },
        { label: '1 000 cách' }
      ],
      correct: 0,
      explanation: 'Chọn 3 bạn cùng đi trực nhật không phân biệt vai trò thứ tự nên là Tổ hợp: C₁₀³ = (10 · 9 · 8) / (3 · 2 · 1) = 120 cách.'
    },
    {
      stage: 4,
      question: 'Tính chất đối xứng cơ bản của tổ hợp là:',
      options: [
        { label: 'C_n^k = C_n^(n - k)' },
        { label: 'C_n^k = C_n^(k + 1)' },
        { label: 'C_n^k = -C_n^(n - k)' },
        { label: 'C_n^k = 1' }
      ],
      correct: 0,
      explanation: 'Chọn k phần tử để lấy ra cũng tương đương với chọn (n - k) phần tử để để lại: C_n^k = C_n^(n - k).'
    }
  ]
});

// 15. GAME 25: NHỊ THỨC NEWTON
const g25 = buildGameHtml({
  id: 'game-25-nhi-thuc-newton',
  title: 'Nhị Thức Newton & Tam Giác Pascal',
  subTitle: 'Khai triển (a + b)⁴, (a + b)⁵, hệ số nhị thức & tìm hệ số số hạng',
  chapterBadge: 'Chương 8: Đại Số Tổ Hợp',
  accentColor: '#10B981',
  stages: ['Tam giác Pascal', 'Khai triển (a + b)⁴', 'Khai triển (a + b)⁵', 'Tìm hệ số số hạng'],
  questions: [
    {
      stage: 1,
      question: 'Số lượng số hạng trong khai triển nhị thức Newton của (a + b)ⁿ là:',
      options: [
        { label: 'n + 1 số hạng' },
        { label: 'n số hạng' },
        { label: 'n - 1 số hạng' },
        { label: '2n số hạng' }
      ],
      correct: 0,
      explanation: 'Trong khai triển nhị thức Newton (a + b)ⁿ có tất cả n + 1 số hạng (chỉ số chạy từ k = 0 đến k = n).'
    },
    {
      stage: 1,
      question: 'Hàng thứ 4 của tam giác Pascal (các hệ số của (a + b)⁴) gồm các số nào?',
      options: [
        { label: '1, 4, 6, 4, 1' },
        { label: '1, 3, 3, 1' },
        { label: '1, 5, 10, 10, 5, 1' },
        { label: '1, 2, 1' }
      ],
      correct: 0,
      explanation: 'Các hệ số nhị thức C₄⁰, C₄¹, C₄², C₄³, C₄⁴ lần lượt là: 1, 4, 6, 4, 1.'
    },
    {
      stage: 2,
      question: 'Khai triển đúng của (a + b)⁴ là:',
      options: [
        { label: 'a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴' },
        { label: 'a⁴ + b⁴' },
        { label: 'a⁴ + 4a³b + 4ab³ + b⁴' },
        { label: 'a⁴ + 6a²b² + b⁴' }
      ],
      correct: 0,
      explanation: 'Theo công thức nhị thức Newton: (a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴.'
    },
    {
      stage: 2,
      question: 'Trong khai triển của (a + b)ⁿ, tổng số mũ của a và b trong mỗi số hạng luôn bằng:',
      options: [
        { label: 'Bằng đúng số mũ n' },
        { label: 'Bằng n + 1' },
        { label: 'Bằng 2n' },
        { label: 'Thay đổi tùy số hạng' }
      ],
      correct: 0,
      explanation: 'Mỗi số hạng có dạng C_n^k · a^(n - k) · b^k, tổng số mũ là (n - k) + k = n.'
    },
    {
      stage: 3,
      question: 'Hàng thứ 5 của tam giác Pascal (các hệ số của (a + b)⁵) là:',
      options: [
        { label: '1, 5, 10, 10, 5, 1' },
        { label: '1, 4, 6, 4, 1' },
        { label: '1, 6, 15, 20, 15, 6, 1' },
        { label: '1, 5, 5, 1' }
      ],
      correct: 0,
      explanation: 'C₅⁰=1, C₅¹=5, C₅²=10, C₅³=10, C₅⁴=5, C₅⁵=1.'
    },
    {
      stage: 3,
      question: 'Khai triển của (x - 1)⁴ là:',
      options: [
        { label: 'x⁴ - 4x³ + 6x² - 4x + 1' },
        { label: 'x⁴ + 4x³ + 6x² + 4x + 1' },
        { label: 'x⁴ - 4x³ - 6x² - 4x - 1' },
        { label: 'x⁴ - 1' }
      ],
      correct: 0,
      explanation: 'Thay a = x, b = -1: Dấu đan xen: x⁴ + 4x³(-1) + 6x²(-1)² + 4x(-1)³ + (-1)⁴ = x⁴ - 4x³ + 6x² - 4x + 1.'
    },
    {
      stage: 4,
      question: 'Hệ số của x³ trong khai triển của (x + 2)⁴ là:',
      options: [
        { label: '4 · 2 = 8' },
        { label: '4' },
        { label: '6 · 4 = 24' },
        { label: '16' }
      ],
      correct: 0,
      explanation: 'Số hạng chứa x³ là C₄¹ · x³ · 2¹ = 4 · 2 · x³ = 8x³. Vậy hệ số là 8.'
    },
    {
      stage: 4,
      question: 'Tổng các hệ số trong khai triển của (1 + 1)⁵ (tức C₅⁰ + C₅¹ + C₅² + C₅³ + C₅⁴ + C₅⁵) bằng:',
      options: [
        { label: '2⁵ = 32' },
        { label: '25' },
        { label: '16' },
        { label: '64' }
      ],
      correct: 0,
      explanation: 'Thay a = 1, b = 1 vào (a + b)⁵ ta được: 2⁵ = 32 = tổng các hệ số nhị thức.'
    }
  ]
});

// Write games 18 to 25
fs.writeFileSync(path.join(gamesDir, 'game-18-giai-ma-phuong-trinh.html'), g18);
fs.writeFileSync(path.join(gamesDir, 'game-18-phuong-trinh-quy-ve-bac-hai.html'), g18);
console.log('Created game-18-giai-ma-phuong-trinh.html');

fs.writeFileSync(path.join(gamesDir, 'game-19-giai-ma-duong-thang.html'), g19);
fs.writeFileSync(path.join(gamesDir, 'game-19-phuong-trinh-duong-thang.html'), g19);
console.log('Created game-19-giai-ma-duong-thang.html');

fs.writeFileSync(path.join(gamesDir, 'game-20-dinh-vi-duong-thang.html'), g20);
fs.writeFileSync(path.join(gamesDir, 'game-20-vi-tri-tuong-doi-goc-khoang-cach.html'), g20);
console.log('Created game-20-dinh-vi-duong-thang.html');

fs.writeFileSync(path.join(gamesDir, 'game-21-truy-tim-tam-duong-tron.html'), g21);
fs.writeFileSync(path.join(gamesDir, 'game-21-duong-tron-trong-mat-phang-toa-do.html'), g21);
console.log('Created game-21-truy-tim-tam-duong-tron.html');

fs.writeFileSync(path.join(gamesDir, 'game-22-kham-pha-ba-duong-conic.html'), g22);
fs.writeFileSync(path.join(gamesDir, 'game-22-ba-duong-conic.html'), g22);
console.log('Created game-22-kham-pha-ba-duong-conic.html');

fs.writeFileSync(path.join(gamesDir, 'game-23-quy-tac-dem.html'), g23);
console.log('Created game-23-quy-tac-dem.html');

fs.writeFileSync(path.join(gamesDir, 'game-24-hoan-vi-chinh-hop-to-hop.html'), g24);
console.log('Created game-24-hoan-vi-chinh-hop-to-hop.html');

fs.writeFileSync(path.join(gamesDir, 'game-25-nhi-thuc-newton.html'), g25);
console.log('Created game-25-nhi-thuc-newton.html');
