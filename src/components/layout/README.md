# src/components/layout/

Structural components that define the shape of every page. These components are not specific to any route — they wrap content or provide navigation scaffolding.

---

## Files

### `Navbar.jsx`

Sticky top navigation bar present on all pages.

- **Logo** links to `/`
- **Curriculum dropdown** — hover/click reveals links to all 6 sections plus the Overview
- **Nav links** — Tools, Q&A, Resources
- **Progress pill** — shows `N / 6 complete`, visible on curriculum pages only
- **Presenter mode toggle** — eye icon, calls `setPresenterMode` from `ProgressContext`; purple tint when active
- **Mobile drawer** — full nav in a slide-down panel triggered by hamburger button

Reads from: `ProgressContext`, `data/curriculum.js`

---

### `Sidebar.jsx`

Desktop-only sticky sidebar rendered on curriculum pages (`/curriculum/*`).

- Lists all 6 sections with number, title, and a `CheckCircle2` icon when complete
- Highlights the active section via `useLocation`
- Bottom links to Tools, Q&A, Resources
- Hidden below `lg` breakpoint (`hidden lg:block`)

Reads from: `ProgressContext`, `data/curriculum.js`

---

### `PageWrapper.jsx`

Layout shell for interior pages.

- **`withSidebar={true}`** — two-column layout: `Sidebar` (w-56) left, content (`max-w-content`) right. Only activates on `/curriculum/*` paths.
- **`withSidebar={false}`** (default) — full-width single-column layout.

Props: `{ children, withSidebar?: boolean }`

---

### `Breadcrumb.jsx`

Horizontal breadcrumb trail rendered at the top of interior pages.

Props: `{ crumbs: Array<{ label: string, to?: string }> }`

- Items with a `to` prop render as `<Link>` elements
- The last item (no `to`) renders as plain text — the current page

---

### `Footer.jsx`

Full-width dark footer (`bg-brand-black`) with three columns:

1. BYTE description and tagline
2. Curriculum links (Overview + Sections 0–5)
3. Past projects (Yapp, SecureBYTE)

Bottom row: copyright + reference links.
