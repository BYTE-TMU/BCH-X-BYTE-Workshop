import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { sections } from '../../data/curriculum'

export default function SectionNav({ currentId }) {
  const idx = sections.findIndex((s) => s.id === currentId)
  const prev = idx > 0 ? sections[idx - 1] : null
  const next = idx < sections.length - 1 ? sections[idx + 1] : null

  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-brand-border">
      {prev ? (
        <Link
          to={`/curriculum/${prev.id}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-black border border-brand-border px-4 py-2.5 rounded-lg hover:border-brand-red hover:text-brand-red transition-colors"
        >
          <ArrowLeft size={16} />
          <span>
            <span className="block text-xs text-brand-gray font-normal">Previous</span>
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to={`/curriculum/${next.id}`}
          className="flex items-center gap-2 text-sm font-medium text-white bg-brand-red px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors ml-auto"
        >
          <span className="text-right">
            <span className="block text-xs text-red-200 font-normal">Next</span>
            {next.title}
          </span>
          <ArrowRight size={16} />
        </Link>
      ) : (
        <Link
          to="/tools"
          className="flex items-center gap-2 text-sm font-medium text-white bg-brand-red px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors ml-auto"
        >
          <span className="text-right">
            <span className="block text-xs text-red-200 font-normal">All done!</span>
            View Tools Reference
          </span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
