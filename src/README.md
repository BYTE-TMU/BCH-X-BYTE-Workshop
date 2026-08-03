# src/

Root of the React application source. Contains the entry point, root component, global styles, and all subdirectories.

---

## Files

| File | Purpose |
|---|---|
| `main.jsx` | Application entry point. Mounts the React tree with `HashRouter` and `ProgressProvider` wrapping `App`. |
| `App.jsx` | Defines all routes, renders `Navbar` and `Footer`, mounts the `CommandPalette` and its ⌘K / Ctrl-K / `/` keyboard shortcut, handles the page-enter animation by keying the route wrapper on `location.pathname`, and includes `ScrollToTop` to reset scroll position on navigation. |
| `index.css` | Tailwind directives (`@tailwind base/components/utilities`), Google Fonts import, global `scroll-behavior: smooth`, the `pageEnter` keyframe animation, accordion CSS grid transition utilities, projection-mode type scale, and print styles for the run-of-show page. |

---

## Subdirectories

| Directory | Contents |
|---|---|
| [`assets/`](assets/README.md) | Team photos and organisation logos |
| [`components/`](components/README.md) | All React components, split into `layout/` and `ui/` |
| [`context/`](context/README.md) | `ProgressContext` — subsection progress, build path, presenter mode |
| [`data/`](data/README.md) | All workshop content as plain JS export arrays |
| [`hooks/`](hooks/README.md) | Custom React hooks |
| [`pages/`](pages/README.md) | One component per route |
| [`utils/`](utils/README.md) | Shared utilities and data derived from the curriculum |

---

## Entry Point Flow

```
main.jsx
  └── HashRouter
        └── ProgressProvider
              └── App
                    ├── ScrollToTop        ← resets scroll on route change
                    ├── Navbar             ← opens the command palette
                    ├── AnimatedRoutes     ← page-enter fade triggered by key
                    │     └── <Routes>    ← all page components
                    ├── Footer
                    └── CommandPalette     ← ⌘K search overlay
```
