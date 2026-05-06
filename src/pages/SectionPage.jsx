import { useParams, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { CheckSquare, Square } from 'lucide-react'
import { sections } from '../data/curriculum'
import { useProgress } from '../context/ProgressContext'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import SectionBadge from '../components/ui/SectionBadge'
import SectionNav from '../components/ui/SectionNav'
import PromptBox from '../components/ui/PromptBox'
import TeachingPoint from '../components/ui/TeachingPoint'
import PresenterNote from '../components/ui/PresenterNote'
import Callout from '../components/ui/Callout'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'body':
      return <p className="text-brand-black leading-relaxed my-4">{block.text}</p>

    case 'bullets':
      return (
        <ul className="space-y-2 my-4 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-brand-black leading-relaxed text-sm sm:text-base">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'numbered':
      return (
        <ol className="space-y-2 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-brand-black leading-relaxed text-sm sm:text-base">
              <span className="text-brand-red font-bold text-sm shrink-0 mt-0.5">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ol>
      )

    case 'prompt':
      return (
        <PromptBox
          label={block.label}
          prompt={block.prompt}
          tool={block.tool}
          warning={block.warning}
        />
      )

    case 'teachingPoint':
      return <TeachingPoint text={block.text} />

    case 'presenterNote':
      return <PresenterNote text={block.text} />

    case 'callout':
      return <Callout variant={block.variant}>{block.text}</Callout>

    case 'mindset':
      return (
        <blockquote className="border-l-4 border-brand-red pl-6 my-8">
          <p className="text-xl font-semibold text-brand-black leading-relaxed">{block.text}</p>
        </blockquote>
      )

    default:
      return null
  }
}

export default function SectionPage() {
  const { sectionId } = useParams()
  const section = sections.find((s) => s.id === sectionId)
  const { progress, markComplete, markIncomplete } = useProgress()
  const [justCompleted, setJustCompleted] = useState(false)

  if (!section) return <Navigate to="/curriculum" replace />

  const isComplete = progress[sectionId]

  const handleToggle = () => {
    if (isComplete) {
      markIncomplete(sectionId)
    } else {
      markComplete(sectionId)
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 3000)
    }
  }

  return (
    <PageWrapper withSidebar>
      <Breadcrumb
        crumbs={[
          { to: '/', label: 'Home' },
          { to: '/curriculum', label: 'Curriculum' },
          { label: section.title },
        ]}
      />

      {/* Section header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gray">
          Section {section.number}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-black mt-1 mb-2">{section.title}</h1>
        <SectionBadge duration={section.duration} />
        <p className="text-brand-gray leading-relaxed mt-2">{section.description}</p>
      </div>

      {/* Pre-recorded intro frame */}
      {section.introFrame && (
        <Callout variant="info">
          <span className="font-semibold">Presenter speaks before pressing play: </span>
          {section.introFrame}
        </Callout>
      )}

      {/* Subsections */}
      {section.subsections.map((sub) => (
        <div key={sub.code} id={sub.code} className="mb-10">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs font-bold text-brand-gray font-mono">{sub.code}</span>
            <h2 className="text-xl font-bold text-brand-black">{sub.title}</h2>
            {sub.timing && (
              <span className="text-xs text-brand-gray ml-auto shrink-0">{sub.timing}</span>
            )}
          </div>
          <div>
            {sub.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>
        </div>
      ))}

      {/* Mark complete */}
      <div className="mt-12 pt-8 border-t border-brand-border">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-3 text-sm font-medium transition-colors ${
            isComplete ? 'text-path-nontech' : 'text-brand-gray hover:text-brand-black'
          }`}
        >
          {isComplete ? (
            <CheckSquare size={20} className="text-path-nontech" />
          ) : (
            <Square size={20} />
          )}
          {isComplete ? 'Section complete: unmark' : 'Mark this section as complete'}
        </button>
        {justCompleted && (
          <p className="text-xs text-path-nontech mt-2 font-medium">
            ✓ Progress saved
          </p>
        )}
      </div>

      <SectionNav currentId={sectionId} />
    </PageWrapper>
  )
}
