import { useState, useEffect, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useLead, Lead } from '../context/LeadContext'

const SERVICES = [
  'Contact Center Solutions',
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Agentic AI Solutions',
  'AWS Infrastructure',
  'Inventory Management',
  'Other',
]

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹2,00,000',
  '₹2,00,000 – ₹5,00,000',
  '₹5,00,000 – ₹20,00,000',
  '₹20,00,000+',
  'Not sure yet',
]

// ── EmailJS config (replace with your actual IDs from emailjs.com) ──
const EJS_SERVICE  = 'service_synerax'    // your EmailJS service ID
const EJS_TEMPLATE = 'template_lead'      // your EmailJS template ID
const EJS_PUBLIC   = 'YOUR_PUBLIC_KEY'    // your EmailJS public key

export default function LeadModal() {
  const { isOpen, defaultService, closeLead, saveLead } = useLead()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: defaultService, budget: '', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  // sync defaultService whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(f => ({ ...f, service: defaultService }))
      setSent(false)
      setError('')
    }
  }, [isOpen, defaultService])

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const lead: Lead = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    // Save locally first (always works)
    saveLead(lead)

    // Send email via EmailJS
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        from_name:    form.name,
        from_email:   form.email,
        phone:        form.phone,
        company:      form.company,
        service:      form.service,
        budget:       form.budget,
        message:      form.message,
        to_email:     'syneraxcloudtechnologies@gmail.com',
      }, EJS_PUBLIC)
    } catch {
      // Email failed but lead is saved locally — don't block the user
      console.warn('EmailJS send failed; lead saved locally.')
    }

    setSending(false)
    setSent(true)

    // Auto-close after 3 s
    setTimeout(() => {
      closeLead()
      setForm({ name:'', email:'', phone:'', company:'', service:'', budget:'', message:'' })
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="lm-overlay" onClick={e => { if (e.target === e.currentTarget) closeLead() }}>
      <div className="lm-modal">

        {/* close btn */}
        <button className="lm-close" onClick={closeLead} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {sent ? (
          <div className="lm-success">
            <div className="lm-success__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3>Thank you, {form.name}!</h3>
            <p>We've received your enquiry and will reach out within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="lm-header">
              <div className="lm-header__tag">Let's Work Together</div>
              <h2 className="lm-header__h2">Tell us about your project</h2>
              <p className="lm-header__sub">Share your requirements and we'll craft the perfect solution for you.</p>
            </div>

            <form className="lm-form" onSubmit={submit} noValidate>
              <div className="lm-row">
                <div className="lm-field">
                  <label>Full Name <span>*</span></label>
                  <input name="name" value={form.name} onChange={change} placeholder="" required />
                </div>
                <div className="lm-field">
                  <label>Email Address <span>*</span></label>
                  <input name="email" type="email" value={form.email} onChange={change} placeholder="" required />
                </div>
              </div>

              <div className="lm-row">
                <div className="lm-field">
                  <label>Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={change} placeholder="" />
                </div>
                <div className="lm-field">
                  <label>Company / Organisation</label>
                  <input name="company" value={form.company} onChange={change} placeholder="" />
                </div>
              </div>

              <div className="lm-row">
                <div className="lm-field">
                  <label>Service Interested In <span>*</span></label>
                  <select name="service" value={form.service} onChange={change} required>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="lm-field">
                  <label>Estimated Budget</label>
                  <select name="budget" value={form.budget} onChange={change}>
                    <option value="">Select a range…</option>
                    {BUDGETS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="lm-field lm-field--full">
                <label>Message / Project Details</label>
                <textarea name="message" value={form.message} onChange={change}
                  rows={4} placeholder="" />
              </div>

              {error && <p className="lm-error">{error}</p>}

              <button className="lm-submit" type="submit" disabled={sending}>
                {sending
                  ? <><span className="lm-spinner"/> Sending…</>
                  : 'Submit Enquiry →'
                }
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
