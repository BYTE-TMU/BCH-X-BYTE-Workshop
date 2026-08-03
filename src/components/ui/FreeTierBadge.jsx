import { freeTierLabels } from '../../data/tools'

const statusColors = {
  free:    'bg-path-nontechLight text-path-nontech',
  limited: 'bg-amber-50 text-amber-700',
  paid:    'bg-brand-redLight text-brand-red',
}

export default function FreeTierBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusColors[status] ?? statusColors.free}`}>
      {freeTierLabels[status] ?? status}
    </span>
  )
}
