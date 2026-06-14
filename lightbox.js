/* Fullscreen slideshow / lightbox for the device-framed mock marquee */
(function () {
  'use strict';
  var strip = document.querySelector('.mockstrip');
  if (!strip) return;

  // Build the unique mock list (dedupe the duplicated marquee set), in order.
  var items = [];
  var seen = {};
  strip.querySelectorAll('.dvc').forEach(function (d) {
    var img = d.querySelector('img');
    if (!img) return;
    var src = img.getAttribute('src');
    if (seen[src]) return;
    seen[src] = true;
    items.push({ src: src, cap: img.getAttribute('alt') || '' });
  });
  if (!items.length) return;

  // Overlay
  var ov = document.createElement('div');
  ov.className = 'lb';
  ov.setAttribute('aria-hidden', 'true');
  ov.innerHTML =
    '<button class="lb-close" aria-label="Close (Esc)">\u2715</button>' +
    '<button class="lb-nav lb-prev" aria-label="Previous">\u2039</button>' +
    '<figure class="lb-stage"><img class="lb-img" alt="" /><figcaption class="lb-cap"></figcaption></figure>' +
    '<button class="lb-nav lb-next" aria-label="Next">\u203a</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(ov);

  var img = ov.querySelector('.lb-img');
  var cap = ov.querySelector('.lb-cap');
  var count = ov.querySelector('.lb-count');
  var prevBtn = ov.querySelector('.lb-prev');
  var nextBtn = ov.querySelector('.lb-next');
  var closeBtn = ov.querySelector('.lb-close');
  var idx = 0;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    var it = items[idx];
    img.src = it.src;
    img.alt = it.cap;
    cap.textContent = it.cap;
    count.innerHTML = '<b>' + String(idx + 1).padStart(2, '0') + '</b> / ' + String(items.length).padStart(2, '0');
    if (!prefersReduced) { img.classList.remove('pop'); void img.offsetWidth; img.classList.add('pop'); }
  }
  function open(i) {
    idx = (i + items.length) % items.length;
    render();
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }
  function close() {
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  function go(step) { idx = (idx + step + items.length) % items.length; render(); }

  // Open from any frame (maps a duplicate back to its unique index by src).
  strip.querySelectorAll('.dvc').forEach(function (d) {
    d.addEventListener('click', function () {
      var im = d.querySelector('img');
      if (!im) return;
      var src = im.getAttribute('src');
      var found = items.findIndex(function (x) { return x.src === src; });
      open(found < 0 ? 0 : found);
    });
  });

  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); go(1); });
  closeBtn.addEventListener('click', function (e) { e.stopPropagation(); close(); });
  // Click backdrop (but not the image or buttons) closes.
  ov.addEventListener('click', function (e) { if (e.target === ov || e.target.classList.contains('lb-stage')) close(); });

  document.addEventListener('keydown', function (e) {
    if (!ov.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });
})();
