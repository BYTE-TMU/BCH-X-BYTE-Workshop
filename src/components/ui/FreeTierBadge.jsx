import { freeTierLabels } from '../../data/tools'

const statusColors = {
  free:    'bg-state-okSubtle text-state-ok',
  limited: 'bg-state-warnSubtle text-state-warn',
  paid:    'bg-accent-subtle text-accent',
}

export default function FreeTierBadge({ status }) {
  return (
    <span className={`text-caption font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusColors[status] ?? statusColors.free}`}>
      {freeTierLabels[status] ?? status}
    </span>
  )
}
