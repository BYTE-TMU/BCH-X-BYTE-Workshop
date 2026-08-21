import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckSquare, Square, ChevronDown, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react'
import { sections } from '../data/curriculum'
import { useProgress } from '../context/ProgressContext'
import {
  liveSubsections,
  extensionSubsections,
  sectionMinutes,
  sectionDuration,
  isOffPath,
  subsectionId,
} from '../utils/curriculumHelpers'
import PageWrapper from '../components/layout/PageWrapper'
import Breadcrumb from '../components/layout/Breadcrumb'
import SectionBadge from '../components/ui/SectionBadge'
import SectionNav from '../components/ui/SectionNav'
import PromptBox from '../components/ui/PromptBox'
import TeachingPoint from '../components/ui/TeachingPoint'
import PresenterNote from '../components/ui/PresenterNote'
import Callout from '../components/ui/Callout'
import DiagramBlock from '../components/ui/DiagramBlock'
import PathPicker from '../components/ui/PathPicker'
import SubsectionTimer from '../components/ui/SubsectionTimer'
import { cn } from '../utils/cn'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'body':
      return <p className="text-brand-black leading-relaxed my-4">{block.text}</p>

    case 'bullets':
      return (
        <ul className="space-y-2 my-4 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-brand-black leading-relaxed text-small sm:text-base">
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
            <li key={i} className="flex items-start gap-3 text-brand-black leading-relaxed text-small sm:text-base">
              <span className="text-brand-red font-bold text-small shrink-0 mt-0.5">{i + 1}.</span>
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
          why={block.why}
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
          <p className="text-h3 font-semibold text-brand-black leading-relaxed">{block.text}</p>
        </blockquote>
      )

    case 'diagram':
      return <DiagramBlock id={block.id} />

    case 'pathPicker':
      return <PathPicker />

    default:
      return null
  }
}

function Subsection({ sub, presenterMode }) {
  const { progress, toggleSubsection } = useProgress()
  const done = !!progress[subsectionId(sub)]

  return (
    <div id={sub.code} className="mb-10 scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-caption font-bold text-brand-gray font-mono">{sub.code}</span>
        <h2 className={cn('text-h3 font-bold transition-colors', done ? 'text-brand-gray' : 'text-brand-black')}>
          {sub.title}
        </h2>
        <div className="ml-auto shrink-0 flex items-center gap-2">
          {presenterMode && <SubsectionTimer timing={sub.timing} />}
          {sub.timing && <span className="text-caption text-brand-gray">{sub.timing}</span>}
        </div>
      </div>

      <div>
        {sub.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </div>

      <button
        onClick={() => toggleSubsection(subsectionId(sub))}
        className={cn(
          'pressable mt-4 flex items-center gap-2 text-caption font-medium transition-colors print:hidden',
          done ? 'text-path-nontech' : 'text-brand-gray hover:text-brand-black'
        )}
      >
        {done ? <CheckSquare size={15} className="text-path-nontech" /> : <Square size={15} />}
        {done ? 'Done' : 'Mark as done'}
      </button>
    </div>
  )
}

export default function SectionPage() {
  const { sectionId } = useParams()
  const [searchParams] = useSearchParams()
  const section = sections.find((s) => s.id === sectionId)

  const {
    isSectionComplete,
    setSectionComplete,
    presenterMode,
    setPresenterMode,
    selectedPath,
    setLastViewed,
  } = useProgress()

  const [showExtensions, setShowExtensions] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const slidesMode = searchParams.get('slides') === '1'
  const presenterParam = searchParams.get('presenter') === '1'

  // A shared presenter link should turn notes on without the facilitator hunting
  // for the toggle. It never turns them back off.
  useEffect(() => {
    if (presenterParam) setPresenterMode(true)
  }, [presenterParam, setPresenterMode])

  useEffect(() => {
    if (section) setLastViewed(section.id)
  }, [section, setLastViewed])

  const live = section ? liveSubsections(section) : []
  const extensions = section ? extensionSubsections(section) : []

  // Arrow keys drive projection mode so a facilitator can present with a clicker.
  useEffect(() => {
    if (!slidesMode) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setSlideIndex((i) => Math.min(i + 1, live.length - 1))
      if (e.key === 'ArrowLeft') setSlideIndex((i) => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slidesMode, live.length])

  if (!section) return <Navigate to="/curriculum" replace />

  const isComplete = isSectionComplete(section.id)
  const offPath = isOffPath(section, selectedPath)

  // Projection mode: one subsection at a time, larger type, no chrome.
  if (slidesMode) {
    const sub = live[Math.min(slideIndex, live.length - 1)]
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-body-lg">
        <div className="flex items-center justify-between mb-8 text-small text-brand-gray">
          <span className="font-bold uppercase tracking-[0.1em]">
            Section {section.number}: {section.title}
          </span>
          <span className="font-mono">{slideIndex + 1} / {live.length}</span>
        </div>

        {sub && (
          <div className="slides-content">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-small font-bold text-brand-gray font-mono">{sub.code}</span>
              <h2 className="text-h2 font-bold text-brand-black">{sub.title}</h2>
              <div className="ml-auto shrink-0">
                <SubsectionTimer timing={sub.timing} />
              </div>
            </div>
            {sub.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-brand-border">
          <button
            onClick={() => setSlideIndex((i) => Math.max(i - 1, 0))}
            disabled={slideIndex === 0}
            className="flex items-center gap-2 text-small font-medium text-brand-black disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Previous
          </button>
          <Link to={`/curriculum/${section.id}`} className="text-small text-brand-gray hover:text-brand-red">
            Exit projection mode
          </Link>
          <button
            onClick={() => setSlideIndex((i) => Math.min(i + 1, live.length - 1))}
            disabled={slideIndex >= live.length - 1}
            className="flex items-center gap-2 text-small font-medium text-brand-black disabled:opacity-30"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
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
        <span className="text-eyebrow uppercase text-brand-gray">
          Section {section.number}
        </span>
        <h1 className="text-h2 sm:text-h1 font-bold text-brand-black mt-1 mb-2">{section.title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <SectionBadge duration={sectionDuration(section)} />
          {presenterMode && (
            <>
              <span className="text-caption text-brand-gray">
                {sectionMinutes(section)} min of live content
              </span>
              <Link
                to={`/curriculum/${section.id}?slides=1`}
                className="text-caption font-semibold text-path-both hover:underline"
              >
                Projection mode →
              </Link>
            </>
          )}
        </div>
        <p className="text-brand-gray leading-relaxed mt-2">{section.description}</p>
      </div>

      {offPath && (
        <Callout variant="info">
          <span className="font-semibold">This is the other build path. </span>
          You picked the {selectedPath === 'nontech' ? 'Non-Technical' : 'Technical'} path, so this section is
          optional. It is worth reading afterwards to see how the other half of the room built the same thing.
        </Callout>
      )}

      {/* Pre-recorded intro frame */}
      {section.introFrame && (
        <Callout variant="info">
          <span className="font-semibold">Presenter speaks before pressing play: </span>
          {section.introFrame}
        </Callout>
      )}

      {/* Live subsections */}
      {live.map((sub) => (
        <Subsection key={sub.code} sub={sub} presenterMode={presenterMode} />
      ))}

      {/* Take-home material, collapsed so it never eats the workshop clock */}
      {extensions.length > 0 && (
        <div className="mt-12 border border-brand-border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowExtensions((o) => !o)}
            className="w-full flex items-center gap-3 px-5 py-4 bg-brand-grayLight hover:bg-brand-border/40 transition-colors text-left"
            aria-expanded={showExtensions}
          >
            <GraduationCap size={18} className="text-brand-red shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-small text-brand-black">Go deeper: take-home material</p>
              <p className="text-caption text-brand-gray mt-0.5">
                {extensions.length} extra {extensions.length === 1 ? 'topic' : 'topics'} we do not cover live. Read these after the workshop.
              </p>
            </div>
            <ChevronDown
              size={18}
              className={cn('text-brand-gray shrink-0 transition-transform', showExtensions && 'rotate-180')}
            />
          </button>

          {showExtensions && (
            <div className="px-5 pt-6 pb-2 border-t border-brand-border">
              {extensions.map((sub) => (
                <Subsection key={sub.code} sub={sub} presenterMode={presenterMode} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mark whole section complete */}
      <div className="mt-12 pt-8 border-t border-brand-border print:hidden">
        <button
          onClick={() => setSectionComplete(section.id, !isComplete)}
          className={cn(
            'flex items-center gap-3 text-small font-medium transition-colors',
            isComplete ? 'text-path-nontech' : 'text-brand-gray hover:text-brand-black'
          )}
        >
          {isComplete ? (
            <CheckSquare size={20} className="text-path-nontech" />
          ) : (
            <Square size={20} />
          )}
          {isComplete ? 'Section complete: unmark everything' : 'Mark every subsection as complete'}
        </button>
      </div>

      <SectionNav currentId={sectionId} />
    </PageWrapper>
  )
}
