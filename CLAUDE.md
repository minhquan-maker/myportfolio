# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio site for Quan Minh Nguyen — an AI research student at UTS Sydney. It is a plain HTML/CSS/JS site with no build step.

## Architecture

```
mywebsite/
├── index.html    # Single-page site with all sections (About, Work, College, Life)
├── styles.css    # Full stylesheet (CSS custom properties, responsive breakpoints)
├── script.js     # Interactions: navbar scroll, scroll-reveal, image slideshow, tab switching
└── img/          # Portfolio images
```

All content lives in `index.html`. Sections are self-contained in `<section>` tags. No routing, no framework.

## Commands

- **Preview locally**: open `index.html` directly in a browser, or serve with:
  ```bash
  cd mywebsite && python3 -m http.server 8080
  ```
  Then visit `http://localhost:8080`

- **Deploy to GitHub Pages**: push to the `main` branch, then go to repo **Settings → Pages → Source → main branch**. Site will be live at `https://minhquan-maker.github.io/mywebsite/`.

## Key Implementation Notes

- Fonts loaded from Google Fonts CDN (Cormorant Garamond, Syne, IBM Plex Mono) — requires internet connection
- Scroll-reveal animations use `IntersectionObserver` in `script.js`; elements with class `.reveal` animate in on scroll
- Navbar active state updates via `updateNav()` on scroll
- Image slideshow in the Life section is JS-driven with CSS `translateX`
- Responsive breakpoint at 960px collapses grid layouts to single column
- No build tools, no dependencies, no tests

## Editing Content

All portfolio content (projects, experience, awards, personal info) is directly in `index.html`. Edit there — no template system to update.
