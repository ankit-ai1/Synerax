export interface UseCase {
  icon: string
  title: string
  desc: string
}

export interface SolutionMeta {
  heroImage: string
  bannerImage: string
  enterpriseImage: string
  enterpriseTitle: string
  enterpriseDesc: string
  useCases: UseCase[]
  useCaseImage: string
  darkFeatureImage: string
  techStackImage: string
  accentColor: string
  technologies: string[]
}

export const solutionMeta: Record<string, SolutionMeta> = {
  'contact-center': {
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'Built for the enterprise — ready on day one',
    enterpriseDesc: 'Our contact center platforms are engineered to handle the most demanding call volumes without sacrificing quality or compliance. From intelligent IVR trees to AI-assisted agents, we build systems that consistently reduce average handle time and lift CSAT.\n\nEvery deployment includes real-time dashboards, historical reporting, and seamless CRM integrations — pre-built connectors for Salesforce, HubSpot, Zendesk, ServiceNow, and 40+ more. Whether you\'re running an inbound support operation or an outbound sales team, our platform adapts to your workflows.',
    useCases: [
      { icon: '🎧', title: 'Customer Support Operations', desc: 'Deliver support queues with smart routing, self-service IVR, and escalation workflows that reduce average handle time by up to 45%.' },
      { icon: '📣', title: 'Outbound Sales Campaigns', desc: 'Predictive dialer, scripting tools, CRM auto-population, and conversion analytics for high-performance outbound sales teams.' },
      { icon: '💻', title: 'Technical Help Desks', desc: 'Tiered escalation workflows, screen-pop with ticket history, and ILS alerting for IT and technical support centres.' },
      { icon: '🏥', title: 'Healthcare Patient Lines', desc: 'HIPAA-compliant appointment scheduling, prescription refill lines, and nurse triage queues with EHR integration.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['AWS Connect', 'Genesys Cloud', 'Twilio Flex', 'Asterisk', 'WebRTC', 'Salesforce CTI', 'Zendesk', 'HubSpot', 'Dialogflow CX', 'OpenAI', 'React', 'Node.js'],
  },
  'frontend': {
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779878284/ChatGPT_Image_May_27_2026_04_07_14_PM_pobwij.png',
    enterpriseTitle: 'Interfaces that convert, delight, and scale',
    enterpriseDesc: 'Our frontend engineers build high-performance, accessible web applications that look great on every device and load in milliseconds. We combine design thinking with engineering rigour — every component is typed, tested, and built to last.\n\nFrom complex enterprise dashboards to consumer-facing SPAs, we deliver pixel-perfect implementations with Lighthouse scores above 95, full WCAG 2.1 AA compliance, and comprehensive test coverage across unit, integration, and E2E tests.',
    useCases: [
      { icon: '🏢', title: 'Enterprise Dashboards', desc: 'Complex data visualisation, real-time analytics, and multi-role admin panels built with React and TypeScript.' },
      { icon: '🛒', title: 'E-commerce Storefronts', desc: 'Conversion-optimised storefronts with sub-2s load times, A/B testing hooks, and seamless checkout flows.' },
      { icon: '📱', title: 'Progressive Web Apps', desc: 'Offline-capable, installable apps with push notifications that work like native apps on any device.' },
      { icon: '🎨', title: 'Design System Libraries', desc: 'Scalable component libraries in Storybook with Figma tokens, dark mode, and full accessibility support.' },
    ],
    useCaseImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779878646/ChatGPT_Image_May_27_2026_04_13_42_PM_ehty1h.png',
    darkFeatureImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779879134/ChatGPT_Image_May_27_2026_04_20_57_PM_gehziw.png',
    techStackImage: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular', 'Vite', 'Storybook', 'Figma', 'Jest', 'Cypress', 'GraphQL'],
  },
  'backend': {
    heroImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779879632/ChatGPT_Image_May_27_2026_04_30_17_PM_luoto9.png',
    bannerImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'APIs and services built for millions of users',
    enterpriseDesc: 'Our backend engineers architect the server-side systems that power your most critical operations. We specialise in high-throughput APIs, event-driven microservices, real-time data pipelines, and complex database architectures — engineered for reliability, security, and zero-downtime deployments.\n\nEvery API ships with comprehensive OpenAPI documentation, automated integration tests, rate limiting, authentication middleware, and structured logging — production-ready from day one.',
    useCases: [
      { icon: '💳', title: 'Payment & Fintech Platforms', desc: 'PCI-DSS compliant payment processing APIs with fraud detection, reconciliation, and multi-currency support.' },
      { icon: '🏥', title: 'Healthcare Data Systems', desc: 'HIPAA-compliant HL7/FHIR APIs for EHR integration, patient data management, and clinical workflow automation.' },
      { icon: '📦', title: 'Logistics & Supply Chain', desc: 'Real-time tracking APIs, route optimisation engines, and warehouse management system backends.' },
      { icon: '🎮', title: 'Gaming & Real-time Apps', desc: 'WebSocket game servers, leaderboard systems, and matchmaking backends handling millions of concurrent users.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['Node.js', 'Python', 'FastAPI', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'Apache Kafka', 'RabbitMQ', 'Docker', 'GraphQL', 'gRPC'],
  },
  'fullstack': {
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'One team. Full product. End-to-end ownership.',
    enterpriseDesc: 'From concept to production, our full stack squads own the entire delivery — UX wireframes, frontend, backend, databases, infrastructure, and ongoing maintenance. We eliminate handoff delays and communication gaps with cross-functional teams that ship complete products in weeks, not months.\n\nEvery engagement starts with a detailed technical discovery, followed by sprint planning, weekly demos, and transparent progress tracking — so you always know exactly where your product stands.',
    useCases: [
      { icon: '🚀', title: 'SaaS Product Development', desc: 'Multi-tenant architecture, billing integration, onboarding flows, and admin dashboards — from MVP to scale.' },
      { icon: '🛒', title: 'E-commerce Platforms', desc: 'Custom storefronts, payment integration, inventory management, and order fulfilment systems end-to-end.' },
      { icon: '📱', title: 'Mobile App Development', desc: 'iOS and Android apps with React Native or Flutter — shared codebase, native performance, App Store delivery.' },
      { icon: '🏢', title: 'Internal Enterprise Tools', desc: 'CRM replacements, operational dashboards, and workflow automation tools built around your processes.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['React Native', 'Flutter', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Stripe', 'Firebase', 'AWS', 'Figma', 'Storybook'],
  },
  'agentic-ai': {
    heroImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779880219/ChatGPT_Image_May_27_2026_04_39_19_PM_b872yy.png',
    bannerImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779880578/ChatGPT_Image_May_27_2026_04_46_05_PM_kdcppv.png',
    enterpriseImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779880852/ChatGPT_Image_May_27_2026_04_50_03_PM_gm9sat.png',
    enterpriseTitle: 'AI that works while you sleep',
    enterpriseDesc: 'We build intelligent agents and automation systems that handle complex, multi-step business workflows with no human intervention. From document intelligence and NLP pipelines to multi-agent orchestration and custom fine-tuned models — we turn cutting-edge AI research into production-ready business tools.\n\nEvery agent includes comprehensive observability, human escalation paths, cost controls, and audit logging. We don\'t ship prototypes — we ship production AI that runs reliably, measurably, and safely at enterprise scale.',
    useCases: [
      { icon: '📄', title: 'Document Processing Automation', desc: 'Invoice extraction, contract review, and compliance document classification at scale — no human review needed.' },
      { icon: '🎧', title: 'AI Customer Support', desc: 'LLM-powered support agents that resolve 60%+ of tickets autonomously, escalating only complex cases.' },
      { icon: '📊', title: 'Research & Data Intelligence', desc: 'Automated market research, competitive analysis, and data aggregation agents delivering daily intelligence reports.' },
      { icon: '⚙️', title: 'Internal Process Automation', desc: 'HR onboarding, procurement approvals, and IT ticketing workflows fully automated with agentic AI.' },
    ],
    useCaseImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779881816/ChatGPT_Image_May_27_2026_05_06_44_PM_qt6tbv.png',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['OpenAI GPT-4o', 'Anthropic Claude', 'LangChain', 'LlamaIndex', 'HuggingFace', 'Pinecone', 'Weaviate', 'FastAPI', 'Python', 'Celery', 'AWS Bedrock', 'Redis'],
  },
  'aws': {
    heroImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779882550/ChatGPT_Image_May_27_2026_05_18_37_PM_t2qae0.png',
    bannerImage: 'https://res.cloudinary.com/dtg3lepr4/image/upload/v1779882809/ChatGPT_Image_May_27_2026_05_23_12_PM_ryvhwv.png',
    enterpriseImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'Cloud infrastructure that never sleeps — and never overspends',
    enterpriseDesc: 'We design and manage enterprise cloud infrastructure across AWS, Azure, and GCP — from first architecture review to ongoing cost optimisation. Our Terraform-first, container-native approach means your infrastructure is repeatable, auditable, and ready to scale from startup to enterprise without rewrites.\n\nEvery architecture is reviewed against the AWS Well-Architected Framework across five pillars: operational excellence, security, reliability, performance efficiency, and cost optimisation.',
    useCases: [
      { icon: '🌍', title: 'Global Application Delivery', desc: 'Multi-region active-active deployments with CloudFront CDN, Route 53 failover, and global load balancing.' },
      { icon: '🔒', title: 'Regulated Industry Compliance', desc: 'HIPAA, PCI-DSS, SOC 2, and FedRAMP-compliant architectures for financial services, healthcare, and government.' },
      { icon: '📈', title: 'Auto-scaling Web Platforms', desc: 'ECS/EKS with HPA and KEDA for platforms that handle 10x traffic spikes without manual intervention.' },
      { icon: '💾', title: 'Data Lake & Analytics', desc: 'S3-based data lakes, Redshift warehouses, and Glue ETL pipelines for enterprise analytics workloads.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'Helm', 'GitHub Actions', 'Prometheus', 'Grafana', 'Istio', 'ArgoCD'],
  },
  'devops': {
    heroImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'From code commit to production in minutes — not days',
    enterpriseDesc: 'Our DevOps engineers design and implement the automation backbone that lets your teams ship faster, with fewer errors and zero downtime. From setting up GitHub Actions pipelines to managing multi-cluster Kubernetes environments, we build the infrastructure and culture that makes continuous delivery a reality.\n\nTeams we work with go from weekly deploy cycles to multiple deploys per day within 6–8 weeks of engagement start — with full observability, automated rollback, and on-call runbooks in place.',
    useCases: [
      { icon: '🏦', title: 'Financial Services Compliance', desc: 'Audit-ready pipelines with immutable artifact signing, approval gates, and SOC 2 change management workflows.' },
      { icon: '🛒', title: 'E-commerce Zero-downtime Deploys', desc: 'Blue/green and canary deployments with automated smoke tests and instant rollback on degraded metrics.' },
      { icon: '🏥', title: 'Healthcare Infrastructure Automation', desc: 'HIPAA-compliant infrastructure pipelines with encrypted secrets management and access audit trails.' },
      { icon: '🎮', title: 'High-frequency Game Releases', desc: 'Multi-environment promotion pipelines supporting daily content releases with automated integration test gates.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ArgoCD', 'HashiCorp Vault', 'Jenkins', 'PagerDuty'],
  },
  'inventory': {
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'Inventory intelligence that eliminates stockouts and waste',
    enterpriseDesc: 'We build custom inventory management systems that give you real-time visibility across every SKU, warehouse, and sales channel. From barcode scanning to AI-powered demand forecasting, our platforms eliminate stockouts, reduce overstock, and integrate seamlessly with your existing ERP and e-commerce systems.\n\nOur systems handle everything from receiving and putaway to picking, packing, and dispatch — with full audit trails, batch tracking, and expiry date management built in.',
    useCases: [
      { icon: '🏭', title: 'Manufacturing & Production', desc: 'Bill of materials tracking, raw material management, and WIP inventory control integrated with production scheduling.' },
      { icon: '🛒', title: 'Omnichannel Retail', desc: 'Real-time stock sync across stores, warehouses, and e-commerce channels with automatic reorder triggers.' },
      { icon: '🌡️', title: 'Cold Chain & Pharma', desc: 'Temperature-monitored inventory tracking with expiry date management and regulatory compliance reporting.' },
      { icon: '🚚', title: '3PL & Logistics Providers', desc: 'Multi-client warehouse management with billing integration, SLA tracking, and client portal access.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'SAP Connector', 'Oracle Integration', 'Shopify', 'WooCommerce', 'AWS', 'Barcode.js', 'RFID APIs', 'Power BI'],
  },
  'cybersecurity': {
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'Zero breaches. Zero compromise. 24/7 protection.',
    enterpriseDesc: 'Our cybersecurity practice provides enterprise organisations with comprehensive, layered protection — from architecture and code to networks and endpoints. We combine offensive security expertise (penetration testing, red-teaming) with defensive operations (24/7 SOC, SIEM, threat intelligence) to keep your critical systems secure.\n\nOur analysts hold CISSP, CEH, OSCP, and AWS Security Specialty certifications. We\'ve protected financial institutions, healthcare networks, and government contractors — and maintained a perfect record of zero client breaches.',
    useCases: [
      { icon: '🏦', title: 'Financial Services', desc: 'PCI-DSS compliance, fraud detection, and zero-trust network access for banks, insurers, and trading platforms.' },
      { icon: '🏥', title: 'Healthcare Security', desc: 'HIPAA-compliant security programmes with medical device security, EHR protection, and ransomware defence.' },
      { icon: '🏭', title: 'Critical Infrastructure', desc: 'OT/ICS security assessments, SCADA protection, and network segmentation for industrial control systems.' },
      { icon: '☁️', title: 'Cloud Security Posture', desc: 'CSPM, CWPP, and container security across AWS, Azure, and GCP — continuous misconfiguration detection.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['CrowdStrike', 'Snyk', 'Splunk SIEM', 'HashiCorp Vault', 'Cloudflare', 'AWS Security Hub', 'Nessus', 'Burp Suite', 'Okta', 'CyberArk', 'Palo Alto', 'Wiz'],
  },
  'consulting': {
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1600&q=80',
    enterpriseImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80',
    enterpriseTitle: 'The technology partner your business deserves',
    enterpriseDesc: 'Whether you need a fractional CTO, a dedicated development team, or a full technology transformation programme, our consulting practice delivers the strategic guidance and execution capability to move your business forward. We work as an extension of your leadership team — fully aligned to your business goals.\n\nOur consultants have led technology transformations at organisations ranging from Series A startups to FTSE 100 enterprises — across financial services, healthcare, retail, logistics, and government sectors.',
    useCases: [
      { icon: '🚀', title: 'Startup CTO Advisory', desc: 'Fractional CTO services for seed to Series B startups — architecture decisions, hiring, and vendor selection.' },
      { icon: '🏢', title: 'Enterprise Transformation', desc: 'Multi-year digital transformation programmes delivering legacy modernisation and cloud migration at scale.' },
      { icon: '🌍', title: 'Offshore Team Setup', desc: 'Build, operate, and transfer managed offshore development teams aligned to your processes and culture.' },
      { icon: '🔄', title: 'M&A Technology Due Diligence', desc: 'Technical assessment of acquisition targets — code quality, architecture, security posture, and team capability.' },
    ],
    useCaseImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80',
    darkFeatureImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80',
    techStackImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    accentColor: '#3D52A0',
    technologies: ['Jira', 'Confluence', 'Azure DevOps', 'Notion', 'Figma', 'Miro', 'GitHub', 'AWS Well-Architected', 'TOGAF', 'SAFe Agile', 'OKR Frameworks', 'ITIL'],
  },
}
