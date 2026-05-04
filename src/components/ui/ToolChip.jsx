const toolMeta = {
  gemini: { label: 'Gemini', color: 'bg-blue-100 text-blue-700' },
  claude: { label: 'Claude', color: 'bg-orange-100 text-orange-700' },
  lovable: { label: 'Lovable', color: 'bg-pink-100 text-pink-700' },
  cursor: { label: 'Cursor', color: 'bg-purple-100 text-purple-700' },
}

export default function ToolChip({ tool }) {
  const meta = toolMeta[tool] ?? { label: tool, color: 'bg-brand-grayLight text-brand-gray' }
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${meta.color}`}>
      {meta.label}
    </span>
  )
}
