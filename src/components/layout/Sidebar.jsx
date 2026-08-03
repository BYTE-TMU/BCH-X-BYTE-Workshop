import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sections } from '../../data/curriculum'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { isOffPath, liveSubsections, subsectionId } from '../../utils/curriculumHelpers'
import { cn } from '../../utils/cn'

export default function Sidebar() {
  const location = useLocation()
  const { progress, isSectionComplete, selectedPath } = useProgress()

  const currentSection = sections.find((s) => location.pathname === `/curriculum/${s.id}`)

  // Memoised so the observer in useScrollSpy is not torn down on every render.
  const subsectionCodes = useMemo(
    () => (currentSection ? currentSection.subsections.map((sub) => sub.code) : []),
    [currentSection]
  )
  const activeCode = useScrollSpy(subsectionCodes, 100)

  return (
    <aside className="hidden lg:block sticky top-24 w-56 shrink-0 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-1 text-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">Curriculum</p>
        {sections.map((s) => {
          const active = location.pathname === `/curriculum/${s.id}`
          const done = isSectionComplete(s.id)
          const offPath = isOffPath(s, selectedPath)

          return (
            <div key={s.id}>
              <Link
                to={`/curriculum/${s.id}`}
                title={offPath ? 'Not on your selected path' : undefined}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out',
                  active
                    ? 'bg-brand-redLight text-brand-red font-semibold'
                    : 'text-brand-black hover:bg-brand-grayLight hover:text-brand-red',
                  offPath && !active && 'opacity-40'
                )}
              >
                <span className={cn('text-xs shrink-0', active ? 'text-brand-red' : 'text-brand-gray')}>
                  {s.number}
                </span>
                <span className="flex-1 leading-snug">{s.title}</span>
                {done && <CheckCircle2 size={14} className="shrink-0 text-path-nontech" />}
              </Link>

              {/* Subsection table of contents for the section being read */}
              {active && (
                <div className="ml-4 pl-3 border-l border-brand-border my-1 space-y-0.5">
                  {liveSubsections(s).map((sub) => (
                    <a
                      key={sub.code}
                      href={`#${location.pathname}#${sub.code}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(sub.code)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={cn(
                        'flex items-start gap-1.5 py-1 text-xs leading-snug transition-colors',
                        activeCode === sub.code
                          ? 'text-brand-red font-semibold'
                          : 'text-brand-gray hover:text-brand-black'
                      )}
                    >
                      <span className="font-mono shrink-0">{sub.code}</span>
                      <span className="flex-1">{sub.title}</span>
                      {progress[subsectionId(sub)] && (
                        <CheckCircle2 size={11} className="shrink-0 mt-0.5 text-path-nontech" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="border-t border-brand-border my-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-2">Reference</p>
        {[
          { to: '/tools', label: 'Tools' },
          { to: '/resources', label: 'Resources' },
          { to: '/appendix', label: 'FAQ' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'block px-3 py-2 rounded-lg text-sm transition-all duration-200 ease-in-out',
              location.pathname === to
                ? 'bg-brand-redLight text-brand-red font-semibold'
                : 'text-brand-black hover:bg-brand-grayLight hover:text-brand-red'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
