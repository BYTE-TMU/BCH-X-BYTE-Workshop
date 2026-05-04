# src/

Root of the React application source. Contains the entry point, root component, global styles, and all subdirectories.

---

## Files

| File | Purpose |
|---|---|
| `main.jsx` | Application entry point. Mounts the React tree with `HashRouter` and `ProgressProvider` wrapping `App`. |
| `App.jsx` | Defines all routes, renders `Navbar` and `Footer`, handles the page-enter animation by keying the route wrapper on `location.pathname`, and includes `ScrollToTop` to reset scroll position on navigation. |
| `index.css` | Tailwind directives (`@tailwind base/components/utilities`), Google Fonts import, global `scroll-behavior: smooth`, and the `pageEnter` keyframe animation and accordion CSS grid transition utilities. |
| `style.css` | Legacy scaffold file — unused. Can be deleted. |

---

## Subdirectories

| Directory | Contents |
|---|---|
| [`assets/`](assets/README.md) | Static image and SVG assets |
| [`components/`](components/README.md) | All React components, split into `layout/` and `ui/` |
| [`context/`](context/README.md) | `ProgressContext` — global state for section completion and presenter mode |
| [`data/`](data/README.md) | All workshop content as plain JS export arrays |
| [`hooks/`](hooks/README.md) | Custom React hooks |
| [`pages/`](pages/README.md) | One component per route |
| [`utils/`](utils/README.md) | Shared utility functions |

---

## Entry Point Flow

```
main.jsx
  └── HashRouter
        └── ProgressProvider
              └── App
                    ├── ScrollToTop        ← resets scroll on route change
                    ├── Navbar
                    ├── AnimatedRoutes     ← page-enter fade triggered by key
                    │     └── <Routes>    ← all page components
                    └── Footer
```
