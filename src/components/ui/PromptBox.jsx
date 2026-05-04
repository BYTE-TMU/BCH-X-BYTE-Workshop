import CopyButton from './CopyButton'
import ToolChip from './ToolChip'

export default function PromptBox({ label, prompt, tool, warning = false }) {
  const borderColor = warning ? 'border-t-brand-red' : 'border-t-path-both'
  const labelColor = warning ? 'text-brand-red' : 'text-path-both'

  return (
    <div className={`relative bg-zinc-900 rounded-lg overflow-hidden border-t-4 my-6 ${warning ? 'border-t-brand-red' : 'border-t-path-both'}`}>
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {tool && <ToolChip tool={tool} />}
          <span className={`text-xs font-bold uppercase tracking-widest ${labelColor}`}>
            {label}
          </span>
        </div>
        <CopyButton text={prompt} />
      </div>
      {warning && (
        <div className="px-5 py-2 bg-red-950/40 text-brand-red text-xs font-semibold uppercase tracking-widest border-b border-zinc-800">
          ⚠ Do Not Use This Prompt
        </div>
      )}
      <pre className="font-mono text-sm text-zinc-100 leading-relaxed whitespace-pre-wrap p-5 overflow-x-auto">
        {prompt}
      </pre>
    </div>
  )
}
