import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import DataCard from '../components/DataCard'
import { getIndustry } from '../data/industryMeta'

/* ── Scroll reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ind-reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('ind-visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.07 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>()
  const industry = slug ? getIndustry(slug) : undefined
  useReveal()


  if (!industry) return <Navigate to="/" replace />

  const ac = '#F2622E'

  return (
    <>
      <Nav />

      {/* ═══════════════════════════════════════
          1. HERO — dark colored bg
      ═══════════════════════════════════════ */}
      <section className="ind-hero fx-pagehero">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="ind-breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <span>Industries</span><span>›</span>
            <span>{industry.name}</span>
          </nav>

          <div className="ind-hero__inner">
            <div className="ind-hero__chip">{industry.tag}</div>
            <h1 className="ind-hero__h1">
              {industry.heroTitle}<br />
              <span style={{ color: 'var(--accent)' }}>{industry.heroTitleBlue}</span>
            </h1>
            <p className="ind-hero__desc">{industry.heroDesc}</p>
            <div className="ind-hero__actions">
              <Link to="/contact" className="btn btn--white">Get Free Consultation →</Link>
              <a href="#solutions" className="ind-hero__ghost">Learn About Our Solutions</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. STATS STRIP
      ═══════════════════════════════════════ */}
      <section className="ind-stats">
        <div className="container">
          <div className="ind-stats__grid">
            {industry.stats.map((s, i) => (
              <div key={i} className="ind-stat ind-reveal">
                <div className="ind-stat__val" style={{ color: ac }}>{s.value}</div>
                <div className="ind-stat__lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. CHALLENGES
      ═══════════════════════════════════════ */}
      <section className="ind-challenges">
        <div className="container">
          <div className="ind-challenges__header ind-reveal">
            <h2 className="ind-challenges__title">{industry.challengeTitle}</h2>
            <p className="ind-challenges__desc">{industry.challengeDesc}</p>
          </div>
          <div className="ind-challenges__grid ind-reveal">
            {industry.challenges.map((c, i) => (
              <div key={i} className="ind-challenge-item">
                <span className="ind-challenge-check" style={{ color: ac }}>✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. FEATURE — image left, text right
      ═══════════════════════════════════════ */}
      <section className="ind-feature">
        <div className="container ind-feature__inner">
          <div className="ind-feature__img-col ind-reveal">
            <DataCard
              variant="radar"
              title={`${industry.name} readiness`}
              labels={industry.specializations.map(s => s.title)}
              caption={`Coverage across our ${industry.name.toLowerCase()} specialisations.`}
            />
          </div>
          <div className="ind-feature__text ind-reveal">
            <h3 className="ind-feature__title">{industry.featureTitle}</h3>
            <p className="ind-feature__desc">{industry.featureDesc}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. SPECIALIZED SOLUTIONS — 3-col
      ═══════════════════════════════════════ */}
      <section className="ind-specialized" id="solutions">
        <div className="container">
          <h2 className="ind-specialized__title ind-reveal">{industry.specializedTitle}</h2>
          <div className="ind-specialized__grid">
            {industry.specializations.map((sp, i) => (
              <div key={i} className="ind-spec-card ind-reveal">
                <div className="ind-spec-card__icon">{sp.icon}</div>
                <h4 className="ind-spec-card__title">{sp.title}</h4>
                <ul className="ind-spec-card__list">
                  {sp.points.map((pt, j) => (
                    <li key={j}>
                      <span className="ind-spec-check" style={{ color: ac }}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. COMPLIANCE — text left, image right
      ═══════════════════════════════════════ */}
      <section className="ind-compliance">
        <div className="container ind-compliance__inner">
          <div className="ind-compliance__text ind-reveal">
            <h3 className="ind-compliance__title">{industry.complianceTitle}</h3>
            <p className="ind-compliance__desc">{industry.complianceDesc}</p>
            <Link to="/contact" className="btn btn--primary" style={{ marginTop: '1.75rem' }}>
              Talk to an Expert →
            </Link>
          </div>
          <div className="ind-compliance__img-col ind-reveal">
            <DataCard
              variant="checklist"
              title={`${industry.name} — challenges solved`}
              rows={industry.challenges.map(c => [c, 'Addressed in every engagement'] as [string, string])}
              caption="Verified continuously, not at renewal."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. KEY BENEFITS — dark colored bg
      ═══════════════════════════════════════ */}
      <section className="ind-benefits" style={{ background: ac }}>
        <div className="container">
          <h2 className="ind-benefits__title ind-reveal">{industry.benefitsTitle}</h2>
          <div className="ind-benefits__grid ind-reveal">
            {industry.benefits.map((b, i) => (
              <div key={i} className="ind-benefit-item">
                <span className="ind-benefit-check">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. CTA
      ═══════════════════════════════════════ */}
      <section className="ind-cta">
        <div className="container ind-cta__inner ind-reveal">
          <h2 className="ind-cta__title">{industry.ctaTitle}</h2>
          <p className="ind-cta__desc">{industry.ctaDesc}</p>
          <Link to="/contact" className="btn btn--primary" style={{ background: ac, marginTop: '1.5rem' }}>
            Get a Free Consultation →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
