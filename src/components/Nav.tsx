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
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [solOpen,       setSolOpen]       = useState(false)
  const [indOpen,       setIndOpen]       = useState(false)
  const [resOpen,       setResOpen]       = useState(false)
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
    setSolOpen(false)
    setIndOpen(false)
    setResOpen(false)
  }, [location.pathname])

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

        {/* ── LEFT: Logo ── */}
        <Link to="/" className="nav__logo">
          <span className="logo-mark">S</span>
          <span className="logo-text">SYNERAX</span>
        </Link>

        {/* ── CENTER: Nav links ── */}
        <ul className="nav__links">

          {/* Solutions ▾ */}
          <li
            className={`nav__dropdown${solOpen ? ' open' : ''}`}
            {...mkHandlers(setSolOpen, solTimer)}
          >
            <button
              className="nav__dropdown-trigger"
              onClick={() => setSolOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={solOpen}
            >
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

          {/* Industries ▾ */}
          <li
            className={`nav__dropdown${indOpen ? ' open' : ''}`}
            {...mkHandlers(setIndOpen, indTimer)}
          >
            <button
              className="nav__dropdown-trigger"
              onClick={() => setIndOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={indOpen}
            >
              Industries <span className="dropdown-arrow">▾</span>
            </button>
            <ul className="nav__dropdown__menu">
              {navIndustries.map(ind => (
                <li key={ind.label}>
                  <Link to={ind.href}>{ind.label}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Resources ▾ (Blog + Contact) */}
          <li
            className={`nav__dropdown${resOpen ? ' open' : ''}`}
            {...mkHandlers(setResOpen, resTimer)}
          >
            <button
              className="nav__dropdown-trigger"
              onClick={() => setResOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={resOpen}
            >
              Resources <span className="dropdown-arrow">▾</span>
            </button>
            <ul className="nav__dropdown__menu">
              {navResources.map(r => (
                <li key={r.label}>
                  <Link to={r.href}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* About */}
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>

        </ul>

        {/* ── RIGHT: Email icon ── */}
        <div className="nav__cta-wrap">
          <Link to="/contact" className="nav__icon-btn" aria-label="Contact us">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </Link>
        </div>

        {/* ── HAMBURGER (mobile) ── */}
        <button className="nav__hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>

      </div>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        <div className="nav__mobile-section">Solutions</div>
        {navSolutions.filter(Boolean).map(s => s && (
          <Link key={s.slug} to={`/solutions/${s.slug}`}>→ {s.label}</Link>
        ))}
        <div className="nav__mobile-section">Industries</div>
        {navIndustries.map(ind => (
          <Link key={ind.label} to={ind.href}>→ {ind.label}</Link>
        ))}
        <div className="nav__mobile-section">Resources</div>
        {navResources.map(r => (
          <Link key={r.label} to={r.href}>→ {r.label}</Link>
        ))}
        <Link to="/about">About</Link>
      </div>
    </nav>
  )
}
