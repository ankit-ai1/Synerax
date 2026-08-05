import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Logo from './Logo'

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className={`nav__theme ${className}`.trim()}
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <span className="nav__theme-track" aria-hidden="true">
        <span className="nav__theme-knob">
          {/* sun */}
          <svg className="nav__theme-ico nav__theme-ico--sun" width="12" height="12" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
          {/* moon */}
          <svg className="nav__theme-ico nav__theme-ico--moon" width="12" height="12" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
          </svg>
        </span>
      </span>
    </button>
  )
}

/* Dropdown order is column-major: items 1–4 fill the left column,
   items 5–8 the right, matching the two-column mega-menu grid. */
const navSolutions = [
  { label: 'Web & Enterprise Applications', slug: 'web-enterprise-applications', color: '#7C3AED', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="14" rx="2"/><path d="M2 7.5h16M5 5.2h.01M7.4 5.2h.01M5 11h4M5 14h6"/></svg> },
  { label: 'DevSecOps & FinOps',            slug: 'devsecops-finops',            color: '#DC2626', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="5" r="2"/><circle cx="5" cy="15" r="2"/><path d="M5 7v6"/><path d="M14 4v12M12 6.5h3.4a1.6 1.6 0 010 3.2h-2.8a1.6 1.6 0 000 3.3H16"/></svg> },
  { label: 'Cybersecurity Solutions',       slug: 'cybersecurity',               color: '#0891B2', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L3 5.5v5c0 4 3 7.2 7 8 4-.8 7-4 7-8v-5L10 2z"/><path d="M7 10l2 2 4-4"/></svg> },
  { label: 'Agentic AI Solutions',          slug: 'agentic-ai',                  color: '#D97706', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="12" height="9" rx="2"/><path d="M10 3v3M7.5 10h.01M12.5 10h.01M8 13h4M2 9v3M18 9v3"/></svg> },

  { label: 'Cloud Engineering & Migration', slug: 'cloud-engineering-migration', color: '#059669', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15h8.5a3.5 3.5 0 100-7 5 5 0 00-9.6 1.4A3.3 3.3 0 006 15z"/></svg> },
  { label: 'Observability, SRE & Production Engineering', slug: 'observability-sre', color: '#7C3AED', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 11h3l2.5-6 3 12L13 11h5"/></svg> },
  { label: 'Application Modernization',     slug: 'application-modernization',   color: '#0891B2', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8a7 7 0 00-12-3L3 7"/><path d="M3 3v4h4"/><path d="M3 12a7 7 0 0012 3l2-2"/><path d="M17 17v-4h-4"/></svg> },
  { label: 'IT Service Management (ITSM)',  slug: 'itsm',                        color: '#D97706', bg: '#1C1C1F', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7.5a2 2 0 010-3V4a1 1 0 011-1h14a1 1 0 011 1v.5a2 2 0 010 3v5a2 2 0 010 3v.5a1 1 0 01-1 1H3a1 1 0 01-1-1v-.5a2 2 0 010-3z"/><path d="M8 7h6M8 13h4"/></svg> },
]

const navIndustries = [
  { label: 'Healthcare',               href: '/industries/healthcare',         icon: '🏥' },
  { label: 'Financial Services',       href: '/industries/financial-services', icon: '💳' },
  { label: 'Retail & E-Commerce',      href: '/industries/retail',             icon: '🛒' },
  { label: 'Government',               href: '/industries/government',         icon: '🏛️' },
  { label: 'Education & EdTech',       href: '/industries/education',          icon: '🎓' },
  { label: 'Logistics & Supply Chain', href: '/industries/logistics',          icon: '🚚' },
]

const navResources = [
  { label: 'Blog & Insights',  href: '/blog',    icon: '📝' },
  { label: 'Case Studies',     href: '/blog',    icon: '📊' },
  { label: 'Contact Us',       href: '/contact', icon: '📧' },
  { label: 'About Synerax',    href: '/about',   icon: '🏢' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [solOpen,    setSolOpen]    = useState(false)
  const [indOpen,    setIndOpen]    = useState(false)
  const [resOpen,    setResOpen]    = useState(false)

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

        <Link to="/" className="nav__logo">
          <Logo />
        </Link>

        <ul className="nav__links">

          {/* ── Solutions ── */}
          <li className={`nav__dropdown${solOpen ? ' open' : ''}`} {...mkHandlers(setSolOpen, solTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setSolOpen(o => !o)}>
              Solutions <span className="dropdown-arrow">▾</span>
            </button>
            <div className="nav__mega nav__mega--solutions">
              <div className="nav__mega-top">
                <span className="nav__mega-eyebrow">Our Solutions</span>
              </div>
              <div className="nav__mega-grid">
                {navSolutions.map(item => (
                  <Link key={item.slug} to={`/solutions/${item.slug}`} className="nav__sol-item">
                    <span className="nav__sol-icon" style={{ background: item.bg, color: item.color }}>
                      {item.icon}
                    </span>
                    <span className="nav__sol-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* ── Industries ── */}
          <li className={`nav__dropdown${indOpen ? ' open' : ''}`} {...mkHandlers(setIndOpen, indTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setIndOpen(o => !o)}>
              Industries <span className="dropdown-arrow">▾</span>
            </button>
            <div className="nav__mega nav__mega--industries">
              <div className="nav__mega-top">
                <span className="nav__mega-eyebrow">Sectors We Serve</span>
              </div>
              <div className="nav__mega-grid">
                {navIndustries.map(item => (
                  <Link key={item.label} to={item.href} className="nav__ind-item">
                    <span className="nav__ind-emoji">{item.icon}</span>
                    <span className="nav__sol-title">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {/* ── Resources ── */}
          <li className={`nav__dropdown${resOpen ? ' open' : ''}`} {...mkHandlers(setResOpen, resTimer)}>
            <button className="nav__dropdown-trigger" onClick={() => setResOpen(o => !o)}>
              Resources <span className="dropdown-arrow">▾</span>
            </button>
            <div className="nav__mega nav__mega--resources">
              <div className="nav__mega-top">
                <span className="nav__mega-eyebrow">Explore</span>
              </div>
              {navResources.map(item => (
                <Link key={item.label} to={item.href} className="nav__ind-item">
                  <span className="nav__ind-emoji">{item.icon}</span>
                  <span className="nav__sol-title">{item.label}</span>
                </Link>
              ))}
            </div>
          </li>

          <li><Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''}>Careers</Link></li>
          <li><Link to="/about"   className={location.pathname === '/about'   ? 'active' : ''}>About</Link></li>

        </ul>

        <div className="nav__cta-wrap">
          <ThemeToggle />
          <Link to="/contact" className="nav__contact-btn">Contact</Link>
          <button className={`nav__hamburger${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      <div className={`nav__mobile-backdrop${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`}>
        <div className="nav__mobile-topbar">
          <Link to="/" className="nav__logo" onClick={() => setMobileOpen(false)}>
            <Logo />
          </Link>
          <div className="nav__mobile-topbar-right">
            <ThemeToggle />
            <Link to="/contact" className="nav__icon-btn" onClick={() => setMobileOpen(false)} aria-label="Contact">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
              </svg>
            </Link>
            <button className="nav__mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="nav__mobile-body">
          <div className="nav__mobile-list">

            <div className="nav__mobile-row" style={{ ['--i' as string]: 0 }}>
              <button className={`nav__mobile-acc${mSolOpen ? ' open' : ''}`} onClick={() => setMSolOpen(o => !o)}>
                <span className="nav__mobile-acc-left">
                  <span className="nav__mobile-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                  </span>
                  Solutions
                </span>
                <svg className="nav__mobile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </button>
              <div className={`nav__mobile-sub-wrap${mSolOpen ? ' open' : ''}`}>
                <div className="nav__mobile-sub-inner">
                  <div className="nav__mobile-sub">
                    {navSolutions.map(s => (
                      <Link key={s.slug} to={`/solutions/${s.slug}`} className="nav__mobile-sublink" onClick={() => setMobileOpen(false)}>
                        <span className="nav__mobile-sublink-dot" style={{ background: s.color }} />
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nav__mobile-row" style={{ ['--i' as string]: 1 }}>
              <button className={`nav__mobile-acc${mIndOpen ? ' open' : ''}`} onClick={() => setMIndOpen(o => !o)}>
                <span className="nav__mobile-acc-left">
                  <span className="nav__mobile-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/></svg>
                  </span>
                  Industries
                </span>
                <svg className="nav__mobile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </button>
              <div className={`nav__mobile-sub-wrap${mIndOpen ? ' open' : ''}`}>
                <div className="nav__mobile-sub-inner">
                  <div className="nav__mobile-sub">
                    {navIndustries.map(i => (
                      <Link key={i.label} to={i.href} className="nav__mobile-sublink" onClick={() => setMobileOpen(false)}>
                        <span className="nav__mobile-sublink-emoji">{i.icon}</span>
                        {i.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nav__mobile-row" style={{ ['--i' as string]: 2 }}>
              <button className={`nav__mobile-acc${mResOpen ? ' open' : ''}`} onClick={() => setMResOpen(o => !o)}>
                <span className="nav__mobile-acc-left">
                  <span className="nav__mobile-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h11a1 1 0 011 1v14a1 1 0 01-1 1H6a2 2 0 00-2 2V5z"/><path d="M4 19a2 2 0 002 2h12"/></svg>
                  </span>
                  Resources
                </span>
                <svg className="nav__mobile-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </button>
              <div className={`nav__mobile-sub-wrap${mResOpen ? ' open' : ''}`}>
                <div className="nav__mobile-sub-inner">
                  <div className="nav__mobile-sub">
                    {navResources.map(r => (
                      <Link key={r.label} to={r.href} className="nav__mobile-sublink" onClick={() => setMobileOpen(false)}>
                        <span className="nav__mobile-sublink-emoji">{r.icon}</span>
                        {r.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nav__mobile-row" style={{ ['--i' as string]: 3 }}>
              <Link to="/careers" className="nav__mobile-link" onClick={() => setMobileOpen(false)}>
                <span className="nav__mobile-acc-left">
                  <span className="nav__mobile-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  </span>
                  Careers
                </span>
              </Link>
            </div>
            <div className="nav__mobile-row" style={{ ['--i' as string]: 4 }}>
              <Link to="/about" className="nav__mobile-link" onClick={() => setMobileOpen(false)}>
                <span className="nav__mobile-acc-left">
                  <span className="nav__mobile-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>
                  </span>
                  About
                </span>
              </Link>
            </div>

          </div>

          <Link to="/contact" className="nav__mobile-cta-btn" onClick={() => setMobileOpen(false)}>
            Get a Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}
