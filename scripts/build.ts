/**
 * Static build: renders the typed templates to HTML, bundles the client script
 * with esbuild and copies CSS + assets into dist/.
 *
 *   npm run build           one-off build
 *   npm run dev             build, serve dist/ on :8090 and rebuild on change
 */
import { build as bundle } from "esbuild";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import { blog } from "../src/templates/blog.js";
import { home } from "../src/templates/home.js";
import { renderPage } from "../src/templates/layout.js";
import { startup } from "../src/templates/startup.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const pages = [
  { file: "index.html", page: home },
  { file: "startup.html", page: startup },
  { file: "blog.html", page: blog },
];

async function build(): Promise<void> {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  for (const { file, page } of pages) {
    await writeFile(join(dist, file), renderPage(page));
  }

  await bundle({
    entryPoints: [join(root, "src/client/main.ts")],
    outfile: join(dist, "script.js"),
    bundle: true,
    minify: true,
    target: "es2019",
    format: "iife",
    logLevel: "warning",
  });

  await cp(join(root, "src/styles/style.css"), join(dist, "style.css"));
  await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });
  await writeFile(join(dist, ".nojekyll"), ""); // GitHub Pages: serve files as-is
  console.log(`built ${pages.length} pages → dist/`);
}

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

function serve(port: number): void {
  createServer(async (req, res) => {
    const path = normalize(decodeURIComponent((req.url ?? "/").split("?")[0] ?? "/"));
    let file = join(dist, path.endsWith("/") ? `${path}index.html` : path);
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404).end("not found");
    }
  }).listen(port, () => console.log(`http://localhost:${port}`));
}

/** Re-run in a fresh process so edited templates are re-imported (module cache). */
function rebuild(): void {
  spawn(process.execPath, [...process.execArgv, fileURLToPath(import.meta.url)], { stdio: "inherit" });
}

await build();

if (process.argv.includes("--serve")) {
  serve(8090);
  let timer: NodeJS.Timeout | undefined;
  for (const dir of ["src", "assets"]) {
    watch(join(root, dir), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(rebuild, 150);
    });
  }
}
