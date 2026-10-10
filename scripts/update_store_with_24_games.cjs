const fs = require('fs');
const path = require('path');

const storePath = path.resolve(__dirname, '../server_data/store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf-8'));

// The 24 games metadata
const gamesMeta = [
  {
    id: 'game-01-menh-de',
    type: 'game',
    title: 'Đấu Trường Mệnh Đề',
    topic: 'Chương 1: Mệnh đề & Tập hợp',
    file: 'game-01-menh-de.html',
    displayOrder: 1,
    description: 'Thử thách nhận biết mệnh đề toán học, mệnh đề phủ định, mệnh đề kéo theo (P ⇒ Q), điều kiện cần và đủ, cùng các kí hiệu với mọi (∀) và tồn tại (∃).'
  },
  {
    id: 'game-02-tap-hop',
    type: 'game',
    title: 'Chinh Phục Vương Quốc Tập Hợp',
    topic: 'Chương 1: Mệnh đề & Tập hợp',
    file: 'game-02-tap-hop.html',
    displayOrder: 2,
    description: 'Thực hành các phép toán giao (∩), hợp (∪), hiệu (\\) và phần bù của tập hợp. Biểu diễn và giải quyết bài toán khoảng đoạn trên trục số thực R.'
  },
  {
    id: 'game-03-mien-nghiem',
    type: 'game',
    title: 'Giải Mã Miền Nghiệm Bất Phương Trình',
    topic: 'Chương 2: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    file: 'game-03-mien-nghiem.html',
    displayOrder: 3,
    description: 'Xác định nửa mặt phẳng bờ d biểu diễn miền nghiệm của bất phương trình bậc nhất hai ẩn ax + by ≤ c. Kiểm tra tọa độ điểm thuộc miền nghiệm.'
  },
  {
    id: 'game-04-mien-nghiem-chung',
    type: 'game',
    title: 'Chinh Phục Miền Nghiệm Chung Hệ BPT',
    topic: 'Chương 2: Bất phương trình & Hệ BPT bậc nhất hai ẩn',
    file: 'game-04-mien-nghiem-chung.html',
    displayOrder: 4,
    description: 'Giao các nửa mặt phẳng để tìm miền nghiệm đa giác của hệ bất phương trình bậc nhất hai ẩn. Ứng dụng giải bài toán kinh tế và tối ưu biểu thức F(x, y).'
  },
  {
    id: 'game-05-vong-tron-luong-giac',
    type: 'game',
    title: 'Giải Mã Đường Tròn Lượng Giác (0° - 180°)',
    topic: 'Chương 3: Hệ thức lượng trong tam giác',
    file: 'game-05-vong-tron-luong-giac.html',
    displayOrder: 5,
    description: 'Khám phá giá trị sin, cos, tan, cot của góc từ 0° đến 180° trên nửa đường tròn đơn vị. Tính chất lượng giác của hai góc bù nhau và phụ nhau.'
  },
  {
    id: 'game-06-he-thuc-luong-tam-giac',
    type: 'game',
    title: 'Chinh Phục Tam Giác: Định Lý Cosin & Sin',
    topic: 'Chương 3: Hệ thức lượng trong tam giác',
    file: 'game-06-he-thuc-luong-tam-giac.html',
    displayOrder: 6,
    description: 'Vận dụng Định lý Cosin (a² = b² + c² - 2bc.cosA), Định lý Sin (a/sinA = 2R) và các công thức diện tích tam giác (Heron, bán kính R, r) để giải tam giác.'
  },
  {
    id: 'game-07-khai-niem-vector',
    type: 'game',
    title: 'Khám Phá Thế Giới Vectơ',
    topic: 'Chương 4: Vectơ',
    file: 'game-07-khai-niem-vector.html',
    displayOrder: 7,
    description: 'Tìm hiểu khái niệm đoạn thẳng có hướng, độ dài vectơ, vectơ cùng phương, cùng hướng, ngược hướng, hai vectơ bằng nhau và vectơ-không.'
  },
  {
    id: 'game-08-tong-hieu-vector',
    type: 'game',
    title: 'Đường Đua Vectơ: Tổng & Hiệu Hai Vectơ',
    topic: 'Chương 4: Vectơ',
    file: 'game-08-tong-hieu-vector.html',
    displayOrder: 8,
    description: 'Thực hành thuần thục quy tắc 3 điểm, quy tắc hình bình hành, quy tắc trừ vectơ cùng tính chất trung điểm đoạn thẳng và trọng tâm tam giác.'
  },
  {
    id: 'game-09-tich-vector-voi-mot-so',
    type: 'game',
    title: 'Biến Hóa Vectơ: Tích Vectơ Với Một Số',
    topic: 'Chương 4: Vectơ',
    file: 'game-09-tich-vector-voi-mot-so.html',
    displayOrder: 9,
    description: 'Khám phá phép nhân vectơ với số thực k: độ dài |k.a|, hướng cùng hoặc ngược tùy dấu của k, điều kiện hai vectơ cùng phương và phân tích vectơ.'
  },
  {
    id: 'game-11-tich-vo-huong',
    type: 'game',
    title: 'Giải Mã Tích Vô Hướng Của Hai Vectơ',
    topic: 'Chương 4: Vectơ',
    file: 'game-11-tich-vo-huong.html',
    displayOrder: 10,
    description: 'Định nghĩa góc giữa hai vectơ, công thức tích vô hướng u · v = |u|.|v|.cos(u, v), biểu thức tọa độ trong Oxy và điều kiện hai vectơ vuông góc.'
  },
  {
    id: 'game-12-tham-tu-sai-so',
    type: 'game',
    title: 'Thám Tử Sai Số & Số Gần Đúng',
    topic: 'Chương 5: Các số đặc trưng của mẫu số liệu không ghép nhóm',
    file: 'game-12-tham-tu-sai-so.html',
    displayOrder: 11,
    description: 'Tìm hiểu số đúng, số gần đúng, sai số tuyệt đối, sai số tương đối, độ chính xác của phép đo và nguyên tắc quy tròn số theo chuẩn khoa học.'
  },
  {
    id: 'game-13-tham-tu-du-lieu',
    type: 'game',
    title: 'Thám Tử Dữ Liệu: Đo Xu Thế Trung Tâm',
    topic: 'Chương 5: Các số đặc trưng của mẫu số liệu không ghép nhóm',
    file: 'game-13-tham-tu-du-lieu.html',
    displayOrder: 12,
    description: 'Thực hành tính toán và so sánh số trung bình x̄, trung vị Me, các tứ phân vị (Q1, Q2, Q3) và Mốt Mo trong các bài toán thống kê thực tiễn.'
  },
  {
    id: 'game-14-giai-ma-do-phan-tan',
    type: 'game',
    title: 'Giải Mã Số Đặc Trưng Đo Độ Phân Tán',
    topic: 'Chương 5: Các số đặc trưng của mẫu số liệu không ghép nhóm',
    file: 'game-14-giai-ma-do-phan-tan.html',
    displayOrder: 13,
    description: 'Khám phá khoảng biến thiên R, khoảng tứ phân vị IQR, phương sai s² và độ lệch chuẩn s để đánh giá mức độ ổn định và phát hiện giá trị dị biệt.'
  },
  {
    id: 'game-15-kham-pha-co-may-ham-so',
    type: 'game',
    title: 'Khám Phá Cỗ Máy Hàm Số & Đồ Thị',
    topic: 'Chương 6: Hàm số, đồ thị & ứng dụng',
    file: 'game-15-kham-pha-co-may-ham-so.html',
    displayOrder: 14,
    description: 'Nhận diện khái niệm hàm số, tìm tập xác định D, tập giá trị, xét chiều biến thiên đồng biến/nghịch biến và kỹ năng đọc đồ thị hàm số.'
  },
  {
    id: 'game-16-chinh-phuc-parabol',
    type: 'game',
    title: 'Chinh Phục Parabol: Hàm Số Bậc Hai',
    topic: 'Chương 6: Hàm số, đồ thị & ứng dụng',
    file: 'game-16-chinh-phuc-parabol.html',
    displayOrder: 15,
    description: 'Khảo sát hàm số bậc hai y = ax² + bx + c: xác định đỉnh I, trục đối xứng x = -b/2a, bề lõm, lập bảng biến thiên và mô hình quỹ đạo parabol.'
  },
  {
    id: 'game-17-giai-ma-bang-dau',
    type: 'game',
    title: 'Giải Mã Bảng Dấu Tam Thức Bậc Hai',
    topic: 'Chương 6: Hàm số, đồ thị & ứng dụng',
    file: 'game-17-giai-ma-bang-dau.html',
    displayOrder: 16,
    description: 'Thành thạo định lý về dấu tam thức bậc hai dựa vào biệt thức Δ, quy tắc "trong trái ngoài cùng" và giải bất phương trình bậc hai một ẩn.'
  },
  {
    id: 'game-18-giai-ma-phuong-trinh',
    type: 'game',
    title: 'Giải Mã Phương Trình Quy Về Bậc Hai',
    topic: 'Chương 6: Hàm số, đồ thị & ứng dụng',
    file: 'game-18-giai-ma-phuong-trinh.html',
    displayOrder: 17,
    description: 'Phương pháp giải các phương trình chứa căn bậc hai dạng √(f(x)) = √(g(x)) và √(f(x)) = g(x), kỹ năng bình phương và loại trừ nghiệm ngoại lai.'
  },
  {
    id: 'game-19-giai-ma-duong-thang',
    type: 'game',
    title: 'Giải Mã Phương Trình Đường Thẳng Oxy',
    topic: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    file: 'game-19-giai-ma-duong-thang.html',
    displayOrder: 18,
    description: 'Thiết lập phương trình tham số và phương trình tổng quát của đường thẳng từ điểm đi qua, vectơ chỉ phương u và vectơ pháp tuyến n.'
  },
  {
    id: 'game-20-dinh-vi-duong-thang',
    type: 'game',
    title: 'Định Vị Đường Thẳng: Vị Trí, Góc & Khoảng Cách',
    topic: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    file: 'game-20-dinh-vi-duong-thang.html',
    displayOrder: 19,
    description: 'Xác định vị trí tương đối giữa hai đường thẳng (cắt, song song, trùng, vuông góc), tính góc giữa hai đường thẳng và khoảng cách từ điểm đến đường thẳng.'
  },
  {
    id: 'game-21-truy-tim-tam-duong-tron',
    type: 'game',
    title: 'Truy Tìm Tâm & Bán Kính Đường Tròn Oxy',
    topic: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    file: 'game-21-truy-tim-tam-duong-tron.html',
    displayOrder: 20,
    description: 'Viết phương trình chính tắc (x - a)² + (y - b)² = R², chuyển đổi dạng khai triển x² + y² - 2ax - 2by + c = 0 và lập phương trình tiếp tuyến.'
  },
  {
    id: 'game-22-kham-pha-ba-duong-conic',
    type: 'game',
    title: 'Khám Phá Ba Đường Conic: Elip, Hypebol & Parabol',
    topic: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    file: 'game-22-kham-pha-ba-duong-conic.html',
    displayOrder: 21,
    description: 'Nghiên cứu phương trình chính tắc của Elip (x²/a² + y²/b² = 1), Hypebol (x²/a² - y²/b² = 1) và Parabol (y² = 2px), tiêu cự và quỹ đạo thiên thể.'
  },
  {
    id: 'game-23-quy-tac-dem',
    type: 'game',
    title: 'Quy Tắc Đếm: Quy Tắc Cộng & Quy Tắc Nhân',
    topic: 'Chương 8: Đại số tổ hợp',
    file: 'game-23-quy-tac-dem.html',
    displayOrder: 22,
    description: 'Phân biệt chính xác quy tắc cộng (các phương án độc lập) và quy tắc nhân (các công đoạn liên tiếp), vận dụng vẽ sơ đồ hình cây giải bài toán đếm.'
  },
  {
    id: 'game-24-hoan-vi-chinh-hop-to-hop',
    type: 'game',
    title: 'Hoán Vị, Chỉnh Hợp & Tổ Hợp',
    topic: 'Chương 8: Đại số tổ hợp',
    file: 'game-24-hoan-vi-chinh-hop-to-hop.html',
    displayOrder: 23,
    description: 'Thành thạo công thức hoán vị P_n = n!, chỉnh hợp A_n^k, tổ hợp C_n^k và nghệ thuật nhận diện bài toán có thứ tự hay không có thứ tự.'
  },
  {
    id: 'game-25-nhi-thuc-newton',
    type: 'game',
    title: 'Nhị Thức Newton & Tam Giác Pascal',
    topic: 'Chương 8: Đại số tổ hợp',
    file: 'game-25-nhi-thuc-newton.html',
    displayOrder: 24,
    description: 'Công thức khai triển nhị thức Newton (a + b)⁴, (a + b)⁵, tính chất đối xứng của tam giác Pascal và phương pháp tìm hệ số của số hạng theo lũy thừa.'
  }
];

const gamesDir = path.resolve(__dirname, '../public/games');

const formattedGames = gamesMeta.map(g => {
  const filePath = path.join(gamesDir, g.file);
  let html = '';
  if (fs.existsSync(filePath)) {
    html = fs.readFileSync(filePath, 'utf-8');
  }
  return {
    id: g.id,
    type: 'game',
    title: g.title,
    topic: g.topic,
    description: g.description,
    url: `/games/${g.file}`,
    htmlContent: html,
    displayOrder: g.displayOrder,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-08T08:00:00.000Z'
  };
});

// Remove old game items from store and insert the 24 curriculum games
const nonGames = store.items.filter(i => i.type !== 'game');
store.items = [...formattedGames, ...nonGames];

fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf-8');
console.log(`Updated store.json: now has ${formattedGames.length} games and ${store.items.length} total items.`);
