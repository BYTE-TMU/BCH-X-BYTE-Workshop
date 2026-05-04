import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl font-bold text-brand-border mb-4">404</p>
      <h1 className="text-2xl font-bold text-brand-black mb-2">Page not found</h1>
      <p className="text-brand-gray mb-8">This page does not exist or has been moved.</p>
      <Link
        to="/"
        className="bg-brand-red text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
