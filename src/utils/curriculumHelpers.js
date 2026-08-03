import { sections } from '../data/curriculum'

/** Subsection `code` values ("0.1", "2.3") are unique across the curriculum and are
 *  already used as DOM anchor ids, so they double as stable progress keys. */
export const subsectionId = (sub) => sub.code

/** Live subsections only. Take-home extension material never counts toward progress
 *  or the run-of-show clock. */
export const liveSubsections = (section) =>
  section.subsections.filter((sub) => !sub.extension)

export const extensionSubsections = (section) =>
  section.subsections.filter((sub) => sub.extension)

/** Sections a student on `path` actually works through. With no path chosen yet,
 *  everything is relevant. */
export function sectionsForPath(path) {
  if (!path) return sections
  return sections.filter((s) => s.path === 'both' || s.path === path)
}

/** True when a section belongs to the build path the student did NOT pick. */
export function isOffPath(section, path) {
  return Boolean(path) && section.path !== 'both' && section.path !== path
}

/** Parses the human timings already in the data ("2 minutes", "12 minutes"). */
export function parseMinutes(timing) {
  const match = /(\d+)/.exec(timing ?? '')
  return match ? Number(match[1]) : 0
}

/** Minutes of live content in a section. */
export function sectionMinutes(section) {
  return liveSubsections(section).reduce((total, sub) => total + parseMinutes(sub.timing), 0)
}

/** Display label for a section's length. Derived from the subsection timings rather
 *  than stored, because the two used to drift (Section 1 read "30 Minutes" while its
 *  steps summed to 32). */
export function sectionDuration(section) {
  return `${sectionMinutes(section)} Minutes`
}

/** Total live minutes across a path. Both paths should land on the same number. */
export function totalMinutes(path) {
  return sectionsForPath(path).reduce((total, s) => total + sectionMinutes(s), 0)
}

export function getSection(sectionId) {
  return sections.find((s) => s.id === sectionId)
}

export function findSubsection(code) {
  for (const section of sections) {
    const sub = section.subsections.find((s) => s.code === code)
    if (sub) return { section, sub }
  }
  return null
}
