import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-900',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    textColor: 'text-amber-900',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-path-nontechLight',
    border: 'border-path-nontech/30',
    iconColor: 'text-path-nontech',
    textColor: 'text-brand-black',
  },
}

export default function Callout({ variant = 'info', children }) {
  const v = variants[variant] ?? variants.info
  const Icon = v.icon

  return (
    <div className={`flex gap-3 items-start rounded-lg border p-4 my-6 ${v.bg} ${v.border}`}>
      <Icon size={16} className={`shrink-0 mt-0.5 ${v.iconColor}`} />
      <p className={`text-sm leading-relaxed ${v.textColor}`}>{children}</p>
    </div>
  )
}
