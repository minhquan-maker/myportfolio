import type { Product, Stat } from "./types.js";

export const odylytics = {
  name: "Odylytics",
  /** Shown as the page title and linked to the company site. */
  domain: "odylytics.com",
  lede: "A social technology company building intelligent digital infrastructure that helps communities prepare for, respond to and recover from disasters and environmental risk.",
  contactEmail: "odylytics@gmail.com",
};

/** Four equal stats. */
export const stats: Stat[] = [
  { value: "1M+", label: "content views" },
  { value: "1k+", label: "AquaGuard users" },
  { value: "5+", label: "organizations endorsed" },
  { value: "USD 4k+", label: "in grants" },
];

/** Order here is the order on the page. */
export const products: Product[] = [
  {
    name: "AquaGuard",
    status: "live",
    description: "Flood alerts, SOS and evacuation guidance. Citizens report in real time; rescuers and local authorities see the same map.",
    tags: ["Flood monitoring", "SOS alerts", "Evacuation routes"],
    href: "https://aquaguard.vn",
    cta: "aquaguard.vn",
    media: { kind: "video", src: "assets/projects/aquaguard/aquaguard-cut2.mp4", poster: "assets/frames/aquaguard-cut2-1.jpg" },
  },
  {
    name: "Includio",
    status: "live",
    description: "An inclusion-first hiring studio that redesigns the interview itself, so neurodivergent candidates can show what they can actually do.",
    tags: ["Candidates", "Employers", "Teams"],
    href: "https://includio.odylytics.com",
    cta: "includio.odylytics.com",
    media: { kind: "image", src: "assets/projects/includio/includio-hero.jpg", alt: "Includio landing page" },
  },
  {
    name: "EnableCode",
    status: "live",
    description: "A hands-free coding platform for learners with upper-limb disabilities, built on facial gestures and block-based lessons.",
    tags: ["Facial gestures", "Block-based lessons"],
    href: "https://enablecode.vercel.app",
    cta: "enablecode.vercel.app",
    media: { kind: "video", src: "assets/projects/enablecode/enablecode-1920.mp4", poster: "assets/frames/enablecode-hd-3.jpg" },
  },
  {
    name: "Svaro",
    status: "live",
    description: "An AI agent for retail telesales. It answers store contacts about stock, orders and deliveries in Danish, Swedish and Norwegian, reads live ERP data, and hands over to a colleague with full context.",
    tags: ["Website chatbot", "Social &amp; e-mail", "Control dashboard"],
    href: "https://svaro.odylytics.com",
    cta: "svaro.odylytics.com",
    media: { kind: "image", src: "assets/projects/svaro/svaro-chat.jpg", alt: "Svaro chat answering a stock question with live data", fit: "top" },
  },
  {
    name: "AirGuard",
    status: "demo",
    description: "Air-quality monitoring and carbon tracking. A 4.8 km ride becomes 0.40 kg of CO₂.",
    tags: ["Air quality", "Weather", "Carbon tracking"],
    href: "https://www.youtube.com/watch?v=Wd_yZVT6Te4",
    cta: "Watch the demo",
    media: { kind: "video", src: "assets/projects/airguard/airguard-cut3.mp4", poster: "assets/frames/airguard-cut3-2.jpg" },
  },
];
