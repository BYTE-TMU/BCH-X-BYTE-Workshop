import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

export default function CopyButton({ text, className = '' }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-live="polite"
      className={`pressable flex items-center gap-1.5 text-caption font-medium px-2.5 py-1.5 rounded-md transition-colors ${
        copied
          ? 'bg-state-okSubtle text-state-ok'
          : 'bg-code-raised text-code-dim hover:bg-code-line hover:text-code-ink'
      } ${className}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
