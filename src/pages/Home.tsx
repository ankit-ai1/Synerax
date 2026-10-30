import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { useGsap, gsap, ScrollTrigger, revealFrom, prefersReduced } from '../lib/motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import HeroCommand from '../components/HeroCommand'
import EcosystemFlow from '../components/EcosystemFlow'
import ServiceStack from '../components/ServiceStack'
import AiHub from '../components/AiHub'
import InsightsBento from '../components/InsightsBento'
import Testimonials from '../components/Testimonials'
import IndustryExplorer from '../components/IndustryExplorer'
import CareersBanner from '../components/CareersBanner'
import { useLead } from '../context/LeadContext'

/* ─── Platforms (marquee) ────────────────────── */
const platforms = [
  { name:'React',      src:'https://cdn.simpleicons.org/react/61DAFB' },
  { name:'Node.js',    src:'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name:'AWS',        src:'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128' },
  { name:'OpenAI',     src:'https://www.google.com/s2/favicons?domain=openai.com&sz=128' },
  { name:'Kubernetes', src:'https://cdn.simpleicons.org/kubernetes/326CE5' },
  { name:'Python',     src:'https://cdn.simpleicons.org/python/3776AB' },
  { name:'TypeScript', src:'https://cdn.simpleicons.org/typescript/3178C6' },
  { name:'Docker',     src:'https://cdn.simpleicons.org/docker/2496ED' },
  { name:'FastAPI',    src:'https://cdn.simpleicons.org/fastapi/009688' },
  { name:'LangChain',  src:'https://cdn.simpleicons.org/langchain/1C3C3C' },
]

/* ─── Testimonials ───────────────────────────── */
const testimonials = [
  { quote:"Synerax built our entire contact center platform from scratch in under 3 months. 99.9% uptime since launch, and our CSAT scores improved by 42%. The team is exceptional.", name:'Priya Mehta', role:'VP Operations, FinTech Startup', initial:'P' },
  { quote:"We brought Synerax in to rescue a failing project. They delivered a complete rewrite in 8 weeks, on budget. Their technical depth and communication are second to none.", name:'James Okafor', role:'CTO, E-commerce Platform', initial:'J' },
  { quote:"The agentic AI solution Synerax built for us automated 70% of our document processing workflows. ROI achieved in under 4 months. Genuinely transformational.", name:'Sara Al-Rashid', role:'Head of Digital, Insurance Group', initial:'S' },
  { quote:"Our AWS bill dropped by 38% after Synerax's cost optimisation engagement. CI/CD pipelines cut deployment time from 2 hours to 12 minutes.", name:'Marcus Chen', role:'Engineering Director, SaaS Company', initial:'M' },
  { quote:"I've been a customer for more than a decade. Synerax is an example of the way managed services should be done. We will continue to be a customer for years to come.", name:'Daniel Legrante', role:'CIO, Restaurant Product Supplier', initial:'D' },
]

const whyCards = [
  {
    accent: '#00bbfe', iconBg: '#1a2b48', metric: '200+', tag: 'TEAM',
    title: 'Senior-Only Execution',
    desc: 'Every project is led by a senior engineer. No juniors-as-proxies — you work directly with the people building your product.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  },
  {
    accent: '#7C3AED', iconBg: '#1a2b48', metric: '6–8 Wks', tag: 'DELIVERY',
    title: 'Rapid MVP Delivery',
    desc: 'From zero to production-ready in 6–8 weeks. Tested, documented, and deployed — speed without cutting corners.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
  {
    accent: '#0891B2', iconBg: '#1a2b48', metric: 'SOC 2', tag: 'SECURITY',
    title: 'Built-In Security',
    desc: 'SOC 2, ISO 27001, HIPAA, and PCI-DSS compliance baked into every layer. Security is never an afterthought.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
  },
  {
    accent: '#D97706', iconBg: '#1a2b48', metric: '100%', tag: 'TRANSPARENCY',
    title: 'Full Transparency',
    desc: 'Weekly demos, real-time dashboards, and a dedicated PM. You\'re always in the loop — never left wondering.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>),
  },
]

export default function Home() {
  const { openLead } = useLead()

  // Keep ScrollTrigger in step with Lenis' smooth scrolling
  useLenis(() => ScrollTrigger.update())

  // `.iq-visible` still gates the CSS idle loops inside the mini-visuals
  useEffect(() => {
    const els = document.querySelectorAll('.iq-reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('iq-visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scope = useGsap(() => {
    const q = (s: string) => gsap.utils.toArray<HTMLElement>(s)

    /* ── HERO — orchestrated load timeline ── */
    const hero = gsap.timeline({ defaults: { duration: 0.85, ease: 'power3.out' } })
    hero
      .from('.hx-pill', { y: 14, opacity: 0, duration: 0.6 })
      .from('.iq-hero .fx-line > span', { yPercent: 110, opacity: 0, filter: 'blur(8px)', stagger: 0.14, clearProps: 'filter' }, '-=0.3')
      .from('.iq-hero__sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
      // animate the row as one unit — staggering the children makes the two
      // CTAs drift out of alignment while the entrance is still running
      .from('.iq-hero__btns', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hx-bar', { y: 30, opacity: 0, scale: 0.97, duration: 0.9, clearProps: 'transform' }, '-=0.35')
      .from('.hx-panel', { y: 36, opacity: 0, duration: 0.9, clearProps: 'transform' }, '-=0.55')
      .from('.hx-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.6')

    /* pointer spotlight across the hero background */
    const heroEl = document.querySelector<HTMLElement>('.iq-hero.hx')
    if (heroEl && !prefersReduced()) {
      heroEl.addEventListener('pointermove', (e) => {
        const r = heroEl.getBoundingClientRect()
        heroEl.style.setProperty('--hx-x', ((e as PointerEvent).clientX - r.left) + 'px')
        heroEl.style.setProperty('--hx-y', ((e as PointerEvent).clientY - r.top) + 'px')
      })
    }

    /* ── Generic section reveals ── */
    q('.fx-lede').forEach(el =>
      revealFrom(el.children, el, { y: 22, stagger: 0.09 }))

    /* ── ECOSYSTEM — board rises, wires draw in, pills deal out ── */
    const eco = document.querySelector<HTMLElement>('.eco-board')
    if (eco) {
      const wires = eco.querySelectorAll<SVGPathElement>('.eco-wire')
      wires.forEach(w => {
        const len = w.getTotalLength()
        gsap.set(w, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: eco, start: 'top 80%', once: true },
      })
        .from(eco, { y: 48, opacity: 0, scale: 0.98, duration: 0.9, clearProps: 'transform,opacity' })
        .from(eco.querySelector('.eco-node'), { x: -30, opacity: 0, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.4')
        .to(wires, {
          strokeDashoffset: 0, duration: 0.9, stagger: 0.06, ease: 'power2.inOut',
          // hand the dash pattern back to CSS so the active wires can flow
          onComplete: () => wires.forEach(w => gsap.set(w, { clearProps: 'strokeDasharray,strokeDashoffset' })),
        }, '-=0.3')
        .from(eco.querySelectorAll('.eco-cap'), { x: 24, opacity: 0, stagger: 0.06, duration: 0.5, clearProps: 'transform,opacity' }, '-=0.9')
        .from(eco.querySelector('.eco-side'), { x: 40, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' }, '-=0.8')
    }




    /* ── FINAL CTA ── */
    const cta = document.querySelector<HTMLElement>('.iq-cta__panel')
    if (cta) {
      gsap.from(cta.children, {
        y: 26, opacity: 0, scale: 0.97, transformOrigin: 'center',
        stagger: 0.09, duration: 0.8,
        scrollTrigger: { trigger: cta, start: 'top 82%', once: true },
      })
    }

    /* ── PLATFORM LOGOS — seamless marquee (one group + its trailing gap) ── */
    const track = document.querySelector<HTMLElement>('.fx-marquee__track')
    const group = document.querySelector<HTMLElement>('.fx-marquee__group')
    if (track && group) {
      const loop = gsap.to(track, {
        x: () => -group.offsetWidth,
        duration: 34,
        ease: 'none',
        repeat: -1,
        modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % group.offsetWidth) },
      })
      const strip = document.querySelector('.iq-techstrip')
      strip?.addEventListener('mouseenter', () => loop.pause())
      strip?.addEventListener('mouseleave', () => loop.resume())
    }
  }, [])

  return (
    <div ref={scope as React.RefObject<HTMLDivElement>}>
      <Nav />

      {/* ══ 1. HERO — centred statement, then a live "command bar" demo ══ */}
      <section className="iq-hero hx">
        <div className="hx-bg" aria-hidden="true">
          <span className="hx-bg__grid" />
          <span className="hx-bg__orb hx-bg__orb--a" />
          <span className="hx-bg__orb hx-bg__orb--b" />
          <span className="hx-bg__spot" />
        </div>

        <div className="iq-wrap hx__inner">
          <Link to="/solutions/agentic-ai" className="hx-pill">
            <span className="hx-pill__new">New</span>
            Agentic AI delivery pods, live in 6 weeks
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <h1 className="iq-hero__h1 hx__h1">
            <span className="fx-line"><span>From code to cloud.</span></span>
            <span className="fx-line"><span className="hx-accent">Engineered to last.</span></span>
          </h1>

          <p className="iq-hero__sub hx__sub">
            Say what you need shipped. We turn it into a plan, a team and a
            production system — cloud, AI and contact centers, built to scale.
          </p>

          <div className="iq-hero__btns hx__btns">
            <button onClick={() => openLead()} className="iq-btn-fill">
              Get a Free Consultation
            </button>
            <Link to="/solutions" className="iq-btn-ring">
              Explore Solutions
            </Link>
          </div>

          <HeroCommand />
        </div>
      </section>

      {/* ══ 1b. PLATFORM LOGOS — own band, so the hero is exactly one viewport ══ */}
      <div className="iq-techstrip iq-reveal iq-d3">
        <p className="iq-techstrip__lbl">Built on world-class platforms</p>
        <div className="fx-marquee">
          <div className="fx-marquee__track">
            {/* two identical groups; each carries a trailing gap so a
                -50% translate lands exactly on the seam */}
            {[0, 1].map(copy => (
              <div className="fx-marquee__group" key={copy} aria-hidden={copy === 1}>
                {platforms.map(t => (
                  <span key={t.name} className="fx-marquee__item" title={t.name}>
                    <img src={t.src} alt="" aria-hidden="true" loading="lazy" />
                    <span>{t.name}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ══ 3. ECOSYSTEM — one partner, every layer: stage node → capabilities ══ */}
      <section className="iq-section iq-section--tint eco">
        <div className="iq-wrap">
          <div className="fx-lede fx-lede--center eco__lede">
            <p className="iq-eye eco__eye">End-to-End Expertise</p>
            <h2 className="iq-h2 eco__h2">
              One partner.<br />
              <span className="eco__grad">Every layer, connected.</span>
            </h2>
            <p className="iq-body eco__sub">
              Strategy, build and run — one team, zero hand-offs.
            </p>
          </div>

          <EcosystemFlow />

          <div className="iq-hero__btns eco__cta">
            <button onClick={() => openLead()} className="iq-btn-fill">Start a Project</button>
            <Link to="/solutions" className="iq-btn-ring">View All Solutions</Link>
          </div>
        </div>
      </section>

      {/* ══ 4. EVERYTHING — sticky card stack, one service per card ══ */}
      <section className="iq-section iq-section--white-b svs-section">
        <div className="iq-wrap">
          <div className="fx-lede fx-lede--center svs-lede">
            <p className="iq-eye svs-lede__eye">Everything You Need</p>
            <h2 className="iq-h2 svs-lede__h2">
              Every layer of your stack,<br />
              <span className="svs-lede__grad">engineered to one standard.</span>
            </h2>
            <p className="iq-body svs-lede__sub">
              Cloud to code to customer — one senior team, accountable end to end.
            </p>
          </div>

          <ServiceStack />
        </div>
      </section>

      {/* ══ 5. AI SOLUTIONS — use-case cards wired into a central hub ══ */}
      <section className="iq-section iq-section--gradient aih-section">
        <div className="iq-wrap">
          <div className="fx-lede fx-lede--center aih-lede">
            <p className="iq-eye aih-lede__eye">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
              </svg>
              AI-Powered
            </p>
            <h2 className="iq-h2 aih-lede__h2">
              AI that solves<br />
              <span className="aih-lede__grad">real business problems.</span>
            </h2>
            <p className="iq-body aih-lede__sub">
              Production-ready intelligence built around your workflows, your data and the outcomes you measure.
            </p>
          </div>

          <AiHub />
        </div>
      </section>

      {/* ══ 7. KNOWLEDGE BASE — image-led editorial bento of real posts ══ */}
      <section className="iq-section iq-section--tint-b kb-section">
        <div className="iq-wrap">
          <div className="kb-hdr">
            <div className="fx-lede kb-hdr__lede">
              <p className="iq-eye kb-hdr__eye">Knowledge Base</p>
              <h2 className="iq-h2 kb-hdr__h2">
                Notes from<br />
                <span className="kb-hdr__grad">the engineering floor.</span>
              </h2>
            </div>
            <div className="kb-hdr__side">
              <p className="iq-body kb-hdr__sub">
                Field-tested playbooks on AI, cloud and delivery — written by the engineers who ship them.
              </p>
              <Link to="/blog" className="kb-hdr__all">
                Explore all articles
                <span className="kb-hdr__all-ico" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                </span>
              </Link>
            </div>
          </div>

          <InsightsBento />
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS — left eyebrow + dim card row ══ */}
      <section className="iq-section iq-section--radial">
        <div className="iq-wrap">
          <div className="fx-lede">
            <p className="iq-eye iq-reveal">Client Stories</p>
            <h2 className="iq-h2 iq-reveal iq-d1">
              What our clients <span className="iq-accent">say.</span>
            </h2>
          </div>

          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* ══ 8.25 INDUSTRIES — list drives a photo panel ══ */}
      <section className="iq-section fx-ind-section ixp-section">
        <div className="iq-wrap">
          <div className="fx-lede fx-lede--center ixp-lede">
            <p className="iq-eye ixp-lede__eye">Industries</p>
            <h2 className="iq-h2 ixp-lede__h2">
              Engineered for industries<br />
              <span className="ixp-lede__grad">where downtime isn't an option.</span>
            </h2>
            <p className="iq-body ixp-lede__sub">
              Six sectors, each with its own regulators, peak loads and stakes — and a team that already speaks the language.
            </p>
          </div>

          <IndustryExplorer />
        </div>
      </section>

      {/* ══ 8.5 CAREERS — navy hiring banner ══ */}
      <section className="iq-section cr-section">
        <div className="iq-wrap">
          <CareersBanner />
        </div>
      </section>

      {/* ══ 9. CTA — rounded floating panel ══ */}
      <section className="iq-cta">
        <div className="iq-wrap">
          <div className="iq-cta__panel fx-lede--center iq-reveal" style={{textAlign:'center'}}>
            <p className="iq-eye iq-eye--light">Ready to Build the Future</p>
            <h2 className="iq-cta__h2">
              Technology That<br />
              Moves Business <span className="iq-cta__em">Forward.</span>
            </h2>
            <p className="iq-cta__sub">
              Partner with Synerax to build secure cloud platforms, AI-powered applications,
              and enterprise software engineered for performance, scalability, and long-term growth.
            </p>
            <div className="iq-cta__btns">
              <button onClick={() => openLead()} className="iq-btn-fill iq-btn-fill--lg">
                Start a Project
              </button>
              <Link to="/solutions" className="iq-btn-ring iq-btn-ring--light">
                View All Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
