# nusx-rmit — Design Specification (REVISED)

**Subject:** Personal hackathon-submission page for Quan Nguyen at NUS × RMIT
(Global Innovation Summit hackathon). Audience: judges + recruiters scanning a
personal portfolio for tech + leadership signal. Single job: communicate "this
is a serious engineer who ships," cleanly.

**Direction:** Black + Red + White + Yellow. **Keep the existing palette family** —
don't pivot to the RMIT Pop palette or to navy. The brief is to FIX the current
palette, not replace it. The current execution reads as cluttered, low-contrast,
and unfinished ("hư, tùm lum"); the redesign makes the same four colors feel
intentional, professional, and easy to read.

**Boldness budget:** discipline, not new colors. Spend it on typography spacing,
contrast ratios, and one signature visual move (a single red gradient sweep on
the hero), not on adding more accents.

**Sphere:** KEEP the particle sphere canvas. It is the existing signature.
Tune the particle colors to harmonize with the cleaned palette.

---

## 1. Token system

### Color — cleaned, audited for contrast

| Token              | Hex       | Role                                       | Contrast vs. surface                  |
|--------------------|-----------|--------------------------------------------|---------------------------------------|
| `--bg`             | `#0A0A0A` | Page background (true near-black, not pure)| —                                     |
| `--bg-raised`      | `#141414` | Cards / raised surface                     | —                                     |
| `--bg-inset`       | `#050505` | Inset / deeper sections                    | —                                     |
| `--paper`          | `#F5F5F2` | Primary text & sparse light surface        | 15.8:1 on `--bg` (AAA)                |
| `--paper-muted`    | `#A8A8A6` | Secondary text                             | 7.4:1 on `--bg` (AAA large, AA body)  |
| `--paper-faint`    | `#6E6E6C` | Tertiary / eyebrows                        | 4.0:1 on `--bg` (AA large)            |
| `--red`            | `#E60028` | RMIT Bright Red — primary accent           | 5.4:1 on `--bg` (AA), 5.1:1 on paper  |
| `--red-deep`       | `#B8001F` | Red hover / deeper red surface             | —                                     |
| `--yellow`         | `#FFCD00` | RMIT gold — highlight / sparse accent      | 12.1:1 on `--bg` (AAA), 1.6:1 on paper |
| `--yellow-muted`   | `#3A3208` | Yellow's "ink" form on dark (text-on-yellow)| —                                   |
| `--rule`           | `#2A2A2A` | Hairlines on dark                          | —                                     |
| `--rule-strong`    | `#3D3D3D` | Stronger dividers                          | —                                     |

**Audit fixes vs. current state:**
- Background moves from `#000000` (harsh, low-texture) to `#0A0A0A` — keeps the
  black feel, lifts slightly so cards have somewhere to sit.
- Body text moves from `#F5F1E8` to `#F5F5F2` — a hair cooler, more neutral,
  easier to pair with the red without competing.
- Red becomes `#E60028` (RMIT spec exact) replacing the current near-burgundy —
  more saturated, more energetic, properly RMIT.
- Yellow is now a SPARSE highlight (only sphere particles, key icons, the
  download-arrow accent) — not a flooding color. Replaces the current yellow
  flood in the stats and pills.
- Yellow text is never used on paper; yellow is always on `--bg` only.

### Type

- **Display:** `Inter Tight` 700/800 — geometric, tight tracking, engineered.
- **Body:** `Inter` 400/500 — continuity with the main portfolio.
- **Mono / labels:** `JetBrains Mono` 500 — project IDs, stage numbers, eyebrows
  that genuinely encode sequence (hackathon stages ARE a sequence).

Loaded from Google Fonts: `Inter+Tight:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500`.

Type scale (clamp for responsive):
`--fs-display: clamp(2.6rem, 6vw, 4.6rem)`,
`--fs-h2: clamp(1.7rem, 3vw, 2.4rem)`,
`--fs-h3: 1.25rem`,
`--fs-body: 1rem`,
`--fs-mono: 0.78rem`.

### Spacing & layout

- `--max-w: 1280px`
- `--grid-margin: clamp(24px, 5vw, 64px)`
- `--s1…--s7` — base-8 scale
- Section vertical rhythm: `--s7` between sections

---

## 2. Signature device

The **red gradient sweep** on the hero: a single diagonal red→transparent
gradient bar that sits behind the display headline on the left side of the
hero. It's the one piece of "design" on a page that's otherwise pure black +
type. Replaces the cluttered yellow halos and badge floods currently
scattered through the hero/stats/about.

**Sphere:** keep. Tune particle palette to `--paper` and `--yellow` only
(was: paper + yellow + navy + red + multi-stop). Two colors, not five.

Three placements of red as a unifying motif:
1. Hero left gradient sweep (signature)
2. Single hairline `--red` line under each section title (≤1px, low opacity)
3. Project card accent strip on the pinned project carousel

---

## 3. Layout prose

**Hero** — Two-column at desktop, stacked at ≤900px. Left: oversized Inter Tight
display headline ("Where research becomes readiness"), eyebrow in JetBrains Mono
("NUS × RMIT / GLOBAL INNOVATION SUMMIT / 2026"), short body, two CTAs (primary
red solid, secondary ghost white). Right: the existing sphere canvas.
Top nav above, frosted on scroll.

**Stats** — Clean four-column row. Mono-typed numbers (`01+`, `05x`, `03x`,
`07x`), `--paper` labels. Yellow used only on the corner badge glyph (not in
the stat body). Generous vertical breathing room (was: cramped).

**About / Education** — Sticky left column with portrait + name + mono-typed
meta (`// QUAN NGUYEN · 2026 · HO CHI MINH CITY`). Right column: bio +
education timeline in a single column with thin left-borders.

**Experiences** — Timeline, vertical, with mono-typed year markers on the
left (`2024 —`, `2023 —`) and a 2px red vertical line connecting them. The
existing structure stays; just the red thread becomes the unifying mark.

**Projects** — Each project is a full-bleed row with media on one side, copy
on the other. Project color (was: red/aqua/lime) collapses to: red accent
strip on every project (no per-project palette — that was the source of the
"tùm lum"). Sliders stay; previous/next in white outline.

**Contact / Footer** — `--bg-inset`, centered hero-style CTA, social icons,
mono copyright.

---

## 4. Motion (deliberate, restrained)

- Hero entrance: word-by-word fade-in on the display headline via CSS
  `@keyframes` with staggered `animation-delay`. Pure CSS.
- Sphere: keep the existing canvas particle animation. Update particle palette
  to paper + yellow only.
- Scroll reveal: sections fade in on viewport entry. Single IntersectionObserver.
- Hover on CTAs and project rows: subtle surface lift via `transform` +
  `box-shadow`, not color flicker.
- `prefers-reduced-motion: reduce` — disables all transitions/animations.

---

## 5. Content & copy guidance

- Headlines use sentence case ("Where research becomes readiness"), not
  Title Case.
- CTAs use verb-noun ("View project", "Read CV"), not "Submit" / "Learn more".
- No "Welcome to my portfolio." Hero headline states what the person does
  + where.
- Tech-stack tags are nouns in mono ("React", "Python", "Node.js").
- No emoji anywhere.

---

## 6. Implementation notes

- Single `style.css` rewrite. Tokens in `:root`, components below.
- `script.js` — keep everything. Sphere stays. Nav, slider, reveal, toast,
  modal all stay.
- `index.html` — only change: drop the per-project color class (use red
  uniformly), drop yellow badges in stats (use mono numerals), update eyebrow
  spans to use `--fs-mono` class.
- `assets/` — no changes.
- Responsive: ≤1024 tighten hero, ≤900 single column, ≤600 contact/hero CTA
  stack.
