const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../public/infographics');

// Bai 10
const f10 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 10: Vectơ trong mặt phẳng toạ độ</title>
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
  <div class="row"><div class="so"><small>BÀI</small><b>10</b></div><h1>Vectơ trong<br>mặt phẳng toạ độ</h1></div>
  <div class="muc">🎯 Toạ độ của vectơ · biểu thức toạ độ các phép toán · độ dài, khoảng cách · trung điểm, trọng tâm</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">📍</span>Toạ độ của vectơ</h2>
<div class="fig"><svg viewBox="0 0 200 130" style="width:13em"><defs><marker id="a10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1D4ED8"/></marker></defs><defs><marker id="a10k" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#334155"/></marker></defs>
<line x1="20" y1="110" x2="192" y2="110" stroke="#334155" marker-end="url(#a10k)"/><line x1="40" y1="124" x2="40" y2="6" stroke="#334155" marker-end="url(#a10k)"/>
<line x1="40" y1="110" x2="148" y2="34" stroke="#1D4ED8" stroke-width="3" marker-end="url(#a10)"/>
<line x1="150" y1="34" x2="150" y2="110" stroke="#94A3B8" stroke-dasharray="4 3"/><line x1="150" y1="34" x2="40" y2="34" stroke="#94A3B8" stroke-dasharray="4 3"/>
<line x1="40" y1="110" x2="66" y2="110" stroke="#DC2626" stroke-width="3" marker-end="url(#a10)"/><line x1="40" y1="110" x2="40" y2="84" stroke="#16A34A" stroke-width="3" marker-end="url(#a10)"/>
<g font-family="Times New Roman" font-style="italic" font-size="13" font-weight="700">
<text x="154" y="30">M(x; y)</text><text x="146" y="124">x</text><text x="26" y="38">y</text><text x="28" y="124">O</text>
<text x="56" y="124" fill="#DC2626">i</text><text x="28" y="92" fill="#16A34A">j</text><text x="56" y="58" fill="#1D4ED8">u = OM</text></g></svg></div>
<div class="f">$\\overrightarrow{u}=x\\overrightarrow{i}+y\\overrightarrow{j} \\iff \\overrightarrow{u}=(x;y)$</div>
<p>$x$: hoành độ, $y$: tung độ. $\ \\overrightarrow{i}=(1;0),\\ \\overrightarrow{j}=(0;1),\\ \\overrightarrow{0}=(0;0)$.</p>
<p>Điểm $M(x;y)$ ⇒ $\\overrightarrow{OM}=(x;y)$.</p></div><div class="card"><h2><span class="n">2</span><span class="ic">🟰</span>Hai vectơ bằng nhau</h2>
<div class="f">$(x;y)=(x';y') \\iff \\begin{cases}x=x'\\\\y=y'\\end{cases}$</div></div><div class="card"><h2><span class="n">3</span><span class="ic">🧮</span>Phép toán theo toạ độ</h2>
<p>$\\overrightarrow{u}=(x;y),\\ \\overrightarrow{v}=(x';y')$:</p>
<div class="f l">$\\overrightarrow{u}+\\overrightarrow{v}=(x+x';\\,y+y')$<br>$\\overrightarrow{u}-\\overrightarrow{v}=(x-x';\\,y-y')$<br>$k\\overrightarrow{u}=(kx;\\,ky)$</div>
<p><b>Cùng phương:</b> $\\overrightarrow{v}$ cùng phương $\\overrightarrow{u}\\ne\\overrightarrow{0}$ ⇔ $x'=kx,\\ y'=ky$ (hay $\\frac{x'}{x}=\\frac{y'}{y}$ nếu $xy\\ne0$).</p></div><div class="card"><h2><span class="n">4</span><span class="ic">📏</span>Độ dài – Khoảng cách</h2>
<div class="f">$|\\overrightarrow{u}|=\\sqrt{x^2+y^2}$</div>
<p>$M(x;y),\\ N(x';y')$:</p>
<div class="f">$\\overrightarrow{MN}=(x'-x;\\ y'-y)$<br>$MN=\\sqrt{(x'-x)^2+(y'-y)^2}$</div>
<div class="vd">$\\overrightarrow{u}=(2;-1)$: $|\\overrightarrow{u}|=\\sqrt{4+1}=\\sqrt5$.</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🎯</span>Trung điểm – Trọng tâm</h2>
<div class="f">$I\\left(\\dfrac{x_A+x_B}{2};\\ \\dfrac{y_A+y_B}{2}\\right)$</div>
<div class="f">$G\\left(\\dfrac{x_A+x_B+x_C}{3};\\ \\dfrac{y_A+y_B+y_C}{3}\\right)$</div>
<p class="nho">Ứng dụng: xác định vị trí tâm bão, vật chuyển động trên bản đồ.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>$\\overrightarrow{MN}$ = toạ độ <b>điểm cuối trừ điểm đầu</b>, không phải ngược lại.</li><li>Quên căn bậc hai khi tính độ dài, hoặc quên bình phương số âm: $(-1)^2=1$.</li><li>Tìm đỉnh hình bình hành $ABCD$: dùng $\\overrightarrow{AD}=\\overrightarrow{BC}$, không nhầm thứ tự đỉnh.</li><li>Trọng tâm chia <b>3</b>, trung điểm chia <b>2</b>.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Cuối trừ đầu”</b> cho toạ độ vectơ $\\overrightarrow{MN}$.</li><li>Độ dài = <b>Pythagore</b> trên lưới ô vuông: $\\sqrt{\\Delta x^2+\\Delta y^2}$.</li><li>Trung điểm = <b>trung bình cộng</b> 2 điểm; trọng tâm = trung bình cộng 3 đỉnh.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Gắn toạ độ → mọi phép toán vectơ thành phép tính trên cặp số: cộng, trừ, nhân từng thành phần.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.60–65</span><span></span></div>
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

// Bai 11
const f11 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 11: Tích vô hướng của hai vectơ</title>
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
  <div class="row"><div class="so"><small>BÀI</small><b>11</b></div><h1>Tích vô hướng<br>của hai vectơ</h1></div>
  <div class="muc">🎯 Góc giữa hai vectơ · tích vô hướng · biểu thức toạ độ · tính chất · tính góc, chứng minh vuông góc</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">📐</span>Góc giữa hai vectơ</h2>
<p>Từ điểm $A$ vẽ $\\overrightarrow{AB}=\\overrightarrow{u}$, $\\overrightarrow{AC}=\\overrightarrow{v}$ (<mark>đưa về chung gốc</mark>):</p>
<div class="f">$(\\overrightarrow{u},\\overrightarrow{v})=\\widehat{BAC}\\in[0^\\circ;180^\\circ]$</div>
<p>$(\\overrightarrow{u},\\overrightarrow{v})=90^\\circ$ ⇔ $\\overrightarrow{u}\\perp\\overrightarrow{v}$. Cùng hướng: $0^\\circ$; ngược hướng: $180^\\circ$.</p>
<div class="vd">$\\triangle ABC$ vuông tại $A$, $\\hat B=30^\\circ$: $(\\overrightarrow{AB},\\overrightarrow{BC})=150^\\circ$.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">✳️</span>Tích vô hướng (là một SỐ)</h2>
<div class="f">$\\overrightarrow{u}\\cdot\\overrightarrow{v}=|\\overrightarrow{u}|\\cdot|\\overrightarrow{v}|\\cdot\\cos(\\overrightarrow{u},\\overrightarrow{v})$</div>
<div class="f l">• $\\overrightarrow{u}\\perp\\overrightarrow{v} \\iff \\overrightarrow{u}\\cdot\\overrightarrow{v}=0$<br>• $\\overrightarrow{u}^{\\,2}=\\overrightarrow{u}\\cdot\\overrightarrow{u}=|\\overrightarrow{u}|^2$</div>
<p class="nho">Gốc vật lí: công của lực $A=|\\overrightarrow{F}|\\cdot|\\overrightarrow{MN}|\\cdot\\cos(\\overrightarrow{F},\\overrightarrow{MN})$.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">🔢</span>Biểu thức toạ độ</h2>
<p>$\\overrightarrow{u}=(x;y),\\ \\overrightarrow{v}=(x';y')$:</p>
<div class="f">$\\overrightarrow{u}\\cdot\\overrightarrow{v}=xx'+yy'$</div>
<div class="f l">$\\overrightarrow{u}\\perp\\overrightarrow{v} \\iff xx'+yy'=0$<br>$\\cos(\\overrightarrow{u},\\overrightarrow{v})=\\dfrac{xx'+yy'}{\\sqrt{x^2+y^2}\\cdot\\sqrt{x'^2+y'^2}}$</div>
<div class="vd">$\\overrightarrow{u}=(2;-3),\\overrightarrow{v}=(5;3)$: $\\overrightarrow{u}\\cdot\\overrightarrow{v}=10-9=1$.</div></div><div class="card"><h2><span class="n">4</span><span class="ic">⚙️</span>Tính chất</h2>
<div class="f l">$\\overrightarrow{u}\\cdot\\overrightarrow{v}=\\overrightarrow{v}\\cdot\\overrightarrow{u}$ (giao hoán)<br>$\\overrightarrow{u}(\\overrightarrow{v}+\\overrightarrow{w})=\\overrightarrow{u}\\cdot\\overrightarrow{v}+\\overrightarrow{u}\\cdot\\overrightarrow{w}$ (phân phối)<br>$(k\\overrightarrow{u})\\cdot\\overrightarrow{v}=k(\\overrightarrow{u}\\cdot\\overrightarrow{v})$</div>
<div class="f l">$(\\overrightarrow{u}\\pm\\overrightarrow{v})^2=\\overrightarrow{u}^{\\,2}\\pm2\\overrightarrow{u}\\cdot\\overrightarrow{v}+\\overrightarrow{v}^{\\,2}$<br>$(\\overrightarrow{u}+\\overrightarrow{v})(\\overrightarrow{u}-\\overrightarrow{v})=\\overrightarrow{u}^{\\,2}-\\overrightarrow{v}^{\\,2}$</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🔺</span>Dấu của tích vô hướng</h2>
<div class="grid3"><div class="mini"><b class="xanh">&gt; 0</b>góc nhọn</div><div class="mini"><b>= 0</b>vuông góc</div><div class="mini"><b class="do">&lt; 0</b>góc tù</div></div>
<p class="nho" style="margin-top:4px">(với $\\overrightarrow{u}, \\overrightarrow{v}$ khác $\\overrightarrow{0}$)</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Tính góc khi hai vectơ <b>chưa chung gốc</b>: $(\\overrightarrow{AB},\\overrightarrow{BC})\\ne\\widehat{ABC}$.</li><li>Tích vô hướng là <b>số</b>, không phải vectơ.</li><li>Quên $\\cos$ âm với góc tù → sai dấu.</li><li>Viết $(\\overrightarrow{u}\\cdot\\overrightarrow{v})^2=\\overrightarrow{u}^{\\,2}\\cdot\\overrightarrow{v}^{\\,2}$: chỉ đúng khi hai vectơ cùng phương.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Nhân hoành cộng nhân tung”</b>: $xx'+yy'$.</li><li>Vuông góc ⇔ tích vô hướng <b>bằng 0</b> – công cụ chứng minh vuông góc nhanh nhất.</li><li>Góc giữa hai vectơ: <b>“kéo về chung gốc rồi mới đo”</b>.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>u·v = |u|·|v|·cos(u, v) = xx' + yy'. Bằng 0 ⇔ vuông góc.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.66–70</span><span></span></div>
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

// Bai 11z On Tap IV
const f11z = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ÔN TẬP IV: Ôn tập chương IV Vectơ</title>
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
  <div class="row"><div class="so ot"><small>ÔN TẬP</small><b>IV</b></div><h1>Ôn tập chương IV<br>Vectơ</h1></div>
  <div class="muc">🎯 Bài 7 → Bài 11 · Bài tập cuối chương IV — từ khái niệm vectơ đến tích vô hướng</div></div>
 <div class="main"></div><div class="pool"><div class="card span"><h2><span class="n">1</span><span class="ic">🗺️</span>Sơ đồ chương</h2><div class="sodo"><div class="goc">VECTƠ</div><div class="ds" style="grid-template-columns:repeat(2,1fr)"><div class="ls"><b>Bài 7 · Khái niệm mở đầu</b><div class="kw">Phương, hướng, độ dài · bằng nhau · vectơ-không</div></div><div class="ls"><b>Bài 8 · Tổng, hiệu</b><div class="kw">Quy tắc ba điểm, hình bình hành, hiệu · trung điểm, trọng tâm</div></div><div class="ls"><b>Bài 9 · Tích với một số</b><div class="kw">$k\\overrightarrow{a}$ · thẳng hàng · phân tích vectơ</div></div><div class="ls"><b>Bài 10 · Trong mặt phẳng toạ độ</b><div class="kw">Toạ độ vectơ · phép toán · độ dài · trung điểm, trọng tâm</div></div><div class="ls"><b>Bài 11 · Tích vô hướng</b><div class="kw">$|\\overrightarrow{u}||\\overrightarrow{v}|\\cos$ · $xx'+yy'$ · góc, vuông góc</div></div></div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">➕</span>Quy tắc cần thuộc</h2>
<div class="f l">$\\overrightarrow{AB}+\\overrightarrow{BC}=\\overrightarrow{AC}$ · $\\overrightarrow{AB}+\\overrightarrow{AD}=\\overrightarrow{AC}$ (hbh)<br>$\\overrightarrow{ON}-\\overrightarrow{OM}=\\overrightarrow{MN}$</div>
<div class="f l">$\\overrightarrow{OA}+\\overrightarrow{OB}=2\\overrightarrow{OI}$ · $\\overrightarrow{OA}+\\overrightarrow{OB}+\\overrightarrow{OC}=3\\overrightarrow{OG}$</div>
<p class="nho">$A,B,C$ thẳng hàng ⇔ $\\overrightarrow{AB}=k\\overrightarrow{AC}$.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">🔢</span>Toạ độ & tích vô hướng</h2>
<div class="f l">$\\overrightarrow{AB}=(x_B-x_A;\\,y_B-y_A)$, $\ |\\overrightarrow{u}|=\\sqrt{x^2+y^2}$</div>
<div class="f l">$\\overrightarrow{u}\\cdot\\overrightarrow{v}=|\\overrightarrow{u}||\\overrightarrow{v}|\\cos(\\overrightarrow{u},\\overrightarrow{v})=xx'+yy'$</div>
<p class="nho">$\\overrightarrow{u}\\perp\\overrightarrow{v}\\iff xx'+yy'=0$.</p></div><div class="card span"><h2><span class="n">4</span><span class="ic">📝</span>Các dạng toán thường gặp</h2><table class="t dang"><tr><th style="width:34%">Dạng toán</th><th>Cách làm</th></tr><tr><td>Chứng minh đẳng thức vectơ</td><td>Chèn điểm (quy tắc ba điểm), dùng trung điểm/trọng tâm, biến đổi một vế.</td></tr><tr><td>Phân tích vectơ theo hai vectơ</td><td>Đưa về $x\\overrightarrow{a}+y\\overrightarrow{b}$ ($\\overrightarrow{a},\\overrightarrow{b}$ không cùng phương).</td></tr><tr><td>Chứng minh thẳng hàng</td><td>Chỉ ra $\\overrightarrow{AB}=k\\overrightarrow{AC}$.</td></tr><tr><td>Tìm toạ độ điểm (đỉnh hbh, trung điểm, trọng tâm)</td><td>Hbh $ABCD$: $\\overrightarrow{AD}=\\overrightarrow{BC}$; dùng công thức trung bình cộng.</td></tr><tr><td>Tính góc, chứng minh vuông góc</td><td>$\\cos=\\frac{\\overrightarrow{u}\\cdot\\overrightarrow{v}}{|\\overrightarrow{u}||\\overrightarrow{v}|}$; tích vô hướng bằng 0.</td></tr><tr><td>Ứng dụng lực, vận tốc</td><td>Hợp lực/vận tốc thực tế là tổng các vectơ; công A = F·s·cosα.</td></tr></table></div><div class="card span"><h2><span class="n">5</span><span class="ic">✅</span>Tự kiểm tra – em đã làm được chưa?</h2><ul class="ck"><li>Chứng minh $\\overrightarrow{AB}+\\overrightarrow{CD}=\\overrightarrow{AD}+\\overrightarrow{CB}$.</li><li>Cho $G$ trọng tâm: biểu diễn $\\overrightarrow{AG}$ theo $\\overrightarrow{AB},\\overrightarrow{AC}$.</li><li>Cho $A(1;2),B(3;-1),C(0;4)$: tìm $D$ để $ABCD$ là hình bình hành.</li><li>Tính góc giữa $\\overrightarrow{u}=(1;2)$ và $\\overrightarrow{v}=(3;1)$.</li></ul></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Toạ độ $\\overrightarrow{AB}$ lấy “đầu trừ cuối”.</li><li>Tính góc giữa hai vectơ khi chưa đưa về chung gốc.</li><li>$k&lt;0$ mà vẫn nói $k\\overrightarrow{a}$ cùng hướng $\\overrightarrow{a}$.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Đuôi nối đầu – bỏ điểm giữa”</b>; <b>“Cuối trừ đầu”</b>.</li><li><b>“Trung điểm nhân 2 – trọng tâm nhân 3”</b>.</li><li><b>“Nhân hoành cộng nhân tung”</b> = tích vô hướng.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Vectơ: hình học bằng quy tắc cộng, trừ, nhân số; đại số bằng toạ độ; vuông góc khi tích vô hướng bằng 0.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.46–72</span><span></span></div>
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

// Bai 12
const f12 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 12: Số gần đúng và sai số</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#7E22CE;--vua:#A855F7;--nhat:#F6EEFF;}
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
  <div class="ch">Chương V · Các số đặc trưng của mẫu số liệu không ghép nhóm</div>
  <div class="row"><div class="so"><small>BÀI</small><b>12</b></div><h1>Số gần đúng và sai số</h1></div>
  <div class="muc">🎯 Số gần đúng · sai số tuyệt đối, độ chính xác · sai số tương đối · quy tròn số gần đúng</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">🏔️</span>Số đúng & số gần đúng</h2>
<p>Thường không biết <b>số đúng</b> $\\bar a$, chỉ tìm được giá trị xấp xỉ $a$ gọi là <span class="k">số gần đúng</span>.</p>
<div class="vd">Đường chéo hình vuông cạnh 1: $\\sqrt2$ là số đúng, $1{,}41$ là số gần đúng. Chiều cao Everest: $8\\,848{,}86$ m; $8\\,850$ m;… đều là số gần đúng.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">📏</span>Sai số tuyệt đối – Độ chính xác</h2>
<div class="f">$\\Delta_a=|a-\\bar a|$</div>
<p>Nếu $\\Delta_a\\le d$ thì $a-d\\le\\bar a\\le a+d$, viết</p>
<div class="f">$\\bar a=a\\pm d$</div>
<p>$d$: <span class="k">độ chính xác</span> — $d$ càng nhỏ, $a$ càng gần $\\bar a$.</p>
<div class="vd">Bao gạo ghi $5\\pm0{,}2$ kg ⇒ khối lượng thật thuộc $[4{,}8;\\ 5{,}2]$.</div>
<p class="nho">Phép đo: độ chính xác bằng <b>nửa đơn vị</b> của thước đo.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">⚖️</span>Sai số tương đối</h2>
<div class="f">$\\delta_a=\\dfrac{\\Delta_a}{|a|}\\le\\dfrac{d}{|a|}$</div>
<p>Thường viết dạng <b>phần trăm</b>. $\\delta_a$ càng nhỏ, phép đo càng <mark>chất lượng</mark>.</p>
<div class="vd">Dân số $3\\,574\\,625\\pm50\\,000$ người: $\\delta_a\\le\\frac{50\\,000}{3\\,574\\,625}\\approx1{,}4\\%$.</div>
<p class="nho">So sánh độ chính xác của hai phép đo khác đại lượng → dùng <b>sai số tương đối</b>.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">🔄</span>Quy tròn số</h2>
<p>Với chữ số ở hàng quy tròn: <b>giữ nguyên</b> nếu chữ số ngay bên phải <b>&lt; 5</b>; <b>tăng 1</b> nếu <b>≥ 5</b>.</p>
<p>Các chữ số sau hàng quy tròn: <b>bỏ đi</b> (phần thập phân) hoặc <b>thay bằng 0</b> (phần nguyên).</p>
<div class="f l">• Sai số tuyệt đối của số quy tròn $\\le$ nửa đơn vị hàng quy tròn.<br>• Biết độ chính xác $d$: quy tròn đến <mark>hàng thấp nhất mà $d$ nhỏ hơn 1 đơn vị của hàng đó</mark>.</div>
<div class="vd">$a=581\\,268,\\ d=200$ (hàng trăm) ⇒ quy tròn đến hàng nghìn: $581\\,000$.</div></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>So sánh hai phép đo khác đại lượng bằng sai số <b>tuyệt đối</b> → kết luận sai.</li><li>$d=200$ là hàng trăm nhưng phải quy tròn đến hàng <b>nghìn</b>.</li><li>Quy tròn số nguyên mà “bỏ” chữ số thay vì <b>thay bằng 0</b>.</li><li>Quên dấu giá trị tuyệt đối trong $\\delta_a=\\frac{d}{|a|}$.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Tuyệt đối đo lệch – tương đối đo chất lượng”</b>.</li><li>Quy tròn: <b>“Từ 5 trở lên thì lên, dưới 5 thì thôi”</b>.</li><li>$\\bar a=a\\pm d$ ⇔ số đúng nằm trong đoạn $[a-d;\\ a+d]$.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Số gần đúng luôn đi kèm sai số: Δ = |a − ā| ≤ d, δ = d/|a|; quy tròn theo độ chính xác d.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.73–77</span><span></span></div>
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

// Bai 13
const f13 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 13: Các số đặc trưng đo xu thế trung tâm</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#7E22CE;--vua:#A855F7;--nhat:#F6EEFF;}
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
  <div class="ch">Chương V · Các số đặc trưng của mẫu số liệu không ghép nhóm</div>
  <div class="row"><div class="so"><small>BÀI</small><b>13</b></div><h1>Các số đặc trưng<br>đo xu thế trung tâm</h1></div>
  <div class="muc">🎯 Tính số trung bình, trung vị, tứ phân vị, mốt · chọn số đặc trưng phù hợp · rút ra kết luận</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">➗</span>Số trung bình $\\bar x$</h2>
<div class="f">$\\bar x=\\dfrac{x_1+x_2+\\dots+x_n}{n}$</div>
<p>Bảng tần số (giá trị $x_k$ có tần số $m_k$, $n=m_1+\\dots+m_k$):</p>
<div class="f">$\\bar x=\\dfrac{m_1x_1+m_2x_2+\\dots+m_kx_k}{n}$</div>
<p class="nho">Ý nghĩa: cho biết vị trí trung tâm, đại diện cho mẫu số liệu.</p></div><div class="card"><h2><span class="n">2</span><span class="ic">🎯</span>Trung vị $M_e$</h2>
<ol class="steps"><li>Sắp xếp mẫu số liệu theo thứ tự <b>không giảm</b>.</li>
<li>$n$ <b>lẻ</b>: $M_e$ = giá trị chính giữa.<br>$n$ <b>chẵn</b>: $M_e$ = trung bình cộng <b>hai giá trị chính giữa</b>.</li></ol>
<p><mark>Trung vị không bị ảnh hưởng bởi giá trị bất thường</mark> → khi mẫu có giá trị bất thường, dùng trung vị để đại diện.</p>
<div class="vd">Lương (triệu): 4; 4; 4; 4; 4; 20 → $\\bar x\\approx6{,}67$ nhưng $M_e=4$ phản ánh đúng hơn.</div></div><div class="card"><h2><span class="n">3</span><span class="ic">📊</span>Tứ phân vị $Q_1, Q_2, Q_3$</h2>
<ol class="steps"><li>Sắp xếp không giảm; tìm trung vị → $Q_2$.</li>
<li>$Q_1$ = trung vị nửa <b>bên trái</b> $Q_2$; $\ Q_3$ = trung vị nửa <b>bên phải</b> $Q_2$ <span class="nho">(không gồm $Q_2$ nếu $n$ lẻ)</span>.</li></ol>
<div class="fig"><svg viewBox="0 0 260 62" style="width:17em">
<line x1="10" y1="30" x2="250" y2="30" stroke="#7E22CE" stroke-width="3"/>
<g fill="#A855F7"><rect x="10" y="24" width="2" height="12"/><rect x="248" y="24" width="2" height="12"/></g>
<g stroke="#7E22CE" stroke-width="2.4"><line x1="70" y1="20" x2="70" y2="40"/><line x1="130" y1="16" x2="130" y2="44"/><line x1="190" y1="20" x2="190" y2="40"/></g>
<g font-family="Be Vietnam Pro" font-size="11" font-weight="700" fill="#7E22CE" text-anchor="middle">
<text x="70" y="54">Q₁</text><text x="130" y="57">Q₂ = Me</text><text x="190" y="54">Q₃</text></g>
<g font-family="Be Vietnam Pro" font-size="10.5" fill="#334155" text-anchor="middle">
<text x="40" y="18">25%</text><text x="100" y="18">25%</text><text x="160" y="18">25%</text><text x="220" y="18">25%</text>
<text x="14" y="54">min</text><text x="244" y="54">max</text></g></svg></div>
<p class="nho">$Q_1$: tứ phân vị dưới; $Q_3$: tứ phân vị trên. Ba điểm chia mẫu thành 4 phần, mỗi phần chứa 25% giá trị.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">👟</span>Mốt</h2>
<div class="f">Mốt = giá trị xuất hiện với <b>tần số lớn nhất</b></div>
<ul><li>Mốt có thể <b>không duy nhất</b> (VD: 8; 7; 10; 9; 7; 5; 7; 8; 8 có mốt 7 và 8).</li>
<li>Tần số mọi giá trị như nhau → <b>không có mốt</b>.</li>
<li>Dùng được cả cho <b>dữ liệu định tính</b> (VD: lựa chọn được bình chọn nhiều nhất).</li></ul>
<p class="nho">Cửa hàng giày nên nhập nhiều nhất cỡ giày là mốt.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Tìm trung vị, tứ phân vị khi <b>chưa sắp xếp</b> mẫu số liệu.</li><li>$n$ chẵn mà lấy một giá trị giữa thay vì <b>trung bình hai giá trị giữa</b>.</li><li>$n$ lẻ: tính $Q_1, Q_3$ mà vẫn gộp cả $Q_2$ vào hai nửa.</li><li>Bảng tần số: chia cho số giá trị khác nhau thay vì chia cho $n$ = tổng tần số.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Sắp xếp trước – chia đôi sau”</b>: $Q_2$ chia đôi cả mẫu, $Q_1, Q_3$ chia đôi từng nửa.</li><li><b>Mốt = “mốt thời trang”</b>: cái được chọn nhiều nhất.</li><li>Có giá trị “khủng” bất thường → tin <b>trung vị</b> hơn trung bình.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Trung bình, trung vị, tứ phân vị, mốt cho biết “trung tâm” của dữ liệu – sắp xếp số liệu là bước đầu tiên.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.78–83</span><span></span></div>
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

// Bai 14
const f14 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 14: Các số đặc trưng đo độ phân tán</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#7E22CE;--vua:#A855F7;--nhat:#F6EEFF;}
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
  <div class="ch">Chương V · Các số đặc trưng của mẫu số liệu không ghép nhóm</div>
  <div class="row"><div class="so"><small>BÀI</small><b>14</b></div><h1>Các số đặc trưng<br>đo độ phân tán</h1></div>
  <div class="muc">🎯 Khoảng biến thiên, khoảng tứ phân vị · phương sai, độ lệch chuẩn · phát hiện giá trị bất thường bằng biểu đồ hộp</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">↔️</span>Khoảng biến thiên $R$</h2>
<div class="f">$R$ = giá trị lớn nhất − giá trị nhỏ nhất</div>
<p>$R$ càng lớn → mẫu càng <b>phân tán</b>. Đơn giản, dễ tính nhưng <mark>dễ bị ảnh hưởng bởi giá trị bất thường</mark>.</p>
<div class="vd">Tổ 1: 7…9 ⇒ $R_1=2$; Tổ 2: 6…10 ⇒ $R_2=4$ → Tổ 1 học đều hơn.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">📦</span>Khoảng tứ phân vị $\\Delta_Q$</h2>
<div class="f">$\\Delta_Q=Q_3-Q_1$</div>
<p>Là khoảng biến thiên của <b>50% số liệu chính giữa</b>. $\\Delta_Q$ càng lớn → mẫu càng phân tán.</p>
<p class="nho">Còn gọi: khoảng biến thiên = <i>biên độ</i>; khoảng tứ phân vị = <i>độ trải giữa</i>.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">📐</span>Phương sai & Độ lệch chuẩn</h2>
<div class="f">$s^2=\\dfrac{(x_1-\\bar x)^2+(x_2-\\bar x)^2+\\dots+(x_n-\\bar x)^2}{n}$</div>
<div class="f">$s=\\sqrt{s^2}$ <span class="nho">(độ lệch chuẩn)</span></div>
<p>Phương sai, độ lệch chuẩn càng lớn → số liệu càng phân tán. Dùng <b>tất cả</b> giá trị của mẫu.</p>
<div class="vd">43; 45; 46; 41; 40: $\\bar x=43$, $s^2=\\frac{26}{5}=5{,}2$, $s\\approx2{,}28$.</div>
<p class="nho">Một số tài liệu dùng $\\hat s^2$: chia cho $n-1$.</p></div><div class="card"><h2><span class="n">4</span><span class="ic">🚨</span>Giá trị bất thường – Biểu đồ hộp</h2>
<div class="fig"><svg viewBox="-16 0 302 92" style="width:18em">
<line x1="58" y1="40" x2="96" y2="40" stroke="#334155" stroke-width="1.6"/><line x1="174" y1="40" x2="212" y2="40" stroke="#334155" stroke-width="1.6"/>
<line x1="58" y1="30" x2="58" y2="50" stroke="#334155" stroke-width="1.6"/><line x1="212" y1="30" x2="212" y2="50" stroke="#334155" stroke-width="1.6"/>
<rect x="96" y="22" width="78" height="36" fill="#F3E8FF" stroke="#7E22CE" stroke-width="2"/><line x1="128" y1="22" x2="128" y2="58" stroke="#EAB308" stroke-width="3"/>
<circle cx="20" cy="40" r="4.5" fill="#DC2626"/><circle cx="248" cy="40" r="4.5" fill="#DC2626"/>
<line x1="96" y1="12" x2="174" y2="12" stroke="#7E22CE"/><text x="135" y="9" text-anchor="middle" font-size="10" font-family="Be Vietnam Pro" font-weight="700" fill="#7E22CE">Δ<tspan font-size="7.5" dy="2">Q</tspan></text>
<g font-family="Be Vietnam Pro" font-size="10" font-weight="700" text-anchor="middle" fill="#334155">
<text x="96" y="72">Q₁</text><text x="128" y="72">Q₂</text><text x="174" y="72">Q₃</text>
<text x="40" y="88" fill="#DC2626">Q₁ − 1,5Δ<tspan font-size="7.5" dy="2">Q</tspan></text><text x="228" y="88" fill="#DC2626">Q₃ + 1,5Δ<tspan font-size="7.5" dy="2">Q</tspan></text></g>
<g font-family="Be Vietnam Pro" font-size="9" fill="#DC2626" text-anchor="middle"><text x="20" y="28">bất thường</text><text x="248" y="28">bất thường</text></g></svg></div>
<div class="f l">$x$ là <b>giá trị bất thường</b> nếu<br>$x&gt;Q_3+1{,}5\\cdot\\Delta_Q$ hoặc $x&lt;Q_1-1{,}5\\cdot\\Delta_Q$</div>
<div class="vd">$Q_1=135,\\ Q_3=205$ ⇒ $\\Delta_Q=70$; ngưỡng $30$ và $310$ ⇒ $0$ và $340$ là bất thường.</div></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Tính phương sai quên <b>bình phương</b> độ lệch, hoặc quên chia cho $n$.</li><li>Độ lệch chuẩn là $\\sqrt{s^2}$ – đừng lấy phương sai làm đáp án.</li><li>Ngưỡng bất thường dùng $1{,}5\\Delta_Q$, không phải $1{,}5R$.</li><li>Tính $\\Delta_Q$ khi chưa sắp xếp mẫu số liệu.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>Càng lớn càng “tản”</b>: $R,\\ \\Delta_Q,\\ s^2,\\ s$ lớn → số liệu phân tán.</li><li>Phương sai = <b>“trung bình của bình phương độ lệch”</b>.</li><li>Biểu đồ hộp: <b>hộp chứa 50% giữa</b>, ra ngoài “1,5 hộp” là bất thường.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Đo độ phân tán: R, ΔQ, phương sai s², độ lệch chuẩn s; dùng 1,5·ΔQ để phát hiện giá trị bất thường.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.84–88</span><span></span></div>
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

// Bai 14z On Tap V
const f14z = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ÔN TẬP V: Ôn tập chương V Số đặc trưng của mẫu số liệu</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#7E22CE;--vua:#A855F7;--nhat:#F6EEFF;}
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
  <div class="ch">Chương V · Các số đặc trưng của mẫu số liệu không ghép nhóm</div>
  <div class="row"><div class="so ot"><small>ÔN TẬP</small><b>V</b></div><h1>Ôn tập chương V<br>Số đặc trưng của mẫu số liệu</h1></div>
  <div class="muc">🎯 Bài 12 · Bài 13 · Bài 14 · Bài tập cuối chương V — sai số, xu thế trung tâm, độ phân tán</div></div>
 <div class="main"></div><div class="pool"><div class="card span"><h2><span class="n">1</span><span class="ic">🗺️</span>Sơ đồ chương</h2><div class="sodo"><div class="goc">SỐ ĐẶC TRƯNG<br>MẪU SỐ LIỆU<br>KHÔNG<br>GHÉP NHÓM</div><div class="ds" style="grid-template-columns:repeat(2,1fr)"><div class="ls"><b>Bài 12 · Số gần đúng, sai số</b><div class="kw">$\\Delta_a=|a-\\bar a|$ · $\\bar a=a\\pm d$ · $\\delta_a=\\frac{d}{|a|}$ · quy tròn</div></div><div class="ls"><b>Bài 13 · Xu thế trung tâm</b><div class="kw">Số trung bình $\\bar x$ · trung vị $M_e$ · tứ phân vị · mốt</div></div><div class="ls"><b>Bài 14 · Độ phân tán</b><div class="kw">$R$ · $\\Delta_Q$ · phương sai $s^2$ · độ lệch chuẩn $s$ · giá trị bất thường</div></div></div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">🎯</span>Đo trung tâm</h2>
<div class="f">$\\bar x=\\dfrac{m_1x_1+\\dots+m_kx_k}{n}$</div>
<p><b>Sắp xếp</b> → $M_e$ (giá trị giữa, hoặc TB hai giá trị giữa) → $Q_1, Q_3$ (trung vị hai nửa). Mốt: tần số lớn nhất.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">↔️</span>Đo phân tán</h2>
<div class="f l">$R=x_{\\max}-x_{\\min}$ · $\\Delta_Q=Q_3-Q_1$<br>$s^2=\\frac1n\\sum(x_i-\\bar x)^2$ · $s=\\sqrt{s^2}$</div>
<div class="f l">Bất thường: $x&gt;Q_3+1{,}5\\Delta_Q$ hoặc $x&lt;Q_1-1{,}5\\Delta_Q$</div></div><div class="card span"><h2><span class="n">4</span><span class="ic">📝</span>Các dạng toán thường gặp</h2><table class="t dang"><tr><th style="width:34%">Dạng toán</th><th>Cách làm</th></tr><tr><td>Viết số quy tròn theo độ chính xác d</td><td>Tìm hàng của d → quy tròn đến hàng cao hơn liền kề.</td></tr><tr><td>Ước lượng sai số tuyệt đối, tương đối</td><td>$\\Delta_a\\le d$; $\\delta_a\\le\\frac{d}{|a|}$, đổi ra %; so sánh độ chính xác bằng $\\delta$.</td></tr><tr><td>Tính số trung bình, trung vị, tứ phân vị, mốt</td><td>Lập bảng tần số, <b>sắp xếp</b> rồi mới tính.</td></tr><tr><td>Tính khoảng biến thiên, tứ phân vị, phương sai, độ lệch chuẩn</td><td>Lập bảng $x_i$, $x_i-\\bar x$, $(x_i-\\bar x)^2$; dùng máy tính để kiểm tra.</td></tr><tr><td>Tìm giá trị bất thường</td><td>Tính $Q_1,Q_3,\\Delta_Q$ → hai ngưỡng → so sánh.</td></tr><tr><td>So sánh, nhận xét hai mẫu số liệu</td><td>Trung tâm: so $\\bar x$ hoặc $M_e$; độ đồng đều: so $s$ hoặc $\\Delta_Q$ (nhỏ hơn → đều hơn).</td></tr></table></div><div class="card span"><h2><span class="n">5</span><span class="ic">✅</span>Tự kiểm tra – em đã làm được chưa?</h2><ul class="ck"><li>Quy tròn $a=2{,}718281$ với độ chính xác $d=0{,}005$.</li><li>Tính trung bình, trung vị, mốt của điểm kiểm tra tổ em.</li><li>Tìm $Q_1,Q_2,Q_3$ của mẫu có 9 giá trị và mẫu có 10 giá trị.</li><li>Tính phương sai, độ lệch chuẩn của 5 số liệu.</li><li>Phát hiện giá trị bất thường bằng ngưỡng 1,5·ΔQ.</li></ul></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Tìm trung vị, tứ phân vị khi chưa sắp xếp.</li><li>Quên bình phương độ lệch hoặc quên lấy căn khi tính độ lệch chuẩn.</li><li>So độ chính xác hai phép đo khác đại lượng bằng sai số tuyệt đối.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Sắp xếp trước – chia đôi sau”</b>.</li><li><b>Càng lớn càng “tản”</b>: R, ΔQ, s², s.</li><li>Có giá trị “khủng” → tin <b>trung vị</b> hơn trung bình.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Mỗi mẫu số liệu cần hai câu trả lời: “trung tâm ở đâu?” (x̄, Me, mốt) và “tản ra bao nhiêu?” (R, ΔQ, s).</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.73–90</span><span></span></div>
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

fs.writeFileSync(path.join(dir, 'Bai10_Vecto-trong-mat-phang-toa-do.html'), f10);
fs.writeFileSync(path.join(dir, 'Bai11_Tich-vo-huong-hai-vecto.html'), f11);
fs.writeFileSync(path.join(dir, 'Bai11z_OnTap_ChuongIV_Vecto.html'), f11z);
fs.writeFileSync(path.join(dir, 'Bai12_So-gan-dung-va-sai-so.html'), f12);
fs.writeFileSync(path.join(dir, 'Bai13_So-dac-trung-xu-the-trung-tam.html'), f13);
fs.writeFileSync(path.join(dir, 'Bai14_So-dac-trung-do-phan-tan.html'), f14);
fs.writeFileSync(path.join(dir, 'Bai14z_OnTap_ChuongV_So-dac-trung.html'), f14z);

console.log('Wrote batch 3 (7 files: Bai 10, 11, 11z, 12, 13, 14, 14z)');
