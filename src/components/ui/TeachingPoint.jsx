export default function TeachingPoint({ text }) {
  return (
    <div className="border-l-4 border-path-nontech bg-path-nontechLight rounded-r-lg p-4 my-6">
      <p className="text-eyebrow uppercase text-path-nontech mb-1.5">
        Key Teaching Point
      </p>
      <p className="text-small text-ink leading-relaxed">{text}</p>
    </div>
  )
}
