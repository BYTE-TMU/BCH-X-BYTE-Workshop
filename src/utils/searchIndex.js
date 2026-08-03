import { sections } from '../data/curriculum'
import { tools } from '../data/tools'
import { appendix } from '../data/appendix'
import { checklistSteps } from '../data/resources'
import { sectionDuration } from './curriculumHelpers'

/**
 * Flattens every piece of content on the site into one searchable list.
 * Deliberately dependency-free: the corpus is a few hundred short records, so a
 * scored substring match is faster than shipping a search library to do the same job.
 */

/** Pulls the human-readable text out of a curriculum content block. */
function blockText(block) {
  switch (block.type) {
    case 'body':
    case 'teachingPoint':
    case 'presenterNote':
    case 'callout':
    case 'mindset':
      return block.text ?? ''
    case 'bullets':
    case 'numbered':
      return (block.items ?? []).join(' ')
    case 'prompt':
      return `${block.label ?? ''} ${block.prompt ?? ''}`
    default:
      return ''
  }
}

function buildIndex() {
  const entries = []

  for (const section of sections) {
    entries.push({
      id: `section:${section.id}`,
      group: 'Curriculum',
      title: `Section ${section.number}: ${section.title}`,
      subtitle: sectionDuration(section),
      body: section.description,
      to: `/curriculum/${section.id}`,
    })

    for (const sub of section.subsections) {
      entries.push({
        id: `sub:${sub.code}`,
        group: 'Curriculum',
        title: `${sub.code} ${sub.title}`,
        subtitle: `Section ${section.number}${sub.extension ? ' · Take-home' : ''}`,
        body: sub.content.map(blockText).join(' '),
        to: `/curriculum/${section.id}`,
        anchor: sub.code,
      })
    }
  }

  for (const tool of tools) {
    entries.push({
      id: `tool:${tool.id}`,
      group: 'Tools',
      title: tool.name,
      subtitle: tool.step,
      body: `${tool.description} ${tool.freeTier.detail}`,
      to: '/tools',
    })
  }

  for (const category of appendix) {
    for (const item of category.questions) {
      entries.push({
        id: `faq:${category.id}:${item.q.slice(0, 24)}`,
        group: 'FAQ',
        title: item.q,
        subtitle: category.category,
        body: item.a,
        to: '/appendix',
      })
    }
  }

  for (const step of checklistSteps) {
    entries.push({
      id: `checklist:${step.id}`,
      group: 'Resources',
      title: step.label,
      subtitle: 'Quick start checklist',
      body: step.description,
      to: '/resources',
    })
  }

  return entries.map((entry) => ({
    ...entry,
    haystack: `${entry.title} ${entry.subtitle ?? ''} ${entry.body ?? ''}`.toLowerCase(),
    titleLower: entry.title.toLowerCase(),
  }))
}

export const searchEntries = buildIndex()

/**
 * Ranks entries by where the query matches: a title hit beats a body hit, and an
 * entry matching every term beats one matching only some.
 */
export function searchContent(query, limit = 12) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const results = []
  for (const entry of searchEntries) {
    let score = 0
    let matchedAll = true

    for (const term of terms) {
      if (entry.titleLower.includes(term)) {
        score += entry.titleLower.startsWith(term) ? 12 : 8
      } else if (entry.haystack.includes(term)) {
        score += 3
      } else {
        matchedAll = false
        break
      }
    }

    if (matchedAll) results.push({ entry, score })
  }

  return results
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((r) => r.entry)
}

/** Pulls a short window of body text around the first match, for result previews. */
export function excerpt(entry, query, length = 120) {
  const body = entry.body ?? ''
  const term = query.toLowerCase().split(/\s+/).filter(Boolean)[0]
  const at = term ? body.toLowerCase().indexOf(term) : -1
  if (at < 0) return body.slice(0, length) + (body.length > length ? '…' : '')

  const start = Math.max(0, at - 40)
  const end = Math.min(body.length, start + length)
  return `${start > 0 ? '…' : ''}${body.slice(start, end)}${end < body.length ? '…' : ''}`
}
