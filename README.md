# BCH x BYTE Workshop

> A hands-on curriculum site for the BCH x BYTE workshop at TMU. Go from a vague idea to a live, deployed product — no coding experience required.

Live site: **https://byte-tmu.github.io/BCH-X-BYTE-Workshop/**

---

## What This Is

A fully static, multi-page tutorial website that guides attendees through the complete lifecycle of building a personal landing page using AI tools. Works as both a live workshop companion and a standalone self-paced resource.

No backend. No API calls. All interactivity is client-side. Progress tracking uses `localStorage`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 — HashRouter (required for GitHub Pages) |
| State | React Context + useState |
| Persistence | localStorage |
| Icons | Lucide React |
| Deployment | GitHub Pages via GitHub Actions |

---

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev
# → http://localhost:5173/BCH-X-BYTE-Workshop/

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
/
├── src/
│   ├── App.jsx               # Root component, route definitions
│   ├── main.jsx              # Entry point, HashRouter + ProgressProvider
│   ├── index.css             # Tailwind directives, global styles, animations
│   ├── assets/               # Static image assets
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Sidebar, PageWrapper, Breadcrumb
│   │   └── ui/               # PromptBox, TeachingPoint, PresenterNote, etc.
│   ├── context/              # ProgressContext — section completion + presenter mode
│   ├── data/                 # All content: curriculum, tools, appendix, resources
│   ├── hooks/                # useCopyToClipboard, useScrollSpy
│   ├── pages/                # One file per route
│   └── utils/                # cn() class name helper
├── public/                   # favicon and static assets served as-is
├── .github/workflows/        # GitHub Actions auto-deploy on push to main
├── tailwind.config.js        # Brand colour tokens, font families
├── vite.config.js            # Base path set to /BCH-X-BYTE-Workshop/
└── package.json
```

---

## Deployment

Deployment is fully automated. Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes the `dist/` folder to the `gh-pages` branch.

**One-time setup required in GitHub:**
Settings → Pages → Source → `gh-pages` branch → Save.

To deploy manually:
```bash
npm run deploy
```

---

## Key Design Decisions

- **HashRouter** — GitHub Pages cannot handle client-side routing on direct URL access. `/#/curriculum/section-1` works; `/curriculum/section-1` returns a 404.
- **Base path `/BCH-X-BYTE-Workshop/`** — set in `vite.config.js` to match the repo name exactly (case-sensitive).
- **No animation libraries** — CSS transitions only (`@keyframes`, `transition`, `grid-template-rows`).
- **No TypeScript** — plain JavaScript throughout.
- **Content in `src/data/`** — all workshop content lives in four JS files. Pages read from data; no content is hardcoded in components.

---

## Content Updates

All workshop content lives in [`src/data/`](src/data/). To update prompts, tools, Q&A, or checklist steps, edit the relevant data file — no component changes needed.

| File | What it controls |
|---|---|
| `curriculum.js` | All 6 sections, subsections, prompts, teaching points |
| `tools.js` | Tool cards on the Tools page |
| `appendix.js` | Q&A accordion categories and questions |
| `resources.js` | Workflow checklist steps + prompt library |

---

*TMU BYTE × BCH — Let's build.*
