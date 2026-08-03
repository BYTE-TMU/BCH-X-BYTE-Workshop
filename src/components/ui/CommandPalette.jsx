import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CornerDownLeft, X } from 'lucide-react'
import { searchContent, excerpt } from '../../utils/searchIndex'
import { cn } from '../../utils/cn'

const groupOrder = ['Curriculum', 'Tools', 'Resources', 'FAQ']

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchContent(query), [query])

  // Reset and focus each time the palette opens.
  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  // Keep the highlighted result in view while arrowing through a long list.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const go = (entry) => {
    if (!entry) return
    onClose()
    navigate(entry.to)
    if (entry.anchor) {
      // Wait for the destination page to render before jumping to the subsection.
      setTimeout(() => {
        document.getElementById(entry.anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
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

  if (!open) return null

  // Preserve overall rank while still showing results under group headings.
  const grouped = groupOrder
    .map((group) => ({ group, items: results.filter((r) => r.group === group) }))
    .filter((g) => g.items.length > 0)

  return (
    <div
      className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-brand-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search the workshop"
      >
        <div className="flex items-center gap-3 px-4 border-b border-brand-border">
          <Search size={16} className="text-brand-gray shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search sections, prompts, tools, FAQ…"
            className="flex-1 py-4 text-sm bg-transparent focus:outline-none text-brand-black placeholder:text-brand-gray"
            aria-label="Search query"
          />
          <button onClick={onClose} aria-label="Close search" className="p-1 text-brand-gray hover:text-brand-black">
            <X size={16} />
          </button>
        </div>

        <div ref={listRef} className="max-h-[55vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="px-5 py-8 text-sm text-brand-gray text-center">
              Nothing matches “{query}”.
            </p>
          )}

          {!query && (
            <p className="px-5 py-8 text-sm text-brand-gray text-center">
              Search the whole workshop: try “credits”, “deploy”, or “recruiter”.
            </p>
          )}

          {grouped.map(({ group, items }) => (
            <div key={group}>
              <p className="px-5 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-brand-gray">
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
                      active ? 'bg-brand-redLight' : 'hover:bg-brand-grayLight'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className={cn('text-sm font-medium truncate', active ? 'text-brand-red' : 'text-brand-black')}>
                        {entry.title}
                      </p>
                      <p className="text-xs text-brand-gray truncate">{entry.subtitle}</p>
                      {query && (
                        <p className="text-xs text-brand-gray mt-1 line-clamp-2 leading-relaxed">
                          {excerpt(entry, query)}
                        </p>
                      )}
                    </div>
                    {active && <CornerDownLeft size={13} className="text-brand-red shrink-0 mt-1" />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 px-5 py-2.5 border-t border-brand-border bg-brand-grayLight text-[11px] text-brand-gray">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> open</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
