# Certificate Modal Design

## Goal

Replace the current “View Certificate ↗” links in the Recognition section so clicking a certificate opens an in-page modal instead of opening a new browser tab.

## Scope

- All six certificate links under the Honors list.
- The preview must work for both PDFs and JPGs.
- Keep the existing visual system and responsive behavior.
- Do not change any other external links.

## Behavior

1. Clicking a certificate link prevents default navigation.
2. A centered modal opens over the page.
3. The page behind the modal is scroll-locked while open.
4. The modal can be closed by:
   - the close button,
   - clicking the backdrop,
   - pressing Escape.
5. The button text stays as “View Certificate”, but the arrow should no longer suggest a new tab.
6. The file type determines the preview method:
   - PDF → iframe
   - JPG/image → img element
7. If the file fails to load, a fallback message should appear inside the modal.
8. Focus should move into the modal on open and return to the trigger on close.

## Accessibility

- Modal root uses `role="dialog"` and `aria-modal="true"`.
- Modal title is visually descriptive and available to screen readers.
- Close button has an accessible label such as `aria-label="Close certificate preview"`.
- On open, focus moves to the close button or modal container.
- On close, focus returns to the previously focused certificate button.
- Prevent background interaction while the modal is open.

## Visual Design

- Backdrop: semi-transparent neutral overlay, not pure black, to keep the editorial feel.
- Modal container: white background, existing border styling, restrained shadow, no decorative heaviness.
- Top area: award title left-aligned, close control right-aligned.
- Preview area: large, flexible height, vertical scroll only when needed.
- PDF: width fills the modal; height uses a comfortable viewport-based range so one page is readable without excessive scrolling.
- Image: centered with `object-fit: contain` and comfortable aspect ratio.
- Mobile: reduce padding, keep close target large enough for touch.
- Motion: keep consistent with current site easing; fade + scale-in for the modal, no heavy animation.

## HTML

Add one reusable modal structure at the end of `index.html`, before the script tag:

- outer overlay div
- inner dialog container
- header with title and close button
- body container for iframe / img / fallback message
- visually hidden live region or status text for failures

Each certificate button should carry:
- `data-cert-url`
- `data-cert-title`
- a class that marks it as a certificate trigger

## CSS

Add a small modal section to `style.css`:
- overlay fixed fullscreen
- dialog centered with max-width and max-height
- responsive adjustments for small screens
- scroll-locked body class
- focus-visible styling for the close button
- utility to hide/show modal content

Keep the modal cohesive with the existing cards and buttons, but more minimal so it stays an overlay, not a second layout.

## JavaScript

Add a `certificateModal` block at the end of `script.js`:

- Cache overlay, dialog, title, media container, fallback text.
- On certificate click:
  - read file URL + title
  - clear previous content
  - set title
  - create iframe for PDFs ending in `.pdf`
  - create img for image extensions
  - otherwise show fallback text
  - open modal and lock scroll
  - set focus to the close button
- Close handlers:
  - close button click
  - backdrop click
  - Escape key
- On close:
  - clear media source/content
  - unlock scroll
  - return focus to the trigger element

## File Changes

- `main-portfolio/index.html`
- `main-portfolio/style.css`
- `main-portfolio/script.js`

No new libraries. No build step. No new assets.

## Success Criteria

- All six certificate links open in-page instead of in a new tab.
- PDFs render in the modal.
- Images render in the modal.
- The modal closes cleanly and returns focus.
- The page stays usable on desktop and mobile.
- The existing Recognition layout and typography remain unchanged.
