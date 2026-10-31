import type { Education, Rich, Role } from "./types.js";

/** External link styled as an inline underline. */
const ext = (href: string, text: string): Rich =>
  `<a class="inline" href="${href}" target="_blank" rel="noopener">${text}</a>`;

const UTS = "https://www.uts.edu.au";
const HCMUT = "https://hcmut.edu.vn";
const URA = "https://www.ura.hcmut.edu.vn";
const B71 = "https://block71.co";
const ODYLYTICS = "https://odylytics.com";
const LSTS = "https://lsts.edu.vn";

export const experience: Role[] = [
  { when: "Jul 2026 — now", title: `CEO &amp; Co-founder · ${ext(ODYLYTICS, "Odylytics")}` },
  { when: "Aug 2026 — now", title: `Venture Analyst · ${ext(B71, "B71")} (NUSX)` },
  { when: "Sep 2026 — now", title: `Research Assistant · ${ext(UTS, "University of Technology Sydney")}` },
  { when: "Mar 2026 — now", title: `Research Assistant · ${ext(HCMUT, "HCMUT")}-${ext(URA, "URA Research Group")}` },
];

export const education: Education[] = [
  {
    when: "2025 — 2028",
    school: ext(UTS, "University of Technology Sydney"),
    detail: "Bachelor of Artificial Intelligence · GPA 3.8 / 4.0 · WAM 88% (High Distinction)",
  },
  {
    when: "2025 — 2028",
    school: ext(HCMUT, "HCMC University of Technology"),
    detail: "Transnational education with UTS",
  },
  {
    when: "2018 — 2025",
    school: ext(LSTS, "Lawrence S. Ting School"),
    detail: "High school · Top 5% · SAT 1500 · GPA 3.8 / 4.0 · IELTS 8.0",
  },
];
