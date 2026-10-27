import { useEffect, useState } from 'react'
import { MARK_SRC } from './Logo'

/* First-visit loader. It is an overlay only — the routes render underneath
   from the first frame, so crawlers and the page itself are never held back.
   Shown once per browser session, never with reduced motion, and gone
   within 1.2s (0.9s on screen + 0.3s fade). */
const SEEN_KEY = 'synerax-loader-seen'

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
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }
    const fade  = setTimeout(() => setDone(true), 900)
    const remove = setTimeout(() => setGone(true), 1200)
    return () => { clearTimeout(fade); clearTimeout(remove) }
  }, [show])

  if (!show || gone) return null

  return (
    <div className={`site-loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="site-loader__inner">
        <img className="site-loader__mark" src={MARK_SRC} alt="" decoding="async" />
        <span className="site-loader__bar" />
        <span className="site-loader__word">Synerax</span>
      </div>
    </div>
  )
}
