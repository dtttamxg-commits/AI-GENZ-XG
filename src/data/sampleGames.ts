export const sampleVectorGameHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đấu Trường Vectơ Oxy - Toán 10</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background: #0f172a; color: #f8fafc; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 16px; user-select: none; }
    header { width: 100%; max-width: 800px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    h1 { font-size: 20px; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
    .badge { background: #3b82f6; color: white; padding: 2px 10px; border-radius: 99px; font-size: 12px; }
    .stats { display: flex; gap: 16px; font-weight: 600; font-size: 14px; }
    .stat-box { background: #1e293b; padding: 6px 14px; border-radius: 8px; border: 1px solid #334155; }
    .main-container { width: 100%; max-width: 800px; display: flex; flex-direction: column; gap: 12px; }
    .canvas-card { position: relative; width: 100%; background: #020617; border-radius: 16px; overflow: hidden; border: 2px solid #1e293b; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
    canvas { display: block; width: 100%; height: auto; cursor: crosshair; }
    .control-panel { background: #1e293b; padding: 14px 18px; border-radius: 12px; border: 1px solid #334155; display: flex; flex-direction: column; gap: 10px; }
    .question-box { font-size: 15px; color: #e2e8f0; line-height: 1.5; background: #0f172a; padding: 10px 14px; border-radius: 8px; border-left: 4px solid #38bdf8; }
    .options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 6px; }
    button.opt-btn { background: #334155; color: #f8fafc; border: 1px solid #475569; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s ease; text-align: left; }
    button.opt-btn:hover { background: #475569; border-color: #38bdf8; transform: translateY(-1px); }
    button.opt-btn.correct { background: #059669; border-color: #10b981; }
    button.opt-btn.wrong { background: #dc2626; border-color: #ef4444; }
    .hint-bar { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #94a3b8; }
    .action-btn { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .action-btn:hover { background: #2563eb; }
    .formula-tag { font-family: monospace; background: #334155; padding: 2px 6px; border-radius: 4px; color: #a5f3fc; }
  </style>
</head>
<body>
  <header>
    <h1>🏹 Đấu Trường Vectơ Oxy <span class="badge">Toán Lớp 10</span></h1>
    <div class="stats">
      <div class="stat-box">Điểm: <span id="score" style="color: #34d399">0</span></div>
      <div class="stat-box">Câu: <span id="round">1/5</span></div>
    </div>
  </header>

  <div class="main-container">
    <div class="canvas-card">
      <canvas id="mathCanvas" width="800" height="400"></canvas>
    </div>

    <div class="control-panel">
      <div class="question-box" id="questionText">
        Đang khởi tạo thử thách...
      </div>
      <div class="options-grid" id="optionsContainer"></div>
      <div class="hint-bar">
        <span id="feedbackText">Hãy chọn phương án chính xác nhất để hoàn thành thử thách tọa độ.</span>
        <button class="action-btn" id="nextBtn" style="display:none;" onclick="nextQuestion()">Tiếp tục ➔</button>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('mathCanvas');
    const ctx = canvas.getContext('2d');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackText = document.getElementById('feedbackText');
    const nextBtn = document.getElementById('nextBtn');
    const scoreEl = document.getElementById('score');
    const roundEl = document.getElementById('round');

    let score = 0;
    let currentIndex = 0;
    let answered = false;

    // Web Audio Sound synthesis
    function playBeep(freq, type, duration) {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch(e) {}
    }

    const questions = [
      {
        text: "Cho vectơ \\\\vec{u} có điểm đầu tại gốc O(0,0) và điểm cuối tại M(4, 3). Tính độ dài |\\\\vec{u}|?",
        draw: (ctx) => {
          drawAxes(ctx);
          drawVector(ctx, 0, 0, 4, 3, '#38bdf8', 'u (4, 3)');
        },
        options: ["|\\\\vec{u}| = 5", "|\\\\vec{u}| = 7", "|\\\\vec{u}| = 25", "|\\\\vec{u}| = \\\\sqrt{7}"],
        correct: 0,
        hint: "Công thức: |\\\\vec{u}| = \\\\sqrt{x^2 + y^2} = \\\\sqrt{4^2 + 3^2} = \\\\sqrt{25} = 5."
      },
      {
        text: "Cho \\\\vec{a} = (3, 2) và \\\\vec{b} = (-1, 2). Hãy xác định tọa độ của tổng vectơ \\\\vec{u} = \\\\vec{a} + \\\\vec{b}?",
        draw: (ctx) => {
          drawAxes(ctx);
          drawVector(ctx, 0, 0, 3, 2, '#38bdf8', 'a(3,2)');
          drawVector(ctx, 3, 2, 2, 4, '#fb923c', 'b(-1,2)');
          drawVector(ctx, 0, 0, 2, 4, '#34d399', 'u = a + b');
        },
        options: ["\\\\vec{u} = (2, 4)", "\\\\vec{u} = (4, 0)", "\\\\vec{u} = (-3, 4)", "\\\\vec{u} = (2, 0)"],
        correct: 0,
        hint: "\\\\vec{u} = (3 + (-1); 2 + 2) = (2; 4)."
      },
      {
        text: "Tính tích vô hướng của hai vectơ \\\\vec{a} = (2, 5) và \\\\vec{b} = (3, -1)?",
        draw: (ctx) => {
          drawAxes(ctx);
          drawVector(ctx, 0, 0, 2, 5, '#38bdf8', 'a(2,5)');
          drawVector(ctx, 0, 0, 3, -1, '#ec4899', 'b(3,-1)');
        },
        options: ["\\\\vec{a} \\\\cdot \\\\vec{b} = 1", "\\\\vec{a} \\\\cdot \\\\vec{b} = 11", "\\\\vec{a} \\\\cdot \\\\vec{b} = -1", "\\\\vec{a} \\\\cdot \\\\vec{b} = 0"],
        correct: 0,
        hint: "\\\\vec{a} \\\\cdot \\\\vec{b} = x_1 \\\\cdot x_2 + y_1 \\\\cdot y_2 = 2 \\\\times 3 + 5 \\\\times (-1) = 6 - 5 = 1."
      },
      {
        text: "Cho hai vectơ \\\\vec{u} = (2, 3) và \\\\vec{v} = (k, -4). Hai vectơ này vuông góc khi giá trị k bằng bao nhiêu?",
        draw: (ctx) => {
          drawAxes(ctx);
          drawVector(ctx, 0, 0, 2, 3, '#38bdf8', 'u(2,3)');
          drawVector(ctx, 0, 0, 6, -4, '#a855f7', 'v(6,-4)');
        },
        options: ["k = 6", "k = -6", "k = 8/3", "k = 2"],
        correct: 0,
        hint: "\\\\vec{u} \\\\perp \\\\vec{v} \\\\Leftrightarrow \\\\vec{u} \\\\cdot \\\\vec{v} = 0 \\\\Leftrightarrow 2k + 3(-4) = 0 \\\\Leftrightarrow 2k = 12 \\\\Leftrightarrow k = 6."
      },
      {
        text: "Cho đoạn thẳng AB với A(1, 2) và B(5, 6). Tọa độ trung điểm I của đoạn thẳng AB là:",
        draw: (ctx) => {
          drawAxes(ctx);
          drawPoint(ctx, 1, 2, '#38bdf8', 'A(1,2)');
          drawPoint(ctx, 5, 6, '#38bdf8', 'B(5,6)');
          drawPoint(ctx, 3, 4, '#f43f5e', 'I(3,4)');
          drawLine(ctx, 1, 2, 5, 6, '#475569');
        },
        options: ["I(3, 4)", "I(6, 8)", "I(2, 2)", "I(4, 3)"],
        correct: 0,
        hint: "x_I = (1 + 5)/2 = 3; y_I = (2 + 6)/2 = 4 \\\\Rightarrow I(3, 4)."
      }
    ];

    function toCanvasX(x) { return 400 + x * 35; }
    function toCanvasY(y) { return 200 - y * 35; }

    function drawAxes(ctx) {
      ctx.clearRect(0, 0, 800, 400);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = -10; x <= 10; x++) {
        ctx.beginPath();
        ctx.moveTo(toCanvasX(x), 0);
        ctx.lineTo(toCanvasX(x), 400);
        ctx.stroke();
      }
      for (let y = -6; y <= 6; y++) {
        ctx.beginPath();
        ctx.moveTo(0, toCanvasY(y));
        ctx.lineTo(800, toCanvasY(y));
        ctx.stroke();
      }

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 200); ctx.lineTo(800, 200);
      ctx.moveTo(400, 0); ctx.lineTo(400, 400);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('O', 386, 216);
      ctx.fillText('x', 785, 190);
      ctx.fillText('y', 408, 18);
    }

    function drawVector(ctx, x1, y1, x2, y2, color, label) {
      const cx1 = toCanvasX(x1);
      const cy1 = toCanvasY(y1);
      const cx2 = toCanvasX(x2);
      const cy2 = toCanvasY(y2);

      const headlen = 12;
      const dx = cx2 - cx1;
      const dy = cy2 - cy1;
      const angle = Math.atan2(dy, dx);

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx1, cy1);
      ctx.lineTo(cx2, cy2);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx2, cy2);
      ctx.lineTo(cx2 - headlen * Math.cos(angle - Math.PI / 6), cy2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(cx2 - headlen * Math.cos(angle + Math.PI / 6), cy2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      if (label) {
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(label, cx2 + 10, cy2 - 10);
      }
    }

    function drawPoint(ctx, x, y, color, label) {
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      if (label) {
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(label, cx + 8, cy - 8);
      }
    }

    function drawLine(ctx, x1, y1, x2, y2, color) {
      ctx.strokeStyle = color;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x1), toCanvasY(y1));
      ctx.lineTo(toCanvasX(x2), toCanvasY(y2));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function loadQuestion(index) {
      answered = false;
      nextBtn.style.display = 'none';
      const q = questions[index];
      questionText.innerHTML = '<strong>Câu ' + (index + 1) + ':</strong> ' + q.text.replace(/\\\\vec/g, 'vec').replace(/\\\\cdot/g, '·').replace(/\\\\perp/g, '⊥').replace(/\\\\sqrt/g, '√');
      roundEl.textContent = (index + 1) + '/' + questions.length;
      feedbackText.textContent = 'Quan sát hệ tọa độ và chọn câu trả lời đúng.';
      feedbackText.style.color = '#94a3b8';

      optionsContainer.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerHTML = opt.replace(/\\\\vec/g, 'vec').replace(/\\\\cdot/g, '·').replace(/\\\\sqrt/g, '√');
        btn.onclick = () => selectOption(i, btn);
        optionsContainer.appendChild(btn);
      });

      q.draw(ctx);
    }

    function selectOption(index, btnEl) {
      if (answered) return;
      answered = true;
      const q = questions[currentIndex];
      const buttons = optionsContainer.querySelectorAll('.opt-btn');

      if (index === q.correct) {
        btnEl.classList.add('correct');
        score += 20;
        scoreEl.textContent = score;
        feedbackText.textContent = '🎉 Chính xác! ' + q.hint.replace(/\\\\vec/g, 'vec').replace(/\\\\cdot/g, '·').replace(/\\\\perp/g, '⊥').replace(/\\\\sqrt/g, '√');
        feedbackText.style.color = '#34d399';
        playBeep(600, 'sine', 0.2);
        setTimeout(() => playBeep(880, 'sine', 0.3), 150);
      } else {
        btnEl.classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        feedbackText.textContent = '💡 Chưa đúng! ' + q.hint.replace(/\\\\vec/g, 'vec').replace(/\\\\cdot/g, '·').replace(/\\\\perp/g, '⊥').replace(/\\\\sqrt/g, '√');
        feedbackText.style.color = '#f87171';
        playBeep(250, 'sawtooth', 0.3);
      }

      if (currentIndex < questions.length - 1) {
        nextBtn.style.display = 'inline-block';
      } else {
        feedbackText.innerHTML = '🏆 <strong>Hoàn thành trò chơi!</strong> Tổng điểm đạt được: <strong>' + score + '/100</strong>.';
        nextBtn.textContent = 'Chơi lại ↺';
        nextBtn.onclick = restartGame;
        nextBtn.style.display = 'inline-block';
      }
    }

    function nextQuestion() {
      currentIndex++;
      if (currentIndex < questions.length) {
        loadQuestion(currentIndex);
      }
    }

    function restartGame() {
      score = 0;
      currentIndex = 0;
      scoreEl.textContent = '0';
      nextBtn.textContent = 'Tiếp tục ➔';
      nextBtn.onclick = nextQuestion;
      loadQuestion(0);
    }

    loadQuestion(0);
  </script>
</body>
</html>`;

export const sampleParabolaGameHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khảo Sát Đồ Thị Parabol - Toán 10</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #0b132b; color: #edf2f7; display: flex; flex-direction: column; align-items: center; min-height: 100vh; padding: 16px; }
    header { width: 100%; max-width: 820px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    h1 { font-size: 19px; color: #60a5fa; }
    .canvas-box { position: relative; width: 100%; max-width: 820px; background: #030712; border-radius: 14px; border: 2px solid #1e293b; overflow: hidden; }
    canvas { display: block; width: 100%; height: auto; }
    .controls { width: 100%; max-width: 820px; background: #1c2541; padding: 14px 18px; border-radius: 12px; margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .slider-group { display: flex; flex-direction: column; gap: 4px; }
    label { font-size: 13px; font-weight: 600; color: #93c5fd; }
    input[type=range] { accent-color: #3b82f6; cursor: pointer; }
    .info-bar { width: 100%; max-width: 820px; background: #111c38; border: 1px solid #1e293b; padding: 10px 16px; border-radius: 8px; margin-top: 10px; font-size: 14px; display: flex; justify-content: space-between; }
    .target-box { background: #065f46; color: #a7f3d0; padding: 2px 10px; border-radius: 6px; font-weight: bold; }
  </style>
</head>
<body>
  <header>
    <h1>🎯 Thử Thách Bắn Cung Parabol y = ax² + bx + c</h1>
    <div class="target-box" id="statusBadge">Mục tiêu: Đạt bia tọa độ</div>
  </header>
  <div class="canvas-box">
    <canvas id="cv" width="820" height="380"></canvas>
  </div>
  <div class="controls">
    <div class="slider-group">
      <label>Hệ số a: <span id="valA">-0.5</span></label>
      <input type="range" id="sliderA" min="-2" max="2" step="0.1" value="-0.5">
    </div>
    <div class="slider-group">
      <label>Hệ số b: <span id="valB">2</span></label>
      <input type="range" id="sliderB" min="-6" max="6" step="0.5" value="2">
    </div>
    <div class="slider-group">
      <label>Hệ số c: <span id="valC">0</span></label>
      <input type="range" id="sliderC" min="-5" max="5" step="0.5" value="0">
    </div>
  </div>
  <div class="info-bar">
    <span id="formula">y = -0.5x² + 2x + 0</span>
    <span id="vertexInfo">Đỉnh I(2, 2) · Bề lõm quay xuống</span>
  </div>

  <script>
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');
    const sliderA = document.getElementById('sliderA');
    const sliderB = document.getElementById('sliderB');
    const sliderC = document.getElementById('sliderC');
    const valA = document.getElementById('valA');
    const valB = document.getElementById('valB');
    const valC = document.getElementById('valC');
    const formula = document.getElementById('formula');
    const vertexInfo = document.getElementById('vertexInfo');
    const statusBadge = document.getElementById('statusBadge');

    const target = { x: 4, y: 0, r: 0.8 };

    function toX(x) { return 410 + x * 40; }
    function toY(y) { return 260 - y * 40; }

    function draw() {
      const a = parseFloat(sliderA.value);
      const b = parseFloat(sliderB.value);
      const c = parseFloat(sliderC.value);

      valA.textContent = a;
      valB.textContent = b;
      valC.textContent = c;

      formula.textContent = 'y = ' + a + 'x² + ' + (b >= 0 ? '+ ' : '') + b + 'x ' + (c >= 0 ? '+ ' : '') + c;
      
      let vertexText = 'a = 0 (Đường thẳng)';
      if (a !== 0) {
        const vx = -b / (2 * a);
        const vy = a * vx * vx + b * vx + c;
        vertexText = 'Đỉnh I(' + vx.toFixed(2) + ', ' + vy.toFixed(2) + ') · ' + (a > 0 ? 'Bề lõm quay lên' : 'Bề lõm quay xuống');
      }
      vertexInfo.textContent = vertexText;

      ctx.clearRect(0, 0, 820, 380);

      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = -10; x <= 10; x++) {
        ctx.beginPath(); ctx.moveTo(toX(x), 0); ctx.lineTo(toX(x), 380); ctx.stroke();
      }
      for (let y = -6; y <= 6; y++) {
        ctx.beginPath(); ctx.moveTo(0, toY(y)); ctx.lineTo(820, toY(y)); ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, toY(0)); ctx.lineTo(820, toY(0));
      ctx.moveTo(toX(0), 0); ctx.lineTo(toX(0), 380);
      ctx.stroke();

      // Target
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(toX(target.x), toY(target.y), 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(toX(target.x), toY(target.y), 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Bia (4, 0)', toX(target.x) - 22, toY(target.y) - 22);

      // Parabola Curve
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      let started = false;
      for (let px = -10; px <= 10; px += 0.1) {
        const py = a * px * px + b * px + c;
        const cx = toX(px);
        const cy = toY(py);
        if (!started) { ctx.moveTo(cx, cy); started = true; }
        else { ctx.lineTo(cx, cy); }
      }
      ctx.stroke();

      // Check hit target (4, 0)
      const hitY = a * 16 + b * 4 + c;
      if (Math.abs(hitY - 0) < 0.25) {
        statusBadge.textContent = '🎯 BẮN TRÚNG MỤC TIÊU (4, 0)! XUẤT SẮC!';
        statusBadge.style.background = '#059669';
        statusBadge.style.color = '#ffffff';
      } else {
        statusBadge.textContent = 'Mục tiêu: Đưa Parabol đi qua điểm (4, 0)';
        statusBadge.style.background = '#1e293b';
        statusBadge.style.color = '#94a3b8';
      }
    }

    sliderA.oninput = draw;
    sliderB.oninput = draw;
    sliderC.oninput = draw;
    draw();
  </script>
</body>
</html>`;
