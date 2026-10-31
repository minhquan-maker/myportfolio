# Minh Quan Nguyen

Personal site: AI research, Odylytics and writing. TypeScript content and templates, built to plain static HTML (no framework at runtime).

```bash
npm install
npm run dev        # build + serve dist/ on http://localhost:8090, rebuilds on change
npm run build      # → dist/
npm run typecheck  # tsc --noEmit
```

## Structure

| Path | What |
|---|---|
| `src/content/*.ts` | All copy as typed data: `profile`, `papers`, `career` (experience, education), `startup` (stats, products), `blog` (posts). Types in `types.ts`. |
| `src/templates/*.ts` | Pure functions that turn content into HTML: `layout` (head, nav, footer, curtain), `home`, `startup`, `blog`. |
| `src/client/main.ts` | Browser code: typed-name page transition, scroll reveal, video autoplay. Bundled by esbuild to `script.js`. |
| `src/styles/style.css` | Tokens → base → components → motion → responsive (breakpoints 900px / 640px). |
| `scripts/build.ts` | Renders pages, bundles the client, copies CSS and `assets/` into `dist/`. |
| `assets/` | Images, video, resume, brand marks. |

## Editing

- **Add a paper:** append to `papers` in `src/content/papers.ts` (mark yourself with `me: true`).
- **Add a product:** append to `products` in `src/content/startup.ts`; order = page order.
- **Add a blog post:** push to `posts` in `src/content/blog.ts` and create `posts/<slug>.html`.
- Content strings are trusted inline HTML (`&amp;`, links, `<b>`). Add new pages by creating a template and listing it in `scripts/build.ts` and `nav` in `layout.ts`.

## Deploy

- **Vercel:** `vercel.json` runs `npm ci && npm run build`, serves `dist/`. Pushing to `main` deploys.
- **GitHub Pages:** `.github/workflows/pages.yml` builds and publishes `dist/` (Settings → Pages → Source: GitHub Actions).
- Previous designs: branches `backup/portfolio-v1-2026-10`, `backup/portfolio-v2-2026-10`.

© 2026 Minh Quan Nguyen. All rights reserved.
