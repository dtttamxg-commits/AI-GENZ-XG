import { InfographicLesson } from './infographicsData';

export function escapeXml(unsafe: string | number | null | undefined): string {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateInfographicSvg(lesson: InfographicLesson): string {
  const width = 1200;
  const height = 1600;

  // Custom diagram depending on the lesson topic
  let diagramSvg = '';

  if (lesson.id === 'info-bai-01') {
    // Logic / Proposition
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="50" y="45" fill="#38bdf8" font-size="22" font-weight="bold">BẢNG CHÂN TRỊ CÁC PHÉP TOÁN MỆNH ĐỀ CƠ BẢN</text>
        
        <rect x="50" y="70" width="900" height="50" fill="#334155" rx="8"/>
        <text x="100" y="102" fill="#f8fafc" font-size="19" font-weight="bold">P</text>
        <text x="250" y="102" fill="#f8fafc" font-size="19" font-weight="bold">Q</text>
        <text x="400" y="102" fill="#38bdf8" font-size="19" font-weight="bold">P&#772; (Phủ định)</text>
        <text x="600" y="102" fill="#a78bfa" font-size="19" font-weight="bold">P &#8658; Q (Kéo theo)</text>
        <text x="820" y="102" fill="#34d399" font-size="19" font-weight="bold">P &#8660; Q (Tương đương)</text>

        <text x="100" y="155" fill="#e2e8f0" font-size="19">Đúng</text>
        <text x="250" y="155" fill="#e2e8f0" font-size="19">Đúng</text>
        <text x="420" y="155" fill="#f87171" font-size="19">Sai</text>
        <text x="630" y="155" fill="#34d399" font-size="19" font-weight="bold">Đúng</text>
        <text x="850" y="155" fill="#34d399" font-size="19" font-weight="bold">Đúng</text>

        <line x1="50" y1="180" x2="950" y2="180" stroke="#475569" stroke-width="1"/>

        <text x="100" y="225" fill="#e2e8f0" font-size="19">Đúng</text>
        <text x="250" y="225" fill="#e2e8f0" font-size="19">Sai</text>
        <text x="420" y="225" fill="#f87171" font-size="19">Sai</text>
        <text x="630" y="225" fill="#f87171" font-size="19" font-weight="bold">Sai (Đặc biệt!)</text>
        <text x="850" y="225" fill="#f87171" font-size="19" font-weight="bold">Sai</text>

        <line x1="50" y1="250" x2="950" y2="250" stroke="#475569" stroke-width="1"/>

        <text x="100" y="295" fill="#e2e8f0" font-size="19">Sai</text>
        <text x="250" y="295" fill="#e2e8f0" font-size="19">Đúng / Sai</text>
        <text x="420" y="295" fill="#34d399" font-size="19">Đúng</text>
        <text x="630" y="295" fill="#34d399" font-size="19" font-weight="bold">Luôn Đúng</text>
        <text x="850" y="295" fill="#fbbf24" font-size="19">Đúng khi cùng chân trị</text>
      </g>
    `;
  } else if (lesson.id === 'info-bai-02') {
    // Sets / Venn Diagrams
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
        <text x="50" y="45" fill="#818cf8" font-size="22" font-weight="bold">BIỂU ĐỒ VEN &amp; CÁC PHÉP TOÁN TRÊN TẬP HỢP</text>
        
        <g transform="translate(50, 75)">
          <rect width="280" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <circle cx="105" cy="105" r="55" fill="#6366f1" fill-opacity="0.25" stroke="#818cf8" stroke-width="2"/>
          <circle cx="175" cy="105" r="55" fill="#38bdf8" fill-opacity="0.25" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 140 62 A 55 55 0 0 1 140 148 A 55 55 0 0 1 140 62" fill="#38bdf8" fill-opacity="0.65"/>
          <text x="85" y="110" fill="#ffffff" font-size="16" font-weight="bold">A</text>
          <text x="195" y="110" fill="#ffffff" font-size="16" font-weight="bold">B</text>
          <text x="140" y="190" fill="#38bdf8" font-size="18" font-weight="bold" text-anchor="middle">A &#8745; B (Giao)</text>
          <text x="140" y="215" fill="#94a3b8" font-size="13" text-anchor="middle">Vừa thuộc A vừa thuộc B</text>
        </g>

        <g transform="translate(360, 75)">
          <rect width="280" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <circle cx="105" cy="105" r="55" fill="#10b981" fill-opacity="0.4" stroke="#34d399" stroke-width="2"/>
          <circle cx="175" cy="105" r="55" fill="#10b981" fill-opacity="0.4" stroke="#34d399" stroke-width="2"/>
          <text x="85" y="110" fill="#ffffff" font-size="16" font-weight="bold">A</text>
          <text x="195" y="110" fill="#ffffff" font-size="16" font-weight="bold">B</text>
          <text x="140" y="190" fill="#34d399" font-size="18" font-weight="bold" text-anchor="middle">A &#8746; B (Hợp)</text>
          <text x="140" y="215" fill="#94a3b8" font-size="13" text-anchor="middle">Thuộc A hoặc thuộc B</text>
        </g>

        <g transform="translate(670, 75)">
          <rect width="280" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <circle cx="105" cy="105" r="55" fill="#f43f5e" fill-opacity="0.45" stroke="#fb7185" stroke-width="2"/>
          <circle cx="175" cy="105" r="55" fill="#0f172a" stroke="#94a3b8" stroke-width="2"/>
          <text x="80" y="110" fill="#ffffff" font-size="16" font-weight="bold">A</text>
          <text x="195" y="110" fill="#94a3b8" font-size="16" font-weight="bold">B</text>
          <text x="140" y="190" fill="#fb7185" font-size="18" font-weight="bold" text-anchor="middle">A \\ B (Hiệu)</text>
          <text x="140" y="215" fill="#94a3b8" font-size="13" text-anchor="middle">Thuộc A nhưng không thuộc B</text>
        </g>
      </g>
    `;
  } else if (lesson.id === 'info-bai-02z') {
    // Review Chapter I
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#818cf8" stroke-width="2"/>
        <text x="50" y="45" fill="#a5b4fc" font-size="22" font-weight="bold">HỆ THỐNG TẬP HỢP SỐ &amp; BIỂU DIỄN TRỤC SỐ THỰC R</text>
        
        <g transform="translate(50, 75)">
          <rect width="420" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#a5b4fc" font-size="16" font-weight="bold">QUAN HỆ BAO HÀM CÁC TẬP SỐ</text>
          <circle cx="210" cy="135" r="85" fill="#3b82f6" fill-opacity="0.1" stroke="#60a5fa" stroke-width="2"/>
          <circle cx="210" cy="145" r="65" fill="#10b981" fill-opacity="0.1" stroke="#34d399" stroke-width="2"/>
          <circle cx="210" cy="155" r="45" fill="#f59e0b" fill-opacity="0.1" stroke="#fbbf24" stroke-width="2"/>
          <circle cx="210" cy="165" r="25" fill="#ec4899" fill-opacity="0.1" stroke="#f472b6" stroke-width="2"/>
          <text x="210" y="70" fill="#60a5fa" font-size="15" font-weight="bold" text-anchor="middle">R (Số thực)</text>
          <text x="210" y="100" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">Q (Hữu tỉ)</text>
          <text x="210" y="130" fill="#fbbf24" font-size="14" font-weight="bold" text-anchor="middle">Z (Số nguyên)</text>
          <text x="210" y="170" fill="#f472b6" font-size="13" font-weight="bold" text-anchor="middle">N</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#a5b4fc" font-size="16" font-weight="bold">KÝ HIỆU KHOẢNG, ĐOẠN, NỬA KHOẢNG</text>
          <text x="30" y="75" fill="#38bdf8" font-size="15">&#8226; Khoảng (a; b) = {x &#8712; R | a &lt; x &lt; b}</text>
          <text x="30" y="110" fill="#34d399" font-size="15">&#8226; Đoạn [a; b] = {x &#8712; R | a &#8804; x &#8804; b}</text>
          <text x="30" y="145" fill="#fbbf24" font-size="15">&#8226; Nửa khoảng [a; b) = {x &#8712; R | a &#8804; x &lt; b}</text>
          <text x="30" y="180" fill="#a78bfa" font-size="15">&#8226; Vô cực: (-&#8734;; a] hoặc (b; +&#8734;)</text>
          <line x1="30" y1="200" x2="410" y2="200" stroke="#334155" stroke-width="1"/>
          <text x="30" y="222" fill="#e2e8f0" font-size="13">&#9733; Gạch bỏ phần không thuộc tập hợp khi vẽ trên trục số</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 2) {
    // Chapter 2: Inequalities
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
        <text x="50" y="45" fill="#38bdf8" font-size="22" font-weight="bold">BIỂU DIỄN HÌNH HỌC MIỀN NGHIỆM TRÊN HỆ TRỤC OXY</text>
        
        <g transform="translate(50, 75)">
          <rect width="420" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <line x1="40" y1="140" x2="360" y2="140" stroke="#64748b" stroke-width="2"/>
          <line x1="200" y1="25" x2="200" y2="215" stroke="#64748b" stroke-width="2"/>
          <polygon points="360,136 370,140 360,144" fill="#64748b"/>
          <polygon points="196,25 200,15 204,25" fill="#64748b"/>
          <text x="355" y="160" fill="#94a3b8" font-size="14">x</text>
          <text x="185" y="30" fill="#94a3b8" font-size="14">y</text>
          <text x="185" y="155" fill="#94a3b8" font-size="14">O</text>

          <polygon points="60,200 330,40 330,220 60,220" fill="#38bdf8" fill-opacity="0.25"/>
          <line x1="60" y1="200" x2="330" y2="40" stroke="#0284c7" stroke-width="3"/>
          <circle cx="200" cy="140" r="4" fill="#38bdf8"/>
          <text x="240" y="90" fill="#38bdf8" font-size="15" font-weight="bold">d: ax + by = c</text>
          <text x="120" y="195" fill="#f8fafc" font-size="14" font-weight="bold">Miền nghiệm</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#38bdf8" font-size="17" font-weight="bold">QUY TẮC 3 BƯỚC XÁC ĐỊNH MIỀN NGHIỆM:</text>
          <text x="30" y="75" fill="#f8fafc" font-size="15">&#9312; Vẽ đường thẳng bờ d: ax + by = c</text>
          <text x="30" y="115" fill="#f8fafc" font-size="15">&#9313; Lấy điểm kiểm tra O(0; 0) (nếu d không qua O)</text>
          <text x="30" y="155" fill="#f8fafc" font-size="15">&#9314; Tính a&#183;0 + b&#183;0 = 0 và so sánh với c để kết luận</text>
          <line x1="30" y1="180" x2="410" y2="180" stroke="#334155" stroke-width="1"/>
          <text x="30" y="210" fill="#fbbf24" font-size="13">&#9733; Dấu &#8804;, &#8805;: vẽ nét liền (lấy bờ d). Dấu &lt;, &gt;: nét đứt (bỏ bờ d).</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 3) {
    // Chapter 3: Trigonometry & Triangles
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#059669" stroke-width="2"/>
        <text x="50" y="45" fill="#34d399" font-size="22" font-weight="bold">HỆ THỨC LƯỢNG TAM GIÁC &amp; CÔNG THỨC DIỆN TÍCH</text>
        
        <g transform="translate(50, 75)">
          <rect width="380" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <polygon points="190,35 60,195 320,195" fill="#059669" fill-opacity="0.2" stroke="#10b981" stroke-width="3"/>
          <text x="185" y="25" fill="#ffffff" font-size="18" font-weight="bold">A</text>
          <text x="40" y="210" fill="#ffffff" font-size="18" font-weight="bold">B</text>
          <text x="330" y="210" fill="#ffffff" font-size="18" font-weight="bold">C</text>
          <text x="190" y="215" fill="#34d399" font-size="16" font-weight="bold">a</text>
          <text x="100" y="110" fill="#34d399" font-size="16" font-weight="bold">c</text>
          <text x="270" y="110" fill="#34d399" font-size="16" font-weight="bold">b</text>
          <circle cx="190" cy="130" r="75" fill="none" stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="4,4"/>
          <text x="215" y="135" fill="#a7f3d0" font-size="14">R</text>
        </g>

        <g transform="translate(470, 75)">
          <rect width="480" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#34d399" font-size="16" font-weight="bold">Định lý Côsin: a&#178; = b&#178; + c&#178; - 2bc&#183;cosA</text>
          <text x="30" y="70" fill="#34d399" font-size="16" font-weight="bold">Định lý Sin: a/sinA = b/sinB = c/sinC = 2R</text>
          <line x1="30" y1="90" x2="450" y2="90" stroke="#334155" stroke-width="1"/>
          <text x="30" y="120" fill="#f8fafc" font-size="15">5 Công thức tính diện tích tam giác S:</text>
          <text x="30" y="150" fill="#e2e8f0" font-size="14">&#8226; S = &#189; a&#183;h_a = &#189; ab&#183;sinC</text>
          <text x="30" y="180" fill="#e2e8f0" font-size="14">&#8226; S = abc / (4R) = p&#183;r</text>
          <text x="30" y="210" fill="#fbbf24" font-size="14">&#8226; Công thức Heron: S = &#8730;[p(p - a)(p - b)(p - c)]</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 4) {
    // Chapter 4: Vectors
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#7c3aed" stroke-width="2"/>
        <text x="50" y="45" fill="#a78bfa" font-size="22" font-weight="bold">QUY TẮC CỘNG TRỪ VECTƠ &amp; TÍCH VÔ HƯỚNG</text>
        
        <g transform="translate(45, 75)">
          <rect width="285" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="25" y="32" fill="#a78bfa" font-size="15" font-weight="bold">QUY TẮC TAM GIÁC</text>
          <line x1="45" y1="160" x2="155" y2="80" stroke="#8b5cf6" stroke-width="3"/>
          <polygon points="155,80 143,88 147,98" fill="#8b5cf6"/>
          <line x1="155" y1="80" x2="235" y2="160" stroke="#8b5cf6" stroke-width="3"/>
          <polygon points="235,160 225,150 221,160" fill="#8b5cf6"/>
          <line x1="45" y1="160" x2="235" y2="160" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,4"/>
          <polygon points="235,160 223,155 223,165" fill="#38bdf8"/>
          <text x="35" y="180" fill="#ffffff" font-size="14">A</text>
          <text x="155" y="70" fill="#ffffff" font-size="14">B</text>
          <text x="240" y="180" fill="#ffffff" font-size="14">C</text>
          <text x="140" y="210" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="middle">AB + BC = AC</text>
        </g>

        <g transform="translate(355, 75)">
          <rect width="285" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="25" y="32" fill="#a78bfa" font-size="15" font-weight="bold">QUY TẮC HÌNH BÌNH HÀNH</text>
          <line x1="45" y1="150" x2="135" y2="70" stroke="#ec4899" stroke-width="2.5"/>
          <line x1="45" y1="150" x2="195" y2="150" stroke="#ec4899" stroke-width="2.5"/>
          <line x1="45" y1="150" x2="275" y2="70" stroke="#fbbf24" stroke-width="3"/>
          <text x="35" y="165" fill="#ffffff" font-size="14">A</text>
          <text x="130" y="60" fill="#ffffff" font-size="14">B</text>
          <text x="195" y="165" fill="#ffffff" font-size="14">D</text>
          <text x="280" y="65" fill="#ffffff" font-size="14">C</text>
          <text x="160" y="210" fill="#fbbf24" font-size="15" font-weight="bold" text-anchor="middle">AB + AD = AC</text>
        </g>

        <g transform="translate(665, 75)">
          <rect width="290" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="25" y="32" fill="#a78bfa" font-size="15" font-weight="bold">TÍCH VÔ HƯỚNG u &#183; v</text>
          <text x="25" y="70" fill="#34d399" font-size="16" font-weight="bold">u &#183; v = |u|&#183;|v|&#183;cos(u, v)</text>
          <text x="25" y="105" fill="#f8fafc" font-size="14">Trong Oxy: u=(x&#8321;; y&#8321;), v=(x&#8322;; y&#8322;)</text>
          <text x="25" y="140" fill="#38bdf8" font-size="15" font-weight="bold">u &#183; v = x&#8321;x&#8322; + y&#8321;y&#8322;</text>
          <line x1="25" y1="160" x2="265" y2="160" stroke="#334155" stroke-width="1"/>
          <text x="25" y="195" fill="#fb7185" font-size="14" font-weight="bold">u &#8869; v &#8660; x&#8321;x&#8322; + y&#8321;y&#8322; = 0</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 5) {
    // Chapter 5: Statistics
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#d97706" stroke-width="2"/>
        <text x="50" y="45" fill="#fbbf24" font-size="22" font-weight="bold">CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM VÀ ĐỘ PHÂN TÁN</text>
        
        <g transform="translate(50, 75)">
          <rect width="430" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#fbbf24" font-size="15" font-weight="bold">BIỂU ĐỒ HỘP (BOX-PLOT) 5 SỐ ĐẶC TRƯNG</text>
          
          <line x1="50" y1="110" x2="120" y2="110" stroke="#f59e0b" stroke-width="2"/>
          <line x1="50" y1="90" x2="50" y2="130" stroke="#f59e0b" stroke-width="2"/>
          <rect x="120" y="80" width="160" height="60" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="2"/>
          <line x1="200" y1="80" x2="200" y2="140" stroke="#ef4444" stroke-width="3"/>
          <line x1="280" y1="110" x2="360" y2="110" stroke="#f59e0b" stroke-width="2"/>
          <line x1="360" y1="90" x2="360" y2="130" stroke="#f59e0b" stroke-width="2"/>

          <text x="50" y="165" fill="#cbd5e1" font-size="13" text-anchor="middle">x_min</text>
          <text x="120" y="165" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Q&#8321; (25%)</text>
          <text x="200" y="165" fill="#f87171" font-size="14" font-weight="bold" text-anchor="middle">Me=Q&#8322; (50%)</text>
          <text x="280" y="165" fill="#34d399" font-size="14" font-weight="bold" text-anchor="middle">Q&#8323; (75%)</text>
          <text x="360" y="165" fill="#cbd5e1" font-size="13" text-anchor="middle">x_max</text>
          <text x="200" y="200" fill="#fbbf24" font-size="14" text-anchor="middle">Khoảng tứ phân vị: &#916;Q = Q&#8323; - Q&#8321;</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#fbbf24" font-size="16" font-weight="bold">Số trung bình: x&#772; = (x&#8321; + ... + x_n)/n</text>
          <text x="30" y="70" fill="#fbbf24" font-size="16" font-weight="bold">Mốt (Mo): Giá trị có tần số lớn nhất</text>
          <line x1="30" y1="90" x2="410" y2="90" stroke="#334155" stroke-width="1"/>
          <text x="30" y="120" fill="#f8fafc" font-size="14">Đo độ phân tán (Độ ổn định mẫu số liệu):</text>
          <text x="30" y="150" fill="#38bdf8" font-size="15">&#8226; Khoảng biến thiên: R = x_max - x_min</text>
          <text x="30" y="180" fill="#34d399" font-size="15">&#8226; Phương sai: s&#178; = 1/n &#183; &#931;(x_i - x&#772;)&#178;</text>
          <text x="30" y="210" fill="#a78bfa" font-size="15">&#8226; Độ lệch chuẩn: s = &#8730;(s&#178;)</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 6) {
    // Chapter 6: Quadratic Functions
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#e11d48" stroke-width="2"/>
        <text x="50" y="45" fill="#fb7185" font-size="22" font-weight="bold">HÀM SỐ BẬC HAI &amp; DẤU CỦA TAM THỨC BẬC HAI</text>
        
        <g transform="translate(50, 75)">
          <rect width="430" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <line x1="30" y1="180" x2="390" y2="180" stroke="#64748b" stroke-width="2"/>
          <line x1="210" y1="20" x2="210" y2="210" stroke="#64748b" stroke-width="2"/>
          <path d="M 80 40 Q 210 240 340 40" fill="none" stroke="#f43f5e" stroke-width="3"/>
          <circle cx="210" cy="140" r="5" fill="#fbbf24"/>
          <text x="225" y="145" fill="#fbbf24" font-size="14" font-weight="bold">Đỉnh I(-b/2a; -&#916;/4a)</text>
          <line x1="210" y1="30" x2="210" y2="190" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,4"/>
          <text x="210" y="215" fill="#cbd5e1" font-size="13" text-anchor="middle">Trục đối xứng x = -b/2a</text>
          <text x="75" y="30" fill="#f43f5e" font-size="14" font-weight="bold">a &gt; 0: Bề lõm quay lên</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#fb7185" font-size="16" font-weight="bold">ĐỊNH LÝ DẤU TAM THỨC: f(x) = ax&#178; + bx + c</text>
          <text x="30" y="75" fill="#38bdf8" font-size="15">&#8226; &#916; &lt; 0: f(x) cùng dấu với a với mọi x &#8712; R</text>
          <text x="30" y="110" fill="#34d399" font-size="15">&#8226; &#916; = 0: f(x) cùng dấu với a với mọi x &#8800; -b/2a</text>
          <text x="30" y="145" fill="#fbbf24" font-size="15" font-weight="bold">&#8226; &#916; &gt; 0: &quot;Trong trái dấu a, Ngoài cùng dấu a&quot;</text>
          <line x1="30" y1="170" x2="410" y2="170" stroke="#334155" stroke-width="1"/>
          <text x="30" y="205" fill="#cbd5e1" font-size="14">Nghiệm BPT bậc hai: quy tắc xét dấu trục số R</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 7) {
    // Chapter 7: Coordinate Geometry Oxy
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#2563eb" stroke-width="2"/>
        <text x="50" y="45" fill="#60a5fa" font-size="22" font-weight="bold">HÌNH HỌC TỌA ĐỘ OXY: ĐƯỜNG THẲNG, ĐƯỜNG TRÒN &amp; BA ĐƯỜNG CONIC</text>
        
        <g transform="translate(50, 75)">
          <rect width="430" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="25" y="32" fill="#60a5fa" font-size="15" font-weight="bold">ĐƯỜNG THẲNG &amp; KHOẢNG CÁCH</text>
          <text x="25" y="65" fill="#f8fafc" font-size="14">PTTQ: ax + by + c = 0 (VTPT n = (a; b))</text>
          <text x="25" y="95" fill="#f8fafc" font-size="14">PT tham số: {x = x&#8320; + t&#183;u&#8321;, y = y&#8320; + t&#183;u&#8322;}</text>
          <line x1="25" y1="115" x2="400" y2="115" stroke="#334155" stroke-width="1"/>
          <text x="25" y="145" fill="#34d399" font-size="15" font-weight="bold">d(M&#8320;, &#916;) = |ax&#8320; + by&#8320; + c| / &#8730;(a&#178; + b&#178;)</text>
          <text x="25" y="180" fill="#fbbf24" font-size="14">Góc &#966;: cos&#966; = |a&#8321;a&#8322; + b&#8321;b&#8322;| / (&#8730;(a&#8321;&#178;+b&#8321;&#178;)&#8730;(a&#8322;&#178;+b&#8322;&#178;))</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="25" y="32" fill="#60a5fa" font-size="15" font-weight="bold">ĐƯỜNG TRÒN &amp; BA ĐƯỜNG CONIC</text>
          <text x="25" y="65" fill="#f8fafc" font-size="14">Đường tròn: (x - a)&#178; + (y - b)&#178; = R&#178;</text>
          <text x="25" y="95" fill="#38bdf8" font-size="14">Tâm I(a; b), bán kính R = &#8730;(a&#178; + b&#178; - c)</text>
          <line x1="25" y1="115" x2="410" y2="115" stroke="#334155" stroke-width="1"/>
          <text x="25" y="145" fill="#a78bfa" font-size="14" font-weight="bold">&#8226; Elip: x&#178;/a&#178; + y&#178;/b&#178; = 1 (c&#178; = a&#178; - b&#178;)</text>
          <text x="25" y="175" fill="#ec4899" font-size="14" font-weight="bold">&#8226; Hypebol: x&#178;/a&#178; - y&#178;/b&#178; = 1 (c&#178; = a&#178; + b&#178;)</text>
          <text x="25" y="205" fill="#34d399" font-size="14" font-weight="bold">&#8226; Parabol: y&#178; = 2px (tiêu điểm F(p/2; 0))</text>
        </g>
      </g>
    `;
  } else if (lesson.chapterNumber === 8) {
    // Chapter 8: Combinatorics
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#0d9488" stroke-width="2"/>
        <text x="50" y="45" fill="#2dd4bf" font-size="22" font-weight="bold">ĐẠI SỐ TỔ HỢP: QUY TẮC ĐẾM, HOÁN VỊ, CHỈNH HỢP &amp; TỔ HỢP</text>
        
        <g transform="translate(50, 75)">
          <rect width="900" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          
          <rect x="20" y="15" width="860" height="40" fill="#1e293b" rx="8"/>
          <text x="50" y="42" fill="#2dd4bf" font-size="16" font-weight="bold">Khái niệm</text>
          <text x="220" y="42" fill="#2dd4bf" font-size="16" font-weight="bold">Công thức tính</text>
          <text x="450" y="42" fill="#2dd4bf" font-size="16" font-weight="bold">Thứ tự sắp xếp?</text>
          <text x="680" y="42" fill="#2dd4bf" font-size="16" font-weight="bold">Ứng dụng thực tế</text>

          <text x="50" y="90" fill="#f8fafc" font-size="15" font-weight="bold">Hoán vị P_n</text>
          <text x="220" y="90" fill="#34d399" font-size="15" font-weight="bold">P_n = n!</text>
          <text x="450" y="90" fill="#38bdf8" font-size="15">CÓ thứ tự (tất cả n)</text>
          <text x="680" y="90" fill="#cbd5e1" font-size="14">Xếp hàng, hoán vị chỗ</text>

          <line x1="20" y1="110" x2="880" y2="110" stroke="#334155" stroke-width="1"/>

          <text x="50" y="140" fill="#f8fafc" font-size="15" font-weight="bold">Chỉnh hợp A_n^k</text>
          <text x="220" y="140" fill="#34d399" font-size="15" font-weight="bold">A_n^k = n!/(n - k)!</text>
          <text x="450" y="140" fill="#f87171" font-size="15" font-weight="bold">CÓ thứ tự (chọn k)</text>
          <text x="680" y="140" fill="#cbd5e1" font-size="14">Bầu Trưởng - Phó, số xe</text>

          <line x1="20" y1="160" x2="880" y2="160" stroke="#334155" stroke-width="1"/>

          <text x="50" y="190" fill="#f8fafc" font-size="15" font-weight="bold">Tổ hợp C_n^k</text>
          <text x="220" y="190" fill="#34d399" font-size="15" font-weight="bold">C_n^k = n!/[k!(n-k)!]</text>
          <text x="450" y="190" fill="#fbbf24" font-size="15" font-weight="bold">KHÔNG thứ tự</text>
          <text x="680" y="190" fill="#cbd5e1" font-size="14">Chọn tổ công tác, rút bài</text>
        </g>
      </g>
    `;
  } else {
    // Chapter 9: Probability
    diagramSvg = `
      <g transform="translate(100, 470)">
        <rect width="1000" height="350" rx="24" fill="#1e293b" stroke="#9333ea" stroke-width="2"/>
        <text x="50" y="45" fill="#c084fc" font-size="22" font-weight="bold">TÍNH XÁC SUẤT THEO ĐỊNH NGHĨA CỔ ĐIỂN</text>
        
        <g transform="translate(50, 75)">
          <rect width="430" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#c084fc" font-size="17" font-weight="bold">CÔNG THỨC XÁC SUẤT CỔ ĐIỂN:</text>
          
          <rect x="50" y="60" width="330" height="70" rx="12" fill="#7e22ce" fill-opacity="0.2" stroke="#a855f7"/>
          <text x="215" y="105" fill="#f8fafc" font-size="28" font-weight="bold" text-anchor="middle">P(A) = n(A) / n(&#937;)</text>
          
          <text x="30" y="160" fill="#cbd5e1" font-size="14">&#8226; n(A): Số kết quả thuận lợi cho biến cố A</text>
          <text x="30" y="190" fill="#cbd5e1" font-size="14">&#8226; n(&#937;): Số phần tử của không gian mẫu &#937;</text>
        </g>

        <g transform="translate(510, 75)">
          <rect width="440" height="235" rx="16" fill="#0f172a" stroke="#334155"/>
          <text x="30" y="35" fill="#c084fc" font-size="17" font-weight="bold">QUY TẮC BIẾN CỐ ĐỐI (PHẦN BÙ):</text>
          
          <rect x="50" y="60" width="340" height="70" rx="12" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8"/>
          <text x="220" y="105" fill="#38bdf8" font-size="26" font-weight="bold" text-anchor="middle">P(A&#772;) = 1 - P(A)</text>
          
          <text x="30" y="160" fill="#fbbf24" font-size="15" font-weight="bold">&#9733; MẸO GIẢI TOÁN NHANH TRONG ĐỀ THI:</text>
          <text x="30" y="190" fill="#cbd5e1" font-size="14">Khi gặp từ khóa &quot;ít nhất một&quot;, hãy tính biến cố đối!</text>
        </g>
      </g>
    `;
  }

  // Key formulas list items
  const formulasSvg = lesson.keyFormulas.map((f, i) => `
    <g transform="translate(100, ${855 + i * 85})">
      <rect width="1000" height="68" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
      <circle cx="45" cy="34" r="18" fill="#3b82f6" fill-opacity="0.2"/>
      <text x="45" y="40" fill="#60a5fa" font-size="16" font-weight="bold" text-anchor="middle">${i + 1}</text>
      <text x="85" y="42" fill="#f8fafc" font-family="Courier New, monospace" font-size="18" font-weight="bold">${escapeXml(f)}</text>
    </g>
  `).join('');

  // Highlights badges
  const highlightsSvg = lesson.highlights.map((h, i) => `
    <g transform="translate(${100 + i * 340}, 1450)">
      <rect width="320" height="50" rx="12" fill="#065f46" fill-opacity="0.3" stroke="#059669" stroke-width="1.5"/>
      <text x="160" y="32" fill="#34d399" font-size="15" font-weight="bold" text-anchor="middle">&#10003; ${escapeXml(h)}</text>
    </g>
  `).join('');

  const escapedTitle = escapeXml(lesson.title);
  const escapedChapterRoman = escapeXml(lesson.chapterRoman);
  const escapedChapterTitle = escapeXml(lesson.chapterTitle);
  const escapedBaiCode = escapeXml(lesson.baiCode);
  const escapedDescLine1 = escapeXml(lesson.description.slice(0, 110));
  const escapedDescLine2 = escapeXml(lesson.description.slice(110, 230));
  const escapedFilename = escapeXml(lesson.filename);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- Decorative Grid Pattern -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="0" y1="800" x2="1200" y2="800"/>
    <line x1="0" y1="1000" x2="1200" y2="1000"/>
    <line x1="0" y1="1200" x2="1200" y2="1200"/>
    <line x1="0" y1="1400" x2="1200" y2="1400"/>
    <line x1="300" y1="0" x2="300" y2="1600"/>
    <line x1="600" y1="0" x2="600" y2="1600"/>
    <line x1="900" y1="0" x2="900" y2="1600"/>
  </g>

  <!-- Top Brand Banner -->
  <rect x="0" y="0" width="${width}" height="14" fill="url(#headerGrad)"/>

  <!-- Header Area -->
  <g transform="translate(100, 60)">
    <text x="0" y="30" fill="#34d399" font-size="18" font-weight="bold" letter-spacing="3">TOÁN 10 &#8211; KHÁM PHÁ TOÁN HỌC SỐ (GDPT 2018)</text>
    
    <!-- Chapter and Lesson Badges -->
    <rect x="0" y="55" width="220" height="38" rx="10" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="1.5"/>
    <text x="110" y="80" fill="#93c5fd" font-size="16" font-weight="bold" text-anchor="middle">${escapedChapterRoman}</text>

    <rect x="235" y="55" width="220" height="38" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#34d399" stroke-width="1.5"/>
    <text x="345" y="80" fill="#6ee7b7" font-size="16" font-weight="bold" text-anchor="middle">${escapedBaiCode}</text>

    <!-- Lesson Title -->
    <text x="0" y="145" fill="#ffffff" font-size="40" font-weight="900">${escapedTitle}</text>
    <text x="0" y="190" fill="#a5f3fc" font-size="20" font-weight="500">Chủ đề: ${escapedChapterTitle}</text>
  </g>

  <!-- Summary Description Card -->
  <g transform="translate(100, 280)">
    <rect width="1000" height="155" rx="20" fill="#1e293b" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
    <text x="40" y="45" fill="#38bdf8" font-size="18" font-weight="bold">TÓM TẮT NỘI DUNG BÀI HỌC:</text>
    <text x="40" y="85" fill="#e2e8f0" font-size="17">${escapedDescLine1}</text>
    <text x="40" y="118" fill="#cbd5e1" font-size="16">${escapedDescLine2}</text>
  </g>

  <!-- Interactive Graphic Section -->
  ${diagramSvg}

  <!-- Section Title for Formulas -->
  <g transform="translate(100, 835)">
    <text x="0" y="0" fill="#facc15" font-size="22" font-weight="bold">&#9733; CÔNG THỨC &amp; ĐỊNH LÝ TRỌNG TÂM CẦN GHI NHỚ:</text>
  </g>

  <!-- Formulas list -->
  ${formulasSvg}

  <!-- Highlights & Checklist -->
  <g transform="translate(100, 1425)">
    <text x="0" y="0" fill="#34d399" font-size="20" font-weight="bold">KỸ NĂNG &amp; DẠNG TOÁN THEN CHỐT:</text>
  </g>
  ${highlightsSvg}

  <!-- Footer -->
  <g transform="translate(100, 1550)">
    <line x1="0" y1="0" x2="1000" y2="0" stroke="#334155" stroke-width="1"/>
    <text x="0" y="24" fill="#64748b" font-size="14">Học liệu số Toán lớp 10 &#8226; Tệp: ${escapedFilename}</text>
    <text x="1000" y="24" fill="#64748b" font-size="14" text-anchor="end">Trực quan hóa Infographic GDPT 2018</text>
  </g>
</svg>
`;
}
