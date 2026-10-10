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

- `index.html` — page structure and content
- `style.css` — monochrome design system, components, motion and responsive layout
- `script.js` — nav, reveals, counter, marquee, carousel, FAQ tabs, certificate modal, pixel-me
- `assets/` — project media and video stills, certificates, logos, brand marks (favicon, OG image) and resume

The previous design lives on the `backup/portfolio-v1-2026-10` branch.

## Local development

```bash
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio
python3 -m http.server 8090
```

## Site sections

1. **Hero** — "Building technology that protects." with my portrait in front, team photos behind and the AquaGuard, Odylytics and AirGuard logos above
2. **Band** — 1,000,000+ people reached, with a scrolling media marquee, then a partner logo strip
3. **AquaGuard** — the flagship project, right after the band
4. **About** — three roles: CEO · Odylytics, Venture Analyst · B71, Research Assistant · HCMUT-URA
5. **Work** — AirGuard, Includio, EnableCode as alternating gray / dark / white feature rows
6. **Voices** — AquaGuard testimonials carousel
7. **Publications** — IEEE KSE 2026, DAI 2026, the HCMUT textbook, ORCID
8. **Media & press** — VnExpress, Vietnam.vn, HTV3, Tài Năng Việt, LSTS
9. **Recognition** — seven awards with certificate previews
10. **FAQ** — education, Odylytics, research, working together
11. **Footer** — CTA card, giant wordmark, link columns

## Design

Monochrome and editorial: Inter Tight headlines with a muted italic second line, Inter body, black bands, gray panels and a floating pill nav. Custom "q." favicon in `assets/brand/`.

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
