/* London Market Academy — app engine */
(function () {
  'use strict';

  var MODULES = window.LMA_MODULES || [];
  var GLOSSARY = window.LMA_GLOSSARY || [];
  var STORE_KEY = 'lma-progress-v1';

  /* ---------- state ---------- */

  function defaultState() {
    return {
      lessonsRead: {},      // "modId/lessonId" -> true
      quizBest: {},         // "modId/lessonId" -> { pct, right, total }
      numericRight: 0,      // running count of correctly answered numeric questions
      perfectCount: 0,      // number of quizzes ever finished at 100%
      studyDays: [],        // ISO dates on which something was completed
      achievements: {},     // achId -> ISO timestamp
      mapsViewed: {},       // mapId -> true
      mapQuizBest: {}       // mapId -> { pct, right, total }
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      var d = defaultState();
      for (var k in d) if (!(k in s)) s[k] = d[k];
      return s;
    } catch (e) { return defaultState(); }
  }

  var state = loadState();

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function markStudyDay() {
    var today = new Date().toISOString().slice(0, 10);
    if (state.studyDays.indexOf(today) === -1) state.studyDays.push(today);
  }

  /* ---------- helpers ---------- */

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function app() { return document.getElementById('app'); }
  function keyFor(mod, lesson) { return mod.id + '/' + lesson.id; }

  function plainText(html) {
    var d = document.createElement('div'); d.innerHTML = html; return d.textContent || '';
  }

  function currentStreak() {
    var days = {};
    state.studyDays.forEach(function (d) { days[d] = true; });
    var n = 0, d = new Date();
    function iso(x) { return x.toISOString().slice(0, 10); }
    if (!days[iso(d)]) d.setDate(d.getDate() - 1); // streak alive if studied yesterday
    while (days[iso(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function findModule(id) {
    for (var i = 0; i < MODULES.length; i++) if (MODULES[i].id === id) return MODULES[i];
    return null;
  }

  function moduleProgress(mod) {
    var read = 0, quizzed = 0, n = mod.lessons.length;
    mod.lessons.forEach(function (l) {
      var k = keyFor(mod, l);
      if (state.lessonsRead[k]) read++;
      var b = state.quizBest[k];
      if (b && b.pct >= 70) quizzed++;
    });
    return { read: read, quizzed: quizzed, total: n, done: (read === n && quizzed === n) };
  }

  function totals() {
    var lessons = 0, read = 0, passed = 0, quizzes = 0;
    MODULES.forEach(function (m) {
      var p = moduleProgress(m);
      lessons += p.total; read += p.read; passed += p.quizzed; quizzes += p.total;
    });
    return { lessons: lessons, read: read, passed: passed, quizzes: quizzes };
  }

  /* ---------- achievements ---------- */

  function passedQuizCount() {
    var n = 0;
    for (var k in state.quizBest) if (state.quizBest[k].pct >= 70) n++;
    return n;
  }
  function modulesMastered() {
    var n = 0;
    MODULES.forEach(function (m) { if (moduleProgress(m).done) n++; });
    return n;
  }
  function lessonsReadCount() { return Object.keys(state.lessonsRead).length; }

  var ACHIEVEMENTS = [
    { id: 'first-lesson', icon: '🌱', name: 'First Steps',
      desc: 'Complete your first lesson.',
      test: function () { return lessonsReadCount() >= 1; } },
    { id: 'first-quiz', icon: '✅', name: 'Signed Line',
      desc: 'Pass your first quiz with 70% or more.',
      test: function () { return passedQuizCount() >= 1; } },
    { id: 'lessons-10', icon: '📖', name: 'Bookworm',
      desc: 'Read 10 lessons.',
      test: function () { return lessonsReadCount() >= 10; },
      prog: function () { return [Math.min(lessonsReadCount(), 10), 10]; } },
    { id: 'lessons-25', icon: '📚', name: 'Deep Diver',
      desc: 'Read 25 lessons.',
      test: function () { return lessonsReadCount() >= 25; },
      prog: function () { return [Math.min(lessonsReadCount(), 25), 25]; } },
    { id: 'quiz-10', icon: '🖊️', name: 'Ten Lines Signed',
      desc: 'Pass 10 quizzes.',
      test: function () { return passedQuizCount() >= 10; },
      prog: function () { return [Math.min(passedQuizCount(), 10), 10]; } },
    { id: 'quiz-30', icon: '🏛️', name: 'Market Veteran',
      desc: 'Pass 30 quizzes.',
      test: function () { return passedQuizCount() >= 30; },
      prog: function () { return [Math.min(passedQuizCount(), 30), 30]; } },
    { id: 'perfect', icon: '🎯', name: 'Clean Slip',
      desc: 'Score 100% on any quiz.',
      test: function () { return state.perfectCount >= 1; } },
    { id: 'perfect-5', icon: '💎', name: 'Lead Line',
      desc: 'Score 100% on five occasions.',
      test: function () { return state.perfectCount >= 5; },
      prog: function () { return [Math.min(state.perfectCount, 5), 5]; } },
    { id: 'perfect-15', icon: '👑', name: 'Perfectionist',
      desc: 'Score 100% on fifteen occasions.',
      test: function () { return state.perfectCount >= 15; },
      prog: function () { return [Math.min(state.perfectCount, 15), 15]; } },
    { id: 'numeric-25', icon: '🧮', name: 'Actuary in Training',
      desc: 'Answer 25 numeric questions correctly.',
      test: function () { return state.numericRight >= 25; },
      prog: function () { return [Math.min(state.numericRight, 25), 25]; } },
    { id: 'numeric-75', icon: '📐', name: 'Chief Actuary',
      desc: 'Answer 75 numeric questions correctly.',
      test: function () { return state.numericRight >= 75; },
      prog: function () { return [Math.min(state.numericRight, 75), 75]; } },
    { id: 'streak-3', icon: '🔥', name: 'On Risk',
      desc: 'Study on three different days.',
      test: function () { return state.studyDays.length >= 3; },
      prog: function () { return [Math.min(state.studyDays.length, 3), 3]; } },
    { id: 'streak-10', icon: '⚡', name: 'Continuous Cover',
      desc: 'Study on ten different days.',
      test: function () { return state.studyDays.length >= 10; },
      prog: function () { return [Math.min(state.studyDays.length, 10), 10]; } },
    { id: 'streak-21', icon: '🛡️', name: 'Iron Discipline',
      desc: 'Study on twenty-one different days.',
      test: function () { return state.studyDays.length >= 21; },
      prog: function () { return [Math.min(state.studyDays.length, 21), 21]; } },
    { id: 'modules-3', icon: '🥉', name: 'Class Act',
      desc: 'Master three whole modules.',
      test: function () { return modulesMastered() >= 3; },
      prog: function () { return [Math.min(modulesMastered(), 3), 3]; } },
    { id: 'modules-7', icon: '🥈', name: 'Portfolio Manager',
      desc: 'Master seven whole modules.',
      test: function () { return modulesMastered() >= 7; },
      prog: function () { return [Math.min(modulesMastered(), 7), 7]; } },
    { id: 'halfway', icon: '🧭', name: 'Midpoint Adjustment',
      desc: 'Complete half of all lessons in the academy.',
      test: function () { var t = totals(); return t.read >= Math.ceil(t.lessons / 2); },
      prog: function () { var t = totals(); return [Math.min(t.read, Math.ceil(t.lessons / 2)), Math.ceil(t.lessons / 2)]; } },
    { id: 'completionist', icon: '🎓', name: 'Market Scholar',
      desc: 'Complete every lesson and pass every quiz.',
      test: function () { var t = totals(); return t.read === t.lessons && t.passed === t.quizzes; },
      prog: function () { var t = totals(); return [t.read + t.passed, t.lessons + t.quizzes]; } }
  ];

  // One badge per module, defined by content files (mod.badge = {icon, name, desc}).
  MODULES.forEach(function (m) {
    var b = m.badge || {};
    ACHIEVEMENTS.push({
      id: 'module-' + m.id,
      icon: b.icon || m.icon,
      name: b.name || (m.title + ' Badge'),
      desc: b.desc || ('Finish every lesson and pass every quiz in “' + m.title + '”.'),
      test: (function (mod) { return function () { return moduleProgress(mod).done; }; })(m),
      prog: (function (mod) {
        return function () {
          var p = moduleProgress(mod);
          return [p.read + p.quizzed, 2 * p.total];
        };
      })(m)
    });
  });

  function allMaps() { return window.LMA_CLASSMAPS || []; }
  function journeyMaps() { return allMaps().filter(function (c) { return c.group === 'journey' && c.quiz; }); }
  function mapsViewedCount() {
    var n = 0;
    allMaps().forEach(function (c) { if (state.mapsViewed[c.id]) n++; });
    return n;
  }
  function journeyQuizzesPassed() {
    var n = 0;
    journeyMaps().forEach(function (c) {
      var b = state.mapQuizBest[c.id];
      if (b && b.pct >= 70) n++;
    });
    return n;
  }

  ACHIEVEMENTS.push(
    { id: 'surveyor', icon: '🗺️', name: 'Surveyor',
      desc: 'Open every map on the Connections page.',
      test: function () { return allMaps().length > 0 && mapsViewedCount() === allMaps().length; },
      prog: function () { return [mapsViewedCount(), allMaps().length]; } },
    { id: 'pathfinder', icon: '🥾', name: 'Pathfinder',
      desc: 'Pass your first journey drill on the Connections page.',
      test: function () { return journeyQuizzesPassed() >= 1; } },
    { id: 'cartographer', icon: '🧭', name: 'Cartographer',
      desc: 'Pass every journey drill on the Connections page.',
      test: function () { return journeyMaps().length > 0 && journeyQuizzesPassed() === journeyMaps().length; },
      prog: function () { return [journeyQuizzesPassed(), journeyMaps().length]; } }
  );

  function anyQuizAtLeast(pct, count) {
    var n = 0;
    for (var k in state.quizBest) if (state.quizBest[k].pct >= pct) n++;
    return n >= count;
  }

  function checkAchievements() {
    ACHIEVEMENTS.forEach(function (a) {
      if (!state.achievements[a.id] && a.test()) {
        state.achievements[a.id] = new Date().toISOString();
        toast(a.icon, 'Award unlocked: ' + a.name);
      }
    });
    save();
  }

  function toast(icon, text) {
    var holder = document.getElementById('toast-holder');
    var t = h('<div class="toast"><span class="t-icon">' + icon + '</span><span>' + esc(text) + '</span></div>').firstChild;
    holder.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity 0.4s'; t.style.opacity = '0'; }, 3400);
    setTimeout(function () { t.remove(); }, 3900);
  }

  /* ---------- router ---------- */

  function route() {
    var hash = location.hash || '#/home';
    var parts = hash.replace(/^#\//, '').split('/');
    var page = parts[0] || 'home';
    window.onscroll = null;
    window.scrollTo(0, 0);
    if (page === 'home') return renderHome();
    if (page === 'modules') return renderModules();
    if (page === 'module' && parts[1]) return renderModule(parts[1]);
    if (page === 'lesson' && parts[1] && parts[2]) return renderLesson(parts[1], parts[2]);
    if (page === 'quiz' && parts[1] && parts[2]) return renderQuiz(parts[1], parts[2]);
    if (page === 'glossary') return renderGlossary();
    if (page === 'awards') return renderAwards();
    if (page === 'map') return renderMap(parts[1]);
    if (page === 'mapquiz' && parts[1]) return renderMapQuiz(parts[1]);
    if (page === 'game') { setTab(''); return window.LMA_GAME.render(parts[1]); }
    renderHome();
  }

  function setTab(routeName) {
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-route') === routeName);
    });
  }

  function go(hash) { location.hash = hash; }

  /* ---------- views ---------- */

  function renderHome() {
    setTab('#/home');
    var t = totals();
    var awards = Object.keys(state.achievements).length;

    // find next lesson to continue with
    var next = null;
    outer:
    for (var i = 0; i < MODULES.length; i++) {
      var m = MODULES[i];
      for (var j = 0; j < m.lessons.length; j++) {
        var k = keyFor(m, m.lessons[j]);
        var b = state.quizBest[k];
        if (!state.lessonsRead[k] || !(b && b.pct >= 70)) { next = { mod: m, idx: j }; break outer; }
      }
    }

    var html = '' +
      '<div class="hero">' +
      '  <div class="kicker">London Market Academy</div>' +
      '  <h1>Learn the London insurance market</h1>' +
      '  <p>Premium, capital, outwards reinsurance, exposure management, claims, and every major class of business — explained without jargon, with worked numbers.</p>' +
      (currentStreak() >= 2 ? '  <div class="streak-chip">🔥 ' + currentStreak() + '-day streak — keep it going</div>' : '') +
      '  <div class="stat-row">' +
      '    <div class="stat"><b>' + t.read + '/' + t.lessons + '</b><span>Lessons</span></div>' +
      '    <div class="stat"><b>' + t.passed + '/' + t.quizzes + '</b><span>Quizzes</span></div>' +
      '    <div class="stat"><b>' + awards + '/' + ACHIEVEMENTS.length + '</b><span>Awards</span></div>' +
      '  </div>' +
      '</div>';

    if (next) {
      var nl = next.mod.lessons[next.idx];
      var started = state.lessonsRead[keyFor(next.mod, nl)];
      html += '<h2>' + (t.read === 0 ? 'Start here' : 'Continue learning') + '</h2>' +
        '<div class="card tappable" data-go="#/lesson/' + next.mod.id + '/' + nl.id + '">' +
        '  <div class="row"><div class="mod-icon">' + next.mod.icon + '</div>' +
        '  <div class="grow"><div class="mod-title">' + esc(nl.title) + '</div>' +
        '  <div class="mod-meta">' + esc(next.mod.title) + ' · ' + (started ? 'Quiz to pass' : 'Lesson ' + (next.idx + 1) + ' of ' + next.mod.lessons.length) + '</div></div>' +
        '  <div class="chev">›</div></div>' +
        '</div>';
    } else if (t.lessons > 0) {
      html += '<div class="card"><div class="row"><div class="mod-icon">🎓</div>' +
        '<div class="grow"><div class="mod-title">Course complete — congratulations!</div>' +
        '<div class="mod-meta">Revisit any module to keep your knowledge sharp.</div></div></div></div>';
    }

    html += '<div class="card tappable" style="margin-top:12px" data-go="#/map">' +
      '<div class="row"><div class="mod-icon">🗺️</div>' +
      '<div class="grow"><div class="mod-title">Connections map</div>' +
      '<div class="mod-meta">Pick a class and see how client, brokers, capital, reinsurance and claims all fit together.</div></div>' +
      '<div class="chev">›</div></div></div>';

    html += '<div class="card tappable" data-go="#/game">' +
      '<div class="row"><div class="mod-icon">🎮</div>' +
      '<div class="grow"><div class="mod-title">Syndicate — the underwriting game</div>' +
      '<div class="mod-meta">Run your own insurer: $10m of capital, ten slips a quarter, catastrophes included.</div></div>' +
      '<div class="chev">›</div></div></div>';

    html += '<h2>Modules</h2>';
    MODULES.forEach(function (m) { html += moduleTile(m); });

    app().innerHTML = html;
    bindGoLinks();
  }

  function moduleTile(m) {
    var p = moduleProgress(m);
    var pct = p.total ? Math.round(100 * (p.read + p.quizzed) / (2 * p.total)) : 0;
    return '<div class="card tappable" data-go="#/module/' + m.id + '">' +
      '<div class="row"><div class="mod-icon">' + m.icon + '</div>' +
      '<div class="grow"><div class="mod-title">' + esc(m.title) + '</div>' +
      '<div class="mod-meta">' + p.total + ' lessons · ' + esc(m.tagline) + '</div>' +
      '<div class="progress-track"><div class="progress-fill' + (p.done ? ' done' : '') + '" style="width:' + pct + '%"></div></div>' +
      '</div><div class="chev">›</div></div></div>';
  }

  function renderModules() {
    setTab('#/modules');
    var html = '<h1>Modules</h1><p class="sub">Work through them in order, or jump to what you need. Each lesson ends with a short quiz — score 70% or more to pass.</p>';
    MODULES.forEach(function (m) { html += moduleTile(m); });
    app().innerHTML = html;
    bindGoLinks();
  }

  function renderModule(modId) {
    var m = findModule(modId);
    if (!m) return renderModules();
    setTab('#/modules');
    var p = moduleProgress(m);
    var scores = [], sum = 0;
    m.lessons.forEach(function (l) {
      var b = state.quizBest[keyFor(m, l)];
      if (b) { scores.push(b.pct); sum += b.pct; }
    });
    var avg = scores.length ? Math.round(sum / scores.length) : null;
    var html = '<button class="backlink" data-go="#/modules">‹ Modules</button>' +
      '<h1>' + m.icon + ' ' + esc(m.title) + '</h1>' +
      '<p class="sub">' + esc(m.blurb || m.tagline) + '</p>' +
      '<div class="mod-summary">' +
      '<div class="ms"><b>' + p.read + '/' + p.total + '</b><span>Read</span></div>' +
      '<div class="ms"><b>' + p.quizzed + '/' + p.total + '</b><span>Passed</span></div>' +
      '<div class="ms"><b>' + (avg !== null ? avg + '%' : '—') + '</b><span>Avg best</span></div>' +
      '</div>' +
      '<div class="card">';
    m.lessons.forEach(function (l, i) {
      var k = keyFor(m, l);
      var read = !!state.lessonsRead[k];
      var best = state.quizBest[k];
      var passed = best && best.pct >= 70;
      var stateTxt = passed ? ('Passed · best ' + best.pct + '%')
        : read ? 'Read — quiz to pass'
        : (l.minutes ? l.minutes + ' min read' : 'Not started');
      html += '<div class="lesson-row" data-go="#/lesson/' + m.id + '/' + l.id + '">' +
        '<div class="lesson-num' + (passed ? ' done' : '') + '">' + (passed ? '✓' : (i + 1)) + '</div>' +
        '<div class="grow"><div class="lesson-title">' + esc(l.title) + '</div>' +
        '<div class="lesson-state">' + stateTxt + '</div></div>' +
        '<div class="chev">›</div></div>';
    });
    html += '</div>';
    if (p.done) html += '<div class="card"><div class="row"><div class="mod-icon">🏅</div><div class="grow"><div class="mod-title">Module mastered</div><div class="mod-meta">All lessons read and all quizzes passed.</div></div></div></div>';
    app().innerHTML = html;
    bindGoLinks();
  }

  function renderLesson(modId, lessonId) {
    var m = findModule(modId);
    if (!m) return renderModules();
    var idx = -1;
    m.lessons.forEach(function (l, i) { if (l.id === lessonId) idx = i; });
    if (idx < 0) return renderModule(modId);
    var l = m.lessons[idx];
    setTab('#/modules');

    var best = state.quizBest[keyFor(m, l)];
    var html = '<div class="read-progress"><div class="read-fill" id="read-fill"></div></div>' +
      '<button class="backlink" data-go="#/module/' + m.id + '">‹ ' + esc(m.title) + '</button>' +
      '<h1>' + esc(l.title) + '</h1>' +
      '<p class="sub">' + esc(m.title) + ' · Lesson ' + (idx + 1) + ' of ' + m.lessons.length +
      (l.minutes ? ' · ' + l.minutes + ' min' : '') + '</p>' +
      (best && best.pct >= 70 ? '<div class="lesson-done-chip">✓ Quiz passed · best ' + best.pct + '%</div>' : '') +
      '<div class="card lesson-body">' + l.body + '</div>' +
      '<button class="btn" id="btn-quiz">Test your knowledge (' + l.quiz.length + ' questions)</button>';

    var prevNext = '<div class="btn-row">';
    if (idx > 0) prevNext += '<button class="btn secondary" data-go="#/lesson/' + m.id + '/' + m.lessons[idx - 1].id + '">‹ Previous</button>';
    if (idx < m.lessons.length - 1) prevNext += '<button class="btn secondary" data-go="#/lesson/' + m.id + '/' + m.lessons[idx + 1].id + '">Next ›</button>';
    prevNext += '</div>';
    html += prevNext;

    app().innerHTML = html;
    bindGoLinks();

    // reading progress bar
    var fill = document.getElementById('read-fill');
    window.onscroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (fill) fill.style.width = (max > 0 ? Math.min(100, 100 * h.scrollTop / max) : 100) + '%';
    };
    window.onscroll();

    // mark as read
    var k = keyFor(m, l);
    if (!state.lessonsRead[k]) {
      state.lessonsRead[k] = true;
      markStudyDay();
      save();
      checkAchievements();
    }

    document.getElementById('btn-quiz').addEventListener('click', function () {
      go('#/quiz/' + m.id + '/' + l.id);
    });
  }

  /* ---------- quiz ---------- */

  function renderQuiz(modId, lessonId) {
    var m = findModule(modId);
    if (!m) return renderModules();
    var l = null, idx = -1;
    m.lessons.forEach(function (x, i) { if (x.id === lessonId) { l = x; idx = i; } });
    if (!l) return renderModule(modId);
    setTab('#/modules');

    var qi = 0;
    var results = [];  // true/false per question
    var answered = false;

    function dots() {
      var s = '<div class="quiz-progress">';
      l.quiz.forEach(function (q, i) {
        var cls = 'quiz-dot';
        if (i < results.length) cls += results[i] ? ' right' : ' wrong';
        else if (i === qi) cls += ' current';
        s += '<div class="' + cls + '"></div>';
      });
      return s + '</div>';
    }

    function showQuestion() {
      answered = false;
      var q = l.quiz[qi];
      var isNum = q.type === 'num';
      var html = '<button class="backlink" data-go="#/lesson/' + m.id + '/' + l.id + '">‹ Back to lesson</button>' +
        '<h1>Quiz: ' + esc(l.title) + '</h1>' + dots() +
        '<div class="card">' +
        '<span class="q-tag' + (isNum ? ' numeric' : '') + '">' + (isNum ? 'Numeric' : 'Multiple choice') + ' · Q' + (qi + 1) + ' of ' + l.quiz.length + '</span>' +
        '<div class="q-text">' + q.q + '</div>';

      if (isNum) {
        html += '<input class="num-input" id="num-answer" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer">';
        if (q.unit) html += '<div class="num-unit">Answer in ' + esc(q.unit) + (q.tol ? ' · small rounding differences are accepted' : '') + '</div>';
        html += '<button class="calc-toggle" id="calc-toggle" type="button">🧮 Show calculator</button>' +
          '<div class="calc" id="calc" hidden>' +
          '<div class="calc-display" id="calc-display">0</div>' +
          '<div class="calc-grid" id="calc-grid">' +
          '<button class="op" data-k="C">C</button><button class="op" data-k="(">(</button><button class="op" data-k=")">)</button><button class="op" data-k="back">⌫</button>' +
          '<button data-k="7">7</button><button data-k="8">8</button><button data-k="9">9</button><button class="op" data-k="/">÷</button>' +
          '<button data-k="4">4</button><button data-k="5">5</button><button data-k="6">6</button><button class="op" data-k="*">×</button>' +
          '<button data-k="1">1</button><button data-k="2">2</button><button data-k="3">3</button><button class="op" data-k="-">−</button>' +
          '<button data-k="0">0</button><button data-k=".">.</button><button class="op" data-k="%">%</button><button class="op" data-k="+">+</button>' +
          '<button class="op wide" data-k="=">=</button><button class="use wide" data-k="use">Use answer</button>' +
          '</div></div>';
      } else {
        q.options.forEach(function (opt, i) {
          html += '<button class="opt" data-i="' + i + '">' + opt + '</button>';
        });
      }
      html += '<div id="q-feedback"></div>' +
        '<button class="btn" id="q-action">' + (isNum ? 'Check answer' : 'Select an answer') + '</button>' +
        '</div>';

      app().innerHTML = html;
      bindGoLinks();

      var action = document.getElementById('q-action');

      if (isNum) {
        var input = document.getElementById('num-answer');
        input.focus();
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') action.click(); });

        // mini calculator
        var calcExpr = '';
        var calcBox = document.getElementById('calc');
        var calcDisp = document.getElementById('calc-display');
        var calcToggle = document.getElementById('calc-toggle');
        function calcEval(s) {
          s = s.replace(/%/g, '/100');
          if (!/^[0-9+\-*/(). ]*$/.test(s) || s.trim() === '') return null;
          try {
            var v = Function('"use strict";return (' + s + ')')();
            return (typeof v === 'number' && isFinite(v)) ? Math.round(v * 1e8) / 1e8 : null;
          } catch (e) { return null; }
        }
        function calcShow() {
          calcDisp.textContent = calcExpr === '' ? '0'
            : calcExpr.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−');
        }
        calcToggle.addEventListener('click', function () {
          calcBox.hidden = !calcBox.hidden;
          calcToggle.textContent = calcBox.hidden ? '🧮 Show calculator' : '🧮 Hide calculator';
        });
        document.getElementById('calc-grid').addEventListener('click', function (e) {
          var k = e.target.getAttribute && e.target.getAttribute('data-k');
          if (!k) return;
          if (k === 'C') calcExpr = '';
          else if (k === 'back') calcExpr = calcExpr.slice(0, -1);
          else if (k === '=' || k === 'use') {
            var v = calcEval(calcExpr);
            if (v !== null) {
              calcExpr = String(v);
              if (k === 'use' && !answered) {
                input.value = String(v);
                calcBox.hidden = true;
                calcToggle.textContent = '🧮 Show calculator';
              }
            }
          } else calcExpr += k;
          calcShow();
        });
        action.addEventListener('click', function () {
          if (answered) { advance(); return; }
          var raw = input.value.replace(/[,\s%£$€]/g, '');
          if (raw === '' || isNaN(Number(raw))) { input.focus(); return; }
          var val = Number(raw);
          var tol = (q.tol != null) ? q.tol : Math.abs(q.answer) * 0.005;
          var right = Math.abs(val - q.answer) <= tol + 1e-9;
          settle(right, q);
          input.disabled = true;
          input.style.borderColor = right ? 'var(--green)' : 'var(--red)';
        });
      } else {
        var picked = -1;
        document.querySelectorAll('.opt').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (answered) return;
            picked = Number(btn.getAttribute('data-i'));
            document.querySelectorAll('.opt').forEach(function (b) { b.classList.remove('picked'); });
            btn.classList.add('picked');
            action.textContent = 'Check answer';
          });
        });
        action.addEventListener('click', function () {
          if (answered) { advance(); return; }
          if (picked < 0) return;
          var right = picked === q.answer;
          document.querySelectorAll('.opt').forEach(function (b, i) {
            if (i === q.answer) b.classList.add('correct');
            else if (i === picked && !right) b.classList.add('incorrect');
          });
          settle(right, q);
        });
      }

      function settle(right, q) {
        answered = true;
        results.push(right);
        if (right && q.type === 'num') { state.numericRight++; save(); }
        var fb = document.getElementById('q-feedback');
        var head = right ? 'Correct.' : (q.type === 'num' ? 'Not quite — the answer is ' + formatAnswer(q) + '.' : 'Not quite.');
        fb.innerHTML = '<div class="feedback ' + (right ? 'good' : 'bad') + '"><b>' + head + '</b>' + (q.explain || '') +
          (right ? '' : '<span class="review-link" id="review-link">Review the lesson ›</span>') + '</div>';
        var rl = document.getElementById('review-link');
        if (rl) rl.addEventListener('click', function () { go('#/lesson/' + m.id + '/' + l.id); });
        action.textContent = (qi === l.quiz.length - 1) ? 'See results' : 'Next question';
        // refresh dots
        var wrap = document.querySelector('.quiz-progress');
        if (wrap) wrap.outerHTML = dots();
      }

      function advance() {
        qi++;
        if (qi >= l.quiz.length) finish(); else showQuestion();
      }
    }

    function formatAnswer(q) {
      var n = q.answer;
      var s = (Math.abs(n) >= 1000) ? n.toLocaleString('en-GB') : String(n);
      return '<strong>' + s + (q.unit ? ' ' + esc(q.unit) : '') + '</strong>';
    }

    function finish() {
      var right = results.filter(Boolean).length;
      var pct = Math.round(100 * right / results.length);
      var k = keyFor(m, l);
      var prev = state.quizBest[k];
      var newBest = !prev || pct > prev.pct;
      if (newBest) state.quizBest[k] = { pct: pct, right: right, total: results.length };
      if (pct === 100) state.perfectCount++;
      markStudyDay();
      save();

      var passed = pct >= 70;
      var color = passed ? 'var(--green)' : 'var(--red)';
      var r = 58, c = 2 * Math.PI * r;
      var ring = '<div class="score-ring"><svg width="132" height="132">' +
        '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="10"/>' +
        '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-linecap="round" ' +
        'stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - pct / 100)) + '"/>' +
        '</svg><div class="score-num">' + pct + '%<small>' + right + ' of ' + results.length + '</small></div></div>';

      var msg = pct === 100 ? 'Flawless — a clean slip!'
        : passed ? 'Passed. Nicely done.'
        : 'Below 70% — skim the lesson and try again.';

      var review = '<h2>Question review</h2><div class="card">';
      l.quiz.forEach(function (q, i) {
        review += '<div class="review-row"><div class="review-ico ' + (results[i] ? 'ok' : 'ko') + '">' +
          (results[i] ? '✓' : '✗') + '</div><div class="review-q">' + esc(plainText(q.q)) + '</div></div>';
      });
      review += '</div>';

      var confetti = '';
      if (pct === 100) {
        confetti = '<div class="confetti">';
        var emo = ['🎉', '✨', '🏅', '🎊'];
        for (var ci = 0; ci < 24; ci++) {
          confetti += '<span style="left:' + (Math.random() * 100).toFixed(1) + '%;animation-delay:' + (Math.random() * 0.9).toFixed(2) + 's">' + emo[ci % 4] + '</span>';
        }
        confetti += '</div>';
      }

      var html = confetti + '<h1>Results</h1>' +
        '<div class="card"><div class="score-ring-wrap">' + ring +
        '<h2 style="margin-top:14px">' + msg + '</h2>' +
        (prev && !newBest ? '<p class="sub">Best so far: ' + prev.pct + '%</p>' : '') +
        '</div>' +
        '<div class="btn-row">' +
        '<button class="btn secondary" data-go="#/quiz/' + m.id + '/' + l.id + '" id="btn-retry">Retry quiz</button>' +
        (idx < m.lessons.length - 1
          ? '<button class="btn" data-go="#/lesson/' + m.id + '/' + m.lessons[idx + 1].id + '">Next lesson ›</button>'
          : '<button class="btn" data-go="#/module/' + m.id + '">Back to module</button>') +
        '</div></div>' + review;

      app().innerHTML = html;
      setTimeout(function () { var c = document.querySelector('.confetti'); if (c) c.remove(); }, 3400);
      bindGoLinks();
      document.getElementById('btn-retry').addEventListener('click', function (e) {
        e.stopPropagation();
        qi = 0; results = []; showQuestion();
      });
      checkAchievements();
    }

    showQuestion();
  }

  /* ---------- glossary ---------- */

  function renderGlossary() {
    setTab('#/glossary');
    var html = '<h1>Glossary</h1><p class="sub">Every market term and acronym used in the lessons, in plain English.</p>' +
      '<input class="search-box" id="gloss-search" type="search" placeholder="Search terms…">' +
      '<div id="gloss-list"></div>';
    app().innerHTML = html;

    function draw(filter) {
      var f = (filter || '').toLowerCase();
      var out = '', letter = '';
      GLOSSARY.forEach(function (g) {
        if (f && g.term.toLowerCase().indexOf(f) === -1 && g.def.toLowerCase().indexOf(f) === -1) return;
        var L = g.term.charAt(0).toUpperCase();
        if (!f && L !== letter) { letter = L; out += '<div class="gloss-letter">' + L + '</div>'; }
        out += '<div class="card" style="padding:13px 15px"><div class="gloss-term">' + esc(g.term) + '</div>' +
          '<div class="gloss-def">' + g.def + '</div></div>';
      });
      document.getElementById('gloss-list').innerHTML = out || '<p class="sub">No matches.</p>';
    }
    draw('');
    document.getElementById('gloss-search').addEventListener('input', function (e) { draw(e.target.value); });
  }

  /* ---------- awards ---------- */

  function renderAwards() {
    setTab('#/awards');
    var unlocked = Object.keys(state.achievements).length;
    var html = '<h1>Awards</h1><p class="sub">' + unlocked + ' of ' + ACHIEVEMENTS.length +
      ' unlocked. Awards are earned by finishing lessons, passing quizzes and mastering modules.</p>' +
      '<div class="award-grid">';
    ACHIEVEMENTS.forEach(function (a) {
      var got = !!state.achievements[a.id];
      var foot;
      if (got) {
        foot = '<div style="margin-top:6px"><span class="pill">Unlocked</span></div>';
      } else if (a.prog) {
        var pr = a.prog();
        var pct = pr[1] ? Math.round(100 * pr[0] / pr[1]) : 0;
        foot = '<div class="a-prog"><small>' + pr[0] + ' / ' + pr[1] + '</small>' +
          '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div></div>';
      } else {
        foot = '<div style="margin-top:6px"><span class="pill todo">Locked</span></div>';
      }
      html += '<div class="award' + (got ? '' : ' locked') + '">' +
        '<div class="a-icon">' + a.icon + '</div>' +
        '<div class="a-name">' + esc(a.name) + '</div>' +
        '<div class="a-desc">' + esc(a.desc) + '</div>' + foot +
        '</div>';
    });
    html += '</div>';
    app().innerHTML = html;
  }

  /* ---------- connections map ---------- */

  function lessonChip(ref) {
    var parts = ref.split('/');
    var m = findModule(parts[0]);
    if (!m) return '';
    var lesson = null;
    m.lessons.forEach(function (l) { if (l.id === parts[1]) lesson = l; });
    if (!lesson) return '';
    return '<span class="lchip" data-go="#/lesson/' + m.id + '/' + lesson.id + '">' + m.icon + ' ' + esc(lesson.title) + '</span>';
  }

  var mapCompareId = null;

  function renderMap(classId) {
    setTab('#/map');
    var maps = allMaps();
    if (!maps.length) return renderHome();
    var current = maps[0];
    maps.forEach(function (c) { if (c.id === classId) current = c; });

    if (!state.mapsViewed[current.id]) {
      state.mapsViewed[current.id] = true;
      save();
    }

    var isJourney = current.group === 'journey';
    var classes = maps.filter(function (c) { return c.group !== 'journey'; });
    var journeys = maps.filter(function (c) { return c.group === 'journey'; });

    // compare partner (classes only, must not be self)
    var cmp = null;
    if (!isJourney && mapCompareId && mapCompareId !== current.id) {
      classes.forEach(function (c) { if (c.id === mapCompareId) cmp = c; });
    }

    function chipRow(list) {
      var s = '<div class="class-chips">';
      list.forEach(function (c) {
        s += '<button class="cchip' + (c.id === current.id ? ' active' : '') + '" data-mapclass="' + c.id + '">' +
          (state.mapsViewed[c.id] ? '' : '<span class="cchip-new"></span>') + c.icon + ' ' + esc(c.name) + '</button>';
      });
      return s + '</div>';
    }

    var html = '<h1>Connections</h1>' +
      '<p class="sub">Follow a class of business — or a journey through the whole machine — end to end. Compare two classes stage by stage, and test yourself on the journeys’ numbers.</p>' +
      '<div class="chip-label">Classes of business</div>' + chipRow(classes) +
      '<div class="chip-label">Journeys — with running numbers and drills</div>' + chipRow(journeys);

    html += '<div class="card" style="padding:14px 15px;margin-bottom:14px"><div class="mod-title">' + current.icon + ' ' + esc(current.name) + '</div>' +
      '<div class="map-desc" style="margin-top:5px">' + esc(current.intro) + '</div></div>';

    // stage navigator strip
    html += '<div class="map-strip">';
    current.stages.forEach(function (s, i) {
      html += '<button class="strip-dot" data-stage="' + i + '" title="' + esc(s.title) + '">' + s.icon + '</button>';
    });
    html += '</div>';

    // compare bar (class maps only)
    if (!isJourney) {
      html += '<div class="compare-bar"><span>⇄ Compare with</span><select id="compare-sel">' +
        '<option value="">— none —</option>';
      classes.forEach(function (c) {
        if (c.id === current.id) return;
        html += '<option value="' + c.id + '"' + (cmp && cmp.id === c.id ? ' selected' : '') + '>' + esc(c.name) + '</option>';
      });
      html += '</select></div>';
    }

    // journey drill button
    if (isJourney && current.quiz) {
      var best = state.mapQuizBest[current.id];
      html += '<button class="btn' + (best && best.pct >= 70 ? ' secondary' : '') + '" id="map-quiz-btn" style="margin-bottom:16px">🧪 ' +
        (best ? 'Retake the drill — best ' + best.pct + '%' : 'Test this journey (' + current.quiz.length + ' questions)') + '</button>';
    }

    current.stages.forEach(function (s, i) {
      html += '<div class="map-stage" id="stage-' + i + '"><div class="map-rail"><div class="map-dot">' + s.icon + '</div></div>' +
        '<div class="map-body"><div class="map-title">' + esc(s.title) + '</div>' +
        '<div class="map-desc">' + s.desc + '</div>' +
        (s.num ? '<div class="map-num">💰 ' + esc(s.num) + '</div>' : '');
      if (cmp && cmp.stages[i]) {
        html += '<div class="map-compare"><span class="cmp-label">⇄ ' + cmp.icon + ' ' + esc(cmp.name) + ' at this stage</span>' +
          cmp.stages[i].desc +
          (cmp.stages[i].num ? '<div class="map-num" style="margin-top:6px">💰 ' + esc(cmp.stages[i].num) + '</div>' : '') +
          '</div>';
      }
      (s.links || []).forEach(function (ref) { html += lessonChip(ref); });
      html += '</div></div>';
    });

    app().innerHTML = html;
    bindGoLinks();
    document.querySelectorAll('.cchip').forEach(function (chip) {
      chip.addEventListener('click', function () { go('#/map/' + chip.getAttribute('data-mapclass')); });
    });
    document.querySelectorAll('.strip-dot').forEach(function (d) {
      d.addEventListener('click', function () {
        var el = document.getElementById('stage-' + d.getAttribute('data-stage'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    var sel = document.getElementById('compare-sel');
    if (sel) {
      sel.addEventListener('change', function () {
        mapCompareId = sel.value || null;
        renderMap(current.id);
      });
    }
    var mq = document.getElementById('map-quiz-btn');
    if (mq) mq.addEventListener('click', function () { go('#/mapquiz/' + current.id); });
    checkAchievements();
  }

  /* ---------- journey drills ---------- */

  function renderMapQuiz(mapId) {
    var m = null;
    allMaps().forEach(function (c) { if (c.id === mapId) m = c; });
    if (!m || !m.quiz) return renderMap(mapId);
    setTab('#/map');

    var qi = 0, results = [], answered = false;

    function dots() {
      var s = '<div class="quiz-progress">';
      m.quiz.forEach(function (q, i) {
        var cls = 'quiz-dot';
        if (i < results.length) cls += results[i] ? ' right' : ' wrong';
        else if (i === qi) cls += ' current';
        s += '<div class="' + cls + '"></div>';
      });
      return s + '</div>';
    }

    function showQuestion() {
      answered = false;
      var q = m.quiz[qi];
      var isNum = q.type === 'num';
      var html = '<button class="backlink" data-go="#/map/' + m.id + '">‹ Back to the map</button>' +
        '<h1>Drill: ' + esc(m.name) + '</h1>' + dots() +
        '<div class="card">' +
        '<span class="q-tag' + (isNum ? ' numeric' : '') + '">' + (isNum ? 'Numeric' : 'Multiple choice') + ' · Q' + (qi + 1) + ' of ' + m.quiz.length + '</span>' +
        '<div class="q-text">' + q.q + '</div>';
      if (isNum) {
        html += '<input class="num-input" id="num-answer" type="text" inputmode="decimal" autocomplete="off" placeholder="Your answer">';
        if (q.unit) html += '<div class="num-unit">Answer in ' + esc(q.unit) + '</div>';
      } else {
        q.options.forEach(function (opt, i) { html += '<button class="opt" data-i="' + i + '">' + opt + '</button>'; });
      }
      html += '<div id="q-feedback"></div>' +
        '<button class="btn" id="q-action">' + (isNum ? 'Check answer' : 'Select an answer') + '</button></div>';

      app().innerHTML = html;
      bindGoLinks();
      var action = document.getElementById('q-action');

      function settle(right, q) {
        answered = true;
        results.push(right);
        if (right && q.type === 'num') { state.numericRight++; save(); }
        var head = right ? 'Correct.' : (q.type === 'num'
          ? 'Not quite — the answer is <strong>' + (Math.abs(q.answer) >= 1000 ? q.answer.toLocaleString('en-GB') : q.answer) + (q.unit ? ' ' + esc(q.unit) : '') + '</strong>.'
          : 'Not quite.');
        document.getElementById('q-feedback').innerHTML =
          '<div class="feedback ' + (right ? 'good' : 'bad') + '"><b>' + head + '</b>' + (q.explain || '') + '</div>';
        action.textContent = (qi === m.quiz.length - 1) ? 'See results' : 'Next question';
        var wrap = document.querySelector('.quiz-progress');
        if (wrap) wrap.outerHTML = dots();
      }

      if (isNum) {
        var input = document.getElementById('num-answer');
        input.focus();
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') action.click(); });
        action.addEventListener('click', function () {
          if (answered) { advance(); return; }
          var raw = input.value.replace(/[,\s%£$€]/g, '');
          if (raw === '' || isNaN(Number(raw))) { input.focus(); return; }
          var tol = (q.tol != null) ? q.tol : Math.abs(q.answer) * 0.005;
          var right = Math.abs(Number(raw) - q.answer) <= tol + 1e-9;
          settle(right, q);
          input.disabled = true;
        });
      } else {
        var picked = -1;
        document.querySelectorAll('.opt').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (answered) return;
            picked = Number(btn.getAttribute('data-i'));
            document.querySelectorAll('.opt').forEach(function (b) { b.classList.remove('picked'); });
            btn.classList.add('picked');
            action.textContent = 'Check answer';
          });
        });
        action.addEventListener('click', function () {
          if (answered) { advance(); return; }
          if (picked < 0) return;
          var right = picked === q.answer;
          document.querySelectorAll('.opt').forEach(function (b, i) {
            if (i === q.answer) b.classList.add('correct');
            else if (i === picked && !right) b.classList.add('incorrect');
          });
          settle(right, q);
        });
      }

      function advance() {
        qi++;
        if (qi >= m.quiz.length) finish(); else showQuestion();
      }
    }

    function finish() {
      var right = results.filter(Boolean).length;
      var pct = Math.round(100 * right / results.length);
      var prev = state.mapQuizBest[m.id];
      if (!prev || pct > prev.pct) state.mapQuizBest[m.id] = { pct: pct, right: right, total: results.length };
      if (pct === 100) state.perfectCount++;
      markStudyDay();
      save();

      var passed = pct >= 70;
      var color = passed ? 'var(--green)' : 'var(--red)';
      var r = 58, c = 2 * Math.PI * r;
      var html = '<h1>Drill results</h1>' +
        '<div class="card"><div class="score-ring-wrap">' +
        '<div class="score-ring"><svg width="132" height="132">' +
        '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="10"/>' +
        '<circle cx="66" cy="66" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-linecap="round" ' +
        'stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - pct / 100)) + '"/>' +
        '</svg><div class="score-num">' + pct + '%<small>' + right + ' of ' + results.length + '</small></div></div>' +
        '<h2 style="margin-top:14px">' + (pct === 100 ? 'You can run this journey yourself now.' : passed ? 'Passed — the connections are sticking.' : 'Walk the map once more, then retry.') + '</h2>' +
        '</div><div class="btn-row">' +
        '<button class="btn secondary" id="drill-retry">Retry drill</button>' +
        '<button class="btn" data-go="#/map/' + m.id + '">Back to the map</button>' +
        '</div></div>';
      app().innerHTML = html;
      bindGoLinks();
      document.getElementById('drill-retry').addEventListener('click', function () {
        qi = 0; results = []; showQuestion();
      });
      checkAchievements();
    }

    showQuestion();
  }

  /* ---------- wiring ---------- */

  function bindGoLinks() {
    document.querySelectorAll('[data-go]').forEach(function (el) {
      el.addEventListener('click', function () { go(el.getAttribute('data-go')); });
    });
  }

  document.querySelectorAll('.tab').forEach(function (t) {
    t.addEventListener('click', function () { go(t.getAttribute('data-route')); });
  });

  window.addEventListener('hashchange', route);
  route();
  checkAchievements();
})();
