import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Eye, EyeOff, ChevronDown, Search } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sections } from '../../data/curriculum'
import { isOffPath } from '../../utils/curriculumHelpers'
import { useScrolled } from '../../hooks/useScrolled'
import { ui, sheet } from '../../motion/springs'
import { project } from '../../motion/project'
import ThemeToggle from '../ui/ThemeToggle'
import { cn } from '../../utils/cn'

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [curriculumOpen, setCurriculumOpen] = useState(false)
  const { completedCount, totalCount, presenterMode, setPresenterMode, selectedPath } = useProgress()
  const location = useLocation()
  const scrolled = useScrolled()
  const dropdownRef = useRef(null)

  const isCurriculumPage = location.pathname.startsWith('/curriculum')

  // The dropdown used to be mouse-only. It now closes on Escape and whenever
  // focus leaves the group, so it is operable and escapable from the keyboard.
  useEffect(() => {
    if (!curriculumOpen) return
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return
      setCurriculumOpen(false)
      dropdownRef.current?.querySelector('button')?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [curriculumOpen])

  const navLinkClass = ({ isActive }) =>
    cn(
      'pressable transition-colors',
      isActive ? 'text-accent font-semibold' : 'text-ink hover:text-accent'
    )

  const progressPill = (
    <span className="text-caption font-semibold bg-surface-sunken text-ink-secondary px-3 py-1 rounded-full">
      {completedCount} / {totalCount} complete
    </span>
  )

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav
      data-scrolled={scrolled}
      className="material-chrome scroll-edge sticky top-0 z-40 print:hidden"
    >
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="pressable flex items-center gap-2 shrink-0">
            <span className="font-bold text-ink text-base tracking-tight">BCH x BYTE Workshop</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-small font-medium">
            {/* Curriculum dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCurriculumOpen(true)}
              onMouseLeave={() => setCurriculumOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setCurriculumOpen(false)
              }}
            >
              <button
                onClick={() => setCurriculumOpen((o) => !o)}
                onFocus={() => setCurriculumOpen(true)}
                aria-haspopup="true"
                aria-expanded={curriculumOpen}
                className={cn(
                  'pressable flex items-center gap-1 transition-colors',
                  isCurriculumPage ? 'text-accent font-semibold' : 'text-ink hover:text-accent'
                )}
              >
                Curriculum
                <motion.span
                  animate={{ rotate: curriculumOpen ? 180 : 0 }}
                  transition={ui}
                  className="inline-flex"
                >
                  <ChevronDown size={14} />
                </motion.span>
              </button>

              <AnimatePresence>
                {curriculumOpen && (
                  <motion.div
                    // Scaling from the trigger rather than from the panel's own
                    // centre keeps the spatial link between button and content.
                    style={{ transformOrigin: 'top left' }}
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={ui}
                    className="material-panel absolute top-full left-0 mt-1 w-64 border border-line rounded-lg shadow-xl py-2 z-50"
                  >
                    <Link
                      to="/curriculum"
                      className="block px-4 py-2 text-small text-ink hover:bg-surface-hover hover:text-accent transition-colors"
                      onClick={() => setCurriculumOpen(false)}
                    >
                      Overview
                    </Link>
                    <div className="border-t border-line my-1" />
                    {sections.map((s) => (
                      <Link
                        key={s.id}
                        to={`/curriculum/${s.id}`}
                        className={cn(
                          'block px-4 py-2 text-small text-ink hover:bg-surface-hover hover:text-accent transition-colors',
                          isOffPath(s, selectedPath) && 'opacity-45'
                        )}
                        onClick={() => setCurriculumOpen(false)}
                      >
                        <span className="text-ink-secondary mr-2">{s.number}.</span>
                        {s.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/tools" className={navLinkClass}>Tools</NavLink>
            <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
            <NavLink to="/appendix" className={navLinkClass}>FAQ</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          {/* Right: search + progress pill + presenter toggle + theme */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="pressable flex items-center gap-2 text-caption text-ink-secondary border border-line rounded-full pl-3 pr-2 py-1.5 hover:border-accent hover:text-ink transition-colors"
              aria-label="Search the workshop"
            >
              <Search size={13} />
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-surface-sunken border border-line rounded px-1.5 py-0.5">⌘K</kbd>
            </button>

            {isCurriculumPage && progressPill}

            <button
              onClick={() => setPresenterMode((m) => !m)}
              aria-label={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              aria-pressed={presenterMode}
              title={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              className={cn(
                'pressable p-2 rounded-lg transition-colors',
                presenterMode
                  ? 'bg-path-bothLight text-path-both'
                  : 'text-ink-secondary hover:text-ink hover:bg-surface-hover'
              )}
            >
              {presenterMode ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onOpenSearch}
              aria-label="Search the workshop"
              className="pressable p-2 rounded-lg text-ink-secondary hover:text-ink"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setPresenterMode((m) => !m)}
              aria-label={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              aria-pressed={presenterMode}
              className={cn(
                'pressable p-2 rounded-lg transition-colors',
                presenterMode ? 'bg-path-bothLight text-path-both' : 'text-ink-secondary'
              )}
            >
              {presenterMode ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="pressable p-2 rounded-lg text-ink"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer. It enters downward and leaves upward along the same
          path, and can be thrown closed — the drag is tracked 1:1 and the
          release velocity is projected forward to decide commit vs. return,
          so a fast short flick closes it where a slow short drag does not. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={sheet}
            className="md:hidden overflow-hidden border-t border-line"
          >
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.4, bottom: 0 }}
              dragDirectionLock
              onDragEnd={(_, info) => {
                const projected = info.offset.y + project(info.velocity.y)
                if (projected < -80) setMobileOpen(false)
              }}
              className="px-4 pb-6 pt-4 cursor-grab active:cursor-grabbing"
            >
              <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-line-strong md:hidden" />
              {isCurriculumPage && <div className="mb-4">{progressPill}</div>}
              <div className="space-y-1 text-small font-medium">
                <Link to="/curriculum" className="pressable-lg block py-2 text-ink hover:text-accent" onClick={closeMobile}>
                  Curriculum Overview
                </Link>
                {sections.map((s) => (
                  <Link
                    key={s.id}
                    to={`/curriculum/${s.id}`}
                    className={cn(
                      'pressable-lg block py-2 pl-4 text-ink-secondary hover:text-accent',
                      isOffPath(s, selectedPath) && 'opacity-45'
                    )}
                    onClick={closeMobile}
                  >
                    {s.number}. {s.title}
                  </Link>
                ))}
                <div className="border-t border-line my-2" />
                <Link to="/tools" className="pressable-lg block py-2 text-ink hover:text-accent" onClick={closeMobile}>Tools</Link>
                <Link to="/resources" className="pressable-lg block py-2 text-ink hover:text-accent" onClick={closeMobile}>Resources</Link>
                <Link to="/appendix" className="pressable-lg block py-2 text-ink hover:text-accent" onClick={closeMobile}>FAQ</Link>
                <Link to="/contact" className="pressable-lg block py-2 text-ink hover:text-accent" onClick={closeMobile}>Contact</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
