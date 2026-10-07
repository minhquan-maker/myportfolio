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

## About

The source code for [minhquannguyen.vercel.app](https://minhquannguyen.vercel.app/), a single-page personal portfolio built with plain HTML, CSS, and JavaScript.

The site presents my education, experience, technology projects, academic publications, recognition, and contact information. It has no build step, framework, bundler, dependencies, or environment variables.

## Live site

The deployed site is maintained at the repository root:

- `index.html` — page structure and content
- `style.css` — design system, components, animations, and responsive layout
- `script.js` — particle sphere, navigation (sliding pill, mega menus, mobile menu), scroll reveals, counters, the project carousel, scrollspy, and a small pixel self-portrait
- `assets/` — project media, logos (press logos in `assets/logos/press/`), profile and award photos, and resume
- `DESIGN.md` — design tokens and palette notes
- `CLAUDE.md` — architecture notes for working on the site with Claude Code

## Local development

```bash
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio
python3 -m http.server 8090
```

Open `http://localhost:8090`. No installation is required.

## Site sections

1. **Hero** — headline, short bio, calls to action (Explore my work / My GitHub), animated particle sphere, and a one-line location and availability note
2. **Stats** — four counters (startup built, projects shipped, organizations, awards)
3. **01 About / 02 Education** — portrait, bio, role / location / languages, and academic background
4. **03 Experiences** — four blocks: B71 Vietnam, Odylytics, URA Research Group (with a "View more" link to Publications), and HCMUT
5. **04 Work** — five project cards (AquaGuard, EnableCode, Includio, AirGuard, Carbon Footprint) in a horizontal row that page scroll drives on desktop and that swipes on touch screens, with a spotlight effect that dims the room around the active project
6. **05 Recognition** — "Press & prizes": a seven-row awards table (level, year, status) beside the EPICS and team photos
7. **06 Press** — six coverage cards with a uniform publisher-logo row (VnExpress, Vietnam.vn, Tài Năng Việt, LSTS, HTV) and an "update soon" placeholder
8. **07 Publications** — IEEE KSE 2026 (accepted, oral), DAI 2026 (under review), and the HCMUT *Introduction to Computing* textbook
9. **08 Contact** — the solid navy footer with email, social links, and a "Say hello" button

On desktop, the top navigation uses a sliding pill that follows the section in view and mega-menu panels for About, Experience, Projects, Recognition, and Contact; panels whose imagery is not ready show an "Updating soon" placeholder. On tablets and phones it becomes a hamburger that opens a full-screen menu. Both link "My Resume" to `assets/my_resume.pdf`.

## Design and behavior

- Inter Tight and Inter for text, JetBrains Mono for labels
- White, navy, and terracotta palette (pure white background, navy ink, terracotta primary accent, amber secondary accent) with a solid navy footer; tokens live in `:root` of `style.css` and are documented in `DESIGN.md`
- Responsive down to small phones: tablets keep the two-column web layout; phones get a one-screen hero, stat tiles, a profile card, swipeable photo and press rows, and a full-screen menu
- Scroll reveal animations with reduced-motion support
- Project cards with autoplaying muted video that pauses off-screen
- A pixel self-portrait that occasionally walks in at the bottom-left (desktop and tablet only)
- Press logos live in `assets/logos/press/`; team and award photos in `assets/media/`

## Deployment

Vercel serves the repository root as a static site. The root `vercel.json` intentionally uses:

```json
{
  "framework": null,
  "buildCommand": null,
  "outputDirectory": ".",
  "installCommand": null,
  "devCommand": null
}
```

Pushing to `main` triggers Vercel's automatic deployment. There is no build command and no runtime configuration.

## Contact

- Email: [minhquan.nguyen-2@student.uts.edu.au](mailto:minhquan.nguyen-2@student.uts.edu.au)
- Phone: [+84 908 538 467](tel:+84908538467)
- LinkedIn: [ngminhquan](https://www.linkedin.com/in/ngminhquan/)
- GitHub: [minhquan-maker](https://github.com/minhquan-maker)
- ORCID: [0009-0008-9621-1326](https://orcid.org/0009-0008-9621-1326)

## Archive

Previous website versions are kept locally under `archive/` and are intentionally ignored by Git so archived copies and nested repository metadata are not deployed.
