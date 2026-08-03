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
│   ├── App.jsx               # Root component, routes, ⌘K search shortcut
│   ├── main.jsx              # Entry point, HashRouter + ProgressProvider
│   ├── index.css             # Tailwind directives, global styles, animations, print styles
│   ├── assets/               # Team photos and org logos
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Sidebar, PageWrapper, Breadcrumb
│   │   └── ui/               # PromptBox, CommandPalette, PathPicker, SubsectionTimer, …
│   ├── context/              # ProgressContext — subsection progress, path, presenter mode
│   ├── data/                 # All content: curriculum, tools, appendix, resources, team, orgs
│   ├── hooks/                # useCopyToClipboard, useScrollReveal, useScrollSpy
│   ├── pages/                # One file per route
│   └── utils/                # cn, curriculumHelpers, searchIndex, collectPrompts
├── public/                   # favicon and static assets served as-is
├── .github/workflows/        # Builds every PR; deploys on push to main
├── tailwind.config.js        # Brand colour tokens, font families
├── vite.config.js            # Base path set to /BCH-X-BYTE-Workshop/
└── package.json
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Marketing landing page, resumes where the student left off |
| `/curriculum` | Section index, progress, build-path picker |
| `/curriculum/:sectionId` | A section. `?presenter=1` shows facilitator notes, `?slides=1` is projection mode |
| `/tools` | Tool reference with free-tier limits and fallbacks |
| `/resources` | Checklist, tool links, free-tier table, prompt library |
| `/appendix` | FAQ accordion |
| `/contact` | About BCH, BYTE, and the team |
| `/facilitator` | Printable run of show — not linked from the main nav |

---

## Deployment

Deployment is fully automated. Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes the `dist/` folder to the `gh-pages` branch. Pull requests run the same build as a check without publishing.

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
- **No search library** — the corpus is a few hundred short records, so `src/utils/searchIndex.js` scores substring matches directly.
- **No TypeScript** — plain JavaScript throughout.
- **Content in `src/data/`** — pages read from data; no workshop content is hardcoded in components.
- **Nothing is stored twice.** Section count, section durations, and the prompt library are all derived from `curriculum.js`. These used to be duplicated and drifted apart: the app once declared six sections while the data had five, capping progress at 83%.

---

## Content Updates

All workshop content lives in [`src/data/`](src/data/). To update prompts, tools, Q&A, or checklist steps, edit the relevant data file — no component changes needed.

| File | What it controls |
|---|---|
| `curriculum.js` | All 5 sections, subsections, prompts, teaching points |
| `tools.js` | Tool cards, and the free-tier status shown on Tools and Resources |
| `appendix.js` | FAQ accordion categories and questions |
| `resources.js` | Quick-start checklist steps |
| `teamData.js` | Team cards on the Contact page |
| `orgs.js` | BCH / BYTE / collaboration blurbs |
| `homeContent.js` | Landing page "what you will learn" cards |

### Curriculum data conventions

- **`path`** on a section: `'both'`, `'nontech'`, or `'technical'`. Students pick a build path in 1.5; sections on the other path are dimmed and skipped by Next.
- **`extension: true`** on a subsection: take-home material. Renders inside a collapsed "Go deeper" disclosure, and is excluded from progress and the run-of-show clock. Use this to add depth without breaking the 90-minute budget.
- **`timing`** on a subsection drives the presenter countdown timer and the run-of-show clock. The section duration label is summed from these, so keep them honest.
- Content block types: `body`, `bullets`, `numbered`, `prompt`, `teachingPoint`, `presenterNote`, `callout`, `mindset`, `diagram`, `pathPicker`.

### Keeping tool information current

AI tool pricing moves fast. Free-tier limits live in `tools.js` under `freeTier` (`status`, `detail`, `fallback`) and are surfaced with a "verified" date driven by the `FREE_TIER_VERIFIED` constant in the same file. When you re-check the limits, update both the details and that constant.

Limits as of the last check (August 2026): Lovable free is 5 credits/day capped at 30/month; Cursor Hobby caps agent requests; Claude Code needs a paid Claude plan; Notion AI's full features are Business-only. Every paid step has a free fallback in the curriculum.

---

## Facilitator Features

- **Presenter mode** — eye icon in the nav, or `?presenter=1` on any section URL. Persists across refreshes. Reveals presenter notes and per-subsection countdown timers.
- **Run of show** — `#/facilitator`. Every subsection in order with a running clock, prompt counts, and all presenter notes expanded. Print it.
- **Projection mode** — `?slides=1` on a section URL. One subsection at a time, larger type, arrow-key navigation.

---

*TMU BYTE × BCH — Let's build.*
