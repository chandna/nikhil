/* Nikhil Chandna — Portfolio · interactions */
(function () {
  'use strict';

  /* ---------- URL params: hero direction + bare embed mode ---------- */
  var params = new URLSearchParams(location.search);
  var heroParam = params.get('hero');
  if (heroParam === 'a' || heroParam === 'b') {
    document.body.setAttribute('data-hero', heroParam);
  }
  if (params.get('bare') === '1') {
    document.body.classList.add('bare', 'no-scroll');
  }

  /* ---------- hero direction toggle ---------- */
  window.applyHero = function (letter) {
    var l = letter || document.body.getAttribute('data-hero') || 'a';
    document.body.setAttribute('data-hero', l);
    var a = document.querySelector('.hero-a');
    var b = document.querySelector('.hero-b');
    if (a) a.hidden = l !== 'a';
    if (b) b.hidden = l !== 'b';
    // reveal the now-visible hero immediately (CSS transition still animates)
    document.querySelectorAll('.hero:not([hidden]) .reveal').forEach(function (el) {
      el.classList.add('in');
    });
  };

  /* ---------- accordion case studies ---------- */
  document.querySelectorAll('.case-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var card = head.closest('.case');
      var open = card.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- number counters ---------- */
  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1100, start = null;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var v = Math.round(ease(p) * target);
      el.textContent = v + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- scroll reveal + counters via IntersectionObserver ---------- */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(animateCount);
        if (e.target.matches('[data-count]')) animateCount(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    // counters that live outside .reveal blocks
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (!el.closest('.reveal')) io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  /* ---------- timer-based safety net: reveal anything already in view ----------
     IntersectionObserver only fires on a paint frame; if the tab is slow to
     composite (or never does), above-the-fold content could stay hidden. This
     timer guarantees in-view .reveal blocks resolve regardless of paint. */
  function revealInView() {
    var vh = window.innerHeight || 800;
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      if (el.closest('.hero[hidden]')) return;
      var top = el.getBoundingClientRect().top;
      if (top < vh * 0.95) {
        el.classList.add('in');
        el.querySelectorAll('[data-count]').forEach(animateCount);
        if (el.matches('[data-count]')) animateCount(el);
      }
    });
  }
  revealInView();
  window.addEventListener('load', revealInView);
  setTimeout(revealInView, 250);

  /* ---------- smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var id = a.getAttribute('href');
      if (id === '#' || id === '#top') {
        ev.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        return;
      }
      var t = document.querySelector(id);
      if (t) {
        ev.preventDefault();
        var y = t.getBoundingClientRect().top + window.pageYOffset - 8;
        window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------- init ---------- */
  window.applyHero();
})();
