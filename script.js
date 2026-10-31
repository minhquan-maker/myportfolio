/* Minh Quan — page transition, scroll reveal, certificate modal */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var curtain = document.querySelector('.curtain');
  var root = document.documentElement;

  /* --- curtain: reveal on arrival --- */
  function openCurtain() {
    if (!curtain) return;
    if (!root.classList.contains('is-entering')) return;
    requestAnimationFrame(function () {
      setTimeout(function () {
        curtain.classList.add('leave');
        root.classList.remove('is-entering');
        setTimeout(function () { curtain.classList.remove('leave'); }, 900);
      }, reduce ? 0 : 550);
    });
  }
  openCurtain();
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && curtain) { curtain.classList.remove('cover', 'leave'); root.classList.remove('is-entering'); }
  });

  /* --- curtain: cover on leave --- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;                 // same page / hash only
    if (!/(\.html?|\/)$/.test(url.pathname)) return;                // pdf, images etc.
    if (!curtain || reduce) return;
    e.preventDefault();
    try { sessionStorage.setItem('mq-t', '1'); } catch (_) {}
    curtain.classList.add('cover');
    setTimeout(function () { location.href = a.href; }, 1000);
  });

  /* --- scroll reveal --- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('visible'); }); }

  /* --- video autoplay while on screen --- */
  var vids = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window && vids.length) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (en) { var v = en.target; if (en.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); } });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vo.observe(v); });
  }

  /* --- certificate modal --- */
  var modal = document.getElementById('cert-modal');
  if (modal) {
    var body = modal.querySelector('.modal__body'), title = modal.querySelector('[data-title]');
    var close = function () { modal.classList.remove('open'); body.innerHTML = ''; };
    document.querySelectorAll('[data-cert-url]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var u = b.getAttribute('data-cert-url');
        title.textContent = b.getAttribute('data-cert-title') || 'Certificate';
        body.innerHTML = '';
        var el = /\.pdf$/i.test(u) ? document.createElement('iframe') : document.createElement('img');
        el.src = u; if (el.tagName === 'IMG') el.alt = title.textContent;
        body.appendChild(el); modal.classList.add('open');
      });
    });
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.hasAttribute('data-close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();
