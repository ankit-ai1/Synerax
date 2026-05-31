import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const sections = [
  {
    num: '1',
    title: 'Agreement to Terms',
    text: 'By accessing and using the Synerax website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.',
    items: [],
  },
  {
    num: '2',
    title: 'Use License',
    intro: 'Permission is granted to temporarily download and access our website and services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and these rights may be revoked at any time.',
    intro2: 'You may not:',
    items: [
      'Reproduce or copy materials for commercial purposes',
      'Transmit materials to any network, copy or modify the materials',
      'Remove any copyright or proprietary notations from materials',
      'Transfer the materials to another person or "mirror" the materials',
    ],
  },
  {
    num: '3',
    title: 'Disclaimer',
    text: "The materials on Synerax's website are provided on an 'as is' basis. Synerax makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    items: [],
  },
  {
    num: '4',
    title: 'Limitations',
    text: "In no event shall Synerax or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Synerax's website, even if Synerax or a Synerax authorised representative has been notified orally or in writing of the possibility of such damage.",
    items: [],
  },
  {
    num: '5',
    title: 'Accuracy of Materials',
    text: "The materials appearing on Synerax's website could include technical, typographical, or photographic errors. Synerax does not warrant that any of the materials on our website are accurate, complete, or current.",
    items: [],
  },
  {
    num: '6',
    title: 'Links',
    text: 'Synerax has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Synerax of the site. Use of any such linked website is at the user\'s own risk.',
    items: [],
  },
  {
    num: '7',
    title: 'Modifications',
    text: 'Synerax may revise these Terms of Service for our website at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.',
    items: [],
  },
  {
    num: '8',
    title: 'Governing Law',
    text: 'These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.',
    items: [],
  },
]

export default function TermsOfService() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="container pp-hero__inner">
          <nav className="pp-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Terms of Service</span>
          </nav>
          <h1 className="pp-hero__h1">
            Terms of <span className="pp-accent">Service</span>
          </h1>
          <p className="pp-hero__sub">
            Please read these Terms of Service carefully before using our website and services.
            By accessing Synerax, you agree to be bound by these terms.
          </p>
          <p className="pp-hero__date">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="pp-content">
        <div className="container pp-content__inner">
          {sections.map(s => (
            <div key={s.num} className="pp-card">
              <h2 className="pp-card__title">
                <span className="pp-card__num">{s.num}.</span> {s.title}
              </h2>

              {'intro' in s && s.intro && (
                <p className="pp-card__body">{s.intro}</p>
              )}
              {'intro2' in s && s.intro2 && (
                <p className="pp-card__body" style={{ marginTop: '0.75rem' }}>{s.intro2}</p>
              )}
              {s.items.length > 0 && (
                <ul className="pp-card__list">
                  {s.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {'text' in s && s.text && (
                <p className="pp-card__body">{s.text}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="pp-cta">
        <div className="container pp-cta__inner">
          <div className="pp-cta__left">
            <img src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1780252831/synerax_logo_oc4xfs.png" alt="Synerax" className="pp-cta__brand-logo" />
            <div className="pp-cta__tagline">Building tomorrow's digital infrastructure.</div>
          </div>
          <div className="pp-cta__actions">
            <Link to="/contact" className="pp-cta__btn">Contact us →</Link>
            <Link to="/privacy-policy" className="pp-cta__btn">Privacy Policy →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
