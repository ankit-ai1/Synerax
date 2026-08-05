import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DataCard from '../components/DataCard'
import { getSolution, retiredSolutionSlugs, solutions } from '../data/solutions'
import { solutionMeta } from '../data/solutionMeta'
import { useLead } from '../context/LeadContext'

/* ── Animated counter ── */
function Counter({ value, suffix, isText }: { value: string; suffix: string; isText?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (isText || isNaN(Number(value))) return
    const el = ref.current; if (!el) return
    const target = parseInt(value, 10)
    const start = performance.now()
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      const step = (now: number) => {
        const p = Math.min((now - start) / 1800, 1)
        el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, isText])
  if (isText) return <span>{value}</span>
  return <span><span ref={ref}>0</span>{suffix}</span>
}

/* ── Reveal on scroll ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.tl-reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('tl-visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>()
  const solution = slug ? getSolution(slug) : undefined
  const meta = slug ? solutionMeta[slug] : undefined
  const { openLead } = useLead()
  useReveal()

  /* All five photo slots are DataCards now, so none of the old
     load-failure fallback state is needed. */

  /* Retired solutions keep working: send old URLs to their closest
     replacement rather than dropping visitors on the listing page. */
  if (!solution) {
    const replacement = slug ? retiredSolutionSlugs[slug] : undefined
    return <Navigate to={replacement ? `/solutions/${replacement}` : '/services'} replace />
  }

  const accent = meta?.accentColor ?? '#F2622E'

  return (
    <>
      <Nav />

      {/* ═══════════════════════════════════════
          1. HERO — dark navy, white text
      ═══════════════════════════════════════ */}
      <section className="tl-hero fx-pagehero">
        {/* Breadcrumb */}
        <div className="container">
          <nav className="tl-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/services">Solutions</Link>
            <span>›</span>
            <span>{solution.name}</span>
          </nav>
        </div>

        <div className="container tl-hero__inner">
          {/* LEFT */}
          <div className="tl-hero__left">
            <div className="tl-hero__tag" style={{ background: `${accent}28`, color: '#fff', borderColor: `${accent}50` }}>
              {solution.tag}
            </div>
            <h1 className="tl-hero__h1">
              {solution.headline}{' '}
              <span style={{ color: 'var(--accent)' }}>{solution.headlineBlue}</span>
            </h1>
            <p className="tl-hero__desc">{solution.heroDesc}</p>
            <div className="tl-hero__trust">
              <span>✓ NDA Available</span>
              <span>✓ Reply within 24h</span>
              <span>✓ Free Scoping</span>
            </div>
            <div className="tl-hero__actions">
              <button onClick={() => openLead(solution.name)} className="btn btn--primary">Get a Free Consultation →</button>
              <a href="#capabilities" className="tl-hero__ghost-btn">See Capabilities ↓</a>
            </div>
          </div>

          {/* RIGHT — live delivery console */}
          <div className="tl-hero__right">
            <div className="tl-hero__img-wrap">
              <DataCard
                variant="console"
                title={`${solution.name} — delivery`}
                labels={solution.capabilities.map(c => c.title.toLowerCase())}
              />
            </div>
          </div>
        </div>

        {/* STATS STRIP — inside hero at bottom */}
        <div className="container">
          <div className="tl-hero__stats">
            {solution.stats.map((s, i) => (
              <div key={i} className="tl-hero__stat">
                <div className="tl-hero__stat-num" style={{ color: accent }}>
                  <Counter value={s.value} suffix={s.suffix} isText={s.isText} />
                </div>
                <div className="tl-hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          3. CAPABILITIES — "Everything you need"
      ═══════════════════════════════════════ */}
      <section className="tl-caps" id="capabilities">
        <div className="container">
          <div className="tl-caps__header tl-reveal">
            <div className="section-tag" style={{ color: accent }}>Capabilities</div>
            <h2 className="section-title">Everything you <span>need</span></h2>
            <p className="section-sub">
              Six core {solution.name.toLowerCase()} capabilities engineered to turn strategy into measurable results.
            </p>
          </div>
          <div className="tl-caps__grid">
            {solution.capabilities.map((cap, i) => (
              <div key={cap.title} className="tl-cap-card tl-reveal" style={{ '--cap-accent': accent } as React.CSSProperties}>
                <div className="tl-cap-card__icon" style={{ color: accent }}>
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                    <path d={cap.svgPath} />
                  </svg>
                </div>
                <div className="tl-cap-card__num" style={{ color: `${accent}60` }}>0{i + 1}</div>
                <h3 className="tl-cap-card__title">{cap.title}</h3>
                <p className="tl-cap-card__desc">{cap.desc}</p>
                <button onClick={() => openLead(solution.name)} className="tl-cap-card__link" style={{ color: accent, background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}>
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. ENTERPRISE — 2-col image + text
      ═══════════════════════════════════════ */}
      {meta && (
        <section className="tl-enterprise">
          <div className="container tl-enterprise__inner">
            {/* LEFT — Image */}
            <div className="tl-enterprise__img-col tl-reveal">
              <div className="tl-enterprise__img-wrap">
                <DataCard
                  variant="checklist"
                  title={`${solution.name} — what ships`}
                  rows={solution.pillars.map(p => [p.title, p.desc] as [string, string])}
                  caption={meta.technologies.slice(0, 4).join(' · ')}
                />
                {/* Floating accent badge */}
                <div className="tl-enterprise__badge" style={{ background: accent }}>
                  <div className="tl-enterprise__badge-num">{solution.stats[0].value}{solution.stats[0].isText ? '' : solution.stats[0].suffix}</div>
                  <div className="tl-enterprise__badge-lbl">{solution.stats[0].label}</div>
                </div>
              </div>
            </div>

            {/* RIGHT — Text */}
            <div className="tl-enterprise__text tl-reveal">
              <div className="section-tag" style={{ color: accent }}>Enterprise Ready</div>
              <h2 className="tl-enterprise__title">{meta.enterpriseTitle}</h2>
              <div className="tl-enterprise__desc">
                {meta.enterpriseDesc.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {/* 3 inline stats */}
              <div className="tl-enterprise__stats">
                {solution.stats.slice(1, 4).map((s, i) => (
                  <div key={i} className="tl-enterprise__stat">
                    <div className="tl-enterprise__stat-num" style={{ color: accent }}>
                      <Counter value={s.value} suffix={s.suffix} isText={s.isText} />
                    </div>
                    <div className="tl-enterprise__stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => openLead(solution.name)} className="btn btn--primary" style={{ marginTop: '2rem' }}>
                Start Your Project →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          5. INDUSTRY USE CASES — 2-col
      ═══════════════════════════════════════ */}
      {meta && (
        <section className="tl-usecases">
          <div className="container tl-usecases__inner">
            {/* LEFT — List */}
            <div className="tl-usecases__text tl-reveal">
              <div className="section-tag" style={{ color: accent }}>Use Cases</div>
              <h2 className="section-title">Industry Use <span>Cases</span></h2>
              <p className="section-sub" style={{ marginBottom: '2.5rem' }}>
                Trusted across industries to solve real business problems at scale.
              </p>
              <div className="tl-usecases__list">
                {meta.useCases.map((uc, i) => (
                  <div key={i} className="tl-usecase-item" style={{ '--cap-accent': accent } as React.CSSProperties}>
                    <div className="tl-usecase-icon" style={{ color: accent }}>
                      {uc.icon}
                    </div>
                    <div>
                      <h4 className="tl-usecase-title">{uc.title}</h4>
                      <p className="tl-usecase-desc">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Image */}
            <div className="tl-usecases__img-col tl-reveal">
              <div className="tl-usecases__img-wrap">
                <DataCard
                  variant="orbit"
                  title={`${solution.name} — where it runs`}
                  labels={meta.useCases.map(u => u.title)}
                  caption="Hover a use case — each one feeds the same shared context."
                />
                <div className="tl-usecases__img-deco" style={{ borderColor: `${accent}30` }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          6. DARK FEATURE IMAGE — full width
      ═══════════════════════════════════════ */}
      {meta && (
        <div className="tl-dark-feature">
          <DataCard
            variant="stacked"
            title={`${solution.name} — workload split`}
            labels={solution.pillars.map(p => p.title)}
            unit={solution.stats[0]?.suffix?.includes('%') ? '%' : 'K'}
            max={48}
            className="tl-dark-feature__chart"
          />
          <div className="tl-dark-feature__overlay" style={{ background: 'linear-gradient(90deg, rgba(242,98,46,0.88) 0%, rgba(242,98,46,0.45) 60%, transparent 100%)' }}>
            <div className="container">
              <div className="tl-dark-feature__text">
                <h3 className="tl-dark-feature__headline">
                  Enterprise-grade {solution.name.toLowerCase()} for the <span>modern stack</span>
                </h3>
                <p className="tl-dark-feature__sub">
                  Scalable. Secure. Delivered on time — every time.
                </p>
                <button onClick={() => openLead(solution.name)} className="btn btn--white" style={{ marginTop: '1.5rem' }}>
                  Talk to an Expert →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          7. TECHNOLOGY STACK — 2-col
      ═══════════════════════════════════════ */}
      {meta && (
        <section className="tl-techstack">
          <div className="container tl-techstack__inner">
            {/* LEFT — Image */}
            <div className="tl-techstack__img-col tl-reveal">
              <div className="tl-techstack__img-wrap">
                <DataCard
                  variant="area"
                  title={`${solution.name} — throughput`}
                  labels={['Q1', 'Q2', 'Q3', 'Now']}
                  unit="K rps"
                  max={26}
                  caption={`Measured across ${meta.technologies.length} tools in the delivered stack.`}
                />
              </div>
            </div>

            {/* RIGHT — Text + Pills */}
            <div className="tl-techstack__text tl-reveal">
              <div className="section-tag" style={{ color: accent }}>Tech Stack</div>
              <h2 className="section-title">Technologies &amp; Tools We <span>Use</span></h2>
              <p className="section-sub" style={{ marginBottom: '2rem' }}>
                Battle-tested tools and platforms powering every {solution.name.toLowerCase()} engagement.
              </p>
              <div className="tl-tech__pills">
                {meta.technologies.map(t => (
                  <span
                    key={t}
                    className="tl-tech__pill"
                    style={{ borderColor: `${accent}35`, color: accent, background: `${accent}0A` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          8. RELATED SOLUTIONS
      ═══════════════════════════════════════ */}
      <section className="tl-related">
        <div className="container">
          <div className="tl-related__label tl-reveal">Explore Related Solutions</div>
          {/* Driven off the solutions list so the chips can never point at a
              retired slug — the current page drops itself out. */}
          <div className="tl-related__chips tl-reveal">
            {solutions
              .filter(s => s.slug !== slug)
              .slice(0, 6)
              .map(s => (
                <Link key={s.slug} to={`/solutions/${s.slug}`} className="tl-related__chip">
                  {s.pillars[0]?.icon} {s.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. CTA BAND
      ═══════════════════════════════════════ */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">{solution.ctaTag}</div>
          <h2>
            {solution.ctaHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
            ))}
          </h2>
          <p>{solution.ctaDesc}</p>
          <div className="cta-band__actions">
            <button onClick={() => openLead(solution.name)} className="btn btn--white">Start a Project →</button>
            <a href="#capabilities" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              See Capabilities ↑
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
