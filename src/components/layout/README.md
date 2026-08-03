# src/components/layout/

Structural components that define the shape of every page. These components are not specific to any route — they wrap content or provide navigation scaffolding.

---

## Files

### `Navbar.jsx`

Sticky top navigation bar present on all pages.

Props: `{ onOpenSearch: () => void }`

- **Logo** links to `/`
- **Curriculum dropdown** — hover/click reveals links to every section plus the Overview; off-path sections are dimmed
- **Nav links** — Tools, Resources, FAQ, Contact
- **Search button** — opens the command palette, with the ⌘K hint shown on desktop and an icon on mobile
- **Progress pill** — shows `N / total complete` on curriculum pages, with both numbers derived from the same set of sections
- **Presenter mode toggle** — eye icon, calls `setPresenterMode` from `ProgressContext`; purple tint when active
- **Mobile drawer** — full nav in a slide-down panel triggered by the hamburger button

Hidden when printing (`print:hidden`).

Reads from: `ProgressContext`, `data/curriculum.js`

---

### `Sidebar.jsx`

Desktop-only sticky sidebar rendered on curriculum pages (`/curriculum/*`).

- Lists every section with number, title, and a `CheckCircle2` icon when complete
- Dims sections belonging to the build path the student did not pick
- On the section being read, expands an indented **subsection table of contents** with per-subsection completion ticks; the active entry is highlighted via `useScrollSpy`
- Bottom links to Tools, Resources, FAQ
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
2. Curriculum links — mapped from `sections`, plus FAQ
3. Past projects (Yapp, SecureBYTE)

Bottom row: copyright (year computed at render) + reference links.
