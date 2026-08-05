import { useEffect, useMemo, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────
   Live software-factory dashboard.
   Every number and every line moves off one shared tick, so the
   panel reads as a running system rather than a screenshot.
   ───────────────────────────────────────────────────────────── */

type Tone = 'good' | 'warn'

type StageRow = { label: string; value: string }

type Stage = {
  name: string
  autos: number
  seed: number
  tone: Tone
  rows: (t: number) => StageRow[]
}

const STAGES: Stage[] = [
  {
    name: 'Triage',
    autos: 4,
    seed: 8,
    tone: 'good',
    rows: t => [
      { label: 'Volume', value: `${35 + (t % 8)} / day` },
      { label: 'Backlog', value: `${8 + (t % 6)}` },
      { label: 'Cycle', value: `2m ${String(8 + (t * 3) % 50).padStart(2, '0')}s` },
    ],
  },
  {
    name: 'Code gen',
    autos: 18,
    seed: 21,
    tone: 'warn',
    rows: t => [
      { label: 'LOC', value: `${57 + (t % 5)}k / day` },
      { label: 'In review', value: `${25 + (t % 7)}` },
      { label: 'Cycle', value: `22h ${String(10 + (t * 2) % 48).padStart(2, '0')}m` },
    ],
  },
  {
    name: 'Validate',
    autos: 11,
    seed: 34,
    tone: 'good',
    rows: t => [
      { label: 'PRs', value: `${44 + (t % 6)} / day` },
      { label: 'Pass rate', value: `${(98.6 + (t % 9) / 10).toFixed(1)}%` },
      { label: 'Cycle', value: `4m ${String(12 + (t * 4) % 45).padStart(2, '0')}s` },
    ],
  },
  {
    name: 'Release',
    autos: 5,
    seed: 47,
    tone: 'warn',
    rows: t => [
      { label: 'Deploys', value: `${6 + (t % 4)} / week` },
      { label: 'Pass rate', value: `${(99.0 + (t % 8) / 10).toFixed(1)}%` },
      { label: 'Cycle', value: `23h ${String(40 + (t * 2) % 19).padStart(2, '0')}m` },
    ],
  },
  {
    name: 'Document',
    autos: 2,
    seed: 60,
    tone: 'good',
    rows: t => [
      { label: 'Docs', value: `${18 + (t % 9)} / week` },
      { label: 'Pages', value: `${43 + (t % 12)} / week` },
      { label: 'Cycle', value: `3m ${String(20 + (t * 5) % 39).padStart(2, '0')}s` },
    ],
  },
  {
    name: 'Monitor',
    autos: 5,
    seed: 73,
    tone: 'warn',
    rows: t => [
      { label: 'Incidents', value: `${2 + (t % 3)} / day` },
      { label: 'Efficiency', value: `${(94.4 + (t % 11) / 10).toFixed(1)}%` },
      { label: 'MTTR', value: `22m ${String(10 + (t * 3) % 49).padStart(2, '0')}s` },
    ],
  },
]

/* `deltaBase`/`deltaSpread` keep each card's swing distinct — sharing one
   formula made all four read the same percentage. */
const BIG_CHARTS = [
  { label: 'Tickets triaged', unit: 'tix', tag: 'Queue burn', base: 86, seed: 12, tone: 'good' as Tone, foot: 'Peak at 04:20 UTC', metaLabel: 'Baseline', metaSeed: 71, deltaBase: 8280, deltaSpread: 40 },
  { label: 'PR validations', unit: 'chk', tag: 'Merge gate', base: 1281, seed: 29, tone: 'warn' as Tone, foot: 'Validation load easing', metaLabel: 'Checks', metaSeed: 1200, deltaBase: 34, deltaSpread: 7 },
  { label: 'PRs merged', unit: 'prs', tag: 'Ship rate', base: 167, seed: 41, tone: 'warn' as Tone, foot: 'Merge queue draining', metaLabel: 'Baseline', metaSeed: 54, deltaBase: 41, deltaSpread: 5 },
  { label: 'Incidents processed', unit: 'inc', tag: 'Reliability', base: 43, seed: 55, tone: 'good' as Tone, foot: 'System steady', metaLabel: 'SLO', metaSeed: 99, deltaBase: 16, deltaSpread: 6 },
]

const LOG_LINES = [
  'Routing agent assigned 42 priority tickets',
  'Regression suite passed on production branch',
  'Capacity scaled ahead of the traffic spike',
  'Security monitor closed 12 low-risk events',
  'Docs regenerated for 6 changed endpoints',
]

/* A drifting waveform. `t` shifts the window so the line scrolls left. */
function wave(seed: number, t: number, length: number) {
  return Array.from({ length }, (_, i) => {
    const p = t + i + seed
    const a = Math.sin(p / 2.4) * 20
    const b = Math.cos(p / 3.7) * 12
    const c = Math.sin(p / 6.1) * 7
    return Math.max(10, Math.min(92, 50 + a + b + c))
  })
}

function linePath(data: number[]) {
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - v
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

function Spark({ data, tone }: { data: number[]; tone: Tone }) {
  return (
    <svg className={`fxd-spark fxd-spark--${tone}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={linePath(data)} />
    </svg>
  )
}

function Radar({ label, value, unit, foot, tone }: { label: string; value: number; unit: string; foot: string; tone: Tone }) {
  return (
    <div className={`fxd-radar fxd-radar--${tone}`}>
      <span className="fxd-radar__lbl">{label}</span>
      <div className="fxd-radar__dish" aria-hidden="true">
        <i /><i /><i />
        <b />
        <u />
      </div>
      <span className="fxd-radar__unit">{unit}</span>
      <strong className="fxd-radar__val">{value.toLocaleString()}</strong>
      <span className="fxd-radar__foot"><i />{foot}</span>
    </div>
  )
}

export default function HeroDashboard() {
  const [tick, setTick] = useState(0)
  const [hover, setHover] = useState<{ chart: string; i: number; v: number; x: number; y: number } | null>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return
    const id = window.setInterval(() => setTick(t => t + 1), 1400)
    return () => window.clearInterval(id)
  }, [])

  const stages = useMemo(
    () => STAGES.map(s => ({ ...s, data: wave(s.seed, tick, 14), rowData: s.rows(tick) })),
    [tick],
  )

  const charts = useMemo(
    () =>
      BIG_CHARTS.map(c => {
        const data = wave(c.seed, tick, 22)
        const drift = Math.round((data[data.length - 1] - 50) / 6)
        return {
          ...c,
          data,
          value: c.base + drift + (tick % 4),
          delta: (c.tone === 'good' ? 1 : -1) * (c.deltaBase + (tick * 3) % c.deltaSpread),
          meta: c.metaSeed + (tick % 9),
        }
      }),
    [tick],
  )

  const signals = 200 + (tick % 40)
  const deploys = 148 + (tick % 24)
  const log = LOG_LINES[tick % LOG_LINES.length]

  return (
    <div className="fx-dash fx-dash--factory" aria-label="Live software factory dashboard">
      <div className="fx-dash__bar">
        <span className="fx-dash__dots"><i /><i /><i /></span>
        <span className="fx-dash__chip">Your software factory</span>
        <span className="fx-dash__live"><i />Live</span>
        <span className="fx-dash__range">7d</span>
      </div>

      <div className="fx-dash__body">
        <aside className="fx-dash__side">
          <span className="fx-dash__back">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to app
          </span>

          <span className="fx-dash__nav is-active">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 9v12" />
            </svg>
            Software Factory
          </span>

          <span className="fx-dash__nav">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
              <path d="M18 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
            </svg>
            Automations
          </span>
        </aside>

        <div className="fx-dash__main">
          {/* ── Pipeline strip: signal in, six stages, deploys out ── */}
          <section className="fxd-strip">
            <Radar label="Signal" value={signals} unit="Signals / 7day" foot="15 input sources" tone="good" />

            <div className="fxd-strip__stages">
              {stages.map((stage, i) => (
                <article className="fxd-stage" key={stage.name}>
                  <span className="fxd-stage__idx">{i + 1}</span>
                  <h3 className="fxd-stage__name">{stage.name}</h3>
                  <span className="fxd-stage__autos">{stage.autos} autos</span>

                  <dl className="fxd-stage__rows">
                    {stage.rowData.map(row => (
                      <div className="fxd-stage__row" key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Spark data={stage.data} tone={stage.tone} />
                </article>
              ))}
            </div>

            <Radar label="Deploy" value={deploys} unit="Deploys / 7day" foot="12 KPIs monitored" tone="warn" />
          </section>

          {/* ── Four live charts with axes and hover readout ── */}
          <section className="fxd-grid">
            {charts.map(chart => (
              <article className="fxd-card" key={chart.label}>
                <header className="fxd-card__top">
                  <span className="fxd-card__title">{chart.label}</span>
                  <span className="fxd-card__tag">{chart.tag}</span>
                </header>

                <div className="fxd-card__val">
                  {chart.value.toLocaleString()}<small>{chart.unit}</small>
                </div>

                <div className={`fxd-card__delta fxd-card__delta--${chart.tone}`}>
                  <i>{chart.delta > 0 ? '▲' : '▼'}</i>
                  {chart.delta > 0 ? '+' : ''}{chart.delta}%
                  <em>This week</em>
                </div>

                <div className="fxd-plot">
                  <div className="fxd-plot__yaxis" aria-hidden="true">
                    <span>Max</span><span>Mid</span><span>Min</span>
                  </div>

                  <div
                    className="fxd-plot__area"
                    onPointerMove={e => {
                      const r = e.currentTarget.getBoundingClientRect()
                      const lx = Math.max(0, Math.min(r.width, e.clientX - r.left))
                      const i = Math.round((lx / r.width) * (chart.data.length - 1))
                      setHover({ chart: chart.label, i, v: Math.round(chart.data[i]), x: lx, y: e.clientY - r.top })
                    }}
                    onPointerLeave={() => setHover(null)}
                  >
                    <span className={`fxd-plot__band fxd-plot__band--${chart.tone}`} />
                    <span className="fxd-plot__mid" />
                    <svg className={`fxd-line fxd-line--${chart.tone}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <path d={linePath(chart.data)} />
                    </svg>

                    {hover?.chart === chart.label && (
                      <>
                        <span className="fxd-plot__cursor" style={{ left: `${hover.x}px` }} />
                        <span className="fxd-plot__tip" style={{ left: `${hover.x}px` }}>
                          T-{(chart.data.length - 1 - hover.i) * 3}D<strong>{hover.v}%</strong>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="fxd-plot__xaxis" aria-hidden="true">
                  <span>T-60</span><span>T-30</span><span>Now</span>
                </div>

                <footer className="fxd-card__foot">
                  <span><i />{chart.foot}</span>
                  <span>{chart.metaLabel} {chart.meta.toLocaleString()}</span>
                </footer>
              </article>
            ))}
          </section>

          <div className="fxd-log">
            <span className="fxd-log__dot" />
            <span className="fxd-log__txt">{log}</span>
            <span className="fxd-log__meta">Now</span>
          </div>
        </div>
      </div>
    </div>
  )
}
