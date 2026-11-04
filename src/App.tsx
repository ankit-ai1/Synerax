import { Routes, Route, useLocation, Navigate, matchPath } from 'react-router-dom'
import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Home from './pages/Home'
import LeadModal from './components/LeadModal'
import SiteLoader from './components/SiteLoader'
import Seo from './components/Seo'
import { lazyPage, type LazyPage } from './lib/lazyPage'

/* The homepage ships in the main bundle; every other page is its own chunk
   (see lib/lazyPage.tsx), so the first load only pays for the page it shows. */
const Services       = lazyPage(() => import('./pages/Services'))
const About          = lazyPage(() => import('./pages/About'))
const Contact        = lazyPage(() => import('./pages/Contact'))
const SolutionPage   = lazyPage(() => import('./pages/SolutionPage'))
const IndustryPage   = lazyPage(() => import('./pages/IndustryPage'))
const Blog           = lazyPage(() => import('./pages/Blog'))
const BlogPost       = lazyPage(() => import('./pages/BlogPost'))
const PrivacyPolicy  = lazyPage(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazyPage(() => import('./pages/TermsOfService'))
const Admin          = lazyPage(() => import('./pages/Admin'))
const Careers        = lazyPage(() => import('./pages/Careers'))

const lazyRoutes: [string, LazyPage][] = [
  ['/services', Services],
  ['/solutions', Services],
  ['/about', About],
  ['/contact', Contact],
  ['/solutions/:slug', SolutionPage],
  ['/industries/:slug', IndustryPage],
  ['/blog', Blog],
  ['/blog/:slug', BlogPost],
  ['/privacy-policy', PrivacyPolicy],
  ['/terms-of-service', TermsOfService],
  ['/admin', Admin],
  ['/careers', Careers],
]

/** Loads the chunk for `pathname` (if it is a split route). */
export function preloadRoute(pathname: string): Promise<void> {
  const hit = lazyRoutes.find(([path]) => matchPath(path, pathname))
  return hit ? hit[1].preload() : Promise.resolve()
}

/** Loads every page chunk — the prerender needs all of them up front. */
export function preloadAllRoutes(): Promise<void> {
  return Promise.all(lazyRoutes.map(([, page]) => page.preload())).then(() => undefined)
}

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
      <SiteLoader />
      <Seo />
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
