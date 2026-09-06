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
- `script.js` — navigation, smooth scrolling, reveals, sliders, collapse controls, toast, and certificate modal
- `assets/` — project media, certificates, logos, profile media, icons, and resume

## Local development

```bash
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio
python3 -m http.server 8090
```

Open `http://localhost:8090`. No installation is required.

## Site sections

1. **Hero** — role, biography, calls to action, portrait, and statistics
2. **About / Education** — academic background and testimonial media
3. **Experience** — professional and leadership timeline
4. **Projects** — AquaGuard, EnableCode, AirGuard, and Carbon Footprint work
5. **Academic Publications** — KSE 2026 accepted paper, Discover AI 2026 ongoing work, and *Introduction to Computing*
6. **Recognition** — honors, certificates, testimonials, and media coverage
7. **Contact** — work email, phone, LinkedIn, and social links

## Design and behavior

- Inter with Cormorant Garamond accents
- Steel-blue editorial visual system with a black contact footer
- Responsive layouts for tablet and mobile screens
- Scroll reveal animations with reduced-motion support
- Project video/image sliders
- In-page certificate preview modal for PDF and image certificates
- Official Simple Icons SVG assets for Facebook, ORCID, LinkedIn, and GitHub

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

- Email: [minhquan.alex2512@gmail.com](mailto:minhquan.alex2512@gmail.com)
- Phone: [+84 908 538 467](tel:+84908538467)
- LinkedIn: [ngminhquan](https://www.linkedin.com/in/ngminhquan/)
- GitHub: [minhquan-maker](https://github.com/minhquan-maker)
- ORCID: [0009-0008-9621-1326](https://orcid.org/0009-0008-9621-1326)

## Archive

Previous website versions are kept locally under `archive/` and are intentionally ignored by Git so archived copies and nested repository metadata are not deployed.
