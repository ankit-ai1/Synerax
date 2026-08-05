import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'

/* ─────────────────────────────────────────────────────────────
   Platform Overview — the Full Visibility panel.
   Left:  category breakdown radar.
   Right: maturity level over time, with working range tabs and
          a hover readout. Both drift live off a shared tick.
   ───────────────────────────────────────────────────────────── */

type Range = '7d' | '1m' | '6m' | '1y' | 'All'

/* The eight solutions as radar axes. `value` is a weightage split that
   totals 100%, so the axis scale is capped near the top of the range
   rather than at 100 — otherwise every point would hug the centre. */
const CATEGORIES = [
  { label: 'Web Apps',    full: 'Web & Enterprise Applications',            value: 17 },
  { label: 'SRE',         full: 'Observability, SRE & Production Eng.',     value: 17 },
  { label: 'DevSecOps',   full: 'DevSecOps & FinOps',                       value: 12 },
  { label: 'Cloud Eng.',  full: 'Cloud Engineering & Migration',            value: 11 },
  { label: 'Agentic AI',  full: 'Agentic AI Solutions',                     value: 11 },
  { label: 'Security',    full: 'Cybersecurity Solutions',                  value: 11 },
  { label: 'App Modern.', full: 'Application Modernization',                value: 11 },
  { label: 'ITSM',        full: 'IT Service Management (ITSM)',             value: 10 },
]

/* Top of the radar scale. Values sit at 10–17%, so 20 lets the two 17s
   reach most of the way out and clearly stand proud of the 10s. */
const RADAR_MAX = 20
const RADAR_R = 40

/* Legend reads highest → lowest; the axis order above stays fixed so the
   polygon shape does not reshuffle. */
const BREAKDOWN = [...CATEGORIES].sort((a, b) => b.value - a.value)

const axisAngle = (i: number, n: number) => (Math.PI * 2 * i) / n - Math.PI / 2
const axisPoint = (i: number, n: number, r: number) => {
  const a = axisAngle(i, n)
  return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r] as const
}
const radarPoints = (items: { value: number }[]) =>
  items
    .map((c, i) => {
      const [x, y] = axisPoint(i, items.length, (c.value / RADAR_MAX) * RADAR_R)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

/* Each range carries its own series and its own axis captions. */
const SERIES: Record<Range, { values: number[]; axis: string[] }> = {
  '7d': {
    values: [2.6, 2.7, 2.65, 2.9, 3.0, 2.95, 3.1],
    axis: ['Mon', 'Wed', 'Fri', 'Sun'],
  },
  '1m': {
    values: [2.2, 2.35, 2.3, 2.55, 2.7, 2.65, 2.9, 3.1],
    axis: ['Apr 1', 'Apr 9', 'Apr 18', 'Apr 27'],
  },
  '6m': {
    values: [1.5, 1.7, 1.9, 2.15, 2.4, 2.8, 3.2, 3.6, 2.0, 2.5, 2.2],
    axis: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  },
  '1y': {
    values: [1.1, 1.2, 1.35, 1.5, 1.75, 2.0, 2.3, 2.7, 3.1, 3.7, 1.85, 2.6, 2.2],
    axis: ['May', 'Aug', 'Nov', 'Feb', 'Apr'],
  },
  All: {
    values: [1.0, 1.1, 1.2, 1.4, 1.6, 1.85, 2.1, 2.45, 2.8, 3.1, 3.55, 3.75, 1.9, 2.6, 2.2],
    axis: ['Dec 8', 'Jan 12', 'Feb 16', 'Mar 23', 'Apr 27'],
  },
}

const RANGES: Range[] = ['7d', '1m', '6m', '1y', 'All']

/* Plot geometry, in viewBox units. */
const W = 520
const H = 210
const PAD_L = 34
const PAD_R = 12
const PAD_T = 14
const PAD_B = 26
const MIN_LVL = 1
const MAX_LVL = 4

const px = (i: number, n: number) => PAD_L + (i / (n - 1)) * (W - PAD_L - PAD_R)
const py = (v: number) => PAD_T + ((MAX_LVL - v) / (MAX_LVL - MIN_LVL)) * (H - PAD_T - PAD_B)

const lerp = (a: number, b: number, f: number) => a + (b - a) * f

export default function PlatformChart() {
  const [range, setRange] = useState<Range>('All')
  /* Continuous 0–1 position along the plot, not a snapped index — the
     marker rides the line wherever the cursor is. */
  const [hover, setHover] = useState<number | null>(null)
  const [tick, setTick] = useState(0)
  const radarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setTick(t => t + 1), 2600)
    return () => window.clearInterval(id)
  }, [])

  /* The weightage split is fixed, so the radar is a constant. */
  const radar = CATEGORIES

  /* Entrance: the polygon scales out of the centre, the dots pop in behind
     it, and the breakdown percentages count up. Markup already renders the
     final state, so a JS failure just means no animation. */
  useEffect(() => {
    const root = radarRef.current
    if (!root || prefersReduced()) return

    const ctx = gsap.context(() => {
      const shape = root.querySelector('.pfc__shape')
      const nodes = root.querySelectorAll('.pfc__node')
      const nums = root.querySelectorAll<HTMLElement>('.pfc__legend b')

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      })

      if (shape) {
        tl.from(shape, {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          transformOrigin: '50% 50%',
          svgOrigin: '50 50',
        })
      }

      tl.from(nodes, {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'back.out(2.2)',
        stagger: 0.05,
        transformOrigin: '50% 50%',
      }, '-=0.35')

      nums.forEach(el => {
        const target = parseInt(el.dataset.value || '0', 10)
        const obj = { v: 0 }
        tl.to(obj, {
          v: target,
          duration: 0.7,
          ease: 'power2.out',
          onUpdate() { el.textContent = `${Math.round(obj.v)}%` },
          onComplete() { el.textContent = `${target}%` },
        }, '-=0.85')
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const series = useMemo(() => {
    const { values, axis } = SERIES[range]
    const drift = Math.sin(tick / 3) * 0.06
    return { values: values.map((v, i) => (i === 0 ? v : v + drift * (i / values.length))), axis }
  }, [range, tick])

  const pts = series.values.map((v, i) => ({ x: px(i, series.values.length), y: py(v), v }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)} ${H - PAD_B} L${pts[0].x.toFixed(1)} ${H - PAD_B} Z`

  const peak = pts.reduce((best, p, i) => (p.v > pts[best].v ? i : best), 0)

  /* Where the marker sits: the hovered point on the line, or the peak at rest. */
  const marker = (() => {
    const n = pts.length
    const f = hover ?? peak / (n - 1)
    const raw = f * (n - 1)
    const i0 = Math.min(n - 2, Math.floor(raw))
    const frac = raw - i0
    const v = lerp(series.values[i0], series.values[i0 + 1], frac)
    const axisAt = Math.round(f * (series.axis.length - 1))
    return { x: px(raw, n), y: py(v), v, label: series.axis[axisAt], live: hover !== null }
  })()

  return (
    <div className="pfc">
      {/* ── Radar ─────────────────────────────────────────── */}
      <section className="pfc__card pfc__card--radar" ref={radarRef}>
        <header className="pfc__head">
          <span className="pfc__title">Category breakdown</span>
        </header>

        <div className="pfc__radar">
          {/* The viewBox is padded well past the 100-unit radar so the axis
              captions — which sit outside the outer ring — have somewhere to
              live. Geometry still centres on 50,50, so nothing shifts. */}
          <svg viewBox="-26 -10 152 120" role="img" aria-label="Delivery weightage across the eight solutions">
            {[16, 28, RADAR_R].map(r => (
              <polygon
                key={r}
                className="pfc__ring"
                points={radar
                  .map((_, i) => {
                    const [x, y] = axisPoint(i, radar.length, r)
                    return `${x.toFixed(2)},${y.toFixed(2)}`
                  })
                  .join(' ')}
              />
            ))}

            {radar.map((_, i) => {
              const [x, y] = axisPoint(i, radar.length, RADAR_R)
              return (
                <line
                  key={i}
                  className="pfc__spoke"
                  x1="50" y1="50"
                  x2={x.toFixed(2)}
                  y2={y.toFixed(2)}
                />
              )
            })}

            <polygon className="pfc__shape" points={radarPoints(radar)} />

            {radar.map((c, i) => {
              const [x, y] = axisPoint(i, radar.length, (c.value / RADAR_MAX) * RADAR_R)
              return (
                <circle
                  key={c.label}
                  className="pfc__node"
                  cx={x.toFixed(2)}
                  cy={y.toFixed(2)}
                  r="1.5"
                >
                  <title>{`${c.full} — ${c.value}%`}</title>
                </circle>
              )
            })}

            {radar.map((c, i) => {
              const [x, y] = axisPoint(i, radar.length, RADAR_R + 7)
              return (
                <text
                  key={`lbl-${c.label}`}
                  className="pfc__axis-lbl"
                  x={x.toFixed(2)}
                  y={(y + 1).toFixed(2)}
                  textAnchor={x > 52 ? 'start' : x < 48 ? 'end' : 'middle'}
                >
                  {c.label}
                </text>
              )
            })}
          </svg>
        </div>

        <ul className="pfc__legend pfc__legend--full">
          {BREAKDOWN.map(c => (
            <li key={c.full}>
              <span>{c.full}</span>
              <b data-value={c.value}>{c.value}%</b>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Level over time ───────────────────────────────── */}
      <section className="pfc__card pfc__card--line">
        <header className="pfc__head">
          <span className="pfc__title">Level over time</span>
          <nav className="pfc__tabs" aria-label="Time range">
            {RANGES.map(r => (
              <button
                key={r}
                type="button"
                className={r === range ? 'is-active' : ''}
                aria-pressed={r === range}
                onClick={() => { setRange(r); setHover(null) }}
              >
                {r}
              </button>
            ))}
          </nav>
        </header>

        <div
          className={`pfc__plot${marker.live ? ' is-live' : ''}`}
          onPointerMove={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const rel = ((e.clientX - rect.left) / rect.width) * W
            const f = (rel - PAD_L) / (W - PAD_L - PAD_R)
            setHover(Math.max(0, Math.min(1, f)))
          }}
          onPointerLeave={() => setHover(null)}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Maturity level over ${range}`}
          >
            <defs>
              <linearGradient id="pfcFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5c29" stopOpacity=".28" />
                <stop offset="100%" stopColor="#ff5c29" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[4, 3, 2, 1].map(lvl => (
              <g key={lvl}>
                <line className="pfc__grid" x1={PAD_L} x2={W - PAD_R} y1={py(lvl)} y2={py(lvl)} />
                <text className="pfc__ylbl" x={PAD_L - 10} y={py(lvl) + 3} textAnchor="end">{lvl}</text>
              </g>
            ))}

            <path className="pfc__area" d={area} fill="url(#pfcFill)" />
            <path className="pfc__line" d={line} />

            {pts.map((p, i) => (
              <circle key={i} className="pfc__dot" cx={p.x} cy={p.y} r="2.4" />
            ))}

            {/* Cursor + marker ride the line wherever the pointer is */}
            <line className="pfc__cursor" x1={marker.x} x2={marker.x} y1={PAD_T} y2={H - PAD_B} />
            <circle className="pfc__halo" cx={marker.x} cy={marker.y} r="9" />
            <circle className="pfc__marker" cx={marker.x} cy={marker.y} r="4.6" />

            {series.axis.map((label, i) => (
              <text
                key={label}
                className="pfc__xlbl"
                x={PAD_L + (i / (series.axis.length - 1)) * (W - PAD_L - PAD_R)}
                y={H - 8}
                textAnchor={i === 0 ? 'start' : i === series.axis.length - 1 ? 'end' : 'middle'}
              >
                {label}
              </text>
            ))}
          </svg>

          <span
            className="pfc__readout"
            style={{
              left: `${(marker.x / W) * 100}%`,
              top: `${(marker.y / H) * 100}%`,
            }}
          >
            <strong>Level {marker.v.toFixed(1)}</strong>
            <em>{Math.round((marker.v / MAX_LVL) * 100)}% maturity</em>
            <i>{marker.label}</i>
          </span>
        </div>
      </section>
    </div>
  )
}
