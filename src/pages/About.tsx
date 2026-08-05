import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DataCard from '../components/DataCard'
import { useLead } from '../context/LeadContext'

/* ─── Testimonials ─────────────────────────────────── */
const testimonials = [
  { quote: "I've been a customer for more than a decade. Synerax is an example of the way managed services should be done. They do their very best to make sure you succeed. If there's an issue, they stay on it. We will continue to be a customer for years to come.", name: 'Daniel Legrante', role: 'CIO, Restaurant Product Supplier', initial: 'D' },
  { quote: "Synerax built our entire contact center platform from scratch in under 3 months. 99.9% uptime since launch, and our customer satisfaction scores improved by 42%.", name: 'Priya Mehta', role: 'VP Operations, FinTech Startup', initial: 'P' },
  { quote: "We brought Synerax in to rescue a failing project. They delivered a complete rewrite in 8 weeks, on budget. Their technical depth and communication are second to none.", name: 'James Okafor', role: 'CTO, E-commerce Platform', initial: 'J' },
  { quote: "The agentic AI solution Synerax built for us automated 70% of our document processing workflows. ROI was achieved in under 4 months. Genuinely transformational.", name: 'Sara Al-Rashid', role: 'Head of Digital, Insurance Group', initial: 'S' },
  { quote: "Our AWS bill dropped by 38% after Synerax's cost optimisation engagement. CI/CD pipelines cut our deployment time from 2 hours to 12 minutes.", name: 'Marcus Chen', role: 'Engineering Director, SaaS Company', initial: 'M' },
]

/* ─── Values cards ─────────────────────────────────── */
const values = [
  { accent: '#F2622E', iconBg: 'rgba(242,98,46,0.1)', icon: '⭐', title: 'Excellence', desc: 'We hold ourselves to the highest technical and service standards in everything we deliver. Good enough is never good enough.' },
  { accent: '#F2622E', iconBg: 'rgba(242,98,46,0.1)', icon: '🤝', title: 'Partnership', desc: "We're deeply invested in your success beyond the project. Your wins are our wins — we think long-term, not transactional." },
  { accent: '#F2622E', iconBg: 'rgba(242,98,46,0.1)', icon: '🔍', title: 'Integrity', desc: 'Honest timelines, transparent pricing, and clear communication — always. We tell you what you need to hear, even when it\'s hard.' },
  { accent: '#F2622E', iconBg: 'rgba(242,98,46,0.1)', icon: '💡', title: 'Innovation', desc: 'We stay ahead of the curve so you don\'t have to. AI, cloud, and emerging tech are not buzzwords — they\'re our daily toolkit.' },
]

/* ─── Stat cards (reuse st-card style) ────────────── */
const statCards = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>, num: '200+', label: 'Projects Delivered', desc: 'Across enterprise and mid-market clients globally' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, num: '80+', label: 'Enterprise Clients', desc: 'Trusted by organizations across multiple industries' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, num: '20+', label: 'Countries Served', desc: 'Delivering impact globally across every continent' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, num: '99.9%', label: 'Uptime SLA', desc: 'Guaranteed availability on all managed services' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, num: '15+', label: 'Years of Experience', desc: 'Decades of expertise in enterprise IT solutions' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.07-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, num: '24/7', label: 'Expert Support', desc: 'Round-the-clock monitoring and incident response' },
]

/* ─── Process steps ────────────────────────────────── */
const steps = [
  { num: '01', title: 'Assess & Discover', desc: 'We audit your landscape, understand your goals, and map a clear, realistic technical roadmap aligned to your business objectives.' },
  { num: '02', title: 'Design & Prototype', desc: 'Wireframes, design systems, clickable prototypes — validated with real users before a single line of production code is written.' },
  { num: '03', title: 'Implement & Build', desc: 'Agile two-week sprints, CI/CD pipelines, and weekly demos keep delivery on track, transparent, and always aligned to your goals.' },
  { num: '04', title: 'Operate & Optimise', desc: 'Zero-downtime deployment, 24/7 monitoring, SLA-backed uptime, and continuous performance optimisation post-launch.' },
]

export default function About() {
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
          HERO
      ══════════════════════════════════════════ */}
      <section className="ab-hero">
        <div className="ab-hero__overlay" />
        <div className="ab-hero__glow" />
        <div className="container ab-hero__inner">
          <nav className="ab-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>About Us</span>
          </nav>
          <div className="ab-hero__tag">Who We Are</div>
          <h1 className="ab-hero__h1">
            A Technology Studio<br />
            <span className="ab-hero__accent">Built for Scale</span>
          </h1>
          <p className="ab-hero__sub">
            We're a team of engineers, designers, and AI specialists building the digital
            infrastructure of tomorrow — headquartered in Noida, India, serving clients across 20+ countries.
          </p>
          <div className="ab-hero__actions">
            <button onClick={() => openLead()} className="ht-hero__btn-primary">START A PROJECT →</button>
            <Link to="/solutions/web-enterprise-applications" className="ht-hero__btn-outline">EXPLORE SOLUTIONS</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STORY — 2-col light section
      ══════════════════════════════════════════ */}
      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-story__img">
            <DataCard
              variant="area"
              title="Projects delivered"
              labels={['2021', '2022', '2023', 'Now']}
              unit=" / qtr"
              max={34}
              caption="Client engagements shipped per quarter since founding."
            />
          </div>
          <div className="about-story__text">
            <div className="section-tag">Our Story</div>
            <h2>From a Small Studio to a Global Engineering Partner</h2>
            <p>Synerax was founded in Noida, India with a singular mission: to make enterprise-grade technology accessible to every business, regardless of size or location.</p>
            <p>What started as a small development shop has grown into a full-service digital engineering company serving clients across 20+ countries — from early-stage startups to Fortune 500 enterprises.</p>
            <p>Our cross-functional teams bring deep expertise in software engineering, artificial intelligence, cybersecurity, and cloud architecture to every engagement.</p>
            <div className="about-pillars">
              <div className="pillar">
                <div className="pillar__icon">🌍</div>
                <div>
                  <strong>Global Reach, Local Expertise</strong>
                  <p>Serving 20+ countries while staying rooted in India's world-class engineering talent.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar__icon">🏆</div>
                <div>
                  <strong>98% Client Satisfaction</strong>
                  <p>We don't just deliver projects — we build partnerships that last for years.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar__icon">🚀</div>
                <div>
                  <strong>Cutting-Edge by Default</strong>
                  <p>We invest in R&amp;D so our clients always have access to the latest technology innovations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION & VISION — teal glass cards
      ══════════════════════════════════════════ */}
      <section className="ab-mv">
        <div className="container">
          <div className="ab-mv__header">
            <div className="solutions__header" style={{ marginBottom: 0 }}>
              <div className="section-tag solutions__header" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.12)', display: 'inline-block', padding: '0.28em 1em', borderRadius: 999, marginBottom: '1rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Direction</div>
            </div>
            <h2 className="ab-mv__title">Our Mission &amp; Vision</h2>
            <p className="ab-mv__sub">The North Stars that guide every decision we make as a company.</p>
          </div>
          <div className="ab-mv__grid">
            <div className="ab-mv-card">
              <div className="ab-mv-card__badge">Mission</div>
              <h3 className="ab-mv-card__title">Why We Exist</h3>
              <p className="ab-mv-card__desc">Delivering secure, scalable technology solutions that simplify complexity and accelerate digital transformation — enabling organisations of every size to compete at the highest level.</p>
              <p className="ab-mv-card__desc" style={{ marginTop: '1rem' }}>We believe the best technology should be accessible, not just to Fortune 500s, but to every ambitious business ready to grow.</p>
            </div>
            <div className="ab-mv-card">
              <div className="ab-mv-card__badge">Vision</div>
              <h3 className="ab-mv-card__title">Where We're Going</h3>
              <p className="ab-mv-card__desc">To become the most trusted technology partner for enterprises undergoing digital transformation — recognised globally for our depth of expertise, quality of delivery, and long-term client relationships.</p>
              <p className="ab-mv-card__desc" style={{ marginTop: '1rem' }}>A world where technology removes barriers instead of creating them — that's the future Synerax is building toward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUES — wp-card style (matching home)
      ══════════════════════════════════════════ */}
      <section className="wp-section">
        <div className="container">
          <div className="wp-header">
            <div className="section-tag">Our Principles</div>
            <h2 className="wp-title">The Values That <span>Drive Us</span></h2>
            <p className="wp-sub">These guide every technical decision, every client interaction, and every hire we make.</p>
          </div>
          <div className="wp-grid">
            {values.map((v, i) => (
              <div key={i} className="wp-card" style={{ '--wp-accent': v.accent } as React.CSSProperties}>
                <div className="wp-card__top" />
                <div className="wp-card__icon" style={{ background: v.iconBg, color: v.accent, fontSize: '1.3rem' }}>
                  {v.icon}
                </div>
                <h4 className="wp-card__title">{v.title}</h4>
                <p className="wp-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS — st-section style (matching home)
      ══════════════════════════════════════════ */}
      <section className="st-section">
        <div className="container st-section__inner">
          <div className="st-section__left">
            <h2 className="st-section__title">Synerax by the <span>Numbers</span></h2>
            <p className="st-section__sub">Real results, measurable impact — powering the world's most demanding enterprises.</p>
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
          <div className="st-section__right">
            <DataCard
              variant="stacked"
              title="Engagement mix"
              labels={['Cloud', 'AI', 'Development', 'Security', 'Support']}
              unit="K hrs"
              max={12}
              caption="Delivery hours by practice, trailing twelve months."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS — dark navy glass cards
      ══════════════════════════════════════════ */}
      <section className="ab-process">
        <div className="container">
          <div className="ab-process__header">
            <div style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.12)', display: 'inline-block', padding: '0.28em 1em', borderRadius: 999, marginBottom: '1rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const }}>How We Work</div>
            <h2 className="ab-process__title">Our Proven <span>Process</span></h2>
            <p className="ab-process__sub">Four phases built to eliminate risk, maximise quality, and keep you informed every step.</p>
          </div>
          <div className="ab-process__grid">
            {steps.map((s, i) => (
              <div key={i} className="ab-step">
                <div className="ab-step__num">{s.num}</div>
                <h3 className="ab-step__title">{s.title}</h3>
                <p className="ab-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS — new style (matching home)
      ══════════════════════════════════════════ */}
      <section className="testimonials">
        <div className="container">
          <h2 className="testi-title">What Our Clients <span>Say</span></h2>
          <div className="testi-card">
            <div className="testi-card__avatar">{testi.initial}</div>
            <p className="testi-card__quote">{testi.quote}</p>
            <div className="testi-card__author">
              <div className="testi-card__name">{testi.name}</div>
              <div className="testi-card__role">{testi.role}</div>
            </div>
          </div>
          <div className="testi-nav">
            <button className="testi-nav__btn" onClick={() => setTestiIdx(i => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="testi-tracks">
              {testimonials.map((_, i) => (
                <button key={i} className={`testi-track${testiIdx === i ? ' active' : ''}`} onClick={() => setTestiIdx(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button className="testi-nav__btn" onClick={() => setTestiIdx(i => (i + 1) % testimonials.length)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════ */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Work With Us</div>
          <h2>Ready to Build<br /><span>Something Great?</span></h2>
          <p>Join 80+ enterprises that trust Synerax to power their digital transformation.</p>
          <div className="cta-band__actions">
            <button onClick={() => openLead()} className="btn btn--white">Start a Conversation →</button>
            <Link to="/services" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>View Solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
