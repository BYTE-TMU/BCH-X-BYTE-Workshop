import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { appendix } from '../data/appendix'
import Breadcrumb from '../components/layout/Breadcrumb'

function Accordion({ category, questions }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-brand-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-brand-grayLight transition-colors text-left"
      >
        <span className="font-semibold text-brand-black">{category}</span>
        <ChevronDown
          size={16}
          className={`text-brand-gray transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* CSS grid trick: animate grid-template-rows 0fr → 1fr */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-inner border-t border-brand-border divide-y divide-brand-border">
          {questions.map((item, i) => (
            <div key={i} className="px-5 py-5 bg-white">
              <p className="font-semibold text-brand-black mb-2">{item.q}</p>
              <p className="text-sm text-brand-gray leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Appendix() {
  const [query, setQuery] = useState('')

  const filtered = appendix.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        query === '' ||
        q.q.toLowerCase().includes(query.toLowerCase()) ||
        q.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0)

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Q&A Appendix' }]} />
      <h1 className="text-4xl font-bold text-brand-black mb-2">Q&A Appendix</h1>
      <p className="text-brand-gray leading-relaxed mb-8">
        Anticipated questions by category, mirroring the live Q&A appendix document used during the workshop.
      </p>

      <div className="relative mb-8 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
        <input
          type="text"
          placeholder="Search questions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-brand-border rounded-lg focus:outline-none focus:border-brand-red transition-colors"
        />
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((cat) => (
            <Accordion key={cat.id} category={cat.category} questions={cat.questions} />
          ))
        ) : (
          <div className="text-center py-20 text-brand-gray">
            <p className="font-medium">No results for &ldquo;{query}&rdquo;</p>
            <button onClick={() => setQuery('')} className="text-brand-red text-sm mt-2 hover:underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
