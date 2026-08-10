import { useEffect, useState } from 'react'

/**
 * Whether the page has scrolled past `threshold`.
 *
 * Floating chrome should only grow an edge once content is actually beneath it
 * — a divider drawn against blank space is decoration, not information.
 */
export function useScrolled(threshold = 4) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
