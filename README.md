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
- `script.js` — navigation, smooth scrolling, reveals, particle sphere, sliders, toast, and certificate modal
- `assets/` — project media, certificates, logos (press logos in `assets/logos/press/`), profile media, and resume
- `DESIGN.md` — design tokens and palette notes

## Local development

```bash
git clone https://github.com/minhquan-maker/myportfolio.git
cd myportfolio
python3 -m http.server 8090
```

Open `http://localhost:8090`. No installation is required.

## Site sections

1. **Hero** — role, biography, calls to action (Explore my work / My Resume), animated particle sphere, and quick-facts strip with statistics
2. **01 About / 02 Education** — portrait and bio, academic background
3. **03 Experiences** — professional and leadership cards
4. **04 Work** — horizontally scrolling project cards: AquaGuard (flood coordination platform), EnableCode (accessible coding platform), AirGuard (carbon emission and air-quality platform)
5. **05 Recognition** — honors, certificates (in-page preview modal), and the UTS testimonial
6. **06 Press** — coverage cards with a uniform publisher-logo chip (VnExpress, Vietnam.vn, Tài Năng Việt, LSTS, HTV)
7. **07 Publications** — IEEE KSE 2026 (accepted, oral), DAI 2026 (under review), and the HCMUT *Introduction to Computing* textbook
8. **08 Contact** — the solid navy footer with email, social links, and a "Say hello" button

The top navigation uses a sliding pill and mega-menu panels for Experience, Projects, Recognition, and Contact.

## Design and behavior

- Inter Tight and Inter for text, JetBrains Mono for labels
- White, navy, and terracotta palette (pure white background, navy ink, terracotta primary accent, amber secondary accent) with a solid navy footer; tokens live in `:root` of `style.css` and are documented in `DESIGN.md`
- Responsive layouts for tablet and mobile screens
- Scroll reveal animations with reduced-motion support
- Project video/image sliders
- In-page certificate preview modal for PDF and image certificates
- Resume available as `assets/my_resume.pdf` ("My Resume" buttons and menu links)

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
