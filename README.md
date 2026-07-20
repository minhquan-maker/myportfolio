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
main-portfolio/                     ← LIVE site (deployed to Vercel)
  index.html, style.css, script.js
  assets/    my_resume.pdf, profile.jpg
  certificate/    per-award PDF/JPG proofs
  logos/          11 brand PNGs (hero strip + recognition media)
  docs/superpowers/   design specs + plans (not deployed)

old-portfolio/                      ← archived website variants
  scientific-minimal-website/       minimal design (was my_website)
  creative-blue-website/            LinkedIn-blue redesign (was style-redesign)
  creative-goldenblack-website/     v1 dark/gold (was old_websites, GSAP + ScrollTrigger)
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
# Live site (deployed to Vercel)
cd main-portfolio && python3 -m http.server 8081
# → http://localhost:8081

# Archived — minimal design (was my_website)
cd old-portfolio/scientific-minimal-website && python3 -m http.server 8082

# Archived — LinkedIn-blue redesign (was style-redesign)
cd old-portfolio/creative-blue-website && python3 -m http.server 8083

# Archived — v1 dark/gold (was old_websites)
cd old-portfolio/creative-goldenblack-website && python3 -m http.server 8084
```

---

## Deployment

- **Production:** Vercel — auto-deploys from `main` branch
- **Config:** `vercel.json` sets `outputDirectory: "main-portfolio"`
- **Archived:** All three previous website variants live under `old-portfolio/` as static HTML/CSS/JS

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
