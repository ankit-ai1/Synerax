import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReduced } from '../lib/motion'
import { industries } from '../data/industryMeta'

const CYCLE = 5600

/* first sentence of the hero copy is the pitch; the rest lives on the industry page */
const pitch = (s: string) => {
  const end = s.indexOf('. ')
  return end > 0 ? s.slice(0, end + 1) : s
}

/**
 * Industry accordion: six tall photo panels side by side. The open one
 * widens to tell its story; the rest fold into slim captioned strips.
 * Auto-advances; hovering or focusing a strip opens it.
 */
export default function IndustryExplorer() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [tick, setTick] = useState(0)
  const still = prefersReduced()

  /* pausing keeps the time already spent rather than restarting the cycle */
  const remain = useRef(CYCLE)
  const startedAt = useRef(0)
  useEffect(() => { remain.current = CYCLE }, [active, tick])
  useEffect(() => {
    if (hover || still) return
    startedAt.current = performance.now()
    const t = window.setTimeout(() => setActive(a => (a + 1) % industries.length), remain.current)
    return () => {
      window.clearTimeout(t)
      remain.current = Math.max(0, remain.current - (performance.now() - startedAt.current))
    }
  }, [active, hover, still, tick])

  const open = (i: number) => { if (i !== active) { setActive(i); setTick(t => t + 1) } }

  /* entrance: strips rise one after another like cards being dealt */
  useLayoutEffect(() => {
    const el = root.current
    if (!el || still) return
    const ctx = gsap.context(() => {
      gsap.from('.ixa-panel', {
        y: 80, opacity: 0, stagger: 0.08, duration: 1, ease: 'power4.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [still])

  return (
    <div
      className={`ixa${hover ? ' is-paused' : ''}`}
      ref={root}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {industries.map((ind, i) => {
        const on = i === active
        return (
          <article
            key={ind.slug}
            className={`ixa-panel${on ? ' is-on' : ''}`}
            onMouseEnter={() => open(i)}
            onFocus={() => open(i)}
            onClick={() => open(i)}
            tabIndex={on ? -1 : 0}
            aria-expanded={on}
            aria-label={ind.name}
          >
            <img className="ixa-panel__img" src={ind.featureImage} alt="" loading="lazy" />
            <span className="ixa-panel__shade" aria-hidden="true" />
            <span className="ixa-panel__shine" aria-hidden="true" />

            {/* progress along the top edge of the open panel */}
            <span className="ixa-panel__prog" aria-hidden="true">
              {on && !still && <i key={`${active}-${tick}`} style={{ animationDuration: `${CYCLE}ms` }} />}
            </span>

            {/* folded state: number on top, vertical name */}
            <div className="ixa-strip" aria-hidden={on}>
              <span className="ixa-strip__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ixa-strip__name">{ind.name}</span>
              <span className="ixa-strip__plus" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
              </span>
            </div>

            {/* open state */}
            {on && (
              <div className="ixa-body" key={`body-${active}`}>
                <div className="ixa-body__top">
                  <span className="ixa-pill"><i aria-hidden="true" />{ind.tag}</span>
                  <span className="ixa-count">
                    <b>{String(i + 1).padStart(2, '0')}</b> / {String(industries.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="ixa-body__foot">
                  <h3 className="ixa-title">
                    {ind.heroTitle} <span>{ind.heroTitleBlue}</span>
                  </h3>
                  <p className="ixa-desc">{pitch(ind.heroDesc)}</p>

                  <div className="ixa-row">
                    <div className="ixa-stats">
                      {ind.stats.slice(0, 3).map(s => (
                        <div className="ixa-stat" key={s.label}>
                          <span className="ixa-stat__v">{s.value}</span>
                          <span className="ixa-stat__l">{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={`/industries/${ind.slug}`} className="ixa-cta" onClick={e => e.stopPropagation()}>
                      Explore
                      <span className="ixa-cta__ico" aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12L12 4M5.5 4H12v6.5" /></svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
