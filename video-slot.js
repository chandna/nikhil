/* ============================================================
   <video-slot> — user-fillable VIDEO placeholder (accepts .mov)
   ------------------------------------------------------------
   Drop-in sibling of <image-slot>, but for video. The user drags a
   video file (incl. QuickTime .mov) onto it, or clicks to browse.
   The file is stored in IndexedDB keyed by the slot id, so it
   survives reloads on this machine (videos are far too large for the
   JSON sidecar image-slot uses).

   .mov note: most screen-recording .mov files are H.264/AAC — the
   same codecs as .mp4, just a different container. Chromium won't
   register the QuickTime MIME, so we re-wrap the bytes as video/mp4
   before handing them to <video>, which lets the demuxer play them.
   If a .mov is HEVC/ProRes (rare for screen recordings) it still
   won't decode in Chrome — we detect the failure and tell the user.

   Attributes:
     id           Persistence key (REQUIRED to survive reload).
     radius       Corner radius px (default 14).
     placeholder  Empty-state caption.
     poster       Optional poster image URL for the empty/loading state.
     autoplay     If present, muted-autoplay-loop once filled.
   Size comes from ordinary CSS (width/height) on the element.
   ============================================================ */
(() => {
  const DB_NAME = 'om-video-slots';
  const STORE = 'blobs';
  const ACCEPT_EXT = /\.(mov|mp4|m4v|webm|ogg|ogv|mkv|avi)$/i;

  /* ---------- tiny IndexedDB blob store ---------- */
  let _dbP = null;
  function db() {
    if (_dbP) return _dbP;
    _dbP = new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => {
        if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE);
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return _dbP;
  }
  async function idbGet(k) {
    const d = await db();
    return new Promise((res, rej) => {
      const t = d.transaction(STORE, 'readonly').objectStore(STORE).get(k);
      t.onsuccess = () => res(t.result || null);
      t.onerror = () => rej(t.error);
    });
  }
  async function idbSet(k, v) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(v, k);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
  async function idbDel(k) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(k);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }

  const isVideoFile = (f) =>
    !!f && ((f.type && f.type.startsWith('video/')) || ACCEPT_EXT.test(f.name || ''));

  // Re-wrap QuickTime / unknown-type blobs as video/mp4 so Chromium's
  // demuxer will attempt H.264 playback regardless of the .mov container.
  function playbackBlob(blob, name) {
    const t = blob.type || '';
    const looksMov = /quicktime/i.test(t) || /\.mov$/i.test(name || '') || !t;
    if (looksMov) return new Blob([blob], { type: 'video/mp4' });
    return blob;
  }

  const css =
    ':host{display:block;position:relative;width:100%;height:320px;' +
    '  font:13px/1.4 "JetBrains Mono",ui-monospace,Menlo,monospace;color:rgba(14,14,12,.6)}' +
    '.frame{position:absolute;inset:0;overflow:hidden;border-radius:14px;' +
    '  background:#0e0e0c;display:flex;align-items:center;justify-content:center}' +
    'video{width:100%;height:100%;object-fit:contain;background:#0e0e0c;display:none}' +
    ':host([data-filled]) video{display:block}' +
    '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' +
    '  justify-content:center;gap:10px;text-align:center;padding:18px;box-sizing:border-box;' +
    '  cursor:pointer;user-select:none;color:rgba(244,241,234,.62);' +
    '  background:repeating-linear-gradient(135deg,rgba(244,241,234,.03) 0 12px,transparent 12px 24px)}' +
    ':host([data-filled]) .empty{display:none}' +
    '.empty svg{opacity:.7}' +
    '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.04em;text-transform:uppercase;font-size:11px}' +
    '.empty .sub{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,241,234,.4)}' +
    '.empty .sub u{text-underline-offset:2px}' +
    '.empty:hover .sub u{color:rgba(244,241,234,.85)}' +
    '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(244,241,234,.22);' +
    '  border-radius:14px;transition:border-color .12s}' +
    ':host([data-filled]) .ring{display:none}' +
    ':host([data-over]) .frame{outline:2px solid #f4f1ea;outline-offset:-2px}' +
    ':host([data-over]) .ring{border-color:#f4f1ea}' +
    '.ctl{position:absolute;top:10px;right:10px;display:flex;gap:6px;opacity:0;' +
    '  pointer-events:none;transition:opacity .14s;z-index:3}' +
    ':host([data-filled]:hover) .ctl{opacity:1;pointer-events:auto}' +
    '.ctl button{appearance:none;border:0;border-radius:6px;padding:6px 11px;cursor:pointer;' +
    '  background:rgba(14,14,12,.72);color:#f4f1ea;font:10px/1 "JetBrains Mono",monospace;' +
    '  letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(6px)}' +
    '.ctl button:hover{background:rgba(14,14,12,.92)}' +
    '.badge{position:absolute;left:10px;bottom:10px;z-index:3;font-size:10px;letter-spacing:.1em;' +
    '  text-transform:uppercase;color:rgba(244,241,234,.55);background:rgba(14,14,12,.55);' +
    '  padding:4px 8px;border-radius:5px;pointer-events:none;display:none}' +
    ':host([data-filled]) .badge{display:block}' +
    '.err{position:absolute;left:12px;right:12px;bottom:12px;z-index:4;color:#fff;font-size:11px;' +
    '  line-height:1.45;background:rgba(160,40,30,.92);padding:8px 10px;border-radius:6px}' +
    '.spin{width:26px;height:26px;border:2px solid rgba(244,241,234,.25);border-top-color:#f4f1ea;' +
    '  border-radius:50%;animation:vs-spin .8s linear infinite;display:none}' +
    ':host([data-loading]) .spin{display:block}:host([data-loading]) .empty>.cap,' +
    ':host([data-loading]) .empty>.sub,:host([data-loading]) .empty>svg{display:none}' +
    '@keyframes vs-spin{to{transform:rotate(360deg)}}';

  const icon =
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m10 9 5 3-5 3z"/></svg>';

  class VideoSlot extends HTMLElement {
    static get observedAttributes() { return ['radius', 'placeholder', 'poster', 'id']; }

    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + css + '</style>' +
        '<div class="frame">' +
        '  <video part="video" playsinline preload="metadata"></video>' +
        '  <div class="empty" part="empty">' + icon +
        '    <div class="cap"></div>' +
        '    <div class="sub">drag a video here · or <u>browse files</u></div>' +
        '    <div class="spin"></div>' +
        '  </div>' +
        '  <div class="ring"></div>' +
        '  <div class="badge"></div>' +
        '</div>' +
        '<div class="ctl">' +
        '  <button data-act="replace">Replace</button>' +
        '  <button data-act="clear">Remove</button>' +
        '</div>' +
        '<input type="file" accept="video/*,.mov,.mp4,.m4v,.webm" hidden>';
      this._frame = root.querySelector('.frame');
      this._video = root.querySelector('video');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._ring = root.querySelector('.ring');
      this._badge = root.querySelector('.badge');
      this._input = root.querySelector('input');
      this._err = null;
      this._depth = 0;
      this._url = null;

      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', (e) => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') this._input.click();
        if (act === 'clear') this._clear();
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      this._video.addEventListener('error', () => this._onPlaybackError());
    }

    connectedCallback() {
      if (!this.id && !VideoSlot._warned) {
        VideoSlot._warned = true;
        console.warn('<video-slot> without an id will not persist its video.');
      }
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) =>
        this.addEventListener(t, this));
      this._applyStatic();
      this._hydrate();
    }

    disconnectedCallback() {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) =>
        this.removeEventListener(t, this));
      this._revoke();
    }

    attributeChangedCallback() { if (this.shadowRoot) { this._applyStatic(); this._hydrate(); } }

    _applyStatic() {
      const n = parseFloat(this.getAttribute('radius'));
      const r = (Number.isFinite(n) ? n : 14) + 'px';
      this._frame.style.borderRadius = r;
      this._ring.style.borderRadius = r;
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop a video';
      const poster = this.getAttribute('poster');
      if (poster) this._video.setAttribute('poster', poster);
      const auto = this.hasAttribute('autoplay');
      this._video.muted = true;
      this._video.loop = true;
      this._video.controls = true;
      this._autoplay = auto;
    }

    async _hydrate() {
      if (!this.id) return;
      try {
        const blob = await idbGet(this.id);
        if (blob) this._show(blob);
      } catch (e) { /* ignore */ }
    }

    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        e.preventDefault(); e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        if (--this._depth <= 0) { this._depth = 0; this.removeAttribute('data-over'); }
      } else if (e.type === 'drop') {
        e.preventDefault(); e.stopPropagation();
        this._depth = 0; this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }

    async _ingest(file) {
      this._setError(null);
      if (!isVideoFile(file)) {
        this._setError('That doesn’t look like a video. Drop a .mov, .mp4, .webm or .m4v file.');
        return;
      }
      this.setAttribute('data-loading', '');
      try {
        if (this.id) await idbSet(this.id, file);
        this._show(file);
      } catch (e) {
        this.removeAttribute('data-loading');
        // Likely storage quota — still play it for this session.
        this._setError('Couldn’t save the video for next time (too large to store), but it’ll play now.');
        this._show(file);
      }
    }

    _show(blob) {
      this._revoke();
      const pb = playbackBlob(blob, blob.name);
      this._url = URL.createObjectURL(pb);
      this._video.src = this._url;
      this._video.load();
      const onReady = () => {
        this.removeAttribute('data-loading');
        this.setAttribute('data-filled', '');
        const mb = (blob.size / (1024 * 1024));
        this._badge.textContent =
          (/\.mov$/i.test(blob.name || '') || /quicktime/i.test(blob.type) ? 'MOV · ' : '') +
          (mb >= 1 ? mb.toFixed(1) + ' MB' : Math.round(blob.size / 1024) + ' KB');
        if (this._autoplay) { const p = this._video.play(); if (p) p.catch(() => {}); }
        this._video.removeEventListener('loadeddata', onReady);
      };
      this._video.addEventListener('loadeddata', onReady);
      this.setAttribute('data-filled', '');
      this.removeAttribute('data-loading');
    }

    _onPlaybackError() {
      // Fires for HEVC/ProRes .mov that Chromium can't decode.
      if (!this._url) return;
      this._setError(
        'This video’s codec can’t play in this browser (often HEVC/ProRes .mov). ' +
        'Re-export as H.264 .mp4 and drop it again.'
      );
    }

    async _clear() {
      this._revoke();
      this._video.removeAttribute('src');
      this._video.load();
      this.removeAttribute('data-filled');
      this._badge.textContent = '';
      this._setError(null);
      if (this.id) { try { await idbDel(this.id); } catch (e) {} }
    }

    _revoke() {
      if (this._url) { try { URL.revokeObjectURL(this._url); } catch (e) {} this._url = null; }
    }

    _setError(msg) {
      if (this._err) { this._err.remove(); this._err = null; }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err'; d.textContent = msg;
      this._frame.appendChild(d);
      this._err = d;
      setTimeout(() => { if (this._err === d) { d.remove(); this._err = null; } }, 6000);
    }
  }

  if (!customElements.get('video-slot')) customElements.define('video-slot', VideoSlot);
})();
