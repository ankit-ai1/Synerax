import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReduced } from '../lib/motion'
import { posts } from '../pages/Blog'

type Post = (typeof posts)[number]

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12L12 4M5.5 4H12v6.5" />
  </svg>
)

/* Image-led card: the photo fills the card, copy sits on a gradient at the foot */
function OverlayCard({ p, featured = false }: { p: Post; featured?: boolean }) {
  return (
    <Link to={`/blog/${p.slug}`} className={`kb-card kb-card--overlay${featured ? ' kb-card--feature' : ''}`}>
      <span className="kb-card__media">
        <img src={p.image} alt="" loading="lazy" />
      </span>
      <span className="kb-card__scrim" aria-hidden="true" />
      <span className="kb-card__top">
        <span className="kb-pill">{p.tag}</span>
        <span className="kb-card__go"><Arrow /></span>
      </span>
      <span className="kb-card__copy">
        <span className="kb-card__meta">{p.date} · {p.read}</span>
        <h3 className="kb-card__title">{p.title}</h3>
        {featured && <p className="kb-card__desc">{p.desc}</p>}
        <span className="kb-card__cta">Read article <Arrow /></span>
      </span>
    </Link>
  )
}

export default function InsightsBento() {
  const root = useRef<HTMLDivElement>(null)
  const [lead, a, b] = posts

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReduced()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.kb-card', el)

      // each card's image wipes open from the bottom, then its copy rises
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 86%', once: true },
          delay: (i % 3) * 0.08,
        })
        tl.from(card, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity' })
          .from(card.querySelector('.kb-card__media'), {
            clipPath: 'inset(100% 0% 0% 0% round 20px)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath',
          }, 0)
          .from(card.querySelector('.kb-card__media img'), {
            scale: 1.25, duration: 1.4, ease: 'power3.out', clearProps: 'transform',
          }, 0)
          .from(card.querySelectorAll('.kb-card__copy > *, .kb-card__top > *'), {
            y: 16, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity',
          }, 0.55)
      })

      // the feature image drifts against the scroll for depth
      const feat = el.querySelector('.kb-card--feature .kb-card__media img')
      if (feat) {
        gsap.fromTo(feat, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: feat, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      }

      // a soft light follows the pointer across each card
      cards.forEach(card => {
        card.addEventListener('pointermove', e => {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${(e as PointerEvent).clientX - r.left}px`)
          card.style.setProperty('--my', `${(e as PointerEvent).clientY - r.top}px`)
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className="kb" ref={root}>
      <div className="kb-bento">
        <OverlayCard p={lead} featured />
        <OverlayCard p={a} />
        <OverlayCard p={b} />
      </div>
    </div>
  )
}
