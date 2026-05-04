import { Clock } from 'lucide-react'

export default function SectionBadge({ duration }) {
  return (
    <div className="flex items-center gap-3 my-4 flex-wrap">
      <span className="flex items-center gap-1.5 bg-brand-grayLight text-brand-gray text-xs font-semibold px-3 py-1 rounded-full">
        <Clock size={12} />
        {duration}
      </span>
    </div>
  )
}
