import { LearningItem } from '../../types';

export const htmlTriangleLawsGame = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Tam Giác Vàng: Thử Thách Hệ Thức Lượng</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0f172a; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
    .gold-glow { text-shadow: 0 0 15px rgba(251, 191, 36, 0.6); }
    .canvas-box { background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%); }
  </style>
</head>
<body class="min-h-screen flex flex-col p-3 md:p-6 select-none">
  <header class="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-slate-700">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg">Δ</div>
      <div>
        <h1 class="font-extrabold text-amber-400 text-lg md:text-xl">TAM GIÁC VÀNG: HỆ THỨC LƯỢNG</h1>
        <p class="text-xs text-slate-400">Định lý Cosin - Định lý Sin - Công thức Heron</p>
      </div>
    </div>
    <div class="flex items-center gap-4 text-right">
      <div>
        <div class="text-xs text-slate-400">Điểm số</div>
        <div id="score" class="text-xl font-bold text-amber-400">0</div>
      </div>
      <div>
        <div class="text-xs text-slate-400">Vòng đấu</div>
        <div id="round-display" class="text-sm font-semibold text-sky-400">1 / 5</div>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center py-4">
    <div id="game-card" class="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-5 md:p-8 shadow-2xl flex flex-col items-center">
      <!-- Triangle Canvas Visualization -->
      <div class="canvas-box w-full max-w-lg h-56 rounded-xl border border-slate-700 relative overflow-hidden flex items-center justify-center mb-5">
        <canvas id="triCanvas" width="480" height="220" class="max-w-full"></canvas>
      </div>

      <!-- Question Text -->
      <div class="w-full text-center mb-6">
        <div id="formula-badge" class="inline-block px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold mb-2">
          Định lý Cosin: a² = b² + c² - 2bc.cos(A)
        </div>
        <h2 id="question-text" class="text-base md:text-lg font-bold text-white mt-1">
          Cho tam giác ABC có b = 6, c = 8, góc A = 60°. Tính độ dài cạnh a?
        </h2>
      </div>

      <!-- Options Grid -->
      <div id="options-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        <!-- populated dynamically -->
      </div>

      <!-- Feedback Banner -->
      <div id="feedback" class="mt-4 text-sm font-semibold text-center min-h-6"></div>

      <!-- Action Button -->
      <div class="mt-4 flex gap-3">
        <button id="next-btn" class="hidden px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-all shadow-lg cursor-pointer">
          Câu tiếp theo →
        </button>
      </div>
    </div>
  </main>

  <script>
    const questions = [
      {
        formula: "Định lý Cosin: a² = b² + c² - 2bc.cos(A)",
        question: "Cho tam giác ABC có b = 6, c = 8 và góc A = 60°. Tính độ dài cạnh a?",
        options: ["a = 2√13", "a = 2√19", "a = 10", "a = 2√7"],
        correct: 0,
        explanation: "a² = 6² + 8² - 2.6.8.cos(60°) = 36 + 64 - 48 = 52 => a = √52 = 2√13."
      },
      {
        formula: "Định lý Sin: a/sin(A) = 2R",
        question: "Tam giác ABC có a = 10 và góc A = 30°. Bán kính đường tròn ngoại tiếp R bằng bao nhiêu?",
        options: ["R = 5", "R = 10", "R = 20", "R = 10√3"],
        correct: 1,
        explanation: "R = a / (2.sin(A)) = 10 / (2.sin(30°)) = 10 / (2.0.5) = 10."
      },
      {
        formula: "Công thức Diện tích: S = (1/2).a.b.sin(C)",
        question: "Tam giác ABC có a = 5, b = 8 và góc C = 150°. Diện tích S của tam giác là:",
        options: ["S = 20", "S = 10", "S = 10√3", "S = 20√3"],
        correct: 1,
        explanation: "S = 1/2 . 5 . 8 . sin(150°) = 20 . (1/2) = 10."
      },
      {
        formula: "Định lý Cosin góc: cos(A) = (b² + c² - a²) / (2bc)",
        question: "Tam giác ABC có ba cạnh a = 7, b = 5, c = 3. Góc A là góc tù hay nhọn và bằng bao nhiêu?",
        options: ["A = 60°", "A = 120°", "A = 90°", "A = 135°"],
        correct: 1,
        explanation: "cos(A) = (25 + 9 - 49)/(2.5.3) = -15/30 = -1/2 => A = 120° (góc tù)."
      },
      {
        formula: "Công thức Heron: S = √[p(p-a)(p-b)(p-c)]",
        question: "Tam giác ABC có các cạnh a = 13, b = 14, c = 15. Nửa chu vi p = 21. Diện tích S là:",
        options: ["S = 84", "S = 42", "S = 96", "S = 78"],
        correct: 0,
        explanation: "S = √[21.(21-13).(21-14).(21-15)] = √[21.8.7.6] = √7056 = 84."
      }
    ];

    let currentIdx = 0;
    let score = 0;
    let answered = false;

    const triCanvas = document.getElementById('triCanvas');
    const ctx = triCanvas.getContext('2d');

    function drawTriangle() {
      ctx.clearRect(0, 0, triCanvas.width, triCanvas.height);
      const w = triCanvas.width;
      const h = triCanvas.height;

      // Triangle points
      const pA = { x: w * 0.5, y: h * 0.2 };
      const pB = { x: w * 0.2, y: h * 0.8 };
      const pC = { x: w * 0.8, y: h * 0.8 };

      // Glow fill
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.lineTo(pC.x, pC.y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(251, 191, 36, 0.12)';
      ctx.fill();

      // Outline
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Vertex dots and labels
      const vertices = [
        { pt: pA, name: 'A', ox: 0, oy: -12, color: '#38bdf8' },
        { pt: pB, name: 'B', ox: -16, oy: 16, color: '#f43f5e' },
        { pt: pC, name: 'C', ox: 16, oy: 16, color: '#10b981' }
      ];

      vertices.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.pt.x, v.pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = v.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 16px system-ui';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(v.name, v.pt.x + v.ox, v.pt.y + v.oy);
      });

      // Side labels
      ctx.font = 'italic 14px system-ui';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('c', (pA.x + pB.x)/2 - 14, (pA.y + pB.y)/2);
      ctx.fillText('b', (pA.x + pC.x)/2 + 10, (pA.y + pC.y)/2);
      ctx.fillText('a', (pB.x + pC.x)/2, pB.y + 18);
    }

    function renderQuestion() {
      answered = false;
      drawTriangle();
      const q = questions[currentIdx];
      document.getElementById('formula-badge').innerText = q.formula;
      document.getElementById('question-text').innerText = q.question;
      document.getElementById('round-display').innerText = (currentIdx + 1) + ' / ' + questions.length;
      document.getElementById('feedback').innerText = '';
      document.getElementById('feedback').className = 'mt-4 text-sm font-semibold text-center min-h-6';
      document.getElementById('next-btn').classList.add('hidden');

      const grid = document.getElementById('options-grid');
      grid.innerHTML = '';
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'p-3 rounded-xl bg-slate-700/80 hover:bg-slate-600 border border-slate-600 text-left text-sm font-medium text-slate-100 transition-all flex items-center justify-between cursor-pointer';
        btn.innerHTML = '<span>' + ['A', 'B', 'C', 'D'][idx] + '. ' + opt + '</span>';
        btn.onclick = () => selectOption(idx, btn);
        grid.appendChild(btn);
      });
    }

    function selectOption(idx, btnEl) {
      if (answered) return;
      answered = true;
      const q = questions[currentIdx];
      const buttons = document.getElementById('options-grid').querySelectorAll('button');

      if (idx === q.correct) {
        score += 20;
        document.getElementById('score').innerText = score;
        btnEl.classList.remove('bg-slate-700/80', 'border-slate-600');
        btnEl.classList.add('bg-emerald-600', 'border-emerald-400', 'text-white');
        document.getElementById('feedback').innerText = '🎉 Chính xác! ' + q.explanation;
        document.getElementById('feedback').className = 'mt-4 text-sm font-bold text-emerald-400 text-center min-h-6';
      } else {
        btnEl.classList.remove('bg-slate-700/80', 'border-slate-600');
        btnEl.classList.add('bg-rose-600', 'border-rose-400', 'text-white');
        buttons[q.correct].classList.add('bg-emerald-600/80', 'border-emerald-400');
        document.getElementById('feedback').innerText = '⚠️ Chưa đúng! ' + q.explanation;
        document.getElementById('feedback').className = 'mt-4 text-sm font-semibold text-rose-400 text-center min-h-6';
      }

      document.getElementById('next-btn').classList.remove('hidden');
      if (currentIdx === questions.length - 1) {
        document.getElementById('next-btn').innerText = '🏆 Xem Kết Quả Chung Cuộc';
      }
    }

    document.getElementById('next-btn').onclick = () => {
      if (currentIdx < questions.length - 1) {
        currentIdx++;
        renderQuestion();
      } else {
        showEndScreen();
      }
    };

    function showEndScreen() {
      const card = document.getElementById('game-card');
      card.innerHTML = \`
        <div class="text-center py-6">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-3xl mb-4">🏆</div>
          <h2 class="text-2xl font-black text-amber-400">CHÚC MỪNG HOÀN THÀNH!</h2>
          <p class="text-slate-300 mt-2">Tổng điểm đạt được: <span class="font-bold text-amber-300 text-xl">\${score} / 100</span></p>
          <p class="text-xs text-slate-400 mt-1">Bạn đã nắm vững các hệ thức lượng quan trọng trong tam giác.</p>
          <button onclick="location.reload()" class="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-all cursor-pointer">
            Chơi lại từ đầu
          </button>
        </div>
      \`;
    }

    renderQuestion();
  </script>
</body>
</html>`;

export const htmlQuadraticIneqGame = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Đấu Trí Tam Thức & BPT Bậc Hai</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #090d16; color: #f1f5f9; font-family: system-ui, sans-serif; }
    .neon-purple { box-shadow: 0 0 20px rgba(168, 85, 247, 0.25); }
  </style>
</head>
<body class="min-h-screen flex flex-col p-4 md:p-6 select-none">
  <header class="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-purple-900/40">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-lg">f(x)</div>
      <div>
        <h1 class="font-extrabold text-purple-400 text-lg md:text-xl">ĐẤU TRÍ TAM THỨC BẬC HAI</h1>
        <p class="text-xs text-slate-400">Quy tắc "Trong trái ngoài cùng" & Giải BPT ax² + bx + c > 0</p>
      </div>
    </div>
    <div class="text-right">
      <div class="text-xs text-slate-400">Điểm số</div>
      <div id="q-score" class="text-xl font-bold text-purple-400">0</div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center py-4">
    <div class="w-full bg-slate-900/90 border border-purple-900/50 rounded-2xl p-6 md:p-8 neon-purple flex flex-col items-center">
      <div class="text-xs font-semibold px-3 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 rounded-full mb-3" id="q-step">
        Thử thách 1 / 4
      </div>

      <div class="text-center mb-6">
        <h2 id="q-title" class="text-xl md:text-2xl font-black text-white mb-2">
          Xét dấu tam thức f(x) = x² - 5x + 6
        </h2>
        <p id="q-desc" class="text-sm text-slate-400">
          Có hai nghiệm phân biệt x₁ = 2, x₂ = 3 và hệ số a = 1 > 0.
        </p>
      </div>

      <!-- Visual Parabola or Number Line -->
      <div class="w-full max-w-md bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 flex items-center justify-center text-center">
        <div class="text-xs sm:text-sm text-slate-300 space-y-1 font-mono">
          <div>Trục số: (-∞) --------- [2] ++++++ [3] --------- (+∞)</div>
          <div class="text-amber-400">f(x) mang dấu gì trên khoảng (2; 3)?</div>
        </div>
      </div>

      <!-- Interactive choice buttons -->
      <div id="q-choices" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md"></div>

      <div id="q-alert" class="mt-4 text-sm font-semibold text-center min-h-6"></div>

      <button id="q-next" class="hidden mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all cursor-pointer">
        Tiếp tục →
      </button>
    </div>
  </main>

  <script>
    const levels = [
      {
        title: "Xét dấu f(x) = x² - 5x + 6",
        desc: "Hai nghiệm x₁ = 2, x₂ = 3; hệ số a = 1 > 0. Dấu của f(x) trên khoảng (2; 3) là:",
        choices: ["f(x) > 0 (Dương)", "f(x) < 0 (Âm)", "f(x) = 0", "Không xác định"],
        correct: 1,
        msg: "Chính xác! Theo định lý dấu tam thức, 'trong khoảng hai nghiệm TRÁI dấu với a' (a > 0 nên f(x) < 0)."
      },
      {
        title: "Giải BPT: x² - 4x + 3 ≤ 0",
        desc: "Tam thức có nghiệm x = 1, x = 3; a = 1 > 0.",
        choices: ["S = [1; 3]", "S = (-∞; 1] ∪ [3; +∞)", "S = (1; 3)", "S = ∅"],
        correct: 0,
        msg: "Đúng! f(x) ≤ 0 xảy ra trong đoạn hai nghiệm: S = [1; 3]."
      },
      {
        title: "Giải BPT: -x² + 2x - 5 > 0",
        desc: "Tính biệt thức Δ' = 1² - (-1)(-5) = 1 - 5 = -4 < 0; hệ số a = -1 < 0.",
        choices: ["S = R", "S = ∅ (Vô nghiệm)", "S = (-2; 5)", "S = {1}"],
        correct: 1,
        msg: "Chính xác! Khi Δ < 0, tam thức luôn cùng dấu với a (-1 < 0) với mọi x. Do đó f(x) < 0 với mọi x, nên f(x) > 0 vô nghiệm (S = ∅)."
      },
      {
        title: "Bất phương trình: (x - 1)² > 0",
        desc: "Tam thức có nghiệm kép x = 1; hệ số a = 1 > 0.",
        choices: ["S = R", "S = R \\ {1}", "S = (1; +∞)", "S = [1; +∞)"],
        correct: 1,
        msg: "Chuẩn xác! f(x) > 0 với mọi x ≠ 1; tại x = 1 thì f(1) = 0."
      }
    ];

    let cur = 0;
    let score = 0;

    function renderLevel() {
      const item = levels[cur];
      document.getElementById('q-step').innerText = 'Thử thách ' + (cur + 1) + ' / ' + levels.length;
      document.getElementById('q-title').innerText = item.title;
      document.getElementById('q-desc').innerText = item.desc;
      document.getElementById('q-alert').innerText = '';
      document.getElementById('q-next').classList.add('hidden');

      const box = document.getElementById('q-choices');
      box.innerHTML = '';
      item.choices.forEach((c, idx) => {
        const btn = document.createElement('button');
        btn.className = 'p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-white transition-all text-left';
        btn.innerText = ['A', 'B', 'C', 'D'][idx] + '. ' + c;
        btn.onclick = () => {
          if (idx === item.correct) {
            score += 25;
            document.getElementById('q-score').innerText = score;
            btn.className = 'p-3 rounded-xl bg-purple-600 border border-purple-400 text-sm font-bold text-white';
            document.getElementById('q-alert').innerText = '🎉 ' + item.msg;
            document.getElementById('q-alert').className = 'mt-4 text-sm font-bold text-purple-400 text-center min-h-6';
          } else {
            btn.className = 'p-3 rounded-xl bg-rose-600 border border-rose-400 text-sm font-bold text-white';
            document.getElementById('q-alert').innerText = '⚠️ Chưa đúng! ' + item.msg;
            document.getElementById('q-alert').className = 'mt-4 text-sm font-bold text-rose-400 text-center min-h-6';
          }
          document.getElementById('q-next').classList.remove('hidden');
        };
        box.appendChild(btn);
      });
    }

    document.getElementById('q-next').onclick = () => {
      if (cur < levels.length - 1) {
        cur++;
        renderLevel();
      } else {
        document.querySelector('main').innerHTML = \`
          <div class="text-center p-8 bg-slate-900 rounded-2xl border border-purple-800 max-w-md w-full">
            <div class="text-4xl mb-3">🎓</div>
            <h2 class="text-2xl font-black text-purple-400">HOÀN THÀNH XUẤT SẮC!</h2>
            <p class="text-slate-300 mt-2">Tổng điểm: <span class="text-purple-300 font-bold">\${score}/100</span></p>
            <button onclick="location.reload()" class="mt-6 px-6 py-2 rounded-xl bg-purple-600 text-white font-bold text-sm">Chơi lại</button>
          </div>
        \`;
      }
    };

    renderLevel();
  </script>
</body>
</html>`;

export const htmlStatsGame = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Thám Tử Thống Kê & Xác Suất Lớp 10</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { background-color: #0c1a24; color: #f8fafc; font-family: system-ui, sans-serif; }</style>
</head>
<body class="min-h-screen flex flex-col p-4 md:p-6 select-none">
  <header class="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-cyan-800">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-lg">📊</div>
      <div>
        <h1 class="font-extrabold text-cyan-400 text-lg md:text-xl">THÁM TỬ THỐNG KÊ & XÁC SUẤT</h1>
        <p class="text-xs text-slate-400">Số trung bình, Trung vị (Me), Tứ phân vị (Q1, Q2, Q3), Mốt và Xác suất</p>
      </div>
    </div>
    <div class="text-right">
      <div class="text-xs text-slate-400">Điểm số</div>
      <div id="stat-score" class="text-xl font-bold text-cyan-400">0</div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center py-4">
    <div class="w-full bg-slate-900/90 border border-cyan-800 rounded-2xl p-6 md:p-8 flex flex-col items-center">
      <div class="text-xs font-semibold px-3 py-1 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 rounded-full mb-3" id="stat-round">
        Nhiệm vụ 1 / 4
      </div>

      <!-- Sample dataset box -->
      <div class="w-full max-w-lg bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5 text-center">
        <div class="text-xs text-slate-400 mb-1">Mẫu số liệu điểm kiểm tra môn Toán của 7 học sinh:</div>
        <div id="stat-data" class="text-lg md:text-xl font-bold text-amber-400 font-mono tracking-wider">
          6, 7, 7, 8, 8, 9, 10
        </div>
      </div>

      <div class="text-center mb-6 max-w-lg">
        <h2 id="stat-question" class="text-base md:text-lg font-bold text-white">
          Tìm số trung vị (Me) của mẫu số liệu trên?
        </h2>
      </div>

      <div id="stat-options" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"></div>

      <div id="stat-fb" class="mt-4 text-sm font-semibold text-center min-h-6"></div>

      <button id="stat-btn-next" class="hidden mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all cursor-pointer">
        Tiếp theo →
      </button>
    </div>
  </main>

  <script>
    const statChallenges = [
      {
        dataset: "6, 7, 7, 8, 8, 9, 10 (n = 7 đã sắp xếp)",
        q: "Giá trị Trung vị (Me) của mẫu số liệu trên là:",
        opts: ["Me = 7", "Me = 8", "Me = 7.5", "Me = 8.5"],
        correct: 1,
        explain: "Vì cỡ mẫu n = 7 lẻ, trung vị Me là giá trị đứng chính giữa ở vị trí thứ (7+1)/2 = 4, tức là Me = 8."
      },
      {
        dataset: "2, 3, 4, 6, 8, 10, 12, 15 (n = 8)",
        q: "Tứ phân vị thứ hai Q₂ (chính là trung vị Me) của mẫu số liệu là:",
        opts: ["Q₂ = 6", "Q₂ = 7", "Q₂ = 8", "Q₂ = 6.5"],
        correct: 1,
        explain: "n = 8 chẵn, Q₂ là trung bình cộng của giá trị thứ 4 và thứ 5: Q₂ = (6 + 8)/2 = 7."
      },
      {
        dataset: "12, 14, 15, 15, 15, 16, 17, 18, 19",
        q: "Mốt (Mo) của mẫu số liệu này là:",
        opts: ["Mo = 15", "Mo = 16", "Mo = 14", "Mo = 19"],
        correct: 0,
        explain: "Mốt Mo là giá trị có tần số xuất hiện nhiều nhất (số 15 xuất hiện 3 lần)."
      },
      {
        dataset: "Gieo một con xúc xắc cân đối đồng chất 6 mặt",
        q: "Xác suất để xuất hiện mặt có số chấm là số nguyên tố là:",
        opts: ["1/2", "1/3", "2/3", "1/6"],
        correct: 0,
        explain: "Các số nguyên tố từ 1 đến 6 là {2, 3, 5} gồm 3 kết quả thuận lợi. P = 3/6 = 1/2."
      }
    ];

    let sIndex = 0;
    let sScore = 0;

    function renderStat() {
      const c = statChallenges[sIndex];
      document.getElementById('stat-round').innerText = 'Nhiệm vụ ' + (sIndex + 1) + ' / ' + statChallenges.length;
      document.getElementById('stat-data').innerText = c.dataset;
      document.getElementById('stat-question').innerText = c.q;
      document.getElementById('stat-fb').innerText = '';
      document.getElementById('stat-btn-next').classList.add('hidden');

      const optsBox = document.getElementById('stat-options');
      optsBox.innerHTML = '';
      c.opts.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-white transition-all text-left';
        b.innerText = ['A', 'B', 'C', 'D'][idx] + '. ' + opt;
        b.onclick = () => {
          if (idx === c.correct) {
            sScore += 25;
            document.getElementById('stat-score').innerText = sScore;
            b.className = 'p-3 rounded-xl bg-cyan-600 border border-cyan-400 text-sm font-bold text-white';
            document.getElementById('stat-fb').innerText = '🎉 ' + c.explain;
            document.getElementById('stat-fb').className = 'mt-4 text-sm font-bold text-cyan-400 text-center min-h-6';
          } else {
            b.className = 'p-3 rounded-xl bg-rose-600 border border-rose-400 text-sm font-bold text-white';
            document.getElementById('stat-fb').innerText = '⚠️ ' + c.explain;
            document.getElementById('stat-fb').className = 'mt-4 text-sm font-bold text-rose-400 text-center min-h-6';
          }
          document.getElementById('stat-btn-next').classList.remove('hidden');
        };
        optsBox.appendChild(b);
      });
    }

    document.getElementById('stat-btn-next').onclick = () => {
      if (sIndex < statChallenges.length - 1) {
        sIndex++;
        renderStat();
      } else {
        document.querySelector('main').innerHTML = \`
          <div class="text-center p-8 bg-slate-900 rounded-2xl border border-cyan-800 max-w-md w-full">
            <div class="text-4xl mb-3">📈</div>
            <h2 class="text-2xl font-black text-cyan-400">XUẤT SẮC!</h2>
            <p class="text-slate-300 mt-2">Tổng điểm đạt được: <span class="text-cyan-300 font-bold">\${sScore}/100</span></p>
            <button onclick="location.reload()" class="mt-6 px-6 py-2 rounded-xl bg-cyan-500 text-slate-900 font-bold text-sm">Chơi lại</button>
          </div>
        \`;
      }
    };

    renderStat();
  </script>
</body>
</html>`;

export const htmlLineCircleGame = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Chinh Phục Tọa Độ: Đường Thẳng & Đường Tròn Oxy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { background-color: #0d1322; color: #f8fafc; font-family: system-ui, sans-serif; }</style>
</head>
<body class="min-h-screen flex flex-col p-4 md:p-6 select-none">
  <header class="max-w-4xl mx-auto w-full flex items-center justify-between pb-4 border-b border-indigo-900">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-lg">Oxy</div>
      <div>
        <h1 class="font-extrabold text-indigo-400 text-lg md:text-xl">ĐƯỜNG THẲNG & ĐƯỜNG TRÒN OXY</h1>
        <p class="text-xs text-slate-400">Phương trình tổng quát, Khoảng cách và Đường tròn trong mặt phẳng</p>
      </div>
    </div>
    <div class="text-right">
      <div class="text-xs text-slate-400">Điểm số</div>
      <div id="oxy-score" class="text-xl font-bold text-indigo-400">0</div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center py-4">
    <div class="w-full bg-slate-900/90 border border-indigo-900 rounded-2xl p-6 md:p-8 flex flex-col items-center">
      <div class="text-xs font-semibold px-3 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-full mb-3" id="oxy-round">
        Cột mốc 1 / 4
      </div>

      <div class="text-center mb-6 max-w-lg">
        <h2 id="oxy-title" class="text-lg md:text-xl font-bold text-white mb-2">
          Phương trình đường tròn (C): (x - 2)² + (y + 3)² = 25
        </h2>
        <p id="oxy-sub" class="text-sm text-slate-400">
          Hãy xác định tọa độ tâm I và bán kính R của đường tròn (C).
        </p>
      </div>

      <div id="oxy-choices" class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg"></div>

      <div id="oxy-msg" class="mt-4 text-sm font-semibold text-center min-h-6"></div>

      <button id="oxy-next" class="hidden mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all cursor-pointer">
        Tiếp theo →
      </button>
    </div>
  </main>

  <script>
    const oxyLevels = [
      {
        title: "Đường tròn (C): (x - 2)² + (y + 3)² = 25",
        sub: "Xác định tọa độ tâm I và bán kính R của đường tròn:",
        opts: ["I(2; -3), R = 5", "I(-2; 3), R = 5", "I(2; -3), R = 25", "I(-2; 3), R = 25"],
        correct: 0,
        hint: "Phương trình chuẩn (x - a)² + (y - b)² = R² có tâm I(a; b) và R = √25 = 5. Vậy a = 2, b = -3 => I(2; -3), R = 5."
      },
      {
        title: "Đường thẳng d đi qua M(1; 2) có VTPT n = (3; -4)",
        sub: "Phương trình tổng quát của đường thẳng d là:",
        opts: ["3x - 4y + 5 = 0", "3x - 4y - 5 = 0", "4x + 3y - 10 = 0", "3x + 4y - 11 = 0"],
        correct: 0,
        hint: "Phương trình: 3(x - 1) - 4(y - 2) = 0 <=> 3x - 4y - 3 + 8 = 0 <=> 3x - 4y + 5 = 0."
      },
      {
        title: "Khoảng cách từ điểm M(1; 1) đến đường thẳng Δ: 3x + 4y + 3 = 0",
        sub: "Công thức d(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²):",
        opts: ["d = 2", "d = 10", "d = 1", "d = 2.5"],
        correct: 0,
        hint: "d(M, Δ) = |3.1 + 4.1 + 3| / √(3² + 4²) = |10| / 5 = 2."
      },
      {
        title: "Vị trí tương đối của hai đường thẳng: d₁: 2x - y + 1 = 0 và d₂: 4x - 2y + 2 = 0",
        sub: "Hai đường thẳng này có quan hệ gì với nhau?",
        opts: ["Cắt nhau", "Song song", "Trùng nhau", "Vuông góc"],
        correct: 2,
        hint: "Tỉ số: 2/4 = (-1)/(-2) = 1/2. Cả ba hệ số đều tỉ lệ nên hai đường thẳng d₁ và d₂ TRÙNG NHAU."
      }
    ];

    let oIdx = 0;
    let oScore = 0;

    function renderOxy() {
      const item = oxyLevels[oIdx];
      document.getElementById('oxy-round').innerText = 'Cột mốc ' + (oIdx + 1) + ' / ' + oxyLevels.length;
      document.getElementById('oxy-title').innerText = item.title;
      document.getElementById('oxy-sub').innerText = item.sub;
      document.getElementById('oxy-msg').innerText = '';
      document.getElementById('oxy-next').classList.add('hidden');

      const box = document.getElementById('oxy-choices');
      box.innerHTML = '';
      item.opts.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = 'p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold text-white transition-all text-left';
        btn.innerText = ['A', 'B', 'C', 'D'][i] + '. ' + o;
        btn.onclick = () => {
          if (i === item.correct) {
            oScore += 25;
            document.getElementById('oxy-score').innerText = oScore;
            btn.className = 'p-3 rounded-xl bg-indigo-600 border border-indigo-400 text-sm font-bold text-white';
            document.getElementById('oxy-msg').innerText = '🎉 ' + item.hint;
            document.getElementById('oxy-msg').className = 'mt-4 text-sm font-bold text-indigo-400 text-center min-h-6';
          } else {
            btn.className = 'p-3 rounded-xl bg-rose-600 border border-rose-400 text-sm font-bold text-white';
            document.getElementById('oxy-msg').innerText = '⚠️ ' + item.hint;
            document.getElementById('oxy-msg').className = 'mt-4 text-sm font-bold text-rose-400 text-center min-h-6';
          }
          document.getElementById('oxy-next').classList.remove('hidden');
        };
        box.appendChild(btn);
      });
    }

    document.getElementById('oxy-next').onclick = () => {
      if (oIdx < oxyLevels.length - 1) {
        oIdx++;
        renderOxy();
      } else {
        document.querySelector('main').innerHTML = \`
          <div class="text-center p-8 bg-slate-900 rounded-2xl border border-indigo-800 max-w-md w-full">
            <div class="text-4xl mb-3">📐</div>
            <h2 class="text-2xl font-black text-indigo-400">CHINH PHỤC THÀNH CÔNG!</h2>
            <p class="text-slate-300 mt-2">Tổng điểm: <span class="text-indigo-300 font-bold">\${oScore}/100</span></p>
            <button onclick="location.reload()" class="mt-6 px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm">Chơi lại</button>
          </div>
        \`;
      }
    };

    renderOxy();
  </script>
</body>
</html>`;

export const gamesAdditional: LearningItem[] = [
  {
    id: 'game-triangle-laws',
    type: 'game',
    title: 'Tam Giác Vàng: Thử Thách Hệ Thức Lượng',
    topic: 'Chương 4: Hệ thức lượng trong tam giác',
    description: 'Chinh phục định lý Cosin, định lý Sin và công thức diện tích Heron qua mô phỏng tam giác trực quan với câu hỏi tính toán hấp dẫn.',
    htmlContent: htmlTriangleLawsGame,
    displayOrder: 4,
    isSample: true,
    createdAt: '2026-09-03T08:00:00.000Z',
    updatedAt: '2026-09-03T08:00:00.000Z'
  },
  {
    id: 'game-quadratic-ineq',
    type: 'game',
    title: 'Đấu Trí Tam Thức: Bất Phương Trình Bậc Hai',
    topic: 'Chương 3: Hàm số bậc hai & Tam thức',
    description: 'Rèn luyện quy tắc xét dấu tam thức bậc hai "trong trái ngoài cùng" và giải các bất phương trình bậc hai trên trục số thực.',
    htmlContent: htmlQuadraticIneqGame,
    displayOrder: 5,
    isSample: true,
    createdAt: '2026-09-03T08:15:00.000Z',
    updatedAt: '2026-09-03T08:15:00.000Z'
  },
  {
    id: 'game-stats-prob',
    type: 'game',
    title: 'Thám Tử Thống Kê & Xác Suất Lớp 10',
    topic: 'Chương 6: Thống kê & Xác suất',
    description: 'Khám phá các đại lượng đo xu thế trung tâm: Số trung bình, Trung vị (Me), Tứ phân vị (Q1, Q2, Q3), Mốt và xác suất của biến cố.',
    htmlContent: htmlStatsGame,
    displayOrder: 6,
    isSample: true,
    createdAt: '2026-09-04T08:00:00.000Z',
    updatedAt: '2026-09-04T08:00:00.000Z'
  },
  {
    id: 'game-line-circle-oxy',
    type: 'game',
    title: 'Chinh Phục Tọa Độ: Đường Thẳng & Đường Tròn Oxy',
    topic: 'Chương 7: Phương pháp tọa độ trong mặt phẳng',
    description: 'Thực hành phương trình đường thẳng tổng quát, khoảng cách từ điểm đến đường thẳng và phương trình đường tròn tâm I bán kính R.',
    htmlContent: htmlLineCircleGame,
    displayOrder: 7,
    isSample: true,
    createdAt: '2026-09-05T08:00:00.000Z',
    updatedAt: '2026-09-05T08:00:00.000Z'
  }
];
