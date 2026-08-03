import { sections } from '../data/curriculum'

/**
 * Walks the curriculum and collects every prompt block, grouped by section.
 *
 * The prompt library on the Resources page used to be a hand-maintained copy of
 * these same prompts, which drifted out of sync with the curriculum. Deriving it
 * here means a prompt is written once, in curriculum.js, and can never diverge.
 *
 * Warning prompts (the deliberately bad examples) are excluded — the library is a
 * copy-and-paste resource, so it should only contain prompts you actually want used.
 */
export function collectPrompts({ includeWarnings = false } = {}) {
  return sections
    .map((section) => {
      const items = section.subsections.flatMap((sub) =>
        sub.content
          .filter((block) => block.type === 'prompt' && (includeWarnings || !block.warning))
          .map((block) => ({
            label: block.label,
            prompt: block.prompt,
            tool: block.tool,
            warning: block.warning,
            sectionId: section.id,
            subsectionCode: sub.code,
          }))
      )
      return {
        sectionId: section.id,
        section: `Section ${section.number}: ${section.title}`,
        items,
      }
    })
    .filter((group) => group.items.length > 0)
}

export const promptLibrary = collectPrompts()
