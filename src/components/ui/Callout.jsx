import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    icon: Info,
    bg: 'bg-state-infoSubtle',
    border: 'border-state-infoLine',
    iconColor: 'text-state-info',
    textColor: 'text-state-info',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-state-warnSubtle',
    border: 'border-state-warnLine',
    iconColor: 'text-state-warn',
    textColor: 'text-state-warn',
  },
  tip: {
    icon: Lightbulb,
    bg: 'bg-state-okSubtle',
    border: 'border-state-okLine',
    iconColor: 'text-state-ok',
    textColor: 'text-state-ok',
  },
}

export default function Callout({ variant = 'info', children }) {
  const v = variants[variant] ?? variants.info
  const Icon = v.icon

  return (
    <div className={`flex gap-3 items-start rounded-lg border p-4 my-6 ${v.bg} ${v.border}`}>
      <Icon size={16} className={`shrink-0 mt-0.5 ${v.iconColor}`} />
      <p className={`text-small leading-relaxed ${v.textColor}`}>{children}</p>
    </div>
  )
}
