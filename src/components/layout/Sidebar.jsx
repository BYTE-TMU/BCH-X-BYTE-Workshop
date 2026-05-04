import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sections } from '../../data/curriculum'

export default function Sidebar() {
  const location = useLocation()
  const { progress } = useProgress()

  return (
    <aside className="hidden lg:block sticky top-24 w-56 shrink-0 self-start">
      <div className="space-y-1 text-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">Curriculum</p>
        {sections.map((s) => {
          const active = location.pathname === `/curriculum/${s.id}`
          const done = progress[s.id]
          return (
            <Link
              key={s.id}
              to={`/curriculum/${s.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? 'bg-brand-redLight text-brand-red font-semibold'
                  : 'text-brand-black hover:bg-brand-grayLight hover:text-brand-red'
              }`}
            >
              <span className={`text-xs shrink-0 ${active ? 'text-brand-red' : 'text-brand-gray'}`}>
                {s.number}
              </span>
              <span className="flex-1 leading-snug">{s.title}</span>
              {done && <CheckCircle2 size={14} className="shrink-0 text-path-nontech" />}
            </Link>
          )
        })}

        <div className="border-t border-brand-border my-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-2">Reference</p>
        {[
          { to: '/tools', label: 'Tools' },
          { to: '/appendix', label: 'Q&A Appendix' },
          { to: '/resources', label: 'Resources' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              location.pathname === to
                ? 'bg-brand-redLight text-brand-red font-semibold'
                : 'text-brand-black hover:bg-brand-grayLight hover:text-brand-red'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
