import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CommandPalette from './components/ui/CommandPalette'
import { useScrollReveal } from './hooks/useScrollReveal'
import Home from './pages/Home'
import CurriculumOverview from './pages/CurriculumOverview'
import SectionPage from './pages/SectionPage'
import Tools from './pages/Tools'
import Appendix from './pages/Appendix'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import Facilitator from './pages/Facilitator'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  useScrollReveal()
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/curriculum" element={<CurriculumOverview />} />
        <Route path="/curriculum/:sectionId" element={<SectionPage />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/appendix" element={<Appendix />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/facilitator" element={<Facilitator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  // ⌘K / Ctrl-K opens search from anywhere, except while typing in a field.
  useEffect(() => {
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if ((e.metaKey || e.ctrlKey) && key === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
        return
      }
      if (key === '/' && !e.metaKey && !e.ctrlKey) {
        const tag = document.activeElement?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <div className="flex-1">
        <AnimatedRoutes />
      </div>
      <Footer />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
