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

Print styles override the animation so nothing comes out invisible on paper. Under `prefers-reduced-motion` the rise is dropped and only the opacity fade remains — reduced motion means a gentler equivalent, not no feedback at all.

---

### `useScrolled.js`

```js
const scrolled = useScrolled(threshold = 4)
```

Whether the page has scrolled past `threshold` pixels. Used by `Navbar` to drive `data-scrolled`, which fades in the hairline and gradient under the translucent bar. A divider drawn against blank space is decoration; one that appears when content passes under the bar is information.

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
