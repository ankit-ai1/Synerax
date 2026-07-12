import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLead } from '../context/LeadContext'
/* ─── Solution cards ─────────────────────────── */
const homeSolCards = [
  { slug:'contact-center', title:'Contact Center Solutions',    tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781091750/ChatGPT_Image_Jun_10_2026_05_12_08_PM_vouyiu.png', desc:'Enterprise-grade omnichannel platform handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.' },
  { slug:'frontend',       title:'Frontend Development',        tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781091899/ChatGPT_Image_Jun_10_2026_05_14_32_PM_wb2ubo.png', desc:'Blazing-fast, responsive web apps with React, Next.js, and TypeScript. Performance-first with Core Web Vitals optimisation.' },
  { slug:'backend',        title:'Backend Development',         tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092016/ChatGPT_Image_Jun_10_2026_05_16_44_PM_vpm7nm.png', desc:'Scalable REST/GraphQL APIs and microservices. Node.js, Python, FastAPI — engineered for high-traffic production systems.' },
  { slug:'agentic-ai',     title:'Agentic AI Solutions',        tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092144/ChatGPT_Image_Jun_10_2026_05_18_51_PM_vt62mr.png', desc:'Autonomous LLM agents, NLP pipelines, and agentic workflows. OpenAI, LangChain, HuggingFace — AI that works 24/7.' },
  { slug:'aws',            title:'AWS Infrastructure',          tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092334/ChatGPT_Image_Jun_10_2026_05_22_02_PM_msfgms.png', desc:'Enterprise AWS with 99.99% availability SLAs. Terraform IaC, Kubernetes, CI/CD pipelines, and cloud cost optimisation.' },
  { slug:'cybersecurity',  title:'Cybersecurity',               tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092580/ChatGPT_Image_Jun_10_2026_05_25_49_PM_vbnagv.png', desc:'24/7 SOC operations, zero-trust architecture, and penetration testing. SOC 2 & ISO 27001 certified infrastructure.' },
  { slug:'inventory',      title:'Inventory Management',        tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092765/ChatGPT_Image_Jun_10_2026_05_27_29_PM_hgknao.png', desc:'Real-time stock tracking, AI demand forecasting, multi-warehouse support, and ERP integrations.' },
  { slug:'fullstack',      title:'Full Stack & Mobile',         tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092853/ChatGPT_Image_Jun_10_2026_05_30_37_PM_gn5rei.png', desc:'Complete application development — web and mobile. Flutter, React Native, Swift, Kotlin. App Store-ready delivery in weeks.' },
  { slug:'consulting',     title:'IT Consulting & Outsourcing', tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781093112/ChatGPT_Image_Jun_10_2026_05_35_01_PM_vbjuf8.png', desc:'CTO-as-a-Service, digital transformation roadmaps, talent outsourcing, and strategic IT advisory.' },
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
    num: '5+', label: 'Projects Delivered',
    desc: 'Across enterprise and mid-market clients globally'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    num: '5+', label: 'Enterprise Clients',
    desc: 'Trusted by organizations across multiple industries'
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    num: '3+', label: 'Countries Served',
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
    accent: '#1A56DB', iconBg: '#EBF2FF', metric: '200+', tag: 'TEAM',
    title: 'Senior-Only Execution',
    desc: 'Every project is led by a senior engineer. No juniors-as-proxies — you work directly with the people building your product.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  },
  {
    accent: '#7C3AED', iconBg: '#F3EEFF', metric: '6–8 Wks', tag: 'DELIVERY',
    title: 'Rapid MVP Delivery',
    desc: 'From zero to production-ready in 6–8 weeks. Tested, documented, and deployed — speed without cutting corners.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
  {
    accent: '#0891B2', iconBg: '#E0F7FA', metric: 'SOC 2', tag: 'SECURITY',
    title: 'Built-In Security',
    desc: 'SOC 2, ISO 27001, HIPAA, and PCI-DSS compliance baked into every layer. Security is never an afterthought.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
  },
  {
    accent: '#D97706', iconBg: '#FFF8E1', metric: '100%', tag: 'TRANSPARENCY',
    title: 'Full Transparency',
    desc: 'Weekly demos, real-time dashboards, and a dedicated PM. You\'re always in the loop — never left wondering.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>),
  },
]

const newsItems = [
  { seed:'news1', tag:'AI & Automation', read:'5 min read', title:'The Future of Contact Centers: AI Excellence', desc:'How generative AI is reshaping customer service architectures in the enterprise...', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { seed:'news2', tag:'Infrastructure',  read:'7 min read', title:'Scaling to 50 Million Monthly Hits', desc:'A deep dive into the AWS architecture that powered our latest multi-national rollout.', img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80' },
  { seed:'news3', tag:'Engineering',     read:'4 min read', title:'High-Performance Distributed Teams', desc:'Strategies for maintaining velocity and quality in global engineering cultures.', img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' },
]

export default function Home() {
  const { openLead } = useLead()
  const [testiIdx, setTestiIdx] = useState(0)
  const [solIdx, setSolIdx] = useState(0)
  const [solVisibleCount, setSolVisibleCount] = useState(1)
  const solMaxIdx = homeSolCards.length - solVisibleCount

  useEffect(() => {
    const computeVisible = () => {
      const w = window.innerWidth
      setSolVisibleCount(w <= 768 ? 1 : 3)
    }
    computeVisible()
    window.addEventListener('resize', computeVisible)
    return () => window.removeEventListener('resize', computeVisible)
  }, [])

  useEffect(() => {
    setSolIdx(i => Math.min(i, homeSolCards.length - solVisibleCount))
  }, [solVisibleCount])

  useEffect(() => {
    const t = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const testi = testimonials[testiIdx]

  useEffect(() => {
    const canvas = document.getElementById('ht-canvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    const W = () => canvas.width
    const H = () => canvas.height

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.0008,
      dy: (Math.random() - 0.5) * 0.0008,
      opacity: Math.random() * 0.45 + 0.1,
    }))

    const cubes = Array.from({ length: 5 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 35 + 18,
      rot: Math.random() * Math.PI * 2,
      rotSpd: (Math.random() - 0.5) * 0.006,
      dx: (Math.random() - 0.5) * 0.0004,
      dy: (Math.random() - 0.5) * 0.0004,
      op: Math.random() * 0.1 + 0.04,
    }))

    const drawCube = (x: number, y: number, s: number, rot: number, op: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.strokeStyle = `rgba(112,145,230,${op})`
      ctx.lineWidth = 1
      ctx.strokeRect(-s/2, -s/2, s, s)
      const o = s * 0.38
      ctx.strokeRect(-s/2+o, -s/2-o, s, s)
      ctx.beginPath()
      ctx.moveTo(-s/2,-s/2); ctx.lineTo(-s/2+o,-s/2-o)
      ctx.moveTo(s/2,-s/2);  ctx.lineTo(s/2+o,-s/2-o)
      ctx.moveTo(s/2,s/2);   ctx.lineTo(s/2+o,s/2-o)
      ctx.moveTo(-s/2,s/2);  ctx.lineTo(-s/2+o,s/2-o)
      ctx.stroke()
      ctx.restore()
    }

    const draw = () => {
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      const pts = particles.map(p => ({ ax: p.x * w, ay: p.y * h, op: p.opacity }))

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i+1; j < pts.length; j++) {
          const dx = pts[i].ax - pts[j].ax
          const dy = pts[i].ay - pts[j].ay
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(112,145,230,${0.07 * (1 - d/130)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(pts[i].ax, pts[i].ay)
            ctx.lineTo(pts[j].ax, pts[j].ay)
            ctx.stroke()
          }
        }
      }

      // Dots
      particles.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(pts[i].ax, pts[i].ay, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(173,187,218,${p.opacity})`
        ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > 1) p.dx *= -1
        if (p.y < 0 || p.y > 1) p.dy *= -1
      })

      // Cubes
      cubes.forEach(c => {
        drawCube(c.x * w, c.y * h, c.size, c.rot, c.op)
        c.rot += c.rotSpd
        c.x += c.dx; c.y += c.dy
        if (c.x < -0.1 || c.x > 1.1) c.dx *= -1
        if (c.y < -0.1 || c.y > 1.1) c.dy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <>
      <Nav />

      {/* ══════════════════════════════════════════
          HERO — ITS-style full-bleed dark photo
      ══════════════════════════════════════════ */}
      <section className="ht-hero">

        <canvas className="ht-hero__canvas" id="ht-canvas" />

        {/* Background image */}
        <img
          src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1783869514/wmremove-transformed_10_nnqgn2.png"
          className="ht-hero__photo"
          alt=""
        />

        {/* Subtle left fade for text readability only */}
        <div className="ht-hero__overlay" />

        {/* 5 — Content */}
        <div className="ht-hero__wrap">
          <div className="ht-hero__center">

            <h1 className="ht-hero__h1">
              From Code to Cloud.<br />
              <span style={{ color: '#7091E6' }}>We Deliver What Others Promise.</span>
            </h1>

            <p className="ht-hero__desc">
              Enterprise contact centers, AI systems, cloud architecture, and full-stack
              applications — all engineered for scale, built to last, and delivered on time.
            </p>

            <div className="ht-hero__actions">
              <button onClick={() => openLead()} className="ht-hero__btn-primary">
                Get a Free Consultation
              </button>
              <Link to="/solutions/contact-center" className="ht-hero__btn-outline">
                Explore Solutions
              </Link>
              <Link to="/about" className="ht-hero__btn-ghost">
                Learn About Us
              </Link>
            </div>

            <div className="ht-hero__checks">
              <span className="ht-hero__check"><span className="ht-hero__check-icon">✓</span> NDA Available</span>
              <span className="ht-hero__check"><span className="ht-hero__check-icon">✓</span> Reply within 24h</span>
              <span className="ht-hero__check"><span className="ht-hero__check-icon">✓</span> Free Scoping</span>
              <span className="ht-hero__check"><span className="ht-hero__check-icon">✓</span> Senior Engineers Only</span>
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
            <h2 className="wp-title">Built Different.<br /><span>Delivered Better.</span></h2>
            <p className="wp-sub">We don't just write code — we engineer outcomes. Here's what sets us apart.</p>
          </div>
          <div className="wp-grid">
            {whyCards.map((c, i) => (
              <div key={i} className="eska-card eska-card--img" style={{ backgroundImage: `url(${c.img})`, '--accent': c.accent } as React.CSSProperties}>
                <div className="eska-card__overlay" />
                <div className="eska-card__body">
                  <div className="eska-card__icon-wrap">{c.icon}</div>
                  <div className="eska-card__tag">{c.tag}</div>
                  <div className="eska-card__line" />
                  <h3 className="eska-card__title">
                    {c.title}
                    <span className="eska-card__arrow">▷</span>
                  </h3>
                  <p className="eska-card__desc">{c.desc}</p>
                </div>
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
            <h2 className="section-title solutions__title">From contact centers to cloud —<br /><span>we deliver end-to-end.</span></h2>
            <p className="section-sub solutions__sub">Solutions engineered for performance, scale, and reliability.</p>
          </div>
          <div className="sol-slider__wrapper">
            {/* Left Arrow */}
            <button
              className="sol-slider__arrow sol-slider__arrow--left"
              onClick={() => setSolIdx(i => Math.max(0, i - 1))}
              disabled={solIdx === 0}
              aria-label="Previous"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Cards Track */}
            <div className="sol-slider__track">
              <div
                className="sol-slider__inner"
                style={{ transform: `translateX(calc(-${solIdx} * (100% / ${solVisibleCount}) - ${solIdx} * 16px))` }}
              >
                {homeSolCards.map((card) => (
                  <Link
                    key={card.slug}
                    to={`/solutions/${card.slug}`}
                    className="sol-slider__card"
                    style={{ backgroundImage: `url(${card.img})` }}
                  >
                    <div className="prem-card__overlay" />
                    <div className="prem-card__body">
                      <div className="prem-card__tag">{card.tag}</div>
                      <div className="prem-card__line" />
                      <h3 className="prem-card__title">
                        {card.title}
                        <span className="prem-card__arrow">▷</span>
                      </h3>
                      <p className="prem-card__desc">{card.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              className="sol-slider__arrow sol-slider__arrow--right"
              onClick={() => setSolIdx(i => Math.min(solMaxIdx, i + 1))}
              disabled={solIdx === solMaxIdx}
              aria-label="Next"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="sol-slider__dots">
              {Array.from({ length: solMaxIdx + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`sol-slider__dot${solIdx === i ? ' active' : ''}`}
                  onClick={() => setSolIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LATEST INSIGHTS
      ══════════════════════════════════════════ */}
      <section className="news">
        <div className="container">
          <div className="news__header">
            <div>
              <div className="news__tag">Knowledge Base</div>
              <h2 className="news__title">Latest <span>Insights.</span></h2>
            </div>
            <Link to="/blog" className="news__see-all">EXPLORE ALL ARTICLES →</Link>
          </div>
          <div className="news__grid">
            {newsItems.map(item => (
              <Link to="/blog" key={item.seed} className="prem-card news-prem" style={{ backgroundImage: `url(${item.img})` }}>
                <div className="prem-card__overlay" />
                <div className="prem-card__body">
                  <div className="prem-card__tag">{item.tag}</div>
                  <div className="prem-card__line" />
                  <h3 className="prem-card__title">{item.title}<span className="prem-card__arrow">▷</span></h3>
                  <p className="prem-card__desc">{item.desc}</p>
                </div>
              </Link>
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
            <h2 className="st-section__title">Synerax by the <span>Numbers</span></h2>
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
          <h2 className="testi-title"><span>Testimonials</span></h2>

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
            <div className="careers__title">Careers at <span>Synerax</span></div>
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
            <Link to="/careers" className="btn btn--primary">Explore careers →</Link>
          </div>
          <div className="careers__img">
            <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1783867920/close-up-portrait-young-beautiful-attractive-redhair-girl-happy-smiling-digital-table-with-wining_1_zgtaq7.jpg"
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
          <h2>Ready to Start Your<br /><span>Next Project?</span></h2>
          <p>Get a detailed proposal within 24 hours — no commitment required.</p>
          <div className="cta-band__actions">
            <button onClick={() => openLead()} className="ht-hero__btn-primary cta-band__btn cta-band__btn--primary">Start a Project →</button>
            <Link to="/services" className="ht-hero__btn-outline cta-band__btn cta-band__btn--secondary">View All Solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
