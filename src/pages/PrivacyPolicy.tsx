import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const sections = [
  {
    num: '1',
    title: 'Information We Collect',
    intro: 'We collect information you provide directly to us, such as when you fill out forms on our website, including:',
    items: [
      'Name and email address',
      'Company information',
      'Phone number and contact information',
      'Messages and inquiries',
      'Payment and billing information',
    ],
  },
  {
    num: '2',
    title: 'How We Use Your Information',
    intro: 'We use the information we collect for the following purposes:',
    items: [
      'Provide and improve our services',
      'Respond to your inquiries and requests',
      'Send marketing and promotional communications',
      'Analyze usage patterns and optimize our website',
      'Comply with legal obligations',
    ],
  },
  {
    num: '3',
    title: 'Data Security',
    intro: null,
    text: 'We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.',
    items: [],
  },
  {
    num: '4',
    title: 'Cookies and Tracking',
    intro: null,
    text: 'Our website may use cookies and similar tracking technologies to enhance your experience. These technologies help us understand how you interact with our site and improve functionality. You may disable cookies in your browser settings; however, some features of our site may not function properly as a result.',
    items: [],
  },
  {
    num: '5',
    title: 'Third-Party Links',
    intro: null,
    text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. Please review their privacy policies before providing any personal information.',
    items: [],
  },
  {
    num: '6',
    title: 'Your Rights',
    intro: 'Depending on your location, you may have certain rights regarding your personal information, including:',
    items: [
      'The right to access your personal data',
      'The right to correct inaccurate or incomplete data',
      'The right to request deletion of your personal data',
      'The right to opt out of marketing communications',
      'The right to data portability',
    ],
  },
  {
    num: '7',
    title: 'Changes to This Policy',
    intro: null,
    text: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes your acceptance of the updated policy.',
    items: [],
  },
  {
    num: '8',
    title: 'Contact Us',
    intro: null,
    text: 'If you have any questions about this Privacy Policy or our data practices, please reach out to us at syneraxcloudtechnologies@gmail.com or write to us at our office in Noida, India. We are happy to address any concerns.',
    items: [],
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="container pp-hero__inner">
          <nav className="pp-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="pp-hero__h1">
            Privacy <span className="pp-accent">Policy</span>
          </h1>
          <p className="pp-hero__sub">
            Your privacy is important to us. This policy explains how Synerax collects,
            uses, and protects your personal information.
          </p>
          <p className="pp-hero__date">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
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
              {s.intro && <p className="pp-card__body">{s.intro}</p>}
              {s.items && s.items.length > 0 && (
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
            <Link to="/blog" className="pp-cta__btn">Read our Blog →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
