# src/components/ui/

Presentational components for rendering specific content block types within section pages and other views. Most are driven purely by props; the few that read context or data are noted below.

---

## Files

### `PromptBox.jsx`

Renders a workshop prompt in a dark code-style box.

Props: `{ label: string, prompt: string, tool?: string, warning?: boolean, why?: string }`

- `bg-code-surface` background, monospace font — code surfaces stay dark in both themes
- Default: purple (`border-t-path-both`) top border
- `warning={true}`: red border + "Do Not Use This Prompt" banner
- Includes `ToolChip` (top-left) and `CopyButton` (top-right) — `CopyButton` only ever copies `prompt`, never `why`
- `why`, when present, renders as a "Why this works" (or "Why this fails" when `warning`) note below the prompt text, in `PromptBox.jsx`

---

### `ToolChip.jsx`

Small colour-coded pill identifying which tool a prompt belongs to.

Props: `{ tool: 'gemini' | 'claude' | 'lovable' | 'cursor' }`

Colours come from the `tool-*` tokens: Gemini → blue, Claude → orange, Lovable → pink, Cursor → purple. They are tuned for a dark ground and do not flip with the theme, because this chip only ever renders inside a prompt box.

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

### `SubsectionTimer.jsx`

Countdown against a subsection's authored `timing`, so a facilitator can see they are running long without a separate stopwatch.

Props: `{ timing: string }` — e.g. `'5 minutes'`

- Play / pause / reset controls
- Purple while comfortable, amber past 80% of the budget, red once negative
- Renders `null` when `timing` has no number in it
- Only mounted when presenter mode is on, or in projection mode

---

### `PathPicker.jsx`

Two-button chooser for the Non-Technical and Technical build paths.

Props: `{ compact?: boolean }`

Reads and writes `selectedPath` on `ProgressContext`. Clicking the already-selected path clears it, which returns the site to showing both paths. Rendered by the `pathPicker` content block in subsection 1.5 and directly on the curriculum overview.

---

### `CommandPalette.jsx`

The ⌘K / Ctrl-K / `/` search overlay, mounted once in `App.jsx`.

Props: `{ open: boolean, onClose: () => void }`

- Queries `utils/searchIndex.js`, groups results as Curriculum / Tools / Resources / FAQ while preserving overall rank
- Arrow keys navigate, Enter opens, Escape closes
- Results carrying an `anchor` scroll to that subsection after navigation

---

### `SectionBadge.jsx`

Pill badge showing a section's duration.

Props: `{ duration: string }`

Pass the derived value from `sectionDuration(section)` rather than a hardcoded string.

---

### `SectionNav.jsx`

Previous / Next navigation rendered at the bottom of every section page.

Props: `{ currentId: string }`

Walks `sectionsForPath(selectedPath)`, so Next from the no-code build section skips the code path entirely for a student who chose no-code. The first section has no Previous; the last section's Next links to `/resources`.

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

Colour-coded path pill.

Props: `{ path: 'both' | 'technical' | 'nontech' }`

Both Paths → purple, Technical → blue, Non-Technical → teal.

---

### `FreeTierBadge.jsx`

Colour-coded badge for a tool's free-tier status, used on both the Tools cards and the Resources table so the two can never disagree.

Props: `{ status: 'free' | 'limited' | 'paid' }`

Reads its labels from `freeTierLabels` in `data/tools.js`. Free → teal, limited → amber, paid → red.

---

### `DiagramBlock.jsx`

Registry of hand-built diagrams rendered with divs and Tailwind rather than an SVG library.

Props: `{ id: string }` — must match a key in the registry (`tool-pipeline`, `brief-comparison`, `two-llm-workflow`, `iteration-loop`, `code-deploy-pipeline`, `feedback-loop`, `sprint-visual`, `path-comparison`).

Note that diagram copy lives inside this component rather than in `data/`, so text changes to a diagram happen here.

---

### `ThemeToggle.jsx`

Cycles the theme `light → dark → system` and shows the current mode as a sun / moon / monitor icon. Reads `ThemeContext`. Rendered twice in `Navbar` — once in the desktop control cluster, once in the mobile one.

Three states rather than two, so "follow my OS" stays reachable without spending a second control on it.
