import CopyButton from './CopyButton'
import ToolChip from './ToolChip'

export default function PromptBox({ label, prompt, tool, warning = false }) {
  const labelColor = warning ? 'text-accent' : 'text-path-both'

  return (
    <div className={`relative bg-code-surface rounded-lg overflow-hidden border-t-4 my-6 ${warning ? 'border-t-accent' : 'border-t-path-both'}`}>
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-code-line">
        <div className="flex items-center gap-2">
          {tool && <ToolChip tool={tool} />}
          <span className={`text-eyebrow uppercase ${labelColor}`}>
            {label}
          </span>
        </div>
        <CopyButton text={prompt} />
      </div>
      {warning && (
        <div className="px-5 py-2 bg-accent/15 text-accent text-eyebrow uppercase border-b border-code-line">
          ⚠ Do Not Use This Prompt
        </div>
      )}
      <pre className="font-mono text-small text-code-ink leading-relaxed whitespace-pre-wrap p-5 overflow-x-auto">
        {prompt}
      </pre>
    </div>
  )
}
