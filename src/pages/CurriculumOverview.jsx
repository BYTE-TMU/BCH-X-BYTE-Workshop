import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import { sections } from '../data/curriculum'
import ProgressBar from '../components/ui/ProgressBar'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'

export default function CurriculumOverview() {
  const { progress, percentComplete, completedCount, resetProgress } = useProgress()

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress()
  }

  return (
    <PageWrapper withSidebar>
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Curriculum' }]} />

      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-4xl font-bold text-brand-black">Workshop Curriculum</h1>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-brand-gray hover:text-brand-red transition-colors shrink-0 mt-2"
          >
            Reset progress
          </button>
        )}
      </div>
      <p className="text-brand-gray leading-relaxed mb-8">
        Six sections that take you from a vague idea to a live, deployed product. Work through them in order or jump to any section.
      </p>

      {/* Progress */}
      <div className="bg-brand-grayLight rounded-xl p-6 mb-10 border border-brand-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-brand-black">Your progress</p>
          <p className="text-sm font-bold text-brand-red">{completedCount} / 5 sections complete</p>
        </div>
        <ProgressBar percent={percentComplete} />
      </div>

      {/* Section cards */}
      <div className="space-y-4">
        {sections.map((s) => {
          const done = progress[s.id]
          return (
            <Link
              key={s.id}
              to={`/curriculum/${s.id}`}
              className="flex items-start gap-5 p-5 border border-brand-border rounded-xl hover:border-brand-red hover:shadow-sm transition-all group"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-2xl font-bold text-brand-border group-hover:text-brand-red/30 transition-colors">
                  {s.number}
                </span>
                {done && <CheckCircle2 size={16} className="text-path-nontech" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-brand-black group-hover:text-brand-red transition-colors">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-brand-gray leading-relaxed mb-3">{s.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs bg-brand-grayLight text-brand-gray font-semibold px-2.5 py-1 rounded-full">
                    {s.duration}
                  </span>
                  {done && (
                    <span className="text-xs bg-path-nontechLight text-path-nontech font-semibold px-2.5 py-1 rounded-full">
                      Complete
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
