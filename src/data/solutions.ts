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

export const solutions: Solution[] = [
  {
    slug: 'contact-center',
    name: 'Contact Center Solutions',
    tag: 'Contact Center Solutions',
    headline: 'Enterprise',
    headlineBlue: 'Contact Center Solutions',
    heroDesc: 'Enterprise-grade omnichannel contact center solutions handling 10,000+ calls/hour with AI-powered IVR, intelligent routing, and a 99.9% uptime SLA.',
    overviewTitle: 'Omnichannel Contact Centers Built for the Modern Enterprise',
    overviewDesc: 'We design and deploy enterprise-grade contact center platforms capable of handling millions of interactions across voice, chat, email, and social — with AI at every touchpoint. From IVR architecture to real-time analytics dashboards, our end-to-end delivery ensures your customer operations run flawlessly at any scale.',
    pillars: [
      { icon: '📞', title: 'IVR & Routing', desc: 'Multi-level IVR with skills-based and priority routing.' },
      { icon: '📊', title: 'Real-time Analytics', desc: 'Live dashboards, KPI monitoring and sentiment analysis.' },
      { icon: '🤖', title: 'AI Automation', desc: 'Voicebots and chatbots resolving 60%+ queries automatically.' },
      { icon: '🌐', title: 'Omnichannel', desc: 'Voice, chat, email, WhatsApp, and social in one workspace.' },
    ],
    stats: [
      { value: '10', suffix: 'K+', label: 'calls/hour capacity' },
      { value: '99', suffix: '.9%', label: 'Uptime SLA guaranteed' },
      { value: '40', suffix: '%', label: 'Cost Reduction achieved' },
      { value: '24', suffix: '/7', label: 'Expert support available' },
    ],
    capabilities: [
      { title: 'IVR & Call Routing', desc: 'Advanced interactive voice response with multi-level menus, skills-based routing, and priority queuing.', svgPath: 'M8 14a4 4 0 014-4h6l3 8-4 2.5a22 22 0 009.5 9.5L29 26l8 3v6a4 4 0 01-4 4C17.2 39 9 30.8 9 20.8M32 10h8M32 16h6' },
      { title: 'Omnichannel Integration', desc: 'Unified voice, chat, email, WhatsApp, and social media into a single agent workspace.', svgPath: 'M4 10h40v28H4zM12 28l6-8 6 4 6-10 6 8' },
      { title: 'Real-time Analytics', desc: 'Live dashboards, call recording, sentiment analysis, and KPI monitoring.', svgPath: 'M24 8a16 16 0 100 32A16 16 0 0024 8zM24 16v8l6 4M10 10l4 4M38 10l-4 4' },
      { title: 'AI Chatbot & Voicebot', desc: 'Intelligent virtual agents that resolve 60%+ of queries without human intervention.', svgPath: 'M10 8h28v24H10zM18 16h12M18 22h8M16 32l-6 8h28l-6-8' },
      { title: 'CRM Integration', desc: 'Native integrations with Salesforce, HubSpot, Zendesk, and custom CRM systems.', svgPath: 'M6 8h36v32H6zM6 18h36M14 26h8M14 32h12' },
      { title: '99.9% Uptime SLA', desc: 'Redundant infrastructure, automatic failover, and guaranteed SLA-backed availability.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
    ],
    ctaTag: 'Contact Center Experts',
    ctaHeadline: 'Ready to Transform\nYour Contact Center?',
    ctaDesc: 'Get a detailed contact center proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'frontend',
    name: 'Frontend Development',
    tag: 'Frontend Development',
    headline: 'Pixel-Perfect',
    headlineBlue: 'Frontend Development',
    heroDesc: 'React, Next.js, Vue, and Angular applications with exceptional UX. From design systems to complex SPAs — we build frontends that users love and developers maintain with ease.',
    overviewTitle: 'Interfaces That Convert, Delight, and Scale',
    overviewDesc: 'Our frontend engineers build high-performance, accessible web applications that look great on every device and load in milliseconds. We combine design thinking with engineering rigour — every component is typed, tested, and built to last.',
    pillars: [
      { icon: '⚡', title: 'Performance', desc: 'Sub-2s load times, Core Web Vitals optimised, Lighthouse 95+.' },
      { icon: '♿', title: 'Accessibility', desc: 'WCAG 2.1 AA compliant — inclusive by design, not afterthought.' },
      { icon: '🎨', title: 'Design Systems', desc: 'Scalable component libraries built with Storybook and Figma.' },
      { icon: '📱', title: 'Responsive', desc: 'Mobile-first, cross-browser, pixel-perfect at every breakpoint.' },
    ],
    stats: [
      { value: '95', suffix: '+', label: 'Lighthouse score average' },
      { value: '2', suffix: 's', label: 'Target load time' },
      { value: '100', suffix: '+', label: 'Components delivered' },
      { value: '0', suffix: '', label: 'Accessibility failures', isText: false },
    ],
    capabilities: [
      { title: 'React & Next.js Apps', desc: 'Server-side rendering, static generation, and hybrid rendering for maximum performance and SEO.', svgPath: 'M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8zM24 12v12l8 4' },
      { title: 'Design System Engineering', desc: 'Scalable, documented component libraries with Storybook, Figma tokens, and theming support.', svgPath: 'M6 8h36v8H6zM6 20h16v20H6zM26 20h16v8H26zM26 32h16v8H26z' },
      { title: 'Progressive Web Apps', desc: 'Offline-capable, installable PWAs with push notifications and native-like performance.', svgPath: 'M12 4h24l8 8v28H4V12l8-8zM12 4v8h-8M24 18v16M16 26l8-8 8 8' },
      { title: 'Performance Optimisation', desc: 'Bundle splitting, lazy loading, image optimisation, and Core Web Vitals improvements.', svgPath: 'M6 36l10-20 8 8 6-8 10 14M6 44h36' },
      { title: 'Micro-Frontend Architecture', desc: 'Module federation and micro-frontend patterns for large-scale enterprise applications.', svgPath: 'M4 8h16v16H4zM28 8h16v16H28zM16 28h16v16H16z' },
      { title: 'Testing & QA', desc: 'Comprehensive test coverage with Jest, React Testing Library, Cypress end-to-end tests.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
    ],
    ctaTag: 'Frontend Experts',
    ctaHeadline: 'Ready to Build\nYour Next Interface?',
    ctaDesc: 'Get a detailed frontend proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'backend',
    name: 'Backend Development',
    tag: 'Backend Development',
    headline: 'Scalable',
    headlineBlue: 'Backend Development',
    heroDesc: 'Node.js, Python, Go, and Java APIs handling millions of requests. Microservices, event-driven architecture, GraphQL, and database design at enterprise scale.',
    overviewTitle: 'APIs and Services Built for Enterprise Scale',
    overviewDesc: 'Our backend engineers architect and build the server-side systems that power your most critical business operations. We specialise in high-throughput APIs, event-driven microservices, real-time systems, and complex data pipelines — engineered for reliability, security, and zero downtime deployments.',
    pillars: [
      { icon: '🚀', title: 'High Throughput', desc: 'APIs handling millions of requests with sub-100ms response times.' },
      { icon: '🔒', title: 'Security First', desc: 'OAuth2, JWT, rate limiting, and OWASP best practices by default.' },
      { icon: '📡', title: 'Real-time', desc: 'WebSocket, Server-Sent Events, and event streaming with Kafka.' },
      { icon: '🗄️', title: 'Database Design', desc: 'PostgreSQL, MongoDB, Redis, and DynamoDB — right tool for each job.' },
    ],
    stats: [
      { value: '1', suffix: 'M+', label: 'requests/day capacity' },
      { value: '99', suffix: '.9%', label: 'API uptime delivered' },
      { value: '100', suffix: 'ms', label: 'Average response time' },
      { value: '0', suffix: '', label: 'Downtime deployments', isText: false },
    ],
    capabilities: [
      { title: 'REST & GraphQL APIs', desc: 'Production-grade APIs with versioning, documentation, rate limiting, and comprehensive error handling.', svgPath: 'M8 24h32M24 8v32M14 14l20 20M34 14L14 34' },
      { title: 'Microservices Architecture', desc: 'Service decomposition, API gateways, service discovery, and distributed system patterns.', svgPath: 'M8 8h14v14H8zM26 8h14v14H26zM8 26h14v14H8zM26 26h14v14H26z' },
      { title: 'Real-time Systems', desc: 'WebSocket servers, SSE, and event-driven architectures with Apache Kafka and RabbitMQ.', svgPath: 'M6 24c0-9.94 8.06-18 18-18s18 8.06 18 18M24 6v4M9.86 9.86l2.83 2.83M6 24h4' },
      { title: 'Database Architecture', desc: 'Schema design, indexing strategies, query optimisation, and multi-database patterns.', svgPath: 'M8 12c0-2.21 7.16-4 16-4s16 1.79 16 4v8c0 2.21-7.16 4-16 4S8 22.21 8 20v-8zM8 20v8c0 2.21 7.16 4 16 4s16-1.79 16-4v-8' },
      { title: 'Authentication & Security', desc: 'OAuth2, OpenID Connect, JWT, MFA, and RBAC — enterprise identity and access management.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6z' },
      { title: 'DevOps & CI/CD', desc: 'Docker containerisation, Kubernetes deployment, and automated testing pipelines.', svgPath: 'M12 24a12 12 0 1024 0 12 12 0 00-24 0zM12 12l24 24M36 12L12 36' },
    ],
    ctaTag: 'Backend Experts',
    ctaHeadline: 'Ready to Scale\nYour Backend?',
    ctaDesc: 'Get a detailed backend proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'fullstack',
    name: 'Full Stack Development',
    tag: 'Full Stack Development',
    headline: 'End-to-End',
    headlineBlue: 'Full Stack & Mobile Apps',
    heroDesc: 'Complete product delivery from UX design to production deployment. React + Node.js, Next.js, React Native — one team owning your entire stack.',
    overviewTitle: 'One Team. Full Product. End-to-End Ownership.',
    overviewDesc: 'From concept to production, our full stack teams own the entire delivery — UX wireframes, frontend, backend, databases, infrastructure, and ongoing maintenance. We eliminate handoff delays and communication gaps with cross-functional squads that ship complete products in weeks, not months.',
    pillars: [
      { icon: '🎯', title: 'Single Point of Contact', desc: 'One team, one account manager, no inter-team handoff delays.' },
      { icon: '⚡', title: 'Rapid Delivery', desc: 'MVP in 6–8 weeks. Full product in 3–4 months.' },
      { icon: '📱', title: 'Mobile + Web', desc: 'React Native and Flutter for iOS/Android alongside your web app.' },
      { icon: '🔄', title: 'Agile Sprints', desc: 'Two-week sprints with weekly demos and transparent progress.' },
    ],
    stats: [
      { value: '6', suffix: 'wks', label: 'MVP delivery time' },
      { value: '50', suffix: '+', label: 'Full products shipped' },
      { value: '98', suffix: '%', label: 'On-time delivery rate' },
      { value: '30', suffix: 'day', label: 'Post-launch support' },
    ],
    capabilities: [
      { title: 'Web Application Development', desc: 'Complete React/Next.js frontend with Node.js/Python backend — one codebase, one team.', svgPath: 'M4 8h40v32H4zM4 18h40M12 13h2M18 13h2M24 13h2' },
      { title: 'Mobile App Development', desc: 'iOS and Android apps with React Native or Flutter — shared codebase, native performance.', svgPath: 'M16 2h16a4 4 0 014 4v36a4 4 0 01-4 4H16a4 4 0 01-4-4V6a4 4 0 014-4zM20 38h8' },
      { title: 'UX/UI Design', desc: 'Figma wireframes, interactive prototypes, and design systems before a single line of code.', svgPath: 'M12 2h24l8 10v32H4V12L12 2zM12 2v10H4' },
      { title: 'E-commerce Platforms', desc: 'Custom storefronts, payment integration, inventory, and order management systems.', svgPath: 'M6 6h4l2 16h24l4-12H10M22 38a2 2 0 100-4 2 2 0 000 4zM32 38a2 2 0 100-4 2 2 0 000 4z' },
      { title: 'SaaS Product Engineering', desc: 'Multi-tenant architecture, billing integration, onboarding flows, and admin dashboards.', svgPath: 'M4 8h40v28H4zM16 36v4M32 36v4M10 44h28' },
      { title: 'API & Third-party Integration', desc: 'Payment gateways, CRM, ERP, social APIs, and custom webhook systems.', svgPath: 'M8 24h8M32 24h8M20 12l-4 12 4 12M28 12l4 12-4 12' },
    ],
    ctaTag: 'Full Stack Experts',
    ctaHeadline: 'Ready to Build\nYour Product End-to-End?',
    ctaDesc: 'Get a detailed full stack proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'agentic-ai',
    name: 'Agentic AI Solutions',
    tag: 'Agentic AI Solutions',
    headline: 'Autonomous',
    headlineBlue: 'AI Agents for Your Business',
    heroDesc: 'Intelligent autonomous agents, LLM-powered automation, and agentic workflows. OpenAI, LangChain, HuggingFace — AI that works for your business 24/7.',
    overviewTitle: 'AI That Works While You Sleep',
    overviewDesc: 'We build intelligent agents and automation systems that handle complex, multi-step business workflows with no human intervention. From document intelligence and NLP pipelines to multi-agent orchestration and custom fine-tuned models — we turn cutting-edge AI research into production-ready business tools.',
    pillars: [
      { icon: '🤖', title: 'Autonomous Agents', desc: 'Multi-step reasoning completing complex tasks end-to-end.' },
      { icon: '📄', title: 'NLP & Documents', desc: 'Intelligent extraction, classification, and processing.' },
      { icon: '🔄', title: 'Workflow AI', desc: 'Business process automation replacing repetitive manual work.' },
      { icon: '🧠', title: 'Custom Models', desc: 'Domain-specific fine-tuning on your proprietary data.' },
    ],
    stats: [
      { value: '60', suffix: '%', label: 'Automation rate' },
      { value: '24', suffix: '/7', label: 'Operation — no breaks' },
      { value: '10', suffix: 'x', label: 'Faster processing' },
      { value: '$0', suffix: '', label: 'Repetitive task cost', isText: true },
    ],
    capabilities: [
      { title: 'Autonomous LLM Agents', desc: 'Multi-step reasoning agents that complete complex tasks without human intervention.', svgPath: 'M24 4v4M24 40v4M44 24h-4M8 24H4M37 11l-3 3M14 34l-3 3M37 37l-3-3M14 14l-3-3M24 14a10 10 0 100 20 10 10 0 000-20z' },
      { title: 'Document AI', desc: 'Intelligent extraction, classification, and processing of unstructured documents.', svgPath: 'M6 8h36v32H6zM14 18h20M14 24h14M14 30h10' },
      { title: 'Workflow Automation', desc: 'AI-powered business process automation replacing repetitive manual tasks.', svgPath: 'M6 10h14v10H6zM28 10h14v10H28zM17 28h14v10H17zM13 20v4a4 4 0 004 4M35 20v4a4 4 0 01-4 4' },
      { title: 'Chatbots & Voicebots', desc: 'Conversational AI for customer service, HR, and internal operations.', svgPath: 'M10 8h28v24H10zM18 16h12M18 22h8M16 32l-6 10h28l-6-10' },
      { title: 'Custom Model Fine-tuning', desc: 'Domain-specific models fine-tuned on your business data for maximum accuracy.', svgPath: 'M8 36l10-16 8 8 6-10 8 12M32 8a6 6 0 100 12 6 6 0 000-12z' },
      { title: 'RAG Systems', desc: 'Retrieval-augmented generation for knowledge bases, documentation, and enterprise search.', svgPath: 'M8 12c0-2.21 7.16-4 16-4s16 1.79 16 4v8c0 2.21-7.16 4-16 4S8 22.21 8 20v-8zM8 20v8c0 2.21 7.16 4 16 4s16-1.79 16-4v-8M28 32l6-4-6-4' },
    ],
    ctaTag: 'AI Experts',
    ctaHeadline: 'Ready to Automate\nYour Business with AI?',
    ctaDesc: 'Get a detailed AI automation proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'aws',
    name: 'AWS Infrastructure',
    tag: 'AWS Cloud Infrastructure',
    headline: 'Enterprise',
    headlineBlue: 'Cloud Infrastructure at Scale',
    heroDesc: 'Enterprise AWS, Azure, and GCP architecture with 99.99% availability SLAs. Terraform IaC, Docker/Kubernetes, CI/CD pipelines, and cost optimisation.',
    overviewTitle: 'Cloud Infrastructure That Never Sleeps — and Never Overspends',
    overviewDesc: 'We design and manage enterprise cloud infrastructure across AWS, Azure, and GCP — from first architecture review to ongoing cost optimisation. Our Terraform-first, container-native approach means your infrastructure is repeatable, auditable, and ready to scale from startup to enterprise without rewrites.',
    pillars: [
      { icon: '☁️', title: 'Multi-Cloud', desc: 'AWS, Azure, and GCP expertise under one roof.' },
      { icon: '🔧', title: 'Terraform IaC', desc: 'Repeatable, version-controlled infrastructure at every layer.' },
      { icon: '⎈', title: 'Kubernetes', desc: 'Container orchestration with Helm and service mesh.' },
      { icon: '💰', title: 'Cost Optimisation', desc: 'Reserved instances, right-sizing, and Savings Plans.' },
    ],
    stats: [
      { value: '99', suffix: '.99%', label: 'Uptime SLA' },
      { value: '40', suffix: '%', label: 'Average cost savings' },
      { value: '10', suffix: 'x', label: 'Faster deploys' },
      { value: 'SOC 2', suffix: '', label: 'Compliance ready', isText: true },
    ],
    capabilities: [
      { title: 'AWS Architecture', desc: 'EC2, RDS, S3, Lambda, VPC, ECS/EKS — designed for resilience and scale.', svgPath: 'M24 8a16 16 0 100 32A16 16 0 0024 8zM24 8c-4.5 6.5-6 13-6 16s1.5 9.5 6 16M24 8c4.5 6.5 6 13 6 16s-1.5 9.5-6 16M8 24h32' },
      { title: 'Infrastructure as Code', desc: 'Terraform and CloudFormation templates for repeatable, auditable infrastructure.', svgPath: 'M8 8h14v14H8zM26 8h14v14H26zM8 26h14v14H8zM26 26h14v14H26zM22 15h4M15 22v4M33 22v4M26 33h-4' },
      { title: 'Kubernetes & Docker', desc: 'Container orchestration, Helm charts, and service mesh with Istio.', svgPath: 'M24 10l14 8v16L24 42 10 34V18L24 10zM24 10v32M10 18l14 8 14-8' },
      { title: 'CI/CD Pipelines', desc: 'GitHub Actions, CodePipeline, Jenkins — automated from commit to production.', svgPath: 'M12 24a6 6 0 1012 0 6 6 0 00-12 0zM30 12a6 6 0 1012 0 6 6 0 00-12 0zM30 36a6 6 0 1012 0 6 6 0 00-12 0zM18 24h6M30 15l-6 9M30 33l-6-9' },
      { title: 'Cost Optimisation', desc: 'Reserved instance planning, right-sizing, and Savings Plans — reduce cloud bills by 40%.', svgPath: 'M8 30l8-16 8 8 6-6 10 14M6 40h36M38 7a5 5 0 100 10 5 5 0 000-10z' },
      { title: 'Security & Compliance', desc: 'IAM policies, VPC security groups, encryption, and compliance frameworks.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
    ],
    ctaTag: 'Cloud Experts',
    ctaHeadline: 'Ready to Optimise\nYour Cloud Infrastructure?',
    ctaDesc: 'Get a detailed cloud architecture proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'inventory',
    name: 'Inventory Management',
    tag: 'Inventory Management System',
    headline: 'Intelligent',
    headlineBlue: 'Inventory Management Systems',
    heroDesc: 'Custom inventory management systems with real-time tracking, multi-warehouse support, barcode/RFID scanning, and ERP integrations for enterprises.',
    overviewTitle: 'Inventory Intelligence That Eliminates Stockouts and Waste',
    overviewDesc: 'We build custom inventory management systems that give you real-time visibility across every SKU, warehouse, and sales channel. From barcode scanning to AI-powered demand forecasting, our platforms eliminate stockouts, reduce overstock, and integrate seamlessly with your existing ERP and e-commerce systems.',
    pillars: [
      { icon: '📦', title: 'Real-time Tracking', desc: 'Live stock levels across all warehouses and sales channels.' },
      { icon: '🔍', title: 'Barcode & RFID', desc: 'Scanning-enabled workflows for receiving, picking, and dispatch.' },
      { icon: '📈', title: 'Demand Forecasting', desc: 'AI-powered predictions to optimise reorder points and safety stock.' },
      { icon: '🔗', title: 'ERP Integration', desc: 'Native connectors for SAP, Oracle, Microsoft Dynamics, and more.' },
    ],
    stats: [
      { value: '99', suffix: '.9%', label: 'Inventory accuracy' },
      { value: '30', suffix: '%', label: 'Stockout reduction' },
      { value: '25', suffix: '%', label: 'Carrying cost savings' },
      { value: '100', suffix: '+', label: 'ERP integrations' },
    ],
    capabilities: [
      { title: 'Real-time Stock Tracking', desc: 'Live inventory levels across multiple warehouses, locations, and sales channels.', svgPath: 'M8 8h32v32H8zM16 20h16M16 28h10M24 8v32' },
      { title: 'Barcode & RFID Scanning', desc: 'Mobile and fixed scanning for receiving, putaway, picking, and dispatch workflows.', svgPath: 'M4 8h4v32H4zM10 8h2v32h-2zM16 8h4v32h-4zM24 8h2v32h-2zM30 8h4v32h-4zM38 8h2v32h-2zM42 8h2v32h-2z' },
      { title: 'Multi-warehouse Management', desc: 'Centralised control across unlimited warehouses, zones, and bin locations.', svgPath: 'M2 42l10-30h24l10 30H2zM12 12V6h24v6' },
      { title: 'Demand Forecasting', desc: 'AI-powered demand predictions to optimise reorder points, safety stock, and purchasing.', svgPath: 'M6 36l8-14 8 6 8-16 8 12M6 44h36M36 8h6v6h-6z' },
      { title: 'ERP & E-commerce Integration', desc: 'Connectors for SAP, Oracle, Shopify, WooCommerce, and custom APIs.', svgPath: 'M8 24h8M32 24h8M20 12l-4 12 4 12M28 12l4 12-4 12' },
      { title: 'Reporting & Analytics', desc: 'Custom dashboards for turnover, ageing, shrinkage, and supplier performance KPIs.', svgPath: 'M4 40h40M12 40V24M20 40V16M28 40V28M36 40V20' },
    ],
    ctaTag: 'Inventory Experts',
    ctaHeadline: 'Ready to Take Control\nof Your Inventory?',
    ctaDesc: 'Get a detailed inventory system proposal within 24 hours — no commitment required.',
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    tag: 'Cybersecurity Services',
    headline: 'Enterprise',
    headlineBlue: 'Cybersecurity Around the Clock',
    heroDesc: '24/7 SOC operations, zero-trust architecture, penetration testing, and compliance-ready security. Protecting your most critical assets around the clock.',
    overviewTitle: 'Zero Breaches. Zero Compromise. 24/7 Protection.',
    overviewDesc: 'Our cybersecurity practice provides enterprise organisations with comprehensive, layered protection — from architecture and code to networks and endpoints. We combine offensive security expertise (penetration testing, red-teaming) with defensive operations (24/7 SOC, SIEM, threat intelligence) to keep your critical systems secure and compliant.',
    pillars: [
      { icon: '🛡', title: 'Zero-Trust', desc: 'Identity verification at every layer with least-privilege access.' },
      { icon: '🔍', title: 'Pen Testing', desc: 'Black-box, white-box, and grey-box testing of all surfaces.' },
      { icon: '🚨', title: '24/7 SOC', desc: 'Round-the-clock detection, alerting, and incident response.' },
      { icon: '📋', title: 'Compliance', desc: 'ISO 27001, SOC 2, GDPR, HIPAA, and PCI-DSS frameworks.' },
    ],
    stats: [
      { value: '24', suffix: '/7', label: 'SOC operations' },
      { value: '15', suffix: 'min', label: 'Incident response time' },
      { value: 'ISO 27001', suffix: '', label: 'Certified practices', isText: true },
      { value: 'Zero', suffix: '', label: 'Client breaches', isText: true },
    ],
    capabilities: [
      { title: 'Zero-Trust Architecture', desc: 'Network segmentation, identity verification at every layer, and least-privilege access.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
      { title: 'Penetration Testing', desc: 'Comprehensive black-box, white-box, and grey-box testing of all attack surfaces.', svgPath: 'M20 8a12 12 0 100 24 12 12 0 000-24zM29 29l10 10M14 20h12M20 14v12' },
      { title: '24/7 SOC Operations', desc: 'Round-the-clock security monitoring, threat detection, and incident response.', svgPath: 'M24 8a16 16 0 100 32A16 16 0 0024 8zM24 14v10l6 4M10 10l4 4M38 10l-4 4' },
      { title: 'Compliance Frameworks', desc: 'ISO 27001, SOC 2, GDPR, HIPAA, and PCI-DSS compliance implementation.', svgPath: 'M6 8h36v32H6zM14 18h20M14 24h14M14 30h10M36 18l2 2-2 2' },
      { title: 'Security Audits', desc: 'Full infrastructure, application, and code security assessments with detailed remediation plans.', svgPath: 'M8 14h32M8 24h32M8 34h20M32 28a6 6 0 100 12 6 6 0 000-12z' },
      { title: 'Incident Response', desc: 'Rapid containment, investigation, and recovery with root cause analysis.', svgPath: 'M24 8v4M14 12l3 3M10 22H6M24 40c-8.84 0-16-7.16-16-16M14 28h20v14H14z' },
    ],
    ctaTag: 'Security Experts',
    ctaHeadline: 'Ready to Secure\nYour Enterprise?',
    ctaDesc: 'Get a detailed security assessment within 24 hours — no commitment required.',
  },
  {
    slug: 'consulting',
    name: 'IT Consulting',
    tag: 'IT Consulting & Outsourcing',
    headline: 'Strategic',
    headlineBlue: 'IT Consulting & Outsourcing',
    heroDesc: 'CTO-level advisory, technology roadmaps, vendor management, and dedicated offshore development teams. Transform your technology strategy and execution.',
    overviewTitle: 'The Technology Partner Your Business Deserves',
    overviewDesc: 'Whether you need a fractional CTO, a dedicated development team, or a full technology transformation programme, our consulting practice delivers the strategic guidance and execution capability to move your business forward. We work as an extension of your leadership team — with full alignment to your business goals, not just your technical requirements.',
    pillars: [
      { icon: '🧭', title: 'Technology Strategy', desc: 'Roadmaps, architecture reviews, and build vs. buy decisions.' },
      { icon: '👥', title: 'Dedicated Teams', desc: 'Fully managed offshore teams from 2 to 50+ engineers.' },
      { icon: '🔄', title: 'Vendor Management', desc: 'Evaluation, negotiation, and ongoing vendor performance oversight.' },
      { icon: '📊', title: 'Digital Transformation', desc: 'Legacy modernisation and process digitisation programmes.' },
    ],
    stats: [
      { value: '80', suffix: '+', label: 'Enterprises advised' },
      { value: '15', suffix: '+', label: 'Years combined expertise' },
      { value: '30', suffix: '%', label: 'Average cost reduction' },
      { value: '6', suffix: 'wk', label: 'Time to team ramp-up' },
    ],
    capabilities: [
      { title: 'Fractional CTO Services', desc: 'Experienced CTO-level guidance for startups and scale-ups without the full-time cost.', svgPath: 'M20 8a8 8 0 100 16 8 8 0 000-16zM4 40c0-8.84 7.16-16 16-16h8M36 28l6 6-6 6M36 34h6' },
      { title: 'Technology Roadmapping', desc: 'Structured 12–24 month technology plans aligned to your business strategy and growth targets.', svgPath: 'M4 8h40v32H4zM4 20h40M12 14h4M20 14h12M12 28h6M22 28h14' },
      { title: 'Dedicated Offshore Teams', desc: 'Fully managed development teams with your tech stack, your processes, your Jira board.', svgPath: 'M16 8a8 8 0 100 16 8 8 0 000-16zM32 8a8 8 0 100 16 8 8 0 000-16zM4 40c0-6 5.37-10.67 12-10.67M44 40c0-6-5.37-10.67-12-10.67M24 40c0-6 3.58-10.67 8-10.67h-16C20.42 29.33 24 34 24 40z' },
      { title: 'Legacy Modernisation', desc: 'Phased migration from monolith to microservices, on-premise to cloud, or language rewrites.', svgPath: 'M8 36h32M8 28h32M8 20h32M24 12v24M16 16l8-8 8 8' },
      { title: 'Vendor Evaluation', desc: 'Structured RFP process, technical due diligence, and negotiation support for technology vendors.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
      { title: 'Process Digitisation', desc: 'Mapping, optimising, and automating manual business processes with digital workflows.', svgPath: 'M6 10h14v10H6zM28 10h14v10H28zM17 28h14v10H17zM13 20v4a4 4 0 004 4M35 20v4a4 4 0 01-4 4' },
    ],
    ctaTag: 'Consulting Experts',
    ctaHeadline: 'Ready to Transform\nYour Technology Strategy?',
    ctaDesc: 'Get a strategic technology consultation within 24 hours — no commitment required.',
  },
  {
    slug: 'devops',
    name: 'DevOps & CI/CD',
    tag: 'DevOps & CI/CD',
    headline: 'Automate, Deploy,',
    headlineBlue: 'Ship Faster with DevOps',
    heroDesc: 'End-to-end DevOps engineering — CI/CD pipelines, Docker, Kubernetes, Infrastructure as Code, and 24/7 monitoring. Deploy with confidence, scale without limits.',
    overviewTitle: 'From Code Commit to Production in Minutes — Not Days',
    overviewDesc: 'Our DevOps engineers design and implement the automation backbone that lets your teams ship faster, with fewer errors and zero downtime. From setting up GitHub Actions pipelines to managing multi-cluster Kubernetes environments, we build the infrastructure and culture that makes continuous delivery a reality — not a buzzword.',
    pillars: [
      { icon: '🔁', title: 'CI/CD Pipelines', desc: 'Automated build, test, and deploy pipelines from commit to production.' },
      { icon: '🐳', title: 'Containerisation', desc: 'Docker and Kubernetes for consistent, scalable, portable workloads.' },
      { icon: '📜', title: 'Infrastructure as Code', desc: 'Terraform and Ansible for repeatable, version-controlled infrastructure.' },
      { icon: '📊', title: 'Monitoring & Alerts', desc: 'Prometheus, Grafana, and PagerDuty for full observability.' },
    ],
    stats: [
      { value: '10', suffix: 'x', label: 'Faster deployment cycles' },
      { value: '99', suffix: '.9%', label: 'Pipeline success rate' },
      { value: '80', suffix: '%', label: 'Reduction in manual ops' },
      { value: '0', suffix: '', label: 'Downtime deployments', isText: false },
    ],
    capabilities: [
      { title: 'CI/CD Pipeline Engineering', desc: 'GitHub Actions, GitLab CI, Jenkins, and CircleCI — automated from pull request to production deployment.', svgPath: 'M12 24a6 6 0 1012 0 6 6 0 00-12 0zM30 12a6 6 0 1012 0 6 6 0 00-12 0zM30 36a6 6 0 1012 0 6 6 0 00-12 0zM18 24h6M30 15l-6 9M30 33l-6-9' },
      { title: 'Docker & Kubernetes', desc: 'Container strategy, Helm chart authoring, multi-cluster management, and service mesh with Istio.', svgPath: 'M24 10l14 8v16L24 42 10 34V18L24 10zM24 10v32M10 18l14 8 14-8' },
      { title: 'Infrastructure as Code', desc: 'Terraform modules, Ansible playbooks, and Pulumi scripts for cloud-agnostic, reproducible infrastructure.', svgPath: 'M8 8h14v14H8zM26 8h14v14H26zM8 26h14v14H8zM26 26h14v14H26zM22 15h4M15 22v4M33 22v4M26 33h-4' },
      { title: 'Monitoring & Observability', desc: 'Prometheus + Grafana dashboards, distributed tracing with Jaeger, and alerting with PagerDuty or OpsGenie.', svgPath: 'M6 36l8-14 8 6 8-16 8 12M6 44h36' },
      { title: 'GitOps & Deployment Strategy', desc: 'ArgoCD, Flux — blue/green, canary, and rolling deployments with automatic rollback on failure.', svgPath: 'M24 6L8 14v12c0 9.4 6.8 18.2 16 20.4C33.2 44.2 40 35.4 40 26V14L24 6zM17 24l5 5 9-10' },
      { title: 'Security & Compliance (DevSecOps)', desc: 'SAST/DAST scanning in pipelines, secrets management with Vault, and SOC 2 / GDPR-ready deployments.', svgPath: 'M20 8a8 8 0 100 16 8 8 0 000-16zM29 29l10 10M14 20h12M20 14v12' },
    ],
    ctaTag: 'DevOps Experts',
    ctaHeadline: 'Ready to Automate\nYour Entire Delivery Pipeline?',
    ctaDesc: 'Get a detailed DevOps assessment and pipeline proposal within 24 hours.',
  },
]

export function getSolution(slug: string): Solution | undefined {
  return solutions.find(s => s.slug === slug)
}
