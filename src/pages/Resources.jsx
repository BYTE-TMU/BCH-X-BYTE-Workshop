import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { checklistSteps, promptLibrary } from '../data/resources'
import { tools } from '../data/tools'
import PromptBox from '../components/ui/PromptBox'
import Breadcrumb from '../components/layout/Breadcrumb'

const CHECKLIST_KEY = 'bch_byte_checklist'

export default function Resources() {
  const [checklist, setChecklist] = useState(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist))
  }, [checklist])

  const toggle = (id) =>
    setChecklist((c) => ({ ...c, [id]: !c[id] }))

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Resources' }]} />
      <h1 className="text-4xl font-bold text-brand-black mb-2">Resources</h1>
      <p className="text-brand-gray leading-relaxed mb-12">
        Everything you need to keep building after the workshop: checklist, tool links, and the full prompt library.
      </p>

      {/* Quick start checklist */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-black mb-1">Quick Start Checklist</h2>
        <p className="text-brand-gray text-sm mb-6">Your end-to-end workflow from idea to live product. Progress saves automatically.</p>
        <div className="space-y-3">
          {checklistSteps.map((step, i) => {
            const done = !!checklist[step.id]
            return (
              <label
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                  done ? 'bg-path-nontechLight border-path-nontech/30' : 'bg-white border-brand-border hover:border-brand-red'
                }`}
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggle(step.id)}
                  className="mt-0.5 accent-path-nontech"
                />
                <div>
                  <p className={`font-semibold text-sm ${done ? 'line-through text-brand-gray' : 'text-brand-black'}`}>
                    {i + 1}. {step.label}
                  </p>
                  <p className="text-xs text-brand-gray mt-1 leading-relaxed">{step.description}</p>
                </div>
              </label>
            )
          })}
        </div>
      </section>

      {/* Tool links */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-black mb-1">Tool Links</h2>
        <p className="text-brand-gray text-sm mb-6">Every tool in one place. Open directly from here.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((t) => (
            <a
              key={t.id}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-4 border border-brand-border rounded-lg bg-white hover:border-brand-red hover:shadow-sm transition-all group"
            >
              <div>
                <p className="font-semibold text-brand-black text-sm group-hover:text-brand-red transition-colors">{t.name}</p>
                <p className="text-xs text-brand-gray mt-0.5">{t.step}</p>
              </div>
              <ExternalLink size={14} className="text-brand-gray group-hover:text-brand-red transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Free tier summary */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-black mb-1">Free Tier Summary</h2>
        <p className="text-brand-gray text-sm mb-6">Everything you need for the workshop is free.</p>
        <div className="border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-grayLight">
                <th className="text-left px-5 py-3 font-semibold text-brand-black">Tool</th>
                <th className="text-left px-5 py-3 font-semibold text-brand-black">Free Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {tools.map((t) => (
                <tr key={t.id} className="bg-white">
                  <td className="px-5 py-3 font-medium text-brand-black">{t.name}</td>
                  <td className="px-5 py-3 text-brand-gray">
                    {t.free ? (
                      <span className="text-path-nontech font-semibold">✓ Free</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Paid plan required</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Prompt library */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-black mb-1">Prompt Library</h2>
        <p className="text-brand-gray text-sm mb-8">All prompts from the curriculum in one place. Copy and paste directly into the tools.</p>
        {promptLibrary.map((group) => (
          <div key={group.section} className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4">{group.section}</h3>
            {group.items.map((item, i) => (
              <PromptBox
                key={i}
                label={item.label}
                prompt={item.prompt}
                tool={item.tool}
              />
            ))}
          </div>
        ))}
      </section>

      {/* BYTE community */}
      <section className="mb-16">
        <div className="bg-brand-black rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Keep Building with BYTE</h2>
          <p className="text-brand-gray leading-relaxed mb-6 max-w-lg mx-auto">
            Real teams. Real projects. Real demo days. If you want to keep the momentum going, BYTE is where it happens.
          </p>
          <a
            href="https://github.com/BYTE-TMU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
          >
            Find BYTE on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Downloads — disabled */}
      <section>
        <h2 className="text-2xl font-bold text-brand-black mb-1">Downloads</h2>
        <p className="text-brand-gray text-sm mb-6">Workshop documents, coming soon.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {['Tools Reference Document', 'Curriculum Slide Deck'].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between gap-3 p-4 border border-dashed border-brand-border rounded-lg bg-brand-grayLight opacity-60"
            >
              <p className="text-sm font-medium text-brand-gray">{name}</p>
              <span className="text-xs text-brand-gray bg-white px-2 py-1 rounded-full border border-brand-border">
                Coming soon
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
