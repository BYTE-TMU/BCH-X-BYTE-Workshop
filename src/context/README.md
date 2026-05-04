# src/context/

React Context providers for global state shared across the component tree.

---

## Files

### `ProgressContext.jsx`

The only global context in the app. Manages two independent pieces of state:

#### Section completion (persisted)

Tracks which of the 6 curriculum sections a user has marked complete. Stored in `localStorage` under the key `bch_byte_progress`.

Shape:
```js
{
  "section-0": false,
  "section-1": false,
  "section-2": false,
  "section-3": false,
  "section-4": false,
  "section-5": false,
}
```

#### Presenter mode (session only)

Boolean toggle that controls whether `PresenterNote` components are visible. Resets on page refresh — intentional, so presenter notes are hidden by default for attendees.

---

## Exported API

```js
const {
  progress,           // { [sectionId]: boolean }
  presenterMode,      // boolean
  setPresenterMode,   // (boolean) => void
  markComplete,       // (sectionId: string) => void
  markIncomplete,     // (sectionId: string) => void
  resetProgress,      // () => void
  completedCount,     // number  0–6
  percentComplete,    // number  0–100
} = useProgress()
```

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

const { progress, markComplete } = useProgress()
```

`useProgress()` throws if called outside of `ProgressProvider`.
