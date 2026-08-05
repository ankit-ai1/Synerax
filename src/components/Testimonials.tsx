import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { gsap, prefersReduced } from '../lib/motion'

type Item = { quote: string; name: string; role: string; initial: string }

const perViewFor = (w: number) => (w >= 1100 ? 3 : w >= 700 ? 2 : 1)

export default function Testimonials({ items }: { items: Item[] }) {
  const [idx, setIdx] = useState(0)
  const [perView, setPerView] = useState(() =>
    typeof window === 'undefined' ? 3 : perViewFor(window.innerWidth))

  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const paused = useRef(false)

  const maxIdx = Math.max(0, items.length - perView)

  /* keep the slide count in step with the viewport */
  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => { setIdx(i => Math.min(i, maxIdx)) }, [maxIdx])

  /* move the track — measured in px so the gap is always accounted for */
  const apply = useCallback((i: number, animate = true) => {
    const t = track.current
    const card = t?.firstElementChild as HTMLElement | null
    if (!t || !card) return
    const gap = parseFloat(getComputedStyle(t).columnGap || '0') || 0
    const x = -i * (card.offsetWidth + gap)
    if (animate && !prefersReduced()) {
      gsap.to(t, { x, duration: 0.65, ease: 'power3.out' })
    } else {
      gsap.set(t, { x })
    }
  }, [])

  useLayoutEffect(() => { apply(idx) }, [idx, perView, apply])
  useLayoutEffect(() => {
    const onResize = () => apply(idx, false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [idx, apply])

  const go = (next: number) => setIdx(((next % (maxIdx + 1)) + maxIdx + 1) % (maxIdx + 1))

  /* auto-advance, paused while the user is hovering or tabbing through */
  useEffect(() => {
    if (prefersReduced() || maxIdx === 0) return
    const id = setInterval(() => {
      if (!paused.current) setIdx(i => (i >= maxIdx ? 0 : i + 1))
    }, 5000)
    return () => clearInterval(id)
  }, [maxIdx])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(idx - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1) }
  }

  return (
    <div
      className="fx-slider"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onFocusCapture={() => { paused.current = true }}
      onBlurCapture={() => { paused.current = false }}
      onKeyDown={onKeyDown}
    >
      <div className="fx-slider__viewport" ref={viewport}>
        <div
          className="fx-slider__track"
          ref={track}
          style={{ ['--per' as string]: perView }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client stories"
        >
          {items.map((t, i) => (
            <figure
              className="iq-testi fx-testi fx-slide"
              key={t.name}
              aria-hidden={i < idx || i >= idx + perView}
            >
              <span className="fx-slide__mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="iq-testi__quote">"{t.quote}"</blockquote>
              <figcaption className="iq-testi__author">
                <span className="iq-testi__av" aria-hidden="true">{t.initial}</span>
                <span>
                  <span className="iq-testi__name">{t.name}</span>
                  <span className="iq-testi__role">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* controls sit under the deck: ‹ ————— › */}
      <div className="fx-slider__foot">
        <button
          type="button"
          className="fx-slider__arrow"
          onClick={() => go(idx - 1)}
          aria-label="Previous stories"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="fx-slider__rail">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`fx-slider__seg${i === idx ? ' is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx}
            />
          ))}
        </div>

        <button
          type="button"
          className="fx-slider__arrow"
          onClick={() => go(idx + 1)}
          aria-label="Next stories"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
