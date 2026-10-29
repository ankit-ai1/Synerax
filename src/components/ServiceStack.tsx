import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion'
import {
  VizAWS, VizAgenticAI, VizObservability, VizDevSecOps,
  VizFrontend, VizModernization, VizITSM,
} from './ServiceShowcase'

const ic = {
  cloud:   <path d="M7 18h10.5a4 4 0 00.6-7.96A6 6 0 006.3 9.2 4.4 4.4 0 007 18z" />,
  ai:      <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>,
  pulse:   <path d="M3 12h4l2.5-6 5 12 2.5-6H21" />,
  ship:    <><path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2" /><path d="M9 15l-3-3 2-4c3-5 8-6 13-6 0 5-1 10-6 13l-4 2z" /><circle cx="15" cy="9" r="1.6" /></>,
  shield:  <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  app:     <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  refresh: <><path d="M20 8a8 8 0 00-14-3L4 7" /><path d="M4 3v4h4" /><path d="M4 16a8 8 0 0014 3l2-2" /><path d="M20 21v-4h-4" /></>,
  desk:    <><path d="M4 7h16v10H4z" /><path d="M8 7V5h8v2M9 12h6" /></>,
}

type Svc = {
  tag: string; icon: keyof typeof ic; title: string; lede: string
  points: string[]; stack: string[]; to: string; viz: ReactNode
}

const services: Svc[] = [
  { tag: 'Cloud', icon: 'cloud', title: 'Land in the cloud without the turbulence.',
    lede: 'Multi-cloud architecture and zero-downtime migrations on AWS, Azure and GCP — codified in Terraform from day one.',
    points: ['Landing zones & Terraform IaC', 'Zero-downtime cutovers', '99.99% availability by design'],
    stack: ['AWS', 'Azure', 'GCP', 'Kubernetes'], to: '/solutions/cloud-engineering-migration', viz: <VizAWS /> },
  { tag: 'Agentic AI', icon: 'ai', title: 'Agents that do the work, not just the talking.',
    lede: 'Production LLM agents wired into your tools and data — with retrieval, evaluations and guardrails built in.',
    points: ['RAG over your private data', 'Tool-using autonomous workflows', 'Evals, tracing & human-in-loop'],
    stack: ['OpenAI', 'Claude', 'LangGraph', 'pgvector'], to: '/solutions/agentic-ai', viz: <VizAgenticAI /> },
  { tag: 'Reliability', icon: 'pulse', title: 'See everything. Get paged less.',
    lede: 'Metrics, logs and traces unified behind SLOs — and an on-call rotation your engineers can actually live with.',
    points: ['OpenTelemetry end to end', 'SLOs & error budgets', 'Runbooks that self-heal'],
    stack: ['Grafana', 'Datadog', 'Prometheus'], to: '/solutions/observability-sre', viz: <VizObservability /> },
  { tag: 'Delivery', icon: 'ship', title: 'Ship fast. Ship safe. Spend less.',
    lede: 'Pipelines that scan as they ship, releases that roll back on their own, and cloud spend you can explain line by line.',
    points: ['SAST, SCA & secrets in every build', 'Canary releases with auto-rollback', 'Up to 38% lower cloud bill'],
    stack: ['GitHub Actions', 'ArgoCD', 'Kubecost'], to: '/solutions/devsecops-finops', viz: <VizDevSecOps /> },
  { tag: 'Product', icon: 'app', title: 'Software your teams want to open.',
    lede: 'Enterprise web platforms engineered for speed, scale and accessibility — from design system to deployed API.',
    points: ['Design systems & accessible UI', 'Core Web Vitals in the green', 'APIs built to be integrated'],
    stack: ['React', 'Next.js', 'Node.js', 'Python'], to: '/solutions/web-enterprise-applications', viz: <VizFrontend /> },
  { tag: 'Modernization', icon: 'refresh', title: 'Retire the monolith. Keep the business running.',
    lede: 'Strangler-pattern re-architecture that moves legacy systems to services route by route — with no feature freeze.',
    points: ['Seams mapped from real call graphs', 'Traffic shifted route by route', '4× release rate afterwards'],
    stack: ['Docker', 'Kafka', 'Kubernetes'], to: '/solutions/application-modernization', viz: <VizModernization /> },
  { tag: 'Operations', icon: 'desk', title: 'IT that mostly runs itself.',
    lede: 'ITIL-aligned service desks where automation resolves the routine and routes the rest — inside your SLAs.',
    points: ['Auto-resolved access & resets', 'SLA governance dashboards', 'ServiceNow & Jira SM experts'],
    stack: ['ServiceNow', 'Jira SM', 'ITIL 4'], to: '/solutions/itsm', viz: <VizITSM /> },
]

const Icon = ({ d, size = 22 }: { d: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)

/**
 * Sticky card stack: each service pins below the nav and the next one slides
 * up over it. Cards that are covered shrink and dim, so the pile reads as
 * depth. The section ends when the last card lands.
 */
export default function ServiceStack() {
  const root = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const cards = gsap.utils.toArray<HTMLElement>('.svs-card', el)

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // which card is "on top" — drives the dot rail
        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: self => { if (self.isActive) setCurrent(i) },
        })

        if (prefersReduced()) return

        // content lands as the card arrives
        gsap.from(card.querySelectorAll('.svs-reveal'), {
          y: 26, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 72%', once: true },
        })
        gsap.from(card.querySelector('.svs-window'), {
          y: 40, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: card, start: 'top 70%', once: true },
        })

        // covered cards recede: shrink a little and dim, scrubbed to scroll
        const next = cards[i + 1]
        if (!next) return
        const depth = cards.length - i
        gsap.to(card, {
          scale: 1 - Math.min(depth, 5) * 0.018,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
        })
        gsap.to(card.querySelector('.svs-card__shade'), {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 30%', scrub: true },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  /* A pinned card reports its stuck position, so work out where it sits in
     the flow instead: stack top + i × (card height + gap), minus its pin. */
  const jump = (i: number) => {
    const stack = root.current?.querySelector<HTMLElement>('.svs-stack')
    const card = root.current?.querySelectorAll<HTMLElement>('.svs-card')[i]
    if (!stack || !card) return
    const cs = getComputedStyle(card)
    const flowTop = stack.getBoundingClientRect().top + window.scrollY
      + i * (card.offsetHeight + parseFloat(cs.marginBottom))
    window.scrollTo({ top: flowTop - parseFloat(cs.top) + 2, behavior: 'smooth' })
  }

  return (
    <div className="svs" ref={root}>
      <div className="svs-stack">
        {services.map((s, i) => (
          <article
            key={s.tag}
            className={`svs-card${i % 2 ? ' svs-card--dark' : ''}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="svs-card__shade" aria-hidden="true" />
            <span className="svs-card__glow" aria-hidden="true" />

            <div className="svs-card__copy">
              <div className="svs-card__meta svs-reveal">
                <span className="svs-card__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="svs-card__ico"><Icon d={ic[s.icon]} size={20} /></span>
                <span className="svs-card__tag">{s.tag}</span>
              </div>

              <h3 className="svs-card__title svs-reveal">{s.title}</h3>
              <p className="svs-card__lede svs-reveal">{s.lede}</p>

              <ul className="svs-card__points">
                {s.points.map(p => (
                  <li key={p} className="svs-reveal">
                    <span className="svs-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="svs-card__foot svs-reveal">
                <div className="svs-card__stack">
                  {s.stack.map(t => <span key={t}>{t}</span>)}
                </div>
                <Link to={s.to} className="svs-card__link">
                  Explore
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </Link>
              </div>
            </div>

            <div className="svs-window">
              <div className="svs-window__bar" aria-hidden="true">
                <i /><i /><i />
                <span>synerax.in / {s.tag.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <div className="svs-window__body">{s.viz}</div>
            </div>
          </article>
        ))}

        {/* progress rail — sticks to the bottom of the viewport while the stack scrolls */}
        <nav className="svs-rail" aria-label="Services">
          {services.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              className={`svs-rail__dot${i === current ? ' is-on' : ''}${i < current ? ' is-past' : ''}`}
              onClick={() => jump(i)}
              aria-label={s.tag}
              aria-current={i === current}
            >
              <span>{s.tag}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
