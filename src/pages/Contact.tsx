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
    {
      q: 'How long does a typical project take?',
      a: 'Timelines vary by scope: a landing page takes 1–2 weeks; a full web/mobile app MVP takes 6–10 weeks; an enterprise platform with AI integrations typically takes 3–6 months. We provide a detailed timeline in every proposal.'
    },
    {
      q: 'What engagement models do you offer?',
      a: 'We work on Fixed-Price (best for well-defined scopes), Time & Materials (best for evolving requirements), and Dedicated Team (best for long-term development). We\'ll recommend the best model for your situation.'
    },
    {
      q: 'Do you sign NDAs before sharing project details?',
      a: 'Absolutely. We sign an NDA at any stage — even before the initial call if you prefer. Your ideas and business information are completely confidential.'
    },
    {
      q: 'What happens after I submit this form?',
      a: 'You\'ll receive a confirmation email immediately. Within 24 hours, a senior specialist will reach out to schedule a 30-minute discovery call. After the call, we\'ll prepare a detailed proposal within 48 hours.'
    },
    {
      q: 'Do you provide post-launch support?',
      a: 'Yes. All projects include a 30-day free support period post-launch. After that, we offer flexible maintenance plans from basic bug fixes to full managed services with 24/7 monitoring and SLA-backed uptime.'
    },
    {
      q: 'Can you work with our existing team and codebase?',
      a: 'Absolutely. Many engagements involve augmenting existing teams or inheriting legacy codebases. We conduct a thorough technical audit first, then provide a transparent assessment before we begin.'
    },
  ]

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link><span>›</span><span>Contact</span>
          </nav>
          <div className="section-tag" style={{ display: 'inline-block', marginBottom: '0.85rem' }}>Get in Touch</div>
          <h1>Let's Build<br /><span className="blue">Something Great</span></h1>
          <p>Tell us about your project and we'll get back to you within 24 hours with a detailed, no-obligation proposal.</p>
        </div>
      </section>

      <section className="contact-page">
        <div className="container">
          {/* Info Cards */}
          <div className="contact-info-cards">
            <div className="info-card">
              <span className="info-card__icon">📧</span>
              <h4>Email Us</h4>
              <p><a href="mailto:syneraxcloudtechnologies@gmail.com">syneraxcloudtechnologies@gmail.com</a></p>
              <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text3)' }}>Reply within 24 hours</p>
            </div>
            <div className="info-card">
              <span className="info-card__icon">📞</span>
              <h4>Call Us</h4>
              <p><a href="tel:+919306917180">+91 9306917180</a></p>
              <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text3)' }}>Mon–Sat, 9 AM – 8 PM IST</p>
            </div>
            <div className="info-card">
              <span className="info-card__icon">📍</span>
              <h4>Our Location</h4>
              <p>Noida, India</p>
              <p style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text3)' }}>Serving clients globally</p>
            </div>
          </div>

          {/* Form + Text */}
          <div className="contact-main">
            <div className="contact-main__left">
              <h2>Start a Project Consultation</h2>
              <p>Fill out the form and one of our specialists will schedule a discovery call — free, no strings attached.</p>
              <ul className="contact-checklist">
                <li>Free initial consultation &amp; scoping</li>
                <li>Detailed proposal within 24 hours</li>
                <li>Fixed-price or T&amp;M models available</li>
                <li>NDA available on request</li>
                <li>30-day post-launch support included</li>
              </ul>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#F0F7FF', border: '1px solid #BFDBFE', borderRadius: 12 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A56DB', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact Details</div>
                <a href="mailto:syneraxcloudtechnologies@gmail.com" style={{ color: '#1A56DB', fontWeight: 600, fontSize: '0.88rem', display: 'block' }}>syneraxcloudtechnologies@gmail.com</a>
                <a href="tel:+919306917180" style={{ color: '#1A56DB', fontWeight: 600, fontSize: '0.88rem', display: 'block', marginTop: '0.3rem' }}>+91 9306917180</a>
                <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.3rem' }}>📍 Noida, India</div>
              </div>
            </div>

            <form className="contact-form-card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" name="company" placeholder="Your Company Ltd." value={form.company} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Service Interested In *</label>
                <select name="service" value={form.service} onChange={handleChange} required>
                  <option value="">Select a service…</option>
                  <option>Contact Center Solutions</option>
                  <option>Frontend Development</option>
                  <option>Backend Development</option>
                  <option>Full Stack / Mobile</option>
                  <option>Agentic AI Solutions</option>
                  <option>AWS Infrastructure</option>
                  <option>DevOps &amp; CI/CD</option>
                  <option>Cybersecurity</option>
                  <option>Inventory Management</option>
                  <option>IT Consulting &amp; Outsourcing</option>
                  <option>Multiple Services</option>
                </select>
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label>Project Brief *</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project — goals, timeline, current challenges, and what success looks like for you…"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                style={submitted ? { background: '#0E9F6E' } : {}}
                disabled={submitted}
              >
                {submitted ? '✓ Sent! We\'ll reply within 24h.' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="faq__header">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub" style={{ margin: '0.5rem auto 0' }}>Everything you need to know before starting a project with us.</p>
          </div>
          <div className="faq__list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}<span className="faq-item__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-item__a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Don't Overthink It</div>
          <h2>Just Say Hello —<br />We Won't Bite</h2>
          <p>No commitment. No sales pressure. Just an honest conversation. Most clients wish they'd reached out sooner.</p>
          <div className="cta-band__actions">
            <a href="mailto:syneraxcloudtechnologies@gmail.com" className="btn btn--white">📧 Email Us Directly</a>
            <Link to="/services" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>View Solutions</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
