import { useState } from 'react'
import { Mail, Linkedin } from 'lucide-react'
import { teamMembers } from '../data/teamData'
import { orgs } from '../data/orgs'
import Breadcrumb from '../components/layout/Breadcrumb'

function Avatar({ src, name, size = 'lg' }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  const sizeClass = size === 'lg'
    ? 'w-28 h-28 sm:w-32 sm:h-32 text-2xl'
    : 'w-20 h-20 text-body-lg'

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
      // The rendered box is square regardless of the source aspect ratio, so
      // these reserve the right space and stop the grid jumping as photos land.
      width="128"
      height="128"
      loading="lazy"
      decoding="async"
      className={`${sizeClass} rounded-full object-cover object-top border border-brand-border shrink-0`}
    />
  )
}

export default function Contact() {
  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb crumbs={[{ to: '/', label: 'Home' }, { label: 'Contact' }]} />

      {/* About section */}
      <h1 className="text-h1 font-bold text-brand-black mb-2">About</h1>
      <p className="text-brand-gray leading-relaxed mb-8 max-w-2xl">
        Two of TMU's most active student organizations, one workshop.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        {orgs.map((org) => (
          <div key={org.id} className="bg-brand-grayLight rounded-2xl p-6 border border-brand-border">
            {org.logo && (
              // Partner logos are fixed artwork drawn for a light background — the
              // BCH wordmark is near-black and disappears on a dark card. Giving
              // them a light plate in dark mode keeps the marks correct rather
              // than recolouring somebody else's brand.
              <img
                src={org.logo}
                alt=""
                width="160"
                height="36"
                loading="lazy"
                decoding="async"
                className="h-9 w-auto mb-4 object-contain object-left dark:bg-white dark:rounded-md dark:px-2 dark:py-1 dark:box-content"
              />
            )}
            <h2 className="text-eyebrow uppercase text-brand-red mb-3">{org.label}</h2>
            <p className="text-brand-gray text-small leading-relaxed">{org.description}</p>
          </div>
        ))}
      </div>

      {/* Team section */}
      <h2 className="text-h2 font-bold text-brand-black mb-2">Meet the Team</h2>
      <p className="text-brand-gray leading-relaxed mb-10 max-w-2xl">
        Reach out directly with questions about the curriculum, partnership, or getting involved.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-surface-raised border border-brand-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-brand-red/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-250"
          >
            <Avatar src={member.image} name={member.name} />

            <div className="mt-5 mb-1">
              <h2 className="text-body-lg font-bold text-brand-black leading-tight">{member.name}</h2>
            </div>

            <span className="inline-block text-eyebrow uppercase text-brand-red bg-brand-redLight px-3 py-1 rounded-full mb-5">
              {member.role}
            </span>

            <div className="flex flex-col gap-2 w-full mt-auto">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center justify-center gap-2 w-full text-small font-medium text-brand-black bg-brand-grayLight hover:bg-brand-border rounded-lg px-4 py-2.5 transition-colors"
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
                  className="pressable flex items-center justify-center gap-2 w-full text-small font-medium text-surface-base bg-ink hover:bg-ink/80 rounded-lg px-4 py-2.5 transition-colors"
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
