import { blogIntro, posts, type Post } from "../content/blog.js";
import { section, type PageMeta } from "./layout.js";

const post = (p: Post) =>
  `      <a class="post reveal" href="posts/${p.slug}.html"><time datetime="${p.date}">${p.date}</time><div><h3>${p.title}</h3><p>${p.summary}</p></div></a>`;

const empty = `    <div class="empty reveal"><b>First posts coming soon.</b>Follow along on <a class="inline" href="https://www.linkedin.com/in/ngminhquan" target="_blank" rel="noopener">LinkedIn</a> or <a class="inline" href="https://github.com/minhquan-maker" target="_blank" rel="noopener">GitHub</a> in the meantime.</div>`;

export const blog: PageMeta = {
  id: "blog",
  title: "Blog — Minh Quan Nguyen",
  description: "Notes on research, building Odylytics, and technology for public impact.",
  body: [
    `  <section class="first">
    <h1 class="page-title">Blog</h1>
    <p class="page-lede">${blogIntro}</p>
  </section>`,
    section("Posts", posts.length ? `    <div class="posts">\n${posts.map(post).join("\n")}\n    </div>` : empty, { reveal: false }),
  ].join("\n\n"),
};
