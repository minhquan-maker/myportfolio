import type { Profile } from "./types.js";

const a = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export const profile: Profile = {
  name: "Minh Quan Nguyen",
  shortName: "Minh Quan",
  role: "AI researcher · Startup Founder · Ho Chi Minh City",
  location: "Ho Chi Minh City",
  email: "minhquan.nguyen-2@student.uts.edu.au",
  intro: [
    `Hi, I’m Minh Quan, a 2nd-year AI student at ${a("https://www.uts.edu.au", "UTS")}–${a("https://hcmut.edu.vn", "HCMUT")}, a Venture Analyst at ${a("https://block71.co", "B71")} (NUSX), and a Research Assistant at ${a("https://www.uts.edu.au", "UTS")} &amp; the ${a("https://www.ura.hcmut.edu.vn", "URA Research Group")}.`,
    `I’m also the Co-founder of ${a("https://odylytics.com", "Odylytics")}, an AI firm turning research and emerging technologies into practical solutions, from Climate Tech to Accessibility.`,
    `Beyond AI, I’m passionate about community building as an event coordinator, MC and student leader. I believe meaningful impact starts with taking the first step.`,
  ],
  quote: "The secret of getting ahead is getting started.",
  links: [
    { label: "email", href: "mailto:minhquan.nguyen-2@student.uts.edu.au" },
    { label: "cv", href: "assets/my_resume.pdf" },
    { label: "linkedin", href: "https://www.linkedin.com/in/ngminhquan" },
    { label: "orcid", href: "https://orcid.org/0009-0008-9621-1326" },
    { label: "github", href: "https://github.com/minhquan-maker" },
  ],
  portrait: {
    src: "assets/media/profile-portrait.jpg",
    alt: "Portrait of Minh Quan Nguyen",
    width: 300,
    height: 375,
  },
};
