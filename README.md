# karthisnk.github.io

Premium metadata-driven dashboard launcher for interactive mini-sites, designed for GitHub Pages.

## What This Repo Contains

- `index.html`: Dashboard landing page
- `assets/data/sites.json`: Single source of truth for experience cards
- `styles/`: Global tokens, dashboard UI, and motion layers
- `scripts/dashboard.js`: Rendering, filtering, modal, command palette, transitions
- `sites/<slug>/`: Mini-site folders (lowercase slugs only)
- `.nojekyll`: Keeps GitHub Pages from applying Jekyll processing

## Quick Start (Run Locally)

Run these from the repo root unless noted.

1. Build the React mini-site used by the dashboard (Kinexus):

```bash
npm run install:kinexus
npm run build:kinexus
```

2. Start a local static server for the whole repo:

```bash
npm run serve
```

3. Open:

- `http://localhost:8080/` (dashboard)

Why this is required:

- The dashboard fetches `assets/data/sites.json`, which does not work reliably over `file://` URLs.
- The Kinexus card points to built output under `sites/kinexus-assistant/dist/index.html`.

### One-Command Local Start

If you want install + build + serve in one command:

```bash
npm run local
```

## Root Helper Scripts

Root `package.json` includes:

- `npm run install:kinexus`: install dependencies for `sites/kinexus-assistant`
- `npm run build:kinexus`: build Kinexus production output
- `npm run dev:kinexus`: run Kinexus Vite dev server
- `npm run serve`: serve repo root at `localhost:8080`
- `npm run local`: install + build + serve in sequence

## Build Checklist Before Commit

1. If dashboard-only changes: refresh local server and verify cards/filtering/modal/palette.
2. If `sites/kinexus-assistant/src/*` changed: run `npm run build:kinexus`.
3. Verify all card links in dashboard open correctly.
4. Verify no case mismatch in paths (`kinexus-assistant`, not `Kinexus-assistant`).

## Metadata Model (`assets/data/sites.json`)

Each card is rendered from metadata. Required fields:

- `id`: Unique id
- `slug`: Lowercase slug used for folder naming
- `title`: Card and modal title
- `description`: Grid description
- `path`: Destination URL
- `tags`: String array used for filters
- `category`: Category filter value
- `status`: Status pill value
- `featured`: Boolean for featured row inclusion

Optional fields:

- `longDescription`: Modal detail text
- `icon`: Icon key (`orbit`, `cloud`, `spark`, `graph`, `wrench`, `flask`)
- `stack`: Technology labels shown in modal

Example entry:

```json
{
	"id": "my-new-site",
	"slug": "my-new-site",
	"title": "My New Site",
	"description": "Short card summary.",
	"longDescription": "Longer modal summary.",
	"path": "./sites/my-new-site/index.html",
	"tags": ["AI", "Demo"],
	"category": "Prototype",
	"status": "New",
	"featured": false,
	"icon": "spark",
	"stack": ["HTML", "CSS", "JavaScript"]
}
```

## Add A New Mini-Site

### Option A: Static Mini-Site (HTML/CSS/JS)

1. Create folder:

```bash
mkdir -p sites/<new-lowercase-slug>
```

2. Add at minimum `sites/<new-lowercase-slug>/index.html`.
3. Add metadata entry in `assets/data/sites.json`.
4. Use path:

- `"path": "./sites/<new-lowercase-slug>/index.html"`

5. Refresh dashboard and verify discoverability via search/tags.

### Option B: React/Vite Mini-Site

1. Scaffold inside `sites/<new-lowercase-slug>/`.
2. Configure Vite `base` for GitHub Pages subpath.
3. Build output with `npm run build`.
4. Point dashboard metadata `path` to built entry (usually `dist/index.html`).
5. Verify local navigation from dashboard card.

## Edit Existing Site (Safe Workflow)

### Edit Dashboard Itself

Files you usually touch:

- `index.html`
- `styles/global.css`
- `styles/dashboard.css`
- `styles/motion.css`
- `scripts/dashboard.js`
- `assets/data/sites.json`

Workflow:

1. Keep local server running (`npm run serve`).
2. Edit files.
3. Refresh browser.
4. Validate:

- featured cards
- filters/search
- modal opens/closes
- command palette opens with `Cmd+K` / `/`
- card links navigate correctly

### Edit Static Mini-Site

1. Edit files under `sites/<slug>/`.
2. Refresh browser on that site URL.
3. No build step required.

### Edit Kinexus React Mini-Site

Project path:

- `sites/kinexus-assistant/`

Commands:

```bash
cd sites/kinexus-assistant
npm run dev
```

Or from repo root:

```bash
npm run dev:kinexus
```

For production/dashboard verification:

```bash
npm run build:kinexus
```

Then refresh dashboard and open Kinexus card.

## Update Existing Site Metadata

If you want to change title, tags, category, status, or destination:

1. Edit corresponding object in `assets/data/sites.json`.
2. Keep values consistent:

- lowercase `slug`
- valid `path`
- meaningful short `description`
- accurate `tags` for filtering

3. Refresh dashboard and verify:

- card appears in expected section
- filter chips and search can find it
- modal content reflects updates
- link opens intended destination

## Kinexus React Mini-Site

`sites/kinexus-assistant/` now uses Vite + React + Tailwind.

- Install: `cd sites/kinexus-assistant && npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

### GitHub Pages Path

The Kinexus Vite config uses a relative base:

- `base: "./"`

This keeps the built site working both when served locally from `localhost:8080` and when hosted from a subdirectory on GitHub Pages.

## Common Issues and Fixes

1. Dashboard loads but cards are empty:

- Ensure server is running via HTTP (not opening `index.html` directly).
- Validate JSON syntax in `assets/data/sites.json`.

2. Card click gives 404:

- Check `path` in metadata.
- Check folder/file casing exactly (GitHub Pages is case-sensitive).

3. Kinexus card fails after source edits:

- Rebuild Kinexus:

```bash
npm run build:kinexus
```

4. Command palette shortcut not working:

- Click page once to focus document, then use `Cmd+K` (Mac) or `Ctrl+K`.

## Suggested Personal Release Routine

Use this every time before pushing:

1. `npm run serve` from repo root.
2. Build Kinexus if touched: `npm run build:kinexus`.
3. Test dashboard top-to-bottom.
4. Test all cards open valid pages.
5. Commit with clear message (for example: `feat: add <site-slug> dashboard entry`).

## Notes

- Lowercase slugs are mandatory to prevent case-sensitive path issues on GitHub Pages.
- `.nojekyll` is present to avoid Jekyll processing conflicts.
