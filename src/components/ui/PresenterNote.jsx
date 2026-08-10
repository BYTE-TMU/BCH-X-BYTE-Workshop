import { useProgress } from '../../context/ProgressContext'

export default function PresenterNote({ text }) {
  const { presenterMode } = useProgress()

  if (!presenterMode) return null

  return (
    <div className="border-l-4 border-path-both bg-path-bothLight rounded-r-lg p-4 my-6">
      <p className="text-eyebrow uppercase text-path-both mb-1.5">
        Presenter Note
      </p>
      <p className="text-small text-ink-secondary italic leading-relaxed">{text}</p>
    </div>
  )
}
