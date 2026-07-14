import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Product:     { bg: 'rgba(13,72,126,0.12)',  color: '#0D487E' },
  Engineering: { bg: 'rgba(79,169,232,0.15)', color: '#5a78c8' },
  Culture:     { bg: 'rgba(134,151,196,0.18)', color: '#6b7fb8' },
  Industry:    { bg: 'rgba(13,72,126,0.10)',   color: '#0D487E' },
  AI:          { bg: 'rgba(220,239,253,0.25)', color: '#0D487E' },
  DevOps:      { bg: 'rgba(13,72,126,0.12)',   color: '#0D487E' },
}

export const posts = [
  {
    id: 1,
    slug: 'future-of-contact-centers-ai',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    tag: 'AI',
    date: 'May 18, 2025',
    read: '8 min read',
    title: 'The Future of Contact Centers: AI-Powered Customer Excellence',
    desc: 'Explore how AI is revolutionising customer engagement, reducing handle times by 45%, and what it means for enterprise contact center strategy in the modern era.',
    featured: true,
    content: [
      { type: 'p', text: 'The contact center industry is undergoing its most significant transformation in decades. Artificial intelligence is no longer a futuristic concept — it is actively reshaping how businesses engage with customers, resolve issues, and measure satisfaction.' },
      { type: 'h2', text: 'The AI-First Contact Center' },
      { type: 'p', text: 'Modern AI systems can now handle 60–70% of inbound queries autonomously, without human intervention. From intelligent IVR trees that understand natural language to AI agents that resolve billing disputes in real time, the technology has matured to a point where deployment is not just viable — it is essential for competitive organisations.' },
      { type: 'p', text: 'Synerax has deployed AI-powered contact center solutions across financial services, healthcare, and e-commerce verticals. In every case, the outcome has been consistent: handle times drop by 35–50%, CSAT scores improve, and operational costs fall significantly.' },
      { type: 'h2', text: 'Key Technologies Driving Change' },
      { type: 'p', text: 'Large Language Models (LLMs) like GPT-4o and Claude 3 have become the backbone of intelligent agent systems. Combined with real-time speech recognition, sentiment analysis, and CRM integration, these models can personalise every interaction at scale.' },
      { type: 'p', text: 'Equally important is the orchestration layer — the system that routes queries, manages escalations, and ensures the AI knows when to hand off to a human agent. Getting this layer right is the difference between a frustrating bot and a seamless customer experience.' },
      { type: 'h2', text: 'What This Means for Enterprise Strategy' },
      { type: 'p', text: 'For enterprise leaders, the question is no longer whether to adopt AI in the contact center — it is how quickly and at what depth. Organisations that delay face compounding competitive disadvantage as their peers achieve cost efficiencies and experience improvements that are difficult to reverse-engineer.' },
      { type: 'p', text: 'The most successful implementations we have seen share three characteristics: a clear escalation framework, robust training data from real interactions, and a continuous improvement loop driven by post-call analytics.' },
    ],
  },
  {
    id: 2,
    slug: 'scaling-aws-50-million-interactions',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering',
    date: 'May 10, 2025',
    read: '12 min read',
    title: 'Scaling to 50 Million Interactions Monthly: Our AWS Architecture Story',
    desc: 'A deep dive into the infrastructure and engineering decisions behind 99.9% uptime at massive scale using AWS, Kubernetes, and Terraform.',
    featured: false,
    content: [
      { type: 'p', text: 'When one of our enterprise clients asked us to build a contact center platform capable of handling 50 million interactions per month, we knew we needed an architecture designed for failure — not one that assumed everything would go right.' },
      { type: 'h2', text: 'Starting With the Right Foundation' },
      { type: 'p', text: 'We chose AWS as our primary cloud provider for its breadth of managed services and global reach. The core stack: EKS for container orchestration, Aurora PostgreSQL for the primary database, ElastiCache Redis for session state, and SQS for decoupled message processing.' },
      { type: 'p', text: 'Everything was defined in Terraform from day one. Infrastructure as Code was non-negotiable — it gave us reproducible environments, meaningful code reviews for infrastructure changes, and the ability to spin up isolated staging environments on demand.' },
      { type: 'h2', text: 'The Kubernetes Layer' },
      { type: 'p', text: 'Our Kubernetes setup across three availability zones gave us the fault tolerance the SLA demanded. Each service was independently scalable — the transcription service, the routing engine, and the analytics pipeline could all scale horizontally without touching each other.' },
      { type: 'p', text: 'We implemented Horizontal Pod Autoscaling based on custom metrics from CloudWatch, which meant the cluster could respond to traffic spikes within 90 seconds. This was critical during peak periods when interaction volume could double within minutes.' },
      { type: 'h2', text: 'Achieving 99.9% Uptime' },
      { type: 'p', text: 'The 99.9% uptime SLA translates to less than 9 hours of downtime per year. To achieve this, we implemented circuit breakers on all service-to-service calls, blue/green deployments for zero-downtime releases, and multi-region failover for the most critical components.' },
      { type: 'p', text: 'Observability was built in from the start — distributed tracing with AWS X-Ray, structured logging in CloudWatch, and custom dashboards in Grafana that gave the on-call team everything they needed to diagnose and resolve issues in minutes, not hours.' },
    ],
  },
  {
    id: 3,
    slug: 'high-performance-team-across-time-zones',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tag: 'Culture',
    date: 'May 5, 2025',
    read: '6 min read',
    title: 'Building a High-Performance Development Team Across Time Zones',
    desc: 'Our proven strategies for hiring, onboarding, and retaining world-class engineers in a fully distributed engineering organisation.',
    featured: false,
    content: [
      { type: 'p', text: 'Building a distributed engineering team is one of the most rewarding and challenging things a technology company can do. After years of operating across multiple time zones, we have developed a set of principles that consistently produce high-performing, cohesive teams.' },
      { type: 'h2', text: 'Hire for Async-First Communication' },
      { type: 'p', text: 'The most important trait in a distributed engineer is not technical skill — it is the ability to communicate clearly and proactively in writing. We look for candidates who write detailed pull request descriptions, ask precise questions, and document their thinking without being asked.' },
      { type: 'p', text: 'In practice, this means our interview process includes a written technical exercise and a code review exercise. How a candidate communicates their reasoning tells us more about their fit for a distributed team than any whiteboard problem.' },
      { type: 'h2', text: 'Structure Your Overlap Windows' },
      { type: 'p', text: 'With engineers across India, Europe, and the Americas, we maintain a mandatory 3-hour overlap window during which all critical meetings and real-time collaboration happen. Outside this window, work is async-first by default.' },
      { type: 'p', text: 'This structure prevents the "always-on" burnout that plagues poorly-managed distributed teams, while ensuring that decisions do not get blocked for 24 hours waiting for someone to wake up.' },
      { type: 'h2', text: 'Invest in Documentation Culture' },
      { type: 'p', text: 'Every architectural decision gets an ADR. Every onboarding task has a step-by-step guide. Every system has a runbook. This investment pays dividends immediately when a new engineer joins and can get productive within days rather than weeks.' },
    ],
  },
  {
    id: 4,
    slug: 'omnichannel-customer-support-2025',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tag: 'Industry',
    date: 'Apr 28, 2025',
    read: '7 min read',
    title: 'The Rise of Omnichannel Customer Support in 2025',
    desc: 'Why businesses are moving beyond single-channel solutions and embracing true omnichannel — voice, chat, email, WhatsApp — in one unified workspace.',
    featured: false,
    content: [
      { type: 'p', text: 'Customer expectations have fundamentally shifted. Today\'s consumers expect to start a conversation on WhatsApp, continue it via email, and resolve it over a phone call — with the agent knowing the full history at every step. This is true omnichannel support, and in 2025, it is rapidly becoming table stakes.' },
      { type: 'h2', text: 'The Problem With Multi-Channel Silos' },
      { type: 'p', text: 'Most organisations have "multi-channel" support — but not "omnichannel" support. The difference is critical. Multi-channel means having different channels. Omnichannel means those channels share a unified context, history, and agent experience.' },
      { type: 'p', text: 'Siloed channels create friction. A customer who explained their problem via chat should not have to repeat it when they call. Yet this is the experience delivered by the vast majority of enterprise support systems today.' },
      { type: 'h2', text: 'What True Omnichannel Requires' },
      { type: 'p', text: 'A genuine omnichannel platform requires a unified customer data layer — a single record that captures every interaction regardless of channel. It requires real-time synchronisation so that context is always current. And it requires an agent interface that surfaces this history clearly without overwhelming the agent.' },
      { type: 'p', text: 'Our omnichannel platform handles voice, chat, email, SMS, and WhatsApp from a single agent workspace. Context carries across every channel switch, and AI summarises previous interactions so agents can get up to speed in seconds.' },
    ],
  },
  {
    id: 5,
    slug: 'security-first-data-protection',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80',
    tag: 'Product',
    date: 'Apr 20, 2025',
    read: '9 min read',
    title: 'Security First: How We Protect Your Data at Every Layer',
    desc: 'Understanding the security measures, zero-trust architecture, and compliance frameworks we implement to keep your customer data safe.',
    featured: false,
    content: [
      { type: 'p', text: 'Security is not a feature we add at the end of a project. It is an engineering discipline that shapes every decision from system design to deployment. At Synerax, we operate under a Security First mandate that defines how we build every product we ship.' },
      { type: 'h2', text: 'Zero-Trust Architecture' },
      { type: 'p', text: 'We design every system assuming that the network perimeter has already been breached. Every service authenticates every request. Every connection is encrypted in transit and at rest. No implicit trust is granted based on network location.' },
      { type: 'p', text: 'In practice, this means mutual TLS between services, short-lived JWT tokens with narrow scopes, and network policies that enforce least-privilege communication between Kubernetes pods.' },
      { type: 'h2', text: 'Compliance as Code' },
      { type: 'p', text: 'SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS compliance requirements are encoded as automated checks in our CI/CD pipeline. A deployment that would introduce a compliance violation cannot reach production — it is blocked at the pipeline level.' },
      { type: 'p', text: 'This approach means compliance is not a quarterly audit exercise. It is a continuous, automated process that keeps us compliant at every commit.' },
      { type: 'h2', text: 'Incident Response' },
      { type: 'p', text: 'We maintain a 24/7 security operations capability with defined runbooks for every class of incident. Our mean time to detect (MTTD) is under 4 minutes. Our mean time to respond (MTTR) is under 15 minutes for P1 incidents.' },
    ],
  },
  {
    id: 6,
    slug: 'next-gen-api-design',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering',
    date: 'Apr 12, 2025',
    read: '10 min read',
    title: 'Next-Gen API Design: Building for Scale, Speed, and the Future',
    desc: 'Best practices for designing REST and GraphQL APIs that scale to millions of requests and remain backward compatible.',
    featured: false,
    content: [
      { type: 'p', text: 'An API is a contract. Break it, and you break every client that depends on it. Design it poorly, and you accumulate technical debt that compounds with every new integration. Great API design is one of the highest-leverage engineering decisions a team makes.' },
      { type: 'h2', text: 'REST vs GraphQL: Choosing the Right Tool' },
      { type: 'p', text: 'REST and GraphQL are not competitors — they solve different problems. REST excels at resource-oriented APIs with predictable access patterns. GraphQL shines when clients have varied data requirements and fetching efficiency is critical.' },
      { type: 'p', text: 'For most enterprise APIs, we recommend a REST-first approach with GraphQL introduced at the aggregation layer for frontend clients. This gives you the simplicity and cacheability of REST with the flexibility of GraphQL where it matters.' },
      { type: 'h2', text: 'Versioning Strategy' },
      { type: 'p', text: 'Never break a published API. Use URL versioning (/v1/, /v2/) for major breaking changes, and additive changes within a version. Maintain at least two major versions simultaneously to give clients time to migrate.' },
      { type: 'p', text: 'Automated compatibility checks in your CI pipeline can catch breaking changes before they reach production. Tools like OpenAPI diff can compare schemas and flag any field removals or type changes.' },
      { type: 'h2', text: 'Performance at Scale' },
      { type: 'p', text: 'For APIs handling millions of daily requests, response time optimisation is not optional. Cache aggressively at the CDN layer for public endpoints. Use database connection pooling. Paginate all list endpoints. Profile every new endpoint under realistic load before it goes to production.' },
    ],
  },
  {
    id: 7,
    slug: 'agentic-ai-enterprise-workflows',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    tag: 'AI',
    date: 'Apr 5, 2025',
    read: '11 min read',
    title: 'Agentic AI in the Enterprise: Beyond Chatbots to Autonomous Workflows',
    desc: 'How LLM-powered agents are replacing entire business workflows — from document processing to customer triage — delivering measurable ROI.',
    featured: false,
    content: [
      { type: 'p', text: 'The first generation of enterprise AI was chatbots — single-turn question answering that could handle FAQs but broke down the moment a user asked something unexpected. The second generation is agentic AI: systems that plan, reason, use tools, and complete multi-step tasks autonomously.' },
      { type: 'h2', text: 'What Makes an AI Agent Different' },
      { type: 'p', text: 'An AI agent is not a chatbot with more training data. It is a system that can perceive its environment, decide what actions to take, execute those actions using tools (APIs, databases, browsers), and adapt based on the results. The key capability is tool use — the ability to interact with external systems to accomplish real-world tasks.' },
      { type: 'p', text: 'In a document processing context, this means an agent can receive a PDF invoice, extract key fields, validate them against purchase orders in your ERP, flag discrepancies, and route the document for human review — all without a human in the loop.' },
      { type: 'h2', text: 'Real-World Deployments' },
      { type: 'p', text: 'We have deployed agentic systems across insurance (claims processing), logistics (shipment exception handling), and financial services (KYC document review). In every case, the agent handles 60–80% of cases fully autonomously, with human escalation reserved for edge cases.' },
      { type: 'p', text: 'The ROI is substantial. A claims processing agent that handles 200 claims per day replaces several full-time employees while processing claims faster and more consistently. The payback period is typically 3–6 months.' },
      { type: 'h2', text: 'Building Agents That Are Safe and Reliable' },
      { type: 'p', text: 'The biggest challenge with agentic AI is not capability — it is reliability and safety. We build every agent with explicit guardrails: actions that require human confirmation, hard limits on what the agent can do autonomously, and comprehensive audit logging of every decision.' },
    ],
  },
  {
    id: 8,
    slug: 'cicd-transformation-8-minute-pipelines',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    tag: 'DevOps',
    date: 'Mar 28, 2025',
    read: '8 min read',
    title: 'From 2-Hour Deploys to 8-Minute Pipelines: Our CI/CD Transformation',
    desc: 'A practical walkthrough of how we rebuilt a legacy deployment process into a modern CI/CD pipeline with GitHub Actions and ArgoCD.',
    featured: false,
    content: [
      { type: 'p', text: 'Slow deployments are a tax on engineering velocity. Every hour spent waiting for a deployment is an hour of feedback delay — bugs caught later, features validated slower, and engineers context-switching while they wait. When we inherited a client\'s 2-hour deployment process, reducing it was the highest-priority engineering investment we could make.' },
      { type: 'h2', text: 'Understanding the Problem' },
      { type: 'p', text: 'The existing pipeline was a collection of Jenkins jobs accumulated over years. Tests ran sequentially. Docker images were built from scratch every time. Deployments required manual approval at three separate stages, each involving a different team.' },
      { type: 'p', text: 'Our first step was measurement. We instrumented every stage and mapped the critical path. The results were illuminating: 40 minutes of sequential test execution that could run in parallel, 35 minutes rebuilding Docker layers that had not changed, and 45 minutes waiting for human approvals that were almost always rubber-stamped.' },
      { type: 'h2', text: 'The New Architecture' },
      { type: 'p', text: 'We rebuilt the pipeline in GitHub Actions with parallel test execution across 8 runners. Docker layer caching cut image build time from 35 minutes to under 4. ArgoCD replaced the manual deployment steps with GitOps-driven continuous delivery.' },
      { type: 'p', text: 'The human approval stage was replaced with automated quality gates: coverage thresholds, performance benchmarks, and security scans. If all gates pass, the deployment proceeds automatically. Engineers are notified of success or failure via Slack.' },
      { type: 'h2', text: 'The Results' },
      { type: 'p', text: 'End-to-end pipeline time: 8 minutes. Deployment frequency increased from twice per week to multiple times per day. Change failure rate dropped as smaller, more frequent deployments reduced blast radius. The engineering team described it as one of the most impactful changes to their working day.' },
    ],
  },
  {
    id: 9,
    slug: 'digital-transformation-healthcare',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    tag: 'Industry',
    date: 'Mar 20, 2025',
    read: '7 min read',
    title: 'Digital Transformation in Healthcare: Lessons from the Frontline',
    desc: 'What we learned building HIPAA-compliant EHR systems and patient portals — the engineering decisions that separate great healthcare IT.',
    featured: false,
    content: [
      { type: 'p', text: 'Healthcare IT is uniquely demanding. The stakes — patient safety and data privacy — are higher than almost any other domain. The regulatory requirements are extensive. The legacy systems are deeply entrenched. And the end users — clinicians and patients — have neither the time nor the inclination for software that does not work perfectly.' },
      { type: 'h2', text: 'HIPAA Compliance Is an Engineering Problem' },
      { type: 'p', text: 'Most teams treat HIPAA compliance as a legal and policy exercise. The most successful implementations treat it as an engineering problem. Audit logging, access controls, encryption at rest and in transit, and breach notification workflows need to be built into the system architecture — not bolted on after the fact.' },
      { type: 'p', text: 'We use AWS HealthLake and purpose-built FHIR APIs to ensure data interoperability while maintaining the audit trail that HIPAA requires. Every data access is logged with user identity, timestamp, and the clinical justification where required.' },
      { type: 'h2', text: 'Designing for Clinician Workflows' },
      { type: 'p', text: 'The most technically correct EHR system fails if clinicians will not use it. We spend significant time in clinical observation — watching how nurses, doctors, and administrators actually work — before writing a single line of code.' },
      { type: 'p', text: 'The insights from this process consistently reshape the product. Clinicians need information in 2 clicks, not 5. Alerts must be actionable, not just informational. Mobile access is not a nice-to-have — it is essential for ward rounds and home visits.' },
      { type: 'h2', text: 'Integration Is the Hard Part' },
      { type: 'p', text: 'Every healthcare organisation runs a patchwork of legacy systems. The EHR must integrate with lab systems, imaging systems, pharmacy systems, and billing systems — often via HL7 v2 interfaces that were designed decades ago. Building reliable, bidirectional integration with these systems is where most healthcare IT projects struggle, and where deep domain experience makes the biggest difference.' },
    ],
  },
]

const ALL_TAGS = ['All', 'AI', 'Engineering', 'Product', 'Industry', 'Culture', 'DevOps']

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)
  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const rest = filtered.filter(p => p.id !== featured?.id)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="bl-hero">
        <div className="bl-hero__bg" />
        <div className="container bl-hero__inner">
          <div className="bl-hero__label">Insights &amp; Perspectives</div>
          <h1 className="bl-hero__h1">
            Latest <span className="bl-hero__accent">Insights</span>
          </h1>
          <p className="bl-hero__sub">
            Technical deep dives, AI trends, cloud architecture, and engineering
            culture — from the team building tomorrow's digital infrastructure.
          </p>
          <div className="bl-filters">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`bl-filter${activeTag === tag ? ' bl-filter--active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="bl-section">
        <div className="container">

          {filtered.length === 0 ? (
            <div className="bl-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <p>No posts in this category yet.</p>
            </div>
          ) : (
            <>
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="bl-featured">
                  <div className="bl-featured__img-wrap">
                    <img src={featured.image} alt={featured.title} className="bl-featured__img" loading="lazy" />
                    <div className="bl-featured__img-overlay" />
                  </div>
                  <div className="bl-featured__body">
                    <div className="bl-featured__meta">
                      <span className="bl-tag" style={TAG_COLORS[featured.tag] ? { background: TAG_COLORS[featured.tag].bg, color: TAG_COLORS[featured.tag].color } : {}}>
                        {featured.tag}
                      </span>
                      <span className="bl-meta-dot" />
                      <span className="bl-meta-text">{featured.date}</span>
                      <span className="bl-meta-dot" />
                      <span className="bl-meta-text">{featured.read}</span>
                    </div>
                    <h2 className="bl-featured__title">{featured.title}</h2>
                    <p className="bl-featured__desc">{featured.desc}</p>
                    <span className="bl-featured__cta">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <>
                  <div className="bl-grid-label">
                    {activeTag === 'All' ? 'More Articles' : `${activeTag} Articles`}
                    <span className="bl-grid-count">{rest.length}</span>
                  </div>
                  <div className="bl-grid">
                    {rest.map(post => {
                      const tc = TAG_COLORS[post.tag] ?? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }
                      return (
                        <Link to={`/blog/${post.slug}`} key={post.id} className="bl-card">
                          <div className="bl-card__img-wrap">
                            <img src={post.image} alt={post.title} className="bl-card__img" loading="lazy" />
                            <span className="bl-card__tag-badge" style={{ background: tc.bg, color: tc.color }}>
                              {post.tag}
                            </span>
                          </div>
                          <div className="bl-card__body">
                            <div className="bl-card__meta">
                              <span className="bl-meta-text">{post.date}</span>
                              <span className="bl-meta-dot" />
                              <span className="bl-meta-text">{post.read}</span>
                            </div>
                            <h3 className="bl-card__title">{post.title}</h3>
                            <p className="bl-card__desc">{post.desc}</p>
                            <span className="bl-card__link">
                              Read article
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bl-newsletter">
        <div className="container bl-newsletter__inner">
          <div className="bl-newsletter__left">
            <div className="bl-newsletter__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h2 className="bl-newsletter__h2">Stay in the loop</h2>
              <p className="bl-newsletter__sub">
                Weekly insights on AI, cloud, and enterprise tech — no spam, unsubscribe anytime.
              </p>
            </div>
          </div>
          <div className="bl-newsletter__right">
            {subscribed ? (
              <div className="bl-newsletter__thanks">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                You're subscribed! Welcome aboard.
              </div>
            ) : (
              <form className="bl-newsletter__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bl-newsletter__input"
                  required
                />
                <button type="submit" className="bl-newsletter__btn">Subscribe →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
