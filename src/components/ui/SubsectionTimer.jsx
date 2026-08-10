import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { parseMinutes } from '../../utils/curriculumHelpers'
import { cn } from '../../utils/cn'

const format = (seconds) => {
  const sign = seconds < 0 ? '-' : ''
  const abs = Math.abs(seconds)
  return `${sign}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, '0')}`
}

/**
 * Counts down a subsection against the timing already written in the curriculum
 * data, so facilitators can see they are running long without a separate stopwatch.
 * Presenter-mode only — attendees never see this.
 */
export default function SubsectionTimer({ timing }) {
  const budget = parseMinutes(timing) * 60
  const [remaining, setRemaining] = useState(budget)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    setRemaining(budget)
    setRunning(false)
  }, [budget])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => setRemaining((r) => r - 1), 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  if (budget === 0) return null

  const elapsedRatio = (budget - remaining) / budget
  const tone =
    remaining < 0 ? 'bg-accent-subtle text-accent'
    : elapsedRatio >= 0.8 ? 'bg-state-warnSubtle text-state-warn'
    : 'bg-path-bothLight text-path-both'

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full pl-3 pr-1.5 py-1 text-caption font-semibold', tone)}>
      <span className="font-mono tabular-nums">{format(remaining)}</span>
      <button
        onClick={() => setRunning((r) => !r)}
        aria-label={running ? 'Pause timer' : 'Start timer'}
        className="pressable p-1 rounded-full hover:bg-surface-base/60 transition-colors"
      >
        {running ? <Pause size={12} /> : <Play size={12} />}
      </button>
      <button
        onClick={() => { setRunning(false); setRemaining(budget) }}
        aria-label="Reset timer"
        className="pressable p-1 rounded-full hover:bg-surface-base/60 transition-colors"
      >
        <RotateCcw size={12} />
      </button>
    </div>
  )
}
