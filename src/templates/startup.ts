import { odylytics, products, stats } from "../content/startup.js";
import type { Product } from "../content/types.js";
import { section, type PageMeta } from "./layout.js";

function media(p: Product): string {
  const m = p.media;
  if (m.kind === "video") {
    return `<video data-autoplay muted loop playsinline preload="none" poster="${m.poster}"><source src="${m.src}" type="video/mp4" /></video>`;
  }
  return `<img${m.fit === "top" ? ' class="shot"' : ""} src="${m.src}" alt="${m.alt}" loading="lazy" />`;
}

function card(p: Product): string {
  const badge = p.status === "live" ? `<span class="tag tag--ok">● Live</span>` : `<span class="tag">Demo</span>`;
  const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  return `      <article class="card reveal">
        <div class="card__media">${media(p)}</div>
        <div class="card__body">
          <div class="card__head"><h3>${p.name}</h3>${badge}</div>
          <p>${p.description}</p>
          <div class="tags">${tags}</div>
          <a class="btn" href="${p.href}" target="_blank" rel="noopener">${p.cta} ↗</a>
        </div>
      </article>`;
}

const statsHtml = stats
  .map((s) => `      <div class="stat"><b>${s.value}</b><span>${s.label}</span></div>`)
  .join("\n");

export const startup: PageMeta = {
  id: "startup",
  title: "Startup — Minh Quan Nguyen",
  description: "Odylytics: a social technology company building digital infrastructure for disaster and environmental resilience.",
  body: [
    `  <section class="first">
    <h1 class="page-title">${odylytics.name}</h1>
    <p class="page-lede">${odylytics.lede}</p>
  </section>`,
    `  <section class="section reveal">
    <div class="stats">
${statsHtml}
    </div>
  </section>`,
    section("Products", `    <div class="cards">\n${products.map(card).join("\n")}\n    </div>`, { reveal: false }),
    section(
      "Contact",
      `    <p class="note">Pilots, research collaborations or a public-interest challenge? <a class="inline" href="mailto:${odylytics.contactEmail}">${odylytics.contactEmail}</a>. Replies in 2–3 working days.</p>`,
    ),
  ].join("\n\n"),
};
