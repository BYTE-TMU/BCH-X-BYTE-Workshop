# src/components/

All reusable React components, split into two subdirectories by concern.

---

## Structure

```
components/
├── layout/    Structural components that define page shape
└── ui/        Content-level components rendered inside pages
```

---

## Subdirectories

### [`layout/`](layout/README.md)

Components that wrap or frame page content. They appear on every page (Navbar, Footer) or conditionally control layout (Sidebar, PageWrapper). They import from `context/` and `data/` but never render workshop content directly.

### [`ui/`](ui/README.md)

Presentational components that render specific content block types: prompts, teaching points, presenter notes, badges, navigation, progress indicators, search, and diagrams. Most are driven entirely by props. The exceptions read only what they cannot receive as a prop: `PresenterNote` and `SubsectionTimer` need `presenterMode`, `PathPicker` and `SectionNav` need `selectedPath`, and `FreeTierBadge` reads its labels from `data/tools.js` so they stay identical everywhere they appear.

---

## Conventions

- All files use `.jsx` extension.
- No TypeScript — plain JavaScript with prop conventions documented per component.
- No animation libraries — CSS transitions only.
- Tailwind classes only — no inline styles, no CSS modules.
