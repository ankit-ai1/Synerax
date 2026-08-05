import { useEffect, useMemo, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   DataCard — the live chart panels that stand in for the stock
   photography on the inner pages.

   Every instance derives its own series from a hash of its title,
   so two cards never draw the same shape. Hovering any chart
   surfaces a live readout that tracks the cursor.
   ───────────────────────────────────────────────────────────── */

export type DataCardVariant =
  | 'radar'      /* capability coverage across axes   */
  | 'stacked'    /* volume over time, split by series */
  | 'area'       /* single trend with a filled area   */
  | 'orbit'      /* lifecycle ring of stages          */
  | 'console'    /* terminal-style progress log       */
  | 'checklist'  /* deployment / compliance posture   */

type Props = {
  variant: DataCardVariant
  title: string
  caption?: string
  /* Axis names, series names or stage names, depending on variant. */
  labels?: string[]
  /* Rows for the checklist variant: [name, detail]. */
  rows?: [string, string][]
  /* Y-axis suffix — 'K', '%', ' rps', ' hrs' … */
  unit?: string
  /* Top of the Y axis, in the same units. */
  max?: number
  className?: string
}

/* Title → stable seed, so each card on a page gets its own curve. */
function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

const useTick = (ms: number) => {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setTick(t => t + 1), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return tick
}

/* Deterministic pseudo-noise; `seed` shifts the whole waveform. */
const osc = (i: number, t: number, seed: number, amp = 1) =>
  (Math.sin((t + i * 1.7 + seed) / 2.3) * 0.6 +
   Math.cos((t + i * 2.9 + seed * 1.3) / 3.7) * 0.4) * amp

const fmt = (v: number, unit: string) =>
  `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, '')}${unit}`

/* ── Radar ──────────────────────────────────────────────────── */
function Radar({ labels, tick, seed }: { labels: string[]; tick: number; seed: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const n = labels.length

  const pts = labels.map((_, i) =>
    Math.max(32, Math.min(95, 60 + ((i * 37 + seed) % 26) + osc(i, tick, seed, 9))))

  const at = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    return [50 + Math.cos(a) * r, 50 + Math.sin(a) * r]
  }

  return (
    <div className="dcard__radar">
      <div className="dcard__radar-plot">
        <svg viewBox="0 0 100 100" role="img" aria-label="Capability coverage">
          {[15, 26, 37].map(r => (
            <polygon key={r} className="dcard__ring"
              points={labels.map((_, i) => at(i, r).map(v => v.toFixed(2)).join(',')).join(' ')} />
          ))}
          {labels.map((_, i) => {
            const [x, y] = at(i, 37)
            return <line key={i} className="dcard__spoke" x1="50" y1="50" x2={x.toFixed(2)} y2={y.toFixed(2)} />
          })}
          <polygon className="dcard__shape"
            points={pts.map((v, i) => at(i, (v / 100) * 37).map(c => c.toFixed(2)).join(',')).join(' ')} />
          {pts.map((v, i) => {
            const [x, y] = at(i, (v / 100) * 37)
            return (
              <circle
                key={i}
                className={`dcard__node${hover === i ? ' is-on' : ''}`}
                cx={x.toFixed(2)} cy={y.toFixed(2)}
                r={hover === i ? 3 : 1.6}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
              />
            )
          })}
        </svg>

        {hover !== null && (() => {
          const [x, y] = at(hover, (pts[hover] / 100) * 37)
          return (
            <span className="dcard__tip" style={{ left: `${x}%`, top: `${y}%` }}>
              <em>{labels[hover]}</em><strong>{Math.round(pts[hover])}%</strong>
            </span>
          )
        })()}
      </div>

      <ul className="dcard__axes">
        {labels.map((l, i) => (
          <li
            key={l}
            className={hover === i ? 'is-on' : ''}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          >
            <span>{l}</span><b>{Math.round(pts[i])}%</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Stacked bars ───────────────────────────────────────────── */
const STACK_COLORS = ['#e2703a', '#6fae7c', '#e8b04b', '#5fb0a8', '#b9a882']

function Stacked({
  labels, tick, seed, unit, max,
}: { labels: string[]; tick: number; seed: number; unit: string; max: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const bars = 16
  const series = labels.slice(0, STACK_COLORS.length)

  /* Each bar carries its own split, so the stack is never uniform. */
  const data = Array.from({ length: bars }, (_, i) => {
    const trend = 0.46 + (i / bars) * 0.5
    const total = Math.max(0.2, Math.min(1, trend * (1 + osc(i, tick, seed, 0.22))))
    const parts = series.map((_, j) => {
      const w = 1 + Math.sin((i * 1.3 + j * 2.1 + seed) / 2.7) * 0.45
      return w
    })
    const sum = parts.reduce((a, b) => a + b, 0)
    return { total, parts: parts.map(p => (p / sum) * 100) }
  })
  const peak = Math.max(...data.map(d => d.total))

  return (
    <div className="dcard__stacked">
      <div className="dcard__plot">
        <div className="dcard__yaxis" aria-hidden="true">
          {[1, 0.75, 0.5, 0.25].map(f => <span key={f}>{fmt(max * f, unit)}</span>)}
        </div>

        <div className="dcard__bars" role="img" aria-label="Volume over time"
             onPointerLeave={() => setHover(null)}>
          {[0, 1, 2, 3].map(i => (
            <span className="dcard__grid" key={i} style={{ bottom: `${(i + 1) * 20}%` }} />
          ))}

          {data.map((d, i) => (
            <span
              className={`dcard__bar${hover === i ? ' is-on' : ''}`}
              key={i}
              style={{ height: `${(d.total / peak) * 94}%`, animationDelay: `${i * 0.035}s` }}
              onPointerEnter={() => setHover(i)}
            >
              {series.map((s, j) => (
                <i key={s} style={{ height: `${d.parts[j]}%`, background: STACK_COLORS[j] }} />
              ))}
            </span>
          ))}

          {hover !== null && (
            <span className="dcard__tip dcard__tip--bar"
                  style={{ left: `${((hover + 0.5) / bars) * 100}%` }}>
              <em>T-{(bars - hover) * 2}d</em>
              <strong>{fmt(max * data[hover].total, unit)}</strong>
              <u>{series[0]} {Math.round(data[hover].parts[0])}%</u>
            </span>
          )}
        </div>
      </div>

      <ul className="dcard__legend">
        {series.map((s, j) => (
          <li key={s}><i style={{ background: STACK_COLORS[j] }} />{s}</li>
        ))}
      </ul>
    </div>
  )
}

/* ── Area trend ─────────────────────────────────────────────── */
function Area({
  labels, tick, seed, unit, max,
}: { labels: string[]; tick: number; seed: number; unit: string; max: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const n = 24
  const vals = Array.from({ length: n }, (_, i) => {
    const trend = 16 + (i / (n - 1)) * 66
    return Math.max(6, Math.min(97, trend + osc(i, tick, seed, 8)))
  })

  const W = 320, H = 130, P = 10
  const px = (i: number) => P + (i / (n - 1)) * (W - P * 2)
  const py = (v: number) => H - P - (v / 100) * (H - P * 2)
  const line = vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(' ')
  const area = `${line} L${px(n - 1).toFixed(1)} ${H} L${px(0).toFixed(1)} ${H} Z`
  const gid = `dcardFill-${seed}`

  const at = hover ?? n - 1

  return (
    <div className="dcard__area">
      <div
        className="dcard__area-plot"
        onPointerMove={e => {
          const r = e.currentTarget.getBoundingClientRect()
          const f = (e.clientX - r.left) / r.width
          setHover(Math.max(0, Math.min(n - 1, Math.round(f * (n - 1)))))
        }}
        onPointerLeave={() => setHover(null)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trend over time">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dc-accent)" stopOpacity=".32" />
              <stop offset="100%" stopColor="var(--dc-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} className="dcard__grid-l"
                  x1={P} x2={W - P} y1={P + f * (H - P * 2)} y2={P + f * (H - P * 2)} />
          ))}

          <path className="dcard__area-fill" d={area} fill={`url(#${gid})`} />
          <path className="dcard__area-line" d={line} />

          {hover !== null && (
            <line className="dcard__cursor" x1={px(at)} x2={px(at)} y1={P} y2={H - P} />
          )}
          <circle className="dcard__area-dot" cx={px(at)} cy={py(vals[at])} r="4" />
        </svg>

        <span className="dcard__tip" style={{ left: `${(px(at) / W) * 100}%`, top: `${(py(vals[at]) / H) * 100}%` }}>
          <strong>{fmt((vals[at] / 100) * max, unit)}</strong>
          <em>{hover === null ? 'now' : `T-${n - 1 - at}`}</em>
        </span>
      </div>

      <div className="dcard__xaxis" aria-hidden="true">
        {labels.slice(0, 4).map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  )
}

/* ── Orbit ──────────────────────────────────────────────────────
   The ring and the SVG spoke layer share one rotation duration and
   both start on mount, so the spokes stay locked to their nodes.
   Hovering pauses every layer at once.
   ───────────────────────────────────────────────────────────── */
function Orbit({ labels, tick }: { labels: string[]; tick: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const n = labels.length
  const active = hover ?? tick % n
  const R = 38

  return (
    <div className={`dcard__orbit${hover !== null ? ' is-held' : ''}`}>
      {/* rotating web: rings, spokes, travelling pulses */}
      <svg className="dcard__orbit-web" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="dcOrbGlow">
            <stop offset="0%" stopColor="var(--dc-accent)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--dc-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle className="dcard__orbit-glow" cx="50" cy="50" r="30" fill="url(#dcOrbGlow)" />

        <circle className="dcard__orbit-halo dcard__orbit-halo--a" cx="50" cy="50" r={R} />
        <circle className="dcard__orbit-halo dcard__orbit-halo--b" cx="50" cy="50" r={R - 11} />
        <circle className="dcard__orbit-halo dcard__orbit-halo--c" cx="50" cy="50" r={R - 21} />

        <g className="dcard__orbit-spin">
          {labels.map((l, i) => {
            const a = (Math.PI * 2 * i) / n - Math.PI / 2
            const x = 50 + Math.cos(a) * R
            const y = 50 + Math.sin(a) * R
            return (
              <line
                key={l}
                className={`dcard__orbit-spoke${i === active ? ' is-on' : ''}`}
                x1="50" y1="50" x2={x.toFixed(2)} y2={y.toFixed(2)}
                style={{ animationDelay: `${i * 0.28}s` }}
              />
            )
          })}
        </g>
      </svg>

      {/* rotating node ring — each label counter-rotates to stay upright */}
      <div className="dcard__orbit-ring">
        {labels.map((l, i) => {
          const a = (Math.PI * 2 * i) / n - Math.PI / 2
          return (
            <span
              key={l}
              className="dcard__orbit-slot"
              style={{ left: `${50 + Math.cos(a) * R}%`, top: `${50 + Math.sin(a) * R}%` }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              {/* counter-rotation lives on its own element so the node is
                  free to use transform for its hover scale */}
              <span className="dcard__orbit-spinback">
                <span className={`dcard__orbit-node${i === active ? ' is-on' : ''}`}>
                  <b className="dcard__orbit-idx">{String(i + 1).padStart(2, '0')}</b>
                  {l}
                </span>
              </span>
            </span>
          )
        })}
      </div>

      <span className="dcard__orbit-core">
        <i className="dcard__orbit-pip" aria-hidden="true" />
        {hover === null ? <>Shared<br />context</> : <><b>{labels[active]}</b></>}
      </span>
    </div>
  )
}

/* ── Console ────────────────────────────────────────────────── */
function Console({ labels, tick, seed }: { labels: string[]; tick: number; seed: number }) {
  const done = tick % (labels.length + 1)
  const pct = Math.round((done / labels.length) * 100)

  const log = useMemo(
    () =>
      labels.slice(0, Math.max(1, done)).map((l, i) => ({
        worker: `#${((seed + i * 0x2f7) & 0xffff).toString(16).padStart(4, '0')}`,
        step: l,
        state: i < done - 1 ? 'completed' : 'started',
      })),
    [labels, done, seed],
  )

  return (
    <div className="dcard__console">
      <div className="dcard__console-bar">
        <span className="dcard__console-dots"><i /><i /><i /></span>
        <span className="dcard__console-path">mission-control</span>
      </div>

      <div className="dcard__console-run">
        <span className="dcard__console-state"><i />Running</span>
        <span className="dcard__console-track"><i style={{ width: `${pct}%` }} /></span>
        <span className="dcard__console-count">{done}/{labels.length}</span>
      </div>

      <ul className="dcard__console-steps">
        {labels.map((l, i) => (
          <li key={l} className={i < done ? 'is-done' : i === done ? 'is-active' : ''}>
            <b>{i < done ? '✓' : i === done ? '●' : '○'}</b>{l}
          </li>
        ))}
      </ul>

      <ul className="dcard__console-log">
        {log.slice(-4).map((r, i) => (
          <li key={`${r.step}-${i}`}>
            <em>Worker {r.worker}</em> {r.state} <span>[{r.step}]</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Checklist ──────────────────────────────────────────────── */
function Checklist({ rows, tick }: { rows: [string, string][]; tick: number }) {
  const upTo = tick % (rows.length + 1)
  return (
    <ul className="dcard__check">
      {rows.map(([name, detail], i) => (
        <li key={name} className={i < upTo ? 'is-on' : ''}>
          <div>
            <strong>{name}</strong>
            <span>{detail}</span>
          </div>
          <b aria-hidden="true">✓</b>
        </li>
      ))}
    </ul>
  )
}

/* ── Shell ──────────────────────────────────────────────────── */
export default function DataCard({
  variant,
  title,
  caption,
  labels = [],
  rows = [],
  unit = '',
  max = 100,
  className = '',
}: Props) {
  const seed = useMemo(() => hash(title) % 97, [title])
  const tick = useTick(variant === 'console' ? 1500 : 1900)

  return (
    <figure className={`dcard dcard--${variant} ${className}`.trim()}>
      <figcaption className="dcard__head">
        <span className="dcard__title">{title}</span>
        <span className="dcard__live" aria-hidden="true"><i />Live</span>
      </figcaption>

      <div className="dcard__body">
        {variant === 'radar' && <Radar labels={labels} tick={tick} seed={seed} />}
        {variant === 'stacked' && <Stacked labels={labels} tick={tick} seed={seed} unit={unit} max={max} />}
        {variant === 'area' && <Area labels={labels} tick={tick} seed={seed} unit={unit} max={max} />}
        {variant === 'orbit' && <Orbit labels={labels} tick={tick} />}
        {variant === 'console' && <Console labels={labels} tick={tick} seed={seed} />}
        {variant === 'checklist' && <Checklist rows={rows} tick={tick} />}
      </div>

      {caption && <p className="dcard__caption">{caption}</p>}
    </figure>
  )
}
