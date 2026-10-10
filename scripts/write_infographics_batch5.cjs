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

// ==================== BÀI 23 ====================
const f23 = pageHtml({
  ch: 'Chương VIII: Đại số tổ hợp',
  num: '23',
  title: 'Quy tắc đếm',
  muc: 'Quy tắc cộng (các phương án rời nhau), quy tắc nhân (các công đoạn liên tiếp), sơ đồ hình cây',
  tag: 'QUY TẮC ĐẾM CƠ BẢN',
  dam: '#0F766E', vua: '#14B8A6', nhat: '#F0FDFA',
  cardsHtml: `
  <div class="card">
    <h2><span class="n">1</span><span class="ic">➕</span>Quy tắc cộng (Phương án rời nhau)</h2>
    <p>Một công việc được hoàn thành bởi một trong hai <mark class="k">phương án</mark> độc lập:</p>
    <ul>
      <li>Phương án 1 có $m$ cách thực hiện.</li>
      <li>Phương án 2 có $n$ cách thực hiện (không trùng với PA1).</li>
    </ul>
    <div class="f">$$N = m + n \\;\\text{cách}$$</div>
    <div class="vd"><b>Mẹo nhận biết:</b> Từ khóa "HOẶC" – chọn cách này thì thôi cách kia, công việc xong ngay lập tức.</div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">✖️</span>Quy tắc nhân (Công đoạn liên tiếp)</h2>
    <p>Một công việc phải trải qua hai <mark class="k">công đoạn</mark> liên tiếp:</p>
    <ul>
      <li>Công đoạn 1 có $m$ cách thực hiện.</li>
      <li>Sau khi xong CĐ1, công đoạn 2 có $n$ cách thực hiện.</li>
    </ul>
    <div class="f">$$N = m \\times n \\;\\text{cách}$$</div>
    <div class="vd"><b>Mẹo nhận biết:</b> Từ khóa "VÀ" / "LIÊN TIẾP" – phải làm đủ tất cả các bước thì công việc mới hoàn tất.</div>
  </div>
  <div class="card span">
    <h2><span class="n">3</span><span class="ic">🌳</span>Sơ đồ hình cây & Ví dụ thực tế</h2>
    <p>Sơ đồ hình cây giúp liệt kê trực quan không bỏ sót, không trùng lặp các phương án phân nhánh.</p>
    <div class="vd"><b>Ví dụ:</b> Một thực đơn có 3 món khai vị, 4 món chính và 2 món tráng miệng. Số cách chọn một bữa ăn đầy đủ 3 món là:
      <div class="f">$$N = 3 \\times 4 \\times 2 = 24 \\;\\text{cách}$$</div>
    </div>
  </div>
  `
});

// ==================== BÀI 24 ====================
const f24 = pageHtml({
  ch: 'Chương VIII: Đại số tổ hợp',
  num: '24',
  title: 'Hoán vị, chỉnh hợp và tổ hợp',
  muc: 'Giai thừa $n!$, hoán vị $P_n$, chỉnh hợp $A_n^k$ (có thứ tự), tổ hợp $C_n^k$ (không thứ tự)',
  tag: 'ĐẠI SỐ TỔ HỢP',
  dam: '#0F766E', vua: '#14B8A6', nhat: '#F0FDFA',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">★</span><span class="ic">🎯</span>Bảng so sánh Bản chất Ba khái niệm</h2>
    <table class="t1">
      <tr><th>Khái niệm</th><th>Ý nghĩa</th><th>Yếu tố thứ tự</th><th>Công thức tính</th></tr>
      <tr><td><b class="k">Hoán vị $P_n$</b></td><td>Xếp toàn bộ $n$ phần tử</td><td class="c"><b class="do">Có thứ tự</b></td><td>$$P_n = n! = n(n-1)\\dots 1$$ ($0! = 1$)</td></tr>
      <tr><td><b class="k">Chỉnh hợp $A_n^k$</b></td><td>Chọn $k$ phần tử rồi sắp thứ tự</td><td class="c"><b class="do">Có thứ tự</b></td><td>$$A_n^k = \\frac{n!}{(n-k)!}$$</td></tr>
      <tr><td><b class="k">Tổ hợp $C_n^k$</b></td><td>Chọn $k$ phần tử, không xếp vị trí</td><td class="c"><b class="xanh">Không thứ tự</b></td><td>$$C_n^k = \\frac{n!}{k!(n-k)!}$$</td></tr>
    </table>
  </div>
  <div class="card">
    <h2><span class="n">1</span><span class="ic">🔗</span>Mối liên hệ & Tính chất Tổ hợp</h2>
    <div class="f">$$A_n^k = k! \\cdot C_n^k$$</div>
    <p><b>Hai tính chất đối xứng & cộng Pascal:</b></p>
    <div class="f l">
      $$C_n^k = C_n^{n-k} \\quad (0 \\le k \\le n)$$
      $$C_n^k + C_n^{k+1} = C_{n+1}^{k+1} \\quad (0 \\le k < n)$$
    </div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">💡</span>Dấu hiệu phân biệt bài toán</h2>
    <ul>
      <li><b>Dùng Chỉnh hợp $A_n^k$:</b> Lập số tự nhiên có các chữ số khác nhau, bầu Ban cán sự phân chức danh (Lớp trưởng, Bí thư, Cờ đỏ).</li>
      <li><b>Dùng Tổ hợp $C_n^k$:</b> Chọn ban đại diện không chức vụ, chọn bóng từ hộp, chọn câu hỏi đề thi, chọn các đỉnh tam giác.</li>
    </ul>
  </div>
  `
});

// ==================== BÀI 25 ====================
const f25 = pageHtml({
  ch: 'Chương VIII: Đại số tổ hợp',
  num: '25',
  title: 'Nhị thức Newton',
  muc: 'Khai triển $(a+b)^4$ và $(a+b)^5$, tam giác Pascal, quy luật hệ số đối xứng',
  tag: 'NHỊ THỨC NEWTON LỚP 10',
  dam: '#0F766E', vua: '#14B8A6', nhat: '#F0FDFA',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">📜</span>Khai triển Nhị thức Newton bậc 4 và bậc 5</h2>
    <div class="f">
      $$(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$$
    </div>
    <div class="f">
      $$(a+b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$$
    </div>
    <p class="nho">Hệ số tương ứng: với $n=4$ là $1, 4, 6, 4, 1$; với $n=5$ là $1, 5, 10, 10, 5, 1$.</p>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🔺</span>Tam giác Pascal</h2>
    <p>Quy tắc tạo dòng mới: mỗi số bằng tổng hai số kề phía trên nó:</p>
    <div class="box-pill text-center font-mono" style="line-height:1.6;">
      <div>$n=0$: 1</div>
      <div>$n=1$: 1 &nbsp; 1</div>
      <div>$n=2$: 1 &nbsp; 2 &nbsp; 1</div>
      <div>$n=3$: 1 &nbsp; 3 &nbsp; 3 &nbsp; 1</div>
      <div>$n=4$: 1 &nbsp; 4 &nbsp; 6 &nbsp; 4 &nbsp; 1</div>
      <div>$n=5$: 1 &nbsp; 5 &nbsp; 10 &nbsp; 10 &nbsp; 5 &nbsp; 1</div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">⚠️</span>Kỹ năng Khai triển & Dấu trừ</h2>
    <p>Khi có dấu trừ $(a - b)^n = [a + (-b)]^n$, các dấu đan xen <mark class="do">$+,-,+,-$</mark>:</p>
    <div class="vd"><b>Ví dụ:</b> $(x - 2)^4 = x^4 - 4x^3(2) + 6x^2(2^2) - 4x(2^3) + 2^4 = x^4 - 8x^3 + 24x^2 - 32x + 16$.</div>
    <p class="nho mt-1">Tổng các hệ số của $(a+b)^n$ tính nhanh bằng cách thay $a = 1, b = 1 \\implies 2^n$.</p>
  </div>
  `
});

// ==================== BÀI 25z ====================
const f25z = pageHtml({
  ch: 'Chương VIII: Đại số tổ hợp',
  num: 'Ôn tập Chương VIII',
  title: 'Đại số tổ hợp',
  muc: 'Tổng kết: Quy tắc cộng, quy tắc nhân, $P_n$, $A_n^k$, $C_n^k$, nhị thức Newton',
  tag: 'TỔNG ÔN CHƯƠNG VIII',
  dam: '#0F766E', vua: '#14B8A6', nhat: '#F0FDFA',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">★</span><span class="ic">🎯</span>Sơ đồ Cây Phân Nhánh Quyết Định Bài Toán Đếm</h2>
    <div class="grid2">
      <div class="box-pill">
        <b>Phương án rời nhau hay Công đoạn liên tiếp?</b>
        <div>• Các trường hợp riêng biệt $\\implies$ <b class="k">Quy tắc CỘNG (+)</b></div>
        <div>• Các bước tuần tự tạo thành phẩm $\\implies$ <b class="k">Quy tắc NHÂN (×)</b></div>
      </div>
      <div class="box-pill">
        <b>Có thứ tự hay Không thứ tự?</b>
        <div>• Chọn $k$ từ $n$ có xếp vị trí $\\implies$ <b class="k">Chỉnh hợp $A_n^k$</b></div>
        <div>• Chọn $k$ từ $n$ không xếp vị trí $\\implies$ <b class="k">Tổ hợp $C_n^k$</b></div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">1</span><span class="ic">📐</span>Bảng công thức Tinh gọn</h2>
    <ul>
      <li>$P_n = n!$</li>
      <li>$A_n^k = \\frac{n!}{(n-k)!}$</li>
      <li>$C_n^k = \\frac{n!}{k!(n-k)!}$</li>
      <li>$C_n^k = C_n^{n-k}, \\quad C_n^k + C_n^{k+1} = C_{n+1}^{k+1}$</li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">💡</span>Công thức Nhị thức Newton</h2>
    <div class="f l">
      $$(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$$
      $$(a+b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$$
    </div>
    <div class="vd">Mẹo đan dấu với $(a-b)^n$: Chẵn dấu dương (+), lẻ dấu âm (-).</div>
  </div>
  `
});

// ==================== BÀI 26 ====================
const f26 = pageHtml({
  ch: 'Chương IX: Tính xác suất theo định nghĩa cổ điển',
  num: '26',
  title: 'Biến cố và định nghĩa cổ điển của xác suất',
  muc: 'Phép thử ngẫu nhiên, không gian mẫu $\\Omega$, biến cố $A$, xác suất $P(A) = \\frac{n(A)}{n(\\Omega)}$',
  tag: 'XÁC SUẤT CỔ ĐIỂN',
  dam: '#7E22CE', vua: '#A855F7', nhat: '#FAF5FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🎲</span>Không gian mẫu & Biến cố</h2>
    <p>Một hành động hay thí nghiệm được gọi là <b class="k">phép thử ngẫu nhiên</b> nếu ta không thể biết trước kết quả nhưng liệt kê được tất cả các kết quả có thể xảy ra.</p>
    <div class="grid2">
      <div class="box-pill">
        <b>Không gian mẫu $\\Omega$:</b> Tập hợp mọi kết quả có thể xảy ra của phép thử. Số phần tử ký hiệu là $n(\\Omega)$.
      </div>
      <div class="box-pill">
        <b>Biến cố $A$:</b> Là tập con của không gian mẫu ($A \\subseteq \\Omega$). Số kết quả thuận lợi là $n(A)$.
      </div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">⚖️</span>Định nghĩa Cổ điển của Xác suất</h2>
    <p>Giả sử các kết quả có thể của phép thử là <mark class="k">đồng khả năng</mark>:</p>
    <div class="f">$$P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{\\text{Số kết quả thuận lợi cho } A}{\\text{Số phần tử của không gian mẫu}}$$</div>
    <ul>
      <li>Biến cố chắc chắn: $P(\\Omega) = 1$.</li>
      <li>Biến cố không thể: $P(\\emptyset) = 0$.</li>
      <li>$0 \\le P(A) \\le 1$ với mọi biến cố $A$.</li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">🔄</span>Biến cố đối & Tính chất</h2>
    <p>Biến cố đối của $A$ ký hiệu là $\\overline{A}$ (nghĩa là "Biến cố $A$ không xảy ra"):</p>
    <div class="f">$$\\overline{A} = \\Omega \\setminus A \\implies P(\\overline{A}) = 1 - P(A)$$</div>
    <div class="vd"><b>Chiến thuật:</b> Khi đề bài xuất hiện cụm từ <mark><b>"ít nhất một"</b></mark>, hãy ưu tiên tính xác suất của biến cố đối $\\overline{A}$!</div>
  </div>
  `
});

// ==================== BÀI 27 ====================
const f27 = pageHtml({
  ch: 'Chương IX: Tính xác suất theo định nghĩa cổ điển',
  num: '27',
  title: 'Thực hành tính xác suất trong một số bài toán đơn giản',
  muc: 'Áp dụng quy tắc cộng, nhân, tổ hợp $C_n^k$ để đếm $n(\\Omega)$ và $n(A)$ trong xúc xắc, rút thẻ, chọn bi',
  tag: 'THỰC HÀNH TÍNH XÁC SUẤT',
  dam: '#7E22CE', vua: '#A855F7', nhat: '#FAF5FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">1</span><span class="ic">🎯</span>Quy trình 3 bước chuẩn giải bài toán xác suất</h2>
    <ol style="padding-left:18px;line-height:1.6;">
      <li><b class="k">Bước 1:</b> Mô tả phép thử và tính số phần tử của không gian mẫu $n(\\Omega)$ (thường dùng $C_n^k$ hoặc quy tắc nhân).</li>
      <li><b class="k">Bước 2:</b> Mô tả biến cố $A$, phân chia trường hợp hoặc công đoạn để tính số kết quả thuận lợi $n(A)$.</li>
      <li><b class="k">Bước 3:</b> Lập tỉ số xác suất $P(A) = \\frac{n(A)}{n(\\Omega)}$.</li>
    </ol>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🎱</span>Bài toán Chọn bi / Rút thăm</h2>
    <p>Hộp có 5 bi đỏ và 4 bi xanh. Chọn ngẫu nhiên 3 bi. Tính xác suất chọn được 2 đỏ, 1 xanh:</p>
    <div class="f l">
      $$n(\\Omega) = C_9^3 = 84$$
      $$n(A) = C_5^2 \\times C_4^1 = 10 \\times 4 = 40$$
      $$P(A) = \\frac{40}{84} = \\frac{10}{21}$$
    </div>
  </div>
  <div class="card">
    <h2><span class="n">3</span><span class="ic">🎲</span>Bài toán Xúc xắc & Đồng xu</h2>
    <p>Gieo 2 con xúc xắc cân đối. Không gian mẫu có $n(\\Omega) = 6 \\times 6 = 36$ kết quả.</p>
    <ul>
      <li>Tổng số chấm bằng 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \\implies n(A) = 6 \\implies P = \\frac{6}{36} = \\frac{1}{6}$.</li>
      <li>Hai mặt cùng số chấm: 6 cặp $(1,1), \\dots, (6,6) \\implies P = \\frac{1}{6}$.</li>
    </ul>
  </div>
  `
});

// ==================== BÀI 27z ====================
const f27z = pageHtml({
  ch: 'Chương IX: Tính xác suất theo định nghĩa cổ điển',
  num: 'Ôn tập Chương IX',
  title: 'Xác suất cổ điển',
  muc: 'Tổng kết: Không gian mẫu, biến cố, công thức $P(A)$, biến cố đối, bài toán chọn đồ vật và gieo xúc xắc',
  tag: 'TỔNG ÔN CHƯƠNG IX',
  dam: '#7E22CE', vua: '#A855F7', nhat: '#FAF5FF',
  cardsHtml: `
  <div class="card span">
    <h2><span class="n">★</span><span class="ic">🏆</span>Cẩm nang Toàn diện Xác suất Lớp 10</h2>
    <div class="grid2">
      <div class="box-pill">
        <b class="k">Công thức Cốt lõi:</b>
        <div class="f">$$P(A) = \\frac{n(A)}{n(\\Omega)}$$</div>
        <div>$0 \\le P(A) \\le 1, \\quad P(\\emptyset) = 0, \\quad P(\\Omega) = 1$</div>
      </div>
      <div class="box-pill">
        <b class="k">Biến cố đối:</b>
        <div class="f">$$P(\\overline{A}) = 1 - P(A)$$</div>
        <div>Cực kỳ hiệu quả khi biến cố $A$ có quá nhiều trường hợp phức tạp ("ít nhất một").</div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2><span class="n">1</span><span class="ic">⚠️</span>Các lỗi sai kinh điển cần tránh</h2>
    <ul>
      <li><b class="do">Lỗi 1:</b> Quên kiểm tra tính đồng khả năng của các biến cố sơ cấp.</li>
      <li><b class="do">Lỗi 2:</b> Nhầm lẫn giữa có thứ tự ($A_n^k$) và không thứ tự ($C_n^k$) khi đếm $n(\\Omega)$ và $n(A)$.</li>
      <li><b class="do">Lỗi 3:</b> Đếm lặp trường hợp khi dùng quy tắc cộng không rời nhau.</li>
    </ul>
  </div>
  <div class="card">
    <h2><span class="n">2</span><span class="ic">🌟</span>Kỹ thuật Giải nhanh Trắc nghiệm</h2>
    <p>Đối với bài toán "chọn ngẫu nhiên ít nhất 1 sản phẩm tốt/xấu":</p>
    <div class="f">$$P(A) = 1 - \\frac{C_{\\text{loại ngược lại}}^k}{C_{\\text{tổng}}^k}$$</div>
    <div class="vd">Tiết kiệm 80% thời gian làm bài kiểm tra trắc nghiệm so với việc chia 3-4 trường hợp thuận!</div>
  </div>
  `
});

fs.writeFileSync(path.join(dir, 'Bai23_Quy-tac-dem.html'), f23);
fs.writeFileSync(path.join(dir, 'Bai24_Hoan-vi-chinh-hop-to-hop.html'), f24);
fs.writeFileSync(path.join(dir, 'Bai25_Nhi-thuc-Newton.html'), f25);
fs.writeFileSync(path.join(dir, 'Bai25z_OnTap_ChuongVIII_Dai-so-to-hop.html'), f25z);
fs.writeFileSync(path.join(dir, 'Bai26_Bien-co-va-dinh-nghia-co-dien-xac-suat.html'), f26);
fs.writeFileSync(path.join(dir, 'Bai27_Thuc-hanh-tinh-xac-suat.html'), f27);
fs.writeFileSync(path.join(dir, 'Bai27z_OnTap_ChuongIX_Xac-suat-co-dien.html'), f27z);

console.log('Wrote batch 5 (7 files: Bai 23, 24, 25, 25z, 26, 27, 27z)');
