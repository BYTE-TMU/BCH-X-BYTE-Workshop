import { useState } from 'react'
import { Mail, Linkedin } from 'lucide-react'
import { teamMembers } from '../data/teamData'
import Breadcrumb from '../components/layout/Breadcrumb'

function Avatar({ src, name, size = 'lg' }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  const sizeClass = size === 'lg'
    ? 'w-28 h-28 sm:w-32 sm:h-32 text-2xl'
    : 'w-20 h-20 text-lg'

  if (failed || !src) {
    return (
      <div className={`${sizeClass} rounded-full bg-brand-grayLight border border-brand-border flex items-center justify-center font-bold text-brand-gray shrink-0`}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`${sizeClass} rounded-full object-cover object-top border border-brand-border shrink-0`}
    />
  )
}

const orgs = [
  {
    label: 'Business Career Hub (BCH)',
    description:
      'The Business Career Hub (BCH) at the Ted Rogers School of Management supports students through career coaching, industry-led workshops, technical bootcamps, and Canada\'s largest business co-op program. BCH connects students with leading employers and equips them with the skills to compete in today\'s job market.',
  },
  {
    label: 'TMU BYTE',
    description:
      'BYTE (Build Your Technical Experience) is TMU\'s first project-based AI lab. Structured like a real workplace, members take on distinct roles and collaborate on a new project each semester. With a team spanning Computer Science, Engineering, and Business, BYTE bridges classroom learning with hands-on industry experience.',
  },
  {
    label: 'The Collaboration',
    description:
      'BCH and BYTE are coming together to bring you a hands-on workshop at the intersection of business and technology. This event is designed for students who want practical exposure to the AI tools shaping the modern workplace, backed by two of TMU\'s most active student-facing organizations.',
  },
]

export default function Contact() {
  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Contact' }]} />

      {/* About section */}
      <h1 className="text-4xl font-bold text-brand-black mb-2">About</h1>
      <p className="text-brand-gray leading-relaxed mb-8 max-w-2xl">
        Two of TMU's most active student organizations, one workshop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        {orgs.map((org) => (
          <div key={org.label} className="bg-brand-grayLight rounded-2xl p-6 border border-brand-border">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-red mb-3">{org.label}</h2>
            <p className="text-brand-gray text-sm leading-relaxed">{org.description}</p>
          </div>
        ))}
      </div>

      {/* Team section */}
      <h2 className="text-3xl font-bold text-brand-black mb-2">Meet the Team</h2>
      <p className="text-brand-gray leading-relaxed mb-10 max-w-2xl">
        Reach out directly with questions about the curriculum, partnership, or getting involved.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-brand-red/40 hover:shadow-sm transition-all duration-250"
          >
            <Avatar src={member.image} name={member.name} />

            <div className="mt-5 mb-1">
              <h2 className="text-lg font-bold text-brand-black leading-tight">{member.name}</h2>
            </div>

            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-red bg-brand-redLight px-3 py-1 rounded-full mb-5">
              {member.role}
            </span>

            <div className="flex flex-col gap-2 w-full mt-auto">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-2 w-full text-sm font-medium text-brand-black bg-brand-grayLight hover:bg-brand-border rounded-lg px-4 py-2.5 transition-colors"
                >
                  <Mail size={14} />
                  Email
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-sm font-medium text-white bg-brand-black hover:bg-[#1a1a1a]/80 rounded-lg px-4 py-2.5 transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
