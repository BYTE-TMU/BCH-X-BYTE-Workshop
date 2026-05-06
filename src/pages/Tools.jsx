import { useState } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { tools, toolGroups } from '../data/tools'
import EntityPill from '../components/ui/EntityPill'
import Breadcrumb from '../components/layout/Breadcrumb'

const filterOptions = [
  { value: 'all', label: 'All Tools' },
  { value: 'both', label: 'Both Paths' },
  { value: 'technical', label: 'Technical' },
  { value: 'nontech', label: 'Non-Technical' },
]

export default function Tools() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = tools.filter((t) => {
    const matchesFilter = activeFilter === 'all' || t.path === activeFilter
    const matchesSearch =
      query === '' ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Tools' }]} />
      <h1 className="text-4xl font-bold text-brand-black mb-2">Tools Reference</h1>
      <p className="text-brand-gray leading-relaxed mb-8">
        Every tool introduced in the workshop: what it is for, what path it serves, and whether it has a free tier.
      </p>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="flex gap-2 flex-wrap">
          {filterOptions.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                activeFilter === f.value
                  ? 'bg-brand-red text-white'
                  : 'bg-brand-grayLight text-brand-gray hover:text-brand-black'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
          <input
            type="text"
            placeholder="Search tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-brand-border rounded-full focus:outline-none focus:border-brand-red"
          />
        </div>
      </div>

      {/* Tool groups */}
      {toolGroups.map((group) => {
        const groupTools = filtered.filter((t) => t.group === group)
        if (groupTools.length === 0) return null
        return (
          <div key={group} className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4">{group}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupTools.map((tool) => (
                <div key={tool.id} className="border border-brand-border rounded-xl p-5 bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-brand-black">{tool.name}</h3>
                      <p className="text-xs text-brand-gray mt-0.5">{tool.step}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <EntityPill path={tool.path} />
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tool.free
                          ? 'bg-path-nontechLight text-path-nontech'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {tool.free ? 'Free Tier' : 'Paid'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-brand-gray leading-relaxed mb-4">{tool.description}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline underline-offset-2"
                  >
                    Open Tool <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-brand-gray">
          <p className="font-medium">No tools match your filters.</p>
          <button onClick={() => { setActiveFilter('all'); setQuery('') }} className="text-brand-red text-sm mt-2 hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
