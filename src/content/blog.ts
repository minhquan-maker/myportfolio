export interface Post {
  slug: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  summary: string;
}

export const blogIntro =
  "Notes on early action anticipation, building in the field, and what I learn running a startup while studying.";

/** Newest first. Posts render as links to `posts/<slug>.html` (add the page when you write it). */
export const posts: Post[] = [];
