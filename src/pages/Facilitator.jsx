import { Link } from 'react-router-dom'
import { Printer, Presentation, Eye } from 'lucide-react'
import { sections } from '../data/curriculum'
import { useProgress } from '../context/ProgressContext'
import {
  liveSubsections,
  extensionSubsections,
  parseMinutes,
  sectionMinutes,
  totalMinutes,
} from '../utils/curriculumHelpers'
import Breadcrumb from '../components/layout/Breadcrumb'
import { cn } from '../utils/cn'

const clock = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

/**
 * Run of show for whoever is holding the room: every subsection in order with a
 * running clock, prompt counts, and all presenter notes expanded. Built to be
 * printed and held, so it does not depend on presenter mode being switched on.
 */
export default function Facilitator() {
  const { presenterMode, setPresenterMode } = useProgress()

  let elapsed = 0
  const total = totalMinutes(null)

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="print:hidden">
        <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Run of Show' }]} />
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <h1 className="text-h1 font-bold text-brand-black">Run of Show</h1>
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={() => setPresenterMode((m) => !m)}
            className={cn(
              'inline-flex items-center gap-2 text-small font-medium px-3 py-2 rounded-lg border transition-colors',
              presenterMode
                ? 'border-path-both bg-path-bothLight text-path-both'
                : 'border-brand-border text-brand-black hover:border-brand-red'
            )}
          >
            <Eye size={15} /> Presenter notes {presenterMode ? 'on' : 'off'}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-small font-medium px-3 py-2 rounded-lg border border-brand-border text-brand-black hover:border-brand-red transition-colors"
          >
            <Printer size={15} /> Print
          </button>
        </div>
      </div>

      <p className="text-brand-gray leading-relaxed mb-2">
        Every section and subsection in order, with the running clock. Take-home material is listed
        separately because it is not delivered live.
      </p>
      <p className="text-small font-semibold text-brand-black mb-10">
        Total live content: {total} minutes across {sections.length} sections, presenting both build paths to the
        whole room. A student only works through one of them, so their hands-on time is shorter than the clock below.
      </p>

      {sections.map((section) => {
        const live = liveSubsections(section)
        const extensions = extensionSubsections(section)
        const sectionStart = elapsed

        return (
          <section key={section.id} className="mb-10 break-inside-avoid">
            <div className="flex items-baseline gap-3 flex-wrap border-b border-brand-border pb-2 mb-4">
              <h2 className="text-h3 font-bold text-brand-black">
                {section.number}. {section.title}
              </h2>
              <span className="text-caption font-mono text-brand-gray">
                starts {clock(sectionStart)} · {sectionMinutes(section)} min
              </span>
              {section.path !== 'both' && (
                <span className="text-eyebrow uppercase text-brand-gray">
                  {section.path === 'nontech' ? 'No-code path' : 'Code path'}
                </span>
              )}
              <Link
                to={`/curriculum/${section.id}?slides=1&presenter=1`}
                className="ml-auto inline-flex items-center gap-1.5 text-caption font-semibold text-path-both hover:underline print:hidden"
              >
                <Presentation size={13} /> Project this section
              </Link>
            </div>

            {section.introFrame && (
              <p className="text-small text-ink bg-state-infoSubtle border border-state-infoLine rounded-lg p-3 mb-4 leading-relaxed">
                <span className="font-semibold">Say before pressing play: </span>
                {section.introFrame}
              </p>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-small min-w-[680px]">
                <thead>
                  <tr className="text-left text-eyebrow uppercase text-brand-gray">
                    <th className="py-2 pr-3 font-semibold w-16">Clock</th>
                    <th className="py-2 pr-3 font-semibold w-14">Code</th>
                    <th className="py-2 pr-3 font-semibold">Subsection</th>
                    <th className="py-2 pr-3 font-semibold w-20">Length</th>
                    <th className="py-2 font-semibold w-20">Prompts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border align-top">
                  {live.map((sub) => {
                    const startsAt = elapsed
                    elapsed += parseMinutes(sub.timing)
                    const prompts = sub.content.filter((b) => b.type === 'prompt').length
                    const notes = sub.content.filter((b) => b.type === 'presenterNote')

                    return (
                      <tr key={sub.code}>
                        <td className="py-2.5 pr-3 font-mono text-caption text-brand-gray">{clock(startsAt)}</td>
                        <td className="py-2.5 pr-3 font-mono text-caption text-brand-gray">{sub.code}</td>
                        <td className="py-2.5 pr-3">
                          <span className="font-medium text-brand-black">{sub.title}</span>
                          {notes.map((note, i) => (
                            <p key={i} className="text-caption text-path-both leading-relaxed mt-1.5">
                              <span className="font-semibold">Note: </span>{note.text}
                            </p>
                          ))}
                        </td>
                        <td className="py-2.5 pr-3 text-brand-gray whitespace-nowrap">{sub.timing}</td>
                        <td className="py-2.5 text-brand-gray">{prompts || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {extensions.length > 0 && (
              <p className="text-caption text-brand-gray mt-3">
                <span className="font-semibold text-brand-black">Take-home (not delivered live): </span>
                {extensions.map((sub) => `${sub.code} ${sub.title}`).join(' · ')}
              </p>
            )}
          </section>
        )
      })}

      <div className="border-t border-brand-border pt-4 text-small font-semibold text-brand-black">
        End of structured content at {clock(elapsed)}. The remaining 30 minutes of the two-hour session are
        Q&amp;A, recap, resource distribution, and the prize draw.
      </div>
    </div>
  )
}
