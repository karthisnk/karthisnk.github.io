# Karthi's Design Book

A searchable dashboard of story-driven cards. Each card opens its own dedicated page that tells a story, browsable by title, category, or tags.

Live site → **https://karthisnk.github.io**

---

## What it is

| Feature | Details |
|---|---|
| Hero carousel | 3 featured stories rotate automatically |
| Category filter | 15 categories, horizontal scrollable bar |
| Search | Filters by title, category, summary, and tags simultaneously |
| Grid / List view | Toggle between 2-column grid and single-column list |
| Story page | Each card links to its own `story.html?id=…` page |

The site is **plain HTML + CSS + vanilla JS (ES modules)**. There is no build step, no framework, and no dependencies to install for the main site.

---

## Project structure

```
karthisnk.github.io/
├── index.html          # Dashboard / landing page
├── story.html          # Individual story page (driven by ?id= query param)
├── styles/
│   └── main.css        # All styles — design tokens, layout, components
├── scripts/
│   ├── data.js         # Story data, categories, color map
│   ├── main.js         # Dashboard logic (carousel, filters, search, cards)
│   └── story.js        # Story page logic
└── docs/
    └── CATEGORIES.md   # Source of truth for the 15 category names
```

---

## Run locally

Because the scripts use **ES modules** (`type="module"`), the files must be served over HTTP — opening `index.html` directly from the file system will not work in most browsers.

> **No build step required.** This is a static site — there is no `npm install`, `npm run build`, or compile step. After editing any file, stop the server (`Ctrl+C`), restart it with the command below, and refresh your browser.

### Option 1 — Python (no install required, comes with macOS / Linux)

```bash
# Start (or restart after code changes)
python3 -m http.server 8080
```

Then open **http://localhost:8080** in your browser.

### Option 2 — Node.js `serve`

```bash
# One-time global install (skip if already installed)
npm install -g serve

# Start (or restart after code changes)
npx serve .
```

Then open the URL printed in the terminal (usually **http://localhost:3000**).

> **Important:** A `serve.json` file at the project root sets `"cleanUrls": false`. This is required — without it, `serve` strips `.html` extensions and query strings from URLs (e.g. `story.html?id=api-contract-story` becomes `/story` with no ID), causing every story page to show "not available".

### After making code changes

Since there is no compilation or bundling:

1. Stop the running server with **`Ctrl+C`**
2. Restart it with one of the commands above
3. **Hard-refresh** your browser (`Cmd+Shift+R` on macOS / `Ctrl+Shift+R` on Windows/Linux) to clear any cached JS/CSS

### Option 3 — VS Code Live Server extension (auto-reloads on save)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Right-click `index.html` in the Explorer and choose **Open with Live Server**.
3. The browser reloads automatically whenever you save a file — no manual restart needed.

---

## How to add or edit stories

All story data lives in `scripts/data.js`. Each entry looks like this:

```js
{
  id: "my-story-id",           // URL-safe unique ID (used in ?id= query param)
  title: "My Story Title",
  summary: "One or two sentence description shown on the card.",
  category: "Cloud",           // Must match one of the 15 categories exactly
  tags: ["Tag1", "Tag2"],      // Shown as pills on the card and story page
  image: "https://...",        // Thumbnail shown on the card (any image URL)
  featured: true,              // Optional — shows this card in the hero carousel
}
```

**Categories** are defined in `docs/CATEGORIES.md` and mirrored in the `categories` array at the top of `data.js`. Keep both in sync when adding a new category.

To mark a story as **featured** (hero carousel), set `featured: true`. The carousel uses the first 3 featured stories and cycles through them automatically.

---

## How to write a story page

The story page currently renders mock placeholder text from `story.js`. When you are ready to add real content for a card:

1. Open `scripts/story.js`.
2. Find the `storyBody.innerHTML` block inside the `else` branch.
3. Replace the placeholder HTML with real narrative content for that story.

A future improvement will move story body content into `data.js` (or separate Markdown files) so each story has its own self-contained content block.

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy-pages.yml`. No manual steps are needed — just push and the site updates within ~30 seconds.

If you fork this repo and want to enable GitHub Pages on your fork:

1. Go to **Settings → Pages** in your forked repo.
2. Set Source to **GitHub Actions**.
3. Push any change to `main` to trigger the first deploy.

---

## Contributing

1. **Fork** the repo and create a branch: `git checkout -b feature/my-change`
2. Run locally with any method above.
3. Make your changes — stories, styles, or layout.
4. Open a **Pull Request** against `main`.

Code style: plain JS (no TypeScript, no bundler). Keep it dependency-free unless there is a strong reason not to.
