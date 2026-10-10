const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../public/infographics');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function pageHtml({ ch, num, title, muc, tag, dam, vua, nhat, cardsHtml }) {
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ${ch.toUpperCase()} – BÀI ${num}: ${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>
:root{--dam:${dam};--vua:${vua};--nhat:${nhat};}
@page { size: 210mm 297mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 13px; }
body { width: 794px; height: 1123px; overflow: hidden; font-family: 'Be Vietnam Pro', 'Segoe UI', sans-serif;
  color: #1F2937; background: #FFFFFF; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 794px; height: 1123px; display: flex; flex-direction: column; background:
  radial-gradient(circle at 100% 0%, var(--nhat) 0, transparent 38%), radial-gradient(circle at 0% 100%, var(--nhat) 0, transparent 30%), #FFFFFF; }
.hd { position: relative; padding: 16px 26px 14px 26px; color: #fff; overflow: hidden;
  background: linear-gradient(120deg, var(--dam) 0%, var(--vua) 100%); }
.hd::after { content: ""; position: absolute; right: -60px; top: -70px; width: 230px; height: 230px; border-radius: 50%;
  background: rgba(255,255,255,.10); }
.hd .ch { padding-right: 200px; font-size: .82rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; opacity: .92; }
.hd .row { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
.hd .so { flex: none; width: 64px; height: 64px; border-radius: 18px; background: #FFD43B; color: var(--dam);
  display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 800;
  box-shadow: 0 4px 0 rgba(0,0,0,.18); }
.hd .so.ot { width: 84px; } .hd .so.ot b { font-size: 1.7rem; }
.hd .so small { font-size: .7rem; font-weight: 700; line-height: 1; }
.hd .so b { font-size: 2rem; line-height: 1; }
.hd h1 { font-size: 1.95rem; line-height: 1.12; font-weight: 800; text-transform: uppercase; letter-spacing: .01em; }
.hd .muc { margin-top: 8px; font-size: .9rem; background: rgba(255,255,255,.16); border-radius: 10px; padding: 5px 10px;
  display: inline-block; position: relative; z-index: 1; }
.hd .tag { position: absolute; right: 22px; top: 14px; font-size: .72rem; font-weight: 700; background: rgba(0,0,0,.18);
  border-radius: 20px; padding: 3px 10px; z-index: 1; }
.main { flex: 1; min-height: 0; padding: 14px 20px 6px 20px; display: flex; flex-direction: column; }
.blk { display: flex; gap: 14px; align-items: flex-start; flex-shrink: 0; } .main > .card { flex-shrink: 0; } .col { flex: 1; min-width: 0; }
.pool { display: none; }
.card { break-inside: avoid; background: #fff; border-radius: 14px; margin-bottom: 12px; padding: 10px 12px 10px 12px;
  border: 1.5px solid color-mix(in srgb, var(--vua) 35%, #fff); box-shadow: 0 2px 0 color-mix(in srgb, var(--vua) 25%, #fff); }
.card.span { }
.card h2 { display: flex; align-items: center; gap: 8px; font-size: 1.05rem; font-weight: 800; color: var(--dam); margin-bottom: 6px; }
.card h2 .n { flex: none; width: 22px; height: 22px; border-radius: 50%; background: var(--dam); color: #fff; font-size: .78rem;
  display: flex; align-items: center; justify-content: center; }
.card h2 .ic { font-size: 1.15rem; }
.card p, .card li { line-height: 1.45; }
.card p + p { margin-top: 4px; }
.card ul { padding-left: 16px; } .card li { margin: 2px 0; } .card li::marker { color: var(--vua); }
.f { background: #FFF7D1; border-left: 4px solid #F5B700; border-radius: 8px; padding: 6px 10px; margin: 6px 0;
  text-align: center; font-size: 1.04rem; }
.f.l { text-align: left; }
.k { color: var(--dam); font-weight: 700; }
mark { background: #FFEB99; color: inherit; padding: 0 2px; border-radius: 4px; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.do { color: #DC2626; font-weight: 700; }
.xanh { color: #15803D; font-weight: 700; }
.nho { font-size: .86rem; color: #4B5563; }
.vd { background: var(--nhat); border-radius: 8px; padding: 5px 9px; margin-top: 6px; font-size: .9rem; }
.vd b { color: var(--dam); }
.ft { padding: 8px 24px 10px 24px; display: flex; justify-content: space-between; align-items: center;
  font-size: .75rem; color: #6B7280; border-top: 1px dashed #D1D5DB; }
.ft b { color: var(--dam); }
table.t1 { width: 100%; border-collapse: collapse; margin: 6px 0; font-size: .92rem; }
table.t1 th, table.t1 td { border: 1px solid #E5E7EB; padding: 5px 8px; text-align: left; }
table.t1 th { background: var(--nhat); color: var(--dam); font-weight: 700; }
table.t1 td.c, table.t1 th.c { text-align: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0; }
.box-pill { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; font-size: .9rem; }
</style></head><body>
<div class="page">
<div class="hd">
  <div class="ch">${ch}</div>
  <div class="row">
    <div class="so ${String(num).includes('Ôn') ? 'ot' : ''}">${String(num).includes('Ôn') ? '<b>TỔNG KẾT</b>' : `<small>BÀI</small><b>${num}</b>`}</div>
    <h1>${title}</h1>
  </div>
  <div class="muc">${muc}</div>
  <div class="tag">${tag}</div>
</div>
<div class="main"></div>
<div class="pool">
${cardsHtml}
</div>
<div class="ft">
  <span>Tài liệu số hoá Toán 10 • GDPT 2018</span>
  <span><b>${ch}</b> • ${title}</span>
  <span>Bản quyền học liệu số Toán học</span>
</div>
</div>
<script>
window.addEventListener('DOMContentLoaded', function(){
 renderMathInElement(document.body,{delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false}],throwOnError:false});
 var fs=13, pg=document.querySelector('.page'), m=document.querySelector('.main');
 var cards=[].slice.call(document.querySelectorAll('.pool .card'));
 function layout(){
  m.innerHTML=''; var blk=null;
  cards.forEach(function(c){
   if(c.classList.contains('span')){ m.appendChild(c); blk=null; return; }
   if(!blk){ blk=document.createElement('div'); blk.className='blk';
     blk.innerHTML='<div class="col"></div><div class="col"></div>'; m.appendChild(blk); }
   var a=blk.children[0], b=blk.children[1];
   (a.offsetHeight<=b.offsetHeight?a:b).appendChild(c);
  });
 }
 function over(){ layout(); return m.scrollHeight>m.clientHeight+1 || pg.scrollHeight>1125; }
 function set(v){ fs=v; document.documentElement.style.fontSize=v+'px'; }
 while(!over() && fs<17){ set(fs+0.25); }
 while(over() && fs>10){ set(fs-0.25); }
 set(fs-0.5); layout();
 document.title += ' ['+fs+']';
});
</script></body></html>`;
}

// ==================== BÀI 15 ====================
const f15 = pageHtml({
  ch: 'Chương VI: Hàm số, đồ thị và ứng dụng',
  num: '15',
  title: 'Hàm số và đồ thị',
  muc: 'Định nghĩa hàm số, tập xác định D, tập giá trị, tính đồng biến – nghịch biến, đồ thị hàm số',
  tag: 'HÀM SỐ TOÁN 10',
  dam: '#BE123C', vua: '#F43F5E', nhat: '#FFF1F2',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🎯</span>Khái niệm Hàm số & Tập xác định</h2>
    <p>Cho tập hợp khác rỗng $D \\subset \\mathbb{R}$. Nếu với mỗi giá trị $x \\in D$ có tương ứng <mark class="k">duy nhất một</mark> giá trị $y \\in \\mathbb{R}$ thì ta có một <b class="k">hàm số</b> $y = f(x)$.</p>
    <div class="f">$$y = f(x), \\quad x \\in D \\;\\text{(Tập xác định)}, \\quad T = \\{f(x) \\mid x \\in D\\} \\;\\text{(Tập giá trị)}$$</div>
    <div class="grid2">
      <div class="box-pill"><b>Điều kiện mẫu thức:</b> $\\frac{P(x)}{Q(x)}$ xác định khi $Q(x) \\neq 0$.</div>
      <div class="box-pill"><b>Điều kiện căn thức bậc chẵn:</b> $\\sqrt{P(x)}$ xác định khi $P(x) \\ge 0$.</div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">📈</span>Sự đồng biến và nghịch biến</h2>
    <p>Hàm số $y = f(x)$ xác định trên khoảng $(a; b)$:</p>
    <ul>
      <li><b class="xanh">Đồng biến (tăng):</b> $\\forall x_1, x_2 \\in (a; b): x_1 < x_2 \\implies f(x_1) < f(x_2)$. (Đồ thị đi lên từ trái sang phải)</li>
      <li><b class="do">Nghịch biến (giảm):</b> $\\forall x_1, x_2 \\in (a; b): x_1 < x_2 \\implies f(x_1) > f(x_2)$. (Đồ thị đi xuống từ trái sang phải)</li>
    </ul>
    <div class="f">$$\\frac{f(x_2) - f(x_1)}{x_2 - x_1} > 0 \\iff \\text{Đồng biến}; \\quad < 0 \\iff \\text{Nghịch biến}$$</div>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">📊</span>Đồ thị hàm số & Điểm thuộc đồ thị</h2>
    <p>Đồ thị hàm số $y=f(x)$ là tập hợp các điểm $M(x; f(x))$ trên mặt phẳng tọa độ $Oxy$ với mọi $x \\in D$.</p>
    <div class="vd"><b>Điểm $M(x_0; y_0) \\in (C)$:</b> $\\iff y_0 = f(x_0)$.</div>
    <p class="nho mt-1">Đồ thị hàm số cho phép quan sát trực quan tính đơn điệu, giá trị lớn nhất, nhỏ nhất và sự biến thiên trên từng khoảng.</p>
  </div>
  `
});

// ==================== BÀI 16 ====================
const f16 = pageHtml({
  ch: 'Chương VI: Hàm số, đồ thị và ứng dụng',
  num: '16',
  title: 'Hàm số bậc hai',
  muc: 'Hàm số $y = ax^2 + bx + c$ ($a \\neq 0$), đỉnh parabol, trục đối xứng, bảng biến thiên',
  tag: 'PARABOL TOÁN 10',
  dam: '#BE123C', vua: '#F43F5E', nhat: '#FFF1F2',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">⚡</span>Định nghĩa & Yếu tố cơ bản của Parabol</h2>
    <p>Hàm số bậc hai có dạng <mark class="k">$y = ax^2 + bx + c$</mark> ($a \\neq 0$). Đồ thị là một đường cong <b class="k">Parabol $(P)$</b>.</p>
    <div class="grid2">
      <div class="f"><b>Tọa độ đỉnh:</b> $$I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)$$</div>
      <div class="f"><b>Trục đối xứng:</b> $$x = -\\frac{b}{2a}$$</div>
    </div>
    <p class="nho">Tập xác định: $D = \\mathbb{R}$. Cắt trục tung tại điểm $(0; c)$.</p>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">📊</span>Bề lõm & Chiều biến thiên</h2>
    <ul>
      <li><b class="xanh">Trường hợp $a > 0$:</b> Bề lõm quay lên trên.
        <ul>
          <li>Nghịch biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$, đồng biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.</li>
          <li>Giá trị nhỏ nhất: $y_{\\min} = -\\frac{\\Delta}{4a}$ tại $x = -\\frac{b}{2a}$.</li>
        </ul>
      </li>
      <li><b class="do">Trường hợp $a < 0$:</b> Bề lõm quay xuống dưới.
        <ul>
          <li>Đồng biến trên $\\left(-\\infty; -\\frac{b}{2a}\\right)$, nghịch biến trên $\\left(-\\frac{b}{2a}; +\\infty\\right)$.</li>
          <li>Giá trị lớn nhất: $y_{\\max} = -\\frac{\\Delta}{4a}$ tại $x = -\\frac{b}{2a}$.</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">🎯</span>Các bước vẽ Parabol & Ứng dụng</h2>
    <ol style="padding-left:16px;line-height:1.5;">
      <li>Xác định toạ độ đỉnh $I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)$.</li>
      <li>Vẽ trục đối xứng $x = -\\frac{b}{2a}$.</li>
      <li>Tìm giao điểm với trục tung $(0; c)$ và giao điểm với $Ox$ (nếu có nghiệm).</li>
      <li>Lấy thêm các điểm đối xứng rồi vẽ parabol trơn đều.</li>
    </ol>
    <div class="vd"><b>Ứng dụng thực tế:</b> Quỹ đạo ném vật, cổng parabol, đèn pha chóa parabol, tối ưu doanh thu lợi nhuận kinh tế.</div>
  </div>
  `
});

// ==================== BÀI 17 ====================
const f17 = pageHtml({
  ch: 'Chương VI: Hàm số, đồ thị và ứng dụng',
  num: '17',
  title: 'Dấu của tam thức bậc hai',
  muc: 'Tam thức $f(x)=ax^2+bx+c$, định lý về dấu, bất phương trình bậc hai một ẩn',
  tag: 'ĐỊNH LÝ DẤU TAM THỨC',
  dam: '#BE123C', vua: '#F43F5E', nhat: '#FFF1F2',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">⚖️</span>Định lý về Dấu của Tam thức Bậc hai</h2>
    <p>Cho $f(x) = ax^2 + bx + c$ ($a \\neq 0$), biệt thức $\\Delta = b^2 - 4ac$ (hoặc $\\Delta' = b'^2 - ac$).</p>
    <table class="t1">
      <tr><th>Điều kiện $\\Delta$</th><th>Số nghiệm $f(x) = 0$</th><th>Dấu của $f(x)$</th></tr>
      <tr><td class="c"><b>$\\Delta < 0$</b></td><td class="c">Vô nghiệm</td><td>$f(x)$ <mark>luôn cùng dấu với hệ số $a$</mark> với mọi $x \\in \\mathbb{R}$.</td></tr>
      <tr><td class="c"><b>$\\Delta = 0$</b></td><td class="c">Nghiệm kép $x_0 = -\\frac{b}{2a}$</td><td>$f(x)$ cùng dấu với $a$ với mọi $x \\neq -\\frac{b}{2a}$; tại $x_0$ thì $f(x_0) = 0$.</td></tr>
      <tr><td class="c"><b>$\\Delta > 0$</b></td><td class="c">2 nghiệm $x_1 < x_2$</td><td><b class="do">Trong trái, Ngoài cùng:</b> Trong khoảng $(x_1; x_2)$ trái dấu với $a$; ngoài đoạn $[x_1; x_2]$ cùng dấu với $a$.</td></tr>
    </table>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">📝</span>Điều kiện tam thức không đổi dấu trên $\\mathbb{R}$</h2>
    <div class="f l">
      $$f(x) > 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta < 0 \\end{cases}$$
      $$f(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta \\le 0 \\end{cases}$$
    </div>
    <div class="f l">
      $$f(x) < 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta < 0 \\end{cases}$$
      $$f(x) \\le 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta \\le 0 \\end{cases}$$
    </div>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">🔍</span>Giải Bất phương trình Bậc hai một ẩn</h2>
    <p>Các dạng: $ax^2 + bx + c > 0$, $\\ge 0$, $< 0$, $\\le 0$.</p>
    <ol style="padding-left:16px;">
      <li>Tìm nghiệm của tam thức $f(x) = 0$.</li>
      <li>Lập trục xét dấu hoặc bảng xét dấu dựa vào câu thần chú <mark><b>"Trong trái - Ngoài cùng"</b></mark>.</li>
      <li>Kết luận tập nghiệm $S$ tương ứng với dấu yêu cầu.</li>
    </ol>
  </div>
  `
});

// ==================== BÀI 18 ====================
const f18 = pageHtml({
  ch: 'Chương VI: Hàm số, đồ thị và ứng dụng',
  num: '18',
  title: 'Phương trình quy về phương trình bậc hai',
  muc: 'Phương trình vô tỉ dạng $\\sqrt{f(x)} = \\sqrt{g(x)}$ và $\\sqrt{f(x)} = g(x)$',
  tag: 'PHƯƠNG TRÌNH VÔ TỈ',
  dam: '#BE123C', vua: '#F43F5E', nhat: '#FFF1F2',
  cardsHtml: `
  <div class="card">
    <h2><span class="n">1</span><span class="ic">🔑</span>Dạng 1: $\\sqrt{ax^2+bx+c} = \\sqrt{dx^2+ex+f}$</h2>
    <p><b>Phương pháp bình phương hai vế:</b></p>
    <div class="f">
      $$\\sqrt{f(x)} = \\sqrt{g(x)} \\implies f(x) = g(x)$$
    </div>
    <p><b>Quy trình thực hiện:</b></p>
    <ol style="padding-left:16px;">
      <li>Bình phương hai vế để khử căn thức: $f(x) = g(x)$.</li>
      <li>Chuyển vế giải phương trình bậc nhất hoặc bậc hai thu được.</li>
      <li><mark class="do">Thử lại các nghiệm</mark> tìm được vào phương trình ban đầu để loại nghiệm ngoại lai và kết luận nghiệm đúng.</li>
    </ol>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🛡️</span>Dạng 2: $\\sqrt{ax^2+bx+c} = dx + e$</h2>
    <p><b>Phương pháp tương đương hoặc hệ quả:</b></p>
    <div class="f">
      $$\\sqrt{f(x)} = g(x) \\iff \\begin{cases} g(x) \\ge 0 \\\\ f(x) = [g(x)]^2 \\end{cases}$$
    </div>
    <p><b>Cách tiếp cận SGK GDPT 2018:</b></p>
    <ul>
      <li>Bình phương 2 vế giải ra tập nghiệm $x$.</li>
      <li>Thay trực tiếp từng giá trị $x$ vào $g(x)$: nghiệm nào làm $g(x) \\ge 0$ và thỏa mãn phương trình gốc thì nhận.</li>
    </ul>
    <div class="vd"><b>Lưu ý:</b> Tuyệt đối không quên bước thử lại để loại bỏ nghiệm ngoại lai do phép biến đổi hệ quả sinh ra!</div>
  </div>
  `
});

// ==================== BÀI 18z ====================
const f18z = pageHtml({
  ch: 'Chương VI: Hàm số, đồ thị và ứng dụng',
  num: 'Ôn tập Chương VI',
  title: 'Hàm số, đồ thị và ứng dụng',
  muc: 'Tổng kết: Hàm số, Parabol $y=ax^2+bx+c$, định lý dấu tam thức bậc hai, phương trình vô tỉ',
  tag: 'TỔNG ÔN CHƯƠNG VI',
  dam: '#BE123C', vua: '#F43F5E', nhat: '#FFF1F2',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">★</span><span class="ic">🌟</span>Sơ đồ Tư duy & Công thức Cốt lõi Chương VI</h2>
    <div class="grid2">
      <div class="box-pill">
        <b class="k">Parabol $y=ax^2+bx+c$:</b>
        <div>Đỉnh $I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)$, trục đối xứng $x = -\\frac{b}{2a}$.</div>
        <div>$a > 0$: Quay lên, cực tiểu; $a < 0$: Quay xuống, cực đại.</div>
      </div>
      <div class="box-pill">
        <b class="k">Dấu Tam thức bậc hai:</b>
        <div>$\\Delta < 0$: Cùng dấu $a, \\forall x \\in \\mathbb{R}$.</div>
        <div>$\\Delta > 0$: "Trong trái - Ngoài cùng" hai nghiệm $x_1, x_2$.</div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">1</span><span class="ic">📌</span>Bảng xét dấu & Giải BPT Bậc hai</h2>
    <table class="t1">
      <tr><th>$x$</th><th>$-\\infty$</th><th>$x_1$</th><th>$x_2$</th><th>$+\\infty$</th></tr>
      <tr><td>$f(x)$</td><td class="c">Cùng dấu $a$</td><td class="c">0</td><td class="c">Trái dấu $a$</td><td class="c">0</td><td class="c">Cùng dấu $a$</td></tr>
    </table>
    <p class="nho">Phép phân tích nhân tử: $f(x) = a(x - x_1)(x - x_2)$ khi $\\Delta > 0$.</p>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🎯</span>Chiến lược giải PT Chứa căn & Ứng dụng</h2>
    <ul>
      <li>$\\sqrt{f} = \\sqrt{g}$: Bình phương $\\to$ Giải PT $\\to$ Thử lại.</li>
      <li>$\\sqrt{f} = g$: Đk $g \\ge 0$, bình phương $\\to$ Thử lại.</li>
      <li>Bài toán kinh tế: Tối ưu lợi nhuận $L(x) = R(x) - C(x)$ đưa về tìm đỉnh parabol.</li>
    </ul>
  </div>
  `
});

// ==================== BÀI 19 ====================
const f19 = pageHtml({
  ch: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
  num: '19',
  title: 'Phương trình đường thẳng',
  muc: 'Vectơ chỉ phương $\\vec{u}$, vectơ pháp tuyến $\\vec{n}$, phương trình tham số, phương trình tổng quát',
  tag: 'ĐƯỜNG THẲNG TRONG OXY',
  dam: '#1E40AF', vua: '#3B82F6', nhat: '#EFF6FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🧭</span>Vectơ chỉ phương $\\vec{u}$ và Vectơ pháp tuyến $\\vec{n}$</h2>
    <p>Đường thẳng $\\Delta$ hoàn toàn được xác định khi biết một điểm đi qua $M_0(x_0; y_0)$ và một vectơ định hướng:</p>
    <div class="grid2">
      <div class="box-pill">
        <b>VTCP $\\vec{u} = (u_1; u_2) \\neq \\vec{0}$:</b> Có giá song song hoặc trùng với $\\Delta$.
      </div>
      <div class="box-pill">
        <b>VTPT $\\vec{n} = (a; b) \\neq \\vec{0}$:</b> Có giá vuông góc với $\\Delta$.
      </div>
    </div>
    <div class="f">$$\\vec{u} \\perp \\vec{n} \\iff \\vec{u} \\cdot \\vec{n} = 0 \\iff a \\cdot u_1 + b \\cdot u_2 = 0 \\implies \\vec{n} = (a; b) \\iff \\vec{u} = (-b; a) \\;\\text{hoặc}\\; (b; -a)$$</div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">📐</span>Phương trình Tổng quát của Đường thẳng</h2>
    <p>Đường thẳng đi qua $M_0(x_0; y_0)$ và nhận $\\vec{n} = (a; b)$ làm VTPT:</p>
    <div class="f">$$a(x - x_0) + b(y - y_0) = 0 \\iff ax + by + c = 0 \\quad (a^2 + b^2 > 0)$$</div>
    <p class="nho">Với $c = -ax_0 - by_0$. Hệ số góc của đường thẳng (khi $b \\neq 0$) là $k = -\\frac{a}{b}$.</p>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">🚀</span>Phương trình Tham số của Đường thẳng</h2>
    <p>Đường thẳng đi qua $M_0(x_0; y_0)$ và nhận $\\vec{u} = (u_1; u_2)$ làm VTCP:</p>
    <div class="f">$$\\begin{cases} x = x_0 + u_1 t \\\\ y = y_0 + u_2 t \\end{cases} \\quad (t \\in \\mathbb{R})$$</div>
    <p class="nho">Mỗi giá trị tham số $t$ tương ứng với một điểm duy nhất $M(x; y)$ trên đường thẳng.</p>
  </div>
  `
});

// ==================== BÀI 20 ====================
const f20 = pageHtml({
  ch: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
  num: '20',
  title: 'Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách',
  muc: 'Vị trí tương đối (cắt, song song, trùng nhau), góc giữa hai đường thẳng, công thức khoảng cách từ điểm đến đường thẳng',
  tag: 'GÓC & KHOẢNG CÁCH',
  dam: '#1E40AF', vua: '#3B82F6', nhat: '#EFF6FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🔄</span>Vị trí tương đối của hai đường thẳng</h2>
    <p>Cho $\\Delta_1: a_1 x + b_1 y + c_1 = 0$ và $\\Delta_2: a_2 x + b_2 y + c_2 = 0$. Số điểm chung là số nghiệm của hệ:</p>
    <div class="f">$$\\begin{cases} a_1 x + b_1 y + c_1 = 0 \\\\ a_2 x + b_2 y + c_2 = 0 \\end{cases} \\implies \\begin{matrix} \\text{Nghiệm duy nhất} & \\iff \\Delta_1 \\text{ cắt } \\Delta_2 \\\\ \\text{Vô nghiệm} & \\iff \\Delta_1 \\parallel \\Delta_2 \\\\ \\text{Vô số nghiệm} & \\iff \\Delta_1 \\equiv \\Delta_2 \\end{matrix}$$</div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">📐</span>Góc giữa hai đường thẳng</h2>
    <p>Cho VTPT $\\vec{n}_1 = (a_1; b_1)$ và $\\vec{n}_2 = (a_2; b_2)$. Góc $\\varphi = (\\Delta_1, \\Delta_2)$ với $0^\\circ \\le \\varphi \\le 90^\\circ$:</p>
    <div class="f">$$\\cos \\varphi = \\frac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{|\\vec{n}_1| |\\vec{n}_2|} = \\frac{|a_1 a_2 + b_1 b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$$</div>
    <div class="vd"><b>Điều kiện vuông góc:</b> $\\Delta_1 \\perp \\Delta_2 \\iff a_1 a_2 + b_1 b_2 = 0$.</div>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">📏</span>Khoảng cách từ một điểm đến đường thẳng</h2>
    <p>Khoảng cách từ điểm $M_0(x_0; y_0)$ đến đường thẳng $\\Delta: ax + by + c = 0$:</p>
    <div class="f">$$d(M_0, \\Delta) = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$$</div>
    <div class="vd"><b>Khoảng cách giữa 2 đường thẳng song song:</b> Lấy điểm $M \\in \\Delta_1$, khi đó $d(\\Delta_1, \\Delta_2) = d(M, \\Delta_2)$.</div>
  </div>
  `
});

// ==================== BÀI 21 ====================
const f21 = pageHtml({
  ch: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
  num: '21',
  title: 'Đường tròn trong mặt phẳng toạ độ',
  muc: 'Phương trình chính tắc, phương trình tổng quát, điều kiện là đường tròn, tiếp tuyến của đường tròn',
  tag: 'ĐƯỜNG TRÒN OXY',
  dam: '#1E40AF', vua: '#3B82F6', nhat: '#EFF6FF',
  cardsHtml: `
  <div class="card">
    <h2><span class="n">1</span><span class="ic">⚪</span>Phương trình chính tắc của đường tròn</h2>
    <p>Đường tròn $(C)$ tâm $I(a; b)$, bán kính $R > 0$ có phương trình:</p>
    <div class="f">$$(x - a)^2 + (y - b)^2 = R^2$$</div>
    <div class="vd"><b>Đặc biệt:</b> Tâm tại gốc tọa độ $O(0;0)$: $x^2 + y^2 = R^2$.</div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🔍</span>Phương trình tổng quát & Điều kiện</h2>
    <p>Phương trình dạng: $x^2 + y^2 - 2ax - 2by + c = 0$.</p>
    <div class="f">$$\\text{Điều kiện là đường tròn: } a^2 + b^2 - c > 0$$</div>
    <p>Khi đó đường tròn có:</p>
    <ul>
      <li><b class="k">Tọa độ tâm:</b> $I(a; b)$</li>
      <li><b class="k">Bán kính:</b> $R = \\sqrt{a^2 + b^2 - c}$</li>
    </ul>
  </div>
  <div class="card span">
    <h2><span class="n">3</span><span class="ic">🎯</span>Phương trình Tiếp tuyến của đường tròn</h2>
    <p>Phương trình tiếp tuyến của đường tròn $(C)$ tâm $I(a; b)$ tại điểm $M_0(x_0; y_0) \\in (C)$:</p>
    <div class="f">$$(x_0 - a)(x - x_0) + (y_0 - b)(y - y_0) = 0$$</div>
    <p class="nho">Tiếp tuyến tại $M_0$ nhận vectơ $\\vec{IM_0} = (x_0 - a; y_0 - b)$ làm VTPT.</p>
  </div>
  `
});

// ==================== BÀI 22 ====================
const f22 = pageHtml({
  ch: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
  num: '22',
  title: 'Ba đường conic trong mặt phẳng toạ độ',
  muc: 'Đường Elip, Hypebol, Parabol: định nghĩa tiêu cự, trục, phương trình chính tắc',
  tag: 'BA ĐƯỜNG CONIC',
  dam: '#1E40AF', vua: '#3B82F6', nhat: '#EFF6FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🥚</span>Đường Elip $(E)$</h2>
    <p>Tập hợp các điểm $M$ thỏa mãn $MF_1 + MF_2 = 2a$ ($a > c > 0$, tiêu cự $2c$, $b^2 = a^2 - c^2$):</p>
    <div class="f">$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\quad (a > b > 0)$$</div>
    <div class="grid2 nho">
      <div>• Tiêu điểm: $F_1(-c; 0), F_2(c; 0)$</div>
      <div>• Đỉnh: $A_1(-a; 0), A_2(a; 0), B_1(0; -b), B_2(0; b)$</div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">⏳</span>Đường Hypebol $(H)$</h2>
    <p>$|MF_1 - MF_2| = 2a$ ($0 < a < c$, $c^2 = a^2 + b^2$):</p>
    <div class="f">$$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\quad (a, b > 0)$$</div>
    <ul>
      <li>Tiêu điểm: $F_1(-c; 0), F_2(c; 0)$</li>
      <li>Đỉnh: $A_1(-a; 0), A_2(a; 0)$</li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">☄️</span>Đường Parabol $(P)$</h2>
    <p>$d(M, F) = d(M, \\Delta)$ với $p > 0$ (tham số tiêu):</p>
    <div class="f">$$y^2 = 2px \\quad (p > 0)$$</div>
    <ul>
      <li>Tiêu điểm: $F\\left(\\frac{p}{2}; 0\\right)$</li>
      <li>Đường chuẩn: $\\Delta: x = -\\frac{p}{2}$</li>
    </ul>
  </div>
  `
});

// ==================== BÀI 22z ====================
const f22z = pageHtml({
  ch: 'Chương VII: Phương pháp toạ độ trong mặt phẳng',
  num: 'Ôn tập Chương VII',
  title: 'Phương pháp toạ độ trong mặt phẳng',
  muc: 'Tổng kết: Đường thẳng, khoảng cách, góc, đường tròn và 3 đường conic trong mặt phẳng Oxy',
  tag: 'TỔNG ÔN CHƯƠNG VII',
  dam: '#1E40AF', vua: '#3B82F6', nhat: '#EFF6FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">★</span><span class="ic">🏛️</span>Hệ thống Công thức Cốt lõi Chương VII</h2>
    <div class="grid2">
      <div class="box-pill">
        <b class="k">Đường thẳng:</b>
        <div>$ax + by + c = 0$ (VTPT $\\vec{n}=(a;b)$)</div>
        <div>$\\begin{cases} x = x_0 + u_1 t \\\\ y = y_0 + u_2 t \\end{cases}$ (VTCP $\\vec{u}=(u_1;u_2)$)</div>
      </div>
      <div class="box-pill">
        <b class="k">Góc & Khoảng cách:</b>
        <div>$\\cos\\varphi = \\frac{|a_1 a_2 + b_1 b_2|}{\\sqrt{a_1^2+b_1^2}\\sqrt{a_2^2+b_2^2}}$</div>
        <div>$d(M_0, \\Delta) = \\frac{|a x_0 + b y_0 + c|}{\\sqrt{a^2 + b^2}}$</div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">1</span><span class="ic">⚪</span>Đường tròn $(C)$</h2>
    <ul>
      <li>$(x-a)^2 + (y-b)^2 = R^2$</li>
      <li>$x^2 + y^2 - 2ax - 2by + c = 0$ ($R = \\sqrt{a^2+b^2-c}$)</li>
      <li>Tiếp tuyến tại $M_0$: $(x_0-a)(x-x_0) + (y_0-b)(y-y_0) = 0$</li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">💫</span>Ba đường Conic</h2>
    <ul>
      <li><b>Elip:</b> $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($b^2 = a^2 - c^2$)</li>
      <li><b>Hypebol:</b> $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ ($c^2 = a^2 + b^2$)</li>
      <li><b>Parabol:</b> $y^2 = 2px$ (Tiêu điểm $F(p/2; 0)$)</li>
    </ul>
  </div>
  `
});

fs.writeFileSync(path.join(dir, 'Bai15_Ham-so.html'), f15);
fs.writeFileSync(path.join(dir, 'Bai16_Ham-so-bac-hai.html'), f16);
fs.writeFileSync(path.join(dir, 'Bai17_Dau-tam-thuc-bac-hai.html'), f17);
fs.writeFileSync(path.join(dir, 'Bai18_Phuong-trinh-quy-ve-bac-hai.html'), f18);
fs.writeFileSync(path.join(dir, 'Bai18z_OnTap_ChuongVI_Ham-so-do-thi.html'), f18z);
fs.writeFileSync(path.join(dir, 'Bai19_Phuong-trinh-duong-thang.html'), f19);
fs.writeFileSync(path.join(dir, 'Bai20_Vi-tri-tuong-doi-goc-khoang-cach.html'), f20);
fs.writeFileSync(path.join(dir, 'Bai21_Duong-tron-trong-mat-phang-toa-do.html'), f21);
fs.writeFileSync(path.join(dir, 'Bai22_Ba-duong-conic.html'), f22);
fs.writeFileSync(path.join(dir, 'Bai22z_OnTap_ChuongVII_Toa-do-mat-phang.html'), f22z);

console.log('Wrote batch 4 (10 files: Bai 15, 16, 17, 18, 18z, 19, 20, 21, 22, 22z)');
