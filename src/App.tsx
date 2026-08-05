import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import SolutionPage from './pages/SolutionPage'
import IndustryPage from './pages/IndustryPage'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Admin from './pages/Admin'
import Careers from './pages/Careers'
import LeadModal from './components/LeadModal'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export default function App() {
  // Smooth scrolling is non-essential motion — turn it off when the OS asks.
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.1,
        smoothWheel: !reduceMotion,
        wheelMultiplier: 1,
        anchors: true,
      }}
    >
      <ScrollToTop />
      <LeadModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        {/* the solutions listing lives on the Services page — without this,
            every "/solutions" link fell through to the catch-all and bounced
            back to the homepage */}
        <Route path="/solutions" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ReactLenis>
  )
}
