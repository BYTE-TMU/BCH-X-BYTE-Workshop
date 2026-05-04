import { Copy, Check } from 'lucide-react'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

export default function CopyButton({ text, className = '' }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-live="polite"
      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors ${
        copied
          ? 'bg-path-nontechLight text-path-nontech'
          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
      } ${className}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
