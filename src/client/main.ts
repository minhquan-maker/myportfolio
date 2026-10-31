/** Client behaviour: page-transition curtain, scroll reveal, video autoplay. */

const WORD = "Minh Quan";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
const curtain = document.querySelector<HTMLElement>(".curtain");
const label = curtain?.querySelector<HTMLElement>("span") ?? null;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** `/` and `/index.html` are the same page. */
const normalise = (path: string) => path.replace(/index\.html$/, "");

/* ---- arrival: the name is already typed, slide the curtain away ---- */
async function openCurtain(): Promise<void> {
  if (!curtain || !root.classList.contains("is-entering")) return;
  if (label) label.textContent = WORD;
  await wait(reduce ? 0 : 90);
  curtain.classList.add("leave");
  root.classList.remove("is-entering");
  await wait(420);
  curtain.classList.remove("leave");
}

/* ---- departure: typed with a slip. Two letters get swapped, then corrected ---- */
const KEY_MS = 40;

async function typeName(): Promise<void> {
  if (!label) return;
  const key = () => wait(KEY_MS * (0.6 + Math.random() * 0.8));
  // swap two neighbouring letters somewhere in the word (never across the space)
  let slip = 1 + Math.floor(Math.random() * (WORD.length - 2));
  while (WORD.charAt(slip) === " " || WORD.charAt(slip + 1) === " ") slip = 1 + Math.floor(Math.random() * (WORD.length - 2));

  label.textContent = "";
  let text = "";
  for (let i = 0; i < WORD.length; i++) {
    if (i === slip) {
      text += WORD.charAt(i + 1) + WORD.charAt(i); // the typo
      label.textContent = text;
      await wait(KEY_MS * 2.2);
      text = text.slice(0, -1);
      label.textContent = text;
      await key();
      text = text.slice(0, -1);
      label.textContent = text;
      await key();
      text += WORD.charAt(i);
      label.textContent = text;
      await key();
      text += WORD.charAt(i + 1);
      label.textContent = text;
      await key();
      i++;
      continue;
    }
    text += WORD.charAt(i);
    label.textContent = text;
    await key();
  }
}

function isInternalPage(a: HTMLAnchorElement): boolean {
  if (a.target === "_blank" || a.hasAttribute("download")) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  if (normalise(url.pathname) === normalise(location.pathname)) return false; // same page / hash only
  return /(\.html?|\/)$/.test(url.pathname); // not pdf, images…
}

document.addEventListener("click", (e: MouseEvent) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (!curtain || reduce || !isInternalPage(a)) return;
  e.preventDefault();
  try {
    sessionStorage.setItem("mq-t", "1");
  } catch {
    /* private mode: transition just won't continue on the next page */
  }
  curtain.classList.add("cover");
  void wait(70)
    .then(typeName)
    .then(() => wait(40))
    .then(() => {
      location.href = a.href;
    });
});

window.addEventListener("pageshow", (e: PageTransitionEvent) => {
  if (e.persisted && curtain) {
    curtain.classList.remove("cover", "leave");
    root.classList.remove("is-entering");
  }
});

void openCurtain();

/* ---- scroll reveal ---- */
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.08 },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

/* ---- play videos only while on screen ---- */
const videos = document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]");
if ("IntersectionObserver" in window && videos.length) {
  const vo = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const v = en.target as HTMLVideoElement;
        if (en.isIntersecting) void v.play().catch(() => undefined);
        else v.pause();
      }
    },
    { threshold: 0.25 },
  );
  videos.forEach((v) => vo.observe(v));
}
