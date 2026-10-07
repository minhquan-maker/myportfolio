# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Nguyen Minh Quan: a single-page static site in plain HTML/CSS/JS with **no build step, bundler, framework, or dependencies**. The repository root is the live site on Vercel (`minhquannguyen.vercel.app`), and every push to `main` deploys automatically.

```bash
python3 -m http.server 8090     # → http://localhost:8090
node -c script.js               # JS syntax check (there are no tests or linters)
```

`vercel.json` pins the root as a static site (`framework: null`, `outputDirectory: "."`, every command `null`).

Vercel serves everything at the root, docs included. `CLAUDE.md` is listed in `.gitignore`, but it is already tracked, so edits are still committed and deployed. `DESIGN.md` holds the palette notes, but its prose comes from an older brief, so treat `style.css` as the source of truth.

## Architecture

**3-file layout (root only):**
- `index.html`: all markup and content
- `style.css`: all CSS, in this order: tokens → reset → nav + mega → hero → buttons → stats → bracket eyebrow → about → experience → projects → recognition/press/publications → footer → reveal → responsive → reduced motion → pixel-me
- `script.js`: two IIFEs, the main site module and `pixelMe`
- `assets/`: all media

**DOM order:**

| Element | Notes |
|---|---|
| `header.nav#nav` | fixed header: brand, `nav.nav__bar#navLinks` (5 `.nav__item` buttons + `.nav__mobile-cta`), `.nav__tools` (resume button + `#navToggle`), mega panels in `#mega > #megaStage` |
| `section.hero#top` | headline, lede, CTAs, `.hero__meta`, particle sphere `canvas#sphere`, scroll cue |
| `div.stats.reveal` | four `.stat__num[data-count]` counters |
| `section#about` | `01 ABOUT` (profile column `.about__left` + bio `.about__right`) and `02 EDUCATION` (`.edu-list`) |
| `section#exp` | `03 EXPERIENCES`: four `article.exp-card[data-exp]` in `.exp-grid` |
| `section#projects.proj-pin` | `04 WORK`: horizontal `.proj-track#projTrack` of `.proj-card`s, plus prev/progress/next controls |
| `section#recog` | `05 RECOGNITION` (`.award-list` + `.rec-photos`), `06 PRESS` (`.press-grid`), `07 PUBLICATIONS` (`#publications`, `.rec-list.pub-list`) |
| `footer.footer#contact` | `08 CONTACT`: a solid navy block, not a `<section>` |

Section headings follow one pattern: a `.bracket` eyebrow (`<em>NN</em> LABEL`, numbered 01–08) followed by an `h2` whose `<em>` turns terracotta. The `<em>` is not italic.

## Design System

**Tokens (`:root` in `style.css`).** The names are legacy, so read them by role:

| Token | Value | Role |
|---|---|---|
| `--bg` / `--bg-raised` / `--bg-inset` | `#FFFFFF` / `#EFEBE2` / `#E3DED2` | page / cards / projects band |
| `--paper` / `--paper-muted` / `--paper-faint` | `#0E1A33` / `#36425F` / `#5D6985` | navy ink: text, secondary, tertiary |
| `--red` / `--red-deep` | `#C4501F` / `#9C3F14` | **terracotta** primary accent / hover |
| `--yellow` / `--amber-ink` | `#F0B35A` / `#A8691A` | amber fill / amber for text on light |
| `--on-accent` | `#FFFFFF` | text on terracotta |
| `--rule` / `--rule-strong` | `#C3C8D4` / `#98A0B4` | hairlines |

`.footer` re-scopes the same tokens to light-on-navy (`--bg: #0E1A33`, `--paper: #F4F1EA`, `--red: #E8814F`, …), so components inside it need no dark-mode overrides. The projects band goes navy (`#0A1428`) while `.proj-pin.is-lit` is set.

**Fonts** (Google Fonts): `--font-display` Inter Tight 600/700/800 for headings, `--font-body` Inter 400/500/600, and `--font-mono` JetBrains Mono 500 for eyebrows, labels, tags, buttons and numbers.

**Scale:** `--s1`…`--s7` = 4 / 8 / 12 / 16 / 24 / 40 / 80px. Other layout tokens: `--pad: clamp(24px, 5vw, 64px)` (side gutter), `--max-w: 1280px`, `--nav-h`, `--ease-out`. Type tokens: `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-small`, `--fs-mono`. Sections use `padding: var(--s7) var(--pad)`.

**Components:**
- `.btn`: outline, mono, uppercase.
- `.btn--yellow`: primary CTA.
- `.btn--red`: terracotta fill.
- `.tag` / `.tag--red` / `.tag--yellow`: experience labels.
- `.badge` / `.badge--red` / `.badge--yellow`: award and publication status (WINNER / RUNNER-UP / outline).

## JS Modules (`script.js`)

Every lookup is guarded, so a missing element must not throw. Two dead hooks, `#scrollProgress` and `#dragCue`, have no markup.

| Module | Behavior |
|---|---|
| Particle sphere | `canvas#sphere`: 320 Fibonacci points with auto-spin, eased pointer tilt and drag inertia. Particles are navy with sparse terracotta and amber points. Reduced motion draws one static frame. |
| Nav height | on desktop, writes the **`.nav__bar`** height into `--nav-h` inline. At ≤980px it removes that inline value instead, because the bar is the menu sheet there, and CSS supplies `64px`. |
| Nav hide/reveal | hides on scroll down, reveals on scroll up or when the cursor reaches the top, and stays hidden while the footer is visible. |
| Sliding pill + mega | `.nav__pill` slides to the hovered or focused `.nav__item` (`.is-lit`). Hover or click opens `.mega[data-mega-panel]`, sized by its inner height. Panels close on mouseleave, scroll past 60px, Escape, or an outside click. |
| Mobile menu | `#navToggle` calls `setMobileNav()`, which toggles `.is-mobile-open` on the bar, `.is-menu-open` on the nav, `html.nav-lock` (scroll lock), and the toggle's `aria-expanded`/`aria-label`. Tapping an item closes the menu first and then scrolls to `data-target`. Escape, an outside tap, or a resize above 980px also close it. |
| Scroll reveal | one `IntersectionObserver` on `.reveal` (threshold `0.1`, rootMargin `0px 0px -100px 0px`). It **adds `.visible` on enter and removes it on leave**, so animations replay. Elements already in view are revealed on load. |
| Experience cards | a separate observer on `[data-exp]` adds `.is-visible` with a 110ms stagger per card, and replays too. |
| Counters | animate `.stat__num` from `data-count` once, rewriting only the first text node so the `<sup>` suffix survives. |
| Projects | Above 980px (and without reduced motion) the section is **pinned**: its height becomes `innerHeight + overflow × 1.4`, and page scroll drives `scrollLeft` through a lerp. At ≤980px the track scrolls natively with scroll-snap. The card nearest a moving focus point gets `.is-active`. `.proj-pin.is-lit` (mid-viewport) dims the other cards. Videos play when visible and pause otherwise. Prev/next step one card plus the computed `column-gap`. Mouse drag scrubs on desktop. |
| Scrollspy | an `IntersectionObserver` on `#top` and the five sections, using a thin band at 40% of the viewport (`rootMargin: -40% 0px -59% 0px`). The section crossing the band becomes `pillRest`, which is the nav item whose `data-target` matches its id. The hero matches no item, so the pill goes to rest. This works for sections taller than the screen. |
| Pixel me | a 16×20 canvas self-portrait in the bottom-left that walks in, plays two animations, and leaves. It returns when the page is idle and shows a speech bubble on click. It is skipped for reduced motion and at ≤480px. |

Breakpoints in JS (`980`, `1024` for the unused `data-nav-collapsed` attribute, `480`) must stay in sync with the CSS.

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| 981–1180px | desktop nav tightened so the resume button doesn't wrap |
| ≤1100px | hero keeps two columns (`1.25fr 0.75fr`). About stacks, with the profile shown as a 220px photo beside its meta. Experience, recognition and footer columns collapse. |
| ≤980px | `--nav-h: 64px`. A CSS hamburger (`.nav__burger`, turns into an X via `aria-expanded`) opens a full-screen sheet with numbered items and `.nav__mobile-cta`. Mega panels are hidden. Stats and press go to 2 columns. The project track bleeds to the screen edges with `scroll-snap`. |
| ≤880px | footer and recognition grids go to a single column |
| ≤600px | phone layout. Token overrides: `--pad: 20px`, `--s7: 56px`, `--fs-h2`, `--fs-mono`, `--fs-small`. Hero is a flex column with the sphere above the headline (`pointer-events: none`) and CTAs two-up. Stats become tiles. **About is reordered** (`.about__right { display: contents }` plus `order`): heading, profile card, bio (ragged-right, not justified), education timeline. Awards become rows. Photos and press become edge-to-edge swipe rows, with `.reveal` disabled on them because horizontally off-screen cards never intersect. Footer links use 2 columns. |
| ≤480px | pixel-me hidden |
| ≤359px | hero CTAs stack |
| `hover: none` | cancels sticky hover lifts after a tap |

**Reduced motion:** the `prefers-reduced-motion` block near the end of `style.css` zeroes animations and transitions and shows `.reveal` and `.exp-card` immediately. Keep it when editing animations.

## Projects & Media

Five `.proj-card`s. Each has `.proj-card__num`, `.proj-card__media` (a muted/loop/playsinline `video.proj-card__video` or an `img.proj-card__img`) and `.proj-card__body` (h3, p, `.proj-card__tags` spans, a `.btn`):

1. **AquaGuard**: `aquaguard/aquaguard-cut1.mp4` (poster `flood-detection/flood-detection1.png`), links to aquaguard.vn
2. **EnableCode**: `enablecode/enablecode.mp4`, links to enablecode.vercel.app
3. **Includio**: `includio/includio-hero.jpg`, links to includio.odylytics.com
4. **AirGuard**: `airguard/airguard-cut1.mp4`, "Ask for a demo" goes to `#contact`
5. **Carbon Footprint**: `carbon-footprint/carbon-footprint-1.mp4`, "Ask for a demo" goes to `#contact`

A `.proj-card--maint` placeholder variant (striped media plus a "+" glyph) is styled for projects without media yet.

## Assets

Referenced by the live page:
- `assets/my_resume.pdf`: resume. `.gitignore` exempts `assets/**/*.pdf` from its blanket `*.pdf` rule.
- `assets/media/`: `profile.jpg`, `epics-first-place.jpg`, `aquaguard-team.jpg`
- `assets/logos/press/`: `vnexpress`, `vietnamvn`, `tainangviet`, `lsts`, `htv` (`.png`)
- `assets/projects/<name>/`: the project media above

Present but **unused** by the current page: `assets/certificates/`, `assets/icons/`, `assets/shapes/`, `assets/testimonials/`, `assets/logos/1.png`…`13.png`, `airguard-cut2/3.mp4`, `aquaguard-cut2.mp4`, `enablecode.mov`. They are left over from earlier designs, and there is no certificate modal any more.

## Adding Content

- **Experience:** add an `article.exp-card[data-exp]` to `.exp-grid` and update the `NN/04` counters and the `.exp__lede` count.
- **Project:** add an `article.proj-card` to `#projTrack`. Pinning, the active card and the progress bar adapt automatically.
- **Award:** add a `.award.reveal` row (ord, `.award__main`, `.award__level`, `.award__year`, `.badge`). Stagger delays are set per `nth-child` up to 7.
- **Press:** add an `a.press-card.reveal` before the `.press-card--soon` placeholder.
- **Publication:** add a `.rec-item.reveal` to `.pub-list`.
- **Nav/mega:** each `.nav__item` needs `data-mega` (matching a `.mega[data-mega-panel]`) and `data-target` (the section id, used by mobile scrolling and the scrollspy). A new section also has to be added to the scrollspy id list in `script.js`.

## Verifying Changes

There is no automated check beyond `node -c script.js`. Look at layout changes in a browser at phone widths (360–430px), tablet (768 / 1024px) and desktop (1440px), check that nothing scrolls horizontally, and open the mobile menu.

## Archive

Old versions live in a local `archive/`, which is git-ignored and not deployed. Do not edit archive copies as if they were the live site.
