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
| Styling | Tailwind CSS v3, over a CSS-custom-property token layer |
| Theming | Light + dark, class-based, `system` by default |
| Motion | [`motion`](https://motion.dev) springs for gesture-driven UI; CSS for the rest |
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
│   ├── context/              # ProgressContext (progress, path, presenter), ThemeContext
│   ├── data/                 # All content: curriculum, tools, appendix, resources, team, orgs
│   ├── hooks/                # useCopyToClipboard, useScrollReveal, useScrollSpy, useScrolled
│   ├── motion/               # springs.js (shared spring vocabulary), project.js (momentum)
│   ├── pages/                # One file per route
│   └── utils/                # cn, curriculumHelpers, searchIndex, collectPrompts, scroll
├── public/                   # favicon and static assets served as-is
├── .github/workflows/        # Builds every PR; deploys on push to main
├── tailwind.config.js        # Semantic colour/type/radius/elevation tokens
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
- **Colours resolve through CSS custom properties, not hex.** `tailwind.config.js` defines every colour as `rgb(var(--token) / <alpha-value>)`. The triplet form is what keeps opacity modifiers (`bg-accent/40`) working. Swapping the properties under `html.dark` in `index.css` *is* the dark theme — no `dark:` variant appears anywhere in the components.
- **The old `brand-*` / `path-*` class names are kept as aliases** onto the semantic tokens (`accent`, `ink`, `surface`, `line`). That is deliberate: it let ~300 existing class usages across 28 files pick up both the contrast fix and dark mode without being touched. New code should prefer the semantic names.
- **`motion` is used only where a surface is grabbed, dragged or dismissed** — the mobile drawer, the ⌘K palette, the nav dropdown, the path picker. Everything else is still CSS. This reverses the project's original "no animation libraries" rule: springs are interruptible and velocity-aware, and a CSS transition cannot be caught and reversed mid-flight, which is what a drag-to-dismiss drawer needs. Cost is roughly +45 kB gzipped.
- **No search library** — the corpus is a few hundred short records, so `src/utils/searchIndex.js` scores substring matches directly.
- **No TypeScript** — plain JavaScript throughout.
- **Content in `src/data/`** — pages read from data; no workshop content is hardcoded in components.
- **Nothing is stored twice.** Section count, section durations, and the prompt library are all derived from `curriculum.js`. These used to be duplicated and drifted apart: the app once declared six sections while the data had five, capping progress at 83%.

---

## Design System

Tokens live in two files and nowhere else: the values in `src/index.css`, the Tailwind names in `tailwind.config.js`.

### Colour

| Group | Names | Use |
|---|---|---|
| Surface | `surface-base`, `-sunken`, `-raised`, `-overlay`, `-hover`, `-inverse` | Page, alternating bands, cards, translucent chrome, hover, inverted blocks |
| Text | `ink`, `ink-secondary`, `ink-tertiary`, `ink-inverse`, `ink-inverseDim` | `ink-tertiary` is below 4.5:1 by design — large text, icons and decoration only |
| Hairlines | `line`, `line-strong` | |
| Accent | `accent`, `-hover`, `-subtle`, `-on`, `-band` | `accent-on` is the text colour *on* a filled accent — it is white in light and near-black in dark, because the dark theme lightens the accent |
| Paths | `path-both`, `-technical`, `-nontech` + `*Light` | |
| Status | `state-info`, `-warn`, `-ok` + `*Subtle`, `*Line` | |
| Code | `code-surface`, `-raised`, `-line`, `-ink`, `-dim` | Deliberately dark in both themes — a prompt block reads as a terminal |
| On-fill | `on-path`, `on-band`, `on-bandDim` | Text on a filled colour field rather than on a surface |

Everything clears WCAG AA in both themes. Two values were changed to get there: the secondary text colour (was 3.6:1 while carrying nearly all body copy) and the accent (was 4.0:1 on its own tint, which is the active sidebar row and the hero pill).

### Type

`text-display`, `-h1`, `-h2`, `-h3`, `-body-lg`, `-body`, `-small`, `-caption`, `-eyebrow`. Each carries its own line-height and letter-spacing, because tracking is size-specific: small sizes get slightly positive tracking for legibility, display sizes negative. Do not pair these with a `tracking-*` utility.

`text-eyebrow uppercase` replaces the four-utility `text-xs font-bold uppercase tracking-widest` motif that appeared 30 times.

### Radius, elevation, motion

Radius and shadow **override Tailwind's stock keys** rather than adding new ones, so `rounded-lg` and `shadow-sm` mean something specific now. Shadow colour and strength are custom properties: the dark theme swaps to pure black at much higher alpha, since a light-tinted shadow is invisible on a dark surface.

Springs come from `src/motion/springs.js` — `ui` (default, no overshoot), `move`, `sheet`, `flick`. Bounce is reserved for motion that follows a real momentum gesture. `MotionConfig reducedMotion="user"` in `App.jsx` honours the user's preference for every spring at once, so components never check the media query themselves.

Press feedback is the `.pressable` / `.pressable-lg` utility, applied to anything touchable. It fires on pointer-*down*, not on click.

### Theming

Class-based (`html.dark`), three modes — `light`, `dark`, `system` (the default) — cycled by the toggle in the navbar and stored under `bch_byte_theme`. An inline script in `index.html` resolves the theme before first paint; without it every load flashes the wrong theme. Print forces the light palette regardless of the active theme, because the run-of-show page is meant to be printed.

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
