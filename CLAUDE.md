# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Nguyen Minh Quan — a single-page static site in plain HTML/CSS/JS with **no build step, bundler, framework, or dependencies**. The repository root is the deployed live site on Vercel (`minhquannguyen.vercel.app`); pushing to `main` deploys automatically.

```bash
python3 -m http.server 8090     # → http://localhost:8090
node -c script.js               # JS syntax check
```

`vercel.json` pins the root as a static site (`framework: null`, `outputDirectory: "."`). There is nothing to build or install.

## Architecture

**3-file layout (root only):**
- `index.html` — all markup and content
- `style.css` — all CSS (design tokens → components → animations → responsive)
- `script.js` — all JS (nav, reveal, counters, sliders, toast, certificate modal)
- `assets/` — all media (self-contained; moving the folder does not break links)

Sections in order: `#hero`, `#about` (About / Education), `#experiences` (timeline), `#projects` (showcase), `#recognition` (testimonials + honors + media + certificates). Contact is **not** a `<section>` — it is the black footer (`.footer`). Publications are an unnumbered block inside the Recognition area, not their own section.

## Design System

**Palette (CSS custom properties in `:root`):** `--bg` `#F4F5F7`, `--bg-alt` `#E8EAEF`, `--ink` `#111111`, `--ink-muted` `#3A3A3A`, `--ink-faint` `#5A5A5A`, **`--accent` `#2D4A6B`** (steel blue — do not substitute brown), `--accent-hover` `#3D5F87`, `--border` `#C8CBD6`, `--border-strong` `#A8ABB8`. The footer reverses to a dark/black surface.

**Fonts:** Inter (sans) with Cormorant Garamond italic accents, loaded from Google Fonts.

**Spacing:** scale `--s1`…`--s9`, `--grid-margin: clamp(32px, 6vw, 96px)`, `--max-w: 1400px`. Section vertical padding uses `var(--s6)`.

## Scroll Reveal & Animation

Reveal classes: `.reveal` (fade + translate up), `.reveal-edu` (slide from left), `.reveal-school` (gentle color/translate), `.reveal-flat` (shorter translate), and `.deco-shape` (decorative background shapes). A single `IntersectionObserver` observes all of them, **adds `.visible` on enter AND removes it when the element leaves the viewport** (there is no one-shot unobserve) — so re-scrolling replays the animation. Threshold `0.1`, `rootMargin: 0px 0px -50px 0px`.

Staggering: elements inside a `[data-stagger-group]` container reveal together with a 0.1s transition-delay per sibling (assigned in JS). Delay utility classes `.reveal-delay-1`…`-4` also exist for static offsets.

Hero entrance is pure CSS `@keyframes` with `animation-delay` staggering — no JS.

**Reduced motion:** `style.css` contains a `prefers-reduced-motion` block — preserve it when editing animations.

## Key CSS Patterns

- **Directional project rows:** `[data-dir="left"|"right"]` flips image/content order in a CSS grid (`direction: rtl` on the row, `ltr` on children).
- **Sticky about column:** `.about__left { position: sticky; top: calc(68px + var(--s4)); }` — nav height (68px) + offset.
- **Experience timeline:** `.timeline` capped at `min(1100px, 100%)` and centered. The "View all experiences" collapse (`.exp-overflow`) uses `max-height` + `opacity` transitions (not `display`) so overflow cards slide in/out; JS toggles `.is-expanded` on `.timeline` and adds/removes `.visible` on `.exp-overflow .reveal` with a 150 ms stagger.
- **Project action buttons:** `.project-row__links .btn-outline` uses the accent fill with white text and is sized down (`padding: 8px 18px; font-size: 12px`) so the action row stays subordinate to the card.
- Custom 4px scrollbar, accent `::selection`, and `#certificate-modal-open` body lock while the modal is open.

## JS Modules (`script.js`)

All modules are wrapped in IIFEs or guarded lookups — a missing element (e.g. the modal) must not throw.

| Module | Behavior |
|---|---|
| Nav frosted glass | toggles `.scrolled` after 40px scroll |
| Scroll reveal | one `IntersectionObserver` for all reveal classes (see above) |
| Smooth scroll | `a[href^="#"]`, skips `#`, `#!`, and placeholder links |
| Hero counters | animates `.stat__number` once when `.hero__stats` enters view (eased, preserves trailing suffix) |
| Active nav link | scrollspy over `section[id]`; forces last section active at page bottom |
| Project sliders | per-slider index, `translateX` track, prev/next/dot controls (`.project-slider__*`) |
| Broken-image guard | hides `.project-slider__slide img` on error or zero natural width |
| Under-development toast | `.is-soon` buttons show a transient `.toast` (reads `data-msg`) |
| Certificate modal | `.certificate-trigger` opens `#certificate-modal`; renders PDF via `<iframe>` or image via `<img>` from `data-cert-url`/`href`, falls back on error/unsupported type; closes on button, backdrop click, and Escape; restores focus to the trigger |

## Projects & Media

Three projects, each a `.project-row` with a `.project-slider` (track + prev/next + dots):

1. **AquaGuard** — `assets/projects/aquaguard/aquaguard-cut1.mp4`, `aquaguard-cut2.mp4`
2. **EnableCode** — `assets/projects/enablecode/enablecode.mov`
3. **AirGuard** — `assets/projects/airguard/airguard-cut1.mp4` … `cut3.mp4`

There is no carbon-footprint or flood-detection media in the live site (older docs referenced them). Each project's media lives in its own `assets/projects/<name>/` folder.

## Assets

- `assets/my_resume.pdf` — CV download (`.gitignore` exempts `assets/**/*.pdf` from the blanket `*.pdf` ignore so resume + certificate PDFs deploy)
- `assets/media/profile.jpg` — hero/portrait
- `assets/logos/1.png`…`13.png` — hero strip and press logos
- `assets/icons/` — official Simple Icons SVG for facebook, orcid, linkedin, github (PNG fallbacks alongside)
- `assets/shapes/` — decorative SVG polygons used by `.deco-shape`
- `assets/testimonials/uts-testimonial.jpg`
- `assets/certificates/` — award PDFs/JPGs, grouped by award (e.g. `03_1stplace_epics2026_asu/`) plus UTS/HPC files; wired to the certificate modal via `.certificate-trigger`

Media referenced from HTML lives under `assets/` only — no root-level media.

## Adding Content

- **Experience:** add/remove `.exp-item` inside `.timeline`; items inside `.exp-overflow` stay hidden until "View all experiences" is clicked.
- **Project:** add a `.project-row` in `.project-showcase`; set `data-dir` for image/content order; use `.project-slider` for multi-media or drop a single `<video>`/`<img>` directly in `.project-row__img`.
- **Certificate:** add a `.certificate-trigger` with `data-cert-url` (and optional `data-cert-title`) pointing at the asset.
- **Testimonials / honors / media / contact:** edit `.testimonial-card`, `.recog-list`, media cards, and `.footer__*` blocks.

## Archive

Old versions and redesigns live in `archive/` (e.g. `archive/old-portfolio`, `archive/src/demo`, `archive/old-portfolio-2026-09-06/*`). `archive/`, `old-portfolio/`, `CLAUDE.md`, and `.playwright-mcp/` are git-ignored so they are not deployed. Do not edit archive copies as if they were the live site.

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤1024px | hero grid tightens columns |
| ≤900px | nav links hidden, hero/about/recognition/project grids collapse to single column, section spacing reduces |
| ≤600px | contact/hero CTAs and media grids stack to one column |
