# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next-generation editorial redesign of the personal portfolio — plain static HTML/CSS/JS, no build step. This is the live deployed site on Vercel.

```bash
python3 -m http.server 8090
# → http://localhost:8090

# Quick JS syntax check
node -c script.js
```

## Architecture

**3-file layout (root only):**
- `index.html` — HTML markup, links `style.css` and `script.js`
- `style.css` — all CSS (design tokens → components → animations → responsive)
- `script.js` — all JS (nav, scroll reveal, sliders, collapse toggle)

No build step, no bundler.

**Sections (numbered):**
1. Hero — name, role, bio, CTAs, stats strip
2. About/Education — sticky left column + photo right
3. Experiences — vertical timeline with clickable items + "View all experiences" collapse
4. Projects — alternating L/R image-content grid (sliders or single media)
5. Publications — single paper card
6. Recognition — testimonials (3-col grid) + honors list + media cards
7. Contact — 6-card grid

**Assets** live entirely under `assets/` (no root-level media). The site is self-contained — moving this folder around does not break links.

```
.
├── index.html
├── style.css
├── script.js
├── CLAUDE.md
└── assets/
    ├── my_resume.pdf            ← CV download
    ├── projects/                ← per-project media folders
    │   ├── aquaguard/           ← aquaguard-cut1.mp4, aquaguard-cut2.mp4
    │   ├── airguard/            ← airguard-cut1.mp4, airguard-cut2.mp4, airguard-cut3.mp4
    │   ├── carbon-footprint/    ← carbon-footprint-1.mp4 (project 3 single video)
    │   └── flood-detection/     ← flood-detection1.png (project 4 single image)
    ├── media/
    │   └── profile.jpg          ← hero portrait
    ├── logos/                   ← 1.png … 13.png (hero strip + press logos)
    ├── certificates/            ← per-award PDF/JPG proofs, grouped by award folder
    └── testimonials/
        └── uts-testimonial.jpg
```

## Design System

**Palette (CSS custom properties):**
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F4F5F7` | Page background |
| `--bg-alt` | `#E8EAEF` | Alternating sections |
| `--bg-dark` | `#D0D3DC` | Project image placeholders |
| `--ink` | `#111111` | Primary text |
| `--ink-muted` | `#3A3A3A` | Secondary text |
| `--ink-faint` | `#5A5A5A` | Labels, captions |
| `--accent` | `#2D4A6B` | CTAs, links, highlights |
| `--accent-hover` | `#3D5F87` | Hover state |
| `--border` | `#C8CBD6` | Dividers, card borders |
| `--border-strong` | `#A8ABB8` | Section numbers, counters |

The accent is steel blue, not brown.

**Fonts:** Inter (grotesk sans) + Cormorant Garamond (italic serif accent). Loaded from Google Fonts.

**Spacing scale:** `--s1` (8px) through `--s9` (160px), plus `--grid-margin` (responsive via `clamp(32px, 6vw, 96px)`) and `--max-w` (1400px). Section vertical padding uses `var(--s6)` (64px) — was previously `s7` and felt too airy.

## Scroll Animations

`.reveal` class + `IntersectionObserver` (threshold 0.08, rootMargin 0 0 -40px 0) — elements fade+translate up on enter, unobserve after first trigger. Delay variants: `.reveal-delay-1` (0.1s) through `.reveal-delay-4` (0.4s).

Two additional reveal variants exist in CSS but are handled by the same observer:
- `.reveal-edu` on `.edu-item` — slides in from left (`translateX(-28px)`) instead of up
- `.reveal-school` on `.edu-item__school` — gentle `translateY` reveal with a color transition
- `.reveal-flat` on `.project-row` — reduces the default translate distance

Hero entrance is CSS `@keyframes slideUp` / `fadeUp` with staggered `animation-delay` values — no JS required.

## Key CSS Patterns

- **Directional project rows:** `data-dir="left"` sets `direction: rtl` on the row and `direction: ltr` on children to flip the image/content order in a CSS grid.
- **Sticky about column:** `.about__left { position: sticky; top: calc(68px + var(--s4)); }` — nav height (68px) + spacing offset.
- **Custom scrollbar:** 4px wide, accent color on hover.
- **Text selection:** `::selection` uses accent bg + bg text color.
- **Experience timeline width:** `.timeline` is capped at `min(1100px, 100%)` and centered — cards stay compact even though the site max-w is 1400px.
- **Experience collapse:** `.exp-overflow` uses `max-height` + `opacity` transition (not `display`) so the 4th/5th experience cards slide in/out smoothly. JS adds `.visible` to each overflow `.reveal` with a 150 ms stagger.
- **Project link buttons:** `.project-row__links .btn-outline` uses the accent blue background (`var(--accent)`) with white text and ink hover — applies to all 4 projects, no `btn-ghost` variant.
- **Project button sizing:** `.project-row__links .btn-outline` is sized down (`padding: 8px 18px; font-size: 12px`) so the action row doesn't dominate the card.

## JS Modules (`script.js`)

| Module | Behavior |
|---|---|
| Nav frosted glass | `scrolled` class after 40px |
| Scroll reveal | IntersectionObserver on `.reveal`, `.reveal-edu`, `.reveal-school` |
| Smooth scroll | `a[href^="#"]` with nav offset |
| Active nav link | Scrollspy on section `id`s |
| Project sliders | Per-slider index, CSS `translateX` track, prev/next/dots controls |
| Experience collapse toggle | Adds `.is-expanded` to `.timeline`, staggers `.visible` onto `.exp-overflow .reveal` items, removes them on collapse |
| Broken image guard | Hides `img` elements inside `.project-slider__slide` on `error` or zero natural width |

The grid overlay toggle that previously lived at the bottom-right of the page has been removed (it was a development aid only).

## Project Media Layouts

Projects 1, 2, 4 use the slider pattern (`<div class="project-slider">` with track, prev/next buttons, dots). Project 3 is a single `<video class="project-row__video">` with no controls — uses `assets/projects/carbon-footprint/carbon-footprint-1.mp4`. Project 4 uses one image from `assets/projects/flood-detection/flood-detection1.png`.

## Asset Subdirectories

Each `projects/` subfolder holds media for one portfolio project:
- `projects/aquaguard/` — AquaGuard web platform demo videos
- `projects/airguard/` — AirGuard carbon tracking demo videos
- `projects/carbon-footprint/` — Carbon Footprint Calculator (Anvil/Python) demo
- `projects/flood-detection/` — Drone-based flood victim detection (YOLOv11) demo

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤1024px | Hero grid tightens columns |
| ≤900px | Nav links hidden, hero stacks, about/recog/project grids collapse to 1fr; section spacing reduces (`--s7: 80px; --s8: 80px`) |
| ≤600px | Contact grid 1-col, media grid 1-col, hero CTAs stack |

## Adding Content

- **Experience items:** Add/remove `.exp-item` divs inside `.timeline`. Each has a marker SVG, role/org/date header, description, tags, and a link. Items inside `.exp-overflow` are hidden until "View all experiences" is clicked.
- **Project rows:** Add `.project-row` divs to `.project-showcase`. Set `data-dir="left"` or `data-dir="right"` to control image/content order. For a slider, use `.project-slider` with track and controls. For a single media (video or image), put it directly inside `.project-row__img`.
- **Awards:** Edit `.recog-list` items — title, description, and the `href="#"` on the proof link.
- **Testimonials:** Edit the 3 `.testimonial-card` divs inside `.testimonials-grid`.
- **Contact cards:** Edit the 6 `.contact-card` anchors inside `.contact-grid`.

## Relationship to the Archived Site

All former and unused versions (including `old-portfolio`, demo projects, etc.) are safely archived in the `archive/` folder. The current live deployed site resides at the root of the repository.
