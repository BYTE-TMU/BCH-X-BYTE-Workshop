import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black mt-20">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-white mb-2">BCH x BYTE</p>
            <p className="text-sm text-brand-gray leading-relaxed">
              BYTE (Build Your Technical Experience) is TMU&apos;s student-led organization that bridges the gap between academics and industry.
            </p>
            <p className="text-sm text-brand-gray mt-3 font-medium">BCH x BYTE. Let&apos;s build.</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4">Curriculum</p>
            <div className="space-y-2">
              <Link to="/curriculum" className="block text-sm text-brand-gray hover:text-white transition-colors">Overview</Link>
              {[0,1,2,3,4].map((n) => (
                <Link key={n} to={`/curriculum/section-${n}`} className="block text-sm text-brand-gray hover:text-white transition-colors">
                  Section {n}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-4">Past Projects</p>
            <div className="space-y-3 text-sm text-brand-gray">
              <p><span className="text-white font-medium">Yapp</span>: campus event and waypoint discovery platform for verified TMU students, launched Demo Day March 27, 2025.</p>
              <p><span className="text-white font-medium">SecureBYTE</span>: AI-powered Python vulnerability scanner with LLM-powered explanations, demoed at Fall 2025 Demo Event.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-gray">
          <p>© {new Date().getFullYear()} BYTE, TMU. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
            <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
