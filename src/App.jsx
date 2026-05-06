import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'
import Home from './pages/Home'
import CurriculumOverview from './pages/CurriculumOverview'
import SectionPage from './pages/SectionPage'
import Tools from './pages/Tools'
import Appendix from './pages/Appendix'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <AnimatedRoutes />
      </div>
      <Footer />
    </div>
  )
}
