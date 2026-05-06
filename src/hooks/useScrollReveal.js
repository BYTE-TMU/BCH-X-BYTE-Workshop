import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Give React one frame to finish rendering the new page
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('section, [data-reveal]').forEach((el) => {
        el.classList.add('reveal')
        observer.observe(el)
      })
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.remove('reveal', 'reveal-visible')
      })
    }
  }, [pathname])
}
