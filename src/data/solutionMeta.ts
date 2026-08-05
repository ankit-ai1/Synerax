export interface UseCase {
  icon: string
  title: string
  desc: string
}

export interface SolutionMeta {
  enterpriseTitle: string
  enterpriseDesc: string
  useCases: UseCase[]
  accentColor: string
  technologies: string[]
}

export const solutionMeta: Record<string, SolutionMeta> = {
  /* ── 1 ─────────────────────────────────────────────────────── */
  'web-enterprise-applications': {
    enterpriseTitle: 'Enterprise-grade web platforms for the modern stack',
    enterpriseDesc: 'Our engineers build high-performance, accessible applications that load in milliseconds and stay maintainable years later. Every component is typed, tested, and documented, and every integration is built to survive the upstream system having a bad day.\n\nFrom operations consoles and customer portals to partner networks and internal tooling, we deliver Lighthouse scores above 95, full WCAG 2.1 AA compliance, and comprehensive coverage across unit, integration, and end-to-end tests.',
    useCases: [
      { icon: '📊', title: 'Enterprise Dashboards', desc: 'Complex data visualisation, real-time analytics, and multi-role admin consoles built on React and TypeScript.' },
      { icon: '🛒', title: 'Customer Portals', desc: 'Self-service portals with SSO, entitlement handling, and sub-2s load times on every device.' },
      { icon: '🔗', title: 'Integration Platforms', desc: 'Middleware joining ERP, CRM, and billing with idempotent processing and complete audit trails.' },
      { icon: '📱', title: 'Progressive Web Apps', desc: 'Offline-capable, installable applications with background sync and native-like performance.' },
    ],
    accentColor: '#F2622E',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Redis', 'Tailwind CSS', 'Vite', 'Jest', 'Playwright'],
  },

  /* ── 2 ─────────────────────────────────────────────────────── */
  'devsecops-finops': {
    enterpriseTitle: 'Delivery and spend, engineered as one system',
    enterpriseDesc: 'We build pipelines where security runs inline rather than as a gate at the end — SAST, dependency, and secrets scanning on every commit, tuned so they block on real findings instead of burying teams in noise. Infrastructure is Terraform-defined with policy checks and drift detection.\n\nOn the FinOps side we instrument the bill: per-team and per-service attribution, budgets with alerts, and continuous rightsizing that turns cloud waste into a tracked backlog somebody owns.',
    useCases: [
      { icon: '🔁', title: 'Pipeline Modernisation', desc: 'Legacy build scripts replaced with parallel, cached pipelines and artefact promotion between environments.' },
      { icon: '🛡️', title: 'Shift-Left Security', desc: 'Scanning moved into the pull request, with risk-ranked findings routed to the team that owns the code.' },
      { icon: '💰', title: 'Cloud Spend Reduction', desc: 'Rightsizing, commitment planning, and idle-resource cleanup measured against an agreed baseline.' },
      { icon: '📜', title: 'Infrastructure as Code', desc: 'Hand-built environments captured in Terraform, with drift detection and reviewable plans.' },
    ],
    accentColor: '#F2622E',
    technologies: ['GitHub Actions', 'GitLab CI', 'Terraform', 'Docker', 'Kubernetes', 'AWS Cost Explorer', 'Kubecost', 'ArgoCD', 'Trivy', 'SonarQube', 'Vault', 'OPA'],
  },

  /* ── 3 ─────────────────────────────────────────────────────── */
  'cybersecurity': {
    enterpriseTitle: 'Security posture that holds up under scrutiny',
    enterpriseDesc: 'A monitored perimeter, identity-first access, tested response runbooks, and evidence collected continuously — not assembled the week before an audit. Our SOC runs around the clock with tuned detections and an escalation path that always reaches a human.\n\nCompliance programmes for SOC 2 Type II, ISO 27001, and HIPAA are mapped onto the controls you already operate, so certification becomes a reporting exercise rather than a parallel system to maintain.',
    useCases: [
      { icon: '🏥', title: 'Regulated Industries', desc: 'HIPAA and PCI environments with data residency, encryption, and access review built into the operating model.' },
      { icon: '🔐', title: 'Zero-Trust Rollout', desc: 'Flat internal networks replaced with identity-first segmentation and continuous verification.' },
      { icon: '🎯', title: 'Penetration Testing', desc: 'Application, infrastructure, and social engineering assessments against your live environment, retest included.' },
      { icon: '🚨', title: 'Incident Readiness', desc: 'Runbooks, tabletop exercises, and forensics capability in place before you need them.' },
    ],
    accentColor: '#F2622E',
    technologies: ['CrowdStrike', 'Wazuh', 'Splunk', 'Okta', 'HashiCorp Vault', 'Burp Suite', 'Nessus', 'Snyk', 'AWS GuardDuty', 'Cloudflare', 'Sentinel', 'OpenVAS'],
  },

  /* ── 4 ─────────────────────────────────────────────────────── */
  'agentic-ai': {
    enterpriseTitle: 'AI systems scoped to a job, not a demo',
    enterpriseDesc: 'Every agent we build is aimed at a specific piece of work — triaging a queue, drafting a document set, reconciling records, answering from your own corpus. Each is evaluated against a held-out set before it ships and comes with guardrails, cost ceilings, and a defined hand-off to a human.\n\nRetrieval runs over your data with row-level permissions intact, and every action an agent takes is logged and replayable, so you can audit exactly what was done and why.',
    useCases: [
      { icon: '📄', title: 'Document Processing', desc: 'Extraction, classification, and routing across contracts, claims, and invoices with human review on low confidence.' },
      { icon: '🎧', title: 'Support Deflection', desc: 'Retrieval-grounded answers over your knowledge base, resolving 60%+ of routine queries with citations.' },
      { icon: '🔍', title: 'Internal Knowledge Search', desc: 'Semantic search across wikis, tickets, and repositories with each user\'s existing permissions preserved.' },
      { icon: '⚙️', title: 'Workflow Automation', desc: 'Multi-step agents that operate real tools — ticketing, CRM, internal APIs — under budget and policy limits.' },
    ],
    accentColor: '#F2622E',
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'LlamaIndex', 'Pinecone', 'pgvector', 'Weaviate', 'Python', 'FastAPI', 'Ray', 'MLflow', 'Hugging Face'],
  },

  /* ── 5 ─────────────────────────────────────────────────────── */
  'cloud-engineering-migration': {
    enterpriseTitle: 'Cloud environments built as code, moved without drama',
    enterpriseDesc: 'Migration fails at cutover, not at design. We plan in waves, map dependencies from real traffic, and keep a tested rollback at every step — each workload is proven in its new home before the old one is retired.\n\nWhat lands is an environment defined entirely in Terraform, running on Kubernetes where that earns its keep, with multi-AZ availability targets and cost guardrails agreed before the first workload moves.',
    useCases: [
      { icon: '🚚', title: 'Data Centre Exit', desc: 'On-premise estates moved to AWS, Azure, or GCP in waves, with dual-run validation and zero-downtime cutovers.' },
      { icon: '⚙️', title: 'Kubernetes Platforms', desc: 'Cluster design, autoscaling, and a paved deployment path teams can self-serve onto.' },
      { icon: '💸', title: 'Cost Optimisation', desc: 'Rightsizing, commitment planning, and storage tiering measured against a baseline agreed up front.' },
      { icon: '🌐', title: 'Multi-Region Resilience', desc: 'Active-active and warm-standby designs with tested failover and documented recovery objectives.' },
    ],
    accentColor: '#F2622E',
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Helm', 'Docker', 'Ansible', 'CloudFormation', 'Istio', 'Karpenter', 'Velero'],
  },

  /* ── 6 ─────────────────────────────────────────────────────── */
  'observability-sre': {
    enterpriseTitle: 'Production you can see into, and an on-call people can live with',
    enterpriseDesc: 'Observability is not three tools bolted together. We instrument services so metrics, logs, and traces share identifiers, then build the handful of dashboards and alerts that map to actual customer pain — and delete the ones that do not.\n\nOn top sits the operating practice: service level objectives with error budgets that govern release pace, an incident process that produces learning rather than blame, and a rotation that does not burn people out.',
    useCases: [
      { icon: '📊', title: 'Observability Rollout', desc: 'OpenTelemetry instrumentation across services, with sampling and retention that keep the bill predictable.' },
      { icon: '🎯', title: 'SLO Programmes', desc: 'Service levels derived from customer journeys, with error budgets that make release decisions objective.' },
      { icon: '🚨', title: 'Incident Practice', desc: 'Roles, runbooks, comms templates, and blameless review that feeds fixes straight back into the backlog.' },
      { icon: '⚡', title: 'Peak Readiness', desc: 'Load testing, latency budgets, and capacity planning ahead of seasonal or launch traffic.' },
    ],
    accentColor: '#F2622E',
    technologies: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Datadog', 'Loki', 'Tempo', 'PagerDuty', 'Jaeger', 'k6', 'Thanos', 'Sentry', 'Elastic'],
  },

  /* ── 7 ─────────────────────────────────────────────────────── */
  'application-modernization': {
    enterpriseTitle: 'Modernisation that ships in increments, not in a big bang',
    enterpriseDesc: 'Rewrites fail because they ask the business to wait. We work seam by seam — identify a boundary from real call graphs, stand the replacement up behind a stable contract, shift traffic, retire the old path. Every step ships and every step is reversible.\n\nThe end state is an API-first, containerised system your teams deploy independently, with the technical debt register measurably shorter than when we started and no feature freeze along the way.',
    useCases: [
      { icon: '🧩', title: 'Monolith Decomposition', desc: 'Domain seams carved out service by service, with the monolith kept live until each replacement is proven.' },
      { icon: '🔄', title: 'Runtime Re-Platforming', desc: 'Unsupported languages, frameworks, and databases moved to modern equivalents without a delivery freeze.' },
      { icon: '📦', title: 'Containerisation', desc: 'Reproducible images and dependency pinning so every environment behaves identically.' },
      { icon: '🔌', title: 'API Enablement', desc: 'Contract-first interfaces over legacy cores, letting new products build without touching the old system.' },
    ],
    accentColor: '#F2622E',
    technologies: ['Docker', 'Kubernetes', 'Java', '.NET', 'Node.js', 'Kafka', 'PostgreSQL', 'gRPC', 'OpenAPI', 'Strangler Fig', 'Flyway', 'Testcontainers'],
  },

  /* ── 8 ─────────────────────────────────────────────────────── */
  'itsm': {
    enterpriseTitle: 'Service management that removes friction rather than adding process',
    enterpriseDesc: 'Most ITSM programmes fail by adding process faster than they remove work. We start from your ticket data — where time is actually lost — design the smallest process that fixes it, then automate the repetitive majority.\n\nWhat you get is an ITIL-aligned operation with clear incident, change, and problem paths, a service catalogue that reflects what is really offered, and SLA reporting your stakeholders trust because it matches what they experience.',
    useCases: [
      { icon: '🎫', title: 'Service Desk Build-Out', desc: 'Single intake with skills-based routing, self-service portal, and a knowledge base that stays current.' },
      { icon: '🔧', title: 'Incident & Major Incident', desc: 'Priority matrices, escalation paths, and comms handled inside the process rather than improvised.' },
      { icon: '🔄', title: 'Change Enablement', desc: 'Risk-scored change workflow that speeds up standard changes instead of slowing everything equally.' },
      { icon: '🤖', title: 'Runbook Automation', desc: 'Provisioning, resets, and access requests automated end to end, freeing the desk for real problems.' },
    ],
    accentColor: '#F2622E',
    technologies: ['ServiceNow', 'Jira Service Management', 'Freshservice', 'PagerDuty', 'Zendesk', 'Ansible', 'Power Automate', 'Okta', 'Confluence', 'Opsgenie', 'Slack', 'Terraform'],
  },
}
