# src/data/

All workshop content as plain JavaScript export arrays. Pages import directly from here — no workshop content is hardcoded in components.

**To update workshop content, edit these files only.** No component changes are needed for text, prompt, or Q&A updates.

> Anything that can be derived from `curriculum.js` is derived, not stored: section count, section durations, and the prompt library all come from it via [`src/utils/`](../utils/README.md). Duplicating them is how the app previously ended up claiming six sections while the data had five.

---

## Files

### `curriculum.js`

Exports `sections` — an array of 5 section objects (Section 0 through Section 4).

Each section:
```js
{
  id: 'section-1',
  number: 1,
  title: 'Business Plan & Research',
  path: 'both' | 'nontech' | 'technical',
  description: '...',
  introFrame: '...',   // optional — shown as a Callout before subsections
  subsections: [
    {
      code: '1.1',          // unique across the whole curriculum; also the DOM anchor id
                            // and the progress key
      title: '...',
      timing: '5 minutes',  // drives the presenter timer and the run-of-show clock
      extension: true,      // optional — take-home material, see below
      content: [ /* content blocks */ ],
    }
  ]
}
```

There is no `duration` field. A section's displayed length is summed from its subsection `timing` values by `sectionDuration()` in `utils/curriculumHelpers.js`, so the two can never disagree.

**`path`** decides who a section is for. Students pick a build path in 1.5; sections belonging to the other path are dimmed throughout the UI, skipped by the Next button, and excluded from the progress denominator.

**`extension: true`** marks a subsection as take-home material. It renders inside a collapsed "Go deeper" disclosure on the section page, and is excluded from progress counts and the run-of-show clock. Use it to add depth without eating into the 90-minute live budget.

Content block types used in the `content` array:

| `type` | Fields | Rendered as |
|---|---|---|
| `body` | `text` | Paragraph |
| `bullets` | `items[]` | Unordered list |
| `numbered` | `items[]` | Ordered list |
| `prompt` | `label`, `prompt`, `tool`, `warning`, `why` | `PromptBox` |
| `teachingPoint` | `text` | `TeachingPoint` |
| `presenterNote` | `text` | `PresenterNote` (presenter mode only) |
| `callout` | `text`, `variant` | `Callout` — `info`, `warning`, or `tip` |
| `mindset` | `text` | Large red-bordered blockquote |
| `diagram` | `id` | `DiagramBlock` — id must exist in its registry |
| `pathPicker` | — | `PathPicker` — the two-button build-path chooser |

---

### `tools.js`

Exports `tools`, `toolGroups`, `freeTierLabels`, `getToolById()`, and `FREE_TIER_VERIFIED`.

Each tool:
```js
{
  id: 'lovable',
  name: 'Lovable',
  group: 'Research & Planning' | 'Implementation' | 'Maintenance',
  path: 'both' | 'technical' | 'nontech',
  url: 'https://...',
  step: 'Non-Technical Path',
  freeTier: {
    status: 'free' | 'limited' | 'paid',
    detail: 'Free plan gives 5 credits per day with a 30 credit monthly cap…',
    fallback: 'replit',   // id of a free alternative, or null
  },
  description: '...',
}
```

**Keeping this current matters more than anything else in this folder.** AI tool pricing changes constantly, and the site makes promises about what students can do for free. When you re-verify the limits, update both the `freeTier` entries and the `FREE_TIER_VERIFIED` constant — that date is displayed on the Tools and Resources pages.

Every tool whose `status` is not `free` should name a `fallback` so no student is blocked.

Used by: `pages/Tools.jsx`, `pages/Resources.jsx`, `utils/searchIndex.js`

---

### `appendix.js`

Exports `appendix` — an array of Q&A category objects.

```js
{
  id: 'about-byte',
  category: 'About BYTE',
  questions: [
    { q: '...', a: '...' }
  ]
}
```

Used by: `pages/Appendix.jsx` (route `/appendix`, linked in the nav as "FAQ")

---

### `resources.js`

Exports **`checklistSteps`** — the end-to-end workflow checklist shown on the Resources page:

```js
{ id: 'step-1', label: 'Brainstorm & Research', description: '...' }
```

It does **not** export a prompt library. Prompts are collected from `curriculum.js` at import time by `utils/collectPrompts.js`, so the library on the Resources page and the prompts in the curriculum are always the same text.

---

### `teamData.js`

Exports `teamMembers` — name, role, email, LinkedIn, and an imported photo for each person on the Contact page.

---

### `orgs.js`

Exports `orgs` — the BCH, BYTE, and collaboration blurbs plus their logos, shown at the top of the Contact page.

---

### `homeContent.js`

Exports `goals` (the four "what you will learn" cards, each with a Lucide icon) and `deliverableFeatures` (the bullet list describing the page students build).
