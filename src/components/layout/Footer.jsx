import { Link } from 'react-router-dom'
import { sections } from '../../data/curriculum'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-inverse mt-20 print:hidden">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-ink-inverse mb-2">BCH x BYTE</p>
            <p className="text-small text-ink-inverseDim leading-relaxed">
              BYTE (Build Your Technical Experience) is TMU&apos;s student-led organization that bridges the gap between academics and industry.
            </p>
            <p className="text-small text-ink-inverseDim mt-3 font-medium">BCH x BYTE. Let&apos;s build.</p>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-ink-inverseDim mb-4">Curriculum</p>
            <div className="space-y-2">
              <Link to="/curriculum" className="pressable block text-small text-ink-inverseDim hover:text-ink-inverse transition-colors">Overview</Link>
              {sections.map((s) => (
                <Link key={s.id} to={`/curriculum/${s.id}`} className="pressable block text-small text-ink-inverseDim hover:text-ink-inverse transition-colors">
                  Section {s.number}
                </Link>
              ))}
              <Link to="/appendix" className="pressable block text-small text-ink-inverseDim hover:text-ink-inverse transition-colors pt-1">FAQ</Link>
            </div>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-ink-inverseDim mb-4">Past Projects</p>
            <div className="space-y-3 text-small text-ink-inverseDim">
              <p><span className="text-ink-inverse font-medium">Yapp</span>: campus event and waypoint discovery platform for verified TMU students, launched at Demo Day in March 2026.</p>
              <p><span className="text-ink-inverse font-medium">SecureBYTE</span>: AI-powered Python vulnerability scanner with LLM-powered explanations, demoed at the Fall 2025 Demo Event.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-ink-inverse/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-ink-inverseDim">
          <p>© {new Date().getFullYear()} BYTE, TMU. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/tools" className="pressable hover:text-ink-inverse transition-colors">Tools</Link>
            <Link to="/resources" className="pressable hover:text-ink-inverse transition-colors">Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
