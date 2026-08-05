import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const servicesCards = [
  {
    slug: 'contact-center',
    title: 'Contact Center Solutions',
    desc: 'Enterprise-grade omnichannel platform handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, real-time analytics, and a 99.9% uptime SLA.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 14a4 4 0 014-4h6l3 8-4 2.5a22 22 0 009.5 9.5L29 26l8 3v6a4 4 0 01-4 4C17.2 39 9 30.8 9 20.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 14a2 2 0 110-4 2 2 0 010 4zM34 22a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" opacity=".4"/>
      </svg>
    ),
  },
  {
    slug: 'frontend',
    title: 'Frontend Development',
    desc: 'Blazing-fast, responsive web applications built with React, Next.js, and TypeScript. Performance-first architecture with Core Web Vitals optimisation and accessibility compliance.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M16 44h16M24 36v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M13 22l6 6-6 6M22 32h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: 'backend',
    title: 'Backend Development',
    desc: 'Scalable REST/GraphQL APIs, microservices architecture, and robust database design. Node.js, Python, FastAPI — engineered for high-traffic production systems.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <rect x="6" y="22" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="13" cy="13" r="2" fill="currentColor"/>
        <circle cx="13" cy="27" r="2" fill="currentColor"/>
        <path d="M20 36v6M28 36v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'fullstack',
    title: 'Full Stack & Mobile',
    desc: 'Complete end-to-end application development — web and mobile. Flutter, React Native, Swift, Kotlin. API-first architecture with App Store-ready delivery in weeks.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="14" y="4" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="2.2"/>
        <rect x="18" y="8" width="12" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="24" cy="35" r="2" fill="currentColor"/>
        <path d="M6 18l4 4-4 4M42 18l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI Solutions',
    desc: 'Intelligent autonomous agents, LLM-powered automation, and agentic workflows. OpenAI, LangChain, HuggingFace — building AI that works for your business 24/7.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.2"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity=".35"/>
        <path d="M24 4v4M24 40v4M44 24h-4M8 24H4M37.07 10.93l-2.83 2.83M13.76 34.24l-2.83 2.83M37.07 37.07l-2.83-2.83M13.76 13.76l-2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'aws',
    title: 'AWS Infrastructure',
    desc: 'Enterprise AWS, Azure, and GCP architecture with 99.99% availability SLAs. Terraform IaC, Docker/Kubernetes, CI/CD pipelines, and ongoing cost optimisation.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M24 8c-4.5 6.5-6 13-6 16s1.5 9.5 6 16M24 8c4.5 6.5 6 13 6 16s-1.5 9.5-6 16M8 24h32" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 17h28M10 31h28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/>
      </svg>
    ),
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    desc: '24/7 SOC operations, zero-trust architecture, penetration testing, and compliance-ready security. SOC 2 & ISO 27001 certified infrastructure for critical systems.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: 'inventory',
    title: 'Inventory Management',
    desc: 'Real-time stock tracking, AI-powered demand forecasting, multi-warehouse support, and ERP integrations. Reduce overstock and eliminate stockouts with smart automation.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="16" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M18 28h12M18 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'consulting',
    title: 'IT Consulting & Outsourcing',
    desc: 'Strategic IT roadmaps, CTO-as-a-Service, talent outsourcing, and digital transformation advisory. Become an extension of your team at a fraction of the cost.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M8 40c0-8.84 7.16-16 16-16s16 7.16 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M30 28l8 4M38 28l-8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'devops',
    title: 'DevOps & CI/CD',
    desc: 'End-to-end DevOps transformation — automated pipelines, infrastructure-as-code, container orchestration, and 24/7 monitoring. Ship faster with zero-downtime deployments.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M40 8l-8 8M40 8v8M40 8h-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 24l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const techCategories = [
  {
    title: 'Frontend',
    tiles: [
      { logo: '⚛', bg: '#1C1C1F', color: '#0288D1', name: 'React', fontSize: '1.6rem' },
      { logo: 'Next', bg: '#1C1C1F', color: '#000', name: 'Next.js', fontWeight: 900, fontSize: '0.85rem' },
      { logo: 'V', bg: '#1C1C1F', color: '#42B883', name: 'Vue.js', fontWeight: 900 },
      { logo: 'TS', bg: '#1C1C1F', color: '#3178C6', name: 'TypeScript', fontWeight: 900, fontSize: '0.8rem' },
    ],
  },
  {
    title: 'Backend',
    tiles: [
      { logo: 'N', bg: '#1C1C1F', color: '#3C873A', name: 'Node.js', fontWeight: 900 },
      { logo: '🐍', bg: '#1C1C1F', color: '#306998', name: 'Python', fontSize: '1.6rem' },
      { logo: 'FA', bg: '#1C1C1F', color: '#009688', name: 'FastAPI', fontWeight: 900 },
      { logo: 'GQL', bg: '#1C1C1F', color: '#E53935', name: 'GraphQL', fontWeight: 900 },
    ],
  },
  {
    title: 'Mobile',
    tiles: [
      { logo: 'Fl', bg: '#1C1C1F', color: '#0288D1', name: 'Flutter', fontWeight: 900 },
      { logo: '⚛', bg: '#1C1C1F', color: '#0288D1', name: 'React Native', fontSize: '1.5rem' },
      { logo: 'S', bg: '#1C1C1F', color: '#F4511E', name: 'Swift', fontWeight: 900 },
      { logo: 'K', bg: '#1C1C1F', color: '#7C4DFF', name: 'Kotlin', fontWeight: 900 },
    ],
  },
  {
    title: 'AI / ML',
    tiles: [
      { logo: 'GPT', bg: '#1C1C1F', color: '#000', name: 'OpenAI', fontWeight: 900, fontSize: '0.8rem' },
      { logo: 'LC', bg: '#1C1C1F', color: '#1A6B3C', name: 'LangChain', fontWeight: 900 },
      { logo: 'TF', bg: '#1C1C1F', color: '#FF6F00', name: 'TensorFlow', fontWeight: 900 },
      { logo: '🤗', bg: '#1C1C1F', color: '#FFC107', name: 'HuggingFace', fontSize: '1.5rem' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    tiles: [
      { logo: 'AWS', bg: '#1C1C1F', color: '#FF9900', name: 'AWS', fontWeight: 900, fontSize: '0.75rem' },
      { logo: '🐳', bg: '#1C1C1F', color: '#1976D2', name: 'Docker', fontSize: '1.5rem' },
      { logo: '⎈', bg: '#1C1C1F', color: '#326CE5', name: 'Kubernetes', fontSize: '1.4rem' },
      { logo: 'T', bg: '#1C1C1F', color: '#7B42BC', name: 'Terraform', fontWeight: 900 },
    ],
  },
  {
    title: 'Database',
    tiles: [
      { logo: 'PG', bg: '#1C1C1F', color: '#336791', name: 'PostgreSQL', fontWeight: 900 },
      { logo: 'M', bg: '#1C1C1F', color: '#47A248', name: 'MongoDB', fontWeight: 900 },
      { logo: 'R', bg: '#1C1C1F', color: '#D32F2F', name: 'Redis', fontWeight: 900 },
      { logo: 'My', bg: '#1C1C1F', color: '#00758F', name: 'MySQL', fontWeight: 900 },
    ],
  },
]

export default function Services() {
  return (
    <>
      <Nav />

      <section className="page-hero solutions-hero">
        <div className="container">
          <nav className="breadcrumb"><Link to="/">Home</Link><span>›</span><span>Solutions</span></nav>
          <div className="section-tag" style={{ display: 'inline-block', marginBottom: '0.85rem' }}>What We Do</div>
          <h1 className="srv-hero__h1">
            End-to-End Digital <span>Engineering</span>
          </h1>
          <p>From pixel-perfect interfaces to intelligent AI systems, enterprise contact centers, and cloud infrastructure — we handle every layer of your digital stack.</p>
          <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="srv-hero__btn-primary">
              Get a Free Consultation →
            </Link>
            <a href="#solutions" className="srv-hero__btn-outline">
              View Solutions ↓
            </a>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="solutions solutions--light srv-solutions" id="solutions" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="solutions__header">
            <div className="section-tag">Our Solutions</div>
            <h2 className="section-title">
              10 Specialised Practice <span>Areas</span>
            </h2>
            <p className="section-sub" style={{ margin: '0.75rem auto 0' }}>Every solution is delivered by dedicated specialists — ensuring deep expertise at every engagement.</p>
          </div>
          <div className="solutions__grid srv-grid">
            {servicesCards.map(card => (
              <div key={card.slug} className="srv-card">
                <div className="srv-card__icon">{card.svg}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link to={`/solutions/${card.slug}`} className="srv-card__link">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="tech-section" id="techstack">
        <div className="container">
          <div className="tech-section__header">
            <div className="section-tag">Technology We Master</div>
            <h2 className="section-title">
              Our Technology <span>Stack</span>
            </h2>
            <p className="section-sub" style={{ margin: '0.75rem auto 0' }}>Certified across the most in-demand platforms — we stay ahead of the curve so you don't have to.</p>
          </div>
          <div className="tech-categories">
            {techCategories.map(cat => (
              <div className="tech-category" key={cat.title}>
                <div className="tech-category__title">{cat.title}</div>
                <div className="tech-tiles">
                  {cat.tiles.map(tile => (
                    <div className="tech-tile" key={tile.name}>
                      <div
                        className="tech-tile__logo"
                        style={{
                          background: tile.bg,
                          color: tile.color,
                          fontWeight: tile.fontWeight ?? 400,
                          fontSize: tile.fontSize ?? '1rem',
                        }}
                      >
                        {tile.logo}
                      </div>
                      <div className="tech-tile__name">{tile.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section" id="process">
        <div className="container">
          <div className="process__header">
            <div className="section-tag">How We Work</div>
            <h2 className="section-title">
              Our Delivery <span>Process</span>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>A structured four-phase approach ensuring clarity, quality, and confidence at every step.</p>
          </div>
          <div className="process__steps">
            <div className="process-step">
              <div className="process-step__num">01</div>
              <h3>Assess &amp; Discover</h3>
              <p>We audit your current landscape, understand your goals and constraints, and map a clear technical roadmap.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">02</div>
              <h3>Design &amp; Prototype</h3>
              <p>Wireframes, design systems, and clickable prototypes — validated before a single line of production code is written.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">03</div>
              <h3>Implement &amp; Build</h3>
              <p>Agile two-week sprints, continuous integration, and weekly demos keep delivery on track and transparent.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">04</div>
              <h3>Operate &amp; Optimise</h3>
              <p>Zero-downtime deployment, 24/7 monitoring, SLA-backed uptime, and continuous performance optimisation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="cta-band__tag">Have a Project in Mind?</div>
          <h2>
            Get a Proposal<br />in <span style={{ color: '#FF7A45' }}>24 Hours</span>
          </h2>
          <p>No commitment required. Just an honest conversation about your goals and how we can help.</p>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--white">Request a Proposal →</Link>
            <Link to="/about" className="btn btn--outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Learn About Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
