# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

Static personal portfolio site for Quan Minh Nguyen — AI research student at UTS Sydney. Plain HTML/CSS/JS, no build step, no framework.

## Project Structure

```
myportfolio/
├── web-V1/       # Current version (active development)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── img/
│   ├── robots.txt
│   └── sitemap.xml
├── v1/           # Deprecated — old version with GSAP/ScrollTrigger/Lenis
└── CLAUDE.md     # This file
```

**Edit `web-V1/` files.** The `v1/` directory is the deprecated old version.

## Commands

- **Preview locally**: `cd web-V1 && python3 -m http.server 8080`, then visit `http://localhost:8080`
- **Deploy**: Push to the `main` branch. GitHub Pages serves from `v1/` at `https://minhquan-maker.github.io/myportfolio/v1/`

## Architecture

### Stack
- Pure HTML/CSS/JS — no build tools, no dependencies, no tests
- Fonts: Cormorant Garamond, Syne, IBM Plex Mono (Google Fonts)
- Vanilla JS only — no GSAP, no ScrollTrigger, no Lenis (unlike the deprecated `v1/`)
- Responsive breakpoint at ~960px collapses grid layouts to single column

### CSS Custom Properties
All colors defined in `:root` on `styles.css`:
`--black`, `--offblack`, `--yellow`, `--yellow-dim`, `--cream`, `--cream-dark`, `--muted`, `--line`, `--line-dark`

### Key JS Patterns (web-V1/script.js)
- **Navbar**: Fixed nav with scroll-triggered padding change (`navbar.scrolled` class)
- **Active nav state**: `updateNav()` highlights current section link based on scroll position
- **Scroll-reveal**: `IntersectionObserver` on elements with class `.reveal` — animate in on scroll
- **Dark mode only** — no theme toggle, no `data-theme` attribute

### Social Links (current)
- GitHub: `https://github.com/minhquan-maker`
- LinkedIn: `https://www.linkedin.com/in/ngminhquan/`
- Facebook: `https://www.facebook.com/mquan2512/`

## Content Editing

**Projects (WORK section):** Search for `proj-card` divs in `web-V1/index.html`. Each card has `.proj-period`, `.proj-name`, `.proj-role`, `.proj-text`, `.proj-links`.

**Life section:** JavaScript tab switching in `web-V1/script.js` using `.life-tab-item` and `.life-tab-content` data attributes.

**Contact form:** Stub — EmailJS/Formspree credentials not configured. Remove or configure before going live.

## Deprecated (v1/)

The `v1/` directory contains the old version with GSAP + ScrollTrigger + Lenis. It is not actively maintained. Do not use it as a reference for current development.
