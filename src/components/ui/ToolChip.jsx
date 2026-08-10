const toolMeta = {
  gemini: { label: 'Gemini', color: 'bg-tool-geminiSubtle text-tool-gemini' },
  claude: { label: 'Claude', color: 'bg-tool-claudeSubtle text-tool-claude' },
  lovable: { label: 'Lovable', color: 'bg-tool-lovableSubtle text-tool-lovable' },
  cursor: { label: 'Cursor', color: 'bg-tool-cursorSubtle text-tool-cursor' },
}

export default function ToolChip({ tool }) {
  const meta = toolMeta[tool] ?? { label: tool, color: 'bg-surface-sunken text-ink-secondary' }
  return (
    <span className={`text-caption font-semibold px-2 py-1 rounded-md ${meta.color}`}>
      {meta.label}
    </span>
  )
}
