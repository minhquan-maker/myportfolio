# minhquan — Design notes

**Direction:** monochrome editorial, modelled on the Spyglass landing-page format. Content and identity are Nguyen Minh Quan's.

## Tokens (`:root` in style.css)

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FFFFFF` | page |
| `--surface` | `#F3F3F3` | gray panels, cards, footer |
| `--ink` | `#0B0B0B` | text, black pills |
| `--muted` / `--faint` | `#6B6B6B` / `#9A9A9A` | body copy / italic headline voice |
| `--dark` / `--dark-2` | `#0B0B0B` / `#161616` | bands, dark cards, inner cards |
| `--live` | `#2FBF71` | the only accent: live dots and status chips |

## Type

- Display: Inter Tight 600, letter-spacing −0.045 to −0.055em; `<em>` = italic 500 in `--faint`
- Body: Inter 400/500/600, 14–16px

## Patterns

- Floating pill nav with hover dropdowns (About, Work) and direct links (Publications, Press, Recognition, Contact)
- Headline pairs: bold statement + muted italic completion
- Black band with counter and media marquee; rounded bottom corners
- Feature rows alternate white → gray panel → dark panel, each with a browser-style mock card
- Dark testimonial cards with dot pagination
- Gray FAQ tabs + accordion
- Dark CTA card with a full-width white pill, then a giant light-gray wordmark

## Motion

One-time entrances only (hero cards, logos, scroll reveals). No idle bobbing or pointer parallax. Respect `prefers-reduced-motion`.

## Mobile

Compact hero, 4-column logo grid, swipeable press row, two-up award grid, 2-column footer.

## Favicon

`assets/brand/favicon.svg`: a black rounded square with a white geometric "q" and a gray period ("q."), echoing the lowercase `minhquan` wordmark.
