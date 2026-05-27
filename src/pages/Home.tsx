import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLead } from '../context/LeadContext'
/* ─── Solution cards ─────────────────────────── */
const homeSolCards = [
  { slug:'contact-center', title:'Contact Center Solutions',   desc:'Enterprise-grade omnichannel platform handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.', svg:(<svg viewBox="0 0 48 48" fill="none"><path d="M8 14a4 4 0 014-4h6l3 8-4 2.5a22 22 0 009.5 9.5L29 26l8 3v6a4 4 0 01-4 4C17.2 39 9 30.8 9 20.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { slug:'frontend',       title:'Frontend Development',       desc:'Blazing-fast, responsive web apps with React, Next.js, and TypeScript. Performance-first with Core Web Vitals optimisation.',     svg:(<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.2"/><path d="M16 44h16M24 36v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M13 22l6 6-6 6M22 32h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { slug:'backend',        title:'Backend Development',        desc:'Scalable REST/GraphQL APIs and microservices. Node.js, Python, FastAPI — engineered for high-traffic production systems.',         svg:(<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/><rect x="6" y="22" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/><circle cx="13" cy="13" r="2" fill="currentColor"/><circle cx="13" cy="27" r="2" fill="currentColor"/></svg>) },
  { slug:'agentic-ai',     title:'Agentic AI Solutions',       desc:'Autonomous LLM agents, NLP pipelines, and agentic workflows. OpenAI, LangChain, HuggingFace — AI that works for your business 24/7.',svg:(<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.2"/><circle cx="24" cy="24" r="4" fill="currentColor" opacity=".35"/><path d="M24 4v4M24 40v4M44 24h-4M8 24H4M37.07 10.93l-2.83 2.83M13.76 34.24l-2.83 2.83M37.07 37.07l-2.83-2.83M13.76 13.76l-2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>) },
  { slug:'aws',            title:'AWS Infrastructure',         desc:'Enterprise AWS with 99.99% availability SLAs. Terraform IaC, Kubernetes, CI/CD pipelines, and cloud cost optimisation.',           svg:(<svg viewBox="0 0 48 48" fill="none"><path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z" stroke="currentColor" strokeWidth="2.2"/><path d="M24 8c-4.5 6.5-6 13-6 16s1.5 9.5 6 16M24 8c4.5 6.5 6 13 6 16s-1.5 9.5-6 16M8 24h32" stroke="currentColor" strokeWidth="2"/></svg>) },
  { slug:'cybersecurity',  title:'Cybersecurity',              desc:'24/7 SOC operations, zero-trust architecture, and penetration testing. SOC 2 & ISO 27001 certified infrastructure.',                svg:(<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { slug:'inventory',      title:'Inventory Management',       desc:'Real-time stock tracking, AI demand forecasting, multi-warehouse support, and ERP integrations. Eliminate stockouts with smart automation.',svg:(<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="16" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2.2"/><path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M18 28h12M18 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>) },
  { slug:'fullstack',      title:'Full Stack & Mobile',        desc:'Complete application development — web and mobile. Flutter, React Native, Swift, Kotlin. App Store-ready delivery in weeks.',      svg:(<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="2.2"/><rect x="18" y="8" width="12" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="24" cy="35" r="2" fill="currentColor"/></svg>) },
  { slug:'consulting',     title:'IT Consulting & Outsourcing', desc:'CTO-as-a-Service, digital transformation roadmaps, talent outsourcing, and strategic IT advisory — an extension of your team.',  svg:(<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.2"/><path d="M8 40c0-8.84 7.16-16 16-16s16 7.16 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>) },
]

/* ─── Testimonials ───────────────────────────── */
const testimonials = [
  { quote:"Synerax built our entire contact center platform from scratch in under 3 months. 99.9% uptime since launch, and our CSAT scores improved by 42%. The team is exceptional.", name:'Priya Mehta', role:'VP Operations, FinTech Startup', initial:'P' },
  { quote:"We brought Synerax in to rescue a failing project. They delivered a complete rewrite in 8 weeks, on budget. Their technical depth and communication are second to none.", name:'James Okafor', role:'CTO, E-commerce Platform', initial:'J' },
  { quote:"The agentic AI solution Synerax built for us automated 70% of our document processing workflows. ROI achieved in under 4 months. Genuinely transformational.", name:'Sara Al-Rashid', role:'Head of Digital, Insurance Group', initial:'S' },
  { quote:"Our AWS bill dropped by 38% after Synerax's cost optimisation engagement. CI/CD pipelines cut deployment time from 2 hours to 12 minutes.", name:'Marcus Chen', role:'Engineering Director, SaaS Company', initial:'M' },
  { quote:"I've been a customer for more than a decade. Synerax is an example of the way managed services should be done. We will continue to be a customer for years to come.", name:'Daniel Legrante', role:'CIO, Restaurant Product Supplier', initial:'D' },
]


/* ─── Stat cards (Telisof style) ────────────── */
const statCards = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
    num: '200+', label: 'Projects Delivered',
    desc: 'Across enterprise and mid-market clients globally'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    num: '80+', label: 'Enterprise Clients',
    desc: 'Trusted by organizations across multiple industries'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    num: '20+', label: 'Countries Served',
    desc: 'Delivering impact globally across every continent'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    num: '99.9%', label: 'Uptime SLA',
    desc: 'Guaranteed availability on all managed services'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    num: '15+', label: 'Years of Experience',
    desc: 'Decades of expertise in enterprise IT solutions'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.07-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    num: '24/7', label: 'Expert Support',
    desc: 'Round-the-clock monitoring and incident response'
  },
]

const whyCards = [
  {
    accent: '#1A56DB',
    iconBg: '#EBF2FF',
    metric: '200+',
    title: 'Senior-Only Execution',
    desc: 'Every project is led by a senior engineer. No juniors-as-proxies, no layers of management — you work directly with the people building your product.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  },
  {
    accent: '#7C3AED',
    iconBg: '#F3EEFF',
    metric: '6–8 Wks',
    title: 'Rapid MVP Delivery',
    desc: 'From zero to production-ready in 6–8 weeks. Tested, documented, and deployed. We move at speed without cutting corners or accumulating technical debt.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
  {
    accent: '#0891B2',
    iconBg: '#E0F7FA',
    metric: 'SOC 2',
    title: 'Built-In Security',
    desc: 'SOC 2, ISO 27001, HIPAA, and PCI-DSS compliance engineering baked into every layer. Security is never an afterthought — it\'s a design principle.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
  },
  {
    accent: '#D97706',
    iconBg: '#FFF8E1',
    metric: '100%',
    title: 'Full Transparency',
    desc: 'Weekly demos, real-time project dashboards, and a dedicated PM on every engagement. You\'re always in the loop — never left wondering what\'s happening.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>),
  },
]

const newsItems = [
  { seed:'news1', tag:'AI & Automation', title:'The Future of Contact Centers: AI-Powered Excellence in Customer Support', date:'May 2025', read:'5 min read' },
  { seed:'news2', tag:'Infrastructure',  title:'Scaling to 50 Million Interactions Monthly: Our AWS Architecture Story',   date:'Apr 2025', read:'7 min read' },
  { seed:'news3', tag:'Engineering',     title:'Building a High-Performance Development Team Across Time Zones',           date:'Apr 2025', read:'4 min read' },
]

export default function Home() {
  const { openLead } = useLead()
  const [testiIdx, setTestiIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const testi = testimonials[testiIdx]

  return (
    <>
      <Nav />

      {/* ══════════════════════════════════════════
          HERO — ITS-style full-bleed dark photo
      ══════════════════════════════════════════ */}
      <section className="ht-hero">

        {/* 1 — Background photo */}
        <div className="ht-hero__photo" />

        {/* 2 — Dark gradient overlay (left opaque → right transparent) */}
        <div className="ht-hero__overlay" />

        {/* 3 — Network / particle SVG */}
        <svg className="ht-hero__net" viewBox="0 0 660 920" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connection lines */}
          <line x1="65"  y1="110" x2="200" y2="60"  stroke="rgba(100,168,255,0.22)" strokeWidth="1"/>
          <line x1="200" y1="60"  x2="360" y2="135" stroke="rgba(100,168,255,0.18)" strokeWidth="1"/>
          <line x1="360" y1="135" x2="460" y2="80"  stroke="rgba(100,168,255,0.16)" strokeWidth="1"/>
          <line x1="65"  y1="110" x2="130" y2="255" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="200" y1="60"  x2="290" y2="210" stroke="rgba(100,168,255,0.16)" strokeWidth="1"/>
          <line x1="360" y1="135" x2="455" y2="270" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="130" y1="255" x2="290" y2="210" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="290" y1="210" x2="455" y2="270" stroke="rgba(100,168,255,0.16)" strokeWidth="1"/>
          <line x1="130" y1="255" x2="50"  y2="390" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="50"  y1="390" x2="175" y2="370" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="175" y1="370" x2="290" y2="210" stroke="rgba(100,168,255,0.13)" strokeWidth="1"/>
          <line x1="175" y1="370" x2="335" y2="360" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="335" y1="360" x2="455" y2="270" stroke="rgba(100,168,255,0.16)" strokeWidth="1"/>
          <line x1="335" y1="360" x2="505" y2="390" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="50"  y1="390" x2="95"  y2="520" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="95"  y1="520" x2="235" y2="515" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="235" y1="515" x2="335" y2="360" stroke="rgba(100,168,255,0.13)" strokeWidth="1"/>
          <line x1="235" y1="515" x2="405" y2="490" stroke="rgba(100,168,255,0.18)" strokeWidth="1"/>
          <line x1="405" y1="490" x2="505" y2="390" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="95"  y1="520" x2="65"  y2="645" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="65"  y1="645" x2="205" y2="650" stroke="rgba(100,168,255,0.20)" strokeWidth="1"/>
          <line x1="205" y1="650" x2="235" y2="515" stroke="rgba(100,168,255,0.13)" strokeWidth="1"/>
          <line x1="205" y1="650" x2="375" y2="635" stroke="rgba(100,168,255,0.18)" strokeWidth="1"/>
          <line x1="375" y1="635" x2="405" y2="490" stroke="rgba(100,168,255,0.13)" strokeWidth="1"/>
          <line x1="375" y1="635" x2="525" y2="620" stroke="rgba(100,168,255,0.12)" strokeWidth="1"/>
          <line x1="65"  y1="645" x2="135" y2="770" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="135" y1="770" x2="285" y2="775" stroke="rgba(100,168,255,0.18)" strokeWidth="1"/>
          <line x1="285" y1="775" x2="375" y2="635" stroke="rgba(100,168,255,0.12)" strokeWidth="1"/>
          <line x1="285" y1="775" x2="440" y2="760" stroke="rgba(100,168,255,0.14)" strokeWidth="1"/>
          <line x1="440" y1="760" x2="375" y2="635" stroke="rgba(100,168,255,0.12)" strokeWidth="1"/>
          {/* Nodes */}
          <circle cx="65"  cy="110" r="3"   fill="rgba(100,168,255,0.75)"/>
          <circle cx="200" cy="60"  r="2.5" fill="rgba(100,168,255,0.65)"/>
          <circle cx="360" cy="135" r="3.5" fill="rgba(100,168,255,0.80)"/>
          <circle cx="460" cy="80"  r="2"   fill="rgba(100,168,255,0.55)"/>
          <circle cx="130" cy="255" r="3"   fill="rgba(100,168,255,0.70)"/>
          <circle cx="290" cy="210" r="5"   fill="rgba(100,168,255,0.92)"/>
          <circle cx="455" cy="270" r="3"   fill="rgba(100,168,255,0.70)"/>
          <circle cx="50"  cy="390" r="2.5" fill="rgba(100,168,255,0.60)"/>
          <circle cx="175" cy="370" r="4"   fill="rgba(100,168,255,0.85)"/>
          <circle cx="335" cy="360" r="3.5" fill="rgba(100,168,255,0.80)"/>
          <circle cx="505" cy="390" r="2.5" fill="rgba(100,168,255,0.60)"/>
          <circle cx="95"  cy="520" r="3"   fill="rgba(100,168,255,0.70)"/>
          <circle cx="235" cy="515" r="5"   fill="rgba(100,168,255,0.92)"/>
          <circle cx="405" cy="490" r="3"   fill="rgba(100,168,255,0.75)"/>
          <circle cx="65"  cy="645" r="3"   fill="rgba(100,168,255,0.70)"/>
          <circle cx="205" cy="650" r="4"   fill="rgba(100,168,255,0.85)"/>
          <circle cx="375" cy="635" r="3.5" fill="rgba(100,168,255,0.80)"/>
          <circle cx="525" cy="620" r="2"   fill="rgba(100,168,255,0.55)"/>
          <circle cx="135" cy="770" r="3"   fill="rgba(100,168,255,0.65)"/>
          <circle cx="285" cy="775" r="3.5" fill="rgba(100,168,255,0.75)"/>
          <circle cx="440" cy="760" r="2.5" fill="rgba(100,168,255,0.60)"/>
          {/* Glow halos on hub nodes */}
          <circle cx="290" cy="210" r="11" fill="rgba(100,168,255,0.13)"/>
          <circle cx="235" cy="515" r="11" fill="rgba(100,168,255,0.13)"/>
          <circle cx="175" cy="370" r="9"  fill="rgba(100,168,255,0.10)"/>
          <circle cx="205" cy="650" r="9"  fill="rgba(100,168,255,0.10)"/>
        </svg>

        {/* 4 — Content */}
        <div className="ht-hero__wrap">
          <div className="container">
            <div className="ht-hero__content">

              <div className="ht-hero__badge">
                <span className="ht-hero__badge-dot" />
                Trusted by 80+ enterprises worldwide
              </div>

              <h1 className="ht-hero__h1">
                BUILDING<br />
                SCALABLE DIGITAL<br />
                INFRASTRUCTURE.
              </h1>

              <p className="ht-hero__desc">
                AI systems, enterprise contact centers, cloud architecture,
                and full-stack applications — all engineered for scale and built to last.
              </p>

              <div className="ht-hero__actions">
                <button onClick={() => openLead()} className="ht-hero__btn-primary">
                  GET A FREE CONSULTATION →
                </button>
                <Link to="/solutions/contact-center" className="ht-hero__btn-outline">
                  EXPLORE OUR SERVICES
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* 5 — Down arrow */}
        <div className="ht-hero__arrow">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/>
          </svg>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          WHY SYNERAX — Premium 4-card strip
      ══════════════════════════════════════════ */}
      <section className="wp-section">
        <div className="container">
          <div className="wp-header">
            <div className="section-tag">Why Synerax</div>
            <h2 className="wp-title">Built Different.<br />Delivered Better.</h2>
            <p className="wp-sub">We don't just write code — we engineer outcomes. Here's what sets us apart.</p>
          </div>
          <div className="wp-grid">
            {whyCards.map((c, i) => (
              <div key={i} className="wp-card" style={{ '--wp-accent': c.accent } as React.CSSProperties}>
                <div className="wp-card__top" />
                <div className="wp-card__icon" style={{ background: c.iconBg, color: c.accent }}>
                  {c.icon}
                </div>
                <div className="wp-card__metric" style={{ color: c.accent }}>{c.metric}</div>
                <h4 className="wp-card__title">{c.title}</h4>
                <p className="wp-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTIONS GRID
      ══════════════════════════════════════════ */}
      <section className="solutions">
        <div className="container">
          <div className="solutions__header">
            <div className="section-tag">Our Solutions</div>
            <h2 className="section-title solutions__title">From contact centers to cloud —<br />we deliver end-to-end</h2>
            <p className="section-sub solutions__sub" style={{ margin:'0.75rem auto 0' }}>Solutions engineered for performance, scale, and reliability.</p>
          </div>
          <div className="solutions__grid">
            {homeSolCards.map((card, i) => (
              <div key={card.slug} className="sol-card">
                <span className="sol-card__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="sol-card__icon">{card.svg}</div>
                <h3>{card.title}</h3>
                <p className="sol-card__desc">{card.desc}</p>
                <Link to={`/solutions/${card.slug}`} className="sol-card__link">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LATEST INSIGHTS
      ══════════════════════════════════════════ */}
      <section className="news">
        <div className="container">
          <div className="news__header">
            <h2>Latest Insights</h2>
            <Link to="/blog" className="news__see-all">Explore All Articles →</Link>
          </div>
          <div className="news__grid">
            {newsItems.map(item => (
              <div className="news-card" key={item.seed}>
                <div className="news-card__img">
                  <img src={`https://picsum.photos/seed/${item.seed}/600/338`} alt={item.tag} loading="lazy" />
                </div>
                <div className="news-card__body">
                  <div className="news-card__tag">{item.tag}</div>
                  <div className="news-card__title">{item.title}</div>
                  <div className="news-card__meta">{item.date} · {item.read}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SYNERAX BY THE NUMBERS — Telisof style
      ══════════════════════════════════════════ */}
      <section className="st-section">
        <div className="container st-section__inner">

          {/* LEFT — heading + 2×3 stat cards */}
          <div className="st-section__left">
            <h2 className="st-section__title">Synerax by the Numbers</h2>
            <p className="st-section__sub">
              Real results, measurable impact — powering the world's most demanding enterprises.
            </p>
            <div className="st-section__grid">
              {statCards.map((s, i) => (
                <div key={i} className="st-card">
                  <div className="st-card__icon">{s.icon}</div>
                  <div className="st-card__body">
                    <div className="st-card__num">{s.num}</div>
                    <div className="st-card__label">{s.label}</div>
                    <div className="st-card__desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — tall rounded image */}
          <div className="st-section__right">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80"
              alt="Synerax team"
              className="st-section__img"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="testimonials">
        <div className="container">
          <h2 className="testi-title">Testimonials</h2>

          <div className="testi-card">
            <div className="testi-card__avatar">{testi.initial}</div>
            <p className="testi-card__quote">{testi.quote}</p>
            <div className="testi-card__author">
              <div className="testi-card__name">{testi.name}</div>
              <div className="testi-card__role">{testi.role}</div>
            </div>
          </div>

          <div className="testi-nav">
            <button
              className="testi-nav__btn"
              onClick={() => setTestiIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="testi-tracks">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi-track${testiIdx === i ? ' active' : ''}`}
                  onClick={() => setTestiIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testi-nav__btn"
              onClick={() => setTestiIdx(i => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAREERS
      ══════════════════════════════════════════ */}
      <section className="careers">
        <div className="container">
          <div className="careers__text">
            <div className="section-tag">We're Hiring</div>
            <div className="careers__title">Careers at Synerax</div>
            <p className="careers__desc">
              We invite you to bring your expertise to our team. Join a team of engineers,
              designers, and AI builders shaping the digital future.
            </p>
            <div className="careers__perks">
              <span className="perk-chip">🏠 Remote-first</span>
              <span className="perk-chip">📈 Fast growth</span>
              <span className="perk-chip">🌍 Global team</span>
              <span className="perk-chip">💡 R&D time</span>
              <span className="perk-chip">🎓 Learning budget</span>
            </div>
            <Link to="/contact" className="btn btn--primary">Explore careers →</Link>
          </div>
          <div className="careers__img">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
              alt="Careers at Synerax" loading="lazy"
              onError={e => { const t=e.currentTarget; t.style.display='none'; const ph=t.nextElementSibling as HTMLElement|null; if(ph) ph.style.display='flex' }} />
            <div className="careers__img-placeholder" style={{ display:'none' }}>
              <span className="big-icon">👩‍💻</span>
              <div><strong style={{ color:'rgba(255,255,255,0.8)', display:'block' }}>Join Our Team</strong>Careers at Synerax</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Let's Build Together</div>
          <h2>Ready to Start Your<br />Next Project?</h2>
          <p>Get a detailed proposal within 24 hours — no commitment required.</p>
          <div className="cta-band__actions">
            <button onClick={() => openLead()} className="btn btn--white">Start a Project →</button>
            <Link to="/services" className="btn btn--outline" style={{ color:'#fff', borderColor:'rgba(255,255,255,0.4)' }}>View All Solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
