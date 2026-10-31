# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal portfolio for Minh Quan Nguyen (CEO of Odylytics, Venture Analyst at B71, Research Assistant at HCMUT-URA). A single-page static site in plain HTML/CSS/JS with **no build step, bundler, framework or dependencies**. The repository root is the live site on Vercel (`minhquannguyen.vercel.app`); pushing to `main` deploys automatically. The previous design is preserved on the `backup/portfolio-v1-2026-10` branch.

```bash
python3 -m http.server 8090     # → http://localhost:8090
node -c script.js               # JS syntax check
```

## Architecture (v3, academic/tech)

- `index.html` (Home: bio, research interests, research (4 papers), experience, education) · `startup.html` (Odylytics products, stats, B71) · `blog.html` (post list; empty state until posts exist)
- `style.css` — tokens (light + `prefers-color-scheme` dark) → base → components → motion → responsive. Inter + JetBrains Mono, hairline borders, 720px column.
- `script.js` — page-transition curtain, scroll reveal, video autoplay, certificate modal (`[data-cert-url]` → `#cert-modal`).
- `assets/` — all media. English only; no i18n or settings panel in this version.
- **Page transition:** `.curtain` (black, "Minh Quan") slides up on internal `*.html` link clicks and sets `sessionStorage['mq-t']`; the next page (tiny inline `<head>` script adds `html.is-entering`) starts covered, then slides away. Skipped for reduced motion. Keep the three pages' header/footer/curtain markup in sync.
- **Publication:** add an `<li class="pub">` in `index.html`. **Blog post:** add an `<a class="post">` (see comment in `blog.html`).
- Previous designs: branches `backup/portfolio-v1-2026-10` and `backup/portfolio-v2-2026-10`.
- Deploys: Vercel (push to `main`) and GitHub Pages (`.github/workflows/pages.yml` copies the three pages, `style.css`, `script.js`, `assets/`; add new top-level files there).

## Archive

`archive/` is git-ignored and never deployed: `versions/` (old portfolios), `docs/`, `mockups/`, `notes/`, `tooling/` (Playwright, superpowers, worktrees) and `unused-assets/` (media nothing references, same relative paths as `assets/`). Do not edit archive copies as if they were the live site. Keep `assets/` limited to files the page references; move orphans to `archive/unused-assets/`.

## Breakpoints

≤1024px: award/press/footer grids tighten · ≤900px: burger nav, two-column layouts stack, project cards go 2-up then 1-up, education rows simplify · ≤600px: compact hero, logo strip is a 4-column grid, press cards are a swipeable row, awards are a two-up grid, pixel-me hidden.

## Docs

`README.md` is the full overview (sections table, design, motion, responsive, editing recipes); `DESIGN.md` holds tokens and patterns. Update both when the structure changes.

- Typography: `text-wrap: balance` on headings/ledes and `pretty` on body text keeps single words from dropping onto their own line; keep it when adding text blocks.
