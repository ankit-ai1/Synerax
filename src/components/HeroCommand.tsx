import { useEffect, useState } from 'react'
import { prefersReduced } from '../lib/motion'

/* ─── Briefs the command bar types, and the plan each one produces ─── */
const runs = [
  {
    brief: 'Migrate on-prem ERP to AWS · zero downtime · 10 weeks',
    cards: [
      { fit: '96% fit', title: 'Cloud Migration Blueprint', meta: ['AWS', 'Landing Zone', 'Terraform'], eta: '3 wks', team: 3 },
      { fit: '92% fit', title: 'Zero-Downtime Cutover',     meta: ['Blue/Green', 'DMS', 'Runbooks'],     eta: '4 wks', team: 4 },
      { fit: '89% fit', title: 'FinOps Guardrails',         meta: ['Budgets', 'Tagging', 'Savings Plans'], eta: '2 wks', team: 2 },
    ],
  },
  {
    brief: 'AI agent for claims processing · SOC 2 · 6 weeks',
    cards: [
      { fit: '97% fit', title: 'Agentic Claims Pipeline', meta: ['LangGraph', 'RAG', 'Human-in-loop'], eta: '4 wks', team: 4 },
      { fit: '93% fit', title: 'Compliance Pack',         meta: ['SOC 2', 'PII redaction', 'Audit logs'], eta: '2 wks', team: 2 },
      { fit: '90% fit', title: 'Evals & Monitoring',      meta: ['Tracing', 'Evals', 'Drift alerts'],  eta: '1 wk',  team: 2 },
    ],
  },
  {
    brief: 'Contact center for 2M calls/month · 99.9% uptime',
    cards: [
      { fit: '95% fit', title: 'Omnichannel Contact Center', meta: ['Amazon Connect', 'Lex', 'CRM sync'], eta: '6 wks', team: 5 },
      { fit: '91% fit', title: 'Real-time Analytics',        meta: ['Sentiment', 'QA scoring', 'Dashboards'], eta: '3 wks', team: 3 },
      { fit: '88% fit', title: 'SRE Playbook',               meta: ['SLOs', 'On-call', 'Auto-scaling'],  eta: '2 wks', team: 2 },
    ],
  },
]

const STATUS = ['', 'Scoping…', 'Architecting…', 'Ready']

type Phase = 'typing' | 'run' | 'hold' | 'erase'

/**
 * The hero's "command bar": types a project brief, then a plan builds
 * underneath it — skeleton cards fill in and progress to Ready before the
 * next brief replaces it. Hovering the panel pauses the loop so it can be read.
 */
export default function HeroCommand() {
  const still = prefersReduced()
  const [qi, setQi] = useState(0)
  const [n, setN] = useState(still ? runs[0].brief.length : 0)
  const [phase, setPhase] = useState<Phase>(still ? 'hold' : 'typing')
  const [stage, setStage] = useState(still ? 3 : 0)
  const [hover, setHover] = useState(false)

  const run = runs[qi]

  useEffect(() => {
    if (still || hover) return
    let t: number

    if (phase === 'typing') {
      t = n < run.brief.length
        ? window.setTimeout(() => setN(n + 1), 32 + Math.random() * 44)
        : window.setTimeout(() => { setPhase('run'); setStage(1) }, 560)
    } else if (phase === 'run') {
      t = stage < 3
        ? window.setTimeout(() => setStage(stage + 1), 1150)
        : window.setTimeout(() => setPhase('hold'), 200)
    } else if (phase === 'hold') {
      t = window.setTimeout(() => { setStage(0); setPhase('erase') }, 3000)
    } else {
      t = n > 0
        ? window.setTimeout(() => setN(n - 1), 13)
        : window.setTimeout(() => { setQi((qi + 1) % runs.length); setPhase('typing') }, 420)
    }
    return () => window.clearTimeout(t)
  }, [phase, n, stage, hover, qi, still, run.brief.length])

  const live = stage > 0
  const typed = run.brief.slice(0, n)
  const go = stage === 3 ? 'done' : live ? 'busy' : n === run.brief.length ? 'ready' : 'idle'

  return (
    <div
      className={`hx-cmd${live ? ' is-live' : ''}${stage === 3 ? ' is-done' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="hx-bar">
        <span className="hx-bar__ring" aria-hidden="true" />
        <svg className="hx-bar__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        </svg>
        <p className="hx-bar__text" aria-live="polite">
          {typed.split(' · ').map((part, i) => (
            <span key={i}>
              {i > 0 && <b className="hx-bar__sep"> · </b>}
              {part}
            </span>
          ))}
          <i className="hx-bar__caret" aria-hidden="true" />
        </p>
        <span className={`hx-go hx-go--${go}`} aria-hidden="true">
          {go === 'done' ? (
            <>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
              Plan ready
            </>
          ) : go === 'busy' ? (
            <><i className="hx-go__spin" />Planning</>
          ) : (
            <>Plan it <kbd>↵</kbd></>
          )}
        </span>
      </div>

      {/* beam that carries the brief down into the plan */}
      <div className="hx-beam" aria-hidden="true"><i /></div>

      <div className="hx-panel">
        <div className="hx-panel__hd">
          <p className="hx-run__lbl">
            <span className="hx-run__dot" aria-hidden="true" />
            Example run
          </p>
          <span className="hx-panel__state">
            {stage === 3 ? '3 workstreams · ready to start' : live ? 'Matching engineers & architecture…' : 'Waiting for a brief'}
          </span>
        </div>

        <div className="hx-run">
          {run.cards.map((c, i) => (
            <article
              key={i}
              className={`hx-card hx-card--s${stage}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              {live ? (
                <div className="hx-card__body" key={`${qi}-${i}`}>
                  <div className="hx-card__top">
                    <span className="hx-card__fit">{c.fit}</span>
                    <span className={`hx-card__status${stage === 3 ? ' is-ready' : ''}`}>
                      {stage === 3 && (
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      )}
                      {STATUS[stage]}
                    </span>
                  </div>
                  <h3 className="hx-card__title">{c.title}</h3>
                  <p className="hx-card__meta">{c.meta.join(' · ')}</p>
                  <div className="hx-card__foot">
                    <span className="hx-card__team">
                      {Array.from({ length: c.team }).map((_, k) => <i key={k} style={{ '--k': k } as React.CSSProperties} />)}
                      <em>{c.team} engineers</em>
                    </span>
                    <span className="hx-card__eta">ETA {c.eta}</span>
                  </div>
                </div>
              ) : (
                <div className="hx-skel" aria-hidden="true">
                  <div className="hx-card__top"><i className="hx-skel__pill" /><i className="hx-skel__pill hx-skel__pill--sm" /></div>
                  <i className="hx-skel__line hx-skel__line--lg" />
                  <i className="hx-skel__line" />
                  <div className="hx-card__foot"><i className="hx-skel__dots" /><i className="hx-skel__pill hx-skel__pill--sm" /></div>
                </div>
              )}
              <span className="hx-card__bar" aria-hidden="true"><i /></span>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
