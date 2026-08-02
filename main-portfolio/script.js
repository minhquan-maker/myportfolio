// Nav frosted glass
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-edu, .reveal-school').forEach(el => revealObserver.observe(el));

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

// Active nav link scrollspy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
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
