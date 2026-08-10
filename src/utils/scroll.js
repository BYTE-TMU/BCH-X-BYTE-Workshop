/** Whether the user has asked the system to minimise non-essential motion. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll an element into view, jumping instead of gliding when the user has
 * asked for reduced motion. A smooth scroll is exactly the kind of large,
 * unrequested travel that setting exists to suppress — and CSS
 * `scroll-behavior` does not govern this JS path.
 */
export function scrollIntoViewSafely(el, options = {}) {
  if (!el) return
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    ...options,
  })
}
