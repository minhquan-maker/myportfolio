(function () {
  // ---------- Particle sphere canvas (nusx-style: constant spin + gentle pointer tilt + drag inertia) ----------
  const canvas = document.getElementById('sphere');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const points = [];
    const NUM = 320;
    let w = 0, h = 0, dpr = 1, radius = 0;

    // rotation model
    let spinY = 0;            // accumulated horizontal rotation (auto-spin + drag)
    let velY = 0, velX = 0;   // drag momentum (inertia)
    let tiltX = 0;            // accumulated vertical rotation
    // smoothed pointer influence (additive, never snaps the whole sphere)
    let infX = 0, infY = 0, tgtInfX = 0, tgtInfY = 0;
    let scrollImpulse = 0;
    let isDragging = false, lastDragX = 0, lastDragY = 0;

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // walk up to the wrapper if present, so canvas always sizes to the wrap box
      const target = canvas.parentElement && canvas.parentElement.classList.contains('hero__sphere-wrap')
        ? canvas.parentElement
        : canvas;
      const rect = target.getBoundingClientRect();
      const cw = Math.max(1, rect.width);
      const ch = Math.max(1, rect.height);
      w = canvas.width = Math.floor(cw * dpr);
      h = canvas.height = Math.floor(ch * dpr);
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      radius = Math.min(w, h) * 0.46;
      points.length = 0;
      for (let i = 0; i < NUM; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / NUM);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        points.push({
          bx: Math.sin(phi) * Math.cos(theta),
          by: Math.sin(phi) * Math.sin(theta),
          bz: Math.cos(phi)
        });
      }
    }

    function rotateY(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }
    function rotateX(p, a) {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h * 0.42;

      // constant slow auto-spin (nusx "spin") + decaying drag momentum + scroll impulse
      if (!isDragging) {
        spinY += 0.0016 + velY;
        tiltX += velX;
        velY *= 0.94;
        velX *= 0.94;
      }
      spinY += scrollImpulse;
      scrollImpulse *= 0.92;

      // gentle pointer influence, smoothly eased (never snaps)
      infX += (tgtInfX - infX) * 0.06;
      infY += (tgtInfY - infY) * 0.06;

      const rotY = spinY + infX * 0.4;
      const rotX = tiltX + infY * 0.3;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let r = { x: p.bx, y: p.by, z: p.bz };
        r = rotateY(r, rotY);
        r = rotateX(r, rotX);
        const sx = cx + r.x * radius;
        const sy = cy + r.y * radius;
        const depth = (r.z + 1) / 2;
        const size = (1.1 + depth * 3.4) * dpr;
        const alpha = 0.22 + depth * 0.76;
        // base particles — navy (matches --paper #0E1A33)
        ctx.fillStyle = 'rgba(14, 26, 51, ' + alpha.toFixed(3) + ')';
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        // sparse red accent on points facing camera
        if (i % 47 === 0 && depth > 0.65) {
          ctx.fillStyle = 'rgba(196, 80, 31, ' + (alpha * 0.95).toFixed(3) + ')';
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
        // sparse yellow highlight on the brightest points
        if (i % 89 === 0 && depth > 0.85) {
          ctx.fillStyle = 'rgba(240, 179, 90, ' + (alpha * 0.9).toFixed(3) + ')';
          ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
        }
      }
      requestAnimationFrame(tick);
    }

    // --- pointer influence: tracked globally, normalized to canvas, eased in tick ---
    window.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (e.clientX - rect.left) / rect.width;   // 0..1
      const ny = (e.clientY - rect.top) / rect.height;   // 0..1
      const inside = nx >= -0.15 && nx <= 1.15 && ny >= -0.15 && ny <= 1.15;
      if (inside) {
        tgtInfX = (nx - 0.5) * Math.PI * 1.1;   // gentle horizontal tilt
        tgtInfY = (ny - 0.5) * Math.PI * 0.6;   // gentle vertical tilt
      } else {
        tgtInfX = 0; tgtInfY = 0;               // ease back to neutral, no snap
      }
      if (isDragging) {
        // 1 px horizontal ≈ 0.0095 rad (≈ 0.55°). ~625 px = full 360° turn.
        // Strong, free feel — no clamps, so the user can spin as far as they want.
        velY = (e.clientX - lastDragX) * 0.0006 * dpr;
        velX = (e.clientY - lastDragY) * 0.00045 * dpr;
        spinY += (e.clientX - lastDragX) * 0.0095;
        tiltX += (e.clientY - lastDragY) * 0.007;
        lastDragX = e.clientX; lastDragY = e.clientY;
      }
    }, { passive: true });

    canvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      lastDragX = e.clientX; lastDragY = e.clientY;
      velY = 0; velX = 0;
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    });
    window.addEventListener('pointerup', () => {
      if (isDragging) { isDragging = false; canvas.style.cursor = 'grab'; }
    });

    canvas.style.cursor = 'grab';
    window.addEventListener('resize', init);
    init();
    if (!reduce) requestAnimationFrame(tick);
    else { const cx = 0; tick(); } // one static frame for reduced motion
  }


  // ---------- Nav: measure real height, hide/reveal, sliding pill, mega stage ----------
  const nav = document.getElementById('nav');
  const navBar = document.querySelector('.nav__bar');
  const navLinks = document.getElementById('navLinks');
  const navItems = Array.from(document.querySelectorAll('.nav__item'));
  const mega = document.getElementById('mega');
  const stage = document.getElementById('megaStage');
  const panels = Array.from(document.querySelectorAll('.mega__panel'));
  const pill = document.getElementById('navPill');
  const navToggle = document.getElementById('navToggle');
  const footer = document.querySelector('footer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let openKey = null;
  let hoverTimer = null;
  let pillRest = null;      // element the pill returns to when idle
  let litItem = null;

  // --- measure nav height into --nav-h (kills the "sticking out" bug) ---
  function measureNav() {
    if (!navBar) return;
    const h = Math.round(navBar.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--nav-h', h + 'px');
  }

  // --- collapse nav when items would collide (nusx fit()) ---
  function fitNav() {
    if (!nav) return;
    nav.removeAttribute('data-nav-collapsed');
    if (window.innerWidth <= 1024) { nav.setAttribute('data-nav-collapsed', ''); return; }
    if (!navLinks) return;
    if (getComputedStyle(navLinks).display === 'none') return;
    const brand = document.querySelector('.nav__brand');
    const tools = document.querySelector('.nav__tools');
    if (!brand || !tools) return;
    const b = brand.getBoundingClientRect();
    const l = navLinks.getBoundingClientRect();
    const t = tools.getBoundingClientRect();
    const gap = 20;
    if (l.left < b.right + gap || l.right > t.left - gap) {
      nav.setAttribute('data-nav-collapsed', '');
    }
  }
  if (navBar) {
    if ('ResizeObserver' in window) new ResizeObserver(measureNav).observe(navBar);
    measureNav();
  }

  // --- hide on scroll down, reveal on scroll up / cursor to top / footer ---
  const TOP_THRESHOLD = 100, REVEAL_DELTA = 6;
  let hidden = false, lastScroll = window.scrollY, cursorInNav = false, footerVisible = false;
  function setHidden(v) {
    if (!nav || hidden === v) return;
    hidden = v;
    nav.classList.toggle('is-hidden', v);
  }
  if (nav) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < TOP_THRESHOLD) setHidden(false);
      else if (footerVisible) setHidden(true);
      else if (cursorInNav) setHidden(false);
      else if (y > lastScroll + REVEAL_DELTA) setHidden(true);
      else if (y < lastScroll - REVEAL_DELTA) setHidden(false);
      lastScroll = y;
    }, { passive: true });
    window.addEventListener('mousemove', (e) => {
      const h = nav.getBoundingClientRect().height || 80;
      const inNav = e.clientY <= h;
      if (inNav !== cursorInNav) {
        cursorInNav = inNav;
        if (inNav && !footerVisible) setHidden(false);
      }
    }, { passive: true });
    if (footer && 'IntersectionObserver' in window) {
      const fio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          footerVisible = en.isIntersecting;
          if (footerVisible) setHidden(true);
          else if (window.scrollY > TOP_THRESHOLD && !cursorInNav) { /* stay hidden until scroll up */ }
        });
      }, { threshold: 0 });
      fio.observe(footer);
    }
  }

  // --- sliding yellow pill ---
  function movePill(el, instant) {
    if (!pill || !el || !navLinks) return;
    const host = pill.parentElement.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = Math.round(r.left - host.left);
    const w = Math.round(r.width);
    const wasHidden = getComputedStyle(pill).opacity !== '1';
    if (instant || reduceMotion.matches || wasHidden) {
      pill.classList.add('is-dragging');
      pill.style.transform = 'translateX(' + x + 'px)';
      pill.style.width = w + 'px';
      pill.style.opacity = '1';
      void pill.offsetWidth;
      pill.classList.remove('is-dragging');
    } else {
      pill.style.transform = 'translateX(' + x + 'px)';
      pill.style.width = w + 'px';
      pill.style.opacity = '1';
    }
    navItems.forEach((b) => b.classList.toggle('is-lit', b === el));
    litItem = el;
  }
  function restPill() {
    const target = (openKey && navItems.find((b) => b.dataset.mega === openKey)) || pillRest || null;
    if (target) movePill(target);
    else if (pill) { pill.style.opacity = '0'; navItems.forEach((b) => b.classList.remove('is-lit')); litItem = null; }
  }
  navItems.forEach((btn) => {
    btn.addEventListener('pointerenter', () => movePill(btn));
    btn.addEventListener('focus', () => movePill(btn));
  });
  if (navLinks) navLinks.addEventListener('pointerleave', () => { if (!openKey) restPill(); });

  // --- mega stage: tween open height, cross-fade panels ---
  function panelFor(key) {
    return document.querySelector('.mega[data-mega-panel="' + key + '"]') || null;
  }
  function openMega(key) {
    if (!mega || !key) return;
    if (openKey !== key) {
      // toggle visibility on the matching mega block (and the parent stage)
      const allMega = document.querySelectorAll('.mega[data-mega-panel]');
      allMega.forEach((p) => p.classList.toggle('is-active', p.dataset.megaPanel === key));
      navItems.forEach((b) => {
        const on = b.dataset.mega === key;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-expanded', String(on));
      });
      openKey = key;
    }
    const active = panelFor(key);
    // measure the inner content; set maxHeight on the .mega panel itself (not the wrapper).
    requestAnimationFrame(() => {
      const allMega = document.querySelectorAll('.mega[data-mega-panel]');
      const inner = active ? active.querySelector('.mega__inner') : null;
      const h = inner ? inner.offsetHeight : 0;
      allMega.forEach((p) => {
        if (p.dataset.megaPanel === key) {
          p.style.maxHeight = (h + 60) + 'px';
          p.classList.add('is-open');
        } else {
          p.style.maxHeight = '0px';
          p.classList.remove('is-open');
        }
      });
    });
  }
  function closeMega(immediate) {
    clearTimeout(hoverTimer);
    const doClose = () => {
      if (nav && nav.matches(':hover') && !document.activeElement?.closest('.nav')) return;
      const allMega = document.querySelectorAll('.mega[data-mega-panel]');
      allMega.forEach((p) => { p.style.maxHeight = '0px'; p.classList.remove('is-open', 'is-active'); });
      navItems.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-expanded', 'false'); });
      openKey = null;
      restPill();
    };
    if (immediate) { doClose(); return; }
    hoverTimer = setTimeout(doClose, 150);
  }
  if (nav && mega) {
    navItems.forEach((btn) => {
      btn.addEventListener('mouseenter', () => openMega(btn.dataset.mega));
      // hover already opened the panel for mouse users; a click just pins it open
      // (never closes, or hover-then-click would toggle it shut). Keyboard users
      // who focus+Enter get the same open behaviour.
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // on mobile the mega panels are hidden — scroll to the section instead
        if (window.innerWidth <= 980) {
          const target = document.getElementById(btn.dataset.target);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeMobileNav();
          return;
        }
        openMega(btn.dataset.mega);
      });
      // keyboard: focus lights the pill but doesn't open; Enter/Space opens
      btn.addEventListener('focus', () => { if (!openKey) movePill(btn); });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMega(btn.dataset.mega); }
      });
    });
    mega.addEventListener('mouseenter', () => clearTimeout(hoverTimer));
    mega.addEventListener('mouseleave', () => closeMega());
    // clicking a link inside the panel: let it navigate, then close the panel
    mega.addEventListener('click', (e) => {
      if (e.target.closest('a[href]')) closeMega(true);
    });
    window.addEventListener('scroll', () => { if (window.scrollY > 60 && openKey) closeMega(true); }, { passive: true });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openKey) closeMega(true); });
    document.addEventListener('click', (e) => {
      if (openKey && !e.target.closest('.nav')) closeMega(true);
    });
  }

  // --- mobile toggle ---
  function closeMobileNav() {
    if (!navLinks || !navLinks.classList.contains('is-mobile-open')) return;
    navLinks.classList.remove('is-mobile-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = navLinks.classList.toggle('is-mobile-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }
  // close the panel when a nav link is tapped
  if (navLinks) {
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a[href^="#"]')) closeMobileNav();
    });
  }
  // tapping outside the header closes the panel
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) closeMobileNav();
  });

  // --- resize ---
  let rT;
  window.addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => {
      fitNav();
      measureNav();
      if (window.innerWidth > 980) closeMobileNav();
      if (openKey) openMega(openKey);
      if (litItem) movePill(litItem, true);
      sizeProjPin();
    }, 120);
  });
  fitNav();

  // ---------- Particle sphere drag cue ----------
  const dragCue = document.getElementById('dragCue');
  if (dragCue && typeof targetRotY !== 'undefined') {
    // sphere variables are inside the IIFE scope of the module above (same closure)
  }

  // ---------- Scroll progress ----------
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress) scrollProgress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }, { passive: true });

  // ---------- Scroll reveal ----------
  const reduceAll = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const expCards = Array.from(document.querySelectorAll('[data-exp]'));

  function revealExpCards(target) {
    const group = target.closest('.exp-grid');
    if (!group) return;
    const siblings = Array.from(group.querySelectorAll('[data-exp]'));
    const i = siblings.indexOf(target);
    setTimeout(() => target.classList.add('is-visible'), reduceAll ? 0 : i * 110);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.reveal').forEach((el) => {
      io.observe(el);
      // Force initial check: if already in viewport, add .visible immediately
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 100 && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });

    // Experience cards: staggered entrance, replayed on re-scroll
    const expIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) revealExpCards(entry.target);
        else entry.target.classList.remove('is-visible');
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    expCards.forEach((el) => {
      expIO.observe(el);
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 60 && rect.bottom > 0) revealExpCards(el);
    });
  } else {
    // fallback: show all reveals immediately
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    expCards.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Counters ----------
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.stat__num').forEach((el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const dur = 1400, start = performance.now();
        const sym = el.querySelector('.sym');
        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const v = Math.round(target * ease);
          el.firstChild.nodeValue = String(v);
          if (p < 1) requestAnimationFrame(step);
        }
        if (sym) el.firstChild.nodeValue = '0';
        requestAnimationFrame(step);
      });
      counterIO.disconnect();
    });
  }, { threshold: 0.3 });
  const stats = document.querySelector('.stats');
  if (stats) counterIO.observe(stats);

  // ---------- Projects: drag + pinned horizontal scroll ----------
  const projPin = document.querySelector('.proj-pin');
  const projTrack = document.getElementById('projTrack');
  let pinTop = 0, pinRange = 0, pinned = false;

  // multiplier on the pinned scroll distance — higher = slower, easier-to-read scrub
  const PIN_SCROLL_RATIO = 1.4;

  function sizeProjPin() {
    if (!projPin || !projTrack) return;
    pinned = window.innerWidth > 980 && !reduceMotion.matches;
    const extra = Math.max(0, projTrack.scrollWidth - projTrack.clientWidth);
    if (pinned && extra > 10) {
      pinRange = extra;
      projPin.style.height = (window.innerHeight + extra * PIN_SCROLL_RATIO) + 'px';
    } else {
      pinRange = 0;
      projPin.style.height = 'auto';
    }
    pinTop = projPin.offsetTop;
  }

  if (projTrack) {
    // drag to scrub
    let isDown = false, startX = 0, startScroll = 0;
    projTrack.addEventListener('mousedown', (e) => {
      isDown = true; startX = e.pageX; startScroll = projTrack.scrollLeft;
      projTrack.classList.add('is-dragging');
    });
    ['mouseleave', 'mouseup'].forEach((ev) =>
      projTrack.addEventListener(ev, () => { isDown = false; projTrack.classList.remove('is-dragging'); })
    );
    projTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      projTrack.scrollLeft = startScroll - (e.pageX - startX);
    });
    projTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX; startScroll = projTrack.scrollLeft;
    }, { passive: true });
    projTrack.addEventListener('touchmove', (e) => {
      projTrack.scrollLeft = startScroll - (e.touches[0].pageX - startX);
    }, { passive: true });

    const bar = document.getElementById('projBar');
    const prev = document.getElementById('projPrev');
    const next = document.getElementById('projNext');
    function updateBar() {
      const max = projTrack.scrollWidth - projTrack.clientWidth;
      const pct = max > 0 ? (projTrack.scrollLeft / max) * 100 : 0;
      if (bar) bar.style.width = Math.max(12, pct) + '%';
    }
    projTrack.addEventListener('scroll', updateBar);
    function stepBy(dir) {
      const card = projTrack.querySelector('.proj-card');
      const w = card ? card.getBoundingClientRect().width + 24 : 400;
      if (pinned && pinRange > 0) {
        // pinned: drive via page scroll so the lerp keeps owning scrollLeft.
        // Track uses PIN_SCROLL_RATIO=1.4× extra distance in page space.
        window.scrollBy({ top: dir * w * PIN_SCROLL_RATIO, behavior: 'smooth' });
      } else {
        projTrack.scrollBy({ left: dir * w, behavior: 'smooth' });
      }
    }
    if (prev) prev.addEventListener('click', () => stepBy(-1));
    if (next) next.addEventListener('click', () => stepBy(1));
    updateBar();

    // highlight the card nearest the left edge of the track
    const projCards = Array.from(projTrack.querySelectorAll('.proj-card'));
    function updateActiveCard() {
      // focus point glides from the first card's centre to the last card's centre
      // as the row scrolls, so every card (including the last) gets its turn lit
      const rect = projTrack.getBoundingClientRect();
      const max = projTrack.scrollWidth - projTrack.clientWidth;
      const progress = max > 0 ? projTrack.scrollLeft / max : 0;
      const cardW = projCards[0] ? projCards[0].getBoundingClientRect().width : 400;
      const focus = rect.left + cardW / 2 + progress * Math.max(0, rect.width - cardW);
      let active = null, min = Infinity;
      projCards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - focus);
        if (d < min) { min = d; active = c; }
      });
      projCards.forEach((c) => c.classList.toggle('is-active', c === active));
    }
    projTrack.addEventListener('scroll', updateActiveCard, { passive: true });
    updateActiveCard();

    // map page scroll to horizontal scroll while pinned (lerped for slow, smooth motion)
    let targetTrackLeft = 0, currentTrackLeft = 0;
    function syncTargetFromScroll() {
      if (!pinned || pinRange <= 0) return;
      const total = pinRange * PIN_SCROLL_RATIO;
      const progress = Math.min(Math.max((window.scrollY - pinTop) / total, 0), 1);
      targetTrackLeft = progress * pinRange;
    }
    window.addEventListener('scroll', syncTargetFromScroll, { passive: true });

    function tickTrack() {
      if (pinned && pinRange > 0) {
        // tight lerp — the track tracks the page scroll almost 1:1, so the row
        // glides together with the wheel instead of stepping between cards
        const diff = targetTrackLeft - currentTrackLeft;
        if (Math.abs(diff) > 0.1) {
          currentTrackLeft += diff * 0.34;
          projTrack.scrollLeft = currentTrackLeft;
        }
      }
      requestAnimationFrame(tickTrack);
    }
    requestAnimationFrame(tickTrack);

    // dim the room while the projects row is mid-screen
    if (projPin && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => projPin.classList.toggle('is-lit', en.isIntersecting));
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 }).observe(projPin);
    }

    // mute offscreen videos, play visible ones
    const mediaIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        else v.pause();
      });
    }, { threshold: 0.35 });
    projTrack.querySelectorAll('video').forEach((v) => mediaIO.observe(v));

    sizeProjPin();
    window.addEventListener('load', sizeProjPin);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeProjPin);
  }

  // ---------- Scrollspy ----------
  const sectionMap = { about: 'about', exp: 'about', projects: 'work', recog: 'recog', contact: 'contact' };
  const spyEls = Object.keys(sectionMap).map((id) => document.getElementById(id)).filter(Boolean);
  const spyIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.3) return;
      const key = sectionMap[entry.target.id];
      if (!key) return;
      const btn = navItems.find((b) => b.dataset.mega === key);
      if (!btn) return;
      pillRest = btn;
      if (!openKey) { movePill(btn); }
    });
  }, { threshold: [0.3, 0.5] });
  spyEls.forEach((s) => spyIO.observe(s));
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
    'AI student, builder, mostly caffeinated.'
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

  function render(anim, f, blink) {
    ctx.clearRect(0, 0, W, H);
    // legs + shoes
    r(5, 16, 3, 3, C.pants); r(8, 16, 3, 3, C.pants);
    r(5, 19, 3, 1, C.shoe); r(8, 19, 3, 1, C.shoe);
    // torso, collar, placket
    r(4, 10, 8, 6, C.shirt);
    r(5, 10, 2, 1, C.collar); r(9, 10, 2, 1, C.collar); r(7, 11, 2, 2, C.collar);
    // sleeves with white trim
    r(2, 10, 2, 2, C.shirt); r(2, 12, 2, 1, C.trim);
    r(12, 10, 2, 2, C.shirt); r(12, 12, 2, 1, C.trim);

    // arms
    if (anim === 'wave') {
      r(2, 13, 2, 3, C.skin);
      r(13 + (f % 2), 5, 2, 6, C.skin);
    } else if (anim === 'yawn') {
      r(1, 3 + (f % 2), 2, 7, C.skin);
      r(13, 3 + (f % 2), 2, 7, C.skin);
    } else if (anim === 'type') {
      // forearms are hidden behind the laptop; hands drawn below
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
    if (anim === 'look') dx = [-1, 0, 1, 0][f % 4];
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
      r(2, 12 + (f % 2), 2, 2, C.skin);
      r(12, 12 + ((f + 1) % 2), 2, 2, C.skin);
    }
  }

  // ---- choreography ----
  const ANIMS = ['wave', 'type', 'yawn', 'look'];
  let visible = false, timer = null, lastAnim = '', hold = 0, override = null;
  let lastHide = performance.now() - 3000;   // first visit ~5 s after load if the page is idle
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

  function show() {
    visible = true;
    el.classList.add('is-in');
    const [a, b] = pickTwo();
    const plan = [['idle', 900], [a, 2600], [b, 2600], ['idle', 500]];
    let step = 0, stepStart = performance.now(), f = 0, blinkAt = performance.now() + 1600;
    timer = setInterval(() => {
      const now = performance.now();
      if (now - stepStart >= plan[step][1] + hold) {
        step++; stepStart = now; hold = 0;
        if (step >= plan.length) return hide();
      }
      f++;
      const anim = override && now < override.until ? override.anim : plan[step][0];
      let blink = false;
      if (now >= blinkAt) { blink = true; if (now >= blinkAt + 160) blinkAt = now + 1800 + Math.random() * 1500; }
      render(anim, f, blink);
    }, 200);
    render('idle', 0, false);
  }

  function hide() {
    clearInterval(timer); timer = null;
    el.classList.remove('is-in', 'is-talking');
    setTimeout(() => { visible = false; lastHide = performance.now(); }, 600);
    visible = true; // stays "busy" until the exit transition finishes
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
    if ((idle >= 3000 && gap >= 8000) || gap >= 45000) show();
  }, 1000);
})();
