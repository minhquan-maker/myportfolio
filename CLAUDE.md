# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Nguyen Minh Quan — AI/CS student at UTS & HCMUT, Co-Founder at Odylytics. Plain HTML/CSS/JS, no build step, deployed on Vercel.

**`main-portfolio/` is the live, deployed site.** `old-portfolio/white-blue-simple-website/` is the archived former live site. Each version has its own `CLAUDE.md`; this root file is the authoritative top-level index. Recent changes: certificate preview modal (open PDFs and images in-page instead of new tab) and a unified `--radius` design token applied to all rectangle elements.

## Folder Structure

```
myportfolio/
├── vercel.json                        ← Vercel config: outputDirectory → main-portfolio
├── README.md                          ← live badge, social links
│
├── main-portfolio/                    ← LIVE site (Vercel deploys this)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── CLAUDE.md
│   └── assets/                        ← certificates/, logos/, media/, projects/, testimonials/, my_resume.pdf
│
├── docs/superpowers/                  ← design specs + plans (NOT deployed)
│
├── old-portfolio/                    ← archived website variants (gitignored)
│   ├── white-blue-simple-website/     ← former live site (now archived)
│   ├── scientific-minimal-website/
│   ├── creative-blue-website/
│   └── creative-goldenblack-website/
│
└── style-demos/                      ← standalone style experiments (gitignored)
    ├── 01-bold-editorial.html
    ├── 02-organic-editorial.html
    ├── 03-dark-studio.html
    └── 04-dribbble-ref.html
```

## Tooling

No build, lint, or test tooling — pure static files. No `package.json`, Makefile, or bundler.

```bash
# Live site (steel blue editorial)
cd main-portfolio && python3 -m http.server 8090
# → http://localhost:8090

# Archived variants
cd old-portfolio/white-blue-simple-website && python3 -m http.server 8081
cd old-portfolio/scientific-minimal-website && python3 -m http.server 8082
cd old-portfolio/creative-blue-website && python3 -m http.server 8083
cd old-portfolio/creative-goldenblack-website && python3 -m http.server 8084
```

## Deployment

- **Platform:** Vercel — `minhquannguyen.vercel.app`
- **Config:** `vercel.json` at root sets `outputDirectory: "main-portfolio"`
- **Build:** None — pure static, no build step
- **Trigger:** Push to `main` auto-deploys
- **Note:** `old-portfolio/white-blue-simple-website/` is the archived former live site

## Version Summary

| Version | Path | Status | Purpose |
|---------|------|--------|---------|
| live | `main-portfolio/` | Live | Current deployed site (steel blue) |
| archived | `old-portfolio/white-blue-simple-website/` | Archived | Former live site (steel blue, simple) |

## Recent Changes

- **Certificate preview modal** — Six certificate links in the Recognition section now open PDFs in an iframe and images in an `img` element via a modal overlay, instead of opening a new browser tab. Closes via the close button, backdrop click, or `Escape`. Modal state is in `script.js` under the `certificateModal` IIFE; markup lives in `#certificate-modal` near the end of `index.html`; styles live under `CERTIFICATE MODAL` in `style.css`.
- **Unified rectangle radius** — All rectangle elements (cards, buttons, chips, tags, modal, toast, scrollbar, remaining rectangle frames) share a single `--radius: 14px` token. Pill shapes (`999px`) and circle elements (`50%`) are preserved. Project rows and about photo frames declare `overflow: hidden` so media content conforms to the rounded corners.

## Related Docs

- `main-portfolio/CLAUDE.md` — full internals for the live deployed site (design system, scroll animations, JS modules, responsive breakpoints)
- `docs/superpowers/specs/` — design specs for the certificate modal and border-radius unification
- `docs/superpowers/plans/` — implementation plans for the same
- `README.md` — live badge, social/email contact info

## Important Constraints

- `old-portfolio/` is gitignored. The archived former live site lives only on the local machine — it will NOT survive a fresh clone. Use it as a local reference only.
- `CLAUDE.md` files are themselves gitignored. The root file and `main-portfolio/CLAUDE.md` are tracked via `git add -f`; new ones you create will not be committed unless you force-add them.
- `*.pdf` is gitignored by default. The exception `!main-portfolio/**/*.pdf` ensures Vercel can serve resume and certificate PDFs. If you add PDFs elsewhere, they will be silently excluded from deploy.