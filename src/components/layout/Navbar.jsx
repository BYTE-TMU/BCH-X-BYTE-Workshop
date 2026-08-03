import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Eye, EyeOff, ChevronDown, Search } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sections } from '../../data/curriculum'
import { isOffPath } from '../../utils/curriculumHelpers'
import { cn } from '../../utils/cn'

export default function Navbar({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [curriculumOpen, setCurriculumOpen] = useState(false)
  const { completedCount, totalCount, presenterMode, setPresenterMode, selectedPath } = useProgress()
  const location = useLocation()

  const isCurriculumPage = location.pathname.startsWith('/curriculum')

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-brand-red font-semibold'
      : 'text-brand-black hover:text-brand-red transition-colors'

  const progressPill = (
    <span className="text-xs font-semibold bg-brand-grayLight text-brand-gray px-3 py-1 rounded-full">
      {completedCount} / {totalCount} complete
    </span>
  )

  return (
    <nav className="sticky top-0 z-40 bg-brand-white border-b border-brand-border print:hidden">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-brand-black text-base tracking-tight">BCH x BYTE Workshop</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* Curriculum dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setCurriculumOpen(true)}
                onMouseLeave={() => setCurriculumOpen(false)}
                onClick={() => setCurriculumOpen((o) => !o)}
                className={cn(
                  'flex items-center gap-1 transition-colors',
                  isCurriculumPage ? 'text-brand-red font-semibold' : 'text-brand-black hover:text-brand-red'
                )}
              >
                Curriculum <ChevronDown size={14} />
              </button>
              {curriculumOpen && (
                <div
                  onMouseEnter={() => setCurriculumOpen(true)}
                  onMouseLeave={() => setCurriculumOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-brand-border rounded-lg shadow-lg py-2 z-50"
                >
                  <Link
                    to="/curriculum"
                    className="block px-4 py-2 text-sm text-brand-black hover:bg-brand-grayLight hover:text-brand-red transition-colors"
                    onClick={() => setCurriculumOpen(false)}
                  >
                    Overview
                  </Link>
                  <div className="border-t border-brand-border my-1" />
                  {sections.map((s) => (
                    <Link
                      key={s.id}
                      to={`/curriculum/${s.id}`}
                      className={cn(
                        'block px-4 py-2 text-sm text-brand-black hover:bg-brand-grayLight hover:text-brand-red transition-colors',
                        isOffPath(s, selectedPath) && 'opacity-45'
                      )}
                      onClick={() => setCurriculumOpen(false)}
                    >
                      <span className="text-brand-gray mr-2">{s.number}.</span>
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/tools" className={navLinkClass}>Tools</NavLink>
            <NavLink to="/resources" className={navLinkClass}>Resources</NavLink>
            <NavLink to="/appendix" className={navLinkClass}>FAQ</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          {/* Right: search + progress pill + presenter toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs text-brand-gray border border-brand-border rounded-full pl-3 pr-2 py-1.5 hover:border-brand-red hover:text-brand-black transition-colors"
              aria-label="Search the workshop"
            >
              <Search size={13} />
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-brand-grayLight border border-brand-border rounded px-1.5 py-0.5">⌘K</kbd>
            </button>

            {isCurriculumPage && progressPill}

            <button
              onClick={() => setPresenterMode((m) => !m)}
              aria-label={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              title={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              className={cn(
                'p-2 rounded-lg transition-colors',
                presenterMode
                  ? 'bg-path-bothLight text-path-both'
                  : 'text-brand-gray hover:text-brand-black hover:bg-brand-grayLight'
              )}
            >
              {presenterMode ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onOpenSearch}
              aria-label="Search the workshop"
              className="p-2 text-brand-gray hover:text-brand-black"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setPresenterMode((m) => !m)}
              aria-label={presenterMode ? 'Hide presenter notes' : 'Show presenter notes'}
              className={cn(
                'p-2 rounded-lg transition-colors',
                presenterMode ? 'bg-path-bothLight text-path-both' : 'text-brand-gray'
              )}
            >
              {presenterMode ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="p-2 text-brand-black"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-4 pb-6 pt-4">
          {isCurriculumPage && <div className="mb-4">{progressPill}</div>}
          <div className="space-y-1 text-sm font-medium">
            <Link
              to="/curriculum"
              className="block py-2 text-brand-black hover:text-brand-red"
              onClick={() => setMobileOpen(false)}
            >
              Curriculum Overview
            </Link>
            {sections.map((s) => (
              <Link
                key={s.id}
                to={`/curriculum/${s.id}`}
                className={cn(
                  'block py-2 pl-4 text-brand-gray hover:text-brand-red',
                  isOffPath(s, selectedPath) && 'opacity-45'
                )}
                onClick={() => setMobileOpen(false)}
              >
                {s.number}. {s.title}
              </Link>
            ))}
            <div className="border-t border-brand-border my-2" />
            <Link to="/tools" className="block py-2 text-brand-black hover:text-brand-red" onClick={() => setMobileOpen(false)}>Tools</Link>
            <Link to="/resources" className="block py-2 text-brand-black hover:text-brand-red" onClick={() => setMobileOpen(false)}>Resources</Link>
            <Link to="/appendix" className="block py-2 text-brand-black hover:text-brand-red" onClick={() => setMobileOpen(false)}>FAQ</Link>
            <Link to="/contact" className="block py-2 text-brand-black hover:text-brand-red" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
