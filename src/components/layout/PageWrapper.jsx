import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'

export default function PageWrapper({ children, withSidebar = false }) {
  const location = useLocation()
  const showSidebar = withSidebar && location.pathname.startsWith('/curriculum')

  if (showSidebar) {
    return (
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-12">
          <Sidebar />
          <main className="flex-1 min-w-0 max-w-content">{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <main>{children}</main>
    </div>
  )
}
