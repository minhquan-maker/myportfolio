/**
 * Nguyen Minh Quan — Portfolio
 * script.js — Interactions, Motion & Scroll Effects
 */

'use strict';

(function () {

  /* ── Utility ────────────────────────────────────────────────── */
  function offset(el) {
    var r = el.getBoundingClientRect();
    return r.top + document.documentElement.scrollTop;
  }

  /* ── Nav scroll class ───────────────────────────────────────── */
  function setScrolled() {
    var nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();

  /* ── Active nav link on scroll ──────────────────────────────── */
  function setActiveLink() {
    var links = document.querySelectorAll('.nav__links a');
    var sections = ['about', 'experiences', 'projects', 'publications', 'recognition', 'contact'];
    var y = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      var top = offset(sec);
      var bot = top + sec.offsetHeight;
      var a = document.querySelector('.nav__links a[href="#' + id + '"]');
      if (!a) return;
      if (y >= top && y < bot) {
        links.forEach(function (l) { l.classList.remove('active'); });
        a.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ── Mobile nav toggle ──────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var overlay = document.getElementById('overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Education expand / collapse ────────────────────────────── */
  function initEduExpand() {
    var btn = document.getElementById('edu-expand-btn');
    if (!btn) return;
    var hiddenEntries = document.querySelectorAll('.edu-entry--hidden');
    var expanded = false;

    btn.addEventListener('click', function () {
      expanded = !expanded;
      btn.classList.toggle('expanded', expanded);
      hiddenEntries.forEach(function (entry) {
        if (expanded) {
          entry.classList.remove('edu-entry--hidden');
          entry.classList.remove('visible');
          setTimeout(function () { entry.classList.add('visible'); }, 20);
        } else {
          entry.classList.add('edu-entry--hidden');
        }
      });
      btn.querySelector('span').textContent = expanded ? 'Show less' : 'Show all educations';
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────────── */
  function reveal() {
    var els = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.style.getPropertyValue('--delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Orbital SVG animation on load ─────────────────────────── */
  function animateOrbital() {
    var orbital = document.querySelector('.hero__orbital ellipse');
    if (!orbital) return;
    // Trigger the CSS animation after a short delay
    orbital.style.animation = 'none';
    orbital.offsetHeight; // reflow
    orbital.style.animation = '';
  }

  /* ── Hero entrance reset on tab show ────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
      document.querySelectorAll('.hero__eyebrow, .hero__name, .hero__title, .hero__bio-text, .hero__cta').forEach(function (el) {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = '';
      });
      animateOrbital();
    }
  });

  /* ── Smooth scroll ──────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var navH = document.getElementById('nav') ? document.getElementById('nav').offsetHeight : 72;
      var top = offset(target) - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Toast helper ─────────────────────────────────────────── */
  window.showToast = function (msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 4000);
  };

  /* ── Experience modals ────────────────────────────────────── */
  function initExpModals() {
    var overlay = document.getElementById('exp-modal-overlay');
    if (!overlay) return;
    var cards = document.querySelectorAll('.exp-card');
    var activeModal = null;
    var prevFocus = null;

    function openModal(id) {
      var modal = document.getElementById('modal-' + id);
      if (!modal) return;
      activeModal = modal;
      prevFocus = document.activeElement;
      modal.hidden = false;
      overlay.classList.add('is-open');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var closeBtn = modal.querySelector('.exp-modal__close');
      if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 80);
    }

    function closeModal() {
      if (!activeModal) return;
      activeModal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      var m = activeModal;
      activeModal = null;
      setTimeout(function () { m.hidden = true; }, 380);
      document.body.style.overflow = '';
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-exp');
        if (id) openModal(id);
      });
      var btn = card.querySelector('.exp-card__btn');
      if (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var id = card.getAttribute('data-exp');
          if (id) openModal(id);
        });
      }
    });

    overlay.addEventListener('click', closeModal);

    document.querySelectorAll('.exp-modal__close').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeModal) closeModal();
    });
  }

  /* ── Certificate proof modals ──────────────────────────────── */
  function initProofModals() {
    var overlay = document.getElementById('proof-overlay');
    var modal = document.getElementById('proof-modal');
    if (!overlay || !modal) return;
    var proofPdf = document.getElementById('proof-pdf');
    var proofImg = document.getElementById('proof-img');
    var proofIssuer = document.getElementById('proof-issuer');
    var proofDate = document.getElementById('proof-date');
    var prevFocus = null;

    function openProof(cert, issuer, date) {
      prevFocus = document.activeElement;
      var isImage = /\.(jpe?g|png|gif|webp)$/i.test(cert);

      proofPdf.hidden = isImage;
      proofImg.hidden = !isImage;

      if (isImage) {
        proofImg.src = cert;
      } else {
        proofPdf.src = cert + '#page=1';
      }
      proofIssuer.textContent = issuer || '';
      proofDate.textContent = date || '';

      modal.hidden = false;
      overlay.classList.add('is-open');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeProof() {
      modal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      setTimeout(function () {
        modal.hidden = true;
        proofPdf.src = '';
        proofImg.src = '';
      }, 380);
      document.body.style.overflow = '';
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    }

    document.querySelectorAll('.recog-award__proof').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openProof(
          btn.getAttribute('data-cert'),
          btn.getAttribute('data-issuer'),
          btn.getAttribute('data-date')
        );
      });
    });

    overlay.addEventListener('click', closeProof);
    modal.querySelector('.proof-modal__close').addEventListener('click', closeProof);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProof();
    });
  }

  /* ── Project modals (View more) ───────────────────────────── */
  function initProjModals() {
    var overlay = document.getElementById('proj-modal-overlay');
    if (!overlay) return;
    var buttons = document.querySelectorAll('.project-view');
    var activeModal = null;
    var prevFocus = null;

    function openModal(id) {
      var modal = document.getElementById('modal-' + id);
      if (!modal) return;
      activeModal = modal;
      prevFocus = document.activeElement;
      modal.hidden = false;
      overlay.hidden = false;
      overlay.classList.add('is-open');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var closeBtn = modal.querySelector('.exp-modal__close');
      if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 80);
    }

    function closeModal() {
      if (!activeModal) return;
      activeModal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      var m = activeModal;
      activeModal = null;
      setTimeout(function () {
        m.hidden = true;
        overlay.hidden = true;
      }, 380);
      document.body.style.overflow = '';
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-project');
        if (id) openModal(id);
      });
    });

    overlay.addEventListener('click', closeModal);

    document.querySelectorAll('#modal-aquaguard .exp-modal__close, #modal-drone .exp-modal__close, #modal-carbon .exp-modal__close').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeModal) closeModal();
    });
  }

  /* ── Publications: Show details toggle ─────────────────────── */
  function initPubToggle() {
    var btn = document.getElementById('pub-toggle');
    var panel = document.getElementById('pub-detail');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (open) {
        panel.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.pub-toggle__label').textContent = 'Show details';
        setTimeout(function () { panel.hidden = true; }, 450);
      } else {
        panel.hidden = false;
        // next frame so transition kicks in
        requestAnimationFrame(function () {
          panel.classList.add('is-open');
        });
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.pub-toggle__label').textContent = 'Hide details';
      }
    });
  }

  /* ── Init ─────────────────────────────────────────────────── */
  window.addEventListener('load', function () {
    setActiveLink();
    reveal();
    animateOrbital();
    initEduExpand();
    initExpModals();
    initProofModals();
    initProjModals();
    initPubToggle();
  });

})();
