export default function TeachingPoint({ text }) {
  return (
    <div className="border-l-4 border-path-nontech bg-path-nontechLight rounded-r-lg p-4 my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-path-nontech mb-1">
        Key Teaching Point
      </p>
      <p className="text-sm text-brand-black leading-relaxed">{text}</p>
    </div>
  )
}
