import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navSolutions = [
  { label: 'Contact Center Solutions', slug: 'contact-center' },
  { label: 'Frontend Development',     slug: 'frontend' },
  { label: 'Backend Development',      slug: 'backend' },
  { label: 'Full Stack Development',   slug: 'fullstack' },
  { label: 'Agentic AI Solutions',     slug: 'agentic-ai' },
  { label: 'AWS Infrastructure',       slug: 'aws' },
  { label: 'DevOps & CI/CD',           slug: 'devops' },
  { label: 'Inventory Management',     slug: 'inventory' },
  null,
  { label: 'Cybersecurity',            slug: 'cybersecurity' },
  { label: 'IT Consulting',            slug: 'consulting' },
]

const navIndustries = [
  { label: 'Healthcare',               href: '/industries/healthcare'          },
  { label: 'Financial Services',       href: '/industries/financial-services'  },
  { label: 'Retail & E-Commerce',      href: '/industries/retail'              },
  { label: 'Government',               href: '/industries/government'          },
  { label: 'Education & EdTech',       href: '/industries/education'           },
  { label: 'Logistics & Supply Chain', href: '/industries/logistics'           },
]

const navResources = [
  { label: 'Blog',        href: '/blog'    },
  { label: 'Contact Us',  href: '/contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [solOpen,    setSolOpen]    = useState(false)
  const [indOpen,    setIndOpen]    = useState(false)
  const [resOpen,    setResOpen]    = useState(false)

  // mobile accordion
  const [mSolOpen, setMSolOpen] = useState(false)
  const [mIndOpen, setMIndOpen] = useState(false)
  const [mResOpen, setMResOpen] = useState(false)

  const location = useLocation()
  const isInner  = location.pathname !== '/'

  const solTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const indTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isInner) { setScrolled(true); return }
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [isInner])

  useEffect(() => {
    setMobileOpen(false)
    setSolOpen(false); setIndOpen(false); setResOpen(false)
    setMSolOpen(false); setMIndOpen(false); setMResOpen(false)
  }, [location.pathname])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const mkHandlers = (
    setOpen: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => ({
    onMouseEnter: () => { if (timer.current) clearTimeout(timer.current); setOpen(true)  },
    onMouseLeave: () => { timer.current = setTimeout(() => setOpen(false), 150) },
  })

  return (
    <nav className={`nav${scrolled || isInner ? ' scrolled' : ''}`} id="nav">
      <div className="nav__inner">

        {/* Logo */}
        <Link to="/" className="nav__logo">
          <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="nav__logo-img" />
          <span className="nav__logo-text">Synerax</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav__links">
          <li className={`nav__dropdown${solOpen ? ' open' : ''}`} {...mkHandlers(setSolOpen, solTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setSolOpen(o => !o)} aria-haspopup="true" aria-expanded={solOpen}>
              Solutions <span className="dropdown-arrow">▾</span>
            </button>
            <ul className="nav__dropdown__menu">
              {navSolutions.map((s, i) =>
                s === null
                  ? <li key={i} className="dropdown-divider" />
                  : <li key={s.slug}><Link to={`/solutions/${s.slug}`}>{s.label}</Link></li>
              )}
            </ul>
          </li>

          <li className={`nav__dropdown${indOpen ? ' open' : ''}`} {...mkHandlers(setIndOpen, indTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setIndOpen(o => !o)} aria-haspopup="true" aria-expanded={indOpen}>
              Industries <span className="dropdown-arrow">▾</span>
            </button>
            <ul className="nav__dropdown__menu">
              {navIndustries.map(ind => (
                <li key={ind.label}><Link to={ind.href}>{ind.label}</Link></li>
              ))}
            </ul>
          </li>

          <li className={`nav__dropdown${resOpen ? ' open' : ''}`} {...mkHandlers(setResOpen, resTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setResOpen(o => !o)} aria-haspopup="true" aria-expanded={resOpen}>
              Resources <span className="dropdown-arrow">▾</span>
            </button>
            <ul className="nav__dropdown__menu">
              {navResources.map(r => (
                <li key={r.label}><Link to={r.href}>{r.label}</Link></li>
              ))}
            </ul>
          </li>

          <li><Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''}>Careers</Link></li>
          <li><Link to="/about"   className={location.pathname === '/about'   ? 'active' : ''}>About</Link></li>
        </ul>

        {/* Email icon */}
        <div className="nav__cta-wrap">
          <Link to="/contact" className="nav__icon-btn" aria-label="Contact us">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`nav__hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && <div className="nav__overlay" onClick={() => setMobileOpen(false)} />}

      {/* Mobile Drawer */}
      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`}>

        {/* Close button */}
        <button className="nav__mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <Link to="/" className="nav__mobile-link">Home</Link>

        {/* Solutions accordion */}
        <button className="nav__mobile-acc" onClick={() => setMSolOpen(o => !o)}>
          Solutions
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: mSolOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {mSolOpen && (
          <div className="nav__mobile-sub">
            {navSolutions.filter(Boolean).map(s => s && (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className="nav__mobile-sublink">{s.label}</Link>
            ))}
          </div>
        )}

        {/* Industries accordion */}
        <button className="nav__mobile-acc" onClick={() => setMIndOpen(o => !o)}>
          Industries
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: mIndOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {mIndOpen && (
          <div className="nav__mobile-sub">
            {navIndustries.map(ind => (
              <Link key={ind.label} to={ind.href} className="nav__mobile-sublink">{ind.label}</Link>
            ))}
          </div>
        )}

        {/* Resources accordion */}
        <button className="nav__mobile-acc" onClick={() => setMResOpen(o => !o)}>
          Resources
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ transform: mResOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {mResOpen && (
          <div className="nav__mobile-sub">
            {navResources.map(r => (
              <Link key={r.label} to={r.href} className="nav__mobile-sublink">{r.label}</Link>
            ))}
          </div>
        )}

        <Link to="/careers" className="nav__mobile-link">Careers</Link>
        <Link to="/about"   className="nav__mobile-link">About</Link>

        <Link to="/contact" className="nav__mobile-cta">Contact Us →</Link>
      </div>
    </nav>
  )
}
