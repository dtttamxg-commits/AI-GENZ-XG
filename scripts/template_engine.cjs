const fs = require('fs');
const path = require('path');

const gamesDir = path.resolve(__dirname, '../public/games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

function buildGameHtml({
  id,
  title,
  subTitle,
  chapterBadge,
  accentColor = '#64FFDA',
  secondaryColor = '#FBBF24',
  stages,
  questions,
  interactiveLabHtml,
  interactiveLabScript
}) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title} - Toán 10</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#0A192F',
            'navy-light': '#112240',
            'navy-lighter': '#233554',
            teal: '#64FFDA',
            gold: '#FBBF24',
            danger: '#EF4444',
            success: '#10B981',
            accent: '${accentColor}'
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            math: ['"Times New Roman"', 'Times', 'serif']
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #0A192F; color: #E2E8F0; font-family: 'Inter', sans-serif; user-select: none; }
    .math { font-family: 'Times New Roman', Times, serif; font-size: 1.15em; font-style: italic; }
    .math-normal { font-family: 'Times New Roman', Times, serif; font-size: 1.15em; font-style: normal; }
    .vec { display: inline-block; position: relative; font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: bold; padding-top: 0.3em; margin: 0 0.15em; }
    .vec::after { content: '→'; position: absolute; top: -0.6em; left: 50%; transform: translateX(-50%); font-style: normal; font-weight: normal; font-size: 0.85em; }
    .btn-opt { transition: all 0.15s ease; }
    .btn-opt:hover { transform: translateY(-2px); border-color: ${accentColor}; }
    .fade-in { animation: fadeIn 0.3s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-teal selection:text-navy">
  <!-- Header -->
  <header class="bg-navy-light/95 border-b border-navy-lighter px-4 py-3 sticky top-0 z-20 backdrop-blur-sm">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
          ${chapterBadge}
        </span>
        <div>
          <h1 class="text-base sm:text-lg font-extrabold text-white leading-tight">${title}</h1>
          <p class="text-xs text-slate-400 hidden sm:block">${subTitle}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 text-right">
        <div>
          <span class="text-[11px] text-slate-400 block">Điểm số</span>
          <span id="score-val" class="text-lg font-black text-gold">0</span>
        </div>
        <div>
          <span class="text-[11px] text-slate-400 block">Câu hỏi</span>
          <span id="q-counter" class="text-sm font-bold text-teal">1 / ${questions.length}</span>
        </div>
      </div>
    </div>
    <!-- Progress bar -->
    <div class="max-w-4xl mx-auto mt-2 h-1.5 bg-navy-lighter rounded-full overflow-hidden">
      <div id="progress-fill" class="h-full bg-gradient-to-r from-teal to-gold transition-all duration-300" style="width: 0%"></div>
    </div>
  </header>

  <!-- Main Game Stage -->
  <main class="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
    <!-- Intro / Start Screen -->
    <div id="intro-screen" class="bg-navy-light border border-navy-lighter rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-2xl">
      <div class="w-16 h-16 rounded-2xl bg-teal/10 border border-teal/30 text-teal flex items-center justify-center text-3xl mx-auto mb-4">
        🎮
      </div>
      <h2 class="text-2xl font-black text-white mb-2">${title}</h2>
      <p class="text-sm text-slate-300 mb-6 leading-relaxed">
        ${subTitle}. Hoàn thành ${questions.length} thử thách với 4 chặng thi đấu để đạt danh hiệu Đại Kiện Tướng Toán Học!
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-left">
        ${stages.map((st, i) => `
          <div class="p-3 rounded-xl bg-navy/60 border border-navy-lighter">
            <span class="text-[10px] text-gold font-bold uppercase block">Chặng ${i + 1}</span>
            <span class="text-xs font-semibold text-slate-200">${st}</span>
          </div>
        `).join('')}
      </div>
      <button id="btn-start" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal to-emerald-400 text-navy font-black text-base shadow-lg shadow-teal/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
        🚀 BẮT ĐẦU THỬ THÁCH NGAY
      </button>
    </div>

    <!-- Question Card -->
    <div id="game-stage" class="hidden flex-col gap-5">
      <div class="bg-navy-light border border-navy-lighter rounded-2xl p-5 sm:p-7 shadow-xl">
        <!-- Stage & Tag -->
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-navy-lighter text-xs">
          <span id="stage-badge" class="px-2.5 py-1 rounded-md bg-gold/10 text-gold font-bold border border-gold/20">
            Chặng 1
          </span>
          <span id="q-hint-topic" class="text-slate-400">Toán 10 GDPT 2018</span>
        </div>

        <!-- Question Title -->
        <div id="q-content" class="text-base sm:text-lg font-bold text-white mb-5 leading-relaxed">
          <!-- Populated by JS -->
        </div>

        <!-- Question Graphic / SVG Area (optional) -->
        <div id="q-graphic" class="mb-5 hidden bg-slate-950/60 rounded-xl p-4 border border-navy-lighter flex justify-center items-center overflow-x-auto">
          <!-- Populated by JS -->
        </div>

        <!-- Options Container -->
        <div id="options-box" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Populated by JS -->
        </div>

        <!-- Feedback & Explanation Box -->
        <div id="feedback-box" class="mt-5 p-4 rounded-xl hidden border">
          <div id="feedback-title" class="font-bold text-sm mb-1"></div>
          <div id="feedback-detail" class="text-xs sm:text-sm text-slate-300 leading-relaxed"></div>
          <div class="mt-4 flex justify-end">
            <button id="btn-next" class="px-6 py-2.5 rounded-xl bg-gold text-navy font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer">
              Tiếp tục thử thách ➔
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Final Result Screen -->
    <div id="result-screen" class="hidden bg-navy-light border border-navy-lighter rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto shadow-2xl">
      <div id="result-medal" class="text-5xl mb-3">🏆</div>
      <h2 class="text-2xl font-black text-white mb-1">KẾT QUẢ THỬ THÁCH</h2>
      <p id="result-rank" class="text-sm font-bold text-teal mb-4">Đại Kiện Tướng Toán Học</p>
      <div class="bg-navy/70 border border-navy-lighter rounded-xl p-4 mb-6 grid grid-cols-2 gap-4">
        <div>
          <span class="text-xs text-slate-400 block">Tổng điểm đạt được</span>
          <span id="final-score" class="text-2xl font-black text-gold">0 / 100</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Số câu chính xác</span>
          <span id="final-correct" class="text-2xl font-black text-emerald-400">0 / 0</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button id="btn-restart" class="px-6 py-3 rounded-xl bg-teal text-navy font-bold text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer">
          🔄 Thử thách lại
        </button>
        ${interactiveLabHtml ? `
        <button id="btn-open-lab" class="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 active:scale-95 transition-all cursor-pointer">
          🔬 Mở Phòng Thí Nghiệm Tương Tác
        </button>
        ` : ''}
      </div>
    </div>

    ${interactiveLabHtml ? `
    <!-- Interactive Lab Screen -->
    <div id="lab-screen" class="hidden bg-navy-light border border-navy-lighter rounded-2xl p-5 sm:p-7 shadow-2xl">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-navy-lighter">
        <h3 class="text-lg font-bold text-teal flex items-center gap-2">
          🔬 Phòng Thí Nghiệm Trực Quan
        </h3>
        <button id="btn-close-lab" class="px-3 py-1.5 rounded-lg bg-navy text-xs text-slate-300 hover:text-white border border-navy-lighter">
          Đóng phòng lab ✕
        </button>
      </div>
      ${interactiveLabHtml}
    </div>
    ` : ''}
  </main>

  <footer class="py-3 text-center text-xs text-slate-500 border-t border-navy-lighter">
    Học Liệu Số Toán 10 · Khám Phá Toán Học Tương Tác
  </footer>

  <script>
    const QUESTIONS = ${JSON.stringify(questions)};
    const STAGES = ${JSON.stringify(stages)};

    let currentQ = 0;
    let score = 0;
    let correctCount = 0;
    let answered = false;

    const DOM = {
      intro: document.getElementById('intro-screen'),
      stage: document.getElementById('game-stage'),
      result: document.getElementById('result-screen'),
      lab: document.getElementById('lab-screen'),
      btnStart: document.getElementById('btn-start'),
      btnRestart: document.getElementById('btn-restart'),
      btnOpenLab: document.getElementById('btn-open-lab'),
      btnCloseLab: document.getElementById('btn-close-lab'),
      scoreVal: document.getElementById('score-val'),
      qCounter: document.getElementById('q-counter'),
      progressFill: document.getElementById('progress-fill'),
      stageBadge: document.getElementById('stage-badge'),
      qContent: document.getElementById('q-content'),
      qGraphic: document.getElementById('q-graphic'),
      optionsBox: document.getElementById('options-box'),
      feedbackBox: document.getElementById('feedback-box'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackDetail: document.getElementById('feedback-detail'),
      btnNext: document.getElementById('btn-next'),
      finalScore: document.getElementById('final-score'),
      finalCorrect: document.getElementById('final-correct'),
      resultRank: document.getElementById('result-rank')
    };

    DOM.btnStart.onclick = () => {
      DOM.intro.classList.add('hidden');
      DOM.stage.classList.remove('hidden');
      DOM.stage.classList.add('flex');
      loadQuestion(0);
    };

    DOM.btnRestart.onclick = () => {
      currentQ = 0;
      score = 0;
      correctCount = 0;
      DOM.scoreVal.textContent = '0';
      DOM.result.classList.add('hidden');
      DOM.stage.classList.remove('hidden');
      DOM.stage.classList.add('flex');
      loadQuestion(0);
    };

    if (DOM.btnOpenLab) {
      DOM.btnOpenLab.onclick = () => {
        DOM.result.classList.add('hidden');
        DOM.lab.classList.remove('hidden');
        if (typeof initLab === 'function') initLab();
      };
      DOM.btnCloseLab.onclick = () => {
        DOM.lab.classList.add('hidden');
        DOM.result.classList.remove('hidden');
      };
    }

    function loadQuestion(idx) {
      currentQ = idx;
      answered = false;
      const q = QUESTIONS[idx];
      DOM.qCounter.textContent = (idx + 1) + ' / ' + QUESTIONS.length;
      DOM.progressFill.style.width = ((idx / QUESTIONS.length) * 100) + '%';
      DOM.stageBadge.textContent = 'Chặng ' + (q.stage || Math.floor(idx / 3) + 1) + ': ' + (STAGES[q.stage - 1] || 'Vận dụng');
      DOM.qContent.innerHTML = q.question;

      if (q.graphicSvg) {
        DOM.qGraphic.innerHTML = q.graphicSvg;
        DOM.qGraphic.classList.remove('hidden');
      } else {
        DOM.qGraphic.classList.add('hidden');
      }

      DOM.feedbackBox.classList.add('hidden');
      DOM.optionsBox.innerHTML = '';

      q.options.forEach((opt, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-opt text-left p-4 rounded-xl bg-navy border border-navy-lighter hover:bg-navy-lighter text-sm sm:text-base font-semibold text-slate-200 cursor-pointer flex items-center justify-between gap-3';
        btn.innerHTML = '<span>' + opt.label + '</span><span class="w-6 h-6 rounded-lg bg-navy-lighter flex items-center justify-center text-xs text-slate-400 font-bold">' + String.fromCharCode(65 + optIdx) + '</span>';
        btn.onclick = () => handleAnswer(optIdx, btn);
        DOM.optionsBox.appendChild(btn);
      });
    }

    function handleAnswer(selectedIdx, clickedBtn) {
      if (answered) return;
      answered = true;
      const q = QUESTIONS[currentQ];
      const isCorrect = selectedIdx === q.correct;
      const allBtns = DOM.optionsBox.querySelectorAll('button');

      allBtns.forEach((b, i) => {
        b.disabled = true;
        b.classList.remove('hover:bg-navy-lighter');
        if (i === q.correct) {
          b.classList.add('bg-emerald-950/80', 'border-emerald-500', 'text-emerald-300');
        } else if (i === selectedIdx && !isCorrect) {
          b.classList.add('bg-rose-950/80', 'border-rose-500', 'text-rose-300');
        }
      });

      if (isCorrect) {
        score += 10;
        correctCount++;
        DOM.scoreVal.textContent = score;
        DOM.feedbackBox.className = 'mt-5 p-4 rounded-xl border border-emerald-500/50 bg-emerald-950/30 text-emerald-200 fade-in';
        DOM.feedbackTitle.textContent = '🎉 CHÍNH XÁC! (+10 ĐIỂM)';
      } else {
        DOM.feedbackBox.className = 'mt-5 p-4 rounded-xl border border-rose-500/50 bg-rose-950/30 text-rose-200 fade-in';
        DOM.feedbackTitle.textContent = '💡 CHƯA CHÍNH XÁC!';
      }

      DOM.feedbackDetail.innerHTML = q.explanation || 'Đáp án đúng là: ' + q.options[q.correct].label;
      DOM.feedbackBox.classList.remove('hidden');
    }

    DOM.btnNext.onclick = () => {
      if (currentQ + 1 < QUESTIONS.length) {
        loadQuestion(currentQ + 1);
      } else {
        showResults();
      }
    };

    function showResults() {
      DOM.stage.classList.add('hidden');
      DOM.stage.classList.remove('flex');
      DOM.result.classList.remove('hidden');
      DOM.progressFill.style.width = '100%';
      DOM.finalScore.textContent = score + ' / ' + (QUESTIONS.length * 10);
      DOM.finalCorrect.textContent = correctCount + ' / ' + QUESTIONS.length;

      const pct = (correctCount / QUESTIONS.length) * 100;
      if (pct >= 90) {
        DOM.resultRank.textContent = '🌟 ĐẠI KIỆN TƯỚNG TOÁN HỌC (XUẤT SẮC)';
      } else if (pct >= 70) {
        DOM.resultRank.textContent = '🥈 BẬC THẦY TƯ DUY (KHÁ GIỎI)';
      } else {
        DOM.resultRank.textContent = '🥉 CHIẾN BINH TIỀM NĂNG (CẦN ÔN TẬP THÊM)';
      }
    }

    ${interactiveLabScript || ''}
  </script>
</body>
</html>`;
}

module.exports = { buildGameHtml, gamesDir };
