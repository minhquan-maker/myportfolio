import type { Paper } from "./types.js";

/** Newest / most advanced first. Add `href` / `links` once an arXiv or code page exists. */
export const papers: Paper[] = [
  {
    title: "Leveraging 3D Skeleton Motion for Early Action Anticipation via Spatio-Temporal Causal Modeling",
    authors: [
      { name: "Manhtuan Nguyen" },
      { name: "Duong T. T. Tran", star: true },
      { name: "Quan M. Nguyen", me: true, star: true },
      { name: "Quan M. Hac", star: true },
      { name: "Tho T. Quan" },
    ],
    venue: "IEEE KSE",
    year: 2026,
    highlight: "Oral Presentation",
    status: "Accepted",
    abstract: "We anticipate an action from the first few frames of 3D skeleton motion by modeling spatio-temporal causal structure.",
    thumb: "assets/research/kse-framework.jpg",
  },
  {
    title: "Transition-Aware History Modeling for Skeleton-Based Early Action Anticipation",
    authors: [
      { name: "Manhtuan Nguyen" },
      { name: "Duong T. T. Tran", star: true },
      { name: "Quan M. Nguyen", me: true, star: true },
      { name: "Quan M. Hac", star: true },
      { name: "Xu Wang" },
      { name: "Tho T. Quan" },
    ],
    venue: "DAI",
    year: 2026,
    status: "Under review",
    abstract: "We model how an action’s history transitions over time to improve skeleton-based early action anticipation.",
    thumb: "assets/research/dai-framework.jpg",
  },
  {
    title: "Consumer Electronics Physiological Data as a Foundation for Physics-Informed Neural Networks",
    authors: [
      { name: "Tobias Cibis" },
      { name: "Minh Quan Nguyen", me: true },
      { name: "Tylah Jenkins" },
      { name: "Geronimo Petrel" },
      { name: "Bosco Tran" },
      { name: "Avinash Singh" },
    ],
    venue: "IEEE ICLT",
    year: 2026,
    status: "Submitted",
    abstract: "We study physiological signals from consumer electronics as a data foundation for physics-informed neural networks.",
    thumb: "assets/research/pinn-overview.jpg",
  },
  {
    title: "VeriReason: Verifying and Repairing the Principal Reasons of LLM-Written Credit Denial Notices via Group Interventions",
    authors: [
      { name: "Quan M. Nguyen", me: true },
      { name: "My H. Tran" },
      { name: "Tho T. Quan" },
    ],
    venue: "Ongoing",
    year: 2026,
    abstract: "We verify and repair the principal reasons stated in LLM-written credit denial notices using group interventions.",
    thumb: "assets/research/thumb-verireason.png",
    pixelThumb: true,
  },
];
