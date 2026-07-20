# Portfolio Color Update Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement task-by-task.

**Goal:** Restore the light cream editorial portfolio design from the spec, then apply the approved color change (mint green `#5DBB9A` → steel blue `#4A7AB0`).

**Architecture:** Complete CSS/HTML rewrite of `index.html` and `style.css` to match the approved design spec. The dark-navy implementation in the current files is the wrong design — it must be replaced entirely.

---

## Global Constraints

- Background: `#FAFAF8` (light cream, NOT dark navy)
- Text: `#111111` primary, `#6B6B6B` muted
- Accent: `#4A7AB0` (steel blue — replace all `#5DBB9A` mint references)
- Fonts: Bebas Neue (display) · DM Sans (body) · Space Mono (mono)
- GSAP/ScrollTrigger for entrance animations only
- All interactive elements use CSS transitions, not GSAP

---

## File Inventory

| File | Action |
|---|---|
| `index.html` | Rewrite — light cream arch-portrait layout per spec |
| `style.css` | Rewrite — full light cream design system + blue tokens |
| `script.js` | Keep existing (same JS works with new HTML) |

---

### Task 1: Rewrite `style.css` — Light Cream Design System + Steel Blue Accent

**Files:** Rewrite `style.css` entirely

**Design tokens to implement:**

```css
:root {
  --bg:           #FAFAF8;
  --bg-alt:       #F7F7F5;
  --ink:          #111111;
  --ink-muted:    #6B6B6B;
  --ink-faint:    #B0B0A8;
  --accent:       #4A7AB0;  /* was #5DBB9A */
  --accent-light: #D4E2ED;  /* was #D4EDE5 */
  --border:       #E8E8E4;

  /* Pastel glows */
  --glow-pink:     rgba(255, 220, 230, 0.4);
  --glow-lavender: rgba(230, 220, 255, 0.4);
  --glow-mint:     rgba(74, 122, 176, 0.4);  /* was mint, now steel blue */
  --glow-blue:     rgba(210, 230, 255, 0.4);

  /* Fonts */
  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'Space Mono', monospace;
}
```

**Key layout/section CSS (from spec):**
- **Hero:** arch-shaped portrait container (clip-path or SVG mask), two-column: portrait left + bio right
- **Orbital SVG** around portrait: stroke `#4A7AB0`, stroke-width 1.5px, stroke-dashoffset animation on load
- **Curved text ring** badge: "LET'S TALK" curved along circle path, `#4A7AB0` text
- **Left social icons:** fixed or absolutely positioned, Instagram · Behance · LinkedIn, grey icons
- **Client logo strip:** 5 logos at bottom of hero — Oydlytics · UTS · HCMUT · EPICS · Leave a Nest (use `logos/1.png` through `logos/5.png`, all CSS filtered to match the section)
- **Logo strip:** horizontal row, grayscale by default, opacity 0.4, hover → opacity 1
- **Nav:** frosted glass on scroll, "Minh." logo left, nav links center, "Download CV" pill button right
- **"Download CV" button:** solid `#111111` background, white text, pill shape (border-radius 50px)
- **Sections:** About, Projects, Awards/Achievements, Contact — all with `--bg-alt` card backgrounds
- **Tag pills:** `#4A7AB0` background tint, `#4A7AB0` text
- **Reveal animations:** IntersectionObserver adds `.visible` class (opacity 0 → 1, translateY 24px → 0)
- **Grain texture:** CSS pseudo-element with SVG feTurbulence filter

- [ ] Write complete `style.css` (~1200–1500 lines)

---

### Task 2: Rewrite `index.html` — Arch Portrait Layout

**Files:** Rewrite `index.html` entirely

**Structure (top to bottom):**

```html
<!-- Nav: logo left, links center, Download CV pill right -->
<!-- Hero section: -->
  <!-- Left: social icons (Instagram · Behance · LinkedIn) -->
  <!-- Center-left: portrait in arch-shaped container -->
  <!-- Center-right: curved "LET'S TALK" ring -->
  <!-- Right: name, title, bio, CTA, scroll indicator -->
  <!-- Bottom: client logo strip -->
<!-- About section -->
<!-- Projects section -->
<!-- Awards section -->
<!-- Contact section -->
<!-- Footer -->
```

**Hero content:**
- `h1`: NGUYEN MINH QUAN (Bebas Neue, large)
- `p` subtitle: AI RESEARCHER · ML ENGINEER (Space Mono, uppercase, letter-spaced)
- Bio paragraph (from PORTFOLIO_CONTENT.md)
- CTA button: "Get in touch" (links to #contact)
- Portrait: `assets/profile.jpg` inside arch clip
- Orbital SVG overlay on portrait
- Logo strip: `<img src="logos/1.png">` through `logos/5.png` in a strip
- Social icons left: Instagram, Behance, LinkedIn (SVG icons)

**All sections stubbed with realistic placeholder content** — exact content will be updated in a later pass per user's request.

- [ ] Write complete `index.html`

---

### Task 3: Verify in Browser

**Commands:**
```bash
cd /Users/nguyenminhquan/CodeSpace/00_personal/portfolio
python3 -m http.server 8081
# Open http://localhost:8081
```

**Verify checklist:**
- [ ] Background is light cream (`#FAFAF8`), NOT dark navy
- [ ] Portrait is in an arch-shaped container
- [ ] Download CV button is black pill (not green or blue)
- [ ] Accent color is steel blue `#4A7AB0` (mint green is gone)
- [ ] Orbital line around portrait is blue
- [ ] "LET'S TALK" curved ring is blue
- [ ] Left social icons visible
- [ ] 5 client logos in logo strip (grayscale)
- [ ] All scroll-reveal animations work
- [ ] Nav frosted glass activates on scroll
- [ ] No console errors

---

### Task 4: Commit

```bash
git add style.css index.html
git commit -m "feat: restore light cream editorial portfolio with steel blue accent (#4A7AB0)"
```
