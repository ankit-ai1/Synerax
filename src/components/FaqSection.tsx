import { useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Faq } from '../data/faqs'

/* Shared FAQ block (styles: faq-premium.css). The header and buttons reuse
   the homepage section language — iq-section shell, the svs-lede eyebrow /
   two-line accent heading, iq-btn-fill / iq-btn-ring — so it reads as one
   more homepage band. Answers stay in the DOM while collapsed (the row
   animates 0fr → 1fr) so crawlers and answer engines can read them, matching
   the FAQPage JSON-LD from src/seo.ts. */
export default function FaqSection({ faqs, sub }: { faqs: Faq[]; sub?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  const onContact = useLocation().pathname === '/contact'

  return (
    <section className="iq-section iq-section--tint fq">
      <div className="iq-wrap">

        <div className="fx-lede fx-lede--center svs-lede fq__lede">
          <p className="iq-eye svs-lede__eye">FAQ</p>
          <h2 className="iq-h2 svs-lede__h2">
            Your questions,<br />
            <span className="svs-lede__grad">answered clearly.</span>
          </h2>
          {sub && <p className="iq-body svs-lede__sub">{sub}</p>}
        </div>

        {/* class names here avoid "wrap"/"container" — index.css forces
            max-width: 1600px !important on anything matching those */}
        <div className="fq__inner">
          <div className="fq__list">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              const panelId = `${uid}-a${i}`
              return (
                <div key={i} className={`fq__item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="fq__q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="fq__q-text">{faq.q}</span>
                    <span className="fq__icon" aria-hidden="true" />
                  </button>
                  <div id={panelId} className="fq__a" role="region">
                    <div className="fq__a-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="fq__cta">
            <div>
              <div className="fq__cta-title">Still have questions?</div>
              <p className="fq__cta-text">Talk to a senior engineer. We reply within 24 hours.</p>
            </div>
            <div className="fq__cta-actions">
              <a href="mailto:syneraxcloudtechnologies@gmail.com" className="iq-btn-ring">Email Us</a>
              {onContact
                ? <a href="#contact-form" className="iq-btn-fill">Talk to Our Team</a>
                : <Link to="/contact" className="iq-btn-fill">Talk to Our Team</Link>}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
