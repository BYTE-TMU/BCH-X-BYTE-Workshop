import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Search, Rocket, Users } from 'lucide-react'
import { sections } from '../data/curriculum'
import SectionBadge from '../components/ui/SectionBadge'

const goals = [
  {
    icon: Search,
    title: 'AI-Powered Scoping',
    description: 'Learn to write structured project briefs and conduct deep research using Gemini and Claude, understanding exactly when to use each tool for the best results.',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'Master the art of describing a user interface in plain English to generate functional designs and working products with or without a technical background.',
  },
  {
    icon: Rocket,
    title: 'The Build and Scale Roadmap',
    description: 'Understand the different paths to implementation and what it actually takes to maintain and grow a product after it goes live.',
  },
  {
    icon: Users,
    title: 'Post-Workshop Momentum',
    description: 'Leave with a clear next step for your project and a community of builders to help you keep the momentum going.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-white border-b border-brand-border">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-red bg-brand-redLight px-3 py-1.5 rounded-full mb-6">
            BCH x BYTE Workshop
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-brand-black leading-tight tracking-tight mb-6">
            Build a Project from<br />Scratch Using AI
          </h1>
          <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto mb-10">
            A hands-on workshop where you go from a vague idea to a live, deployed product — no coding experience required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/curriculum/section-0"
              className="flex items-center gap-2 bg-brand-red text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
            >
              Start the Curriculum <ArrowRight size={16} />
            </Link>
            <Link
              to="/tools"
              className="flex items-center gap-2 border border-brand-border text-brand-black font-semibold px-6 py-3 rounded-full hover:border-brand-red hover:text-brand-red transition-colors"
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
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">What You Will Build</p>
            <h2 className="text-3xl font-bold text-brand-black mb-4">A personal landing page — from idea to live URL</h2>
            <p className="text-brand-gray leading-relaxed">
              An AI-powered personal landing page. Every student in the room needs one, it has zero prerequisite knowledge to understand, and it is simple enough to go from brief to live URL in the time available on both paths.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {['Hero block with name and bio', 'Skills section', 'Projects with two example cards', 'Contact section with LinkedIn and email'].map((f) => (
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
            <p className="text-xs text-brand-gray mt-4 text-center">Example landing page structure</p>
          </div>
        </div>
      </section>

      {/* What you will learn */}
      <section className="bg-brand-grayLight border-y border-brand-border">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">What You Will Learn</p>
            <h2 className="text-3xl font-bold text-brand-black">Four skills that transfer everywhere</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-brand-border">
                <div className="w-10 h-10 bg-brand-redLight rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-red" />
                </div>
                <h3 className="font-semibold text-brand-black mb-2">{title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop at a glance */}
      <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">Workshop at a Glance</p>
          <h2 className="text-3xl font-bold text-brand-black">Five sections. Two hours. One live product.</h2>
        </div>
        <div className="border border-brand-border rounded-xl overflow-hidden">
          {sections.map((s, i) => (
            <Link
              key={s.id}
              to={`/curriculum/${s.id}`}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-brand-grayLight transition-colors ${
                i < sections.length - 1 ? 'border-b border-brand-border' : ''
              }`}
            >
              <span className="text-2xl font-bold text-brand-border w-8 shrink-0">{s.number}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-black">{s.title}</p>
                <p className="text-sm text-brand-gray truncate">{s.description}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <span className="text-xs bg-brand-grayLight text-brand-gray font-semibold px-2.5 py-1 rounded-full">
                  {s.duration}
                </span>
              </div>
              <ArrowRight size={16} className="text-brand-gray shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Start CTA */}
      <section className="bg-brand-red">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to build?</h2>
          <p className="text-red-200 mb-8 text-lg">Start with Section 0 and work through at your own pace.</p>
          <Link
            to="/curriculum/section-0"
            className="inline-flex items-center gap-2 bg-white text-brand-red font-semibold px-8 py-3 rounded-full hover:bg-red-50 transition-colors"
          >
            Start with Section 0 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
