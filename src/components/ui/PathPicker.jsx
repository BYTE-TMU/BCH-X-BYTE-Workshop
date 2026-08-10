import { motion } from 'motion/react'
import { Check, Code2, MousePointerClick } from 'lucide-react'
import { useProgress } from '../../context/ProgressContext'
import { ui } from '../../motion/springs'
import { cn } from '../../utils/cn'

const options = [
  {
    value: 'nontech',
    label: 'Non-Technical Path',
    icon: MousePointerClick,
    blurb: 'Build with Lovable. No code at any step. Start here if you are unsure.',
    activeClass: 'border-path-nontech bg-path-nontechLight',
    iconClass: 'text-path-nontech',
  },
  {
    value: 'technical',
    label: 'Technical Path',
    icon: Code2,
    blurb: 'Build in Cursor with AI writing the code. Pick this to see how it works underneath.',
    activeClass: 'border-path-technical bg-path-techLight',
    iconClass: 'text-path-technical',
  },
]

/**
 * Lets a student commit to one of the two build paths. The choice drives what the
 * sidebar highlights, where Next goes, and what the progress denominator counts.
 */
export default function PathPicker({ compact = false }) {
  const { selectedPath, setSelectedPath } = useProgress()

  return (
    <div className="my-6">
      {!compact && (
        <p className="text-small font-semibold text-ink mb-3">Pick your path</p>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map(({ value, label, icon: Icon, blurb, activeClass, iconClass }) => {
          const active = selectedPath === value
          return (
            <button
              key={value}
              onClick={() => setSelectedPath(active ? null : value)}
              aria-pressed={active}
              className={cn(
                'pressable-lg text-left rounded-xl border p-4 transition-colors',
                active
                  ? activeClass
                  : 'border-line bg-surface-raised hover:border-accent hover:bg-surface-hover'
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={active ? iconClass : 'text-ink-secondary'} />
                <span className="font-semibold text-small text-ink">{label}</span>
                {active && (
                  // Springs in from nothing, so committing to a path registers as
                  // a physical event rather than a colour swap.
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={ui}
                    className={cn('ml-auto inline-flex', iconClass)}
                  >
                    <Check size={14} />
                  </motion.span>
                )}
              </div>
              <p className="text-caption text-ink-secondary leading-relaxed">{blurb}</p>
            </button>
          )
        })}
      </div>
      {selectedPath && (
        <p className="text-caption text-ink-secondary mt-3">
          The other build section stays available, just dimmed, and your progress now counts only the
          sections on this path.{' '}
          <button onClick={() => setSelectedPath(null)} className="text-accent hover:underline">
            Show both paths
          </button>
        </p>
      )}
    </div>
  )
}
