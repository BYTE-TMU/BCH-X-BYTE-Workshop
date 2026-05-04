# src/components/ui/

Presentational components for rendering specific content block types within section pages and other views. All are driven by props.

---

## Files

### `PromptBox.jsx`

Renders a workshop prompt in a dark code-style box.

Props: `{ label: string, prompt: string, tool?: string, warning?: boolean }`

- `bg-zinc-900` background, monospace font
- Default: purple (`border-t-path-both`) top border
- `warning={true}`: red border + "Do Not Use This Prompt" banner
- Includes `ToolChip` (top-left) and `CopyButton` (top-right)

---

### `ToolChip.jsx`

Small colour-coded pill identifying which tool a prompt belongs to.

Props: `{ tool: 'gemini' | 'claude' | 'lovable' | 'cursor' }`

Colours: Gemini → blue, Claude → orange, Lovable → pink, Cursor → purple.

---

### `CopyButton.jsx`

Copy-to-clipboard button with a 2-second "Copied!" confirmation state.

Props: `{ text: string, className?: string }`

Uses `useCopyToClipboard` hook. Announces state change via `aria-live="polite"`.

---

### `TeachingPoint.jsx`

Highlighted callout for key learning moments.

Props: `{ text: string }`

Teal left border (`border-path-nontech`), teal-tinted background, "KEY TEACHING POINT" label in small caps.

---

### `PresenterNote.jsx`

Highlighted note visible only when presenter mode is active.

Props: `{ text: string }`

Reads `presenterMode` from `ProgressContext`. Returns `null` (not `display:none`) when off, so it takes up no space. Purple left border, italic text, "PRESENTER NOTE" label.

---

### `SectionBadge.jsx`

Two pill badges showing a section's duration and format.

Props: `{ duration: string, format: 'Live' | 'Pre-recorded' }`

- Duration: gray pill
- Live: red pill (`format-live` colours)
- Pre-recorded: blue pill (`format-recorded` colours)

---

### `SectionNav.jsx`

Previous / Next navigation rendered at the bottom of every section page.

Props: `{ currentId: string }`

Derives prev/next from `data/curriculum.js` by finding the current section index. Section 0 has no Previous button. Section 5's Next button links to `/tools` instead of another section.

---

### `ProgressBar.jsx`

Horizontal progress bar.

Props: `{ percent: number, className?: string }`

Fills `brand-red` from left to right. Includes `role="progressbar"` and `aria-valuenow/min/max` for accessibility.

---

### `Callout.jsx`

General-purpose callout block with three variants.

Props: `{ variant: 'info' | 'warning' | 'tip', children: ReactNode }`

- `info` — blue tint, Info icon
- `warning` — amber tint, AlertTriangle icon
- `tip` — teal tint, Lightbulb icon

---

### `EntityPill.jsx`

Colour-coded path pill used on the Tools page cards.

Props: `{ path: 'both' | 'technical' | 'nontech' }`

- Both Paths → purple
- Technical → blue
- Non-Technical → teal
