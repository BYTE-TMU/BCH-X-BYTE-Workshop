import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, PlayCircle } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import { sections } from '../data/curriculum'
import { isOffPath, liveSubsections, totalMinutes, sectionDuration } from '../utils/curriculumHelpers'
import ProgressBar from '../components/ui/ProgressBar'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import PathPicker from '../components/ui/PathPicker'
import EntityPill from '../components/ui/EntityPill'
import { cn } from '../utils/cn'

export default function CurriculumOverview() {
  const {
    progress,
    percentComplete,
    completedCount,
    totalCount,
    resetProgress,
    isSectionComplete,
    selectedPath,
    lastViewed,
  } = useProgress()

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress()
  }

  // "Resume" points at the first unfinished subsection, falling back to the last
  // section the student opened.
  const resumeTarget = (() => {
    for (const section of sections) {
      if (isOffPath(section, selectedPath)) continue
      for (const sub of liveSubsections(section)) {
        if (!progress[sub.code]) return { section, sub }
      }
    }
    if (lastViewed) {
      const section = sections.find((s) => s.id === lastViewed)
      if (section) return { section, sub: liveSubsections(section)[0] }
    }
    return null
  })()

  const started = completedCount > 0 || Object.values(progress).some(Boolean)

  return (
    <PageWrapper withSidebar>
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Curriculum' }]} />

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-h1 font-bold text-brand-black">Workshop Curriculum</h1>
        {started && (
          <button
            onClick={handleReset}
            className="text-caption text-brand-gray hover:text-brand-red transition-colors shrink-0 mt-2"
          >
            Reset progress
          </button>
        )}
      </div>
      <p className="text-brand-gray leading-relaxed mb-8">
        {sections.length} sections, about {totalMinutes(selectedPath)} minutes of content, taking you from a vague
        idea to a live, deployed product. Work through them in order or jump to any section.
      </p>

      {/* Progress */}
      <div className="bg-brand-grayLight rounded-xl p-6 mb-6 border border-brand-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-small font-semibold text-brand-black">Your progress</p>
          <p className="text-small font-bold text-brand-red">{completedCount} / {totalCount} sections complete</p>
        </div>
        <ProgressBar percent={percentComplete} />
        {resumeTarget && (
          <Link
            to={`/curriculum/${resumeTarget.section.id}`}
            className="inline-flex items-center gap-2 mt-4 text-small font-semibold text-brand-red hover:underline"
          >
            <PlayCircle size={16} />
            {started ? `Resume at ${resumeTarget.sub.code} ${resumeTarget.sub.title}` : 'Start with 0.1 Welcome and Introductions'}
          </Link>
        )}
      </div>

      {/* Path selection */}
      <div className="mb-10">
        <p className="text-small font-semibold text-brand-black">Your build path</p>
        <p className="text-caption text-brand-gray mt-1">
          Sections 2 and 3 are two routes to the same live URL. Pick one and the site will focus on it.
        </p>
        <PathPicker compact />
      </div>

      {/* Section cards */}
      <div className="space-y-4">
        {sections.map((s) => {
          const done = isSectionComplete(s.id)
          const offPath = isOffPath(s, selectedPath)
          const subs = liveSubsections(s)
          const doneSubs = subs.filter((sub) => progress[sub.code]).length

          return (
            <Link
              key={s.id}
              to={`/curriculum/${s.id}`}
              className={cn(
                'pressable-lg flex items-start gap-5 p-5 border rounded-xl bg-surface-raised transition-all duration-250 ease-out group',
                offPath
                  ? 'border-line opacity-55 hover:opacity-100'
                  : 'border-line hover:border-accent hover:shadow-md hover:-translate-y-0.5'
              )}
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-h2 font-bold text-brand-border group-hover:text-brand-red/30 transition-colors">
                  {s.number}
                </span>
                {done && <CheckCircle2 size={16} className="text-path-nontech" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-brand-black group-hover:text-brand-red transition-colors">
                    {s.title}
                  </h3>
                  {s.path !== 'both' && <EntityPill path={s.path} />}
                </div>
                <p className="text-small text-brand-gray leading-relaxed mb-3">{s.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-caption bg-brand-grayLight text-brand-gray font-semibold px-2.5 py-1 rounded-full">
                    {sectionDuration(s)}
                  </span>
                  <span className="text-caption text-brand-gray">
                    {doneSubs} / {subs.length} steps
                  </span>
                  {done && (
                    <span className="text-caption bg-path-nontechLight text-path-nontech font-semibold px-2.5 py-1 rounded-full">
                      Complete
                    </span>
                  )}
                  {offPath && (
                    <span className="text-caption bg-brand-grayLight text-brand-gray font-semibold px-2.5 py-1 rounded-full">
                      Not on your path
                    </span>
                  )}
                </div>
              </div>
              <ArrowRight size={16} className="text-brand-gray group-hover:text-brand-red transition-colors shrink-0 mt-1" />
            </Link>
          )
        })}
      </div>
    </PageWrapper>
  )
}
