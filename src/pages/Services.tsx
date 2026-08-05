import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { solutions } from '../data/solutions'

/* Cards are derived from the single solutions source, so the listing can
   never drift out of sync with the nav, the footer and the pages. The icon
   reuses each solution's first capability glyph — same 48-unit system the
   hand-written cards used. */
const servicesCards = solutions.map(s => ({
  slug: s.slug,
  title: s.name,
  desc: s.heroDesc,
  svg: (
    <svg viewBox="0 0 48 48" fill="none">
      <path d={s.capabilities[0].svgPath} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}))


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
              8 Specialised Practice <span>Areas</span>
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
