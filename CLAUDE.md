# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal site of Minh Quan Nguyen (Co-founder of Odylytics, Venture Analyst at B71, Research Assistant at UTS and HCMUT-URA). **TypeScript + a tiny build step** (esbuild + tsx) that renders typed content through template functions into static HTML in `dist/`. No runtime framework. Live on Vercel (`quannguyen.odylytics.com`, `minhquannguyen.vercel.app`); pushing to `main` deploys. Previous designs: `backup/portfolio-v1-2026-10`, `backup/portfolio-v2-2026-10`.

```bash
npm install
npm run dev         # build + serve dist/ on :8090, rebuild on change
npm run build       # → dist/
npm run typecheck   # tsc --noEmit, run before committing
```

## Architecture

- `src/content/*.ts` — all copy as typed data (`profile`, `papers`, `career`, `startup`, `blog`; types in `types.ts`). Strings are trusted inline HTML.
- `src/templates/*.ts` — `layout.ts` (head, nav, footer, curtain), `home.ts`, `startup.ts`, `blog.ts`.
- `src/client/main.ts` — typed-name page transition, scroll reveal, video autoplay.
- `src/styles/style.css` — Space Mono, light only, square corners, `--blue` links, 1080px column.
- `scripts/build.ts` — renders pages, bundles the client to `script.js`, copies CSS and `assets/` to `dist/`.
- `assets/` — media. `dist/` and `node_modules/` are git-ignored.
- **Page transition:** `.curtain` types "Minh Quan" (Newsreader, one typo then corrected) on internal link clicks and sets `sessionStorage['mq-t']`; the next page starts covered (inline `<head>` script adds `html.is-entering`) then slides away. Skipped for reduced motion.
- **Add content:** paper → `papers.ts` (`me: true` on your name); product → `startup.ts`; post → `blog.ts` + `posts/<slug>.html`.
- Deploys: Vercel (`vercel.json`: `npm ci`, `npm run build`, output `dist`) and GitHub Pages (`.github/workflows/pages.yml`).
- Check phone layout (390px) and tablet (768px) after CSS changes; no horizontal overflow.

## Archive

`archive/` is git-ignored and never deployed: `versions/` (old portfolios), `docs/`, `mockups/`, `notes/`, `tooling/` (Playwright, superpowers, worktrees) and `unused-assets/` (media nothing references, same relative paths as `assets/`). Do not edit archive copies as if they were the live site. Keep `assets/` limited to files the page references; move orphans to `archive/unused-assets/`.

## Breakpoints

≤900px: hero portrait shrinks to 200px · ≤640px: everything stacks (portrait above name, papers and rows single column, stats 2×2, product cards one column).
