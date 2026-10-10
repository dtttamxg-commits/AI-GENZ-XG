const fs = require('fs');
const path = require('path');

const gamesDir = path.resolve(__dirname, '../public/games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

// Game 8: Đường Đua Vectơ
const g8 = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Đường Đua Vectơ - Toán 10</title>
    <style>
        :root {
            --navy-dark: #0A192F;
            --navy: #112240;
            --navy-light: #233554;
            --teal: #64FFDA;
            --teal-dim: rgba(100, 255, 218, 0.15);
            --gold: #FBBF24;
            --gold-dim: rgba(251, 191, 36, 0.15);
            --danger: #EF4444;
            --danger-dim: rgba(239, 68, 68, 0.15);
            --success: #10B981;
            --success-dim: rgba(16, 185, 129, 0.15);
            --text-main: #E2E8F0;
            --text-muted: #94A3B8;
            --font-ui: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            --font-math: 'Times New Roman', Times, serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: var(--font-ui); }
        body { background-color: var(--navy-dark); color: var(--text-main); display: flex; flex-direction: column; min-h: 100vh; overscroll-behavior-y: none; line-height: 1.5; }
        .math { font-family: var(--font-math); font-size: 1.15em; font-style: italic; letter-spacing: 0.5px; }
        .math-normal { font-family: var(--font-math); font-size: 1.15em; font-style: normal; }
        .vec { display: inline-block; position: relative; font-family: var(--font-math); font-style: italic; font-weight: bold; padding-top: 0.4em; margin: 0 0.15em; line-height: 1; }
        .vec::after { content: '→'; position: absolute; top: -0.6em; left: 50%; transform: translateX(-50%); font-style: normal; font-weight: normal; font-size: 0.85em; }
        .hidden { display: none !important; }
        .text-teal { color: var(--teal); } .text-gold { color: var(--gold); } .text-danger { color: var(--danger); } .text-success { color: var(--success); }
        .font-bold { font-weight: bold; } .text-center { text-align: center; }
        header { background-color: var(--navy); border-bottom: 1px solid var(--navy-light); padding: 1rem; position: sticky; top: 0; z-index: 20; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
        .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 900px; margin: 0 auto; }
        .progress-bg { width: 100%; max-width: 900px; margin: 0.5rem auto 0; background-color: var(--navy-light); height: 6px; border-radius: 3px; overflow: hidden; }
        .progress-fill { background: linear-gradient(90deg, var(--teal), var(--gold)); height: 100%; width: 0%; transition: width 0.3s; }
        main { flex-grow: 1; display: flex; justify-content: center; align-items: center; padding: 1.5rem 1rem; width: 100%; }
        .card { background-color: var(--navy); border: 1px solid var(--navy-light); border-radius: 16px; padding: 2rem; width: 100%; max-width: 800px; box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
        h1 { color: transparent; background: linear-gradient(90deg, var(--teal), var(--gold)); -webkit-background-clip: text; background-clip: text; font-size: 2.2rem; text-align: center; margin-bottom: 1rem; font-weight: 900; }
        .btn { display: inline-block; padding: 0.8rem 1.5rem; border-radius: 10px; border: none; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s; text-align: center; outline: none; }
        .btn:active { transform: scale(0.96); }
        .btn-primary { background: linear-gradient(90deg, var(--teal), #34D399); color: var(--navy-dark); width: 100%; padding: 1.2rem; font-size: 1.1rem; box-shadow: 0 4px 15px var(--teal-dim); }
        .btn-action { background-color: var(--teal); color: var(--navy-dark); }
        .btn-next { background-color: var(--gold); color: var(--navy-dark); }
        .btn-secondary { background-color: var(--navy-light); color: var(--text-main); border: 1px solid var(--text-muted); }
        input[type="text"].form-control { width: 100%; padding: 1rem; border-radius: 8px; border: 1px solid var(--navy-light); background-color: var(--navy-dark); color: #fff; font-size: 1rem; margin-bottom: 1.5rem; }
        input[type="text"].form-control:focus { outline: none; border-color: var(--teal); }
        .radio-group { display: flex; flex-direction: column; gap: 1rem; }
        .radio-label { display: flex; align-items: center; padding: 1rem; border: 2px solid var(--navy-light); border-radius: 12px; cursor: pointer; background-color: var(--navy-light); transition: all 0.2s; }
        .radio-label:hover { background-color: var(--navy-dark); }
        .radio-input:checked + .radio-label { border-color: var(--teal); background-color: var(--teal-dim); }
        .radio-input { display: none; }
        .radio-dot { width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--text-muted); margin-right: 1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;}
        .radio-input:checked + .radio-label .radio-dot { border-color: var(--teal); }
        .radio-input:checked + .radio-label .radio-dot::after { content: ''; width: 10px; height: 10px; background-color: var(--teal); border-radius: 50%; }
        .tf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 400px; margin: 0 auto; }
        .tf-label { text-align: center; padding: 1.5rem; font-size: 1.3rem; justify-content: center; font-weight: bold; }
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
        .fill-input { width: 60px; text-align: center; border: none; border-bottom: 2px solid var(--text-muted); background: transparent; color: var(--gold); font-size: 1.2rem; font-weight: bold; padding: 0.2rem; outline: none; font-family: var(--font-math); }
        .fill-input:focus { border-color: var(--teal); }
        .feedback { margin-top: 1.5rem; padding: 1.5rem; border-radius: 12px; display: none; border: 1px solid; background-color: var(--navy-dark); }
        .feedback.correct { border-color: var(--success); border-left: 5px solid var(--success); }
        .feedback.incorrect { border-color: var(--danger); border-left: 5px solid var(--danger); }
        .feedback.partial { border-color: var(--gold); border-left: 5px solid var(--gold); }
        .svg-container { background-color: #F8FAFC; border-radius: 8px; padding: 1rem; margin-top: 1.5rem; text-align: center; border: 2px solid var(--navy-light); overflow: hidden;}
        .svg-container svg { max-width: 100%; height: auto; display: block; margin: 0 auto; user-select: none; touch-action: none; }
        .svg-text-bold { font-family: 'Times New Roman', serif; font-size: 16px; font-weight: bold; fill: #1E293B; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        footer { text-align: center; padding: 1rem; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--navy-light); background-color: var(--navy); margin-top: auto; }
        .explore-panel { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; background: var(--navy-dark); padding: 1rem; border-radius: 8px; border: 1px solid var(--navy-light); }
        .drag-handle { cursor: grab; } .drag-handle:active { cursor: grabbing; }
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
            <h1>ĐƯỜNG ĐUA VECTƠ</h1>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem;">Chinh phục 4 chặng thử thách về Tổng và Hiệu hai vectơ. Vận dụng quy tắc ba điểm, hình bình hành và tính chất vectơ đối!</p>
            <div style="text-align: left; max-width: 450px; margin: 0 auto;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: bold;">Tên người chơi / Đội</label>
                <input type="text" id="input-name" class="form-control" placeholder="Nhập tên của bạn...">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-weight: bold;">Chế độ chơi</label>
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <label style="flex: 1; cursor: pointer;">
                        <input type="radio" name="mode" value="normal" class="radio-input" checked>
                        <div class="radio-label" style="justify-content: center; font-weight: bold;">Không thời gian</div>
                    </label>
                    <label style="flex: 1; cursor: pointer;">
                        <input type="radio" name="mode" value="timed" class="radio-input">
                        <div class="radio-label" style="justify-content: center; font-weight: bold;">90s / Câu</div>
                    </label>
                </div>
                <button id="btn-start" class="btn btn-primary">BẮT ĐẦU ĐUA</button>
            </div>
        </div>

        <div id="screen-game" class="card hidden fade-in" style="padding: 1.5rem 2rem;">
            <h2 id="question-text" style="font-size: 1.25rem; font-weight: 500; line-height: 1.6; margin-bottom: 1.5rem;"></h2>
            <div id="answer-area"></div>
            <div id="feedback-area" class="feedback">
                <div id="fb-title" style="font-weight: bold; font-size: 1.15rem; margin-bottom: 0.8rem;"></div>
                <div id="fb-ans" style="color: #fff; margin-bottom: 0.5rem; font-size: 1.05rem;"></div>
                <div id="fb-exp" style="color: var(--text-muted); line-height: 1.6;"></div>
                <div id="fb-illustration" class="hidden">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span style="font-size: 0.9rem; color: var(--teal); font-weight: bold;">Minh họa hình học</span>
                        <button id="btn-draw-step" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Xem cách dựng</button>
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
                <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">VỀ ĐÍCH THÀNH CÔNG!</h1>
                <div id="final-name" style="font-size: 1.3rem; font-weight: bold; color: var(--teal);"></div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: var(--navy-light); padding: 1.5rem; border-radius: 12px; text-align: center;">
                    <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">Tổng điểm</div>
                    <div id="final-score" style="font-size: 2.5rem; font-weight: bold; color: var(--gold);"></div>
                </div>
                <div style="background: var(--navy-light); padding: 1.5rem; border-radius: 12px; text-align: center;">
                    <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">Số câu trọn vẹn</div>
                    <div id="final-perfect" style="font-size: 2.5rem; font-weight: bold; color: var(--success);"></div>
                </div>
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
                <button id="btn-review" class="btn btn-secondary hidden" style="flex: 1; min-width: 200px;">Ôn câu cần xem lại</button>
                <button id="btn-explore" class="btn btn-action" style="flex: 1; min-width: 200px; background-color: var(--gold); color: var(--navy-dark);">Tự dựng tổng & hiệu</button>
                <button id="btn-restart" class="btn btn-primary" style="flex: 2; min-width: 250px;">Chơi lại từ đầu</button>
            </div>
        </div>

        <div id="screen-explore" class="card hidden fade-in" style="max-width: 900px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="margin: 0; color: var(--teal); font-size: 1.5rem;">Tự dựng Tổng và Hiệu</h2>
                <button id="btn-close-explore" class="btn btn-secondary" style="padding: 0.5rem 1rem;">Đóng</button>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 1rem; font-size: 0.9rem;">Kéo điểm mút mũi tên (U, V) để đổi hướng/độ dài. Điểm gốc O cố định.</p>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--navy-light); padding-bottom: 1rem;">
                <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="radio" name="exp-mode" value="sum" checked> <span class="font-bold">Tổng <span class="vec">u</span> + <span class="vec">v</span></span>
                </label>
                <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="radio" name="exp-mode" value="diff"> <span class="font-bold">Hiệu <span class="vec">u</span> - <span class="vec">v</span></span>
                </label>
            </div>
            <div class="svg-container" style="background-color: #fff; padding: 0;">
                <svg id="exp-svg" viewBox="-150 -150 300 300" width="100%" height="350px" style="touch-action: none;">
                    <defs>
                        <marker id="arr-u" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
                        <marker id="arr-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/></marker>
                        <marker id="arr-res" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
                        <marker id="arr-neg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444"/></marker>
                    </defs>
                    <g id="exp-grid" stroke="#E2E8F0" stroke-width="0.5" stroke-dasharray="4 4"><line x1="-150" y1="0" x2="150" y2="0"/><line x1="0" y1="-150" x2="0" y2="150"/></g>
                    <g id="exp-helpers"></g>
                    <line id="exp-res" x1="0" y1="0" x2="0" y2="0" stroke="#10B981" stroke-width="3" marker-end="url(#arr-res)"/>
                    <line id="exp-u" x1="0" y1="0" x2="60" y2="-40" stroke="#3B82F6" stroke-width="3" marker-end="url(#arr-u)"/>
                    <line id="exp-v" x1="0" y1="0" x2="40" y2="50" stroke="#F59E0B" stroke-width="3" marker-end="url(#arr-v)"/>
                    <circle cx="0" cy="0" r="4" fill="#0A192F"/><text x="-12" y="12" class="svg-text-bold">O</text>
                    <circle id="exp-hu" cx="60" cy="-40" r="12" fill="transparent" class="drag-handle"/><text id="exp-tu" x="65" y="-45" class="svg-text-bold" fill="#3B82F6">U</text>
                    <circle id="exp-hv" cx="40" cy="50" r="12" fill="transparent" class="drag-handle"/><text id="exp-tv" x="45" y="55" class="svg-text-bold" fill="#F59E0B">V</text>
                </svg>
            </div>
            <div class="explore-panel">
                <div id="exp-sum-controls" style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-secondary btn-toggle-sum" data-val="para" style="border-color: var(--teal); color: var(--teal);">Hình bình hành</button>
                    <button class="btn btn-secondary btn-toggle-sum" data-val="tri">Nối tiếp</button>
                </div>
                <div id="exp-diff-controls" style="display: flex; gap: 1rem; justify-content: center; display: none;">
                    <button class="btn btn-secondary btn-toggle-diff" data-val="direct" style="border-color: var(--teal); color: var(--teal);">Hiệu trực tiếp</button>
                    <button class="btn btn-secondary btn-toggle-diff" data-val="opp">Cộng vectơ đối</button>
                </div>
                <div style="text-align: center; color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;" id="exp-status"></div>
            </div>
        </div>
    </main>

    <footer><p>Học Toán cùng Eliza Tâm Dương</p></footer>

    <script>
        const STAGES = ["Nối đường đi", "Thám tử phép toán", "Ghép mũi tên", "Về đích vectơ"];
        const VEC = (t) => \`<span class="vec">\${t}</span>\`;
        const MATH = (t) => \`<span class="math-normal">\${t}</span>\`;

        const QUESTION_BANK = [
            { id: 1, stage: 0, type: "mcq", svgReq: "tri_add", q: \`Với ba điểm A, B, C, tổng \${VEC('AB')} + \${VEC('BC')} bằng:\`, opts: [VEC('CA'), VEC('AC'), VEC('BA'), VEC('CB')], ans: VEC('AC'), exp: "Theo quy tắc ba điểm, đi từ A đến B rồi từ B đến C cho vectơ từ A đến C." },
            { id: 2, stage: 0, type: "mcq", svgReq: "para_add", q: \`Cho hình bình hành ABCD. Tổng \${VEC('AB')} + \${VEC('AD')} bằng:\`, opts: [VEC('BD'), VEC('CA'), VEC('AC'), VEC('DB')], ans: VEC('AC'), exp: "Tổng hai vectơ cạnh chung điểm đầu A là vectơ đường chéo AC." },
            { id: 3, stage: 0, type: "mcq", q: \`Vectơ đối của \${VEC('AB')} là:\`, opts: [VEC('BA'), VEC('AB'), \`Vectơ-không nếu A ≠ B\`, "Mọi vectơ có độ dài bằng AB"], ans: VEC('BA'), exp: \`Vectơ \${VEC('BA')} có cùng độ dài và ngược hướng với vectơ \${VEC('AB')} khi A ≠ B; nếu A = B, cả hai đều là vectơ-không.\` },
            { id: 4, stage: 0, type: "mcq", svgReq: "diff", q: \`Hiệu \${VEC('AB')} − \${VEC('AC')} bằng:\`, opts: [VEC('BC'), VEC('AC'), VEC('CA'), VEC('CB')], ans: VEC('CB'), exp: \`\${VEC('AB')} − \${VEC('AC')} = \${VEC('CA')} + \${VEC('AB')} = \${VEC('CB')}.\` },
            { id: 5, stage: 0, type: "mcq", q: \`Với mọi vectơ \${VEC('u')}, \${VEC('v')}, đẳng thức nào đúng?\`, opts: [\`\${VEC('u')} − \${VEC('v')} = \${VEC('v')} − \${VEC('u')}\`, \`\${VEC('u')} − \${VEC('v')} = \${VEC('u')} + (−\${VEC('v')})\`, \`\${VEC('u')} − \${VEC('v')} = \${VEC('v')} + (−\${VEC('u')})\`, \`\${VEC('u')} + \${VEC('v')} = \${VEC('u')} − \${VEC('v')}\`], ans: \`\${VEC('u')} − \${VEC('v')} = \${VEC('u')} + (−\${VEC('v')})\`, exp: \`Trừ vectơ \${VEC('v')} là cộng với vectơ đối của \${VEC('v')}.\` },
            { id: 6, stage: 1, type: "tf", q: \`“Với mọi vectơ \${VEC('u')}, \${VEC('v')}, ta có \${VEC('u')} + \${VEC('v')} = \${VEC('v')} + \${VEC('u')}.”\`, ans: "Đúng", exp: "Phép cộng vectơ có tính chất giao hoán." },
            { id: 7, stage: 1, type: "tf", q: \`“Với mọi vectơ \${VEC('u')}, ta có \${VEC('u')} + (−\${VEC('u')}) = vectơ-không.”\`, ans: "Đúng", exp: "Tổng của hai vectơ đối nhau là vectơ-không." },
            { id: 8, stage: 1, type: "tf", q: \`“Với mọi vectơ \${VEC('u')}, \${VEC('v')}, độ dài của \${VEC('u')} + \${VEC('v')} luôn bằng |\${VEC('u')}| + |\${VEC('v')}|.”\`, ans: "Sai", exp: "Chẳng hạn hai vectơ đối nhau, cùng có độ dài 3, có tổng bằng vectơ-không; độ dài tổng là 0, còn tổng độ dài là 6." },
            { id: 9, stage: 1, type: "tf", q: \`“Với ba điểm A, B, C, ta có \${VEC('AB')} − \${VEC('AC')} = \${VEC('BC')}.”\`, ans: "Sai", exp: \`Hiệu đúng là vectơ \${VEC('CB')}; cần chú ý chiều mũi tên.\` },
            { id: 10, stage: 1, type: "tf", q: \`“Nếu \${VEC('AB')} + \${VEC('BC')} = vectơ-không thì A và C trùng nhau.”\`, ans: "Đúng", exp: \`Tổng bằng vectơ \${VEC('AC')}. Vectơ \${VEC('AC')} là vectơ-không khi và chỉ khi A = C.\` },
            { id: 11, stage: 2, type: "dnd", layout: "list", q: "Ghép biểu thức với kết quả theo quy tắc ba điểm.", targets: [\`\${VEC('AB')} + \${VEC('BC')}\`, \`\${VEC('BC')} + \${VEC('CA')}\`, \`\${VEC('CA')} + \${VEC('AB')}\`], items: [VEC('AC'), VEC('BA'), VEC('CB')], pairs: { [\`\${VEC('AB')} + \${VEC('BC')}\`]: VEC('AC'), [\`\${VEC('BC')} + \${VEC('CA')}\`]: VEC('BA'), [\`\${VEC('CA')} + \${VEC('AB')}\`]: VEC('CB') }, exp: "Điểm cuối của vectơ thứ nhất trùng điểm đầu của vectơ thứ hai; kết quả nối điểm đầu đầu tiên với điểm cuối cuối cùng." },
            { id: 12, stage: 2, type: "dnd", layout: "list", q: "Cho hình bình hành ABCD. Ghép biểu thức với kết quả.", targets: [\`\${VEC('AB')} + \${VEC('AD')}\`, \`\${VEC('BA')} + \${VEC('BC')}\`, \`\${VEC('CB')} + \${VEC('CD')}\`, \`\${VEC('DA')} + \${VEC('DC')}\`], items: [VEC('AC'), VEC('BD'), VEC('CA'), VEC('DB')], pairs: { [\`\${VEC('AB')} + \${VEC('AD')}\`]: VEC('AC'), [\`\${VEC('BA')} + \${VEC('BC')}\`]: VEC('BD'), [\`\${VEC('CB')} + \${VEC('CD')}\`]: VEC('CA'), [\`\${VEC('DA')} + \${VEC('DC')}\`]: VEC('DB') }, exp: "Tại mỗi đỉnh, tổng hai vectơ hướng tới hai đỉnh kề là vectơ hướng tới đỉnh đối diện." },
            { id: 13, stage: 2, type: "dnd", layout: "list", q: "Ghép vectơ với vectơ đối.", targets: [VEC('AB'), VEC('BC'), VEC('AC'), "Vectơ-không"], items: [VEC('BA'), VEC('CB'), VEC('CA'), "Vectơ-không"], pairs: { [VEC('AB')]: VEC('BA'), [VEC('BC')]: VEC('CB'), [VEC('AC')]: VEC('CA'), "Vectơ-không": "Vectơ-không" }, exp: "Đổi điểm đầu và điểm cuối tạo vectơ đối; vectơ-không là vectơ đối của chính nó." },
            { id: 14, stage: 2, type: "dnd", layout: "list", q: "Ghép biểu thức hiệu với kết quả.", targets: [\`\${VEC('AB')} − \${VEC('AC')}\`, \`\${VEC('AC')} − \${VEC('AB')}\`, \`\${VEC('BA')} − \${VEC('BC')}\`, \`\${VEC('AB')} − \${VEC('AB')}\`], items: [VEC('CB'), VEC('BC'), VEC('CA'), "Vectơ-không"], pairs: { [\`\${VEC('AB')} − \${VEC('AC')}\`]: VEC('CB'), [\`\${VEC('AC')} − \${VEC('AB')}\`]: VEC('BC'), [\`\${VEC('BA')} − \${VEC('BC')}\`]: VEC('CA'), [\`\${VEC('AB')} − \${VEC('AB')}\`]: "Vectơ-không" }, exp: "Với hai vectơ chung điểm đầu, hiệu hướng từ điểm cuối của vectơ bị trừ đến điểm cuối của vectơ đứng trước dấu trừ." },
            { id: 15, stage: 2, type: "dnd", layout: "sort", q: \`Sắp xếp các bước dựng tổng \${VEC('u')} + \${VEC('v')}, với \${VEC('u')}, \${VEC('v')} là hai vectơ khác vectơ-không.\`, targets: ["Bước 1", "Bước 2", "Bước 3", "Bước 4"], items: [\`Chọn điểm A và dựng \${VEC('AB')} = \${VEC('u')}.\`, \`Từ B, dựng \${VEC('BC')} = \${VEC('v')}.\`, "Nối A với C và đặt mũi tên hướng từ A đến C.", \`Kết luận \${VEC('AC')} = \${VEC('u')} + \${VEC('v')}.\`], pairs: { "Bước 1": \`Chọn điểm A và dựng \${VEC('AB')} = \${VEC('u')}.\`, "Bước 2": \`Từ B, dựng \${VEC('BC')} = \${VEC('v')}.\`, "Bước 3": "Nối A với C và đặt mũi tên hướng từ A đến C.", "Bước 4": \`Kết luận \${VEC('AC')} = \${VEC('u')} + \${VEC('v')}.\` }, exp: "Khi chuyển vị trí vectơ để dựng hình, phải giữ nguyên hướng và độ dài." },
            { id: 16, stage: 3, type: "fill", svgReq: "tri_add", q: \`Với ba điểm A, B, C, điền tên điểm:<br><br>\${VEC('AB')} + \${VEC('BC')} = \${VEC('A<span class="fill-wrap">[INPUT]</span>')}\`, ansNorms: ["c"], dispAns: "C", exp: "Đây là quy tắc ba điểm." },
            { id: 17, stage: 3, type: "fill", svgReq: "para_add", q: \`Cho hình bình hành ABCD. Điền tên điểm:<br><br>\${VEC('AB')} + \${VEC('AD')} = \${VEC('A<span class="fill-wrap">[INPUT]</span>')}\`, ansNorms: ["c"], dispAns: "C", exp: "Đây là quy tắc hình bình hành." },
            { id: 18, stage: 3, type: "fill", svgReq: "diff", q: \`Điền tên điểm:<br><br>\${VEC('AB')} − \${VEC('AC')} = \${VEC('C<span class="fill-wrap">[INPUT]</span>')}\`, ansNorms: ["b"], dispAns: "B", exp: "Hiệu hướng từ C đến B, không phải từ B đến C." },
            { id: 19, stage: 3, type: "fill", q: \`Hai vectơ \${VEC('u')}, \${VEC('v')} cùng hướng, có độ dài lần lượt 3 cm và 5 cm. Độ dài vectơ \${VEC('u')} + \${VEC('v')} bằng [INPUT] cm.\`, ansNorms: ["8", "8.0"], dispAns: "8", exp: "Dựng nối tiếp hai vectơ cùng hướng, độ dài tổng bằng 3 + 5 = 8 cm." },
            { id: 20, stage: 3, type: "fill", svgReq: "robot", q: "Một robot đi từ A đến B dài 3 m về phía Đông, sau đó từ B đến C dài 4 m về phía Bắc. Độ dài vectơ dịch chuyển AC bằng [INPUT] m.", ansNorms: ["5", "5.0"], dispAns: "5", exp: "Hai hướng Đông và Bắc vuông góc nên AC = √(3² + 4²) = 5 m. Tổng quãng đường robot đi là 7 m, khác với độ dài vectơ dịch chuyển 5 m." }
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
            normStr: s => s.trim().toLowerCase().replace(/\\s+/g, '').replace(/,/g, '.')
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
                if(qHtml.includes('<span class="fill-wrap">')) { qHtml = qHtml.replace('[INPUT]', \`<input type="text" class="fill-input" autocomplete="off" style="width: 40px; border-bottom: 1px solid var(--text-muted); padding:0;">\`); }
                else { qHtml = qHtml.replace('[INPUT]', \`<input type="text" class="fill-input" autocomplete="off" inputmode="decimal">\`); }
                DOM.qText.innerHTML = qHtml; DOM.ansArea.innerHTML = \`<div style="text-align:center; color:var(--text-muted); font-size: 0.95rem; margin-top: 2rem;">Nhập đáp án vào ô trống phía trên.</div>\`;
                setTimeout(() => { let el = document.querySelector('.fill-input'); if(el) el.focus(); }, 100);
            } else {
                DOM.qText.innerHTML = qHtml;
                if (q.type === 'mcq') {
                    let opts = utils.shuffle(q.opts); let html = \`<div class="radio-group">\`;
                    opts.forEach(o => { html += \`<label class="radio-label"><input type="radio" name="mcq" value="\${utils.formatStr(o)}" class="radio-input"><div class="radio-dot"></div><div style="flex:1">\${o}</div></label>\`; });
                    DOM.ansArea.innerHTML = html + \`</div>\`;
                } else if (q.type === 'tf') {
                    DOM.ansArea.innerHTML = \`<div class="tf-grid"><label style="display:contents;"><input type="radio" name="tf" value="Đúng" class="radio-input"><div class="radio-label tf-label tf-true">ĐÚNG</div></label><label style="display:contents;"><input type="radio" name="tf" value="Sai" class="radio-input"><div class="radio-label tf-label tf-false">SAI</div></label></div>\`;
                } else if (q.type === 'dnd') {
                    DOM.btnResetDnd.classList.remove('hidden'); let items = utils.shuffle([...q.items]); let html = \`<div style="text-align:center; color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem; font-style:italic;">Chạm thẻ ở kho, sau đó chạm ô trống để đặt.</div><div class="dnd-target-list">\`;
                    if(q.layout === 'sort') { q.targets.forEach((t, i) => { html += \`<div class="dnd-row"><div style="font-weight:bold; color:var(--gold); margin-right:10px; width:20px; text-align:center;">\${i+1}</div><div class="dnd-slot" style="width:100%" data-tgt="\${utils.formatStr(t)}"></div></div>\`; }); }
                    else { q.targets.forEach(t => { html += \`<div class="dnd-row"><div class="dnd-desc">\${t}</div><div class="dnd-slot" data-tgt="\${utils.formatStr(t)}"></div></div>\`; }); }
                    html += \`</div><div class="dnd-pool" id="dnd-pool"><div style="width:100%; text-align:center; font-weight:bold; font-size:0.85rem; color:var(--teal); margin-bottom:0.5rem; flex-shrink:0;">KHO THẺ</div>\`;
                    items.forEach(item => html += \`<div class="dnd-item" data-val="\${utils.formatStr(item)}">\${item}</div>\`);
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
                if (q.ansNorms.includes(val) || (Number(val) === 8 && q.ansNorms.includes("8")) || (Number(val) === 5 && q.ansNorms.includes("5"))) { pts = 10; isFull = true; }
                inp.style.color = isFull ? "var(--success)" : "var(--danger)"; inp.style.borderColor = isFull ? "var(--success)" : "var(--danger)";
            } else if (q.type === 'dnd') {
                let slots = document.querySelectorAll('.dnd-slot'); let filled = Array.from(slots).filter(s => s.children.length > 0); if(filled.length < slots.length && !isTimeOut) { alert("Em hãy xếp đủ thẻ!"); return; } state.locked = true; DOM.btnResetDnd.classList.add('hidden'); document.querySelectorAll('.dnd-item').forEach(i => i.style.pointerEvents = 'none');
                let corr = 0; slots.forEach(s => { let tgt = s.getAttribute('data-tgt'); if(s.children.length > 0) { let itemVal = s.children[0].getAttribute('data-val'); let expected = utils.formatStr(q.pairs[tgt.replace(/&quot;/g, '"').replace(/&#39;/g, "'")]); if(itemVal === expected) { corr++; s.style.borderColor = "var(--success)"; s.style.background = "var(--success-dim)"; } else { s.style.borderColor = "var(--danger)"; s.style.background = "var(--danger-dim)"; } } else s.style.borderColor = "var(--danger)"; });
                pts = (corr / q.targets.length) * 10; if(corr === q.targets.length) isFull = true;
            }
            stopTimer(); if (!state.isReview) { state.score += pts; state.stageScores[q.stage] += pts; if(isFull) state.perfects++; else state.mistakes.push({q: q, pts: pts}); updateTopBar(); } showFeedback(q, pts, isFull, isTimeOut);
        }

        const SVG_DATA = {
            step: 0,
            draw(type, wrap) {
                let svg = \`<svg viewBox="0 0 300 200" width="100%" height="200px"><defs>
                    <marker id="arr-A" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
                    <marker id="arr-B" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/></marker>
                    <marker id="arr-R" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
                </defs>\`;
                const pt = (cx,cy,lbl,col) => \`<circle cx="\${cx}" cy="\${cy}" r="3" fill="\${col}"/><text x="\${cx-10}" y="\${cy+15}" class="svg-text-bold" fill="\${col}">\${lbl}</text>\`;
                const vec = (x1,y1,x2,y2,id) => \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="\${id==='R'?'#10B981':(id==='A'?'#3B82F6':'#F59E0B')}" stroke-width="\${id==='R'?3:2}" marker-end="url(#arr-\${id})"/>\`;
                const dash = (x1,y1,x2,y2) => \`<line x1="\${x1}" y1="\${y1}" x2="\${x2}" y2="\${y2}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>\`;
                if (type === "tri_add") {
                    let A = [50,150], B = [150,50], C = [250,150];
                    if (this.step >= 0) { svg += pt(...A, 'A', '#E2E8F0') + pt(...B, 'B', '#E2E8F0') + pt(...C, 'C', '#E2E8F0'); }
                    if (this.step >= 1) { svg += vec(...A, ...B, 'A') + vec(...B, ...C, 'B'); }
                    if (this.step >= 2) { svg += vec(...A, ...C, 'R'); svg += \`<text x="140" y="170" fill="#10B981" font-weight="bold">AB + BC = AC</text>\`; }
                } else if (type === "para_add") {
                    let A = [50,150], B = [180,150], D = [100,50], C = [230,50];
                    if (this.step >= 0) { svg += pt(...A,'A','#E2E8F0') + pt(...B,'B','#E2E8F0') + pt(...D,'D','#E2E8F0') + pt(...C,'C','#E2E8F0'); }
                    if (this.step >= 1) { svg += vec(...A, ...B, 'A') + vec(...A, ...D, 'B'); svg += dash(...B,...C) + dash(...D,...C); }
                    if (this.step >= 2) { svg += vec(...A, ...C, 'R'); svg += \`<text x="120" y="110" fill="#10B981" font-weight="bold">AC</text>\`; }
                } else if (type === "diff") {
                    let A = [150,150], B = [250,50], C = [50,50];
                    if (this.step >= 0) { svg += pt(...A,'A','#E2E8F0') + pt(...B,'B','#E2E8F0') + pt(...C,'C','#E2E8F0'); }
                    if (this.step >= 1) { svg += vec(...A, ...B, 'A') + vec(...A, ...C, 'B'); }
                    if (this.step >= 2) { svg += vec(...C, ...B, 'R'); svg += \`<text x="140" y="40" fill="#10B981" font-weight="bold">CB</text>\`; }
                } else if (type === "robot") {
                    let A = [80, 160], B = [170, 160], C = [170, 40];
                    svg += dash(160,160, 160,150) + dash(160,150, 170,150);
                    if (this.step >= 0) { svg += pt(...A,'A','#E2E8F0') + pt(...B,'B','#E2E8F0') + pt(...C,'C','#E2E8F0'); }
                    if (this.step >= 1) { svg += vec(...A,...B,'A') + vec(...B,...C,'B'); svg += \`<text x="110" y="180" fill="#3B82F6">3m (Đông)</text><text x="180" y="100" fill="#F59E0B">4m (Bắc)</text>\`; }
                    if (this.step >= 2) { svg += vec(...A,...C,'R'); svg += \`<text x="90" y="90" fill="#10B981" font-weight="bold">Độ dịch chuyển: 5m</text><text x="20" y="20" fill="#94A3B8" font-style="italic">Quãng đường: 7m</text>\`; }
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
                DOM.fbIll.classList.remove('hidden'); SVG_DATA.step = 1; SVG_DATA.draw(q.svgReq, DOM.svgWrap);
                DOM.btnDraw.onclick = () => { SVG_DATA.step = SVG_DATA.step === 1 ? 2 : 1; SVG_DATA.draw(q.svgReq, DOM.svgWrap); DOM.btnDraw.textContent = SVG_DATA.step === 2 ? "Ẩn bước kết quả" : "Xem cách dựng"; };
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
                adv.innerHTML = "💡 Lời khuyên: Hãy chú ý kỹ chiều mũi tên khi nối vectơ và ghi nhớ cách lấy vectơ đối để thực hiện phép trừ nhé!";
                document.getElementById('review-section').classList.remove('hidden'); document.getElementById('btn-review').classList.remove('hidden');
                let rl = ""; state.mistakes.forEach(m => rl += \`<div style="background:var(--navy-dark); padding:1rem; border-radius:8px; border-left:3px solid var(--gold);"><strong>Câu \${m.q.id}:</strong> \${m.q.q.replace(/<input[^>]*>/, '___')}</div>\`);
                document.getElementById('review-list').innerHTML = rl;
            } else { adv.innerHTML = "🏆 Tuyệt đỉnh! Em đã nắm rất vững quy tắc ba điểm và quy tắc hình bình hành!"; document.getElementById('review-section').classList.add('hidden'); document.getElementById('btn-review').classList.add('hidden'); }
        }

        document.getElementById('btn-review').onclick = () => { state.isReview = true; state.revList = [...state.mistakes]; state.revIdx = 0; utils.hideAll(); DOM.header.classList.remove('hidden'); DOM.sGame.classList.remove('hidden'); document.getElementById('timer-display').classList.add('hidden'); renderQuestion(); };

        const Explore = {
            svg: null, mode: 'sum', subMode: 'para', u: {x: 60, y: -40}, v: {x: 40, y: 50}, activeNode: null,
            init() { utils.hideAll(); DOM.sExp.classList.remove('hidden'); this.svg = document.getElementById('exp-svg'); this.bindEvents(); this.updateView(); },
            getMouse(e) { let pt = this.svg.createSVGPoint(); if(e.touches) { pt.x = e.touches[0].clientX; pt.y = e.touches[0].clientY; } else { pt.x = e.clientX; pt.y = e.clientY; } return pt.matrixTransform(this.svg.getScreenCTM().inverse()); },
            bindEvents() {
                const startDrag = (e, node) => { e.preventDefault(); this.activeNode = node; };
                document.getElementById('exp-hu').onpointerdown = (e) => startDrag(e, 'u');
                document.getElementById('exp-hv').onpointerdown = (e) => startDrag(e, 'v');
                this.svg.onpointermove = (e) => { if(!this.activeNode) return; e.preventDefault(); let pt = this.getMouse(e); if(Math.hypot(pt.x, pt.y) > 10) { this[this.activeNode].x = pt.x; this[this.activeNode].y = pt.y; this.updateView(); } };
                window.onpointerup = () => { this.activeNode = null; };
                document.querySelectorAll('input[name="exp-mode"]').forEach(r => r.onchange = (e) => { this.mode = e.target.value; document.getElementById('exp-sum-controls').style.display = this.mode === 'sum' ? 'flex' : 'none'; document.getElementById('exp-diff-controls').style.display = this.mode === 'diff' ? 'flex' : 'none'; this.subMode = this.mode === 'sum' ? 'para' : 'direct'; this.updateButtons(); this.updateView(); });
                document.querySelectorAll('.btn-toggle-sum').forEach(b => b.onclick = (e) => { this.subMode = e.target.getAttribute('data-val'); this.updateButtons(); this.updateView(); });
                document.querySelectorAll('.btn-toggle-diff').forEach(b => b.onclick = (e) => { this.subMode = e.target.getAttribute('data-val'); this.updateButtons(); this.updateView(); });
                document.getElementById('btn-close-explore').onclick = () => { utils.hideAll(); DOM.sFinal.classList.remove('hidden'); };
            },
            updateButtons() {
                const updateCls = (selector, val) => { document.querySelectorAll(selector).forEach(b => { if(b.getAttribute('data-val') === val) { b.style.borderColor = "var(--teal)"; b.style.color = "var(--teal)"; } else { b.style.borderColor = ""; b.style.color = ""; } }); };
                if(this.mode === 'sum') updateCls('.btn-toggle-sum', this.subMode); else updateCls('.btn-toggle-diff', this.subMode);
            },
            updateView() {
                document.getElementById('exp-u').setAttribute('x2', this.u.x); document.getElementById('exp-u').setAttribute('y2', this.u.y);
                document.getElementById('exp-hu').setAttribute('cx', this.u.x); document.getElementById('exp-hu').setAttribute('cy', this.u.y);
                document.getElementById('exp-tu').setAttribute('x', this.u.x+5); document.getElementById('exp-tu').setAttribute('y', this.u.y-5);
                const vLine = document.getElementById('exp-v'); const helpers = document.getElementById('exp-helpers');
                let hHtml = ""; let resLine = document.getElementById('exp-res'); let statusText = "";
                if (this.mode === 'sum') {
                    let rx = this.u.x + this.v.x, ry = this.u.y + this.v.y;
                    if (this.subMode === 'para') {
                        vLine.setAttribute('x1', 0); vLine.setAttribute('y1', 0); vLine.setAttribute('x2', this.v.x); vLine.setAttribute('y2', this.v.y);
                        hHtml += \`<line x1="\${this.u.x}" y1="\${this.u.y}" x2="\${rx}" y2="\${ry}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>\`;
                        hHtml += \`<line x1="\${this.v.x}" y1="\${this.v.y}" x2="\${rx}" y2="\${ry}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>\`;
                        statusText = "Dựng hình bình hành: Đường chéo từ gốc O.";
                    } else {
                        vLine.setAttribute('x1', this.u.x); vLine.setAttribute('y1', this.u.y); vLine.setAttribute('x2', rx); vLine.setAttribute('y2', ry);
                        statusText = "Quy tắc 3 điểm: Nối điểm cuối u với điểm đầu v.";
                    }
                    resLine.setAttribute('x1', 0); resLine.setAttribute('y1', 0); resLine.setAttribute('x2', rx); resLine.setAttribute('y2', ry);
                    document.getElementById('exp-hv').setAttribute('cx', this.subMode==='tri'?rx:this.v.x); document.getElementById('exp-hv').setAttribute('cy', this.subMode==='tri'?ry:this.v.y);
                    document.getElementById('exp-tv').setAttribute('x', (this.subMode==='tri'?rx:this.v.x)+5); document.getElementById('exp-tv').setAttribute('y', (this.subMode==='tri'?ry:this.v.y)+5);
                    if(Math.hypot(rx, ry) < 5) statusText += " (Tổng bằng vectơ-không)";
                } else {
                    let rx = this.u.x - this.v.x, ry = this.u.y - this.v.y;
                    vLine.setAttribute('x1', 0); vLine.setAttribute('y1', 0); vLine.setAttribute('x2', this.v.x); vLine.setAttribute('y2', this.v.y);
                    document.getElementById('exp-hv').setAttribute('cx', this.v.x); document.getElementById('exp-hv').setAttribute('cy', this.v.y);
                    document.getElementById('exp-tv').setAttribute('x', this.v.x+5); document.getElementById('exp-tv').setAttribute('y', this.v.y+5);
                    if (this.subMode === 'direct') {
                        resLine.setAttribute('x1', this.v.x); resLine.setAttribute('y1', this.v.y); resLine.setAttribute('x2', this.u.x); resLine.setAttribute('y2', this.u.y);
                        statusText = "Quy tắc hiệu: Hướng từ ngọn V đến ngọn U.";
                    } else {
                        hHtml += \`<line x1="0" y1="0" x2="\${-this.v.x}" y2="\${-this.v.y}" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arr-neg)"/>\`;
                        hHtml += \`<text x="\${-this.v.x-15}" y="\${-this.v.y+15}" fill="#EF4444" font-weight="bold">-v</text>\`;
                        hHtml += \`<line x1="\${this.u.x}" y1="\${this.u.y}" x2="\${rx}" y2="\${ry}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>\`;
                        hHtml += \`<line x1="\${-this.v.x}" y1="\${-this.v.y}" x2="\${rx}" y2="\${ry}" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>\`;
                        resLine.setAttribute('x1', 0); resLine.setAttribute('y1', 0); resLine.setAttribute('x2', rx); resLine.setAttribute('y2', ry);
                        statusText = "Cộng vectơ đối: u - v = u + (-v).";
                    }
                    if(Math.hypot(rx, ry) < 5) statusText += " (Hiệu bằng vectơ-không)";
                }
                helpers.innerHTML = hHtml; document.getElementById('exp-status').textContent = statusText;
            }
        };
        document.getElementById('btn-explore').onclick = () => Explore.init();
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(gamesDir, 'game-08-tong-hieu-vector.html'), g8);
console.log('Wrote game-08-tong-hieu-vector.html');
