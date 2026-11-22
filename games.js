/* =========================================================
   MINI GAME — pusat game + Tebak Anime + Langit Tenang (alien)
   Tombol "Game" ada di kanan bawah. Data anime diambil dari anime-data.js.
========================================================= */
(function () {
  "use strict";

  /* ---------- alat bantu ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const parseC = c => {
    if (c[0] === "#") return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    const m = c.match(/\d+/g); return [+m[0], +m[1], +m[2]];
  };
  const mixC = (a, b, t) => {
    const A = parseC(a), B = parseC(b), k = clamp(t, 0, 1);
    return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",") + ")";
  };
  const fmtTime = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

  /* =========================================================
     PUSAT GAME (tombol kanan bawah + jendela pilihan game)
  ========================================================= */
  const launcher = $("#gameLauncher"), hub = $("#gameHub"), panel = $("#ghPanel");
  const menu = $("#ghMenu"), screen = $("#ghScreen");
  if (!launcher || !hub || !panel || !menu || !screen) return;

  const GAMES = { tebak: createTebak, alien: createAlien };
  let active = null, hubOpen = false, closeTimer = null;

  function stopActive() {
    if (active) { try { active.destroy(); } catch (e) {} active = null; }
    screen.innerHTML = "";
  }
  function showMenu() {
    stopActive();
    menu.hidden = false; screen.hidden = true; panel.className = "gh-panel";
    const first = menu.querySelector(".gh-card"); if (first) first.focus({ preventScroll: true });
  }
  function startGame(name) {
    if (!GAMES[name]) return;
    stopActive();
    menu.hidden = true; screen.hidden = false;
    panel.className = "gh-panel is-" + name;
    active = GAMES[name](screen, { back: showMenu });
  }
  function openHub() {
    if (hubOpen) return;
    hubOpen = true; clearTimeout(closeTimer);
    hub.hidden = false;
    document.documentElement.classList.add("game-lock");
    showMenu();
    requestAnimationFrame(() => hub.classList.add("is-open"));
    window.dispatchEvent(new Event("game:open"));
  }
  function closeHub() {
    if (!hubOpen) return;
    hubOpen = false;
    stopActive();
    hub.classList.remove("is-open");
    document.documentElement.classList.remove("game-lock");
    closeTimer = setTimeout(() => { hub.hidden = true; }, 280);
    window.dispatchEvent(new Event("game:close"));
    launcher.focus({ preventScroll: true });
  }

  launcher.addEventListener("click", openHub);
  hub.addEventListener("click", e => {
    if (e.target.closest("[data-gclose]")) { closeHub(); return; }
    const card = e.target.closest("[data-game]");
    if (card) startGame(card.dataset.game);
  });
  document.addEventListener("keydown", e => {
    if (!hubOpen || e.key !== "Escape") return;
    if (active && active.onEscape && active.onEscape()) return;
    if (active) showMenu(); else closeHub();
  });

  window.PortfolioGames = { open: openHub, close: closeHub, start: startGame, get active() { return active; } };

  /* =========================================================
     GAME 1 — TEBAK ANIME
  ========================================================= */
  function createTebak(root, api) {
    const all = (window.ANIME_LIST || []).map(a => ({
      id: a.id, t: a.t, s: a.s || "",
      genres: String(a.g || "").split("·").map(x => x.trim()).filter(Boolean)
    }));
    const TOTAL = 10, BASE = [100, 60, 30], EXTS = ["jpg", "jpeg", "png", "webp"];
    const posterCache = new Map();
    function findPoster(id) {
      if (posterCache.has(id)) return posterCache.get(id);
      const p = new Promise(res => {
        let i = 0;
        const next = () => {
          if (i >= EXTS.length) return res(null);
          const url = "images/anime/" + id + "." + EXTS[i++];
          const im = new Image();
          im.onload = () => res(url); im.onerror = next; im.src = url;
        };
        next();
      });
      posterCache.set(id, p);
      return p;
    }

    let st = null, alive = true;
    root.innerHTML = '<div class="gh-bar"><button class="gh-back" type="button" data-act="menu">&larr; Menu</button><strong class="gh-name">Tebak Anime</strong></div><div class="tb-body"></div>';
    const body = $(".tb-body", root);

    function showStart() {
      st = null;
      if (all.length < 5) { body.innerHTML = '<p class="tb-lead">Daftar anime belum tersedia (anime-data.js belum termuat).</p>'; return; }
      const best = store.get("tebakBest", 0);
      body.innerHTML =
        '<div class="tb-start"><p class="gh-eyebrow">TEBAK ANIME</p><h2>Seberapa wibu kamu?</h2>' +
        '<p class="tb-lead">10 soal dari koleksi anime milikku. Kamu mulai dari genre saja. Kalau buntu, buka petunjuk. Makin sedikit petunjuk yang dipakai, makin besar skornya.</p>' +
        '<div class="tb-rules"><span><b>100</b> poin<small>hanya genre</small></span><span><b>60</b> poin<small>+ sinopsis</small></span><span><b>30</b> poin<small>+ poster buram</small></span></div>' +
        '<p class="tb-best">Rekor kamu: <b>' + best + '</b></p>' +
        '<button class="gh-btn" type="button" data-act="start">Mulai main</button></div>';
    }

    function makeOptions(a) {
      const others = all.filter(o => o.id !== a.id);
      let pool = shuffle(others.filter(o => !a.genres.every(g => o.genres.includes(g))));
      if (pool.length < 3) pool = pool.concat(shuffle(others.filter(o => pool.indexOf(o) < 0)));
      return shuffle([a].concat(pool.slice(0, 3)));
    }
    function newGame() {
      st = { i: 0, score: 0, streak: 0, maxStreak: 0, correct: 0, tier: 0, locked: false, poster: null,
        qs: shuffle(all).slice(0, TOTAL).map(a => ({ a: a, opts: makeOptions(a) })) };
      renderQ();
    }

    // sembunyikan kata judul di dalam sinopsis supaya tidak membocorkan jawaban
    function maskSyn(a) {
      let t = a.s;
      a.t.split(/[^A-Za-z0-9]+/).filter(w => w.length >= 4).forEach(w => {
        t = t.replace(new RegExp(w, "gi"), m => "\u25AE".repeat(m.length));
      });
      return t;
    }

    function renderQ() {
      const q = st.qs[st.i];
      st.tier = 0; st.locked = false; st.poster = null;
      body.innerHTML =
        '<div class="tb-top"><span>Soal <b>' + (st.i + 1) + '</b>/' + TOTAL + '</span><span>Skor <b>' + st.score + '</b></span><span>Beruntun <b>' + st.streak + '</b></span></div>' +
        '<div class="tb-prog"><i style="width:' + (st.i / TOTAL * 100) + '%"></i></div>' +
        '<div class="tb-clues">' +
          '<div class="tb-clue"><small>Petunjuk 1 &middot; Genre</small><div class="tb-tags">' + q.a.genres.map(g => '<span>' + esc(g) + '</span>').join("") + '</div></div>' +
          '<div class="tb-clue is-locked" id="tbSyn"><small>Petunjuk 2 &middot; Sinopsis</small><p>' + esc(maskSyn(q.a)) + '</p></div>' +
          '<div class="tb-clue is-locked tb-poster-clue" id="tbPoster" hidden><small>Petunjuk 3 &middot; Poster buram</small><div class="tb-poster"></div></div>' +
        '</div>' +
        '<div class="tb-hints"><button type="button" class="tb-hint" data-act="syn">Buka sinopsis</button>' +
        '<button type="button" class="tb-hint" data-act="poster" id="tbHintPoster" disabled hidden>Buka poster buram</button>' +
        '<span class="tb-worth" id="tbWorth">Nilai soal: <b>100</b></span></div>' +
        '<div class="tb-choices">' + q.opts.map((o, i) => '<button type="button" class="tb-choice" data-act="pick" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(o.t) + '</span></button>').join("") + '</div>' +
        '<div class="tb-reveal" id="tbReveal" hidden></div>';
      findPoster(q.a.id).then(url => {
        if (!alive || st.qs[st.i] !== q) return;
        st.poster = url;
        if (url) { $("#tbHintPoster", root).hidden = false; $("#tbHintPoster", root).disabled = st.tier < 1; }
      });
    }

    function setWorth() {
      const w = $("#tbWorth", root); if (w) w.innerHTML = "Nilai soal: <b>" + BASE[st.tier] + "</b>";
    }
    function hint(tier) {
      if (!st || st.locked || tier <= st.tier) return;
      if (tier === 2 && (!st.poster || st.tier < 1)) return;
      st.tier = tier;
      $("#tbSyn", root).classList.remove("is-locked");
      const sb = root.querySelector('[data-act="syn"]'); if (sb) sb.disabled = true;
      const pb = $("#tbHintPoster", root); if (pb && !pb.hidden) pb.disabled = tier >= 2;
      if (tier === 2) {
        const box = $("#tbPoster", root); box.hidden = false; box.classList.remove("is-locked");
        $(".tb-poster", box).innerHTML = '<img alt="" src="' + esc(st.poster) + '">';
      }
      setWorth();
    }

    function answer(i) {
      if (!st || st.locked) return;
      const q = st.qs[st.i], picked = q.opts[i];
      st.locked = true;
      const ok = picked.id === q.a.id;
      if (ok) { st.streak++; st.correct++; st.maxStreak = Math.max(st.maxStreak, st.streak); } else st.streak = 0;
      const bonus = ok ? Math.min(st.streak - 1, 5) * 10 : 0;
      const gain = ok ? BASE[st.tier] + bonus : 0;
      st.score += gain;
      root.querySelectorAll(".tb-choice").forEach((b, k) => {
        b.disabled = true;
        if (q.opts[k].id === q.a.id) b.classList.add("is-right");
        else if (k === i) b.classList.add("is-wrong");
      });
      root.querySelectorAll(".tb-hint").forEach(b => { b.disabled = true; });
      const rev = $("#tbReveal", root);
      rev.hidden = false;
      rev.className = "tb-reveal " + (ok ? "is-ok" : "is-bad");
      const last = st.i + 1 >= TOTAL;
      rev.innerHTML =
        '<div class="tb-rev-art"></div><div class="tb-rev-text">' +
        '<p class="tb-verdict">' + (ok ? "Benar! +" + gain + (bonus ? " (bonus beruntun " + bonus + ")" : "") : "Kurang tepat") + '</p>' +
        '<h4>' + esc(q.a.t) + '</h4><p>' + esc(q.a.s) + '</p>' +
        '<button type="button" class="gh-btn" data-act="next">' + (last ? "Lihat hasil" : "Soal berikutnya") + '</button></div>';
      findPoster(q.a.id).then(url => {
        if (!alive || !url) return;
        const art = $(".tb-rev-art", rev); if (art) art.innerHTML = '<img alt="Poster ' + esc(q.a.t) + '" src="' + esc(url) + '">';
      });
      const topScore = root.querySelector(".tb-top span:nth-child(2) b"); if (topScore) topScore.textContent = st.score;
      const topStreak = root.querySelector(".tb-top span:nth-child(3) b"); if (topStreak) topStreak.textContent = st.streak;
      const nb = rev.querySelector('[data-act="next"]'); if (nb) nb.focus({ preventScroll: true });
    }

    function next() {
      if (!st || !st.locked) return;
      st.i++;
      if (st.i >= TOTAL) showResult(); else renderQ();
    }
    function showResult() {
      const prev = store.get("tebakBest", 0);
      const isBest = st.score > prev;
      if (isBest) store.set("tebakBest", st.score);
      const s = st.score;
      const rank = s >= 1000 ? "Wibu Legendaris" : s >= 750 ? "Wibu Sejati" : s >= 450 ? "Wibu Berpengalaman" : s >= 200 ? "Wibu Pemula" : "Masih Newbie";
      body.innerHTML =
        '<div class="tb-start tb-result"><p class="gh-eyebrow">HASIL</p><h2>' + rank + '</h2>' +
        '<p class="tb-big">' + s + '<small>poin</small></p>' +
        '<div class="tb-rules"><span><b>' + st.correct + '/' + TOTAL + '</b><small>jawaban benar</small></span><span><b>' + st.maxStreak + '</b><small>beruntun terbaik</small></span><span><b>' + Math.max(prev, s) + '</b><small>rekor' + (isBest ? " baru!" : "") + '</small></span></div>' +
        '<div class="tb-actions"><button class="gh-btn" type="button" data-act="again">Main lagi</button><button class="gh-btn is-ghost" type="button" data-act="menu">Menu game</button></div></div>';
      st = null;
    }

    root.addEventListener("click", e => {
      const b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
      const act = b.dataset.act;
      if (act === "menu") api.back();
      else if (act === "start" || act === "again") newGame();
      else if (act === "syn") hint(1);
      else if (act === "poster") hint(2);
      else if (act === "pick") answer(+b.dataset.i);
      else if (act === "next") next();
    });
    function onKey(e) {
      if (!st) return;
      if (e.key >= "1" && e.key <= "4") answer(+e.key - 1);
      else if (e.key === "h" || e.key === "H") hint(st.tier < 1 ? 1 : 2);
      else if ((e.key === "Enter" || e.key === "ArrowRight") && st.locked) next();
    }
    document.addEventListener("keydown", onKey);
    showStart();

    return { destroy() { alive = false; document.removeEventListener("keydown", onKey); }, onEscape() { return false; } };
  }

  /* =========================================================
     GAME 2 — LANGIT TENANG (alien turun dari langit, 5 wave)
  ========================================================= */
  const sfx = (function () {
    /* ===== SUARA GAME ALIEN (versi halus & sinematik) =====
       Semua suara dibuat langsung oleh browser (Web Audio + suara Jepang bawaan browser), jadi tidak butuh file apa pun.
       Mau pakai rekaman sendiri? Isi FILES di bawah dengan nama file (taruh di folder music/game/). Kalau file belum ada,
       otomatis kembali ke suara bawaan. Contoh:
         v_bankai: "music/game/zaraki-bankai.mp3",  slash_zaraki: "music/game/zaraki-slash.mp3"
       Kunci efek : slash_base slash_shinji slash_aizen slash_zaraki slash_bankai | shot_base shot_shinji shot_aizen
                    cero sekai sakanade kyoka kuroCast kuroBlast goryuCast goryuBlast
                    transform_shinji transform_aizen transform_zaraki transform_bankai
       Kunci suara: v_shinji v_sekai v_cero v_aizen v_kyoka v_kuro v_goryu v_zaraki v_bankai */
    const FILES = {};
    /* [nada, kecepatan] — nada rendah = suara pria dalam (kalau perangkat hanya punya suara wanita, nada diturunkan) */
    const VOICE = { v_shinji: [0.6, 1.0], v_sekai: [0.55, 0.95], v_cero: [0.7, 1.08], v_aizen: [0.35, 0.78], v_kyoka: [0.3, 0.74],
                    v_kuro: [0.28, 0.78], v_goryu: [0.28, 0.78], v_zaraki: [0.15, 0.85], v_bankai: [0.1, 0.82],
                    v_ichigo: [0.4, 0.95], v_ibankai: [0.3, 0.88], v_getsuga: [0.28, 0.85], v_juji: [0.28, 0.82],
                    v_ihollow: [0.1, 0.7], v_raung: [0.08, 0.7], v_ichain: [0.25, 0.8], v_final: [0.2, 0.75],
                    v_uryu: [0.75, 0.98], v_uletzt: [0.6, 0.9], v_usnipe: [0.6, 0.95], v_ugin: [0.65, 1.0], v_uspr: [0.5, 0.9], v_urain: [0.6, 0.95], v_ulast: [0.45, 0.85],
                    v_gojo: [0.55, 1.0], v_gsix: [0.5, 0.95], v_gao: [0.5, 0.95], v_gaka: [0.45, 0.95], v_gmur: [0.4, 0.85], v_gdom: [0.4, 0.8],
                    v_ibs: [0.3, 0.85], v_ibk: [0.25, 0.8], v_ibink: [0.3, 0.85], v_ibbr: [0.3, 0.9], v_ibrain: [0.3, 0.85] };
    let ctx = null, master = null, rev = null, echo = null, nbuf = null, on = true;
    const lastAt = {};
    const gate = (n, ms) => { const t = performance.now(); if (t - (lastAt[n] || 0) < ms) return false; lastAt[n] = t; return true; };

    function init() {
      if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const sr = ctx.sampleRate;
        // rantai master: saturasi lembut (hangat & bertenaga) -> kompresor -> speaker
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -16; comp.knee.value = 24; comp.ratio.value = 4; comp.attack.value = 0.005; comp.release.value = 0.25;
        const sat = ctx.createWaveShaper(), n = 1024, cur = new Float32Array(n);
        for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; cur[i] = Math.tanh(1.6 * x) / Math.tanh(1.6); }
        sat.curve = cur; sat.oversample = "2x";
        master = ctx.createGain(); master.gain.value = 0.7; master.connect(sat); sat.connect(comp); comp.connect(ctx.destination);
        // gema ruangan (ekor digelapkan supaya halus, tidak mendesis)
        const len = Math.floor(sr * 2.2), ir = ctx.createBuffer(2, len, sr);
        for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); let lp = 0; for (let i = 0; i < len; i++) { lp += ((Math.random() * 2 - 1) - lp) * 0.4; d[i] = lp * 2.2 * Math.pow(1 - i / len, 3); } }
        const cv = ctx.createConvolver(); cv.buffer = ir;
        const wet = ctx.createGain(); wet.gain.value = 0.45; cv.connect(wet); wet.connect(master); rev = cv;
        // gema berulang (echo) untuk efek magis
        const dl = ctx.createDelay(1); dl.delayTime.value = 0.2;
        const fb = ctx.createGain(); fb.gain.value = 0.38;
        const ef = ctx.createBiquadFilter(); ef.type = "lowpass"; ef.frequency.value = 2600;
        const eo = ctx.createGain(); eo.gain.value = 0.55;
        const ei = ctx.createGain();
        ei.connect(dl); dl.connect(ef); ef.connect(fb); fb.connect(dl); ef.connect(eo); eo.connect(master); echo = ei;
        const nl = Math.floor(sr * 2.5); nbuf = ctx.createBuffer(1, nl, sr);
        const nd = nbuf.getChannelData(0); for (let i = 0; i < nl; i++) nd[i] = Math.random() * 2 - 1;
      } catch (e) { ctx = null; }
    }
    const ok = () => !!ctx && on;
    function route(g, o) {
      o = o || {};
      let out = g;
      if (o.pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = o.pan; g.connect(p); out = p; }
      out.connect(master);
      if (o.send > 0 && rev) { const s = ctx.createGain(); s.gain.value = o.send; g.connect(s); s.connect(rev); }
      if (o.echo > 0 && echo) { const s = ctx.createGain(); s.gain.value = o.echo; g.connect(s); s.connect(echo); }
    }
    /* nada: gelombang tajam (saw/square) otomatis disaring supaya halus; fat = tebal (3 lapis); vib = getaran [Hz, kedalaman] */
    function tone(f0, f1, dur, type, vol, o) {
      if (!ok()) return; o = o || {};
      const t = ctx.currentTime + (o.d || 0), g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol * (o.fat ? 0.6 : 1), t + Math.min(o.at || 0.012, dur * 0.6));
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      let head = g;
      if (type === "sawtooth" || type === "square") {
        const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 0.6;
        lp.frequency.value = o.lp || Math.min(8000, Math.max(f0, f1) * 5); lp.connect(g); head = lp;
      }
      const dets = o.fat ? [-9, 0, 9] : [o.det || 0];
      for (const dt of dets) {
        const os = ctx.createOscillator(); os.type = type; os.frequency.setValueAtTime(f0, t);
        if (f1 !== f0) os.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
        os.detune.value = dt;
        if (o.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = o.vib[0]; lg.gain.value = o.vib[1]; l.connect(lg); lg.connect(os.frequency); l.start(t); l.stop(t + dur + 0.05); }
        os.connect(head); os.start(t); os.stop(t + dur + 0.05);
      }
      route(g, o);
    }
    /* derau: peak = kapan puncaknya (0..0.95 dari durasi) -> peak besar = menggelembung naik (riser), kecil = pukulan */
    function noise(dur, vol, f0, o) {
      if (!ok() || !nbuf) return; o = o || {};
      const t = ctx.currentTime + (o.d || 0), src = ctx.createBufferSource(); src.buffer = nbuf;
      const f = ctx.createBiquadFilter(); f.type = o.type || "bandpass"; f.Q.value = o.q || 0.9; f.frequency.setValueAtTime(f0, t);
      if (o.f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, o.f1), t + dur);
      let tail = f;
      if (f.type === "highpass") { const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 12000; f.connect(lp); tail = lp; }
      const g = ctx.createGain(), pk = Math.min(dur * 0.95, Math.max(0.006, (o.peak == null ? 0.02 : o.peak) * dur));
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + pk); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(f); tail.connect(g); route(g, o); src.start(t, Math.random() * 0.4); src.stop(t + dur + 0.05);
    }
    /* lonceng kristal (FM) */
    function bell(f, dur, vol, d, send, ech) {
      if (!ok()) return;
      const t = ctx.currentTime + (d || 0), c = ctx.createOscillator(), m = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain();
      c.frequency.value = f; m.frequency.value = f * 2.76;
      mg.gain.setValueAtTime(f * 1.6, t); mg.gain.exponentialRampToValueAtTime(1, t + dur);
      m.connect(mg); mg.connect(c.frequency);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      c.connect(g); route(g, { send: send == null ? 0.5 : send, echo: ech || 0 });
      c.start(t); m.start(t); c.stop(t + dur + 0.05); m.stop(t + dur + 0.05);
    }
    /* dentuman bawah ala film: sub-bass jatuh + tendangan derau rendah */
    function thump(vol, f, d) { f = f || 90; d = d || 0; tone(f, f * 0.3, 0.5, "sine", vol, { d: d, at: 0.004 }); noise(0.16, vol * 0.9, 260, { type: "lowpass", d: d }); }

    const A = {
      /* ----- tebasan pedang: bergerak (desir naik-turun) + ciri khas tiap karakter ----- */
      slash(k) {
        const pan = (Math.random() - 0.5) * 0.4;
        if (k === "shinji") {
          noise(0.34, 0.3, 400, { f1: 4200, q: 1.3, peak: 0.7, send: 0.25, pan: pan });
          noise(0.08, 0.14, 7000, { type: "highpass", d: 0.28 });
          [1568, 2093, 2637, 3136].forEach((f, i) => bell(f, 0.8, 0.045, 0.22 + i * 0.05, 0.5, 0.25));
          tone(900, 300, 0.2, "triangle", 0.04, { d: 0.25 });
        } else if (k === "aizen") {
          noise(0.3, 0.22, 3000, { f1: 9500, q: 0.8, peak: 0.4, send: 0.3, pan: pan });
          tone(3520, 2400, 0.45, "sine", 0.035, { send: 0.6, echo: 0.3, at: 0.08 });
          bell(2637, 0.9, 0.04, 0.05, 0.6, 0.3); bell(3951, 0.7, 0.025, 0.1, 0.6, 0.3);
        } else if (k === "ibankai") {
          noise(0.26, 0.34, 800, { f1: 7000, q: 1.2, peak: 0.35, pan: pan });
          tone(2600, 1200, 0.12, "triangle", 0.04, { d: 0.06 }); noise(0.03, 0.2, 8000, { type: "highpass", d: 0.1 });
          tone(110, 50, 0.2, "sine", 0.2, { d: 0.05, at: 0.004 });
        } else if (k === "ihollow") {
          noise(0.3, 0.42, 300, { f1: 3000, q: 0.8, peak: 0.3, pan: pan });
          tone(140, 45, 0.25, "sawtooth", 0.07, { fat: true, d: 0.05 }); tone(90, 40, 0.25, "sine", 0.28, { d: 0.06, at: 0.004 });
        } else if (k === "ichain") {
          noise(0.36, 0.45, 250, { f1: 2600, q: 0.8, peak: 0.3, send: 0.25, pan: pan });
          [0, 0.05, 0.1].forEach(d => bell(1300 + d * 4000, 0.25, 0.03, d, 0.2));
          tone(100, 35, 0.35, "sine", 0.32, { d: 0.08, at: 0.004 });
        } else if (k === "zaraki") {
          noise(0.38, 0.5, 220, { f1: 2000, q: 0.8, peak: 0.3, pan: pan });
          tone(100, 36, 0.4, "sine", 0.34, { d: 0.08, at: 0.004 });
          noise(0.16, 0.4, 180, { type: "lowpass", d: 0.08 });
          tone(140, 50, 0.3, "sawtooth", 0.07, { fat: true, d: 0.04 });
        } else if (k === "bankai") {
          noise(0.55, 0.6, 200, { f1: 3200, q: 0.7, peak: 0.28, send: 0.25, pan: pan });
          tone(72, 26, 0.7, "sine", 0.45, { d: 0.1, at: 0.004 });
          noise(0.12, 0.45, 7000, { type: "highpass", d: 0.1 });
          noise(0.7, 0.28, 500, { f1: 120, type: "lowpass", d: 0.1, send: 0.4 });
          tone(95, 32, 0.55, "sawtooth", 0.1, { fat: true, d: 0.08 });
        } else {
          noise(0.22, 0.34, 800, { f1: 5600, q: 1.2, peak: 0.4, pan: pan });
          noise(0.03, 0.2, 8000, { type: "highpass", d: 0.12 });
          bell(3136, 0.35, 0.03, 0.12, 0.3);
          tone(2400, 1400, 0.1, "triangle", 0.035, { d: 0.1 });
        }
      },
      /* ----- tembakan: retakan tajam + badan + sub-bass + gema ----- */
      shot(k) {
        noise(0.035, 0.5, 7000, { type: "highpass", q: 0.5 });
        tone(520, 70, 0.16, "triangle", 0.12, { at: 0.004 });
        tone(130, 36, 0.28, "sine", 0.34, { at: 0.004 });
        noise(0.5, 0.16, 1400, { f1: 200, type: "lowpass", send: 0.4, d: 0.015, peak: 0.05 });
        if (k === "shinji") { tone(2600, 500, 0.16, "sine", 0.05, { send: 0.4, echo: 0.3 }); bell(2093, 0.6, 0.035, 0.03, 0.5, 0.3); }
        else if (k === "aizen") { bell(1760, 0.9, 0.05, 0.02, 0.6, 0.35); bell(2637, 0.7, 0.035, 0.06, 0.6, 0.35); }
      },
      hit() { if (!gate("hit", 40)) return; bell(2200, 0.2, 0.045, 0, 0.15); noise(0.05, 0.18, 3500, { q: 2 }); tone(260, 120, 0.07, "triangle", 0.05); },
      pop() { tone(760, 90, 0.22, "sine", 0.1, { at: 0.004 }); noise(0.25, 0.28, 1400, { f1: 220, peak: 0.05 }); bell(1400, 0.25, 0.03, 0.02, 0.3); tone(200, 60, 0.3, "sine", 0.1, { d: 0.04 }); },
      hurt() { tone(240, 60, 0.32, "sawtooth", 0.13, { fat: true }); noise(0.3, 0.34, 600, { f1: 120, type: "lowpass" }); tone(80, 36, 0.3, "sine", 0.3, { at: 0.004 }); },
      ping() { if (!gate("ping", 30)) return; bell(1500, 0.2, 0.035, 0, 0.2); },
      boom() {
        tone(90, 26, 1.0, "sine", 0.55, { at: 0.004 });
        noise(1.1, 0.6, 1400, { f1: 60, type: "lowpass", send: 0.4, peak: 0.02 });
        noise(0.12, 0.4, 5000, { type: "highpass" });
        tone(55, 30, 0.8, "sawtooth", 0.1, { fat: true, lp: 400 });
      },
      charge() {
        noise(0.9, 0.2, 400, { f1: 6000, q: 1.2, peak: 0.95 }); tone(150, 1100, 0.9, "sawtooth", 0.05, { fat: true, at: 0.5 });
        tone(280, 2000, 0.9, "sine", 0.04, { send: 0.3, at: 0.5 });
      },
      /* ----- pindah mode / transformasi ----- */
      transform(k) {
        if (k === "aizen") {
          [330, 415, 495].forEach((f, i) => tone(f, f * 3, 1.2, "sine", 0.05, { send: 0.8, at: 0.5, vib: [5, 3], det: i * 6 }));
          noise(1.1, 0.14, 2500, { f1: 9000, q: 1.2, peak: 0.9, send: 0.4 });
          [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => bell(f, 1.4, 0.045, 0.45 + i * 0.13, 0.7, 0.35));
        } else if (k === "ishikai") {
          noise(0.8, 0.2, 500, { f1: 6000, q: 1.2, peak: 0.95 }); tone(180, 900, 0.8, "sawtooth", 0.05, { fat: true, at: 0.5 });
          [784, 1047, 1319, 1568].forEach((f, i) => bell(f, 1.0, 0.045, 0.4 + i * 0.12, 0.6, 0.3));
        } else if (k === "ibankai") {
          tone(45, 90, 1.2, "sine", 0.35, { at: 0.7, send: 0.2 }); noise(1.1, 0.35, 200, { f1: 2500, type: "lowpass", peak: 0.9, send: 0.3 });
          tone(70, 220, 1.2, "sawtooth", 0.1, { fat: true, at: 0.7, lp: 700 }); noise(0.8, 0.14, 900, { f1: 7000, q: 1.4, d: 0.2, peak: 0.9 });
          thump(0.4, 80, 0.5); thump(0.5, 72, 0.95);
        } else if (k === "ihollow") {
          tone(60, 40, 1.4, "sawtooth", 0.14, { fat: true, at: 0.5, lp: 500, vib: [8, 6] }); noise(1.3, 0.4, 250, { f1: 1800, q: 0.9, peak: 0.8, send: 0.5 });
          tone(400, 1600, 1.0, "sawtooth", 0.04, { fat: true, at: 0.6, vib: [14, 30], lp: 3000 });
          thump(0.5, 70, 0.5); thump(0.55, 65, 1.0); thump(0.6, 60, 1.3);
        } else if (k === "ichain") {
          for (let i = 0; i < 8; i++) { noise(0.05, 0.25, 3000, { q: 3, d: i * 0.09 }); bell(1100 + (i % 3) * 300, 0.3, 0.04, i * 0.09, 0.3, 0.2); }
          tone(45, 70, 1.4, "sine", 0.4, { at: 0.9, send: 0.2 }); noise(1.2, 0.4, 200, { f1: 2000, type: "lowpass", peak: 0.9, d: 0.3 });
          thump(0.5, 75, 0.9); thump(0.6, 65, 1.3);
        } else if (k === "uquincy") {
          noise(0.9, 0.18, 500, { f1: 7000, q: 1.2, peak: 0.95 }); tone(200, 1200, 0.9, "sawtooth", 0.045, { fat: true, at: 0.5 });
          [1175, 1568, 1976, 2349].forEach((f, i) => bell(f, 1.1, 0.045, 0.45 + i * 0.12, 0.7, 0.35)); tone(140, 60, 0.12, "triangle", 0.12, { d: 0.9, at: 0.002 });
        } else if (k === "uletzt") {
          tone(45, 85, 1.4, "sine", 0.35, { at: 0.8, send: 0.2 }); noise(1.3, 0.3, 250, { f1: 2400, type: "lowpass", peak: 0.9, send: 0.3 });
          noise(1.0, 0.16, 900, { f1: 9000, q: 1.3, d: 0.2, peak: 0.9, send: 0.4 }); thump(0.4, 78, 0.6); thump(0.5, 70, 1.1);
          [523, 659, 784, 1047, 1319, 1568, 2093].forEach((f, i) => bell(f, 1.8, 0.045, 0.7 + i * 0.12, 0.8, 0.4));
        } else if (k === "zaraki" || k === "bankai") {
          const big = k === "bankai", L = big ? 1.3 : 1.0;
          tone(40, 75, L, "sine", big ? 0.4 : 0.3, { at: L * 0.6, send: 0.2 });
          tone(big ? 55 : 48, big ? 150 : 110, L, "sawtooth", big ? 0.13 : 0.1, { fat: true, at: L * 0.6, lp: 500 });
          noise(L, big ? 0.4 : 0.3, 200, { f1: 1400, type: "lowpass", peak: 0.9, send: 0.25 });
          noise(L * 0.8, 0.14, 800, { f1: 6000, q: 1.5, d: 0.2, peak: 0.9 });
          thump(0.35, 80, 0.35); thump(0.4, 75, 0.7); if (big) thump(0.5, 70, 1.0);
        } else {
          noise(0.95, 0.22, 400, { f1: 6500, q: 1.2, peak: 0.95 });
          tone(150, 1100, 0.95, "sawtooth", 0.05, { fat: true, at: 0.5 }); tone(280, 2000, 0.95, "sine", 0.04, { send: 0.3, at: 0.5 });
          if (k === "shinji") [880, 1175, 1568, 2093].forEach((f, i) => bell(f, 1.0, 0.05, 0.5 + i * 0.12, 0.6, 0.3));
        }
      },
      /* ----- Shinji ----- */
      cero() {
        tone(400, 3200, 0.38, "sine", 0.06, { at: 0.2 }); tone(300, 2400, 0.38, "sawtooth", 0.04, { fat: true, at: 0.2 });
        noise(0.38, 0.2, 2000, { f1: 9000, q: 2, peak: 0.95 });
        tone(140, 30, 0.9, "sine", 0.5, { d: 0.38, at: 0.004 });
        noise(1.0, 0.5, 4000, { f1: 500, q: 0.8, d: 0.38, peak: 0.05, send: 0.35, echo: 0.2 });
        tone(1800, 180, 0.9, "sawtooth", 0.09, { fat: true, d: 0.38, send: 0.3 });
        noise(0.6, 0.15, 6000, { type: "highpass", d: 0.4, peak: 0.1 });
      },
      sakanade(onState) {
        const n = onState ? [988, 1319, 1760] : [1760, 1319, 988];
        n.forEach((f, i) => bell(f, 0.9, 0.055, i * 0.1, 0.6, 0.25));
        noise(0.35, 0.1, onState ? 800 : 6000, { f1: onState ? 6000 : 800, q: 1.5, peak: onState ? 0.9 : 0.1 });
      },
      sekai() {
        tone(110, 880, 0.8, "sine", 0.1, { send: 0.4, at: 0.4, echo: 0.2 }); tone(880, 110, 0.9, "sine", 0.08, { d: 0.7, send: 0.4 });
        noise(1.5, 0.22, 300, { f1: 3200, q: 1.4, peak: 0.45, send: 0.5 }); thump(0.4, 70, 0.7);
        [1175, 1397, 1760].forEach((f, i) => bell(f, 1.1, 0.05, 0.1 + i * 0.25, 0.7, 0.3));
      },
      /* ----- Aizen ----- */
      glass() {
        noise(0.4, 0.22, 4500, { f1: 9000, type: "highpass", peak: 0.1 });
        for (let i = 0; i < 12; i++) bell(2600 + Math.random() * 4800, 0.15 + Math.random() * 0.25, 0.03, Math.random() * 0.7, 0.4);
        noise(0.55, 0.3, 4200, { f1: 800, d: 0.48, send: 0.35, peak: 0.05 });
        for (let i = 0; i < 10; i++) bell(2000 + Math.random() * 5000, 0.2 + Math.random() * 0.3, 0.028, 0.48 + Math.random() * 0.6, 0.45);
      },
      kyoka() {
        A.glass();
        [1568, 2093, 2637, 3136].forEach((f, i) => bell(f, 1.4, 0.045, i * 0.15, 0.75, 0.4));
        tone(400, 1200, 1.1, "sine", 0.03, { send: 0.7, at: 0.5, vib: [6, 4] });
      },
      kyokaEnd() { noise(0.6, 0.12, 700, { f1: 7000, q: 1.5, peak: 0.9, send: 0.4 }); [3136, 2637, 2093, 1568].forEach((f, i) => bell(f, 0.9, 0.035, i * 0.1, 0.7, 0.3)); },
      kuroCast() {
        tone(41, 46, 1.6, "sine", 0.4, { at: 0.8, send: 0.2 });
        tone(55, 60, 1.6, "sawtooth", 0.09, { fat: true, at: 0.8, lp: 300 });
        tone(220, 233, 1.5, "sine", 0.04, { at: 0.7, send: 0.7, vib: [5, 6] });
        noise(1.5, 0.22, 120, { f1: 1500, type: "lowpass", peak: 0.9, send: 0.3 });
        thump(0.3, 60, 0.6); thump(0.35, 58, 1.1);
      },
      kuroBlast() {
        A.boom(); thump(0.5, 70); noise(0.2, 0.4, 2500, { q: 3 });
        bell(110, 1.8, 0.12, 0, 0.7); bell(165, 1.5, 0.07, 0.03, 0.7);
        noise(1.0, 0.3, 500, { f1: 80, type: "lowpass", d: 0.1, send: 0.6 });
      },
      goryuCast() {
        [392, 494, 587, 740, 988].forEach((f, i) => { tone(f, f * 1.01, 0.6, "sine", 0.06, { d: i * 0.18, send: 0.6, echo: 0.3 }); bell(f * 2, 0.7, 0.03, i * 0.18, 0.6, 0.3); });
        noise(1.0, 0.16, 300, { f1: 5000, q: 1.2, peak: 0.9 }); tone(100, 500, 1.0, "sawtooth", 0.04, { fat: true, at: 0.6 });
      },
      goryuBlast() {
        A.boom();
        for (let i = 0; i < 5; i++) tone(300 - i * 25, 70, 0.8, "sawtooth", 0.08, { fat: true, d: i * 0.07, send: 0.3, vib: [7, 8] });
        noise(0.9, 0.3, 3000, { f1: 300, send: 0.4, peak: 0.1 }); tone(900, 100, 0.8, "sawtooth", 0.05, { fat: true });
      },
      /* ----- suasana alam (pelan) ----- */
      bird() {
        if (!gate("bird", 900)) return;
        const b = 2800 + Math.random() * 1400, n = 2 + Math.floor(Math.random() * 3), pan = (Math.random() - 0.5) * 0.9;
        for (let i = 0; i < n; i++) tone(b * (0.95 + Math.random() * 0.1), b * (1.25 + Math.random() * 0.4), 0.07 + Math.random() * 0.05, "sine", 0.02, { d: i * 0.11, at: 0.01, send: 0.4, pan: pan });
      },
      meteor() { if (!gate("meteor", 3000)) return; tone(5200, 1400, 0.7, "sine", 0.012, { send: 0.6, at: 0.05 }); noise(0.6, 0.03, 6000, { f1: 2000, q: 1.5, peak: 0.3 }); },
      cricket() { if (!gate("cricket", 1500)) return; for (let i = 0; i < 6; i++) tone(4400, 4300, 0.03, "sine", 0.011, { d: i * 0.055 + (i > 2 ? 0.1 : 0), at: 0.004, pan: 0.5 }); },
      /* ----- Ichigo: tiap wujud punya suara skill sendiri ----- */
      getsuga() {
        noise(0.5, 0.5, 300, { f1: 3800, q: 0.8, peak: 0.3, send: 0.25 }); tone(90, 28, 0.7, "sine", 0.4, { d: 0.05, at: 0.004 });
        tone(220, 900, 0.35, "sawtooth", 0.06, { fat: true, at: 0.1 }); noise(0.1, 0.35, 6000, { type: "highpass", d: 0.04 }); bell(1760, 0.8, 0.03, 0.1, 0.5, 0.2);
      },
      shunpo() {
        noise(0.22, 0.35, 1200, { f1: 9000, q: 1, peak: 0.3 }); tone(1800, 300, 0.2, "triangle", 0.05, { at: 0.01 });
        noise(0.05, 0.3, 7000, { type: "highpass", d: 0.12 }); bell(2349, 0.4, 0.03, 0.12, 0.3);
      },
      juji() {
        tone(60, 30, 1.0, "sine", 0.45, { d: 0.55, at: 0.004 }); noise(0.6, 0.4, 200, { f1: 3500, q: 0.7, peak: 0.3, send: 0.3, d: 0.55 });
        noise(0.55, 0.25, 600, { f1: 6000, q: 1.4, peak: 0.95 }); thump(0.5, 70, 0.58);
      },
      raung() {
        tone(70, 45, 1.0, "sawtooth", 0.14, { fat: true, at: 0.1, lp: 600, vib: [7, 4] }); noise(1.0, 0.35, 300, { f1: 2000, q: 0.8, peak: 0.5, send: 0.4 });
        thump(0.5, 70, 0); thump(0.4, 65, 0.4);
      },
      hbeamCast() {
        noise(0.5, 0.25, 400, { f1: 6500, q: 1.2, peak: 0.95 }); tone(120, 900, 0.5, "sawtooth", 0.06, { fat: true, at: 0.3, lp: 3000 });
        tone(260, 1800, 0.5, "sine", 0.04, { send: 0.3, at: 0.3 });
      },
      hbeam() {
        tone(160, 30, 1.0, "sine", 0.5, { at: 0.004 }); noise(0.9, 0.5, 1600, { f1: 200, type: "lowpass", send: 0.4, peak: 0.03 });
        noise(0.14, 0.45, 6000, { type: "highpass" }); tone(480, 120, 0.6, "sawtooth", 0.08, { fat: true, vib: [18, 10] }); bell(880, 1, 0.04, 0.05, 0.5, 0.3);
      },
      amuk() {
        tone(48, 95, 1.0, "sawtooth", 0.12, { fat: true, at: 0.4, lp: 400, vib: [9, 5] }); noise(0.9, 0.3, 200, { f1: 1200, type: "lowpass", peak: 0.8 });
        thump(0.4, 75, 0.3); thump(0.45, 70, 0.6);
      },
      bind() {
        [0, 0.07, 0.14, 0.21].forEach(d => { noise(0.06, 0.3, 3500, { q: 3, d: d }); bell(1400 + d * 3000, 0.25, 0.04, d, 0.3); });
        tone(300, 80, 0.3, "sawtooth", 0.05, { fat: true, d: 0.28, lp: 900 }); thump(0.3, 90, 0.3);
      },
      finalCast() {
        tone(40, 80, 1.0, "sine", 0.4, { at: 0.7, send: 0.2 }); noise(0.9, 0.3, 300, { f1: 5000, q: 1, peak: 0.95 });
        tone(110, 900, 0.9, "sawtooth", 0.07, { fat: true, at: 0.6, lp: 2500 });
      },
      finalBlast() {
        thump(0.6, 65, 0); tone(55, 22, 1.6, "sine", 0.55, { at: 0.004 }); noise(1.6, 0.6, 1400, { f1: 60, type: "lowpass", send: 0.5, peak: 0.02 });
        noise(0.18, 0.5, 5000, { type: "highpass" }); tone(220, 60, 1.0, "sawtooth", 0.1, { fat: true, lp: 500 });
        [523, 415, 311].forEach((f, i) => bell(f, 1.6, 0.04, 0.1 + i * 0.15, 0.7, 0.3));
      },
      pusaran() {
        noise(0.9, 0.2, 600, { f1: 4000, q: 1.5, peak: 0.6, send: 0.3 }); [0, 0.1, 0.2, 0.3, 0.4].forEach((d, i) => bell(900 + i * 150, 0.35, 0.035, d, 0.4, 0.2));
        tone(180, 420, 0.8, "triangle", 0.05, { at: 0.3 });
      },

      /* ----- Uryu (Quincy pemanah) ----- */
      uarrow(lz) {
        if (!gate("uarrow", 40)) return;
        tone(lz ? 190 : 150, 70, 0.09, "triangle", 0.1, { at: 0.002 }); noise(0.2, lz ? 0.26 : 0.2, 1800, { f1: 7000, q: 1.1, peak: 0.25, send: 0.25 });
        bell(lz ? 2349 : 1760, 0.35, 0.03, 0.03, 0.4, 0.2);
      },
      usnipeCast() {
        noise(0.5, 0.22, 500, { f1: 7000, q: 1.2, peak: 0.95 }); tone(300, 2400, 0.5, "sine", 0.05, { send: 0.3, at: 0.2 });
        [1319, 1760, 2349].forEach((f, i) => bell(f, 0.5, 0.03, 0.12 + i * 0.1, 0.5, 0.25));
      },
      usnipe() {
        tone(2000, 180, 0.4, "sawtooth", 0.09, { fat: true, at: 0.002 }); noise(0.4, 0.45, 2400, { f1: 300, q: 0.8, peak: 0.1, send: 0.35 });
        noise(0.1, 0.4, 6000, { type: "highpass" }); thump(0.4, 80, 0); [1568, 2093, 2637].forEach((f, i) => bell(f, 0.9, 0.04, 0.02 + i * 0.05, 0.6, 0.3));
      },
      uhiren() {
        noise(0.2, 0.32, 1500, { f1: 9500, q: 1, peak: 0.3 }); tone(2200, 400, 0.18, "triangle", 0.05, { at: 0.01 });
        bell(2637, 0.35, 0.03, 0.1, 0.3); bell(3136, 0.3, 0.025, 0.16, 0.3);
      },
      ugin() {
        for (let i = 0; i < 8; i++) { noise(0.07, 0.2, 3000 + i * 150, { q: 2, d: i * 0.09 }); bell(1200 + (i % 4) * 240, 0.25, 0.03, i * 0.09, 0.3, 0.2); }
        noise(0.7, 0.14, 800, { f1: 5000, q: 1.2, peak: 0.7, send: 0.3 });
      },
      usprCast() {
        noise(0.9, 0.2, 400, { f1: 6000, q: 1.2, peak: 0.95 }); tone(200, 1600, 0.9, "sawtooth", 0.05, { fat: true, at: 0.4 });
        [880, 1175, 1568].forEach((f, i) => bell(f, 0.7, 0.03, 0.1 + i * 0.2, 0.5, 0.25));
      },
      uspr() {
        thump(0.55, 70, 0); tone(60, 24, 1.2, "sine", 0.5, { at: 0.004 }); noise(1.0, 0.5, 1800, { f1: 90, type: "lowpass", send: 0.4, peak: 0.03 });
        noise(0.14, 0.45, 6500, { type: "highpass" }); [1319, 1760, 2349, 3136].forEach((f, i) => bell(f, 1.1, 0.04, 0.03 + i * 0.06, 0.7, 0.35));
      },
      urain() {
        noise(1.6, 0.16, 2500, { f1: 9000, q: 1.1, peak: 0.6, send: 0.4 });
        for (let i = 0; i < 12; i++) bell(1500 + (i * 211) % 1700, 0.3, 0.025, 0.1 + i * 0.15, 0.4, 0.3);
      },
      ulastCast() {
        noise(1.1, 0.28, 300, { f1: 8000, q: 1.2, peak: 0.97 }); tone(80, 1400, 1.1, "sawtooth", 0.07, { fat: true, at: 0.5, lp: 3500 });
        tone(260, 2600, 1.1, "sine", 0.05, { send: 0.4, at: 0.5 }); [523, 659, 784, 1047].forEach((f, i) => bell(f, 1.2, 0.04, 0.15 + i * 0.22, 0.7, 0.35));
      },
      ulast() {
        thump(0.65, 62, 0); tone(50, 20, 1.8, "sine", 0.6, { at: 0.004 }); noise(1.8, 0.6, 1600, { f1: 60, type: "lowpass", send: 0.5, peak: 0.02 });
        noise(0.2, 0.5, 6000, { type: "highpass" }); tone(1500, 120, 0.8, "sawtooth", 0.09, { fat: true });
        [523, 784, 1047, 1568, 2093].forEach((f, i) => bell(f, 1.8, 0.045, 0.05 + i * 0.1, 0.8, 0.4));
      },
      /* ----- Gojo (Jujutsu Kaisen) ----- */
      gshot() {
        if (!gate("gshot", 45)) return;
        tone(520, 1100, 0.07, "sine", 0.07, { at: 0.002 }); noise(0.1, 0.15, 3000, { f1: 8000, q: 1.2, peak: 0.3 }); bell(1568, 0.25, 0.03, 0.02, 0.3, 0.2);
      },
      gaoCast() {
        tone(90, 420, 0.7, "sine", 0.12, { send: 0.3 }); noise(0.7, 0.2, 500, { f1: 3500, q: 1.2, peak: 0.8, send: 0.3 });
        [660, 880, 1175].forEach((f, i) => bell(f, 0.6, 0.03, 0.1 + i * 0.12, 0.4, 0.25));
      },
      gakaCast() { tone(300, 80, 0.3, "sawtooth", 0.07, { fat: true }); noise(0.3, 0.25, 800, { f1: 300, type: "lowpass" }); bell(880, 0.4, 0.03, 0.05, 0.3, 0.2); },
      gaka() {
        thump(0.6, 75, 0); noise(0.5, 0.4, 2400, { f1: 120, type: "lowpass", send: 0.3, peak: 0.05 }); noise(0.12, 0.4, 6000, { type: "highpass" }); bell(220, 0.9, 0.05, 0.02, 0.5, 0.3);
      },
      gmurCast() {
        noise(1.2, 0.25, 300, { f1: 7000, q: 1.2, peak: 0.96 }); tone(70, 1200, 1.2, "sawtooth", 0.06, { fat: true, at: 0.5, lp: 3000 });
        [440, 554, 659, 880].forEach((f, i) => bell(f, 1.2, 0.04, 0.1 + i * 0.25, 0.6, 0.3));
      },
      gmur() {
        thump(0.7, 60, 0); tone(48, 18, 2, "sine", 0.6, { at: 0.004 }); noise(2, 0.6, 1500, { f1: 55, type: "lowpass", send: 0.5, peak: 0.02 }); noise(0.2, 0.5, 6000, { type: "highpass" });
        tone(1200, 90, 0.9, "sawtooth", 0.09, { fat: true }); [392, 587, 880, 1175].forEach((f, i) => bell(f, 1.6, 0.045, 0.05 + i * 0.1, 0.8, 0.4));
      },
      gblind() {
        noise(0.4, 0.2, 1500, { f1: 7000, q: 1.5, peak: 0.6 }); tone(600, 2000, 0.4, "sine", 0.05, { send: 0.4 });
        bell(2637, 0.5, 0.04, 0.1, 0.5, 0.3); bell(3520, 0.4, 0.03, 0.2, 0.4, 0.3);
      },
      gdomain() {
        thump(0.6, 55, 0); tone(40, 20, 2.2, "sine", 0.5, { at: 0.004, send: 0.4 }); noise(2, 0.4, 3000, { f1: 100, type: "lowpass", send: 0.5, peak: 0.05 });
        [196, 247, 294, 392].forEach((f, i) => tone(f, f * 1.01, 2.4, "sine", 0.04, { at: 0.2 + i * 0.15, send: 0.7, vib: [4, 3] }));
        [1319, 1760, 2349, 3136].forEach((f, i) => bell(f, 1.4, 0.04, 0.3 + i * 0.1, 0.7, 0.4));
      },
      gend() { noise(0.6, 0.3, 4000, { f1: 200, type: "lowpass" }); tone(400, 40, 0.9, "sawtooth", 0.08, { fat: true }); thump(0.5, 70, 0.05); },
      /* ----- Ichibē Hyōsube (kuas & tinta) ----- */
      ibShot() {
        if (!gate("ibshot", 45)) return;
        tone(260, 520, 0.08, "triangle", 0.06, { at: 0.002 }); noise(0.1, 0.12, 2500, { f1: 6000, q: 1.2, peak: 0.3 });
      },
      ibCast() {
        noise(0.35, 0.2, 700, { f1: 2800, q: 1.2, peak: 0.6 }); tone(180, 70, 0.35, "sine", 0.1, { send: 0.3 }); bell(784, 0.4, 0.03, 0.05, 0.3, 0.2);
      },
      ibSplat() {
        if (!gate("ibsplat", 70)) return;
        thump(0.35, 110, 0); noise(0.45, 0.35, 1800, { f1: 120, type: "lowpass", send: 0.2, peak: 0.05 }); tone(500, 120, 0.25, "sine", 0.06);
      },
      ibBrushCast() {
        noise(0.28, 0.24, 4000, { f1: 900, q: 1.5, peak: 0.4 }); tone(900, 200, 0.28, "sawtooth", 0.05, { fat: true });
        [523, 784].forEach((f, i) => bell(f, 0.7, 0.03, 0.05 + i * 0.1, 0.4, 0.25));
      },
      ibRainCast() {
        noise(2.4, 0.12, 6000, { f1: 2000, type: "highpass" }); [523, 659, 784, 1047].forEach((f, i) => bell(f, 0.9, 0.03, 0.1 + i * 0.25, 0.5, 0.3));
      },
      ibForm(n) {
        thump(0.45, 70, 0); noise(0.4, 0.25, 1500, { f1: 7000, q: 1.4, peak: 0.6 }); tone(600, 2000, 0.4, "sine", 0.05, { send: 0.4 });
        (n ? [523, 659, 784, 1047, 1319] : [392, 523, 659, 880]).forEach((f, i) => bell(f, 0.9, 0.04, 0.05 + i * 0.1, 0.6, 0.35));
      },
      /* ----- Zaraki & gerak dasar ----- */
      stomp() { thump(0.6, 90); noise(0.5, 0.45, 400, { f1: 80, type: "lowpass", send: 0.2 }); noise(0.35, 0.28, 800, { f1: 300, d: 0.09 }); },
      jump(k) {
        if (k === "zaraki") { tone(160, 380, 0.18, "sine", 0.1); noise(0.16, 0.2, 400, { f1: 1500, peak: 0.5 }); }
        else { tone(300, 650, 0.14, "sine", 0.05); noise(0.12, 0.08, 1200, { f1: 4000, q: 1.5, peak: 0.5 }); }
      },
      jumpBig() { tone(90, 420, 0.4, "sawtooth", 0.08, { fat: true, at: 0.1 }); noise(0.45, 0.3, 250, { f1: 2600, peak: 0.6 }); },
      land(k) { const z = k === "zaraki"; noise(0.13, z ? 0.4 : 0.22, 400, { f1: 150, type: "lowpass" }); tone(120, 45, 0.12, "sine", z ? 0.25 : 0.12, { at: 0.004 }); },
      step(k) { const z = k === "zaraki"; noise(0.06, z ? 0.18 : 0.07, z ? 220 : 600, { type: "lowpass" }); tone(z ? 90 : 130, 55, 0.06, "sine", z ? 0.1 : 0.035, { at: 0.004 }); },
      swap(w) {
        if (w === 1) { noise(0.03, 0.3, 5000, { type: "highpass" }); tone(900, 500, 0.03, "triangle", 0.04); noise(0.04, 0.3, 4000, { type: "highpass", d: 0.08 }); bell(1800, 0.2, 0.02, 0.1, 0.2); }
        else { noise(0.3, 0.18, 2500, { f1: 8000, q: 2, peak: 0.5 }); bell(3136, 0.4, 0.025, 0.15, 0.4, 0.15); }
      },
      down() { tone(500, 50, 0.8, "sawtooth", 0.08, { fat: true }); noise(0.7, 0.2, 800, { f1: 100, type: "lowpass" }); },
      spawn() { tone(240, 520, 0.2, "sine", 0.03, { at: 0.06 }); },
      bomb() { noise(0.2, 0.25, 700, { f1: 300, type: "lowpass" }); tone(260, 80, 0.22, "sawtooth", 0.05); },
      zap() { tone(1500, 300, 0.12, "sawtooth", 0.05); noise(0.05, 0.2, 5000, { type: "highpass" }); },
      clear() { [523, 659, 784, 1047].forEach((f, i) => { tone(f, f, 0.34, "sine", 0.06, { d: i * 0.12, send: 0.4, echo: 0.2 }); bell(f * 2, 0.6, 0.022, i * 0.12, 0.5); }); }
    };

    /* ----- suara karakter (teriakan jurus): pilih suara Jepang terbaik yang tersedia ----- */
    let jaVoice = null;
    function pickVoice() {
      try {
        const ss = window.speechSynthesis; if (!ss) return null;
        const vs = (ss.getVoices() || []).filter(x => /^ja/i.test(x.lang)); if (!vs.length) return null;
        const sc = v => (/otoya|hattori|ichiro|keita|takumi|kenji|ryota|male|man\b/i.test(v.name) ? 10 : 0) - (/kyoko|haruka|ayumi|sayaka|nanami|mizuki|o-?ren|female|woman/i.test(v.name) ? 3 : 0) + (/natural|neural|online/i.test(v.name) ? 2 : 0) + (/google/i.test(v.name) ? 1 : 0);
        vs.sort((a, b) => sc(b) - sc(a)); return vs[0];
      } catch (_) { return null; }
    }
    try { const ss = window.speechSynthesis; if (ss && ss.addEventListener) ss.addEventListener("voiceschanged", () => { jaVoice = pickVoice(); }); } catch (_) {}
    function speak(text, pitch, rate) {
      try {
        const ss = window.speechSynthesis; if (!ss || !text) return;
        ss.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "ja-JP"; u.pitch = pitch; u.rate = rate; u.volume = 1;
        const v = jaVoice || (jaVoice = pickVoice()); if (v) u.voice = v;
        ss.speak(u);
      } catch (_) {}
    }
    function voice(key, text) {
      if (!on) return;
      const pr = VOICE[key] || [0.8, 0.9];
      if (FILES[key]) {
        try {
          const a = new Audio(FILES[key]); a.volume = 1; let done = false;
          const fb = () => { if (!done) { done = true; speak(text, pr[0], pr[1]); } };
          a.addEventListener("error", fb); const p = a.play(); if (p && p.catch) p.catch(fb);
          return;
        } catch (_) {}
      }
      speak(text, pr[0], pr[1]);
    }
    /* efek yang boleh diganti file rekaman sendiri lewat FILES */
    function wrap(name, fn) {
      return function (k) {
        if (!on) return;
        const key = name + (typeof k === "string" ? "_" + k : "");
        if (FILES[key]) {
          try {
            const a = new Audio(FILES[key]); a.volume = 0.9; let done = false;
            const fb = () => { if (!done) { done = true; fn(k); } };
            a.addEventListener("error", fb); const p = a.play(); if (p && p.catch) p.catch(fb);
            return;
          } catch (_) {}
        }
        fn(k);
      };
    }
    const api = {
      init: init, voice: voice,
      get on() { return on; },
      toggle() { on = !on; if (!on) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (_) {} } return on; }
    };
    const filed = ["slash", "shot", "cero", "sekai", "sakanade", "kyoka", "kuroCast", "kuroBlast", "goryuCast", "goryuBlast", "transform"];
    Object.keys(A).forEach(k => { api[k] = filed.indexOf(k) >= 0 ? wrap(k, A[k]) : A[k]; });
    return api;
  })();

  function createAlien(root, api) {
    const W = 960, H = 540, GROUND = 456, FEET = 466;
    let DAY = 600, TOTAL = 5;

    /* ----- tingkat kesulitan: Mudah 5 ronde · Normal 10 ronde · Sulit 15 ronde; pos tiap 5 ronde ----- */
    const POS_EVERY = 5;
    const DIFFS = {
      mudah:  { key: "mudah",  name: "Mudah",  total: 5,  gmax: 8,  cnt: 0.85, dmg: 0.75, hpMul: 0.7, rate: 0.85, day: 600,  soft: true,
                blurb: "5 ronde, alien lebih lemah. Kalah? Ulangi ronde yang sama." },
      normal: { key: "normal", name: "Normal", total: 10, gmax: 12, cnt: 1,    dmg: 1,    hpMul: 1,    rate: 1,    day: 900,  soft: false,
                blurb: "10 ronde, ada pos di ronde 5. Kalah = kembali ke pos terakhir." },
      sulit:  { key: "sulit",  name: "Sulit",  total: 15, gmax: 15, cnt: 1.12, dmg: 1.2,  hpMul: 1.15, rate: 1.2,  day: 1200, soft: false,
                blurb: "15 ronde, alien lebih galak. Pos di ronde 5 dan 10." }
    };
    let diff = DIFFS.normal;
    function applyDiff(k) { diff = DIFFS[k] || DIFFS.normal; TOTAL = diff.total; DAY = diff.day; store.set("alienDiff", diff.key); }
    applyDiff(store.get("alienDiff", "normal"));
    const bestAll = () => store.get("alienBest2", {});
    const getBest = () => bestAll()[diff.key] || { wave: 0, time: 0 };
    const saveBest = (w, t) => { const o = bestAll(); o[diff.key] = { wave: w, time: t }; store.set("alienBest2", o); };
    const posAll = () => store.get("alienPos", {});
    const getPos = () => { const w = posAll()[diff.key] || 1; return w > 1 && w <= TOTAL ? w : 1; };
    const savePos = w => { const o = posAll(); o[diff.key] = w; store.set("alienPos", o); };
    const clearPos = () => { const o = posAll(); delete o[diff.key]; store.set("alienPos", o); };

    // "tingkat" ronde (g): ronde ke-n dipetakan ke 1..15 supaya setiap kesulitan tetap memperkenalkan musuh baru bertahap
    const gOf = n => Math.round(1 + (n - 1) * (diff.gmax - 1) / Math.max(1, TOTAL - 1));
    const BOSS_BASE = [30, 45, 65, 90, 130];
    const bossHpFor = g => g <= 5 ? BOSS_BASE[g - 1] : 130 + 18 * (g - 5) + 0.5 * (g - 5) * (g - 5);
    const BOSS_NAMES = ["Alien Besar", "Ratu Gerombolan", "Panglima Langit"];
    const KIND_ORDER = ["drone", "swoop", "shooter", "bomber", "tank", "splitter", "phantom", "kamikaze", "sniper", "spinner", "medic"];
    const KCAP = { bomber: 4, tank: 3, splitter: 4, phantom: 4, kamikaze: 4, sniper: 3, spinner: 3, medic: 2 };
    const KIND_HP = { drone: 2, swoop: 2, shooter: 3, bomber: 3, tank: 9, splitter: 4, mini: 1, phantom: 3, kamikaze: 2, sniper: 3, spinner: 5, medic: 4 };
    const KIND_R = { drone: [20, 12], swoop: [22, 12], shooter: [17, 17], bomber: [26, 12], tank: [30, 20], splitter: [22, 15], mini: [11, 9], phantom: [20, 15], kamikaze: [15, 14], sniper: [17, 16], spinner: [22, 22], medic: [19, 18] };
    const KIND_DMG = { drone: 8, swoop: 10, shooter: 8, bomber: 8, tank: 12, splitter: 9, mini: 6, phantom: 10, kamikaze: 0, sniper: 8, spinner: 10, medic: 8 };
    const KIND_COL = { drone: "#8aff9b", swoop: "#c9b6ff", shooter: "#ff9fcb", bomber: "#ffb04a", tank: "#9fb4e8", splitter: "#66e0ff", mini: "#66e0ff",
      phantom: "#cfe6ff", kamikaze: "#ff8a3c", sniper: "#ff6a6a", spinner: "#ffd24a", medic: "#9dffb0" };
    const DIVE = { drone: [5, 9, 1.25], swoop: [3, 5.5, 0.85], splitter: [4, 7, 1.1], mini: [2, 3.5, 0.7], phantom: [3.5, 5.5, 0.9], kamikaze: [3, 5, 0.75] };
    function waveComp(n) {
      const g = gOf(n), k = Math.min(KIND_ORDER.length, g), total = Math.max(5, Math.round((5 + g) * diff.cnt));
      const kinds = KIND_ORDER.slice(0, k), counts = {}; kinds.forEach(x => { counts[x] = 0; });
      const cap = x => KCAP[x] || 99;
      let left = total;
      if (k > 1) { const x = kinds[k - 1]; counts[x] = Math.min(cap(x), 2); left -= counts[x]; }
      if (k > 2) { const x = kinds[k - 2]; counts[x] = Math.min(cap(x), 1); left -= counts[x]; }
      const wt = kinds.map((x, i) => (i < 3 ? Math.max(0.6, 2.2 - 0.12 * g) : 1.3) + (i === k - 1 ? 0.8 : 0));
      let guard = 0;
      while (left > 0 && guard++ < 300) {
        let sum = 0; for (let i = 0; i < k; i++) if (counts[kinds[i]] < cap(kinds[i])) sum += wt[i];
        if (sum <= 0) break;
        let r = rnd(0, sum), pk = kinds[0];
        for (let i = 0; i < k; i++) { const x = kinds[i]; if (counts[x] >= cap(x)) continue; pk = x; r -= wt[i]; if (r <= 0) break; }
        counts[pk]++; left--;
      }
      const q = []; for (const x of kinds) for (let i = 0; i < counts[x]; i++) q.push(x);
      return q;
    }
    const touchCapable = ("ontouchstart" in window) || (window.matchMedia && matchMedia("(pointer: coarse)").matches);

    root.innerHTML =
      '<div class="gh-bar"><button class="gh-back" type="button" data-act="menu">&larr; Menu</button><strong class="gh-name">Langit Tenang</strong>' +
      '<span class="gh-spacer"></span>' +
      '<button class="gh-icon" type="button" data-act="sound" aria-label="Suara">Suara: nyala</button>' +
      '<button class="gh-icon" type="button" data-act="pause" aria-label="Jeda">Jeda</button></div>' +
      '<div class="al-layout">' +
        '<div class="al-wrap">' +
          '<canvas class="al-canvas" aria-label="Arena game Langit Tenang"></canvas>' +
          '<div class="al-hud">' +
            '<div class="al-left"><div class="al-hp"><b>HP</b><span class="al-bar"><i></i></span></div>' +
            '<div class="al-weapons"><button type="button" data-w="0" class="is-on">Katana <kbd>1</kbd></button><button type="button" data-w="1">Senapan <kbd>2</kbd></button></div></div>' +
            '<div class="al-mid"><div class="al-wave"><b>Ronde 1/' + TOTAL + '</b><small></small></div>' +
            '<div class="al-boss" hidden><span class="al-boss-name">Alien Besar</span><span class="al-bar al-bar-boss"><i></i></span></div></div>' +
            '<div class="al-time"><b>05:00</b><small>Subuh</small></div>' +
          '</div>' +
          '<div class="al-banner"></div>' +
          '<div class="al-screen"></div>' +
          (touchCapable ?
            '<div class="al-touch"><div class="al-dpad"><button type="button" data-t="left" aria-label="Kiri">&#9664;</button><button type="button" data-t="right" aria-label="Kanan">&#9654;</button></div>' +
            '<div class="al-btns"><button type="button" data-t="swap">Ganti</button><button type="button" data-t="jump">Lompat</button><button type="button" data-t="attack" class="is-big">Serang</button></div></div>' : "") +
        '</div>' +
        '<aside class="al-shinji-tools" hidden aria-label="Jendela skill Shinji">' +
          '<div class="al-skill-head"><span class="al-skill-mark">卍</span><div><b>SHINJI MODE</b><small class="al-shinji-status">Kekuatan Visored</small></div></div>' +
          '<div class="al-skill-unlock">Selamat anda menemukan easter egg Bleach</div>' +
          '<button type="button" data-act="shinji" class="al-shinji-toggle"><span class="al-skill-icon">魂</span><span><b>Transformasi</b><small>Visored · Sakanade</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-skill="sekai"><span class="al-skill-icon">↻</span><span><b>Dunia Terbalik</b><small>Balikkan seluruh arena</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-skill="cero"><span class="al-skill-icon">✦</span><span><b>Cero</b><small class="al-cero-cd">Siap</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-skill="sakanade"><span class="al-skill-icon">⚔</span><span><b>Sakanade</b><small>Ganti senjata</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">SERANG <kbd>J</kbd> / <kbd>F</kbd> · GERAK <kbd>A</kbd> <kbd>D</kbd></div>' +
        '</aside>' +
        '<aside class="al-shinji-tools al-aizen-tools" hidden aria-label="Jendela skill Aizen">' +
          '<div class="al-skill-head"><span class="al-skill-mark">鏡</span><div><b>AIZEN MODE</b><small>Kekuatan Soul Society</small></div></div>' +
          '<div class="al-skill-unlock">Selamat anda menemukan easter egg Bleach</div>' +
          '<button type="button" data-act="aizen" class="al-shinji-toggle"><span class="al-skill-icon">藍</span><span><b>Transformasi</b><small class="al-az-t">Pecahkan dunia</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-skill="kyoka"><span class="al-skill-icon">鏡</span><span><b>Kyōka Suigetsu</b><small class="al-az-k">Musuh salah sasaran</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-skill="kuro"><span class="al-skill-icon">棺</span><span><b>Hadō no. 90</b><small class="al-az-h">Kurohitsugi</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-skill="goryu"><span class="al-skill-icon">龍</span><span><b>Hadō no. 99</b><small class="al-az-g">Goryūtenmetsu</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">SERANG <kbd>J</kbd> / <kbd>F</kbd> · GERAK <kbd>A</kbd> <kbd>D</kbd></div>' +
        '</aside>' +
        '<aside class="al-shinji-tools al-zaraki-tools" hidden aria-label="Jendela skill Zaraki">' +
          '<div class="al-skill-head"><span class="al-skill-mark">剣</span><div><b>ZARAKI MODE</b><small>Kekuatan fisik murni</small></div></div>' +
          '<div class="al-skill-unlock">Selamat anda menemukan easter egg Bleach</div>' +
          '<button type="button" data-act="zaraki" class="al-shinji-toggle"><span class="al-skill-icon">野</span><span><b>Transformasi</b><small class="al-zr-t">Nozarashi</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-skill="lompat"><span class="al-skill-icon">跳</span><span><b>Lompat Raksasa</b><small class="al-zr-l">Lompat super · siap</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-skill="tebas"><span class="al-skill-icon">斬</span><span><b>Tebasan Liar</b><small class="al-zr-s">Siap</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-skill="bankai"><span class="al-skill-icon">卍</span><span><b>Bankai da yo!</b><small class="al-zr-b">Sekali tebas · siap</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">SERANG <kbd>J</kbd> / <kbd>F</kbd> · GERAK <kbd>A</kbd> <kbd>D</kbd> · HANTAM <kbd>S</kbd></div>' +
        '</aside>' +
        '<aside class="al-shinji-tools al-ichigo-tools" hidden data-form="0" aria-label="Jendela skill Ichigo">' +
          '<div class="al-skill-head"><span class="al-skill-mark">月</span><div><b>ICHIGO MODE</b><small class="al-ic-form">Shinigami Pengganti</small></div></div>' +
          '<div class="al-skill-unlock">Selamat anda menemukan easter egg Bleach</div>' +
          '<div class="al-ic-forms" role="group" aria-label="Pilih wujud">' +
            '<button type="button" data-iform="0"><i>斬</i>Biasa</button><button type="button" data-iform="1"><i>月</i>Bankai</button>' +
            '<button type="button" data-iform="2"><i>虚</i>Hollow</button><button type="button" data-iform="3"><i>鎖</i>Chain</button>' +
          '</div>' +
          '<button type="button" data-act="ichigo" class="al-shinji-toggle"><span class="al-skill-icon">変</span><span><b>Transformasi</b><small class="al-ic-t">Aktifkan Ichigo</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-iskill="0"><span class="al-skill-icon">月</span><span><b>Getsuga Tenshō</b><small>Sabit hitam · tembus</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-iskill="1"><span class="al-skill-icon">瞬</span><span><b>Shunpo</b><small>Dash menebas</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-iskill="2"><span class="al-skill-icon">十</span><span><b>Getsuga Jūjishō</b><small>Tebasan silang</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">SERANG <kbd>J</kbd> / <kbd>F</kbd> · GERAK <kbd>A</kbd> <kbd>D</kbd> · BIDIK mouse</div>' +
        '</aside>' +
        '<aside class="al-shinji-tools al-uryu-tools" hidden data-form="0" aria-label="Jendela skill Uryu">' +
          '<div class="al-skill-head"><span class="al-skill-mark">弓</span><div><b>URYU MODE</b><small class="al-uy-form">Quincy Pemanah</small></div></div>' +
          '<div class="al-skill-unlock">Selamat anda menemukan easter egg Bleach</div>' +
          '<div class="al-ic-forms al-uy-forms" role="group" aria-label="Pilih wujud">' +
            '<button type="button" data-uform="0"><i>弓</i>Quincy</button><button type="button" data-uform="1"><i>翼</i>Letzt Stil</button>' +
          '</div>' +
          '<button type="button" data-act="uryu" class="al-shinji-toggle"><span class="al-skill-icon">変</span><span><b>Transformasi</b><small class="al-uy-t">Aktifkan Uryu</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-uskill="0"><span class="al-skill-icon">矢</span><span><b>Heilig Pfeil</b><small>Panah penembus</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-uskill="1"><span class="al-skill-icon">瞬</span><span><b>Hirenkyaku</b><small>Dash reishi</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-uskill="2"><span class="al-skill-icon">銀</span><span><b>Ginrei Kojaku</b><small>Panah pemburu</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">PANAH <kbd>J</kbd> / <kbd>F</kbd> / klik · GERAK <kbd>A</kbd> <kbd>D</kbd> · BIDIK mouse · makin JAUH makin sakit</div>' +
        '</aside>' +
        '<aside class=\"al-shinji-tools al-gojo-tools\" hidden data-form=\"0\" aria-label=\"Jendela skill Gojo\">' +
          '<div class=\"al-skill-head\"><span class=\"al-skill-mark\">六</span><div><b>GOJO MODE</b><small class=\"al-gj-form\">Penyihir Terkuat</small></div></div>' +
          '<div class=\"al-skill-unlock\">Selamat anda menemukan easter egg Jujutsu Kaisen</div>' +
          '<div class=\"al-ic-forms al-gj-forms\" role=\"group\" aria-label=\"Pilih wujud\">' +
            '<button type=\"button\" data-gform=\"0\"><i>目</i>Biasa</button><button type=\"button\" data-gform=\"1\"><i>眼</i>Six Eyes</button><button type=\"button\" data-gform=\"2\"><i>域</i>Domain</button>' +
          '</div>' +
          '<button type=\"button\" data-act=\"gojo\" class=\"al-shinji-toggle\"><span class=\"al-skill-icon\">変</span><span><b>Transformasi</b><small class=\"al-gj-t\">Aktifkan Gojo</small></span><kbd>5</kbd></button>' +
          '<button type=\"button\" data-gskill=\"0\"><span class=\"al-skill-icon\">蒼</span><span><b>Ao · Biru</b><small>Menyedot musuh</small></span><kbd>3</kbd></button>' +
          '<button type=\"button\" data-gskill=\"1\"><span class=\"al-skill-icon\">赫</span><span><b>Aka · Merah</b><small>Ledakan tolak</small></span><kbd>4</kbd></button>' +
          '<button type=\"button\" data-gskill=\"2\"><span class=\"al-skill-icon\">茈</span><span><b>Hollow Purple</b><small>Sinar ungu</small></span><kbd>6</kbd></button>' +
          '<div class=\"al-skill-foot\">SERANG <kbd>J</kbd> / <kbd>F</kbd> / klik · GERAK <kbd>A</kbd> <kbd>D</kbd> · BIDIK mouse · Six Eyes: Infinity menangkis peluru</div>' +
        '</aside>' +
        '<aside class="al-shinji-tools al-ichibe-tools" hidden data-form="0" aria-label="Jendela skill Ichibe">' +
          '<div class="al-skill-head"><span class="al-skill-mark">墨</span><div><b>ICHIBĒ MODE</b><small class="al-ib-form">Pelukis Tinta</small></div></div>' +
          '<div class="al-skill-unlock">Tinta jadi senjata: musuh yang tersiram berubah jadi semut</div>' +
          '<div class="al-ic-forms al-ib-forms" role="group" aria-label="Pilih wujud">' +
            '<button type="button" data-bform="0"><i>筆</i>Shikai</button><button type="button" data-bform="1"><i>金</i>Bankai</button>' +
          '</div>' +
          '<button type="button" data-act="ichibe" class="al-shinji-toggle"><span class="al-skill-icon">変</span><span><b>Transformasi</b><small class="al-ib-t">Aktifkan Ichibē</small></span><kbd>5</kbd></button>' +
          '<button type="button" data-bskill="0"><span class="al-skill-icon">墨</span><span><b>Lempar Tinta</b><small>Musuh jadi semut</small></span><kbd>3</kbd></button>' +
          '<button type="button" data-bskill="1"><span class="al-skill-icon">筆</span><span><b>Tebas Kuas</b><small>Sabetan panjang</small></span><kbd>4</kbd></button>' +
          '<button type="button" data-bskill="2"><span class="al-skill-icon">雨</span><span><b>Hujan Tinta</b><small>Semut dari langit</small></span><kbd>6</kbd></button>' +
          '<div class="al-skill-foot">SERANG <kbd>J</kbd> / <kbd>F</kbd> / klik · GERAK <kbd>A</kbd> <kbd>D</kbd> · BIDIK mouse · semut hitam jatuh &amp; tidak bisa menyerang</div>' +
        '</aside>' +
      '</div>';

    const layout = $(".al-layout", root), wrap = $(".al-wrap", root), cv = $(".al-canvas", root), ctx = cv.getContext("2d");
    const hud = {
      hpBar: $(".al-hp .al-bar i", root), wave: $(".al-wave b", root), sub: $(".al-wave small", root),
      boss: $(".al-boss", root), bossName: $(".al-boss-name", root), bossBar: $(".al-bar-boss i", root),
      time: $(".al-time b", root), label: $(".al-time small", root),
      w0: $('[data-w="0"]', root), w1: $('[data-w="1"]', root)
    };
    const bannerEl = $(".al-banner", root), screenEl = $(".al-screen", root);
    const shinjiTools = $(".al-shinji-tools:not(.al-aizen-tools):not(.al-zaraki-tools):not(.al-ichigo-tools):not(.al-uryu-tools):not(.al-gojo-tools):not(.al-ichibe-tools)", root), ceroCdEl = $(".al-cero-cd", root);
    const aizenTools = $(".al-aizen-tools", root);
    const zarakiTools = $(".al-zaraki-tools", root);
    const ichigoTools = $(".al-ichigo-tools", root);
    const icForm = Array.from(root.querySelectorAll("[data-iform]"));
    const icSk = [0, 1, 2].map(i => $('[data-iskill="' + i + '"]', root));
    const icN = icSk.map(b => $("b", b)), icI = icSk.map(b => $(".al-skill-icon", b)), icS = icSk.map(b => $("small", b));
    const icTxt = { form: $(".al-ic-form", root), t: $(".al-ic-t", root) };
    const uryuTools = $(".al-uryu-tools", root);
    const gojoTools = $(".al-gojo-tools", root);
    const gjForm = Array.from(root.querySelectorAll("[data-gform]"));
    const gjSk = [0, 1, 2].map(i => $('[data-gskill="' + i + '"]', root));
    const gjN = gjSk.map(b => $("b", b)), gjI = gjSk.map(b => $(".al-skill-icon", b)), gjS = gjSk.map(b => $("small", b));
    const gjTxt = { form: $(".al-gj-form", root), t: $(".al-gj-t", root) };
    const ichibeTools = $(".al-ichibe-tools", root);
    const ibForm = Array.from(root.querySelectorAll("[data-bform]"));
    const ibSk = [0, 1, 2].map(i => $('[data-bskill="' + i + '"]', root));
    const ibN = ibSk.map(b => $("b", b)), ibI = ibSk.map(b => $(".al-skill-icon", b)), ibS = ibSk.map(b => $("small", b));
    const ibTxt = { form: $(".al-ib-form", root), t: $(".al-ib-t", root) };
    const uyForm = Array.from(root.querySelectorAll("[data-uform]"));
    const uySk = [0, 1, 2].map(i => $('[data-uskill="' + i + '"]', root));
    const uyN = uySk.map(b => $("b", b)), uyI = uySk.map(b => $(".al-skill-icon", b)), uyS = uySk.map(b => $("small", b));
    const uyTxt = { form: $(".al-uy-form", root), t: $(".al-uy-t", root) };
    const zrBtn = { lompat: $('[data-skill="lompat"]', root), tebas: $('[data-skill="tebas"]', root), bankai: $('[data-skill="bankai"]', root) };
    const zrTxt = { t: $(".al-zr-t", root), l: $(".al-zr-l", root), s: $(".al-zr-s", root), b: $(".al-zr-b", root) };
    const azBtn = { kyoka: $('[data-skill="kyoka"]', root), kuro: $('[data-skill="kuro"]', root), goryu: $('[data-skill="goryu"]', root) };
    const azTxt = { t: $(".al-az-t", root), k: $(".al-az-k", root), h: $(".al-az-h", root), g: $(".al-az-g", root) };
    const last = {};
    const setText = (el, key, v) => { if (last[key] !== v) { last[key] = v; el.textContent = v; } };

    /* ----- keadaan ----- */
    let S, raf = 0, prevT = 0, destroyed = false, bannerTimer = 0;
    const keys = { left: false, right: false, jump: false, attack: false };
    const touch = { left: false, right: false, jump: false, attack: false };
    let mx = W / 2, my = 200, mouseDown = false, lastMouse = -1e9, mouseInside = false;
    let jumpHeld = false;

    function newState() {
      return {
        day: DAY * 0.0375, time: 0, runTime: 0, wave: 0, g: 1, checkpoint: 1, phase: "start", phaseT: 0, aimAng: 0,
        player: { x: W / 2, y: FEET, vx: 0, vy: 0, hp: 100, max: 100, face: 1, onGround: true, weapon: 0,
          cdK: 0, cdR: 0, slash: 0, slashAng: 0, inv: 0, lastHurt: -99, walk: 0, recoil: 0 },
        aliens: [], orbs: [], bullets: [], fx: [], slashes: [], queue: [], spawnT: 0, boss: null, paused: false, kills: 0,
        shinjiUnlocked: document.documentElement.dataset.bleach === "shinji", shinji: false, sakanade: false, sekaiT: 0, ceroCd: 0, ceroFx: 0, ceroMaskT: 0, maskMax: 0.95, surge: null,
        aizenUnlocked: document.documentElement.dataset.bleach === "aizen", aizen: false, kyokaT: 0, kyokaCd: 0, kyokaDecoyX: W / 2,
        kuro: null, kuroCd: 0, goryu: null, goryuCd: 0, castT: 0, castKind: "", quake: 0,
        zarakiUnlocked: document.documentElement.dataset.bleach === "zaraki", zaraki: false, bankai: false, bankaiT: 0, bankaiCd: 0, lompatCd: 0, tebasCd: 0, sjump: false, slam: false, waves: [], zcuts: [],
        ichigoUnlocked: document.documentElement.dataset.bleach === "ichigo", ichigo: false, iform: 0, icd: {}, getsugas: [], ifx: [], hbeam: null, finals: [],
        amukT: 0, amukTick: 0, pusT: 0, pusTick: 0,
        uryuUnlocked: document.documentElement.dataset.bleach === "uryu", uryu: false, uform: 0, ucd: {}, uarrows: [], ufx: [], usnipe: null, ubombs: [], urains: [], uvolley: null, uhaste: 0,
        gojoUnlocked: document.documentElement.dataset.jjk === "gojo" && !document.documentElement.dataset.bleach, gojo: false, gform: 0, gcd: {}, gfx: [], gbolts: [], gaos: [], greds: [], gmur: null, gdomain: null, gdomCd: 0, gintro: 0, gflip: false,
        ichibeUnlocked: document.documentElement.dataset.bleach === "ichibe", ib: ibNew()
      };
    }

    /* ----- latar: bintang, awan, bukit, rumput ----- */
    const stars = Array.from({ length: 120 }, () => ({ x: rnd(0, W), y: rnd(0, GROUND - 60), r: rnd(0.5, 1.8), sp: rnd(0.8, 2.6), ph: rnd(0, 6.28), c: Math.random() < 0.6 ? "#ffffff" : Math.random() < 0.5 ? "#bcd4ff" : "#ffe9b8" }));
    const clouds = Array.from({ length: 7 }, () => ({ x: rnd(0, W), y: rnd(40, 230), s: rnd(0.7, 1.5), v: rnd(5, 15) }));
    const rows = [0, 1, 2, 3].map(k => ({
      y: GROUND + 4 + k * 20, day: ["#7fd466", "#6cc85c", "#58b84f", "#49a846"][k], night: ["#2d6358", "#255450", "#1d4549", "#16373f"][k],
      blades: Array.from({ length: 78 }, () => ({ x: rnd(-6, W + 6), h: rnd(9, 20) + k * 2, ph: rnd(0, 6.28) }))
    }));
    const flowers = Array.from({ length: 24 }, () => ({ x: rnd(10, W - 10), y: GROUND + rnd(10, 72), c: pick(["#ffffff", "#ffe27a", "#ffb3d1", "#c9b6ff"]) }));

    /* ----- suasana alam: burung pagi, kabut, embun berkilau, bintang jatuh, kunang-kunang ----- */
    const sstep = (a, b, x) => { const k = clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
    const birds = [], meteors = [];
    const flies = Array.from({ length: 24 }, () => ({ x: rnd(0, W), y: rnd(GROUND - 110, GROUND + 70), ph: rnd(0, 6.28), sp: rnd(0.3, 0.9), r: rnd(18, 50) }));
    const mists = Array.from({ length: 6 }, () => ({ x: rnd(0, W), y: GROUND - 60 + rnd(-30, 30), r: rnd(170, 300), v: rnd(4, 11) }));
    const dews = Array.from({ length: 36 }, () => ({ x: rnd(0, W), y: GROUND + rnd(8, 76), ph: rnd(0, 6.28), sp: rnd(1.5, 3.5) }));
    let birdT = 3, chirpT = 4, meteorT = 6, cricketT = 2;
    /* seberapa "pagi" sekarang (0..1): naik saat matahari terbit, hilang menjelang siang */
    const morning = () => sstep(5.5, 6.6, env.h) * (1 - sstep(10.4, 11.8, env.h));
    function spawnFlock() {
      const dir = Math.random() < 0.5 ? 1 : -1, n = pick([1, 2, 3, 3, 5, 7]), y0 = rnd(50, 190), sp = rnd(55, 95), sc = rnd(0.75, 1.25), fl = rnd(7, 10);
      for (let i = 0; i < n; i++) {
        const row = Math.ceil(i / 2), side = i % 2 ? 1 : -1;
        birds.push({ x: dir > 0 ? -50 - row * 28 * sc : W + 50 + row * 28 * sc, y: y0 + side * row * 14 * sc, vx: dir * sp * rnd(0.97, 1.03), sc: sc, ph: rnd(0, 6.28), fl: fl * rnd(0.92, 1.08), bob: rnd(0, 6.28) });
      }
    }
    function updAmbient(dt) {
      const m = morning(), nn = env.n;
      birdT -= dt;
      if (birdT <= 0) { birdT = m > 0.25 ? rnd(7, 15) : 3; if (m > 0.25 && birds.length < 12) { spawnFlock(); sfx.bird(); } }
      chirpT -= dt;
      if (chirpT <= 0) { chirpT = rnd(2.5, 6); if (m > 0.3) sfx.bird(); }
      for (const b of birds) { b.x += b.vx * dt; b.ph += dt * b.fl; }
      for (let i = birds.length - 1; i >= 0; i--) if (birds[i].x < -100 || birds[i].x > W + 100) birds.splice(i, 1);
      for (const q of mists) { q.x += q.v * dt; if (q.x > W + q.r) q.x = -q.r; }
      if (nn > 0.75) {
        meteorT -= dt;
        if (meteorT <= 0) { meteorT = rnd(8, 18); meteors.push({ x: rnd(80, W - 140), y: rnd(10, 120), vx: rnd(380, 560), vy: rnd(160, 260), life: 0.8, max: 0.8 }); sfx.meteor(); }
        cricketT -= dt;
        if (cricketT <= 0) { cricketT = rnd(2.2, 5); sfx.cricket(); }
      }
      for (const q of meteors) { q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt; }
      for (let i = meteors.length - 1; i >= 0; i--) if (meteors[i].life <= 0) meteors.splice(i, 1);
    }
    function drawMeteors() {
      for (const q of meteors) {
        const a = clamp(q.life / q.max, 0, 1), L = Math.hypot(q.vx, q.vy), tx = q.x - q.vx / L * 95, ty = q.y - q.vy / L * 95;
        const gr = ctx.createLinearGradient(q.x, q.y, tx, ty); gr.addColorStop(0, "rgba(255,255,255," + a + ")"); gr.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = gr; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    }
    /* burung siluet terbang berkelompok (formasi V), sayap mengepak */
    function drawBirds() {
      if (!birds.length) return;
      const col = mixC("#2b2f5c", "#1f3350", clamp((env.h - 5.5) / 3, 0, 1));
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (const b of birds) {
        const f = Math.sin(b.ph), s = b.sc, w = 15 * s, tip = f * 9 * s, y = b.y + Math.sin(S.time * 1.1 + b.bob) * 3;
        ctx.strokeStyle = rgba(col, 0.88); ctx.lineWidth = 2.2 * s;
        ctx.beginPath(); ctx.moveTo(b.x - w, y - tip); ctx.quadraticCurveTo(b.x - w * 0.5, y - tip * 0.3 - 5 * s, b.x, y); ctx.quadraticCurveTo(b.x + w * 0.5, y - tip * 0.3 - 5 * s, b.x + w, y - tip); ctx.stroke();
        ctx.fillStyle = rgba(col, 0.9); ctx.beginPath(); ctx.ellipse(b.x + Math.sign(b.vx) * 1.5 * s, y + 1.5 * s, 3.4 * s, 2 * s, 0, 0, 6.2832); ctx.fill();
      }
    }
    /* kabut tipis di bukit (tebal saat subuh, tipis di malam hari) */
    function drawMist() {
      const mk = env.h < 12 ? 1 - sstep(6.0, 9.6, env.h) : 0, mf = Math.max(mk * 0.55, env.h > 12 ? env.n * 0.18 : 0);
      if (mf < 0.02) return;
      const mc = mixC(mixC("#ffffff", "#aab6ff", env.n), "#ffd2b0", env.sunset * 0.5);
      for (const q of mists) {
        ctx.save(); ctx.translate(q.x, q.y); ctx.scale(1, 0.2);
        const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, q.r); g2.addColorStop(0, rgba(mc, mf * 0.5)); g2.addColorStop(1, rgba(mc, 0));
        ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(0, 0, q.r, 0, 6.2832); ctx.fill(); ctx.restore();
      }
    }
    /* embun berkilau di rumput (pagi) + kunang-kunang (malam) */
    function drawAmbientFront() {
      const dm = morning() * (1 - sstep(8, 10.5, env.h)), nn = env.n;
      if (dm > 0.03 || nn > 0.35) {
        ctx.save(); ctx.globalCompositeOperation = "lighter";
        if (dm > 0.03) {
          ctx.strokeStyle = "#fffbe0"; ctx.lineWidth = 1; ctx.fillStyle = "#fffbe0";
          for (const d of dews) {
            const a = dm * Math.pow(0.5 + 0.5 * Math.sin(S.time * d.sp + d.ph), 3); if (a < 0.05) continue;
            ctx.globalAlpha = a; ctx.beginPath(); ctx.moveTo(d.x - 4, d.y); ctx.lineTo(d.x + 4, d.y); ctx.moveTo(d.x, d.y - 4); ctx.lineTo(d.x, d.y + 4); ctx.stroke();
            ctx.beginPath(); ctx.arc(d.x, d.y, 1.3, 0, 6.2832); ctx.fill();
          }
        }
        if (nn > 0.35) {
          for (const f of flies) {
            const x = f.x + Math.sin(S.time * f.sp + f.ph) * f.r, y = f.y + Math.cos(S.time * f.sp * 1.3 + f.ph) * f.r * 0.4;
            const a = nn * (0.4 + 0.6 * Math.pow(0.5 + 0.5 * Math.sin(S.time * 2.2 + f.ph * 3), 2));
            ctx.fillStyle = "rgba(200,255,120," + (a * 0.18) + ")"; ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.2832); ctx.fill();
            ctx.fillStyle = "rgba(235,255,170," + a + ")"; ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 6.2832); ctx.fill();
          }
        }
        ctx.restore();
      }
    }

    const SKY = [[5, "#252a63", "#f59a85"], [6.5, "#4f8fe0", "#ffd9a8"], [10, "#3b93ee", "#cdeaff"], [13, "#2a7fe0", "#b6e0ff"],
      [16.5, "#4f86dc", "#ffd29a"], [18.25, "#35306b", "#ff8a6a"], [19.5, "#16193f", "#7a4a8a"], [21, "#070b24", "#16204f"],
      [28, "#0a1030", "#1d2858"], [29, "#252a63", "#f59a85"]];
    function envAt(t) {
      const h = 5 + 24 * t;
      let i = 0; while (i < SKY.length - 2 && h >= SKY[i + 1][0]) i++;
      const a = SKY[i], b = SKY[i + 1], k = clamp((h - a[0]) / (b[0] - a[0]), 0, 1), sm = k * k * (3 - 2 * k);
      let n;
      if (h < 6.5) n = lerp(0.9, 0, (h - 5) / 1.5); else if (h < 18) n = 0; else if (h < 20) n = (h - 18) / 2; else if (h < 28) n = 1; else n = lerp(1, 0.9, h - 28);
      const sunset = Math.max(0, 1 - Math.abs(h - 6.3) / 1.3, 1 - Math.abs(h - 18.3) / 1.4);
      const label = h < 6.5 ? "Subuh" : h < 11 ? "Pagi" : h < 15.5 ? "Siang" : h < 18.5 ? "Sore" : h < 28 ? "Malam" : "Subuh";
      const hh = Math.floor(h % 24), mm = Math.floor((h % 1) * 60);
      return { h: h, top: mixC(a[1], b[1], sm), bot: mixC(a[2], b[2], sm), n: n, sunset: sunset, label: label,
        clock: String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0") };
    }
    const shadeCache = new Map();
    let env = envAt(0);
    function shade(c) {
      const key = c + "|" + Math.round(env.n * 20);
      let v = shadeCache.get(key);
      if (!v) { v = mixC(c, "#101a44", env.n * 0.5); if (shadeCache.size > 400) shadeCache.clear(); shadeCache.set(key, v); }
      return v;
    }

    /* ----- partikel & efek ----- */
    function burst(x, y, n, col, spd, add) {
      for (let i = 0; i < n; i++) {
        const a = rnd(0, 6.283), s = rnd(0.3, 1) * (spd || 220);
        S.fx.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 30, life: rnd(0.35, 0.8), max: 0.8, size: rnd(1.5, 4), col: col, add: !!add });
      }
    }
    function banner(title, sub, ms) {
      clearTimeout(bannerTimer);
      bannerEl.innerHTML = "<b>" + esc(title) + "</b>" + (sub ? "<small>" + esc(sub) + "</small>" : "");
      bannerEl.classList.remove("show"); void bannerEl.offsetWidth; bannerEl.classList.add("show");
      bannerTimer = setTimeout(() => bannerEl.classList.remove("show"), ms || 2400);
    }
    function showScreen(kind) {
      const best = getBest();
      let h = "";
      if (kind === "start") {
        const pos = getPos();
        h = '<div class="al-card"><p class="gh-eyebrow">' + diff.total + ' RONDE &middot; ' + diff.name.toUpperCase() + '</p><h2>Langit Tenang</h2>' +
          '<div class="al-diff" role="group" aria-label="Tingkat kesulitan">' +
          Object.keys(DIFFS).map(k => '<button type="button" data-act="diff" data-d="' + k + '" class="' + (DIFFS[k] === diff ? "is-on" : "") + '"><b>' + DIFFS[k].name + '</b><small>' + DIFFS[k].total + ' ronde</small></button>').join("") +
          '</div><p class="al-diff-note">' + diff.blurb + '</p>' +
          '<ul class="al-help"><li><kbd>A</kbd><kbd>D</kbd> atau panah: bergerak</li><li><kbd>W</kbd> / <kbd>Spasi</kbd>: lompat</li>' +
          '<li>Klik kiri atau <kbd>J</kbd>: serang (bidik dengan mouse)</li><li><kbd>1</kbd> Katana &middot; <kbd>2</kbd> Senapan &middot; <kbd>Q</kbd> ganti</li>' +
          '<li>Pos tersimpan tiap ' + POS_EVERY + ' ronde (HP pulih penuh)</li></ul>' +
          (best.wave ? '<p class="tb-best">Rekor ' + diff.name + ': ronde <b>' + best.wave + '</b>' + (best.time ? ' &middot; tercepat <b>' + fmtTime(best.time) + '</b>' : "") + '</p>' : "") +
          '<div class="tb-actions">' + (pos > 1
            ? '<button class="gh-btn" type="button" data-act="resume-pos">Lanjut dari pos (ronde ' + pos + ')</button><button class="gh-btn is-ghost" type="button" data-act="start">Mulai baru</button>'
            : '<button class="gh-btn" type="button" data-act="start">Mulai</button>') + '</div></div>';
      } else if (kind === "pause") {
        h = '<div class="al-card"><h2>Jeda</h2><p>Langit tetap menunggu.</p><div class="tb-actions"><button class="gh-btn" type="button" data-act="resume">Lanjut</button><button class="gh-btn is-ghost" type="button" data-act="menu">Menu game</button></div></div>';
      } else if (kind === "pos") {
        h = '<div class="al-card"><p class="gh-eyebrow">POS TERSIMPAN</p><h2>Pos peristirahatan</h2>' +
          '<p>Ronde ' + S.wave + ' selesai dan HP-mu pulih penuh. Kalau tumbang nanti, kamu mulai lagi dari sini (ronde ' + (S.wave + 1) + ').</p>' +
          '<p class="tb-best">Tersisa <b>' + (TOTAL - S.wave) + '</b> ronde</p>' +
          '<div class="tb-actions"><button class="gh-btn" type="button" data-act="nextpos">Lanjut ke ronde ' + (S.wave + 1) + '</button><button class="gh-btn is-ghost" type="button" data-act="menu">Menu game</button></div></div>';
      } else if (kind === "dead") {
        const back = diff.soft ? S.wave : S.checkpoint;
        const msg = diff.soft ? "ulangi ronde " + S.wave : back > 1 ? "kembali ke pos terakhir (ronde " + back + ")" : "mulai lagi dari ronde 1";
        h = '<div class="al-card"><h2>Kamu tumbang</h2><p>Tidak apa-apa. Tarik napas, lalu ' + msg + '.</p><div class="tb-actions"><button class="gh-btn" type="button" data-act="retry">Coba lagi</button><button class="gh-btn is-ghost" type="button" data-act="menu">Menu game</button></div></div>';
      } else if (kind === "victory") {
        h = '<div class="al-card"><p class="gh-eyebrow">SEMUA RONDE SELESAI &middot; ' + diff.name.toUpperCase() + '</p><h2>Langit kembali tenang</h2>' +
          '<p>Kamu mengalahkan semua alien dalam <b>' + fmtTime(S.runTime) + '</b>.' + (S.newRecord ? " Itu rekor baru!" : "") + '</p>' +
          '<div class="tb-actions"><button class="gh-btn" type="button" data-act="again">Main lagi</button><button class="gh-btn is-ghost" type="button" data-act="menu">Menu game</button></div></div>';
      }
      screenEl.innerHTML = h; screenEl.classList.toggle("on", !!h);
      const f = $(".gh-btn", screenEl); if (f) f.focus({ preventScroll: true });
    }

    /* ----- wave & alien ----- */
    function makeBoss(n) {
      const g = gOf(n), tier = g <= 5 ? 1 : g <= 10 ? 2 : 3, big = n % POS_EVERY === 0 || n === TOTAL;
      const hp = Math.round(bossHpFor(g) * diff.hpMul * (big ? 1.25 : 1));
      return { kind: "boss", x: W / 2, y: -140, hp: hp, max: hp, rx: 96, ry: 40, shield: true, t: 0, atk: 2.2, flash: 0, summoned: false, dead: false,
        tier: tier, big: big, pi: 0, name: BOSS_NAMES[tier - 1] + (big && n === TOTAL ? " Agung" : "") };
    }
    function startWave(n) {
      S.wave = n; S.g = gOf(n); S.phase = "intro"; S.phaseT = 0;
      S.aliens.length = 0; S.orbs.length = 0; S.bullets.length = 0; S.kuro = null; S.goryu = null; S.sjump = false; S.slam = false; S.waves = []; S.zcuts = [];
      S.getsugas = []; S.ifx = []; S.hbeam = null; S.finals = []; S.amukT = 0; S.pusT = 0;
      S.uarrows = []; S.ufx = []; S.usnipe = null; S.ubombs = []; S.urains = []; S.uvolley = null;
      if (S.ib) { S.ib.bolts = []; S.ib.flasks = []; S.ib.strokes = []; S.ib.rains = []; S.ib.drops = []; S.ib.fx = []; }
      S.queue = shuffle(waveComp(n));
      S.spawnT = 0.5;
      S.boss = makeBoss(n); S.aliens.push(S.boss);
      const p = S.player; p.hp = p.max; p.x = W / 2; p.vx = 0; p.vy = 0; p.y = FEET; p.inv = 0;
      banner("Ronde " + n + " / " + TOTAL, S.boss.big ? S.boss.name + " sudah dekat. Siapkan dirimu!" : "Sebuah wahana turun dari langit", 2600);
    }
    function minionsAlive() { let c = 0; for (const a of S.aliens) if (a.kind !== "boss" && !a.dead) c++; return c; }
    function makeAlien(kind, x, y) {
      const r = KIND_R[kind], hp = KIND_HP[kind] + (kind === "tank" ? Math.floor(S.g / 6) * 2 : 0);
      return { kind: kind, x: x, y: y, hp: hp, max: hp, flash: 0, dead: false, t: 0, pt: 0, state: "enter", et: 0,
        ph: rnd(0, 6.28), bx: rnd(90, W - 90), by: 120, sp: 0.7, amp: 90, nextDive: 5, nextShot: 3, charge: 0, rx: r[0], ry: r[1],
        ghost: false, gt: rnd(0, 2), nextBomb: 2, nextHeal: 3, aimX: 0, aimY: 0, beam: null, spin: rnd(0, 6.28) };
    }
    function spawnAlien(kind) {
      const b = S.boss, g = S.g, scale = Math.max(0.45, (1 - 0.04 * g) / diff.rate), R = rnd;
      const a = makeAlien(kind, b.x + rnd(-40, 40), b.y + 24);
      switch (kind) {
        case "drone": a.by = R(120, 260); a.sp = R(0.5, 0.9); a.amp = R(60, 130); a.nextDive = R(5, 9) * scale; break;
        case "swoop": a.by = R(100, 200); a.sp = R(0.9, 1.4); a.amp = R(90, 170); a.nextDive = R(3, 5.5) * scale; break;
        case "shooter": a.by = R(70, 150); a.sp = R(0.4, 0.7); a.amp = R(70, 120); a.nextShot = R(2.2, 4); break;
        case "bomber": a.by = R(60, 115); a.sp = R(0.35, 0.55); a.amp = R(230, 300); a.bx = W / 2; a.nextBomb = R(1.2, 2.4); break;
        case "tank": a.by = R(140, 210); a.sp = R(0.25, 0.35); a.amp = R(70, 120); a.nextShot = R(3, 5); break;
        case "splitter": a.by = R(110, 240); a.sp = R(0.6, 1); a.amp = R(70, 140); a.nextDive = R(4, 7) * scale; break;
        case "phantom": a.by = R(100, 220); a.sp = R(0.8, 1.2); a.amp = R(90, 170); a.nextDive = R(3.5, 5.5) * scale; break;
        case "kamikaze": a.by = R(100, 200); a.sp = R(0.7, 1); a.amp = R(80, 150); a.nextDive = R(2.5, 5) * scale; break;
        case "sniper": a.by = R(50, 100); a.sp = R(0.3, 0.5); a.amp = R(100, 180); a.nextShot = R(3, 5); break;
        case "spinner": a.by = R(100, 170); a.sp = R(0.35, 0.55); a.amp = R(120, 200); a.nextShot = R(2.5, 4); break;
        case "medic": a.by = R(80, 140); a.sp = R(0.4, 0.6); a.amp = R(100, 200); a.nextHeal = R(2, 3.5); break;
      }
      S.aliens.push(a); sfx.spawn();
    }
    // Kyōka Suigetsu: selama aktif, musuh membidik bayangan palsu, bukan pemain.
    const foeX = () => S.kyokaT > 0 ? S.kyokaDecoyX : S.player.x;
    const foeY = () => S.kyokaT > 0 ? FEET - 40 : S.player.y - 40;
    function enemyOrb(x, y, tx, ty, speed, dmg, r, col) {
      const a = Math.atan2(ty - y, tx - x);
      // Sakanade membalik arah bidikan proyektil musuh.
      const dir = S.sekaiT > 0 ? -1 : 1;
      S.orbs.push({ x: x, y: y, vx: Math.cos(a) * speed * dir, vy: Math.sin(a) * speed * dir, r: r, dmg: dmg, col: col, life: 7 });
    }
    function bossSpread(b) {
      const a0 = Math.atan2(foeY() - b.y, foeX() - b.x), sp = 160 + S.g * 10;
      const dir = S.sekaiT > 0 ? -1 : 1;
      const offs = S.g >= 9 ? [-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6] : S.g >= 4 ? [-0.5, -0.25, 0, 0.25, 0.5] : [-0.3, 0, 0.3];
      for (const o of offs) S.orbs.push({ x: b.x, y: b.y + 20, vx: Math.cos(a0 + o) * sp * dir, vy: Math.sin(a0 + o) * sp * dir, r: 9, dmg: 8, col: "#ff6ad5", life: 7 });
    }
    function bossAttack(b) {
      const pats = b.tier === 1 ? ["spread"] : b.tier === 2 ? ["spread", "ring", "aimed"] : ["spread", "ring", "rain", "aimed"];
      const pat = pats[b.pi++ % pats.length], dir = S.sekaiT > 0 ? -1 : 1;
      if (pat === "spread") bossSpread(b);
      else if (pat === "ring") {
        const n = 10 + b.tier * 2, off = rnd(0, 6.28), sp = 130 + S.g * 3;
        for (let i = 0; i < n; i++) { const an = off + i / n * 6.2832; S.orbs.push({ x: b.x, y: b.y + 20, vx: Math.cos(an) * sp * dir, vy: Math.sin(an) * sp * dir, r: 8, dmg: 7, col: "#ffb86a", life: 7 }); }
        sfx.spawn();
      } else if (pat === "aimed") {
        const a0 = Math.atan2(foeY() - b.y, foeX() - b.x);
        for (const o of [-0.07, 0, 0.07]) S.orbs.push({ x: b.x, y: b.y + 20, vx: Math.cos(a0 + o) * 280 * dir, vy: Math.sin(a0 + o) * 280 * dir, r: 7, dmg: 9, col: "#ff6a8a", life: 6 });
        sfx.zap();
      } else if (pat === "rain") {
        for (let i = 0; i < 9; i++) S.orbs.push({ x: rnd(40, W - 40), y: -10 - rnd(0, 70), vx: 0, vy: 170 + S.g * 4, r: 8, dmg: 8, col: "#9ad7ff", life: 6 });
        sfx.bomb();
      }
    }
    function bossDie() {
      const b = S.boss; if (b.dead) return;
      b.dead = true; S.phase = "bossdead"; S.phaseT = 0; S.orbs.length = 0;
      for (const a of S.aliens) if (a.kind !== "boss" && !a.dead) { a.dead = true; burst(a.x, a.y, 10, "#8aff9b", 200, true); }
      burst(b.x, b.y, 70, "#ffd27a", 360, true); burst(b.x, b.y, 40, "#ff7ab6", 260, true);
      sfx.boom();
    }
    function splitInto(a) {
      for (const side of [-1, 1]) {
        const m = makeAlien("mini", a.x + side * 10, a.y);
        m.bx = clamp(a.x + side * 70, 60, W - 60); m.by = clamp(a.y + rnd(-20, 30), 70, 300);
        m.sp = rnd(0.9, 1.3); m.amp = rnd(50, 90); m.nextDive = rnd(1.6, 3); m.et = 0.5;
        S.aliens.push(m);
      }
    }
    function kamikazeBoom(a) {
      if (a.dead) return; a.dead = true; S.kills++;
      burst(a.x, a.y, 28, "#ff8a3c", 320, true); burst(a.x, a.y, 14, "#fff3a8", 220, true); sfx.pop();
      const dir = S.sekaiT > 0 ? -1 : 1;
      for (let i = 0; i < 8; i++) { const an = i / 8 * 6.2832 + rnd(0, 0.4); S.orbs.push({ x: a.x, y: a.y, vx: Math.cos(an) * 150 * dir, vy: Math.sin(an) * 150 * dir, r: 5, dmg: 5, col: "#ff8a3c", life: 4 }); }
      const p = S.player; if (p.inv <= 0 && S.phase !== "dead" && Math.hypot(a.x - p.x, a.y - (p.y - 34)) < 90) hurt(12);
    }
    function damageAlien(a, d, kx, ky) {
      if (a.dead || a.ant) return;
      if (a.bindT > 0) d = Math.ceil(d * 1.5);   // musuh terikat rantai menerima damage lebih besar
      if (a.kind === "boss") {
        if (a.shield) { burst(a.x + rnd(-60, 60), a.y + rnd(-20, 20), 3, "#8be9ff", 120, true); sfx.ping(); return; }
        a.hp -= d; a.flash = 1; sfx.hit(); burst(a.x + rnd(-40, 40), a.y + rnd(-10, 25), 4, "#ffe9a0", 160, true);
        if (a.hp <= 0) bossDie();
        return;
      }
      if (a.ghost) { burst(a.x, a.y, 3, "#cfe6ff", 100, true); sfx.ping(); return; }   // hantu menembus serangan
      a.hp -= d; a.flash = 1; sfx.hit();
      if (a.hp <= 0) {
        a.dead = true; S.kills++; burst(a.x, a.y, a.kind === "tank" ? 30 : 16, KIND_COL[a.kind] || "#8aff9b", 230, true); sfx.pop();
        if (a.kind === "splitter") splitInto(a);
      }
      else { if (a.state === "dive") { a.state = "return"; a.rt = 0; a.sx = a.x; a.sy = a.y; } }
    }

    function updAlien(a, dt) {
      a.t += dt; a.flash = Math.max(0, a.flash - dt * 6);
      const p = S.player, k0 = a.kind;
      if (k0 === "boss") return;
      if (a.ant) { ibAntStep(a, dt); return; }   // semut tinta: jatuh, tidak menyerang
      if (a.bindT > 0) { a.bindT -= dt; return; }   // terikat Rantai Penjerat: diam di tempat
      const g = S.g, rate = diff.rate, scale = Math.max(0.45, (1 - 0.04 * g) / rate);
      const px = () => a.bx + Math.sin(a.pt * a.sp + a.ph) * a.amp, py = () => a.by + Math.sin(a.pt * 1.3 + a.ph) * 14;
      if (k0 === "phantom") { a.gt += dt; a.ghost = a.state !== "dive" && a.gt % 4.6 > 3.1; }
      if (a.state === "enter") {
        a.et += dt; a.x = lerp(a.x, px(), Math.min(1, dt * 2.4)); a.y = lerp(a.y, py(), Math.min(1, dt * 2.4));
        if (a.et > 0.9) a.state = "patrol";
      } else if (a.state === "patrol") {
        a.pt += dt; a.x = px(); a.y = py();
        if (k0 === "shooter") {
          a.nextShot -= dt; a.charge = a.nextShot < 0.7 ? 1 - a.nextShot / 0.7 : 0;
          if (a.nextShot <= 0) { enemyOrb(a.x, a.y + 8, foeX(), foeY(), 185 + g * 8, 6, 7, "#7dff9a"); a.nextShot = rnd(2.8, 4.4) * Math.max(0.5, 1 - 0.03 * g) / rate; a.charge = 0; }
        } else if (k0 === "bomber") {
          a.nextBomb -= dt;
          if (a.nextBomb <= 0) { S.orbs.push({ x: a.x, y: a.y + 12, vx: 0, vy: 150 + g * 5, r: 8, dmg: 7, col: "#ffb04a", life: 6 }); sfx.bomb(); a.nextBomb = rnd(1.5, 2.6) / rate; }
        } else if (k0 === "tank") {
          a.nextShot -= dt; a.charge = a.nextShot < 0.9 ? 1 - a.nextShot / 0.9 : 0;
          if (a.nextShot <= 0) {
            const sp = 125 + g * 4; enemyOrb(a.x, a.y + 12, foeX(), foeY(), sp, 10, 11, "#ffb36b");
            if (g >= 9) { enemyOrb(a.x, a.y + 12, foeX() - 130, foeY(), sp, 8, 9, "#ffb36b"); enemyOrb(a.x, a.y + 12, foeX() + 130, foeY(), sp, 8, 9, "#ffb36b"); }
            a.nextShot = rnd(3.6, 5) / rate; a.charge = 0;
          }
        } else if (k0 === "sniper") {
          a.nextShot -= dt;
          if (a.nextShot < 1.5) { a.charge = 1 - a.nextShot / 1.5; if (a.nextShot > 0.35) { a.aimX = foeX(); a.aimY = foeY(); } } else a.charge = 0;
          if (a.nextShot <= 0) { enemyOrb(a.x, a.y + 6, a.aimX, a.aimY, 430, 14, 5, "#ff5a5a"); sfx.zap(); a.nextShot = rnd(4, 6) / rate; a.charge = 0; }
        } else if (k0 === "spinner") {
          a.spin += dt * 2.2; a.nextShot -= dt; a.charge = a.nextShot < 0.8 ? 1 - a.nextShot / 0.8 : 0;
          if (a.nextShot <= 0) {
            const n = g >= 12 ? 12 : 8, dir = S.sekaiT > 0 ? -1 : 1, sp = 115 + g * 3;
            for (let i = 0; i < n; i++) { const an = a.spin + i / n * 6.2832; S.orbs.push({ x: a.x, y: a.y, vx: Math.cos(an) * sp * dir, vy: Math.sin(an) * sp * dir, r: 6, dmg: 6, col: "#ffd24a", life: 6 }); }
            sfx.spawn(); a.nextShot = rnd(3.2, 4.6) / rate; a.charge = 0;
          }
        } else if (k0 === "medic") {
          a.nextHeal -= dt;
          if (a.beam) { a.beam.t -= dt; if (a.beam.t <= 0) a.beam = null; }
          if (a.nextHeal <= 0) {
            let tgt = null, bd = 1e9;
            for (const o of S.aliens) if (o !== a && !o.dead && o.kind !== "boss" && o.hp < o.max) { const d = Math.hypot(o.x - a.x, o.y - a.y); if (d < bd) { bd = d; tgt = o; } }
            if (tgt) { tgt.hp = Math.min(tgt.max, tgt.hp + 2); a.beam = { o: tgt, t: 0.45 }; burst(tgt.x, tgt.y, 6, "#9dffb0", 90, true); sfx.ping(); a.nextHeal = rnd(2.6, 3.6) / rate; }
            else a.nextHeal = 1;
          }
        } else if (DIVE[k0]) {
          a.nextDive -= dt;
          if (a.nextDive <= 0 && S.phase !== "bossdead" && !a.ghost) { a.state = "dive"; a.dt = 0; a.tx = (S.sekaiT > 0 ? W - foeX() : foeX()) + rnd(-20, 20); a.ty = FEET - 30; a.sx = a.x; a.sy = a.y; a.dur = DIVE[k0][2]; }
        }
      } else if (a.state === "dive") {
        a.dt += dt; const k = Math.min(1, a.dt / a.dur), e = k * k;
        a.x = lerp(a.sx, a.tx, e); a.y = lerp(a.sy, a.ty, e);
        if (k >= 1) { if (k0 === "kamikaze") { kamikazeBoom(a); return; } a.state = "return"; a.rt = 0; a.sx = a.x; a.sy = a.y; }
      } else if (a.state === "return") {
        a.rt += dt; const k = Math.min(1, a.rt / 1.1), e = 1 - (1 - k) * (1 - k);
        a.x = lerp(a.sx, px(), e); a.y = lerp(a.sy, py(), e);
        if (k >= 1) { a.state = "patrol"; const dv = DIVE[k0]; if (dv) a.nextDive = rnd(dv[0], dv[1]) * scale; }
      }
      const dist = Math.hypot(a.x - p.x, a.y - (p.y - 34));
      if (k0 === "kamikaze" && a.state === "dive" && dist < a.rx + 26) { kamikazeBoom(a); return; }
      if (!a.ghost && KIND_DMG[k0] > 0 && p.inv <= 0 && S.phase !== "dead" && dist < a.rx * 0.8 + 16) hurt(KIND_DMG[k0]);
    }
    function updBoss(dt) {
      const b = S.boss, p = S.player; if (!b || b.dead) return;
      if (b.inkT > 0) { b.inkT -= dt; dt *= 0.4; }   // terbungkus tinta: melambat
      b.t += dt; b.flash = Math.max(0, b.flash - dt * 6);
      if (b.bindT > 0) { b.bindT -= dt; if (S.phase === "boss") return; }
      if (S.phase === "intro") {
        const k = clamp(S.phaseT / 2.2, 0, 1), e = 1 - Math.pow(1 - k, 3);
        b.y = lerp(-140, 84, e); b.x = W / 2;
        if (k >= 1) { S.phase = "minions"; S.phaseT = 0; }
      } else if (S.phase === "minions") {
        b.x = W / 2 + Math.sin(b.t * 0.5) * 250; b.y = 84 + Math.sin(b.t * 1.2) * 6;
        S.spawnT -= dt;
        if (S.queue.length && S.spawnT <= 0) { spawnAlien(S.queue.shift()); S.spawnT = Math.max(0.55, 1.3 - 0.05 * S.g) / diff.rate; }
        if (!S.queue.length && minionsAlive() === 0) {
          S.phase = "descend"; S.phaseT = 0; b.shield = false; b.sy = b.y;
          banner("Perisai runtuh!", "Sekarang saatnya menyerang alien besar", 2600);
        }
      } else if (S.phase === "descend") {
        const k = clamp(S.phaseT / 2.4, 0, 1), e = k * k * (3 - 2 * k);
        b.y = lerp(b.sy, 290, e); b.x = lerp(b.x, W / 2, Math.min(1, dt * 2));
        if (k >= 1) { S.phase = "boss"; S.phaseT = 0; b.atk = 1.6; }
      } else if (S.phase === "boss") {
        b.x = lerp(b.x, clamp(W / 2 + Math.sin(b.t * 0.45) * 300 + (p.x - W / 2) * 0.25, 120, W - 120), Math.min(1, dt * 1.2));
        b.y = 290 + Math.sin(b.t * 1.4) * 10;
        if (!(b.inkT > 0)) b.atk -= dt;   // terbungkus tinta: tidak bisa menembak
        if (b.atk <= 0) { bossAttack(b); b.atk = Math.max(1.2, 3 - 0.24 * S.g) / diff.rate; }
        if (b.big && !b.summoned && b.hp < b.max / 2) {
          b.summoned = true; banner("Bala bantuan!", b.name + " memanggil pasukannya", 2200);
          const pool = b.tier === 1 ? ["drone", "swoop"] : b.tier === 2 ? ["swoop", "kamikaze"] : ["kamikaze", "phantom"];
          for (let i = 0; i < 3 + b.tier; i++) spawnAlien(pool[i % pool.length]);
        }
        if (p.inv <= 0 && S.phase === "boss" && !(b.inkT > 0)) {
          const dx = (p.x - b.x) / (b.rx * 0.9), dy = ((p.y - 34) - b.y) / (b.ry * 1.1);
          if (dx * dx + dy * dy < 1) hurt(12);
        }
      }
    }
    function hurt(d) {
      const p = S.player; if (p.inv > 0 || S.phase === "dead" || S.phase === "victory") return;
      if (S.sjump && !p.onGround) return;   // saat lompat raksasa Zaraki kebal
      if (S.gojo && S.gform >= 1 && (S.gdomain || Math.random() < 0.3)) { burst(p.x, p.y - 40, 8, "#9fe3ff", 220, true); gRing(p.x, p.y - 44, 90, "150,225,255", 0.4); sfx.ping(); return; }   // Infinity / Domain
      if (S.zaraki) d = Math.max(1, Math.round(d * (S.bankai ? 0.5 : 0.6)));
      else if (S.shinji || S.aizen) d = Math.max(1, Math.round(d * 0.65));
      else if (S.ichigo) d = Math.max(1, Math.round(d * (S.amukT > 0 ? 0.45 : [0.85, 0.7, 0.75, 0.55][S.iform])));
      else if (S.uryu) d = Math.max(1, Math.round(d * (S.uform ? 0.8 : 0.95)));
      else if (S.gojo) d = Math.max(1, Math.round(d * [0.9, 0.75, 0.5][S.gform]));
      else if (S.ib.on) d = Math.max(1, Math.round(d * [0.9, 0.7][S.ib.form]));
      d = Math.max(1, Math.round(d * diff.dmg));
      p.hp -= d; p.inv = 0.9; p.lastHurt = S.time; p.vy = -260; sfx.hurt();
      burst(p.x, p.y - 34, 10, "#ff7a7a", 200, false);
      if (p.hp <= 0) { p.hp = 0; S.phase = "dead"; showScreen("dead"); }
    }

    /* ----- serangan pemain ----- */
    function nearestTarget(range) {
      const p = S.player; let best = null, bd = range;
      for (const a of S.aliens) {
        if (a.dead || a.ghost || (a.kind === "boss" && S.phase !== "boss" && S.phase !== "descend" && S.phase !== "minions")) continue;
        const d = Math.hypot(a.x - p.x, a.y - (p.y - 40)) - (a.kind === "boss" ? 40 : 0);
        if (d < bd) { bd = d; best = a; }
      }
      return best;
    }
    function aimAngle() {
      const p = S.player, cx = p.x, cy = p.y - 40;
      if (performance.now() - lastMouse < 3000) return Math.atan2(my - cy, mx - cx);
      const t = nearestTarget(700);
      if (t) return Math.atan2(t.y - cy, t.x - cx);
      return p.face > 0 ? 0 : Math.PI;
    }
    const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    function toggleShinji() {
      if (!S || !S.shinjiUnlocked) { banner("Shinji terkunci", "Temukan Easter Egg dengan 10 ketukan saat lagu rahasia diputar", 3000); return; }
      S.shinji = !S.shinji;
      if (!S.shinji) { S.sekaiT = 0; S.sakanade = false; S.ceroMaskT = 0; S.surge = null; } else { shinjiTransform(); }
      banner(S.shinji ? "Shinji Mode aktif" : "Shinji Mode nonaktif", S.shinji ? "Sakashima ni nare, Sakanade · topeng Visored & reiatsu terbuka" : "Kembali ke perlengkapan biasa", S.shinji ? 3000 : 2200);
    }
    function useSekai() {
      if (!S || !S.shinji || S.sekaiT > 0 || S.phase === "start") return;
      S.sekaiT = 6; sfx.sekai(); sfx.voice("v_sekai", "ようこそ、さかさまの せかいへ");
      banner("Sakanade: Dunia Terbalik", "Serangan musuh berbalik arah selama 6 detik", 2200);
      burst(S.player.x, S.player.y - 40, 42, "#c9b6ff", 260, true);
    }
    function useSakanade() {
      if (!S || !S.shinji || S.phase === "start") return;
      S.sakanade = !S.sakanade; sfx.sakanade(S.sakanade);
      banner(S.sakanade ? "Sakanade aktif" : "Sakanade disimpan", S.sakanade ? "Pedang terbalik siap digunakan" : "Kembali ke serangan biasa", 1700);
    }
    function useCero() {
      if (!S || !S.shinji || S.ceroCd > 0 || S.phase === "start" || S.phase === "dead" || S.phase === "victory") return;
      const p = S.player, ang = S.aimAng, target = nearestTarget(760);
      S.ceroCd = 8; S.ceroFx = 0.62; S.ceroMaskT = S.maskMax = 1.35; maskBurst();
      const sx = p.x + Math.cos(ang) * 20, sy = p.y - 42 + Math.sin(ang) * 20;
      burst(sx, sy, 28, "#7ef5ff", 300, true);
      if (target) {
        const dx = target.x - sx, dy = target.y - sy;
        if (angDiff(Math.atan2(dy, dx), ang) < 0.58) damageAlien(target, target.kind === "boss" ? 14 : 99, Math.cos(ang), Math.sin(ang));
      }
      sfx.cero(); sfx.voice("v_cero", "セロ！"); banner("CERO!", "Serangan kuat · cooldown 8 detik", 1500);
    }
    /* ===== SKILL AIZEN: transformasi · Kyōka Suigetsu · Hadō 90 · Hadō 99 ===== */
    const castOk = () => S && S.aizen && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory";
    function kyokaShatter() {
      if (!window.bleachShatter) return;
      try {
        const h = window.bleachShatter(wrap, { cx: clamp(S.player.x / W, 0.2, 0.8), cy: 0.45, shake: wrap });
        h.crack(); setTimeout(h.shatter, 480); setTimeout(h.destroy, 3000);
      } catch (_) {}
    }
    /* efek masuk mode (reiatsu + kupu-kupu untuk Aizen, reiatsu + 逆 untuk Shinji) */
    function startSurge(kind) {
      const fl = [];
      if (kind === "aizen") {
        const cols = ["#c4b5fd", "#e9e6ff", "#7ee7ff", "#9d7bff"];
        for (let i = 0; i < 36; i++) fl.push({ a: rnd(0, 6.283), r: rnd(8, 36), sp: rnd(0.9, 1.9) * (i % 2 ? 1 : -1), rise: rnd(70, 190), dl: rnd(0.25, 1.4), ph: rnd(0, 6.28), sz: rnd(0.8, 1.5), c: cols[i % 4] });
      } else if (kind === "zaraki" || kind === "zbankai") {
        const n = kind === "zbankai" ? 64 : 38, cz = ["255,90,40", "255,200,90", "255,40,40"];
        for (let i = 0; i < n; i++) fl.push({ a: rnd(0, 6.283), r: rnd(10, 46), sp: rnd(0.6, 1.5) * (i % 2 ? 1 : -1), rise: rnd(80, 210), dl: rnd(0.1, 1.5), ph: rnd(0, 6.28), sz: rnd(0.8, 1.6), c: cz[i % 3], g: i % 6 === 0 });
      } else if (kind.charAt(0) === "u") {
        const P = UPAL[kind === "uletzt" ? 1 : 0], n = kind === "uletzt" ? 64 : 40, cz = [P.a, P.b, P.c];
        for (let i = 0; i < n; i++) fl.push({ a: rnd(0, 6.283), r: rnd(10, 46), sp: rnd(0.6, 1.5) * (i % 2 ? 1 : -1), rise: rnd(80, 210), dl: rnd(0.1, 1.5), ph: rnd(0, 6.28), sz: rnd(0.8, 1.6), c: cz[i % 3], g: i % 6 === 0 });
      } else if (kind.charAt(0) === "i") {
        const P = IPAL[IKEY.indexOf(kind)], n = kind === "ishikai" ? 30 : kind === "ibankai" ? 52 : kind === "ihollow" ? 56 : 60, cz = [P.a, P.b, P.c];
        for (let i = 0; i < n; i++) fl.push({ a: rnd(0, 6.283), r: rnd(10, 46), sp: rnd(0.6, 1.5) * (i % 2 ? 1 : -1), rise: rnd(80, 210), dl: rnd(0.1, 1.5), ph: rnd(0, 6.28), sz: rnd(0.8, 1.6), c: cz[i % 3], g: i % 6 === 0 });
      } else {
        for (let i = 0; i < 18; i++) fl.push({ a: rnd(0, 6.283), r: rnd(14, 60), sp: rnd(0.5, 1.2) * (i % 2 ? 1 : -1), rise: rnd(60, 170), dl: rnd(0.2, 1.2), ph: rnd(0, 6.28), sz: rnd(0.9, 1.6), c: i % 3 ? "255,214,80" : "255,79,147" });
      }
      S.surge = { kind: kind, t: 0, dur: kind === "shinji" ? 2.8 : kind === "zaraki" ? 3 : kind === "zbankai" ? 3.8 : kind === "uquincy" ? 2.6 : kind === "uletzt" ? 3.6 : kind === "ishikai" ? 2.4 : kind === "ibankai" ? 3.2 : kind === "ihollow" ? 3.6 : kind === "ichain" ? 3.8 : 3.4, fl: fl };
    }
    function maskBurst() {
      const p = S.player;
      burst(p.x, p.y - 66, 24, "#ff3d5a", 280, true); burst(p.x, p.y - 66, 18, "#ffd84a", 220, true);
    }
    function shinjiTransform() {
      const p = S.player;
      startSurge("shinji"); S.ceroMaskT = S.maskMax = 1.7; maskBurst(); sfx.transform("shinji"); sfx.voice("v_shinji", "さかさまに なれ、さかなで"); S.quake = 0.5;
      burst(p.x, p.y - 40, 50, "#ffd84a", 320, true); burst(p.x, p.y - 40, 30, "#ff4f93", 260, true);
      setTimeout(() => { if (S && S.shinji) { sfx.boom(); S.quake = 0.9; } }, 650);
    }
    function resetAizen() { S.aizen = false; S.kyokaT = 0; S.kyokaCd = 0; S.kuro = null; S.goryu = null; S.castT = 0; }
    function toggleAizen() {
      if (!S || !S.aizenUnlocked) { banner("Aizen terkunci", "Panggil Sōsuke Aizen dari menu Bleach di website lebih dulu", 3000); return; }
      S.aizen = !S.aizen;
      if (S.aizen) {
        startSurge("aizen"); sfx.transform("aizen"); sfx.voice("v_aizen", "ようこそ、わたしの ソウルソサエティへ"); S.quake = 0.5;
        setTimeout(() => { if (S && S.aizen) { sfx.boom(); S.quake = 0.9; } }, 1000);
        burst(S.player.x, S.player.y - 40, 46, "#c4b5fd", 300, true); burst(S.player.x, S.player.y - 40, 26, "#7ee7ff", 240, true);
        banner("Aizen Mode aktif", "Yōkoso, watashi no Soul Society e · Hadō & Kyōka Suigetsu terbuka", 3200);
      } else {
        resetAizen(); banner("Aizen Mode nonaktif", "Kembali ke perlengkapan biasa", 2000);
      }
    }
    function useKyoka() {
      if (!castOk() || S.kyokaT > 0 || S.kyokaCd > 0) return;
      const p = S.player; S.kyokaT = 7;
      S.kyokaDecoyX = clamp(p.x + (p.x < W / 2 ? 1 : -1) * 260, 70, W - 70);
      kyokaShatter(); sfx.kyoka(); sfx.voice("v_kyoka", "くだけろ、きょうかすいげつ"); S.quake = 0.6;
      burst(S.kyokaDecoyX, FEET - 40, 36, "#c4b5fd", 240, true); burst(p.x, p.y - 40, 24, "#7ee7ff", 200, true);
      sfx.spawn();
      banner("Kyōka Suigetsu", "Kudakero… selama 7 detik musuh hanya membidik bayangan palsumu", 2200);
    }
    function useKuro() {
      if (!castOk() || S.kuroCd > 0 || S.kuro) return;
      const p = S.player, ang = S.aimAng, tg = nearestTarget(780);
      let zx, zy;
      if (tg) { zx = tg.x; zy = tg.y; } else { zx = p.x + Math.cos(ang) * 300; zy = p.y - 60 + Math.sin(ang) * 300; }
      zx = clamp(zx, 140, W - 140); zy = clamp(zy, 150, FEET - 110);
      S.kuro = { x: zx, y: zy, t: 0, w: 270, h: 300, hit: false };
      S.kuroCd = 14; S.castT = 1.4; S.castKind = "kuro"; sfx.kuroCast(); sfx.voice("v_kuro", "はどうの きゅうじゅう、くろひつぎ");
      banner("Hadō no. 90 · Kurohitsugi", "黒棺 — peti mati hitam turun mengurung area bidik", 1900);
    }
    const inKuro = (k, a, pad) => Math.abs(a.x - k.x) <= k.w / 2 + (a.rx || 0) * pad && Math.abs(a.y - k.y) <= k.h / 2 + (a.ry || 0) * pad;
    function kuroBlast(k) {
      k.hit = true; S.quake = 1; sfx.kuroBlast();
      for (const a of S.aliens) if (!a.dead && inKuro(k, a, 0.6)) damageAlien(a, a.kind === "boss" ? 18 : 99, 0, 0);
      for (const o of S.orbs) if (inKuro(k, o, 0)) { o.life = 0; burst(o.x, o.y, 5, o.col, 140, true); }
      burst(k.x, k.y, 70, "#8a5cff", 400, true); burst(k.x, k.y, 40, "#0b0618", 280, false); burst(k.x, k.y, 30, "#7ee7ff", 320, true);
    }
    function useGoryu() {
      if (!castOk() || S.goryuCd > 0 || S.goryu) return;
      const p = S.player, ang = S.aimAng;
      S.goryu = { ang: ang, t: 0, hit: false, ox: p.x + Math.cos(ang) * 26, oy: p.y - 44 + Math.sin(ang) * 26 };
      S.goryuCd = 22; S.castT = 1.0; S.castKind = "goryu"; sfx.goryuCast(); sfx.voice("v_goryu", "はどうの きゅうじゅうきゅう、ごりゅうてんめつ");
      banner("Hadō no. 99 · Goryūtenmetsu", "五龍転滅 — lima naga energi menyapu arah bidik", 1900);
    }
    function goryuBlast(g) {
      g.hit = true; S.quake = 1; sfx.goryuBlast();
      for (const a of S.aliens) {
        if (a.dead) continue;
        const dx = a.x - g.ox, dy = a.y - g.oy, d = Math.hypot(dx, dy);
        if (d < 1100 && (angDiff(Math.atan2(dy, dx), g.ang) < 0.5 || d < a.rx + 40)) damageAlien(a, a.kind === "boss" ? 26 : 99, Math.cos(g.ang), Math.sin(g.ang));
      }
      for (const o of S.orbs) {
        const dx = o.x - g.ox, dy = o.y - g.oy;
        if (angDiff(Math.atan2(dy, dx), g.ang) < 0.55) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      }
      const cols = ["#ff4d6d", "#ffb84d", "#7dff9a", "#4dd2ff", "#b06bff"];
      for (let i = 1; i <= 10; i++) burst(g.ox + Math.cos(g.ang) * i * 90, g.oy + Math.sin(g.ang) * i * 90, 6, cols[i % 5], 240, true);
    }

    /* ===== SKILL ZARAKI: Nozarashi · Lompat Raksasa · Tebasan Liar · Bankai ===== */
    const zOk = () => S && S.zaraki && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory";
    function resetZaraki() { S.zaraki = false; S.bankai = false; S.bankaiT = 0; S.bankaiCd = 0; S.lompatCd = 0; S.tebasCd = 0; S.sjump = false; S.slam = false; S.waves = []; S.zcuts = []; S.surge = null; }
    function toggleZaraki() {
      if (!S || !S.zarakiUnlocked) { banner("Zaraki terkunci", "Panggil Kenpachi Zaraki dari menu Bleach di website lebih dulu", 3000); return; }
      S.zaraki = !S.zaraki;
      if (S.zaraki) {
        startSurge("zaraki"); sfx.transform("zaraki"); sfx.voice("v_zaraki", "のざらし"); S.quake = 0.5;
        setTimeout(() => { if (S && S.zaraki) { sfx.boom(); S.quake = 0.9; } }, 900);
        burst(S.player.x, S.player.y - 40, 46, "#ff5a2a", 320, true); burst(S.player.x, S.player.y - 40, 26, "#ffd08a", 240, true);
        banner("Nozarashi!", "野晒 — lompat lebih tinggi, tebasan lebih berat, kulit lebih keras", 3200);
      } else { resetZaraki(); banner("Zaraki Mode nonaktif", "Kembali ke perlengkapan biasa", 2000); }
    }
    function useLompat() {
      if (!zOk()) return;
      const p = S.player;
      if (S.sjump && !p.onGround) { slamDown(); return; }
      if (S.lompatCd > 0 || !p.onGround) return;
      p.vy = -1150; p.onGround = false; S.sjump = true; S.slam = false; S.lompatCd = 3.5; S.quake = 0.5; sfx.stomp(); sfx.jumpBig();
      S.waves.push({ x: p.x, y: FEET + 2, t: 0, dur: 0.5, R: 150, col: "255,150,60" });
      burst(p.x, FEET, 34, "#ffb15a", 330, true); burst(p.x, FEET, 18, "#8a6a44", 220, false);
      banner("Lompat Raksasa", "Tekan 3 / S lagi saat di udara untuk menghantam tanah", 2100);
    }
    function slamDown() {
      const p = S.player;
      if (!zOk() || !S.sjump || p.onGround || S.slam) return;
      S.slam = true; p.vy = 2300; sfx.slash("zaraki");
      burst(p.x, p.y - 40, 20, "#ff6a3a", 260, true);
    }
    function landShock() {
      const p = S.player, slam = S.slam, R = slam ? 420 : 280;
      S.sjump = false; S.slam = false; S.quake = slam ? 1.3 : 0.8; sfx.stomp(); if (slam) sfx.boom();
      S.waves.push({ x: p.x, y: FEET + 2, t: 0, dur: slam ? 0.85 : 0.6, R: R, col: slam ? "255,70,50" : "255,170,70" });
      if (slam) S.waves.push({ x: p.x, y: FEET + 2, t: -0.12, dur: 0.85, R: R * 0.7, col: "255,210,120" });
      for (const a of S.aliens) {
        if (a.dead) continue;
        const dx = a.x - p.x, dy = a.y - FEET, d = Math.hypot(dx, dy * 0.8);
        if (d <= R + a.rx * 0.5) damageAlien(a, S.bankai ? 9999 : a.kind === "boss" ? (slam ? 16 : 9) : 99, Math.sign(dx), 0);
      }
      for (const o of S.orbs) { if (Math.hypot(o.x - p.x, (o.y - FEET) * 0.8) <= R) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); } }
      burst(p.x, FEET, slam ? 70 : 46, "#ffb15a", 420, true); burst(p.x, FEET, 40, "#7a5a3a", 300, false);
      for (let i = 0; i < 18; i++) S.fx.push({ x: p.x + rnd(-R, R) * 0.5, y: FEET, vx: rnd(-90, 90), vy: -rnd(120, 380), life: rnd(0.4, 0.9), max: 0.9, size: rnd(2, 5), col: "#6b5136", add: false });
    }
    function useTebas() {
      if (!zOk() || S.tebasCd > 0) return;
      const p = S.player, ang = S.aimAng, R = S.bankai ? 470 : 340, cx = p.x, cy = p.y - 40;
      S.tebasCd = 5; p.slash = 0.3; p.slashAng = ang; p.face = Math.cos(ang) >= 0 ? 1 : -1; p.cdK = 0.3; p.vx = Math.cos(ang) * 520;
      S.zcuts.push({ x: cx, y: cy, ang: ang, t: 0, dur: 0.5, R: R });
      sfx.slash("bankai"); sfx.stomp(); S.quake = Math.max(S.quake, 0.6);
      for (const a of S.aliens) {
        if (a.dead) continue;
        const dx = a.x - cx, dy = a.y - cy, d = Math.hypot(dx, dy);
        if (d <= R + a.rx * 0.8 && (angDiff(Math.atan2(dy, dx), ang) <= 0.75 || d < a.rx + 40)) damageAlien(a, S.bankai ? 9999 : a.kind === "boss" ? 12 : 99, dx / (d || 1), dy / (d || 1));
      }
      for (const o of S.orbs) {
        const dx = o.x - cx, dy = o.y - cy;
        if (Math.hypot(dx, dy) <= R && angDiff(Math.atan2(dy, dx), ang) <= 0.85) { o.life = 0; burst(o.x, o.y, 6, o.col, 160, true); }
      }
      burst(cx + Math.cos(ang) * 60, cy + Math.sin(ang) * 60, 30, "#ff7a3a", 340, true);
      banner("Tebasan Liar", "野晒 — tanpa teknik, hanya tenaga mentah", 1500);
    }
    function useBankai() {
      if (!zOk()) return;
      if (S.bankai) { endBankai(true); return; }
      if (S.bankaiCd > 0) return;
      S.bankai = true; S.bankaiT = 15;
      startSurge("zbankai"); sfx.transform("bankai"); sfx.voice("v_bankai", "ばんかい だよ、あああああ"); S.quake = 0.8;
      setTimeout(() => { if (S && S.bankai) { sfx.boom(); S.quake = 1.2; } }, 1000);
      burst(S.player.x, S.player.y - 40, 70, "#ff2a2a", 380, true); burst(S.player.x, S.player.y - 40, 40, "#ffb04a", 300, true);
      banner("Bankai da yo!", "卍解 — satu tebasan menghabisi apa pun, tapi rasa sakit menggerogoti tubuhmu", 3400);
    }
    function endBankai(manual) {
      sfx.down();
      S.bankai = false; S.bankaiT = 0; S.bankaiCd = 25;
      burst(S.player.x, S.player.y - 40, 30, "#ff5a2a", 240, true);
      banner(manual ? "Bankai ditutup" : "Bankai berakhir", "Tubuhmu menjerit · rasa sakitnya baru terasa sekarang", 2400);
    }
    function updZaraki(dt) {
      const p = S.player;
      S.lompatCd = Math.max(0, S.lompatCd - dt); S.tebasCd = Math.max(0, S.tebasCd - dt);
      for (const w of S.waves) w.t += dt;
      S.waves = S.waves.filter(w => w.t < w.dur);
      for (const c of S.zcuts) c.t += dt;
      S.zcuts = S.zcuts.filter(c => c.t < c.dur);
      if (S.bankai) {
        S.bankaiT -= dt; p.hp = Math.max(1, p.hp - 3.5 * dt);
        if (Math.random() < 0.8) S.fx.push({ x: p.x + rnd(-26, 26), y: p.y - rnd(8, 74), vx: rnd(-30, 30), vy: -rnd(90, 220), life: rnd(0.5, 1), max: 1, size: rnd(1.5, 3.2), col: pick(["#ff5a2a", "#ffb04a", "#ff2a2a"]), add: true });
        if (S.bankaiT <= 0) endBankai(false);
      } else S.bankaiCd = Math.max(0, S.bankaiCd - dt);
      if (S.sjump && !p.onGround) {
        if (Math.random() < 0.9) S.fx.push({ x: p.x + rnd(-10, 10), y: p.y - rnd(10, 70), vx: rnd(-40, 40), vy: -p.vy * 0.05, life: rnd(0.25, 0.5), max: 0.5, size: rnd(2, 4.5), col: pick(["#ffb15a", "#ff7a3a", "#ffe2b0"]), add: true });
        for (const a of S.aliens) {
          if (a.dead || (a.ramT || 0) > S.time) continue;
          if (Math.hypot(a.x - p.x, a.y - (p.y - 40)) < a.rx * 0.9 + 34) {
            a.ramT = S.time + 0.3;
            damageAlien(a, S.bankai ? 9999 : a.kind === "boss" ? 6 : 99, 0, 0);
            burst(a.x, a.y, 10, "#ffb15a", 240, true); S.quake = Math.max(S.quake, 0.3);
          }
        }
      }
    }

    /* ----- gambar Zaraki ----- */
    function drawZarakiBody(bob) {
      const t = S.time, p = S.player, f = p.face, bk = S.bankai;
      const sway = Math.sin(t * 3.2) * 2 + clamp(-p.vx * 0.035, -7, 7);
      // ujung haori putih compang-camping di belakang
      const hem = [[28, -15], [23, -19], [21, -12], [16, -17], [13, -10], [8, -18]];
      ctx.fillStyle = "#ece4d6"; ctx.beginPath(); ctx.moveTo(-f * 8, -58 + bob);
      ctx.quadraticCurveTo(-f * (20 + sway), -38 + bob, -f * (28 + sway * 1.6), -16 + bob);
      for (let i = 1; i < hem.length; i++) ctx.lineTo(-f * (hem[i][0] + sway * 0.6 * (1 - i / hem.length)), hem[i][1] + bob);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#8a2a22"; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-f * 8, -58 + bob); ctx.quadraticCurveTo(-f * (20 + sway), -38 + bob, -f * (28 + sway * 1.6), -16 + bob); ctx.stroke();
      // shihakusho hitam terbuka + dada berbekas luka
      ctx.fillStyle = "#17131a"; rr(-13, -59 + bob, 26, 37, 5); ctx.fill();
      ctx.fillStyle = "#d9ab82"; ctx.beginPath(); ctx.moveTo(-6, -59 + bob); ctx.lineTo(0, -37 + bob); ctx.lineTo(6, -59 + bob); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#a64b45"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-3, -56 + bob); ctx.lineTo(2.5, -45 + bob); ctx.moveTo(3.4, -55 + bob); ctx.lineTo(-1.5, -43 + bob); ctx.stroke();
      // sabuk merah tua
      ctx.fillStyle = "#6f1b18"; ctx.fillRect(-13, -38 + bob, 26, 4.2);
      // haori tanpa lengan: dua panel
      ctx.fillStyle = "#f4eee2";
      ctx.beginPath(); ctx.moveTo(-17, -60 + bob); ctx.lineTo(-6, -60 + bob); ctx.lineTo(-8, -19 + bob); ctx.lineTo(-11, -22 + bob); ctx.lineTo(-13, -17 + bob); ctx.lineTo(-17, -22 + bob); ctx.lineTo(-20 + sway * 0.6, -16 + bob); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(17, -60 + bob); ctx.lineTo(6, -60 + bob); ctx.lineTo(8, -19 + bob); ctx.lineTo(11, -22 + bob); ctx.lineTo(13, -17 + bob); ctx.lineTo(17, -22 + bob); ctx.lineTo(20 + sway * 0.6, -16 + bob); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#8a2a22"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-6, -60 + bob); ctx.lineTo(-8, -19 + bob); ctx.moveTo(6, -60 + bob); ctx.lineTo(8, -19 + bob); ctx.stroke();
      // lambang divisi 11
      ctx.fillStyle = "#8a2a22"; ctx.fillRect(-14, -52 + bob, 5, 1.4); ctx.fillRect(-14, -48 + bob, 5, 1.4); ctx.fillRect(-12, -54 + bob, 1.4, 8);
      if (bk) {
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,60,40," + (0.45 + 0.25 * Math.sin(t * 12)) + ")"; ctx.lineWidth = 2;
        rr(-13.5, -59.5 + bob, 27, 38, 5); ctx.stroke(); ctx.restore();
      }
    }
    function drawZarakiHair(f, bob) {
      const t = S.time, bk = S.bankai, hc = -69 + bob;
      const sp = [[-165, 16], [-140, 22], [-115, 19], [-90, 25], [-65, 21], [-40, 24], [-15, 16]];
      ctx.save();
      sp.forEach((q, i) => {
        const a = q[0] * Math.PI / 180 + Math.sin(t * 5 + i) * 0.03, len = q[1] * (bk ? 1.3 : 1);
        const x1 = Math.cos(a - 0.24) * 10.6, y1 = Math.sin(a - 0.24) * 10.6, x2 = Math.cos(a + 0.24) * 10.6, y2 = Math.sin(a + 0.24) * 10.6;
        const tx = Math.cos(a) * len, ty = Math.sin(a) * len;
        ctx.fillStyle = bk ? "#1a0508" : "#0b0a12";
        ctx.beginPath(); ctx.moveTo(x1, hc + y1); ctx.lineTo(tx, hc + ty); ctx.lineTo(x2, hc + y2); ctx.closePath(); ctx.fill();
        if (i % 2 === 1) {   // lonceng emas di ujung rambut
          ctx.strokeStyle = "#c9a23c"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(tx, hc + ty); ctx.lineTo(tx, hc + ty + 2.2); ctx.stroke();
          ctx.fillStyle = "#f2c94c"; ctx.beginPath(); ctx.arc(tx, hc + ty + 3.6, 1.9, 0, 6.2832); ctx.fill();
        }
      });
      ctx.restore();
    }
    function drawZarakiFace(f, bob) {
      const bk = S.bankai;
      ctx.save(); ctx.lineCap = "round";
      // penutup mata di sisi jauh + tali
      ctx.strokeStyle = "#2b2420"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-f * 10.5, -71.5 + bob); ctx.lineTo(f * 10.5, -63.5 + bob); ctx.stroke();
      ctx.fillStyle = "#ddd6c8"; ctx.beginPath(); ctx.ellipse(-f * 3.8, -67 + bob, 3.6, 3.3, 0, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "#5a4a3f"; ctx.lineWidth = 0.8; ctx.stroke();
      // bekas luka melintang
      ctx.strokeStyle = "#a64b45"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(f * 1.2, -74 + bob); ctx.lineTo(f * 6.6, -61.5 + bob); ctx.stroke();
      // alis garang + mata
      ctx.strokeStyle = "#0b0a12"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(f * 8.4, -72 + bob); ctx.lineTo(f * 1.2, -68.6 + bob); ctx.stroke();
      if (bk) { ctx.save(); ctx.globalCompositeOperation = "lighter"; const g = ctx.createRadialGradient(f * 4, -67 + bob, 0.5, f * 4, -67 + bob, 7); g.addColorStop(0, "rgba(255,70,40,.95)"); g.addColorStop(1, "rgba(255,70,40,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f * 4, -67 + bob, 7, 0, 6.2832); ctx.fill(); ctx.restore(); }
      // senyum liar penuh gigi
      ctx.strokeStyle = "#4a2a22"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f * 0.8, -63.4 + bob); ctx.quadraticCurveTo(f * 4.6, -58.6 + bob, f * 8.2, -63.8 + bob); ctx.stroke();
      ctx.fillStyle = "#ffffff"; ctx.fillRect(f * 4.6 - 2.8, -62.4 + bob, 5.6, 1.9);
      ctx.restore();
    }
    function drawZarakiSword() {
      const bk = S.bankai, L = bk ? 108 : 82, h = bk ? 5.4 : 4.4, t = S.time;
      // gagang berbalut kain lusuh
      ctx.fillStyle = "#2b1d1a"; rr(-15, -2.8, 19, 5.6, 2); ctx.fill();
      ctx.strokeStyle = "#8a2a22"; ctx.lineWidth = 1; for (let i = -13; i < 3; i += 4) { ctx.beginPath(); ctx.moveTo(i, -2.8); ctx.lineTo(i + 3, 2.8); ctx.stroke(); }
      ctx.fillStyle = "#6b5a3a"; ctx.beginPath(); ctx.moveTo(3.4, -6.4); ctx.lineTo(7.2, -5.2); ctx.lineTo(7.6, 5.6); ctx.lineTo(3.2, 6.4); ctx.closePath(); ctx.fill();
      // bilah kasar bergerigi (pedang tanpa perawatan)
      const bg = ctx.createLinearGradient(0, -h, 0, h); bg.addColorStop(0, "#eceaf0"); bg.addColorStop(0.5, "#b4b3bd"); bg.addColorStop(1, "#6c6b78");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(7.4, -h);
      for (let x = 14, i = 0; x < L - 8; x += 10, i++) { ctx.lineTo(x, -h - (i % 2 ? 1.8 : 0.2)); ctx.lineTo(x + 4, -h + (i % 2 ? 0.2 : 1.4)); }
      ctx.lineTo(L, -1.2); ctx.lineTo(L + 7, 0.8); ctx.lineTo(L - 6, h + 0.4);
      for (let x = L - 14, i = 0; x > 12; x -= 11, i++) ctx.lineTo(x, h + (i % 2 ? 0.2 : 1.2));
      ctx.lineTo(7.4, h); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#4e3b34"; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(10, -0.4); ctx.lineTo(L - 6, -0.2); ctx.stroke();
      // karat & gompal
      ctx.fillStyle = "rgba(120,60,40,.45)"; for (const q of [0.22, 0.5, 0.74]) ctx.fillRect(L * q, 1, 5, 2);
      const pu = 0.5 + 0.5 * Math.sin(t * 10);
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      ctx.strokeStyle = bk ? "rgba(255,50,30," + (0.38 + 0.25 * pu) + ")" : "rgba(255,120,50," + (0.1 + 0.1 * pu) + ")";
      ctx.lineWidth = bk ? 11 : 6; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(L, 0); ctx.stroke();
      if (bk) { ctx.strokeStyle = "rgba(255,210,150," + (0.5 + 0.3 * pu) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(L, 0); ctx.stroke(); }
      ctx.restore();
    }
    function drawZarakiAura() {
      const p = S.player, t = S.time, cx = p.x, cy = p.y - 40, bk = S.bankai, k = bk ? 1.6 : 1;
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const rad = bk ? 125 : 92, g = ctx.createRadialGradient(cx, cy, 4, cx, cy, rad);
      g.addColorStop(0, "rgba(255,80,40," + (bk ? 0.42 : 0.26) + ")"); g.addColorStop(0.55, "rgba(200,20,30," + (0.16 * k) + ")"); g.addColorStop(1, "rgba(200,20,30,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.2832); ctx.fill();
      const n = bk ? 15 : 9, cols = ["rgba(255,90,30,.38)", "rgba(255,200,80,.3)", "rgba(150,10,20,.42)"];
      for (let i = 0; i < n; i++) {
        const ph = t * 4.6 + i * 0.9, bx = cx + (i - (n - 1) / 2) * (bk ? 6.4 : 7.5), h = (30 + 26 * Math.abs(Math.sin(ph * 0.8 + i))) * k, sx = Math.sin(ph) * 6, by = p.y - 20;
        ctx.fillStyle = cols[i % 3];
        ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.quadraticCurveTo(bx - 6 + sx, by - h * 0.55, bx + sx, by - h); ctx.quadraticCurveTo(bx + 6 + sx * 0.5, by - h * 0.45, bx + 4, by); ctx.fill();
      }
      for (let i = 0; i < 2; i++) {
        const q = (t * 0.7 + i * 0.5) % 1;
        ctx.strokeStyle = "rgba(255,90,50," + (0.45 * (1 - q)) + ")"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(cx, FEET + 2, 18 + q * 80, 4 + q * 12, 0, 0, 6.2832); ctx.stroke();
      }
      if (bk) {
        ctx.font = "700 15px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        for (let i = 0; i < 6; i++) { const a = t * 1.1 + i * 1.0472, x = cx + Math.cos(a) * 56, y = cy + Math.sin(a * 1.3) * 34 - 6; ctx.fillStyle = i % 2 ? "rgba(255,120,70,.85)" : "rgba(255,50,40,.85)"; ctx.fillText("卍", x, y); }
      }
      ctx.restore();
    }
    function drawZarakiFx() {
      const p = S.player, t = S.time;
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      // gelombang kejut tanah + pecahan batu
      for (const w of S.waves) {
        if (w.t < 0) continue;
        const q = w.t / w.dur, r = w.R * (1 - Math.pow(1 - q, 3)), al = 1 - q;
        ctx.strokeStyle = "rgba(" + w.col + "," + (0.9 * al) + ")"; ctx.lineWidth = 12 * al + 2; ctx.beginPath(); ctx.ellipse(w.x, w.y, r, r * 0.2, 0, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = "rgba(255,240,220," + (0.7 * al) + ")"; ctx.lineWidth = 3 * al + 1; ctx.beginPath(); ctx.ellipse(w.x, w.y, r * 0.82, r * 0.16, 0, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = "rgba(" + w.col + "," + (0.4 * al) + ")";
        for (let i = -5; i <= 5; i++) { const x = w.x + (i / 5) * r, hh = 46 * al * (1 - Math.abs(i) / 6) * Math.min(1, q * 6); ctx.beginPath(); ctx.moveTo(x - 4, w.y); ctx.lineTo(x, w.y - hh); ctx.lineTo(x + 4, w.y); ctx.fill(); }
      }
      // Tebasan Liar: bulan sabit raksasa
      for (const c of S.zcuts) {
        const q = c.t / c.dur, e = 1 - Math.pow(1 - clamp(q * 2.2, 0, 1), 3), r = c.R * (0.25 + 0.75 * e), al = 1 - q;
        ctx.globalAlpha = al;
        [[36, "rgba(255,40,30,.28)"], [20, "rgba(255,140,60,.6)"], [7, "rgba(255,246,232,.98)"]].forEach(L => { ctx.strokeStyle = L[1]; ctx.lineWidth = L[0] * (1 - q * 0.5); ctx.beginPath(); ctx.arc(c.x, c.y, r, c.ang - 0.85, c.ang + 0.85); ctx.stroke(); });
        ctx.strokeStyle = "rgba(255,200,150,.7)"; ctx.lineWidth = 2;
        for (let i = -3; i <= 3; i++) { const a = c.ang + i * 0.26; ctx.beginPath(); ctx.moveTo(c.x + Math.cos(a) * r * 0.55, c.y + Math.sin(a) * r * 0.55); ctx.lineTo(c.x + Math.cos(a) * r * 1.02, c.y + Math.sin(a) * r * 1.02); ctx.stroke(); }
        ctx.globalAlpha = 1;
      }
      // garis kecepatan saat melompat tinggi
      if (S.sjump && !p.onGround && Math.abs(p.vy) > 450) {
        ctx.strokeStyle = "rgba(255,230,200,.35)"; ctx.lineWidth = 2;
        const dir = p.vy < 0 ? 1 : -1;
        for (let i = 0; i < 12; i++) { const x = p.x + Math.sin(i * 12.9 + t * 30) * 46, y0 = p.y - 40 + Math.sin(i * 7.3 + t * 21) * 40, len = 50 + (i % 4) * 25; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + dir * len); ctx.stroke(); }
      }
      // Bankai: tekanan reiatsu merah di tepi layar
      if (S.bankai) {
        const pu = 0.75 + 0.25 * Math.sin(t * 7), vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.68);
        vg.addColorStop(0, "rgba(220,20,20,0)"); vg.addColorStop(1, "rgba(220,20,20," + (0.34 * pu) + ")");
        ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
        ctx.font = "700 220px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "rgba(255,60,40," + (0.06 + 0.03 * pu) + ")"; ctx.fillText("卍解", W / 2, 215);
      }
      ctx.restore();
    }

    /* jenis suara sesuai karakter yang sedang aktif */
    /* ===== ICHIGO KUROSAKI: Biasa → Bankai → Hollow → Chain · tiap wujud punya 3 skill SENDIRI (tombol 3 / 4 / 6) =====
       5 = berubah ke wujud berikutnya (Biasa → Bankai → Hollow → Chain → kembali).  Bisa juga klik wujud di panel kanan.
       BANKAI : 3 Getsuga Tenshō (sabit tembus) · 4 Shunpo (dash menebas) · 6 Getsuga Jūjishō (tebasan silang)
       HOLLOW : 3 Jeritan Hollow (ledakan sekitar) · 4 Getsuga Hollow (sinar merah) · 6 Amuk Hollow (berserk berputar)
       CHAIN  : 3 Rantai Penjerat (ikat musuh) · 4 Final Getsuga Tenshō (sapuan gelap) · 6 Pusaran Rantai (pantulkan peluru) */
    const IFORM = ["Biasa · Zangetsu", "Bankai · Tensa Zangetsu", "Hollow", "Chain"];
    const IKEY = ["ishikai", "ibankai", "ihollow", "ichain"];
    const IPAL = [
      { a: "140,210,255", b: "232,246,255", c: "90,150,230" },    // biasa: reiatsu biru-putih
      { a: "255,106,0", b: "255,214,160", c: "210,40,10" },       // bankai: oranye pekat
      { a: "240,24,47", b: "255,236,236", c: "130,0,22" },        // hollow: merah
      { a: "255,44,44", b: "255,255,255", c: "96,0,12" }          // chain: merah-hitam
    ];
    const IGLYPH = { ishikai: "斬", ibankai: "月", ihollow: "虚", ichain: "鎖" };
    const ISL = ["rgba(140,210,255,", "rgba(255,106,0,", "rgba(240,24,47,", "rgba(255,50,50,"];
    const ISK = [null,
      [{ k: "getsuga", ic: "月", n: "Getsuga Tenshō", d: "Sabit hitam · tembus" }, { k: "shunpo", ic: "瞬", n: "Shunpo", d: "Dash menebas" }, { k: "juji", ic: "十", n: "Getsuga Jūjishō", d: "Tebasan silang" }],
      [{ k: "raung", ic: "吼", n: "Jeritan Hollow", d: "Ledakan sekitar" }, { k: "hbeam", ic: "虚", n: "Getsuga Hollow", d: "Sinar merah" }, { k: "amuk", ic: "狂", n: "Amuk Hollow", d: "Berserk 7 detik" }],
      [{ k: "bind", ic: "鎖", n: "Rantai Penjerat", d: "Ikat musuh" }, { k: "final", ic: "終", n: "Final Getsuga", d: "Sapuan kegelapan" }, { k: "pusaran", ic: "環", n: "Pusaran Rantai", d: "Pantulkan peluru" }]
    ];
    const ICD = { getsuga: 3.5, shunpo: 2.8, juji: 11, raung: 9, hbeam: 10, amuk: 18, bind: 10, final: 18, pusaran: 14 };
    const ichiHair = () => ["#ff9a2e", "#ff7a00", "#ff8a1f", "#2a0a10"][S.iform];
    const ichiSpeed = () => [265, 320, 310, 255][S.iform] * (S.amukT > 0 ? 1.3 : 1);
    const ichiJump = () => [660, 700, 760, 680][S.iform];
    const iOk = () => !!S && S.ichigo && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
    const icd = k => S.icd[k] || 0;
    const faceTo = ang => { S.player.face = Math.cos(ang) >= 0 ? 1 : -1; };
    const segDist = (px, py, ax, ay, bx, by) => {
      const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1;
      const t = clamp(((px - ax) * dx + (py - ay) * dy) / l2, 0, 1);
      return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
    };
    function resetIchigo() {
      S.ichigo = false; S.iform = 0; S.icd = {}; S.getsugas = []; S.ifx = []; S.hbeam = null; S.finals = [];
      S.amukT = 0; S.pusT = 0; S.surge = null;
      for (const a of S.aliens) a.bindT = 0;
    }
    function goIchigo(n) {
      if (!S || !S.ichigoUnlocked) { banner("Ichigo terkunci", "Panggil Ichigo Kurosaki dari menu Bleach di website lebih dulu", 3000); return; }
      if (S.ichigo && S.iform === n) return;
      const p = S.player, P = IPAL[n], col = "rgb(" + P.a + ")";
      S.ichigo = true; S.iform = n; S.amukT = 0; S.pusT = 0; S.hbeam = null; S.finals = [];
      for (const a of S.aliens) a.bindT = 0;
      startSurge(IKEY[n]); sfx.transform(IKEY[n]); S.quake = 0.5 + n * 0.15;
      burst(p.x, p.y - 40, 40 + n * 12, col, 320, true); burst(p.x, p.y - 40, 24 + n * 6, "rgb(" + P.b + ")", 240, true);
      const t2 = 700 + n * 120;
      setTimeout(() => { if (S && S.ichigo && S.iform === n) { sfx.boom(); S.quake = 0.8 + n * 0.2; } }, t2);
      if (n === 0) { sfx.voice("v_ichigo", "いくぞ、ざんげつ"); banner("Ichigo · Biasa", "Zangetsu dalam wujud awal · tekan 5 untuk Bankai", 2800); }
      else if (n === 1) { sfx.voice("v_ibankai", "ばんかい、てんさざんげつ"); banner("Bankai · Tensa Zangetsu", "卍解 — lebih cepat · Getsuga Tenshō, Shunpo & Jūjishō terbuka (3 · 4 · 6)", 3400); }
      else if (n === 2) { sfx.voice("v_ihollow", "うおおおおおお"); banner("Hollowfication", "虚化 — topeng terbentuk · Jeritan, Getsuga Hollow & Amuk terbuka (3 · 4 · 6)", 3400); }
      else { sfx.voice("v_ichain", "ばんかい"); banner("Bankai · Chain", "鎖 — rantai merah menyala · Rantai Penjerat, Final Getsuga & Pusaran terbuka (3 · 4 · 6)", 3600); }
    }
    function nextIchigo() {
      if (!S || !S.ichigoUnlocked) { banner("Ichigo terkunci", "Panggil Ichigo Kurosaki dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.ichigo) goIchigo(0);
      else if (S.iform < 3) goIchigo(S.iform + 1);
      else { resetIchigo(); sfx.down(); banner("Ichigo Mode nonaktif", "Kembali ke perlengkapan biasa", 2000); }
    }

    /* ----- BANKAI: Getsuga Tenshō · Shunpo · Getsuga Jūjishō ----- */
    function useGetsuga() {
      if (icd("getsuga") > 0) return;
      const p = S.player, ang = S.aimAng, c = Math.cos(ang), s = Math.sin(ang);
      S.icd.getsuga = ICD.getsuga; p.slash = 0.3; p.slashAng = ang; p.cdK = 0.3; faceTo(ang);
      S.getsugas.push({ x: p.x + c * 44, y: p.y - 42 + s * 44, ang: ang, vx: c * 860, vy: s * 860, life: 1.5, t: 0, hit: [], pal: 1 });
      S.ifx.push({ k: "flare", x: p.x + c * 40, y: p.y - 42 + s * 40, t: 0, dur: 0.3 });
      sfx.getsuga(); sfx.voice("v_getsuga", "げつがてんしょう"); S.quake = Math.max(S.quake, 0.35);
      banner("Getsuga Tenshō", "月牙天衝 — sabit hitam menembus semua musuh di jalurnya", 1500);
    }
    function useShunpo() {
      if (icd("shunpo") > 0) return;
      const p = S.player, ang = S.aimAng, dx = Math.cos(ang), dy = Math.sin(ang), x0 = p.x, y0 = p.y - 40;
      const nx = clamp(p.x + dx * 330, 24, W - 24), ny = clamp(p.y + dy * 330 * 0.6, 150, FEET), x1 = nx, y1 = ny - 40;
      S.icd.shunpo = ICD.shunpo;
      for (let i = 0; i < 5; i++) { const q = i / 5; S.ifx.push({ k: "ghost", x: lerp(p.x, nx, q), y: lerp(p.y, ny, q), face: p.face, t: 0, dur: 0.4 + i * 0.05 }); }
      S.ifx.push({ k: "streak", x0: x0, y0: y0, x1: x1, y1: y1, t: 0, dur: 0.35 });
      for (const a of S.aliens) {
        if (a.dead) continue;
        if (segDist(a.x, a.y, x0, y0, x1, y1) < a.rx + 30) damageAlien(a, a.kind === "boss" ? 7 : 99, dx, dy);
      }
      for (const o of S.orbs) if (!o.refl && segDist(o.x, o.y, x0, y0, x1, y1) < o.r + 30) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      burst(x0, y0, 16, "#ff6a00", 240, true); burst(x1, y1, 22, "#ffd9b0", 300, true);
      p.x = nx; p.y = ny; p.vy = 0; p.onGround = ny >= FEET; p.inv = Math.max(p.inv, 0.5);
      faceTo(ang); p.slash = 0.22; p.slashAng = ang; p.cdK = 0.15;
      sfx.shunpo(); banner("Shunpo", "瞬歩 — melesat menembus musuh di jalur dash", 1200);
    }
    function useJuji() {
      if (icd("juji") > 0) return;
      const p = S.player, ang = S.aimAng, tg = nearestTarget(820);
      let zx, zy;
      if (tg) { zx = tg.x; zy = tg.y; } else { zx = p.x + Math.cos(ang) * 320; zy = p.y - 70 + Math.sin(ang) * 320; }
      zx = clamp(zx, 120, W - 120); zy = clamp(zy, 130, FEET - 70);
      S.icd.juji = ICD.juji; p.slash = 0.3; p.slashAng = ang; p.cdK = 0.4; faceTo(ang);
      S.ifx.push({ k: "cross", x: zx, y: zy, t: 0, dur: 1.2, hit: false, R: 170 });
      sfx.juji(); sfx.voice("v_juji", "げつがじゅうじしょう");
      banner("Getsuga Jūjishō", "月牙十字衝 — tebasan silang menghantam area bidik", 1700);
    }
    function crossBlast(f) {
      f.hit = true; S.quake = 1.1; sfx.boom();
      for (const a of S.aliens) {
        if (a.dead) continue;
        if (Math.abs(a.x - f.x) <= f.R + a.rx * 0.6 && Math.abs(a.y - f.y) <= f.R + a.ry * 0.6) damageAlien(a, a.kind === "boss" ? 16 : 99, 0, 0);
      }
      for (const o of S.orbs) if (Math.abs(o.x - f.x) <= f.R + 20 && Math.abs(o.y - f.y) <= f.R + 20) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      burst(f.x, f.y, 60, "#ff6a00", 380, true); burst(f.x, f.y, 30, "#ffffff", 300, true); burst(f.x, f.y, 26, "#15121a", 260, false);
    }

    /* ----- HOLLOW: Jeritan · Getsuga Hollow · Amuk ----- */
    function useRaung() {
      if (icd("raung") > 0) return;
      const p = S.player, R = 340, cx = p.x, cy = p.y - 44;
      S.icd.raung = ICD.raung; S.quake = 1.0;
      S.ifx.push({ k: "roar", x: cx, y: cy, t: 0, dur: 0.9, R: R });
      for (const a of S.aliens) {
        if (a.dead) continue;
        if (Math.hypot(a.x - cx, (a.y - cy) * 0.85) <= R + a.rx * 0.5) damageAlien(a, a.kind === "boss" ? 6 : 99, 0, 0);
      }
      for (const o of S.orbs) if (Math.hypot(o.x - cx, o.y - cy) <= R) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      burst(cx, cy, 60, "#f0182f", 360, true); burst(cx, cy, 26, "#ffffff", 280, true);
      sfx.raung(); sfx.voice("v_raung", "ぐおおおおお");
      banner("Jeritan Hollow", "虚の咆哮 — gelombang jeritan menghancurkan peluru & musuh di dekatmu", 1700);
    }
    function useHbeam() {
      if (icd("hbeam") > 0) return;
      const p = S.player, ang = S.aimAng;
      S.icd.hbeam = ICD.hbeam; faceTo(ang); p.slash = 0.3; p.slashAng = ang;
      S.hbeam = { ang: ang, t: 0, hit: false, ox: p.x + Math.cos(ang) * 26, oy: p.y - 44 + Math.sin(ang) * 26 };
      sfx.hbeamCast(); banner("Getsuga Tenshō Hollow", "虚·月牙天衝 — sinar merah-hitam menyapu arah bidik", 1700);
    }
    function beamHit(ox, oy, ang, half, along0) {
      const c = Math.cos(ang), s = Math.sin(ang), out = { aliens: [], orbs: [] };
      for (const a of S.aliens) {
        if (a.dead) continue;
        const rx = a.x - ox, ry = a.y - oy, along = rx * c + ry * s, perp = Math.abs(-rx * s + ry * c);
        if (along > along0 && perp < half + (a.ry || 0)) out.aliens.push(a);
      }
      for (const o of S.orbs) {
        const rx = o.x - ox, ry = o.y - oy, along = rx * c + ry * s, perp = Math.abs(-rx * s + ry * c);
        if (along > along0 && perp < half + 6) out.orbs.push(o);
      }
      return out;
    }
    function hbeamBlast(h) {
      h.hit = true; S.quake = 1.1; sfx.hbeam();
      const r = beamHit(h.ox, h.oy, h.ang, 58, -30), c = Math.cos(h.ang), s = Math.sin(h.ang);
      for (const a of r.aliens) damageAlien(a, a.kind === "boss" ? 20 : 99, c, s);
      for (const o of r.orbs) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      for (let i = 1; i <= 10; i++) burst(h.ox + c * i * 90, h.oy + s * i * 90, 6, i % 2 ? "#f0182f" : "#ffffff", 240, true);
    }
    function useAmuk() {
      if (S.amukT > 0) { endAmuk(true); return; }
      if (icd("amuk") > 0) return;
      const p = S.player;
      S.amukT = 7; S.amukTick = 0; S.quake = 0.7;
      burst(p.x, p.y - 40, 50, "#f0182f", 340, true); burst(p.x, p.y - 40, 24, "#ffffff", 260, true);
      sfx.amuk(); sfx.voice("v_raung", "うああああああ");
      banner("Amuk Hollow", "狂 — tebasan berputar tanpa henti & lebih kebal, tapi darahmu terkuras", 2400);
    }
    function endAmuk(manual) {
      S.amukT = 0; S.icd.amuk = ICD.amuk; sfx.down();
      banner(manual ? "Amuk dihentikan" : "Amuk berakhir", "Napasmu terengah-engah", 1600);
    }

    /* ----- CHAIN: Rantai Penjerat · Final Getsuga · Pusaran Rantai ----- */
    function useBind() {
      if (icd("bind") > 0) return;
      const p = S.player;
      const cand = S.aliens.filter(a => !a.dead && (a.kind !== "boss" || S.phase === "boss"))
        .map(a => ({ a: a, d: Math.hypot(a.x - p.x, a.y - (p.y - 40)) })).filter(q => q.d < 1000).sort((u, v) => u.d - v.d).slice(0, 4);
      if (!cand.length) { banner("Tidak ada sasaran", "Rantai butuh musuh dalam jangkauan", 1300); return; }
      S.icd.bind = ICD.bind; p.slash = 0.25; p.slashAng = Math.atan2(cand[0].a.y - (p.y - 40), cand[0].a.x - p.x); faceTo(p.slashAng);
      for (const q of cand) { q.a.bindT = q.a.kind === "boss" ? 3 : 5; q.a.bindMax = q.a.bindT; burst(q.a.x, q.a.y, 16, "#ff3030", 220, true); }
      sfx.bind(); S.quake = Math.max(S.quake, 0.3);
      banner("Rantai Penjerat", "鎖 — musuh terikat: tak bisa bergerak & menerima 50% lebih banyak damage", 1900);
    }
    function useFinal() {
      if (icd("final") > 0) return;
      const p = S.player, ang = S.aimAng;
      S.icd.final = ICD.final; p.hp = Math.max(1, p.hp - 8); faceTo(ang); p.slash = 0.3; p.slashAng = ang;
      S.finals.push({ ang: ang, t: 0, hit: false, ox: p.x, oy: p.y - 44 });
      sfx.finalCast(); sfx.voice("v_final", "さいごの、げつがてんしょう");
      banner("Final Getsuga Tenshō", "最後の月牙天衝 — kegelapan menyapu seluruh arena (HP −8)", 2200);
    }
    function finalBlast(f) {
      f.hit = true; S.quake = 1.6; sfx.finalBlast();
      const r = beamHit(f.ox, f.oy, f.ang, 150, -60), c = Math.cos(f.ang), s = Math.sin(f.ang);
      for (const a of r.aliens) damageAlien(a, a.kind === "boss" ? 30 : 99, c, s);
      for (const o of r.orbs) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      for (let i = 1; i <= 12; i++) { burst(f.ox + c * i * 85, f.oy + s * i * 85, 7, i % 2 ? "#ff2a2a" : "#220308", 260, i % 2 > 0); }
    }
    function usePusaran() {
      if (S.pusT > 0) { endPus(true); return; }
      if (icd("pusaran") > 0) return;
      S.pusT = 6; S.pusTick = 0; sfx.pusaran();
      banner("Pusaran Rantai", "環 — rantai berputar memantulkan peluru & menebas yang mendekat", 2000);
    }
    function endPus(manual) {
      S.pusT = 0; S.icd.pusaran = ICD.pusaran; sfx.ping();
      banner(manual ? "Pusaran dihentikan" : "Pusaran berakhir", "Rantai kembali ke pedang", 1500);
    }

    const ICAST = { getsuga: useGetsuga, shunpo: useShunpo, juji: useJuji, raung: useRaung, hbeam: useHbeam, amuk: useAmuk, bind: useBind, final: useFinal, pusaran: usePusaran };
    function useISkill(slot) {
      if (!S || S.phase === "start") return;
      if (!S.ichigoUnlocked) { banner("Ichigo terkunci", "Panggil Ichigo Kurosaki dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.ichigo) { banner("Ichigo belum aktif", "Tekan 5 untuk memanggil Ichigo, lalu berubah: Bankai → Hollow → Chain", 2400); return; }
      if (!iOk()) return;
      if (S.iform === 0) { banner("Belum ada skill", "Tekan 5 untuk berubah — tiap wujud (Bankai, Hollow, Chain) punya 3 skill sendiri", 2600); return; }
      ICAST[ISK[S.iform][slot].k]();
    }
    const iSk0 = () => useISkill(0), iSk1 = () => useISkill(1), iSk2 = () => useISkill(2);

    function updIchigo(dt) {
      const p = S.player;
      for (const k in S.icd) S.icd[k] = Math.max(0, S.icd[k] - dt);
      // sabit Getsuga: melaju, menembus, sekali kena per musuh
      for (const g of S.getsugas) {
        g.t += dt; g.x += g.vx * dt; g.y += g.vy * dt; g.life -= dt;
        if (Math.random() < 0.9) S.fx.push({ x: g.x + rnd(-14, 14), y: g.y + rnd(-34, 34), vx: -g.vx * 0.1 + rnd(-30, 30), vy: rnd(-40, 40), life: rnd(0.2, 0.45), max: 0.45, size: rnd(1.5, 3.4), col: pick(["#ff6a00", "#ff3b1a", "#ffd9b0"]), add: true });
        for (const a of S.aliens) {
          if (a.dead || g.hit.indexOf(a) >= 0) continue;
          if (Math.hypot(a.x - g.x, (a.y - g.y) * 0.8) < a.rx + 40) { g.hit.push(a); damageAlien(a, a.kind === "boss" ? 10 : 99, Math.sign(g.vx), 0); burst(a.x, a.y, 12, "#ff6a00", 260, true); S.quake = Math.max(S.quake, 0.3); }
        }
        for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - g.x, o.y - g.y) < o.r + 42) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
        if (g.x < -120 || g.x > W + 120 || g.y < -160 || g.y > H + 80) g.life = 0;
      }
      S.getsugas = S.getsugas.filter(g => g.life > 0);
      for (const f of S.ifx) { f.t += dt; if (f.k === "cross" && !f.hit && f.t >= 0.6) crossBlast(f); }
      S.ifx = S.ifx.filter(f => f.t < f.dur);
      if (S.hbeam) { const h = S.hbeam; h.t += dt; if (!h.hit && h.t >= 0.5) hbeamBlast(h); if (h.t > 1.3) S.hbeam = null; }
      for (const f of S.finals) { f.t += dt; if (!f.hit && f.t >= 0.8) finalBlast(f); }
      S.finals = S.finals.filter(f => f.t <= 2.3);
      if (!S.ichigo) return;
      const playing = S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
      // Hollow: regenerasi cepat
      if (playing && S.iform === 2 && S.amukT <= 0 && p.hp < p.max) p.hp = Math.min(p.max, p.hp + 2.5 * dt);
      // Amuk: tebasan berputar tiap 0.25 detik, HP terkuras
      if (S.amukT > 0) {
        S.amukT -= dt; p.hp = Math.max(1, p.hp - 4 * dt); S.amukTick -= dt;
        if (S.amukTick <= 0) {
          S.amukTick = 0.25; const cx = p.x, cy = p.y - 40, R = 165;
          S.ifx.push({ k: "spin", x: cx, y: cy, t: 0, dur: 0.25, R: R, a0: rnd(0, 6.28) });
          for (const a of S.aliens) { if (a.dead) continue; if (Math.hypot(a.x - cx, a.y - cy) <= R + a.rx * 0.6) damageAlien(a, a.kind === "boss" ? 2 : 4, 0, 0); }
          for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - cx, o.y - cy) <= R + o.r) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
          sfx.slash("ihollow");
        }
        if (Math.random() < 0.8) S.fx.push({ x: p.x + rnd(-24, 24), y: p.y - rnd(8, 74), vx: rnd(-40, 40), vy: -rnd(100, 240), life: rnd(0.4, 0.9), max: 0.9, size: rnd(1.5, 3.2), col: pick(["#f0182f", "#ffffff", "#7a0016"]), add: true });
        if (S.amukT <= 0) endAmuk(false);
      }
      // Pusaran Rantai: memantulkan peluru, menebas musuh yang mendekat
      if (S.pusT > 0) {
        S.pusT -= dt; S.pusTick -= dt; const cx = p.x, cy = p.y - 40, R = 128;
        for (const o of S.orbs) {
          if (o.refl || Math.hypot(o.x - cx, o.y - cy) >= R + o.r) continue;
          const tg = nearestTarget(1000), a2 = tg ? Math.atan2(tg.y - o.y, tg.x - o.x) : Math.atan2(o.y - cy, o.x - cx);
          o.vx = Math.cos(a2) * 520; o.vy = Math.sin(a2) * 520; o.refl = true; o.col = "#ff4040"; o.life = 3;
          burst(o.x, o.y, 8, "#ff4040", 180, true); sfx.ping();
        }
        if (S.pusTick <= 0) {
          S.pusTick = 0.3;
          for (const a of S.aliens) { if (a.dead) continue; if (Math.hypot(a.x - cx, (a.y - cy) * 0.85) <= R + a.rx * 0.5) damageAlien(a, a.kind === "boss" ? 2 : 2, 0, 0); }
        }
        if (S.pusT <= 0) endPus(false);
      }
    }

    /* ===== DESAIN ICHIGO: badan, rambut, wajah/topeng, pedang, aura, efek skill ===== */
    function drawIchigoBody(bob) {
      const t = S.time, p = S.player, f = p.face, fm = S.iform, P = IPAL[fm];
      const sway = Math.sin(t * 3.2) * 2 + clamp(-p.vx * 0.035, -7, 7);
      const kn = fm === 3 ? "#0b0508" : "#15121a", edge = fm === 0 ? "#cfd8e6" : "rgb(" + P.a + ")";
      if (fm > 0) {   // mantel compang-camping di belakang (Bankai: hitam berpinggir oranye)
        const L = [0, 30, 26, 34][fm], jag = [[1, -16], [0.78, -20], [0.62, -12], [0.42, -19], [0.24, -11], [0.08, -18]];
        ctx.fillStyle = kn; ctx.beginPath(); ctx.moveTo(-f * 7, -57 + bob);
        ctx.quadraticCurveTo(-f * (16 + sway), -38 + bob, -f * (L + sway * 1.6), -14 + bob);
        for (let i = 1; i < jag.length; i++) ctx.lineTo(-f * (L * jag[i][0] + sway * 0.6 * (1 - i / jag.length)), jag[i][1] + bob);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = edge; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-f * 7, -57 + bob);
        ctx.quadraticCurveTo(-f * (16 + sway), -38 + bob, -f * (L + sway * 1.6), -14 + bob); ctx.stroke();
      }
      ctx.fillStyle = kn; rr(-12, -59 + bob, 24, 37, 6); ctx.fill();
      ctx.fillStyle = fm === 3 ? "#c01020" : "#ece7f0"; ctx.beginPath(); ctx.moveTo(-6, -59 + bob); ctx.lineTo(0, -44 + bob); ctx.lineTo(6, -59 + bob); ctx.closePath(); ctx.fill();
      ctx.fillStyle = fm === 1 ? "#ff6a00" : fm === 3 ? "#b0101e" : "#ece7f0"; ctx.fillRect(-12, -38 + bob, 24, 4.2);
      if (fm === 1) {
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,106,0," + (0.4 + 0.25 * Math.sin(t * 10)) + ")"; ctx.lineWidth = 2;
        rr(-12.5, -59.5 + bob, 25, 38, 6); ctx.stroke(); ctx.restore();
      } else if (fm === 2) {
        ctx.strokeStyle = "rgba(240,24,47,.9)"; ctx.lineWidth = 1.4; ctx.beginPath();
        ctx.moveTo(-7, -54 + bob); ctx.lineTo(-2, -46 + bob); ctx.moveTo(7, -54 + bob); ctx.lineTo(2, -46 + bob); ctx.moveTo(0, -50 + bob); ctx.lineTo(0, -40 + bob); ctx.stroke();
      } else if (fm === 3) {   // rantai merah melilit badan
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,50,50,.95)"; ctx.lineWidth = 1.6;
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(-10 + i * 5, -56 + i * 4.2 + bob, 3.2, 1.8, 0.6, 0, 6.2832); ctx.stroke(); }
        ctx.restore();
      }
    }
    function drawIchigoHair(f, bob) {
      const t = S.time, fm = S.iform, hc = -69 + bob, len = [1, 1.25, 1.5, 1.25][fm] * (S.amukT > 0 ? 1.25 : 1);
      const sp = [[-172, 15], [-150, 20], [-128, 17], [-105, 22], [-82, 18], [-58, 21], [-36, 17], [-14, 13]];
      ctx.save(); ctx.fillStyle = ichiHair();
      sp.forEach((q, i) => {
        const a = q[0] * Math.PI / 180 + Math.sin(t * 5 + i) * 0.04, l = q[1] * len;
        const x1 = Math.cos(a - 0.26) * 10.4, y1 = Math.sin(a - 0.26) * 10.4, x2 = Math.cos(a + 0.26) * 10.4, y2 = Math.sin(a + 0.26) * 10.4;
        ctx.beginPath(); ctx.moveTo(x1, hc + y1); ctx.lineTo(Math.cos(a) * l, hc + Math.sin(a) * l); ctx.lineTo(x2, hc + y2); ctx.closePath(); ctx.fill();
      });
      ctx.beginPath(); ctx.moveTo(-f * 9.5, hc - 4); ctx.lineTo(-f * 6, hc + 2.5); ctx.lineTo(-f * 3.4, hc - 5); ctx.lineTo(-f * 0.4, hc + 2.8);
      ctx.lineTo(f * 2.4, hc - 5.5); ctx.lineTo(f * 5.6, hc + 2); ctx.lineTo(f * 9.6, hc - 5); ctx.lineTo(f * 9.4, hc - 12); ctx.lineTo(-f * 9.5, hc - 12); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    function drawIchigoFace(f, bob) {
      const fm = S.iform, y = bob;
      ctx.save(); ctx.lineCap = "round";
      if (fm === 2) {   // topeng Hollow: tulang putih, garis merah, mata kuning di celah hitam, taring
        ctx.fillStyle = "#f4efe8"; ctx.strokeStyle = "#3a2a2e"; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.ellipse(f * 1.6, -67 + y, 8.8, 10.4, 0, 0, 6.2832); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-f * 3, -77 + y); ctx.lineTo(-f * 9, -92 + y); ctx.lineTo(-f * 8.2, -76.5 + y); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "#d4162b"; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(f * 1.8, -77 + y); ctx.lineTo(f * 2.4, -64 + y); ctx.moveTo(f * 6.2, -62 + y); ctx.lineTo(f * 8.2, -56 + y); ctx.moveTo(-f * 1.4, -61 + y); ctx.lineTo(-f * 2.6, -55 + y); ctx.stroke();
        ctx.fillStyle = "#0a0508"; ctx.beginPath(); ctx.ellipse(f * 4.6, -67.4 + y, 3.6, 2.3, f * -0.25, 0, 6.2832); ctx.fill();
        ctx.save(); ctx.globalCompositeOperation = "lighter";
        const eg = ctx.createRadialGradient(f * 4.6, -67.4 + y, 0.4, f * 4.6, -67.4 + y, 6); eg.addColorStop(0, "rgba(255,220,60,1)"); eg.addColorStop(1, "rgba(255,180,0,0)");
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(f * 4.6, -67.4 + y, 6, 0, 6.2832); ctx.fill(); ctx.restore();
        const mx = f > 0 ? -1 : -8.4;
        ctx.fillStyle = "#0a0508"; ctx.fillRect(mx, -61.4 + y, 9.4, 2.6);
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 5; i++) {
          const gx = mx + 0.6 + i * 1.85;
          ctx.beginPath(); ctx.moveTo(gx, -61.4 + y); ctx.lineTo(gx + 1.7, -61.4 + y); ctx.lineTo(gx + 0.85, -59.6 + y); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(gx + 0.9, -58.8 + y); ctx.lineTo(gx + 2.6, -58.8 + y); ctx.lineTo(gx + 1.75, -60.6 + y); ctx.closePath(); ctx.fill();
        }
      } else {
        ctx.strokeStyle = fm === 3 ? "#e8d8d8" : "#2a1208"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(f * 8.6, -72.4 + y); ctx.lineTo(f * 1.4, -69 + y); ctx.stroke();
        ctx.strokeStyle = "#5a2a22"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f * 2.2, -61.6 + y); ctx.lineTo(f * 7.4, -62.4 + y); ctx.stroke();
        if (fm >= 1) {   // mata menyala: oranye (Bankai) / merah (Chain)
          ctx.save(); ctx.globalCompositeOperation = "lighter";
          const col = fm === 1 ? "255,120,30" : "255,40,40", rd = fm === 1 ? 5 : 7.5, g = ctx.createRadialGradient(f * 4, -67 + y, 0.4, f * 4, -67 + y, rd);
          g.addColorStop(0, "rgba(" + col + ",.95)"); g.addColorStop(1, "rgba(" + col + ",0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f * 4, -67 + y, rd, 0, 6.2832); ctx.fill(); ctx.restore();
        }
        if (fm === 3) {   // tanduk putih melengkung + garis merah di pipi
          ctx.fillStyle = "#f4efe8"; ctx.strokeStyle = "#3a2a2e"; ctx.lineWidth = 0.8;
          for (const s of [-1, 1]) {
            ctx.beginPath(); ctx.moveTo(s * 7.5, -77 + y); ctx.quadraticCurveTo(s * 12.5, -86 + y, s * 9, -94 + y); ctx.quadraticCurveTo(s * 4, -86 + y, s * 3.5, -77.5 + y); ctx.closePath(); ctx.fill(); ctx.stroke();
          }
          ctx.strokeStyle = "#ff2a2a"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(f * 5.4, -63.6 + y); ctx.lineTo(f * 8.6, -58.8 + y); ctx.stroke();
        }
      }
      ctx.restore();
    }
    function drawIchigoSword() {
      const fm = S.iform, t = S.time, pu = 0.5 + 0.5 * Math.sin(t * 10), P = IPAL[fm];
      if (fm === 0) {   // Zangetsu wujud awal: parang raksasa berbalut kain putih
        ctx.fillStyle = "#e9e4ee"; rr(-15, -2.8, 19, 5.6, 2); ctx.fill();
        ctx.strokeStyle = "#8a96a8"; ctx.lineWidth = 0.9; for (let i = -13; i < 3; i += 4) { ctx.beginPath(); ctx.moveTo(i, -2.8); ctx.lineTo(i + 3, 2.8); ctx.stroke(); }
        ctx.strokeStyle = "#f4f0f8"; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(-15, 0); ctx.quadraticCurveTo(-24, 4 + Math.sin(t * 6) * 3, -32, 2 + Math.sin(t * 6 + 1) * 5); ctx.stroke();
        ctx.fillStyle = "#3a3f4a"; ctx.fillRect(3.6, -6, 3.2, 12);
        const bg = ctx.createLinearGradient(0, -9, 0, 9); bg.addColorStop(0, "#f6f9ff"); bg.addColorStop(0.5, "#c3cddd"); bg.addColorStop(1, "#7f8aa0");
        ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(7, -4.6); ctx.lineTo(62, -9); ctx.lineTo(76, -9); ctx.lineTo(86, 0.5); ctx.lineTo(62, 9); ctx.lineTo(7, 4.6); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "#4a5568"; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(10, -1); ctx.lineTo(78, -4); ctx.stroke();
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(140,210,255," + (0.1 + 0.08 * pu) + ")"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(84, 0); ctx.stroke(); ctx.restore();
        return;
      }
      const L = fm === 3 ? 100 : fm === 1 ? 76 : 82, h = fm === 3 ? 4.2 : 3.4;
      ctx.fillStyle = "#15121a"; rr(-14, -2.6, 18, 5.2, 2); ctx.fill();
      ctx.strokeStyle = fm === 2 ? "#d4162b" : "rgb(" + P.a + ")"; ctx.lineWidth = 1;
      for (let i = -12; i < 3; i += 4) { ctx.beginPath(); ctx.moveTo(i, -2.6); ctx.lineTo(i + 3, 2.6); ctx.stroke(); }
      if (fm !== 2) {   // rantai di ujung gagang Tensa Zangetsu
        ctx.strokeStyle = fm === 1 ? "#9aa0ad" : "rgba(255,60,60,.95)"; ctx.lineWidth = 1.6;
        for (let i = 0; i < 6; i++) { const q = i / 5; ctx.beginPath(); ctx.ellipse(-14 - q * 22, Math.sin(t * 5 + q * 3) * 5 * q + q * 8, 3, 1.7, q * 0.8, 0, 6.2832); ctx.stroke(); }
      }
      ctx.fillStyle = "#15121a"; ctx.beginPath(); ctx.moveTo(3, -9); ctx.lineTo(8, -5); ctx.lineTo(8, 5); ctx.lineTo(3, 9); ctx.lineTo(1.4, 0); ctx.closePath(); ctx.fill();
      const bg = ctx.createLinearGradient(0, -h, 0, h);
      if (fm === 2) { bg.addColorStop(0, "#fbf7f2"); bg.addColorStop(1, "#c9c2bb"); } else { bg.addColorStop(0, "#2a2630"); bg.addColorStop(1, "#0a0709"); }
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(8, -h); ctx.lineTo(L, -h * 0.8); ctx.lineTo(L + 8, 0.5); ctx.lineTo(L, h); ctx.lineTo(8, h); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = fm === 2 ? "#d4162b" : "rgb(" + P.a + ")"; ctx.lineWidth = fm === 2 ? 1.6 : 1.4;
      ctx.beginPath(); ctx.moveTo(10, fm === 2 ? 0 : h * 0.8); ctx.lineTo(L, fm === 2 ? 0 : h * 0.7); ctx.stroke();
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(" + P.a + "," + (0.22 + 0.2 * pu) + ")"; ctx.lineWidth = fm === 3 ? 12 : 9; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(L, 0); ctx.stroke();
      if (fm === 3) { ctx.strokeStyle = "rgba(" + P.b + "," + (0.5 + 0.3 * pu) + ")"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(L, 0); ctx.stroke(); }
      ctx.restore();
    }
    function drawIchigoAura() {
      const p = S.player, t = S.time, cx = p.x, cy = p.y - 40, fm = S.iform, P = IPAL[fm];
      const k = [0.55, 1, 1.15, 1.3][fm], rad = [78, 104, 112, 126][fm] * (S.amukT > 0 ? 1.25 : 1);
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, rad);
      g.addColorStop(0, "rgba(" + P.a + "," + (0.3 * k) + ")"); g.addColorStop(0.55, "rgba(" + P.c + "," + (0.16 * k) + ")"); g.addColorStop(1, "rgba(" + P.c + ",0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.2832); ctx.fill();
      const n = [7, 11, 13, 13][fm];
      for (let i = 0; i < n; i++) {
        const ph = t * (3.6 + fm * 0.6) + i * 0.95, bx = cx + (i - (n - 1) / 2) * 6.4, h = (26 + 26 * Math.abs(Math.sin(ph * 0.8 + i))) * k, sx = Math.sin(ph) * 6, by = p.y - 18;
        ctx.fillStyle = "rgba(" + (i % 3 === 1 ? P.b : i % 3 === 2 ? P.c : P.a) + "," + (i % 3 === 1 ? 0.28 : 0.4) + ")";
        ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.quadraticCurveTo(bx - 6 + sx, by - h * 0.55, bx + sx, by - h); ctx.quadraticCurveTo(bx + 6 + sx * 0.5, by - h * 0.45, bx + 4, by); ctx.fill();
      }
      for (let i = 0; i < 2; i++) {
        const q = (t * 0.7 + i * 0.5) % 1;
        ctx.strokeStyle = "rgba(" + P.a + "," + (0.45 * (1 - q)) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, FEET + 2, 18 + q * 80, 4 + q * 12, 0, 0, 6.2832); ctx.stroke();
      }
      if (fm === 3) {   // cincin mata rantai berputar
        ctx.strokeStyle = "rgba(255,60,60,.85)"; ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          const a = t * 1.2 + i * 0.628; ctx.save(); ctx.translate(cx + Math.cos(a) * 58, cy + Math.sin(a) * 34); ctx.rotate(a + (i % 2 ? 1.5708 : 0));
          ctx.beginPath(); ctx.ellipse(0, 0, 5, 2.6, 0, 0, 6.2832); ctx.stroke(); ctx.restore();
        }
      } else if (fm === 2) {   // helai reiatsu putih
        ctx.strokeStyle = "rgba(255,240,240,.35)"; ctx.lineWidth = 1.5;
        for (let i = 0; i < 6; i++) { const a = t * 1.6 + i * 1.047, r0 = 40 + 10 * Math.sin(t * 3 + i); ctx.beginPath(); ctx.arc(cx, cy, r0, a, a + 0.9); ctx.stroke(); }
      }
      ctx.restore();
    }
    function drawIchigoGhosts() {
      for (const f of S.ifx) {
        if (f.k !== "ghost") continue;
        const al = 1 - f.t / f.dur;
        ctx.save(); ctx.globalAlpha = 0.5 * al; ctx.translate(f.x, f.y);
        ctx.fillStyle = "#15121a"; rr(-12, -58, 24, 34, 6); ctx.fill();
        ctx.strokeStyle = "#15121a"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(-5, -26); ctx.lineTo(-7, -3); ctx.moveTo(5, -26); ctx.lineTo(7, -3); ctx.stroke();
        ctx.fillStyle = "#ff7a00"; ctx.beginPath(); ctx.arc(0, -69, 11.5, 0, 6.2832); ctx.fill();
        ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,106,0,.9)"; ctx.lineWidth = 2; rr(-13, -59, 26, 36, 6); ctx.stroke();
        ctx.restore();
      }
    }
    function crescent(x, y, ang, sc, al, edge, glow) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc); ctx.globalAlpha = al;
      if (glow) {
        ctx.globalCompositeOperation = "lighter";
        const g = ctx.createRadialGradient(10, 0, 4, 10, 0, 78); g.addColorStop(0, "rgba(" + glow + ",.45)"); g.addColorStop(1, "rgba(" + glow + ",0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(10, 0, 78, 0, 6.2832); ctx.fill(); ctx.globalCompositeOperation = "source-over";
      }
      ctx.beginPath(); ctx.moveTo(-18, -54); ctx.quadraticCurveTo(38, -30, 42, 0); ctx.quadraticCurveTo(38, 30, -18, 54); ctx.quadraticCurveTo(10, 0, -18, -54); ctx.closePath();
      ctx.fillStyle = "#0b0508"; ctx.fill(); ctx.lineJoin = "round"; ctx.strokeStyle = edge; ctx.lineWidth = 5; ctx.stroke();
      ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.restore();
    }
    function drawIchigoFx() {
      const p = S.player, t = S.time;
      ctx.save(); ctx.lineCap = "round";
      // rantai pengikat musuh (Chain)
      for (const a of S.aliens) {
        if (a.dead || !(a.bindT > 0)) continue;
        const sx = p.x + p.face * 9, sy = p.y - 44, ex = a.x, ey = a.y, rot = Math.atan2(ey - sy, ex - sx), N = 14;
        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i <= N; i++) {
          const q = i / N, x = lerp(sx, ex, q), y = lerp(sy, ey, q) + Math.sin(q * Math.PI) * (16 + 4 * Math.sin(t * 6 + i));
          ctx.save(); ctx.translate(x, y); ctx.rotate(rot + (i % 2 ? 1.5708 : 0)); ctx.strokeStyle = i % 2 ? "rgba(255,70,70,.95)" : "rgba(255,200,200,.9)"; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.ellipse(0, 0, 5.2, 2.8, 0, 0, 6.2832); ctx.stroke(); ctx.restore();
        }
        const r2 = a.rx + 10 + 3 * Math.sin(t * 8);
        ctx.strokeStyle = "rgba(255,50,50,.8)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(a.x, a.y, r2, r2 * 0.7, t * 2, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = "rgba(255,230,230,.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(a.x, a.y, r2 * 0.8, r2 * 0.55, -t * 3, 0, 6.2832); ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
      // sabit Getsuga Tenshō
      for (const g of S.getsugas) {
        for (let i = 3; i >= 1; i--) crescent(g.x - Math.cos(g.ang) * i * 26, g.y - Math.sin(g.ang) * i * 26, g.ang, 1 - i * 0.12, 0.28 / i, "#ff6a00", null);
        crescent(g.x, g.y, g.ang, 1, 1, "#ff6a00", "255,106,0");
      }
      // efek sementara
      for (const f of S.ifx) {
        const q = f.t / f.dur;
        if (f.k === "flare") {
          ctx.globalCompositeOperation = "lighter"; const r = 40 * (1 - q) + 8, g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
          g.addColorStop(0, "rgba(255,255,255," + (0.9 * (1 - q)) + ")"); g.addColorStop(1, "rgba(255,106,0,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, 6.2832); ctx.fill();
        } else if (f.k === "streak") {
          ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,106,0," + (0.7 * (1 - q)) + ")"; ctx.lineWidth = 22 * (1 - q) + 2;
          ctx.beginPath(); ctx.moveTo(f.x0, f.y0); ctx.lineTo(f.x1, f.y1); ctx.stroke();
          ctx.strokeStyle = "rgba(255,255,255," + (0.95 * (1 - q)) + ")"; ctx.lineWidth = 5 * (1 - q) + 1; ctx.beginPath(); ctx.moveTo(f.x0, f.y0); ctx.lineTo(f.x1, f.y1); ctx.stroke();
        } else if (f.k === "cross") {
          if (f.t < 0.6) {
            const k = f.t / 0.6; ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,106,0," + (0.3 + 0.6 * k) + ")"; ctx.lineWidth = 2 + 3 * k;
            ctx.beginPath(); ctx.ellipse(f.x, f.y, f.R * (1.5 - 0.5 * k), f.R * (1.5 - 0.5 * k), 0, 0, 6.2832); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(f.x - f.R, f.y); ctx.lineTo(f.x + f.R, f.y); ctx.moveTo(f.x, f.y - f.R); ctx.lineTo(f.x, f.y + f.R); ctx.stroke();
          } else {
            const k = (f.t - 0.6) / 0.6, e = Math.min(1, k * 4), al = Math.max(0, 1 - k), L = 340 * e;
            for (const s of [-1, 1]) {
              ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(s * Math.PI / 4); ctx.globalAlpha = al; ctx.globalCompositeOperation = "source-over";
              ctx.beginPath(); ctx.moveTo(-L, 0); ctx.quadraticCurveTo(0, -26 * e, L, 0); ctx.quadraticCurveTo(0, 26 * e, -L, 0); ctx.closePath();
              ctx.fillStyle = "#0b0508"; ctx.fill(); ctx.strokeStyle = "#ff6a00"; ctx.lineWidth = 5; ctx.stroke();
              ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
            }
          }
        } else if (f.k === "roar") {
          ctx.globalCompositeOperation = "lighter";
          for (let i = 0; i < 3; i++) {
            const qq = clamp(q * 1.25 - i * 0.12, 0, 1); if (qq <= 0) continue;
            const r = f.R * (1 - Math.pow(1 - qq, 3)), al = 1 - qq;
            ctx.strokeStyle = i === 1 ? "rgba(255,240,240," + (0.8 * al) + ")" : "rgba(240,24,47," + (0.85 * al) + ")"; ctx.lineWidth = 14 * al + 2;
            ctx.beginPath(); ctx.ellipse(f.x, f.y, r, r * 0.85, 0, 0, 6.2832); ctx.stroke();
          }
        } else if (f.k === "spin") {
          ctx.globalCompositeOperation = "lighter"; const al = 1 - q;
          for (let i = 0; i < 3; i++) {
            const a0 = f.a0 + i * 2.094 + q * 5; ctx.strokeStyle = i === 0 ? "rgba(255,255,255," + (0.9 * al) + ")" : "rgba(240,24,47," + (0.8 * al) + ")"; ctx.lineWidth = 9 * al + 2;
            ctx.beginPath(); ctx.arc(f.x, f.y, f.R * 0.85, a0, a0 + 1.3); ctx.stroke();
          }
        }
      }
      // Getsuga Hollow: sinar merah-hitam
      if (S.hbeam) {
        const h = S.hbeam, c = Math.cos(h.ang), s = Math.sin(h.ang);
        ctx.globalCompositeOperation = "lighter";
        if (h.t < 0.5) {
          const k = h.t / 0.5, r = 8 + 26 * k, g = ctx.createRadialGradient(h.ox, h.oy, 1, h.ox, h.oy, r * 2.4);
          g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.35, "rgba(240,24,47,.8)"); g.addColorStop(1, "rgba(120,0,20,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h.ox, h.oy, r * 2.4, 0, 6.2832); ctx.fill();
        } else {
          const k = (h.t - 0.5) / 0.8, al = Math.max(0, 1 - k), ex = h.ox + c * 1400, ey = h.oy + s * 1400;
          [[92, "rgba(240,24,47,.26)"], [56, "rgba(255,60,70,.55)"], [22, "rgba(255,238,238,.96)"]].forEach(Lr => {
            ctx.strokeStyle = Lr[1].replace(/[\d.]+\)$/, m => (parseFloat(m) * al) + ")"); ctx.lineWidth = Lr[0] * (1 - k * 0.35);
            ctx.beginPath(); ctx.moveTo(h.ox, h.oy); ctx.lineTo(ex, ey); ctx.stroke();
          });
          ctx.globalCompositeOperation = "source-over"; ctx.strokeStyle = "rgba(14,0,6," + (0.8 * al) + ")"; ctx.lineWidth = 5;
          for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(h.ox - s * sg * 44, h.oy + c * sg * 44); ctx.lineTo(ex - s * sg * 44, ey + c * sg * 44); ctx.stroke(); }
          ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,220,220," + (0.8 * al) + ")"; ctx.lineWidth = 1.6;
          for (let i = 0; i < 9; i++) {
            const d = 60 + i * 130 + (Math.sin(t * 40 + i) * 10), px = h.ox + c * d, py = h.oy + s * d, off = Math.sin(t * 50 + i * 3) * 40;
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - s * off + c * 20, py + c * off + s * 20); ctx.lineTo(px + s * off * 0.6 + c * 40, py - c * off * 0.6 + s * 40); ctx.stroke();
          }
        }
      }
      // Final Getsuga Tenshō: sabit raksasa hitam-merah
      for (const f of S.finals) {
        const c = Math.cos(f.ang), s = Math.sin(f.ang);
        if (f.t < 0.8) {
          const k = f.t / 0.8; ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = "rgba(0,0,0," + (0.28 * k) + ")"; ctx.fillRect(0, 0, W, H);
          crescent(f.ox + c * 30, f.oy + s * 30, f.ang, 0.5 + 1.5 * k, 0.3 + 0.6 * k, "#ff2a2a", "255,40,40");
        } else {
          const k = (f.t - 0.8) / 1.5, d = 1500 * Math.min(1, k * 1.15), al = Math.max(0, 1 - k * 0.8);
          ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = "rgba(0,0,0," + (0.3 * al) + ")"; ctx.fillRect(0, 0, W, H);
          for (let i = 4; i >= 1; i--) crescent(f.ox + c * Math.max(0, d - i * 60), f.oy + s * Math.max(0, d - i * 60), f.ang, 3.0 - i * 0.18, al * 0.3 / i, "#ff2a2a", null);
          crescent(f.ox + c * d, f.oy + s * d, f.ang, 3.0, al, "#ff2a2a", "255,40,40");
          if (f.t - 0.8 < 0.18) { ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = "rgba(255,230,230," + (0.5 * (1 - (f.t - 0.8) / 0.18)) + ")"; ctx.fillRect(0, 0, W, H); }
        }
      }
      // Pusaran Rantai
      if (S.pusT > 0) {
        const cx = p.x, cy = p.y - 40, R = 128, fade = Math.min(1, S.pusT / 0.6);
        ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = fade;
        ctx.strokeStyle = "rgba(255,50,50,.22)"; ctx.lineWidth = 18; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.82, 0, 0, 6.2832); ctx.stroke();
        for (let i = 0; i < 22; i++) {
          const a = t * 5 + i * 6.2832 / 22; ctx.save(); ctx.translate(cx + Math.cos(a) * R, cy + Math.sin(a) * R * 0.82); ctx.rotate(a + 1.5708 + (i % 2 ? 1.5708 : 0));
          ctx.strokeStyle = i % 2 ? "rgba(255,70,70,.95)" : "rgba(255,220,220,.9)"; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.ellipse(0, 0, 6.5, 3.2, 0, 0, 6.2832); ctx.stroke(); ctx.restore();
        }
        ctx.globalAlpha = 1;
      }
      // Amuk Hollow: tekanan merah di tepi layar
      if (S.amukT > 0) {
        ctx.globalCompositeOperation = "lighter"; const pu = 0.75 + 0.25 * Math.sin(t * 9), vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, W * 0.68);
        vg.addColorStop(0, "rgba(240,24,47,0)"); vg.addColorStop(1, "rgba(240,24,47," + (0.34 * pu) + ")"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
        ctx.font = "700 220px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "rgba(255,40,60," + (0.06 + 0.03 * pu) + ")"; ctx.fillText("狂", W / 2, 215);
      }
      ctx.restore();
    }

    /* ===== URYU ISHIDA (Quincy pemanah): Quincy -> Letzt Stil · SERANGAN JARAK JAUH · tiap wujud punya 3 skill (tombol 3 / 4 / 6) =====
       5 = ganti wujud (Quincy -> Letzt Stil -> nonaktif).  Klik / J / F = tembak panah reishi ke arah mouse.
       Beda dari karakter lain: tidak menebas — makin JAUH sasaran dari tempat panah dilepas, makin besar damage (sampai +90%).
       QUINCY : 3 Heilig Pfeil (panah penembus, bidik dulu) · 4 Hirenkyaku (dash reishi + tembak 2x cepat) · 6 Ginrei Kojaku (16 panah pemburu)
       LETZT  : 3 Sprenger (ledakan reishi) · 4 Licht Regen (hujan panah) · 6 Letzt Pfeil (tombak cahaya raksasa) · tembak 3 panah & lebih kebal */
    const UFORM = ["Quincy · Heilig Bogen", "Letzt Stil · Sayap Reishi"];
    const UKEY = ["uquincy", "uletzt"];
    const UPAL = [{ a: "127,220,255", b: "232,248,255", c: "60,140,220" }, { a: "205,244,255", b: "255,255,255", c: "110,190,255" }];
    const USK = [
      [{ k: "snipe", ic: "矢", n: "Heilig Pfeil", d: "Panah penembus" }, { k: "hiren", ic: "瞬", n: "Hirenkyaku", d: "Dash reishi" }, { k: "gin", ic: "銀", n: "Ginrei Kojaku", d: "Panah pemburu" }],
      [{ k: "spr", ic: "爆", n: "Sprenger", d: "Ledakan reishi" }, { k: "rain", ic: "雨", n: "Licht Regen", d: "Hujan panah" }, { k: "last", ic: "終", n: "Letzt Pfeil", d: "Tombak cahaya" }]
    ];
    const UCD = { snipe: 5, hiren: 7, gin: 14, spr: 9, rain: 15, last: 22 };
    const uOk = () => !!S && S.uryu && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
    const ucd = k => S.ucd[k] || 0;
    const uDistBonus = d => 1 + clamp(d / 900, 0, 1) * 0.9;
    function resetUryu() {
      S.uryu = false; S.uform = 0; S.ucd = {}; S.uarrows = []; S.ufx = []; S.usnipe = null; S.ubombs = []; S.urains = []; S.uvolley = null; S.uhaste = 0; S.surge = null;
    }
    function goUryu(n) {
      if (!S || !S.uryuUnlocked) { banner("Uryu terkunci", "Panggil Uryu Ishida dari menu Bleach di website lebih dulu", 3000); return; }
      if (S.uryu && S.uform === n) return;
      const p = S.player, P = UPAL[n], col = "rgb(" + P.a + ")";
      S.uryu = true; S.uform = n; S.usnipe = null; S.ubombs = []; S.urains = []; S.uvolley = null; S.uhaste = 0;
      startSurge(UKEY[n]); sfx.transform(UKEY[n]); S.quake = 0.5 + n * 0.25;
      burst(p.x, p.y - 40, 36 + n * 16, col, 320, true); burst(p.x, p.y - 40, 22 + n * 8, "rgb(" + P.b + ")", 240, true);
      setTimeout(() => { if (S && S.uryu && S.uform === n) { sfx.boom(); S.quake = 0.8 + n * 0.3; } }, 800 + n * 200);
      if (n === 0) { sfx.voice("v_uryu", "さいごの クインシー、いしだ うりゅう"); banner("Quincy · Heilig Bogen", "弓 — panah reishi jarak jauh (klik / J) · makin jauh sasaran makin sakit · skill 3 · 4 · 6 · tekan 5: Letzt Stil", 3600); }
      else { sfx.voice("v_uletzt", "レッツト・シュティール"); banner("Letzt Stil", "翼 — sayap reishi terbuka · 3 panah sekaligus & lebih kebal · Sprenger, Licht Regen & Letzt Pfeil (3 · 4 · 6)", 3800); }
    }
    function nextUryu() {
      if (!S || !S.uryuUnlocked) { banner("Uryu terkunci", "Panggil Uryu Ishida dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.uryu) goUryu(0);
      else if (S.uform < 1) goUryu(1);
      else { resetUryu(); sfx.down(); banner("Uryu Mode nonaktif", "Kembali ke perlengkapan biasa", 2000); }
    }
    function uAimPoint() {
      if (performance.now() - lastMouse < 3000) return { x: clamp(mx, 70, W - 70), y: clamp(my, 110, FEET - 20) };
      const tg = nearestTarget(900); if (tg) return { x: clamp(tg.x, 70, W - 70), y: clamp(tg.y, 110, FEET - 20) };
      return { x: clamp(S.player.x + Math.cos(S.aimAng) * 420, 70, W - 70), y: FEET - 40 };
    }
    function uArrow(x, y, ang, o) {
      const sp = o.sp || 1250;
      S.uarrows.push({ x: x, y: y, ox: x, oy: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: o.life || 1.6, dm: o.dm || 3, pierce: o.pierce || 1, hit: [], lz: !!o.lz, home: !!o.home, rain: !!o.rain, trav: 0 });
    }
    /* serangan dasar: panah reishi (Quincy 1 panah · Letzt 3 panah menembus) */
    function uShoot() {
      const p = S.player, ang = S.aimAng, lz = S.uform === 1;
      if (p.cdR > 0 || (S.usnipe && S.usnipe.kind === "last" && !S.usnipe.hit)) return;
      p.cdR = (lz ? 0.2 : 0.27) * (S.uhaste > 0 ? 0.5 : 1); p.recoil = 1; p.face = Math.cos(ang) >= 0 ? 1 : -1;
      const n = lz ? 3 : 1, sx = p.x + Math.cos(ang) * 34, sy = p.y - 44 + Math.sin(ang) * 34;
      for (let i = 0; i < n; i++) uArrow(sx, sy, ang + (i - (n - 1) / 2) * 0.1, { dm: 3, pierce: lz ? 2 : 1, lz: lz });
      burst(sx, sy, 4, lz ? "#ffffff" : "#bfe9ff", 120, true); sfx.uarrow(lz);
    }
    /* --- QUINCY --- */
    function useSnipe() {
      if (ucd("snipe") > 0 || S.usnipe) return;
      const p = S.player, ang = S.aimAng;
      S.ucd.snipe = UCD.snipe; p.face = Math.cos(ang) >= 0 ? 1 : -1; p.recoil = 1;
      S.usnipe = { kind: "snipe", t: 0, charge: 0.45, show: 0.45, ang: ang, ox: p.x + Math.cos(ang) * 30, oy: p.y - 44 + Math.sin(ang) * 30, half: 22, boss: 12, hit: false };
      sfx.usnipeCast(); sfx.voice("v_usnipe", "ハイリッヒ・プファイル");
      banner("Heilig Pfeil", "聖矢 — panah cahaya menembus SEMUA musuh di garis bidik · makin jauh makin sakit", 1700);
    }
    function useHiren() {
      if (ucd("hiren") > 0) return;
      const p = S.player, raw = (keys.left || touch.left ? -1 : 0) + (keys.right || touch.right ? 1 : 0), dir = raw || (Math.cos(S.aimAng) >= 0 ? -1 : 1);
      const x0 = p.x, nx = clamp(p.x + dir * 340, 24, W - 24);
      S.ucd.hiren = UCD.hiren;
      for (let i = 0; i < 6; i++) S.ufx.push({ k: "ghost", x: lerp(x0, nx, i / 6), y: p.y, t: 0, dur: 0.38 + i * 0.05 });
      S.ufx.push({ k: "streak", x0: x0, y0: p.y - 40, x1: nx, y1: p.y - 40, t: 0, dur: 0.35 });
      burst(x0, p.y - 40, 14, "#7fdcff", 220, true); burst(nx, p.y - 40, 18, "#ffffff", 260, true);
      p.x = nx; p.inv = Math.max(p.inv, 0.7); S.uhaste = 3;
      sfx.uhiren(); banner("Hirenkyaku", "飛廉脚 — melesat dengan reishi · kebal 0,7 dtk & menembak 2x lebih cepat selama 3 detik", 1900);
    }
    function useGin() {
      if (ucd("gin") > 0 || S.uvolley) return;
      S.ucd.gin = UCD.gin; S.uvolley = { left: 16, next: 0 };
      sfx.ugin(); sfx.voice("v_ugin", "ぎんれい こじゃく"); banner("Ginrei Kojaku", "銀嶺孤雀 — 16 panah reishi memburu musuh terdekat", 1800);
    }
    /* --- LETZT STIL --- */
    function useSpr() {
      if (ucd("spr") > 0) return;
      const p = S.player, q = uAimPoint();
      S.ucd.spr = UCD.spr; S.ubombs.push({ x: q.x, y: q.y, t: 0, fuse: 0.9, R: 190, hit: false });
      p.recoil = 1; p.face = q.x >= p.x ? 1 : -1;
      S.ufx.push({ k: "bolt", x0: p.x, y0: p.y - 44, x1: q.x, y1: q.y, t: 0, dur: 0.3 });
      sfx.usprCast(); sfx.voice("v_uspr", "シュプレンガー"); banner("Sprenger", "爆 — panah menancap lalu meledakkan reishi di titik bidik", 1700);
    }
    function sprBlast(b) {
      b.hit = true; S.quake = 1.0; sfx.uspr();
      for (const a of S.aliens) {
        if (a.dead) continue;
        if (Math.hypot(a.x - b.x, (a.y - b.y) * 0.9) <= b.R + a.rx * 0.6) damageAlien(a, a.kind === "boss" ? 16 : 99, Math.sign(a.x - b.x), 0);
      }
      for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - b.x, o.y - b.y) <= b.R + o.r) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      burst(b.x, b.y, 40, "#ffffff", 380, true); burst(b.x, b.y, 30, "#7fdcff", 300, true);
    }
    function useRain() {
      if (ucd("rain") > 0 || S.urains.length) return;
      const q = uAimPoint();
      S.ucd.rain = UCD.rain; S.urains.push({ t: 0, dur: 2.2, next: 0, cx: q.x });
      sfx.urain(); sfx.voice("v_urain", "リヒト・レーゲン"); banner("Licht Regen", "光の雨 — hujan panah reishi turun di sekitar titik bidik", 1900);
    }
    function useLast() {
      if (ucd("last") > 0 || S.usnipe) return;
      const p = S.player, ang = S.aimAng;
      S.ucd.last = UCD.last; p.face = Math.cos(ang) >= 0 ? 1 : -1; p.recoil = 1;
      S.usnipe = { kind: "last", t: 0, charge: 1.1, show: 0.8, ang: ang, ox: p.x + Math.cos(ang) * 30, oy: p.y - 44 + Math.sin(ang) * 30, half: 62, boss: 26, hit: false };
      sfx.ulastCast(); sfx.voice("v_ulast", "ハイリッヒ・プファイル"); S.quake = Math.max(S.quake, 0.4);
      banner("Letzt Pfeil", "終 — tombak cahaya raksasa menembus segalanya di garis bidik", 2200);
    }
    function uBeamBlast(b) {
      b.hit = true; S.quake = Math.max(S.quake, b.kind === "last" ? 1.3 : 0.6); if (b.kind === "last") sfx.ulast(); else sfx.usnipe();
      const r = beamHit(b.ox, b.oy, b.ang, b.half, -30), c = Math.cos(b.ang), s = Math.sin(b.ang);
      for (const a of r.aliens) {
        const d = Math.hypot(a.x - b.ox, a.y - b.oy), bonus = 1 + clamp(d / 900, 0, 1) * 0.6;
        damageAlien(a, a.kind === "boss" ? Math.round(b.boss * bonus) : 99, c, s); burst(a.x, a.y, 14, "#ffffff", 280, true);
      }
      for (const o of r.orbs) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      const steps = b.kind === "last" ? 14 : 10;
      for (let i = 1; i <= steps; i++) burst(b.ox + c * i * 90, b.oy + s * i * 90, b.kind === "last" ? 8 : 5, i % 2 ? "#7fdcff" : "#ffffff", 240, true);
    }
    const UCAST = { snipe: useSnipe, hiren: useHiren, gin: useGin, spr: useSpr, rain: useRain, last: useLast };
    function useUSkill(slot) {
      if (!S || S.phase === "start") return;
      if (!S.uryuUnlocked) { banner("Uryu terkunci", "Panggil Uryu Ishida dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.uryu) { banner("Uryu belum aktif", "Tekan 5 untuk memanggil Uryu, lalu berubah ke Letzt Stil", 2400); return; }
      if (!uOk()) return;
      UCAST[USK[S.uform][slot].k]();
    }
    const uSk0 = () => useUSkill(0), uSk1 = () => useUSkill(1), uSk2 = () => useUSkill(2);

    function updUryu(dt) {
      const p = S.player;
      for (const k in S.ucd) S.ucd[k] = Math.max(0, S.ucd[k] - dt);
      S.uhaste = Math.max(0, S.uhaste - dt);
      for (const f of S.ufx) f.t += dt;
      S.ufx = S.ufx.filter(f => f.t < f.dur);
      // panah
      for (const a of S.uarrows) {
        a.life -= dt;
        if (a.home) {
          let best = null, bd = 1e9;
          for (const al of S.aliens) { if (al.dead || al.ghost) continue; const d = Math.hypot(al.x - a.x, al.y - a.y); if (d < bd) { bd = d; best = al; } }
          if (best) {
            const sp = Math.hypot(a.vx, a.vy), cur = Math.atan2(a.vy, a.vx), want = Math.atan2(best.y - a.y, best.x - a.x);
            let d = want - cur; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832;
            const na = cur + clamp(d, -dt * 5, dt * 5); a.vx = Math.cos(na) * sp; a.vy = Math.sin(na) * sp;
          }
        }
        a.x += a.vx * dt; a.y += a.vy * dt; a.trav = Math.hypot(a.x - a.ox, a.y - a.oy);
        if (Math.random() < 0.7) S.fx.push({ x: a.x, y: a.y, vx: rnd(-20, 20), vy: rnd(-20, 20), life: rnd(0.2, 0.4), max: 0.4, size: rnd(1.2, 2.6), col: pick(["#bfe9ff", "#ffffff", "#7fdcff"]), add: true });
        for (const al of S.aliens) {
          if (a.life <= 0) break;
          if (al.dead || al.ghost || a.hit.indexOf(al) >= 0) continue;
          const ex = (al.x - a.x) / (al.rx + 10), ey = (al.y - a.y) / ((al.ry || 16) + 10);
          if (ex * ex + ey * ey < 1) {
            a.hit.push(al); damageAlien(al, Math.max(1, Math.round(a.dm * uDistBonus(a.trav))), Math.sign(a.vx), 0);
            burst(al.x, al.y, 8, a.lz ? "#ffffff" : "#7fdcff", 200, true); sfx.ping();
            if (a.hit.length >= a.pierce) a.life = 0;
          }
        }
        for (const o of S.orbs) if (!o.refl && a.life > 0 && Math.hypot(o.x - a.x, o.y - a.y) < o.r + 10) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
        if (a.rain && a.y >= FEET - 4) { a.life = 0; burst(a.x, FEET, 4, "#bfe9ff", 140, true); }
        if (a.x < -80 || a.x > W + 80 || a.y < -140 || a.y > H + 60) a.life = 0;
      }
      S.uarrows = S.uarrows.filter(a => a.life > 0);
      // panah bidik: tombak cahaya
      if (S.usnipe) { const b = S.usnipe; b.t += dt; if (!b.hit && b.t >= b.charge) uBeamBlast(b); if (b.t > b.charge + b.show) S.usnipe = null; }
      // Sprenger
      for (const b of S.ubombs) { b.t += dt; if (!b.hit && b.t >= b.fuse) sprBlast(b); }
      S.ubombs = S.ubombs.filter(b => b.t < b.fuse + 0.7);
      // Licht Regen
      for (const r of S.urains) {
        r.t += dt; r.next -= dt;
        while (r.next <= 0 && r.t < r.dur) { r.next += 0.07; uArrow(clamp(r.cx + rnd(-340, 340), 20, W - 20), -30, Math.PI / 2 + rnd(-0.12, 0.12), { sp: 1300, dm: 3, pierce: 1, lz: true, rain: true, life: 1.4 }); }
      }
      S.urains = S.urains.filter(r => r.t < r.dur + 0.1);
      // Ginrei Kojaku
      if (S.uvolley) {
        const v = S.uvolley; v.next -= dt;
        while (v.next <= 0 && v.left > 0) { v.next += 0.1; v.left--; uArrow(p.x + rnd(-10, 10), p.y - 56 + rnd(-14, 10), S.aimAng + rnd(-0.4, 0.4), { sp: 900, dm: 2, pierce: 1, home: true, life: 2.2 }); sfx.uarrow(false); }
        if (v.left <= 0) S.uvolley = null;
      }
      if (!S.uryu) return;
      if (S.uform === 1 && Math.random() < 0.5) S.fx.push({ x: p.x + rnd(-60, 60), y: p.y - rnd(20, 90), vx: rnd(-20, 20), vy: -rnd(30, 90), life: rnd(0.5, 1.0), max: 1, size: rnd(1.2, 2.8), col: pick(["#ffffff", "#bfe9ff"]), add: true });
      if (S.uhaste > 0 && Math.random() < 0.6) S.fx.push({ x: p.x + rnd(-14, 14), y: p.y - rnd(6, 80), vx: rnd(-30, 30), vy: -rnd(40, 120), life: rnd(0.3, 0.6), max: 0.6, size: rnd(1.4, 3), col: "#7fdcff", add: true });
    }

    /* ===== DESAIN URYU: mantel putih Quincy, kacamata, busur reishi, sayap kristal (Letzt Stil), panah & efek skill ===== */
    function drawUryuBody(bob) {
      const lz = S.uform === 1, P = UPAL[S.uform];
      ctx.fillStyle = "#e6ecf6"; rr(-12, -58 + bob, 24, 34, 8); ctx.fill();
      ctx.fillStyle = "#f7faff"; ctx.beginPath(); ctx.moveTo(-12, -40 + bob); ctx.lineTo(12, -40 + bob); ctx.lineTo(16, -12); ctx.lineTo(-16, -12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#1c2447"; ctx.fillRect(-12, -41 + bob, 24, 4);
      ctx.strokeStyle = "rgba(60,80,130,.55)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(0, -56 + bob); ctx.lineTo(0, -42 + bob); ctx.moveTo(-6, -54 + bob); ctx.lineTo(8, -44 + bob); ctx.stroke();
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(" + P.a + ",.95)"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(0, -53 + bob); ctx.lineTo(0, -45 + bob); ctx.moveTo(-4, -49 + bob); ctx.lineTo(4, -49 + bob); ctx.stroke(); ctx.restore();
      if (lz) {
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = "rgba(160,225,255,.75)";
        for (const sx of [-6, 6]) { ctx.beginPath(); ctx.moveTo(sx, -2); ctx.lineTo(sx - 5, -12); ctx.lineTo(sx, -22); ctx.lineTo(sx + 5, -12); ctx.closePath(); ctx.fill(); }
        ctx.restore();
      }
    }
    function drawUryuHair(f, bob) {
      ctx.fillStyle = "#1b2140";
      ctx.beginPath(); ctx.moveTo(-f * 10, -70 + bob); ctx.quadraticCurveTo(f * 1, -83 + bob, f * 11, -69 + bob); ctx.lineTo(f * 10.5, -62 + bob);
      ctx.quadraticCurveTo(f * 4, -71 + bob, -f * 1, -66 + bob); ctx.quadraticCurveTo(-f * 6, -64 + bob, -f * 10, -60 + bob); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#1b2140"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(f * 1, -80 + bob); ctx.quadraticCurveTo(f * 4, -90 + bob, f * 9, -86 + bob); ctx.stroke();
    }
    function drawUryuFace(f, bob) {
      ctx.strokeStyle = S.uform ? "#e8f8ff" : "#cfe0f5"; ctx.lineWidth = 1.2; ctx.strokeRect(f * 4 - 4.6, -70.5 + bob, 9.2, 6.6);
      ctx.beginPath(); ctx.moveTo(f * 4 - f * 4.6, -68 + bob); ctx.lineTo(-f * 8, -68 + bob); ctx.stroke();
      if (S.uform) { ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = "rgba(160,225,255,.4)"; ctx.fillRect(f * 4 - 4.6, -70.5 + bob, 9.2, 6.6); ctx.restore(); }
    }
    function drawUryuBow(hx, hy, ang) {
      const lz = S.uform === 1, P = UPAL[S.uform], p = S.player, b = S.usnipe, ch = b && !b.hit ? clamp(b.t / b.charge, 0, 1) : 0;
      const L = lz ? 34 : 28, pull = 4 + ch * 14 - p.recoil * 5;
      ctx.save(); ctx.translate(hx + Math.cos(ang) * 14, hy + Math.sin(ang) * 14); ctx.rotate(ang);
      ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      ctx.shadowColor = "rgba(" + P.a + ",1)"; ctx.shadowBlur = 12;
      ctx.strokeStyle = "rgba(" + P.b + ",.95)"; ctx.lineWidth = lz ? 4 : 3;
      ctx.beginPath(); ctx.moveTo(-8, -L); ctx.quadraticCurveTo(16, 0, -8, L); ctx.stroke();
      if (lz) {
        ctx.fillStyle = "rgba(" + P.a + ",.6)";
        ctx.beginPath(); ctx.moveTo(2, -L * 0.55); ctx.lineTo(-14, -L - 10); ctx.lineTo(-5, -L * 0.7); ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.moveTo(2, L * 0.55); ctx.lineTo(-14, L + 10); ctx.lineTo(-5, L * 0.7); ctx.closePath(); ctx.fill();
      }
      ctx.shadowBlur = 0; ctx.lineWidth = 1.2; ctx.strokeStyle = "rgba(" + P.a + ",.9)";
      ctx.beginPath(); ctx.moveTo(-8, -L); ctx.lineTo(-pull - 6, 0); ctx.lineTo(-8, L); ctx.stroke();
      if (ch > 0 || p.recoil <= 0) {
        const ex = 26 + ch * 10;
        ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-pull - 6, 0); ctx.lineTo(ex, 0); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.moveTo(ex + 8, 0); ctx.lineTo(ex - 2, -3.2); ctx.lineTo(ex - 2, 3.2); ctx.closePath(); ctx.fill();
      }
      if (ch > 0) {
        const rr0 = 6 + ch * 16, gg = ctx.createRadialGradient(34 + ch * 10, 0, 0, 34 + ch * 10, 0, rr0);
        gg.addColorStop(0, "rgba(255,255,255,.9)"); gg.addColorStop(1, "rgba(" + P.a + ",0)"); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(34 + ch * 10, 0, rr0, 0, 6.2832); ctx.fill();
      }
      ctx.restore();
    }
    function drawUryuAura() {
      const p = S.player, t = S.time, lz = S.uform === 1, P = UPAL[S.uform];
      ctx.save(); ctx.translate(p.x, p.y - 44); ctx.globalCompositeOperation = "lighter";
      const gr = ctx.createRadialGradient(0, 0, 4, 0, 0, lz ? 92 : 66); gr.addColorStop(0, "rgba(" + P.a + "," + (lz ? 0.3 : 0.2) + ")"); gr.addColorStop(1, "rgba(" + P.c + ",0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, lz ? 92 : 66, 0, 6.2832); ctx.fill();
      // salib Quincy berputar di belakang
      ctx.save(); ctx.rotate(t * 0.5); ctx.strokeStyle = "rgba(" + P.a + "," + (lz ? 0.4 : 0.28) + ")"; ctx.lineWidth = 1.4;
      const R0 = lz ? 54 : 42; ctx.beginPath(); ctx.arc(0, 0, R0, 0, 6.2832); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -R0 - 10); ctx.lineTo(0, R0 + 10); ctx.moveTo(-R0 - 10, 0); ctx.lineTo(R0 + 10, 0); ctx.stroke(); ctx.restore();
      if (lz) {   // sayap kristal bersudut
        for (const sd of [-1, 1]) {
          ctx.save(); ctx.scale(sd, 1);
          const fl = Math.sin(t * 2.4) * 0.05, plates = [[[8, -12], [82, -66], [98, -56], [30, -4]], [[8, -4], [90, -32], [104, -20], [28, 6]], [[8, 4], [74, -2], [84, 10], [24, 14]]];
          plates.forEach((q, i) => {
            ctx.save(); ctx.translate(8, -10); ctx.rotate(fl * (i + 1)); ctx.translate(-8, 10);
            const g = ctx.createLinearGradient(q[0][0], q[0][1], q[2][0], q[2][1]); g.addColorStop(0, "rgba(" + P.b + ",.55)"); g.addColorStop(1, "rgba(" + P.a + ",.12)");
            ctx.fillStyle = g; ctx.strokeStyle = "rgba(" + P.b + ",.9)"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); for (let k = 1; k < 4; k++) ctx.lineTo(q[k][0], q[k][1]); ctx.closePath(); ctx.fill(); ctx.stroke();
            const tw = Math.max(0, Math.sin(t * 4 + i * 2)); ctx.fillStyle = "rgba(255,255,255," + (0.8 * tw) + ")"; ctx.beginPath(); ctx.arc((q[1][0] + q[0][0]) / 2, (q[1][1] + q[0][1]) / 2, 1.6 + tw, 0, 6.2832); ctx.fill();
            ctx.restore();
          });
          ctx.restore();
        }
      }
      ctx.restore();
    }
    function drawUryuGhosts() {
      if (!S.ufx.length) return;
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      for (const f of S.ufx) { if (f.k !== "ghost") continue; ctx.fillStyle = "rgba(160,225,255," + ((1 - f.t / f.dur) * 0.5) + ")"; rr(f.x - 12, f.y - 66, 24, 62, 10); ctx.fill(); }
      ctx.restore();
    }
    function drawUryuFx() {
      if (!S.uarrows.length && !S.ufx.length && !S.usnipe && !S.ubombs.length && !S.urains.length) return;
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      if (S.urains.length) { const g = ctx.createLinearGradient(0, 0, 0, 170); g.addColorStop(0, "rgba(205,244,255,.32)"); g.addColorStop(1, "rgba(205,244,255,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 170); }
      for (const a of S.uarrows) {
        const sp = Math.hypot(a.vx, a.vy) || 1, ux = a.vx / sp, uy = a.vy / sp, len = a.lz ? 120 : 90, col = a.lz ? "225,248,255" : "127,220,255";
        const g = ctx.createLinearGradient(a.x - ux * len, a.y - uy * len, a.x, a.y); g.addColorStop(0, "rgba(" + col + ",0)"); g.addColorStop(1, "rgba(" + col + ",.85)");
        ctx.strokeStyle = g; ctx.lineWidth = a.lz ? 3.4 : 2.6; ctx.beginPath(); ctx.moveTo(a.x - ux * len, a.y - uy * len); ctx.lineTo(a.x, a.y); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.95)"; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(a.x - ux * len * 0.5, a.y - uy * len * 0.5); ctx.lineTo(a.x, a.y); ctx.stroke();
        ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(Math.atan2(uy, ux)); ctx.fillStyle = "#fff"; ctx.shadowColor = "rgba(" + col + ",1)"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.moveTo(13, 0); ctx.lineTo(-2, -4.2); ctx.lineTo(0, 0); ctx.lineTo(-2, 4.2); ctx.closePath(); ctx.fill(); ctx.restore();
      }
      const b = S.usnipe;
      if (b) {
        const P = UPAL[b.kind === "last" ? 1 : 0], c = Math.cos(b.ang), s = Math.sin(b.ang), far = 1500;
        if (b.t < b.charge) {
          const q = b.t / b.charge;
          ctx.strokeStyle = "rgba(" + P.a + "," + (0.15 + 0.35 * q) + ")"; ctx.lineWidth = 1; ctx.setLineDash([10, 12]);
          ctx.beginPath(); ctx.moveTo(b.ox, b.oy); ctx.lineTo(b.ox + c * far, b.oy + s * far); ctx.stroke(); ctx.setLineDash([]);
          for (let i = 0; i < 3; i++) { ctx.strokeStyle = "rgba(" + P.b + "," + (q * 0.6) + ")"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(b.ox + c * 26, b.oy + s * 26, (1 - q) * 60 * (1 + i * 0.4) + 8, 0, 6.2832); ctx.stroke(); }
        } else {
          const q = (b.t - b.charge) / b.show, fade = Math.max(0, 1 - q), w = b.half * (0.4 + 0.6 * fade);
          ctx.save(); ctx.translate(b.ox, b.oy); ctx.rotate(b.ang);
          const g = ctx.createLinearGradient(0, -w, 0, w); g.addColorStop(0, "rgba(" + P.c + ",0)"); g.addColorStop(0.5, "rgba(" + P.b + "," + (0.9 * fade) + ")"); g.addColorStop(1, "rgba(" + P.c + ",0)");
          ctx.fillStyle = g; ctx.fillRect(0, -w, far, w * 2);
          ctx.fillStyle = "rgba(255,255,255," + fade + ")"; ctx.fillRect(0, -w * 0.22, far, w * 0.44);
          const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 1.6); fg.addColorStop(0, "rgba(255,255,255," + fade + ")"); fg.addColorStop(1, "rgba(" + P.a + ",0)");
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, w * 1.6, 0, 6.2832); ctx.fill();
          ctx.restore();
        }
      }
      for (const bo of S.ubombs) {
        const P = UPAL[1];
        if (!bo.hit) {
          const q = bo.t / bo.fuse, r = bo.R * (0.35 + 0.65 * Math.min(1, q * 1.4)), al = 0.25 + 0.6 * q;
          ctx.save(); ctx.translate(bo.x, bo.y); ctx.strokeStyle = "rgba(" + P.a + "," + al + ")"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.2832); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, 6.2832); ctx.stroke();
          ctx.rotate(bo.t * 1.8); ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.stroke();
          for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.moveTo(0, -r * 0.62); ctx.lineTo(0, -r * 0.72); ctx.stroke(); }
          ctx.restore();
        } else {
          const q2 = clamp((bo.t - bo.fuse) / 0.7, 0, 1), fade = 1 - q2;
          const g = ctx.createRadialGradient(bo.x, bo.y, 0, bo.x, bo.y, bo.R * (0.5 + q2)); g.addColorStop(0, "rgba(255,255,255," + (0.7 * fade) + ")"); g.addColorStop(1, "rgba(" + P.a + ",0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bo.x, bo.y, bo.R * (0.5 + q2), 0, 6.2832); ctx.fill();
          ctx.strokeStyle = "rgba(" + P.b + "," + fade + ")"; ctx.lineWidth = 6 * fade + 1; ctx.beginPath(); ctx.arc(bo.x, bo.y, bo.R * (0.3 + q2 * 1.1), 0, 6.2832); ctx.stroke();
        }
      }
      for (const f of S.ufx) {
        if (f.k === "ghost") continue;
        const fade = 1 - f.t / f.dur;
        ctx.strokeStyle = "rgba(" + (f.k === "bolt" ? "255,255,255" : "127,220,255") + "," + fade + ")"; ctx.lineWidth = (f.k === "bolt" ? 3 : 7) * fade + 1;
        ctx.beginPath(); ctx.moveTo(f.x0, f.y0); ctx.lineTo(f.x1, f.y1); ctx.stroke();
      }
      ctx.restore();
    }

    /* ===== SATORU GOJO (Jujutsu Kaisen): Biasa (penutup mata) -> Six Eyes -> Domain Expansion · tiap wujud punya 3 skill (tombol 3 / 4 / 6) =====
       5 = ganti wujud (Biasa -> Six Eyes -> Domain -> nonaktif).  Klik / J / F = tembak energi kutukan ke arah mouse.
       BIASA    : penutup mata terpasang · 3 Ao (hisap musuh) · 4 Aka (ledakan tolak) · 6 Hollow Purple (sinar ungu)
       SIX EYES : penutup mata dibuka · lebih cepat · INFINITY (peluru musuh dekat Gojo ditangkis, 30% serangan meleset) · skill versi Maksimum, cooldown 40% lebih singkat
       DOMAIN   : Unlimited Void 12 dtk · SEMUA alien membeku, Gojo kebal total, cooldown skill hampir nol · di akhir semua musuh dihantam banjir informasi (bos 20 damage) · cooldown Domain 40 dtk */
    const GFORM = ["Biasa · Penutup Mata", "Six Eyes · Mata Terbuka", "Domain · Unlimited Void"];
    const GPAL = [{ a: "120,160,255", b: "225,235,255", c: "60,80,200" }, { a: "120,215,255", b: "255,255,255", c: "80,130,255" }, { a: "175,120,255", b: "240,225,255", c: "80,30,180" }];
    const GSK = [
      [{ k: "ao", ic: "蒼", n: "Ao · Biru", d: "Menyedot musuh" }, { k: "aka", ic: "赫", n: "Aka · Merah", d: "Ledakan tolak" }, { k: "mur", ic: "茈", n: "Hollow Purple", d: "Sinar ungu" }],
      [{ k: "ao", ic: "蒼", n: "Ao Maksimum", d: "Hisap area luas" }, { k: "aka", ic: "赫", n: "Aka Maksimum", d: "Ledakan besar" }, { k: "mur", ic: "茈", n: "Murasaki Maks", d: "Sinar raksasa" }]
    ];
    const GCD = { ao: 6, aka: 8, mur: 22 }, G_DOM_DUR = 12, G_DOM_CD = 40;
    const gOk = () => !!S && S.gojo && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
    const gcdv = k => S.gcd[k] || 0;
    const gMul = () => S.gform === 2 ? 0.15 : S.gform === 1 ? 0.6 : 1;
    const gDt = dt => (S && S.gdomain) ? dt * 0.04 : dt;
    function gRing(x, y, R, c, dur) { S.gfx.push({ k: "ring", x: x, y: y, R: R, c: c, t: 0, dur: dur || 0.5 }); }
    function resetGojo() {
      if (S.gdomain) S.gdomCd = G_DOM_CD;
      S.gojo = false; S.gform = 0; S.gcd = {}; S.gfx = []; S.gbolts = []; S.gaos = []; S.greds = []; S.gmur = null; S.gdomain = null; S.gintro = 0;
    }
    function gEndDomain(silent) {
      if (!S.gdomain) return;
      S.gdomain = null; S.gdomCd = G_DOM_CD; S.gintro = 0;
      if (silent) return;
      const p = S.player;
      for (const a of S.aliens) { if (a.dead) continue; damageAlien(a, a.kind === "boss" ? 20 : 99, 0, 0); burst(a.x, a.y, 10, "#d9c2ff", 260, true); }
      gRing(p.x, p.y - 44, 1100, "190,140,255", 0.9); gRing(p.x, p.y - 44, 700, "255,255,255", 0.6);
      S.quake = 1.3; sfx.gend(); S.gform = 1;
      banner("Domain runtuh", "無量空処 — musuh dihantam banjir informasi · kembali ke Six Eyes · isi ulang 40 detik", 2800);
    }
    function gDomain() {
      if (S.gdomain) return;
      if (S.gdomCd > 0) { banner("Domain belum siap", "Isi ulang " + Math.ceil(S.gdomCd) + " detik lagi", 1800); return; }
      const p = S.player;
      S.gojo = true; S.gform = 2; S.gmur = null; S.gdomain = { t: 0, dur: G_DOM_DUR }; S.gintro = 2.2; S.quake = 1.2;
      gRing(p.x, p.y - 44, 900, "190,140,255", 1.2); gRing(p.x, p.y - 44, 500, "255,255,255", 0.8);
      burst(p.x, p.y - 44, 50, "#b98cff", 360, true); burst(p.x, p.y - 44, 30, "#ffffff", 260, true);
      sfx.gdomain(); sfx.voice("v_gdom", "りょういき てんかい、むりょうくうしょ");
      banner("Domain Expansion · 無量空処", "Unlimited Void — alien membeku 12 detik · kebal total · cooldown skill hampir nol", 4200);
    }
    function goGojo(n) {
      if (!S || !S.gojoUnlocked) { banner("Gojo terkunci", "Aktifkan mode JJK > Satoru Gojo di website lebih dulu", 3000); return; }
      if (n === 2) { gDomain(); return; }
      if (S.gojo && S.gform === n && !S.gdomain) return;
      const p = S.player, wasOn = S.gojo, prev = S.gform;
      if (S.gdomain) gEndDomain(true);
      S.gojo = true; S.gform = n; S.gmur = null; S.quake = 0.4 + n * 0.3;
      const P = GPAL[n];
      burst(p.x, p.y - 44, 26 + n * 14, "rgb(" + P.a + ")", 300, true); burst(p.x, p.y - 44, 16, "rgb(" + P.b + ")", 220, true); gRing(p.x, p.y - 44, 150 + n * 60, P.a, 0.5);
      if (n === 0) { sfx.gblind(); sfx.voice("v_gojo", "ぼくは さいきょう だからね"); banner("Gojo · Penutup Mata", "目隠し — energi kutukan jarak menengah (klik / J) · Ao, Aka & Hollow Purple (3 · 4 · 6) · tekan 5: Six Eyes", 3600); }
      else {
        if (!wasOn || prev === 0) S.gfx.push({ k: "blind", x: p.x, y: p.y - 70, vx: -p.face * 120, vy: -380, t: 0, dur: 1.0 });
        sfx.gblind(); sfx.voice("v_gsix", "ろくがん"); banner("Six Eyes · 六眼", "Penutup mata dibuka — lebih cepat · Infinity menangkis peluru · skill Maksimum · tekan 5: Domain", 3800);
      }
    }
    function nextGojo() {
      if (!S || !S.gojoUnlocked) { banner("Gojo terkunci", "Aktifkan mode JJK > Satoru Gojo di website lebih dulu", 3000); return; }
      if (!S.gojo) goGojo(0);
      else if (S.gdomain) banner("Domain sedang berlangsung", "Sisa " + Math.max(0, S.gdomain.dur - S.gdomain.t).toFixed(1) + " detik", 1500);
      else if (S.gform === 0) goGojo(1);
      else if (S.gform === 1 && S.gdomCd <= 0) goGojo(2);
      else { resetGojo(); sfx.down(); banner("Gojo Mode nonaktif", "Kembali ke perlengkapan biasa", 2000); }
    }
    /* serangan dasar: bola energi kutukan (Biasa 1 · Six Eyes 2 · Domain 3, biru & merah bergantian) */
    function gShoot() {
      const p = S.player, ang = S.aimAng, f = S.gform;
      if (p.cdR > 0 || (S.gmur && !S.gmur.hit)) return;
      p.cdR = [0.3, 0.18, 0.12][f]; p.recoil = 1; p.face = Math.cos(ang) >= 0 ? 1 : -1;
      S.gflip = !S.gflip;
      const n = f === 0 ? 1 : f === 1 ? 2 : 3, sx = p.x + Math.cos(ang) * 34, sy = p.y - 44 + Math.sin(ang) * 34;
      for (let i = 0; i < n; i++) {
        const a = ang + (i - (n - 1) / 2) * 0.09;
        S.gbolts.push({ x: sx, y: sy, vx: Math.cos(a) * 1100, vy: Math.sin(a) * 1100, life: 1.1, dm: f === 2 ? 4 : 3, pierce: f === 0 ? 1 : 2, hit: [], red: ((i + (S.gflip ? 1 : 0)) % 2) === 1 });
      }
      burst(sx, sy, 4, "#9fd2ff", 120, true); sfx.gshot();
    }
    function gAo() {
      if (gcdv("ao") > 0) return;
      const p = S.player, q = uAimPoint(), six = S.gform >= 1;
      S.gcd.ao = GCD.ao * gMul(); p.recoil = 1; p.face = q.x >= p.x ? 1 : -1;
      S.gaos.push({ x: q.x, y: q.y, t: 0, dur: six ? 3 : 2.2, R: six ? 340 : 230, tick: 0, six: six });
      S.gfx.push({ k: "line", x0: p.x, y0: p.y - 44, x1: q.x, y1: q.y, c: "110,170,255", t: 0, dur: 0.25 });
      sfx.gaoCast(); sfx.voice("v_gao", "じゅつしき じゅんてん、あお"); banner(six ? "Ao Maksimum" : "Ao", "蒼 — bola biru menyedot musuh ke titik bidik lalu menggilingnya", 1800);
    }
    function gAka() {
      if (gcdv("aka") > 0) return;
      const p = S.player, q = uAimPoint(), six = S.gform >= 1;
      S.gcd.aka = GCD.aka * gMul(); p.recoil = 1; p.face = q.x >= p.x ? 1 : -1;
      S.greds.push({ x: q.x, y: q.y, t: 0, fuse: 0.4, R: six ? 270 : 190, hit: false, six: six });
      S.gfx.push({ k: "line", x0: p.x, y0: p.y - 44, x1: q.x, y1: q.y, c: "255,90,90", t: 0, dur: 0.3 });
      sfx.gakaCast(); sfx.voice("v_gaka", "じゅつしき はんてん、あか"); banner(six ? "Aka Maksimum" : "Aka", "赫 — ledakan tolak: musuh terlempar dan hancur", 1800);
    }
    function gRedBlast(r) {
      r.hit = true; S.quake = Math.max(S.quake, r.six ? 1.1 : 0.8); sfx.gaka();
      for (const a of S.aliens) {
        if (a.dead) continue;
        const d = Math.hypot(a.x - r.x, (a.y - r.y) * 0.9);
        if (d <= r.R + a.rx * 0.6) {
          const kx = Math.sign(a.x - r.x) || 1;
          damageAlien(a, a.kind === "boss" ? (r.six ? 13 : 9) : 8, kx, 0);
          if (a.kind !== "boss" && !a.dead && a.bx !== undefined) { a.bx = clamp(a.bx + kx * 150, 60, W - 60); a.x = clamp(a.x + kx * 150, 40, W - 40); }
        }
      }
      for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - r.x, o.y - r.y) <= r.R + o.r) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      burst(r.x, r.y, 44, "#ff4a4a", 380, true); burst(r.x, r.y, 26, "#ffffff", 300, true); gRing(r.x, r.y, r.R * 1.2, "255,80,80", 0.5);
    }
    function gMur() {
      if (gcdv("mur") > 0 || S.gmur) return;
      const p = S.player, ang = S.aimAng, six = S.gform >= 1;
      S.gcd.mur = GCD.mur * gMul(); p.face = Math.cos(ang) >= 0 ? 1 : -1; p.recoil = 1;
      S.gmur = { t: 0, charge: six ? 1.0 : 1.4, show: 0.8, ang: ang, ox: p.x + Math.cos(ang) * 30, oy: p.y - 44 + Math.sin(ang) * 30, half: six ? 76 : 56, boss: six ? 26 : 18, hit: false };
      sfx.gmurCast(); sfx.voice("v_gmur", "むらさき"); S.quake = Math.max(S.quake, 0.3);
      banner(six ? "Murasaki Maksimum" : "Hollow Purple", "茈 — Biru + Merah = Ungu · sinar penghapus menembus semua di garis bidik", 2200);
    }
    function gMurBlast(m) {
      m.hit = true; S.quake = Math.max(S.quake, 1.4); sfx.gmur();
      const r = beamHit(m.ox, m.oy, m.ang, m.half, -30), c = Math.cos(m.ang), s = Math.sin(m.ang);
      for (const a of r.aliens) { damageAlien(a, a.kind === "boss" ? m.boss : 99, c, s); burst(a.x, a.y, 14, "#d6b8ff", 280, true); }
      for (const o of r.orbs) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
      for (let i = 1; i <= 14; i++) burst(m.ox + c * i * 90, m.oy + s * i * 90, 7, i % 2 ? "#a97bff" : "#ffffff", 240, true);
    }
    const GCAST = { ao: gAo, aka: gAka, mur: gMur };
    function useGSkill(slot) {
      if (!S || S.phase === "start") return;
      if (!S.gojoUnlocked) { banner("Gojo terkunci", "Aktifkan mode JJK > Satoru Gojo di website lebih dulu", 3000); return; }
      if (!S.gojo) { banner("Gojo belum aktif", "Tekan 5 untuk memanggil Gojo, lalu buka Six Eyes dan Domain", 2400); return; }
      if (!gOk()) return;
      GCAST[GSK[S.gform >= 1 ? 1 : 0][slot].k]();
    }
    const gSk0 = () => useGSkill(0), gSk1 = () => useGSkill(1), gSk2 = () => useGSkill(2);

    function updGojo(dt) {
      const p = S.player;
      for (const k in S.gcd) S.gcd[k] = Math.max(0, S.gcd[k] - dt);
      if (!S.gdomain) S.gdomCd = Math.max(0, S.gdomCd - dt);
      S.gintro = Math.max(0, S.gintro - dt);
      for (const f of S.gfx) f.t += dt;
      S.gfx = S.gfx.filter(f => f.t < f.dur);
      if (S.gdomain) { S.gdomain.t += dt; if (S.gdomain.t >= S.gdomain.dur) gEndDomain(false); }
      // bola energi
      for (const b of S.gbolts) {
        b.life -= dt; b.x += b.vx * dt; b.y += b.vy * dt;
        if (Math.random() < 0.6) S.fx.push({ x: b.x, y: b.y, vx: rnd(-20, 20), vy: rnd(-20, 20), life: rnd(0.2, 0.35), max: 0.35, size: rnd(1.2, 2.4), col: b.red ? "#ff7a7a" : "#8fc4ff", add: true });
        for (const al of S.aliens) {
          if (b.life <= 0) break;
          if (al.dead || al.ghost || b.hit.indexOf(al) >= 0) continue;
          const ex = (al.x - b.x) / (al.rx + 10), ey = (al.y - b.y) / ((al.ry || 16) + 10);
          if (ex * ex + ey * ey < 1) {
            b.hit.push(al); damageAlien(al, b.dm, Math.sign(b.vx), 0); burst(al.x, al.y, 7, b.red ? "#ff6a6a" : "#8fc4ff", 190, true); sfx.ping();
            if (b.hit.length >= b.pierce) b.life = 0;
          }
        }
        for (const o of S.orbs) if (!o.refl && b.life > 0 && Math.hypot(o.x - b.x, o.y - b.y) < o.r + 9) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
        if (b.x < -80 || b.x > W + 80 || b.y < -140 || b.y > H + 60) b.life = 0;
      }
      S.gbolts = S.gbolts.filter(b => b.life > 0);
      // Ao: menyedot & menggiling
      for (const o of S.gaos) {
        o.t += dt; o.tick -= dt;
        const k = clamp(dt * (o.six ? 3.2 : 2.2), 0, 1);
        for (const a of S.aliens) {
          if (a.dead || a.ghost) continue;
          const d = Math.hypot(a.x - o.x, a.y - o.y);
          if (d > o.R) continue;
          if (a.kind !== "boss") {
            const dx = (o.x - a.x) * k, dy = (o.y - a.y) * k * 0.8;
            a.x += dx; a.y = clamp(a.y + dy, 70, FEET - 90);
            if (a.bx !== undefined) { a.bx += dx; a.by = clamp(a.by + dy, 70, FEET - 90); }
          }
        }
        if (o.tick <= 0) {
          o.tick += 0.4;
          for (const a of S.aliens) {
            if (a.dead || a.ghost) continue;
            const d = Math.hypot(a.x - o.x, a.y - o.y);
            if (d <= (a.kind === "boss" ? o.R * 0.7 : o.R * 0.45)) { damageAlien(a, a.kind === "boss" ? 1 : 2, 0, 0); burst(a.x, a.y, 4, "#8fc4ff", 150, true); }
          }
        }
        for (const or of S.orbs) if (!or.refl && Math.hypot(or.x - o.x, or.y - o.y) <= o.R) { or.life = 0; burst(or.x, or.y, 4, "#8fc4ff", 140, true); }
        if (Math.random() < 0.8) { const a = rnd(0, 6.283), r = rnd(0.4, 1) * o.R; S.fx.push({ x: o.x + Math.cos(a) * r, y: o.y + Math.sin(a) * r, vx: -Math.cos(a) * 260, vy: -Math.sin(a) * 260, life: rnd(0.25, 0.5), max: 0.5, size: rnd(1.4, 3), col: "#9fcaff", add: true }); }
      }
      S.gaos = S.gaos.filter(o => o.t < o.dur);
      // Aka
      for (const r of S.greds) { r.t += dt; if (!r.hit && r.t >= r.fuse) gRedBlast(r); }
      S.greds = S.greds.filter(r => r.t < r.fuse + 0.6);
      // Hollow Purple
      if (S.gmur) { const m = S.gmur; m.t += dt; if (!m.hit && m.t >= m.charge) gMurBlast(m); if (m.t > m.charge + m.show) S.gmur = null; }
      if (!S.gojo) return;
      // INFINITY: peluru musuh dekat Gojo ditangkis (Six Eyes & Domain)
      if (S.gform >= 1) {
        for (const o of S.orbs) {
          if (o.refl || o.life <= 0) continue;
          if (Math.hypot(o.x - p.x, o.y - (p.y - 44)) < 76) { o.life = 0; burst(o.x, o.y, 6, "#9fe3ff", 180, true); gRing(o.x, o.y, 40, "150,225,255", 0.3); sfx.ping(); }
        }
      }
      if (Math.random() < (S.gform === 2 ? 0.7 : 0.35)) S.fx.push({ x: p.x + rnd(-40, 40), y: p.y - rnd(10, 90), vx: rnd(-20, 20), vy: -rnd(30, 90), life: rnd(0.5, 1.0), max: 1, size: rnd(1.2, 2.6), col: S.gform === 2 ? "#c9a8ff" : S.gform === 1 ? "#a8e6ff" : "#9fbaff", add: true });
    }

    /* ===== DESAIN GOJO: seragam hitam berkerah tinggi, rambut putih, penutup mata / Six Eyes, bola energi, Infinity, Domain ===== */
    function drawGojoBody(bob) {
      ctx.fillStyle = "#141830"; rr(-12, -58 + bob, 24, 34, 8); ctx.fill();
      ctx.fillStyle = "#0d1022"; ctx.beginPath(); ctx.moveTo(-12, -40 + bob); ctx.lineTo(12, -40 + bob); ctx.lineTo(16, -12); ctx.lineTo(-16, -12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#1f2650"; rr(-9, -63 + bob, 18, 8, 3); ctx.fill();
      ctx.fillStyle = "#c9a64a"; for (let i = 0; i < 3; i++) ctx.fillRect(-0.8, -51 + bob + i * 7, 1.6, 2.4);
      ctx.strokeStyle = "rgba(120,150,255,.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-11, -40 + bob); ctx.lineTo(-13, -14); ctx.moveTo(11, -40 + bob); ctx.lineTo(13, -14); ctx.stroke();
    }
    function drawGojoHair(f, bob) {
      ctx.fillStyle = "#f4f7ff"; ctx.strokeStyle = "#c3d0f0"; ctx.lineWidth = 0.7;
      const sp = [[-10, -72, -19, -83], [-5, -77, -9, -93], [0, -79, 1, -95], [5, -77, 12, -92], [9, -72, 19, -82], [-11, -66, -21, -67], [10, -66, 15, -60]];
      for (const s of sp) { ctx.beginPath(); ctx.moveTo(f * s[0] - 3.2, s[1] + 2 + bob); ctx.lineTo(f * s[2], s[3] + bob); ctx.lineTo(f * s[0] + 3.2, s[1] + 2 + bob); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(f * 3, -75 + bob); ctx.lineTo(f * 11, -66 + bob); ctx.lineTo(f * 9, -75 + bob); ctx.closePath(); ctx.fill();
    }
    function drawGojoFace(f, bob) {
      if (S.gform === 0) {
        ctx.fillStyle = "#08080f"; rr(-11, -73 + bob, 22, 7, 2.5); ctx.fill();
        ctx.fillStyle = "rgba(160,190,255,.35)"; ctx.fillRect(-9, -72 + bob, 18, 1);
      } else {
        const P = GPAL[S.gform], ex = f * 4.5, ey = -68 + bob;
        ctx.save(); ctx.globalCompositeOperation = "lighter";
        const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, 11); g.addColorStop(0, "rgba(" + P.b + ",.9)"); g.addColorStop(0.4, "rgba(" + P.a + ",.5)"); g.addColorStop(1, "rgba(" + P.a + ",0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ex, ey, 11, 0, 6.2832); ctx.fill(); ctx.restore();
        ctx.fillStyle = "#e9fbff"; ctx.beginPath(); ctx.ellipse(ex, ey, 3.4, 2.5, 0, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgb(" + (S.gform === 2 ? "150,100,255" : "70,170,255") + ")"; ctx.beginPath(); ctx.arc(ex + f * 0.4, ey, 1.7, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#06101c"; ctx.beginPath(); ctx.arc(ex + f * 0.5, ey, 0.7, 0, 6.2832); ctx.fill();
      }
    }
    function drawGojoHand(hx, hy, ang) {
      const f = S.gform, P = GPAL[f], p = S.player, m = S.gmur, ch = m && !m.hit ? clamp(m.t / m.charge, 0, 1) : 0, t = S.time;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang);
      ctx.lineCap = "round"; ctx.strokeStyle = "#141830"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(13 - p.recoil * 4, 0); ctx.stroke();
      ctx.fillStyle = "#f3cfa8"; ctx.beginPath(); ctx.arc(15 - p.recoil * 4, 0, 3.4, 0, 6.2832); ctx.fill();
      ctx.globalCompositeOperation = "lighter";
      if (ch > 0) {
        const sep = (1 - ch) * 16, cx = 34 + ch * 6, r = 4 + ch * 4;
        const dot = (y, col) => { const g = ctx.createRadialGradient(cx, y, 0, cx, y, r * 2.6); g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.35, col); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, y, r * 2.6, 0, 6.2832); ctx.fill(); };
        if (ch < 0.92) { dot(-sep, "rgba(80,140,255,.9)"); dot(sep, "rgba(255,60,60,.9)"); }
        const R2 = 5 + ch * 20, g2 = ctx.createRadialGradient(cx + 6, 0, 0, cx + 6, 0, R2); g2.addColorStop(0, "rgba(255,255,255," + ch + ")"); g2.addColorStop(0.5, "rgba(170,110,255," + (0.8 * ch) + ")"); g2.addColorStop(1, "rgba(120,60,220,0)");
        ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cx + 6, 0, R2, 0, 6.2832); ctx.fill();
      } else {
        const r = 4 + f * 1.4 + Math.sin(t * 7) * 0.8, cx = 26, g = ctx.createRadialGradient(cx, 0, 0, cx, 0, r * 2.6);
        g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.4, "rgba(" + P.a + ",.7)"); g.addColorStop(1, "rgba(" + P.c + ",0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, 0, r * 2.6, 0, 6.2832); ctx.fill();
      }
      ctx.restore();
    }
    function drawGojoAura() {
      const p = S.player, t = S.time, f = S.gform, P = GPAL[f];
      ctx.save(); ctx.translate(p.x, p.y - 44); ctx.globalCompositeOperation = "lighter";
      const R0 = f === 0 ? 58 : 84, gr = ctx.createRadialGradient(0, 0, 4, 0, 0, R0);
      gr.addColorStop(0, "rgba(" + P.a + "," + (f === 0 ? 0.14 : 0.28) + ")"); gr.addColorStop(1, "rgba(" + P.c + ",0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, R0, 0, 6.2832); ctx.fill();
      if (f >= 1) {   // Infinity: cincin tipis berputar + titik heksagon
        ctx.save(); ctx.rotate(t * 0.45); ctx.strokeStyle = "rgba(" + P.a + ",.5)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(0, 0, 62, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = "rgba(" + P.b + ",.85)"; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ctx.beginPath(); ctx.arc(Math.cos(a) * 62, Math.sin(a) * 62, 2.2, 0, 6.2832); ctx.fill(); }
        ctx.restore();
      }
      if (f === 2) {
        ctx.save(); ctx.rotate(-t * 0.7); ctx.strokeStyle = "rgba(190,140,255,.45)"; ctx.lineWidth = 1.2; ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.arc(0, 0, 78, 0, 6.2832); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      }
      ctx.restore();
    }
    /* latar Domain: langit semesta ungu-hitam dengan aliran data (digambar di BELAKANG alien) */
    function drawGojoVoid() {
      const d = S.gdomain; if (!d) return;
      const a = Math.min(1, d.t / 0.5) * Math.min(1, (d.dur - d.t) / 0.8);
      ctx.save();
      ctx.fillStyle = "rgba(4,0,16," + (0.86 * a) + ")"; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(W / 2, H * 0.42, 10, W / 2, H * 0.42, H * 0.8); g.addColorStop(0, "rgba(120,70,220," + (0.28 * a) + ")"); g.addColorStop(1, "rgba(40,10,120,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 54; i++) {
        const sp = 40 + (i % 7) * 18, x = (i * 97.3) % W, y = ((i * 53.7) + S.time * sp) % (H + 60) - 30, len = 8 + (i % 5) * 9;
        ctx.fillStyle = "rgba(" + (i % 3 ? "170,140,255" : "140,220,255") + "," + (0.5 * a) + ")"; ctx.fillRect(x, y, 1.6, len);
      }
      ctx.restore();
    }
    function drawGojoFx() {
      if (!S.gbolts.length && !S.gfx.length && !S.gaos.length && !S.greds.length && !S.gmur && !S.gdomain && !(S.gintro > 0)) return;
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      for (const b of S.gbolts) {
        const sp = Math.hypot(b.vx, b.vy) || 1, ux = b.vx / sp, uy = b.vy / sp, col = b.red ? "255,90,90" : "120,170,255", len = 70;
        const g = ctx.createLinearGradient(b.x - ux * len, b.y - uy * len, b.x, b.y); g.addColorStop(0, "rgba(" + col + ",0)"); g.addColorStop(1, "rgba(" + col + ",.85)");
        ctx.strokeStyle = g; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(b.x - ux * len, b.y - uy * len); ctx.lineTo(b.x, b.y); ctx.stroke();
        const rg = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 14); rg.addColorStop(0, "rgba(255,255,255,.95)"); rg.addColorStop(0.4, "rgba(" + col + ",.8)"); rg.addColorStop(1, "rgba(" + col + ",0)");
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(b.x, b.y, 14, 0, 6.2832); ctx.fill();
      }
      for (const o of S.gaos) {   // Ao
        const q = o.t / o.dur, fade = Math.min(1, (1 - q) * 3), r = 20 + Math.sin(o.t * 9) * 2 + (o.six ? 8 : 0);
        ctx.save(); ctx.translate(o.x, o.y);
        ctx.strokeStyle = "rgba(120,170,255," + (0.35 * fade) + ")"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, o.R, 0, 6.2832); ctx.stroke();
        for (let i = 0; i < 3; i++) { ctx.rotate(o.t * 5 + i * 2.1); ctx.strokeStyle = "rgba(160,200,255," + (0.5 * fade) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r * (1.6 + i * 0.7), 0.2, 2.4); ctx.stroke(); }
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.4); g.addColorStop(0, "rgba(255,255,255," + fade + ")"); g.addColorStop(0.35, "rgba(90,150,255," + (0.9 * fade) + ")"); g.addColorStop(1, "rgba(40,70,220,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * 2.4, 0, 6.2832); ctx.fill(); ctx.restore();
      }
      for (const r of S.greds) {   // Aka
        if (!r.hit) {
          const q = r.t / r.fuse, rad = 10 + q * 26;
          const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, rad * 2.2); g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.35, "rgba(255,70,70,.9)"); g.addColorStop(1, "rgba(200,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(r.x, r.y, rad * 2.2, 0, 6.2832); ctx.fill();
          ctx.strokeStyle = "rgba(255,90,90," + (0.3 + 0.5 * q) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r.x, r.y, r.R * (0.4 + 0.6 * q), 0, 6.2832); ctx.stroke();
        } else {
          const q2 = clamp((r.t - r.fuse) / 0.6, 0, 1), fade = 1 - q2;
          const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.R * (0.5 + q2)); g.addColorStop(0, "rgba(255,255,255," + (0.7 * fade) + ")"); g.addColorStop(0.5, "rgba(255,70,70," + (0.4 * fade) + ")"); g.addColorStop(1, "rgba(200,0,0,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(r.x, r.y, r.R * (0.5 + q2), 0, 6.2832); ctx.fill();
        }
      }
      const m = S.gmur;   // Hollow Purple
      if (m) {
        const c = Math.cos(m.ang), s = Math.sin(m.ang), far = 1500;
        if (m.t < m.charge) {
          const q = m.t / m.charge;
          ctx.strokeStyle = "rgba(170,120,255," + (0.15 + 0.35 * q) + ")"; ctx.lineWidth = 1; ctx.setLineDash([10, 12]);
          ctx.beginPath(); ctx.moveTo(m.ox, m.oy); ctx.lineTo(m.ox + c * far, m.oy + s * far); ctx.stroke(); ctx.setLineDash([]);
        } else {
          const q = (m.t - m.charge) / m.show, fade = Math.max(0, 1 - q), w = m.half * (0.4 + 0.6 * fade);
          ctx.save(); ctx.translate(m.ox, m.oy); ctx.rotate(m.ang);
          const g = ctx.createLinearGradient(0, -w, 0, w); g.addColorStop(0, "rgba(80,30,180,0)"); g.addColorStop(0.5, "rgba(200,160,255," + (0.9 * fade) + ")"); g.addColorStop(1, "rgba(80,30,180,0)");
          ctx.fillStyle = g; ctx.fillRect(0, -w, far, w * 2);
          ctx.fillStyle = "rgba(255,255,255," + fade + ")"; ctx.fillRect(0, -w * 0.22, far, w * 0.44);
          const fg = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 1.6); fg.addColorStop(0, "rgba(255,255,255," + fade + ")"); fg.addColorStop(1, "rgba(170,110,255,0)");
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(0, 0, w * 1.6, 0, 6.2832); ctx.fill(); ctx.restore();
        }
      }
      for (const f of S.gfx) {
        const q = f.t / f.dur, fade = 1 - q;
        if (f.k === "ring") { ctx.strokeStyle = "rgba(" + f.c + "," + fade + ")"; ctx.lineWidth = 6 * fade + 1; ctx.beginPath(); ctx.arc(f.x, f.y, f.R * (0.15 + 0.85 * q), 0, 6.2832); ctx.stroke(); }
        else if (f.k === "line") { ctx.strokeStyle = "rgba(" + f.c + "," + fade + ")"; ctx.lineWidth = 5 * fade + 1; ctx.beginPath(); ctx.moveTo(f.x0, f.y0); ctx.lineTo(f.x1, f.y1); ctx.stroke(); }
        else if (f.k === "blind") {
          const bx = f.x + f.vx * f.t, by = f.y + f.vy * f.t + 520 * f.t * f.t;
          ctx.save(); ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = Math.min(1, fade * 2); ctx.translate(bx, by); ctx.rotate(f.t * 9);
          ctx.fillStyle = "#08080f"; rr(-12, -3.5, 24, 7, 2.5); ctx.fill(); ctx.restore();
        }
      }
      if (S.gdomain) {   // penanda informasi di setiap musuh yang membeku
        const d = S.gdomain, a = Math.min(1, d.t / 0.5) * Math.min(1, (d.dur - d.t) / 0.8);
        for (const al of S.aliens) {
          if (al.dead) continue;
          ctx.save(); ctx.translate(al.x, al.y); ctx.rotate(S.time * 0.8);
          ctx.strokeStyle = "rgba(190,150,255," + (0.8 * a) + ")"; ctx.lineWidth = 1.4; ctx.beginPath();
          for (let i = 0; i < 6; i++) { const an = i * Math.PI / 3, rr0 = (al.rx || 20) + 10; i ? ctx.lineTo(Math.cos(an) * rr0, Math.sin(an) * rr0) : ctx.moveTo(Math.cos(an) * rr0, Math.sin(an) * rr0); }
          ctx.closePath(); ctx.stroke(); ctx.restore();
        }
      }
      if (S.gintro > 0) {   // kilat putih + tulisan perluasan domain
        const q = S.gintro / 2.2, fl = Math.max(0, (q - 0.72) / 0.28);
        ctx.fillStyle = "rgba(255,255,255," + (0.9 * fl) + ")"; ctx.fillRect(0, 0, W, H);
        const ta = Math.min(1, (1 - q) * 4) * Math.min(1, q * 3);
        ctx.globalCompositeOperation = "source-over"; ctx.textAlign = "center"; ctx.font = "900 58px 'Noto Serif JP','Yu Mincho','MS Mincho',serif";
        ctx.fillStyle = "rgba(235,220,255," + ta + ")"; ctx.shadowColor = "rgba(170,110,255,1)"; ctx.shadowBlur = 24;
        ctx.fillText(q > 0.5 ? "領域展開" : "無量空処", W / 2, H * 0.42); ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    /* ===== ICHIBĒ HYŌSUBE (Bleach): Shikai (kuas tinta) -> Bankai (tinta emas) · tiap wujud punya 3 skill (tombol 3 / 4 / 6) =====
       5 = ganti wujud (Shikai -> Bankai -> nonaktif).  Klik / J / F = tembak tinta kuas ke arah mouse.
       SHIKAI : 3 Lempar Tinta (alien yang tersiram jadi SEMUT HITAM: jatuh ke tanah, tidak bisa menyerang) · 4 Tebas Kuas (sabetan panjang) · 6 Hujan Tinta (tetes tinta di seluruh layar)
       BANKAI : tinta emas · lebih cepat · terima 70% damage · area lebih luas · cooldown 40% lebih singkat
       BOS    : tidak jadi semut — terbungkus tinta: bergerak lambat, tidak bisa menembak & tidak melukai pemain selama beberapa detik */
    const IBF = ["Shikai · Kuas Tinta", "Bankai · Tinta Emas"];
    const IBP = [{ a: "225,29,42", b: "255,236,230", hex: "#e11d2a" }, { a: "242,183,5", b: "255,244,200", hex: "#f2b705" }];
    const IBSK = [
      [{ k: "ink", ic: "墨", n: "Lempar Tinta", d: "Musuh jadi semut" }, { k: "brush", ic: "筆", n: "Tebas Kuas", d: "Sabetan panjang" }, { k: "rain", ic: "雨", n: "Hujan Tinta", d: "Semut dari langit" }],
      [{ k: "ink", ic: "墨", n: "Tinta Pekat", d: "Semut area luas" }, { k: "brush", ic: "筆", n: "Kuas Emas", d: "Sabetan raksasa" }, { k: "rain", ic: "雨", n: "Hujan Emas", d: "Semut seluruh layar" }]
    ];
    const IBCD = { ink: 7, brush: 5, rain: 24 };
    const ibOk = () => !!S && S.ichibeUnlocked && S.ib.on && S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
    const ibMul = () => S.ib.form ? 0.6 : 1;
    function ibNew() { return { on: false, form: 0, cd: {}, bolts: [], flasks: [], strokes: [], rains: [], drops: [], fx: [] }; }
    function ibRing(x, y, R, c, dur) { S.ib.fx.push({ k: "ring", x: x, y: y, R: R, c: c, t: 0, dur: dur || 0.5 }); }
    function resetIchibe() { S.ib = ibNew(); }
    function goIchibe(n) {
      if (!S || !S.ichibeUnlocked) { banner("Ichibē terkunci", "Panggil Ichibē Hyōsube dari menu Bleach di website lebih dulu", 3000); return; }
      const ib = S.ib; if (ib.on && ib.form === n) return;
      const p = S.player, P = IBP[n]; ib.on = true; ib.form = n; S.quake = 0.4 + n * 0.3;
      burst(p.x, p.y - 44, 24 + n * 14, "#0a0a10", 300, false); burst(p.x, p.y - 44, 14 + n * 8, P.hex, 260, true); ibRing(p.x, p.y - 44, 150 + n * 70, P.a, 0.55);
      sfx.ibForm(n); sfx.voice(n ? "v_ibk" : "v_ibs", n ? "ばんかい" : "しかい");
      if (n === 0) banner("Ichibē · Shikai", "一筆 — tinta kuas (klik / J) · Lempar Tinta, Tebas Kuas & Hujan Tinta (3 · 4 · 6) · tekan 5: Bankai", 3600);
      else banner("Bankai · Tinta Emas", "Tinta berubah emas — lebih cepat, area lebih luas, cooldown 40% lebih singkat, terima 70% damage", 3600);
    }
    function nextIchibe() {
      if (!S || !S.ichibeUnlocked) { banner("Ichibē terkunci", "Panggil Ichibē Hyōsube dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.ib.on) goIchibe(0);
      else if (S.ib.form === 0) goIchibe(1);
      else { resetIchibe(); sfx.down(); banner("Ichibē Mode nonaktif", "Kembali ke perlengkapan biasa", 2000); }
    }
    /* serangan dasar: tembakan tinta kuas (Shikai 1 · Bankai 3 sebar) */
    function ibShoot() {
      const p = S.player, ib = S.ib, ang = S.aimAng, f = ib.form;
      if (p.cdR > 0) return;
      p.cdR = [0.3, 0.17][f]; p.recoil = 1; p.face = Math.cos(ang) >= 0 ? 1 : -1;
      const n = f ? 3 : 1, sx = p.x + Math.cos(ang) * 34, sy = p.y - 44 + Math.sin(ang) * 34;
      for (let i = 0; i < n; i++) {
        const a = ang + (i - (n - 1) / 2) * 0.1;
        ib.bolts.push({ x: sx, y: sy, vx: Math.cos(a) * 1050, vy: Math.sin(a) * 1050, life: 1.0, dm: f ? 4 : 3, pierce: f ? 2 : 1, hit: [] });
      }
      burst(sx, sy, 4, "#0a0a10", 120, false); sfx.ibShot();
    }
    /* musuh biasa terkena tinta -> SEMUT HITAM: jatuh ke tanah, tidak menyerang, mati saat mendarat */
    function ibMakeAnt(a) {
      if (a.dead || a.ant || a.kind === "boss") return false;
      a.ant = { t: 0, vy: -140, vx: rnd(-50, 50), rot: rnd(0, 6.28), spin: rnd(-7, 7), ph: rnd(0, 6.28) };
      a.ghost = false; a.charge = 0; a.beam = null; a.bindT = 0; a.state = "ant";
      burst(a.x, a.y, 14, "#0a0a10", 220, false); burst(a.x, a.y, 6, IBP[S.ib.form].hex, 160, true);
      return true;
    }
    function ibAntStep(a, dt) {
      const n = a.ant; n.t += dt; n.vy += 760 * dt;
      n.rot += n.spin * dt * (a.y < FEET - 40 ? 1 : 0.2);
      a.x = clamp(a.x + n.vx * dt, 20, W - 20); a.y += n.vy * dt;
      if (a.y >= FEET - 6) {
        a.y = FEET - 6; a.dead = true; S.kills++;
        burst(a.x, a.y, 12, "#0a0a10", 180, false); sfx.ibSplat();
        S.ib.fx.push({ k: "puddle", x: a.x, y: FEET + 2, t: 0, dur: 1.6, r: 14 + rnd(0, 10) });
      }
    }
    function ibInkBoss(b, sec) { b.inkT = Math.max(b.inkT || 0, sec); burst(b.x + rnd(-60, 60), b.y + rnd(-10, 25), 6, "#0a0a10", 200, false); }
    function ibSplat(x, y, R) {
      const ib = S.ib, f = ib.form;
      for (const a of S.aliens) {
        if (a.dead || a.ant) continue;
        const d = Math.hypot(a.x - x, (a.y - y) * 0.9);
        if (d > R + (a.rx || 18) * 0.5) continue;
        if (a.kind === "boss") { ibInkBoss(a, f ? 9 : 6); damageAlien(a, f ? 5 : 3, 0, 0); }
        else ibMakeAnt(a);
      }
      for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - x, o.y - y) <= R + o.r) { o.life = 0; burst(o.x, o.y, 4, "#0a0a10", 120, false); }
      S.quake = Math.max(S.quake, 0.35);
      ib.fx.push({ k: "splat", x: x, y: y, R: R, t: 0, dur: 1.3, seed: rnd(0, 100) });
      ibRing(x, y, R * 1.1, IBP[f].a, 0.45);
      burst(x, y, 30, "#0a0a10", 320, false); burst(x, y, 12, IBP[f].hex, 240, true);
      sfx.ibSplat();
    }
    function ibInk() {
      const ib = S.ib; if ((ib.cd.ink || 0) > 0) return;
      const p = S.player, q = uAimPoint(), f = ib.form;
      ib.cd.ink = IBCD.ink * ibMul(); p.recoil = 1; p.face = q.x >= p.x ? 1 : -1;
      const sx = p.x + p.face * 14, sy = p.y - 50, d = Math.hypot(q.x - sx, q.y - sy) || 1;
      ib.flasks.push({ x: sx, y: sy, tx: q.x, ty: q.y, vx: (q.x - sx) / d * 1000, vy: (q.y - sy) / d * 1000, R: f ? 235 : 160, t: 0 });
      sfx.ibCast(); sfx.voice("v_ibink", "すみを ながせ");
      banner(f ? "Tinta Pekat" : "Lempar Tinta", "墨 — alien yang tersiram berubah jadi semut hitam: jatuh & tidak bisa menyerang", 2200);
    }
    function ibBrush() {
      const ib = S.ib; if ((ib.cd.brush || 0) > 0) return;
      const p = S.player, ang = S.aimAng, f = ib.form;
      ib.cd.brush = IBCD.brush * ibMul(); p.face = Math.cos(ang) >= 0 ? 1 : -1; p.recoil = 1;
      ib.strokes.push({ t: 0, ang: ang, ox: p.x + Math.cos(ang) * 30, oy: p.y - 44 + Math.sin(ang) * 30, half: f ? 52 : 34, hit: false, dm: f ? 10 : 7, boss: f ? 9 : 6, seed: rnd(0, 100) });
      sfx.ibBrushCast(); sfx.voice("v_ibbr", "ふで いっせん");
      banner(f ? "Kuas Emas" : "Tebas Kuas", "筆 — satu sabetan kuas menembus semua di garis bidik", 1800);
    }
    function ibBrushHit(s) {
      s.hit = true; S.quake = Math.max(S.quake, 0.6);
      const r = beamHit(s.ox, s.oy, s.ang, s.half, -20), c = Math.cos(s.ang), sn = Math.sin(s.ang);
      for (const a of r.aliens) { if (a.ant) continue; damageAlien(a, a.kind === "boss" ? s.boss : s.dm, c, sn); burst(a.x, a.y, 10, "#0a0a10", 240, false); }
      for (const o of r.orbs) { o.life = 0; burst(o.x, o.y, 4, "#0a0a10", 120, false); }
      for (let i = 1; i <= 9; i++) burst(s.ox + c * i * 90, s.oy + sn * i * 90, 5, i % 2 ? "#0a0a10" : IBP[S.ib.form].hex, 200, i % 2 === 0);
    }
    function ibRain() {
      const ib = S.ib; if ((ib.cd.rain || 0) > 0) return;
      const p = S.player, f = ib.form;
      ib.cd.rain = IBCD.rain * ibMul(); p.recoil = 1;
      ib.rains.push({ t: 0, dur: f ? 4 : 3, acc: 0 });
      sfx.ibRainCast(); sfx.voice("v_ibrain", "すみの あめ");
      banner(f ? "Hujan Emas" : "Hujan Tinta", "雨 — tetes tinta jatuh di seluruh layar: yang kena jadi semut", 2200);
    }
    const IBCAST = { ink: ibInk, brush: ibBrush, rain: ibRain };
    function useIbSkill(slot) {
      if (!S || S.phase === "start") return;
      if (!S.ichibeUnlocked) { banner("Ichibē terkunci", "Panggil Ichibē Hyōsube dari menu Bleach di website lebih dulu", 3000); return; }
      if (!S.ib.on) { banner("Ichibē belum aktif", "Tekan 5 untuk memanggil Ichibē (Shikai), lalu Bankai", 2400); return; }
      if (!ibOk()) return;
      IBCAST[IBSK[S.ib.form][slot].k]();
    }
    const ibSk0 = () => useIbSkill(0), ibSk1 = () => useIbSkill(1), ibSk2 = () => useIbSkill(2);

    function updIchibe(dt) {
      const ib = S.ib, p = S.player, P = IBP[ib.form];
      for (const k in ib.cd) ib.cd[k] = Math.max(0, ib.cd[k] - dt);
      for (const f of ib.fx) f.t += dt;
      ib.fx = ib.fx.filter(f => f.t < f.dur);
      // tembakan tinta
      for (const b of ib.bolts) {
        b.life -= dt; b.x += b.vx * dt; b.y += b.vy * dt;
        if (Math.random() < 0.6) S.fx.push({ x: b.x, y: b.y, vx: rnd(-20, 20), vy: rnd(-20, 20), life: rnd(0.2, 0.35), max: 0.35, size: rnd(1.2, 2.4), col: Math.random() < 0.5 ? "#0a0a10" : P.hex, add: false });
        for (const al of S.aliens) {
          if (b.life <= 0) break;
          if (al.dead || al.ghost || al.ant || b.hit.indexOf(al) >= 0) continue;
          const ex = (al.x - b.x) / (al.rx + 10), ey = (al.y - b.y) / ((al.ry || 16) + 10);
          if (ex * ex + ey * ey < 1) {
            b.hit.push(al); damageAlien(al, b.dm, Math.sign(b.vx), 0); burst(al.x, al.y, 7, "#0a0a10", 190, false); sfx.ping();
            if (b.hit.length >= b.pierce) b.life = 0;
          }
        }
        for (const o of S.orbs) if (!o.refl && b.life > 0 && Math.hypot(o.x - b.x, o.y - b.y) < o.r + 9) { o.life = 0; burst(o.x, o.y, 5, o.col, 150, true); }
        if (b.x < -80 || b.x > W + 80 || b.y < -140 || b.y > H + 60) b.life = 0;
      }
      ib.bolts = ib.bolts.filter(b => b.life > 0);
      // Lempar Tinta: kantong tinta terbang lalu meledak di titik bidik / saat kena alien
      for (const s of ib.flasks) {
        s.t += dt;
        const step = 1000 * dt, d = Math.hypot(s.tx - s.x, s.ty - s.y);
        s.x += s.vx * dt; s.y += s.vy * dt;
        let hitA = null;
        for (const a of S.aliens) {
          if (a.dead || a.ant) continue;
          const ex = (a.x - s.x) / ((a.rx || 18) + 8), ey = (a.y - s.y) / ((a.ry || 14) + 8);
          if (ex * ex + ey * ey < 1) { hitA = a; break; }
        }
        if (hitA || d <= step || s.t > 1.2) { s.done = true; if (hitA) ibSplat(s.x, s.y, s.R); else ibSplat(s.tx, s.ty, s.R); }
        else if (Math.random() < 0.7) S.fx.push({ x: s.x, y: s.y, vx: rnd(-30, 30), vy: rnd(-30, 30), life: rnd(0.2, 0.4), max: 0.4, size: rnd(1.5, 3), col: "#0a0a10", add: false });
      }
      ib.flasks = ib.flasks.filter(s => !s.done);
      // Tebas Kuas
      for (const s of ib.strokes) { s.t += dt; if (!s.hit && s.t >= 0.16) ibBrushHit(s); }
      ib.strokes = ib.strokes.filter(s => s.t < 0.75);
      // Hujan Tinta: tetes dibuat acak, sebagian diarahkan ke atas alien
      for (const r of ib.rains) {
        r.t += dt; r.acc += dt;
        const gap = ib.form ? 0.07 : 0.1;
        while (r.acc >= gap) {
          r.acc -= gap;
          if (r.t > r.dur) continue;
          const live = S.aliens.filter(a => !a.dead && !a.ant), tg = live.length ? live[Math.floor(Math.random() * live.length)] : null;
          const x = tg && Math.random() < 0.6 ? clamp(tg.x + rnd(-30, 30), 20, W - 20) : rnd(30, W - 30);
          ib.drops.push({ x: x, y: -20, vy: 620 + rnd(0, 140), r: ib.form ? 10 : 8 });
        }
      }
      ib.rains = ib.rains.filter(r => r.t < r.dur + 0.1);
      for (const d of ib.drops) {
        d.y += d.vy * dt;
        for (const a of S.aliens) {
          if (d.done) break;
          if (a.dead || a.ant) continue;
          const ex = (a.x - d.x) / ((a.rx || 18) + d.r), ey = (a.y - d.y) / ((a.ry || 14) + d.r);
          if (ex * ex + ey * ey < 1) {
            d.done = true;
            if (a.kind === "boss") ibInkBoss(a, 4); else ibMakeAnt(a);
            burst(d.x, d.y, 6, "#0a0a10", 160, false);
          }
        }
        if (!d.done) for (const o of S.orbs) if (!o.refl && Math.hypot(o.x - d.x, o.y - d.y) < o.r + d.r) { o.life = 0; d.done = true; burst(d.x, d.y, 4, "#0a0a10", 120, false); break; }
        if (!d.done && d.y >= FEET) { d.done = true; burst(d.x, FEET, 5, "#0a0a10", 140, false); ib.fx.push({ k: "puddle", x: d.x, y: FEET + 2, t: 0, dur: 1.0, r: 8 }); }
      }
      ib.drops = ib.drops.filter(d => !d.done && d.y < H + 40);
      if (!ib.on) return;
      if (Math.random() < 0.35) S.fx.push({ x: p.x + rnd(-30, 30), y: p.y - rnd(10, 90), vx: rnd(-15, 15), vy: -rnd(20, 70), life: rnd(0.5, 1), max: 1, size: rnd(1.2, 2.6), col: Math.random() < 0.5 ? "#0a0a10" : P.hex, add: false });
    }

    /* ===== DESAIN ICHIBĒ: jubah krem + sabuk merah (Shikai) / emas (Bankai), rambut putih bersanggul, janggut, kuas raksasa ===== */
    function drawIbBody(bob) {
      const P = IBP[S.ib.form];
      ctx.fillStyle = "#e8e0cc"; rr(-12, -58 + bob, 24, 34, 8); ctx.fill();
      ctx.fillStyle = "#1b1a22"; ctx.beginPath(); ctx.moveTo(-13, -32 + bob); ctx.lineTo(13, -32 + bob); ctx.lineTo(17, -9); ctx.lineTo(-17, -9); ctx.closePath(); ctx.fill();
      ctx.fillStyle = P.hex; ctx.fillRect(-12, -38 + bob, 24, 5);
      ctx.strokeStyle = "rgba(20,20,30,.55)"; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(-6, -58 + bob); ctx.lineTo(0, -40 + bob); ctx.lineTo(6, -58 + bob); ctx.stroke();
      ctx.save(); ctx.fillStyle = "rgba(20,20,30,.55)"; ctx.font = "700 10px 'Noto Serif JP','Yu Mincho',serif"; ctx.textAlign = "center"; ctx.fillText("墨", 0, -45 + bob); ctx.restore();
    }
    function drawIbHair(f, bob) {
      ctx.fillStyle = "#e4e4ee"; ctx.strokeStyle = "#a9a9bd"; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(-f * 8, -76 + bob); ctx.quadraticCurveTo(-f * 22, -70 + bob, -f * 20, -50 + bob); ctx.quadraticCurveTo(-f * 12, -58 + bob, -f * 8, -64 + bob); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(-f * 2, -85 + bob, 5.2, 0, 6.2832); ctx.fill(); ctx.stroke();
      ctx.fillStyle = IBP[S.ib.form].hex; ctx.fillRect(-f * 2 - 5, -81 + bob, 10, 2.4);
    }
    function drawIbFace(f, bob) {
      ctx.strokeStyle = "#5b5b6e"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(f * 1.5, -71.5 + bob); ctx.lineTo(f * 8, -70.4 + bob); ctx.stroke();
      ctx.fillStyle = "#e4e4ee"; ctx.beginPath(); ctx.moveTo(-3, -62 + bob); ctx.quadraticCurveTo(f * 2, -44 + bob, f * 8, -61 + bob); ctx.quadraticCurveTo(f * 3, -58 + bob, -3, -62 + bob); ctx.fill();
    }
    function drawIbBrush(hx, hy, ang) {
      const P = IBP[S.ib.form], p = S.player, t = S.time, x0 = 8 - p.recoil * 4;
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(ang);
      ctx.lineCap = "round"; ctx.strokeStyle = "#e8e0cc"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(12 - p.recoil * 4, 0); ctx.stroke();
      ctx.fillStyle = "#f3cfa8"; ctx.beginPath(); ctx.arc(14 - p.recoil * 4, 0, 3.4, 0, 6.2832); ctx.fill();
      ctx.fillStyle = "#6a4a2a"; rr(x0, -1.6, 30, 3.2, 1.6); ctx.fill();
      ctx.fillStyle = P.hex; ctx.fillRect(x0 + 30, -2.6, 3, 5.2);
      ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.moveTo(x0 + 33, -3.6); ctx.quadraticCurveTo(x0 + 46, -2, x0 + 54, 0); ctx.quadraticCurveTo(x0 + 46, 2, x0 + 33, 3.6); ctx.closePath(); ctx.fill();
      ctx.globalCompositeOperation = "lighter";
      const r = 7 + Math.sin(t * 7) * 1.2, cx = x0 + 54, g = ctx.createRadialGradient(cx, 0, 0, cx, 0, r * 2);
      g.addColorStop(0, "rgba(" + P.b + ",.9)"); g.addColorStop(0.4, "rgba(" + P.a + ",.55)"); g.addColorStop(1, "rgba(" + P.a + ",0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, 0, r * 2, 0, 6.2832); ctx.fill();
      ctx.restore();
    }
    function drawIbAura() {
      const p = S.player, t = S.time, f = S.ib.form, P = IBP[f];
      ctx.save(); ctx.translate(p.x, p.y - 44); ctx.globalCompositeOperation = "lighter";
      const R0 = f ? 84 : 62, gr = ctx.createRadialGradient(0, 0, 4, 0, 0, R0);
      gr.addColorStop(0, "rgba(" + P.a + "," + (f ? 0.22 : 0.14) + ")"); gr.addColorStop(1, "rgba(" + P.a + ",0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(0, 0, R0, 0, 6.2832); ctx.fill();
      ctx.rotate(t * (f ? 0.9 : 0.5)); ctx.fillStyle = "rgba(" + P.b + ",.75)";
      for (let i = 0; i < (f ? 8 : 5); i++) { const a = i * 6.2832 / (f ? 8 : 5); ctx.beginPath(); ctx.arc(Math.cos(a) * (R0 - 8), Math.sin(a) * (R0 - 8), 2, 0, 6.2832); ctx.fill(); }
      ctx.restore();
    }
    /* semut hitam (musuh yang tersiram tinta) */
    function drawInkAnt(a) {
      const n = a.ant, T = S.time, q = clamp(n.t / 0.25, 0, 1), P = IBP[S.ib.form];
      if (q < 1) {   // gumpalan tinta menyusut jadi semut
        ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.arc(0, 0, (a.rx || 18) * (1 - q) + 6, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = "rgba(" + P.a + "," + (0.8 * (1 - q)) + ")"; ctx.lineWidth = 1.5; ctx.stroke();
      }
      ctx.save(); ctx.rotate(n.rot); ctx.scale(1.7, 1.7);
      ctx.strokeStyle = "#07070c"; ctx.lineWidth = 1.2; ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const w = Math.sin(T * 22 + n.ph + i * 2) * 2.2, y0 = -2 + i * 2.6;
        ctx.beginPath(); ctx.moveTo(-1, y0); ctx.lineTo(-7, y0 - 3 + w); ctx.lineTo(-10, y0 + 3 - w); ctx.moveTo(1, y0); ctx.lineTo(7, y0 - 3 - w); ctx.lineTo(10, y0 + 3 + w); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(-1, -7); ctx.lineTo(-4, -11); ctx.moveTo(1, -7); ctx.lineTo(4, -11); ctx.stroke();
      ctx.fillStyle = "#07070c";
      ctx.beginPath(); ctx.arc(0, -5.5, 2.2, 0, 6.2832); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, -1, 1.9, 2.6, 0, 0, 6.2832); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 5, 2.8, 4, 0, 0, 6.2832); ctx.fill();
      ctx.fillStyle = "rgba(" + P.b + ",.55)"; ctx.beginPath(); ctx.arc(-0.8, -6, 0.7, 0, 6.2832); ctx.fill();
      ctx.restore();
    }
    /* bos yang terbungkus tinta */
    function drawBossInk(b) {
      if (b.dead) return;
      const q = Math.min(1, b.inkT / 1.2), P = IBP[S.ib.form];
      ctx.save(); ctx.translate(b.x, b.y);
      ctx.globalAlpha = 0.8 * q; ctx.fillStyle = "#07070c"; ell(0, 8, 98, 28); ctx.fill(); ell(0, 0, 98, 22); ctx.fill();
      ctx.globalAlpha = 0.9 * q;
      for (let i = -4; i <= 4; i++) {
        const h = 14 + ((i * 29 + 100) % 23) + Math.sin(S.time * 3 + i) * 4;
        ctx.fillRect(i * 20 - 3, 18, 6, h); ctx.beginPath(); ctx.arc(i * 20, 18 + h, 4.5, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = q; ctx.strokeStyle = "rgba(" + P.a + ",.7)"; ctx.lineWidth = 1.6; ell(0, 8, 98, 28); ctx.stroke();
      ctx.restore();
    }
    function drawIbFx() {
      const ib = S.ib;
      if (!ib.bolts.length && !ib.flasks.length && !ib.strokes.length && !ib.drops.length && !ib.fx.length) return;
      const P = IBP[ib.form];
      ctx.save(); ctx.lineCap = "round";
      for (const f of ib.fx) {   // bercak & cincin
        const q = f.t / f.dur, fade = 1 - q;
        if (f.k === "splat") {
          ctx.globalCompositeOperation = "source-over";
          const grow = Math.min(1, q * 6 + 0.25);
          ctx.globalAlpha = 0.85 * fade; ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.arc(f.x, f.y, f.R * 0.42 * grow, 0, 6.2832); ctx.fill();
          for (let i = 0; i < 14; i++) {
            const a = i / 14 * 6.2832 + f.seed, rr0 = f.R * (0.3 + 0.7 * (((i * 37) % 10) / 10)) * grow, bx = f.x + Math.cos(a) * rr0, by = f.y + Math.sin(a) * rr0 * 0.8, br = 9 + ((i * 53) % 17);
            ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.arc(bx, by, br, 0, 6.2832); ctx.fill();
            ctx.strokeStyle = "rgba(" + P.a + "," + (0.6 * fade) + ")"; ctx.lineWidth = 1.4; ctx.stroke();
          }
          ctx.globalAlpha = 1;
        } else if (f.k === "puddle") {
          ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 0.8 * fade; ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * (0.5 + 0.5 * Math.min(1, q * 5)), f.r * 0.32, 0, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1;
        } else if (f.k === "ring") {
          ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(" + f.c + "," + fade + ")"; ctx.lineWidth = 6 * fade + 1; ctx.beginPath(); ctx.arc(f.x, f.y, f.R * (0.15 + 0.85 * q), 0, 6.2832); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      for (const b of ib.bolts) {   // tembakan tinta: komet hitam berpinggir warna
        const sp = Math.hypot(b.vx, b.vy) || 1, ux = b.vx / sp, uy = b.vy / sp, len = 60;
        ctx.strokeStyle = "rgba(" + P.a + ",.5)"; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(b.x - ux * len, b.y - uy * len); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.strokeStyle = "#07070c"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(b.x - ux * len, b.y - uy * len); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, 6.2832); ctx.fill(); ctx.strokeStyle = "rgba(" + P.b + ",.9)"; ctx.lineWidth = 1.5; ctx.stroke();
      }
      for (const s of ib.flasks) {   // kantong tinta
        ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.arc(s.x, s.y, 13 + Math.sin(S.time * 20) * 1.5, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = "rgba(" + P.a + ",.9)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "rgba(" + P.b + ",.6)"; ctx.beginPath(); ctx.arc(s.x - 4, s.y - 4, 3, 0, 6.2832); ctx.fill();
      }
      for (const d of ib.drops) {   // tetes hujan
        ctx.fillStyle = "#07070c"; ctx.beginPath(); ctx.moveTo(d.x, d.y - d.r * 2.4); ctx.quadraticCurveTo(d.x + d.r, d.y - d.r * 0.4, d.x, d.y + d.r); ctx.quadraticCurveTo(d.x - d.r, d.y - d.r * 0.4, d.x, d.y - d.r * 2.4); ctx.fill();
        ctx.strokeStyle = "rgba(" + P.a + ",.8)"; ctx.lineWidth = 1.2; ctx.stroke();
      }
      for (const s of ib.strokes) {   // sabetan kuas kaligrafi
        const q = s.t / 0.75, fade = Math.max(0, 1 - Math.max(0, s.t - 0.16) / 0.59), ext = Math.min(1, s.t / 0.16), len = 1100 * ext, N = 26;
        ctx.save(); ctx.translate(s.ox, s.oy); ctx.rotate(s.ang); ctx.globalAlpha = fade;
        const top = [], bot = [];
        for (let i = 0; i <= N; i++) {
          const k = i / N, w = s.half * 0.55 * Math.pow(Math.sin(Math.PI * Math.min(1, k * 1.1)), 0.6) * (0.75 + 0.25 * Math.sin(k * 23 + s.seed));
          top.push([len * k, -w]); bot.push([len * k, w]);
        }
        ctx.beginPath(); top.forEach((pt, i) => i ? ctx.lineTo(pt[0], pt[1]) : ctx.moveTo(pt[0], pt[1])); for (let i = N; i >= 0; i--) ctx.lineTo(bot[i][0], bot[i][1]); ctx.closePath();
        ctx.fillStyle = "#07070c"; ctx.fill(); ctx.strokeStyle = "rgba(" + P.a + ",.85)"; ctx.lineWidth = 2; ctx.stroke();
        ctx.restore(); ctx.globalAlpha = 1;
      }
      ctx.restore();
    }

    function modeKind() { return S.zaraki ? (S.bankai ? "bankai" : "zaraki") : S.aizen ? "aizen" : S.shinji ? "shinji" : "base"; }
    function doAttack() {
      const p = S.player, ang = S.aimAng;
      if (S.phase === "dead" || S.phase === "victory" || S.phase === "start") return;
      if (S.ib.on) { ibShoot(); return; }
      if (S.gojo) { gShoot(); return; }
      if (S.uryu) { uShoot(); return; }
      if (S.ichigo) {
        if (p.cdK > 0) return;
        const fm = S.iform;
        p.cdK = S.amukT > 0 ? 0.13 : [0.36, 0.22, 0.2, 0.3][fm]; p.slash = 0.22; p.slashAng = ang; p.face = Math.cos(ang) >= 0 ? 1 : -1;
        const cx = p.x, cy = p.y - 38, R = [118, 132, 140, 182][fm], dm = [4, 4, 5, 6][fm];
        S.slashes.push({ x: cx, y: cy, ang: ang, t: 0.22, z: 1, bk: fm === 1 || fm === 3, R: R, ic: fm }); sfx.slash(IKEY[fm]);
        let hit = false;
        for (const a of S.aliens) {
          if (a.dead) continue;
          const dx = a.x - cx, dy = a.y - cy, d = Math.hypot(dx, dy);
          if (d <= R + a.rx * 0.8 && (angDiff(Math.atan2(dy, dx), ang) <= 1.3 || d < a.rx + 30)) { damageAlien(a, dm, dx / (d || 1), dy / (d || 1)); hit = true; }
        }
        for (const o of S.orbs) {
          const dx = o.x - cx, dy = o.y - cy;
          if (!o.refl && Math.hypot(dx, dy) <= R + o.r && angDiff(Math.atan2(dy, dx), ang) <= 1.4) { o.life = 0; burst(o.x, o.y, 6, o.col, 150, true); sfx.ping(); }
        }
        if (hit) S.quake = Math.max(S.quake, 0.2);
        return;
      }
      if (S.zaraki) {
        if (p.cdK > 0) return;
        const bk = S.bankai;
        p.cdK = bk ? 0.2 : 0.34; p.slash = 0.22; p.slashAng = ang; p.face = Math.cos(ang) >= 0 ? 1 : -1;
        const cx = p.x, cy = p.y - 38, R = bk ? 210 : 150;
        S.slashes.push({ x: cx, y: cy, ang: ang, t: 0.22, z: 1, bk: bk, R: R }); sfx.slash(bk ? "bankai" : "zaraki");
        let hit = false;
        for (const a of S.aliens) {
          if (a.dead) continue;
          const dx = a.x - cx, dy = a.y - cy, d = Math.hypot(dx, dy);
          if (d <= R + a.rx * 0.8 && (angDiff(Math.atan2(dy, dx), ang) <= 1.3 || d < a.rx + 30)) { damageAlien(a, bk ? 9999 : a.kind === "boss" ? 7 : 5, dx / (d || 1), dy / (d || 1)); hit = true; }
        }
        for (const o of S.orbs) {
          const dx = o.x - cx, dy = o.y - cy;
          if (Math.hypot(dx, dy) <= R + o.r && angDiff(Math.atan2(dy, dx), ang) <= 1.4) { o.life = 0; burst(o.x, o.y, 6, o.col, 150, true); sfx.ping(); }
        }
        if (hit) S.quake = Math.max(S.quake, bk ? 0.45 : 0.18);
        return;
      }
      if (S.shinji && S.sakanade) {
        if (p.cdK > 0) return;
        p.cdK = 0.3; p.slash = 0.22; p.slashAng = ang; p.face = Math.cos(ang) >= 0 ? 1 : -1;
        const cx = p.x, cy = p.y - 38, R = 126;
        S.slashes.push({ x: cx, y: cy, ang: ang, t: 0.22 }); sfx.slash("shinji");
        for (const a of S.aliens) {
          if (a.dead) continue;
          const dx = a.x - cx, dy = a.y - cy, d = Math.hypot(dx, dy);
          if (d <= R + a.rx * 0.8 && (angDiff(Math.atan2(dy, dx), ang) <= 1.25 || d < a.rx + 30)) damageAlien(a, 5, dx / (d || 1), dy / (d || 1));
        }
        return;
      }
      if (p.weapon === 0) {
        if (p.cdK > 0) return;
        p.cdK = 0.38; p.slash = 0.22; p.slashAng = ang; p.face = Math.cos(ang) >= 0 ? 1 : -1;
        const cx = p.x, cy = p.y - 38, R = 108;
        S.slashes.push({ x: cx, y: cy, ang: ang, t: 0.22 }); sfx.slash(S.aizen ? "aizen" : S.shinji ? "shinji" : "base");
        for (const a of S.aliens) {
          if (a.dead) continue;
          const dx = a.x - cx, dy = a.y - cy, d = Math.hypot(dx, dy);
          if (d <= R + a.rx * 0.8 && (angDiff(Math.atan2(dy, dx), ang) <= 1.2 || d < a.rx + 30)) damageAlien(a, S.aizen ? 4 : 3, dx / (d || 1), dy / (d || 1));
        }
        for (const o of S.orbs) {
          const dx = o.x - cx, dy = o.y - cy;
          if (Math.hypot(dx, dy) <= R + o.r && angDiff(Math.atan2(dy, dx), ang) <= 1.3) { o.life = 0; burst(o.x, o.y, 6, o.col, 150, true); sfx.ping(); }
        }
      } else {
        if (p.cdR > 0) return;
        p.cdR = 0.34; p.recoil = 1; p.face = Math.cos(ang) >= 0 ? 1 : -1;
        const sx = p.x + Math.cos(ang) * 30, sy = p.y - 42 + Math.sin(ang) * 30;
        S.bullets.push({ x: sx, y: sy, px: sx, py: sy, vx: Math.cos(ang) * 950, vy: Math.sin(ang) * 950, life: 1.3 });
        burst(sx, sy, 5, "#fff2a8", 140, true); sfx.shot(modeKind());
      }
    }

    /* ----- pembaruan per frame ----- */
    function step(dt) {
      if (!S) return;
      S.day += dt; S.time += dt;
      env = envAt((S.day % DAY) / DAY);
      for (const c of clouds) { c.x += c.v * dt; if (c.x > W + 140) c.x = -140; }
      updAmbient(dt);
      for (const f of S.fx) { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 160 * dt; f.life -= dt; }
      S.fx = S.fx.filter(f => f.life > 0);
      for (const s of S.slashes) s.t -= dt;
      S.slashes = S.slashes.filter(s => s.t > 0);

      const p = S.player;
      const playing = S.phase !== "start" && S.phase !== "dead" && S.phase !== "victory" && S.phase !== "pos";
      S.aimAng = aimAngle();

      /* gerak pemain */
      const rawAx = (keys.left || touch.left ? -1 : 0) + (keys.right || touch.right ? 1 : 0);
      const ax = S.sekaiT > 0 ? -rawAx : rawAx;
      if (S.phase !== "dead" && S.phase !== "victory") {
        p.vx = lerp(p.vx, ax * (S.zaraki ? 285 : S.ichigo ? ichiSpeed() : S.uryu ? (S.uform ? 295 : 262) : S.gojo ? (S.gform ? 300 : 270) : S.ib.on ? (S.ib.form ? 295 : 265) : 250), Math.min(1, dt * 14));
        p.x = clamp(p.x + p.vx * dt, 24, W - 24);
        const wasAir = !p.onGround;
        const wantJump = keys.jump || touch.jump;
        if (wantJump && !jumpHeld && p.onGround) { p.vy = S.zaraki ? -900 : S.ichigo ? -ichiJump() : S.uryu ? (S.uform ? -760 : -660) : S.gojo ? (S.gform ? -780 : -690) : S.ib.on ? (S.ib.form ? -760 : -680) : -640; p.onGround = false; sfx.jump(S.zaraki ? "zaraki" : "base"); }
        jumpHeld = wantJump;
        p.vy += 1900 * dt; p.y += p.vy * dt;
        if (p.y >= FEET) { const fv = p.vy; p.y = FEET; p.vy = 0; p.onGround = true; if (wasAir && (S.sjump || S.slam)) landShock(); else if (wasAir && fv > 380) sfx.land(S.zaraki ? "zaraki" : "base"); }
        if (p.onGround && Math.abs(p.vx) > 20) { p.walk += dt * Math.abs(p.vx) * 0.045; const sn = Math.floor(p.walk / Math.PI); if (sn !== S.stepN) { S.stepN = sn; sfx.step(S.zaraki ? "zaraki" : "base"); } }
        if (performance.now() - lastMouse < 3000 || p.slash > 0) p.face = Math.cos(S.aimAng) >= 0 ? 1 : -1; else if (ax) p.face = ax;
      }
      updZaraki(dt);
      updIchigo(dt);
      updUryu(dt);
      updGojo(dt);
      updIchibe(dt);
      p.cdK = Math.max(0, p.cdK - dt); p.cdR = Math.max(0, p.cdR - dt); p.slash = Math.max(0, p.slash - dt);
      if (S.surge) { S.surge.t += dt; if (S.surge.t >= S.surge.dur) S.surge = null; } S.sekaiT = Math.max(0, S.sekaiT - dt); S.ceroCd = Math.max(0, S.ceroCd - dt); S.ceroFx = Math.max(0, S.ceroFx - dt); S.ceroMaskT = Math.max(0, S.ceroMaskT - dt);
      p.inv = Math.max(0, p.inv - dt); p.recoil = Math.max(0, p.recoil - dt * 6);
      S.kuroCd = Math.max(0, S.kuroCd - dt); S.goryuCd = Math.max(0, S.goryuCd - dt); S.castT = Math.max(0, S.castT - dt); S.quake = Math.max(0, S.quake - dt * 1.6);
      if (S.kyokaT > 0) {
        S.kyokaT -= dt; if (S.kyokaT <= 0) { S.kyokaT = 0; S.kyokaCd = 6; sfx.kyokaEnd(); banner("Kyōka Suigetsu berakhir", "Ilusi memudar", 1500); }
        let dtx = W - p.x; if (Math.abs(dtx - p.x) < 220) dtx = p.x + (p.x < W / 2 ? 1 : -1) * 260;
        S.kyokaDecoyX = lerp(S.kyokaDecoyX, clamp(dtx, 70, W - 70), Math.min(1, dt * 2.2));
      } else S.kyokaCd = Math.max(0, S.kyokaCd - dt);
      if (S.kuro) { const k = S.kuro; k.t += dt; if (!k.hit && k.t >= 1.5) kuroBlast(k); if (k.t > 2.6) S.kuro = null; }
      if (S.goryu) { const g = S.goryu; g.t += dt; if (!g.hit && g.t >= 0.6) goryuBlast(g); if (g.t > 1.9) S.goryu = null; }
      if (playing && (mouseDown || keys.attack || touch.attack)) doAttack();
      if (playing && !S.bankai && S.time - p.lastHurt > 4 && p.hp < p.max) p.hp = Math.min(p.max, p.hp + 3 * dt);

      if (playing || S.phase === "bossdead" || S.phase === "clear") S.runTime += S.phase === "clear" ? 0 : dt;

      /* alur ronde */
      S.phaseT += dt;
      if (S.phase === "intro" || S.phase === "minions" || S.phase === "descend" || S.phase === "boss") updBoss(gDt(dt));
      if (S.phase === "bossdead" && S.phaseT > 2.2) {
        if (S.wave >= TOTAL) {
          S.phase = "victory";
          const best = getBest();
          S.newRecord = !best.time || S.runTime < best.time;
          saveBest(TOTAL, S.newRecord ? Math.round(S.runTime) : best.time);
          clearPos();
          sfx.clear(); showScreen("victory");
        } else if (S.wave % POS_EVERY === 0) {
          S.phase = "pos"; S.phaseT = 0; S.checkpoint = S.wave + 1; savePos(S.checkpoint);
          p.hp = p.max; S.orbs.length = 0;
          const best = getBest(); if (S.wave > best.wave) saveBest(S.wave, best.time);
          sfx.clear(); showScreen("pos");
        } else {
          S.phase = "clear"; S.phaseT = 0; banner("Ronde " + S.wave + " selesai", "Napas dulu, ronde berikutnya segera datang", 3400); sfx.clear();
          const best = getBest(); if (S.wave > best.wave) saveBest(S.wave, best.time);
        }
      } else if (S.phase === "clear") {
        p.hp = Math.min(p.max, p.hp + 30 * dt);
        if (S.phaseT > 4.2) startWave(S.wave + 1);
      }

      /* alien, peluru, orb */
      for (const a of S.aliens) updAlien(a, gDt(dt));
      S.aliens = S.aliens.filter(a => !(a.dead && a.kind !== "boss"));
      for (const o of S.orbs) {
        const od = gDt(dt); o.x += o.vx * od; o.y += o.vy * od; o.life -= od;
        if (o.x < -40 || o.x > W + 40 || o.y > H + 20 || o.y < -80) o.life = 0;
        if (o.refl) {   // peluru dipantulkan Pusaran Rantai: kini melukai musuh
          for (const a of S.aliens) {
            if (a.dead || o.life <= 0) continue;
            const rx = (o.x - a.x) / (a.rx + o.r), ry = (o.y - a.y) / (a.ry + o.r);
            if (rx * rx + ry * ry <= 1) { damageAlien(a, a.kind === "boss" ? 5 : 99, 0, 0); o.life = 0; burst(o.x, o.y, 8, "#ff4040", 200, true); }
          }
          continue;
        }
        if (o.life > 0 && p.inv <= 0 && S.phase !== "dead" && Math.hypot(o.x - p.x, o.y - (p.y - 34)) < o.r + 15) { hurt(o.dmg); o.life = 0; burst(o.x, o.y, 6, o.col, 140, true); }
      }
      S.orbs = S.orbs.filter(o => o.life > 0);
      for (const b of S.bullets) {
        b.px = b.x; b.py = b.y; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
        if (b.y > FEET + 8 || b.x < -20 || b.x > W + 20 || b.y < -60) b.life = 0;
        for (const a of S.aliens) {
          if (a.dead || b.life <= 0) continue;
          const dx = (b.x - a.x) / (a.rx + 4), dy = (b.y - a.y) / (a.ry + 4);
          if (dx * dx + dy * dy <= 1) { damageAlien(a, 1, Math.sign(b.vx), 0); b.life = 0; }
        }
        for (const o of S.orbs) if (b.life > 0 && Math.hypot(o.x - b.x, o.y - b.y) < o.r + 6) { o.life = 0; b.life = 0; burst(o.x, o.y, 5, o.col, 130, true); sfx.ping(); }
      }
      S.bullets = S.bullets.filter(b => b.life > 0);
    }

    /* ----- HUD ----- */
    function updateHud() {
      const p = S.player, pct = Math.round(p.hp / p.max * 100);
      if (last.hp !== pct) { last.hp = pct; hud.hpBar.style.width = pct + "%"; hud.hpBar.parentNode.classList.toggle("is-low", pct < 30); }
      setText(hud.wave, "wave", "Ronde " + Math.max(1, S.wave) + "/" + TOTAL);
      let sub = "";
      if (S.phase === "start") sub = "Siap?";
      else if (S.phase === "intro") sub = "Alien besar mendekat…";
      else if (S.phase === "minions") sub = "Sisa pasukan: " + (minionsAlive() + S.queue.length);
      else if (S.phase === "descend" || S.phase === "boss") sub = "Serang alien besar!";
      else if (S.phase === "clear" || S.phase === "bossdead") sub = "Ronde selesai";
      else if (S.phase === "pos") sub = "Pos peristirahatan";
      setText(hud.sub, "sub", sub);
      if (S.boss) setText(hud.bossName, "bn", S.boss.name || "Alien Besar");
      const showBoss = S.boss && (S.phase === "descend" || S.phase === "boss") && !S.boss.dead;
      if (last.bossShow !== showBoss) { last.bossShow = showBoss; hud.boss.hidden = !showBoss; }
      if (showBoss) { const bp = Math.round(S.boss.hp / S.boss.max * 100); if (last.bp !== bp) { last.bp = bp; hud.bossBar.style.width = bp + "%"; } }
      setText(hud.time, "clock", env.clock); setText(hud.label, "label", env.label);
      // Shinji Power hanya boleh dipakai saat MODE BLEACH (Shinji) di website sedang aktif.
      // Easter Egg yang terbuka saja belum cukup untuk membuka kekuatan di dalam game.
      S.shinjiUnlocked = document.documentElement.dataset.bleach === "shinji";
      if (!S.shinjiUnlocked && S.shinji) {
        S.shinji = false; S.sekaiT = 0; S.sakanade = false; S.ceroFx = 0; S.ceroMaskT = 0;
      }
      S.aizenUnlocked = document.documentElement.dataset.bleach === "aizen";
      if (!S.aizenUnlocked && S.aizen) resetAizen();
      S.zarakiUnlocked = document.documentElement.dataset.bleach === "zaraki";
      if (!S.zarakiUnlocked && S.zaraki) resetZaraki();
      S.ichigoUnlocked = document.documentElement.dataset.bleach === "ichigo";
      if (!S.ichigoUnlocked && S.ichigo) resetIchigo();
      S.uryuUnlocked = document.documentElement.dataset.bleach === "uryu";
      if (!S.uryuUnlocked && S.uryu) resetUryu();
      S.gojoUnlocked = document.documentElement.dataset.jjk === "gojo" && !document.documentElement.dataset.bleach;
      if (!S.gojoUnlocked && S.gojo) resetGojo();
      S.ichibeUnlocked = document.documentElement.dataset.bleach === "ichibe";
      if (!S.ichibeUnlocked && S.ib.on) resetIchibe();
      shinjiTools.hidden = !S.shinjiUnlocked;
      aizenTools.hidden = !S.aizenUnlocked;
      zarakiTools.hidden = !S.zarakiUnlocked;
      ichigoTools.hidden = !S.ichigoUnlocked;
      uryuTools.hidden = !S.uryuUnlocked;
      gojoTools.hidden = !S.gojoUnlocked;
      ichibeTools.hidden = !S.ichibeUnlocked;
      layout.classList.toggle("has-shinji-tools", S.shinjiUnlocked || S.aizenUnlocked || S.zarakiUnlocked || S.ichigoUnlocked || S.uryuUnlocked || S.gojoUnlocked || S.ichibeUnlocked);
      if (S.aizenUnlocked) {
        aizenTools.classList.toggle("is-active", S.aizen);
        azBtn.kyoka.disabled = !S.aizen || S.kyokaT > 0 || S.kyokaCd > 0;
        azBtn.kuro.disabled = !S.aizen || S.kuroCd > 0 || !!S.kuro;
        azBtn.goryu.disabled = !S.aizen || S.goryuCd > 0 || !!S.goryu;
        setText(azTxt.t, "azt", S.aizen ? "Kembali biasa" : "Pecahkan dunia");
        setText(azTxt.k, "azk", S.kyokaT > 0 ? "Ilusi " + S.kyokaT.toFixed(1) + "s" : S.kyokaCd > 0 ? "Isi ulang " + S.kyokaCd.toFixed(1) + "s" : "Musuh salah sasaran");
        setText(azTxt.h, "azh", S.kuroCd > 0 ? S.kuroCd.toFixed(1) + "s" : "Kurohitsugi · siap");
        setText(azTxt.g, "azg", S.goryuCd > 0 ? S.goryuCd.toFixed(1) + "s" : "Goryūtenmetsu · siap");
      }
      if (S.zarakiUnlocked) {
        zarakiTools.classList.toggle("is-active", S.zaraki);
        const air = S.sjump && !p.onGround;
        zrBtn.lompat.disabled = !S.zaraki || (!air && (S.lompatCd > 0 || !p.onGround));
        zrBtn.tebas.disabled = !S.zaraki || S.tebasCd > 0;
        zrBtn.bankai.disabled = !S.zaraki || (!S.bankai && S.bankaiCd > 0);
        setText(zrTxt.t, "zrt", S.zaraki ? "Kembali biasa" : "Nozarashi");
        setText(zrTxt.l, "zrl", air ? "Hantam tanah! (3 / S)" : S.lompatCd > 0 ? S.lompatCd.toFixed(1) + "s" : "Lompat super · siap");
        setText(zrTxt.s, "zrs", S.tebasCd > 0 ? S.tebasCd.toFixed(1) + "s" : "Siap");
        setText(zrTxt.b, "zrb", S.bankai ? "Aktif " + Math.max(0, S.bankaiT).toFixed(1) + "s · tekan lagi: akhiri" : S.bankaiCd > 0 ? S.bankaiCd.toFixed(1) + "s" : "Sekali tebas · siap");
      }
      if (S.ichigoUnlocked) {
        const on = S.ichigo, fm = on ? S.iform : 0, SK = ISK[on && fm > 0 ? fm : 1], live = iOk();
        if (last.icf !== fm) { last.icf = fm; ichigoTools.dataset.form = fm; }
        ichigoTools.classList.toggle("is-active", on);
        setText(icTxt.form, "icform", on ? IFORM[fm] : "Shinigami Pengganti");
        setText(icTxt.t, "ict", on ? (fm < 3 ? "Berikutnya: " + IFORM[fm + 1].split(" · ")[0] : "Kembali biasa") : "Aktifkan Ichigo");
        icForm.forEach(b => b.classList.toggle("is-on", on && +b.dataset.iform === fm));
        for (let i = 0; i < 3; i++) {
          const sk = SK[i]; let st, dis;
          if (!on || fm === 0) { st = on ? "Buka lewat Bankai (5)" : "Aktifkan dulu (5)"; dis = true; }
          else if (sk.k === "amuk" && S.amukT > 0) { st = "Aktif " + S.amukT.toFixed(1) + "s · tekan lagi: akhiri"; dis = false; }
          else if (sk.k === "pusaran" && S.pusT > 0) { st = "Aktif " + S.pusT.toFixed(1) + "s · tekan lagi: akhiri"; dis = false; }
          else { const c = icd(sk.k); st = c > 0 ? c.toFixed(1) + "s" : sk.d + " · siap"; dis = c > 0 || !live; }
          setText(icN[i], "icn" + i, sk.n); setText(icI[i], "ici" + i, sk.ic); setText(icS[i], "ics" + i, st); icSk[i].disabled = dis;
        }
      }
      if (S.uryuUnlocked) {
        const on = S.uryu, fm = on ? S.uform : 0, SK = USK[fm], live = uOk();
        if (last.uyf !== fm) { last.uyf = fm; uryuTools.dataset.form = fm; }
        uryuTools.classList.toggle("is-active", on);
        setText(uyTxt.form, "uyform", on ? UFORM[fm] : "Quincy Pemanah");
        setText(uyTxt.t, "uyt", on ? (fm < 1 ? "Berikutnya: Letzt Stil" : "Kembali biasa") : "Aktifkan Uryu");
        uyForm.forEach(b => b.classList.toggle("is-on", on && +b.dataset.uform === fm));
        for (let i = 0; i < 3; i++) {
          const sk = SK[i], c = ucd(sk.k);
          const st = !on ? "Aktifkan dulu (5)" : c > 0 ? c.toFixed(1) + "s" : sk.d + " · siap";
          setText(uyN[i], "uyn" + i, sk.n); setText(uyI[i], "uyi" + i, sk.ic); setText(uyS[i], "uys" + i, st); uySk[i].disabled = !on || c > 0 || !live;
        }
      }
      if (S.ichibeUnlocked) {
        const ib = S.ib, on = ib.on, fm = on ? ib.form : 0, SK = IBSK[fm], live = ibOk();
        if (last.ibf !== fm) { last.ibf = fm; ichibeTools.dataset.form = fm; }
        ichibeTools.classList.toggle("is-active", on);
        setText(ibTxt.form, "ibform", on ? IBF[fm] : "Pelukis Tinta");
        setText(ibTxt.t, "ibt", !on ? "Aktifkan Ichibē" : fm === 0 ? "Berikutnya: Bankai" : "Tekan: matikan");
        ibForm.forEach(b => { const n = +b.dataset.bform; b.classList.toggle("is-on", on && n === fm); });
        for (let i = 0; i < 3; i++) {
          const sk = SK[i], c = ib.cd[sk.k] || 0;
          const st = !on ? "Aktifkan dulu (5)" : c > 0 ? c.toFixed(1) + "s" : sk.d + " · siap";
          setText(ibN[i], "ibn" + i, sk.n); setText(ibI[i], "ibi" + i, sk.ic); setText(ibS[i], "ibs" + i, st); ibSk[i].disabled = !on || c > 0 || !live;
        }
      }
      if (S.gojoUnlocked) {
        const on = S.gojo, fm = on ? S.gform : 0, SK = GSK[fm >= 1 ? 1 : 0], live = gOk(), dom = S.gdomain;
        if (last.gjf !== fm) { last.gjf = fm; gojoTools.dataset.form = fm; }
        gojoTools.classList.toggle("is-active", on);
        setText(gjTxt.form, "gjform", on ? GFORM[fm] : "Penyihir Terkuat");
        setText(gjTxt.t, "gjt", !on ? "Aktifkan Gojo" : dom ? "Domain " + Math.max(0, dom.dur - dom.t).toFixed(1) + "s" : fm === 0 ? "Berikutnya: Six Eyes" : S.gdomCd > 0 ? "Domain isi ulang " + S.gdomCd.toFixed(0) + "s · tekan: matikan" : "Berikutnya: Domain");
        gjForm.forEach(b => { const n = +b.dataset.gform; b.classList.toggle("is-on", on && n === fm); b.disabled = n === 2 && !dom && S.gdomCd > 0; });
        for (let i = 0; i < 3; i++) {
          const sk = SK[i], c = gcdv(sk.k);
          const st = !on ? "Aktifkan dulu (5)" : c > 0 ? c.toFixed(1) + "s" : sk.d + " · siap";
          setText(gjN[i], "gjn" + i, sk.n); setText(gjI[i], "gji" + i, sk.ic); setText(gjS[i], "gjs" + i, st); gjSk[i].disabled = !on || c > 0 || !live;
        }
      }
      shinjiTools.classList.toggle("is-active", S.shinji);
      const sekaiBtn = $('[data-skill="sekai"]', root), ceroBtn = $('[data-skill="cero"]', root);
      sekaiBtn.disabled = !S.shinji || S.sekaiT > 0;
      const sekaiLabel = $('[data-skill="sekai"] b', root); if (sekaiLabel) sekaiLabel.textContent = S.sekaiT > 0 ? "Terbalik " + S.sekaiT.toFixed(1) + "s" : "Dunia Terbalik";
      ceroBtn.disabled = !S.shinji || S.ceroCd > 0;
      const cdLabel = $('.al-cero-cd', ceroBtn); if (cdLabel) cdLabel.textContent = S.ceroCd > 0 ? S.ceroCd.toFixed(1) + 's' : 'Siap';
      const sakaBtn = $('[data-skill="sakanade"]', root);
      sakaBtn.disabled = !S.shinji;
      sakaBtn.classList.toggle("is-on", S.sakanade);
      const sakaLabel = $('[data-skill="sakanade"] b', root); if (sakaLabel) sakaLabel.textContent = S.sakanade ? "Sakanade aktif" : "Sakanade";
      if (last.wp !== p.weapon) { last.wp = p.weapon; hud.w0.classList.toggle("is-on", p.weapon === 0); hud.w1.classList.toggle("is-on", p.weapon === 1); }
    }

    /* ----- menggambar ----- */
    const rgba = (c, a) => c.replace("rgb(", "rgba(").replace(")", "," + a + ")");
    const circ = (x, y, r) => { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, 6.2832); };
    const ell = (x, y, rx, ry) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 6.2832); };
    const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };

    function drawSky() {
      const g = ctx.createLinearGradient(0, 0, 0, GROUND);
      g.addColorStop(0, env.top); g.addColorStop(1, env.bot);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (env.sunset > 0.04) {   // cahaya hangat di cakrawala saat matahari terbit / terbenam
        const hz = ctx.createLinearGradient(0, GROUND, 0, GROUND - 190);
        hz.addColorStop(0, "rgba(255,196,140," + (env.sunset * 0.4) + ")"); hz.addColorStop(1, "rgba(255,196,140,0)");
        ctx.fillStyle = hz; ctx.fillRect(0, GROUND - 190, W, 190);
      }
      if (env.n > 0.3) {   // galaksi Bima Sakti tipis
        ctx.save(); ctx.translate(W * 0.5, GROUND * 0.35); ctx.rotate(-0.45);
        const mg = ctx.createLinearGradient(0, -110, 0, 110); mg.addColorStop(0, "rgba(150,140,255,0)"); mg.addColorStop(0.5, "rgba(190,180,255," + (env.n * 0.11) + ")"); mg.addColorStop(1, "rgba(150,140,255,0)");
        ctx.fillStyle = mg; ctx.fillRect(-W, -110, W * 2, 220); ctx.restore();
      }
      if (env.n > 0.2) {
        const n1 = ctx.createRadialGradient(240, 130, 10, 240, 130, 260); n1.addColorStop(0, "rgba(120,90,255," + (env.n * 0.16) + ")"); n1.addColorStop(1, "rgba(120,90,255,0)");
        const n2 = ctx.createRadialGradient(740, 90, 10, 740, 90, 230); n2.addColorStop(0, "rgba(60,150,255," + (env.n * 0.14) + ")"); n2.addColorStop(1, "rgba(60,150,255,0)");
        ctx.fillStyle = n1; ctx.fillRect(0, 0, W, GROUND); ctx.fillStyle = n2; ctx.fillRect(0, 0, W, GROUND);
      }
      for (const s of stars) {
        const a = env.n * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(S.time * s.sp + s.ph)));
        if (a < 0.03) continue;
        ctx.globalAlpha = a; ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        if (s.r > 1.5) { ctx.strokeStyle = s.c; ctx.lineWidth = 0.8; const L = s.r * 3.4 * a; ctx.beginPath(); ctx.moveTo(s.x - L, s.y); ctx.lineTo(s.x + L, s.y); ctx.moveTo(s.x, s.y - L); ctx.lineTo(s.x, s.y + L); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      if (meteors.length) drawMeteors();
      const h = env.h;
      if (h >= 5.4 && h <= 18.9) {
        const k = (h - 5.4) / 13.5, sx = W * (0.06 + 0.88 * k), sy = GROUND - 24 - Math.sin(Math.PI * k) * (H * 0.62);
        const col = mixC("#fff3c4", "#ff9d5c", 1 - Math.sin(Math.PI * k));
        const gr = ctx.createRadialGradient(sx, sy, 10, sx, sy, 170); gr.addColorStop(0, rgba(col, 0.6)); gr.addColorStop(1, "rgba(255,220,160,0)");
        ctx.fillStyle = gr; ctx.fillRect(sx - 180, sy - 180, 360, 360);
        const rk = Math.max(env.sunset * 0.9, (1 - sstep(6, 10, h)) * sstep(5.4, 6.2, h) * 0.8);
        if (rk > 0.05) {   // sinar matahari menyebar (pagi & sore)
          ctx.save(); ctx.globalCompositeOperation = "lighter";
          for (let i = 0; i < 12; i++) {
            const a = i / 12 * 6.2832 + S.time * 0.02, ex = sx + Math.cos(a) * 900, ey = sy + Math.sin(a) * 900;
            const rg = ctx.createLinearGradient(sx, sy, ex, ey); rg.addColorStop(0, "rgba(255,236,190," + (rk * 0.13) + ")"); rg.addColorStop(1, "rgba(255,236,190,0)");
            ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(a - 0.045) * 900, sy + Math.sin(a - 0.045) * 900); ctx.lineTo(sx + Math.cos(a + 0.045) * 900, sy + Math.sin(a + 0.045) * 900); ctx.fill();
          }
          ctx.restore();
        }
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(sx, sy, 30, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.arc(sx - 6, sy - 6, 17, 0, 6.2832); ctx.fill();
      }
      const mh = h < 6.5 ? h + 24 : h;
      if (mh >= 18.2 && mh <= 29.6) {
        const k = (mh - 18.2) / 11.4, sx = W * (0.06 + 0.88 * k), sy = GROUND - 24 - Math.sin(Math.PI * k) * (H * 0.58);
        const al = clamp(Math.min(k, 1 - k) * 10, 0, 1);
        ctx.globalAlpha = al;
        const gr = ctx.createRadialGradient(sx, sy, 8, sx, sy, 120); gr.addColorStop(0, "rgba(200,215,255,.4)"); gr.addColorStop(1, "rgba(200,215,255,0)");
        ctx.fillStyle = gr; ctx.fillRect(sx - 125, sy - 125, 250, 250);
        ctx.strokeStyle = "rgba(200,215,255,.14)"; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(sx, sy, 42, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = "#eef3ff"; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#cdd8f2"; ctx.beginPath(); circ(sx - 8, sy - 6, 5); circ(sx + 9, sy + 7, 4); circ(sx + 4, sy - 12, 2.6); ctx.fill();
        ctx.globalAlpha = 1;
      }
      const cc = mixC(mixC("#ffffff", "#3b4a8a", env.n * 0.85), "#ffb89a", env.sunset * 0.45);
      const cloudPath = (c, dy) => { const s = c.s; ctx.beginPath(); circ(c.x, c.y + dy, 22 * s); circ(c.x + 26 * s, c.y - 12 * s + dy, 28 * s); circ(c.x + 58 * s, c.y - 2 * s + dy, 22 * s); circ(c.x + 30 * s, c.y + 6 * s + dy, 26 * s); ctx.fill(); };
      ctx.fillStyle = rgba(mixC(cc, "#5a6a9a", 0.4), lerp(0.45, 0.2, env.n));   // bayangan bawah awan
      for (const c of clouds) cloudPath(c, 8 * c.s);
      ctx.fillStyle = rgba(cc, lerp(0.9, 0.35, env.n));
      for (const c of clouds) cloudPath(c, 0);
      drawBirds();
    }
    function hills(base, amp, ph, dayC, nightC) {
      ctx.beginPath(); ctx.moveTo(0, H);
      for (let x = 0; x <= W + 16; x += 16) ctx.lineTo(x, base + Math.sin(x * 0.006 + ph) * amp + Math.sin(x * 0.015 + ph * 2) * amp * 0.35);
      ctx.lineTo(W + 16, H); ctx.closePath();
      ctx.fillStyle = mixC(mixC(dayC, nightC, env.n), "#e59a6e", env.sunset * 0.22); ctx.fill();
    }
    function drawGround() {
      hills(GROUND - 74, 26, 0.6, "#a9d4e8", "#1b2a5c");
      hills(GROUND - 30, 18, 2.1, "#86c98e", "#17383f");
      const g = ctx.createLinearGradient(0, GROUND, 0, H);
      g.addColorStop(0, mixC(mixC("#78d25f", "#244f57", env.n), "#d9a24a", env.sunset * 0.2));
      g.addColorStop(1, mixC("#3f9d48", "#122a33", env.n));
      ctx.fillStyle = g; ctx.fillRect(0, GROUND, W, H - GROUND);
      drawMist();
    }
    function drawRow(k) {
      const row = rows[k];
      ctx.fillStyle = mixC(mixC(row.day, row.night, env.n), "#d9a24a", env.sunset * 0.18);
      ctx.beginPath();
      for (const b of row.blades) {
        const sw = Math.sin(S.time * 1.4 + b.ph + b.x * 0.02) * 3;
        ctx.moveTo(b.x - 2.2, row.y); ctx.lineTo(b.x + sw, row.y - b.h); ctx.lineTo(b.x + 2.2, row.y);
      }
      ctx.fill();
    }
    function drawFlowers() {
      for (const f of flowers) { ctx.fillStyle = shade(f.c); ctx.beginPath(); ctx.arc(f.x, f.y, 2.4, 0, 6.2832); ctx.fill(); }
    }

    function drawPlayer() {
      const p = S.player, f = p.face, ang = S.aimAng;
      const moving = p.onGround && Math.abs(p.vx) > 20, bob = moving ? -Math.abs(Math.sin(p.walk)) * 2 : 0;
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,.22)"; ell(p.x, FEET + 2, 18 - (FEET - p.y) * 0.04, 5); ctx.fill();
      ctx.translate(p.x, p.y);
      if (p.inv > 0 && Math.floor(S.time * 14) % 2 === 0) ctx.globalAlpha = 0.45;
      const sw = Math.sin(p.walk) * (p.onGround ? 9 : 3);
      ctx.lineCap = "round"; ctx.lineWidth = 8; ctx.strokeStyle = S.ichigo ? "#15121a" : S.uryu ? "#f1f5fb" : S.ib.on ? "#1b1a22" : S.gojo ? "#161a30" : shade("#1d2550");
      ctx.beginPath(); ctx.moveTo(-5, -26 + bob); ctx.lineTo(-5 + sw, -3); ctx.moveTo(5, -26 + bob); ctx.lineTo(5 - sw, -3); ctx.stroke();
      const tail = -f * (18 + Math.abs(p.vx) * 0.04);
      ctx.strokeStyle = S.aizen ? "#efeaff" : (S.shinji || S.zaraki || S.ichigo || S.uryu || S.gojo || S.ib.on) ? "rgba(255,255,255,0)" : shade("#ff6b6b"); ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(-f * 4, -58 + bob); ctx.quadraticCurveTo(tail * 0.6, -60 + bob + Math.sin(S.time * 8) * 3, tail * 1.3, -52 + bob + Math.sin(S.time * 8 + 1) * 5); ctx.stroke();
      if (S.shinji) {
        drawShinjiBody(bob);
      } else if (S.zaraki) {
        drawZarakiBody(bob);
      } else if (S.ib.on) {
        drawIbBody(bob);
      } else if (S.gojo) {
        drawGojoBody(bob);
      } else if (S.uryu) {
        drawUryuBody(bob);
      } else if (S.ichigo) {
        drawIchigoBody(bob);
      } else if (S.aizen) {
        drawAizenBody(bob);
      } else {
        ctx.fillStyle = shade("#2c3b86"); rr(-12, -58 + bob, 24, 34, 8); ctx.fill();
        ctx.fillStyle = shade("#e5484d"); ctx.fillRect(-12, -38 + bob, 24, 6);
      }
      if (S.shinji) drawShinjiHairBack(f, bob);
      ctx.fillStyle = shade("#f3cfa8"); ctx.beginPath(); ctx.arc(0, -68 + bob, 10, 0, 6.2832); ctx.fill();
      ctx.fillStyle = S.aizen ? "#6b4a35" : S.ichigo ? ichiHair() : S.gojo ? "#f4f7ff" : S.ib.on ? "#dcdce6" : shade("#1c1b33"); if (!S.shinji) { ctx.beginPath(); ctx.arc(0, -69 + bob, 11, Math.PI, 0); ctx.fill(); }
      if (S.aizen) {
        ctx.beginPath(); ctx.moveTo(-f * 9, -76 + bob); ctx.quadraticCurveTo(-f * 21, -77 + bob, -f * 22, -63 + bob); ctx.quadraticCurveTo(-f * 14, -70 + bob, -f * 8, -67 + bob); ctx.fill();
        ctx.beginPath(); ctx.moveTo(f * 3, -80 + bob); ctx.quadraticCurveTo(f * 11, -75 + bob, f * 9.5, -63 + bob); ctx.quadraticCurveTo(f * 6, -70 + bob, f * 1.5, -72 + bob); ctx.fill();
      }
      if (S.shinji) drawShinjiHair(f, bob);
      if (!S.aizen && !S.shinji && !S.zaraki && !S.ichigo && !S.uryu && !S.gojo && !S.ib.on) {
        ctx.beginPath(); ctx.moveTo(-f * 8, -76 + bob); ctx.lineTo(-f * 19, -70 + bob); ctx.lineTo(-f * 8, -66 + bob); ctx.fill();
        ctx.fillStyle = shade("#e5484d"); ctx.fillRect(-11, -72 + bob, 22, 3.5);
      }
      if (S.zaraki) drawZarakiHair(f, bob);
      if (S.ichigo) drawIchigoHair(f, bob);
      if (S.uryu) drawUryuHair(f, bob);
      if (S.gojo) drawGojoHair(f, bob);
      if (S.ib.on) drawIbHair(f, bob);
      ctx.fillStyle = S.shinji ? "#6d3c26" : "#1c1b33"; ctx.beginPath(); ctx.arc(f * 4, -67 + bob, 1.4, 0, 6.2832); ctx.fill();
      if (S.aizen) drawAizenGlasses(f, bob);
      if (S.zaraki) drawZarakiFace(f, bob);
      if (S.ichigo) drawIchigoFace(f, bob);
      if (S.uryu) drawUryuFace(f, bob);
      if (S.gojo) drawGojoFace(f, bob);
      if (S.ib.on) drawIbFace(f, bob);
      if (S.shinji && !(S.ceroMaskT > 0)) drawShinjiFace(f, bob);
      if (S.shinji && S.ceroMaskT > 0) drawHollowMask(bob, f);
      const hx = f * 9, hy = -44 + bob;
      if (S.ib.on) {
        drawIbBrush(hx, hy, ang);
      } else if (S.gojo) {
        drawGojoHand(hx, hy, ang);
      } else if (S.uryu) {
        drawUryuBow(hx, hy, ang);
      } else if (S.sakanade || S.zaraki || S.ichigo || p.weapon === 0) {
        let a;
        if (p.slash > 0) { const k = 1 - p.slash / 0.22, s = f > 0 ? 1 : -1; a = p.slashAng + s * (-1.2 + 2.4 * k); }
        else a = f > 0 ? -0.5 : Math.PI + 0.5;
        ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
        if (S.ichigo) drawIchigoSword(); else if (S.zaraki) drawZarakiSword(); else if (S.shinji) drawSakanade(); else if (S.aizen) drawKyokaBlade(); else {
        ctx.fillStyle = S.shinji ? "#302b35" : "#2a2220"; ctx.fillRect(-9, -2.2, 13, 4.4);
        ctx.fillStyle = S.shinji ? "#d7b45a" : "#d9b44a"; ctx.fillRect(4, -5, 3, 10);
        const bg = ctx.createLinearGradient(0, -3, 0, 3); bg.addColorStop(0, S.shinji ? "#e8e2f5" : "#ffffff"); bg.addColorStop(1, S.shinji ? "#a78bca" : "#aab9d6");
        ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(7, -2); ctx.lineTo(S.shinji ? 76 : 60, -1.4); ctx.lineTo(S.shinji ? 82 : 66, 0); ctx.lineTo(S.shinji ? 76 : 60, 1.8); ctx.lineTo(7, 2.2); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      } else {
        ctx.save(); ctx.translate(hx - Math.cos(ang) * p.recoil * 4, hy - Math.sin(ang) * p.recoil * 4); ctx.rotate(ang);
        if (Math.cos(ang) < 0) ctx.scale(1, -1);
        ctx.fillStyle = "#394264"; ctx.fillRect(-12, -3, 36, 6);
        ctx.fillStyle = "#2a3050"; ctx.fillRect(24, -2, 22, 4);
        ctx.fillStyle = "#4b3a2a"; ctx.fillRect(-20, -3, 9, 8);
        ctx.fillStyle = "#6b7bb0"; ctx.fillRect(4, -6, 8, 3);
        ctx.restore();
      }
      ctx.restore();
    }


    /* ===== DESAIN SHINJI: Sakanade, topeng Visored, Cero kuning, Sakasama no Sekai ===== */
    function drawSakanade() {
      ctx.fillStyle = "#3a1a33"; rr(-13, -2.8, 17, 5.6, 2); ctx.fill();
      ctx.strokeStyle = "#ff4f93"; ctx.lineWidth = 1.1;
      for (let i = -12; i < 2; i += 4) { ctx.beginPath(); ctx.moveTo(i, -2.8); ctx.lineTo(i + 3, 2.8); ctx.moveTo(i + 3, -2.8); ctx.lineTo(i, 2.8); ctx.stroke(); }
      ctx.strokeStyle = "#f6cf45"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-17.5, 0, 4.6, 0, 6.2832); ctx.stroke();
      ctx.strokeStyle = "rgba(255,240,170,.55)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.arc(-17.5, 0, 3.4, 0, 6.2832); ctx.stroke();
      ctx.fillStyle = "#f6cf45"; rr(3.4, -6.2, 3.8, 12.4, 1.6); ctx.fill();
      ctx.fillStyle = "#b8901f"; ctx.fillRect(4.4, -4, 1.3, 8);
      const bg = ctx.createLinearGradient(0, -4, 0, 3); bg.addColorStop(0, "#fffaf0"); bg.addColorStop(0.55, "#e9e2f7"); bg.addColorStop(1, "#a78bca");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(7, -2.3); ctx.quadraticCurveTo(46, -5.2, 84, -3.4); ctx.lineTo(90, -0.3); ctx.quadraticCurveTo(46, 1.4, 7, 2.5); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(10, -0.2); ctx.quadraticCurveTo(46, -2, 82, -1.5); ctx.stroke();
      {
        const sk = S.sakanade ? 1 : 0.55, pu = (0.5 + 0.5 * Math.sin(S.time * 9)) * sk;
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,200,60," + (0.2 + 0.2 * pu) + ")"; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(8, 0); ctx.quadraticCurveTo(46, -3.5, 88, -1.8); ctx.stroke();
        ctx.strokeStyle = "rgba(255,79,147," + (0.25 + 0.2 * pu) + ")"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(-17.5, 0, 7 + pu * 2, 0, 6.2832); ctx.stroke();
        ctx.restore();
      }
    }
    /* ===== DESAIN SHINJI v2: haori kapten putih, rambut pirang bob, topeng Visored, aura Sakasama ===== */
    function drawShinjiBody(bob) {
      const t = S.time, p = S.player, f = p.face;
      const sway = Math.sin(t * 3.4) * 2 + clamp(-p.vx * 0.035, -7, 7);
      // ujung haori di belakang badan (melambai)
      ctx.fillStyle = "#e7e0f4";
      ctx.beginPath(); ctx.moveTo(-f * 8, -58 + bob); ctx.quadraticCurveTo(-f * (20 + sway), -38 + bob, -f * (27 + sway * 1.6), -17 + bob); ctx.lineTo(-f * 8, -20 + bob); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#ff4f93"; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-f * (27 + sway * 1.6), -17 + bob); ctx.lineTo(-f * 8, -20 + bob); ctx.stroke();
      // shihakusho hitam
      ctx.fillStyle = "#14121b"; rr(-13, -59 + bob, 26, 37, 5); ctx.fill();
      // kerah kosode putih
      ctx.fillStyle = "#efe9ff"; ctx.beginPath(); ctx.moveTo(-5.5, -59 + bob); ctx.lineTo(0, -43 + bob); ctx.lineTo(5.5, -59 + bob); ctx.lineTo(2.6, -59 + bob); ctx.lineTo(0, -51 + bob); ctx.lineTo(-2.6, -59 + bob); ctx.closePath(); ctx.fill();
      // obi putih + simpul merah muda
      ctx.fillStyle = "#f6f2ff"; ctx.fillRect(-13, -38 + bob, 26, 4);
      ctx.fillStyle = "#ff4f93"; ctx.beginPath(); ctx.moveTo(f * 3, -39 + bob); ctx.lineTo(f * 8, -41 + bob); ctx.lineTo(f * 10, -35 + bob); ctx.lineTo(f * 5, -33 + bob); ctx.closePath(); ctx.fill();
      // haori kapten putih: dua panel terbuka, tepi emas, ujung merah muda
      ctx.fillStyle = "#fbf8ff";
      ctx.beginPath(); ctx.moveTo(-16, -60 + bob); ctx.lineTo(-4, -60 + bob); ctx.lineTo(-7, -19 + bob); ctx.quadraticCurveTo(-14 + sway * 0.5, -14 + bob, -21 + sway, -18 + bob); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(16, -60 + bob); ctx.lineTo(4, -60 + bob); ctx.lineTo(7, -19 + bob); ctx.quadraticCurveTo(14 + sway * 0.5, -14 + bob, 21 + sway, -18 + bob); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#f6cf45"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(-4, -60 + bob); ctx.lineTo(-7, -19 + bob); ctx.moveTo(4, -60 + bob); ctx.lineTo(7, -19 + bob); ctx.stroke();
      ctx.strokeStyle = "#ff4f93"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-7, -19 + bob); ctx.quadraticCurveTo(-14 + sway * 0.5, -14 + bob, -21 + sway, -18 + bob); ctx.moveTo(7, -19 + bob); ctx.quadraticCurveTo(14 + sway * 0.5, -14 + bob, 21 + sway, -18 + bob); ctx.stroke();
      // lambang divisi di panel
      ctx.fillStyle = "#ff4f93"; ctx.beginPath(); ctx.moveTo(-10, -52 + bob); ctx.lineTo(-7.4, -49 + bob); ctx.lineTo(-10, -46 + bob); ctx.lineTo(-12.6, -49 + bob); ctx.closePath(); ctx.fill();
    }
    function drawShinjiHairBack(f, bob) {
      const s = Math.sin(S.time * 4.2) * 0.8;
      ctx.fillStyle = "#cf9d2a";
      ctx.beginPath(); ctx.moveTo(-11.8, -70 + bob); ctx.lineTo(-12.8 - s, -57 + bob); ctx.quadraticCurveTo(0, -53 + bob, 12.8 + s, -57 + bob); ctx.lineTo(11.8, -70 + bob); ctx.closePath(); ctx.fill();
    }
    function drawShinjiHair(f, bob) {
      const s = Math.sin(S.time * 4.2) * 0.8;
      ctx.fillStyle = "#f5d457";
      ctx.beginPath(); ctx.arc(0, -69 + bob, 11.6, Math.PI, 0); ctx.fill();
      // rambut samping sebahu
      ctx.beginPath(); ctx.moveTo(-11.6, -69 + bob); ctx.lineTo(-12.6 - s, -58 + bob); ctx.lineTo(-8.4, -62.5 + bob); ctx.lineTo(-8, -69 + bob); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(11.6, -69 + bob); ctx.lineTo(12.6 + s, -58 + bob); ctx.lineTo(8.4, -62.5 + bob); ctx.lineTo(8, -69 + bob); ctx.closePath(); ctx.fill();
      // poni lurus bergerigi
      ctx.beginPath(); ctx.moveTo(-11, -73 + bob); ctx.lineTo(11, -73 + bob); ctx.lineTo(11, -69.8 + bob);
      ctx.lineTo(8, -71.4 + bob); ctx.lineTo(5, -69.6 + bob); ctx.lineTo(1.8, -71.6 + bob); ctx.lineTo(-1.4, -69.7 + bob); ctx.lineTo(-4.6, -71.4 + bob); ctx.lineTo(-7.8, -69.6 + bob); ctx.lineTo(-11, -71 + bob); ctx.closePath(); ctx.fill();
      // kilau & bayangan rambut
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255,248,190,.9)"; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(0, -69 + bob, 8.6, Math.PI * 1.12, Math.PI * 1.55); ctx.stroke();
      ctx.strokeStyle = "rgba(190,140,30,.55)"; ctx.lineWidth = 0.9;
      ctx.beginPath(); ctx.moveTo(-9.5, -66 + bob); ctx.lineTo(-10.3, -59.5 + bob); ctx.moveTo(9.5, -66 + bob); ctx.lineTo(10.3, -59.5 + bob); ctx.stroke();
    }
    function drawShinjiFace(f, bob) {
      ctx.save(); ctx.lineCap = "round";
      ctx.strokeStyle = "#6d3c26"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(f * 1.6, -68.8 + bob); ctx.lineTo(f * 7.2, -69.8 + bob); ctx.stroke();   // alis menyeringai
      ctx.beginPath(); ctx.moveTo(f * 1, -63 + bob); ctx.quadraticCurveTo(f * 4.5, -59.8 + bob, f * 8, -63.4 + bob); ctx.stroke();   // senyum lebar
      ctx.fillStyle = "#ffffff"; ctx.fillRect(f * 4.5 - 2, -62.2 + bob, 4, 1.7);   // gigi depan
      ctx.restore();
    }
    function drawHollowMask(bob, f) {
      f = f || 1;
      const max = S.maskMax || 0.95, rem = S.ceroMaskT, el = max - rem, t = S.time;
      const inK = clamp(el / 0.26, 0, 1), outK = clamp(rem / 0.3, 0, 1), k = Math.min(inK, outK);
      const fl = 0.5 + 0.5 * Math.sin(t * 22);
      ctx.save(); ctx.translate(0, -68 + bob);
      // reiatsu merah-emas di balik topeng
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const gl = ctx.createRadialGradient(0, 0, 3, 0, 0, 38);
      gl.addColorStop(0, "rgba(255,226,110," + (0.6 * k) + ")"); gl.addColorStop(0.45, "rgba(255,50,80," + (0.28 * k) + ")"); gl.addColorStop(1, "rgba(255,50,80,0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(0, 0, 38, 0, 6.2832); ctx.fill();
      for (let i = 0; i < 7; i++) {
        const ph = t * 8 + i * 1.7, bx = (i - 3) * 4.6, h = 13 + 12 * Math.abs(Math.sin(ph));
        ctx.fillStyle = i % 2 ? "rgba(255,60,90," + (0.4 * k) + ")" : "rgba(255,214,80," + (0.45 * k) + ")";
        ctx.beginPath(); ctx.moveTo(bx - 2.6, -9); ctx.quadraticCurveTo(bx + Math.sin(ph) * 4, -9 - h * 0.6, bx, -9 - h); ctx.quadraticCurveTo(bx + 2.4, -9 - h * 0.45, bx + 2.6, -9); ctx.fill();
      }
      ctx.restore();
      // topeng "ditarik" melintasi wajah (wipe)
      const span = 44 * inK;
      ctx.save();
      ctx.beginPath(); if (f > 0) ctx.rect(-22, -26, span, 52); else ctx.rect(22 - span, -26, span, 52); ctx.clip();
      ctx.scale(1.15, 1.15);
      /* topeng Hollow Visored ala anime: helm bersegmen, batang hidung vertikal, pita alis, celah mata miring, gigi runcing, pelat dagu */
      const mg = ctx.createLinearGradient(-12, -17, 12, 18); mg.addColorStop(0, "#ffffff"); mg.addColorStop(0.5, "#dcdcdc"); mg.addColorStop(1, "#9a9a9e");
      const bar = ctx.createLinearGradient(-1.6, 0, 1.6, 0); bar.addColorStop(0, "#bdbdc2"); bar.addColorStop(0.5, "#ffffff"); bar.addColorStop(1, "#a9a9ae");
      const OL = "#3b3b42";
      // kubah helm + sisi wajah
      ctx.beginPath(); ctx.moveTo(-11.8, -3); ctx.bezierCurveTo(-12.8, -12, -7.2, -17.6, 0, -17.6); ctx.bezierCurveTo(7.2, -17.6, 12.8, -12, 11.8, -3);
      ctx.lineTo(11.2, 3); ctx.lineTo(8.4, 9.5); ctx.lineTo(7.2, 15.5); ctx.lineTo(0, 18.4); ctx.lineTo(-7.2, 15.5); ctx.lineTo(-8.4, 9.5); ctx.lineTo(-11.2, 3); ctx.closePath();
      ctx.fillStyle = mg; ctx.fill(); ctx.strokeStyle = OL; ctx.lineWidth = 0.8; ctx.stroke();
      // rusuk pelat kubah
      ctx.beginPath(); ctx.lineWidth = 0.6;
      for (const i of [-8.6, -5.8, -3.2, 3.2, 5.8, 8.6]) { ctx.moveTo(i * 0.5, -17.2); ctx.quadraticCurveTo(i * 1.1, -11.5, i * 1.35, -6); }
      ctx.stroke();
      // pita alis (membentuk "V" landai ke tengah)
      ctx.beginPath(); ctx.moveTo(-12.2, -6.4); ctx.lineTo(-1.4, -3.8); ctx.lineTo(1.4, -3.8); ctx.lineTo(12.2, -6.4); ctx.lineTo(11.8, -2.4); ctx.lineTo(1.4, -0.4); ctx.lineTo(-1.4, -0.4); ctx.lineTo(-11.8, -2.4); ctx.closePath();
      ctx.fillStyle = "#f2f2f4"; ctx.fill(); ctx.lineWidth = 0.7; ctx.stroke();
      // celah mata gelap + mata menyala
      ctx.fillStyle = "#0e0e13"; ctx.beginPath();
      ctx.moveTo(-10.9, -1.8); ctx.lineTo(-1.9, 0.3); ctx.lineTo(-3.8, 3); ctx.lineTo(-9.8, 1.4); ctx.closePath();
      ctx.moveTo(10.9, -1.8); ctx.lineTo(1.9, 0.3); ctx.lineTo(3.8, 3); ctx.lineTo(9.8, 1.4); ctx.closePath(); ctx.fill();
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      for (const ex of [-5.8, 5.8]) {
        const er = 4.4 + fl * 1.1, eg = ctx.createRadialGradient(ex, 1, 0.3, ex, 1, er);
        eg.addColorStop(0, "rgba(255,244,170,1)"); eg.addColorStop(0.5, "rgba(255,170,40,.75)"); eg.addColorStop(1, "rgba(255,70,30,0)");
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, 1, er, 0, 6.2832); ctx.fill();
      }
      ctx.restore();
      // pelat pipi bergerigi
      ctx.strokeStyle = OL; ctx.lineWidth = 0.7; ctx.fillStyle = "#e6e6ea";
      for (const sx of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(sx * 11, 3.6); ctx.lineTo(sx * 6.6, 5.9); ctx.lineTo(sx * 5.2, 4.4); ctx.lineTo(sx * 2.4, 6.2); ctx.lineTo(sx * 2.4, 7.6); ctx.lineTo(sx * 5.6, 6.2); ctx.lineTo(sx * 7, 7.7); ctx.lineTo(sx * 10.2, 5.6); ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      // mulut gelap + gigi runcing atas & bawah yang saling mengunci
      ctx.fillStyle = "#17090f"; ctx.beginPath(); ctx.moveTo(-8.2, 7.4); ctx.lineTo(8.2, 7.4); ctx.lineTo(7.2, 13.4); ctx.lineTo(-7.2, 13.4); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#fbfbfb"; ctx.strokeStyle = "#6b6b72"; ctx.lineWidth = 0.35;
      for (let x = -7; x <= 7; x += 1.75) { ctx.beginPath(); ctx.moveTo(x - 0.85, 7.4); ctx.lineTo(x + 0.85, 7.4); ctx.lineTo(x, 11.2); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      for (let x = -6.1; x <= 6.1; x += 1.75) { ctx.beginPath(); ctx.moveTo(x - 0.85, 13.4); ctx.lineTo(x + 0.85, 13.4); ctx.lineTo(x, 9.8); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      // pelat dagu
      ctx.fillStyle = "#d4d4d9"; ctx.strokeStyle = OL; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(-7.4, 13.6); ctx.lineTo(7.4, 13.6); ctx.lineTo(6.6, 15.8); ctx.lineTo(-6.6, 15.8); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6.4, 16); ctx.lineTo(6.4, 16); ctx.lineTo(0, 18.4); ctx.closePath(); ctx.fill(); ctx.stroke();
      // batang hidung vertikal (di atas semuanya, ujung runcing ke bawah)
      ctx.beginPath(); ctx.moveTo(-1.5, -18.8); ctx.lineTo(1.5, -18.8); ctx.lineTo(1.25, 13); ctx.lineTo(0, 18.6); ctx.lineTo(-1.25, 13); ctx.closePath();
      ctx.fillStyle = bar; ctx.fill(); ctx.strokeStyle = OL; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -17.5); ctx.lineTo(0, 12); ctx.strokeStyle = "rgba(60,60,70,.55)"; ctx.lineWidth = 0.4; ctx.stroke();
      ctx.restore();
      // garis sapuan saat topeng muncul
      if (inK < 1) {
        const x = f > 0 ? -22 + span : 22 - span;
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,230,140," + (0.9 * (1 - inK)) + ")"; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(x, -22); ctx.lineTo(x, 22); ctx.stroke(); ctx.restore();
      }
      ctx.restore();
    }
    function drawShinjiAura() {
      const p = S.player, t = S.time, cx = p.x, cy = p.y - 40;
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, 88);
      g.addColorStop(0, "rgba(255,206,70,.30)"); g.addColorStop(0.55, "rgba(255,79,147,.14)"); g.addColorStop(1, "rgba(255,79,147,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 88, 0, 6.2832); ctx.fill();
      // lidah reiatsu emas & merah muda
      for (let i = 0; i < 9; i++) {
        const ph = t * 4.2 + i * 0.9, bx = cx + (i - 4) * 7.5, h = 34 + 26 * Math.abs(Math.sin(ph * 0.8 + i)), sx = Math.sin(ph) * 6, by = p.y - 20;
        ctx.fillStyle = i % 3 === 0 ? "rgba(255,79,147,.34)" : "rgba(255,206,70,.34)";
        ctx.beginPath(); ctx.moveTo(bx - 4, by); ctx.quadraticCurveTo(bx - 6 + sx, by - h * 0.55, bx + sx, by - h); ctx.quadraticCurveTo(bx + 6 + sx * 0.5, by - h * 0.45, bx + 4, by); ctx.fill();
      }
      // riak terbalik di tanah
      for (let i = 0; i < 2; i++) {
        const q = (t * 0.7 + i * 0.5) % 1;
        ctx.strokeStyle = "rgba(255,206,70," + (0.45 * (1 - q)) + ")"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(cx, FEET + 2, 18 + q * 70, 4 + q * 11, 0, 0, 6.2832); ctx.stroke();
      }
      // huruf 逆 melayang & berbalik
      ctx.font = "700 14px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (let i = 0; i < 6; i++) {
        const a = t * 0.9 + i * 1.0472, x = cx + Math.cos(a) * 52, y = cy + Math.sin(a * 1.3) * 30 - 6;
        ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.cos(t * 2.2 + i));
        ctx.fillStyle = i % 2 ? "rgba(255,225,120,.8)" : "rgba(255,120,170,.8)"; ctx.fillText("逆", 0, 0); ctx.restore();
      }
      ctx.restore();
    }
    function drawSekaiSwirl() {
      const t = S.time, cx = W / 2, cy = 230;
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.translate(cx, cy); ctx.rotate(-t * 0.9);
      for (let arm = 0; arm < 4; arm++) {
        ctx.rotate(Math.PI / 2);
        ctx.strokeStyle = arm % 2 ? "rgba(255,79,147,.24)" : "rgba(255,206,70,.22)"; ctx.lineWidth = 2;
        ctx.beginPath();
        for (let a = 0; a < 3.2; a += 0.12) { const r = 30 + a * 52, x = Math.cos(a) * r, y = Math.sin(a) * r; if (a) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.stroke();
      }
      ctx.restore();
    }

    /* ===== EFEK MASUK MODE: reiatsu + kupu-kupu (Aizen) / reiatsu + huruf 逆 (Shinji) ===== */
    function drawSurge(front) {
      const u = S.surge; if (!u) return;
      const p = S.player, t = u.t, ox = p.x, oy = p.y - 40, sh = u.kind === "shinji", zk = u.kind === "zaraki" || u.kind === "zbankai", ik = u.kind.charAt(0) === "i", IP = ik ? IPAL[IKEY.indexOf(u.kind)] : null, uk = u.kind.charAt(0) === "u", UP = uk ? UPAL[u.kind === "uletzt" ? 1 : 0] : null;
      const c1 = uk ? UP.a : ik ? IP.a : zk ? "255,70,40" : sh ? "255,206,70" : "157,123,255", c2 = uk ? UP.c : ik ? IP.c : zk ? "255,170,60" : sh ? "255,79,147" : "126,231,255", c3 = uk ? UP.b : ik ? IP.b : zk ? "255,225,190" : sh ? "255,246,205" : "233,230,255";
      const fade = 1 - clamp((t - u.dur * 0.5) / (u.dur * 0.5), 0, 1), rise = clamp(t / 0.45, 0, 1);
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      if (!front) {
        // tekanan reiatsu: tepi layar berpendar
        const vg = ctx.createRadialGradient(ox, oy, H * 0.25, ox, oy, W * 0.7);
        vg.addColorStop(0, "rgba(" + c1 + ",0)"); vg.addColorStop(1, "rgba(" + c1 + "," + (0.34 * fade * (0.7 + 0.3 * Math.sin(t * 14))) + ")");
        ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
        // sinar memancar
        ctx.save(); ctx.translate(ox, oy); ctx.rotate(t * 0.5);
        ctx.strokeStyle = "rgba(" + c3 + "," + (0.22 * fade * rise) + ")"; ctx.lineWidth = 2;
        for (let i = 0; i < 22; i++) { ctx.rotate(Math.PI / 11); const a = 60 + (i % 3) * 20; ctx.beginPath(); ctx.moveTo(0, a); ctx.lineTo(0, a + 300 + 120 * Math.sin(t * 6 + i)); ctx.stroke(); }
        ctx.restore();
        // pilar cahaya
        const w = (sh ? 64 : 84) * (0.5 + 0.5 * rise) * (1 + 0.06 * Math.sin(t * 34));
        const pg = ctx.createLinearGradient(ox - w, 0, ox + w, 0);
        pg.addColorStop(0, "rgba(" + c1 + ",0)"); pg.addColorStop(0.5, "rgba(" + c3 + "," + (0.6 * fade * rise) + ")"); pg.addColorStop(1, "rgba(" + c1 + ",0)");
        ctx.fillStyle = pg; ctx.fillRect(ox - w, 0, w * 2, FEET + 20);
        // inti cahaya
        const cr = 46 + 60 * rise + 10 * Math.sin(t * 20), cg = ctx.createRadialGradient(ox, oy, 2, ox, oy, cr);
        cg.addColorStop(0, "rgba(255,255,255," + (0.85 * fade) + ")"); cg.addColorStop(0.35, "rgba(" + c1 + "," + (0.5 * fade) + ")"); cg.addColorStop(1, "rgba(" + c2 + ",0)");
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(ox, oy, cr, 0, 6.2832); ctx.fill();
        // gelombang kejut reiatsu
        for (let i = 0; i < 4; i++) {
          const q = clamp((t - 0.3 - i * 0.24) / 1.15, 0, 1); if (q <= 0 || q >= 1) continue;
          const r = 26 + q * (sh ? 380 : 460);
          ctx.strokeStyle = "rgba(" + (i % 2 ? c2 : c1) + "," + ((1 - q) * 0.75) + ")"; ctx.lineWidth = 7 * (1 - q) + 1.5;
          ctx.beginPath(); ctx.ellipse(ox, oy, r, r * 0.8, 0, 0, 6.2832); ctx.stroke();
        }
        // riak di tanah
        for (let i = 0; i < 3; i++) {
          const q = (t * 0.9 + i / 3) % 1;
          ctx.strokeStyle = "rgba(" + c1 + "," + (0.5 * (1 - q) * fade) + ")"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.ellipse(ox, FEET + 2, 20 + q * 120, 5 + q * 16, 0, 0, 6.2832); ctx.stroke();
        }
      } else {
        if (t < 0.2) { ctx.fillStyle = "rgba(" + c3 + "," + (0.55 * (1 - t / 0.2)) + ")"; ctx.fillRect(0, 0, W, H); }
        for (const b of u.fl) {
          const s = t - b.dl; if (s <= 0) continue;
          const al = clamp(s / 0.25, 0, 1) * (1 - clamp((t - u.dur * 0.62) / (u.dur * 0.38), 0, 1)); if (al <= 0) continue;
          const ang = b.a + s * b.sp * 1.5, rad = b.r + s * (sh ? 70 : 105);
          const x = ox + Math.cos(ang) * rad, y = oy - s * b.rise * 0.6 + Math.sin(ang * 1.3 + b.ph) * 22;
          if (zk || ik || uk) {
            // bara + aksara 剣 / 卍 naik dari tubuh Zaraki
            ctx.save(); ctx.translate(x, y); ctx.globalAlpha = al;
            if (b.g) { ctx.font = "700 " + Math.round(16 * b.sz) + "px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "rgb(" + b.c + ")"; ctx.fillText(uk ? (u.kind === "uletzt" ? "翼" : "弓") : ik ? IGLYPH[u.kind] : u.kind === "zbankai" ? "卍" : "剣", 0, 0); }
            else { const r = 2.2 * b.sz * (0.7 + 0.6 * Math.abs(Math.sin(s * 12 + b.ph))), gg = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 3); gg.addColorStop(0, "rgba(255,255,230,1)"); gg.addColorStop(0.4, "rgba(" + b.c + ",.8)"); gg.addColorStop(1, "rgba(" + b.c + ",0)"); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, r * 3, 0, 6.2832); ctx.fill(); }
            ctx.restore();
          } else if (!sh) {
            // kupu-kupu Aizen: sayap mengepak, menyebar naik dari tubuhnya
            const fl = 0.25 + 0.75 * Math.abs(Math.sin(s * 17 + b.ph)), z = b.sz * 1.5;
            ctx.save(); ctx.translate(x, y); ctx.rotate(Math.cos(ang) * 0.35); ctx.globalAlpha = al; ctx.fillStyle = b.c;
            ctx.beginPath(); ctx.ellipse(-4 * z, -1 * z, 4.2 * z * fl, 6 * z, -0.5, 0, 6.2832); ctx.fill();
            ctx.beginPath(); ctx.ellipse(4 * z, -1 * z, 4.2 * z * fl, 6 * z, 0.5, 0, 6.2832); ctx.fill();
            ctx.beginPath(); ctx.ellipse(-2.6 * z, 4 * z, 2.6 * z * fl, 3.6 * z, 0.4, 0, 6.2832); ctx.fill();
            ctx.beginPath(); ctx.ellipse(2.6 * z, 4 * z, 2.6 * z * fl, 3.6 * z, -0.4, 0, 6.2832); ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,.95)"; ctx.fillRect(-0.7 * z, -4 * z, 1.4 * z, 9 * z);
            ctx.restore();
          } else {
            // huruf 逆 (terbalik) berputar naik
            ctx.save(); ctx.translate(x, y); ctx.globalAlpha = al * 0.9; ctx.scale(1, Math.cos(s * 3 + b.ph));
            ctx.font = "700 " + Math.round(15 * b.sz) + "px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillStyle = "rgb(" + b.c + ")"; ctx.fillText("逆", 0, 0);
            ctx.restore();
          }
        }
      }
      ctx.restore();
    }
    function drawCero() {
      const p = S.player, a = S.aimAng, len = 780, k = S.ceroFx / 0.62, ox = p.x, oy = p.y - 42;
      const ex = ox + Math.cos(a) * len, ey = oy + Math.sin(a) * len, fl = 1 + 0.06 * Math.sin(S.time * 60);
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      const layers = [[58, "rgba(255,150,20,.20)"], [38, "rgba(255,200,40,.36)"], [20, "rgba(255,235,120,.75)"], [8, "rgba(255,255,236,1)"]];
      for (const L of layers) { ctx.strokeStyle = L[1]; ctx.lineWidth = L[0] * (0.5 + 0.5 * k) * fl; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke(); }
      const r = 40 + 70 * k, gl = ctx.createRadialGradient(ox, oy, 2, ox, oy, r);
      gl.addColorStop(0, "rgba(255,255,232,.95)"); gl.addColorStop(0.35, "rgba(255,210,60,.6)"); gl.addColorStop(1, "rgba(255,160,20,0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(ox, oy, r, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "rgba(255,225,90," + (0.8 * k) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ox, oy, 20 + (1 - k) * 120, 0, 6.2832); ctx.stroke();
      ctx.restore();
    }
    function drawSekai() {
      const t = S.time, cx = W / 2, cy = 230, pu = 0.5 + 0.5 * Math.sin(t * 4);
      ctx.save();
      const vg = ctx.createRadialGradient(cx, cy, 90, cx, cy, Math.max(W, H) * 0.75);
      vg.addColorStop(0, "rgba(246,207,69,0)"); vg.addColorStop(1, "rgba(120,30,90,.34)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      ctx.translate(cx, cy); ctx.globalCompositeOperation = "lighter";
      ctx.font = "700 170px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "rgba(255,225,120," + (0.1 + 0.05 * pu) + ")"; ctx.fillText("逆", 0, 6);
      ctx.strokeStyle = "rgba(246,207,69," + (0.3 + 0.14 * pu) + ")"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 120 + pu * 10, 0, 6.2832); ctx.stroke();
      ctx.strokeStyle = "rgba(255,79,147,.32)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 150, 0, 6.2832); ctx.stroke();
      ctx.rotate(t * 0.6); ctx.strokeStyle = "rgba(246,207,69,.5)"; ctx.lineWidth = 2;
      for (let i = 0; i < 24; i++) { ctx.rotate(Math.PI / 12); ctx.beginPath(); ctx.moveTo(0, -152); ctx.lineTo(0, i % 3 === 0 ? -170 : -161); ctx.stroke(); }
      ctx.restore();
    }

    /* ===== DESAIN AIZEN: haori putih, kacamata, Kyōka Suigetsu, Hadō ===== */
    function drawAizenBody(bob) {
      ctx.fillStyle = "#14121f"; rr(-13, -59 + bob, 26, 37, 5); ctx.fill();
      ctx.fillStyle = "#f3f0ff";
      ctx.beginPath(); ctx.moveTo(-15, -60 + bob); ctx.lineTo(-4, -60 + bob); ctx.lineTo(-7, -19 + bob); ctx.lineTo(-17, -19 + bob); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(15, -60 + bob); ctx.lineTo(4, -60 + bob); ctx.lineTo(7, -19 + bob); ctx.lineTo(17, -19 + bob); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#6a4dff"; ctx.fillRect(-17, -21 + bob, 10, 2.4); ctx.fillRect(7, -21 + bob, 10, 2.4);
      ctx.fillStyle = "#cfc6ff"; ctx.fillRect(-13, -38 + bob, 26, 3.4);
      ctx.fillStyle = "#2a2540"; ctx.beginPath(); ctx.moveTo(-5, -59 + bob); ctx.lineTo(0, -45 + bob); ctx.lineTo(5, -59 + bob); ctx.fill();
    }
    function drawAizenGlasses(f, bob) {
      ctx.save(); ctx.strokeStyle = "#dfe3ff"; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(f * 4.4, -67 + bob, 3.5, 0, 6.2832); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(f * 1, -67 + bob); ctx.lineTo(-f * 8, -68.5 + bob); ctx.stroke();
      const gl = (S.time * 0.6) % 3;
      if (gl < 0.45) { ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,255,255," + (0.9 - gl * 2) + ")"; ctx.lineWidth = 1.6; const q = gl * 12 - 3; ctx.beginPath(); ctx.moveTo(f * 4.4 + q - 3, -70.5 + bob); ctx.lineTo(f * 4.4 + q + 2, -64 + bob); ctx.stroke(); }
      ctx.restore();
    }
    function drawKyokaBlade() {
      ctx.fillStyle = "#17122b"; rr(-13, -2.7, 17, 5.4, 2); ctx.fill();
      ctx.strokeStyle = "#8a6dff"; ctx.lineWidth = 1;
      for (let i = -12; i < 2; i += 4) { ctx.beginPath(); ctx.moveTo(i, -2.7); ctx.lineTo(i + 3, 2.7); ctx.moveTo(i + 3, -2.7); ctx.lineTo(i, 2.7); ctx.stroke(); }
      ctx.fillStyle = "#d9d0ff"; rr(3.4, -5.8, 3.2, 11.6, 1.4); ctx.fill();
      const bg = ctx.createLinearGradient(0, -4, 0, 3); bg.addColorStop(0, "#ffffff"); bg.addColorStop(0.55, "#e4dcff"); bg.addColorStop(1, "#9d86e8");
      ctx.fillStyle = bg; ctx.beginPath(); ctx.moveTo(7, -2.2); ctx.quadraticCurveTo(46, -4.8, 83, -3.2); ctx.lineTo(89, -0.3); ctx.quadraticCurveTo(46, 1.3, 7, 2.4); ctx.closePath(); ctx.fill();
      if (S.kyokaT > 0) {
        const pu = 0.5 + 0.5 * Math.sin(S.time * 8);
        ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(157,123,255," + (0.22 + 0.2 * pu) + ")"; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(8, 0); ctx.quadraticCurveTo(46, -3.5, 88, -1.8); ctx.stroke();
        ctx.restore();
      }
    }
    function drawAizenAura() {
      const p = S.player, t = S.time;
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(p.x, p.y - 40, 4, p.x, p.y - 40, 78); g.addColorStop(0, "rgba(157,123,255,.3)"); g.addColorStop(1, "rgba(157,123,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y - 40, 78, 0, 6.2832); ctx.fill();
      for (let i = 0; i < 5; i++) {
        const a = t * 1.3 + i * 1.2566, x = p.x + Math.cos(a) * (46 + 10 * Math.sin(t * 2 + i)), y = p.y - 50 + Math.sin(a * 1.4) * 26, fl = 0.3 + 0.7 * Math.abs(Math.sin(t * 14 + i));
        ctx.fillStyle = i % 2 ? "rgba(126,231,255,.85)" : "rgba(196,181,253,.9)";
        ctx.beginPath(); ctx.ellipse(x - 3, y, 3.4 * fl, 4.6, -0.4, 0, 6.2832); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x + 3, y, 3.4 * fl, 4.6, 0.4, 0, 6.2832); ctx.fill();
      }
      ctx.restore();
    }
    function drawDecoy() {
      const x = S.kyokaDecoyX, t = S.time, a = clamp(Math.min(S.kyokaT, 7 - S.kyokaT) / 0.6, 0, 1);
      ctx.save(); ctx.translate(x, FEET);
      ctx.globalCompositeOperation = "lighter"; ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const r = (t * 60 + i * 38) % 114;
        ctx.strokeStyle = "rgba(126,231,255," + (0.5 * (1 - r / 114) * a) + ")"; ctx.beginPath(); ctx.ellipse(0, 2, r * 0.9, r * 0.22, 0, 0, 6.2832); ctx.stroke();
      }
      ctx.globalAlpha = (0.5 + 0.18 * Math.sin(t * 7)) * a;
      ctx.fillStyle = "rgba(196,181,253,.9)"; rr(-12, -58, 24, 34, 8); ctx.fill();
      ctx.fillRect(-12, -38, 24, 3.5);
      ctx.beginPath(); ctx.arc(0, -68, 10, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "rgba(196,181,253,.9)"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(-5, -26); ctx.lineTo(-5, -3); ctx.moveTo(5, -26); ctx.lineTo(5, -3); ctx.stroke();
      ctx.fillStyle = "rgba(126,231,255,.8)"; ctx.fillRect(-9, -69, 18, 2);
      ctx.restore();
    }
    function drawKyokaVeil() {
      const a = clamp(Math.min(S.kyokaT, 7 - S.kyokaT) / 0.7, 0, 1);
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, W * 0.66);
      vg.addColorStop(0, "rgba(106,77,255,0)"); vg.addColorStop(1, "rgba(106,77,255," + (0.3 * a) + ")");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 4; i++) {
        const r = ((S.time * 46 + i * 90) % 360);
        ctx.strokeStyle = "rgba(196,181,253," + (0.16 * (1 - r / 360) * a) + ")"; ctx.beginPath(); ctx.arc(W * 0.32, H * 0.38, r, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = "rgba(126,231,255," + (0.13 * (1 - r / 360) * a) + ")"; ctx.beginPath(); ctx.arc(W * 0.7, H * 0.62, r * 0.9, 0, 6.2832); ctx.stroke();
      }
      ctx.restore();
    }
    function drawCast() {
      const p = S.player, ang = S.aimAng, kuro = S.castKind === "kuro", max = kuro ? 1.4 : 1.0, k = 1 - S.castT / max;
      const hx = p.x + Math.cos(ang) * 40, hy = p.y - 46 + Math.sin(ang) * 40, t = S.time;
      const al = Math.min(1, k * 3.5) * Math.min(1, S.castT * 4 + 0.15), r = 8 + 26 * Math.min(1, k * 2.2);
      const col = kuro ? "157,123,255" : "126,231,255";
      ctx.save(); ctx.translate(hx, hy); ctx.globalCompositeOperation = "lighter";
      const gl = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 1.9); gl.addColorStop(0, "rgba(255,255,255," + (0.7 * al) + ")"); gl.addColorStop(0.4, "rgba(" + col + "," + (0.4 * al) + ")"); gl.addColorStop(1, "rgba(" + col + ",0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(0, 0, r * 1.9, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = "rgba(" + col + "," + (0.95 * al) + ")"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, r, 0, 6.2832); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.62, 0, 6.2832); ctx.stroke();
      ctx.rotate(t * 3.2);
      ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * 2.0944 + 0; const x = Math.cos(a) * r * 0.96, y = Math.sin(a) * r * 0.96; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.stroke();
      ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = i * 2.0944 + 1.0472; const x = Math.cos(a) * r * 0.96, y = Math.sin(a) * r * 0.96; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.stroke();
      ctx.restore();
    }
    function drawKuro() {
      const k = S.kuro, t = k.t, cx = k.x, cy = k.y, w = k.w, h = k.h;
      ctx.save();
      const dark = (t < 1.5 ? clamp(t / 1.1, 0, 1) : clamp(1 - (t - 1.5) / 0.9, 0, 1)) * 0.55;
      ctx.fillStyle = "rgba(8,2,18," + dark + ")"; ctx.fillRect(-20, -20, W + 40, H + 40);
      const sa = clamp(t / 0.5, 0, 1) * (t < 1.5 ? 1 : clamp(1 - (t - 1.5) / 0.6, 0, 1));
      ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(157,123,255," + (0.85 * sa) + ")"; ctx.lineWidth = 2;
      const pu = 0.5 + 0.5 * Math.sin(S.time * 9), q = 14 + pu * 4;
      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(c => { const x = cx + c[0] * w / 2, y = cy + c[1] * h / 2; ctx.beginPath(); ctx.moveTo(x - c[0] * q, y); ctx.lineTo(x, y); ctx.lineTo(x, y - c[1] * q); ctx.stroke(); });
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(S.time * 1.2);
      ctx.beginPath(); ctx.arc(0, 0, 74, 0, 6.2832); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 52, 0, 6.2832); ctx.stroke();
      for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(0, -74); ctx.lineTo(0, -84); ctx.stroke(); }
      ctx.restore();
      const c = clamp((t - 0.7) / 0.8, 0, 1), e = c * c * (3 - 2 * c), off = (1 - e) * 180;
      const fade = (t < 1.5 ? 1 : clamp(1 - (t - 1.55) / 0.8, 0, 1)) * clamp((t - 0.5) / 0.2, 0, 1);
      ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = fade;
      const slab = (x, y, ww, hh, vert) => {
        const g = vert ? ctx.createLinearGradient(x, y, x + ww, y) : ctx.createLinearGradient(x, y, x, y + hh);
        g.addColorStop(0, "#05020c"); g.addColorStop(0.5, "#1d1040"); g.addColorStop(1, "#05020c");
        ctx.fillStyle = g; ctx.fillRect(x, y, ww, hh); ctx.strokeStyle = "rgba(157,123,255,.95)"; ctx.lineWidth = 2; ctx.strokeRect(x, y, ww, hh);
      };
      slab(cx - w / 2 - 22, cy - h / 2 - 28 - off, w + 44, 28, false);
      slab(cx - w / 2 - 22, cy + h / 2 + off, w + 44, 28, false);
      slab(cx - w / 2 - 28 - off, cy - h / 2, 28, h, true);
      slab(cx + w / 2 + off, cy - h / 2, 28, h, true);
      ctx.fillStyle = "rgba(4,0,10," + (0.88 * e) + ")"; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
      ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(157,123,255," + (0.55 * e) + ")"; ctx.lineWidth = 1.2;
      for (let i = 1; i < 6; i++) { const yy = cy - h / 2 + h * i / 6 + Math.sin(S.time * 6 + i) * 3; ctx.beginPath(); ctx.moveTo(cx - w / 2, yy); ctx.lineTo(cx + w / 2, yy); ctx.stroke(); }
      ctx.globalAlpha = 1;
      if (t >= 1.5) {
        const u = clamp((t - 1.5) / 0.4, 0, 1);
        ctx.fillStyle = "rgba(226,214,255," + ((1 - u) * 0.6) + ")"; ctx.fillRect(-20, -20, W + 40, H + 40);
        ctx.strokeStyle = "rgba(196,181,253," + (1 - u) + ")"; ctx.lineWidth = 6 * (1 - u) + 1;
        ctx.beginPath(); ctx.arc(cx, cy, 40 + u * 480, 0, 6.2832); ctx.stroke();
        const pg = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0); pg.addColorStop(0, "rgba(157,123,255,0)"); pg.addColorStop(0.5, "rgba(255,255,255," + (1 - u) + ")"); pg.addColorStop(1, "rgba(157,123,255,0)");
        ctx.fillStyle = pg; ctx.fillRect(cx - 60 * (1 - u * 0.6), 0, 120 * (1 - u * 0.6), H);
      }
      ctx.restore();
    }
    function drawGoryu() {
      const g = S.goryu, t = g.t, cols = ["#ff4d6d", "#ffb84d", "#7dff9a", "#4dd2ff", "#b06bff"], rgbaH = (c, a) => "rgba(" + parseC(c).join(",") + "," + a + ")";
      const grow = clamp(t / 0.55, 0, 1), fade = t < 1.1 ? 1 : clamp(1 - (t - 1.1) / 0.8, 0, 1), len = 1000 * grow * grow;
      const ca = Math.cos(g.ang), sa = Math.sin(g.ang), nx = -sa, ny = ca;
      if (len < 4) return;
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (let d = 0; d < 5; d++) {
        const lane = d - 2, spread = lane * 22 * (0.4 + grow * 0.6), N = 44; let ex = 0, ey = 0;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const u = i / N, dist = u * len, off = spread * (0.2 + u) + Math.sin(u * 9 - S.time * 14 + d * 1.3) * (14 + 18 * u) * (lane === 0 ? 0.6 : 1);
          const x = g.ox + ca * dist + nx * off, y = g.oy + sa * dist + ny * off; ex = x; ey = y;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = rgbaH(cols[d], 0.26 * fade); ctx.lineWidth = 28; ctx.stroke();
        ctx.strokeStyle = rgbaH(cols[d], 0.78 * fade); ctx.lineWidth = 11; ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255," + (0.9 * fade) + ")"; ctx.lineWidth = 3.4; ctx.stroke();
        const hg = ctx.createRadialGradient(ex, ey, 2, ex, ey, 34); hg.addColorStop(0, "rgba(255,255,255," + fade + ")"); hg.addColorStop(0.4, rgbaH(cols[d], 0.7 * fade)); hg.addColorStop(1, rgbaH(cols[d], 0));
        ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(ex, ey, 34, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = rgbaH(cols[d], fade); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + ca * 20 + nx * 14, ey + sa * 20 + ny * 14); ctx.moveTo(ex, ey); ctx.lineTo(ex + ca * 20 - nx * 14, ey + sa * 20 - ny * 14); ctx.stroke();
      }
      const gl = ctx.createRadialGradient(g.ox, g.oy, 2, g.ox, g.oy, 58); gl.addColorStop(0, "rgba(255,255,255," + (0.65 * fade) + ")"); gl.addColorStop(1, "rgba(180,140,255,0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(g.ox, g.oy, 58, 0, 6.2832); ctx.fill();
      const f = clamp(1 - Math.abs(t - 0.62) / 0.16, 0, 1);
      if (f > 0) { ctx.fillStyle = "rgba(255,255,255," + (f * 0.4) + ")"; ctx.fillRect(-20, -20, W + 40, H + 40); }
      ctx.restore();
    }

    function drawAlien(a) {
      if (a.dead) return;
      ctx.save(); ctx.translate(a.x, a.y);
      if (a.ant) { drawInkAnt(a); ctx.restore(); return; }
      if (a.kind === "drone") {
        const gl = ctx.createRadialGradient(0, 8, 2, 0, 8, 34); gl.addColorStop(0, "rgba(120,255,200,.35)"); gl.addColorStop(1, "rgba(120,255,200,0)");
        ctx.fillStyle = gl; ctx.fillRect(-36, -30, 72, 80);
        ctx.fillStyle = shade("#3fcf9f"); ell(0, 2, 20, 7); ctx.fill();
        ctx.fillStyle = "rgba(190,250,255,.7)"; ctx.beginPath(); ctx.arc(0, 0, 10, Math.PI, 0); ctx.fill();
        ctx.fillStyle = "#8aff9b"; ell(0, -3, 4, 5); ctx.fill();
        for (let i = -1; i <= 1; i++) { ctx.fillStyle = Math.sin(S.time * 6 + i * 2) > 0 ? "#fff3a8" : "#ff9fcb"; ctx.beginPath(); ctx.arc(i * 10, 4, 2.2, 0, 6.2832); ctx.fill(); }
        if (a.flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (a.flash * 0.8) + ")"; ell(0, 1, 20, 9); ctx.fill(); }
      } else if (a.kind === "swoop") {
        if (a.state === "dive") { ctx.strokeStyle = "rgba(201,182,255,.45)"; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo((a.sx - a.tx) * 0.12, (a.sy - a.ty) * 0.12); ctx.stroke(); }
        ctx.fillStyle = shade("#a98bff"); ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(0, -11); ctx.lineTo(24, 0); ctx.lineTo(0, 9); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#e9ddff"; ctx.beginPath(); ctx.arc(0, -1, 4.5, 0, 6.2832); ctx.fill();
        if (a.flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (a.flash * 0.8) + ")"; ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(0, -11); ctx.lineTo(24, 0); ctx.lineTo(0, 9); ctx.closePath(); ctx.fill(); }
      } else if (a.kind === "shooter") {
        ctx.strokeStyle = shade("#ff9fcb"); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, -24); ctx.stroke();
        ctx.fillStyle = "#ffe27a"; ctx.beginPath(); ctx.arc(0, -25, 2.6, 0, 6.2832); ctx.fill();
        ctx.fillStyle = shade("#ff7ab6"); ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.beginPath(); ctx.arc(-4, -5, 5, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#2b1233"; ell(0, 2, 8, 4); ctx.fill();
        ctx.fillStyle = "#7dff9a"; ctx.beginPath(); ctx.arc(0, 2, 2.6 + a.charge * 5, 0, 6.2832); ctx.fill();
        if (a.flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (a.flash * 0.8) + ")"; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.2832); ctx.fill(); }
      } else drawAlienNew(a);
      ctx.restore();
    }
    function drawAlienNew(a) {
      const k = a.kind, T = S.time;
      if (a.hp < a.max && a.max >= 4) {
        ctx.fillStyle = "rgba(0,0,0,.45)"; ctx.fillRect(-18, -a.ry - 18, 36, 4);
        ctx.fillStyle = "#8aff9b"; ctx.fillRect(-18, -a.ry - 18, 36 * clamp(a.hp / a.max, 0, 1), 4);
      }
      if (k === "bomber") {
        ctx.fillStyle = shade("#c9702a"); ctx.beginPath(); ctx.moveTo(-32, -2); ctx.lineTo(-14, -10); ctx.lineTo(14, -10); ctx.lineTo(32, -2); ctx.lineTo(14, 8); ctx.lineTo(-14, 8); ctx.closePath(); ctx.fill();
        ctx.fillStyle = shade("#ffb04a"); ell(0, -2, 16, 8); ctx.fill();
        ctx.fillStyle = "#3a2410"; ctx.fillRect(-7, 5, 14, 5);
        ctx.fillStyle = Math.sin(T * 8) > 0 ? "#fff3a8" : "#ff6a3a"; ctx.beginPath(); ctx.arc(-24, -1, 2.4, 0, 6.2832); ctx.arc(24, -1, 2.4, 0, 6.2832); ctx.fill();
        if (a.nextBomb < 0.45) { ctx.fillStyle = "rgba(255,176,74,.7)"; ctx.beginPath(); ctx.arc(0, 12, 5, 0, 6.2832); ctx.fill(); }
      } else if (k === "tank") {
        ctx.fillStyle = shade("#4a5a8a"); ell(0, 3, 32, 19); ctx.fill();
        ctx.fillStyle = shade("#7f93c9"); ell(0, -2, 30, 15); ctx.fill();
        ctx.strokeStyle = "rgba(20,30,60,.7)"; ctx.lineWidth = 2;
        for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 11, -14); ctx.lineTo(i * 13, 14); ctx.stroke(); }
        ctx.fillStyle = a.charge > 0 ? "#ffd27a" : "#ff5a5a"; ctx.fillRect(-12, -3, 24, 5);
        ctx.fillStyle = "#2b3558"; ctx.fillRect(-4, 14, 8, 9 + a.charge * 4);
      } else if (k === "splitter") {
        ctx.fillStyle = shade("#4fd8ff"); ctx.beginPath(); ctx.arc(-9, 2, 13, 0, 6.2832); ctx.arc(9, 2, 13, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.arc(-12, -3, 5, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = "rgba(10,40,70,.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 12); ctx.stroke();
        ctx.fillStyle = "#12344a"; ctx.beginPath(); ctx.arc(-9, 3, 3.2, 0, 6.2832); ctx.arc(9, 3, 3.2, 0, 6.2832); ctx.fill();
      } else if (k === "mini") {
        ctx.strokeStyle = shade("#7ee7ff"); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, -14); ctx.stroke();
        ctx.fillStyle = shade("#7ee7ff"); ctx.beginPath(); ctx.arc(0, 0, 9, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#12344a"; ctx.beginPath(); ctx.arc(0, 1, 2.8, 0, 6.2832); ctx.fill();
      } else if (k === "phantom") {
        ctx.globalAlpha = a.ghost ? 0.2 + 0.1 * Math.sin(T * 10) : 0.92;
        ctx.fillStyle = shade("#d9ecff"); ctx.beginPath(); ctx.arc(0, -2, 17, Math.PI, 0); ctx.lineTo(17, 14);
        ctx.quadraticCurveTo(11, 8, 6, 14); ctx.quadraticCurveTo(0, 8, -6, 14); ctx.quadraticCurveTo(-11, 8, -17, 14); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#1a2a55"; ell(-6, -3, 3, 5); ctx.fill(); ell(6, -3, 3, 5); ctx.fill();
        ctx.globalAlpha = 1;
      } else if (k === "kamikaze") {
        const dv = a.state === "dive";
        ctx.fillStyle = shade("#ff6a3c");
        for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4 + T * (dv ? 6 : 1.2); ctx.beginPath(); ctx.moveTo(Math.cos(an - 0.22) * 11, Math.sin(an - 0.22) * 11); ctx.lineTo(Math.cos(an) * 20, Math.sin(an) * 20); ctx.lineTo(Math.cos(an + 0.22) * 11, Math.sin(an + 0.22) * 11); ctx.closePath(); ctx.fill(); }
        ctx.fillStyle = shade("#ff8a3c"); ctx.beginPath(); ctx.arc(0, 0, 12, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#2b0f08"; ctx.beginPath(); ctx.arc(0, 1, 4, 0, 6.2832); ctx.fill();
        ctx.fillStyle = Math.sin(T * (dv ? 30 : 8)) > 0 ? "#fff3a8" : "#ff3a2a"; ctx.beginPath(); ctx.arc(0, -1, 1.8, 0, 6.2832); ctx.fill();
      } else if (k === "sniper") {
        if (a.charge > 0) {
          ctx.strokeStyle = "rgba(255,80,80," + (0.25 + 0.6 * a.charge) + ")"; ctx.lineWidth = 1 + a.charge * 2; ctx.setLineDash([6, 6]);
          ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(a.aimX - a.x, a.aimY - a.y); ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.fillStyle = shade("#6a5acd"); ell(0, 0, 15, 17); ctx.fill();
        ctx.fillStyle = shade("#9d8cff"); ell(0, -5, 11, 9); ctx.fill();
        ctx.fillStyle = "#2a2250"; ctx.fillRect(-2, 10, 4, 12);
        ctx.fillStyle = "#ff4a4a"; ctx.beginPath(); ctx.arc(0, -1, 3.5 + a.charge * 3, 0, 6.2832); ctx.fill();
      } else if (k === "spinner") {
        ctx.strokeStyle = shade("#ffd24a"); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 17, 0, 6.2832); ctx.stroke();
        for (let i = 0; i < 8; i++) { const an = a.spin + i * Math.PI / 4; ctx.fillStyle = a.charge > 0.4 ? "#ffffff" : "#ff8a3c"; ctx.beginPath(); ctx.arc(Math.cos(an) * 17, Math.sin(an) * 17, 3.4, 0, 6.2832); ctx.fill(); }
        ctx.fillStyle = shade("#ff8a3c"); ctx.beginPath(); ctx.arc(0, 0, 8, 0, 6.2832); ctx.fill();
        ctx.fillStyle = "#2b1a08"; ctx.beginPath(); ctx.arc(0, 0, 3, 0, 6.2832); ctx.fill();
      } else if (k === "medic") {
        if (a.beam && a.beam.o && !a.beam.o.dead) {
          ctx.strokeStyle = "rgba(157,255,176," + (a.beam.t / 0.45 * 0.8) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(a.beam.o.x - a.x, a.beam.o.y - a.y); ctx.stroke();
        }
        ctx.strokeStyle = "rgba(157,255,176," + (0.35 + 0.2 * Math.sin(T * 4)) + ")"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 22 + Math.sin(T * 3) * 2, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = shade("#eafff0"); ctx.beginPath(); ctx.arc(0, 0, 16, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = shade("#7dffa6"); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 6.2832); ctx.stroke();
        ctx.fillStyle = "#ff4a5a"; ctx.fillRect(-3, -9, 6, 18); ctx.fillRect(-9, -3, 18, 6);
      }
      if (a.flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (a.flash * 0.7) + ")"; ell(0, 0, a.rx, a.ry); ctx.fill(); }
    }
    function drawBoss(b) {
      if (b.dead) return;
      ctx.save(); ctx.translate(b.x, b.y);
      const gl = ctx.createRadialGradient(0, 30, 6, 0, 30, 130); gl.addColorStop(0, "rgba(255,210,120," + (b.shield ? 0.18 : 0.34) + ")"); gl.addColorStop(1, "rgba(255,210,120,0)");
      ctx.fillStyle = gl; ctx.fillRect(-140, -110, 280, 270);
      const hull = ctx.createLinearGradient(0, -10, 0, 34); const TC = [null, ["#7c8fd0", "#2e3a6a", "#97a8e6"], ["#b27ad8", "#4a2a72", "#caa0ee"], ["#e07a7a", "#6a2e2e", "#f0a0a0"]][b.tier || 1];
      hull.addColorStop(0, shade(TC[0])); hull.addColorStop(1, shade(TC[1]));
      ctx.fillStyle = hull; ell(0, 8, 96, 26); ctx.fill();
      ctx.fillStyle = shade(TC[2]); ell(0, 0, 96, 20); ctx.fill();
      if (b.big) { ctx.fillStyle = shade(TC[2]); for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 24 - 9, -30); ctx.lineTo(i * 24, -52 - (2 - Math.abs(i)) * 7); ctx.lineTo(i * 24 + 9, -30); ctx.closePath(); ctx.fill(); } }
      ctx.fillStyle = "rgba(170,240,255,.55)"; ctx.beginPath(); ctx.arc(0, -6, 38, Math.PI, 0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, -6, 38, Math.PI, 0); ctx.stroke();
      ctx.fillStyle = "#8aff9b"; ell(0, -20, 11, 15); ctx.fill();
      ctx.fillStyle = "#1c2a1f"; ell(-4, -22, 2.6, 4); ctx.fill(); ell(4, -22, 2.6, 4); ctx.fill();
      for (let i = 0; i < 9; i++) {
        const x = -80 + i * 20, y = 10 + Math.abs(i - 4) * -1.2 + 6;
        ctx.fillStyle = Math.sin(S.time * 5 + i) > 0 ? "#fff3a8" : "#ff9fcb"; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 6.2832); ctx.fill();
      }
      if (b.flash > 0) { ctx.fillStyle = "rgba(255,255,255," + (b.flash * 0.75) + ")"; ell(0, 6, 96, 28); ctx.fill(); }
      if (b.shield) {
        const sg = ctx.createRadialGradient(0, 0, 30, 0, 0, 112); sg.addColorStop(0, "rgba(120,230,255,0)"); sg.addColorStop(1, "rgba(120,230,255," + (0.22 + 0.06 * Math.sin(S.time * 3)) + ")");
        ctx.fillStyle = sg; ell(0, 0, 112, 66); ctx.fill();
        ctx.strokeStyle = "rgba(160,240,255," + (0.5 + 0.2 * Math.sin(S.time * 3)) + ")"; ctx.lineWidth = 2; ell(0, 0, 112, 66); ctx.stroke();
      }
      ctx.restore();
    }

    function render() {
      const sx = cv.width / W;
      ctx.setTransform(sx, 0, 0, sx, 0, 0);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
      ctx.save();
      if (S.quake > 0) ctx.translate(rnd(-1, 1) * S.quake * 12, rnd(-1, 1) * S.quake * 9);
      if (S.sekaiT > 0) { ctx.translate(W, H); ctx.rotate(Math.PI); }
      drawSky(); drawGround(); drawRow(0); drawAmbientFront();
      drawGojoVoid();
      if (S.boss) drawBoss(S.boss);
      if (S.boss && S.boss.inkT > 0) drawBossInk(S.boss);
      for (const a of S.aliens) if (a.kind !== "boss") drawAlien(a);
      if (S.kyokaT > 0) drawDecoy();
      if (S.aizen) drawAizenAura();
      if (S.shinji) drawShinjiAura();
      if (S.zaraki) drawZarakiAura();
      if (S.ichigo) { drawIchigoAura(); drawIchigoGhosts(); }
      if (S.uryu) { drawUryuAura(); }
      if (S.gojo) drawGojoAura();
      if (S.ib.on) drawIbAura();
      drawUryuGhosts();
      if (S.surge) drawSurge(false);
      drawPlayer();
      if (S.surge) drawSurge(true);
      if (S.sekaiT > 0) { drawSekai(); drawSekaiSwirl(); }
      if (S.ceroFx > 0) drawCero();
      if (S.castT > 0) drawCast();
      if (S.kuro) drawKuro();
      if (S.goryu) drawGoryu();
      if (S.kyokaT > 0) drawKyokaVeil();
      drawZarakiFx();
      drawIchigoFx();
      drawUryuFx();
      drawGojoFx();
      drawIbFx();
      ctx.globalCompositeOperation = "lighter";
      for (const o of S.orbs) {
        const g = ctx.createRadialGradient(o.x, o.y, 1, o.x, o.y, o.r * 3.2);
        g.addColorStop(0, "#ffffff"); g.addColorStop(0.3, o.col); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, o.r * 3.2, 0, 6.2832); ctx.fill();
      }
      ctx.lineCap = "round";
      for (const b of S.bullets) {
        ctx.strokeStyle = "rgba(255,240,170,.55)"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(b.px - b.vx * 0.012, b.py - b.vy * 0.012); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(b.px, b.py); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (const s of S.slashes) {
        const prog = 1 - s.t / 0.22, end = s.ang - 1.1 + 2.2 * Math.min(1, prog * 2.2);
        ctx.strokeStyle = "rgba(255,255,255," + ((1 - prog) * 0.9) + ")"; ctx.lineWidth = (s.z ? 18 : 12) * (1 - prog) + 2;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.z ? s.R * 0.88 : 92, s.ang - 1.1, end); ctx.stroke();
        ctx.strokeStyle = (s.ic != null ? ISL[s.ic] : s.z ? (s.bk ? "rgba(255,40,30," : "rgba(255,150,60,") : S.shinji ? "rgba(255,120,170," : S.aizen ? "rgba(176,140,255," : "rgba(140,230,255,") + ((1 - prog) * 0.7) + ")"; ctx.lineWidth = (s.z ? 9 : 5) * (1 - prog) + 1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.z ? s.R * 0.74 : 78, s.ang - 1.1, end); ctx.stroke();
      }
      for (const f of S.fx) {
        ctx.globalCompositeOperation = f.add ? "lighter" : "source-over";
        ctx.globalAlpha = clamp(f.life / f.max, 0, 1); ctx.fillStyle = f.col;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.size, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
      drawRow(1); drawRow(2); drawRow(3); drawFlowers();
      ctx.restore();
    }

    /* ----- kontrol ----- */
    function overlayOn() { return screenEl.classList.contains("on"); }
    function toLogical(e) { const r = cv.getBoundingClientRect(); let x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H; if (S && S.sekaiT > 0) { x = W - x; y = H - y; } return { x, y }; }
    function togglePause() {
      if (!S || ["start", "dead", "victory", "pos"].indexOf(S.phase) >= 0) return;
      S.paused = !S.paused; showScreen(S.paused ? "pause" : "");
    }
    function toggleSound() {
      sfx.init(); const on = sfx.toggle();
      const b = $('[data-act="sound"]', root); if (b) b.textContent = "Suara: " + (on ? "nyala" : "mati");
    }
    function begin() {
      sfx.init(); S = newState(); S.checkpoint = 1; clearPos(); startWave(1); showScreen("");
      mouseDown = false; keys.left = keys.right = keys.jump = keys.attack = false;
    }
    function resumePos() {
      sfx.init(); const w = getPos(); S = newState(); S.checkpoint = w; startWave(w); showScreen("");
      mouseDown = false; keys.left = keys.right = keys.jump = keys.attack = false;
    }
    function retry() { sfx.init(); startWave(diff.soft ? S.wave : S.checkpoint); showScreen(""); }
    function nextFromPos() { if (!S || S.phase !== "pos") return; sfx.init(); showScreen(""); startWave(S.wave + 1); }

    function onKeyDown(e) {
      if (!S || overlayOn()) return;
      const k = e.key; let used = true;
      if (k === "a" || k === "A" || k === "ArrowLeft") keys.left = true;
      else if (k === "d" || k === "D" || k === "ArrowRight") keys.right = true;
      else if (k === "w" || k === "W" || k === "ArrowUp" || k === " ") keys.jump = true;
      else if (k === "j" || k === "J" || k === "f" || k === "F") keys.attack = true;
      else if (k === "1") { S.player.weapon = 0; sfx.swap(0); }
      else if (k === "2") { S.player.weapon = 1; sfx.swap(1); }
      else if (k === "3") (S.ichibeUnlocked ? ibSk0 : S.gojoUnlocked ? gSk0 : S.uryuUnlocked ? uSk0 : S.ichigoUnlocked ? iSk0 : S.zarakiUnlocked ? useLompat : S.aizenUnlocked ? useKyoka : useSekai)();
      else if (k === "4") (S.ichibeUnlocked ? ibSk1 : S.gojoUnlocked ? gSk1 : S.uryuUnlocked ? uSk1 : S.ichigoUnlocked ? iSk1 : S.zarakiUnlocked ? useTebas : S.aizenUnlocked ? useKuro : useCero)();
      else if (k === "5") (S.ichibeUnlocked ? nextIchibe : S.gojoUnlocked ? nextGojo : S.uryuUnlocked ? nextUryu : S.ichigoUnlocked ? nextIchigo : S.zarakiUnlocked ? toggleZaraki : S.aizenUnlocked ? toggleAizen : toggleShinji)();
      else if (k === "6") (S.ichibeUnlocked ? ibSk2 : S.gojoUnlocked ? gSk2 : S.uryuUnlocked ? uSk2 : S.ichigoUnlocked ? iSk2 : S.zarakiUnlocked ? useBankai : S.aizenUnlocked ? useGoryu : useSakanade)();
      else if (k === "s" || k === "S" || k === "ArrowDown") { if (S.zaraki) slamDown(); else used = false; }
      else if (k === "q" || k === "Q" || k === "e" || k === "E") { S.player.weapon ^= 1; sfx.swap(S.player.weapon); }
      else if (k === "p" || k === "P") togglePause();
      else if (k === "m" || k === "M") toggleSound();
      else used = false;
      if (used) e.preventDefault();
    }
    function onKeyUp(e) {
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") keys.left = false;
      else if (k === "d" || k === "D" || k === "ArrowRight") keys.right = false;
      else if (k === "w" || k === "W" || k === "ArrowUp" || k === " ") keys.jump = false;
      else if (k === "j" || k === "J" || k === "f" || k === "F") keys.attack = false;
    }
    function onPointerUp() { mouseDown = false; }
    function onVisibility() {
      if (document.hidden && S && ["intro", "minions", "descend", "boss", "bossdead", "clear"].indexOf(S.phase) >= 0 && !S.paused) togglePause();
    }
    function onBlur() { keys.left = keys.right = keys.jump = keys.attack = false; mouseDown = false; }

    cv.addEventListener("pointermove", e => { const q = toLogical(e); mx = q.x; my = q.y; if (e.pointerType === "mouse") { lastMouse = performance.now(); mouseInside = true; } });
    cv.addEventListener("pointerleave", () => { mouseInside = false; });
    cv.addEventListener("pointerdown", e => {
      sfx.init();
      const q = toLogical(e); mx = q.x; my = q.y; lastMouse = performance.now();
      if (!S || overlayOn()) return;
      if (e.pointerType === "mouse") { if (e.button === 0) mouseDown = true; }
      else { touch.attack = true; setTimeout(() => { touch.attack = false; }, 120); }
    });
    cv.addEventListener("contextmenu", e => e.preventDefault());
    hud.w0.addEventListener("click", () => { if (S && !S.shinji && !S.zaraki && !S.ichigo && !S.uryu && !S.gojo && !S.ib.on) S.player.weapon = 0; });
    hud.w1.addEventListener("click", () => { if (S && !S.shinji && !S.zaraki && !S.ichigo && !S.uryu && !S.gojo && !S.ib.on) S.player.weapon = 1; });
    root.querySelector('[data-skill="sekai"]').addEventListener("click", useSekai);
    root.querySelector('[data-skill="cero"]').addEventListener("click", useCero);
    root.querySelector('[data-skill="sakanade"]').addEventListener("click", useSakanade);
    azBtn.kyoka.addEventListener("click", useKyoka);
    azBtn.kuro.addEventListener("click", useKuro);
    azBtn.goryu.addEventListener("click", useGoryu);
    zrBtn.lompat.addEventListener("click", useLompat);
    zrBtn.tebas.addEventListener("click", useTebas);
    zrBtn.bankai.addEventListener("click", useBankai);
    icSk.forEach((b, i) => b.addEventListener("click", () => useISkill(i)));
    icForm.forEach(b => b.addEventListener("click", () => goIchigo(+b.dataset.iform)));
    uySk.forEach((b, i) => b.addEventListener("click", () => useUSkill(i)));
    uyForm.forEach(b => b.addEventListener("click", () => goUryu(+b.dataset.uform)));
    gjSk.forEach((b, i) => b.addEventListener("click", () => useGSkill(i)));
    gjForm.forEach(b => b.addEventListener("click", () => goGojo(+b.dataset.gform)));
    ibSk.forEach((b, i) => b.addEventListener("click", () => useIbSkill(i)));
    ibForm.forEach(b => b.addEventListener("click", () => goIchibe(+b.dataset.bform)));
    root.querySelectorAll("[data-t]").forEach(b => {
      const t = b.dataset.t;
      b.addEventListener("pointerdown", e => {
        e.preventDefault(); sfx.init();
        if (t === "swap") { if (S && !overlayOn()) { S.player.weapon ^= 1; sfx.swap(S.player.weapon); } return; }
        touch[t] = true; b.classList.add("is-down");
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(ev => b.addEventListener(ev, () => { if (t !== "swap") { touch[t] = false; b.classList.remove("is-down"); } }));
    });
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const act = b.dataset.act;
      if (act === "menu") api.back();
      else if (act === "sound") toggleSound();
      else if (act === "pause") togglePause();
      else if (act === "start" || act === "again") begin();
      else if (act === "resume-pos") resumePos();
      else if (act === "nextpos") nextFromPos();
      else if (act === "diff") { applyDiff(b.dataset.d); showScreen("start"); const nb = screenEl.querySelector('[data-d="' + b.dataset.d + '"]'); if (nb) nb.focus({ preventScroll: true }); }
      else if (act === "resume") togglePause();
      else if (act === "retry") retry();
      else if (act === "shinji") toggleShinji();
      else if (act === "aizen") toggleAizen();
      else if (act === "zaraki") toggleZaraki();
      else if (act === "ichigo") nextIchigo();
      else if (act === "uryu") nextUryu();
      else if (act === "gojo") nextGojo();
      else if (act === "ichibe") nextIchibe();
    });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    /* ----- ukuran kanvas & loop ----- */
    function resize() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    }
    let ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(cv); } else window.addEventListener("resize", resize);
    resize();

    function loop(ts) {
      if (destroyed) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ts - prevT) / 1000 || 0); prevT = ts;
      if (!S.paused) step(dt);
      render(); updateHud();
    }

    S = newState(); env = envAt(S.day / DAY);
    showScreen("start");
    raf = requestAnimationFrame(loop);

    return {
      destroy() {
        destroyed = true; cancelAnimationFrame(raf); clearTimeout(bannerTimer);
        document.removeEventListener("keydown", onKeyDown); document.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("pointerup", onPointerUp); window.removeEventListener("blur", onBlur);
        document.removeEventListener("visibilitychange", onVisibility);
        if (ro) ro.disconnect(); else window.removeEventListener("resize", resize);
      },
      onEscape() {
        if (!S || ["start", "dead", "victory", "pos"].indexOf(S.phase) >= 0) return false;
        togglePause(); return true;
      },
      _test: { get S() { return S; }, step: step, begin: begin, keys: keys, mouse: function (x, y, down) { mx = x; my = y; lastMouse = performance.now(); mouseDown = down; } }
    };
  }
})();
