# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Nguyen Minh Quan — AI/CS student at UTS & HCMUT, Co-Founder at Odylytics. Plain HTML/CSS/JS, no build step, deployed on Vercel.

**`src/demo/` is the live, deployed site.** `old-portfolio/white-blue-simple-website/` is the archived former live site. Each version has its own `CLAUDE.md`; this root file is the authoritative top-level index.

## Folder Structure

```
myportfolio/
├── vercel.json                        ← Vercel config: outputDirectory → src/demo
├── README.md                          ← live badge, social links
│
├── src/
│   └── demo/                          ← LIVE site (Vercel deploys this)
│       ├── index.html                 ← self-contained: CSS + JS inline
│       ├── assets/
│       ├── logos/
│       ├── certificate/
│       ├── uts-testimonial.jpg
│       └── CLAUDE.md
│
├── docs/superpowers/                  ← design specs + plans (NOT deployed)
│   ├── specs/
│   └── plans/
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
cd src/demo && python3 -m http.server 8090
# → http://localhost:8090

# Archived variants
cd old-portfolio/white-blue-simple-website && python3 -m http.server 8081
cd old-portfolio/scientific-minimal-website && python3 -m http.server 8082
cd old-portfolio/creative-blue-website && python3 -m http.server 8083
cd old-portfolio/creative-goldenblack-website && python3 -m http.server 8084
```

## Deployment

- **Platform:** Vercel — `minhquannguyen.vercel.app`
- **Config:** `vercel.json` at root sets `outputDirectory: "src/demo"`
- **Build:** None — pure static, no build step
- **Trigger:** Push to `main` auto-deploys
- **Note:** `old-portfolio/white-blue-simple-website/` is the archived former live site

## Version Summary

| Version | Path | Status | Purpose |
|---------|------|--------|---------|
| live | `src/demo/` | Live | Current deployed site (steel blue) |
| archived | `old-portfolio/white-blue-simple-website/` | Archived | Former live site (steel blue, simple) |

## Related Docs

- `src/demo/CLAUDE.md` — full internals for the live deployed site
- `README.md` — live badge, social/email contact info
