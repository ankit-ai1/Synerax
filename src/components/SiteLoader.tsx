import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { FAVICON_LIGHT, FAVICON_DARK, WORDMARK_INK, WORDMARK_LIGHT } from './Logo'

/* First-visit loader — a ~3.5s sequence, all CSS keyframes:
     0.0–1.0s  logo outline draws in blue, then the favicon mark fills in
     0.8–1.8s  the SYNERAX wordmark (same artwork as the navbar/footer) wipes in
     1.6–2.6s  tagline fades in, counter runs 000 → 100 over a progress line
     2.6–3.5s  logo scales down, top/bottom curtains slide away
   It is an overlay only — the routes render underneath from the first frame.
   Shown once per browser session, never with reduced motion. Page scroll is
   locked only while it is on screen. */
const SEEN_KEY  = 'synerax-loader-seen'
const TOTAL_MS  = 3500
const COUNT_AT  = 1600
const COUNT_FOR = 1000

function shouldShow() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true   // storage blocked — show it, just without the per-session memory
  }
}

export default function SiteLoader() {
  const [show] = useState(shouldShow)
  const [gone, setGone] = useState(false)
  const countRef = useRef<HTMLSpanElement>(null)
  const lenis = useLenis()

  // Timeline + counter
  useEffect(() => {
    if (!show || gone) return
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start - COUNT_AT) / COUNT_FOR, 0), 1)
      if (countRef.current) countRef.current.textContent = String(Math.round(t * 100)).padStart(3, '0')
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const end = setTimeout(() => setGone(true), TOTAL_MS)
    return () => { cancelAnimationFrame(raf); clearTimeout(end) }
  }, [show, gone])

  // Scroll lock — native overflow plus Lenis, released the moment it ends
  useEffect(() => {
    if (!show || gone) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    lenis?.stop()
    return () => { html.style.overflow = prev; lenis?.start() }
  }, [show, gone, lenis])

  if (!show || gone) return null

  return (
    <div className="site-loader" role="presentation">
      <div className="site-loader__panel site-loader__panel--top" aria-hidden="true" />
      <div className="site-loader__panel site-loader__panel--bottom" aria-hidden="true" />

      <div className="site-loader__inner" aria-hidden="true">
        <div className="site-loader__logo">
          <svg className="site-loader__outline" viewBox="0 0 72 72" fill="none">
            <rect x="2" y="2" width="68" height="68" rx="18" pathLength={1} />
          </svg>
          {/* both inks render; CSS shows the one that suits the loader's theme */}
          <img className="site-loader__mark site-loader__mark--light" src={FAVICON_LIGHT} alt="" decoding="async" />
          <img className="site-loader__mark site-loader__mark--dark" src={FAVICON_DARK} alt="" decoding="async" />
        </div>

        <span className="site-loader__word">
          <img className="site-loader__wm site-loader__wm--ink" src={WORDMARK_INK} alt="Synerax" decoding="async" />
          <img className="site-loader__wm site-loader__wm--light" src={WORDMARK_LIGHT} alt="" decoding="async" />
        </span>

        <p className="site-loader__tagline">From Code to <em>Cloud.</em></p>

        <div className="site-loader__meter">
          <span ref={countRef} className="site-loader__count">000</span>
          <span className="site-loader__bar" />
        </div>
      </div>

      <button type="button" className="site-loader__skip" onClick={() => setGone(true)}>
        Skip
      </button>
    </div>
  )
}
