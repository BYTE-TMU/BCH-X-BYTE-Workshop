# src/data/

All workshop content as plain JavaScript export arrays. Pages import directly from here — no content is hardcoded in components.

**To update workshop content, edit these files only.** No component changes are needed for text, prompt, or Q&A updates.

---

## Files

### `curriculum.js`

Exports `sections` — an array of 6 section objects (Section 0 through Section 5).

Each section:
```js
{
  id: 'section-1',
  number: 1,
  title: 'Business Plan & Research',
  duration: '30 Minutes',
  format: 'Live' | 'Pre-recorded',
  description: '...',
  introFrame: '...',   // optional — shown as a Callout before subsections on pre-recorded sections
  subsections: [
    {
      code: '1.1',
      title: '...',
      timing: '5 minutes',
      content: [ /* content blocks */ ],
    }
  ]
}
```

Content block types used in the `content` array:

| `type` | Fields | Rendered as |
|---|---|---|
| `body` | `text` | Paragraph |
| `bullets` | `items[]` | Unordered list |
| `numbered` | `items[]` | Ordered list |
| `prompt` | `label`, `prompt`, `tool`, `warning` | `PromptBox` |
| `teachingPoint` | `text` | `TeachingPoint` |
| `presenterNote` | `text` | `PresenterNote` |
| `callout` | `text`, `variant` | `Callout` |
| `mindset` | `text` | Large red-bordered blockquote |

---

### `tools.js`

Exports `tools` (array) and `toolGroups` (array of group name strings).

Each tool:
```js
{
  id: 'gemini',
  name: 'Gemini',
  group: 'Research & Planning' | 'Implementation' | 'Maintenance',
  path: 'both' | 'technical' | 'nontech',
  free: true | false,
  url: 'https://...',
  step: 'Step 1 — Brainstorm & Validate',
  description: '...',
}
```

Used by: `pages/Tools.jsx`, `pages/Resources.jsx`

---

### `appendix.js`

Exports `appendix` — an array of Q&A category objects.

Each category:
```js
{
  id: 'about-byte',
  category: 'About BYTE',
  questions: [
    { q: '...', a: '...' }
  ]
}
```

Used by: `pages/Appendix.jsx`

---

### `resources.js`

Exports two arrays:

**`checklistSteps`** — the 7-step end-to-end workflow checklist:
```js
{ id: 'step-1', label: 'Brainstorm & Research', description: '...' }
```

**`promptLibrary`** — all prompts from the curriculum grouped by section, for display on the Resources page:
```js
{
  section: 'Section 1 — Business Plan & Research',
  items: [
    { label: '...', prompt: '...', tool: 'gemini' }
  ]
}
```

Used by: `pages/Resources.jsx`
