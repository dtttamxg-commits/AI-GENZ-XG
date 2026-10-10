const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../public/infographics');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Bai 1
const f1 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 1: Mệnh đề</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#0F766E;--vua:#14B8A6;--nhat:#E6FFFB;}
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
  <div class="ch">Chương I · Mệnh đề và tập hợp</div>
  <div class="row"><div class="so"><small>BÀI</small><b>1</b></div><h1>Mệnh đề</h1></div>
  <div class="muc">🎯 Phân biệt mệnh đề · lập phủ định, kéo theo, đảo, tương đương · dùng đúng ∀, ∃</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">🧩</span>Mệnh đề là gì?</h2>
<p><span class="k">Mệnh đề</span> = câu khẳng định <mark>có tính đúng hoặc sai</mark>.</p>
<div class="f l">✔ Mỗi mệnh đề phải hoặc đúng, hoặc sai.<br>✘ Không thể vừa đúng vừa sai.</div>
<p class="nho">Câu hỏi, câu cảm thán, câu cầu khiến <b>không</b> là mệnh đề.</p>
<p><span class="k">Mệnh đề chứa biến:</span> “$n$ chia hết cho 2” chưa đúng/sai; thay $n=10$ → mệnh đề đúng, $n=5$ → mệnh đề sai.</p></div><div class="card"><h2><span class="n">2</span><span class="ic">🔄</span>Mệnh đề phủ định $\\overline{P}$</h2>
<p>Thêm (hoặc bớt) <mark>“không”, “không phải”</mark> trước vị ngữ của $P$.</p>
<div class="f">$P$ đúng $\\Rightarrow \\overline{P}$ sai &nbsp;·&nbsp; $P$ sai $\\Rightarrow \\overline{P}$ đúng</div>
<div class="vd">$P$: “17 là số chính phương” → $\\overline{P}$: “17 không phải là số chính phương”.</div></div><div class="card"><h2><span class="n">3</span><span class="ic">➡️</span>Mệnh đề kéo theo $P \\Rightarrow Q$</h2>
<p>Dạng <b>“Nếu $P$ thì $Q$”</b>. <span class="do">Chỉ sai khi $P$ đúng và $Q$ sai.</span></p>
<table class="t"><tr><th>$P$</th><th>$Q$</th><th>$P\\Rightarrow Q$</th></tr>
<tr><td>Đ</td><td>Đ</td><td class="xanh">Đ</td></tr><tr><td>Đ</td><td>S</td><td class="do">S</td></tr>
<tr><td>S</td><td>Đ</td><td class="xanh">Đ</td></tr><tr><td>S</td><td>S</td><td class="xanh">Đ</td></tr></table>
<p>Định lí dạng $P\\Rightarrow Q$: $P$ là <b>giả thiết</b>, $Q$ là <b>kết luận</b>;</p>
<div class="f l">$P$ là <span class="k">điều kiện đủ</span> để có $Q$<br>$Q$ là <span class="k">điều kiện cần</span> để có $P$</div></div><div class="card"><h2><span class="n">4</span><span class="ic">↩️</span>Mệnh đề đảo</h2>
<div class="f">Đảo của $P\\Rightarrow Q$ là $Q\\Rightarrow P$</div>
<p><mark>Mệnh đề đảo của một mệnh đề đúng không nhất thiết đúng.</mark></p>
<div class="vd">“Tam giác đều ⇒ tam giác cân” đúng, nhưng “Tam giác cân ⇒ tam giác đều” sai.</div></div><div class="card"><h2><span class="n">5</span><span class="ic">⇔</span>Mệnh đề tương đương $P \\Leftrightarrow Q$</h2>
<p>“$P$ <b>nếu và chỉ nếu</b> $Q$”. Đúng khi <mark>cả $P\\Rightarrow Q$ và $Q\\Rightarrow P$ đều đúng</mark>.</p>
<p>Cách đọc khác: “$P$ tương đương $Q$”, “$P$ là <span class="k">điều kiện cần và đủ</span> để có $Q$”, “$P$ khi và chỉ khi $Q$”.</p></div><div class="card"><h2><span class="n">6</span><span class="ic">🔣</span>Kí hiệu ∀ và ∃</h2>
<div class="grid2"><div class="mini"><b>$\\forall$ “với mọi”</b>$\\forall x\\in\\mathbb{R},\\ x^2\\ge 0$</div>
<div class="mini"><b>$\\exists$ “tồn tại”</b>$\\exists x\\in\\mathbb{Q},\\ x^2=2$</div></div>
<p style="margin-top:6px"><b>Phủ định:</b> đổi $\\forall \\leftrightarrow \\exists$ <u>và</u> phủ định tính chất.</p>
<div class="f l">$\\overline{\\forall x\\in X,\\,P(x)}$ là $\\exists x\\in X,\\,\\overline{P(x)}$<br>$\\overline{\\exists x\\in X,\\,P(x)}$ là $\\forall x\\in X,\\,\\overline{P(x)}$</div>
<div class="vd">$P$: “$\\exists x\\in\\mathbb{R},\\,x^2+1=0$” → $\\overline{P}$: “$\\forall x\\in\\mathbb{R},\\,x^2+1\\ne 0$”.</div></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Câu chứa biến (“$x>5$”) <b>chưa</b> là mệnh đề.</li><li>Phủ định của “$a&lt;b$” là “$a\\ge b$”, không phải “$a&gt;b$”.</li><li>Phủ định $\\forall/\\exists$: quên đổi kí hiệu hoặc quên phủ định tính chất.</li><li>Thấy $P\\Rightarrow Q$ đúng rồi kết luận luôn $Q\\Rightarrow P$ đúng.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Đủ đứng trước – Cần đứng sau”</b>: $P\\Rightarrow Q$ thì $P$ đủ, $Q$ cần.</li><li>$\\forall$ là chữ <b>A</b> lộn ngược (<i>All</i> – tất cả); $\\exists$ là chữ <b>E</b> lật (<i>Exist</i> – tồn tại).</li><li>$P\\Rightarrow Q$ như <b>lời hứa</b>: chỉ “thất hứa” khi $P$ xảy ra mà $Q$ không xảy ra.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Mệnh đề = câu chắc chắn đúng hoặc sai. Nắm 5 phép: phủ định – kéo theo – đảo – tương đương – ∀/∃.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.5–11</span><span></span></div>
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

// Bai 2
const f2 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 2: Tập hợp và các phép toán trên tập hợp</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#0F766E;--vua:#14B8A6;--nhat:#E6FFFB;}
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
  <div class="ch">Chương I · Mệnh đề và tập hợp</div>
  <div class="row"><div class="so"><small>BÀI</small><b>2</b></div><h1>Tập hợp và các phép toán<br>trên tập hợp</h1></div>
  <div class="muc">🎯 Viết tập hợp · tập con, tập bằng nhau · khoảng – đoạn – nửa khoảng · giao, hợp, hiệu, phần bù</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">📦</span>Tập hợp & phần tử</h2>
<p>Hai cách mô tả: <b>① Liệt kê</b> các phần tử; <b>② Chỉ ra tính chất đặc trưng</b>.</p>
<div class="vd">$D=\\{n\\in\\mathbb{N}\\mid n$ nguyên tố, $5&lt;n&lt;20\\}=\\{7;11;13;17;19\\}$, $n(D)=5$.</div>
<p style="margin-top:5px">$a\\in S$: $a$ thuộc $S$ · $a\\notin S$: $a$ không thuộc $S$ · $n(S)$: số phần tử.</p>
<p><span class="k">Tập rỗng $\\varnothing$</span>: không có phần tử nào (VD: tập nghiệm của $x^2+1=0$).</p></div><div class="card"><h2><span class="n">2</span><span class="ic">🪆</span>Tập con – Hai tập bằng nhau</h2>
<div class="f">$T\\subset S \\iff \\forall x,\\ x\\in T \\Rightarrow x\\in S$</div>
<p>Mọi phần tử của $T$ đều thuộc $S$. Quy ước: <mark>$\\varnothing$ là tập con của mọi tập hợp</mark>.</p>
<div class="f">$S\\subset T$ và $T\\subset S \\;\\Rightarrow\\; S=T$</div></div><div class="card"><h2><span class="n">3</span><span class="ic">🔢</span>Các tập hợp số</h2>
<div class="fig"><svg viewBox="0 0 220 96" style="width:16em"><ellipse cx="110" cy="48" rx="106" ry="44" fill="#FDE68A" stroke="#B45309"/><ellipse cx="128" cy="48" rx="80" ry="36" fill="#BBF7D0" stroke="#15803D"/><ellipse cx="145" cy="48" rx="56" ry="27" fill="#BAE6FD" stroke="#0369A1"/><ellipse cx="162" cy="48" rx="30" ry="17" fill="#FBCFE8" stroke="#BE185D"/><g font-family="Times New Roman" font-weight="700" font-size="16" fill="#111"><text x="22" y="54">ℝ</text><text x="60" y="54">ℚ</text><text x="100" y="54">ℤ</text><text x="155" y="54">ℕ</text></g></svg></div>
<div class="f">$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$</div>
<p class="nho">ℚ: viết được dạng $\\frac{a}{b}$ ($a,b\\in\\mathbb{Z}, b\\neq0$). ℝ gồm số hữu tỉ và số vô tỉ (thập phân vô hạn không tuần hoàn).</p></div><div class="card"><h2><span class="n">4</span><span class="ic">📏</span>Khoảng – Đoạn – Nửa khoảng (tập con của ℝ)</h2>
<table class="t"><tr><th>Kí hiệu</th><th>Nghĩa là</th><th>Trên trục số</th></tr>
<tr><td>$(a;b)$</td><td>$a&lt;x&lt;b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">(</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">)</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr>
<tr><td>$[a;b]$</td><td>$a\\le x\\le b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">[</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">]</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr>
<tr><td>$[a;b)$</td><td>$a\\le x&lt;b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">[</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">)</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr>
<tr><td>$(a;b]$</td><td>$a&lt;x\\le b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">(</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">]</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr>
<tr><td>$(a;+\\infty)$</td><td>$x&gt;a$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="138" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">(</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text></svg></td></tr>
<tr><td>$[a;+\\infty)$</td><td>$x\\ge a$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="45" y1="14" x2="138" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="45" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">[</text><text x="45" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">a</text></svg></td></tr>
<tr><td>$(-\\infty;b)$</td><td>$x&lt;b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="12" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">)</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr>
<tr><td>$(-\\infty;b]$</td><td>$x\\le b$</td><td><svg viewBox="0 0 150 36" style="width:9.08em"><line x1="4" y1="14" x2="146" y2="14" stroke="#64748B" stroke-width="1.4"/><path d="M146 14 l-6 -4 v8z" fill="#64748B"/><line x1="12" y1="14" x2="105" y2="14" stroke="#2563EB" stroke-width="5" stroke-linecap="butt"/><text x="105" y="20" text-anchor="middle" font-size="19" font-weight="700" fill="#B91C1C" font-family="Consolas">]</text><text x="105" y="34" text-anchor="middle" font-size="11" font-style="italic" font-family="Times New Roman">b</text></svg></td></tr></table>
<p class="nho">Ngoặc vuông <b>[ ]</b> lấy đầu mút · ngoặc tròn <b>( )</b> bỏ đầu mút · $\\mathbb{R}=(-\\infty;+\\infty)$.</p></div><div class="card"><h2><span class="n">5</span><span class="ic">🔀</span>Các phép toán trên tập hợp</h2>
<div class="grid2">
<div class="mini"><svg viewBox="0 0 124 92" style="width:8.62em"><g opacity=".85"><clipPath id="h1"><circle cx="45" cy="38" r="28"/></clipPath><circle cx="78" cy="38" r="28" fill="#F87171" clip-path="url(#h1)"/></g><g fill="none" stroke="#334155" stroke-width="1.6"><circle cx="45" cy="38" r="28"/><circle cx="78" cy="38" r="28"/></g><g font-size="12" font-style="italic" font-family="Times New Roman" fill="#111"><text x="6" y="20">S</text><text x="110" y="20">T</text></g><text x="62" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="#111" font-family="Be Vietnam Pro">S ∩ T</text></svg>$\\{x\\mid x\\in S$ <b>và</b> $x\\in T\\}$</div>
<div class="mini"><svg viewBox="0 0 124 92" style="width:8.62em"><g opacity=".85"><circle cx="45" cy="38" r="28" fill="#4ADE80"/><circle cx="78" cy="38" r="28" fill="#4ADE80"/></g><g fill="none" stroke="#334155" stroke-width="1.6"><circle cx="45" cy="38" r="28"/><circle cx="78" cy="38" r="28"/></g><g font-size="12" font-style="italic" font-family="Times New Roman" fill="#111"><text x="6" y="20">S</text><text x="110" y="20">T</text></g><text x="62" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="#111" font-family="Be Vietnam Pro">S ∪ T</text></svg>$\\{x\\mid x\\in S$ <b>hoặc</b> $x\\in T\\}$</div>
<div class="mini"><svg viewBox="0 0 124 92" style="width:8.62em"><g opacity=".85"><mask id="h3"><rect width="130" height="80" fill="#fff"/><circle cx="78" cy="38" r="28" fill="#000"/></mask><circle cx="45" cy="38" r="28" fill="#60A5FA" mask="url(#h3)"/></g><g fill="none" stroke="#334155" stroke-width="1.6"><circle cx="45" cy="38" r="28"/><circle cx="78" cy="38" r="28"/></g><g font-size="12" font-style="italic" font-family="Times New Roman" fill="#111"><text x="6" y="20">S</text><text x="110" y="20">T</text></g><text x="62" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="#111" font-family="Be Vietnam Pro">S \\ T</text></svg>$\\{x\\mid x\\in S$ và $x\\notin T\\}$</div>
<div class="mini"><svg viewBox="0 0 124 92" style="width:8.62em"><g opacity=".85"><mask id="h4"><rect width="130" height="80" fill="#fff"/><circle cx="68" cy="40" r="16" fill="#000"/></mask><ellipse cx="62" cy="38" rx="50" ry="30" fill="#60A5FA" mask="url(#h4)"/></g><g fill="none" stroke="#334155" stroke-width="1.6"><ellipse cx="62" cy="38" rx="50" ry="30"/><circle cx="68" cy="40" r="16"/></g><g font-size="12" font-style="italic" font-family="Times New Roman" fill="#111"><text x="22" y="40">S</text><text x="63" y="45">T</text></g><text x="62" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="#111" font-family="Be Vietnam Pro">C<tspan font-size='9' dy='3'>S</tspan><tspan dy='-3'>T</tspan></text></svg>Khi $T\\subset S$: $C_ST=S\\setminus T$</div></div></div><div class="card"><h2><span class="n">6</span><span class="ic">🧮</span>Đếm số phần tử</h2>
<div class="f">$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)$</div>
<div class="vd">Lớp 24 bạn, 16 bạn đá bóng, 11 bạn cầu lông (ai cũng chơi ít nhất một môn) ⇒ cả hai môn: $16+11-24=3$ bạn.</div></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Nhầm $\\in$ với $\\subset$: viết $2\\in\\mathbb{N}$, nhưng $\\{2\\}\\subset\\mathbb{N}$.</li><li>Phía có $\\pm\\infty$ <b>luôn</b> dùng ngoặc tròn: $[a;+\\infty)$, không viết $[a;+\\infty]$.</li><li>Giao/hợp trên trục số: không xét kĩ đầu mút có được lấy hay không.</li><li>Quên $\\varnothing$ khi liệt kê tập con.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>Giao = “và”</b> (phần chung) · <b>Hợp = “hoặc”</b> (gom hết).</li><li><b>∪</b> giống cái cốc – <b>gom</b> tất cả; <b>∩</b> giống cổng chung – chỉ lấy phần <b>chung</b>.</li><li>Hiệu $S\\setminus T$: “trong $S$, <b>bỏ</b> phần của $T$”.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Vẽ biểu đồ Ven hoặc trục số trước khi tính giao, hợp, hiệu – nhìn hình là ra đáp án.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.12–19</span><span></span></div>
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

// Bai 2z On Tap I
const f2z = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ÔN TẬP I: Ôn tập chương I Mệnh đề và tập hợp</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#0F766E;--vua:#14B8A6;--nhat:#E6FFFB;}
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
  <div class="ch">Chương I · Mệnh đề và tập hợp</div>
  <div class="row"><div class="so ot"><small>ÔN TẬP</small><b>I</b></div><h1>Ôn tập chương I<br>Mệnh đề và tập hợp</h1></div>
  <div class="muc">🎯 Bài 1 · Bài 2 · Bài tập cuối chương I — hệ thống kiến thức, dạng toán và tự kiểm tra</div></div>
 <div class="main"></div><div class="pool"><div class="card span"><h2><span class="n">1</span><span class="ic">🗺️</span>Sơ đồ chương</h2><div class="sodo"><div class="goc">MỆNH ĐỀ<br>&amp;<br>TẬP HỢP</div><div class="ds" style="grid-template-columns:repeat(1,1fr)"><div class="ls"><b>Bài 1 · Mệnh đề</b><div class="kw">Đúng/sai · phủ định $\\overline{P}$ · $P\\Rightarrow Q$ · đảo · $P\\Leftrightarrow Q$ · $\\forall,\\exists$</div></div><div class="ls"><b>Bài 2 · Tập hợp</b><div class="kw">Tập con · tập bằng nhau · khoảng, đoạn · $\\cap,\\cup,\\setminus$, phần bù</div></div></div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">🧩</span>Mệnh đề – cốt lõi</h2>
<div class="f l">$P\\Rightarrow Q$ <b>chỉ sai</b> khi $P$ đúng, $Q$ sai<br>$P\\Leftrightarrow Q$ đúng ⇔ $P\\Rightarrow Q$ và $Q\\Rightarrow P$ cùng đúng</div>
<div class="f l">$\\overline{\\forall x,\\,P(x)}$: $\\exists x,\\,\\overline{P(x)}$<br>$\\overline{\\exists x,\\,P(x)}$: $\\forall x,\\,\\overline{P(x)}$</div>
<p class="nho">$P\\Rightarrow Q$: $P$ là điều kiện <b>đủ</b>, $Q$ là điều kiện <b>cần</b>.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">📦</span>Tập hợp – cốt lõi</h2>
<div class="f l">$A\\cap B$: thuộc $A$ <b>và</b> $B$ · $A\\cup B$: thuộc $A$ <b>hoặc</b> $B$<br>$A\\setminus B$: thuộc $A$, không thuộc $B$ · $C_AB=A\\setminus B$ ($B\\subset A$)</div>
<div class="f">$n(A\\cup B)=n(A)+n(B)-n(A\\cap B)$</div>
<p class="nho">$\\varnothing\\subset A$ với mọi $A$; $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$.</p></div><div class="card span"><h2><span class="n">4</span><span class="ic">📝</span>Các dạng toán thường gặp</h2><table class="t dang"><tr><th style="width:34%">Dạng toán</th><th>Cách làm</th></tr><tr><td>Nhận biết mệnh đề, xét đúng sai</td><td>Câu khẳng định có đúng/sai xác định? Mệnh đề chứa biến: thay giá trị cụ thể.</td></tr><tr><td>Lập phủ định</td><td>Thêm/bớt “không”; $&lt;$ thành $\\ge$; đổi $\\forall\\leftrightarrow\\exists$ và phủ định tính chất.</td></tr><tr><td>Điều kiện cần, đủ</td><td>Viết về dạng $P\\Rightarrow Q$: $P$ đủ, $Q$ cần; cả hai chiều đúng → cần và đủ.</td></tr><tr><td>Viết tập hợp, tìm tập con</td><td>Liệt kê ↔ tính chất đặc trưng; tập có $n$ phần tử có $2^n$ tập con (kể cả $\\varnothing$).</td></tr><tr><td>Phép toán trên khoảng, đoạn</td><td>Vẽ trục số, tô từng tập, đọc phần chung (giao) / gom hết (hợp); xét kĩ đầu mút.</td></tr><tr><td>Bài toán đếm (Ven)</td><td>Vẽ biểu đồ Ven, dùng $n(A\\cup B)=n(A)+n(B)-n(A\\cap B)$.</td></tr></table></div><div class="card span"><h2><span class="n">5</span><span class="ic">✅</span>Tự kiểm tra – em đã làm được chưa?</h2><ul class="ck"><li>Lập phủ định của “$\\forall x\\in\\mathbb{R},\\ x^2+1&gt;0$”.</li><li>Phát biểu “điều kiện cần và đủ” cho một định lí hai chiều.</li><li>Tìm $[-1;3)\\cap(2;5]$ và $[-1;3)\\cup(2;5]$ trên trục số.</li><li>Liệt kê các tập con của $\\{a;b;c\\}$ (đủ 8 tập).</li><li>Giải một bài đếm số HS tham gia hai câu lạc bộ.</li></ul></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Phủ định “$a&gt;b$” thành “$a&lt;b$” (đúng phải là $a\\le b$).</li><li>Nhầm kí hiệu $\\in$ (phần tử) với $\\subset$ (tập con).</li><li>Viết $[a;+\\infty]$ – phía vô cực luôn là ngoặc tròn.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>Đủ trước – Cần sau</b>; <b>Giao = và, Hợp = hoặc</b>.</li><li>Bài tập hợp số: <b>luôn vẽ trục số</b>; bài đếm: <b>luôn vẽ Ven</b>.</li><li>Phủ định $\\forall/\\exists$: <b>“đổi kí hiệu – đảo tính chất”</b>.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Chương I là “ngôn ngữ” của Toán: nói đúng mệnh đề, viết đúng tập hợp, vẽ trục số và Ven để tính.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.5–20</span><span></span></div>
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

// Bai 3
const f3 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 3: Bất phương trình bậc nhất hai ẩn</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#3730A3;--vua:#6366F1;--nhat:#EEF0FF;}
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
  <div class="ch">Chương II · Bất phương trình và hệ bất phương trình bậc nhất hai ẩn</div>
  <div class="row"><div class="so"><small>BÀI</small><b>3</b></div><h1>Bất phương trình<br>bậc nhất hai ẩn</h1></div>
  <div class="muc">🎯 Nhận biết BPT bậc nhất hai ẩn · kiểm tra nghiệm · biểu diễn miền nghiệm · giải bài toán thực tế</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">📝</span>Dạng tổng quát</h2>
<div class="f">$ax+by\\le c\\quad(\\ \\ge,\\ &lt;,\\ &gt;\\ )$</div>
<p>$a, b, c$ là số thực đã cho, <mark>$a$ và $b$ không đồng thời bằng 0</mark>; $x, y$ là ẩn.</p>
<div class="grid2"><div class="mini"><b class="xanh">✔ Đúng dạng</b>$2x+3y&lt;1$</div><div class="mini"><b class="do">✘ Không phải</b>$2x^2+3y&lt;1$</div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">🎯</span>Nghiệm của BPT</h2>
<p>Cặp số $(x_0;y_0)$ là <span class="k">nghiệm</span> của $ax+by\\le c$ nếu</p>
<div class="f">$ax_0+by_0\\le c$ đúng</div>
<div class="vd">$x+2y&gt;5$: $(3;4)$ là nghiệm vì $3+8=11&gt;5$; $(0;-1)$ không là nghiệm vì $-2&lt;5$.</div>
<p style="margin-top:5px">👉 BPT bậc nhất hai ẩn luôn có <b>vô số nghiệm</b>.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">🗺️</span>Miền nghiệm là nửa mặt phẳng</h2>
<p>Đường thẳng $d: ax+by=c$ chia mặt phẳng $Oxy$ thành hai nửa:</p>
<ul><li>một nửa (không kể $d$) gồm các điểm có $ax+by&gt;c$;</li><li>nửa còn lại gồm các điểm có $ax+by&lt;c$;</li><li><b>bờ $d$</b>: các điểm có $ax+by=c$.</li></ul>
<div class="fig"><svg viewBox="0 0 200 150" style="width:13em">
<defs><pattern id="g3" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#94A3B8" stroke-width="1.4"/></pattern></defs>
<polygon points="20,10 190,10 190,140" fill="url(#g3)"/><polygon points="10,10 20,10 190,140 10,140" fill="#C7D2FE" opacity=".55"/>
<line x1="10" y1="100" x2="195" y2="100" stroke="#334155"/><line x1="70" y1="145" x2="70" y2="5" stroke="#334155"/>
<line x1="20" y1="10" x2="190" y2="140" stroke="#DC2626" stroke-width="2.4"/>
<circle cx="70" cy="100" r="3.5" fill="#111"/><text x="56" y="114" font-size="12" font-style="italic" font-family="Times New Roman">O</text>
<text x="150" y="132" font-size="14" fill="#DC2626" font-weight="700" font-style="italic" font-family="Times New Roman">d</text>
<text x="22" y="62" font-size="11" fill="#3730A3" font-weight="700" font-family="Be Vietnam Pro">MIỀN NGHIỆM</text>
<text x="132" y="32" font-size="10" fill="#475569" font-family="Be Vietnam Pro">bị gạch bỏ</text></svg></div></div><div class="card"><h2><span class="n">4</span><span class="ic">🪜</span>4 bước vẽ miền nghiệm</h2>
<ol class="steps"><li>Vẽ đường thẳng $d: ax+by=c$.</li>
<li>Lấy điểm $M_0(x_0;y_0)\\notin d$ <span class="nho">(thường lấy gốc $O$ khi $c\\ne0$; khi $c=0$ lấy $(1;0)$ hoặc $(0;1)$)</span>.</li>
<li>Tính $ax_0+by_0$ rồi so sánh với $c$.</li>
<li><mark>$M_0$ thoả BPT → giữ nửa mặt phẳng chứa $M_0$</mark>; không thoả → giữ nửa kia. Gạch bỏ phần không là miền nghiệm.</li></ol>
<div class="f l">✏️ Dấu $\\le,\\ \\ge$: lấy cả bờ $d$ (nét liền)<br>✏️ Dấu $&lt;,\\ &gt;$: bỏ bờ $d$ (vẽ <b>nét đứt</b>)</div></div><div class="card"><h2><span class="n">5</span><span class="ic">🎬</span>Ứng dụng thực tế</h2>
<p>Rạp phim bán vé loại 1 giá 50 nghìn, loại 2 giá 100 nghìn; bán $x$ vé loại 1, $y$ vé loại 2. Rạp bị lỗ khi thu dưới 20 triệu:</p>
<div class="f">$50x+100y&lt;20\\,000 \\iff x+2y&lt;400$</div>
<p class="nho">Đặt ẩn → đổi đơn vị cho gọn → lập BPT → vẽ miền nghiệm để đọc kết quả.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Có $x^2$, $xy$, $\\frac1x$… thì <b>không</b> phải bậc nhất hai ẩn.</li><li>Quên vẽ bờ $d$ bằng <b>nét đứt</b> với dấu $&lt;, &gt;$.</li><li>Chọn điểm thử $M_0$ nằm ngay trên $d$ (VD: lấy $O$ khi $c=0$).</li><li>Gạch nhầm phía: nhớ <b>gạch phần bỏ đi</b>, phần sạch là miền nghiệm.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Thử gốc O”</b>: đúng → giữ phía chứa O; sai → giữ phía bên kia.</li><li><b>Dấu bằng = nét liền</b>, không có dấu bằng = nét đứt.</li><li>Bài thực tế: nhớ thêm $x\\ge0,\\ y\\ge0$ (số lượng không âm).</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Miền nghiệm của ax + by ≤ c là một nửa mặt phẳng bờ d – vẽ d, thử một điểm, gạch phần bỏ.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.22–25</span><span></span></div>
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

// Bai 4
const f4 = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – BÀI 4: Hệ bất phương trình bậc nhất hai ẩn</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#3730A3;--vua:#6366F1;--nhat:#EEF0FF;}
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
  <div class="ch">Chương II · Bất phương trình và hệ bất phương trình bậc nhất hai ẩn</div>
  <div class="row"><div class="so"><small>BÀI</small><b>4</b></div><h1>Hệ bất phương trình<br>bậc nhất hai ẩn</h1></div>
  <div class="muc">🎯 Nhận biết hệ BPT · biểu diễn miền nghiệm · tìm GTLN, GTNN của F = ax + by · bài toán tối ưu thực tế</div></div>
 <div class="main"></div><div class="pool"><div class="card"><h2><span class="n">1</span><span class="ic">📚</span>Hệ BPT bậc nhất hai ẩn</h2>
<p>Gồm <b>hai hay nhiều</b> BPT bậc nhất hai ẩn.</p>
<p>$(x_0;y_0)$ là <span class="k">nghiệm của hệ</span> khi nó <mark>đồng thời là nghiệm của tất cả các BPT</mark> trong hệ.</p>
<div class="vd">$\\begin{cases}x\\ge0\\\\y\\ge0\\\\x+y\\le150\\end{cases}$ có nghiệm $(0;0)$ vì thoả cả ba BPT.</div></div><div class="card"><h2><span class="n">2</span><span class="ic">🧭</span>Biểu diễn miền nghiệm của hệ</h2>
<div class="f">Miền nghiệm của hệ = <b>GIAO</b> các miền nghiệm của từng BPT</div>
<ol class="steps"><li>Trên <b>cùng một</b> mặt phẳng toạ độ, xác định miền nghiệm của từng BPT và <b>gạch bỏ</b> miền còn lại.</li>
<li>Miền <mark>không bị gạch</mark> là miền nghiệm của hệ.</li></ol>
<p class="nho">Trục $Ox$: $y=0$ · trục $Oy$: $x=0$. $x\\ge0$: bên phải $Oy$; $y\\ge0$: phía trên $Ox$.</p></div><div class="card"><h2><span class="n">3</span><span class="ic">🏆</span>GTLN, GTNN của $F(x;y)=ax+by$</h2>
<p>Trên miền nghiệm là <b>đa giác</b>, $F$ đạt GTLN (GTNN) <mark>tại một trong các đỉnh</mark> của đa giác.</p>
<ol class="steps"><li>Vẽ miền nghiệm, tìm toạ độ các đỉnh.</li><li>Tính $F$ tại từng đỉnh.</li><li>So sánh → GTLN, GTNN.</li></ol></div><div class="card"><h2><span class="n">4</span><span class="ic">❄️</span>Ví dụ: nhập máy điều hoà</h2>
<p>$x$ máy hai chiều, $y$ máy một chiều; lợi nhuận $F=3{,}5x+2y$ (triệu đồng).</p>
<div class="f">$\\begin{cases}x\\ge0,\\ y\\ge0\\\\x+y\\le100\\\\2x+y\\le120\\end{cases}$</div>
<div class="fig"><svg viewBox="0 0 220 170" style="width:14.5em">
<line x1="20" y1="150" x2="212" y2="150" stroke="#334155"/><line x1="30" y1="160" x2="30" y2="6" stroke="#334155"/>
<polygon points="30,150 30,30 66,54 138,150" fill="#A5B4FC" opacity=".7" stroke="#3730A3" stroke-width="1.5"/>
<line x1="30" y1="30" x2="210" y2="150" stroke="#DC2626" stroke-width="1.3" opacity=".7"/>
<line x1="30" y1="6" x2="138" y2="150" stroke="#DC2626" stroke-width="1.3" opacity=".7"/>
<g fill="#111"><circle cx="30" cy="150" r="3"/><circle cx="30" cy="30" r="3"/><circle cx="66" cy="54" r="3"/><circle cx="138" cy="150" r="3"/></g>
<g font-size="11" font-family="Be Vietnam Pro" font-weight="700" fill="#3730A3">
<text x="16" y="164">O</text><text x="34" y="26">A(0;100)</text><text x="72" y="50">B(20;80)</text><text x="128" y="166">C(60;0)</text></g>
<text x="60" y="115" font-size="11" font-family="Be Vietnam Pro" fill="#1E1B4B">miền nghiệm</text></svg></div>
<table class="t"><tr><th>Đỉnh</th><th>O</th><th>A(0;100)</th><th>B(20;80)</th><th>C(60;0)</th></tr>
<tr><td>$F$</td><td>0</td><td>200</td><td class="do">230</td><td>210</td></tr></table>
<p>⇒ Lãi lớn nhất <b>230 triệu</b> khi nhập 20 máy hai chiều, 80 máy một chiều.</p></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Tính $F$ tại điểm bất kì trong miền thay vì tại các <b>đỉnh</b>.</li><li>Tìm sai toạ độ đỉnh: phải giải hệ hai phương trình đường thẳng cắt nhau.</li><li>Quên điều kiện $x\\ge0,\\ y\\ge0$ trong bài toán thực tế.</li><li>Vẽ mỗi BPT trên một hình riêng → không thấy phần giao.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Gạch phần BỎ – giữ phần SẠCH”</b>: miền sạch cuối cùng là đáp án.</li><li>Bài tối ưu 4 bước: <b>Đặt ẩn → Lập hệ → Vẽ miền → Thử đỉnh</b>.</li><li>Đỉnh nằm trên trục: cho $x=0$ hoặc $y=0$ là tìm ra ngay.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Miền nghiệm của hệ là phần giao; giá trị lớn nhất, nhỏ nhất của F = ax + by nằm ở các đỉnh.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.26–30</span><span></span></div>
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

// Bai 4z On Tap II
const f4z = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Toán 10 – ÔN TẬP II: Ôn tập chương II BPT &amp; hệ BPT bậc nhất hai ẩn</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<style>:root{--dam:#3730A3;--vua:#6366F1;--nhat:#EEF0FF;}
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
  <div class="ch">Chương II · Bất phương trình và hệ bất phương trình bậc nhất hai ẩn</div>
  <div class="row"><div class="so ot"><small>ÔN TẬP</small><b>II</b></div><h1>Ôn tập chương II<br>BPT &amp; hệ BPT bậc nhất hai ẩn</h1></div>
  <div class="muc">🎯 Bài 3 · Bài 4 · Bài tập cuối chương II — miền nghiệm và bài toán tối ưu</div></div>
 <div class="main"></div><div class="pool"><div class="card span"><h2><span class="n">1</span><span class="ic">🗺️</span>Sơ đồ chương</h2><div class="sodo"><div class="goc">BPT &amp; HỆ BPT<br>BẬC NHẤT<br>HAI ẨN</div><div class="ds" style="grid-template-columns:repeat(1,1fr)"><div class="ls"><b>Bài 3 · BPT bậc nhất hai ẩn</b><div class="kw">$ax+by\\le c$ · nghiệm $(x_0;y_0)$ · miền nghiệm = nửa mặt phẳng</div></div><div class="ls"><b>Bài 4 · Hệ BPT bậc nhất hai ẩn</b><div class="kw">Miền nghiệm = giao · đa giác · GTLN, GTNN của $F=ax+by$ tại đỉnh</div></div></div></div></div><div class="card"><h2><span class="n">2</span><span class="ic">🗺️</span>Vẽ miền nghiệm</h2>
<ol class="steps"><li>Vẽ đường thẳng $ax+by=c$ (nét đứt nếu dấu $&lt;,&gt;$).</li><li>Thử điểm $M_0\\notin d$ (thường là $O$).</li>
<li>Giữ nửa mặt phẳng chứa $M_0$ nếu $M_0$ thoả; gạch bỏ phần còn lại.</li><li>Hệ: làm cho từng BPT trên <b>cùng</b> một hình → phần sạch là miền nghiệm.</li></ol></div><div class="card"><h2><span class="n">3</span><span class="ic">🏆</span>Bài toán tối ưu</h2>
<div class="f">$F=ax+by$ đạt GTLN, GTNN <b>tại đỉnh</b> của đa giác miền nghiệm</div>
<ol class="steps"><li>Đặt ẩn $x,y$ (kèm $x,y\\ge0$).</li><li>Lập hệ BPT từ ràng buộc.</li><li>Vẽ miền nghiệm, tìm toạ độ các đỉnh.</li><li>Tính $F$ tại các đỉnh, so sánh, trả lời.</li></ol></div><div class="card span"><h2><span class="n">4</span><span class="ic">📝</span>Các dạng toán thường gặp</h2><table class="t dang"><tr><th style="width:34%">Dạng toán</th><th>Cách làm</th></tr><tr><td>Nhận dạng BPT/hệ BPT bậc nhất hai ẩn</td><td>Chỉ có $x, y$ bậc nhất; $a, b$ không đồng thời bằng 0.</td></tr><tr><td>Kiểm tra cặp số là nghiệm</td><td>Thay vào <b>tất cả</b> các BPT; một BPT sai → không là nghiệm của hệ.</td></tr><tr><td>Xác định miền nghiệm (từ hình)</td><td>Lấy một điểm trong miền, thay vào để chọn chiều dấu; bờ liền → có dấu bằng.</td></tr><tr><td>Biểu diễn miền nghiệm</td><td>Vẽ các đường thẳng, thử điểm, gạch phần bỏ.</td></tr><tr><td>GTLN, GTNN của F</td><td>Tìm đỉnh (giải hệ hai đường thẳng), thay vào F.</td></tr><tr><td>Bài toán thực tế (lợi nhuận, chi phí)</td><td>Đặt ẩn → lập hệ → vẽ miền → thử đỉnh → kết luận theo đơn vị đề bài.</td></tr></table></div><div class="card span"><h2><span class="n">5</span><span class="ic">✅</span>Tự kiểm tra – em đã làm được chưa?</h2><ul class="ck"><li>Kiểm tra $(1;2)$ có là nghiệm của $2x-y+3&gt;0$ không.</li><li>Vẽ miền nghiệm của $x+2y\\le4$ và nói rõ bờ vẽ nét gì.</li><li>Vẽ miền nghiệm hệ $\\{x\\ge0;\\ y\\ge0;\\ x+y\\le5\\}$ và tìm các đỉnh.</li><li>Tìm GTLN của $F=2x+3y$ trên miền vừa vẽ.</li><li>Giải trọn một bài toán lợi nhuận sản xuất hai loại sản phẩm.</li></ul></div></div>
 <div class="foot">
  <div class="duo"><div class="bay"><h3>⚠️ Bẫy hay gặp</h3><ul><li>Thử điểm nằm ngay trên đường thẳng (VD lấy O khi c = 0).</li><li>Quên điều kiện không âm của số lượng thực tế.</li><li>Tính F tại điểm bất kì thay vì tại các đỉnh.</li></ul></div>
  <div class="meo"><h3>💡 Mẹo nhớ nhanh</h3><ul><li><b>“Thử gốc O – gạch phần BỎ – giữ phần SẠCH”</b>.</li><li>Tối ưu 4 bước: <b>Đặt ẩn → Lập hệ → Vẽ miền → Thử đỉnh</b>.</li><li><b>Dấu bằng = nét liền</b>; không dấu bằng = nét đứt.</li></ul></div></div>
  <div class="chot"><span class="i">⭐</span><span>Miền nghiệm BPT là nửa mặt phẳng, của hệ là phần giao; tối ưu F = ax + by thì xét các đỉnh.</span></div>
  <div class="ky"><span>Nguồn: SGK Toán 10 (KNTT), tập một, tr.22–32</span><span></span></div>
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

fs.writeFileSync(path.join(dir, 'Bai01_Menh-de.html'), f1);
fs.writeFileSync(path.join(dir, 'Bai02_Tap-hop-va-cac-phep-toan.html'), f2);
fs.writeFileSync(path.join(dir, 'Bai02z_OnTap_ChuongI_Menh-de-tap-hop.html'), f2z);
fs.writeFileSync(path.join(dir, 'Bai03_BPT-bac-nhat-hai-an.html'), f3);
fs.writeFileSync(path.join(dir, 'Bai04_He-BPT-bac-nhat-hai-an.html'), f4);
fs.writeFileSync(path.join(dir, 'Bai04z_OnTap_ChuongII_BPT-he-BPT-bac-nhat-hai-an.html'), f4z);

console.log('Wrote batch 1 (6 files: Bai 1, 2, 2z, 3, 4, 4z)');
