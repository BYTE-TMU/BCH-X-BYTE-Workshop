import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Search, CornerDownLeft, X } from 'lucide-react'
import { searchContent, excerpt } from '../../utils/searchIndex'
import { scrollIntoViewSafely } from '../../utils/scroll'
import { ui } from '../../motion/springs'
import { cn } from '../../utils/cn'

const groupOrder = ['Curriculum', 'Tools', 'Resources', 'FAQ']

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const panelRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchContent(query), [query])

  // Reset and focus each time the palette opens, and hand focus back to
  // whatever opened it on close — otherwise a keyboard user is dropped at the
  // top of the document every time they dismiss the dialog.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement
    setQuery('')
    setActiveIndex(0)
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(id)
      if (restoreFocusRef.current instanceof HTMLElement) restoreFocusRef.current.focus()
    }
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  // Keep the highlighted result in view while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  // A modal dialog has to contain Tab, or focus walks the page behind it while
  // that page is visually inert. Escape is handled here rather than only on the
  // input, because once the user tabs into the results the input no longer sees
  // the keystroke and the dialog becomes impossible to dismiss from the keyboard.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const go = (entry) => {
    if (!entry) return
    onClose()
    navigate(entry.to)
    if (entry.anchor) {
      // Wait for the destination page to render before jumping to the subsection.
      setTimeout(() => scrollIntoViewSafely(document.getElementById(entry.anchor)), 120)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[activeIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  // Preserve overall rank while still showing results under group headings.
  const grouped = groupOrder
    .map((group) => ({ group, items: results.filter((r) => r.group === group) }))
    .filter((g) => g.items.length > 0)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="material-scrim fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={panelRef}
            // Blur and scale resolve together, so the panel reads as a piece of
            // glass arriving rather than an opaque card cross-fading in.
            initial={{ opacity: 0, scale: 0.97, y: -8, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: 'blur(8px)' }}
            transition={ui}
            style={{ transformOrigin: 'top center' }}
            className="material-panel w-full max-w-xl rounded-2xl border border-line shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search the workshop"
          >
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search size={16} className="text-ink-secondary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, prompts, tools, FAQ…"
                className="flex-1 py-4 text-small bg-transparent text-ink placeholder:text-ink-secondary"
                aria-label="Search query"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="pressable p-1 rounded-md text-ink-secondary hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto">
              {query && results.length === 0 && (
                <p className="px-5 py-8 text-small text-ink-secondary text-center">
                  Nothing matches “{query}”.
                </p>
              )}

              {!query && (
                <p className="px-5 py-8 text-small text-ink-secondary text-center">
                  Search the whole workshop: try “credits”, “deploy”, or “recruiter”.
                </p>
              )}

              {grouped.map(({ group, items }) => (
                <div key={group}>
                  <p className="px-5 pt-4 pb-1 text-eyebrow uppercase text-ink-secondary">
                    {group}
                  </p>
                  {items.map((entry) => {
                    const index = results.indexOf(entry)
                    const active = index === activeIndex
                    return (
                      <button
                        key={entry.id}
                        data-active={active}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => go(entry)}
                        className={cn(
                          'w-full text-left px-5 py-2.5 flex items-start gap-3 transition-colors',
                          active ? 'bg-accent-subtle' : 'hover:bg-surface-hover'
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              'text-small font-medium truncate',
                              active ? 'text-accent' : 'text-ink'
                            )}
                          >
                            {entry.title}
                          </p>
                          <p className="text-caption text-ink-secondary truncate">{entry.subtitle}</p>
                          {query && (
                            <p className="text-caption text-ink-secondary mt-1 line-clamp-2 leading-relaxed">
                              {excerpt(entry, query)}
                            </p>
                          )}
                        </div>
                        {active && (
                          <CornerDownLeft size={13} className="text-accent shrink-0 mt-1" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 px-5 py-2.5 border-t border-line bg-surface-sunken text-caption text-ink-secondary">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> open</span>
              <span><kbd className="font-mono">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
