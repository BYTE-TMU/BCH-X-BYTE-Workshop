# src/context/

React Context providers for global state shared across the component tree.

---

## Files

### `ProgressContext.jsx`

The only global context in the app. Manages four pieces of state, all persisted to `localStorage`.

#### Subsection progress

Tracks completion per **subsection**, not per section. Stored under `bch_byte_progress_v2`, keyed by subsection `code`:

```js
{
  "0.1": true,
  "0.2": true,
  "1.1": false,
}
```

A section counts as complete when every one of its **live** subsections is done. Take-home subsections (`extension: true`) never count.

**Migration:** progress used to be one boolean per section under `bch_byte_progress`. On first load, if the new key is absent and the old one exists, every subsection of a previously-completed section is marked complete. The old key is left in place and simply ignored afterwards.

#### Selected build path

`'nontech'`, `'technical'`, or `null`. Stored under `bch_byte_path`. Set by `PathPicker` in subsection 1.5 or on the curriculum overview. Drives which sections are dimmed, where the Next button goes, and the progress denominator.

#### Presenter mode

Boolean, stored under `bch_byte_presenter`. Controls whether `PresenterNote` blocks and subsection timers are visible. **It persists across refreshes** so a facilitator does not lose it mid-session, and `?presenter=1` on any section URL switches it on.

#### Last viewed section

Stored under `bch_byte_last_viewed`, used to build the "Resume where you left off" links on the home and curriculum pages.

---

## Exported API

```js
const {
  progress,            // { [subsectionCode]: boolean }
  isSectionComplete,   // (sectionId: string) => boolean
  setSectionComplete,  // (sectionId: string, done: boolean) => void
  toggleSubsection,    // (code: string) => void
  setSubsection,       // (code: string, done: boolean) => void
  resetProgress,       // () => void

  selectedPath,        // 'nontech' | 'technical' | null
  setSelectedPath,     // (path) => void

  presenterMode,       // boolean
  setPresenterMode,    // (boolean | (prev) => boolean) => void

  lastViewed,          // sectionId | null
  setLastViewed,       // (sectionId) => void

  relevantSections,    // sections on the selected path
  completedCount,      // number
  totalCount,          // number — relevantSections.length
  percentComplete,     // number 0–100, reaches 100
} = useProgress()
```

`completedCount` and `totalCount` are always counted against the same set of sections, so the progress display can actually reach 100%. An earlier version hardcoded six section ids against five sections of data and capped at 83%.

---

## Usage

Wrap the app in `ProgressProvider` (done in `main.jsx`):

```jsx
<ProgressProvider>
  <App />
</ProgressProvider>
```

Read in any component:

```jsx
import { useProgress } from '../context/ProgressContext'

const { progress, toggleSubsection } = useProgress()
```

`useProgress()` throws if called outside of `ProgressProvider`.
