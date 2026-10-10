const fs = require('fs');
const path = require('path');
const gamesDir = path.resolve(__dirname, '../public/games');

// Game 9: Biến Hóa Vectơ - Toán 10
const g9 = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Biến Hóa Vectơ - Toán 10</title>
    <style>
        :root {
            --navy-dark: #0A192F; --navy: #112240; --navy-light: #233554;
            --teal: #64FFDA; --teal-dim: rgba(100, 255, 218, 0.15);
            --gold: #FBBF24; --gold-dim: rgba(251, 191, 36, 0.15);
            --danger: #EF4444; --danger-dim: rgba(239, 68, 68, 0.15);
            --success: #10B981; --success-dim: rgba(16, 185, 129, 0.15);
            --text-main: #E2E8F0; --text-muted: #94A3B8;
            --font-ui: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            --font-math: 'Times New Roman', Times, serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: var(--font-ui); }
        body { background-color: var(--navy-dark); color: var(--text-main); display: flex; flex-direction: column; min-height: 100vh; overscroll-behavior: none; line-height: 1.5; }
        .hidden { display: none !important; } .text-center { text-align: center; }
        .text-teal { color: var(--teal); } .text-gold { color: var(--gold); } .text-danger { color: var(--danger); } .text-success { color: var(--success); }
        .font-bold { font-weight: bold; }
        .math { font-family: var(--font-math); font-size: 1.15em; font-style: italic; letter-spacing: 0.5px; }
        .math-normal { font-family: var(--font-math); font-size: 1.15em; font-style: normal; }
        .vec { display: inline-block; position: relative; font-family: var(--font-math); font-style: italic; font-weight: bold; padding-top: 0.4em; margin: 0 0.15em; line-height: 1; }
        .vec::after { content: '→'; position: absolute; top: -0.6em; left: 50%; transform: translateX(-50%); font-style: normal; font-weight: normal; font-size: 0.85em; }
        header { background-color: var(--navy); border-bottom: 1px solid var(--navy-light); padding: 1rem; position: sticky; top: 0; z-index: 20; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
        .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 900px; margin: 0 auto; }
        .progress-bg { width: 100%; max-width: 900px; margin: 0.5rem auto 0; background-color: var(--navy-light); height: 6px; border-radius: 3px; overflow: hidden; }
        .progress-fill { background: linear-gradient(90deg, var(--teal), var(--gold)); height: 100%; width: 0%; transition: width 0.3s; }
        main { flex-grow: 1; display: flex; justify-content: center; align-items: center; padding: 1.5rem 1rem; width: 100%; }
        .card { background-color: var(--navy); border: 1px solid var(--navy-light); border-radius: 16px; padding: 2rem; width: 100%; max-width: 800px; box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
        footer { text-align: center; padding: 1rem; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--navy-light); background-color: var(--navy); margin-top: auto; }
        h1 { color: transparent; background: linear-gradient(90deg, var(--teal), var(--gold)); -webkit-background-clip: text; background-clip: text; font-size: 2.2rem; text-align: center; margin-bottom: 1rem; font-weight: 900; }
        h2 { font-size: 1.25rem; font-weight: 500; line-height: 1.6; margin-bottom: 1.5rem; }
        .btn { display: inline-block; padding: 0.8rem 1.5rem; border-radius: 10px; border: none; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-align: center; outline: none; }
        .btn:active { transform: scale(0.96); }
        .btn-primary { background: linear-gradient(90deg, var(--teal), #34D399); color: var(--navy-dark); width: 100%; padding: 1.2rem; font-size: 1.1rem; box-shadow: 0 4px 15px var(--teal-dim); }
        .btn-action { background-color: var(--teal); color: var(--navy-dark); }
        .btn-next { background-color: var(--gold); color: var(--navy-dark); }
        .btn-secondary { background-color: var(--navy-light); color: var(--text-main); border: 1px solid var(--text-muted); }
        input[type="text"].form-control { width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid var(--navy-light); background-color: var(--navy-dark); color: #fff; font-size: 1rem; margin-bottom: 1.5rem; }
        input[type="text"].form-control:focus { outline: none; border-color: var(--teal); }
        .radio-group { display: flex; flex-direction: column; gap: 1rem; }
        .radio-group.row { flex-direction: row; margin-bottom: 2rem; }
        .radio-label { display: flex; align-items: center; justify-content: center; padding: 1rem; border: 2px solid var(--navy-light); border-radius: 12px; cursor: pointer; background-color: var(--navy-light); transition: all 0.2s; flex: 1; font-weight: bold;}
        .radio-group:not(.row) .radio-label { justify-content: flex-start; font-weight: normal; }
        .radio-label:hover { background-color: var(--navy-dark); }
        .radio-input:checked + .radio-label { border-color: var(--teal); background-color: var(--teal-dim); color: var(--teal);}
        .radio-input { display: none; }
        .radio-dot { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--text-muted); margin-right: 1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;}
        .radio-input:checked + .radio-label .radio-dot { border-color: var(--teal); }
        .radio-input:checked + .radio-label .radio-dot::after { content: ''; width: 10px; height: 10px; background-color: var(--teal); border-radius: 50%; }
        .tf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 400px; margin: 0 auto; }
        .tf-label { text-align: center; padding: 1.5rem; font-size: 1.3rem; justify-content: center; font-weight: bold; border: 2px solid var(--navy-light); border-radius: 12px; cursor: pointer; background-color: var(--navy-light); transition: all 0.2s;}
        .radio-input:checked + .tf-label.tf-true { border-color: var(--success); background-color: var(--success-dim); color: var(--success); }
        .radio-input:checked + .tf-label.tf-false { border-color: var(--danger); background-color: var(--danger-dim); color: var(--danger); }
        .dnd-pool { display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; background-color: var(--navy-dark); padding: 1.5rem 1rem; border-radius: 12px; border: 1px dashed var(--text-muted); min-height: 80px; margin-top: 1.5rem;}
        .dnd-item { background: linear-gradient(145deg, #334155, #1E293B); padding: 0.8rem 1.2rem; border-radius: 8px; border: 1px solid #475569; cursor: pointer; user-select: none; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: all 0.2s; font-weight: 500; font-size: 1rem;}
        .dnd-item.selected { border-color: var(--gold); box-shadow: 0 0 15px var(--gold-dim); transform: translateY(-3px) scale(1.05); background: #334155; z-index: 10; }
        .dnd-target-list { display: flex; flex-direction: column; gap: 1rem; }
        .dnd-row { display: flex; flex-direction: column; gap: 0.5rem; background: var(--navy-dark); padding: 0.8rem; border-radius: 8px; border: 1px solid var(--navy-light); }
        @media(min-width: 600px) { .dnd-row { flex-direction: row; align-items: center; justify-content: space-between; } }
        .dnd-desc { flex: 1; font-size: 1rem; }
        .dnd-slot { width: 100%; min-height: 48px; border: 2px dashed #64748B; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: rgba(0,0,0,0.2); transition: all 0.2s;}
        @media(min-width: 600px) { .dnd-slot { width: 45%; } }
        .dnd-group-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media(min-width: 600px) { .dnd-group-grid { grid-template-columns: 1fr 1fr; } }
        .dnd-group-box { background: var(--navy-dark); padding: 1rem; border-radius: 8px; border: 1px solid var(--navy-light); }
        .dnd-group-title { text-align: center; font-weight: bold; color: var(--teal); margin-bottom: 0.8rem; border-bottom: 1px solid var(--navy-light); padding-bottom: 0.5rem;}
        .dnd-group-slots { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
        .dnd-group-slots .dnd-slot { width: 45%; }
        .fill-input { width: 60px; text-align: center; border: none; border-bottom: 2px solid var(--text-muted); background: transparent; color: var(--gold); font-size: 1.2rem; font-weight: bold; padding: 0.2rem; outline: none; font-family: var(--font-math); }
        .fill-input:focus { border-color: var(--teal); }
        .feedback { margin-top: 1.5rem; padding: 1.5rem; border-radius: 12px; display: none; border: 1px solid; background-color: var(--navy-dark); }
        .feedback.correct { border-color: var(--success); border-left: 5px solid var(--success); }
        .feedback.incorrect { border-color: var(--danger); border-left: 5px solid var(--danger); }
        .feedback.partial { border-color: var(--gold); border-left: 5px solid var(--gold); }
        .svg-container { background-color: #F8FAFC; border-radius: 8px; padding: 1rem; margin-top: 1.5rem; text-align: center; border: 2px solid var(--navy-light); overflow: hidden; position: relative;}
        .svg-container svg { max-width: 100%; height: auto; display: block; margin: 0 auto; user-select: none; touch-action: none; }
        .svg-text { font-family: 'Times New Roman', serif; font-size: 14px; fill: #1E293B; font-weight: bold;}
        .svg-text-italic { font-family: 'Times New Roman', serif; font-size: 14px; fill: #1E293B; font-style: italic;}
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .lab-panel { background: var(--navy-dark); padding: 1rem; border-radius: 8px; border: 1px solid var(--navy-light); margin-top: 1rem;}
        .slider-container { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        input[type=range] { flex: 1; -webkit-appearance: none; background: transparent; height: 30px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: var(--teal); cursor: pointer; margin-top: -8px; }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: var(--navy-light); border-radius: 2px; }
        .k-input { width: 60px; text-align: center; padding: 0.5rem; border-radius: 6px; border: 1px solid var(--text-muted); background: var(--navy); color: #fff; font-weight: bold;}
        .quick-btn { background: var(--navy-light); color: var(--text-main); border: 1px solid #475569; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem;}
        .quick-btn:hover { background: var(--teal); color: var(--navy-dark); }
        .drag-handle { cursor: grab; } .drag-handle:active { cursor: grabbing; }
        .result-box { background: var(--navy-light); padding: 1.5rem; border-radius: 12px; text-align: center; }
    </style>
</head>
<body>
    <header id="game-header" class="hidden">
        <div class="header-content">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span id="player-display" class="font-bold text-teal hidden sm:block" style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"></span>
                <span id="stage-display" style="background: var(--navy-light); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: bold; color: var(--gold);"></span>
            </div>
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <span id="timer-display" class="font-bold text-teal hidden" style="font-family: monospace; font-size: 1.3rem;">--:--</span>
                <span class="font-bold" style="font-size: 1.1rem;">Điểm: <span id="score-display" class="text-gold" style="font-size: 1.4rem;">0</span></span>
            </div>
        </div>
        <div class="progress-bg"><div id="progress-bar" class="progress-fill"></div></div>
        <div style="text-align: right; max-width: 900px; margin: 0.3rem auto 0; font-size: 0.85rem; color: var(--text-muted);">
            Câu <span id="q-num-display" style="font-weight: bold; color: #fff;">1</span>/20
        </div>
    </header>

    <main>
        <div id="screen-start" class="card fade-in text-center">
            <div style="margin-bottom: 1.5rem; display: flex; justify-content: center;">
                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h1>BIẾN HÓA VECTƠ</h1>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem;">Chinh phục 4 chặng thử thách về Phép nhân vectơ với một số. Vận dụng kiến thức về hướng, độ dài, trung điểm và trọng tâm!</p>
            <div style="text-align: left; max-width: 450px; margin: 0 auto;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: bold;">Tên người chơi / Đội</label>
                <input type="text" id="input-name" class="form-control" placeholder="Nhập tên của bạn...">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: bold;">Chế độ chơi</label>
                <div class="radio-group row">
                    <label><input type="radio" name="mode" value="normal" class="radio-input" checked><div class="radio-label">Không thời gian</div></label>
                    <label><input type="radio" name="mode" value="timed" class="radio-input"><div class="radio-label">90s / Câu</div></label>
                </div>
                <button id="btn-start" class="btn btn-primary">BẮT ĐẦU BIẾN HÓA</button>
            </div>
        </div>

        <div id="screen-game" class="card hidden fade-in" style="padding: 1.5rem 2rem;">
            <h2 id="question-text"></h2>
            <div id="answer-area"></div>
            <div id="feedback-area" class="feedback">
                <div id="fb-title" style="font-weight: bold; font-size: 1.15rem; margin-bottom: 0.8rem;"></div>
                <div id="fb-ans" style="color: #fff; margin-bottom: 0.5rem; font-size: 1.05rem;"></div>
                <div id="fb-exp" style="color: var(--text-muted); line-height: 1.6;"></div>
                <div id="fb-illustration" class="hidden">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span style="font-size: 0.9rem; color: var(--teal); font-weight: bold;">Minh họa hình học</span>
                        <button id="btn-draw-step" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Xem minh họa</button>
                    </div>
                    <div class="svg-container" id="svg-wrap"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; border-top: 1px solid var(--navy-light); padding-top: 1.5rem;">
                <button id="btn-reset-dnd" class="btn btn-secondary hidden">Xếp lại thẻ</button>
                <div style="flex-grow: 1;"></div>
                <button id="btn-check" class="btn btn-action" style="padding: 0.8rem 2.5rem; font-size: 1.1rem;">Kiểm tra</button>
                <button id="btn-next" class="btn btn-next hidden" style="padding: 0.8rem 2.5rem; font-size: 1.1rem;">Câu tiếp theo</button>
            </div>
        </div>

        <div id="screen-stage" class="card hidden fade-in text-center" style="max-width: 500px;">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" style="margin: 0 auto 1rem;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <h2 style="color: var(--text-main); margin-bottom: 0.5rem; font-size: 1.5rem;">Hoàn thành chặng</h2>
            <h3 id="stage-summary-name" style="color: var(--gold); font-size: 1.8rem; margin-bottom: 1.5rem; font-weight: 900;"></h3>
            <div style="background: var(--navy-dark); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid var(--navy-light);">
                <div style="color: var(--text-muted); margin-bottom: 0.5rem;">Điểm chặng này</div>
                <div id="stage-summary-score" style="font-size: 3rem; font-weight: bold; color: var(--teal);">50/50</div>
            </div>
            <button id="btn-next-stage" class="btn btn-primary">Tiếp tục hành trình</button>
        </div>

        <div id="screen-final" class="card hidden fade-in">
            <div class="text-center" style="margin-bottom: 2rem;">
                <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">BIẾN HÓA THÀNH CÔNG!</h1>
                <div id="final-name" style="font-size: 1.3rem; font-weight: bold; color: var(--teal);"></div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="result-box"><div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">Tổng điểm</div><div id="final-score" style="font-size: 2.5rem; font-weight: bold; color: var(--gold);"></div></div>
                <div class="result-box"><div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">Số câu trọn vẹn</div><div id="final-perfect" style="font-size: 2.5rem; font-weight: bold; color: var(--success);"></div></div>
            </div>
            <div style="background: var(--navy-dark); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--navy-light); margin-bottom: 1.5rem;">
                <div style="font-weight: bold; margin-bottom: 1rem; color: #fff; border-bottom: 1px solid #334155; padding-bottom: 0.8rem;">Điểm từng chặng</div>
                <div id="final-breakdown" style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 1rem;"></div>
            </div>
            <div id="final-advice" style="text-align: center; padding: 1.2rem; background: var(--navy-light); border-radius: 8px; font-weight: 500; margin-bottom: 1.5rem; color: #fff; line-height: 1.5; border-left: 4px solid var(--teal);"></div>
            <div id="review-section" class="hidden" style="margin-bottom: 2rem;">
                <div style="color: var(--danger); font-weight: bold; margin-bottom: 1rem; font-size: 1.1rem;">Các câu cần xem lại:</div>
                <div id="review-list" style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem; padding-right: 0.5rem;"></div>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                <button id="btn-review" class="btn btn-secondary hidden" style="flex: 1; min-width: 150px;">Ôn câu sai</button>
                <button id="btn-explore" class="btn btn-action" style="flex: 1; min-width: 200px; background-color: var(--gold); color: var(--navy-dark);">Phòng thí nghiệm hệ số k</button>
                <button id="btn-restart" class="btn btn-primary" style="flex: 2; min-width: 200px;">Chơi lại từ đầu</button>
            </div>
        </div>

        <div id="screen-explore" class="card hidden fade-in" style="max-width: 900px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="margin: 0; color: var(--teal); font-size: 1.5rem;">Phòng Thí Nghiệm Hệ Số k</h2>
                <button id="btn-close-explore" class="btn btn-secondary" style="padding: 0.5rem 1rem;">Đóng</button>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Kéo đầu mút <span class="text-teal font-bold">U</span> để đổi hướng/độ dài. Điều chỉnh thanh trượt để thay đổi hệ số <span class="text-gold font-bold">k</span>.</p>
            <div class="svg-container" style="background-color: #fff; padding: 0;">
                <svg id="lab-svg" viewBox="-200 -200 400 400" width="100%" height="350px" style="touch-action: none;">
                    <defs>
                        <marker id="arr-u" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0D9488"/></marker>
                        <marker id="arr-ku" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706"/></marker>
                    </defs>
                    <g stroke="#E2E8F0" stroke-width="0.5" stroke-dasharray="10 10"><line x1="-200" y1="0" x2="200" y2="0"/><line x1="0" y1="-200" x2="0" y2="200"/></g>
                    <line id="lab-ku" x1="0" y1="0" x2="100" y2="-50" stroke="#D97706" stroke-width="4" marker-end="url(#arr-ku)"/>
                    <text id="lab-tku" x="105" y="-55" class="svg-text" fill="#D97706">k<tspan font-style="italic">u</tspan>&#8407;</text>
                    <line id="lab-u" x1="0" y1="0" x2="50" y2="-25" stroke="#0D9488" stroke-width="4" stroke-dasharray="6 4" marker-end="url(#arr-u)"/>
                    <circle id="lab-hu" cx="50" cy="-25" r="15" fill="transparent" class="drag-handle"/>
                    <text id="lab-tu" x="55" y="-30" class="svg-text" fill="#0D9488"><tspan font-style="italic">u</tspan>&#8407;</text>
                    <circle cx="0" cy="0" r="5" fill="#1E293B"/><text x="-15" y="15" class="svg-text">O</text>
                </svg>
            </div>
            <div class="lab-panel">
                <div class="slider-container">
                    <span class="font-bold text-gold">k =</span>
                    <input type="number" id="lab-k-inp" class="k-input" value="2" step="0.25" min="-3" max="3">
                    <input type="range" id="lab-k-slide" min="-3" max="3" step="0.25" value="2">
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem; flex-wrap: wrap;">
                    <button class="quick-btn" data-val="-2">-2</button><button class="quick-btn" data-val="-1">-1</button><button class="quick-btn" data-val="-0.5">-½</button><button class="quick-btn" data-val="0">0</button><button class="quick-btn" data-val="0.5">½</button><button class="quick-btn" data-val="1">1</button><button class="quick-btn" data-val="2">2</button>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; text-align: center; background: var(--navy); padding: 1rem; border-radius: 8px;">
                    <div><div class="text-muted text-sm">|<span class="vec">u</span>|</div><div id="lab-len-u" class="font-bold text-teal text-lg">0</div></div>
                    <div><div class="text-muted text-sm">|k<span class="vec">u</span>| = |k|·|<span class="vec">u</span>|</div><div id="lab-len-ku" class="font-bold text-gold text-lg">0</div></div>
                    <div><div class="text-muted text-sm">Hướng</div><div id="lab-dir" class="font-bold text-main text-lg">-</div></div>
                </div>
            </div>
            <div class="text-center mt-4"><button id="btn-lab-reset" class="btn btn-secondary">Đặt lại</button></div>
        </div>
    </main>

    <footer><p>Học Toán cùng Eliza Tâm Dương</p></footer>

    <script>
        const STAGES = ["Nhận diện hệ số", "Thám tử biến đổi", "Ghép hướng và độ dài", "Giải mã hình học"];
        const VEC = (t) => \`<span class="vec">\${t}</span>\`;
        const MATH = (t) => \`<span class="math-normal">\${t}</span>\`;

        const QUESTION_BANK = [
            { id: 1, stage: 0, type: "mcq", svgReq: "q1", q: \`Cho \${VEC('u')} khác vectơ-không. Vectơ 3\${VEC('u')}:\`, opts: [\`Ngược hướng với \${VEC('u')} và dài gấp 3 lần.\`, \`Cùng hướng với \${VEC('u')} và dài gấp 3 lần.\`, \`Cùng hướng với \${VEC('u')} và có độ dài bằng 1/3 độ dài \${VEC('u')}.\`, \`Có độ dài bằng 3, không phụ thuộc \${VEC('u')}.\`], ans: \`Cùng hướng với \${VEC('u')} và dài gấp 3 lần.\`, exp: \`Hệ số 3 dương nên giữ hướng; độ dài nhân với 3.\` },
            { id: 2, stage: 0, type: "mcq", svgReq: "q2", q: \`Cho |\${VEC('u')}| = 4 cm. Độ dài vectơ −2\${VEC('u')} bằng:\`, opts: ["−8 cm.", "2 cm.", "8 cm.", "6 cm."], ans: "8 cm.", exp: \`|−2\${VEC('u')}| = |−2|·|\${VEC('u')}| = 2·4 = 8 cm. Độ dài không âm.\` },
            { id: 3, stage: 0, type: "mcq", q: \`Với mọi vectơ \${VEC('u')}, vectơ 0\${VEC('u')} bằng:\`, opts: ["Vectơ-không.", \`Vectơ \${VEC('u')}.\`, \`Vectơ −\${VEC('u')}.\`, "Một vectơ có độ dài 1."], ans: "Vectơ-không.", exp: \`Nhân một vectơ với số 0 luôn cho vectơ-không.\` },
            { id: 4, stage: 0, type: "mcq", svgReq: "q4", q: \`Cho \${VEC('u')} khác vectơ-không và \${VEC('v')} = −½\${VEC('u')}. Khẳng định nào đúng?\`, opts: [\`\${VEC('v')} cùng hướng với \${VEC('u')}, độ dài gấp đôi.\`, \`\${VEC('v')} cùng hướng với \${VEC('u')}, độ dài bằng một nửa.\`, \`\${VEC('v')} ngược hướng với \${VEC('u')}, độ dài gấp đôi.\`, \`\${VEC('v')} ngược hướng với \${VEC('u')}, độ dài bằng một nửa.\`], ans: \`\${VEC('v')} ngược hướng với \${VEC('u')}, độ dài bằng một nửa.\`, exp: \`Hệ số âm đổi hướng; giá trị tuyệt đối của hệ số là 1/2.\` },
            { id: 5, stage: 0, type: "mcq", svgReq: "q5", q: \`Nếu M là trung điểm đoạn AB, A ≠ B, thì:\`, opts: [\`\${VEC('AM')} = 2 \${VEC('AB')}.\`, \`\${VEC('AM')} = ½ \${VEC('AB')}.\`, \`\${VEC('AM')} = −½ \${VEC('AB')}.\`, \`\${VEC('AM')} = −2 \${VEC('AB')}.\`], ans: \`\${VEC('AM')} = ½ \${VEC('AB')}.\`, exp: \`\${VEC('AM')} cùng hướng \${VEC('AB')} và có độ dài bằng một nửa AB.\` },
            { id: 6, stage: 1, type: "tf", q: \`“Với \${VEC('u')} khác vectơ-không và k < 0, vectơ k\${VEC('u')} ngược hướng với \${VEC('u')}.”\`, ans: "Đúng", exp: \`Hệ số âm làm đổi hướng của vectơ.\` },
            { id: 7, stage: 1, type: "tf", q: \`“Với mọi số thực k và mọi vectơ \${VEC('u')}, ta có |k\${VEC('u')}| = k|\${VEC('u')}|.”\`, ans: "Sai", exp: \`Công thức đúng là |k\${VEC('u')}| = |k|·|\${VEC('u')}|. Nếu k âm, k|\${VEC('u')}| có thể âm nên không thể là độ dài.\` },
            { id: 8, stage: 1, type: "tf", q: \`“Với mọi vectơ \${VEC('u')}, \${VEC('v')}, ta có 2(\${VEC('u')} + \${VEC('v')}) = 2\${VEC('u')} + 2\${VEC('v')}.”\`, ans: "Đúng", exp: \`Đây là tính chất phân phối của phép nhân vectơ với một số.\` },
            { id: 9, stage: 1, type: "tf", q: \`“Nếu \${VEC('u')} và \${VEC('v')} cùng phương thì luôn tồn tại k sao cho \${VEC('v')} = k\${VEC('u')}, kể cả khi \${VEC('u')} là vectơ-không và \${VEC('v')} khác vectơ-không.”\`, ans: "Sai", exp: \`Mọi bội của vectơ-không đều bằng vectơ-không. Điều kiện \${VEC('u')} khác vectơ-không là cần thiết cho phát biểu này.\` },
            { id: 10, stage: 1, type: "tf", svgReq: "q10", q: \`“Nếu M là trung điểm AB thì \${VEC('MA')} + \${VEC('MB')} = vectơ-không.”\`, ans: "Đúng", exp: \`Hai vectơ MA và MB đối nhau.\` },
            { id: 11, stage: 2, type: "dnd", layout: "list", q: \`Cho \${VEC('u')} khác vectơ-không. Ghép vectơ với mô tả.\`, targets: [\`2\${VEC('u')}\`, \`−2\${VEC('u')}\`, \`½\${VEC('u')}\`, \`−½\${VEC('u')}\`], items: [\`Cùng hướng với \${VEC('u')}, độ dài gấp 2 lần.\`, \`Ngược hướng với \${VEC('u')}, độ dài gấp 2 lần.\`, \`Cùng hướng với \${VEC('u')}, độ dài bằng một nửa.\`, \`Ngược hướng với \${VEC('u')}, độ dài bằng một nửa.\`], pairs: { [\`2\${VEC('u')}\`]: \`Cùng hướng với \${VEC('u')}, độ dài gấp 2 lần.\`, [\`−2\${VEC('u')}\`]: \`Ngược hướng với \${VEC('u')}, độ dài gấp 2 lần.\`, [\`½\${VEC('u')}\`]: \`Cùng hướng với \${VEC('u')}, độ dài bằng một nửa.\`, [\`−½\${VEC('u')}\`]: \`Ngược hướng với \${VEC('u')}, độ dài bằng một nửa.\` }, exp: \`Dấu của hệ số quyết định hướng; giá trị tuyệt đối quyết định tỉ lệ độ dài.\` },
            { id: 12, stage: 2, type: "dnd", layout: "list", q: "Ghép biểu thức với biểu thức bằng nó.", targets: [\`3(\${VEC('u')} + \${VEC('v')})\`, \`(2 + 5)\${VEC('u')}\`, \`2(−3\${VEC('u')})\`, \`\${VEC('u')} + (−\${VEC('u')})\`], items: [\`3\${VEC('u')} + 3\${VEC('v')}.\`, \`7\${VEC('u')}.\`, \`−6\${VEC('u')}.\`, "Vectơ-không."], pairs: { [\`3(\${VEC('u')} + \${VEC('v')})\`]: \`3\${VEC('u')} + 3\${VEC('v')}.\`, [\`(2 + 5)\${VEC('u')}\`]: \`7\${VEC('u')}.\`, [\`2(−3\${VEC('u')})\`]: \`−6\${VEC('u')}.\`, [\`\${VEC('u')} + (−\${VEC('u')})\`]: "Vectơ-không." }, exp: \`Dùng tính chất phân phối, kết hợp và vectơ đối.\` },
            { id: 13, stage: 2, type: "dnd", layout: "list", svgReq: "q13", q: "Cho A, M, B thẳng hàng theo thứ tự A, M, B và AM = MB. Ghép biểu thức với kết quả.", targets: [VEC('AM'), VEC('MA'), VEC('MB'), VEC('BA')], items: [\`½ \${VEC('AB')}\`, \`−½ \${VEC('AB')}\`, \`½ \${VEC('AB')}\`, \`−\${VEC('AB')}\`], pairs: { [VEC('AM')]: \`½ \${VEC('AB')}\`, [VEC('MA')]: \`−½ \${VEC('AB')}\`, [VEC('MB')]: \`½ \${VEC('AB')}\`, [VEC('BA')]: \`−\${VEC('AB')}\` }, exp: \`M là trung điểm AB; cần xét cả hướng và tỉ lệ độ dài.\` },
            { id: 14, stage: 2, type: "dnd-group", q: \`Cho \${VEC('u')} khác vectơ-không. Kéo các vectơ vào đúng nhóm so với \${VEC('u')}.\`, targets: [\`Cùng hướng với \${VEC('u')}\`, \`Ngược hướng với \${VEC('u')}\`], slots: 2, items: [\`3\${VEC('u')}\`, \`½\${VEC('u')}\`, \`−\${VEC('u')}\`, \`−4\${VEC('u')}\`], groups: { [\`Cùng hướng với \${VEC('u')}\`]: [\`3\${VEC('u')}\`, \`½\${VEC('u')}\`], [\`Ngược hướng với \${VEC('u')}\`]: [\`−\${VEC('u')}\`, \`−4\${VEC('u')}\`] }, exp: \`Hệ số dương giữ hướng, hệ số âm đổi hướng.\` },
            { id: 15, stage: 2, type: "dnd", layout: "list", svgReq: "q15", q: "Cho tam giác ABC, M là trung điểm BC, G là trọng tâm. Ghép biểu thức với kết quả.", targets: [VEC('AG'), VEC('GM'), VEC('GA'), \`\${VEC('GA')} + \${VEC('GB')} + \${VEC('GC')}\`], items: [\`⅔ \${VEC('AM')}\`, \`⅓ \${VEC('AM')}\`, \`−⅔ \${VEC('AM')}\`, "Vectơ-không"], pairs: { [VEC('AG')]: \`⅔ \${VEC('AM')}\`, [VEC('GM')]: \`⅓ \${VEC('AM')}\`, [VEC('GA')]: \`−⅔ \${VEC('AM')}\`, [\`\${VEC('GA')} + \${VEC('GB')} + \${VEC('GC')}\`]: "Vectơ-không" }, exp: \`G nằm trên AM, với AG = 2GM; tổng ba vectơ từ trọng tâm tới ba đỉnh bằng vectơ-không.\` },
            { id: 16, stage: 3, type: "fill", q: \`Cho |\${VEC('u')}| = 5 cm. Độ dài vectơ −3\${VEC('u')} bằng [INPUT] cm.\`, ansNorms: ["15", "15.0"], dispAns: "15", exp: \`|−3\${VEC('u')}| = 3·5 = 15 cm.\` },
            { id: 17, stage: 3, type: "fill", q: \`Cho \${VEC('u')} khác vectơ-không và 2\${VEC('u')} + 3\${VEC('u')} = k\${VEC('u')}. Khi đó k = [INPUT].\`, ansNorms: ["5", "5.0"], dispAns: "5", exp: \`2\${VEC('u')} + 3\${VEC('u')} = (2 + 3)\${VEC('u')} = 5\${VEC('u')}. Vì \${VEC('u')} khác vectơ-không nên k = 5.\` },
            { id: 18, stage: 3, type: "fill", svgReq: "q18", q: \`Cho A, B, C thẳng hàng, B nằm giữa A và C, AB = 2 cm và BC = 4 cm. Nếu \${VEC('AC')} = k·\${VEC('AB')} thì k = [INPUT].\`, ansNorms: ["3", "3.0"], dispAns: "3", exp: \`AC = 6 cm; AC cùng hướng AB và dài gấp 3 lần AB.\` },
            { id: 19, stage: 3, type: "fill", svgReq: "q19", q: \`Cho A, B, C thẳng hàng, A nằm giữa B và C, AB = 2 cm và AC = 6 cm. Nếu \${VEC('AC')} = k·\${VEC('AB')} thì k = [INPUT].\`, ansNorms: ["-3", "-3.0", "−3", "−3.0"], dispAns: "−3", exp: \`AC và AB ngược hướng; tỉ lệ độ dài AC/AB = 3 nên k = −3.\` },
            { id: 20, stage: 3, type: "fill", svgReq: "q20", q: \`Cho tam giác ABC, M là trung điểm BC và G là trọng tâm. Điền số nguyên:<br><br>\${VEC('AG')} = ([INPUT] / 3)·\${VEC('AM')}.\`, ansNorms: ["2", "2.0"], dispAns: "2", exp: \`Trọng tâm chia trung tuyến theo tỉ lệ AG : GM = 2 : 1 nên \${VEC('AG')} = ⅔ \${VEC('AM')}.\` }
        ];

        let state = { qIdx: 0, score: 0, stageScores: [0,0,0,0], perfects: 0, timer: null, timeRem: 0, isTimed: false, locked: false, mistakes: [], isReview: false, revList: [], revIdx: 0, name: "Ẩn danh" };
        let dndState = { selected: null };

        const DOM = {
            sStart: document.getElementById('screen-start'), sGame: document.getElementById('screen-game'), sStage: document.getElementById('screen-stage'), sFinal: document.getElementById('screen-final'), sExp: document.getElementById('screen-explore'),
            header: document.getElementById('game-header'), qText: document.getElementById('question-text'), ansArea: document.getElementById('answer-area'), fb: document.getElementById('feedback-area'),
            fbIll: document.getElementById('fb-illustration'), svgWrap: document.getElementById('svg-wrap'),
            btnStart: document.getElementById('btn-start'), btnCheck: document.getElementById('btn-check'), btnNext: document.getElementById('btn-next'), btnResetDnd: document.getElementById('btn-reset-dnd'), btnDraw: document.getElementById('btn-draw-step')
        };

        const utils = {
            hideAll: () => [DOM.sStart, DOM.sGame, DOM.sStage, DOM.sFinal, DOM.sExp].forEach(e => e.classList.add('hidden')),
            shuffle: arr => [...arr].sort(() => Math.random() - 0.5),
            formatStr: s => s.replace(/"/g, '&quot;').replace(/'/g, '&#39;'),
            normStr: s => s.trim().toLowerCase().replace(/\\s+/g, '').replace(/−/g, '-').replace(/,/g, '.')
        };

        DOM.btnStart.onclick = () => { let n = document.getElementById('input-name').value.trim(); if(n) state.name = n; state.isTimed = document.querySelector('input[name="mode"]:checked').value === 'timed'; resetGame(); startGame(); };
        document.getElementById('btn-restart').onclick = () => { resetGame(); startGame(); };

        function resetGame() { state.qIdx = 0; state.score = 0; state.stageScores = [0,0,0,0]; state.perfects = 0; state.mistakes = []; state.isReview = false; state.locked = false; }
        function startGame() { utils.hideAll(); DOM.header.classList.remove('hidden'); document.getElementById('player-display').textContent = state.name; document.getElementById('player-display').classList.remove('hidden'); document.getElementById('timer-display').classList.toggle('hidden', !state.isTimed); DOM.sGame.classList.remove('hidden'); renderQuestion(); }
        function updateTopBar() { document.getElementById('score-display').textContent = Math.round(state.score); let cIdx = state.isReview ? state.revIdx : state.qIdx; let q = state.isReview ? state.revList[cIdx].q : QUESTION_BANK[cIdx]; document.getElementById('progress-bar').style.width = state.isReview ? '100%' : \`\${(cIdx / 20) * 100}%\`; document.getElementById('stage-display').textContent = state.isReview ? "Ôn tập" : STAGES[q.stage]; document.getElementById('q-num-display').textContent = cIdx + 1; }
        function startTimer() { stopTimer(); state.timeRem = 90; const td = document.getElementById('timer-display'); td.textContent = \`\${state.timeRem}s\`; td.style.color = "var(--teal)"; state.timer = setInterval(() => { state.timeRem--; td.textContent = \`\${state.timeRem}s\`; if(state.timeRem <= 10) td.style.color = "var(--danger)"; if(state.timeRem <= 0) { stopTimer(); checkAnswer(true); } }, 1000); }
        function stopTimer() { if(state.timer) { clearInterval(state.timer); state.timer = null; } }

        function renderQuestion() {
            state.locked = false; DOM.fb.style.display = 'none'; DOM.fbIll.classList.add('hidden'); DOM.btnCheck.classList.remove('hidden'); DOM.btnNext.classList.add('hidden'); DOM.btnResetDnd.classList.add('hidden'); dndState.selected = null;
            let q = state.isReview ? state.revList[state.revIdx].q : QUESTION_BANK[state.qIdx]; updateTopBar();
            let qHtml = q.q;
            if (q.type === 'fill') {
                qHtml = qHtml.replace('[INPUT]', \`<input type="text" class="fill-input" autocomplete="off" inputmode="decimal">\`);
                DOM.qText.innerHTML = qHtml; DOM.ansArea.innerHTML = \`<div style="text-align:center; color:var(--text-muted); font-size: 0.95rem; margin-top: 2rem;">Nhập số vào ô trống phía trên.</div>\`;
                setTimeout(() => { let el = document.querySelector('.fill-input'); if(el) el.focus(); }, 100);
            } else {
                DOM.qText.innerHTML = qHtml;
                if (q.type === 'mcq') {
                    let opts = utils.shuffle(q.opts); let html = \`<div class="radio-group">\`;
                    opts.forEach(o => { html += \`<label class="radio-label"><input type="radio" name="mcq" value="\${utils.formatStr(o)}" class="radio-input"><div class="radio-dot"></div><div style="flex:1; font-weight:normal;">\${o}</div></label>\`; });
                    DOM.ansArea.innerHTML = html + \`</div>\`;
                } else if (q.type === 'tf') {
                    DOM.ansArea.innerHTML = \`<div class="tf-grid"><label style="display:contents;"><input type="radio" name="tf" value="Đúng" class="radio-input"><div class="radio-label tf-label tf-true">ĐÚNG</div></label><label style="display:contents;"><input type="radio" name="tf" value="Sai" class="radio-input"><div class="radio-label tf-label tf-false">SAI</div></label></div>\`;
                } else if (q.type.startsWith('dnd')) {
                    DOM.btnResetDnd.classList.remove('hidden'); let items = utils.shuffle([...q.items]); let html = \`<div style="text-align:center; color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem; font-style:italic;">Chạm thẻ ở kho, sau đó chạm ô trống để đặt.</div>\`;
                    if(q.type === 'dnd') {
                        html += \`<div class="dnd-target-list">\`;
                        q.targets.forEach(t => { html += \`<div class="dnd-row"><div class="dnd-desc">\${t}</div><div class="dnd-slot" data-tgt="\${utils.formatStr(t)}"></div></div>\`; });
                        html += \`</div>\`;
                    } else if (q.type === 'dnd-group') {
                        html += \`<div class="dnd-group-grid">\`;
                        q.targets.forEach(t => {
                            html += \`<div class="dnd-group-box"><div class="dnd-group-title">\${t}</div><div class="dnd-group-slots">\`;
                            for(let i=0; i<q.slots; i++) html += \`<div class="dnd-slot" data-grp="\${utils.formatStr(t)}"></div>\`;
                            html += \`</div></div>\`;
                        });
                        html += \`</div>\`;
                    }
                    html += \`<div class="dnd-pool" id="dnd-pool"><div style="width:100%; text-align:center; font-weight:bold; font-size:0.85rem; color:var(--teal); margin-bottom:0.5rem; flex-shrink:0;">KHO THẺ</div>\`;
                    items.forEach((item, idx) => html += \`<div class="dnd-item" data-val="\${utils.formatStr(item)}" data-id="\${idx}">\${item}</div>\`);
                    html += \`</div>\`; DOM.ansArea.innerHTML = html; initDND();
                }
            }
            if (!state.isReview && state.isTimed) startTimer();
        }

        function initDND() {
            const items = document.querySelectorAll('.dnd-item'), slots = document.querySelectorAll('.dnd-slot'), pool = document.getElementById('dnd-pool');
            const clearSel = () => { if(dndState.selected) dndState.selected.classList.remove('selected'); dndState.selected = null; };
            items.forEach(item => { item.onclick = (e) => { if(state.locked) return; e.stopPropagation(); if(dndState.selected === item) clearSel(); else { clearSel(); dndState.selected = item; item.classList.add('selected'); } }; });
            slots.forEach(slot => { slot.onclick = () => { if(state.locked || !dndState.selected) return; if(slot.children.length > 0) { dndState.selected.parentNode.appendChild(slot.children[0]); slot.appendChild(dndState.selected); } else slot.appendChild(dndState.selected); clearSel(); }; });
            pool.onclick = () => { if(state.locked || !dndState.selected) return; pool.appendChild(dndState.selected); clearSel(); };
            DOM.btnResetDnd.onclick = () => { if(state.locked) return; document.querySelectorAll('.dnd-item').forEach(i => pool.appendChild(i)); clearSel(); };
        }

        DOM.btnCheck.onclick = () => checkAnswer(false);
        function checkAnswer(isTimeOut = false) {
            if(state.locked) return; let cIdx = state.isReview ? state.revIdx : state.qIdx; let q = state.isReview ? state.revList[cIdx].q : QUESTION_BANK[cIdx]; let pts = 0, isFull = false;
            if (q.type === 'mcq') { let rd = document.querySelector('input[name="mcq"]:checked'); if(!rd && !isTimeOut) { alert("Em hãy chọn một phương án!"); return; } state.locked = true; if(rd && rd.value === utils.formatStr(q.ans)) { pts = 10; isFull = true; } }
            else if (q.type === 'tf') { let rd = document.querySelector('input[name="tf"]:checked'); if(!rd && !isTimeOut) { alert("Em hãy chọn Đúng hoặc Sai!"); return; } state.locked = true; if(rd && rd.value === q.ans) { pts = 10; isFull = true; } }
            else if (q.type === 'fill') {
                let inp = document.querySelector('.fill-input'); let val = utils.normStr(inp.value); if(val === '' && !isTimeOut) { alert("Em hãy nhập đáp án!"); return; } state.locked = true; inp.disabled = true;
                if (q.ansNorms.includes(val)) { pts = 10; isFull = true; }
                inp.style.color = isFull ? "var(--success)" : "var(--danger)"; inp.style.borderColor = isFull ? "var(--success)" : "var(--danger)";
            } else if (q.type.startsWith('dnd')) {
                let slots = document.querySelectorAll('.dnd-slot'); let filled = Array.from(slots).filter(s => s.children.length > 0); if(filled.length < slots.length && !isTimeOut) { alert("Em hãy xếp đủ thẻ!"); return; } state.locked = true; DOM.btnResetDnd.classList.add('hidden'); document.querySelectorAll('.dnd-item').forEach(i => i.style.pointerEvents = 'none');
                let corr = 0; let tot = q.type === 'dnd' ? q.targets.length : Object.keys(q.groups).reduce((a,k)=>a+q.slots,0);
                if (q.type === 'dnd') {
                    slots.forEach(s => {
                        let tgt = s.getAttribute('data-tgt');
                        if(s.children.length > 0) {
                            let itemVal = s.children[0].getAttribute('data-val');
                            let expected = utils.formatStr(q.pairs[tgt.replace(/&quot;/g, '"').replace(/&#39;/g, "'")]); 
                            if(itemVal === expected || (expected.includes('½') && itemVal.includes('½'))) { corr++; s.style.borderColor = "var(--success)"; s.style.background = "var(--success-dim)"; }
                            else { s.style.borderColor = "var(--danger)"; s.style.background = "var(--danger-dim)"; }
                        } else s.style.borderColor = "var(--danger)";
                    });
                } else if (q.type === 'dnd-group') {
                    slots.forEach(s => {
                        let grp = s.getAttribute('data-grp'); let grpName = grp.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
                        if(s.children.length > 0) {
                            let itemVal = s.children[0].getAttribute('data-val'); let validItems = q.groups[grpName].map(v => utils.formatStr(v));
                            if(validItems.includes(itemVal)) { corr++; s.style.borderColor = "var(--success)"; s.style.background = "var(--success-dim)"; }
                            else { s.style.borderColor = "var(--danger)"; s.style.background = "var(--danger-dim)"; }
                        } else s.style.borderColor = "var(--danger)";
                    });
                }
                pts = (corr / tot) * 10; if(corr === tot) isFull = true;
            }
            stopTimer(); if (!state.isReview) { state.score += pts; state.stageScores[q.stage] += pts; if(isFull) state.perfects++; else state.mistakes.push({q: q, pts: pts}); updateTopBar(); } showFeedback(q, pts, isFull, isTimeOut);
        }

        const SVG_DATA = {
            step: 0,
            draw(type, wrap) {
                let svg = \`<svg viewBox="0 0 300 150" width="100%" height="200px"><defs>
                    <marker id="arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
                    <marker id="arr-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/></marker>
                    <marker id="arr-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444"/></marker>
                </defs>\`;
                const pt = (cx,cy,lbl,pos='b') => \`<circle cx="\${cx}" cy="\${cy}" r="3" fill="#1E293B"/><text x="\${cx+(pos==='l'?-15:5)}" y="\${cy+(pos==='t'?-8:15)}" class="svg-text-italic">\${lbl}</text>\`;
                const vec = (x1,y1,x2,y2,c='b',dash=false) => \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="\${c==='b'?'#3B82F6':(c==='g'?'#F59E0B':'#EF4444')}" stroke-width="2.5" \${dash?'stroke-dasharray="4 4"':''} marker-end="url(#arr-\${c})"/>\`;
                const line = (x1,y1,x2,y2) => \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="#94A3B8" stroke-width="1.5"/>\`;

                if (type === "q1" || type === "q2" || type === "q4") {
                    let uLen = type==='q4'?40:30; let k = type==='q1'?3:(type==='q2'?-2:-0.5);
                    let sx1=50, sy1=50; let ex1 = sx1+uLen, ey1=sy1;
                    let sx2=50, sy2=100; let ex2 = sx2 + uLen*k, ey2=sy2;
                    if(this.step >= 0) { svg += vec(sx1,sy1,ex1,ey1,'b') + \`<text x="\${sx1+10}" y="\${sy1-10}" class="svg-text" fill="#3B82F6">u</text>\`; }
                    if(this.step >= 1) { 
                        svg += vec(sx2,sy2,ex2,ey2,k>0?'g':'r') + \`<text x="\${k>0?sx2+10:ex2-20}" y="\${sy2-10}" class="svg-text" fill="\${k>0?'#F59E0B':'#EF4444'}">\${k>0?'3u':(k==-2?'-2u':'-½u')}</text>\`; 
                    }
                } else if (type === "q5" || type === "q10" || type === "q13") {
                    let A = [50, 75], B = [250, 75], M = [150, 75];
                    if(this.step >= 0) { svg += line(...A, ...B) + pt(...A,'A','t') + pt(...B,'B','t') + pt(...M,'M','t'); svg += \`<text x="95" y="70" font-size="10" fill="#94A3B8">||</text><text x="195" y="70" font-size="10" fill="#94A3B8">||</text>\`;}
                    if(this.step >= 1) {
                        if(type==="q5" || type==="q13") { svg += vec(...A, ...B, 'b') + vec(A[0],A[1]-15, M[0],M[1]-15, 'g'); svg += \`<text x="90" y="55" fill="#F59E0B" font-size="12" font-weight="bold">AM</text><text x="140" y="100" fill="#3B82F6" font-size="12" font-weight="bold">AB</text>\`; }
                        if(type==="q10") { svg += vec(M[0],M[1]-10, A[0],A[1]-10, 'g') + vec(M[0],M[1]+10, B[0],B[1]+10, 'r'); svg += \`<text x="90" y="55" fill="#F59E0B" font-size="12" font-weight="bold">MA</text><text x="190" y="100" fill="#EF4444" font-size="12" font-weight="bold">MB</text>\`; }
                    }
                } else if (type === "q15" || type === "q20") {
                    let A = [150, 20], B = [50, 130], C = [250, 130]; let M = [(B[0]+C[0])/2, (B[1]+C[1])/2];
                    let G = [A[0] + 2/3*(M[0]-A[0]), A[1] + 2/3*(M[1]-A[1])];
                    if(this.step >= 0) { svg += line(...A,...B)+line(...B,...C)+line(...C,...A)+line(...A,...M)+pt(...A,'A','r')+pt(...B,'B','l')+pt(...C,'C','r')+pt(...M,'M','b')+pt(...G,'G','r'); }
                    if(this.step >= 1) {
                        if(type==="q20") { svg += vec(...A,...M,'b') + vec(A[0]-5,A[1]+5, G[0]-5,G[1]+5, 'g'); }
                        else { svg += vec(...G,...A,'b') + vec(...G,...B,'g') + vec(...G,...C,'r'); }
                    }
                } else if (type === "q18" || type === "q19") {
                    let A, B, C;
                    if(type==="q18") { A=[50,75]; B=[100,75]; C=[200,75]; }
                    if(type==="q19") { B=[50,75]; A=[100,75]; C=[250,75]; }
                    if(this.step >= 0) { svg += line(...A, ...C) + pt(...A,'A','t') + pt(...B,'B','t') + pt(...C,'C','t'); }
                    if(this.step >= 1) {
                        svg += vec(A[0],A[1]-15, B[0],B[1]-15, 'b') + vec(A[0],A[1]+15, C[0],C[1]+15, type==="q18"?'g':'r');
                        svg += \`<text x="\${(A[0]+B[0])/2}" y="55" fill="#3B82F6" font-size="12" font-weight="bold">AB</text><text x="\${(A[0]+C[0])/2}" y="105" fill="\${type==="q18"?'#F59E0B':'#EF4444'}" font-size="12" font-weight="bold">AC</text>\`;
                    }
                }
                svg += \`</svg>\`; wrap.innerHTML = svg;
            }
        };

        function showFeedback(q, pts, isFull, isTimeOut) {
            DOM.fb.style.display = 'block'; DOM.fb.className = 'feedback ' + (isFull ? 'correct' : (pts > 0 ? 'partial' : 'incorrect'));
            let t = state.isReview ? (isFull ? "🎉 Chính xác!" : "💡 Chú ý ghi nhớ nhé!") : (isFull ? \`🎉 Xuất sắc! (+10 điểm)\` : (pts > 0 ? \`👍 Tốt nhưng chưa đủ! (+\${Math.round(pts)} điểm)\` : (isTimeOut ? "⏰ Hết giờ!" : "💡 Em hãy xem lại...")));
            document.getElementById('fb-title').textContent = t;
            let ansStr = "<strong>Đáp án đúng:</strong> ";
            if(['mcq', 'tf'].includes(q.type)) ansStr += q.ans;
            else if(q.type === 'fill') ansStr += \`<span class="math-normal">\${q.dispAns}</span>\`;
            else ansStr += "Xem giải thích hoặc cách xếp đúng bên trên.";
            document.getElementById('fb-ans').innerHTML = ansStr;
            document.getElementById('fb-exp').innerHTML = \`<strong>Giải thích:</strong> \${q.exp}\`;
            if(q.svgReq) {
                DOM.fbIll.classList.remove('hidden'); SVG_DATA.step = 0; SVG_DATA.draw(q.svgReq, DOM.svgWrap);
                DOM.btnDraw.onclick = () => { SVG_DATA.step = SVG_DATA.step === 0 ? 1 : 0; SVG_DATA.draw(q.svgReq, DOM.svgWrap); DOM.btnDraw.textContent = SVG_DATA.step === 1 ? "Ẩn minh họa" : "Xem minh họa"; };
            }
            DOM.btnCheck.classList.add('hidden'); DOM.btnNext.classList.remove('hidden'); setTimeout(() => DOM.fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }

        DOM.btnNext.onclick = () => {
            if (state.isReview) { state.revIdx++; if(state.revIdx < state.revList.length) renderQuestion(); else showFinal(); }
            else { let cStg = QUESTION_BANK[state.qIdx].stage; state.qIdx++; if (state.qIdx < QUESTION_BANK.length) { if (QUESTION_BANK[state.qIdx].stage !== cStg) { utils.hideAll(); DOM.sStage.classList.remove('hidden'); document.getElementById('stage-summary-name').textContent = STAGES[cStg]; document.getElementById('stage-summary-score').textContent = \`\${Math.round(state.stageScores[cStg])}/50\`; } else renderQuestion(); } else showFinal(); }
        };
        document.getElementById('btn-next-stage').onclick = () => { utils.hideAll(); DOM.sGame.classList.remove('hidden'); renderQuestion(); };

        function showFinal() {
            utils.hideAll(); DOM.header.classList.add('hidden'); DOM.sFinal.classList.remove('hidden');
            document.getElementById('final-name').textContent = state.name; document.getElementById('final-score').textContent = \`\${Math.round(state.score)} / 200\`; document.getElementById('final-perfect').textContent = \`\${state.perfects} / 20\`;
            let bd = ""; STAGES.forEach((s, i) => bd += \`<div style="display:flex; justify-content:space-between; border-bottom: 1px dashed #334155; padding-bottom: 0.5rem;"><span style="color:var(--text-muted);">\${s}</span><span class="text-gold font-bold">\${Math.round(state.stageScores[i])}/50</span></div>\`);
            document.getElementById('final-breakdown').innerHTML = bd;
            let adv = document.getElementById('final-advice');
            if (state.mistakes.length > 0) {
                adv.innerHTML = "💡 Lời khuyên: Hãy chú ý dấu của hệ số k quyết định hướng, và trị tuyệt đối của k quyết định độ dài nhé!";
                document.getElementById('review-section').classList.remove('hidden'); document.getElementById('btn-review').classList.remove('hidden');
                let rl = ""; state.mistakes.forEach(m => rl += \`<div style="background:var(--navy-dark); padding:1rem; border-radius:8px; border-left:3px solid var(--gold);"><strong>Câu \${m.q.id}:</strong> \${m.q.q.replace(/<input[^>]*>/, '___')}</div>\`);
                document.getElementById('review-list').innerHTML = rl;
            } else { adv.innerHTML = "🏆 Tuyệt đỉnh! Em đã nắm rất vững tính chất phép nhân vectơ với một số!"; document.getElementById('review-section').classList.add('hidden'); document.getElementById('btn-review').classList.add('hidden'); }
        }

        document.getElementById('btn-review').onclick = () => { state.isReview = true; state.revList = [...state.mistakes]; state.revIdx = 0; utils.hideAll(); DOM.header.classList.remove('hidden'); DOM.sGame.classList.remove('hidden'); document.getElementById('timer-display').classList.add('hidden'); renderQuestion(); };

        const Lab = {
            k: 2, u: {x: 50, y: -25}, dragMode: false,
            init() { utils.hideAll(); DOM.sExp.classList.remove('hidden'); this.bindEvents(); this.update(); },
            bindEvents() {
                const s = document.getElementById('lab-svg');
                const getPt = (e) => { let pt = s.createSVGPoint(); if(e.touches) { pt.x = e.touches[0].clientX; pt.y = e.touches[0].clientY; } else { pt.x = e.clientX; pt.y = e.clientY; } return pt.matrixTransform(s.getScreenCTM().inverse()); };
                document.getElementById('lab-hu').onpointerdown = (e) => { e.preventDefault(); this.dragMode = true; };
                s.onpointermove = (e) => { if(!this.dragMode) return; e.preventDefault(); let pt = getPt(e); if(Math.hypot(pt.x, pt.y) > 10) { this.u = pt; this.update(); } };
                window.onpointerup = () => { this.dragMode = false; };
                document.getElementById('lab-k-slide').oninput = (e) => { this.k = parseFloat(e.target.value); document.getElementById('lab-k-inp').value = this.k; this.update(); };
                document.getElementById('lab-k-inp').onchange = (e) => { let v = parseFloat(e.target.value); if(v>=-3 && v<=3) { this.k = v; document.getElementById('lab-k-slide').value = this.k; this.update(); } };
                document.querySelectorAll('.quick-btn').forEach(b => b.onclick = (e) => { this.k = parseFloat(e.target.getAttribute('data-val')); document.getElementById('lab-k-slide').value = this.k; document.getElementById('lab-k-inp').value = this.k; this.update(); });
                document.getElementById('btn-lab-reset').onclick = () => { this.u = {x: 50, y: -25}; this.k = 2; document.getElementById('lab-k-slide').value = 2; document.getElementById('lab-k-inp').value = 2; this.update(); };
                document.getElementById('btn-close-explore').onclick = () => { utils.hideAll(); DOM.sFinal.classList.remove('hidden'); };
            },
            update() {
                document.getElementById('lab-u').setAttribute('x2', this.u.x); document.getElementById('lab-u').setAttribute('y2', this.u.y);
                document.getElementById('lab-hu').setAttribute('cx', this.u.x); document.getElementById('lab-hu').setAttribute('cy', this.u.y);
                document.getElementById('lab-tu').setAttribute('x', this.u.x + 5); document.getElementById('lab-tu').setAttribute('y', this.u.y - 5);
                let uLen = Math.hypot(this.u.x, this.u.y);
                document.getElementById('lab-len-u').textContent = (uLen/10).toFixed(1);
                let kuLine = document.getElementById('lab-ku'); let kuText = document.getElementById('lab-tku');
                if (this.k === 0) {
                    kuLine.setAttribute('x2', 0); kuLine.setAttribute('y2', 0); kuLine.removeAttribute('marker-end');
                    kuText.setAttribute('x', 10); kuText.setAttribute('y', -10); kuText.innerHTML = "Vectơ-không";
                    document.getElementById('lab-dir').textContent = "Không xác định"; document.getElementById('lab-dir').style.color = "var(--text-muted)";
                } else {
                    let kux = this.u.x * this.k, kuy = this.u.y * this.k;
                    kuLine.setAttribute('x2', kux); kuLine.setAttribute('y2', kuy); kuLine.setAttribute('marker-end', 'url(#arr-ku)');
                    kuText.setAttribute('x', kux + 5); kuText.setAttribute('y', kuy - 5); kuText.innerHTML = \`k<tspan font-style="italic">u</tspan>&#8407;\`;
                    let dirStr = this.k > 0 ? "Cùng hướng" : "Ngược hướng";
                    let dirCol = this.k > 0 ? "var(--success)" : "var(--danger)";
                    document.getElementById('lab-dir').textContent = dirStr; document.getElementById('lab-dir').style.color = dirCol;
                }
                document.getElementById('lab-len-ku').textContent = (Math.abs(this.k) * uLen / 10).toFixed(1);
            }
        };
        document.getElementById('btn-explore').onclick = () => Lab.init();
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(gamesDir, 'game-09-tich-vector-voi-mot-so.html'), g9);
console.log('Wrote game-09-tich-vector-voi-mot-so.html');
