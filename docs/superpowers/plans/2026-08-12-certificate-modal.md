# Certificate Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Open all Recognition certificate files in an accessible in-page modal instead of a new browser tab.

**Architecture:** Keep the static three-file site architecture. Certificate links become data-driven triggers; one reusable modal is added to `index.html`, modal presentation rules go in `style.css`, and a focused JavaScript module creates the correct native preview element (`iframe` for PDF, `img` for images), controls focus, and locks background scrolling.

**Tech Stack:** Plain HTML, CSS, and vanilla JavaScript; native browser PDF iframe rendering; no dependencies or build step.

## Global Constraints

- All six certificate links under the Honors list must open in-page.
- PDF previews use an iframe; image previews use an img element.
- The existing Recognition layout and typography remain unchanged.
- No other external links change behavior.
- No new libraries, assets, or build tooling.
- Modal closes through close button, backdrop click, or Escape.
- Opening locks background scroll; closing restores it and returns focus to the trigger.
- Modal uses `role="dialog"` and `aria-modal="true"`.

---

### Task 1: Add modal markup and certificate trigger metadata

**Files:**
- Modify: `main-portfolio/index.html:579-620` for six certificate links
- Modify: `main-portfolio/index.html:724-726` to insert the reusable modal before the script tag

**Interfaces:**
- Produces six `.certificate-trigger` anchors with `data-cert-url` and `data-cert-title`.
- Produces `#certificate-modal`, `#certificate-modal-title`, `#certificate-modal-content`, and `#certificate-modal-fallback` for the JavaScript module.

- [ ] **Step 1: Replace the six certificate link attributes**

Keep each existing `href` unchanged for progressive fallback, remove `target="_blank"`, and add the trigger class and title metadata. The first link should become:

```html
<a href="assets/certificates/03_1stplace_epics2026_asu/1stplace_epics2026_asu.pdf"
   class="recog-item__proof certificate-trigger"
   data-cert-url="assets/certificates/03_1stplace_epics2026_asu/1stplace_epics2026_asu.pdf"
   data-cert-title="First Place · EPICS 8TH">View Certificate <span aria-hidden="true">↗</span></a>
```

Apply the same structure to the remaining five links using their existing href and visible award title.

- [ ] **Step 2: Add the reusable modal markup before the script tag**

Insert this structure immediately before `<script src="script.js"></script>`:

```html
  <div class="certificate-modal" id="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" aria-hidden="true">
    <div class="certificate-modal__dialog">
      <div class="certificate-modal__header">
        <h2 class="certificate-modal__title" id="certificate-modal-title">Certificate Preview</h2>
        <button class="certificate-modal__close" type="button" aria-label="Close certificate preview">×</button>
      </div>
      <div class="certificate-modal__content" id="certificate-modal-content"></div>
      <p class="certificate-modal__fallback" id="certificate-modal-fallback" role="status" hidden>Unable to preview this certificate. Please try opening the file directly.</p>
    </div>
  </div>
```

- [ ] **Step 3: Inspect the markup for exact IDs and valid nesting**

Run:

```bash
cd /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio/main-portfolio
node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); for (const value of ['certificate-trigger','certificate-modal','certificate-modal-title','certificate-modal-content','certificate-modal-fallback']) if (!html.includes(value)) process.exitCode=1;"
```

Expected: exit code 0.

- [ ] **Step 4: Commit the markup change**

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio add main-portfolio/index.html
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio commit -m "feat: add certificate modal markup"
```

---

### Task 2: Style the modal for desktop and mobile

**Files:**
- Modify: `main-portfolio/style.css` after the existing toast styles

**Interfaces:**
- Consumes the modal class names from Task 1.
- Produces a hidden overlay, visible `.is-open` state, responsive preview area, and `body.certificate-modal-open` scroll lock.

- [ ] **Step 1: Add the base modal styles**

Append:

```css
/* =====================================================
   CERTIFICATE MODAL
===================================================== */
.certificate-modal {
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 56px);
  background: rgba(26, 26, 26, 0.72);
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 0.25s var(--ease-out), visibility 0.25s;
}
.certificate-modal.is-open {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
}
.certificate-modal__dialog {
  display: flex;
  flex-direction: column;
  width: min(100%, 1040px);
  max-height: min(92svh, 900px);
  overflow: hidden;
  background: var(--bg);
  border: 1px solid var(--border);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
  transform: translateY(18px) scale(0.98);
  transition: transform 0.35s var(--ease-out);
}
.certificate-modal.is-open .certificate-modal__dialog { transform: translateY(0) scale(1); }
.certificate-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s3);
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.certificate-modal__title {
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.015em;
}
.certificate-modal__close {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: 2px;
  background: transparent;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 28px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.certificate-modal__close:hover,
.certificate-modal__close:focus-visible {
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
}
.certificate-modal__content {
  min-height: 0;
  overflow: auto;
  background: var(--bg-alt);
}
.certificate-modal__content iframe {
  display: block;
  width: 100%;
  height: min(76svh, 760px);
  border: 0;
  background: var(--bg);
}
.certificate-modal__content img {
  display: block;
  width: 100%;
  max-height: min(76svh, 760px);
  object-fit: contain;
  background: #fff;
}
.certificate-modal__fallback {
  padding: var(--s5);
  color: var(--ink-muted);
  font-size: 14px;
  text-align: center;
}
body.certificate-modal-open { overflow: hidden; }

@media (max-width: 600px) {
  .certificate-modal { padding: 10px; }
  .certificate-modal__header { padding: 14px 16px; }
  .certificate-modal__content iframe { height: 76svh; }
  .certificate-modal__content img { max-height: 76svh; }
}
```

- [ ] **Step 2: Check CSS syntax by loading the stylesheet through the browser parser**

Run the static server and inspect the page in a browser. Expected: no stylesheet parse errors; modal remains invisible before interaction.

- [ ] **Step 3: Commit the CSS change**

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio add main-portfolio/style.css
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio commit -m "feat: style certificate preview modal"
```

---

### Task 3: Implement modal behavior and accessibility

**Files:**
- Modify: `main-portfolio/script.js` after the experience collapse module

**Interfaces:**
- Consumes `.certificate-trigger` elements and the modal IDs from Task 1.
- Uses `.is-open` and `body.certificate-modal-open` from Task 2.
- Produces click, Escape, backdrop, focus restoration, native PDF/image preview, and load-error fallback behavior.

- [ ] **Step 1: Add the modal module**

Append:

```js
// Certificate preview modal
(function() {
  const modal = document.getElementById('certificate-modal');
  const dialog = modal?.querySelector('.certificate-modal__dialog');
  const title = document.getElementById('certificate-modal-title');
  const content = document.getElementById('certificate-modal-content');
  const fallback = document.getElementById('certificate-modal-fallback');
  const closeButton = modal?.querySelector('.certificate-modal__close');
  if (!modal || !dialog || !title || !content || !fallback || !closeButton) return;

  let trigger = null;

  function showFallback() {
    content.replaceChildren();
    fallback.hidden = false;
  }

  function openModal(event) {
    event.preventDefault();
    trigger = event.currentTarget;
    const url = trigger.dataset.certUrl || trigger.href;
    title.textContent = trigger.dataset.certTitle || 'Certificate Preview';
    fallback.hidden = true;
    content.replaceChildren();

    if (/\.pdf(?:$|[?#])/i.test(url)) {
      const frame = document.createElement('iframe');
      frame.title = `${title.textContent} certificate preview`;
      frame.src = url;
      frame.addEventListener('error', showFallback, { once: true });
      content.append(frame);
    } else if (/\.(?:jpe?g|png|webp|gif)(?:$|[?#])/i.test(url)) {
      const image = document.createElement('img');
      image.alt = `${title.textContent} certificate`;
      image.src = url;
      image.addEventListener('error', showFallback, { once: true });
      content.append(image);
    } else {
      showFallback();
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('certificate-modal-open');
    closeButton.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('certificate-modal-open');
    content.replaceChildren();
    fallback.hidden = true;
    trigger?.focus();
    trigger = null;
  }

  document.querySelectorAll('.certificate-trigger').forEach((link) => {
    link.addEventListener('click', openModal);
  });
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
})();
```

- [ ] **Step 2: Run the JavaScript syntax check**

Run:

```bash
cd /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio/main-portfolio
node -c script.js
```

Expected: exit code 0 and no output.

- [ ] **Step 3: Commit the JavaScript change**

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio add main-portfolio/script.js
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio commit -m "feat: open certificates in modal preview"
```

---

### Task 4: Verify the golden path and responsive behavior

**Files:**
- Verify: `main-portfolio/index.html`
- Verify: `main-portfolio/style.css`
- Verify: `main-portfolio/script.js`

**Interfaces:**
- Validates the complete feature without adding test dependencies.

- [ ] **Step 1: Start the live-site static server**

Run:

```bash
cd /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio/main-portfolio
python3 -m http.server 8090
```

Expected: the site serves at `http://localhost:8090`.

- [ ] **Step 2: Verify a PDF certificate in the browser**

Scroll to Recognition and click the first certificate. Confirm:
- No new tab opens.
- Modal overlay and title appear.
- PDF is visible in the iframe.
- Background page does not scroll.

- [ ] **Step 3: Verify an image certificate in the browser**

Click the fourth certificate. Confirm the JPG appears centered in the same modal shell.

- [ ] **Step 4: Verify all close paths and focus**

Confirm close button, backdrop click, and Escape all close the modal. After each close, focus returns to the certificate link that opened it.

- [ ] **Step 5: Verify mobile layout and reduced motion**

Use a narrow viewport around 375px wide. Confirm the dialog remains inside the viewport, the close button is reachable, and the preview is scrollable if needed. Enable reduced motion and confirm no disruptive animation occurs.

- [ ] **Step 6: Inspect final diff and status**

Run:

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio diff --check
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio status --short
```

Expected: `diff --check` has no output. Existing unrelated deleted files remain untouched; only the intended portfolio files and committed documentation are part of this work.
