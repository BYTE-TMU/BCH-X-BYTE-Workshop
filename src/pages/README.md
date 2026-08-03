# src/pages/

One component per route. Pages compose layout and UI components and read from `src/data/`. They own no reusable logic — that lives in `context/`, `hooks/`, or `utils/`.

---

## Files

### `Home.jsx` → `/`

Landing page.

1. **Hero** — headline, subtitle, two CTAs. The primary CTA becomes "Resume at 2.3 …" once a returning visitor has progress.
2. **What you will build** — description of the personal landing page with a wireframe placeholder
3. **What you will learn** — grid of goals from `data/homeContent.js`
4. **Workshop at a Glance** — every section linking to its page; off-path sections are dimmed
5. **Start CTA** — full-width red banner linking to Section 0

Section count and total minutes are derived, never written as prose.

---

### `CurriculumOverview.jsx` → `/curriculum`

Navigation hub.

- Progress bar and `N / total` count from `ProgressContext`, plus a "Resume at …" link to the first unfinished subsection
- `PathPicker` for choosing the build path
- One card per section with title, derived duration, description, `x / y steps` completed, and off-path state
- "Reset progress" button (guarded by `window.confirm`)
- Rendered inside `PageWrapper` with sidebar

---

### `SectionPage.jsx` → `/curriculum/:sectionId`

The core tutorial experience. A single component handles every section by reading from `data/curriculum.js` using the `:sectionId` URL param.

- Renders each subsection's `content` array through a `ContentBlock` switch — one case per block type
- Per-subsection "Mark as done" checkbox, plus a "mark everything" toggle at the bottom
- Take-home subsections (`extension: true`) render inside a collapsed "Go deeper" disclosure
- Shows a notice when the section belongs to the build path the student did not pick
- Redirects to `/curriculum` if `sectionId` is not found

**Query parameters:**

| Param | Effect |
|---|---|
| `?presenter=1` | Turns presenter mode on. Reveals presenter notes and per-subsection countdown timers. |
| `?slides=1` | Projection mode: one subsection at a time, larger type, arrow-key navigation. |

---

### `Tools.jsx` → `/tools`

Searchable, filterable tool reference.

- Filter buttons: All / Both Paths / Technical / Non-Technical
- Text search filtering name and description fields
- Tools grouped by `group` field from `data/tools.js`
- Each card shows name, step, path pill, free-tier status badge, what the free tier actually gets you, a named free alternative where the tool is not free, and an external link
- Displays the `FREE_TIER_VERIFIED` date so readers can judge how stale the limits are

---

### `Appendix.jsx` → `/appendix`

FAQ accordion page. Linked in the navbar, sidebar, and footer as "FAQ".

- Text search filters across all questions and answers
- Each category is an independent accordion with a smooth CSS `grid-template-rows` expand/collapse animation

---

### `Resources.jsx` → `/resources`

Post-workshop reference page:

1. **Quick Start Checklist** — steps from `data/resources.js`, each persisted to `localStorage` under `bch_byte_checklist`
2. **Tool Links** — compact grid linking to all tools
3. **Free Tier Summary** — three-state table (Free / Free with limits / Paid) with the specific limit and a named fallback
4. **Prompt Library** — every curriculum prompt, derived via `utils/collectPrompts.js`, each with a copy button
5. **BYTE Community** — dark card with GitHub link
6. **Downloads** — disabled stubs (Coming Soon) for PDF documents

---

### `Facilitator.jsx` → `/facilitator`

Printable run of show for whoever is presenting. Deliberately not linked from the main nav.

- Every section and subsection in order with a running cumulative clock
- Presenter notes expanded inline regardless of presenter mode, so the printout is complete
- Prompt counts per subsection, and intro frames called out
- Take-home material listed separately, excluded from the clock
- "Project this section" links into `?slides=1&presenter=1`
- Print button; `@media print` rules live in `index.css`

---

### `NotFound.jsx` → `*`

Simple 404 fallback with a link back to `/`.
