# Border Radius Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every rectangle element in the live site share a single 14px corner radius without changing other visual properties.

**Architecture:** Add a `--radius` design token to the existing `:root` block, then replace every existing `border-radius` value on rectangle selectors with `var(--radius)`. Pill and circle selectors keep their hardcoded values.

**Tech Stack:** Plain CSS. No new dependencies, no HTML changes, no JS changes.

## Global Constraints

- Add new token: `--radius: 14px` inside `:root`.
- Replace every rectangle `border-radius: 2px` with `border-radius: var(--radius)`.
- Replace `border-radius: 6px` on `.toast` with `border-radius: var(--radius)`.
- Keep `border-radius: 999px` and `border-radius: 50%` unchanged.
- No other CSS, HTML, or JS modifications.

---

### Task 1: Add the `--radius` design token

**Files:**
- Modify: `main-portfolio/style.css:3-30` inside the `:root` block

- [ ] **Step 1: Verify the token does not already exist**

Run:

```bash
cd /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio/main-portfolio
grep -n -- "--radius" style.css
```

Expected: no output (no existing `--radius` token).

- [ ] **Step 2: Add the `--radius` token**

Insert just before the closing `}` of the `:root` block, after the line `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);`:

```css
  --radius: 14px;
```

- [ ] **Step 3: Verify the token exists**

Run:

```bash
grep -n "  --radius: 14px;" style.css
```

Expected: exactly one match.

- [ ] **Step 4: Commit the token**

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio add main-portfolio/style.css
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio commit -m "feat: add --radius design token"
```

---

### Task 2: Replace rectangle border-radius values with the token

**Files:**
- Modify: `main-portfolio/style.css`

Target: every selector that currently uses `border-radius: 2px` for a rectangle, plus the `.toast` rule that uses `6px`. Skip rules that keep `999px` or `50%`.

- [ ] **Step 1: Preview the exact values to replace**

Run:

```bash
grep -n "border-radius: 2px" style.css
grep -n "border-radius: 6px" style.css
```

Expected: multiple matches across the file. Recreate each as a small Edit operation shown below.

- [ ] **Step 2: Replace the 2px occurrences**

Run the following sed command:

```bash
sed -i '' 's/border-radius: 2px/border-radius: var(--radius)/g' style.css
```

- [ ] **Step 3: Replace the toast 6px value**

Run:

```bash
sed -i '' 's/border-radius: 6px/border-radius: var(--radius)/g' style.css
```

- [ ] **Step 4: Verify the replacements**

Run:

```bash
grep -n "border-radius: 2px" style.css || echo "no 2px remaining"
grep -n "border-radius: 6px" style.css || echo "no 6px remaining"
grep -n "border-radius: var(--radius)" style.css | wc -l
```

Expected: no 2px or 6px values remain; the count of `var(--radius)` matches the original number of 2px occurrences plus one more for the toast (the audit showed 18 `2px` and 1 `6px`, so expect 19 total).

- [ ] **Step 5: Confirm pill and circle shapes are preserved**

Run:

```bash
grep -n "border-radius: 999px" style.css
grep -n "border-radius: 50%" style.css
```

Expected: each still has the same number of matches as before (1 `999px` and 5 `50%`).

- [ ] **Step 6: Commit the unified values**

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio add main-portfolio/style.css
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio commit -m "feat: unify rectangle border radius to 14px"
```

---

### Task 3: Verify the live site

**Files:**
- Verify: `main-portfolio/style.css`

- [ ] **Step 1: Static HTTP check**

Run:

```bash
python3 - <<'PY'
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.request import urlopen

server = ThreadingHTTPServer(('127.0.0.1', 8090), SimpleHTTPRequestHandler)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
try:
    for path in ['index.html', 'style.css', 'script.js']:
        with urlopen('http://127.0.0.1:8090/' + path) as response:
            assert response.status == 200, (path, response.status)
    print('HTTP_OK')
finally:
    server.shutdown()
PY
```

Expected: prints `HTTP_OK`.

- [ ] **Step 2: Confirm diff is styles-only**

Run:

```bash
git -C /Users/nguyenminhquan/CodeSpace/1-personal/myportfolio diff --stat HEAD~2..HEAD -- main-portfolio/
```

Expected: only `style.css` changed.

- [ ] **Step 3: Spot-check the updated corners**

Open the live site in a browser and verify:
- Hero stats, experience cards, project cards, publication cards, testimonials, recognition cards, and contact cards all show 14px rounded corners.
- The "View all experiences" pill remains round.
- The timeline markers, project slider buttons, and slider dots remain circular.
- The certificate modal dialog and its close button render with 14px corners.
