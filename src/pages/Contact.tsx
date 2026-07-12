import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', company: '',
    service: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
    }, 4000)
  }

  const faqs = [
    { q: 'How long does a typical project take?', a: 'Timelines vary by scope: a landing page takes 1–2 weeks; a full web/mobile app MVP takes 6–10 weeks; an enterprise platform with AI integrations typically takes 3–6 months. We provide a detailed timeline in every proposal.' },
    { q: 'What engagement models do you offer?', a: 'We work on Fixed-Price (best for well-defined scopes), Time & Materials (best for evolving requirements), and Dedicated Team (best for long-term development). We\'ll recommend the best model for your situation.' },
    { q: 'Do you sign NDAs before sharing project details?', a: 'Absolutely. We sign an NDA at any stage — even before the initial call if you prefer. Your ideas and business information are completely confidential.' },
    { q: 'What happens after I submit this form?', a: 'You\'ll receive a confirmation email immediately. Within 24 hours, a senior specialist will reach out to schedule a 30-minute discovery call. After the call, we\'ll prepare a detailed proposal within 48 hours.' },
    { q: 'Do you provide post-launch support?', a: 'Yes. All projects include a 30-day free support period post-launch. After that, we offer flexible maintenance plans from basic bug fixes to full managed services with 24/7 monitoring and SLA-backed uptime.' },
    { q: 'Can you work with our existing team and codebase?', a: 'Absolutely. Many engagements involve augmenting existing teams or inheriting legacy codebases. We conduct a thorough technical audit first, then provide a transparent assessment before we begin.' },
  ]

  const contactInfo = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
        </svg>
      ),
      label: 'Email Us',
      value: 'syneraxcloudtechnologies@gmail.com',
      sub: 'Reply within 24 hours',
      href: 'mailto:syneraxcloudtechnologies@gmail.com'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
        </svg>
      ),
      label: 'Call Us',
      value: '+91 9306917180',
      sub: 'Mon–Sat, 9 AM – 8 PM IST',
      href: 'tel:+919306917180'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Our Location',
      value: 'Noida, India',
      sub: 'Serving clients globally',
      href: '#'
    },
  ]

  const perks = [
    'Free initial consultation & scoping',
    'Detailed proposal within 24 hours',
    'Fixed-price or T&M models available',
    'NDA available on request',
    '30-day post-launch support included',
  ]

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="ct-hero">
        <div className="ct-hero__bg" />
        <div className="ct-container">
          <nav className="ct-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Contact</span>
          </nav>
          <div className="ct-hero__content">
            <span className="ct-hero__tag">Get In Touch</span>
            <h1 className="ct-hero__h1">
              Let's Build <span>Together</span>
            </h1>
            <p className="ct-hero__sub">
              Tell us about your project and we'll get back to you within 24 hours
              with a detailed, no-obligation proposal.
            </p>

            {/* Trust badges */}
            <div className="ct-hero__badges">
              <div className="ct-hero__badge-item">
                <span className="ct-hero__badge-check">✓</span>
                NDA Available
              </div>
              <div className="ct-hero__badge-item">
                <span className="ct-hero__badge-check">✓</span>
                Reply within 24h
              </div>
              <div className="ct-hero__badge-item">
                <span className="ct-hero__badge-check">✓</span>
                Free Scoping
              </div>
              <div className="ct-hero__badge-item">
                <span className="ct-hero__badge-check">✓</span>
                Senior Engineers Only
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="ct-hero__cta"
              onClick={() => {
                const el = document.getElementById('contact-form')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span>Start a Project</span>
              <span className="ct-hero__cta-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                </svg>
              </span>
            </button>

          </div>

          {/* Contact info cards inside hero */}
          <div className="ct-info-row">
            {contactInfo.map((c, i) => (
              <a key={i} href={c.href} className="ct-info-card">
                <div className="ct-info-card__icon">{c.icon}</div>
                <div className="ct-info-card__body">
                  <div className="ct-info-card__label">{c.label}</div>
                  <div className="ct-info-card__value">{c.value}</div>
                  <div className="ct-info-card__sub">{c.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN FORM SECTION ── */}
      <section className="ct-main" id="contact-form">
        <div className="ct-container ct-main__grid">

          {/* Left */}
          <div className="ct-left">
            <span className="ct-left__tag">Why Work With Us</span>
            <h2 className="ct-left__h2">Start a Project <span>Consultation</span></h2>
            <p className="ct-left__desc">
              Fill out the form and one of our senior specialists will schedule
              a discovery call — free, no strings attached.
            </p>

            <ul className="ct-perks">
              {perks.map((p, i) => (
                <li key={i} className="ct-perk">
                  <span className="ct-perk__check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            {/* Contact details box */}
            <div className="ct-details-box">
              <div className="ct-details-box__label">Direct Contact</div>
              <a href="mailto:syneraxcloudtechnologies@gmail.com" className="ct-details-box__link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                </svg>
                syneraxcloudtechnologies@gmail.com
              </a>
              <a href="tel:+919306917180" className="ct-details-box__link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
                +91 9306917180
              </a>
              <div className="ct-details-box__loc">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Noida, India — Serving clients globally
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="ct-form-card">
            {submitted ? (
              <div className="ct-success">
                <div className="ct-success__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours with a detailed proposal.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ct-form">
                <div className="ct-form__row">
                  <div className="ct-form__group">
                    <label>Full Name <span>*</span></label>
                    <input type="text" name="name" placeholder="" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="ct-form__group">
                    <label>Email <span>*</span></label>
                    <input type="email" name="email" placeholder="" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="ct-form__row">
                  <div className="ct-form__group">
                    <label>Phone</label>
                    <input type="tel" name="phone" placeholder="" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="ct-form__group">
                    <label>Company</label>
                    <input type="text" name="company" placeholder="" value={form.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="ct-form__group">
                  <label>Service Interested In <span>*</span></label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service…</option>
                    <option>Contact Center Solutions</option>
                    <option>Frontend Development</option>
                    <option>Backend Development</option>
                    <option>Full Stack / Mobile</option>
                    <option>Agentic AI Solutions</option>
                    <option>AWS Infrastructure</option>
                    <option>Cybersecurity</option>
                    <option>Inventory Management</option>
                    <option>IT Consulting & Outsourcing</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                <div className="ct-form__group">
                  <label>Estimated Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select a budget range…</option>
                    <option>Under ₹5 Lakhs / $5K</option>
                    <option>₹5–20 Lakhs / $5K–$25K</option>
                    <option>₹20–50 Lakhs / $25K–$60K</option>
                    <option>₹50 Lakhs+ / $60K+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>
                <div className="ct-form__group">
                  <label>Project Brief <span>*</span></label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder=""
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="ct-form__submit">
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ct-faq">
        <div className="ct-container">
          <div className="ct-faq__header">
            <span className="ct-hero__tag">FAQ</span>
            <h2 className="ct-faq__h2">Frequently Asked <span>Questions</span></h2>
            <p className="ct-faq__sub">Everything you need to know before starting a project with us.</p>
          </div>
          <div className="ct-faq__list">
            {faqs.map((faq, i) => (
              <div key={i} className={`ct-faq__item${openFaq === i ? ' open' : ''}`}>
                <button className="ct-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="ct-faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="ct-faq__a">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Don't Overthink It</div>
          <h2>Just Say Hello —<br /><span>We Won't Bite</span></h2>
          <p>No commitment. No sales pressure. Just an honest conversation. Most clients wish they'd reached out sooner.</p>
          <div className="cta-band__actions">
            <a href="mailto:syneraxcloudtechnologies@gmail.com" className="btn btn--white">📧 Email Us Directly</a>
            <Link to="/solutions/contact-center" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>View Solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
