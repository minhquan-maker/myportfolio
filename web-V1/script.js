const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateNav();
});
function updateNav() {
  const ids = ['about','projects','college','life'];
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

const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function switchTab(e, tab) {
  document.querySelectorAll('.life-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.life-panel').forEach(p => p.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
}

// Life Section Image Slideshow
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
}
