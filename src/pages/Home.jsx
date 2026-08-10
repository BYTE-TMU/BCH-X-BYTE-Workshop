import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { sections } from '../data/curriculum'
import { goals, deliverableFeatures } from '../data/homeContent'
import { useProgress } from '../context/ProgressContext'
import { isOffPath, liveSubsections, sectionDuration, totalMinutes } from '../utils/curriculumHelpers'
import { cn } from '../utils/cn'

export default function Home() {
  const { progress, selectedPath, lastViewed } = useProgress()

  // Returning attendees get a resume link instead of being sent back to Section 0.
  const resume = (() => {
    const started = Object.values(progress).some(Boolean)
    if (!started && !lastViewed) return null
    for (const section of sections) {
      if (isOffPath(section, selectedPath)) continue
      for (const sub of liveSubsections(section)) {
        if (!progress[sub.code]) return { section, sub }
      }
    }
    return null
  })()

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-white border-b border-brand-border">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 text-eyebrow uppercase text-brand-red bg-brand-redLight px-3 py-1.5 rounded-full mb-6">
            BCH x BYTE Workshop
          </div>
          <h1 className="text-display font-bold text-ink mb-6">
            Build a Project from<br />Scratch Using AI
          </h1>
          <p className="text-body-lg text-brand-gray leading-relaxed max-w-2xl mx-auto mb-10">
            A hands-on workshop where you go from a vague idea to a live, deployed product, no coding experience required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {resume ? (
              <Link
                to={`/curriculum/${resume.section.id}`}
                className="pressable flex items-center gap-2 bg-brand-red text-accent-on font-semibold px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
              >
                <PlayCircle size={16} /> Resume at {resume.sub.code} {resume.sub.title}
              </Link>
            ) : (
              <Link
                to="/curriculum/section-0"
                className="pressable flex items-center gap-2 bg-brand-red text-accent-on font-semibold px-6 py-3 rounded-full hover:bg-accent-hover transition-colors"
              >
                Start the Curriculum <ArrowRight size={16} />
              </Link>
            )}
            <Link
              to="/tools"
              className="pressable flex items-center gap-2 border border-line text-brand-black font-semibold px-6 py-3 rounded-full hover:border-brand-red hover:text-brand-red transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* What you will build */}
      <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase text-brand-red mb-3">What You Will Build</p>
            <h2 className="text-h2 font-bold text-brand-black mb-4">A personal landing page: from idea to live URL</h2>
            <p className="text-brand-gray leading-relaxed">
              An AI-powered personal landing page. Every student in the room needs one, it has zero prerequisite knowledge to understand, and it is simple enough to go from brief to live URL in the time available on both paths.
            </p>
            <div className="mt-6 space-y-3 text-small">
              {deliverableFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 text-brand-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-grayLight rounded-2xl p-8 border border-brand-border">
            <div className="space-y-4">
              <div className="h-8 bg-brand-border rounded-lg w-2/3" />
              <div className="h-4 bg-brand-border rounded w-full" />
              <div className="h-4 bg-brand-border rounded w-3/4" />
              <div className="flex gap-2 mt-4">
                {['Skill', 'Skill', 'Skill', 'Skill'].map((_, i) => (
                  <div key={i} className="h-7 w-14 bg-brand-border rounded-full" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="h-20 bg-brand-border rounded-lg" />
                <div className="h-20 bg-brand-border rounded-lg" />
              </div>
            </div>
            <p className="text-caption text-brand-gray mt-4 text-center">Example landing page structure</p>
          </div>
        </div>
      </section>

      {/* What you will learn */}
      <section className="bg-brand-grayLight border-y border-brand-border">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-eyebrow uppercase text-brand-red mb-3">What You Will Learn</p>
            <h2 className="text-h2 font-bold text-brand-black">Four skills that transfer everywhere</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-surface-raised rounded-xl p-6 border border-brand-border">
                <div className="w-10 h-10 bg-brand-redLight rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-red" />
                </div>
                <h3 className="font-semibold text-brand-black mb-2">{title}</h3>
                <p className="text-small text-brand-gray leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop at a glance */}
      <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p className="text-eyebrow uppercase text-brand-red mb-3">Workshop at a Glance</p>
          <h2 className="text-h2 font-bold text-brand-black">
            {sections.length} sections. Two hours. One live product.
          </h2>
          <p className="text-brand-gray mt-2">
            {totalMinutes(null)} minutes of structured content, then Q&amp;A and the prize draw.
          </p>
        </div>
        <div className="border border-brand-border rounded-xl overflow-hidden">
          {sections.map((s, i) => (
            <Link
              key={s.id}
              to={`/curriculum/${s.id}`}
              className={cn(
                'flex items-center gap-4 px-6 py-4 hover:bg-brand-grayLight transition-colors',
                i < sections.length - 1 && 'border-b border-brand-border',
                isOffPath(s, selectedPath) && 'opacity-55'
              )}
            >
              <span className="text-h2 font-bold text-brand-border w-8 shrink-0">{s.number}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-black">{s.title}</p>
                <p className="text-small text-brand-gray truncate">{s.description}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-caption bg-brand-grayLight text-brand-gray font-semibold px-2.5 py-1 rounded-full">
                  {sectionDuration(s)}
                </span>
              </div>
              <ArrowRight size={16} className="text-brand-gray shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Start CTA */}
      <section className="bg-accent-band">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-h2 font-bold text-on-band mb-4">Ready to build?</h2>
          <p className="text-on-bandDim mb-8 text-body-lg">Start with Section 0 and work through at your own pace.</p>
          <Link
            to="/curriculum/section-0"
            className="pressable inline-flex items-center gap-2 bg-on-band text-accent-band font-semibold px-8 py-3 rounded-full hover:bg-on-band/90 transition-colors"
          >
            Start with Section 0 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
