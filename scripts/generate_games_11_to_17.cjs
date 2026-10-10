const fs = require('fs');
const path = require('path');
const { buildGameHtml, gamesDir } = require('./template_engine.cjs');

// 1. GAME 11: GIẢI MÃ TÍCH VÔ HƯỚNG CỦA HAI VECTƠ
const g11 = buildGameHtml({
  id: 'game-11-tich-vo-huong',
  title: 'Giải Mã Tích Vô Hướng Của Hai Vectơ',
  subTitle: 'Công thức tích vô hướng, góc giữa hai vectơ & điều kiện vuông góc',
  chapterBadge: 'Chương 4: Vectơ',
  accentColor: '#38BDF8',
  stages: ['Định nghĩa & Góc', 'Tọa độ tích vô hướng', 'Tính vuông góc & Độ dài', 'Ứng dụng thực tế'],
  questions: [
    {
      stage: 1,
      question: 'Cho hai vectơ <span class="vec">u</span> và <span class="vec">v</span> khác <span class="vec">0</span>. Tích vô hướng của <span class="vec">u</span> và <span class="vec">v</span> được xác định bởi công thức nào?',
      options: [
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = |<span class="vec">u</span>| · |<span class="vec">v</span>| · cos(<span class="vec">u</span>, <span class="vec">v</span>)' },
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = |<span class="vec">u</span>| · |<span class="vec">v</span>| · sin(<span class="vec">u</span>, <span class="vec">v</span>)' },
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = |<span class="vec">u</span>| + |<span class="vec">v</span>| + cos(<span class="vec">u</span>, <span class="vec">v</span>)' },
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = |<span class="vec">u</span>| · |<span class="vec">v</span>| · tan(<span class="vec">u</span>, <span class="vec">v</span>)' }
      ],
      correct: 0,
      explanation: 'Theo định nghĩa trong SGK Toán 10: Tích vô hướng của hai vectơ là một <strong>số thực</strong> bằng tích độ dài hai vectơ nhân với côsin của góc giữa hai vectơ đó: <span class="vec">u</span> · <span class="vec">v</span> = |<span class="vec">u</span>| · |<span class="vec">v</span>| · cos(<span class="vec">u</span>, <span class="vec">v</span>).'
    },
    {
      stage: 1,
      question: 'Hai vectơ <span class="vec">u</span> và <span class="vec">v</span> (khác vectơ-không) vuông góc với nhau khi và chỉ khi:',
      options: [
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = 1' },
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = 0' },
        { label: '|<span class="vec">u</span>| = |<span class="vec">v</span>|' },
        { label: '<span class="vec">u</span> · <span class="vec">v</span> = -1' }
      ],
      correct: 1,
      explanation: 'Vì khi hai vectơ vuông góc, góc giữa chúng bằng 90° và cos(90°) = 0, nên tích vô hướng <span class="vec">u</span> · <span class="vec">v</span> = 0.'
    },
    {
      stage: 2,
      question: 'Trong mặt phẳng tọa độ Oxy, cho <span class="vec">a</span> = (x₁; y₁) và <span class="vec">b</span> = (x₂; y₂). Biểu thức tọa độ của tích vô hướng <span class="vec">a</span> · <span class="vec">b</span> là:',
      options: [
        { label: '<span class="vec">a</span> · <span class="vec">b</span> = x₁y₂ + x₂y₁' },
        { label: '<span class="vec">a</span> · <span class="vec">b</span> = x₁x₂ - y₁y₂' },
        { label: '<span class="vec">a</span> · <span class="vec">b</span> = x₁x₂ + y₁y₂' },
        { label: '<span class="vec">a</span> · <span class="vec">b</span> = (x₁ + x₂)(y₁ + y₂)' }
      ],
      correct: 2,
      explanation: 'Biểu thức tọa độ của tích vô hướng: <span class="vec">a</span> · <span class="vec">b</span> = x₁x₂ + y₁y₂ (tổng tích hoành độ và tích tung độ).'
    },
    {
      stage: 2,
      question: 'Cho tam giác đều ABC cạnh bằng a. Tính tích vô hướng <span class="vec">AB</span> · <span class="vec">AC</span>?',
      options: [
        { label: 'a²' },
        { label: '½ a²' },
        { label: '-½ a²' },
        { label: '√3/2 a²' }
      ],
      correct: 1,
      explanation: 'Tam giác đều ABC có AB = AC = a và góc A = 60°. Do đó: <span class="vec">AB</span> · <span class="vec">AC</span> = |<span class="vec">AB</span>| · |<span class="vec">AC</span>| · cos(60°) = a · a · ½ = ½ a².'
    },
    {
      stage: 3,
      question: 'Cho <span class="vec">u</span> = (2; -3) và <span class="vec">v</span> = (6; 4). Giá trị của tích vô hướng <span class="vec">u</span> · <span class="vec">v</span> bằng bao nhiêu?',
      options: [
        { label: '0 (Hai vectơ vuông góc)' },
        { label: '24' },
        { label: '-12' },
        { label: '12' }
      ],
      correct: 0,
      explanation: '<span class="vec">u</span> · <span class="vec">v</span> = 2·6 + (-3)·4 = 12 - 12 = 0. Do đó tích vô hướng bằng 0 và hai vectơ vuông góc nhau!'
    },
    {
      stage: 3,
      question: 'Độ dài của vectơ <span class="vec">a</span> = (3; -4) được tính theo bình phương vô hướng là:',
      options: [
        { label: '|<span class="vec">a</span>| = √(3² + (-4)²) = 5' },
        { label: '|<span class="vec">a</span>| = 3 - 4 = -1' },
        { label: '|<span class="vec">a</span>| = 7' },
        { label: '|<span class="vec">a</span>| = 25' }
      ],
      correct: 0,
      explanation: 'Bình phương vô hướng: |<span class="vec">a</span>|² = <span class="vec">a</span>² = x² + y² = 3² + (-4)² = 25 ⇒ |<span class="vec">a</span>| = 5.'
    },
    {
      stage: 4,
      question: 'Một lực <span class="vec">F</span> có độ lớn 50 N tác dụng lên vật làm vật di chuyển một quãng đường s = 10 m cùng hướng chuyển động (góc α = 0°). Công A sinh ra bởi lực là:',
      options: [
        { label: 'A = 500 J' },
        { label: 'A = 0 J' },
        { label: 'A = 250 J' },
        { label: 'A = 50 J' }
      ],
      correct: 0,
      explanation: 'Công cơ học trong Vật lý là một tích vô hướng: A = <span class="vec">F</span> · <span class="vec">d</span> = |F| · |d| · cos(0°) = 50 · 10 · 1 = 500 Jun (J).'
    },
    {
      stage: 4,
      question: 'Góc giữa hai vectơ <span class="vec">a</span> = (1; 0) và <span class="vec">b</span> = (1; 1) bằng:',
      options: [
        { label: '45°' },
        { label: '30°' },
        { label: '60°' },
        { label: '90°' }
      ],
      correct: 0,
      explanation: 'cos(<span class="vec">a</span>, <span class="vec">b</span>) = (1·1 + 0·1) / (√(1² + 0²) · √(1² + 1²)) = 1 / √2 ⇒ góc giữa hai vectơ là 45°.'
    }
  ]
});

// 2. GAME 12: THÁM TỬ SAI SỐ (SỐ GẦN ĐÚNG VÀ SAI SỐ)
const g12 = buildGameHtml({
  id: 'game-12-tham-tu-sai-so',
  title: 'Thám Tử Sai Số & Số Gần Đúng',
  subTitle: 'Sai số tuyệt đối, sai số tương đối, quy tròn & độ chính xác d',
  chapterBadge: 'Chương 5: Thống Kê',
  accentColor: '#10B981',
  stages: ['Số gần đúng', 'Sai số tuyệt đối & d', 'Quy tròn chuẩn', 'Sai số tương đối'],
  questions: [
    {
      stage: 1,
      question: 'Nếu a là số gần đúng của số đúng ā thì đại lượng Δa = |ā - a| được gọi là gì?',
      options: [
        { label: 'Sai số tuyệt đối của số gần đúng a' },
        { label: 'Sai số tương đối của số gần đúng a' },
        { label: 'Độ chính xác của phép đo' },
        { label: 'Số trung bình' }
      ],
      correct: 0,
      explanation: 'Định nghĩa: Đại lượng Δa = |ā - a| phản ánh mức độ chênh lệch tuyệt đối giữa giá trị đúng và giá trị gần đúng, gọi là sai số tuyệt đối.'
    },
    {
      stage: 1,
      question: 'Khi viết kết quả đo chiều dài l = 15,2 ± 0,2 m, số d = 0,2 m thể hiện điều gì?',
      options: [
        { label: 'Độ chính xác của phép đo (Δl ≤ 0,2)' },
        { label: 'Chiều dài thực sự của vật luôn bằng 0,2 m' },
        { label: 'Sai số tương đối là 20%' },
        { label: 'Chiều dài đo lần thứ hai' }
      ],
      correct: 0,
      explanation: 'Kí hiệu a ± d có nghĩa là số đúng ā nằm trong khoảng [a - d; a + d], tức là sai số tuyệt đối không vượt quá d (Δa ≤ d), d gọi là độ chính xác.'
    },
    {
      stage: 2,
      question: 'Quy tròn số 3,14159 đến chữ số thập phân thứ hai (hàng phần trăm) ta được kết quả:',
      options: [
        { label: '3,14' },
        { label: '3,15' },
        { label: '3,142' },
        { label: '3,1' }
      ],
      correct: 0,
      explanation: 'Chữ số ngay sau hàng phần trăm là 1 (< 5), theo quy tắc làm tròn thì giữ nguyên chữ số hàng phần trăm: 3,14.'
    },
    {
      stage: 2,
      question: 'Cho số gần đúng a = 12563 với độ chính xác d = 30. Hàng quy tròn thích hợp của a là:',
      options: [
        { label: 'Hàng trăm (vì d = 30 ở hàng chục, nên quy tròn đến hàng trăm)' },
        { label: 'Hàng đơn vị' },
        { label: 'Hàng chục' },
        { label: 'Hàng nghìn' }
      ],
      correct: 0,
      explanation: 'Quy tắc: Độ chính xác d = 30 ở hàng chục, ta phải quy tròn số gần đúng a đến hàng cao hơn một bậc là hàng trăm. Do đó 12563 làm tròn đến hàng trăm là 12600.'
    },
    {
      stage: 3,
      question: 'Sai số tương đối δa của số gần đúng a được tính bằng công thức nào?',
      options: [
        { label: 'δa = Δa / |a|' },
        { label: 'δa = Δa · |a|' },
        { label: 'δa = |a| / Δa' },
        { label: 'δa = Δa - |a|' }
      ],
      correct: 0,
      explanation: 'Tỉ số giữa sai số tuyệt đối Δa và giá trị tuyệt đối của số gần đúng |a| chính là sai số tương đối δa = Δa / |a| (thường biểu diễn theo phần trăm).'
    },
    {
      stage: 3,
      question: 'Phép đo cây bút chì l₁ = 15 cm ± 0,1 cm và đo sân bóng l₂ = 100 m ± 0,2 m. Phép đo nào có chất lượng chính xác hơn?',
      options: [
        { label: 'Phép đo sân bóng l₂ (vì sai số tương đối nhỏ hơn rất nhiều)' },
        { label: 'Phép đo bút chì l₁ (vì 0,1 cm nhỏ hơn 0,2 m)' },
        { label: 'Hai phép đo có độ chính xác như nhau' },
        { label: 'Không thể so sánh được' }
      ],
      correct: 0,
      explanation: 'Chất lượng phép đo đánh giá qua sai số tương đối: δ₁ = 0,1 / 15 ≈ 0,67%; trong khi δ₂ = 0,2 / 100 = 0,2%. Sai số tương đối của phép đo sân bóng nhỏ hơn nên chính xác hơn.'
    },
    {
      stage: 4,
      question: 'Quy tròn số 28512 đến hàng nghìn ta được:',
      options: [
        { label: '29000' },
        { label: '28000' },
        { label: '28500' },
        { label: '30000' }
      ],
      correct: 0,
      explanation: 'Chữ số ngay sau hàng nghìn là chữ số 5 ở hàng trăm (≥ 5), ta tăng chữ số hàng nghìn lên 1 đơn vị: 28512 ≈ 29000.'
    },
    {
      stage: 4,
      question: 'Biết số đúng ā = 10/3 = 3,3333... Lấy a = 3,33 thì sai số tuyệt đối không vượt quá:',
      options: [
        { label: '0,004' },
        { label: '0,01' },
        { label: '0,001' },
        { label: '0,05' }
      ],
      correct: 0,
      explanation: '|10/3 - 3,33| = |10/3 - 333/100| = |(1000 - 999)/300| = 1/300 ≈ 0,00333... < 0,004.'
    }
  ]
});

// 3. GAME 13: THÁM TỬ DỮ LIỆU (SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM)
const g13 = buildGameHtml({
  id: 'game-13-tham-tu-du-lieu',
  title: 'Thám Tử Dữ Liệu: Đo Xu Thế Trung Tâm',
  subTitle: 'Số trung bình x̄, Trung vị Me, Tứ phân vị Q1 Q2 Q3 & Mốt Mo',
  chapterBadge: 'Chương 5: Thống Kê',
  accentColor: '#F59E0B',
  stages: ['Số trung bình & Mốt', 'Trung vị Me', 'Tứ phân vị Q1, Q2, Q3', 'Ý nghĩa thực tế'],
  questions: [
    {
      stage: 1,
      question: 'Mốt (Mo) của mẫu số liệu là gì?',
      options: [
        { label: 'Giá trị xuất hiện với tần số lớn nhất trong mẫu số liệu' },
        { label: 'Giá trị đứng chính giữa mẫu số liệu khi sắp xếp' },
        { label: 'Trung bình cộng của tất cả các giá trị' },
        { label: 'Hiệu giữa giá trị lớn nhất và nhỏ nhất' }
      ],
      correct: 0,
      explanation: 'Theo định nghĩa: Mốt (kí hiệu Mo) là giá trị xuất hiện với tần số lớn nhất trong mẫu số liệu.'
    },
    {
      stage: 1,
      question: 'Cho mẫu số liệu điểm kiểm tra: 6, 7, 8, 8, 8, 9, 10. Mốt của mẫu số liệu này là:',
      options: [
        { label: 'Mo = 8' },
        { label: 'Mo = 7' },
        { label: 'Mo = 9' },
        { label: 'Mo = 10' }
      ],
      correct: 0,
      explanation: 'Điểm 8 xuất hiện 3 lần, nhiều nhất trong mẫu số liệu, do đó Mốt Mo = 8.'
    },
    {
      stage: 2,
      question: 'Cho dãy điểm đã sắp xếp: 4, 5, 6, 7, 9. Trung vị (Me) của dãy là:',
      options: [
        { label: 'Me = 6' },
        { label: 'Me = 5' },
        { label: 'Me = 7' },
        { label: 'Me = 6,2' }
      ],
      correct: 0,
      explanation: 'Số phần tử n = 5 (lẻ), giá trị đứng ở vị trí thứ (5+1)/2 = 3 là số 6. Vậy Me = 6.'
    },
    {
      stage: 2,
      question: 'Cho mẫu số liệu chẵn phần tử: 2, 4, 6, 8, 10, 12. Trung vị Me bằng:',
      options: [
        { label: 'Me = (6 + 8)/2 = 7' },
        { label: 'Me = 6' },
        { label: 'Me = 8' },
        { label: 'Me = 7,5' }
      ],
      correct: 0,
      explanation: 'Khi n = 6 (chẵn), trung vị là trung bình cộng của 2 số ở giữa (vị trí thứ 3 và 4): Me = (6 + 8)/2 = 7.'
    },
    {
      stage: 3,
      question: 'Tứ phân vị thứ hai Q₂ chính là đại lượng nào sau đây?',
      options: [
        { label: 'Trung vị Me của mẫu số liệu' },
        { label: 'Số trung bình' },
        { label: 'Mốt của mẫu số liệu' },
        { label: 'Khoảng biến thiên' }
      ],
      correct: 0,
      explanation: 'Tứ phân vị thứ hai Q₂ luôn chính là trung vị Me của mẫu số liệu chia mẫu thành hai nửa bằng nhau.'
    },
    {
      stage: 3,
      question: 'Cho mẫu số liệu đã sắp xếp: 1, 3, 5, 7, 9, 11, 13, 15. Tứ phân vị Q₁ là trung vị của nửa dưới (1, 3, 5, 7). Vậy Q₁ bằng:',
      options: [
        { label: 'Q₁ = (3 + 5)/2 = 4' },
        { label: 'Q₁ = 3' },
        { label: 'Q₁ = 5' },
        { label: 'Q₁ = 3,5' }
      ],
      correct: 0,
      explanation: 'Nửa dưới gồm 4 số: 1, 3, 5, 7. Trung vị của nửa này là (3 + 5)/2 = 4. Vậy Q₁ = 4.'
    },
    {
      stage: 4,
      question: 'Khi trong mẫu số liệu xuất hiện một vài giá trị quá lớn hoặc quá nhỏ bất thường (giá trị dị biệt), đại lượng nào phản ánh xu thế trung tâm tốt hơn số trung bình?',
      options: [
        { label: 'Trung vị Me (không bị ảnh hưởng bởi giá trị ngoại lai)' },
        { label: 'Số trung bình x̄' },
        { label: 'Khoảng biến thiên R' },
        { label: 'Phương sai s²' }
      ],
      correct: 0,
      explanation: 'Trung vị không bị chi phối bởi các giá trị dị biệt cực lớn hoặc cực nhỏ, do đó phản ánh vị trí trung tâm chân thực hơn.'
    },
    {
      stage: 4,
      question: 'Một lớp có 5 học sinh đạt điểm: 5, 7, 8, 9, 10. Điểm trung bình x̄ của 5 bạn là:',
      options: [
        { label: 'x̄ = 7,8' },
        { label: 'x̄ = 8,0' },
        { label: 'x̄ = 7,5' },
        { label: 'x̄ = 8,2' }
      ],
      correct: 0,
      explanation: 'x̄ = (5 + 7 + 8 + 9 + 10)/5 = 39/5 = 7,8.'
    }
  ]
});

// 4. GAME 14: GIẢI MÃ ĐỘ PHÂN TÁN
const g14 = buildGameHtml({
  id: 'game-14-giai-ma-do-phan-tan',
  title: 'Giải Mã Số Đặc Trưng Đo Độ Phân Tán',
  subTitle: 'Khoảng biến thiên R, Khoảng tứ phân vị IQR, Phương sai s² & Độ lệch chuẩn s',
  chapterBadge: 'Chương 5: Thống Kê',
  accentColor: '#8B5CF6',
  stages: ['Khoảng biến thiên R', 'Khoảng tứ phân vị IQR', 'Phương sai s²', 'Độ lệch chuẩn & Ngoại lệ'],
  questions: [
    {
      stage: 1,
      question: 'Khoảng biến thiên (kí hiệu R) của một mẫu số liệu được tính như thế nào?',
      options: [
        { label: 'R = x_max - x_min' },
        { label: 'R = x_max + x_min' },
        { label: 'R = Q₃ - Q₁' },
        { label: 'R = (x_max - x_min)/2' }
      ],
      correct: 0,
      explanation: 'Khoảng biến thiên R là hiệu số giữa giá trị lớn nhất (x_max) và giá trị nhỏ nhất (x_min) trong mẫu số liệu: R = x_max - x_min.'
    },
    {
      stage: 1,
      question: 'Cho mẫu số liệu thời gian chạy 100m (giây): 12,5; 13,0; 13,2; 14,8; 15,1. Khoảng biến thiên R là:',
      options: [
        { label: 'R = 15,1 - 12,5 = 2,6' },
        { label: 'R = 15,1' },
        { label: 'R = 12,5' },
        { label: 'R = 1,8' }
      ],
      correct: 0,
      explanation: 'x_max = 15,1 và x_min = 12,5. Khoảng biến thiên R = 15,1 - 12,5 = 2,6 giây.'
    },
    {
      stage: 2,
      question: 'Khoảng tứ phân vị (kí hiệu Δ_Q hoặc IQR) được xác định bằng công thức:',
      options: [
        { label: 'Δ_Q = Q₃ - Q₁' },
        { label: 'Δ_Q = Q₂ - Q₁' },
        { label: 'Δ_Q = Q₃ + Q₁' },
        { label: 'Δ_Q = (Q₃ - Q₁)/2' }
      ],
      correct: 0,
      explanation: 'Khoảng tứ phân vị Δ_Q = Q₃ - Q₁ đo độ phân tán của 50% số liệu ở vị trí trung tâm.'
    },
    {
      stage: 2,
      question: 'Biết Q₁ = 22 và Q₃ = 38. Khoảng tứ phân vị của mẫu số liệu là:',
      options: [
        { label: 'Δ_Q = 38 - 22 = 16' },
        { label: 'Δ_Q = 60' },
        { label: 'Δ_Q = 8' },
        { label: 'Δ_Q = 30' }
      ],
      correct: 0,
      explanation: 'Δ_Q = Q₃ - Q₁ = 38 - 22 = 16.'
    },
    {
      stage: 3,
      question: 'Độ lệch chuẩn s liên hệ với phương sai s² như thế nào?',
      options: [
        { label: 's = √(s²)' },
        { label: 's = (s²)²' },
        { label: 's = 2 · s²' },
        { label: 's = s² / 2' }
      ],
      correct: 0,
      explanation: 'Độ lệch chuẩn là căn bậc hai số học của phương sai: s = √(s²), có cùng đơn vị đo với số liệu ban đầu.'
    },
    {
      stage: 3,
      question: 'Hai xạ thủ A và B cùng có điểm bắn trung bình là 9,0; nhưng s_A = 0,4 còn s_B = 1,2. Xạ thủ nào có phong độ bắn ổn định hơn?',
      options: [
        { label: 'Xạ thủ A (vì độ lệch chuẩn nhỏ hơn thể hiện độ phân tán ít hơn)' },
        { label: 'Xạ thủ B (vì độ lệch chuẩn lớn hơn)' },
        { label: 'Hai xạ thủ ổn định ngang nhau vì cùng điểm trung bình' },
        { label: 'Không xác định được' }
      ],
      correct: 0,
      explanation: 'Độ lệch chuẩn càng nhỏ thì các giá trị càng tập trung gần số trung bình, chứng tỏ phong độ càng ổn định. Xạ thủ A có s_A = 0,4 ổn định hơn.'
    },
    {
      stage: 4,
      question: 'Một giá trị x trong mẫu số liệu được coi là giá trị ngoại lệ (dị biệt) nếu:',
      options: [
        { label: 'x < Q₁ - 1,5·Δ_Q hoặc x > Q₃ + 1,5·Δ_Q' },
        { label: 'x < Q₁ hoặc x > Q₃' },
        { label: 'x > 2 · x̄' },
        { label: 'x = 0' }
      ],
      correct: 0,
      explanation: 'Tiêu chuẩn hàng rào Tukey: Giá trị x nhỏ hơn Q₁ - 1,5·Δ_Q hoặc lớn hơn Q₃ + 1,5·Δ_Q được coi là giá trị ngoại lệ.'
    },
    {
      stage: 4,
      question: 'Nếu tất cả các số liệu trong một mẫu đều bằng nhau (ví dụ: 5, 5, 5, 5) thì phương sai s² bằng:',
      options: [
        { label: 's² = 0' },
        { label: 's² = 5' },
        { label: 's² = 25' },
        { label: 's² = 1' }
      ],
      correct: 0,
      explanation: 'Khi tất cả số liệu bằng nhau thì không có độ phân tán quanh giá trị trung bình, do đó s² = 0.'
    }
  ]
});

// 5. GAME 15: KHÁM PHÁ CỖ MÁY HÀM SỐ
const g15 = buildGameHtml({
  id: 'game-15-kham-pha-co-may-ham-so',
  title: 'Khám Phá Cỗ Máy Hàm Số & Đồ Thị',
  subTitle: 'Tập xác định, tập giá trị, tính đồng biến & nghịch biến',
  chapterBadge: 'Chương 3: Hàm Số & Đồ Thị',
  accentColor: '#06B6D4',
  stages: ['Tập xác định D', 'Tính giá trị hàm số', 'Đồng biến & Nghịch biến', 'Đọc đồ thị Oxy'],
  questions: [
    {
      stage: 1,
      question: 'Tập xác định của hàm số y = √(x - 3) là:',
      options: [
        { label: 'D = [3; +∞)' },
        { label: 'D = (3; +∞)' },
        { label: 'D = (-∞; 3]' },
        { label: 'D = R \\ {3}' }
      ],
      correct: 0,
      explanation: 'Biểu thức dưới dấu căn có nghĩa khi x - 3 ≥ 0 ⇔ x ≥ 3. Vậy tập xác định là D = [3; +∞).'
    },
    {
      stage: 1,
      question: 'Tập xác định của hàm số y = 1 / (x - 2) là:',
      options: [
        { label: 'D = R \\ {2}' },
        { label: 'D = [2; +∞)' },
        { label: 'D = (2; +∞)' },
        { label: 'D = R' }
      ],
      correct: 0,
      explanation: 'Mẫu thức phải khác 0: x - 2 ≠ 0 ⇔ x ≠ 2. Do đó D = R \\ {2}.'
    },
    {
      stage: 2,
      question: 'Cho hàm số f(x) = 2x² - 3x + 1. Giá trị f(-1) bằng:',
      options: [
        { label: 'f(-1) = 6' },
        { label: 'f(-1) = 0' },
        { label: 'f(-1) = 4' },
        { label: 'f(-1) = -4' }
      ],
      correct: 0,
      explanation: 'f(-1) = 2·(-1)² - 3·(-1) + 1 = 2·1 + 3 + 1 = 6.'
    },
    {
      stage: 2,
      question: 'Hàm số y = f(x) được gọi là đồng biến trên khoảng (a; b) nếu với mọi x₁, x₂ thuộc (a; b):',
      options: [
        { label: 'x₁ < x₂ ⇒ f(x₁) < f(x₂)' },
        { label: 'x₁ < x₂ ⇒ f(x₁) > f(x₂)' },
        { label: 'x₁ < x₂ ⇒ f(x₁) = f(x₂)' },
        { label: 'f(x) luôn mang giá trị dương' }
      ],
      correct: 0,
      explanation: 'Đồng biến (tăng) nghĩa là khi x tăng thì giá trị y = f(x) cũng tăng: x₁ < x₂ ⇒ f(x₁) < f(x₂).'
    },
    {
      stage: 3,
      question: 'Hàm số bậc nhất y = -3x + 5 có tính chất biến thiên nào?',
      options: [
        { label: 'Nghịch biến trên R (vì hệ số a = -3 < 0)' },
        { label: 'Đồng biến trên R' },
        { label: 'Đồng biến trên (0; +∞)' },
        { label: 'Không tăng không giảm' }
      ],
      correct: 0,
      explanation: 'Hàm số bậc nhất y = ax + b có hệ số a = -3 < 0 nên nghịch biến trên toàn bộ tập R.'
    },
    {
      stage: 3,
      question: 'Đồ thị hàm số y = f(x) đi lên từ trái sang phải trên khoảng nào chứng tỏ hàm số:',
      options: [
        { label: 'Đồng biến trên khoảng đó' },
        { label: 'Nghịch biến trên khoảng đó' },
        { label: 'Có giá trị âm' },
        { label: 'Không xác định' }
      ],
      correct: 0,
      explanation: 'Khi nhìn từ trái sang phải dọc theo trục Ox (x tăng dần), đồ thị đi lên nghĩa là y tăng dần theo x, tức là hàm số đồng biến.'
    },
    {
      stage: 4,
      question: 'Tập xác định của hàm số y = √(x + 1) / (x - 4) là:',
      options: [
        { label: 'D = [-1; +∞) \\ {4}' },
        { label: 'D = (-1; +∞)' },
        { label: 'D = [4; +∞)' },
        { label: 'D = R \\ {4}' }
      ],
      correct: 0,
      explanation: 'Điều kiện: x + 1 ≥ 0 và x - 4 ≠ 0 ⇔ x ≥ -1 và x ≠ 4. Vậy D = [-1; +∞) \\ {4}.'
    },
    {
      stage: 4,
      question: 'Điểm nào sau đây thuộc đồ thị hàm số y = 3x - 2?',
      options: [
        { label: 'M(2; 4)' },
        { label: 'N(1; 2)' },
        { label: 'P(0; 2)' },
        { label: 'Q(-1; 1)' }
      ],
      correct: 0,
      explanation: 'Thay x = 2 vào hàm số: y = 3·2 - 2 = 6 - 2 = 4. Vậy điểm M(2; 4) thuộc đồ thị.'
    }
  ]
});

// 6. GAME 16: CHINH PHỤC PARABOL (HÀM SỐ BẬC HAI)
const g16 = buildGameHtml({
  id: 'game-16-chinh-phuc-parabol',
  title: 'Chinh Phục Parabol: Hàm Số Bậc Hai',
  subTitle: 'Đỉnh I(-b/2a; -Δ/4a), trục đối xứng, bề lõm & bảng biến thiên',
  chapterBadge: 'Chương 3: Hàm Số Bậc Hai',
  accentColor: '#EC4899',
  stages: ['Tọa độ đỉnh I', 'Trục đối xứng', 'Bề lõm & Biến thiên', 'Ứng dụng thực tế'],
  questions: [
    {
      stage: 1,
      question: 'Đồ thị của hàm số bậc hai y = ax² + bx + c (a ≠ 0) là một đường cong gọi là:',
      options: [
        { label: 'Parabol (P)' },
        { label: 'Hypebol' },
        { label: 'Đường thẳng' },
        { label: 'Đường tròn' }
      ],
      correct: 0,
      explanation: 'Đồ thị của hàm số bậc hai y = ax² + bx + c luôn là một đường cong parabol có trục đối xứng thẳng đứng.'
    },
    {
      stage: 1,
      question: 'Tọa độ đỉnh I của parabol y = ax² + bx + c là:',
      options: [
        { label: 'I(-b / (2a); -Δ / (4a))' },
        { label: 'I(b / (2a); Δ / (4a))' },
        { label: 'I(-b / a; -c / a)' },
        { label: 'I(0; c)' }
      ],
      correct: 0,
      explanation: 'Công thức tọa độ đỉnh parabol trong SGK: Hoành độ đỉnh x_I = -b/(2a), tung độ đỉnh y_I = -Δ/(4a) hoặc tính bằng y(-b/(2a)).'
    },
    {
      stage: 2,
      question: 'Trục đối xứng của parabol y = x² - 4x + 3 là đường thẳng:',
      options: [
        { label: 'x = 2' },
        { label: 'x = -2' },
        { label: 'x = 4' },
        { label: 'y = 2' }
      ],
      correct: 0,
      explanation: 'Trục đối xứng có phương trình x = -b / (2a) = -(-4) / (2·1) = 4 / 2 = 2.'
    },
    {
      stage: 2,
      question: 'Parabol y = ax² + bx + c có bề lõm quay lên trên (đỉnh I là điểm thấp nhất) khi nào?',
      options: [
        { label: 'a > 0' },
        { label: 'a < 0' },
        { label: 'Δ > 0' },
        { label: 'c > 0' }
      ],
      correct: 0,
      explanation: 'Dấu của hệ số a quyết định chiều bề lõm: a > 0 bề lõm quay lên trên; a < 0 bề lõm quay xuống dưới.'
    },
    {
      stage: 3,
      question: 'Tìm tọa độ đỉnh I của parabol y = 2x² - 4x + 1?',
      options: [
        { label: 'I(1; -1)' },
        { label: 'I(1; 1)' },
        { label: 'I(2; 1)' },
        { label: 'I(-1; 7)' }
      ],
      correct: 0,
      explanation: 'x_I = -(-4) / (2·2) = 1. Thay x = 1 vào y: y_I = 2(1)² - 4(1) + 1 = 2 - 4 + 1 = -1. Vậy đỉnh I(1; -1).'
    },
    {
      stage: 3,
      question: 'Giá trị nhỏ nhất của hàm số y = x² - 6x + 10 trên R là:',
      options: [
        { label: 'y_min = 1 (tại x = 3)' },
        { label: 'y_min = 10' },
        { label: 'y_min = 0' },
        { label: 'y_min = -1' }
      ],
      correct: 0,
      explanation: 'Hàm số có a = 1 > 0 nên đạt giá trị nhỏ nhất tại đỉnh: x = -(-6)/2 = 3. y(3) = 3² - 6·3 + 10 = 9 - 18 + 10 = 1.'
    },
    {
      stage: 4,
      question: 'Cổng vòm Parabol có phương trình h(x) = -x² + 6x (m) với x là khoảng cách từ chân vòm. Chiều cao lớn nhất của cổng vòm là:',
      options: [
        { label: '9 m (tại x = 3 m)' },
        { label: '6 m' },
        { label: '12 m' },
        { label: '3 m' }
      ],
      correct: 0,
      explanation: 'Đỉnh vòm tại x = -6 / (2·(-1)) = 3 m. Chiều cao lớn nhất h_max = -(3)² + 6·3 = -9 + 18 = 9 m.'
    },
    {
      stage: 4,
      question: 'Giao điểm của parabol y = x² - 3x + 2 với trục tung Oy là điểm:',
      options: [
        { label: '(0; 2)' },
        { label: '(1; 0)' },
        { label: '(2; 0)' },
        { label: '(0; -2)' }
      ],
      correct: 0,
      explanation: 'Giao với Oy tương ứng với x = 0 ⇒ y = 0² - 3(0) + 2 = 2. Giao điểm là (0; 2).'
    }
  ]
});

// 7. GAME 17: GIẢI MÃ BẢNG DẤU (DẤU TAM THỨC BẬC HAI)
const g17 = buildGameHtml({
  id: 'game-17-giai-ma-bang-dau',
  title: 'Giải Mã Bảng Dấu Tam Thức Bậc Hai',
  subTitle: 'Định lý về dấu tam thức bậc hai, biệt thức Δ & bất phương trình bậc hai',
  chapterBadge: 'Chương 3: Tam Thức Bậc Hai',
  accentColor: '#E11D48',
  stages: ['Biệt thức Δ', 'Quy tắc dấu Δ < 0 & Δ = 0', 'Quy tắc \"Trong trái, ngoài cùng\"', 'Giải BPT bậc hai'],
  questions: [
    {
      stage: 1,
      question: 'Biệt thức Δ của tam thức bậc hai f(x) = ax² + bx + c được tính bởi công thức:',
      options: [
        { label: 'Δ = b² - 4ac' },
        { label: 'Δ = b² - ac' },
        { label: 'Δ = b² + 4ac' },
        { label: 'Δ = 4ac - b²' }
      ],
      correct: 0,
      explanation: 'Định nghĩa biệt thức của tam thức bậc hai: Δ = b² - 4ac (hoặc Δ\' = b\'² - ac với b = 2b\').'
    },
    {
      stage: 1,
      question: 'Nếu tam thức bậc hai f(x) = ax² + bx + c có Δ < 0 thì dấu của f(x) như thế nào?',
      options: [
        { label: 'f(x) luôn cùng dấu với hệ số a với mọi x ∈ R' },
        { label: 'f(x) luôn trái dấu với hệ số a' },
        { label: 'f(x) đổi dấu khi qua 0' },
        { label: 'f(x) luôn mang dấu dương' }
      ],
      correct: 0,
      explanation: 'Định lý về dấu tam thức bậc hai: Khi Δ < 0, tam thức f(x) luôn cùng dấu với hệ số a với mọi x thuộc R (a · f(x) > 0, ∀x).'
    },
    {
      stage: 2,
      question: 'Khi tam thức bậc hai có hai nghiệm phân biệt x₁ < x₂ (Δ > 0), quy tắc xét dấu giữa hai nghiệm và ngoài hai nghiệm là gì?',
      options: [
        { label: 'Trong trái (khoảng hai nghiệm trái dấu với a), ngoài cùng (ngoài hai nghiệm cùng dấu với a)' },
        { label: 'Trong cùng, ngoài trái' },
        { label: 'Luôn luôn dương' },
        { label: 'Luôn luôn âm' }
      ],
      correct: 0,
      explanation: 'Khẩu quyết kinh điển của học sinh: \"Trong trái - Ngoài cùng\". Trong khoảng (x₁; x₂) thì f(x) trái dấu với a; ngoài đoạn [x₁; x₂] thì f(x) cùng dấu với a.'
    },
    {
      stage: 2,
      question: 'Tam thức f(x) = x² - 2x + 5 có dấu như thế nào trên R?',
      options: [
        { label: 'f(x) > 0 với mọi x ∈ R (vì a = 1 > 0 và Δ = 4 - 20 = -16 < 0)' },
        { label: 'f(x) < 0 với mọi x ∈ R' },
        { label: 'f(x) đổi dấu qua nghiệm' },
        { label: 'f(x) có nghiệm x = 2' }
      ],
      correct: 0,
      explanation: 'Δ = (-2)² - 4·1·5 = 4 - 20 = -16 < 0 và a = 1 > 0 nên f(x) > 0 với mọi x thuộc R.'
    },
    {
      stage: 3,
      question: 'Tập nghiệm của bất phương trình x² - 5x + 6 < 0 là:',
      options: [
        { label: 'S = (2; 3)' },
        { label: 'S = (-∞; 2) ∪ (3; +∞)' },
        { label: 'S = [2; 3]' },
        { label: 'S = ∅' }
      ],
      correct: 0,
      explanation: 'Tam thức x² - 5x + 6 có 2 nghiệm x₁ = 2, x₂ = 3; hệ số a = 1 > 0. Bất phương trình lấy dấu âm (trái dấu a) nên nghiệm nằm trong khoảng hai nghiệm: (2; 3).'
    },
    {
      stage: 3,
      question: 'Tập nghiệm của bất phương trình x² - 4x + 4 ≤ 0 là:',
      options: [
        { label: 'S = {2}' },
        { label: 'S = R' },
        { label: 'S = ∅' },
        { label: 'S = [2; +∞)' }
      ],
      correct: 0,
      explanation: 'x² - 4x + 4 = (x - 2)². Vì (x - 2)² ≥ 0 với mọi x, nên (x - 2)² ≤ 0 chỉ xảy ra khi x - 2 = 0 ⇔ x = 2. Tập nghiệm là {2}.'
    },
    {
      stage: 4,
      question: 'Tìm tất cả các giá trị của m để tam thức f(x) = x² - 2x + m > 0 với mọi x ∈ R?',
      options: [
        { label: 'm > 1' },
        { label: 'm < 1' },
        { label: 'm ≥ 1' },
        { label: 'm > 0' }
      ],
      correct: 0,
      explanation: 'Để f(x) > 0 với mọi x ∈ R thì a = 1 > 0 (thỏa mãn) và Δ\' < 0 ⇔ (-1)² - 1·m < 0 ⇔ 1 - m < 0 ⇔ m > 1.'
    },
    {
      stage: 4,
      question: 'Tập nghiệm của bất phương trình -x² + 4x - 3 ≥ 0 là:',
      options: [
        { label: '[1; 3]' },
        { label: '(-∞; 1] ∪ [3; +∞)' },
        { label: '(1; 3)' },
        { label: 'R' }
      ],
      correct: 0,
      explanation: 'Nhân cả hai vế với -1 (đổi chiều): x² - 4x + 3 ≤ 0. Nghiệm là [1; 3].'
    }
  ]
});

// Write games 11 to 17
fs.writeFileSync(path.join(gamesDir, 'game-11-tich-vo-huong.html'), g11);
console.log('Created game-11-tich-vo-huong.html');

fs.writeFileSync(path.join(gamesDir, 'game-12-tham-tu-sai-so.html'), g12);
fs.writeFileSync(path.join(gamesDir, 'game-12-so-gan-dung-sai-so.html'), g12);
console.log('Created game-12-tham-tu-sai-so.html');

fs.writeFileSync(path.join(gamesDir, 'game-13-tham-tu-du-lieu.html'), g13);
fs.writeFileSync(path.join(gamesDir, 'game-13-so-dac-trung-xu-the-trung-tam.html'), g13);
console.log('Created game-13-tham-tu-du-lieu.html');

fs.writeFileSync(path.join(gamesDir, 'game-14-giai-ma-do-phan-tan.html'), g14);
fs.writeFileSync(path.join(gamesDir, 'game-14-so-dac-trung-do-phan-tan.html'), g14);
console.log('Created game-14-giai-ma-do-phan-tan.html');

fs.writeFileSync(path.join(gamesDir, 'game-15-kham-pha-co-may-ham-so.html'), g15);
fs.writeFileSync(path.join(gamesDir, 'game-15-ham-so-do-thi.html'), g15);
console.log('Created game-15-kham-pha-co-may-ham-so.html');

fs.writeFileSync(path.join(gamesDir, 'game-16-chinh-phuc-parabol.html'), g16);
fs.writeFileSync(path.join(gamesDir, 'game-16-ham-so-bac-hai-parabol.html'), g16);
console.log('Created game-16-chinh-phuc-parabol.html');

fs.writeFileSync(path.join(gamesDir, 'game-17-giai-ma-bang-dau.html'), g17);
fs.writeFileSync(path.join(gamesDir, 'game-17-dau-tam-thuc-bac-hai.html'), g17);
console.log('Created game-17-giai-ma-bang-dau.html');
