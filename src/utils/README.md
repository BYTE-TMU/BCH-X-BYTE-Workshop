# src/utils/

Shared utility functions and data derived from the curriculum. No React dependencies.

---

## Files

### `cn.js`

Merges Tailwind class strings, filtering out falsy values.

```js
import { cn } from '../utils/cn'

cn('px-4 py-2', isActive && 'bg-brand-red', undefined)
// → 'px-4 py-2 bg-brand-red'
```

A lightweight alternative to `clsx` or `classnames` — no dependency needed at this scale.

---

### `curriculumHelpers.js`

Everything that can be computed from `data/curriculum.js` rather than stored alongside it. Import from here instead of re-deriving in a component.

| Function | Returns |
|---|---|
| `subsectionId(sub)` | The stable progress key for a subsection (its `code`) |
| `liveSubsections(section)` | Subsections delivered live — excludes `extension: true` |
| `extensionSubsections(section)` | Take-home subsections only |
| `sectionsForPath(path)` | Sections a student on `path` works through; all of them when `path` is null |
| `isOffPath(section, path)` | `true` when a section belongs to the build path the student did not pick |
| `parseMinutes(timing)` | `12` from `'12 minutes'` |
| `sectionMinutes(section)` | Live minutes in a section |
| `sectionDuration(section)` | Display label, e.g. `'32 Minutes'` — summed, never stored |
| `totalMinutes(path)` | Live minutes across a path |
| `getSection(id)` / `findSubsection(code)` | Lookups |

---

### `collectPrompts.js`

Walks `sections` and collects every `type: 'prompt'` block, grouped by section, for the Resources page prompt library. Warning prompts (the deliberately bad examples) are excluded by default, since the library exists to be copied from.

```js
import { promptLibrary } from '../utils/collectPrompts'
```

This replaced a hand-maintained duplicate of every prompt in `data/resources.js`, which had already drifted out of sync with the curriculum wording.

---

### `searchIndex.js`

Builds the flat corpus behind the ⌘K command palette from the curriculum, tools, FAQ, and checklist.

```js
import { searchContent, excerpt } from '../utils/searchIndex'

searchContent('credits')      // → ranked entries, max 12
excerpt(entry, 'credits')     // → a window of body text around the match
```

Entries carry `{ group, title, subtitle, body, to, anchor? }`. Ranking favours title matches over body matches, and requires every search term to match somewhere. Deliberately dependency-free: the corpus is a few hundred short records.

When you add a new content type to `data/`, add it to `buildIndex()` here or it will not be searchable.
