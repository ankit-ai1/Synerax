import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { posts } from '../data/posts'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Product:     { bg: 'rgba(0,187,254,0.12)',  color: '#00bbfe' },
  Engineering: { bg: 'rgba(0,187,254,0.15)', color: '#2cc6fe' },
  Culture:     { bg: 'rgba(178,178,184,0.16)', color: '#B2B2B8' },
  Industry:    { bg: 'rgba(0,187,254,0.10)',   color: '#00bbfe' },
  AI:          { bg: 'rgba(0,187,254,0.12)', color: '#00bbfe' },
  DevOps:      { bg: 'rgba(0,187,254,0.12)',   color: '#00bbfe' },
}

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
            Latest <span className="bl-hero__accent">Insights</span>
          </h1>
          <p className="bl-hero__sub">
            Technical deep dives, AI trends, cloud architecture, and engineering
            culture — from the team building tomorrow's digital infrastructure.
          </p>
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
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="bl-featured">
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
                    <span className="bl-featured__cta">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

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
                        <Link to={`/blog/${post.slug}`} key={post.id} className="bl-card">
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
                            <span className="bl-card__link">
                              Read article
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </span>
                          </div>
                        </Link>
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
                <button type="submit" className="bl-newsletter__btn">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
