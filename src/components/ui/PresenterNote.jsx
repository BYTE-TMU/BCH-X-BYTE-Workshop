import { useProgress } from '../../context/ProgressContext'

export default function PresenterNote({ text }) {
  const { presenterMode } = useProgress()

  if (!presenterMode) return null

  return (
    <div className="border-l-4 border-path-both bg-path-bothLight rounded-r-lg p-4 my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-path-both mb-1">
        Presenter Note
      </p>
      <p className="text-sm text-brand-gray italic leading-relaxed">{text}</p>
    </div>
  )
}
