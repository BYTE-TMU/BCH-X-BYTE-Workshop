import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'bch_byte_progress'
const SECTIONS = ['section-0', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5']

const defaultProgress = SECTIONS.reduce((acc, id) => ({ ...acc, [id]: false }), {})

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress
    } catch {
      return defaultProgress
    }
  })

  const [presenterMode, setPresenterMode] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markComplete = (sectionId) =>
    setProgress((p) => ({ ...p, [sectionId]: true }))

  const markIncomplete = (sectionId) =>
    setProgress((p) => ({ ...p, [sectionId]: false }))

  const resetProgress = () => setProgress(defaultProgress)

  const completedCount = Object.values(progress).filter(Boolean).length
  const percentComplete = Math.round((completedCount / SECTIONS.length) * 100)

  return (
    <ProgressContext.Provider
      value={{
        progress,
        presenterMode,
        setPresenterMode,
        markComplete,
        markIncomplete,
        resetProgress,
        completedCount,
        percentComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
