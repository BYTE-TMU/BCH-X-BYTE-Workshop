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

Presentational components that render specific content block types: prompts, teaching points, presenter notes, badges, navigation, and progress indicators. They are driven entirely by props — no data imports, no context reads (except `PresenterNote` which reads `presenterMode`).

---

## Conventions

- All files use `.jsx` extension.
- No TypeScript — plain JavaScript with prop conventions documented per component.
- No animation libraries — CSS transitions only.
- Tailwind classes only — no inline styles, no CSS modules.
