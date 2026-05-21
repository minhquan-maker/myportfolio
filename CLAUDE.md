# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio site for Quan Minh Nguyen — AI research student at UTS Sydney. Plain HTML/CSS/JS, no build step, no framework.

## Project Structure

```
mywebsite/
├── index.html    # Single-page with all sections (About, Work, Journey, Life, Contact)
├── styles.css    # Full stylesheet — CSS custom properties, GSAP animations, responsive breakpoints
├── script.js     # Interactions: navbar scroll, scroll-reveal, tab switching, GSAP animations
├── img/          # Portfolio images
├── v1/           # Deployment copy — this is the live v2 redesign
└── CLAUDE.md     # This file
```

**The active source lives at the root level.** The `v1/` subdirectory is the deployment copy. When editing, change root files.

## Commands

- **Preview locally**: `cd mywebsite && python3 -m http.server 8080`, then visit `http://localhost:8080`
- **Deploy to GitHub Pages**: push to the `main` branch → repo **Settings → Pages → Source → main branch**. Site serves at `https://minhquan-maker.github.io/mywebsite/v1/`

## Architecture

### Stack
- Pure HTML/CSS/JS — no build tools, no dependencies, no tests
- Fonts loaded from Google Fonts CDN (Cormorant Garamond, Syne, IBM Plex Mono) — requires internet
- GSAP + ScrollTrigger loaded from CDN for parallax and scroll animations
- Responsive breakpoint at 960px collapses grid layouts to single column

### Key Implementation Notes
- CSS custom properties in `:root` for all colors: `--black`, `--offblack`, `--yellow`, `--cream`, `--muted`, `--line`
- Dark mode only — light mode removed entirely (no `data-theme`, no toggle button)
- **Lenis smooth scroll was removed** — browser native scroll is faster and more responsive
- GSAP ScrollTrigger retained for parallax effects (`scrub: 0.5–1`) and horizontal awards scroll
- Scroll-reveal animations use `IntersectionObserver` in `script.js`; elements with class `.reveal` animate in on scroll
- Navbar active state updates via `updateNav()` on scroll
- Image slideshow in the Life section driven by JS with CSS `translateX`
- `@media (prefers-reduced-motion: reduce)` kills all transitions and animations

### Content
All portfolio content (projects, experience, awards, personal info) is directly in `index.html`. Edit there — no template system.

### Social Links (current, verified)
- GitHub: `https://github.com/minhquan-maker`
- LinkedIn: `https://www.linkedin.com/in/ngminhquan/`
- Facebook: `https://www.facebook.com/mquan2512/`

## Editing Content

**Projects (WORK section):** Search for `proj-card` divs in `index.html`. Each card has `.proj-period`, `.proj-name`, `.proj-role`, `.proj-text`, `.proj-links`.

**Awards (HONOURS section):** Search for `award-cell` divs in `index.html`. Horizontal scroll on desktop via GSAP.

**Life section tabs:** JavaScript tab switching in `script.js` using `.life-tab-item` and `.life-tab-content` data attributes.

**Contact form:** The form and its JS in `script.js` are stubs (EmailJS/Formspree credentials not configured). Remove or configure before going live.
