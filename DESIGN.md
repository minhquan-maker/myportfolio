# Design

Clean, scientific, square. White page only.

- **Type:** Space Mono throughout (400/700, italics for venues and quote). Headlines 700 with slight negative tracking.
- **Colour:** `--fg #0b0b0c`, `--muted #6b6f76`, `--faint #9a9ea5`, `--line #e7e8ea`, `--soft #f6f6f7`, links/titles `--blue #2250d8`, status `--live #22a45d`. Tokens live in `:root`.
- **Shape:** zero border-radius everywhere, 1px hairlines, pixel-art thumbnails (`image-rendering: pixelated`).
- **Layout:** 1080px column; hero is text + 300px portrait (200px ≤900px, stacked ≤640px); papers are thumbnail + body; rows are date + role with no dividers.
- **Motion:** page transition is a black curtain that types "Minh Quan" in Newsreader (closest free match to Anthropic's serif), makes one slip (two letters swapped) and corrects it; content fades up on scroll. Both are disabled under `prefers-reduced-motion`.
- **Responsive:** ≤900px portrait shrinks; ≤640px everything stacks, stats 2×2, cards one column.
