# Portfolio Redesign — Design Specification

**Author:** Claude (Anthropic)
**Date:** 2026-07-19
**Project:** Premium Personal Portfolio — Nguyen Minh Quan
**Status:** Approved — color update only
**Approved change:** Mint green accent (`#5DBB9A`) → Steel blue (`#4A7AB0`). All other design elements unchanged.

---

## 1. Concept & Vision

A sophisticated, editorial personal portfolio that positions the owner as a high-caliber AI researcher and engineer. The aesthetic draws from Swiss typographic tradition merged with contemporary minimal product design — think Dieter Rams meets modern editorial. Every element earns its space. The site whispers premium rather than shouting it, letting the work and credentials speak while the design communicates taste, discipline, and technical depth without a single line of unnecessary decoration.

**Reference:** Premium minimalist portfolio aesthetic (reference image) — spacious asymmetric layouts, grain texture, soft pastel glows, thin decorative line elements in corners.

---

## 2. Design Language

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FAFAF8` | Primary background |
| `--bg-alt` | `#F7F7F5` | Section alternates, cards |
| `--ink` | `#111111` | Primary text, headings |
| `--ink-muted` | `#6B6B6B` | Secondary text, captions |
| `--ink-faint` | `#B0B0A8` | Labels, metadata |
| `--accent` | `#4A7AB0` | CTA, highlights, hover states, orbital line, decorative graphics |
| `--accent-light` | `#D4E2ED` | Accent tint backgrounds |
| `--border` | `#E8E8E4` | Dividers, card borders |

### Pastel Glow Accents (decorative, non-dominant)
- Blush pink: `rgba(255, 220, 230, 0.4)`
- Lavender: `rgba(230, 220, 255, 0.4)`
- Steel blue: `rgba(74, 122, 176, 0.4)` ← replaced mint
- Pale blue: `rgba(210, 230, 255, 0.4)`

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero Name | Syne | 800 (Extra Bold) | Tight tracking (-0.03em) |
| Subheadings | Syne | 700 | |
| Body / UI | DM Sans | 400 / 500 | |
| Mono / Labels | Space Mono | 400 | Caps labels, section tags |
| Nav | DM Sans | 500 | |

**Scale (desktop):**
- Hero name: clamp(64px, 10vw, 120px)
- Section headings: 48px
- Subheadings: 24px
- Body: 16px / 18px
- Labels/captions: 12px uppercase tracked

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical (desktop), 64px (mobile)
- Max content width: 1200px, centered
- Grid: 12-column with asymmetric inner gutters
- Card border-radius: 16px
- Button border-radius: 999px (pill)

### Motion Philosophy
- Entrance: opacity 0→1 + translateY(24px→0), 600ms ease-out, staggered 80ms
- Scroll-triggered reveals per section via Intersection Observer
- Hover transitions: 200ms ease
- NO parallax, NO heavy JS animations — motion serves clarity, not spectacle

### Visual Texture
- SVG noise filter (`feGranularTurbulence`) overlaid at 3-4% opacity on full viewport
- Thin rounded corner decorations (SVG arcs, 1px stroke, accent color, 10% opacity)
- Soft radial gradient glows (pastel colors, blurred, positioned in corners)

---

## 3. Layout & Structure

### Page Flow

```
[NAV]          — sticky, frosted glass on scroll
[HERO]         — full viewport, portrait + name + subtitle + orbital line
[TRUST STRIP]  — grayscale partner logos, full-width
[ABOUT]        — bio + skills grid, asymmetric 2-col
[EXPERIENCE]   — vertical timeline, alternating cards
[PROJECTS]     — 2-col masonry-style card grid
[CONTACT]      — centered, minimal form + socials
[FOOTER]       — one-liner, links
```

### Visual Pacing
- Hero: expansive, lots of breathing room
- Trust strip: compressed, horizontal, quiet
- About: balanced asymmetric (60/40 text/visual)
- Experience: linear rhythm, vertical scroll
- Projects: dense but airy — cards have internal padding
- Contact: back to breathing room, minimal

### Responsive Breakpoints
- Desktop: ≥1024px — full layout
- Tablet: 768–1023px — nav collapses to hamburger, single-column sections
- Mobile: <768px — stacked, portrait arch scales, touch targets 44px+

---

## 4. Navigation Bar

**Position:** Fixed top, full-width
**Height:** 72px
**Background:** transparent → `rgba(250, 250, 248, 0.85)` + `backdrop-filter: blur(12px)` on scroll

**Left zone:**
- Monogram logo: 40px circle, filled `--ink`, "nmq" in Syne 700 white, 14px

**Center zone:**
- Nav links: Home · About · Projects · Experience · Contact
- DM Sans 500, 14px, `--ink-muted` default, `--ink` on hover
- Active state: `--accent` color, no underline
- 32px gap between links

**Right zone:**
- "Download CV" pill button: `--accent` background, white text, 14px DM Sans 500
- Download icon (Feather download, 14px)
- 40px height, 20px horizontal padding
- Subtle shadow on hover

---

## 5. Hero Section

**Height:** 100vh minimum, content-centered vertically

**Portrait:**
- Position: center of viewport
- Container: soft arch shape using `clip-path: ellipse()` or SVG mask — NOT a literal arch door, but a rounded top like a portal
- Image: existing `profile.jpg` in arch container, monochrome (CSS `filter: grayscale(100%) contrast(1.05)`)
- Size: 380px × 480px desktop, 280px × 360px mobile
- Shadow: `0 32px 64px rgba(0,0,0,0.10)` under arch

**Orbital Line:**
- SVG path — hand-drawn style continuous curve, mint `--accent` color
- Wraps organically around the portrait subject
- Subtle: 1.5px stroke, 40% opacity, with a slight glow (`filter: drop-shadow`)
- No animation — static, clean

**Curved Text Ring:**
- Circular SVG text on a path near the portrait (not overlapping)
- Text: "Let's Build Something Great ✦"
- Font: Space Mono, 12px, `--ink-muted`, 60% opacity
- Positioned to the right side of portrait, concentric ring ~200px diameter

**Social Icons (left):**
- Vertical stack, left edge of viewport
- 40px spacing between each
- Icons: GitHub, LinkedIn, Email (Feather icon set)
- 20px icons, `--ink-muted` default, `--accent` on hover
- Fade in on load with stagger

**Name:**
- Below portrait, centered
- "Nguyen Minh Quan" in Syne 800, clamp(64px, 10vw, 120px)
- Letter-spacing: -0.03em
- Line-height: 0.9

**Subtitle:**
- Below name, centered
- "AI Researcher // Machine Learning Engineer // Software Developer"
- Space Mono 400, 13px, uppercase, tracked (0.12em)
- `--ink-muted` color
- 24px margin-top

---

## 6. Trust Strip

**Background:** `--bg-alt`
**Padding:** 48px vertical
**Layout:** centered row, flex-wrap

**Logos (grayscale, monochrome, 40% opacity, 120px max-width):**
UTS · HCMUT · AquaGuard · URA Research Group · EPICS · Tech Planter · Google · Microsoft · NVIDIA

**Styling:**
- Grayscale filter on all logos
- Equal horizontal spacing (24px gap)
- Hover: opacity 70%, subtle scale(1.05)
- Max 5 per row, wrap on smaller screens

---

## 7. About Section

**Padding:** 120px vertical
**Layout:** 2-column asymmetric (55% text / 45% visual)

**Left — Bio:**
- Section label: "ABOUT" in Space Mono 12px uppercase, `--accent`, 0.15em tracking
- Heading: "Crafting Intelligent Systems & Meaningful Impact" in Syne 700, 40px
- Bio text: 2-3 paragraphs, DM Sans 400 17px, `--ink-muted`, line-height 1.75
- Skills tags: pill chips in `--accent-light` background, `--ink` text, 12px DM Sans 500

**Right — Visual:**
- Abstract decorative element: overlapping circles in pastel colors, geometric grid lines
- OR: a minimalist infographic showing years of experience, projects count, etc.

---

## 8. Experience Section

**Padding:** 120px vertical
**Layout:** full-width, centered, max 800px content width

**Section label:** "EXPERIENCE"

**Timeline:**
- Vertical line: 1px, `--border` color, absolute positioned left-center
- Timeline cards: positioned alternately left/right of the line (desktop), stacked (mobile)
- Each card:
  - Role title: Syne 700, 22px
  - Company + date: DM Sans 500, 14px, `--ink-faint`
  - Description: DM Sans 400, 15px, `--ink-muted`
  - Tech tags: small pills
  - Card: `--bg-alt` background, 16px radius, subtle border, hover lift

---

## 9. Projects Section

**Padding:** 120px vertical
**Background:** `--bg-alt`

**Layout:** 2-column masonry-style grid (CSS columns or grid with auto-rows)

**Cards:**
- Rounded 16px, overflow hidden
- Project thumbnail/visual: 60% of card height, full-width
- Below thumbnail: title, short description, tags, external links
- Hover: translateY(-4px) + shadow lift
- `--accent` used for tag highlights and link icons

---

## 10. Contact Section

**Padding:** 120px vertical
**Layout:** centered, max 560px

**Heading:** "Let's Work Together" in Syne 700, 48px

**Subtext:** Brief call to action in DM Sans, `--ink-muted`

**Form fields (minimal):**
- Name (text input)
- Email (email input)
- Message (textarea)
- Submit button: pill, `--accent` filled, "Send Message →"

**Social links below form:**
- GitHub, LinkedIn, Email — icon + label horizontal layout

---

## 11. Component Inventory

| Component | States |
|---|---|
| Nav link | default, hover (accent), active (accent + bold) |
| CTA Button (Download CV) | default, hover (shadow + slight scale), active |
| Social Icon | default (ink-muted), hover (accent) |
| Timeline Card | default, hover (lift + shadow) |
| Project Card | default, hover (lift + shadow) |
| Skill Tag | default only |
| Form Input | default, focus (accent border), error (red border) |
| Section Label | uppercase mono, accent color |

---

## 12. Technical Approach

**Stack:** Plain HTML5 + CSS3 + Vanilla JavaScript (IIFE pattern)
- No build step required — open `index.html` directly
- CSS custom properties for the entire design token system
- SVG inline for all icons (Feather icon set, manually extracted)
- Intersection Observer API for scroll-triggered animations
- No external JS dependencies

**File Structure:**
```
portfolio/
├── index.html
├── style.css      (all styles, organized by section)
├── script.js      (animations, nav scroll behavior)
├── assets/
│   └── profile.jpg  (copy from myportfolio/my_website/assets/)
├── docs/
│   └── superpowers/specs/
└── CLAUDE.md
```

**Fonts (Google Fonts):**
- Syne: 400, 700, 800
- DM Sans: 400, 500
- Space Mono: 400

**Performance:**
- Fonts: `display=swap`
- Images: lazy loading
- No web fonts loading all weights — only what's used
- Grain texture: CSS pseudo-element + SVG filter (not an image file)
