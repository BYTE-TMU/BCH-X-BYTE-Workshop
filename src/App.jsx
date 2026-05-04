import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import CurriculumOverview from './pages/CurriculumOverview'
import SectionPage from './pages/SectionPage'
import Tools from './pages/Tools'
import Appendix from './pages/Appendix'
import Resources from './pages/Resources'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<CurriculumOverview />} />
          <Route path="/curriculum/:sectionId" element={<SectionPage />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/appendix" element={<Appendix />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
