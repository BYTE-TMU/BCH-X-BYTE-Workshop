import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sectionsForPath } from '../../utils/curriculumHelpers'

export default function SectionNav({ currentId }) {
  const { selectedPath } = useProgress()

  // Navigate along the student's chosen path, so "Next" from the no-code build
  // section skips the code path entirely instead of dumping them into it.
  const path = sectionsForPath(selectedPath)
  const idx = path.findIndex((s) => s.id === currentId)
  const prev = idx > 0 ? path[idx - 1] : null
  const next = idx >= 0 && idx < path.length - 1 ? path[idx + 1] : null

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
          to="/resources"
          className="flex items-center gap-2 text-sm font-medium text-white bg-brand-red px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors ml-auto"
        >
          <span className="text-right">
            <span className="block text-xs text-red-200 font-normal">All done!</span>
            Keep building: Resources
          </span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
