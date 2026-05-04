# src/pages/

One component per route. Pages compose layout and UI components and read from `src/data/`. They own no reusable logic — that lives in `context/` or `hooks/`.

---

## Files

### `Home.jsx` → `/`

Landing page. Four sections:

1. **Hero** — headline, subtitle, two CTAs (Start Curriculum, View All Tools)
2. **What you will build** — description of the personal landing page with a wireframe placeholder
3. **What you will learn** — 2×2 grid of workshop goals
4. **Workshop at a Glance** — table of all 6 sections linking to their pages
5. **Start CTA** — full-width red banner linking to Section 0

No progress tracking on this page.

---

### `CurriculumOverview.jsx` → `/curriculum`

Navigation hub for all 6 sections.

- Overall progress bar from `ProgressContext`
- One card per section showing title, duration, format, description, and completion state
- "Reset progress" button (guarded by `window.confirm`)
- Rendered inside `PageWrapper` with sidebar

---

### `SectionPage.jsx` → `/curriculum/:sectionId`

The core tutorial experience. A single component handles all 6 sections by reading from `data/curriculum.js` using the `:sectionId` URL param.

- Renders each subsection's `content` array through a `ContentBlock` switch — one case per block type
- Mark complete / unmark checkbox at the bottom, wired to `ProgressContext`
- `SectionNav` for previous/next navigation
- Redirects to `/curriculum` if `sectionId` is not found

---

### `Tools.jsx` → `/tools`

Searchable, filterable tool reference.

- Filter buttons: All / Both Paths / Technical / Non-Technical
- Text search filtering name and description fields
- Tools grouped by `group` field from `data/tools.js`
- Each card shows name, step, path pill, free-tier badge, description, and an external link

---

### `Appendix.jsx` → `/appendix`

Q&A accordion page.

- Text search filters across all questions and answers
- Each category is an independent accordion with a smooth CSS `grid-template-rows` expand/collapse animation
- Chevron icon rotates 180° on open

---

### `Resources.jsx` → `/resources`

Post-workshop reference page with four sections:

1. **Quick Start Checklist** — 7 steps, each a checkbox persisted to `localStorage` under `bch_byte_checklist`
2. **Tool Links** — compact grid linking to all tools
3. **Free Tier Summary** — table of tools and their free tier status
4. **Prompt Library** — all curriculum prompts grouped by section, each with a copy button
5. **BYTE Community** — dark card with GitHub link
6. **Downloads** — disabled stubs (Coming Soon) for PDF documents

---

### `NotFound.jsx` → `*`

Simple 404 fallback with a link back to `/`.
