import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const ThemeContext = createContext(null)

const THEME_KEY = 'bch_byte_theme'
const MODES = ['light', 'dark', 'system']

const readMode = () => {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return MODES.includes(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

/**
 * Three states, not two: an explicit light or dark choice, or "system", which
 * keeps following the OS. The inline script in index.html applies the same
 * resolution before first paint — this provider only has to keep it in sync.
 */
export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(readMode)
  const [systemDark, setSystemDark] = useState(systemPrefersDark)

  // Only meaningful while mode is 'system', but the listener is cheap and
  // unconditional avoids a subscribe/unsubscribe churn on every toggle.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const isDark = mode === 'dark' || (mode === 'system' && systemDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const setMode = useCallback((next) => {
    setModeState(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* private mode — the theme still applies for this session */
    }
  }, [])

  // Cycling keeps the OS-following option reachable without spending a second
  // control on it. Leaving 'system' goes to the *opposite* of what the system
  // currently resolves to: a fixed light → dark → system order means that on a
  // light machine the very first click moves system → light and nothing visibly
  // happens, which reads as a broken button.
  // On a light machine that is system → dark → light → system; on a dark one,
  // system → light → dark → system. Only the final step back to 'system' can
  // look unchanged, and there the icon still moves.
  const cycleMode = useCallback(() => {
    const awayFromSystem = systemDark ? 'light' : 'dark'
    const theOtherOne = systemDark ? 'dark' : 'light'
    if (mode === 'system') return setMode(awayFromSystem)
    if (mode === awayFromSystem) return setMode(theOtherOne)
    return setMode('system')
  }, [mode, systemDark, setMode])

  const value = useMemo(
    () => ({ mode, isDark, setMode, cycleMode }),
    [mode, isDark, setMode, cycleMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
