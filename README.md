# Zyrox — Portfolio

Single-page portfolio for **Zyrox** — young entrepreneur & digital product builder
from Tetouan, Morocco. Co-founder of Tapzio. Pure static HTML/CSS/JS — no build step.

**Files:** `index.html` · `styles.css` · `script.js` · `vercel.json`

## Preview locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy → https://zyrox.vercel.app

### Option 1 — browser drag & drop (fastest, no commands)

1. Go to **https://vercel.com/drop** (log in to your Vercel account first)
2. Drag this project folder onto the page
3. Set the project name to **`zyrox`**
4. Click **Deploy** → live at `https://zyrox.vercel.app`

### Option 2 — Vercel CLI

```bash
npx vercel login                                # skip if already logged in
npx vercel link --yes --project zyrox           # creates/links the project "zyrox"
npx vercel deploy --prod --yes                  # deploys to zyrox.vercel.app
```

`vercel link --project zyrox` is what sets the name — the old `--name` flag is
deprecated. The site has 3 files, so Vercel uses its instant static deployment
(no build step).

## Updating the site

- **CLI:** run `npx vercel deploy --prod --yes` again from this folder.
- **Git:** push to a repo connected to Vercel for automatic deploys.
