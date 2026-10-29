import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap, prefersReduced } from '../lib/motion'

/* ─── Icons (24×24, stroke = currentColor) ─── */
const I = {
  apps:     <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>,
  data:     <><ellipse cx="12" cy="5.5" rx="7" ry="2.5" /><path d="M5 5.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6M5 11.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" /></>,
  ai:       <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
  platform: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  cloud:    <path d="M7 18h10.5a4 4 0 00.6-7.96A6 6 0 006.3 9.2 4.4 4.4 0 007 18z" />,
  security: <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  ops:      <path d="M3 12h4l2.5-6 5 12 2.5-6H21" />,
  rocket:   <><path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2" /><path d="M9 15l-3-3 2-4c3-5 8-6 13-6 0 5-1 10-6 13l-4 2z" /><circle cx="15" cy="9" r="1.6" /></>,
  build:    <path d="M6 20V11M12 20V5M18 20v-6" />,
  shield:   <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" /><path d="M12 8v5M12 16h.01" /></>,
  scale:    <><path d="M4 20l6-6 4 4 6-8" /><path d="M15 10h5v5" /></>,
}
const Icon = ({ d }: { d: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)

const caps = [
  { key: 'apps',     label: 'Applications' },
  { key: 'data',     label: 'Data' },
  { key: 'ai',       label: 'AI & Agents' },
  { key: 'platform', label: 'Platform' },
  { key: 'cloud',    label: 'Cloud' },
  { key: 'security', label: 'Security' },
  { key: 'ops',      label: 'Operations' },
] as const
type Cap = typeof caps[number]['key']

const stages: { name: string; icon: keyof typeof I; desc: string; caps: Cap[]; proof: string }[] = [
  { name: 'Modernize', icon: 'rocket', caps: ['apps', 'data', 'cloud'],
    desc: 'Move legacy apps, databases and data centers onto cloud-native foundations — without freezing the business.',
    proof: '40% lower run cost, typical' },
  { name: 'Build', icon: 'build', caps: ['data', 'ai', 'platform'],
    desc: 'Ship products, AI agents and internal platforms with senior engineers and quality built into every sprint.',
    proof: 'First release in 6–8 weeks' },
  { name: 'Secure', icon: 'shield', caps: ['cloud', 'security', 'ops'],
    desc: 'Bake in SOC 2, ISO 27001 and HIPAA controls — policy-as-code, audit trails and zero-trust access.',
    proof: 'Audit-ready from day one' },
  { name: 'Scale', icon: 'scale', caps: ['platform', 'cloud', 'ops'],
    desc: 'Run it at 99.99% with SRE, FinOps and observability — so growth never outpaces reliability.',
    proof: '24/7 SRE, 15-min response' },
]

/* connector geometry — must match .eco-caps row pitch in ecosystem.css */
const ROW = 78, PILL = 52, H = caps.length * ROW - (ROW - PILL), W = 150
const mid = H / 2
const pathFor = (i: number) => {
  const y = PILL / 2 + i * ROW
  return `M6 ${mid} C 58 ${mid}, 46 ${y}, 96 ${y} L ${W - 8} ${y}`
}

const CYCLE = 4200

export default function EcosystemFlow() {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [tick, setTick] = useState(0)          // restarts the progress bar on manual picks
  const still = prefersReduced()

  /* Hover pauses rather than restarts: the timer keeps what is left of the
     cycle, and the CSS progress lines freeze via animation-play-state. */
  const remain = useRef(CYCLE)
  const startedAt = useRef(0)
  useEffect(() => { remain.current = CYCLE }, [active, tick])
  useEffect(() => {
    if (hover || still) return
    startedAt.current = performance.now()
    const t = window.setTimeout(() => setActive(a => (a + 1) % stages.length), remain.current)
    return () => {
      window.clearTimeout(t)
      remain.current = Math.max(0, remain.current - (performance.now() - startedAt.current))
    }
  }, [active, hover, still, tick])

  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const prevTops = useRef<number[] | null>(null)
  const prevActive = useRef(active)

  const pick = (i: number) => { setActive(i); setTick(t => t + 1) }

  /* FLIP the deck: each card glides from its old slot to its new one.
     The card that just left the top exits upward and re-enters at the
     bottom instead of sliding back down through the others. */
  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    const tops = cards.map(c => c.offsetTop)
    const before = prevTops.current
    const left = prevActive.current
    prevTops.current = tops
    prevActive.current = active
    if (!before || left === active || still) return

    const n = cards.length
    cards.forEach((card, i) => {
      gsap.killTweensOf(card)
      const dy = before[i] - tops[i]
      const o = (i - active + n) % n
      if (i === left) {
        // old top card: lifts off, then drops in at the back of the queue
        gsap.timeline()
          .fromTo(card, { y: dy, opacity: 1, scale: 1 }, { y: dy - 56, opacity: 0, scale: 0.9, duration: 0.45, ease: 'power2.in' })
          .set(card, { y: 56, scale: 0.94 })
          .to(card, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)', clearProps: 'transform,opacity' })
      } else {
        // the rest cascade up one slot, one after another
        gsap.fromTo(card,
          { y: dy, scale: o === 0 ? 0.96 : 1 },
          { y: 0, scale: 1, duration: 0.8, ease: 'power3.inOut', delay: o * 0.07, clearProps: 'transform' })
      }
    })
  }, [active, still])

  const s = stages[active]
  const on = (k: Cap) => s.caps.includes(k)

  return (
    <div
      className={`eco-board${hover ? ' is-paused' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ── left: stage node branching into capabilities ── */}
      <div className="eco-flow">
        <div className="eco-node" key={`node-${active}`}>
          <span className="eco-node__ico"><Icon d={I[s.icon]} /></span>
          <span className="eco-node__name">{s.name}.</span>
        </div>

        <svg className="eco-wires" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            {(['on', 'off'] as const).map(v => (
              <marker key={v} id={`eco-arrow-${v}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M1 1l7 4-7 4" fill="none" stroke={v === 'on' ? '#1b6fe8' : '#a9c4ee'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            ))}
          </defs>
          {caps.map((c, i) => (
            <path key={c.key} d={pathFor(i)} className={`eco-wire${on(c.key) ? ' is-on' : ''}`} markerEnd={`url(#eco-arrow-${on(c.key) ? 'on' : 'off'})`} />
          ))}
          {!still && caps.map((c, i) => on(c.key) && (
            <circle key={`${active}-${c.key}`} r="3.2" className="eco-spark">
              <animateMotion dur="1.8s" begin={`${i * 0.18}s`} repeatCount="indefinite" path={pathFor(i)} />
            </circle>
          ))}
          <circle cx="6" cy={mid} r="4.5" className="eco-origin" />
        </svg>

        <ul className="eco-caps">
          {caps.map((c, i) => (
            <li key={c.key} className={`eco-cap${on(c.key) ? ' is-on' : ''}`} style={{ '--i': i } as React.CSSProperties}>
              <Icon d={I[c.key]} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      {/* ── right: stage cards + switcher ── */}
      <div className="eco-side">
        {/* all four stages as a deck: active on top, the rest queue below.
            Order comes from CSS `order`; the move itself is a FLIP in the
            layout effect above. */}
        <div className="eco-deck" ref={deckRef}>
          {stages.map((st, i) => {
            const o = (i - active + stages.length) % stages.length
            return (
              <article
                key={st.name}
                ref={el => { cardRefs.current[i] = el }}
                className={`eco-card is-o${o}`}
                style={{ order: o }}
                aria-hidden={o !== 0}
                onClick={o === 0 ? undefined : () => pick(i)}
              >
                {o === 0 && <span className="eco-card__ring" aria-hidden="true" />}
                <span className="eco-card__ico">
                  <Icon d={I[st.icon]} />
                  {o === 0 && !still && (
                    <svg className="eco-card__timer" viewBox="0 0 60 60" aria-hidden="true" key={`${active}-${tick}`}>
                      <circle cx="30" cy="30" r="28" style={{ animationDuration: `${CYCLE}ms` }} />
                    </svg>
                  )}
                </span>
                <div className="eco-card__body">
                  <h3 className="eco-card__title">{st.name}.</h3>
                  <p className="eco-card__desc">{st.desc}</p>
                  {o === 0 && (
                    <span className="eco-card__proof">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>
                      {st.proof}
                    </span>
                  )}
                </div>
                {o === 0 && (
                  <span className="eco-card__chips">
                    {st.caps.map(k => <i key={k}><Icon d={I[k]} /></i>)}
                  </span>
                )}
                {o === 0 && !still && (
                  <span className="eco-line eco-card__line" aria-hidden="true">
                    <i key={`${active}-${tick}`} style={{ animationDuration: `${CYCLE}ms` }} />
                  </span>
                )}
              </article>
            )
          })}
        </div>

        <div className="eco-tabs" role="tablist" style={{ '--idx': active, '--n': stages.length } as React.CSSProperties}>
          <span className="eco-tabs__thumb" aria-hidden="true" />
          {stages.map((st, i) => (
            <button
              key={st.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`eco-tab${i === active ? ' is-active' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="eco-tab__lbl">
                {st.name}
                {i === active && !still && (
                  <span className="eco-line eco-tab__line" aria-hidden="true">
                    <i key={`${active}-${tick}`} style={{ animationDuration: `${CYCLE}ms` }} />
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
