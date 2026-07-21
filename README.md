<div align="center">

# Nguyen Minh Quan

**AI research student · Founder · Builder of things that matter**

Building technology at the intersection of **Computer Vision**, **Human-Centered AI**, and **Disaster Response**.

[![Live](https://img.shields.io/badge/🌐_Live-minhquannguyen.vercel.app-000?style=for-the-badge&logo=vercel&logoColor=white)](https://minhquannguyen.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-minhquan--maker-181717?style=for-the-badge&logo=github)](https://github.com/minhquan-maker)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ngminhquan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ngminhquan/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0008--9621--1326-A6CE39?style=for-the-badge&logo=orcid&logoColor=white)](https://orcid.org/0009-0008-9621-1326)

</div>

---

## ✨ What is this?

This repository holds the **source code** of my personal portfolio site — the one you can visit at **[minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/)**.

A single-page, no-build, plain-HTML/CSS/JS site that documents:

- Who I am and where I studied
- The work I've shipped (AquaGuard, the drone CV system, the carbon calculator)
- My publications and awards
- How to reach me

The live, deployed site lives in [`main-portfolio/`](./main-portfolio). Earlier iterations are archived under [`old-portfolio/`](./old-portfolio).

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

> **No build step. No framework. No bundler.** Just three files: `index.html`, `style.css`, `script.js`.

**Fonts** — Bebas Neue (display) · DM Sans (body) · Space Mono (mono) · Lora (editorial italic) · Playfair Display (nav logo)

---

## 📐 Design Tokens

A small set of CSS custom properties drives the entire visual system.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FAFAF8` | — |
| `--bg-alt` | `#F7F7F5` | — |
| `--ink` | `#111111` | — |
| `--ink-muted` | `#6B6B6B` | — |
| `--accent` | `#4A7AB0` | — |
| `--border` | `#E8E8E4` | — |

> Light theme only — dark mode is intentionally not exposed to keep the editorial feel consistent.

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio/main-portfolio

# Serve (any static server works)
python3 -m http.server 8081
# → http://localhost:8081
```

No install, no dependencies, no environment variables.

---

## 📁 Repository Structure

```
myportfolio/
├── main-portfolio/                ← LIVE site (Vercel auto-deploys this)
│   ├── index.html                 # all sections, inline
│   ├── style.css                  # design tokens + sections
│   ├── script.js                  # all JS in one IIFE
│   ├── assets/
│   │   ├── profile.jpg
│   │   └── my_resume.pdf
│   ├── logos/                     # 11 brand PNGs
│   ├── certificate/               # per-award proofs (gitignored)
│   ├── docs/superpowers/          # design specs + plans (not deployed)
│   └── CLAUDE.md                  # internals
│
├── old-portfolio/                 # previous website variants
│   ├── scientific-minimal-website/
│   ├── creative-blue-website/
│   └── creative-goldenblack-website/
│
├── CLAUDE.md                      # top-level architecture notes
├── vercel.json                    # outputDirectory: "main-portfolio"
└── README.md                      # you are here
```

---

## 🌐 Deployment

- **Platform** — [Vercel](https://vercel.com) (static)
- **URL** — [minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/)
- **Trigger** — push to `main` → auto-deploys (no CI, no env vars)
- **Build** — none. The deployed bundle is the three source files plus `assets/`, `logos/`, and `certificate/` as-is.

---

## 🛠️ Sections on the Live Site

| # | Section | Highlights |
|---|---|---|
| 1 | **Hero** | Name, role, live stats (IELTS · SAT · Awards · Clubs), 7-logo affiliation strip |
| 2 | **About** | UTS + HCMUT timeline (4 schools, expand to reveal) |
| 3 | **Experiences** | 4 cards → modals (Odylytics, URA Research, MC, Invited Speaker) |
| 4 | **Projects** | AquaGuard · Drone CV · Carbon Footprint Calculator |
| 5 | **Publications** | CTSK-Former — KSE 2026 paper card with toggleable detail |
| 6 | **Recognition** | 3 testimonials + 6 honors + 4 media coverage cards |
| 7 | **Contact** | Email · Phone · LinkedIn · GitHub · ORCID |

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

<sub>Last updated: July 2026 · © Nguyen Minh Quan</sub>

</div>
