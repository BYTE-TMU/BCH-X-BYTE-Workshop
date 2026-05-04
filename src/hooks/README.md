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

### `useScrollSpy.js`

Observes a list of element IDs and returns the ID of whichever is currently in the viewport near the top of the screen. Used to highlight the active subsection in a sidebar or table of contents.

```js
const activeId = useScrollSpy(ids: string[], offset = 80)
```

| Param | Type | Description |
|---|---|---|
| `ids` | `string[]` | Array of element IDs to observe |
| `offset` | `number` | Pixels from the top to consider "active" (default: 80, matching the navbar height) |

Returns: `string | null` — the ID of the currently visible element, or `null` before any element is in view.

**Note:** Not currently wired into the sidebar — available for use if per-subsection highlighting is added.
