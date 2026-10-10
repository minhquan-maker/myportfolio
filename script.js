/* =========================================================================
   minhquan — site behaviour. Every module is an IIFE that bails out quietly
   when its markup is missing.
   ========================================================================= */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Nav: scrolled state + mobile menu ----------
(function nav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const toggle = document.getElementById('navToggle');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!toggle) return;
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('#navLinks a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();

// ---------- Scroll reveal (replays on re-entry) ----------
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  document.querySelectorAll('[data-stagger-group]').forEach((group) => {
    group.querySelectorAll(':scope > .reveal').forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.08, 0.48)}s`;
    });
  });
  if (REDUCED || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting));
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach((el) => io.observe(el));
})();

// ---------- Counter in the black band ----------
(function counter() {
  const el = document.querySelector('[data-count]');
  if (!el) return;
  const target = Number(el.dataset.count);
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  if (REDUCED || !('IntersectionObserver' in window)) { el.textContent = fmt(target); return; }
  el.textContent = '0';
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1800, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.4 });
  io.observe(el);
})();

// ---------- Marquee: duplicate the track so the loop is seamless ----------
(function marquee() {
  document.querySelectorAll('[data-marquee] .marquee__track').forEach((track) => {
    Array.from(track.children).forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach((img) => { img.alt = ''; });
      track.appendChild(clone);
    });
  });
})();

// ---------- Videos: play only while on screen ----------
(function autoplayVideos() {
  const vids = document.querySelectorAll('video[data-autoplay]');
  if (!vids.length || REDUCED || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (target.preload === 'none') target.preload = 'auto';
        const p = target.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        target.pause();
      }
    });
  }, { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));
})();

// ---------- Active nav link (scrollspy) ----------
(function scrollspy() {
  const links = Array.from(document.querySelectorAll('.nav__links > .nav__item > .nav__link, .nav__links > .nav__link'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const groups = {
    about: ['about'],
    work: ['aquaguard', 'airguard', 'includio', 'enablecode'],
    research: ['research'],
    recognition: ['recognition', 'press', 'voices'],
    contact: ['contact', 'faq'],
  };
  const linkFor = (id) => {
    const key = Object.keys(groups).find((k) => groups[k].includes(id));
    return key ? links.find((a) => a.getAttribute('href') === `#${key}`) : null;
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const link = linkFor(entry.target.id);
      if (link) link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.values(groups).flat().forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();

// ---------- Testimonial carousel ----------
(function carousel() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const dotsWrap = root.querySelector('[data-carousel-dots]');
    if (!track) return;
    const cards = Array.from(track.children);
    const perView = () => Math.max(1, Math.round(track.clientWidth / cards[0].getBoundingClientRect().width));
    const pages = () => Math.max(1, cards.length - perView() + 1);
    let dots = [];

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      dots = Array.from({ length: pages() }, (_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to quote ${i + 1}`);
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
        return b;
      });
      sync();
    };
    const current = () => {
      const left = track.scrollLeft;
      let best = 0;
      cards.forEach((c, i) => { if (Math.abs(c.offsetLeft - cards[0].offsetLeft - left) < Math.abs(cards[best].offsetLeft - cards[0].offsetLeft - left)) best = i; });
      return Math.min(best, pages() - 1);
    };
    const go = (i) => {
      const idx = (i + pages()) % pages();
      track.scrollTo({ left: cards[idx].offsetLeft - cards[0].offsetLeft, behavior: REDUCED ? 'auto' : 'smooth' });
    };
    const sync = () => { const c = current(); dots.forEach((d, i) => d.classList.toggle('is-active', i === c)); };

    root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => go(current() - 1));
    root.querySelector('[data-carousel-next]')?.addEventListener('click', () => go(current() + 1));
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots();

    if (!REDUCED) {
      let timer = setInterval(() => go(current() + 1), 6000);
      root.addEventListener('pointerenter', () => clearInterval(timer));
      root.addEventListener('pointerleave', () => { clearInterval(timer); timer = setInterval(() => go(current() + 1), 6000); });
    }
  });
})();

// ---------- FAQ tabs (accordion is native <details>) ----------
(function faq() {
  const tabs = document.querySelectorAll('[data-faq-tab]');
  if (!tabs.length) return;
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const key = tab.dataset.faqTab;
    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    document.querySelectorAll('[data-faq-panel]').forEach((p) => {
      const on = p.dataset.faqPanel === key;
      p.classList.toggle('is-active', on);
      if (on) {
        const details = p.querySelectorAll('details');
        if (details.length && !p.querySelector('details[open]')) details[0].open = true;
      }
    });
  }));
})();

// ---------- Certificate modal ----------
(function certificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (!modal) return;
  const body = document.getElementById('certificate-modal-body');
  const title = document.getElementById('certificate-modal-title');
  const openLink = document.getElementById('certificate-modal-open-link');
  let lastTrigger = null;

  const fallback = (url) => {
    body.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'cert-modal__fallback';
    p.innerHTML = 'This certificate can&rsquo;t be previewed here. ';
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Open it in a new tab ↗';
    p.appendChild(a);
    body.appendChild(p);
  };

  const open = (trigger) => {
    const url = trigger.dataset.certUrl || trigger.getAttribute('href');
    if (!url) return;
    lastTrigger = trigger;
    title.textContent = trigger.dataset.certTitle || 'Certificate';
    openLink.href = url;
    body.innerHTML = '';
    const ext = url.split('?')[0].split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      const frame = document.createElement('iframe');
      frame.src = url;
      frame.title = title.textContent;
      frame.addEventListener('error', () => fallback(url));
      body.appendChild(frame);
    } else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = title.textContent;
      img.addEventListener('error', () => fallback(url));
      body.appendChild(img);
    } else {
      fallback(url);
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.cert-modal__actions [data-cert-close]').focus();
  };

  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    body.innerHTML = '';
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
  };

  document.querySelectorAll('.certificate-trigger').forEach((t) => t.addEventListener('click', (e) => {
    e.preventDefault();
    open(t);
  }));
  modal.querySelectorAll('[data-cert-close]').forEach((b) => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* =========================================================================
   Pixel me — a tiny pixel self-portrait that pops up in the bottom-left corner,
   plays a couple of animations, leaves, and returns when the screen stays idle.
   Canvas-drawn (no assets). Skipped for reduced motion and very small screens.
   ========================================================================= */
(function pixelMe() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth <= 480) return;

  const W = 16, H = 20;
  const C = {
    hair: '#14141A', skin: '#F4DCC8', skinSh: '#E3C2A8', eye: '#14141A', mouth: '#B5645A',
    shirt: '#1B1B22', trim: '#F2F2F2', collar: '#3A3A44', pants: '#2B3A5C', shoe: '#F2F2F2',
    lap: '#B8BEC9', lapDark: '#8A91A0', logo: '#C4501F'
  };
  const PHRASES = [
    'Hi, I’m Quan. The small one.',
    'Psst. The projects are worth a look.',
    'CEO by day, researcher by night.'
  ];

  const el = document.createElement('div');
  el.className = 'pixel-me';
  el.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const bubble = document.createElement('div');
  bubble.className = 'pixel-me__bubble';
  el.appendChild(canvas);
  el.appendChild(bubble);
  document.body.appendChild(el);
  const ctx = canvas.getContext('2d');
  if (!ctx) { el.remove(); return; }

  function r(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

  function render(anim, f, blink, dir) {
    ctx.clearRect(0, 0, W, H);
    // legs + shoes (walking lifts one foot at a time)
    const step = anim === 'walk' ? (f >> 1) % 2 : -1;
    if (step === 0) { r(5, 16, 3, 2, C.pants); r(5, 18, 3, 1, C.shoe); } else { r(5, 16, 3, 3, C.pants); r(5, 19, 3, 1, C.shoe); }
    if (step === 1) { r(8, 16, 3, 2, C.pants); r(8, 18, 3, 1, C.shoe); } else { r(8, 16, 3, 3, C.pants); r(8, 19, 3, 1, C.shoe); }
    // torso, collar, placket
    r(4, 10, 8, 6, C.shirt);
    r(5, 10, 2, 1, C.collar); r(9, 10, 2, 1, C.collar); r(7, 11, 2, 2, C.collar);
    // sleeves with white trim
    r(2, 10, 2, 2, C.shirt); r(2, 12, 2, 1, C.trim);
    r(12, 10, 2, 2, C.shirt); r(12, 12, 2, 1, C.trim);

    // arms
    if (anim === 'wave') {
      r(2, 13, 2, 3, C.skin);
      r(13 + ((f >> 1) % 2), 5, 2, 6, C.skin);
    } else if (anim === 'yawn') {
      r(1, 3 + ((f >> 1) % 2), 2, 7, C.skin);
      r(13, 3 + ((f >> 1) % 2), 2, 7, C.skin);
    } else if (anim === 'type') {
      // forearms are hidden behind the laptop; hands drawn below
    } else if (anim === 'walk') {
      r(2, 13 + (step === 0 ? 1 : 0), 2, 2 + (step === 0 ? 0 : 1), C.skin);
      r(12, 13 + (step === 1 ? 1 : 0), 2, 2 + (step === 1 ? 0 : 1), C.skin);
    } else {
      r(2, 13, 2, 3, C.skin);
      r(12, 13, 2, 3, C.skin);
    }

    // head: hair, face, ears, neck
    r(5, 0, 6, 1, C.hair); r(4, 1, 8, 1, C.hair); r(3, 2, 10, 2, C.hair); r(3, 4, 1, 1, C.hair); r(12, 4, 1, 1, C.hair);
    r(5, 3, 1, 1, C.hair); r(10, 3, 1, 1, C.hair);
    r(4, 4, 8, 4, C.skin); r(5, 8, 6, 1, C.skin); r(6, 9, 4, 1, C.skinSh);
    r(3, 5, 1, 2, C.skin); r(12, 5, 1, 2, C.skin);

    // eyes
    let dx = 0;
    if (anim === 'look') dx = [-1, 0, 1, 0][(f >> 1) % 4];
    if (anim === 'walk') dx = dir || 0;
    const closed = blink || anim === 'yawn';
    if (closed) { r(5 + dx, 5, 2, 1, C.skinSh); r(9 + dx, 5, 2, 1, C.skinSh); r(5 + dx, 6, 2, 1, C.eye); r(9 + dx, 6, 2, 1, C.eye); }
    else { r(6 + dx, 5, 1, 2, C.eye); r(9 + dx, 5, 1, 2, C.eye); }

    // mouth
    if (anim === 'yawn') r(7, 6 + 1, 2, 2, C.mouth);
    else if (anim === 'wave') r(6, 7, 4, 1, C.mouth);
    else r(7, 7, 2, 1, C.mouth);

    // laptop + typing hands
    if (anim === 'type') {
      r(3, 12, 10, 5, C.lap); r(3, 16, 10, 1, C.lapDark); r(7, 14, 2, 1, C.logo);
      r(2, 12 + ((f >> 1) % 2), 2, 2, C.skin);
      r(12, 12 + (((f >> 1) + 1) % 2), 2, 2, C.skin);
    }
  }

  // ---- choreography ----
  const ANIMS = ['wave', 'type', 'yawn', 'look'];
  const X0 = 20, SPEED = 7;           // px per tick while walking
  let visible = false, timer = null, lastAnim = '', hold = 0, override = null, x = X0;
  let lastHide = performance.now() - 6000;   // first visit ~2 s after load if the page is idle
  let lastActive = performance.now();

  ['pointermove', 'pointerdown', 'scroll', 'keydown', 'wheel', 'touchstart'].forEach((ev) => {
    window.addEventListener(ev, () => { lastActive = performance.now(); }, { passive: true });
  });

  function pickTwo() {
    const pool = ANIMS.filter((a) => a !== lastAnim).sort(() => Math.random() - 0.5);
    const second = ANIMS.filter((a) => a !== pool[0]).sort(() => Math.random() - 0.5)[0];
    lastAnim = second;
    return [pool[0], second];
  }

  function setX(v) { x = v; el.style.left = x + 'px'; }

  function show() {
    visible = true;
    setX(X0);
    el.classList.add('is-in');
    const [a, b] = pickTwo();
    const far = Math.min(X0 + 90 + Math.random() * 60, window.innerWidth - 120);
    const mid = X0 + 30 + Math.random() * 30;
    const plan = [
      { a: 'idle', ms: 700 },
      { a: 'walk', to: far },
      { a: a, ms: 2400 },
      { a: 'walk', to: mid },
      { a: b, ms: 2400 },
      { a: 'walk', to: X0 },
      { a: 'idle', ms: 500 }
    ];
    let step = 0, stepStart = performance.now(), f = 0, blinkAt = performance.now() + 1600, dir = 0;
    timer = setInterval(() => {
      const now = performance.now();
      const cur = plan[step];
      let done = false;
      if (cur.a === 'walk') {
        dir = cur.to > x ? 1 : -1;
        const nx = x + dir * SPEED;
        if ((dir > 0 && nx >= cur.to) || (dir < 0 && nx <= cur.to)) { setX(cur.to); done = true; } else setX(nx);
      } else if (now - stepStart >= cur.ms + hold) { done = true; hold = 0; }
      if (done) { step++; stepStart = now; if (step >= plan.length) return hide(); }
      f++;
      const anim = override && now < override.until ? override.anim : plan[step].a;
      let blink = false;
      if (now >= blinkAt) { blink = true; if (now >= blinkAt + 160) blinkAt = now + 1800 + Math.random() * 1500; }
      render(anim, f, blink, dir);
    }, 120);
    render('idle', 0, false, 0);
  }

  function hide() {
    clearInterval(timer); timer = null;
    el.classList.remove('is-in', 'is-talking');
    setTimeout(() => { visible = false; lastHide = performance.now(); }, 1000);
    visible = true; // stays "busy" until the sink-down transition finishes
  }

  canvas.addEventListener('click', () => {
    if (!visible) return;
    bubble.textContent = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    el.classList.add('is-talking');
    override = { anim: 'wave', until: performance.now() + 2200 };
    hold += 2400;
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('is-talking'), 2400);
  });

  setInterval(() => {
    if (document.hidden || visible) return;
    const now = performance.now();
    const idle = now - lastActive, gap = now - lastHide;
    if ((idle >= 1500 && gap >= 5000) || gap >= 30000) show();
  }, 1000);
})();
