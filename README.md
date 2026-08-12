<div align="center">

# Nguyen Minh Quan

**AI research student · Engineer · Co-Founder**

Building technology at the intersection of **Computer Vision**, **Human-Centered AI**, and **Disaster Response**.

[![Live](https://img.shields.io/badge/🌐_Live-minhquannguyen.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white)](https://minhquannguyen.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-minhquan--maker-181717?style=for-the-badge&logo=github)](https://github.com/minhquan-maker)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ngminhquan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ngminhquan/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0008--9621--1326-A6CE39?style=for-the-badge&logo=orcid&logoColor=white)](https://orcid.org/0009-0008-9621-1326)

</div>

---

## ✨ What is this?

The source of **[minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/)** — my personal portfolio site.

A single-page, no-build, plain HTML/CSS/JS site that documents who I am, the work I've shipped (AquaGuard, the drone CV system, the carbon calculator), my publications and awards, and how to reach me.

- **Live site source:** [`main-portfolio/`](./main-portfolio) — Vercel auto-deploys this on push to `main`
- **Archived former live site:** [`old-portfolio/white-blue-simple-website/`](./old-portfolio/white-blue-simple-website) (gitignored, local only)
- **Earlier iterations:** [`old-portfolio/`](./old-portfolio) (scientific-minimal, creative-blue, creative-goldenblack)

---

## 🎯 The Highlights

| | |
|---|---|
| 🎓 **Now** | B. of AI @ UTS Sydney · High Distinction WAM (6.6/7.0) |
| 🏆 **Latest** | **1st Place** — EPICS 8th @ Arizona State University (2026) |
| 📄 **Research** | CTSK-Former — *to be submitted* to KSE 2026 |
| 🚀 **Building** | [AquaGuard](https://aquaguard.vn) · Disaster-management platform for VN |
| 🤝 **Co-founder of** | [Odylytics](https://odylytics.com) — public digital infrastructure |

---

## 🧱 Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

> **No build step. No framework. No bundler.** Three source files (`index.html`, `style.css`, `script.js`) plus `assets/`.

**Fonts** — Inter (grotesk sans) + Cormorant Garamond (italic serif accent), loaded from Google Fonts.

---

## 📐 Design Tokens

A small set of CSS custom properties drives the entire visual system.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F4F5F7` | Page background |
| `--bg-alt` | `#E8EAEF` | Alternating sections |
| `--bg-dark` | `#D0D3DC` | Project image placeholders |
| `--ink` | `#111111` | Primary text |
| `--ink-muted` | `#3A3A3A` | Secondary text |
| `--accent` | `#2D4A6B` | CTAs, links, highlights (steel blue) |
| `--border` | `#C8CBD6` | Dividers, card borders |

> Light theme only — dark mode is intentionally not exposed to keep the editorial feel consistent.

---

## 🚀 Getting Started

```bash
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio/main-portfolio

# Serve (any static server works)
python3 -m http.server 8090
# → http://localhost:8090
```

No install, no dependencies, no environment variables.

---

## 📁 Repository Structure

```
myportfolio/
├── main-portfolio/                ← LIVE site (Vercel auto-deploys this)
│   ├── index.html                 # all sections, markup only
│   ├── style.css                  # design tokens + components + responsive
│   ├── script.js                  # nav, scroll reveal, sliders, certificate modal
│   ├── assets/                    # media/, projects/, certificates/, logos/, testimonials/, my_resume.pdf
│   └── CLAUDE.md                  # internals for the live site
│
├── docs/superpowers/              # design specs + plans (not deployed)
│
├── old-portfolio/                 # archived website variants (gitignored, local only)
│   ├── white-blue-simple-website/ ← former live site
│   ├── scientific-minimal-website/
│   ├── creative-blue-website/
│   └── creative-goldenblack-website/
│
├── style-demos/                   # standalone style experiments (gitignored)
├── CLAUDE.md                      # top-level architecture notes
├── vercel.json                    # outputDirectory: "main-portfolio"
└── README.md                      # you are here
```

---

## 🌐 Deployment

- **Platform** — [Vercel](https://vercel.com) (static)
- **URL** — [minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/)
- **Config** — `vercel.json` sets `outputDirectory: "main-portfolio"`
- **Trigger** — push to `main` → auto-deploys (no CI, no env vars)
- **Build** — none. The deployed bundle is `index.html`, `style.css`, `script.js`, plus `assets/`, served as-is.

---

## 🛠️ Sections on the Live Site

| # | Section | Highlights |
|---|---|---|
| 1 | **Hero** | Name, role, UTS eyebrow, portrait, 4-stat strip (IELTS · Research · Clubs · Awards) |
| 2 | **About / Education** | Sticky left column, 4-school timeline (UTS · HCMUT · CIS · Long Thanh) |
| 3 | **Experiences** | Vertical timeline (Odylytics · URA · MC · Invited Speaker) with "View all" collapse |
| 4 | **Projects** | AquaGuard · AirGuard · Carbon Footprint · Flood Detection (videos + images) |
| 5 | **Publications** | CTSK-Former — KSE 2026 paper card |
| 6 | **Recognition** | 3 testimonials + 6 honors + 4 media coverage cards |
| 7 | **Contact** | 6-card grid (Email · Phone · LinkedIn · GitHub · ORCID · AquaGuard) |

---

## 🤝 Connect

| | |
|---|---|
| 🌐 **Live site** | [minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/) |
| 🐙 **GitHub** | [@minhquan-maker](https://github.com/minhquan-maker) |
| 💼 **LinkedIn** | [ngminhquan](https://www.linkedin.com/in/ngminhquan/) |
| 📧 **School Email** | minhquan.nguyen-2@student.uts.edu.au |
| 📧 **Personal Email** | minhquan.alex2512@gmail.com |
| 📱 **Phone** | +84 908 538 467 |
| 🔬 **ORCID** | [0009-0008-9621-1326](https://orcid.org/0009-0008-9621-1326) |

---

<div align="center">

<sub>Last updated: August 2026 · © Nguyen Minh Quan</sub>

</div>