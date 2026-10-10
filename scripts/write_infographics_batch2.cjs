const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../public/infographics');

// Bai 5
const f5 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 5: Giá trị lượng giác của một góc từ 0° đến 180°</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#C2410C;--vua:#F97316;--nhat:#FFF3EA;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương III · Hệ thức lượng trong tam giác</div>
  <div class="row"><div class="so"><small>BÀI</small><b>5</b></div><h1>Giá trị lượng giác của<br>một góc từ 0° đến 180°</h1></div>
  <div class="muc">🎯 Định nghĩa sin, côsin, tang, côtang trên nửa đường tròn đơn vị · bảng giá trị đặc biệt · góc bù nhau, phụ nhau</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">🌗</span>Định nghĩa trên nửa đường tròn đơn vị</h2>
<div class="fig"><svg viewBox="0 0 250 132" style="width:15em">
<line x1="6" y1="110" x2="214" y2="110" stroke="#334155"/><line x1="110" y1="128" x2="110" y2="4" stroke="#334155"/>
<path d="M20 110 A90 90 0 0 1 200 110" fill="#FFEDD5" stroke="#F97316" stroke-width="2.4"/>
<line x1="110" y1="110" x2="173.6" y2="46.4" stroke="#C2410C" stroke-width="2.4"/>
<line x1="173.6" y1="46.4" x2="173.6" y2="110" stroke="#2563EB" stroke-dasharray="4 3" stroke-width="1.6"/>
<line x1="173.6" y1="46.4" x2="110" y2="46.4" stroke="#16A34A" stroke-dasharray="4 3" stroke-width="1.6"/>
<path d="M132 110 A22 22 0 0 0 125.6 94.4" fill="none" stroke="#C2410C" stroke-width="1.6"/>
<circle cx="173.6" cy="46.4" r="4" fill="#C2410C"/>
<g font-family="Times New Roman" font-style="italic" font-size="14">
<text x="136" y="104" fill="#C2410C">α</text><text x="178" y="40" font-weight="700">M(x₀; y₀)</text>
<text x="166" y="125" fill="#2563EB" font-weight="700">x₀</text><text x="92" y="51" fill="#16A34A" font-weight="700">y₀</text>
<text x="96" y="125">O</text><text x="194" y="125">1</text><text x="10" y="125">−1</text><text x="114" y="16">1</text></g></svg></div>
<p>$M(x_0;y_0)$ trên nửa đường tròn đơn vị, $\\widehat{xOM}=\\alpha$ ($0^\\circ\\le\\alpha\\le180^\\circ$):</p>
<div class="grid2"><div class="mini"><b>sin = TUNG độ</b>$\\sin\\alpha=y_0$</div><div class="mini"><b>côsin = HOÀNH độ</b>$\\cos\\alpha=x_0$</div>
<div class="mini"><b>tang</b>$\\tan\\alpha=\\dfrac{y_0}{x_0}\\ (\\alpha\\ne90^\\circ)$</div><div class="mini"><b>côtang</b>$\\cot\\alpha=\\dfrac{x_0}{y_0}\\ (\\alpha\\ne0^\\circ;180^\\circ)$</div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">🔗</span>Liên hệ giữa các giá trị</h2>
<div class="f">$\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}\\qquad \\cot\\alpha=\\dfrac{\\cos\\alpha}{\\sin\\alpha}\\qquad \\tan\\alpha=\\dfrac{1}{\\cot\\alpha}$</div>
<p class="nho">(với điều kiện các biểu thức có nghĩa). Từ bài tập 3.3:</p>
<div class="f">$\\sin^2\\alpha+\\cos^2\\alpha=1$</div></div><div class="card span"><h2><span class="n">3</span><span class="ic">📋</span>Bảng giá trị lượng giác đặc biệt</h2>
<table class="t"><tr><th>$\\alpha$</th><th>$0^\\circ$</th><th>$30^\\circ$</th><th>$45^\\circ$</th><th>$60^\\circ$</th><th>$90^\\circ$</th><th>$180^\\circ$</th></tr>
<tr><td><b>sin</b></td><td>0</td><td>$\\dfrac12$</td><td>$\\dfrac{\\sqrt2}{2}$</td><td>$\\dfrac{\\sqrt3}{2}$</td><td>1</td><td>0</td></tr>
<tr><td><b>cos</b></td><td>1</td><td>$\\dfrac{\\sqrt3}{2}$</td><td>$\\dfrac{\\sqrt2}{2}$</td><td>$\\dfrac12$</td><td>0</td><td>$-1$</td></tr>
<tr><td><b>tan</b></td><td>0</td><td>$\\dfrac{\\sqrt3}{3}$</td><td>1</td><td>$\\sqrt3$</td><td class="do">‖</td><td>0</td></tr>
<tr><td><b>cot</b></td><td class="do">‖</td><td>$\\sqrt3$</td><td>1</td><td>$\\dfrac{\\sqrt3}{3}$</td><td>0</td><td class="do">‖</td></tr></table>
<p class="nho" style="text-align:center">Kí hiệu <b class="do">‖</b>: không xác định.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">🪞</span>Hai góc bù nhau: $\\alpha$ và $180^\\circ-\\alpha$</h2>
<div class="f l">$\\sin(180^\\circ-\\alpha)=\\sin\\alpha$<br>$\\cos(180^\\circ-\\alpha)=-\\cos\\alpha$<br>$\\tan(180^\\circ-\\alpha)=-\\tan\\alpha\\ \\ (\\alpha\\ne90^\\circ)$<br>$\\cot(180^\\circ-\\alpha)=-\\cot\\alpha\\ \\ (0^\\circ&lt;\\alpha&lt;180^\\circ)$</div>
<div class="vd">$\\sin135^\\circ=\\sin45^\\circ=\\frac{\\sqrt2}{2}$; $\\cos120^\\circ=-\\cos60^\\circ=-\\frac12$.</div></div><div class="card"><h2><span class="n">5</span><span class="ic">✂️</span>Hai góc phụ nhau: $\\alpha$ và $90^\\circ-\\alpha$</h2>
<div class="f l">$\\sin(90^\\circ-\\alpha)=\\cos\\alpha\\quad \\cos(90^\\circ-\\alpha)=\\sin\\alpha$<br>$\\tan(90^\\circ-\\alpha)=\\cot\\alpha\\quad \\cot(90^\\circ-\\alpha)=\\tan\\alpha$</div>
<p class="nho">Sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.</p></div><div class="card"><h2><span class="n">6</span><span class="ic">±</span>Dấu & máy tính cầm tay</h2>
<p>Góc tù ($90^\\circ&lt;\\alpha&lt;180^\\circ$): <mark>$\\sin\\alpha&gt;0$; $\\cos\\alpha,\\ \\tan\\alpha,\\ \\cot\\alpha&lt;0$</mark>.</p>
<p>🖩 Chọn đơn vị đo góc là <b>độ</b> trước khi bấm. Biết $\\sin x$, máy chỉ cho $x\\le90^\\circ$ → xét thêm góc bù $180^\\circ-x$.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Quên dấu “−” của côsin, tang, côtang khi góc <b>tù</b>.</li><li>Viết $\\tan90^\\circ=0$ hoặc $\\cot0^\\circ=0$: thực ra <b>không xác định</b>.</li><li>Máy tính để chế độ radian → kết quả sai hoàn toàn.</li><li>Nhầm: góc bù thì <b>sin bằng nhau</b>, không phải cos.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Sin bù – Cos đối – Phụ chéo”</b>.</li><li>Hàng sin $0^\\circ\\to90^\\circ$: $\\frac{\\sqrt0}{2},\\frac{\\sqrt1}{2},\\frac{\\sqrt2}{2},\\frac{\\sqrt3}{2},\\frac{\\sqrt4}{2}$; hàng cos viết <b>ngược lại</b>.</li><li><b>“Sin đứng – Cos nằm”</b>: sin là tung độ (trục đứng), cos là hoành độ (trục nằm).</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>sin α = tung độ, cos α = hoành độ của điểm M trên nửa đường tròn đơn vị; thuộc bảng góc đặc biệt và quy tắc góc bù.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.33–37</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

// Bai 6
const f6 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 6: Hệ thức lượng trong tam giác</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#C2410C;--vua:#F97316;--nhat:#FFF3EA;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương III · Hệ thức lượng trong tam giác</div>
  <div class="row"><div class="so"><small>BÀI</small><b>6</b></div><h1>Hệ thức lượng<br>trong tam giác</h1></div>
  <div class="muc">🎯 Định lí côsin · định lí sin · các công thức diện tích · giải tam giác và đo đạc thực tế</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">🔺</span>Kí hiệu trong tam giác ABC</h2>
<div class="fig"><svg viewBox="0 0 220 120" style="width:14em">
<polygon points="70,14 12,106 206,106" fill="#FFF3EA" stroke="#C2410C" stroke-width="2"/>
<g font-family="Times New Roman" font-style="italic" font-size="15" font-weight="700">
<text x="64" y="10">A</text><text x="0" y="116">B</text><text x="208" y="116">C</text>
<text x="104" y="120" fill="#2563EB">a</text><text x="142" y="58" fill="#2563EB">b</text><text x="26" y="58" fill="#2563EB">c</text></g></svg></div>
<p class="nho">$a,b,c$: cạnh đối diện đỉnh $A,B,C$ · $p=\\frac{a+b+c}{2}$: nửa chu vi · $R, r$: bán kính đường tròn ngoại tiếp, nội tiếp · $S$: diện tích.</p></div><div class="card"><h2><span class="n">2</span><span class="ic">📐</span>Định lí côsin</h2>
<div class="f">$a^2=b^2+c^2-2bc\\cos A$<br>$b^2=c^2+a^2-2ca\\cos B$<br>$c^2=a^2+b^2-2ab\\cos C$</div>
<p><b>Hệ quả:</b></p><div class="f">$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}$</div>
<p class="nho">$A=90^\\circ$ ⇒ $a^2=b^2+c^2$: định lí Pythagore là trường hợp riêng.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">⭕</span>Định lí sin</h2>
<div class="f">$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R$</div>
<p class="nho">Dùng khi biết <b>1 cạnh + 2 góc</b>, hoặc để tìm bán kính $R$.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">🟧</span>Công thức diện tích</h2>
<div class="f">$S=\\tfrac12bc\\sin A=\\tfrac12ca\\sin B=\\tfrac12ab\\sin C$</div>
<div class="grid2"><div class="mini"><b>Nội tiếp</b>$S=pr$</div><div class="mini"><b>Ngoại tiếp</b>$S=\\dfrac{abc}{4R}$</div></div>
<div class="f"><b>Heron:</b> $S=\\sqrt{p(p-a)(p-b)(p-c)}$</div>
<div class="vd">$a=13,b=14,c=15$: $p=21$, $S=\\sqrt{21\\cdot8\\cdot7\\cdot6}=84$.</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🧩</span>Giải tam giác: chọn công thức nào?</h2>
<table class="t"><tr><th>Biết</th><th>Dùng</th></tr>
<tr><td>2 cạnh + góc xen giữa</td><td>Định lí côsin → cạnh thứ ba</td></tr>
<tr><td>3 cạnh</td><td>Hệ quả côsin → các góc</td></tr>
<tr><td>1 cạnh + 2 góc</td><td>$\\hat A+\\hat B+\\hat C=180^\\circ$, rồi định lí sin</td></tr></table></div><div class="card"><h2><span class="n">6</span><span class="ic">🐢</span>Ứng dụng: đo khoảng cách tới Tháp Rùa</h2>
<p>Đứng trên bờ: đo đoạn $AB$, đo góc $\\widehat{A}$ và $\\widehat{B}$ (ngắm tới tháp $C$) → tính $\\widehat{C}$ → định lí sin cho $AC$.</p>
<div class="f">$AC=\\dfrac{AB\\cdot\\sin B}{\\sin C}$</div></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Góc tù thì $\\cos A&lt;0$ → $-2bc\\cos A$ thành <b>cộng</b>.</li><li>Định lí sin: quên “$=2R$” hoặc ghép cạnh với góc <b>không đối diện</b>.</li><li>Heron: dùng chu vi thay cho <b>nửa</b> chu vi $p$.</li><li>Máy tính ở chế độ radian khi tính $\\sin, \\cos$.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li>Côsin: <b>“bình phương cạnh đối = tổng bình phương hai cạnh kề − 2 lần tích nhân cos góc xen”</b>.</li><li>Nhận dạng góc: $b^2+c^2&gt;a^2$ ⇒ $A$ nhọn; $=$ ⇒ vuông; $&lt;$ ⇒ tù.</li><li>Diện tích: <b>“nửa tích hai cạnh nhân sin góc xen”</b>.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Côsin cho “cạnh – góc xen”, sin cho “cạnh – góc đối”, diện tích nhớ 4 công thức: ½ab·sinC, pr, abc/4R, Heron.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.38–43</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

// Bai 6z On Tap III
const f6z = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ÔN TẬP III: Ôn tập chương III Hệ thức lượng trong tam giác</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#C2410C;--vua:#F97316;--nhat:#FFF3EA;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương III · Hệ thức lượng trong tam giác</div>
  <div class="row"><div class="so ot"><small>ÔN TẬP</small><b>III</b></div><h1>Ôn tập chương III<br>Hệ thức lượng trong tam giác</h1></div>
  <div class="muc">🎯 Bài 5 · Bài 6 · Bài tập cuối chương III — giá trị lượng giác, định lí côsin, sin, diện tích</div></div>
 <div class="main"></div><div class="pool"><div class="card span"><h2><span class="n">1</span><span class="ic">🗺️</span>Sơ đồ chương</h2><div class="sodo"><div class="goc">HỆ THỨC<br>LƯỢNG<br>TRONG<br>TAM GIÁC</div><div class="ds" style="grid-template-columns:repeat(1,1fr)"><div class="ls"><b>Bài 5 · GTLG góc 0°–180°</b><div class="kw">Nửa đường tròn đơn vị · $\sin=y_0,\ \cos=x_0$ · bảng góc đặc biệt · góc bù, phụ</div></div><div class="ls"><b>Bài 6 · Hệ thức lượng</b><div class="kw">Định lí côsin · định lí sin · diện tích · giải tam giác · đo đạc</div></div></div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">📐</span>Giá trị lượng giác</h2>
<div class="f l">$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$, $\cot\alpha=\frac{\cos\alpha}{\sin\alpha}$, $\sin^2\alpha+\cos^2\alpha=1$</div>
<div class="f l">Bù: $\sin(180^\circ-\alpha)=\sin\alpha$, $\cos(180^\circ-\alpha)=-\cos\alpha$<br>Phụ: $\sin(90^\circ-\alpha)=\cos\alpha$</div>
<p class="nho">Góc tù: $\sin&gt;0$; $\cos,\tan,\cot&lt;0$.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">🔺</span>Tam giác ABC</h2>
<div class="f l">$a^2=b^2+c^2-2bc\cos A$ &nbsp;·&nbsp; $\dfrac{a}{\sin A}=2R$</div>
<div class="f l">$S=\frac12bc\sin A=pr=\dfrac{abc}{4R}=\sqrt{p(p-a)(p-b)(p-c)}$</div>
<p class="nho">$\cos A=\frac{b^2+c^2-a^2}{2bc}$ → biết 3 cạnh tính được góc.</p></div><div class="card span"><h2><span class="n">4</span><span class="ic">📝</span>Các dạng toán thường gặp</h2><table class="t dang"><tr><th style="width:34%">Dạng toán</th><th>Cách làm</th></tr><tr><td>Tính giá trị lượng giác, biểu thức</td><td>Dùng bảng góc đặc biệt, quy tắc góc bù/phụ; xét dấu theo góc nhọn/tù.</td></tr><tr><td>Biết $\sin\alpha$, tìm $\cos\alpha$</td><td>$\cos^2\alpha=1-\sin^2\alpha$; góc tù lấy $\cos&lt;0$.</td></tr><tr><td>Giải tam giác</td><td>2 cạnh + góc xen → côsin; 3 cạnh → hệ quả côsin; 1 cạnh + 2 góc → sin.</td></tr><tr><td>Tính $S$, $R$, $r$, đường cao</td><td>Chọn công thức diện tích phù hợp; $h_a=\frac{2S}{a}$, $r=\frac Sp$, $R=\frac{abc}{4S}$.</td></tr><tr><td>Đo khoảng cách, chiều cao thực tế</td><td>Vẽ tam giác mô hình, xác định yếu tố đã biết, dùng định lí sin/côsin.</td></tr></table></div><div class="card span"><h2><span class="n">5</span><span class="ic">✅</span>Tự kiểm tra – em đã làm được chưa?</h2><ul class="ck"><li>Đọc thuộc bảng sin, cos của $0^\circ,30^\circ,45^\circ,60^\circ,90^\circ$.</li><li>Tính $\cos120^\circ$, $\tan135^\circ$ không dùng máy tính.</li><li>Cho $b=3, c=5, A=60^\circ$: tính $a$ và $S$.</li><li>Cho $a=13,b=14,c=15$: tính $S$, $R$, $r$.</li><li>Giải một bài đo khoảng cách qua sông/hồ.</li></ul></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Quên dấu âm của côsin góc tù.</li><li>Định lí sin ghép cạnh với góc không đối diện.</li><li>Máy tính để chế độ radian.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Sin bù – Cos đối – Phụ chéo”</b>.</li><li><b>Cạnh – góc xen → côsin; cạnh – góc đối → sin</b>.</li><li>Heron: nhớ dùng <b>nửa</b> chu vi $p$.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Thuộc bảng góc đặc biệt + định lí côsin, sin + 4 công thức diện tích là giải được mọi tam giác.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.33–45</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

// Bai 7
const f7 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 7: Các khái niệm mở đầu</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#1D4ED8;--vua:#3B82F6;--nhat:#EAF2FF;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương IV · Vectơ</div>
  <div class="row"><div class="so"><small>BÀI</small><b>7</b></div><h1>Các khái niệm mở đầu</h1></div>
  <div class="muc">🎯 Hiểu vectơ, độ dài · nhận biết hai vectơ cùng phương, cùng hướng, bằng nhau · vectơ-không</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">➡️</span>Vectơ là gì?</h2>
<p><span class="k">Vectơ</span> là <mark>đoạn thẳng có hướng</mark>: đã chỉ rõ điểm đầu, điểm cuối.</p>
<div class="fig"><svg viewBox="0 0 230 70" style="width:15em"><defs><marker id="a7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1D4ED8"/></marker></defs>
<line x1="20" y1="54" x2="200" y2="30" stroke="#1D4ED8" stroke-width="3" marker-end="url(#a7)"/>
<circle cx="20" cy="54" r="4" fill="#DC2626"/>
<g font-family="Be Vietnam Pro" font-size="11" font-weight="700"><text x="4" y="66" fill="#DC2626">A (điểm đầu)</text><text x="150" y="54" fill="#1D4ED8">B (điểm cuối)</text></g>
<text x="40" y="14" font-size="11" font-family="Be Vietnam Pro" fill="#475569">độ dài |AB| = AB</text></svg></div>
<p>Kí hiệu: $\overrightarrow{AB}$ hoặc $\overrightarrow{a}, \overrightarrow{b}, \overrightarrow{x},\dots$ · Độ dài: $|\overrightarrow{AB}|=AB$, $|\overrightarrow{a}|$.</p>
<div class="vd">Hình vuông cạnh 1: $|\overrightarrow{AC}|=|\overrightarrow{BD}|=\sqrt2$.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">↔️</span>Giá – Cùng phương</h2>
<p><span class="k">Giá</span> của vectơ: đường thẳng đi qua điểm đầu và điểm cuối.</p>
<div class="f">Cùng phương ⇔ hai giá <b>song song hoặc trùng nhau</b></div>
<p>Hai vectơ cùng phương thì <mark>cùng hướng hoặc ngược hướng</mark>.</p>
<div class="fig"><svg viewBox="0 0 270 92" style="width:16.5em"><defs><marker id="a7b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563EB"/></marker></defs><defs><marker id="a7c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#DC2626"/></marker></defs>
<line x1="10" y1="22" x2="230" y2="22" stroke="#CBD5E1" stroke-dasharray="4 3"/><line x1="10" y1="62" x2="230" y2="62" stroke="#CBD5E1" stroke-dasharray="4 3"/>
<line x1="20" y1="22" x2="90" y2="22" stroke="#2563EB" stroke-width="3" marker-end="url(#a7b)"/>
<line x1="130" y1="22" x2="200" y2="22" stroke="#2563EB" stroke-width="3" marker-end="url(#a7b)"/>
<line x1="90" y1="62" x2="30" y2="62" stroke="#DC2626" stroke-width="3" marker-end="url(#a7c)"/>
<g font-family="Be Vietnam Pro" font-size="10.5" font-weight="700"><text x="34" y="14" fill="#2563EB">a</text><text x="146" y="14" fill="#2563EB">b = a (bằng nhau)</text>
<text x="100" y="66" fill="#DC2626">ngược hướng với a</text><text x="10" y="86" fill="#475569">Các giá song song/trùng nhau → cùng phương</text></g></svg></div></div><div class="card"><h2><span class="n">3</span><span class="ic">🟰</span>Hai vectơ bằng nhau</h2>
<div class="f">$\overrightarrow{a}=\overrightarrow{b} \iff$ <b>cùng độ dài</b> và <b>cùng hướng</b></div>
<div class="vd">Hình chữ nhật $ABCD$: $\overrightarrow{AD}=\overrightarrow{BC}$; nhưng $\overrightarrow{AB}\ne\overrightarrow{CD}$ (ngược hướng).</div>
<p style="margin-top:5px">Cho điểm $O$ và $\overrightarrow{a}$: có <b>duy nhất</b> điểm $A$ sao cho $\overrightarrow{OA}=\overrightarrow{a}$.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">⚪</span>Vectơ-không $\overrightarrow{0}$</h2>
<p>Điểm đầu trùng điểm cuối: $\overrightarrow{AA}, \overrightarrow{BB},\dots$ đều bằng $\overrightarrow{0}$.</p>
<div class="f l">• $|\overrightarrow{0}|=0$<br>• $\overrightarrow{0}$ cùng hướng (nên cùng phương) với <b>mọi</b> vectơ</div></div><div class="card"><h2><span class="n">5</span><span class="ic">📍</span>Ba điểm thẳng hàng</h2>
<div class="f">$A, B, C$ thẳng hàng $\iff \overrightarrow{AB}, \overrightarrow{AC}$ cùng phương</div>
<p class="nho">Vectơ còn dùng biểu diễn lực, vận tốc: <b>hướng</b> = hướng đại lượng, <b>độ dài</b> tỉ lệ với độ lớn.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>$\overrightarrow{AB}$ và $\overrightarrow{BA}$ <b>không</b> bằng nhau (ngược hướng), dù cùng độ dài.</li><li>Chỉ nói “cùng hướng/ngược hướng” khi hai vectơ đã <b>cùng phương</b>.</li><li>Hai đường chéo hình chữ nhật dài bằng nhau nhưng $\overrightarrow{AC}\ne\overrightarrow{BD}$.</li><li>Quên $\overrightarrow{0}$ cùng phương với mọi vectơ.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li>Vectơ = <b>“mũi tên”</b>: có <b>gốc</b>, có <b>ngọn</b>, có <b>hướng</b>, có <b>độ dài</b>.</li><li><b>Bằng nhau = “sinh đôi”</b>: giống nhau cả độ dài lẫn hướng, chỉ khác chỗ đứng.</li><li>Thứ tự kiểm tra: <b>Phương → Hướng → Độ dài</b>.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Vectơ là đoạn thẳng có hướng; hai vectơ bằng nhau khi cùng hướng và cùng độ dài.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.46–50</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

// Bai 8
const f8 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 8: Tổng và hiệu của hai vectơ</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#1D4ED8;--vua:#3B82F6;--nhat:#EAF2FF;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương IV · Vectơ</div>
  <div class="row"><div class="so"><small>BÀI</small><b>8</b></div><h1>Tổng và hiệu<br>của hai vectơ</h1></div>
  <div class="muc">🎯 Cộng, trừ vectơ · quy tắc ba điểm, hình bình hành, quy tắc hiệu · trung điểm, trọng tâm · tổng hợp lực, vận tốc</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">➕</span>Tổng của hai vectơ</h2>
<p>Lấy $A$ tuỳ ý, vẽ $\overrightarrow{AB}=\overrightarrow{a}$, $\overrightarrow{BC}=\overrightarrow{b}$ (nối đuôi nhau). Khi đó:</p>
<div class="f">$\overrightarrow{a}+\overrightarrow{b}=\overrightarrow{AC}$</div>
<p><b>Tính chất:</b> giao hoán $\overrightarrow{a}+\overrightarrow{b}=\overrightarrow{b}+\overrightarrow{a}$; kết hợp $(\overrightarrow{a}+\overrightarrow{b})+\overrightarrow{c}=\overrightarrow{a}+(\overrightarrow{b}+\overrightarrow{c})$; $\overrightarrow{a}+\overrightarrow{0}=\overrightarrow{a}$.</p></div><div class="card"><h2><span class="n">2</span><span class="ic">📐</span>Hai quy tắc cộng</h2>
<div class="f l"><b>Ba điểm:</b> $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$ (với mọi $A,B,C$)</div>
<div class="f l"><b>Hình bình hành</b> $ABCD$: $\overrightarrow{AB}+\overrightarrow{AD}=\overrightarrow{AC}$</div>
<div class="fig"><svg viewBox="0 0 220 124" style="width:14em"><defs><marker id="a8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1D4ED8"/></marker></defs><defs><marker id="a8r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#DC2626"/></marker></defs>
<polygon points="20,90 160,90 200,20 60,20" fill="#EAF2FF" stroke="#94A3B8"/>
<line x1="20" y1="90" x2="158" y2="90" stroke="#1D4ED8" stroke-width="2.6" marker-end="url(#a8)"/>
<line x1="20" y1="90" x2="59" y2="22" stroke="#1D4ED8" stroke-width="2.6" marker-end="url(#a8)"/>
<line x1="20" y1="90" x2="197" y2="22" stroke="#DC2626" stroke-width="2.8" marker-end="url(#a8r)"/>
<g font-family="Times New Roman" font-style="italic" font-size="14" font-weight="700"><text x="6" y="104">A</text><text x="160" y="106">B</text><text x="204" y="20">C</text><text x="46" y="16">D</text></g>
<text x="62" y="120" font-size="11" font-family="Be Vietnam Pro" font-weight="700" fill="#DC2626">AB + AD = AC</text></svg></div></div><div class="card"><h2><span class="n">3</span><span class="ic">➖</span>Vectơ đối – Hiệu hai vectơ</h2>
<p><span class="k">Vectơ đối</span> của $\overrightarrow{a}$: cùng độ dài, <b>ngược hướng</b>, kí hiệu $-\overrightarrow{a}$. $\ -\overrightarrow{AB}=\overrightarrow{BA}$; $\overrightarrow{0}$ là vectơ đối của chính nó.</p>
<p>Hai vectơ đối nhau ⇔ tổng bằng $\overrightarrow{0}$.</p>
<div class="f">$\overrightarrow{a}-\overrightarrow{b}=\overrightarrow{a}+(-\overrightarrow{b})$</div>
<div class="f"><b>Quy tắc hiệu:</b> $\overrightarrow{MN}=\overrightarrow{ON}-\overrightarrow{OM}$ (mọi $O, M, N$)</div></div><div class="card"><h2><span class="n">4</span><span class="ic">🎯</span>Trung điểm – Trọng tâm</h2>
<div class="f l">$I$ là trung điểm $AB \iff \overrightarrow{IA}+\overrightarrow{IB}=\overrightarrow{0}$</div>
<div class="f l">$G$ là trọng tâm $\triangle ABC \iff \overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\overrightarrow{0}$</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🚤</span>Ứng dụng: tổng hợp lực, vận tốc</h2>
<p>Hai lực $\overrightarrow{u_1}, \overrightarrow{u_2}$ cùng tác động vào một vật ⇒ hợp lực là $\overrightarrow{u_1}+\overrightarrow{u_2}$.</p>
<p>Thuyền có vận tốc riêng $\overrightarrow{v_r}$, dòng nước $\overrightarrow{v_n}$ ⇒ vận tốc thực tế $\overrightarrow{v_r}+\overrightarrow{v_n}$.</p>
<p class="nho">Muốn sang sông nhanh nhất: giữ hướng tàu vuông góc với bờ.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Quy tắc ba điểm phải <b>nối đuôi</b>: $\overrightarrow{AB}+\overrightarrow{BC}$, không phải $\overrightarrow{AB}+\overrightarrow{CB}$.</li><li>Quy tắc hiệu: $\overrightarrow{ON}-\overrightarrow{OM}=\overrightarrow{MN}$ (điểm <b>bị trừ</b> làm gốc), hay viết nhầm $\overrightarrow{NM}$.</li><li>Hình bình hành phải chung <b>gốc</b> $A$ và lấy đúng đường chéo $AC$.</li><li>$|\overrightarrow{a}+\overrightarrow{b}|$ nói chung <b>khác</b> $|\overrightarrow{a}|+|\overrightarrow{b}|$.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li>Ba điểm: <b>“Đuôi nối đầu – bỏ điểm giữa”</b>: $A\boldsymbol{B}+\boldsymbol{B}C=AC$.</li><li>Hiệu: <b>“Cùng gốc, trừ đi thì ngọn trước chỉ ngọn sau”</b>: $\overrightarrow{ON}-\overrightarrow{OM}=\overrightarrow{MN}$.</li><li>Hình bình hành: <b>“Hai cạnh chung gốc cộng lại = đường chéo chung gốc”</b>.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Cộng vectơ: nối đuôi hoặc dựng hình bình hành; trừ vectơ: cùng gốc, nối ngọn.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.51–54</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

// Bai 9
const f9 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 9: Tích của một vectơ với một số</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#1D4ED8;--vua:#3B82F6;--nhat:#EAF2FF;}
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
.vd::before { content: "Ví dụ: "; font-weight: 700; color: var(--dam); }
table.t { border-collapse: collapse; width: 100%; margin: 4px 0; font-size: .92rem; }
table.t th, table.t td { border: 1px solid color-mix(in srgb, var(--vua) 45%, #fff); padding: 3px 4px; text-align: center; }
table.t th { background: var(--nhat); color: var(--dam); font-weight: 700; }
.fig { text-align: center; margin: 4px 0; } .fig svg { max-width: 100%; height: auto; } svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.steps { counter-reset: s; list-style: none; padding-left: 0 !important; }
.steps li { counter-increment: s; position: relative; padding-left: 26px; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 1px; width: 19px; height: 19px; border-radius: 6px;
  background: var(--vua); color: #fff; font-size: .75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.mini { background: var(--nhat); border-radius: 8px; padding: 5px 7px; text-align: center; font-size: .9rem; }
.mini b { display: block; color: var(--dam); font-size: .86rem; }
.foot { padding: 0 20px 10px 20px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.bay, .meo { border-radius: 14px; padding: 9px 12px; font-size: .93rem; }
.bay { background: #FFF1F1; border: 1.5px dashed #F87171; }
.meo { background: #ECFDF3; border: 1.5px dashed #34D399; }
.bay h3, .meo h3 { font-size: .98rem; font-weight: 800; margin-bottom: 4px; }
.bay h3 { color: #B91C1C; } .meo h3 { color: #047857; }
.bay ul, .meo ul { padding-left: 16px; } .bay li, .meo li { margin: 2px 0; line-height: 1.4; }
.chot { margin-top: 10px; border-radius: 14px; padding: 9px 14px; color: #fff; font-weight: 700; font-size: 1.02rem;
  background: linear-gradient(90deg, var(--dam), var(--vua)); display: flex; gap: 10px; align-items: center; }
.chot .i { font-size: 1.4rem; }
.ky { display: flex; justify-content: space-between; font-size: .7rem; color: #6B7280; margin-top: 6px; }
.katex { font-size: 1.06em; }
.sodo { display: flex; gap: 8px; align-items: stretch; }
.sodo .goc { flex: none; width: 23%; border-radius: 12px; background: linear-gradient(160deg, var(--dam), var(--vua)); color: #fff;
  display: flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 8px; font-size: 1.02rem; line-height: 1.25; }
.sodo .ds { flex: 1; display: grid; gap: 7px; }
.sodo .ls { border: 1.5px solid color-mix(in srgb, var(--vua) 45%, #fff); border-radius: 10px; overflow: hidden; background: #fff; }
.sodo .ls > b { display: block; background: var(--nhat); color: var(--dam); padding: 3px 8px; font-size: .93rem; }
.sodo .ls > .kw { display: block; padding: 3px 8px 4px; font-size: .9rem; line-height: 1.4; }
.ck { list-style: none; padding-left: 0 !important; } .ck li { padding-left: 22px; position: relative; }
.ck li::before { content: "☐"; position: absolute; left: 0; top: -1px; color: var(--dam); font-weight: 800; font-size: 1.05rem; }
.dang td:first-child { text-align: left; font-weight: 600; } .dang td { text-align: left !important; }
</style></head><body>
<div class="page">
 <div class="hd"><div class="tag">TOÁN 10 · KẾT NỐI TRI THỨC</div>
  <div class="ch">Chương IV · Vectơ</div>
  <div class="row"><div class="so"><small>BÀI</small><b>9</b></div><h1>Tích của một vectơ<br>với một số</h1></div>
  <div class="muc">🎯 Nhân vectơ với một số · tính chất · điều kiện cùng phương, thẳng hàng · phân tích vectơ theo hai vectơ</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">✖️</span>Định nghĩa $k\overrightarrow{a}$</h2>
<p>Với $\overrightarrow{a}\ne\overrightarrow{0}$ và số thực $k$:</p>
<table class="t"><tr><th></th><th>Hướng của $k\overrightarrow{a}$</th><th>Độ dài</th></tr>
<tr><td>$k&gt;0$</td><td class="xanh">cùng hướng $\overrightarrow{a}$</td><td rowspan="2">$|k|\cdot|\overrightarrow{a}|$</td></tr>
<tr><td>$k&lt;0$</td><td class="do">ngược hướng $\overrightarrow{a}$</td></tr></table>
<p>Quy ước: $k\overrightarrow{a}=\overrightarrow{0}$ nếu $\overrightarrow{a}=\overrightarrow{0}$ hoặc $k=0$. $\ (-1)\overrightarrow{a}=-\overrightarrow{a}$.</p>
<div class="vd">$G$ là trọng tâm, $AM$ là trung tuyến: $\overrightarrow{GA}=-2\overrightarrow{GM}$.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">🧮</span>Tính chất</h2>
<div class="f l">$k(t\overrightarrow{a})=(kt)\overrightarrow{a}$<br>$(k+t)\overrightarrow{a}=k\overrightarrow{a}+t\overrightarrow{a}$<br>$k(\overrightarrow{a}\pm\overrightarrow{b})=k\overrightarrow{a}\pm k\overrightarrow{b}$<br>$1\overrightarrow{a}=\overrightarrow{a};\quad (-1)\overrightarrow{a}=-\overrightarrow{a}$</div></div><div class="card"><h2><span class="n">3</span><span class="ic">🔗</span>Cùng phương – Thẳng hàng</h2>
<div class="f">$\overrightarrow{a}, \overrightarrow{b}\ (\overrightarrow{b}\ne\overrightarrow{0})$ cùng phương $\iff \exists k:\ \overrightarrow{a}=k\overrightarrow{b}$</div>
<div class="f">$A,B,C$ thẳng hàng $\iff \exists k:\ \overrightarrow{AB}=k\overrightarrow{AC}$</div></div><div class="card"><h2><span class="n">4</span><span class="ic">🎯</span>Trung điểm – Trọng tâm</h2>
<p>Với mọi điểm $O$:</p><div class="f l">$I$ trung điểm $AB$: $\ \overrightarrow{OA}+\overrightarrow{OB}=2\overrightarrow{OI}$</div>
<div class="f l">$G$ trọng tâm $\triangle ABC$: $\ \overrightarrow{OA}+\overrightarrow{OB}+\overrightarrow{OC}=3\overrightarrow{OG}$</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🧭</span>Phân tích một vectơ theo hai vectơ</h2>
<p>Cho $\overrightarrow{a}, \overrightarrow{b}$ <b>không cùng phương</b>. Mọi vectơ $\overrightarrow{u}$ đều phân tích được <mark>một cách duy nhất</mark>:</p>
<div class="f">$\overrightarrow{u}=x\overrightarrow{a}+y\overrightarrow{b}$</div>
<p class="nho">Cách làm: chèn điểm (quy tắc ba điểm), dùng trung điểm, trọng tâm để đưa về hai vectơ đã cho.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>$k&lt;0$ thì $k\overrightarrow{a}$ <b>ngược hướng</b>; độ dài là $|k|\cdot|\overrightarrow{a}|$, không phải $k|\overrightarrow{a}|$.</li><li>$\overrightarrow{GA}=-2\overrightarrow{GM}$, không phải $2\overrightarrow{GM}$.</li><li>Chỉ phân tích duy nhất khi hai vectơ cơ sở <b>không cùng phương</b>.</li><li>Nhầm $\overrightarrow{OA}+\overrightarrow{OB}=\overrightarrow{OI}$ (thiếu hệ số 2).</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li>$k$ <b>dương giữ hướng, âm quay đầu</b>; $|k|$ phóng to hay thu nhỏ.</li><li><b>“Trung điểm nhân 2 – trọng tâm nhân 3”</b>.</li><li>Thẳng hàng ⇔ “vectơ này = <b>k lần</b> vectơ kia”.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>k·a giữ phương của a, đổi độ dài |k| lần; k > 0 cùng hướng, k < 0 ngược hướng.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.55–58</span><span></span></div>
 </div>
</div>
<script>
document.fonts.ready.then(function(){
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

fs.writeFileSync(path.join(dir, 'Bai05_GTLG-goc-0-180.html'), f5);
fs.writeFileSync(path.join(dir, 'Bai06_He-thuc-luong-trong-tam-giac.html'), f6);
fs.writeFileSync(path.join(dir, 'Bai06z_OnTap_ChuongIII_He-thuc-luong.html'), f6z);
fs.writeFileSync(path.join(dir, 'Bai07_Cac-khai-niem-mo-dau-vecto.html'), f7);
fs.writeFileSync(path.join(dir, 'Bai08_Tong-va-hieu-hai-vecto.html'), f8);
fs.writeFileSync(path.join(dir, 'Bai09_Tich-vecto-voi-mot-so.html'), f9);

console.log('Wrote batch 2 (6 files: Bai 5, 6, 6z, 7, 8, 9)');
