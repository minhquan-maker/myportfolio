import { education, experience } from "../content/career.js";
import { papers } from "../content/papers.js";
import { profile } from "../content/profile.js";
import type { Education, Paper, Role } from "../content/types.js";
import { section, type PageMeta } from "./layout.js";

const external = (href: string) => (/^https?:/.test(href) ? ` target="_blank" rel="noopener"` : "");

function hero(): string {
  const [lead, ...rest] = profile.intro;
  const links = profile.links
    .map((l) => `<a href="${l.href}"${external(l.href)}>${l.label}</a>`)
    .join(`<span class="sep">/</span>`);
  const p = profile.portrait;
  return `  <section class="hero first">
    <div class="hero__copy">
      <h1>${profile.name}</h1>
      <p class="role">${profile.role}</p>
      <p class="bio bio--lead">${lead}</p>
${rest.map((t) => `      <p class="bio">${t}</p>`).join("\n")}
      <blockquote class="quote">“${profile.quote}”</blockquote>
      <p class="links">${links}</p>
    </div>
    <img class="portrait" src="${p.src}" alt="${p.alt}" width="${p.width}" height="${p.height}" />
  </section>`;
}

function lockedPaper(): string {
  return `      <li class="pub pub--locked reveal" aria-label="Ongoing papers, details not public yet">
        <img class="pub__thumb pub__thumb--pixel" src="assets/research/thumb-locked.png" alt="" width="260" height="162" loading="lazy" />
        <div class="pub__body">
          <h3>Ongoing papers</h3>
          <p class="venue"><em>In progress</em>, 2026</p>
          <p class="abs">We are looking into RAG, explainable AI for finance and related topics. Details will be published once the paper submission is complete.</p>
        </div>
      </li>`;
}

function paper(p: Paper): string {
  if (p.locked) return lockedPaper();
  const authors = p.authors
    .map((a) => (a.me ? `<b>${a.name}</b>` : a.name) + (a.star ? `<sup class="star">*</sup>` : ""))
    .join(", ");
  const flag = p.highlight ? ` <strong class="oral">(${p.highlight})</strong>` : "";
  const venue =
    p.venue === "Ongoing" ? `<em>Ongoing</em>, ${p.year}` : `<em>${p.venue}</em>, ${p.year}${flag}`;
  /* No href yet: stays blue with the hover effect but goes nowhere. */
  const title = p.href ? `<a href="${p.href}"${external(p.href)}>${p.title}</a>` : `<a class="pub__title">${p.title}</a>`;
  const links = (p.links ?? []).map((l) => `<a href="${l.href}"${external(l.href)}>${l.label}</a>`);
  const meta = [...(p.status ? [p.status] : []), ...links].join(" · ");
  return `      <li class="pub reveal">
        <img class="pub__thumb${p.pixelThumb ? " pub__thumb--pixel" : ""}" src="${p.thumb}" alt="Figure for ${p.title.replace(/"/g, "&quot;")}" width="260" height="162" loading="lazy" />
        <div class="pub__body">
          <h3>${title}</h3>
          <p class="authors">${authors}</p>
          <p class="venue">${venue}</p>
${meta ? `          <p class="links2">${meta}</p>\n` : ""}          <p class="abs">${p.abstract}</p>
        </div>
      </li>`;
}

const role = (r: Role) =>
  `      <li class="row"><span class="when">${r.when}</span><div><b>${r.title}</b></div></li>`;

const edu = (e: Education) =>
  `      <li class="row"><span class="when">${e.when}</span><div><b>${e.school}</b><p>${e.detail}</p></div></li>`;

export const home: PageMeta = {
  id: "home",
  title: `${profile.name} — AI researcher & founder`,
  description: `${profile.name}: AI researcher working on early action anticipation, and Co-founder of Odylytics.`,
  body: [
    hero(),
    section("Research", `    <ul class="pubs">\n${papers.map(paper).join("\n")}\n    </ul>`, { id: "publications" }),
    section("Experience", `    <ul class="rows">\n${experience.map(role).join("\n")}\n    </ul>`),
    section("Education", `    <ul class="rows">\n${education.map(edu).join("\n")}\n    </ul>`),
  ].join("\n\n"),
};
