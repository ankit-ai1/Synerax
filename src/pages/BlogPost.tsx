import { useParams, Link, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLead } from '../context/LeadContext'
import { posts } from './Blog'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Product:     { bg: 'rgba(61,82,160,0.12)',  color: '#3D52A0' },
  Engineering: { bg: 'rgba(112,145,230,0.15)', color: '#5a78c8' },
  Culture:     { bg: 'rgba(134,151,196,0.18)', color: '#6b7fb8' },
  Industry:    { bg: 'rgba(61,82,160,0.10)',   color: '#3D52A0' },
  AI:          { bg: 'rgba(173,187,218,0.25)', color: '#1A2647' },
  DevOps:      { bg: 'rgba(61,82,160,0.12)',   color: '#3D52A0' },
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { openLead } = useLead()
  const post = posts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter(p => p.slug !== slug && p.tag === post.tag).slice(0, 3)
  const tc = TAG_COLORS[post.tag] ?? { bg: 'rgba(255,255,255,0.1)', color: '#fff' }

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="bpost-hero">
        <div className="container">
          <nav className="bpost-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/blog">Blog</Link>
            <span>›</span>
            <span>{post.tag}</span>
          </nav>

          <div className="bpost-hero__meta">
            <span className="bl-tag" style={{ background: tc.bg, color: tc.color }}>{post.tag}</span>
            <span className="bpost-dot" />
            <span className="bpost-meta-text">{post.date}</span>
            <span className="bpost-dot" />
            <span className="bpost-meta-text">{post.read}</span>
          </div>

          <h1 className="bpost-hero__h1">{post.title}</h1>
          <p className="bpost-hero__desc">{post.desc}</p>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      <div className="bpost-cover">
        <img src={post.image} alt={post.title} className="bpost-cover__img" />
        <div className="bpost-cover__overlay" />
      </div>

      {/* ── CONTENT ── */}
      <section className="bpost-body">
        <div className="container bpost-body__inner">

          {/* Article */}
          <article className="bpost-article">
            {post.content.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i} className="bpost-h2">{block.text}</h2>
              return <p key={i} className="bpost-p">{block.text}</p>
            })}

            {/* CTA inside article */}
            <div className="bpost-cta-box">
              <div className="bpost-cta-box__text">
                <h3>Ready to implement this in your organisation?</h3>
                <p>Talk to our experts and get a free consultation tailored to your needs.</p>
              </div>
              <button onClick={() => openLead(post.tag)} className="bpost-cta-box__btn">
                Get a Free Consultation →
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bpost-sidebar">
            <div className="bpost-sidebar__card">
              <div className="bpost-sidebar__label">About Synerax</div>
              <p className="bpost-sidebar__text">
                Synerax builds enterprise-grade AI, cloud, and full-stack solutions for ambitious organisations worldwide.
              </p>
              <button onClick={() => openLead()} className="bpost-sidebar__btn">
                Start a Project →
              </button>
            </div>

            <div className="bpost-sidebar__card">
              <div className="bpost-sidebar__label">Share This Article</div>
              <div className="bpost-share">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="bpost-share__btn">
                  𝕏 Twitter
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="bpost-share__btn">
                  in LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section className="bpost-related">
          <div className="container">
            <h2 className="bpost-related__title">Related Articles</h2>
            <div className="bpost-related__grid">
              {related.map(p => {
                const rtc = TAG_COLORS[p.tag] ?? { bg: 'rgba(255,255,255,0.08)', color: '#fff' }
                return (
                  <Link to={`/blog/${p.slug}`} key={p.id} className="bl-card">
                    <div className="bl-card__img-wrap">
                      <img src={p.image} alt={p.title} className="bl-card__img" loading="lazy" />
                      <span className="bl-card__tag-badge" style={{ background: rtc.bg, color: rtc.color }}>{p.tag}</span>
                    </div>
                    <div className="bl-card__body">
                      <div className="bl-card__meta">
                        <span className="bl-meta-text">{p.date}</span>
                        <span className="bl-meta-dot" />
                        <span className="bl-meta-text">{p.read}</span>
                      </div>
                      <h3 className="bl-card__title">{p.title}</h3>
                      <p className="bl-card__desc">{p.desc}</p>
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
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
