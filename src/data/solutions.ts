export interface Capability {
  title: string
  desc: string
  svgPath: string
}

export interface SolutionStat {
  value: string
  suffix: string
  label: string
  isText?: boolean
}

export interface Pillar {
  icon: string
  title: string
  desc: string
}

export interface Solution {
  slug: string
  name: string
  tag: string
  headline: string
  headlineBlue: string
  heroDesc: string
  overviewTitle: string
  overviewDesc: string
  pillars: Pillar[]
  stats: SolutionStat[]
  capabilities: Capability[]
  ctaTag: string
  ctaHeadline: string
  ctaDesc: string
}

/* Capability glyphs, reused across solutions so every card draws from the
   same icon system rather than one-off paths. */
const ICON = {
  window:  'M4 8h40v32H4zM4 18h40M12 13h2M18 13h2M24 13h2',
  chart:   'M4 40h40M12 40V24M20 40V16M28 40V28M36 40V20',
  graph:   'M4 10h40v28H4zM12 28l6-8 6 4 6-10 6 8',
  shield:  'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6z',
  shieldOk:'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10',
  cube:    'M24 10l14 8v16L24 42 10 34V18L24 10zM24 10v32M10 18l14 8 14-8',
  branch:  'M12 24a6 6 0 1012 0 6 6 0 00-12 0zM30 12a6 6 0 1012 0 6 6 0 00-12 0zM30 36a6 6 0 1012 0 6 6 0 00-12 0zM18 24h6M30 15l-6 9M30 33l-6-9',
  cloud:   'M6 24c0-9.94 8.06-18 18-18s18 8.06 18 18M24 6v4M9.86 9.86l2.83 2.83M6 24h4',
  clock:   'M24 8a16 16 0 100 32A16 16 0 0024 8zM24 16v8l6 4M10 10l4 4M38 10l-4 4',
  globe:   'M24 8a16 16 0 100 32A16 16 0 0024 8zM24 8c-4.5 6.5-6 13-6 16s1.5 9.5 6 16M24 8c4.5 6.5 6 13 6 16s-1.5 9.5-6 16M8 24h32',
  search:  'M20 8a12 12 0 100 24 12 12 0 000-24zM29 29l10 10M14 20h12M20 14v12',
  bot:     'M10 8h28v24H10zM18 16h12M18 22h8M16 32l-6 8h28l-6-8',
  gear:    'M24 4v4M24 40v4M44 24h-4M8 24H4M37 11l-3 3M14 34l-3 3M37 37l-3-3M14 14l-3-3M24 14a10 10 0 100 20 10 10 0 000-20z',
  server:  'M4 8h4v32H4zM10 8h2v32h-2zM16 8h4v32h-4zM24 8h2v32h-2zM30 8h4v32h-4zM38 8h2v32h-2zM42 8h2v32h-2z',
  swap:    'M20 8a8 8 0 100 16 8 8 0 000-16zM4 40c0-8.84 7.16-16 16-16h8M36 28l6 6-6 6M36 34h6',
  people:  'M16 8a8 8 0 100 16 8 8 0 000-16zM32 8a8 8 0 100 16 8 8 0 000-16zM4 40c0-6 5.37-10.67 12-10.67M44 40c0-6-5.37-10.67-12-10.67M24 40c0-6 3.58-10.67 8-10.67h-16C20.42 29.33 24 34 24 40z',
  blocks:  'M4 8h16v16H4zM28 8h16v16H28zM16 28h16v16H16z',
  doc:     'M12 2h24l8 10v32H4V12L12 2zM12 2v10H4',
  link:    'M6 10h14v10H6zM28 10h14v10H28zM17 28h14v10H17zM13 20v4a4 4 0 004 4M35 20v4a4 4 0 01-4 4',
}

export const solutions: Solution[] = [
  /* ── 1 ─────────────────────────────────────────────────────── */
  {
    slug: 'web-enterprise-applications',
    name: 'Web & Enterprise Applications',
    tag: 'Web & Enterprise Applications',
    headline: 'Custom Web Platforms and',
    headlineBlue: 'Enterprise Applications',
    heroDesc: 'Custom web platforms and enterprise-grade applications, engineered to scale. High-performance front ends, deep systems integration, and architecture that holds up as your business grows.',
    overviewTitle: 'Applications Built to Carry Real Business Load',
    overviewDesc: 'We build web platforms and internal applications that sit at the centre of how a business operates — order systems, customer portals, operations consoles, partner networks. Every build starts from the integration map and the load profile, not from a template.\n\nThe result is software that is fast under real traffic, secure by design, and straightforward for your own engineers to extend once we hand it over.',
    pillars: [
      { icon: '⚡', title: 'High-Performance Web Apps', desc: 'Sub-second interactions, server rendering, and Core Web Vitals in the green.' },
      { icon: '🔗', title: 'Enterprise Integrations', desc: 'ERP, CRM, billing and legacy systems joined through resilient APIs.' },
      { icon: '📐', title: 'Scalable Architecture', desc: 'Service boundaries and data models that survive growth.' },
      { icon: '🔒', title: 'Secure by Design', desc: 'Threat modelling, least-privilege access, and audited dependencies.' },
    ],
    stats: [
      { value: '95', suffix: '+', label: 'Lighthouse score average' },
      { value: '2', suffix: 's', label: 'Target load time' },
      { value: '40', suffix: '+', label: 'Systems integrated' },
      { value: '99', suffix: '.9%', label: 'Application uptime' },
    ],
    capabilities: [
      { title: 'High-Performance Web Apps', desc: 'React and Next.js applications with server rendering, streaming, and aggressive caching for sub-second interaction.', svgPath: ICON.window },
      { title: 'Enterprise Integrations', desc: 'Reliable connections into ERP, CRM, billing, and legacy systems with retries, idempotency, and full audit trails.', svgPath: ICON.link },
      { title: 'Scalable Architecture', desc: 'Domain-driven service boundaries and data models designed for the traffic you will have, not just today.', svgPath: ICON.cube },
      { title: 'Secure by Design', desc: 'Threat modelling, least-privilege access, dependency auditing, and secrets management from the first commit.', svgPath: ICON.shieldOk },
      { title: 'API & Data Layer', desc: 'REST and GraphQL surfaces over PostgreSQL, with schema versioning and predictable migrations.', svgPath: ICON.server },
      { title: 'Design Systems', desc: 'Typed, tested component libraries so every team ships a consistent interface without re-solving the basics.', svgPath: ICON.blocks },
    ],
    ctaTag: 'Web & Enterprise Experts',
    ctaHeadline: 'Ready to Build\nYour Next Platform?',
    ctaDesc: 'Get a detailed application proposal within 24 hours — no commitment required.',
  },

  /* ── 2 ─────────────────────────────────────────────────────── */
  {
    slug: 'devsecops-finops',
    name: 'DevSecOps & FinOps',
    tag: 'DevSecOps & FinOps',
    headline: 'Secure Automated Delivery and',
    headlineBlue: 'Cloud Cost Efficiency',
    heroDesc: 'Secure automated delivery and cloud cost efficiency, together. Pipelines that scan as they ship, infrastructure as code, and spend you can actually explain.',
    overviewTitle: 'Ship Faster, Ship Safer, Spend Less',
    overviewDesc: 'Delivery speed and cloud spend are the same problem viewed from two ends. We build pipelines that carry security scanning inline rather than as a gate at the end, and we instrument the cloud bill so every team can see what their services actually cost.\n\nInfrastructure is defined in code, releases are automated and reversible, and rightsizing runs continuously instead of once a quarter when finance asks.',
    pillars: [
      { icon: '🔁', title: 'CI/CD Pipelines', desc: 'Automated build, test, and release with safe rollbacks.' },
      { icon: '🛡️', title: 'In-Pipeline Security', desc: 'SAST, DAST, SCA and secrets scanning on every commit.' },
      { icon: '📜', title: 'Infrastructure as Code', desc: 'Terraform modules with drift detection and review gates.' },
      { icon: '💰', title: 'FinOps', desc: 'Cost visibility, budgets, rightsizing and spend optimisation.' },
    ],
    stats: [
      { value: '12', suffix: 'min', label: 'Average deploy time' },
      { value: '38', suffix: '%', label: 'Cloud spend reduced' },
      { value: '100', suffix: '%', label: 'Pipelines with scanning' },
      { value: '30', suffix: '+', label: 'Releases per week' },
    ],
    capabilities: [
      { title: 'CI/CD Pipelines', desc: 'GitHub Actions and GitLab CI pipelines with parallel stages, artefact promotion, and one-command rollback.', svgPath: ICON.branch },
      { title: 'Security Scanning In-Pipeline', desc: 'SAST, DAST, dependency and secrets scanning that blocks on real findings instead of drowning teams in noise.', svgPath: ICON.shield },
      { title: 'Infrastructure as Code', desc: 'Terraform modules with remote state, policy checks, plan review, and drift detection across environments.', svgPath: ICON.doc },
      { title: 'Automated Testing & Release', desc: 'Unit, integration, and end-to-end suites wired to progressive delivery — canary, blue/green, feature flags.', svgPath: ICON.gear },
      { title: 'Cloud Cost Visibility', desc: 'Per-team and per-service cost attribution through AWS Cost Explorer and Kubecost, with budgets and alerts.', svgPath: ICON.chart },
      { title: 'Rightsizing & Optimisation', desc: 'Continuous instance, storage, and commitment analysis that turns waste into a tracked, closable backlog.', svgPath: ICON.graph },
    ],
    ctaTag: 'DevSecOps & FinOps Experts',
    ctaHeadline: 'Ready to Ship Faster\nand Spend Less?',
    ctaDesc: 'Get a pipeline and cloud-spend assessment within 24 hours — no commitment required.',
  },

  /* ── 3 ─────────────────────────────────────────────────────── */
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity Solutions',
    tag: 'Cybersecurity Solutions',
    headline: 'Enterprise Security, Compliance and',
    headlineBlue: 'Threat Defense',
    heroDesc: 'Enterprise security, compliance, and threat defense. A 24/7 SOC, zero-trust architecture, and audit-ready controls that hold up under real scrutiny.',
    overviewTitle: 'Security That Survives an Audit and an Incident',
    overviewDesc: 'We treat security as an operating capability, not a document. That means a monitored perimeter, identity-first access control, tested response runbooks, and evidence collected continuously rather than assembled the week before an audit.\n\nCompliance work — SOC 2, ISO 27001, HIPAA — is mapped onto the controls you already run, so certification becomes a reporting exercise instead of a second system to maintain.',
    pillars: [
      { icon: '🛡️', title: '24/7 SOC', desc: 'Round-the-clock monitoring, triage, and escalation.' },
      { icon: '🔐', title: 'Zero-Trust Architecture', desc: 'Identity-first access with continuous verification.' },
      { icon: '🎯', title: 'Penetration Testing', desc: 'Adversarial testing against your real environment.' },
      { icon: '📋', title: 'Compliance', desc: 'SOC 2, ISO 27001 and HIPAA mapped to live controls.' },
    ],
    stats: [
      { value: '24', suffix: '/7', label: 'SOC monitoring' },
      { value: '15', suffix: 'min', label: 'Critical alert response' },
      { value: '3', suffix: '', label: 'Frameworks certified' },
      { value: '99', suffix: '.9%', label: 'Threat detection rate' },
    ],
    capabilities: [
      { title: '24/7 Security Operations', desc: 'Continuous monitoring with tuned detections, triage, and an escalation path that reaches a human every time.', svgPath: ICON.search },
      { title: 'Zero-Trust Architecture', desc: 'Identity-first access, network segmentation, and continuous verification instead of a trusted internal network.', svgPath: ICON.shieldOk },
      { title: 'Penetration Testing', desc: 'Application, infrastructure, and social engineering testing against your live environment, with retest included.', svgPath: ICON.globe },
      { title: 'Compliance & Certification', desc: 'SOC 2 Type II, ISO 27001, and HIPAA programmes mapped onto controls you already operate.', svgPath: ICON.doc },
      { title: 'Incident Response', desc: 'Tested runbooks, forensics, containment, and post-incident review that closes the loop back into engineering.', svgPath: ICON.shield },
      { title: 'Vulnerability Management', desc: 'Continuous scanning across code, images, and infrastructure with risk-ranked, owner-assigned remediation.', svgPath: ICON.gear },
    ],
    ctaTag: 'Cybersecurity Experts',
    ctaHeadline: 'Ready to Harden\nYour Environment?',
    ctaDesc: 'Get a security posture assessment within 24 hours — no commitment required.',
  },

  /* ── 4 ─────────────────────────────────────────────────────── */
  {
    slug: 'agentic-ai',
    name: 'Agentic AI Solutions',
    tag: 'Agentic AI Solutions',
    headline: 'Autonomous LLM Agents and',
    headlineBlue: 'AI Workflows',
    heroDesc: 'Autonomous LLM agents and AI workflows for your business. Custom pipelines, retrieval over your own data, and agents that complete work rather than just answer questions.',
    overviewTitle: 'Agents That Do the Work, Not Just Describe It',
    overviewDesc: 'We build AI systems around a specific job to be done — triaging a queue, drafting a document set, reconciling records, answering from your own corpus. Each one is scoped, evaluated against a held-out set, and shipped with guardrails and a human escalation path.\n\nRetrieval runs over your data with access control intact, and every agent action is logged so you can audit what was done and why.',
    pillars: [
      { icon: '🤖', title: 'Autonomous Agents', desc: 'Multi-step agents with tools, memory, and escalation.' },
      { icon: '🧠', title: 'Custom LLM Pipelines', desc: 'Task-specific chains, evaluated and versioned.' },
      { icon: '📚', title: 'RAG', desc: 'Retrieval over your corpus with permissions preserved.' },
      { icon: '📈', title: 'ML Systems', desc: 'Classification, extraction, and forecasting in production.' },
    ],
    stats: [
      { value: '70', suffix: '%', label: 'Workflow automation' },
      { value: '4', suffix: 'mo', label: 'Typical time to ROI' },
      { value: '60', suffix: '%', label: 'Queries auto-resolved' },
      { value: '24', suffix: '/7', label: 'Agent availability' },
    ],
    capabilities: [
      { title: 'Custom LLM Pipelines', desc: 'Task-specific chains with prompt versioning, evaluation sets, and regression tests before anything ships.', svgPath: ICON.bot },
      { title: 'Autonomous Agents', desc: 'Multi-step agents with tool access, memory, budget limits, and a defined hand-off to a human.', svgPath: ICON.gear },
      { title: 'Retrieval-Augmented Generation', desc: 'Vector search over your documents with chunking strategy, re-ranking, and row-level permissions preserved.', svgPath: ICON.search },
      { title: 'Natural Language Processing', desc: 'Classification, extraction, summarisation, and intent detection tuned on your domain language.', svgPath: ICON.doc },
      { title: 'ML Systems in Production', desc: 'Training, serving, monitoring, and retraining loops with drift detection and rollback.', svgPath: ICON.graph },
      { title: 'Guardrails & Observability', desc: 'Every action logged and replayable, with policy checks, cost ceilings, and evaluation dashboards.', svgPath: ICON.shieldOk },
    ],
    ctaTag: 'Agentic AI Experts',
    ctaHeadline: 'Ready to Put Agents\nto Work?',
    ctaDesc: 'Get an AI automation proposal within 24 hours — no commitment required.',
  },

  /* ── 5 ─────────────────────────────────────────────────────── */
  {
    slug: 'cloud-engineering-migration',
    name: 'Cloud Engineering & Migration',
    tag: 'Cloud Engineering & Migration',
    headline: 'Cloud Architecture, Migration and',
    headlineBlue: 'Optimization',
    heroDesc: 'Cloud architecture, migration, and optimization. AWS, Azure and GCP environments built as code, moved without drama, and tuned for both availability and cost.',
    overviewTitle: 'Move to the Cloud Without Betting the Business',
    overviewDesc: 'Migration work fails on cutover, not on design. We plan in waves, keep a working rollback at every step, and prove each workload in its new home before the old one is retired.\n\nWhat lands is a cloud environment defined entirely in Terraform, running on Kubernetes where that earns its keep, with availability targets and cost guardrails set before the first workload moves.',
    pillars: [
      { icon: '☁️', title: 'AWS · Azure · GCP', desc: 'Well-architected environments on any major cloud.' },
      { icon: '🚚', title: 'Cloud Migration', desc: 'Wave-based moves with rollback at every step.' },
      { icon: '📜', title: 'Infrastructure as Code', desc: 'Terraform-defined, reviewable, reproducible.' },
      { icon: '⚙️', title: 'Kubernetes', desc: 'Container platforms with autoscaling and self-healing.' },
    ],
    stats: [
      { value: '99', suffix: '.99%', label: 'Availability target' },
      { value: '38', suffix: '%', label: 'Infrastructure cost saved' },
      { value: '0', suffix: '', label: 'Downtime cutovers' },
      { value: '100', suffix: '%', label: 'Infrastructure as code' },
    ],
    capabilities: [
      { title: 'Cloud Architecture', desc: 'Well-architected designs across AWS, Azure, and GCP with clear network, identity, and data boundaries.', svgPath: ICON.cloud },
      { title: 'Migration & Cutover', desc: 'Wave-based migration with dependency mapping, dual-run validation, and a tested rollback at each step.', svgPath: ICON.swap },
      { title: 'Infrastructure as Code', desc: 'Terraform modules with remote state, policy-as-code, and environment parity from dev through production.', svgPath: ICON.doc },
      { title: 'Kubernetes Platforms', desc: 'Cluster design, autoscaling, self-healing workloads, and a paved path for teams to deploy onto.', svgPath: ICON.cube },
      { title: 'Cost Optimisation', desc: 'Rightsizing, commitment planning, and storage tiering measured against a baseline you agree up front.', svgPath: ICON.chart },
      { title: 'High Availability', desc: 'Multi-AZ and multi-region designs with tested failover and a documented recovery objective.', svgPath: ICON.globe },
    ],
    ctaTag: 'Cloud Engineering Experts',
    ctaHeadline: 'Ready to Move\nto the Cloud?',
    ctaDesc: 'Get a migration plan and cost model within 24 hours — no commitment required.',
  },

  /* ── 6 ─────────────────────────────────────────────────────── */
  {
    slug: 'observability-sre',
    name: 'Observability, SRE & Production Engineering',
    tag: 'Observability, SRE & Production Engineering',
    headline: 'Reliability Engineering and',
    headlineBlue: 'Full-Stack Observability',
    heroDesc: 'Reliability engineering and full-stack observability. Metrics, logs and traces joined up, service levels that mean something, and an on-call rotation that people can live with.',
    overviewTitle: 'Know What Production Is Doing, Before Customers Tell You',
    overviewDesc: 'Observability is not three tools bolted together. We instrument services so metrics, logs, and traces share the same identifiers, then build the handful of dashboards and alerts that actually correspond to customer pain.\n\nOn top of that sits the operating practice: service level objectives with error budgets, an incident process that produces learning rather than blame, and a sustainable on-call rotation.',
    pillars: [
      { icon: '📊', title: 'Metrics, Logs & Traces', desc: 'One correlated view across the whole request path.' },
      { icon: '🎯', title: 'SLOs & Error Budgets', desc: 'Targets tied to customer experience, not vanity uptime.' },
      { icon: '🚨', title: 'Incident Response', desc: 'Clear roles, runbooks, and blameless review.' },
      { icon: '⚡', title: 'Performance Engineering', desc: 'Latency budgets and load testing before peak, not after.' },
    ],
    stats: [
      { value: '22', suffix: 'min', label: 'Mean time to recovery' },
      { value: '99', suffix: '.95%', label: 'SLO attainment' },
      { value: '60', suffix: '%', label: 'Fewer paging alerts' },
      { value: '12', suffix: '+', label: 'KPIs monitored live' },
    ],
    capabilities: [
      { title: 'Full-Stack Observability', desc: 'Metrics, logs, and traces correlated by shared identifiers across every service in the request path.', svgPath: ICON.graph },
      { title: 'SLOs & Error Budgets', desc: 'Service levels defined from customer journeys, with error budgets that govern release pace.', svgPath: ICON.chart },
      { title: 'Incident Response', desc: 'Defined roles, runbooks, comms templates, and blameless review that feeds fixes back into the backlog.', svgPath: ICON.shield },
      { title: 'On-Call Engineering', desc: 'Rotation design, alert tuning, and escalation policies built so the pager only fires for real customer impact.', svgPath: ICON.clock },
      { title: 'Performance Engineering', desc: 'Latency budgets, profiling, and load testing against realistic traffic ahead of peak events.', svgPath: ICON.gear },
      { title: 'Instrumentation & Pipelines', desc: 'OpenTelemetry instrumentation with sampling strategy and retention that keeps the bill predictable.', svgPath: ICON.server },
    ],
    ctaTag: 'SRE & Observability Experts',
    ctaHeadline: 'Ready to Make\nProduction Predictable?',
    ctaDesc: 'Get a reliability assessment within 24 hours — no commitment required.',
  },

  /* ── 7 ─────────────────────────────────────────────────────── */
  {
    slug: 'application-modernization',
    name: 'Application Modernization',
    tag: 'Application Modernization',
    headline: 'Legacy Systems Re-Architected',
    headlineBlue: 'for the Cloud Era',
    heroDesc: 'Legacy systems re-architected for the cloud era. Monoliths decomposed, platforms replaced, and technical debt paid down without stopping delivery.',
    overviewTitle: 'Modernise Without a Big-Bang Rewrite',
    overviewDesc: 'Rewrites fail because they ask a business to wait. We modernise incrementally — carve a seam, stand up the replacement behind an API, move traffic, retire the old path. Each step ships and each step is reversible.\n\nThe end state is an API-first, containerised system your team can deploy independently, with the technical debt register visibly shorter than when we started.',
    pillars: [
      { icon: '🧩', title: 'Monolith → Microservices', desc: 'Seams identified and carved out incrementally.' },
      { icon: '🔄', title: 'Re-Platforming', desc: 'Moved onto modern runtimes without feature freeze.' },
      { icon: '🔌', title: 'API-First', desc: 'Contracts defined before implementation.' },
      { icon: '📦', title: 'Containerization', desc: 'Reproducible builds and deployments.' },
    ],
    stats: [
      { value: '8', suffix: 'wk', label: 'To first service extracted' },
      { value: '65', suffix: '%', label: 'Tech debt reduced' },
      { value: '0', suffix: '', label: 'Feature freeze required' },
      { value: '4', suffix: 'x', label: 'Faster release cadence' },
    ],
    capabilities: [
      { title: 'Monolith Decomposition', desc: 'Domain seams identified from real call graphs, then extracted service by service behind stable contracts.', svgPath: ICON.blocks },
      { title: 'Re-Platforming', desc: 'Legacy runtimes and databases moved onto supported, modern equivalents without a delivery freeze.', svgPath: ICON.swap },
      { title: 'API-First Design', desc: 'Contracts specified and mocked before implementation, so consumers can move in parallel with providers.', svgPath: ICON.link },
      { title: 'Containerization', desc: 'Reproducible images, dependency pinning, and a deployment path that behaves identically in every environment.', svgPath: ICON.cube },
      { title: 'Strangler Migration', desc: 'Traffic shifted route by route behind a facade, with the old path kept live until the new one is proven.', svgPath: ICON.branch },
      { title: 'Technical Debt Reduction', desc: 'Debt inventoried, risk-ranked, and burnt down on a schedule alongside feature work rather than instead of it.', svgPath: ICON.gear },
    ],
    ctaTag: 'Modernization Experts',
    ctaHeadline: 'Ready to Modernise\nWithout the Risk?',
    ctaDesc: 'Get a modernisation roadmap within 24 hours — no commitment required.',
  },

  /* ── 8 ─────────────────────────────────────────────────────── */
  {
    slug: 'itsm',
    name: 'IT Service Management (ITSM)',
    tag: 'IT Service Management (ITSM)',
    headline: 'Streamlined IT Operations and',
    headlineBlue: 'Service Delivery',
    heroDesc: 'Streamlined IT operations and service delivery. ITIL-aligned processes, a service desk people actually use, and SLA governance backed by real reporting.',
    overviewTitle: 'Service Management That Reduces Work, Not Adds It',
    overviewDesc: 'Most ITSM programmes fail by adding process faster than they remove friction. We start from the ticket data — where time is actually lost — and design the smallest process that fixes it, then automate the repetitive parts.\n\nWhat you get is an ITIL-aligned operation with clear incident, change, and problem paths, a service catalogue that reflects reality, and SLA reporting your stakeholders trust.',
    pillars: [
      { icon: '📋', title: 'ITIL-Aligned Processes', desc: 'Right-sized to your organisation, not the textbook.' },
      { icon: '🎫', title: 'Service Desk', desc: 'Single intake with routing, self-service, and knowledge.' },
      { icon: '🔧', title: 'Incident · Change · Problem', desc: 'Clear paths from raise to resolution to prevention.' },
      { icon: '📈', title: 'SLA Governance', desc: 'Targets, reporting, and review that hold up.' },
    ],
    stats: [
      { value: '45', suffix: '%', label: 'Faster resolution time' },
      { value: '70', suffix: '%', label: 'Tickets auto-routed' },
      { value: '98', suffix: '%', label: 'SLA attainment' },
      { value: '24', suffix: '/7', label: 'Service desk coverage' },
    ],
    capabilities: [
      { title: 'ITIL-Aligned Processes', desc: 'Incident, change, problem, and request management sized to your organisation rather than copied wholesale.', svgPath: ICON.doc },
      { title: 'Service Desk', desc: 'Single point of intake with skills-based routing, self-service portal, and a knowledge base that stays current.', svgPath: ICON.people },
      { title: 'Incident Management', desc: 'Priority matrices, escalation paths, and major-incident handling with communications built into the process.', svgPath: ICON.shield },
      { title: 'Change & Problem Management', desc: 'Change advisory workflow with risk scoring, plus root-cause analysis that removes repeat incidents.', svgPath: ICON.swap },
      { title: 'Automation', desc: 'Runbook automation for the repetitive majority — provisioning, resets, access requests, routine checks.', svgPath: ICON.gear },
      { title: 'SLA Governance & Reporting', desc: 'Service levels defined with the business, measured continuously, and reviewed on a fixed cadence.', svgPath: ICON.chart },
    ],
    ctaTag: 'ITSM Experts',
    ctaHeadline: 'Ready to Streamline\nIT Operations?',
    ctaDesc: 'Get an ITSM assessment within 24 hours — no commitment required.',
  },
]

export function getSolution(slug: string): Solution | undefined {
  return solutions.find(s => s.slug === slug)
}

/* Retired slugs, kept only so the router can redirect them. Nothing renders
   from this map — it exists so old links and indexed URLs never 404. */
export const retiredSolutionSlugs: Record<string, string> = {
  'contact-center': 'web-enterprise-applications',
  'frontend':       'web-enterprise-applications',
  'backend':        'web-enterprise-applications',
  'fullstack':      'web-enterprise-applications',
  'inventory':      'web-enterprise-applications',
  'consulting':     'itsm',
  'staffing':       'itsm',
  'aws':            'cloud-engineering-migration',
  'devops':         'devsecops-finops',
}
