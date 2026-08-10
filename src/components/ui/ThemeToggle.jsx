import { Sun, Moon, MonitorSmartphone } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

const LABELS = {
  light: 'Light theme',
  dark: 'Dark theme',
  system: 'Theme follows your system',
}

const ICONS = { light: Sun, dark: Moon, system: MonitorSmartphone }

export default function ThemeToggle({ className }) {
  const { mode, cycleMode } = useTheme()
  const Icon = ICONS[mode]

  return (
    <button
      onClick={cycleMode}
      aria-label={`${LABELS[mode]}. Activate to change.`}
      title={LABELS[mode]}
      className={cn(
        'pressable p-2 rounded-lg text-ink-secondary transition-colors',
        'hover:text-ink hover:bg-surface-hover',
        className
      )}
    >
      <Icon size={16} />
    </button>
  )
}
