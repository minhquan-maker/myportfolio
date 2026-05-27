# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for **Quan Minh Nguyen** — AI research student at UTS Sydney. Two independent versions coexist as subdirectories:

| Dir | Type | Stack |
|-----|------|-------|
| `v1/` | Plain HTML/CSS/JS | No build step |
| `v2/` | React app | Vite + TypeScript + Tailwind + Framer Motion |

## v1/ — Black & Gold Portfolio (Plain HTML)

**Served at:** `https://minhquan-maker.github.io/myportfolio/v1/`

Plain HTML/CSS/JS — no build step, no dependencies. GSAP + ScrollTrigger + Lenis for animations.

```
v1/
├── index.html          ← Edit content here
├── styles.css          ← CSS custom properties, animations
├── script.js           ← GSAP, ScrollTrigger, Lenis, IntersectionObserver
├── img/                ← 9 portfolio images (also in v2/public/img/)
├── robots.txt
└── sitemap.xml
```

### v1 Commands
- **Preview:** `cd v1 && python3 -m http.server 8081` → `http://localhost:8081`
- **Deploy:** Push to `main` branch → auto-deployed via GitHub Pages

### v1 Key Patterns
- **Navbar:** Fixed nav with `navbar.scrolled` class toggled at 60px
- **Scroll reveal:** `IntersectionObserver` on `.reveal` elements
- **Colors:** CSS custom properties — `--black` (#080808), `--yellow` (#f0c93a), `--cream` (#f4eed8)
- **Fonts:** Cormorant Garamond (headings), Syne (body), IBM Plex Mono (metadata)
- **Dark mode only** — no theme toggle

## v2/ — 3D Creator Landing Page (React)

**Dev:** `cd v2 && npm install && npm run dev` → `http://localhost:5173`
**Build:** `cd v2 && npm run build`
**Type check:** `cd v2 && npx tsc -b`

Full architecture and component details are in `v2/CLAUDE.md`.

## Social Links

- GitHub: `https://github.com/minhquan-maker`
- LinkedIn: `https://www.linkedin.com/in/ngminhquan/`
- Facebook: `https://www.facebook.com/mquan2512/`

## Project Personal Info

- **Name:** Quan Minh Nguyen (displayed as "Quan" in v2)
- **Email:** `minhquan.nguyen-2@student.uts.edu.au`
- **Origin:** Ho Chi Minh City, Vietnam
- **Key projects:** AquaGuard, Green Rise, Carbon Footprint Tracker, URA AI Research
