import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo'

/* Short labels so every column stays on one line per link */
const columns = [
  {
    title: 'Solutions',
    links: [
      ['Web & Enterprise Apps', '/solutions/web-enterprise-applications'],
      ['DevSecOps & FinOps', '/solutions/devsecops-finops'],
      ['Agentic AI', '/solutions/agentic-ai'],
      ['Cloud & Migration', '/solutions/cloud-engineering-migration'],
      ['Observability & SRE', '/solutions/observability-sre'],
      ['App Modernization', '/solutions/application-modernization'],
      ['IT Service Management', '/solutions/itsm'],
    ],
  },
  {
    title: 'Industries',
    links: [
      ['Healthcare', '/industries/healthcare'],
      ['Financial Services', '/industries/financial-services'],
      ['Retail & E-Commerce', '/industries/retail'],
      ['Government', '/industries/government'],
      ['Education & EdTech', '/industries/education'],
      ['Logistics & Supply Chain', '/industries/logistics'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Careers', '/careers'],
      ['Blog', '/blog'],
      ['Contact Us', '/contact'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy Policy', '/privacy-policy'],
      ['Terms of Service', '/terms-of-service'],
    ],
  },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com', d: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></> },
  { label: 'X', href: 'https://twitter.com', d: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { label: 'Facebook', href: 'https://facebook.com', d: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
  { label: 'YouTube', href: 'https://youtube.com', d: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
]

export default function Footer() {
  /* the signature wordmark rises in once, the first time it scrolls into view */
  const sigRef = useRef<HTMLDivElement>(null)
  const [sigIn, setSigIn] = useState(false)

  useEffect(() => {
    const el = sigRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setSigIn(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSigIn(true); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <footer className="ft-new ft2">
      <div className="ft2-wrap">

        {/* ── top: brand + link columns ── */}
        <div className="ft2-top">
          <div className="ft2-brand">
            <Link to="/" className="ft-new__logo" aria-label="Synerax Cloud Technologies">
              <Logo />
            </Link>
            <p className="ft2-tagline">From code to cloud.<br />Engineered to last.</p>
            <p className="ft2-pitch">
              Senior engineering teams for cloud, AI and enterprise platforms.
            </p>
            <div className="ft2-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="ft2-social">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{s.d}</svg>
                </a>
              ))}
            </div>
          </div>

          <nav className="ft2-cols" aria-label="Footer">
            {columns.map(col => (
              <div className="ft2-col" key={col.title}>
                <h5 className="ft2-heading">{col.title}</h5>
                <ul>
                  {col.links.map(([label, to]) => (
                    <li key={to}><Link to={to}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ── signature: the SYNERAX wordmark, drawn from the logo artwork ── */}
        <div ref={sigRef} className={`ft2-sig${sigIn ? ' is-in' : ''}`} aria-hidden="true">
          <span className="ft2-sig__mark" />
          <span className="ft2-sig__sub">Cloud Technologies</span>
        </div>

        {/* ── bottom bar ── */}
        <div className="ft2-bottom">
          <span>© 2025–2026 Synerax Cloud Technologies. All rights reserved.</span>
          <div className="ft2-bottom__links">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-of-service">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
