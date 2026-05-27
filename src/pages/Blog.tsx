import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Product:     { bg: 'rgba(29,78,216,0.15)',  color: '#60A5FA' },
  Engineering: { bg: 'rgba(234,88,12,0.15)',  color: '#FB923C' },
  Culture:     { bg: 'rgba(124,58,237,0.15)', color: '#C084FC' },
  Industry:    { bg: 'rgba(21,128,61,0.15)',  color: '#4ADE80' },
  AI:          { bg: 'rgba(202,138,4,0.15)',  color: '#FACC15' },
  DevOps:      { bg: 'rgba(190,18,60,0.15)',  color: '#FB7185' },
}

const posts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    tag: 'AI',
    date: 'May 18, 2025',
    read: '8 min read',
    title: 'The Future of Contact Centers: AI-Powered Customer Excellence',
    desc: 'Explore how AI is revolutionising customer engagement, reducing handle times by 45%, and what it means for enterprise contact center strategy in the modern era.',
    featured: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering',
    date: 'May 10, 2025',
    read: '12 min read',
    title: 'Scaling to 50 Million Interactions Monthly: Our AWS Architecture Story',
    desc: 'A deep dive into the infrastructure and engineering decisions behind 99.9% uptime at massive scale using AWS, Kubernetes, and Terraform.',
    featured: false,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tag: 'Culture',
    date: 'May 5, 2025',
    read: '6 min read',
    title: 'Building a High-Performance Development Team Across Time Zones',
    desc: 'Our proven strategies for hiring, onboarding, and retaining world-class engineers in a fully distributed engineering organisation.',
    featured: false,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tag: 'Industry',
    date: 'Apr 28, 2025',
    read: '7 min read',
    title: 'The Rise of Omnichannel Customer Support in 2025',
    desc: 'Why businesses are moving beyond single-channel solutions and embracing true omnichannel — voice, chat, email, WhatsApp — in one unified workspace.',
    featured: false,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80',
    tag: 'Product',
    date: 'Apr 20, 2025',
    read: '9 min read',
    title: 'Security First: How We Protect Your Data at Every Layer',
    desc: 'Understanding the security measures, zero-trust architecture, and compliance frameworks we implement to keep your customer data safe.',
    featured: false,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering',
    date: 'Apr 12, 2025',
    read: '10 min read',
    title: 'Next-Gen API Design: Building for Scale, Speed, and the Future',
    desc: 'Best practices for designing REST and GraphQL APIs that scale to millions of requests and remain backward compatible.',
    featured: false,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    tag: 'AI',
    date: 'Apr 5, 2025',
    read: '11 min read',
    title: 'Agentic AI in the Enterprise: Beyond Chatbots to Autonomous Workflows',
    desc: 'How LLM-powered agents are replacing entire business workflows — from document processing to customer triage — delivering measurable ROI.',
    featured: false,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    tag: 'DevOps',
    date: 'Mar 28, 2025',
    read: '8 min read',
    title: 'From 2-Hour Deploys to 8-Minute Pipelines: Our CI/CD Transformation',
    desc: 'A practical walkthrough of how we rebuilt a legacy deployment process into a modern CI/CD pipeline with GitHub Actions and ArgoCD.',
    featured: false,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    tag: 'Industry',
    date: 'Mar 20, 2025',
    read: '7 min read',
    title: 'Digital Transformation in Healthcare: Lessons from the Frontline',
    desc: 'What we learned building HIPAA-compliant EHR systems and patient portals — the engineering decisions that separate great healthcare IT.',
    featured: false,
  },
]

const ALL_TAGS = ['All', 'AI', 'Engineering', 'Product', 'Industry', 'Culture', 'DevOps']

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)
  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const rest = filtered.filter(p => p.id !== featured?.id)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="bl-hero">
        <div className="bl-hero__bg" />
        <div className="container bl-hero__inner">
          <div className="bl-hero__label">Insights &amp; Perspectives</div>
          <h1 className="bl-hero__h1">
            The Synerax<br />
            <span className="bl-hero__accent">Blog</span>
          </h1>
          <p className="bl-hero__sub">
            Technical deep dives, AI trends, cloud architecture, and engineering
            culture — from the team building tomorrow's digital infrastructure.
          </p>

          {/* Filter pills */}
          <div className="bl-filters">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`bl-filter${activeTag === tag ? ' bl-filter--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="bl-section">
        <div className="container">

          {filtered.length === 0 ? (
            <div className="bl-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p>No posts in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <article className="bl-featured">
                  <div className="bl-featured__img-wrap">
                    <img src={featured.image} alt={featured.title} className="bl-featured__img" loading="lazy" />
                    <div className="bl-featured__img-overlay" />
                  </div>
                  <div className="bl-featured__body">
                    <div className="bl-featured__meta">
                      <span className="bl-tag" style={TAG_COLORS[featured.tag] ? { background: TAG_COLORS[featured.tag].bg, color: TAG_COLORS[featured.tag].color } : {}}>
                        {featured.tag}
                      </span>
                      <span className="bl-meta-dot" />
                      <span className="bl-meta-text">{featured.date}</span>
                      <span className="bl-meta-dot" />
                      <span className="bl-meta-text">{featured.read}</span>
                    </div>
                    <h2 className="bl-featured__title">{featured.title}</h2>
                    <p className="bl-featured__desc">{featured.desc}</p>
                    <button className="bl-featured__cta">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                </article>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <>
                  <div className="bl-grid-label">
                    {activeTag === 'All' ? 'More Articles' : `${activeTag} Articles`}
                    <span className="bl-grid-count">{rest.length}</span>
                  </div>
                  <div className="bl-grid">
                    {rest.map(post => {
                      const tc = TAG_COLORS[post.tag] ?? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }
                      return (
                        <article key={post.id} className="bl-card">
                          <div className="bl-card__img-wrap">
                            <img src={post.image} alt={post.title} className="bl-card__img" loading="lazy" />
                            <span className="bl-card__tag-badge" style={{ background: tc.bg, color: tc.color }}>
                              {post.tag}
                            </span>
                          </div>
                          <div className="bl-card__body">
                            <div className="bl-card__meta">
                              <span className="bl-meta-text">{post.date}</span>
                              <span className="bl-meta-dot" />
                              <span className="bl-meta-text">{post.read}</span>
                            </div>
                            <h3 className="bl-card__title">{post.title}</h3>
                            <p className="bl-card__desc">{post.desc}</p>
                            <button className="bl-card__link">
                              Read article
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bl-newsletter">
        <div className="container bl-newsletter__inner">
          <div className="bl-newsletter__left">
            <div className="bl-newsletter__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h2 className="bl-newsletter__h2">Stay in the loop</h2>
              <p className="bl-newsletter__sub">
                Weekly insights on AI, cloud, and enterprise tech — no spam, unsubscribe anytime.
              </p>
            </div>
          </div>
          <div className="bl-newsletter__right">
            {subscribed ? (
              <div className="bl-newsletter__thanks">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                You're subscribed! Welcome aboard.
              </div>
            ) : (
              <form className="bl-newsletter__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bl-newsletter__input"
                  required
                />
                <button type="submit" className="bl-newsletter__btn">Subscribe →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
