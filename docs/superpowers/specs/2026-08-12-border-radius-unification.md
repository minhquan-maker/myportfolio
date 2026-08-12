# Border Radius Unification Design

## Goal

Unify every rectangle in the live site to a single corner radius so the visual language feels consistent. The change is a focused geometry refresh only.

## Scope

- All rectangle borders in `main-portfolio/style.css` get the same `--radius` token.
- Keep the existing pill button and the existing circle elements as-is.
- Do not change color, spacing, typography, shadows, or layout.
- Do not change any HTML.

## Approach

Add a single CSS custom property and replace every rectangle `border-radius` value with it.

```css
:root {
  --radius: 14px;
}
```

Apply `border-radius: var(--radius);` to every rectangle selector in the stylesheet. The token replaces the current `2px` value used across cards, buttons, chips, tags, modal elements, and the toast.

Do not change:
- `border-radius: 999px` (pill button, used by `.exp-show-more__btn`)
- `border-radius: 50%` (circle elements used by `.exp-item__marker`, `.project-slider__btn`, `.project-slider__dot`, `.exp-item__bullets li::before`, `.pub-status-dot`)

## Selector Coverage

Replace `border-radius: 2px` with `border-radius: var(--radius)` on these selectors:

- `.btn`
- `.section-number`, `.about__eyebrow`
- `.nav-links a`
- `.nav-cta`
- `.exp-item`
- `.exp-item__link`
- `.exp-tag`
- `.btn-cv`
- `.chip`
- `.pub-chip`
- `.tag`
- `.recog-item`
- `.recog-item__proof`
- `.press-card`
- `.certificate-modal__dialog`
- `.certificate-modal__close`
- `::-webkit-scrollbar-thumb`

Replace `border-radius: 6px` with `border-radius: var(--radius)` on `.toast`.

## Visual Notes

- The dialog padding, preview iframe, and image preview remain unchanged; only the outer corners become more rounded.
- Project slider buttons and timeline markers stay circular.
- View-all-experiences button keeps its pill shape.
- No new states, hover animations, or shadows are added.

## Accessibility

No ARIA or focus changes. Focus-visible rules continue to apply on the same components.

## File Changes

- `main-portfolio/style.css` only.

## Success Criteria

- Every rectangle element in the live site renders with `14px` corners.
- Pill and circle elements remain unchanged.
- No other visual properties change.
- Static server still serves the site at HTTP 200.
