import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { useGsap, gsap, ScrollTrigger, revealFrom, prefersReduced } from '../lib/motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import HeroDashboard from '../components/HeroDashboard'
import PlatformChart from '../components/PlatformChart'
import ServiceShowcase from '../components/ServiceShowcase'
import Testimonials from '../components/Testimonials'
import { CountUpText } from '../components/CountUp'
import { industries } from '../data/industryMeta'
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

/* Code-built dark thumbnail — no stock photography */
function InsightThumb({ index, shape }: { index: number; shape: 'wave' | 'bars' | 'net' }) {
  return (
    <div className="fx-thumb">
      <span className="fx-thumb__idx">{String(index).padStart(2, '0')}</span>
      <svg viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
        {shape === 'wave' && (
          <>
            <path d="M0 132 C40 96 62 150 100 112 C138 74 160 128 200 92 C238 58 264 100 300 68"
                  fill="none" stroke="#F2622E" strokeWidth="2" />
            <path d="M0 132 C40 96 62 150 100 112 C138 74 160 128 200 92 C238 58 264 100 300 68 L300 180 L0 180 Z"
                  fill="rgba(242,98,46,.12)" />
          </>
        )}
        {shape === 'bars' && [30, 62, 44, 88, 70, 108, 84, 126].map((h, i) => (
          <rect key={i} x={18 + i * 35} y={160 - h} width="18" height={h} rx="2"
                fill={i % 2 ? 'rgba(242,98,46,.35)' : '#F2622E'} />
        ))}
        {shape === 'net' && (
          <>
            <path d="M40 130 L100 70 L160 110 L220 50 L268 88" fill="none" stroke="rgba(242,98,46,.5)" strokeWidth="1.5" />
            {[[40,130],[100,70],[160,110],[220,50],[268,88]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={i === 3 ? 7 : 5} fill="#F2622E" />
            ))}
          </>
        )}
      </svg>
    </div>
  )
}
/* ─── Solution cards ─────────────────────────── */
const homeSolCards = [
  {
    slug:'contact-center', title:'Contact Center Solutions',    tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781091750/ChatGPT_Image_Jun_10_2026_05_12_08_PM_vouyiu.png', desc:'Enterprise-grade omnichannel platform handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><path d="M8 14a4 4 0 014-4h6l3 8-4 2.5a22 22 0 009.5 9.5L29 26l8 3v6a4 4 0 01-4 4C17.2 39 9 30.8 9 20.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 14a2 2 0 110-4 2 2 0 010 4zM34 22a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" opacity=".4"/></svg>),
  },
  {
    slug:'frontend',       title:'Frontend Development',        tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781091899/ChatGPT_Image_Jun_10_2026_05_14_32_PM_wb2ubo.png', desc:'Blazing-fast, responsive web apps with React, Next.js, and TypeScript. Performance-first with Core Web Vitals optimisation.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.2"/><path d="M16 44h16M24 36v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M13 22l6 6-6 6M22 32h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    slug:'backend',        title:'Backend Development',         tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092016/ChatGPT_Image_Jun_10_2026_05_16_44_PM_vpm7nm.png', desc:'Scalable REST/GraphQL APIs and microservices. Node.js, Python, FastAPI — engineered for high-traffic production systems.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/><rect x="6" y="22" width="36" height="10" rx="3" stroke="currentColor" strokeWidth="2.2"/><circle cx="13" cy="13" r="2" fill="currentColor"/><circle cx="13" cy="27" r="2" fill="currentColor"/><path d="M20 36v6M28 36v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  },
  {
    slug:'agentic-ai',     title:'Agentic AI Solutions',        tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092144/ChatGPT_Image_Jun_10_2026_05_18_51_PM_vt62mr.png', desc:'Autonomous LLM agents, NLP pipelines, and agentic workflows. OpenAI, LangChain, HuggingFace — AI that works 24/7.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.2"/><circle cx="24" cy="24" r="4" fill="currentColor" opacity=".35"/><path d="M24 4v4M24 40v4M44 24h-4M8 24H4M37.07 10.93l-2.83 2.83M13.76 34.24l-2.83 2.83M37.07 37.07l-2.83-2.83M13.76 13.76l-2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  },
  {
    slug:'aws',            title:'AWS Infrastructure',          tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092334/ChatGPT_Image_Jun_10_2026_05_22_02_PM_msfgms.png', desc:'Enterprise AWS with 99.99% availability SLAs. Terraform IaC, Kubernetes, CI/CD pipelines, and cloud cost optimisation.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8z" stroke="currentColor" strokeWidth="2.2"/><path d="M24 8c-4.5 6.5-6 13-6 16s1.5 9.5 6 16M24 8c4.5 6.5 6 13 6 16s-1.5 9.5-6 16M8 24h32" stroke="currentColor" strokeWidth="2"/><path d="M10 17h28M10 31h28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/></svg>),
  },
  {
    slug:'cybersecurity',  title:'Cybersecurity',               tag:'AI & Cloud',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092580/ChatGPT_Image_Jun_10_2026_05_25_49_PM_vbnagv.png', desc:'24/7 SOC operations, zero-trust architecture, and penetration testing. SOC 2 & ISO 27001 certified infrastructure.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><path d="M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/><path d="M17 24l5 5 9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    slug:'inventory',      title:'Inventory Management',        tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092765/ChatGPT_Image_Jun_10_2026_05_27_29_PM_hgknao.png', desc:'Real-time stock tracking, AI demand forecasting, multi-warehouse support, and ERP integrations.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="16" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2.2"/><path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M18 28h12M18 34h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  },
  {
    slug:'fullstack',      title:'Full Stack & Mobile',         tag:'Development', img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781092853/ChatGPT_Image_Jun_10_2026_05_30_37_PM_gn5rei.png', desc:'Complete application development — web and mobile. Flutter, React Native, Swift, Kotlin. App Store-ready delivery in weeks.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><rect x="14" y="4" width="20" height="36" rx="4" stroke="currentColor" strokeWidth="2.2"/><rect x="18" y="8" width="12" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="24" cy="35" r="2" fill="currentColor"/><path d="M6 18l4 4-4 4M42 18l-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    slug:'consulting',     title:'IT Consulting & Outsourcing', tag:'Enterprise',  img:'https://res.cloudinary.com/dtg3lepr4/image/upload/v1781093112/ChatGPT_Image_Jun_10_2026_05_35_01_PM_vbjuf8.png', desc:'CTO-as-a-Service, digital transformation roadmaps, talent outsourcing, and strategic IT advisory.',
    svg: (<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.2"/><path d="M8 40c0-8.84 7.16-16 16-16s16 7.16 16 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M30 28l8 4M38 28l-8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  },
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
    accent: '#F2622E', iconBg: '#1C1C1F', metric: '200+', tag: 'TEAM',
    title: 'Senior-Only Execution',
    desc: 'Every project is led by a senior engineer. No juniors-as-proxies — you work directly with the people building your product.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  },
  {
    accent: '#7C3AED', iconBg: '#1C1C1F', metric: '6–8 Wks', tag: 'DELIVERY',
    title: 'Rapid MVP Delivery',
    desc: 'From zero to production-ready in 6–8 weeks. Tested, documented, and deployed — speed without cutting corners.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
  {
    accent: '#0891B2', iconBg: '#1C1C1F', metric: 'SOC 2', tag: 'SECURITY',
    title: 'Built-In Security',
    desc: 'SOC 2, ISO 27001, HIPAA, and PCI-DSS compliance baked into every layer. Security is never an afterthought.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
  },
  {
    accent: '#D97706', iconBg: '#1C1C1F', metric: '100%', tag: 'TRANSPARENCY',
    title: 'Full Transparency',
    desc: 'Weekly demos, real-time dashboards, and a dedicated PM. You\'re always in the loop — never left wondering.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>),
  },
]

const newsItems = [
  { seed:'news1', tag:'AI & Automation', read:'5 min read', title:'The Future of Contact Centers: AI Excellence', desc:'How generative AI is reshaping customer service architectures in the enterprise...', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', date:'Jul 8, 2026' },
  { seed:'news2', tag:'Infrastructure',  read:'7 min read', title:'Scaling to 50 Million Monthly Hits', desc:'A deep dive into the AWS architecture that powered our latest multi-national rollout.', img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', date:'Jun 24, 2026' },
  { seed:'news3', tag:'Engineering',     read:'4 min read', title:'High-Performance Distributed Teams', desc:'Strategies for maintaining velocity and quality in global engineering cultures.', img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', date:'Jun 15, 2026' },
]

const intelItems = [
  { icon:'🧠', t:'Predictive Forecasting',      d:'ML models that predict demand, churn, and revenue with high accuracy.' },
  { icon:'🔗', t:'Intelligent Recommendations', d:'Context-aware AI suggestions that drive better business decisions.' },
  { icon:'⚡', t:'Sales Learning Engine',       d:'Autonomous systems that learn and optimize your workflows continuously.' },
  { icon:'📊', t:'Visual Dispute Analytics',    d:'AI-powered dashboards that surface insights and anomalies in real-time.' },
  { icon:'🤖', t:'Agentic AI Workflows',        d:'Autonomous agents handling complex multi-step business processes.' },
  { icon:'📈', t:'Quota Management AI',         d:'Intelligent quota setting and territory management at enterprise scale.' },
  { icon:'🔍', t:'Process Intelligence',        d:'Deep analysis of business processes to identify optimization opportunities.' },
  { icon:'🌐', t:'Global Scale Architecture',   d:'Infrastructure designed for global deployment with local compliance.' },
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
    const has = (s: string) => document.querySelector(s)

    /* ── HERO — orchestrated load timeline ── */
    const hero = gsap.timeline({ defaults: { duration: 0.85 } })
    hero
      .from('.fx-line > span', { yPercent: 110, opacity: 0, stagger: 0.12 })
      .from('.iq-hero__sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
      // animate the row as one unit — staggering the children makes the two
      // CTAs drift out of alignment while the entrance is still running
      .from('.iq-hero__btns', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.fx-hero-visual', { xPercent: 8, opacity: 0, duration: 0.9 }, '-=0.75')
      .from('.fx-hero-visual .fx-bars__col i', {
        scaleY: 0, transformOrigin: 'bottom', stagger: 0.035, duration: 0.6,
      }, '-=0.35')
      .from('.fx-hero-visual .fx-kpi__spark span', {
        scaleY: 0, transformOrigin: 'bottom', stagger: 0.025, duration: 0.5,
      }, '-=0.45')

    /* ── Generic section reveals ── */
    q('.fx-lede').forEach(el =>
      revealFrom(el.children, el, { y: 22, stagger: 0.09 }))

    /* ── PROBLEM — stats, then pair-by-pair reveal (no pin) ──
       Everything below is gsap.from(): the markup's resting state IS the final
       state, so a failed trigger can never leave content stuck invisible. */
    const statrow = document.querySelector<HTMLElement>('.fx-statrow')
    if (statrow) {
      const stats = gsap.utils.toArray<HTMLElement>('.fx-stat', statrow)

      gsap.timeline({
        scrollTrigger: { trigger: statrow, start: 'top 84%', toggleActions: 'play none none none' },
      })
        .fromTo(stats,
          { y: 30, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.12,
            ease: 'power3.out', clearProps: 'opacity,transform,filter' })
        .fromTo(statrow.querySelectorAll('.fx-stat__idx'),
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, clearProps: 'opacity,transform' },
          '-=0.55')
        // the gauge ticks light up left → right under each number
        .fromTo(statrow.querySelectorAll('.fx-stat__meter i'),
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.3, ease: 'power2.out',
            stagger: { each: 0.018 }, clearProps: 'opacity,transform' },
          '-=0.45')

      // a highlight sweeps across the three stats, over and over
      const runStats = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 2.2 })
      stats.forEach((stat, i) => {
        runStats.to(stat, {
          onStart: () => stat.classList.add('is-lit'),
          onComplete: () => stat.classList.remove('is-lit'),
          duration: 0.75,
        }, i * 0.4)
      })

      stats.forEach(stat => {
        if (stat.dataset.fxSpot) return
        stat.dataset.fxSpot = '1'
        stat.addEventListener('pointermove', (e) => {
          const r = stat.getBoundingClientRect()
          stat.style.setProperty('--mx', ((e as PointerEvent).clientX - r.left) + 'px')
          stat.style.setProperty('--my', ((e as PointerEvent).clientY - r.top) + 'px')
        })
      })
    }

    /* ── COMPARISON CARDS ──
       Cards stay perfectly straight: the entrance uses y / scale / blur only.
       No x (a horizontal translate on a full-width grid item widens the
       document and clips the cards) and no rotation (it read as crooked).
       Everything lands on the resting state, so a failed trigger still leaves
       the finished cards on screen. */
    const cmp = document.querySelector<HTMLElement>('.fx-cmp')
    if (cmp) {
      const cards = gsap.utils.toArray<HTMLElement>('.fx-card', cmp)

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: cmp, start: 'top 80%', toggleActions: 'play none none none' },
      })

      cards.forEach((card, ci) => {
        const at = ci * 0.14

        tl.from(card, {
          y: 46, scale: 0.97, opacity: 0, filter: 'blur(8px)',
          duration: 0.8, transformOrigin: 'center bottom',
          // hand the transform back to CSS so the :hover lift keeps working
          clearProps: 'transform,filter',
        }, at)
          // the hairline across the top of the card draws in
          .from(card.querySelector('.fx-card__accent'), {
            scaleX: 0, transformOrigin: 'left center', duration: 0.7,
          }, at + 0.18)
          .from(card.querySelector('.fx-card__chip'), {
            scale: 0.4, opacity: 0, duration: 0.55, ease: 'back.out(2.8)',
          }, at + 0.24)
          .from(card.querySelector('.fx-card__title'), {
            y: 16, opacity: 0, filter: 'blur(5px)', duration: 0.55,
          }, at + 0.28)
          // rows rise one after another
          .from(card.querySelectorAll('.fx-card__item'), {
            y: 20, opacity: 0, filter: 'blur(4px)',
            duration: 0.55, stagger: 0.07,
          }, at + 0.34)
          // each line wipes open left → right
          .from(card.querySelectorAll('.fx-card__txt'), {
            clipPath: 'inset(0 100% 0 0)', duration: 0.6, stagger: 0.07, ease: 'power2.inOut',
          }, at + 0.38)
          .from(card.querySelectorAll('.fx-card__mark'), {
            scale: 0.4, duration: 0.5, stagger: 0.07, ease: 'back.out(2.8)',
          }, at + 0.4)
          // the ✗ / ✓ strokes draw themselves
          .fromTo(card.querySelectorAll('.fx-card__mark svg > *'),
            { strokeDasharray: 36, strokeDashoffset: 36 },
            { strokeDashoffset: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
              clearProps: 'strokeDasharray,strokeDashoffset' },
            at + 0.46)
          .from(card.querySelectorAll('.fx-card__idx'), {
            opacity: 0, x: -8, duration: 0.45, stagger: 0.07,
          }, at + 0.4)

        if (card.classList.contains('fx-card--good')) {
          tl.from(card.querySelector('.fx-card__badge'), {
            scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2.4)',
          }, at + 0.34)
            .from(card.querySelector('.fx-card__glow'), { opacity: 0, duration: 0.8 }, at + 0.2)
            // the border traces itself around the winning card
            .fromTo(card.querySelector('.fx-card__outline rect'),
              { strokeDasharray: '0 100', strokeDashoffset: 0 },
              { strokeDasharray: '100 100', duration: 1.5, ease: 'power2.inOut' },
              at + 0.3)
            // a single light sheen sweeps the winning card once it has landed
            .fromTo(card.querySelector('.fx-card__sheen'),
              { xPercent: -130, opacity: 0 },
              { xPercent: 130, opacity: 1, duration: 1.5, ease: 'power2.inOut' },
              at + 1)
            .to(card.querySelector('.fx-card__sheen'), { opacity: 0, duration: 0.3 }, '>-0.3')
        }

        /* ── cursor spotlight: light follows the pointer, card stays flat ── */
        if (!card.dataset.fxSpot) {
          card.dataset.fxSpot = '1'
          card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect()
            card.style.setProperty('--mx', ((e as PointerEvent).clientX - r.left) + 'px')
            card.style.setProperty('--my', ((e as PointerEvent).clientY - r.top) + 'px')
          })
        }
      })

      /* ── the Synerax list keeps running itself, row by row, on a loop ──
         Each pass also sends a beam across the gap from the matching problem
         row to its fix, and dims that problem row as it is 'solved'. */
      const good = cmp.querySelector<HTMLElement>('.fx-card--good')
      const bad = cmp.querySelector<HTMLElement>('.fx-card--bad')
      if (good) {
        const rows = gsap.utils.toArray<HTMLElement>('.fx-card__item', good)
        const badRows = bad ? gsap.utils.toArray<HTMLElement>('.fx-card__item', bad) : []
        const beam = cmp.querySelector<HTMLElement>('.fx-beam')

        const run = gsap.timeline({ repeat: -1, repeatDelay: 2.6, delay: 2.4 })

        rows.forEach((row, i) => {
          const at = i * 0.34

          run.to(row, {
            onStart: () => row.classList.add('is-active'),
            onComplete: () => row.classList.remove('is-active'),
            duration: 0.62,
          }, at)
            .fromTo(row.querySelector('.fx-card__mark'),
              { boxShadow: '0 0 0 0 rgba(242,98,46,.45)' },
              { boxShadow: '0 0 0 9px rgba(242,98,46,0)', duration: 0.85, ease: 'power2.out',
                clearProps: 'boxShadow' },
              at)

          // the matching problem row reacts as its fix lights up
          const src = badRows[i]
          if (src) {
            run.to(src, {
              onStart: () => src.classList.add('is-solved'),
              onComplete: () => src.classList.remove('is-solved'),
              duration: 0.62,
            }, at)
          }

          // …and a beam carries it across the gap
          if (beam && src) {
            run.add(() => {
              const c0 = cmp.getBoundingClientRect()
              const a = src.getBoundingClientRect()
              const b = row.getBoundingClientRect()
              gsap.killTweensOf(beam)
              gsap.set(beam, {
                x: a.right - c0.left - 4,
                y: a.top - c0.top + a.height / 2 - 2,
                opacity: 0,
              })
              gsap.timeline()
                .to(beam, { opacity: 1, duration: 0.14 }, 0)
                .to(beam, {
                  x: b.left - c0.left + 4,
                  y: b.top - c0.top + b.height / 2 - 2,
                  duration: 0.6, ease: 'power2.inOut',
                }, 0)
                .to(beam, { opacity: 0, duration: 0.2 }, 0.5)
            }, at)
          }
        })

        // glow breathes, and drifts a little as you scroll
        const glow = good.querySelector('.fx-card__glow')
        if (glow) {
          gsap.to(glow, {
            opacity: 0.95, scale: 1.07, duration: 3.6,
            repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.8,
          })
          gsap.to(glow, {
            yPercent: 14, ease: 'none',
            scrollTrigger: { trigger: cmp, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }

        // a soft scan line keeps travelling down the list
        const scan = good.querySelector('.fx-card__scan')
        if (scan) {
          gsap.fromTo(scan,
            { yPercent: -30, opacity: 0 },
            {
              yPercent: 520, opacity: 1, duration: 4.6, ease: 'none',
              repeat: -1, repeatDelay: 2.4, delay: 2.2,
            })
        }
      }
    }

    /* ── ONE TECHNOLOGY PARTNER — sticky copy, cards scroll past ──
       The left column is CSS position:sticky, so no pin and no scroll trap.
       All JS does here is fade each card up as it enters. */
    const stick = document.querySelector<HTMLElement>('.fx-stick')
    if (stick) {
      const steps = gsap.utils.toArray<HTMLElement>('.fx-stick__step', stick)

      steps.forEach((step) => {
        gsap.fromTo(step,
          { opacity: 0, y: 42 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 84%',
              once: true,
            },
          })
      })
    }


    /* ── INTELLIGENCE — dense grid ── */
    const micro = document.querySelector<HTMLElement>('.fx-micro')
    if (micro) {
      const tiles = gsap.utils.toArray<HTMLElement>('.fx-micro__item', micro)

      // tiles deal in, then their corner brackets snap on
      gsap.timeline({
        scrollTrigger: { trigger: micro, start: 'top 84%', toggleActions: 'play none none none' },
      })
        .fromTo(tiles,
          { y: 26, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.055,
            ease: 'power3.out', clearProps: 'opacity,transform,filter' })
        .fromTo(micro.querySelectorAll('.fx-micro__corners i'),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.012, ease: 'back.out(3)',
            clearProps: 'opacity,transform' },
          '-=0.45')
        .fromTo(micro.querySelectorAll('.fx-micro__idx'),
          { opacity: 0, x: -6 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.055, clearProps: 'opacity,transform' },
          '-=0.5')

      // a highlight keeps travelling through the grid, tile by tile
      const scanTiles = gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 2 })
      tiles.forEach((tile, i) => {
        scanTiles.to(tile, {
          onStart: () => tile.classList.add('is-lit'),
          onComplete: () => tile.classList.remove('is-lit'),
          duration: 0.5,
        }, i * 0.22)
      })

      // pointer spotlight on each tile
      tiles.forEach(tile => {
        if (tile.dataset.fxSpot) return
        tile.dataset.fxSpot = '1'
        tile.addEventListener('pointermove', (e) => {
          const r = tile.getBoundingClientRect()
          tile.style.setProperty('--mx', ((e as PointerEvent).clientX - r.left) + 'px')
          tile.style.setProperty('--my', ((e as PointerEvent).clientY - r.top) + 'px')
        })
      })
    }

    /* ── INSIGHTS ── */
    if (has('.iq-news-grid')) {
      const grid = document.querySelector<HTMLElement>('.iq-news-grid')!
      revealFrom(q('.iq-news'), grid, { y: 28, stagger: 0.1 })
      gsap.from(grid.querySelectorAll('.fx-thumb svg'), {
        opacity: 0, duration: 0.9, stagger: 0.12,
        scrollTrigger: { trigger: grid, start: 'top 78%', once: true },
      })
    }

    /* ── INDUSTRIES ── */
    if (has('.fx-ind-list')) {
      revealFrom(q('.fx-ind-row'), document.querySelector('.fx-ind-list')!, { y: 16, stagger: 0.07 })
    }

    /* ── CAREERS — copy from the left, image parallax ── */
    const careers = document.querySelector<HTMLElement>('.iq-careers-banner')
    if (careers) {
      gsap.from(careers.querySelectorAll('.iq-careers-banner__text > *'), {
        x: -34, opacity: 0, stagger: 0.1, duration: 0.75,
        scrollTrigger: { trigger: careers, start: 'top 80%', once: true },
      })
      const img = careers.querySelector('.fx-parallax img')
      if (img) {
        gsap.fromTo(img,
          { yPercent: -7, scale: 1.16 },
          {
            yPercent: 7, scale: 1.16, ease: 'none',
            scrollTrigger: { trigger: careers, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
      }
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

      {/* ══ 1. HERO — asymmetric split: copy left, dashboard right ══ */}
      <section className="iq-hero">
        <div className="iq-hero__glow" />
        <div className="iq-wrap iq-hero__inner">
          <div className="fx-hero-grid">

            {/* Left column — left-aligned copy, lines stagger in on load */}
            <div className="iq-hero__text fx-hero-copy">
              <h1 className="iq-hero__h1">
                <span className="fx-line"><span>From Code to Cloud.</span></span>
                <span className="fx-line"><span>We Deliver What <em className="iq-em">Others Promise.</em></span></span>
              </h1>
              <p className="iq-hero__sub fx-load fx-load--3">
                Enterprise contact centers, AI systems, cloud architecture, and full-stack
                applications — all engineered for scale, built to last, and delivered on time.
              </p>
              <div className="iq-hero__btns fx-load fx-load--4">
                <button onClick={() => openLead()} className="iq-btn-fill">
                  Get a Free Consultation
                </button>
                <Link to="/solutions" className="iq-btn-ring">
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* Right column — dashboard mockup, built in code */}
            <div className="fx-hero-visual">
              <HeroDashboard />
            </div>

          </div>
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


      {/* ══ 2. PROBLEM — stats + two side-by-side comparison cards ══ */}
      <section className="iq-section fx-problem">
        <div className="iq-wrap">

          <div className="fx-lede">
            <p className="iq-eye">The Problem</p>
            <h2 className="iq-h2">
              Most tech vendors overpromise<br />
              and <span className="iq-accent">underdeliver!!!</span>
            </h2>
            <p className="iq-body">
              You've dealt with junior developers, missed deadlines, and bloated invoices.
              Synerax is built differently — senior-only execution, radical transparency.
            </p>
          </div>

          {/* Three large count-up stats, evenly spread */}
          <div className="fx-statrow">
            {[
              { num:'5+',    lbl:'Projects Delivered', sub:'Across enterprise and mid-market clients globally' },
              { num:'99.8%', lbl:'Client Satisfaction', sub:'We don\'t just deliver projects — we build partnerships' },
              { num:'60%',   lbl:'Faster Delivery', sub:'vs traditional agencies through our senior-only model' },
            ].map((s,i)=>(
              <div key={s.lbl} className="fx-stat">
                <span className="fx-stat__spot" aria-hidden="true" />
                <span className="fx-stat__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="fx-stat__num"><CountUpText value={s.num} loop /></div>
                <span className="fx-stat__meter" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, k) => <i key={k} />)}
                </span>
                <div className="fx-stat__lbl">{s.lbl}</div>
                <div className="fx-stat__sub">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="fx-cmp">
            <span className="fx-beam" aria-hidden="true"><i /></span>

            {/* LEFT — the old way */}
            <article className="fx-card fx-card--bad">
              <span className="fx-card__spot" aria-hidden="true" />
              <span className="fx-card__accent" aria-hidden="true" />

              <header className="fx-card__hd">
                <span className="fx-card__chip fx-card__chip--bad">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </span>
                <h3 className="fx-card__title">Most dev shops</h3>
              </header>

              <ul className="fx-card__list">
                {[
                  'Code shipped by whoever\'s free, not who\'s best fit',
                  'Estimate balloons once the sprint starts',
                  'You chase updates instead of getting them',
                  'Your ticket gets passed between three teams',
                  'Same boilerplate stack regardless of what you need',
                ].map((t,i)=>(
                  <li className="fx-card__item" key={t}>
                    <span className="fx-card__rail" aria-hidden="true" />
                    <span className="fx-card__idx" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                    <span className="fx-card__mark fx-card__mark--bad">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </span>
                    <span className="fx-card__txt">{t}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* RIGHT — the Synerax way */}
            <article className="fx-card fx-card--good">
              <span className="fx-card__glow" aria-hidden="true" />
              <span className="fx-card__spot" aria-hidden="true" />
              <span className="fx-card__sheen" aria-hidden="true" />
              <span className="fx-card__scan" aria-hidden="true" />
              <span className="fx-card__accent" aria-hidden="true" />
              <svg className="fx-card__outline" aria-hidden="true" preserveAspectRatio="none">
                <rect x="1" y="1" rx="13" pathLength={100} vectorEffect="non-scaling-stroke" />
              </svg>

              <header className="fx-card__hd">
                <span className="fx-card__chip fx-card__chip--good">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <h3 className="fx-card__title">Synerax</h3>
                <span className="fx-card__badge">Recommended</span>
              </header>

              <ul className="fx-card__list">
                {[
                  'Same senior engineer from kickoff to launch',
                  'Fixed quote in writing, no surprise invoices',
                  'Weekly demo, not a status email you have to chase',
                  'One PM owns your project start to finish',
                  'Stack chosen for your product, not our comfort zone',
                ].map((t,i)=>(
                  <li className="fx-card__item" key={t}>
                    <span className="fx-card__rail" aria-hidden="true" />
                    <span className="fx-card__idx" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                    <span className="fx-card__mark fx-card__mark--good">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="fx-card__txt">{t}</span>
                  </li>
                ))}
              </ul>
            </article>

          </div>

        </div>
      </section>

      {/* ══ 3. ONE PLATFORM — sticky copy on the left, cards scroll past ══ */}
      <section className="iq-section iq-section--tint fx-stick">
        <div className="iq-wrap">
          <div className="fx-stick__inner">

            {/* ── left: stays put while the right column scrolls ── */}
            <aside className="fx-stick__left">
              <div className="fx-lede">
                <p className="iq-eye iq-reveal">End-to-End Expertise</p>
                <h2 className="iq-h2 iq-reveal iq-d1">
                  One Technology Partner,<br />
                  <span className="iq-accent">Every Digital Solution.</span>
                </h2>
                <p className="iq-body iq-reveal iq-d2">
                  From AI-powered applications and cloud infrastructure to enterprise software, DevOps, and digital transformation, Synerax delivers scalable, secure, and future-ready technology solutions under one trusted partner.
                </p>
              </div>

              <div className="fx-stick__cta iq-hero__btns">
                <button onClick={() => openLead()} className="iq-btn-fill">Start a Project →</button>
                <Link to="/solutions" className="iq-btn-ring">View All Solutions</Link>
              </div>
            </aside>

            {/* ── right: the four cards, stacked and scrolling ── */}
            <div className="fx-stick__right">

              <article className="fx-stick__step">
                <header className="fx-stick__cap">
                  <h3 className="fx-stick__title">Built on AWS</h3>
                  <p className="fx-stick__desc">99.99% availability, Terraform IaC, Kubernetes</p>
                </header>
                <div className="fx-stick__panel">
                  <div className="fx-pillar__viz">
                    <span className="fx-viz__lbl">Cloud Architecture</span>
                    <svg viewBox="0 0 250 146" aria-hidden="true" className="fx-arch">
                      {/* VPC boundary */}
                      <rect className="fx-arch__vpc" x="4" y="4" width="242" height="138" rx="8" />
                      <text className="fx-arch__vpclbl" x="14" y="20">VPC</text>

                      {/* ingress → fan-out to nodes */}
                      <rect className="fx-arch__box" x="91" y="30" width="68" height="26" rx="5" />
                      <text className="fx-arch__t" x="125" y="47" textAnchor="middle">Ingress</text>

                      <path className="fx-arch__line"
                            d="M125 56 L125 74 M41 74 L209 74 M41 74 L41 92 M125 74 L125 92 M209 74 L209 92" />
                      <path className="fx-arch__flow" d="M125 56 L125 74 L41 74 L41 92" />
                      <path className="fx-arch__flow fx-arch__flow--b" d="M125 56 L125 74 L209 74 L209 92" />
                      <path className="fx-arch__flow fx-arch__flow--c" d="M125 56 L125 92" />

                      {[11, 95, 179].map((x, i) => (
                        <g key={x}>
                          <rect className="fx-arch__box" x={x} y="92" width="60" height="26" rx="5" />
                          <text className="fx-arch__t" x={x + 30} y="109" textAnchor="middle">Node</text>
                          <circle className="fx-arch__pulse" cx={x + 30} cy="130" r="3"
                                  style={{ animationDelay: `${i * 0.45}s` }} />
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </article>

              <article className="fx-stick__step">
                <header className="fx-stick__cap">
                  <h3 className="fx-stick__title">Enterprise Security</h3>
                  <p className="fx-stick__desc">SOC 2, ISO 27001, HIPAA certified infrastructure</p>
                </header>
                <div className="fx-stick__panel">
                  <div className="fx-pillar__viz">
                    <span className="fx-viz__lbl">Security &amp; Compliance</span>
                    <span className="iq-mini-badge fx-pillar__badge">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Verified
                    </span>
                    <div className="iq-mini-feed">
                      {[
                        { t:'SOC 2 Type II', s:'Independently audited annually', time:'Certified' },
                        { t:'ISO 27001', s:'Information security management', time:'Certified' },
                        { t:'HIPAA', s:'Healthcare data compliance', time:'Compliant' },
                      ].map(f=>(
                        <div key={f.t} className="iq-mini-feed__item">
                          <span className="iq-mini-feed__check">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          <div className="iq-mini-feed__text">
                            <div className="iq-mini-feed__title">{f.t}</div>
                            <div className="iq-mini-feed__sub">{f.s}</div>
                          </div>
                          <span className="iq-mini-feed__time">{f.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className="fx-stick__step">
                <header className="fx-stick__cap">
                  <h3 className="fx-stick__title">AI-Powered</h3>
                  <p className="fx-stick__desc">Custom LLM pipelines, autonomous agents, ML systems</p>
                </header>
                <div className="fx-stick__panel">
                  <div className="fx-pillar__viz">
                    <span className="fx-viz__lbl">Agent Pipeline</span>
                    <div className="fx-pipe">
                      <span className="fx-pipe__rail"><i /></span>
                      {['Ingest','LLM pipeline','Agent','Action'].map((s,i)=>(
                        <span className="fx-pipe__step" key={s} style={{ animationDelay: `${0.15 + i * 0.14}s` }}>
                          <b style={{ animationDelay: `${i * 0.45}s` }} />{s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              <article className="fx-stick__step">
                <header className="fx-stick__cap">
                  <h3 className="fx-stick__title">Full Visibility</h3>
                  <p className="fx-stick__desc">Real-time dashboards, weekly demos, dedicated PM</p>
                </header>
                <div className="fx-stick__panel">
                  <div className="fx-wide-panel">
                    <div className="iq-hero__card-header">
                      <span className="iq-hero__card-title">Platform Overview</span>
                    </div>
                    <div className="fx-wide-panel__body fx-wide-panel__body--chart">
                      <PlatformChart />
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. EVERYTHING — centered tabbed service showcase ══ */}
      <section className="iq-section iq-section--white-b">
        <div className="iq-wrap">
          <div className="fx-lede fx-lede--center">
            <p className="iq-eye iq-reveal">Everything You Need</p>
            <h2 className="iq-h2 iq-reveal iq-d1">
              Everything your business needs,<br />
              <span className="iq-accent">in one place.</span>
            </h2>
            <p className="iq-body iq-reveal iq-d2">
              From log modeling to AI-assisted answers — we deliver the full capabilities.
            </p>
          </div>

          <div className="iq-reveal iq-d2">
            <ServiceShowcase />
          </div>
        </div>
      </section>

      {/* ══ 5. INTELLIGENCE — dense hairline micro-grid ══ */}
      <section className="iq-section iq-section--gradient">
        <div className="iq-wrap">
          <div className="fx-lede">
            <p className="iq-eye iq-reveal">AI-Powered</p>
            <h2 className="iq-h2 iq-reveal iq-d1" style={{marginBottom:'0.75rem'}}>
              Intelligence beyond <span className="iq-accent">development.</span>
            </h2>
            <p className="iq-body iq-reveal iq-d2" style={{maxWidth:'560px'}}>
              From custom LLM pipelines to autonomous agents — we bring cutting-edge
              AI capabilities to your business workflows.
            </p>
          </div>

          <div className="fx-micro">
            {intelItems.map((item, i) => (
              <div className="fx-micro__item" key={item.t}>
                <span className="fx-micro__spot" aria-hidden="true" />
                <span className="fx-micro__corners" aria-hidden="true"><i /><i /><i /><i /></span>
                <span className="fx-micro__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="fx-micro__lbl">{item.t}</span>
                <p className="fx-micro__desc">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. LATEST INSIGHTS ══ */}
      <section className="iq-section iq-section--tint-b">
        <div className="iq-wrap">
          <div className="iq-section-hdr iq-reveal">
            <div>
              <p className="iq-eye">Knowledge Base</p>
              <h2 className="iq-h2">Latest <span className="iq-accent">Insights.</span></h2>
            </div>
            <Link to="/blog" className="iq-btn-ring">Explore All →</Link>
          </div>
          <div className="iq-news-grid">
            {newsItems.map((item,i)=>(
              <Link to="/blog" key={item.seed} className={`iq-news iq-reveal iq-d${i+1}`}>
                <InsightThumb index={i+1} shape={(['wave','bars','net'] as const)[i]} />
                <div className="iq-news__body">
                  <span className="iq-news__tag">{item.tag} · {item.read}</span>
                  <h4 className="iq-news__title">{item.title}</h4>
                  <p className="iq-news__desc">{item.date}</p>
                  <span className="iq-news__link">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
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

      {/* ══ 8.25 INDUSTRIES — dark split: lede left, industry list right ══ */}
      <section className="iq-section fx-ind-section">
        <div className="iq-wrap">
          <div className="fx-ind-grid">

            <div className="fx-lede fx-ind-lede">
              <p className="iq-eye iq-reveal">Industries</p>
              <h2 className="iq-h2 iq-reveal iq-d1">
                Built for the industries<br />
                that move <span className="iq-accent">fastest.</span>
              </h2>
              <p className="iq-body iq-reveal iq-d2">
                Sectors we serve — each with its own compliance, scale, and uptime demands.
              </p>
            </div>

            <ul className="fx-ind-list">
              {industries.map((ind, i) => (
                <li className="fx-ind-row iq-reveal" key={ind.slug} style={{ transitionDelay: `${i * 0.07}s` }}>
                  <Link to={`/industries/${ind.slug}`} className="fx-ind-link">
                    <span className="fx-ind-marker" aria-hidden="true" />
                    <span className="fx-ind-row__name">{ind.name}</span>
                    <span className="fx-ind-row__note">{ind.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* ══ 8.5 CAREERS — split banner ══ */}
      <section className="iq-section">
        <div className="iq-wrap">
          <div className="iq-careers-banner iq-reveal">
            <div className="iq-careers-banner__text">
              <h2 className="iq-careers-banner__title">
                Careers at <span className="iq-accent">Synerax.</span>
              </h2>
              <p className="iq-careers-banner__desc">
                We invite you to supercharge your potential. Find what inspires
                and drives you. Find your spark.
              </p>
              <Link to="/careers" className="iq-btn-fill">
                Explore Careers →
              </Link>
            </div>
            <div className="iq-careers-banner__media fx-parallax">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80"
                alt="Careers at Synerax"
                loading="lazy"
              />
            </div>
          </div>
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
                Start a Project →
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
