const pathColors = {
  both:      'bg-path-bothLight text-path-both',
  technical: 'bg-path-techLight text-path-technical',
  nontech:   'bg-path-nontechLight text-path-nontech',
}

const pathLabels = {
  both:      'Both Paths',
  technical: 'Technical',
  nontech:   'Non-Technical',
}

export default function EntityPill({ path }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${pathColors[path] ?? pathColors.both}`}>
      {pathLabels[path] ?? path}
    </span>
  )
}
