import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CountUp } from './CountUp'
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion'

const Head = ({ children }: { children: ReactNode }) => (
  <div className="fxv__hd">
    <span className="fxv__lbl">{children}</span>
    <span className="fxv__live"><i />Live</span>
  </div>
)

/* A readout strip every mini-UI ends with, so no tab feels thin. */
const Stats = ({ items }: { items: [string, string][] }) => (
  <div className="fxv-stats">
    {items.map(([v, l]) => (
      <div className="fxv-stat" key={l}>
        <span className="fxv-stat__v">{v}</span>
        <span className="fxv-stat__l">{l}</span>
      </div>
    ))}
  </div>
)

const Chips = ({ items }: { items: string[] }) => (
  <div className="fxv-chips">
    {items.map(c => <span className="fxv-chip" key={c}>{c}</span>)}
  </div>
)

/* ── 1. Contact Center — interaction analytics console ──────── */

type CcRange = '7d' | '30d' | '90d'
type CcGroup = 'channel' | 'team'

const CC_RANGES: [CcRange, string][] = [
  ['7d', 'Last 7 days'],
  ['30d', 'Last 30 days'],
  ['90d', 'Last 90 days'],
]

/* Each series is one slice of the stack, drawn bottom-up. */
const CC_SERIES: Record<CcGroup, { label: string; color: string; weight: number }[]> = {
  channel: [
    { label: 'Voice',       color: '#e2703a', weight: 34 },
    { label: 'Chat',        color: '#6fae7c', weight: 26 },
    { label: 'Email',       color: '#e8b04b', weight: 9 },
    { label: 'WhatsApp',    color: '#e2553a', weight: 8 },
    { label: 'Social',      color: '#5fb0a8', weight: 13 },
    { label: 'Self-serve',  color: '#b9a882', weight: 6 },
    { label: 'Escalation',  color: '#9a9a95', weight: 4 },
  ],
  team: [
    { label: 'Tier 1',      color: '#e2703a', weight: 38 },
    { label: 'Tier 2',      color: '#6fae7c', weight: 24 },
    { label: 'Billing',     color: '#e8b04b', weight: 10 },
    { label: 'Retention',   color: '#e2553a', weight: 8 },
    { label: 'Technical',   color: '#5fb0a8', weight: 12 },
    { label: 'Onboarding',  color: '#b9a882', weight: 5 },
    { label: 'Back office', color: '#9a9a95', weight: 3 },
  ],
}

const CC_BARS: Record<CcRange, number> = { '7d': 7, '30d': 24, '90d': 30 }
const CC_AXIS: Record<CcRange, string[]> = {
  '7d':  ['Mon', 'Wed', 'Fri', 'Sun'],
  '30d': ['Feb 9', 'Feb 13', 'Feb 18', 'Feb 22', 'Feb 28', 'Mar 4', 'Mar 8', 'Mar 11'],
  '90d': ['Dec', 'Jan', 'Feb', 'Mar'],
}

/* Deterministic shape — a slow climb with a mid-window dip, so the chart
   reads like real traffic instead of noise. */
const ccTotal = (i: number, n: number) => {
  const t = i / (n - 1)
  const trend = 0.55 + t * 0.5
  const dip = 1 - Math.exp(-(((t - 0.42) / 0.13) ** 2)) * 0.3
  const jitter = 1 + Math.sin(i * 2.7) * 0.09 + Math.cos(i * 1.3) * 0.06
  return trend * dip * jitter
}

const VizContactCenter = () => {
  const [range, setRange] = useState<CcRange>('30d')
  const [group, setGroup] = useState<CcGroup>('channel')

  const series = CC_SERIES[group]
  const count = CC_BARS[range]
  const bars = Array.from({ length: count }, (_, i) => ccTotal(i, count))
  const peak = Math.max(...bars)

  return (
    <div className="cc">
      <header className="cc__head">
        <h4 className="cc__title">Interaction Credits</h4>
        <p className="cc__sub">Monitor contact volume over time, grouped by channel or team.</p>
      </header>

      <div className="cc__toolbar">
        <div className="cc__seg" role="group" aria-label="Date range">
          {CC_RANGES.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={key === range ? 'is-active' : ''}
              aria-pressed={key === range}
              onClick={() => setRange(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="cc__export">
          Export
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4M8 8l4-4 4 4M4 20h16" />
          </svg>
        </button>
      </div>

      <div className="cc__filters">
        <div className="cc__field">
          <span className="cc__label">Group by</span>
          <div className="cc__seg cc__seg--sm" role="group" aria-label="Group by">
            <button
              type="button"
              className={group === 'channel' ? 'is-active' : ''}
              aria-pressed={group === 'channel'}
              onClick={() => setGroup('channel')}
            >
              By channel
            </button>
            <button
              type="button"
              className={group === 'team' ? 'is-active' : ''}
              aria-pressed={group === 'team'}
              onClick={() => setGroup('team')}
            >
              By team
            </button>
          </div>
        </div>
        <div className="cc__field">
          <span className="cc__label">Team</span>
          <span className="cc__select">All teams<i /></span>
        </div>
        <div className="cc__field">
          <span className="cc__label">Channel</span>
          <span className="cc__select">All channels<i /></span>
        </div>
      </div>

      <div className="cc__chart">
        <span className="cc__chart-lbl">
          {group === 'channel' ? 'Volume by channel' : 'Volume by team'}
        </span>

        <div className="cc__plot">
          <div className="cc__yaxis" aria-hidden="true">
            {[40, 30, 20, 10].map(v => <span key={v}>{v}K</span>)}
          </div>

          <div className="cc__bars" role="img" aria-label="Stacked interaction volume">
            {[0, 1, 2, 3].map(i => <span className="cc__grid" key={i} style={{ bottom: `${(i + 1) * 20}%` }} />)}

            {bars.map((total, i) => (
              <span
                className="cc__bar"
                key={`${range}-${group}-${i}`}
                style={{
                  height: `${(total / peak) * 92}%`,
                  animationDelay: `${i * 0.022}s`,
                }}
              >
                {series.map(s => (
                  <i
                    key={s.label}
                    style={{ height: `${s.weight}%`, background: s.color }}
                  />
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="cc__xaxis" aria-hidden="true">
          {CC_AXIS[range].map(d => <span key={d}>{d}</span>)}
        </div>

        <ul className="cc__legend">
          {series.map(s => (
            <li key={s.label}>
              <i style={{ background: s.color }} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── 2. Agentic AI — agent transcript ───────────────────────── */
const VizAgenticAI = () => (
  <div className="fxv">
    <Head>AI Assistant</Head>
    <div className="fxv-chat">
      <div className="fxv-bubble fxv-bubble--user">How's our uptime this month?</div>
      <div className="fxv-bubble fxv-bubble--agent">
        <span className="fxv-bubble__spark">✦</span>
        99.9% uptime, zero incidents. Response time down 18% vs last month.
        <i className="fxv-caret" />
      </div>
      <div className="fxv-typing"><i /><i /><i /></div>
    </div>
    <span className="fxv__cap">Pipeline</span>
    <div className="fxv-rows">
      {[['NLP pipeline', 'running'], ['Autonomous agents', 'active'], ['Tool calls', 'live']].map(([k, v]) => (
        <div className="fxv-rows__row" key={k}><span>{k}</span><span className="fxv-rows__v">{v}</span></div>
      ))}
    </div>
    <Chips items={['OpenAI', 'LangChain']} />
    <Stats items={[['LLM', 'Agents'], ['24/7', 'Autonomous'], ['NLP', 'Pipelines']]} />
  </div>
)

/* ── 3. Backend — API request flow ──────────────────────────── */
const VizBackend = () => (
  <div className="fxv">
    <Head>Request Flow</Head>
    <div className="fxv-api">
      {[
        ['GET', '/v1/orders', '18ms'],
        ['POST', '/v1/orders', '24ms'],
        ['GET', '/graphql', '31ms'],
        ['GET', '/v1/health', '6ms'],
      ].map(([m, p, t], i) => (
        <div className="fxv-api__row" key={p} style={{ animationDelay: `${i * 0.12}s` }}>
          <span className="fxv-api__m">{m}</span>
          <span className="fxv-api__p">{p}</span>
          <span className="fxv-api__t">{t}</span>
        </div>
      ))}
    </div>
    <Chips items={['Node.js', 'Python', 'FastAPI']} />
    <Stats items={[['REST', 'and GraphQL'], ['Micro', 'services'], ['High', 'traffic ready']]} />
  </div>
)

/* ── 4. Frontend — preview + Core Web Vitals gauges ─────────── */
const VizFrontend = () => (
  <div className="fxv">
    <Head>Core Web Vitals</Head>
    <div className="fxv-preview">
      <span className="fxv-preview__bar" />
      <span className="fxv-preview__block" />
      <span className="fxv-preview__line" />
      <span className="fxv-preview__line fxv-preview__line--short" />
    </div>
    <div className="fxv-gauges">
      {[['LCP', 88], ['CLS', 94], ['INP', 81]].map(([k, pct], i) => (
        <div className="fxv-gauge" key={k as string}>
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle className="fxv-gauge__bg" cx="22" cy="22" r="18" />
            <circle
              className="fxv-gauge__fg" cx="22" cy="22" r="18"
              style={{
                strokeDasharray: 113,
                ['--dash' as string]: `${113 - (113 * (pct as number)) / 100}`,
                animationDelay: `${i * 0.14}s`,
              }}
            />
          </svg>
          <span className="fxv-gauge__n">{pct}</span>
          <span className="fxv-gauge__k">{k}</span>
        </div>
      ))}
    </div>
    <Chips items={['React', 'Next.js', 'Vue']} />
    <Stats items={[['UX', 'First'], ['Perf', 'Optimised'], ['A11y', 'Built in']]} />
  </div>
)

/* ── 5. AWS — architecture diagram with flowing data ────────── */
const VizAWS = () => (
  <div className="fxv">
    <Head>Cloud Architecture</Head>
    <svg className="fxv-arch" viewBox="0 0 260 150" aria-hidden="true">
      <rect className="fxv-arch__vpc" x="6" y="6" width="248" height="138" rx="8" />
      <text className="fxv-arch__vpclbl" x="16" y="22">VPC</text>

      <rect className="fxv-arch__box" x="96" y="34" width="68" height="26" rx="5" />
      <text className="fxv-arch__t" x="130" y="51" textAnchor="middle">Ingress</text>

      <path className="fxv-arch__line" d="M130 60 L130 78 M46 78 L214 78 M46 78 L46 96 M130 78 L130 96 M214 78 L214 96" />
      <path className="fxv-arch__flow" d="M130 60 L130 78 L46 78 L46 96" />
      <path className="fxv-arch__flow fxv-arch__flow--b" d="M130 60 L130 78 L214 78 L214 96" />

      {[[16, 'Node'], [100, 'Node'], [184, 'Node']].map(([x, l], i) => (
        <g key={i}>
          <rect className="fxv-arch__box" x={x as number} y="96" width="60" height="26" rx="5" />
          <text className="fxv-arch__t" x={(x as number) + 30} y="113" textAnchor="middle">{l}</text>
          <circle className="fxv-arch__pulse" cx={(x as number) + 30} cy="132" r="3"
                  style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
    </svg>
    <div className="fxv-metrics fxv-metrics--sm">
      <div className="fxv-metric">
        <span className="fxv-metric__v"><CountUp to={99.99} decimals={2} suffix="%" /></span>
        <span className="fxv-metric__l">Availability SLA</span>
      </div>
    </div>
    <div className="fxv-rows">
      {[['Terraform IaC', 'applied'], ['Kubernetes', 'healthy'], ['CI/CD', 'passing']].map(([k, v]) => (
        <div className="fxv-rows__row" key={k}><span>{k}</span><span className="fxv-rows__v">{v}</span></div>
      ))}
    </div>
    <Stats items={[['IaC', 'Managed'], ['K8s', 'Orchestrated'], ['CI/CD', 'Automated']]} />
  </div>
)

/* ── 6. Cybersecurity — scan, checks turning green ──────────── */
const VizSecurity = () => (
  <div className="fxv">
    <Head>Security Scan</Head>
    <div className="fxv-scan">
      {['SOC 2 controls', 'ISO 27001 controls', 'Zero-trust access', 'Endpoint posture', 'Threat monitoring']
        .map((s, i) => (
          <div className="fxv-scan__row" key={s} style={{ animationDelay: `${i * 0.22}s` }}>
            <span className="fxv-scan__tick" style={{ animationDelay: `${i * 0.22 + 0.15}s` }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="fxv-scan__n">{s}</span>
            <span className="fxv-scan__s" style={{ animationDelay: `${i * 0.22 + 0.15}s` }}>pass</span>
          </div>
        ))}
    </div>
    <span className="fxv__cap">24/7 SOC operations</span>
    <Stats items={[['SOC 2', 'Certified'], ['ISO', '27001'], ['Zero', 'Trust']]} />
  </div>
)

/* ── 7. Inventory — stock / forecast chart ──────────────────── */
const VizInventory = () => (
  <div className="fxv">
    <Head>Stock Forecast</Head>
    <div className="fxv-chart">
      {[46, 58, 40, 66, 54, 74, 62, 86, 70, 92].map((h, i) => (
        <span className="fxv-chart__col" key={i}>
          <i style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
        </span>
      ))}
      <svg className="fxv-chart__trend" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 44 L26 38 L48 46 L70 30 L92 36 L114 22 L136 28 L158 12 L180 18 L196 6" />
      </svg>
    </div>
    <div className="fxv-rows">
      {[['Warehouse A', 'in stock'], ['Warehouse B', 'in stock'], ['ERP sync', 'live']].map(([k, v]) => (
        <div className="fxv-rows__row" key={k}><span>{k}</span><span className="fxv-rows__v">{v}</span></div>
      ))}
    </div>
    <Stats items={[['Real', 'Time tracking'], ['AI', 'Forecasting'], ['ERP', 'Integrated']]} />
  </div>
)

/* ── 8. Full Stack & Mobile — device with UI sliding in ─────── */
const VizMobile = () => (
  <div className="fxv">
    <Head>Target Platforms</Head>
    <div className="fxv-stage-row">
      <div className="fxv-phone">
        <span className="fxv-phone__notch" />
        <span className="fxv-phone__ui">
          {[0, 1, 2, 3].map(i => (
            <i key={i} style={{ animationDelay: `${0.15 + i * 0.12}s` }} />
          ))}
        </span>
      </div>
      <div className="fxv-rows fxv-rows--flush">
        {[['iOS', 'App Store'], ['Android', 'Play Store'], ['Web', 'responsive']].map(([k, v]) => (
          <div className="fxv-rows__row" key={k}><span>{k}</span><span className="fxv-rows__v">{v}</span></div>
        ))}
      </div>
    </div>
    <Chips items={['Flutter', 'React Native', 'Swift', 'Kotlin']} />
    <Stats items={[['UX', 'To launch'], ['Cross', 'Platform'], ['Store', 'Ready']]} />
  </div>
)

/* ── 9. IT Consulting — roadmap revealing left → right ──────── */
const VizConsulting = () => (
  <div className="fxv">
    <Head>Engagement Roadmap</Head>
    <div className="fxv-road">
      <span className="fxv-road__track"><i /></span>
      {[
        ['Advisory', 'CTO-as-a-Service'],
        ['Roadmap', 'Digital transformation'],
        ['Delivery', 'Talent outsourcing'],
      ].map(([t, s], i) => (
        <div className="fxv-road__stop" key={t} style={{ animationDelay: `${0.2 + i * 0.22}s` }}>
          <span className="fxv-road__dot" />
          <span className="fxv-road__t">{t}</span>
          <span className="fxv-road__s">{s}</span>
        </div>
      ))}
    </div>
    <div className="fxv-rows">
      {[['Strategic advisory', 'ongoing'], ['Transformation', 'in progress']].map(([k, v]) => (
        <div className="fxv-rows__row" key={k}><span>{k}</span><span className="fxv-rows__v">{v}</span></div>
      ))}
    </div>
    <Stats items={[['CTO', 'As a service'], ['Road', 'Mapped'], ['Talent', 'On demand']]} />
  </div>
)

/* ── The nine Synerax services ──────────────────────────────── */

type Service = { tab: string; title: string; desc: string; to: string; viz: ReactNode }

const services: Service[] = [
  { tab: 'Contact Center', title: 'Contact Center Solutions',
    desc: 'Enterprise omnichannel platform handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.',
    to: '/solutions/contact-center', viz: <VizContactCenter /> },
  { tab: 'Agentic AI', title: 'Agentic AI Solutions',
    desc: 'Autonomous LLM agents, NLP pipelines, OpenAI, LangChain — AI that works for your business 24/7.',
    to: '/solutions/agentic-ai', viz: <VizAgenticAI /> },
  { tab: 'Backend', title: 'Backend Development',
    desc: 'Scalable REST/GraphQL APIs and microservices. Node.js, Python, FastAPI for high-traffic systems.',
    to: '/solutions/backend', viz: <VizBackend /> },
  { tab: 'Frontend', title: 'Frontend Development',
    desc: 'React, Next.js, Vue applications with exceptional UX. Performance-first with Core Web Vitals.',
    to: '/solutions/frontend', viz: <VizFrontend /> },
  { tab: 'AWS Infra', title: 'AWS Infrastructure',
    desc: 'Enterprise AWS with 99.99% availability SLAs. Terraform IaC, Kubernetes, CI/CD pipelines.',
    to: '/solutions/aws', viz: <VizAWS /> },
  { tab: 'Cybersecurity', title: 'Cybersecurity',
    desc: '24/7 SOC operations, zero-trust architecture. SOC 2 & ISO 27001 certified infrastructure.',
    to: '/solutions/cybersecurity', viz: <VizSecurity /> },
  { tab: 'Inventory', title: 'Inventory Management',
    desc: 'Real-time stock tracking, AI demand forecasting, multi-warehouse support and ERP integrations.',
    to: '/solutions/inventory', viz: <VizInventory /> },
  { tab: 'Full Stack & Mobile', title: 'Full Stack & Mobile',
    desc: 'Flutter, React Native, Swift, Kotlin. Complete app development from UX to App Store delivery.',
    to: '/solutions/fullstack', viz: <VizMobile /> },
  { tab: 'IT Consulting', title: 'IT Consulting & Outsourcing',
    desc: 'CTO-as-a-Service, digital transformation roadmaps, talent outsourcing and strategic advisory.',
    to: '/solutions/consulting', viz: <VizConsulting /> },
]

export default function ServiceShowcase() {
  const [active, setActive] = useState(0)
  const [live, setLive] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ink, setInk] = useState({ left: 0, width: 0 })
  const inkRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Hold the mini-UI idle loops until the showcase is on screen. This only ever
     gates *animation* — the content itself is always rendered — and a timer
     backs the observer up so the loops still start if it never fires. */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLive(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    const fallback = setTimeout(() => { setLive(true); obs.disconnect() }, 1500)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])

  /* Underline tweens to the active tab; panel content crossfades in.
     NOTE: this deliberately does NOT use gsap.context().revert(). `key={active}`
     remounts the panel and React reassigns `panelRef` during render, so a
     revert() on cleanup would stamp the *outgoing* tween's from-state
     (opacity: 0) onto the *incoming* node and leave the panel blank forever.
     Instead every tween is a fromTo() that lands on the visible resting state,
     and cleanup force-completes it so the panel can never be left hidden. */
  useLayoutEffect(() => {
    const el = tabRefs.current[active]
    if (!el) return
    const next = { left: el.offsetLeft, width: el.offsetWidth }
    const panel = panelRef.current

    if (prefersReduced()) { setInk(next); return }

    // the underline travels, squashing slightly as it goes
    if (inkRef.current) {
      gsap.timeline()
        .to(inkRef.current, { left: next.left, width: next.width, duration: 0.44, ease: 'power3.out' }, 0)
        .to(inkRef.current, { scaleY: 2.4, transformOrigin: 'bottom center', duration: 0.16, ease: 'power2.out' }, 0)
        .to(inkRef.current, { scaleY: 1, duration: 0.34, ease: 'power2.out' }, 0.16)
    }
    setInk(next)

    if (!panel) return
    const stage = panel.parentElement
    const q = (sel: string) => panel.querySelectorAll(sel)

    const tl = gsap.timeline()
    tl.fromTo(panel,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out', clearProps: 'opacity,transform' })
      // the service name rises word by word out of its mask
      .fromTo(q('.fx-stage__title .fx-word > span'),
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.055, duration: 0.6, ease: 'power3.out',
          clearProps: 'transform,opacity' },
        '-=0.3')
      // the description wipes open behind a moving edge
      .fromTo(q('.fx-stage__desc'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.65, ease: 'power2.inOut',
          clearProps: 'clipPath,opacity' },
        '-=0.4')
      .fromTo(q('.fx-stage__copy .iq-feat__link'),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
        '-=0.35')
      // the mini-UI frame scales up behind its contents
      .fromTo(q('.fx-stage__viz'),
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
          clearProps: 'opacity,transform' },
        '-=0.42')
      // …then every piece inside it lands in sequence, whichever tab it is
      .fromTo(q([
        '.fxv__hd', '.fxv__cap', '.fxv-metric', '.fxv-bubble', '.fxv-typing',
        '.fxv-api__row', '.fxv-scan__row', '.fxv-rows__row', '.fxv-chip',
        '.fxv-gauge', '.fxv-preview > *', '.fxv-phone', '.fxv-road__stop',
        '.fxv-stat',
      ].join(', ')),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.045, duration: 0.4, ease: 'power2.out',
          clearProps: 'opacity,transform' },
        '-=0.32')
      // bars grow from the baseline
      .fromTo(q('.fxv-queue span, .fxv-chart__col i'),
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'bottom center', stagger: 0.035,
          duration: 0.5, ease: 'power2.out', clearProps: 'transform' },
        '-=0.38')
      // the architecture boxes pop in
      .fromTo(q('.fxv-arch__box, .fxv-arch__vpc'),
        { opacity: 0, scale: 0.9, transformOrigin: 'center' },
        { opacity: 1, scale: 1, stagger: 0.06, duration: 0.45, ease: 'back.out(2)',
          clearProps: 'opacity,transform' },
        '-=0.45')

    // the mini-UI "boots": a scan line runs down it as the contents resolve
    const boot = panel.querySelector('.fx-stage__boot')
    if (boot) {
      gsap.fromTo(boot,
        { yPercent: -110, opacity: 1 },
        { yPercent: 620, duration: 0.95, ease: 'power2.inOut', delay: 0.12,
          onComplete: () => gsap.set(boot, { opacity: 0 }) })
    }

    // a light sweep crosses the stage on every switch
    if (stage) {
      const sweep = stage.querySelector('.fx-stage__sweep')
      if (sweep) {
        gsap.fromTo(sweep,
          { xPercent: -120, opacity: 0 },
          { xPercent: 320, opacity: 1, duration: 1.1, ease: 'power2.inOut',
            onComplete: () => gsap.set(sweep, { opacity: 0 }) })
      }
      // the frame flexes a hair as the new panel lands
      gsap.fromTo(stage,
        { scale: 0.994 },
        { scale: 1, duration: 0.55, ease: 'power2.out', clearProps: 'transform' })
    }

    // finish, don't rewind — the resting state is the visible one
    return () => { tl.progress(1); tl.kill() }
  }, [active])

  /* Depth: the mini-UI drifts against the copy as the section scrolls */
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.fx-stage__viz', { yPercent: -2.5 }, {
        yPercent: 2.5, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.fromTo('.fx-stage__grid', { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
      })
    }, rootRef)
    return () => ctx.kill()
  }, [])

  /* Section entrance: tabs deal in, the stage frame rises */
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.fx-tab',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, stagger: 0.045, duration: 0.5, ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      gsap.fromTo('.fx-stage',
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        })
    }, rootRef)
    return () => { ScrollTrigger.refresh(); ctx.kill() }
  }, [])

  useEffect(() => {
    const onResize = () => {
      const el = tabRefs.current[active]
      if (el) setInk({ left: el.offsetLeft, width: el.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  const go = (next: number) => {
    const i = (next + services.length) % services.length
    setActive(i)
    const el = tabRefs.current[i]
    el?.focus()
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); go(active + 1); break
      case 'ArrowLeft':  e.preventDefault(); go(active - 1); break
      case 'Home':       e.preventDefault(); go(0); break
      case 'End':        e.preventDefault(); go(services.length - 1); break
    }
  }

  const svc = services[active]

  return (
    <div className={`fx-showcase${live ? ' is-live' : ''}`} ref={rootRef}>

      <div className="fx-tabs" role="tablist" aria-label="Synerax services" onKeyDown={onKeyDown}>
        <div className="fx-tabs__track">
          {services.map((s, i) => (
            <button
              key={s.tab}
              id={`fx-tab-${i}`}
              ref={el => { tabRefs.current[i] = el }}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="fx-stage-panel"
              tabIndex={i === active ? 0 : -1}
              className={`fx-tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {s.tab}
            </button>
          ))}
          <span ref={inkRef} className="fx-tabs__ink" style={{ left: ink.left, width: ink.width }} aria-hidden="true" />
        </div>
      </div>

      <div
        className="fx-stage"
        id="fx-stage-panel"
        role="tabpanel"
        aria-labelledby={`fx-tab-${active}`}
        tabIndex={0}
      >
        <span className="fx-stage__grid" aria-hidden="true" />
        <span className="fx-stage__sweep" aria-hidden="true" />
        <div className="fx-stage__inner" key={active} ref={panelRef}>
          <div className="fx-stage__copy">
            <h3 className="fx-stage__title">
              {svc.title.split(' ').map((w, i) => (
                <span className="fx-word" key={i}><span>{w}</span></span>
              ))}
            </h3>
            <p className="fx-stage__desc">{svc.desc}</p>
            <Link to={svc.to} className="iq-feat__link">Learn more →</Link>
          </div>
          {/* Always rendered so the panel is never an empty box; the
              animations are held by CSS until `.is-live`. */}
          <div className="fx-stage__viz">
            <span className="fx-stage__boot" aria-hidden="true" />
            {svc.viz}
          </div>
        </div>
      </div>

    </div>
  )
}
