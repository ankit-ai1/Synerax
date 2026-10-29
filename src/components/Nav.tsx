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
  { label: 'Web & Enterprise Applications', slug: 'web-enterprise-applications', color: '#7C3AED', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="14" rx="2"/><path d="M2 7.5h16M5 5.2h.01M7.4 5.2h.01M5 11h4M5 14h6"/></svg> },
  { label: 'DevSecOps & FinOps',            slug: 'devsecops-finops',            color: '#DC2626', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="5" r="2"/><circle cx="5" cy="15" r="2"/><path d="M5 7v6"/><path d="M14 4v12M12 6.5h3.4a1.6 1.6 0 010 3.2h-2.8a1.6 1.6 0 000 3.3H16"/></svg> },
  { label: 'Agentic AI Solutions',          slug: 'agentic-ai',                  color: '#D97706', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="12" height="9" rx="2"/><path d="M10 3v3M7.5 10h.01M12.5 10h.01M8 13h4M2 9v3M18 9v3"/></svg> },

  { label: 'Cloud Engineering & Migration', slug: 'cloud-engineering-migration', color: '#059669', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15h8.5a3.5 3.5 0 100-7 5 5 0 00-9.6 1.4A3.3 3.3 0 006 15z"/></svg> },
  { label: 'Observability, SRE & Production Engineering', slug: 'observability-sre', color: '#7C3AED', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 11h3l2.5-6 3 12L13 11h5"/></svg> },
  { label: 'Application Modernization',     slug: 'application-modernization',   color: '#0891B2', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8a7 7 0 00-12-3L3 7"/><path d="M3 3v4h4"/><path d="M3 12a7 7 0 0012 3l2-2"/><path d="M17 17v-4h-4"/></svg> },
  { label: 'IT Service Management (ITSM)',  slug: 'itsm',                        color: '#D97706', bg: '#1a2b48', icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7.5a2 2 0 010-3V4a1 1 0 011-1h14a1 1 0 011 1v.5a2 2 0 010 3v5a2 2 0 010 3v.5a1 1 0 01-1 1H3a1 1 0 01-1-1v-.5a2 2 0 010-3z"/><path d="M8 7h6M8 13h4"/></svg> },
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

/* ── Desktop mega-menu content ─────────────────────────────── */
const ico = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)

type MegaItem = { color: string; label: string; desc: string; to: string; icon: React.ReactNode }
type MegaFeature = { title: string; desc: string; cta: string; to: string }

const megaSolutions: MegaItem[] = [
  { color: '#1b6fe8', label: 'Web & Enterprise Apps', desc: 'Platforms engineered to scale',      to: '/solutions/web-enterprise-applications', icon: ico(<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>) },
  { color: '#0ea5e9', label: 'Cloud & Migration',     desc: 'AWS, Azure, GCP — zero downtime',     to: '/solutions/cloud-engineering-migration', icon: ico(<path d="M7 18h10.5a4 4 0 00.6-7.96A6 6 0 006.3 9.2 4.4 4.4 0 007 18z" />) },
  { color: '#6366f1', label: 'Agentic AI',            desc: 'Agents that do real work',            to: '/solutions/agentic-ai',                  icon: ico(<><rect x="4" y="7" width="16" height="12" rx="3" /><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6" /></>) },
  { color: '#8b5cf6', label: 'DevSecOps & FinOps',    desc: 'Ship safely, spend less',             to: '/solutions/devsecops-finops',            icon: ico(<><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><path d="M6 8.2v7.6M17 4v16M14.5 7h4a2 2 0 010 4h-3a2 2 0 000 4h4" /></>) },
  { color: '#0891b2', label: 'Observability & SRE',   desc: 'SLOs, tracing, calm on-call',         to: '/solutions/observability-sre',           icon: ico(<path d="M3 12h4l2.5-6 5 12 2.5-6H21" />) },
  { color: '#2563eb', label: 'App Modernization',     desc: 'Monolith to services, no freeze',     to: '/solutions/application-modernization',   icon: ico(<><path d="M20 8a8 8 0 00-14-3L4 7" /><path d="M4 3v4h4" /><path d="M4 16a8 8 0 0014 3l2-2" /><path d="M20 21v-4h-4" /></>) },
  { color: '#06b6d4', label: 'IT Service Management', desc: 'ITIL desks that run themselves',      to: '/solutions/itsm',                        icon: ico(<><path d="M4 7h16v10H4z" /><path d="M8 7V5h8v2M9 12h6" /></>) },
]

const megaIndustries: MegaItem[] = [
  { color: '#1b6fe8', label: 'Healthcare',               desc: 'HIPAA-ready clinical systems',  to: '/industries/healthcare',         icon: ico(<><path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z" /><path d="M9 12h6M12 9v6" /></>) },
  { color: '#0ea5e9', label: 'Financial Services',       desc: 'Resilient, compliant fintech',  to: '/industries/financial-services', icon: ico(<><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18M7 15h4" /></>) },
  { color: '#6366f1', label: 'Retail & E-Commerce',      desc: 'Commerce that handles peak',    to: '/industries/retail',             icon: ico(<><path d="M5 7h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8z" /><path d="M9 7V6a3 3 0 016 0v1" /></>) },
  { color: '#14b8a6', label: 'Government',               desc: 'Secure citizen services',       to: '/industries/government',         icon: ico(<><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" /></>) },
  { color: '#8b5cf6', label: 'Education & EdTech',       desc: 'Learning platforms at scale',   to: '/industries/education',          icon: ico(<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5" /></>) },
  { color: '#0891b2', label: 'Logistics & Supply Chain', desc: 'Real-time, end-to-end tracking', to: '/industries/logistics',         icon: ico(<><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></>) },
]

const megaResources: MegaItem[] = [
  { color: '#1b6fe8', label: 'Blog & Insights', desc: 'Playbooks from our engineers', to: '/blog',    icon: ico(<><path d="M5 4h11l3 3v13H5z" /><path d="M9 10h6M9 14h6M9 18h3" /></>) },
  { color: '#0ea5e9', label: 'Case Studies',    desc: 'Outcomes we have shipped',     to: '/blog',    icon: ico(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>) },
  { color: '#6366f1', label: 'About Synerax',   desc: 'Who we are and how we work',   to: '/about',   icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>) },
  { color: '#14b8a6', label: 'Contact Us',      desc: 'Talk to a senior engineer',    to: '/contact', icon: ico(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 8l9 6 9-6" /></>) },
  { color: '#8b5cf6', label: 'Careers',         desc: 'Join a remote senior team',    to: '/careers', icon: ico(<><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M3 13h18" /></>) },
  { color: '#0891b2', label: 'All Solutions',   desc: 'Every practice at a glance',   to: '/solutions', icon: ico(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>) },
]

const features: Record<'sol' | 'ind' | 'res', MegaFeature> = {
  sol: { title: 'One senior team, every layer.', desc: 'Strategy, build and run — across cloud, AI and enterprise apps.', cta: 'See all 7 solutions', to: '/solutions' },
  ind: { title: 'Built for high-stakes sectors.', desc: 'HIPAA, PCI-DSS and SOC 2 — compliance designed in from day one.', cta: 'Talk to an industry lead', to: '/contact' },
  res: { title: 'Notes from the engineering floor.', desc: 'Field-tested playbooks on AI, cloud and delivery.', cta: 'Read the blog', to: '/blog' },
}

/* Panel body: a two-column grid of items plus a navy feature card */
function MegaPanel({ items, feature, label, note }: { items: MegaItem[]; feature: MegaFeature; label: string; note?: string }) {
  return (
    <div className="nm-panel" role="menu">
      <div className="nm-card">
        <div className="nm-main">
          <div className="nm-head">
            <span className="nm-head__lbl">{label}</span>
            {note && <span className="nm-head__note">{note}</span>}
          </div>
          <div className="nm-grid">
          {items.map((it, i) => (
            <Link key={it.label} to={it.to} className="nm-item" role="menuitem" style={{ ['--i' as string]: i, ['--c' as string]: it.color }}>
              <span className="nm-item__ico">{it.icon}</span>
              <span className="nm-item__txt">
                <span className="nm-item__title">{it.label}</span>
                <span className="nm-item__desc">{it.desc}</span>
              </span>
            </Link>
          ))}
          </div>
        </div>
        <Link to={feature.to} className="nm-feature">
          <span className="nm-feature__glow" aria-hidden="true" />
          <svg className="nm-feature__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
          </svg>
          <span className="nm-feature__title">{feature.title}</span>
          <span className="nm-feature__desc">{feature.desc}</span>
          <span className="nm-feature__cta">
            {feature.cta}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
          </span>
        </Link>
      </div>
    </div>
  )
}

const Chevron = () => (
  <svg className="nm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
)

const products = [
  {
    label: 'Apply Express',
    desc:  'AI job autopilot for the US.',
    href:  'https://applyexpress.synerax.in',
    icon:  <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1793080644/favicon_flw5v0.ico" alt="" />,
  },
  {
    label: 'Staffing',
    desc:  'Synerax Staffing: talent and hiring solutions.',
    href:  'https://staffing.synerax.in',
    icon:  <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1793081628/icon_acndrs.png" alt="" />,
  },
]

/* "Our Products" — opens on click, and on hover where a mouse is present.
   Closes on outside click, Escape, and route change. */
function ProductsMenu() {
  const [open, setOpen] = useState(false)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const btnRef   = useRef<HTMLButtonElement>(null)
  const timer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const hoverable = () => window.matchMedia('(hover: hover)').matches

  return (
    <div
      ref={wrapRef}
      className={`nav__products${open ? ' open' : ''}`}
      onMouseEnter={() => { if (!hoverable()) return; if (timer.current) clearTimeout(timer.current); setOpen(true) }}
      onMouseLeave={() => { if (!hoverable()) return; timer.current = setTimeout(() => setOpen(false), 150) }}
    >
      <button
        ref={btnRef}
        type="button"
        className="nav__products-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="nav-products-panel"
        onClick={() => setOpen(o => !o)}
      >
        <svg className="nav__products-grid" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1.4"/><rect x="9.5" y="1" width="5.5" height="5.5" rx="1.4"/>
          <rect x="1" y="9.5" width="5.5" height="5.5" rx="1.4"/><rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1.4"/>
        </svg>
        Our Products
        <svg className="nav__products-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
      </button>

      <div id="nav-products-panel" className="nav__products-panel" aria-hidden={!open}>
        {products.map(p => (
          <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="nav__product-card" tabIndex={open ? 0 : -1}>
            <span className="nav__product-icon" aria-hidden="true">{p.icon}</span>
            <span className="nav__product-text">
              <span className="nav__product-title">{p.label}</span>
              <span className="nav__product-desc">{p.desc}</span>
            </span>
            <span className="nav__product-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

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

        <Link to="/" className="nav__logo" aria-label="Synerax Cloud Technologies">
          <Logo lockup />
        </Link>

        <ul className="nav__links">

          {/* ── Solutions ── */}
          <li className={`nav__dropdown nm-dd${solOpen ? ' open' : ''}`} {...mkHandlers(setSolOpen, solTimer)}>
            <button className="nav__dropdown-trigger nm-trigger" aria-expanded={solOpen} onClick={() => setSolOpen(o => !o)}>
              Solutions <Chevron />
            </button>
            <MegaPanel items={megaSolutions} feature={features.sol} label="Our Solutions" />
          </li>

          {/* ── Industries ── */}
          <li className={`nav__dropdown nm-dd${indOpen ? ' open' : ''}`} {...mkHandlers(setIndOpen, indTimer)}>
            <button className="nav__dropdown-trigger nm-trigger" aria-expanded={indOpen} onClick={() => setIndOpen(o => !o)}>
              Industries <Chevron />
            </button>
            <MegaPanel items={megaIndustries} feature={features.ind} label="Industries" />
          </li>

          {/* ── Resources ── */}
          <li className={`nav__dropdown nm-dd${resOpen ? ' open' : ''}`} {...mkHandlers(setResOpen, resTimer)}>
            <button className="nav__dropdown-trigger nm-trigger" aria-expanded={resOpen} onClick={() => setResOpen(o => !o)}>
              Resources <Chevron />
            </button>
            <MegaPanel items={megaResources} feature={features.res} label="Explore" note="Learn, meet, join" />
          </li>

          <li><Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''}>Careers</Link></li>
          <li><Link to="/about"   className={location.pathname === '/about'   ? 'active' : ''}>About</Link></li>

        </ul>

        <div className="nav__cta-wrap">
          <ProductsMenu />
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
          <Link to="/" className="nav__logo" aria-label="Synerax Cloud Technologies" onClick={() => setMobileOpen(false)}>
            <Logo lockup />
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
          <div className="nav__mobile-products" aria-label="Our products">
            {products.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" className="nav__product-card">
                <span className="nav__product-icon" aria-hidden="true">{p.icon}</span>
                <span className="nav__product-text">
                  <span className="nav__product-title">{p.label}</span>
                  <span className="nav__product-desc">{p.desc}</span>
                </span>
                <span className="nav__product-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

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
