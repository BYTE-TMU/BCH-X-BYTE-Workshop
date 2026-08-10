# src/

Root of the React application source. Contains the entry point, root component, global styles, and all subdirectories.

---

## Files

| File | Purpose |
|---|---|
| `main.jsx` | Application entry point. Mounts the React tree with `HashRouter`, `ThemeProvider` and `ProgressProvider` wrapping `App`. |
| `App.jsx` | Defines all routes, renders `Navbar` and `Footer`, mounts the `CommandPalette` and its ⌘K / Ctrl-K / `/` keyboard shortcut, handles the page-enter animation by keying the route wrapper on `location.pathname`, includes `ScrollToTop` to reset scroll position on navigation, provides the skip-to-content link, and wraps everything in `MotionConfig reducedMotion="user"`. |
| `index.css` | **The token layer.** `:root` and `html.dark` blocks of CSS custom properties (colour, depth), then Tailwind directives, the focus-visible ring, material and press-feedback component classes, the `pageEnter` keyframe, accordion grid transitions, projection-mode type scale, `prefers-reduced-motion` / `-reduced-transparency` / `-contrast` handling, and print styles that force the light palette. |

---

## Subdirectories

| Directory | Contents |
|---|---|
| [`assets/`](assets/README.md) | Team photos and organisation logos |
| [`components/`](components/README.md) | All React components, split into `layout/` and `ui/` |
| [`context/`](context/README.md) | `ProgressContext` — subsection progress, build path, presenter mode. `ThemeContext` — light / dark / system |
| [`data/`](data/README.md) | All workshop content as plain JS export arrays |
| [`hooks/`](hooks/README.md) | Custom React hooks |
| `motion/` | `springs.js` — the shared spring vocabulary. `project.js` — momentum projection and rubber-banding |
| [`pages/`](pages/README.md) | One component per route |
| [`utils/`](utils/README.md) | Shared utilities and data derived from the curriculum |

---

## Entry Point Flow

```
main.jsx
  └── HashRouter
        └── ThemeProvider              ← light / dark / system, syncs html.dark
              └── ProgressProvider
                    └── App
                          └── MotionConfig reducedMotion="user"
                                ├── skip link          ← visible on focus only
                                ├── ScrollToTop        ← resets scroll on route change
                                ├── Navbar             ← search, theme, presenter, drawer
                                ├── AnimatedRoutes     ← page-enter fade triggered by key
                                │     └── <Routes>    ← all page components
                                ├── Footer
                                └── CommandPalette     ← ⌘K search overlay
```

The theme is applied *before* React mounts, by an inline script in `index.html`. `ThemeProvider` only keeps it in sync afterwards.
