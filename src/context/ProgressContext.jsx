import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { sections } from '../data/curriculum'
import {
  liveSubsections,
  sectionsForPath,
  subsectionId,
} from '../utils/curriculumHelpers'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'bch_byte_progress_v2'
const LEGACY_STORAGE_KEY = 'bch_byte_progress'
const PATH_KEY = 'bch_byte_path'
const PRESENTER_KEY = 'bch_byte_presenter'
const LAST_VIEWED_KEY = 'bch_byte_last_viewed'

const readJSON = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

/**
 * Progress used to be stored one boolean per section. It is now one boolean per
 * subsection, so returning attendees get their old progress promoted: a section
 * that was marked complete marks all of its subsections complete.
 */
function loadProgress() {
  const current = readJSON(STORAGE_KEY, null)
  if (current) return current

  const legacy = readJSON(LEGACY_STORAGE_KEY, null)
  if (!legacy) return {}

  const migrated = {}
  for (const section of sections) {
    if (!legacy[section.id]) continue
    for (const sub of section.subsections) migrated[subsectionId(sub)] = true
  }
  return migrated
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)
  const [selectedPath, setSelectedPathState] = useState(() => readJSON(PATH_KEY, null))
  const [presenterMode, setPresenterModeState] = useState(() => readJSON(PRESENTER_KEY, false))
  const [lastViewed, setLastViewed] = useState(() => readJSON(LAST_VIEWED_KEY, null))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem(PATH_KEY, JSON.stringify(selectedPath))
  }, [selectedPath])

  useEffect(() => {
    localStorage.setItem(PRESENTER_KEY, JSON.stringify(presenterMode))
  }, [presenterMode])

  useEffect(() => {
    localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(lastViewed))
  }, [lastViewed])

  const toggleSubsection = useCallback((code) => {
    setProgress((p) => ({ ...p, [code]: !p[code] }))
  }, [])

  const setSubsection = useCallback((code, done) => {
    setProgress((p) => ({ ...p, [code]: done }))
  }, [])

  /** A section counts as complete when every one of its live subsections is done. */
  const isSectionComplete = useCallback(
    (sectionId) => {
      const section = sections.find((s) => s.id === sectionId)
      if (!section) return false
      const subs = liveSubsections(section)
      return subs.length > 0 && subs.every((sub) => progress[subsectionId(sub)])
    },
    [progress]
  )

  const setSectionComplete = useCallback((sectionId, done) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return
    setProgress((p) => {
      const next = { ...p }
      for (const sub of liveSubsections(section)) next[subsectionId(sub)] = done
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress({})
    setLastViewed(null)
  }, [])

  const setSelectedPath = useCallback((path) => setSelectedPathState(path), [])
  const setPresenterMode = useCallback(
    (value) => setPresenterModeState((current) => (typeof value === 'function' ? value(current) : value)),
    []
  )

  /** Counts run against the sections on the student's chosen path, so picking
   *  Non-Technical means Section 3 no longer holds progress at 80%. */
  const { relevantSections, completedCount, totalCount, percentComplete } = useMemo(() => {
    const relevant = sectionsForPath(selectedPath)
    const completed = relevant.filter((s) => {
      const subs = liveSubsections(s)
      return subs.length > 0 && subs.every((sub) => progress[subsectionId(sub)])
    }).length
    return {
      relevantSections: relevant,
      completedCount: completed,
      totalCount: relevant.length,
      percentComplete: relevant.length ? Math.round((completed / relevant.length) * 100) : 0,
    }
  }, [progress, selectedPath])

  const value = useMemo(
    () => ({
      progress,
      isSectionComplete,
      setSectionComplete,
      toggleSubsection,
      setSubsection,
      resetProgress,
      selectedPath,
      setSelectedPath,
      presenterMode,
      setPresenterMode,
      lastViewed,
      setLastViewed,
      relevantSections,
      completedCount,
      totalCount,
      percentComplete,
    }),
    [
      progress,
      isSectionComplete,
      setSectionComplete,
      toggleSubsection,
      setSubsection,
      resetProgress,
      selectedPath,
      setSelectedPath,
      presenterMode,
      setPresenterMode,
      lastViewed,
      relevantSections,
      completedCount,
      totalCount,
      percentComplete,
    ]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
