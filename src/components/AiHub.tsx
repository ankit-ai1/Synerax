import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { prefersReduced } from '../lib/motion'

const ic: Record<string, ReactNode> = {
  chart:  <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  spark:  <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z" /></>,
  rocket: <><path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2" /><path d="M9 15l-3-3 2-4c3-5 8-6 13-6 0 5-1 10-6 13l-4 2z" /><circle cx="15" cy="9" r="1.6" /></>,
  scan:   <><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" /><path d="M7 12h10" /></>,
  bot:    <><rect x="4" y="7" width="16" height="12" rx="3" /><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  flow:   <><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><path d="M7 6h10M6.2 7.9l4.6 8.2M17.8 7.9l-4.6 8.2" /></>,
  globe:  <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" /></>,
}

/* four lanes, two per side — each lane has its own colour, like a circuit bus */
const lanes = ['#00bbfe', '#0ea5e9', '#6366f1', '#14b8a6']

const items = [
  { domain: 'Forecasting', title: 'Predictive Demand & Revenue Models', icon: 'chart',
    desc: 'ML models trained on your history that forecast demand, churn and revenue weeks ahead — with confidence bands finance can plan against.' },
  { domain: 'Commerce', title: 'Intelligent Recommendations Engine', icon: 'spark',
    desc: 'Context-aware recommendations across web, app and sales tools that lift conversion and basket size, retrained on live behaviour.' },
  { domain: 'Sales', title: 'Autonomous Sales Learning Engine', icon: 'rocket',
    desc: 'Agents that analyse calls, emails and CRM activity, coach reps in the moment and keep the pipeline clean without manual updates.' },
  { domain: 'Payments', title: 'Visual Dispute Analytics', icon: 'scan',
    desc: 'AI dashboards that surface chargeback patterns and anomalies in real time, so disputes are won before they escalate.' },
  { domain: 'Operations', title: 'Agentic AI Workflows', icon: 'bot',
    desc: 'Autonomous agents that run multi-step processes end to end — reading documents, calling your APIs and escalating only when it matters.' },
  { domain: 'Revenue', title: 'Quota & Territory Intelligence', icon: 'target',
    desc: 'Data-driven quota setting and territory design at enterprise scale, rebalanced automatically as markets shift.' },
  { domain: 'Process', title: 'Process Mining & Intelligence', icon: 'flow',
    desc: 'Event-log analysis that maps how work really flows, pinpoints bottlenecks and models the payoff of every fix before you build it.' },
  { domain: 'Global', title: 'Compliant AI at Global Scale', icon: 'globe',
    desc: 'Multi-region AI infrastructure with data residency, guardrails and audit trails built in — deployed close to every market you serve.' },
]
/* items 0–3 sit on the left, 4–7 on the right; lane = side × half */
const laneOf = (i: number) => (i < 4 ? (i < 2 ? 0 : 1) : (i < 6 ? 2 : 3))

type Wire = { d: string; jx: number; jy: number; lane: number }

export default function AiHub() {
  const root = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [wires, setWires] = useState<Wire[]>([])
  const [inView, setInView] = useState(false)
  const [lit, setLit] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const still = prefersReduced()

  /* measure the real card positions and route a wire from each into the hub */
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const route = () => {
      const c = el.getBoundingClientRect()
      const cx = c.width / 2, hy = c.height / 2
      const R = (el.querySelector<HTMLElement>('.aih-hub__core')?.offsetWidth ?? 192) / 2
      const next: Wire[] = []
      cards.current.forEach((card, i) => {
        if (!card) return
        const r = card.getBoundingClientRect()
        const left = i < 4
        const lane = laneOf(i)
        const upper = lane % 2 === 0
        const y = r.top - c.top + Math.min(64, r.height / 2)
        const x0 = left ? r.right - c.left : r.left - c.left
        // two buses per side, just outside the hub; each lands on the hub's rim
        const busX = cx + (left ? -1 : 1) * (R + (upper ? 22 : 40))
        const dy = R * 0.42
        const ty = hy + (upper ? -dy : dy)
        const edge = cx + (left ? -1 : 1) * Math.sqrt(R * R - dy * dy)
        next.push({
          d: `M ${x0} ${y} H ${busX} V ${ty} H ${edge}`,
          jx: busX, jy: y, lane,
        })
      })
      setBox({ w: c.width, h: c.height })
      setWires(next)
    }
    route()
    const ro = new ResizeObserver(route)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* start the draw-in when the section scrolls into view */
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (still) { setInView(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [still])

  /* a highlight walks round the cards; hovering a card takes it over */
  useEffect(() => {
    if (!inView || still || hover !== null) return
    const t = window.setTimeout(() => setLit(l => (l + 1) % items.length), 2600)
    return () => window.clearTimeout(t)
  }, [lit, inView, still, hover])

  const active = hover ?? lit

  const Card = (i: number) => {
    const it = items[i]
    const color = lanes[laneOf(i)]
    return (
      <article
        key={it.title}
        ref={el => { cards.current[i] = el }}
        className={`aih-card${i === active ? ' is-lit' : ''}`}
        style={{ '--c': color, '--i': i, '--row': (i % 4) + 1 } as React.CSSProperties}
        onMouseEnter={() => setHover(i)}
        onMouseLeave={() => setHover(null)}
      >
        <span className="aih-card__line" aria-hidden="true" />
        <span className="aih-card__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic[it.icon]}</svg></span>
        <div className="aih-card__body">
          <h3 className="aih-card__title"><span>{it.domain} —</span> {it.title}</h3>
          <p className="aih-card__desc">{it.desc}</p>
        </div>
        <svg className="aih-card__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      </article>
    )
  }

  return (
    <div className={`aih${inView ? ' is-in' : ''}`} ref={root}>
      <svg className="aih-wires" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
        {wires.map((w, i) => (
          <g key={i} className={`aih-wire${i === active ? ' is-lit' : ''}`} style={{ '--c': lanes[w.lane], '--i': i } as React.CSSProperties}>
            <path className="aih-wire__glow" d={w.d} pathLength={1} />
            <path className="aih-wire__line" d={w.d} pathLength={1} />
            <circle className="aih-wire__node" cx={w.jx} cy={w.jy} r="4" />
            {inView && !still && (
              <circle className="aih-wire__pulse" r="3.5">
                <animateMotion dur={i === active ? '1.4s' : '2.6s'} begin={`${(i % 4) * 0.4}s`} repeatCount="indefinite" path={w.d} />
              </circle>
            )}
          </g>
        ))}
      </svg>

      <div className="aih-col aih-col--left">{[0, 1, 2, 3].map(Card)}</div>
      <div className="aih-gutter" aria-hidden="true" />
      <div className="aih-col aih-col--right">{[4, 5, 6, 7].map(Card)}</div>

      <div className="aih-hub" aria-hidden="true">
        <span className="aih-hub__ring aih-hub__ring--a" />
        <span className="aih-hub__ring aih-hub__ring--b" />
        <span className="aih-hub__core">
          <span className="aih-hub__lbl">AI Solutions<br />&amp; Use Cases</span>
          <span className="aih-hub__dots">
            {Array.from({ length: 8 }).map((_, k) => (
              <i key={k} className={k === active ? 'is-on' : ''} style={{ '--c': lanes[laneOf(k)], '--k': k } as React.CSSProperties} />
            ))}
          </span>
        </span>
      </div>
    </div>
  )
}
