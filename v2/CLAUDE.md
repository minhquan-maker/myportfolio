# CLAUDE.md

Personal portfolio v2 for Quan Minh Nguyen — 3D Creator landing page.

## Project Overview

A dark-themed 3D Creator portfolio landing page built with React + TypeScript + Tailwind CSS + Framer Motion + Lucide React.

## Stack

- **Build:** Vite 5 + React 18 + TypeScript
- **Styling:** Tailwind CSS v3.4 (configured in `tailwind.config.js`)
- **Animations:** Framer Motion v12
- **Icons:** Lucide React v0.344
- **Fonts:** Kanit (Google Fonts, loaded via `<link>` in `index.html`)

## Commands

- **Preview locally:** `cd v2 && npm install && npm run dev` → `http://localhost:5173`
- **Build:** `cd v2 && npm run build`
- **Type check:** `cd v2 && npx tsc -b`

## Architecture

```
src/
├── App.tsx              — Root component, section assembly
├── index.css           — Global styles, Tailwind directives, .hero-heading gradient
├── main.tsx            — React entry point
├── components/
│   ├── Navbar.tsx           — Top navigation (About, Work, Projects, Contact)
│   ├── HeroSection.tsx      — Full-viewport hero with portrait + ContactButton
│   ├── MarqueeSection.tsx   — 2-row scroll-driven GIF gallery
│   ├── AboutSection.tsx     — Centered section with corner decorations + AnimatedText
│   ├── ServicesSection.tsx  — White-bg section with 5 service items
│   ├── ProjectsSection.tsx  — 3 sticky-stacking project cards
│   ├── FadeIn.tsx           — Reusable scroll-triggered fade animation
│   ├── Magnet.tsx           — Mouse-following magnetic hover effect
│   ├── AnimatedText.tsx     — Character-by-character scroll-reveal
│   ├── ContactButton.tsx    — Gradient pill CTA button
│   └── LiveProjectButton.tsx — Ghost outline pill button
├── data/
│   └── projects.ts    — Project data (AquaGuard, Green Rise, Carbon Footprint)
└── types/
    └── index.ts       — TypeScript interfaces
```

## Content Notes

- **Name:** Quan (not "Jack" — adapted from spec)
- **Projects:** 3 real projects from web-V1: AquaGuard, Green Rise, Carbon Footprint Tracker
- **Images:** Located in `public/img/` (same 9 images as v1/img/)
- **Contact:** `minhquan.nguyen-2@student.uts.edu.au`

## Key Design Tokens

| Token | Value |
|---|---|
| Background | `#0C0C0C` |
| Text light | `#D7E2EA` |
| Hero gradient | `#646973 → #BBCCD7` |
| Accent gradient | `#18001F → #B600A8 → #7621B0 → #BE4C00` |

## Section Order

1. **HeroSection** — Full viewport, gradient "Hi, i'm Quan" heading, portrait with magnetic effect
2. **MarqueeSection** — 21 motion GIFs in 2 scroll-driven rows
3. **AboutSection** — Centered with 4 corner decorative images, animated text
4. **ServicesSection** — White bg, 5 service items
5. **ProjectsSection** — Dark bg, 3 sticky-stacking project cards
