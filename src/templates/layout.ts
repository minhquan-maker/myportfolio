import { profile } from "../content/profile.js";

export type PageId = "home" | "startup" | "blog";

export interface PageMeta {
  id: PageId;
  title: string;
  description: string;
  /** Rendered inside <main><div class="wrap">. */
  body: string;
}

interface NavItem {
  id: PageId;
  label: string;
  href: string;
}

/** `./` (not index.html) keeps the home URL clean on every host. */
export const nav: NavItem[] = [
  { id: "home", label: "Home", href: "./" },
  { id: "startup", label: "Startup", href: "startup.html" },
  { id: "blog", label: "Blog", href: "blog.html" },
];

const footerLinks = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/minhquan-maker" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ngminhquan" },
  { label: "ORCID", href: "https://orcid.org/0009-0008-9621-1326" },
];

const external = (href: string) => (/^https?:/.test(href) ? ` target="_blank" rel="noopener"` : "");

export function renderPage(page: PageMeta): string {
  const navHtml = nav
    .map((n) => `<li><a href="${n.href}"${n.id === page.id ? ` aria-current="page"` : ""}>${n.label}</a></li>`)
    .join("");
  const footer = footerLinks
    .map((l) => `<a href="${l.href}"${external(l.href)}>${l.label}</a>`)
    .join("\n    ");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${page.title}</title>
<meta name="description" content="${page.description}" />
<meta name="color-scheme" content="light" />
<meta name="theme-color" content="#ffffff" />
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.description}" />
<meta property="og:image" content="assets/brand/og.png" />
<meta property="og:type" content="website" />
<link rel="icon" type="image/svg+xml" href="assets/brand/favicon.svg" />
<link rel="apple-touch-icon" href="assets/brand/favicon-180.png" />
<link rel="preload" href="fonts/space-mono-400.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="fonts/space-mono-700.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="style.css" />
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__mq)document.documentElement.classList.add('no-client')},3000);try{if(sessionStorage.getItem('mq-t')){sessionStorage.removeItem('mq-t');document.documentElement.classList.add('is-entering')}}catch(e){}</script>
</head>
<body>
<div class="curtain" aria-hidden="true"><span>${profile.shortName}</span></div>
<header class="nav"><div class="wrap">
  <a class="brand" href="./"><img src="assets/brand/favicon.svg" alt="" width="22" height="22" />${profile.shortName}</a>
  <nav aria-label="Primary"><ul>${navHtml}</ul></nav>
</div></header>
<main><div class="wrap">
${page.body}
</div></main>
<footer><div class="wrap">
  <span>© 2026 ${profile.name} · ${profile.location}</span>
  <span class="social">
    ${footer}
  </span>
</div></footer>
<script src="script.js" defer></script>
</body>
</html>
`;
}

/** Section wrapper with a label. */
export function section(label: string, content: string, opts: { id?: string; reveal?: boolean } = {}): string {
  const id = opts.id ? ` id="${opts.id}"` : "";
  const reveal = opts.reveal === false ? "" : " reveal";
  return `  <section${id} class="section${reveal}">
    <h2 class="label">${label}</h2>
${content}
  </section>`;
}
