# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal portfolio for Nguyen Minh Quan (CEO of Odylytics, Venture Analyst at B71, Research Assistant at HCMUT-URA). A single-page static site in plain HTML/CSS/JS with **no build step, bundler, framework or dependencies**. The repository root is the live site on Vercel (`minhquannguyen.vercel.app`); pushing to `main` deploys automatically. The previous design is preserved on the `backup/portfolio-v1-2026-10` branch.

```bash
python3 -m http.server 8090     # → http://localhost:8090
node -c script.js               # JS syntax check
```

## Architecture

- `index.html` — all markup and content
- `style.css` — tokens → base → components → sections → motion → responsive
- `script.js` — IIFE modules (nav, reveal, counter, marquee, video autoplay, scrollspy, carousel, FAQ tabs, certificate modal, pixel-me: a monochrome pixel self-portrait with a black pill speech bubble)
- `assets/` — all media. `assets/brand/` holds the favicon (`favicon.svg` + PNGs), `og.png`, and Odylytics/AquaGuard/AirGuard marks; `assets/frames/` holds stills extracted from the project videos (used by the hero stack, marquee and mock cards)

Sections in order: hero (portrait in front, the AquaGuard team and EPICS photos behind, AquaGuard, Odylytics and AirGuard logos resting above, no idle motion) → black band (counter + marquee) → logo strip → `#aquaguard` (flagship, white) → `#about` (dark card, three roles) → `#airguard` (gray panel) → `#includio` (dark panel) → `#enablecode` (white, `enablecode-1920.mp4`, an HD encode of the original recording) → `#voices` (testimonial carousel) → `#publications` (scientific publications) → `#press` (media & press) → `#recognition` → `#faq` → `#contact` footer (CTA card, giant wordmark, columns).

## Design System

Monochrome, Spyglass-inspired: white page, black bands and cards, `#F3F3F3` gray panels, a floating white pill nav. Headlines are Inter Tight 600 with tight tracking; the second voice of every headline is an `<em>` (italic, muted gray). Body is Inter. The only colour accent is the green "live" dot (`--live`). Tokens live in `:root`.

## Behaviour notes

- `.reveal` elements get `.visible` from one IntersectionObserver that also removes it on exit (animations replay). Children of `[data-stagger-group]` get a staggered delay.
- The marquee track is duplicated in JS for a seamless loop; videos with `data-autoplay` play only while on screen.
- Certificate triggers: `.certificate-trigger` with `data-cert-url` (+ optional `data-cert-title`) opens `#certificate-modal` (PDF in iframe, images in img).
- Keep the `prefers-reduced-motion` block when editing animations.

## Adding Content

- **Project:** copy a `.feature` section; pick white, `.panel--gray` or `.panel--dark`; add a `.mock` card.
- **Testimonial:** add a `.quote-card` in the carousel track (dots are generated).
- **Award:** add an `.award-card` (a `<button class="certificate-trigger">` if there is a certificate). Keep the 4-column grid filled.
- **FAQ:** add `<details>` in the right `[data-faq-panel]`.

## Archive

`archive/`, `old-portfolio/`, `.playwright-mcp/` are git-ignored. Do not edit archive copies as if they were the live site.

## Breakpoints

≤1024px: award/press/footer grids tighten · ≤900px: burger nav, two-column layouts stack, FAQ tabs become a pill row · ≤600px: compact hero, logo strip is a 4-column grid, press cards are a swipeable row, awards are a two-up grid, pixel-me hidden.

## Docs

`README.md` is the full overview (sections table, design, motion, responsive, editing recipes); `DESIGN.md` holds tokens and patterns. Update both when the structure changes.
