import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { sectionsForPath } from '../../utils/curriculumHelpers'

// The sub-label used to be `text-red-200`, which sat at 3.2:1 on the red fill.
// Anything tinted toward the background fails at this size, so the hierarchy
// comes from weight and size instead of from washing the colour out.
const nextButton =
  'pressable flex items-center gap-2 text-small font-medium text-accent-on bg-accent px-4 py-2.5 rounded-lg hover:bg-accent-hover transition-colors ml-auto'

export default function SectionNav({ currentId }) {
  const { selectedPath } = useProgress()

  // Navigate along the student's chosen path, so "Next" from the no-code build
  // section skips the code path entirely instead of dumping them into it.
  const path = sectionsForPath(selectedPath)
  const idx = path.findIndex((s) => s.id === currentId)
  const prev = idx > 0 ? path[idx - 1] : null
  const next = idx >= 0 && idx < path.length - 1 ? path[idx + 1] : null

  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-line">
      {prev ? (
        <Link
          to={`/curriculum/${prev.id}`}
          className="pressable flex items-center gap-2 text-small font-medium text-ink border border-line px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          <span>
            <span className="block text-caption text-ink-secondary font-normal">Previous</span>
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link to={`/curriculum/${next.id}`} className={nextButton}>
          <span className="text-right">
            <span className="block text-caption font-normal">Next</span>
            {next.title}
          </span>
          <ArrowRight size={16} />
        </Link>
      ) : (
        <Link to="/resources" className={nextButton}>
          <span className="text-right">
            <span className="block text-caption font-normal">All done!</span>
            Keep building: Resources
          </span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
