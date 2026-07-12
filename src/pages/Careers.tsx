import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLead } from '../context/LeadContext'

const benefits = [
  { icon: '🏠', title: 'Remote-First', desc: 'Work from anywhere in the world. We are fully distributed and have been since day one.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Top-of-market salaries benchmarked against global tech companies, paid in your local currency.' },
  { icon: '📈', title: 'Fast Growth', desc: 'Accelerated career progression. Engineers who join as seniors become leads within 12–18 months.' },
  { icon: '🎓', title: 'Learning Budget', desc: '$2,000/year for courses, conferences, books, and certifications. We invest in your growth.' },
  { icon: '🏥', title: 'Health Coverage', desc: 'Comprehensive health, dental, and vision insurance for you and your dependants.' },
  { icon: '💡', title: '20% R&D Time', desc: 'One day per week to explore new technologies, build side projects, or contribute to open source.' },
  { icon: '🌍', title: 'Global Team', desc: 'Work alongside world-class engineers across 20+ countries. Diverse perspectives, better solutions.' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'Take the time you need. We trust our team to manage their time and deliver results.' },
]

const openings = [
  { id: 1, title: 'Senior React Developer', dept: 'Engineering', location: 'Remote', experience: '4–6 years', type: 'Full-time', posted: '2026-05-20', isNew: true },
  { id: 2, title: 'Node.js Backend Engineer', dept: 'Engineering', location: 'Hyderabad', experience: '3–5 years', type: 'Full-time', posted: '2026-05-18', isNew: true },
  { id: 3, title: 'AI/ML Engineer', dept: 'AI & Research', location: 'Remote', experience: '3–6 years', type: 'Full-time', posted: '2026-05-10', isNew: false },
  { id: 4, title: 'DevOps Engineer (AWS)', dept: 'Infrastructure', location: 'Remote', experience: '4–7 years', type: 'Full-time', posted: '2026-04-28', isNew: false },
  { id: 5, title: 'UI/UX Designer', dept: 'Design', location: 'Delhi / Remote', experience: '2–4 years', type: 'Full-time', posted: '2026-05-25', isNew: true },
  { id: 6, title: 'Business Development Manager', dept: 'Sales', location: 'Mumbai', experience: '5+ years', type: 'Full-time', posted: '2026-05-15', isNew: false },
]

const DEPTS = ['All', 'Engineering', 'AI & Research', 'Infrastructure', 'Design', 'Sales']

const values = [
  { num: '01', title: 'Ship with pride', desc: 'We care deeply about the quality of what we build. Every PR is a reflection of our standards.' },
  { num: '02', title: 'Own the outcome', desc: 'We do not hand off problems. We own them through to resolution, however long it takes.' },
  { num: '03', title: 'Communicate openly', desc: 'No hidden agendas. We share context, raise blockers early, and give honest feedback.' },
  { num: '04', title: 'Grow together', desc: 'We invest in each other\'s growth. A rising tide lifts all ships.' },
]

export default function Careers() {
  const [activedept, setActivedept] = useState('All')
  const { openLead } = useLead()

  const filtered = activedept === 'All' ? openings : openings.filter(j => j.dept === activedept)

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="car-hero">
        <div className="car-hero__bg" />
        <div className="container car-hero__inner">
          <div className="car-hero__label">We're Hiring</div>
          <h1 className="car-hero__h1">
            Join Our <span className="car-hero__accent">Team</span>
          </h1>
          <p className="car-hero__sub">
            Join a team of world-class engineers, AI researchers, and product thinkers
            building enterprise technology used by millions of people every day.
          </p>
          <div className="car-hero__stats">
            <div className="car-hero__stat"><span>20+</span>Countries</div>
            <div className="car-hero__stat"><span>100+</span>Team Members</div>
            <div className="car-hero__stat"><span>4.9★</span>Glassdoor Rating</div>
            <div className="car-hero__stat"><span>$2K</span>Learning Budget</div>
          </div>
          <div className="car-hero__actions">
            <a href="#openings" className="btn btn--primary">See Open Roles ↓</a>
            <button onClick={() => openLead('Careers')} className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
              Send Your CV →
            </button>
          </div>
        </div>
        <div className="car-hero__scroll">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/>
          </svg>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="car-values">
        <div className="container">
          <div className="car-values__header">
            <div className="section-tag">How We Work</div>
            <h2 className="car-values__h2">Our Engineering Culture</h2>
          </div>
          <div className="car-values__grid">
            {values.map(v => (
              <div key={v.num} className="car-val-card">
                <div className="car-val-card__num">{v.num}</div>
                <h3 className="car-val-card__title">{v.title}</h3>
                <p className="car-val-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="car-benefits">
        <div className="container">
          <div className="car-benefits__header">
            <div className="section-tag">Perks & Benefits</div>
            <h2 className="car-benefits__h2">Why engineers love working here</h2>
            <p className="car-benefits__sub">We take care of our team so our team can take care of our customers.</p>
          </div>
          <div className="car-benefits__grid">
            {benefits.map((b, i) => (
              <div key={i} className="car-benefit-card">
                <div className="car-benefit-card__icon">{b.icon}</div>
                <h4 className="car-benefit-card__title">{b.title}</h4>
                <p className="car-benefit-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="car-jobs" id="openings">
        <div className="container">
          <div className="car-jobs__header">
            <div>
              <div className="section-tag">Open Positions</div>
              <h2 className="car-jobs__h2">Find your next role</h2>
            </div>
            <div className="car-dept-filters">
              {DEPTS.map(d => (
                <button
                  key={d}
                  className={`car-dept-btn${activedept === d ? ' active' : ''}`}
                  onClick={() => setActivedept(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="car-jobs__list">
            {filtered.map(job => (
              <div key={job.id} className="job-card">
                <div className="car-job-card__left">
                  <div className="car-job-card__meta">
                    <span className="car-job-card__dept">{job.dept}</span>
                    <span className="car-job-card__dot" />
                    <span className="car-job-card__loc">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {job.location}
                    </span>
                    <span className="car-job-card__dot" />
                    <span className="car-job-card__type">{job.type}</span>
                    <span className="car-job-card__dot" />
                    <span className="car-job-card__exp">{job.experience}</span>
                    {job.isNew && (
                      <>
                        <span className="car-job-card__dot" />
                        <span className="job-badge-new">New</span>
                      </>
                    )}
                  </div>
                  <h3 className="car-job-card__title">{job.title}</h3>
                </div>
                <div className="car-job-card__right">
                  <a href={`mailto:careers@synerax.in?subject=Application for ${job.title}`} className="btn btn--primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.2rem' }}>
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="car-jobs__empty">No open roles in this department right now. Check back soon!</div>
            )}
          </div>

          {/* General apply */}
          <div className="car-general-apply">
            <div className="car-general-apply__text">
              <h3>Don't see a perfect fit?</h3>
              <p>We're always looking for exceptional talent. Send us your CV and we'll reach out when the right role opens up.</p>
            </div>
            <button onClick={() => openLead('Careers — General Application')} className="btn btn--primary">
              Send General Application →
            </button>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="car-process">
        <div className="container">
          <div className="car-process__header">
            <div className="section-tag">Hiring Process</div>
            <h2 className="car-process__h2">Simple, transparent, fast</h2>
            <p className="car-process__sub">We respect your time. Our entire process takes 2–3 weeks from first contact to offer.</p>
          </div>
          <div className="car-process__steps">
            {[
              { step: '01', title: 'Apply', desc: 'Submit your CV and a short note about what excites you about Synerax. No cover letter essays required.' },
              { step: '02', title: 'Intro Call', desc: '30-minute video call with the hiring manager. We talk about your experience, goals, and answer your questions.' },
              { step: '03', title: 'Technical Round', desc: 'A practical, take-home exercise relevant to the role. No whiteboard algorithms — real problems we actually face.' },
              { step: '04', title: 'Team Interview', desc: 'Meet the team you\'ll be working with. A 60-minute conversation — no trick questions, just genuine discussion.' },
              { step: '05', title: 'Offer', desc: 'We move fast. Successful candidates receive an offer within 48 hours of the final interview.' },
            ].map((s, i) => (
              <div key={i} className="car-process__step">
                <div className="car-process__step-num">{s.step}</div>
                <div className="car-process__step-line" />
                <h4 className="car-process__step-title">{s.title}</h4>
                <p className="car-process__step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Join the Team</div>
          <h2>Ready to do the best<br />work of your career?</h2>
          <p>We are building something meaningful. Come build it with us.</p>
          <div className="cta-band__actions">
            <a href="#openings" className="btn btn--white">See Open Roles →</a>
            <button onClick={() => openLead('Careers')} className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Send Your CV
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
