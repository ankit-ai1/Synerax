import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navSolutions = [
  { label: 'Frontend Development', slug: 'frontend',      color: '#7C3AED', bg: '#F3EEFF', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="12" rx="2"/><path d="M8 19h4M10 15v4"/><path d="M6 9l3 3-3 3M13 14h-2"/></svg> },
  { label: 'Backend Development',  slug: 'backend',       color: '#0891B2', bg: '#E0F7FA', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="5" rx="1.5"/><rect x="2" y="11" width="16" height="5" rx="1.5"/><circle cx="5.5" cy="5.5" r="1" fill="currentColor"/><circle cx="5.5" cy="13.5" r="1" fill="currentColor"/></svg> },
  { label: 'Full Stack & Mobile',  slug: 'fullstack',     color: '#1A56DB', bg: '#EEF4FF', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="8" height="14" rx="2"/><rect x="9" y="3.5" width="4" height="8" rx="0.5"/><circle cx="11" cy="14" r="0.8" fill="currentColor"/><path d="M3 7l2 2-2 2"/></svg> },
  { label: 'Agentic AI Solutions', slug: 'agentic-ai',    color: '#D97706', bg: '#FFF8E1', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="2.5"/><path d="M10 3v1M10 16v1M3 10h1M16 10h1"/></svg> },
  { label: 'AWS Infrastructure',   slug: 'aws',           color: '#059669', bg: '#ECFDF5', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c0-3.866 3.134-7 7-7s7 3.134 7 7"/><path d="M1 14h4l1.5-5 2 7 2-9 1.5 7H19"/></svg> },
  { label: 'DevOps & CI/CD',       slug: 'devops',        color: '#DC2626', bg: '#FEF2F2', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3l-5 5M8 12l-5 5"/><path d="M17 3h-5M17 3v5"/><path d="M3 17h5M3 17v-5"/><circle cx="10" cy="10" r="2"/></svg> },
  { label: 'Cybersecurity',        slug: 'cybersecurity', color: '#0891B2', bg: '#E0F7FA', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L3 5.5v5c0 4 3 7.2 7 8 4-.8 7-4 7-8v-5L10 2z"/><path d="M7 10l2 2 4-4"/></svg> },
  { label: 'Contact Center',       slug: 'contact-center',color: '#7C3AED', bg: '#F3EEFF', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h3l1.5 4-2 1.25a10 10 0 004.25 4.25L14 10.5l4 1.5v3a2 2 0 01-2 2C8.16 17 3 11.84 3 5.5"/></svg> },
  { label: 'Inventory Management', slug: 'inventory',     color: '#D97706', bg: '#FFF8E1', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="14" height="11" rx="1.5"/><path d="M7 7V5a3 3 0 016 0v2"/><path d="M7 12h6M7 15h4"/></svg> },
  { label: 'IT Consulting',        slug: 'consulting',    color: '#059669', bg: '#ECFDF5', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="7" r="3.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7"/><path d="M14 11l3 2M17 11l-3 2"/></svg> },
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
          <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="nav__logo-img" />
          <span className="nav__logo-text">Synerax</span>
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
          <Link to="/contact" className="nav__icon-btn" aria-label="Contact us">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </Link>
        </div>

        <button className={`nav__hamburger${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`}>
        <div className="nav__mobile-topbar">
          <Link to="/" className="nav__logo" onClick={() => setMobileOpen(false)}>
            <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="nav__logo-img" />
            <span className="nav__logo-text">Synerax</span>
          </Link>
          <div className="nav__mobile-topbar-right">
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
          <button className={`nav__mobile-acc${mSolOpen ? ' open' : ''}`} onClick={() => setMSolOpen(o => !o)}>
            <span className="nav__mobile-tri">{mSolOpen ? '▼' : '▶'}</span> Solutions
          </button>
          {mSolOpen && (
            <div className="nav__mobile-sub">
              {navSolutions.map(s => (
                <Link key={s.slug} to={`/solutions/${s.slug}`} className="nav__mobile-sublink">{s.label}</Link>
              ))}
            </div>
          )}
          <button className={`nav__mobile-acc${mIndOpen ? ' open' : ''}`} onClick={() => setMIndOpen(o => !o)}>
            <span className="nav__mobile-tri">{mIndOpen ? '▼' : '▶'}</span> Industries
          </button>
          {mIndOpen && (
            <div className="nav__mobile-sub">
              {navIndustries.map(i => (
                <Link key={i.label} to={i.href} className="nav__mobile-sublink">{i.label}</Link>
              ))}
            </div>
          )}
          <button className={`nav__mobile-acc${mResOpen ? ' open' : ''}`} onClick={() => setMResOpen(o => !o)}>
            <span className="nav__mobile-tri">{mResOpen ? '▼' : '▶'}</span> Resources
          </button>
          {mResOpen && (
            <div className="nav__mobile-sub">
              {navResources.map(r => (
                <Link key={r.label} to={r.href} className="nav__mobile-sublink">{r.label}</Link>
              ))}
            </div>
          )}
          <Link to="/careers" className="nav__mobile-link"><span className="nav__mobile-tri">▶</span>Careers</Link>
          <Link to="/about"   className="nav__mobile-link"><span className="nav__mobile-tri">▶</span>About</Link>
        </div>
      </div>
    </nav>
  )
}
