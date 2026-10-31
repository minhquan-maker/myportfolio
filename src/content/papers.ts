import type { Paper } from "./types.js";

const ORCID = "https://orcid.org/0009-0008-9621-1326";

/** Newest / most advanced first. Add `href` to the arXiv or code page when available. */
export const papers: Paper[] = [
  {
    title: "Leveraging 3D Skeleton Motion for Early Action Anticipation via Spatio-Temporal Causal Modeling",
    href: ORCID,
    authors: [
      { name: "Manhtuan Nguyen" },
      { name: "Quan M. Nguyen", me: true },
      { name: "Duong T. T. Tran" },
      { name: "Quan M. Hac" },
      { name: "Tho T. Quan" },
    ],
    venue: "IEEE KSE",
    venueNote: "B rank",
    year: 2026,
    status: "Accepted (oral)",
    abstract: "We anticipate an action from the first few frames of 3D skeleton motion by modeling spatio-temporal causal structure.",
    thumb: "assets/research/thumb-ksestc.png",
  },
  {
    title: "Transition-Aware History Modeling for Skeleton-Based Early Action Anticipation",
    href: ORCID,
    authors: [
      { name: "Manhtuan Nguyen" },
      { name: "Quan M. Nguyen", me: true },
      { name: "Duong T. T. Tran" },
      { name: "Quan M. Hac" },
      { name: "Xu Wang" },
      { name: "Tho T. Quan" },
    ],
    venue: "DAI",
    venueNote: "Q1",
    year: 2026,
    status: "Under review",
    abstract: "We model how an action’s history transitions over time to improve skeleton-based early action anticipation.",
    thumb: "assets/research/thumb-dai.png",
  },
  {
    title: "Consumer Electronics Physiological Data as a Foundation for Physics-Informed Neural Networks",
    href: ORCID,
    authors: [
      { name: "Tobias Cibis" },
      { name: "Minh Quan Nguyen", me: true },
      { name: "Tylah Jenkins" },
      { name: "Geronimo Petrel" },
      { name: "Bosco Tran" },
      { name: "Avinash Singh" },
    ],
    venue: "Ongoing",
    year: 2026,
    abstract: "We study physiological signals from consumer electronics as a data foundation for physics-informed neural networks.",
    thumb: "assets/research/thumb-pinn.png",
  },
  {
    title: "VeriReason: Verifying and Repairing the Principal Reasons of LLM-Written Credit Denial Notices via Group Interventions",
    href: ORCID,
    authors: [
      { name: "Quan M. Nguyen", me: true },
      { name: "My H. Tran" },
      { name: "Tho T. Quan" },
    ],
    venue: "Ongoing",
    year: 2026,
    abstract: "We verify and repair the principal reasons stated in LLM-written credit denial notices using group interventions.",
    thumb: "assets/research/thumb-verireason.png",
  },
];
