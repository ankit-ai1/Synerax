import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="ft-new">

      {/* ── Top section ── */}
      <div className="ft-new__top">
        <div className="ft-new__container">

          {/* Left — Logo + tagline + social */}
          <div className="ft-new__brand">
            <Link to="/" className="ft-new__logo">
              <img
                src="https://res.cloudinary.com/dtg3lepr4/image/upload/v1783839642/Gemini_Generated_Image_wrba0fwrba0fwrba-removebg-preview_fujvtu.png"
                alt="Synerax"
                className="ft-new__logo-img"
              />
            </Link>
            <p className="ft-new__tagline">
              From Code to Cloud.<br />
              We Deliver What Others Promise.
            </p>
            <div className="ft-new__socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="ft-new__social">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="ft-new__social">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="ft-new__social">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="ft-new__social">
                <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — 4 columns */}
          <div className="ft-new__cols">

            <div className="ft-new__col">
              <h5 className="ft-new__heading">Solutions</h5>
              <Link to="/solutions/contact-center">Contact Center</Link>
              <Link to="/solutions/frontend">Frontend Development</Link>
              <Link to="/solutions/backend">Backend Development</Link>
              <Link to="/solutions/fullstack">Full Stack & Mobile</Link>
              <Link to="/solutions/agentic-ai">Agentic AI</Link>
              <Link to="/solutions/aws">AWS Infrastructure</Link>
              <Link to="/solutions/cybersecurity">Cybersecurity</Link>
              <Link to="/solutions/inventory">Inventory Management</Link>
              <Link to="/solutions/consulting">IT Consulting</Link>
            </div>

            <div className="ft-new__col">
              <h5 className="ft-new__heading">Industries</h5>
              <Link to="/industries/healthcare">Healthcare</Link>
              <Link to="/industries/financial-services">Financial Services</Link>
              <Link to="/industries/retail">Retail & E-Commerce</Link>
              <Link to="/industries/government">Government</Link>
              <Link to="/industries/education">Education & EdTech</Link>
              <Link to="/industries/logistics">Logistics & Supply Chain</Link>
            </div>

            <div className="ft-new__col">
              <h5 className="ft-new__heading">Company</h5>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/blog">Blog</Link>
            </div>

            <div className="ft-new__col">
              <h5 className="ft-new__heading">Legal</h5>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-new__bottom">
        <div className="ft-new__container ft-new__bottom-inner">
          <span>© 2025–2026 Synerax Cloud Technologies. All rights reserved.</span>
          <div className="ft-new__bottom-links">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-of-service">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
