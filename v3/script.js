/**
 * v3 Portfolio — Vanilla JS
 * Sidebar layout: theme toggle + scroll reveal + active nav + mobile drawer
 */

(function () {
  'use strict';

  /* ============================================
     Theme Toggle
     ============================================ */

  const THEME_KEY = 'v3-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const label = document.getElementById('themeLabel');
    if (label) {
      label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
  }

  function initTheme() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ============================================
     Scroll Reveal — IntersectionObserver
     ============================================ */

  function initScrollReveal() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     Active Nav Highlighting (Scrollspy)
     ============================================ */

  function initActiveNav() {
    const sections = document.querySelectorAll('section[data-section]');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    if (!sections.length || !navItems.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            navItems.forEach(function (item) {
              item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
            });
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '-10% 0px -55% 0px',
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ============================================
     Smooth Scroll for Nav Links
     ============================================ */

  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        e.preventDefault();
        closeMobileMenu();

        const offset = 24;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ============================================
     Mobile Menu (Slide-out Drawer)
     ============================================ */

  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    sidebar.classList.add('open');
    hamburger.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initMobileMenu() {
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        if (sidebar.classList.contains('open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }

    // Close on nav item click (mobile)
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(function (item) {
      item.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ============================================
     Init
     ============================================ */

  function init() {
    initTheme();
    initScrollReveal();
    initActiveNav();
    initSmoothScroll();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();