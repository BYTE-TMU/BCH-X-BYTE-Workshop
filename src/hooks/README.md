# src/hooks/

Custom React hooks shared across components.

---

## Files

### `useCopyToClipboard.js`

Wraps the browser Clipboard API with a timed "copied" confirmation state.

```js
const { copied, copy } = useCopyToClipboard(resetDelay = 2000)
```

| Return | Type | Description |
|---|---|---|
| `copied` | `boolean` | `true` for `resetDelay` ms after a successful copy |
| `copy` | `(text: string) => Promise<void>` | Writes text to clipboard and sets `copied` |

Used by: `components/ui/CopyButton.jsx`

---

### `useScrollReveal.js`

Adds `.reveal-visible` to every `<section>` and `[data-reveal]` element as it scrolls into view, driving the fade-up animation defined in `index.css`. Called once in `App.jsx`.

Print styles override the animation so nothing comes out invisible on paper.

---

### `useScrollSpy.js`

Observes a list of element IDs and returns the ID of whichever is currently in the viewport near the top of the screen.

```js
const activeId = useScrollSpy(ids: string[], offset = 80)
```

| Param | Type | Description |
|---|---|---|
| `ids` | `string[]` | Array of element IDs to observe |
| `offset` | `number` | Pixels from the top to consider "active" (default: 80, matching the navbar height) |

Returns: `string | null` — the ID of the currently visible element, or `null` before any element is in view.

Used by `components/layout/Sidebar.jsx` to highlight the active subsection in the table of contents. **Memoise the `ids` array** before passing it in — a fresh array literal on every render tears down and rebuilds the IntersectionObserver each time.
