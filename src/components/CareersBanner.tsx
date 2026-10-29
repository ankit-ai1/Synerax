import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReduced } from '../lib/motion'

/**
 * Homepage careers banner — the original simple split: copy on the left,
 * photo on the right blending into the navy panel.
 */
export default function CareersBanner() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReduced()) return
    const ctx = gsap.context(() => {
      gsap.from('.cr-copy > *', {
        y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className="cr" ref={root}>
      <div className="cr-copy">
        <h2 className="cr-title">
          Careers at <span>Synerax.</span>
        </h2>
        <p className="cr-desc">
          We invite you to supercharge your potential. Find what inspires
          and drives you. Find your spark.
        </p>
        <Link to="/careers" className="cr-cta">Explore Careers</Link>
      </div>

      <div className="cr-media">
        <img
          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80"
          alt="Careers at Synerax"
          loading="lazy"
        />
      </div>
    </div>
  )
}
