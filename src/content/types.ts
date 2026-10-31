/** Trusted inline HTML (links, <b>, <em>). Content is authored here, never user input. */
export type Rich = string;

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  /** First paragraph is rendered as the lead. */
  intro: Rich[];
  quote: string;
  links: ExternalLink[];
  portrait: Required<Image>;
}

export interface Author {
  name: string;
  /** Highlights the site owner in the author list. */
  me?: boolean;
  /** Adds an asterisk after the name. */
  star?: boolean;
}

export interface Paper {
  title: string;
  /** Link for the title. Leave out until a public page (arXiv, publisher) exists. */
  href?: string;
  /** Extra links shown under the venue, e.g. code / arXiv. */
  links?: ExternalLink[];
  authors: Author[];
  venue: string;
  year: number;
  /** Red bold flag after the venue, e.g. "Oral Presentation". */
  highlight?: string;
  status?: string;
  abstract: string;
  /** Figure shown beside the paper. */
  thumb: string;
  /** Placeholder pixel art (rendered crisp) until a real figure exists. */
  pixelThumb?: boolean;
}

export interface Role {
  when: string;
  title: Rich;
}

export interface Education {
  when: string;
  school: Rich;
  detail: string;
}

export type ProductMedia =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string; alt: string; /** Anchor the crop to the top (UI screenshots). */ fit?: "top" };

export interface Product {
  name: string;
  status: "live" | "demo";
  description: string;
  tags: string[];
  href: string;
  /** Button label. */
  cta: string;
  media: ProductMedia;
}

export interface Stat {
  value: string;
  label: string;
}
