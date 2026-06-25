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

/* ---------- hero particle effect ---------- */
(function(){
  var canvas = document.getElementById('hb-canvas');
  var hero   = document.querySelector('.hero-b');
  if (!canvas || !hero) return;

  var ctx = canvas.getContext('2d');
  var raf = 0;
  var particles = [];

  function setSize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function make() {
    var d = Math.random() * 600 + 100;
    return { x: Math.random() * canvas.width, y: Math.random() * canvas.height,
             speed: Math.random() / 5 + 0.1, opacity: 0.88,
             fadeStart: Date.now() + d, fadingOut: false };
  }

  function reset(p) {
    var d = Math.random() * 600 + 100;
    p.x = Math.random() * canvas.width; p.y = Math.random() * canvas.height;
    p.speed = Math.random() / 5 + 0.1;  p.opacity = 0.88;
    p.fadeStart = Date.now() + d;        p.fadingOut = false;
  }

  function init() {
    var n = Math.floor((canvas.width * canvas.height) / 7000);
    particles = [];
    for (var i = 0; i < n; i++) particles.push(make());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var now = Date.now();
    particles.forEach(function(p) {
      p.y -= p.speed;
      if (p.y < 0) reset(p);
      if (!p.fadingOut && now > p.fadeStart) p.fadingOut = true;
      if (p.fadingOut) { p.opacity -= 0.008; if (p.opacity <= 0) reset(p); }
      ctx.fillStyle = 'rgba(250,250,250,' + p.opacity + ')';
      ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
    });
    raf = requestAnimationFrame(draw);
  }

  setSize(); init();
  raf = requestAnimationFrame(draw);
  window.addEventListener('resize', function() { setSize(); init(); });
})();

/* ---------- photo strip — tap to expand on touch devices ---------- */
(function(){
  var strip = document.getElementById('photo-strip');
  if (!strip) return;
  strip.querySelectorAll('.cc').forEach(function(cc) {
    cc.addEventListener('click', function() {
      var isActive = cc.classList.contains('active');
      strip.querySelectorAll('.cc').forEach(function(c) { c.classList.remove('active'); });
      if (isActive) {
        strip.classList.remove('has-active');
      } else {
        cc.classList.add('active');
        strip.classList.add('has-active');
      }
    });
  });
})();

/* ---------- morph word cycling ---------- */
(function(){
  var el = document.querySelector('.morph-word');
  if (!el) return;

  var words = ['simple', 'intuitive', 'accessible', 'scalable'];
  var idx = 0;
  var INTERVAL = 2800;
  var OUT_DUR  = 420;

  function getStyle() {
    return document.body.getAttribute('data-morph') || 'slide';
  }

  function runCycle() {
    var style = getStyle();
    if (style === 'type') {
      typeOut(el.textContent);
    } else {
      el.classList.remove('morph-in');
      el.classList.add('morph-out');
      setTimeout(function(){
        idx = (idx + 1) % words.length;
        el.textContent = words[idx];
        el.classList.remove('morph-out');
        void el.offsetWidth; /* force reflow so animation restarts */
        el.classList.add('morph-in');
      }, OUT_DUR);
    }
  }

  function typeOut(current) {
    var i = current.length;
    function del() {
      if (i > 0) {
        el.textContent = current.slice(0, --i);
        setTimeout(del, 55);
      } else {
        idx = (idx + 1) % words.length;
        setTimeout(function(){ typeIn(words[idx]); }, 120);
      }
    }
    del();
  }

  function typeIn(word) {
    var j = 0;
    function typ() {
      el.textContent = word.slice(0, ++j);
      if (j < word.length) setTimeout(typ, 70);
    }
    typ();
  }

  document.body.setAttribute('data-morph', 'slide');

  setInterval(runCycle, INTERVAL);
})();
