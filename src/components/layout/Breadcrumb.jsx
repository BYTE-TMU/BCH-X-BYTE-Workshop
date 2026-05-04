import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-brand-gray mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-brand-border" />}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-brand-red transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-brand-black font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
