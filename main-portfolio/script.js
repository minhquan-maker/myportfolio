// Nav frosted glass
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// Scroll reveal with stagger
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const group = entry.target.closest('[data-stagger-group]');
      if (group) {
        const siblings = Array.from(group.querySelectorAll('.reveal:not(.visible), .reveal-edu:not(.visible), .reveal-school:not(.visible)'));
        siblings.forEach((el, i) => {
          el.style.transitionDelay = `${i * 0.1}s`;
          el.classList.add('visible');
        });
      } else {
        entry.target.classList.add('visible');
      }
    } else {
      entry.target.style.transitionDelay = '';
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-edu, .reveal-school, .deco-shape').forEach((el) => revealObserver.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animated counter for hero stats — runs once
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  document.querySelectorAll('.stat__number').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)(.+)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let current = 0;
    const duration = 1200;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      el.innerHTML = current + '<span class="accent">' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
const heroStats = document.querySelector('.hero__stats');
if (heroStats) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  }, { threshold: 0.5 });
  statsObs.observe(heroStats);
}

// Active nav link scrollspy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  if (atBottom) current = sections[sections.length - 1]?.getAttribute('id') || current;
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});

// Project sliders
document.querySelectorAll('.project-slider').forEach((slider) => {
  const track = slider.querySelector('.project-slider__track');
  const slides = slider.querySelectorAll('.project-slider__slide');
  const prev = slider.querySelector('.project-slider__btn--prev');
  const next = slider.querySelector('.project-slider__btn--next');
  const dots = slider.querySelectorAll('.project-slider__dot');
  if (!track || !slides.length) return;
  let index = 0;

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((dot, j) => dot.classList.toggle('is-active', j === index));
  }

  prev?.addEventListener('click', (e) => { e.stopPropagation(); go(index - 1); });
  next?.addEventListener('click', (e) => { e.stopPropagation(); go(index + 1); });
  dots.forEach((dot, j) => dot.addEventListener('click', (e) => { e.stopPropagation(); go(j); }));
});

// Hide broken slider images
document.querySelectorAll('.project-slider__slide img').forEach((img) => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
  if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
});

// Under-development toast
(function() {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  let timer;

  document.querySelectorAll('.is-soon').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      toast.textContent = btn.dataset.msg || 'Coming soon — we will publish again soon.';
      clearTimeout(timer);
      toast.classList.add('is-visible');
      timer = setTimeout(function() { toast.classList.remove('is-visible'); }, 3200);
    });
  });
})();

// Experience collapse toggle
(function() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  const btns = timeline.querySelectorAll('.exp-show-more__btn');
  const hiddenItems = timeline.querySelectorAll('.exp-overflow .reveal');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const expanded = timeline.classList.toggle('is-expanded');
      if (expanded) {
        hiddenItems.forEach(function(el, i) {
          setTimeout(function() { el.classList.add('visible'); }, i * 150);
        });
      } else {
        hiddenItems.forEach(function(el) { el.classList.remove('visible'); });
      }
      btn.setAttribute('aria-expanded', expanded);
    });
  });
})();
