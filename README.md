# Quan Minh Nguyen — Portfolio

AI research student at UTS Sydney & HCMUT. Building technology for real-world impact — from flood emergency management to explainable AI.

[![Live](https://img.shields.io/badge/Live-Vercel-000?style=flat-square&logo=vercel)](https://minhquannguyen.vercel.app/)
[![Platform](https://img.shields.io/badge/Platform-Web-blue?style=flat-square)](https://minhquannguyen.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](#)

---

## About Me

```
Quan Minh Nguyen
├── 🎓 AI Research — UTS Sydney · HCMUT
├── 🔬 Research — Computer Vision · XAI · Human Action Recognition
├── 🔬 Founder & Lead — AquaGuard Flood Rescue Platform
└── 💼 Member — URA Research Group, HCMUT
```

---

## Site Structure

```
my_website/          ← production (live)
  index.html         single-page with sidebar nav
  style.css          dark/light theme via CSS variables
  script.js          theme toggle, mobile nav, scroll
  assets/
    my_resume.pdf    academic CV

old_websites/        archived v1 (dark/gold, GSAP + ScrollTrigger)
  index.html
  styles.css
  script.js
  img/
```

---

## Sections

| Section | Content |
|---------|---------|
| **About** | Background, research interests, current work |
| **Education** | UTS & HCMUT degrees, coursework highlights |
| **Experience** | Research roles, URA Group, AquaGuard leadership |
| **Publications** | Conference papers, research outputs |
| **Projects** | AquaGuard, AirGuard, market microstructure, calculus review |
| **Honors** | Awards, EPICS 8th, hackathon recognition |
| **Contact** | Email, phone, LinkedIn, GitHub |

---

## Tech Stack

```
Frontend    Plain HTML5 · CSS3 · Vanilla JS (ES6+)
Fonts       Cormorant Garamond · Syne · IBM Plex Mono
Theme       Dark / Light (CSS custom properties)
Deploy      Vercel (static hosting, auto-deploy on push to main)
```

---

## Getting Started

```bash
# Current production site
cd my_website && python3 -m http.server 8081
# → http://localhost:8081

# Archived v1
cd old_websites && python3 -m http.server 8082
# → http://localhost:8082
```

---

## Deployment

- **Production:** Vercel — auto-deploys from `main` branch
- **Config:** `vercel.json` sets `outputDirectory: "my_website"`
- **Resume PDF:** Tracked via `!my_website/assets/my_resume.pdf` in `.gitignore`

---

## Design System

| Property | Light | Dark |
|----------|-------|------|
| Background | `#ffffff` | `#0a0a0a` |
| Text | `#1a1a2e` | `#e8e8e8` |
| Sidebar bg | `#f0f0f0` | `#111111` |
| Accent | `#2563eb` | `#60a5fa` |
| Fonts | Cormorant Garamond (headings) · Syne (UI) · IBM Plex Mono (mono) | same |

---

## Key Projects

- **AquaGuard** — Multi-platform flood rescue (EPICS 8th Award, IEEE 2026)
- **AirGuard** — On-device CO2 monitoring (VinUniversity AI Hackathon 2026)
- **Market Microstructure Simulator** — Order book + 5 trading agents, WebSocket streaming
- **UTS AI Research** — Transformer-based models for human action recognition & XAI

---

## Social Links

| Platform | Link |
|----------|------|
| GitHub | [minhquan-maker](https://github.com/minhquan-maker) |
| LinkedIn | [ngminhquan](https://www.linkedin.com/in/ngminhquan/) |
| Email | minhquan.nguyen-2@student.uts.edu.au |
