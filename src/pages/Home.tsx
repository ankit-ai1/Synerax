import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useLead } from '../context/LeadContext'
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
    accent: '#1A56DB', iconBg: '#EBF2FF', metric: '200+', tag: 'TEAM',
    title: 'Senior-Only Execution',
    desc: 'Every project is led by a senior engineer. No juniors-as-proxies — you work directly with the people building your product.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>),
  },
  {
    accent: '#7C3AED', iconBg: '#F3EEFF', metric: '6–8 Wks', tag: 'DELIVERY',
    title: 'Rapid MVP Delivery',
    desc: 'From zero to production-ready in 6–8 weeks. Tested, documented, and deployed — speed without cutting corners.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
  },
  {
    accent: '#0891B2', iconBg: '#E0F7FA', metric: 'SOC 2', tag: 'SECURITY',
    title: 'Built-In Security',
    desc: 'SOC 2, ISO 27001, HIPAA, and PCI-DSS compliance baked into every layer. Security is never an afterthought.',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>),
  },
  {
    accent: '#D97706', iconBg: '#FFF8E1', metric: '100%', tag: 'TRANSPARENCY',
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
  const [testiIdx, setTestiIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Scroll reveal
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

  return (
    <>
      <Nav />

      {/* ══ 1. HERO — Centered text, wide mockup below ══ */}
      <section className="iq-hero">
        <div className="iq-hero__glow" />
        <div className="iq-wrap iq-hero__inner">

          {/* Centered text */}
          <div className="iq-hero__text">
            <h1 className="iq-hero__h1 iq-reveal iq-d1">
              From Code to Cloud.<br />
              We Deliver What <em className="iq-em">Others Promise.</em>
            </h1>
            <p className="iq-hero__sub iq-reveal iq-d2">
              Enterprise contact centers, AI systems, cloud architecture, and full-stack
              applications — all engineered for scale, built to last, and delivered on time.
            </p>
            <div className="iq-hero__btns iq-reveal iq-d3">
              <button onClick={() => openLead()} className="iq-btn-fill">
                Get a Free Consultation
              </button>
              <Link to="/solutions" className="iq-btn-ring">
                Explore Solutions
              </Link>
            </div>
            <div className="iq-hero__trust iq-reveal iq-d4">
              {['NDA Available','Reply in 24h','Free Scoping','Senior Engineers'].map(t=>(
                <span key={t} className="iq-trust">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tech strip */}
        <div className="iq-techstrip iq-reveal iq-d3">
          <div className="iq-wrap">
            <p className="iq-techstrip__lbl">Built on world-class platforms</p>
            <div className="iq-techstrip__pills">
              {['React','Node.js','AWS','OpenAI','Kubernetes','Python','TypeScript','Docker','FastAPI','LangChain'].map(t=>(
                <span key={t} className="iq-techstrip__pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. PROBLEM — big stats + comparison ══ */}
      <section className="iq-section iq-section--white-a">
        <div className="iq-wrap">
          <p className="iq-eye iq-reveal">The Problem</p>
          <h2 className="iq-h2 iq-reveal iq-d1" style={{maxWidth:'680px'}}>
            Most tech vendors overpromise<br />
            and <span className="iq-accent">underdeliver!!!</span>
          </h2>
          <p className="iq-body iq-reveal iq-d2" style={{maxWidth:'560px', marginBottom:'3rem'}}>
            You've dealt with junior developers, missed deadlines, and bloated invoices.
            Synerax is built differently — senior-only execution, radical transparency.
          </p>

          {/* Big stats row */}
          <div className="iq-bigstats iq-reveal iq-d3">
            {[
              { num:'5+',    lbl:'Projects Delivered', sub:'Across enterprise and mid-market clients globally' },
              { num:'99.8%', lbl:'Client Satisfaction', sub:'We don\'t just deliver projects — we build partnerships' },
              { num:'60%',   lbl:'Faster Delivery', sub:'vs traditional agencies through our senior-only model' },
            ].map(s=>(
              <div key={s.lbl} className="iq-bigstat">
                <div className="iq-bigstat__num">{s.num}</div>
                <div className="iq-bigstat__lbl">{s.lbl}</div>
                <div className="iq-bigstat__sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="iq-compare">
            <div className="iq-compare__vs"><span /></div>
            <div className="iq-compare__col iq-compare__col--bad iq-reveal iq-d3">
              <div className="iq-compare__head">
                <span className="iq-compare__head-icon iq-compare__head-icon--bad">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </span>
                Most dev shops
              </div>
              {['Code shipped by whoever\'s free, not who\'s best fit','Estimate balloons once the sprint starts','You chase updates instead of getting them','Your ticket gets passed between three teams','Same boilerplate stack regardless of what you need'].map((i,idx)=>(
                <div key={i} className={`iq-compare__row iq-reveal iq-d${Math.min(idx+1,4)}`}>
                  <span className="iq-compare__row-icon iq-compare__row-icon--bad">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </span>
                  {i}
                </div>
              ))}
            </div>
            <div className="iq-compare__col iq-compare__col--good iq-reveal iq-d3">
              <span className="iq-compare__ribbon">Recommended</span>
              <div className="iq-compare__head">
                <span className="iq-compare__head-icon iq-compare__head-icon--good">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                Synerax
              </div>
              {['Same senior engineer from kickoff to launch','Fixed quote in writing, no surprise invoices','Weekly demo, not a status email you have to chase','One PM owns your project start to finish','Stack chosen for your product, not our comfort zone'].map((i,idx)=>(
                <div key={i} className={`iq-compare__row iq-reveal iq-d${Math.min(idx+1,4)}`}>
                  <span className="iq-compare__row-icon iq-compare__row-icon--good">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. ONE PLATFORM — split, rounded container ══ */}
      <section className="iq-section iq-section--tint">
        <div className="iq-wrap">
        <div className="iq-boxed iq-split">
          <div className="iq-split__text">
            <p className="iq-eye iq-reveal">End-to-End Expertise</p>
            <h2 className="iq-h2 iq-reveal iq-d1">
              One Technology Partner,<br />
              <span className="iq-accent">Every Digital Solution.</span>
            </h2>
            <p className="iq-body iq-reveal iq-d2">
              From AI-powered applications and cloud infrastructure to enterprise software, DevOps, and digital transformation, Synerax delivers scalable, secure, and future-ready technology solutions under one trusted partner.
            </p>
            <div className="iq-platform-list iq-reveal iq-d3">
              {[
                { icon:'🏗️', t:'Built on AWS', d:'99.99% availability, Terraform IaC, Kubernetes' },
                { icon:'🔒', t:'Enterprise Security', d:'SOC 2, ISO 27001, HIPAA certified infrastructure' },
                { icon:'⚡', t:'AI-Powered', d:'Custom LLM pipelines, autonomous agents, ML systems' },
                { icon:'📊', t:'Full Visibility', d:'Real-time dashboards, weekly demos, dedicated PM' },
              ].map(item=>(
                <div key={item.t} className="iq-platform-item">
                  <span className="iq-platform-item__icon">{item.icon}</span>
                  <div>
                    <div className="iq-platform-item__title">{item.t}</div>
                    <div className="iq-platform-item__desc">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="iq-hero__btns iq-reveal iq-d4" style={{marginTop:'2rem', justifyContent:'flex-start'}}>
              <button onClick={() => openLead()} className="iq-btn-fill">Start a Project →</button>
              <Link to="/solutions" className="iq-btn-ring">View All Solutions</Link>
            </div>
          </div>
          <div className="iq-split__img iq-reveal iq-d2">
            <div className="iq-mini-stack">
              <div className="iq-mini-card">
                <div className="iq-hero__card-header">
                  <span className="iq-hero__card-title">Platform Overview</span>
                </div>
                <div className="iq-mini-card__body">
                  <div className="iq-mini-chart">
                    {[38,55,44,62,50,70,58,80].map((h,i)=>(
                      <span key={i} style={{height:`${h}%`}} />
                    ))}
                  </div>
                  <div className="iq-mini-donut-row">
                    <div className="iq-mini-donut" />
                    <div className="iq-mini-legend">
                      {[
                        {c:'#0D487E', t:'Cloud & DevOps'},
                        {c:'#4FA9E8', t:'AI & Automation'},
                        {c:'#DCEFFD', t:'Development'},
                      ].map(l=>(
                        <span key={l.t} className="iq-mini-legend__item">
                          <span className="iq-mini-legend__dot" style={{background:l.c}} />{l.t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="iq-mini-card iq-mini-card--sm">
                <div className="iq-hero__card-header">
                  <span className="iq-hero__card-title">Security &amp; Compliance</span>
                  <span className="iq-mini-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified
                  </span>
                </div>
                <div className="iq-mini-card__body iq-mini-card__body--sm">
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
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ══ 4. EVERYTHING — featured row + card grid ══ */}
      <section className="iq-section iq-section--white-b">
        <div className="iq-wrap">
          <p className="iq-eye iq-reveal">Everything You Need</p>
          <h2 className="iq-h2 iq-reveal iq-d1">
            Everything your business needs,<br />
            <span className="iq-accent">in one place.</span>
          </h2>
          <p className="iq-body iq-reveal iq-d2" style={{marginBottom:'3rem'}}>
            From log modeling to AI-assisted answers — we deliver the full capabilities.
          </p>

          {/* Featured row */}
          <div className="iq-feat-hero-row">
            <div className="iq-feat-hero iq-reveal iq-d2">
              <div className="iq-feat-hero__content">
                <div className="iq-feat-hero__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h3l1.5 4-2 1.25a10 10 0 004.25 4.25L14 10.5l4 1.5v3a2 2 0 01-2 2C8.16 17 3 11.84 3 5.5"/></svg>
                </div>
                <h4 className="iq-feat-hero__title">Contact Center Solutions</h4>
                <p className="iq-feat-hero__desc">
                  Enterprise omnichannel platform handling 10,000+ calls/hour with
                  AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.
                </p>
                <Link to="/solutions/contact-center" className="iq-feat__link">Learn more →</Link>
              </div>
              <div className="iq-feat-hero__visual">
                <span className="iq-feat-hero__visual-lbl">Live Metrics</span>
                <div className="iq-feat-hero__stat">
                  <span className="iq-feat-hero__stat-num">10K+</span>
                  <span className="iq-feat-hero__stat-lbl">Calls / hour</span>
                </div>
                <div className="iq-feat-hero__stat">
                  <span className="iq-feat-hero__stat-num">99.9%</span>
                  <span className="iq-feat-hero__stat-lbl">Uptime SLA</span>
                </div>
                <div className="iq-mini-chart iq-mini-chart--sm">
                  {[45,65,50,75,60].map((h,i)=>(<span key={i} style={{height:`${h}%`}} />))}
                </div>
              </div>
            </div>

            <div className="iq-feat-hero iq-reveal iq-d3">
              <div className="iq-feat-hero__content">
                <div className="iq-feat-hero__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor" opacity=".35"/><path d="M12 2v4M12 18v4M22 12h-4M6 12H2"/></svg>
                </div>
                <h4 className="iq-feat-hero__title">Agentic AI Solutions</h4>
                <p className="iq-feat-hero__desc">
                  Autonomous LLM agents, NLP pipelines, OpenAI, LangChain —
                  AI that works for your business 24/7.
                </p>
                <Link to="/solutions/agentic-ai" className="iq-feat__link">Learn more →</Link>
              </div>
              <div className="iq-feat-hero__chat">
                <span className="iq-feat-hero__chat-lbl">AI Assistant</span>
                <div className="iq-chat-bubble iq-chat-bubble--user">How's our uptime this month?</div>
                <div className="iq-chat-bubble iq-chat-bubble--ai">
                  <span className="iq-chat-bubble__spark">✦</span>
                  99.9% uptime, zero incidents. Response time down 18% vs last month.
                </div>
              </div>
            </div>
          </div>

          <div className="iq-feat-grid">
            {[
              { icon:'⚙️', t:'Backend Development',         d:'Scalable REST/GraphQL APIs and microservices. Node.js, Python, FastAPI for high-traffic systems.' },
              { icon:'🎨', t:'Frontend Development',        d:'React, Next.js, Vue applications with exceptional UX. Performance-first with Core Web Vitals.' },
              { icon:'☁️', t:'AWS Infrastructure',          d:'Enterprise AWS with 99.99% availability SLAs. Terraform IaC, Kubernetes, CI/CD pipelines.' },
              { icon:'🔐', t:'Cybersecurity',               d:'24/7 SOC operations, zero-trust architecture. SOC 2 & ISO 27001 certified infrastructure.' },
              { icon:'📦', t:'Inventory Management',        d:'Real-time stock tracking, AI demand forecasting, multi-warehouse support and ERP integrations.' },
              { icon:'📱', t:'Full Stack & Mobile',          d:'Flutter, React Native, Swift, Kotlin. Complete app development from UX to App Store delivery.' },
              { icon:'🏢', t:'IT Consulting & Outsourcing', d:'CTO-as-a-Service, digital transformation roadmaps, talent outsourcing and strategic advisory.' },
            ].map((f,i)=>(
              <div key={f.t} className={`iq-feat iq-reveal iq-d${(i%3)+1}`}>
                <div className="iq-feat__icon">{f.icon}</div>
                <h4 className="iq-feat__title">{f.t}</h4>
                <p className="iq-feat__desc">{f.d}</p>
                <Link to="/solutions" className="iq-feat__link">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. INTELLIGENCE — continuous marquee ══ */}
      <section className="iq-section iq-section--gradient">
        <div className="iq-wrap">
          <p className="iq-eye iq-reveal">AI-Powered</p>
          <h2 className="iq-h2 iq-reveal iq-d1" style={{marginBottom:'0.75rem'}}>
            Intelligence beyond <span className="iq-accent">development.</span>
          </h2>
          <p className="iq-body iq-reveal iq-d2" style={{maxWidth:'560px', marginBottom:'3rem'}}>
            From custom LLM pipelines to autonomous agents — we bring cutting-edge
            AI capabilities to your business workflows.
          </p>

          <div className="iq-intel-marquee iq-reveal iq-d3">
            <div className="iq-intel-track">
              {[...intelItems, ...intelItems].map((item, i) => (
                <div className="iq-intel-slide" key={i}>
                  <div className="iq-intel-slide__icon">
                    <span>{item.icon}</span>
                  </div>
                  <h3 className="iq-intel-slide__title">{item.t}</h3>
                  <p className="iq-intel-slide__desc">{item.d}</p>
                </div>
              ))}
            </div>
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
                <img src={`https://picsum.photos/seed/${item.seed}/600/340`} alt={item.tag} className="iq-news__img" />
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

      {/* ══ 8. TESTIMONIAL ══ */}
      <section className="iq-section iq-section--radial" style={{textAlign:'center'}}>
        <div className="iq-wrap">
          <p className="iq-eye iq-reveal" style={{textAlign:'center'}}>Client Stories</p>
          <h2 className="iq-h2 iq-reveal iq-d1" style={{textAlign:'center', marginBottom:'2.5rem'}}>
            What our clients <span className="iq-accent">say.</span>
          </h2>
          <div className="iq-testi-row iq-reveal iq-d2">
            <div className="iq-testi-track">
              {[0, 1].map(off => {
                const t = testimonials[(testiIdx + off) % testimonials.length]
                return (
                  <div className="iq-testi" key={off}>
                    <p className="iq-testi__quote">"{t.quote}"</p>
                    <div className="iq-testi__author">
                      <div className="iq-testi__av">{t.name[0]}</div>
                      <div style={{textAlign:'left'}}>
                        <div className="iq-testi__name">{t.name}</div>
                        <div className="iq-testi__role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="iq-testi-nav">
            <button
              className="iq-testi-nav__arrow"
              onClick={() => setTestiIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="iq-testi-segments">
              {testimonials.map((_,i)=>(
                <button
                  key={i}
                  className={`iq-testi-segment${testiIdx===i?' active':''}`}
                  onClick={()=>setTestiIdx(i)}
                  aria-label={`Go to testimonial ${i+1}`}
                />
              ))}
            </div>
            <button
              className="iq-testi-nav__arrow"
              onClick={() => setTestiIdx(i => (i + 1) % testimonials.length)}
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
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
            <div className="iq-careers-banner__media">
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
          <div className="iq-cta__panel iq-reveal" style={{textAlign:'center'}}>
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
    </>
  )
}
