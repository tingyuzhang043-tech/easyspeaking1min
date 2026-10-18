/* ===========================================================
   app.js — EasySpeaking1Min 主逻辑
   抽题机 · 60 秒倒计时 · TWIST 意外事件 · 录音复盘 · 打卡统计
   =========================================================== */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const RING_C = 2 * Math.PI * 106;
  const KEY_SET = 'es1m.settings';
  const KEY_STATS = 'es1m.stats';

  /* ---------------- 界面文案 ---------------- */
  const T = {
    en: {
      draw: 'DRAW A TOPIC', reroll: 'REROLL', start: 'START 60s',
      skip: 'SKIP PREP', abort: 'END ROUND', prepHint: 'Plan what you will say',
      speakHint: 'Speak. Do not stop.', empty: 'Press the button to draw a cue card',
      again: 'SAME TOPIC', newTopic: 'NEW TOPIC'
    },
    zh: {
      draw: '抽取话题', reroll: '换一个', start: '开始 60 秒',
      skip: '跳过准备', abort: '结束本轮', prepHint: '想好你要说什么',
      speakHint: '开口说，别停', empty: '按下按钮，抽一张话题卡',
      again: '同一话题再来', newTopic: '换一个话题'
    }
  };

  /* ---------------- 存储 ---------------- */
  const DEFAULT_SET = { prep: 15, speak: 60, twist: true, intensity: 2, rec: false, sound: true, lang: 'en' };

  function load(key, fallback) {
    try { return Object.assign({}, fallback, JSON.parse(localStorage.getItem(key) || '{}')); }
    catch (e) { return Object.assign({}, fallback); }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* 忽略隐私模式 */ }
  }

  let settings = load(KEY_SET, DEFAULT_SET);
  let stats = load(KEY_STATS, { total: 0, streak: 0, lastDate: '', todayCount: 0, todayDate: '' });

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function bumpStats() {
    const today = todayStr();
    if (stats.todayDate !== today) { stats.todayDate = today; stats.todayCount = 0; }
    stats.todayCount += 1;
    stats.total += 1;
    if (stats.lastDate !== today) {
      const y = new Date(Date.now() - 86400000);
      const yStr = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
      stats.streak = stats.lastDate === yStr ? stats.streak + 1 : 1;
      stats.lastDate = today;
    }
    save(KEY_STATS, stats);
    renderStats();
  }

  /* ---------------- 音效（Web Audio，无外部资源） ---------------- */
  const Sfx = {
    ctx: null,
    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        this.ctx = new AC();
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },
    tone(freq, dur, type, vol, slideTo) {
      if (!settings.sound) return;
      const ctx = this.ensure();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, ctx.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + dur);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur + 0.03);
    },
    tick(urgent) { this.tone(urgent ? 1180 : 720, 0.055, 'triangle', urgent ? 0.15 : 0.06); },
    roll() { this.tone(240, 0.04, 'square', 0.035); },
    twist() { this.tone(700, 0.34, 'sawtooth', 0.09, 160); },
    go() { this.tone(420, 0.2, 'sine', 0.11, 780); },
    end() { [523, 659, 784].forEach((f, i) => setTimeout(() => this.tone(f, 0.5, 'sine', 0.11), i * 100)); }
  };

  /* ---------------- 运行时状态 ---------------- */
  let currentCat = 'all';
  let currentTopic = null;
  let lastTopicEn = '';

  const run = {
    phase: 'idle',   // idle | prep | speak
    totalMs: 0,
    endAt: 0,
    startAt: 0,
    raf: 0,
    lastSec: -1,
    twistPoints: [],
    twistQueue: [],
    fired: [],
    spokeSec: 0
  };

  function showView(id) {
    $$('.view').forEach((v) => v.classList.remove('is-active'));
    $('#' + id).classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------- 首页：分类与抽题 ---------------- */
  function renderFilters() {
    const box = $('#filters');
    box.innerHTML = '';
    CATEGORIES.forEach((c) => {
      const n = c.id === 'all' ? TOPICS.length : TOPICS.filter((t) => t.c === c.id).length;
      const b = document.createElement('button');
      b.className = 'chip' + (c.id === currentCat ? ' on' : '');
      b.innerHTML = `<span>${c.ico}</span>${c.label}<span class="n">${n}</span>`;
      b.onclick = () => { currentCat = c.id; renderFilters(); resetSlot(); };
      box.appendChild(b);
    });
  }

  function pool() {
    return currentCat === 'all' ? TOPICS : TOPICS.filter((t) => t.c === currentCat);
  }

  function resetSlot() {
    currentTopic = null;
    $('#slotCard').dataset.state = 'empty';
    $('#btnReroll').disabled = true;
    $('#btnStart').disabled = true;
  }

  function drawTopic() {
    const list = pool();
    if (!list.length) return;
    let t = list[Math.floor(Math.random() * list.length)];
    if (list.length > 1 && t.en === lastTopicEn) t = list[Math.floor(Math.random() * list.length)];
    lastTopicEn = t.en;

    const card = $('#slotCard');
    card.dataset.state = 'rolling';
    $('#btnDraw').disabled = true;
    $('#btnReroll').disabled = true;
    $('#btnStart').disabled = true;

    let frames = 0;
    const roll = setInterval(() => {
      $('#rollText').textContent = list[Math.floor(Math.random() * list.length)].en;
      Sfx.roll();
      if (++frames >= 16) {
        clearInterval(roll);
        currentTopic = t;
        paintTopic(t);
        card.dataset.state = 'result';
        $('#btnDraw').disabled = false;
        $('#btnReroll').disabled = false;
        $('#btnStart').disabled = false;
        Sfx.go();
      }
    }, 62);
  }

  function cueHtml(t) {
    return t.cues.map((c) => {
      const parts = c.split('·').map((s) => s.trim());
      return `<li><b>${parts[0]}</b>${parts[1] ? ' · ' + parts[1] : ''}</li>`;
    }).join('');
  }

  function paintTopic(t) {
    const cat = CATEGORIES.find((c) => c.id === t.c) || { label: 'TOPIC' };
    const idx = TOPICS.indexOf(t);
    $('#slotCat').textContent = cat.label;
    $('#slotIdx').textContent = idx >= 0
      ? `#${String(idx + 1).padStart(2, '0')} / ${TOPICS.length}`
      : 'CUSTOM · 自定义话题';
    $('#slotTopic').textContent = t.en;
    $('#slotCn').textContent = t.cn;
    $('#slotCues').innerHTML = cueHtml(t);
  }

  /* ---------------- 自定义话题 ---------------- */
  function useCustomTopic() {
    const raw = ($('#customInput').value || '').trim();
    if (!raw) { toast('先写点什么再开讲'); return; }
    const t = {
      c: 'viral',
      en: raw,
      cn: '自定义话题',
      cues: ['what it is · 先说清是什么', 'your reaction · 你的第一反应',
             'why it spreads · 为什么传得开', 'your verdict · 你怎么评价']
    };
    currentTopic = t;
    paintTopic(t);
    $('#slotCard').dataset.state = 'result';
    $('#btnReroll').disabled = true;   // 自定义题不参与换一个
    $('#btnStart').disabled = false;
    Sfx.go();
  }

  /* ---------------- 统计展示 ---------------- */
  function renderStats() {
    $('#statText').textContent = stats.streak > 0
      ? `${stats.streak}d streak · ${stats.total} runs`
      : `${stats.total} runs`;
    $('#mTotal').textContent = stats.total;
    $('#streakBar').innerHTML =
      `<div><span>${stats.total}</span><em>累计练习</em></div>` +
      `<div><span>${stats.streak}</span><em>连续天数</em></div>` +
      `<div><span>${stats.todayDate === todayStr() ? stats.todayCount : 0}</span><em>今日次数</em></div>`;
  }

  /* ---------------- 录音 ---------------- */
  let recorder = null;
  let chunks = [];
  let recUrl = '';

  function startRec() {
    if (!settings.rec) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      toast('当前浏览器不支持录音');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      chunks = [];
      const MR = window.MediaRecorder;
      recorder = new MR(stream, { mimeType: MR.isTypeSupported('audio/webm') ? 'audio/webm' : '' });
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (!chunks.length) return;
        const blob = new Blob(chunks, { type: chunks[0].type || 'audio/webm' });
        if (recUrl) URL.revokeObjectURL(recUrl);
        recUrl = URL.createObjectURL(blob);
        $('#audioPlayback').src = recUrl;
        const slug = (currentTopic ? currentTopic.en : 'take').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
        $('#btnDownload').download = `easyspeaking1min-${slug}.webm`;
        $('#btnDownload').href = recUrl;
        $('#recorderBox').hidden = false;
      };
      recorder.start();
      $('#recChip').hidden = false;
    }).catch(() => toast('麦克风未授权，本轮不录音'));
  }

  function stopRec() {
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    recorder = null;
    $('#recChip').hidden = true;
  }

  /* ---------------- 计时流程 ---------------- */
  function beginRun() {
    if (!currentTopic) return;
    Sfx.ensure();

    const cat = CATEGORIES.find((c) => c.id === currentTopic.c) || { label: 'TOPIC' };
    $('#stageCat').textContent = cat.label;
    $('#stageTopic').textContent = currentTopic.en;
    $('#stageCues').innerHTML = cueHtml(currentTopic);
    $('#twistLog').innerHTML = '<li class="twist-log-empty">等待中…</li>';
    $('#recorderBox').hidden = true;

    run.fired = [];
    run.spokeSec = 0;
    showView('viewStage');

    if (settings.prep > 0) startPhase('prep', settings.prep);
    else startPhase('speak', settings.speak);
  }

  function startPhase(phase, seconds) {
    run.phase = phase;
    run.totalMs = seconds * 1000;
    run.startAt = performance.now();
    run.endAt = run.startAt + run.totalMs;
    run.lastSec = -1;

    const wrap = $('.timer-wrap');
    wrap.classList.toggle('is-prep', phase === 'prep');
    wrap.classList.remove('is-urgent');
    $('#phaseTag').textContent = phase === 'prep' ? 'PREP' : 'SPEAK';
    $('#timerHint').textContent = phase === 'prep'
      ? T[settings.lang].prepHint : T[settings.lang].speakHint;
    $('#btnSkipPrep').hidden = phase !== 'prep';
    $('#ringFg').style.strokeDasharray = RING_C;

    if (phase === 'speak') {
      buildTwists(seconds);
      startRec();
      Sfx.go();
    }

    cancelAnimationFrame(run.raf);
    run.raf = requestAnimationFrame(tick);
  }

  function tick() {
    const now = performance.now();
    let remain = run.endAt - now;
    if (remain < 0) remain = 0;

    const ratio = run.totalMs > 0 ? Math.min(1, Math.max(0, remain / run.totalMs)) : 0;
    $('#ringFg').style.strokeDashoffset = RING_C * (1 - ratio);

    const sec = Math.ceil(remain / 1000);
    $('#timerNum').textContent = sec;

    if (sec !== run.lastSec) {
      run.lastSec = sec;
      if (run.phase === 'speak' && sec <= 10 && sec > 0) Sfx.tick(true);
      else if (sec <= 5 || sec % 10 === 0) Sfx.tick(false);
    }

    $('.timer-wrap').classList.toggle('is-urgent', run.phase === 'speak' && remain <= 10000);

    if (run.phase === 'speak') checkTwists();

    if (remain <= 0) {
      cancelAnimationFrame(run.raf);
      if (run.phase === 'prep') startPhase('speak', settings.speak);
      else finish(true);
      return;
    }
    run.raf = requestAnimationFrame(tick);
  }

  /* ---------------- TWIST 意外事件 ---------------- */
  function buildTwists(durationSec) {
    run.twistPoints = [];
    run.twistQueue = [];
    if (!settings.twist) return;

    const count = Math.max(1, Math.min(3, settings.intensity));
    const from = Math.min(8, durationSec * 0.22);
    const to = durationSec - Math.min(12, durationSec * 0.25);
    if (to <= from) return;

    const seg = (to - from) / count;
    for (let i = 0; i < count; i++) run.twistPoints.push(from + seg * i + Math.random() * seg * 0.85);
    run.twistPoints.sort((a, b) => a - b);

    // 强度 1 只出语言类；强度 2/3 才解锁身体挑战类（避免开局就崩）
    const allowBody = settings.intensity >= 2;
    const src = TWISTS.filter((t) => !t.body || allowBody);
    const bag = src.slice().sort(() => Math.random() - 0.5);
    run.twistQueue = bag.slice(0, run.twistPoints.length);
  }

  function checkTwists() {
    while (run.twistPoints.length && ((performance.now() - run.startAt) / 1000) >= run.twistPoints[0]) {
      run.twistPoints.shift();
      fireTwist(run.twistQueue.shift());
    }
  }

  function fireTwist(t) {
    if (!t) return;
    run.fired.push(t);

    const desc = t.desc();
    $('#twistIco').textContent = t.ico;
    $('#twistKind').textContent = t.kind;
    $('#twistHead').textContent = t.head;
    const d = $('#twistDesc');
    d.textContent = desc;
    d.classList.toggle('big', !!(t.big || t.id === 'word' || t.id === 'emotion'));

    const ov = $('#twistOverlay');
    ov.classList.remove('out');
    ov.classList.add('show');
    Sfx.twist();

    if (t.cls) {
      document.body.classList.add(t.cls);
      setTimeout(() => document.body.classList.remove(t.cls), 950);
    }
    if (t.delta) {
      run.endAt += t.delta * 1000;
      if (t.delta > 0) run.totalMs += t.delta * 1000;
      if (run.endAt - performance.now() < 0) run.endAt = performance.now();
      $('#timerHint').textContent = t.delta > 0 ? '+15s bonus!' : '-10s stolen!';
    }
    if (t.body) {
      $('#timerHint').textContent = 'MOVE! 动起来 · 别停';
    }

    const log = $('#twistLog');
    const empty = log.querySelector('.twist-log-empty');
    if (empty) log.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = `<span class="t-ico">${t.ico}</span><span><b>${t.kind}</b> · ${desc}</span>`;
    log.appendChild(li);

    setTimeout(() => {
      ov.classList.add('out');
      setTimeout(() => ov.classList.remove('show', 'out'), 300);
    }, 2100);
  }

  /* ---------------- 结束与分享 ---------------- */
  function finish(completed) {
    const wasPrep = run.phase === 'prep';
    cancelAnimationFrame(run.raf);
    run.phase = 'idle';
    stopRec();

    run.spokeSec = wasPrep ? 0 : Math.max(0, Math.round((performance.now() - run.startAt) / 1000));
    bumpStats();

    $('#resultBadge').textContent = completed ? 'TIME!' : 'STOPPED';
    $('#resultTitle').textContent = completed
      ? `${settings.speak} 秒，说完了`
      : `提前结束 · 说了 ${run.spokeSec} 秒`;
    $('#resultSub').textContent = currentTopic ? currentTopic.en : '';
    $('#mSpoke').textContent = run.spokeSec;
    $('#mTwist').textContent = run.fired.length;
    $('#mTotal').textContent = stats.total;
    $('#shareText').value = buildShare();

    Sfx.end();
    showView('viewResult');
  }

  function buildShare() {
    const t = currentTopic || { en: '', cn: '', c: '' };
    const cat = CATEGORIES.find((c) => c.id === t.c);
    return [
      `🎤 EasySpeaking1Min · Day ${Math.max(1, stats.streak)}`,
      `Topic (${cat ? cat.label : 'TOPIC'}): ${t.en}`,
      t.cn || '',
      `${run.spokeSec}s impromptu speaking — no script, no pause.`,
      run.fired.length ? `Twists survived: ${run.fired.map((x) => x.ico).join(' ')}` : '',
      '',
      '#雅思口语 #一分钟即兴演讲 #英语口语 #IELTSSpeaking #口语打卡'
    ].filter((l) => l !== '').join('\n');
  }

  /* ---------------- Toast ---------------- */
  let toastTimer = 0;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* ---------------- 设置 ---------------- */
  function bindSeg(sel, key, cast) {
    $$(`${sel} button`).forEach((b) => {
      b.onclick = () => {
        if (b.disabled) { toast('该语种即将上线'); return; }
        $$(`${sel} button`).forEach((x) => x.classList.remove('on'));
        b.classList.add('on');
        settings[key] = cast === Number ? Number(b.dataset.v) : b.dataset.v;
        save(KEY_SET, settings);
        if (key === 'lang') applyLang();
      };
    });
  }

  function setSeg(sel, val) {
    $$(`${sel} button`).forEach((b) => b.classList.toggle('on', b.dataset.v === String(val)));
  }

  function bindSwitch(sel, key) {
    const el = $(sel);
    el.onclick = () => {
      const on = !el.classList.contains('on');
      el.classList.toggle('on', on);
      el.setAttribute('aria-checked', String(on));
      settings[key] = on;
      save(KEY_SET, settings);
    };
  }

  function applyLang() {
    const t = T[settings.lang] || T.en;
    $('#btnDraw').innerHTML = `<span class="btn-ico">◈</span> ${t.draw}`;
    $('#btnReroll').textContent = `↻ ${t.reroll}`;
    $('#btnStart').textContent = `${t.start} ▶`;
    $('#btnSkipPrep').textContent = `${t.skip} →`;
    $('#btnAbort').textContent = t.abort;
    $('#btnAgain').textContent = `${t.again} ▸`;
    $('#btnNew').textContent = `${t.newTopic} ↻`;
    $('#slotCard .slot-empty p').textContent = t.empty;
    if (run.phase !== 'idle') {
      $('#timerHint').textContent = run.phase === 'prep' ? t.prepHint : t.speakHint;
    }
    document.documentElement.lang = settings.lang === 'zh' ? 'zh-CN' : 'en';
  }

  /* ---------------- 事件绑定 ---------------- */
  function bind() {
    $('#btnUseCustom').onclick = useCustomTopic;
    $('#customInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); useCustomTopic(); }
    });


    $('#btnDraw').onclick = () => { Sfx.ensure(); drawTopic(); };
    $('#btnReroll').onclick = () => drawTopic();
    $('#btnStart').onclick = () => beginRun();

    $('#btnSkipPrep').onclick = () => {
      cancelAnimationFrame(run.raf);
      startPhase('speak', settings.speak);
    };
    $('#btnAbort').onclick = () => finish(false);
    $('#btnQuit').onclick = () => {
      cancelAnimationFrame(run.raf);
      run.phase = 'idle';
      stopRec();
      showView('viewHome');
    };

    $('#btnAgain').onclick = () => beginRun();
    $('#btnNew').onclick = () => { showView('viewHome'); drawTopic(); };

    $('#btnCopyShare').onclick = () => {
      const ta = $('#shareText');
      const done = () => toast('文案已复制，去发吧');
      const fallback = () => {
        ta.removeAttribute('readonly');
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { toast('请手动长按复制'); }
        ta.setAttribute('readonly', 'readonly');
        if (window.getSelection) window.getSelection().removeAllRanges();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ta.value).then(done).catch(fallback);
      } else {
        fallback();
      }
    };
    $('#btnDownload').onclick = () => toast('录音已保存到本地');

    $('#btnSettings').onclick = () => $('#settingsModal').classList.add('show');
    $('#btnCloseSettings').onclick = () => $('#settingsModal').classList.remove('show');
    $('#settingsModal').onclick = (e) => {
      if (e.target === $('#settingsModal')) $('#settingsModal').classList.remove('show');
    };

    bindSeg('#segPrep', 'prep', Number);
    bindSeg('#segSpeak', 'speak', Number);
    bindSeg('#segIntensity', 'intensity', Number);
    bindSeg('#segLang', 'lang', String);
    bindSwitch('#swTwist', 'twist');
    bindSwitch('#swRec', 'rec');
    bindSwitch('#swSound', 'sound');

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        $('#settingsModal').classList.remove('show');
        if (run.phase !== 'idle') $('#btnQuit').click();
        return;
      }
      const tag = e.target.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if ($('#settingsModal').classList.contains('show')) return;
        if ($('#viewHome').classList.contains('is-active')) {
          if (currentTopic) beginRun(); else drawTopic();
        }
      }
    });
  }

  /* ---------------- 初始化 ---------------- */
  function init() {
    renderFilters();
    renderStats();
    resetSlot();

    setSeg('#segPrep', settings.prep);
    setSeg('#segSpeak', settings.speak);
    setSeg('#segIntensity', settings.intensity);
    setSeg('#segLang', settings.lang);

    [['#swTwist', 'twist'], ['#swRec', 'rec'], ['#swSound', 'sound']].forEach(([sel, key]) => {
      $(sel).classList.toggle('on', !!settings[key]);
      $(sel).setAttribute('aria-checked', String(!!settings[key]));
    });

    $('#ringFg').style.strokeDasharray = RING_C;
    $('#ringFg').style.strokeDashoffset = 0;

    bind();
    applyLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
