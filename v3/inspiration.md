# Design Inspiration: longstnguyen.com

## 1. Build& Technology Stack

**Plain HTML/CSS/JS — zero build tools.** Same approach as our v1.

```
/assets/css/app/style.css   ← 2388 lines CSS
/assets/js/app/main.js      ← 371 lines JS
index.html                 ← 1280 lines HTML
```

- **CSS**: Vanilla CSS + CSS Custom Properties (variables). No preprocessor.
- **JS**: Vanilla JS + **jQuery** (for `$`, `.waypoint`, `.animate-box`)
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts — Optima (body), serif fallback for headings
- **No bundler** — static hosting (likely GitHub Pages or Vercel static)
- **No framework** — SPA feel but pure HTML routing (each page = separate HTML file)

---

## 2. Design System

### Light/Dark Mode Toggle

Toggle via `html[data-theme="light|dark"]` + localStorage persistence:

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Primary | `#2c98f0` (blue) | `#4ea3ff` |
| Text | `rgba(0,0,0,0.75)` | `rgba(255,255,255,0.78)` |
| Background | `#ffffff` | `#0f141b` |
| BG Secondary | `#f2f3f7` | `#151b24` |
| Border | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.1)` |

**Font body**: `Optima, Arial, sans-serif` — 17px, line-height 1.8
**Transitions**: 0.5s ease for link colors

### Color Palette

- Primary accent: `#2c98f0` (blue) — links, active states, highlights
- This differs from our v1 (black + gold `#f0c93a`) and v2 (dark + accent)

---

## 3. Layout: CV-Style Sidebar

```
┌──────────────┬────────────────────────────────┐
│   SIDEBAR     │ MAIN CONTENT                   │
│  (fixed/sticky)│                                │
│              │  About / Education / Experience │
│  - Avatar    │  / Skills / Publications /      │
│  - Name      │  / Projects / Latest News /     │
│  - Title     │  / Contact                      │
│  - Nav links │                                │
│  - Socials   │                                │
└──────────────┴────────────────────────────────┘
```

**Key differences from our v1/v2:**
- v1/v2: Full-page scrolling sections, no sidebar
- longstnguyen: Fixed sidebar (pill-style) + scrollable main content

---

## 4. Sections (in order)

1. **Home/About** — intro block
2. **Education** — degrees, GPA, coursework
3. **Experience** — roles with bullet points
4. **Skills** — technical + languages
5. **Publications** — dedicated section (we don't have this)
6. **Projects** — project cards
7. **Latest News** — scrollable event list with fade hint
8. **Contact** — contact info + form/socials

---

## 5. Animations

### Scroll Animations (jQuery Waypoint)

```css
.animate-box { opacity: 0; }
.animate-box.animated { opacity: 1; }
```

4 effect types: `fadeIn`, `fadeInLeft`, `fadeInRight`, `fadeInUp`
Stagger delay: 200ms between siblings
Trigger offset: 85% viewport height

**Note:** Could replace jQuery Waypoint with vanilla `IntersectionObserver` for lighter weight.

### Latest News Scrollable List

- Shows N items (default 8) with scroll overflow
- Bottom fade gradient hints scrollability
- Hidden scrollbar, visible on hover
- Responsive: full-bleed on mobile

### Navigation

- Active nav item highlights as user scrolls to corresponding section
- Smooth scroll with `offset: 55px` (navbar height)
- Offcanvas mobile menu (hamburger)

### Theme Toggle

- Label shows the mode *to switch to* (e.g., in light mode → label says "Dark")

---

## 6. SEO

Very thorough:
- Full Open Graph + Twitter Card meta tags
- **Schema.org JSON-LD** (`Person` type) with 5 alternate names
- Canonical URL
- Google site verification meta tags
- Semantic HTML: `<section data-section="...">`

---

## 7. What to Borrow for v3

| Feature | From longstnguyen | Status for v3 |
|---------|-------------------|---------------|
| Light/Dark toggle | Yes | Must have |
| Sidebar layout | Fixed pill-style | Must have |
| Publications section | Dedicated | Must have |
| Latest News | Scrollable + fade | Optional |
| Schema.org JSON-LD | Full Person schema | Must have |
| Scroll animations | jQuery Waypoint | Use IntersectionObserver instead |
| Contact section | Form + socials | Must have |
| Semantic HTML sections | `data-section` attrs | Must have |
| SEO meta | OG + Twitter Card | Must have |

---

## 8. Design Tokens to Steal

```css
/* Sidebar */
--sidebar-width: 280px;
--primary: #2c98f0;
--text: rgba(0,0,0,0.75);
--bg: #ffffff;
--bg-alt: #f2f3f7;
--border: rgba(0,0,0,0.08);

/* Nav */
--nav-height: 55px;
--transition: 0.5s ease;

/* Scroll reveal */
--waypoint-offset: 85%;
--stagger-delay: 200ms;
```

---

## 9. File Structure Reference

```
longstnguyen.com/
├── index.html              ← 1280 lines, all sections in one file
├── assets/
│   ├── css/app/
│   │   └── style.css       ← 2388 lines, all styles
│   ├── js/app/
│   │   └── main.js         ← 371 lines, all JS
│   └── img/
│       └── Long-CAIR.png   ← profile avatar
└── robots.txt
```

For v3, we should keep the same flat structure: `index.html` + `style.css` + `script.js`.
