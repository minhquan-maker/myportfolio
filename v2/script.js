/* ─── REDUCED MOTION CHECK ─── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll('a, button, .proj-card, .life-card, .award-cell, .exp-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  function animateCursor() {
    if (!prefersReducedMotion) {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
    } else {
      curX = mouseX;
      curY = mouseY;
    }
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ═══════════════════════════════════════
   DARK / LIGHT MODE TOGGLE
═══════════════════════════════════════ */
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Restore saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

/* ═══════════════════════════════════════
   TEXT SCRAMBLE EFFECT
═══════════════════════════════════════ */
function scrambleText(el, finalText, speed = 40) {
  if (prefersReducedMotion) {
    el.textContent = finalText;
    el.classList.add('done');
    return;
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let iteration = 0;
  const totalIterations = finalText.length + 8;

  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((char, idx) => {
        if (idx < iteration) return finalText[idx];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    iteration += 0.5;
    if (iteration >= totalIterations) {
      clearInterval(interval);
      el.textContent = finalText;
      el.classList.add('done');
    }
  }, speed);
}

const heroName = document.querySelector('h1 em');
if (heroName) {
  const finalText = heroName.textContent;
  heroName.textContent = '';
  // Trigger scramble after hero entrance animation (800ms + stagger delays)
  setTimeout(() => scrambleText(heroName, finalText, 30), 1200);
}

/* ═══════════════════════════════════════
   VANILLA-TILT ON PROJECT CARDS
═══════════════════════════════════════ */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.proj-card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.1,
  });
}

/* ═══════════════════════════════════════
   MAGNETIC BUTTONS (nav links)
═══════════════════════════════════════ */
document.querySelectorAll('.nav-links a').forEach(link => {
  if (prefersReducedMotion) return;

  link.addEventListener('mousemove', e => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translate(0, 0)';
  });
});

/* ═══════════════════════════════════════
   ENHANCED SCROLL REVEAL
═══════════════════════════════════════ */
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger by index within the same section
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(e.target);
        setTimeout(() => {
          e.target.classList.add('visible');
        }, idx * 60);
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ═══════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateNav();
}, { passive: true });

function updateNav() {
  const ids = ['about','projects','college','life','contact'];
  const y = window.scrollY + 130;
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
      const link = document.querySelector(`[data-nav="${id}"]`);
      if (link) link.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════
   LIFE TABS
═══════════════════════════════════════ */
function switchTab(e, tab) {
  document.querySelectorAll('.life-tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
    b.setAttribute('tabindex', '-1');
  });
  document.querySelectorAll('.life-panel').forEach(p => p.classList.remove('active'));
  e.currentTarget.classList.add('active');
  e.currentTarget.setAttribute('aria-selected', 'true');
  e.currentTarget.setAttribute('tabindex', '0');
  const panel = document.getElementById('panel-' + tab);
  if (panel) panel.classList.add('active');
}

/* ─── Keyboard tabs ─── */
document.querySelectorAll('.life-tab').forEach(tab => {
  tab.addEventListener('keydown', e => {
    const tabs = Array.from(document.querySelectorAll('.life-tab'));
    const idx = tabs.indexOf(e.currentTarget);
    let next;
    if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
    else return;
    e.preventDefault();
    next.focus();
    next.click();
  });
});

/* ═══════════════════════════════════════
   LIFE SLIDESHOW
═══════════════════════════════════════ */
const lifeTrack = document.querySelector('.life-slider-track');
const lifeSlides = document.querySelectorAll('.life-slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if (lifeTrack && lifeSlides.length > 0) {
  let currentSlide = 0;

  function updateSlide() {
    lifeTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % lifeSlides.length;
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + lifeSlides.length) % lifeSlides.length;
    updateSlide();
  });

  lifeTrack.setAttribute('tabindex', '0');
  lifeTrack.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + lifeSlides.length) % lifeSlides.length;
      updateSlide();
    } else if (e.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % lifeSlides.length;
      updateSlide();
    }
  });
}

/* ═══════════════════════════════════════
   AUTO YEAR IN FOOTER
═══════════════════════════════════════ */
const footerYear = document.querySelector('.footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════
   CONTACT FORM (EmailJS)
   To enable: sign up at emailjs.com, create a service,
   add your EMAILJS_USER_ID, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID below.
   Then uncomment the emailjs SDK script in index.html.
═══════════════════════════════════════ */

/* ═══════════════════════════════════════
   GSAP SCROLL ANIMATIONS
═══════════════════════════════════════ */
if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  /* Hero parallax — name moves up as you scroll */
  gsap.to('h1.fu', {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  /* Hero grid background parallax */
  gsap.to('.hero-grid-bg', {
    y: 60,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });

  /* Hero number watermark parallax */
  gsap.to('.hero-number', {
    y: -120,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  /* Section headings — fade up on scroll */
  document.querySelectorAll('h2.reveal').forEach(heading => {
    gsap.fromTo(heading,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* Awards — horizontal scroll on desktop */
  const awardsRow = document.querySelector('.awards-row');
  if (awardsRow && window.innerWidth > 960) {
    gsap.to('.awards-row', {
      x: () => -(awardsRow.scrollWidth - window.innerWidth + 96),
      ease: 'none',
      scrollTrigger: {
        trigger: '.awards-row',
        start: 'top center',
        end: () => `+=${awardsRow.scrollWidth}`,
        scrub: 1,
        pin: false,
        anticipatePin: 1,
      },
    });
  }

  /* Pinned cinematic section — About section title */
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => document.querySelector('#about h2')?.classList.add('pinned-animate'),
    onLeaveBack: () => document.querySelector('#about h2')?.classList.remove('pinned-animate'),
  });
}

/* ═══════════════════════════════════════
   LENIS SMOOTH SCROLL
═══════════════════════════════════════ */
if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Integrate Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.querySelector('.submit-text').textContent;
    btn.querySelector('.submit-text').textContent = 'Sending...';
    btn.disabled = true;

    // Replace these with your EmailJS credentials
    const EMAILJS_USER_ID = 'YOUR_USER_ID';
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    try {
      // Option A: EmailJS (uncomment after setting credentials above)
      // await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm, EMAILJS_USER_ID);

      // Option B: Formspree (free, no signup needed)
      // Replace the form action with: https://formspree.io/f/YOUR_FORM_ID
      // Then remove this JS block and use native form submission.

      // Simulate success for demo purposes
      btn.classList.add('success');
      contactForm.reset();
    } catch (err) {
      btn.querySelector('.submit-text').textContent = originalText;
      btn.disabled = false;
      console.error('Form submission failed:', err);
    }
  });
}
