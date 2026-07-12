export interface IndustryStat {
  value: string
  label: string
}

export interface IndustrySpecialization {
  icon: string
  title: string
  points: string[]
}

export interface Industry {
  slug: string
  name: string
  tag: string
  accentColor: string        // hero bg color
  heroTitle: string
  heroTitleBlue: string      // colored part of headline
  heroDesc: string
  stats: IndustryStat[]
  challengeTitle: string
  challengeDesc: string
  challenges: string[]       // 4 items
  featureImage: string
  featureTitle: string
  featureDesc: string
  specializedTitle: string
  specializations: IndustrySpecialization[]   // 3 cols
  complianceTitle: string
  complianceDesc: string
  complianceImage: string
  benefitsTitle: string
  benefitsBg: string         // dark section bg
  benefits: string[]         // 8 items
  ctaTitle: string
  ctaDesc: string
}

export const industries: Industry[] = [
  /* ── HEALTHCARE ── */
  {
    slug: 'healthcare',
    name: 'Healthcare',
    tag: 'Healthcare & Pharmaceutical IT',
    accentColor: '#3D52A0',
    heroTitle: 'Secure, Compliant IT for',
    heroTitleBlue: 'Healthcare',
    heroDesc: 'Enable secure, compliant, and resilient IT solutions supporting modern healthcare and pharmaceutical operations. Designed to protect sensitive data, enable digital workflows, and support critical systems at scale.',
    stats: [
      { value: '99.9%', label: 'Uptime Availability' },
      { value: 'HIPAA', label: 'Compliant Infrastructure' },
      { value: 'Secure', label: 'Patient Data Protection' },
      { value: '24/7',  label: 'Support & Monitoring' },
      { value: 'Scalable', label: 'Multi-Facility Support' },
    ],
    challengeTitle: 'IT Challenges in Healthcare',
    challengeDesc: 'Modern healthcare and pharmaceutical organizations rely heavily on secure, compliant systems for patient care, data management, and operational continuity. As healthcare systems become increasingly digitized, organizations face higher exposure to cyber threats and operational risk. Our approach focuses on system reliability, data security, and scalable architectures that align with regulatory and operational demands.',
    challenges: [
      'Protecting sensitive patient and pharmaceutical data',
      'Maintaining HIPAA and regulatory compliance',
      'Ensuring 24/7 system availability for critical care',
      'Managing security across multi-facility environments',
    ],
    featureImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Digital Healthcare Systems & EHR Support',
    featureDesc: 'Support electronic health records, connected medical equipment, and telemedicine platforms that improve accessibility, collaboration, and care delivery.',
    specializedTitle: 'Specialized Healthcare IT Solutions',
    specializations: [
      {
        icon: '🏥',
        title: 'Digital Healthcare Systems',
        points: [
          'Electronic health records support',
          'Connected medical equipment integration',
          'Telemedicine platform infrastructure',
        ],
      },
      {
        icon: '🔒',
        title: 'Healthcare Cybersecurity',
        points: [
          'Reduce attack surfaces and threat exposure',
          'Protect sensitive healthcare data',
          'Structured security controls for high-risk environments',
        ],
      },
      {
        icon: '💊',
        title: 'Pharma IT Operations',
        points: [
          'Data-driven logistics and delivery coordination',
          'System availability and reliability',
          'Time-sensitive pharmaceutical workflow support',
        ],
      },
    ],
    complianceTitle: 'Protecting Patient Data & Compliance',
    complianceDesc: 'Healthcare organizations face heightened cyber risks. Our security-first approach focuses on prevention, monitoring, and rapid response to reduce operational and clinical disruption. We ensure HIPAA compliance, protect sensitive data, and maintain system integrity across all touchpoints.',
    complianceImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Healthcare Organizations',
    benefitsBg: '#0B4F3A',
    benefits: [
      'Improved operational and clinical efficiency',
      'Secure handling of sensitive healthcare data',
      'Reduced system downtime and disruption',
      'Scalable infrastructure supporting future growth',
      'HIPAA compliance and regulatory alignment',
      'Centralized management with predictable costs',
      '24/7 monitoring and rapid incident response',
      'Multi-facility coordination and support',
    ],
    ctaTitle: 'Transform Your Healthcare IT Infrastructure',
    ctaDesc: 'Partner with an IT services provider that understands the operational, security, and compliance needs of healthcare and pharmaceutical organizations.',
  },

  /* ── FINANCIAL SERVICES ── */
  {
    slug: 'financial-services',
    name: 'Financial Services',
    tag: 'Banking & FinTech IT',
    accentColor: '#3D52A0',
    heroTitle: 'Resilient, Secure IT for',
    heroTitleBlue: 'Financial Services',
    heroDesc: 'Power banks, fintech startups, and insurance companies with secure, compliant, and high-availability IT infrastructure engineered for the demands of modern financial operations.',
    stats: [
      { value: '99.99%', label: 'Uptime SLA' },
      { value: 'PCI-DSS', label: 'Compliant Systems' },
      { value: 'SOC 2',   label: 'Certified Infrastructure' },
      { value: '24/7',    label: 'Fraud Monitoring' },
      { value: 'Zero',    label: 'Data Breach Tolerance' },
    ],
    challengeTitle: 'IT Challenges in Financial Services',
    challengeDesc: 'Financial institutions face relentless pressure from evolving cyber threats, strict regulatory requirements, and the need to deliver seamless customer experiences. From core banking to real-time payments, every system must perform flawlessly while staying fully compliant with global financial regulations.',
    challenges: [
      'Meeting PCI-DSS, SOX, and GDPR compliance requirements',
      'Preventing fraud and securing transaction pipelines',
      'Maintaining zero-downtime for core banking systems',
      'Scaling infrastructure for peak trading and payment volumes',
    ],
    featureImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Core Banking & Payment Infrastructure',
    featureDesc: 'Build and modernize core banking platforms, real-time payment APIs, and fraud detection systems that process millions of transactions daily with absolute reliability.',
    specializedTitle: 'Specialized Financial IT Solutions',
    specializations: [
      {
        icon: '🏦',
        title: 'Core Banking Systems',
        points: [
          'Legacy modernization and cloud migration',
          'Real-time transaction processing APIs',
          'High-availability database architecture',
        ],
      },
      {
        icon: '🛡️',
        title: 'Financial Cybersecurity',
        points: [
          'Fraud detection and prevention systems',
          'Zero-trust network architecture',
          'SOC 2 & ISO 27001 compliance engineering',
        ],
      },
      {
        icon: '📊',
        title: 'FinTech & Analytics',
        points: [
          'Real-time financial data pipelines',
          'Risk and compliance reporting dashboards',
          'AI-driven credit scoring and underwriting',
        ],
      },
    ],
    complianceTitle: 'Regulatory Compliance & Risk Management',
    complianceDesc: 'We build compliance into every layer of your architecture — from encrypted data storage to automated audit trails. Our engineering teams understand PCI-DSS, GDPR, SOX, and regional banking regulations, ensuring your systems meet every standard without sacrificing performance.',
    complianceImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Financial Organizations',
    benefitsBg: '#0F2A5E',
    benefits: [
      'Eliminate costly compliance penalties and audit failures',
      'Sub-millisecond transaction processing at scale',
      'Real-time fraud detection reducing chargebacks by 60%',
      'Seamless legacy-to-cloud migration with zero downtime',
      'Automated regulatory reporting and audit trails',
      'Multi-region failover with 99.99% uptime SLA',
      '24/7 security operations and incident response',
      'Scalable architecture for high-volume trading periods',
    ],
    ctaTitle: 'Modernize Your Financial IT Infrastructure',
    ctaDesc: 'Partner with engineers who understand the unique security, compliance, and performance demands of financial services.',
  },

  /* ── RETAIL & E-COMMERCE ── */
  {
    slug: 'retail',
    name: 'Retail & E-Commerce',
    tag: 'Retail & E-Commerce Technology',
    accentColor: '#3D52A0',
    heroTitle: 'Scalable Technology for',
    heroTitleBlue: 'Retail & E-Commerce',
    heroDesc: 'Drive conversions, reduce cart abandonment, and handle peak traffic effortlessly with modern e-commerce platforms, real-time inventory systems, and AI-powered personalisation engines.',
    stats: [
      { value: '2s',   label: 'Average Page Load' },
      { value: '40%',  label: 'Higher Conversion Rate' },
      { value: '99.9%',label: 'Uptime on Peak Days' },
      { value: '10x',  label: 'Traffic Scaling Capacity' },
      { value: '24/7', label: 'Order Processing' },
    ],
    challengeTitle: 'Technology Challenges in Retail',
    challengeDesc: 'Modern retailers must deliver seamless omnichannel experiences while managing complex inventory, logistics, and payments across dozens of platforms. Flash sales, seasonal spikes, and rising customer expectations demand infrastructure that is fast, reliable, and intelligent — at any scale.',
    challenges: [
      'Handling Black Friday and seasonal traffic spikes',
      'Unifying inventory across online, in-store, and marketplace channels',
      'Reducing cart abandonment with faster checkout flows',
      'Personalizing experiences for millions of unique shoppers',
    ],
    featureImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Omnichannel Commerce Platform',
    featureDesc: 'Unify your online store, mobile app, POS, and marketplace listings into a single commerce platform with real-time stock sync, unified customer profiles, and centralized order management.',
    specializedTitle: 'Specialized Retail IT Solutions',
    specializations: [
      {
        icon: '🛒',
        title: 'Storefront & Checkout',
        points: [
          'High-performance React storefronts',
          'One-click and accelerated checkout flows',
          'A/B testing and conversion rate optimisation',
        ],
      },
      {
        icon: '📦',
        title: 'Inventory & Logistics',
        points: [
          'Real-time multi-warehouse inventory sync',
          'Automated reorder and supplier integrations',
          'Last-mile delivery tracking systems',
        ],
      },
      {
        icon: '🤖',
        title: 'AI Personalisation',
        points: [
          'Product recommendation engines',
          'Dynamic pricing and promotions',
          'Predictive demand forecasting',
        ],
      },
    ],
    complianceTitle: 'Scaling for Peak Demand Without Downtime',
    complianceDesc: 'Our auto-scaling cloud architecture ensures your storefront stays fast and available during your biggest sales events. With CDN-optimised assets, edge caching, and serverless compute, we eliminate the risk of revenue-losing outages during peak traffic.',
    complianceImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Retail Businesses',
    benefitsBg: '#4A1060',
    benefits: [
      'Sub-2 second page loads boosting SEO and conversions',
      'Zero downtime during Black Friday and peak events',
      'Real-time inventory accuracy across all sales channels',
      'AI-driven upsells increasing average order value',
      'Unified customer data for smarter marketing',
      'Automated fulfilment reducing operational costs',
      'Secure PCI-compliant payment processing',
      'Mobile-first design improving mobile conversion rates',
    ],
    ctaTitle: 'Build a Commerce Platform That Converts',
    ctaDesc: 'Work with engineers who specialise in high-performance retail technology that drives revenue and scales with your ambitions.',
  },

  /* ── GOVERNMENT ── */
  {
    slug: 'government',
    name: 'Government',
    tag: 'Government & Public Sector IT',
    accentColor: '#3D52A0',
    heroTitle: 'Trusted IT Solutions for',
    heroTitleBlue: 'Government & Public Sector',
    heroDesc: 'Deliver citizen-centric digital services, secure national infrastructure, and compliant data management systems that modernize public sector operations while maintaining the highest security standards.',
    stats: [
      { value: 'FedRAMP', label: 'Compliant Architecture' },
      { value: '99.9%',   label: 'System Uptime SLA' },
      { value: 'ISO 27001',label: 'Security Certified' },
      { value: '24/7',    label: 'Infrastructure Monitoring' },
      { value: 'Secure',  label: 'Citizen Data Protection' },
    ],
    challengeTitle: 'IT Challenges in the Public Sector',
    challengeDesc: 'Government agencies face the dual challenge of modernizing decades-old legacy systems while meeting strict compliance requirements and serving diverse citizen populations. Budget constraints, procurement complexity, and zero tolerance for security breaches make public sector IT uniquely demanding.',
    challenges: [
      'Modernizing legacy systems without disrupting critical services',
      'Meeting FedRAMP, FISMA, and sovereign data requirements',
      'Delivering accessible digital services to all citizens',
      'Protecting national infrastructure from cyber threats',
    ],
    featureImage: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Citizen Digital Services & e-Government',
    featureDesc: 'Build accessible, secure citizen-facing portals for permit applications, benefit disbursements, public records, and inter-agency data sharing that serve millions of users reliably.',
    specializedTitle: 'Specialized Government IT Solutions',
    specializations: [
      {
        icon: '🏛️',
        title: 'Digital Government Services',
        points: [
          'Citizen portal and self-service applications',
          'e-Permit, e-Tax, and benefits management systems',
          'Accessible WCAG 2.1 AA compliant interfaces',
        ],
      },
      {
        icon: '🔐',
        title: 'National Cybersecurity',
        points: [
          'Critical infrastructure protection',
          'Zero-trust security architecture',
          'Threat intelligence and SIEM implementation',
        ],
      },
      {
        icon: '☁️',
        title: 'Cloud & Data Sovereignty',
        points: [
          'Sovereign cloud and on-premises deployments',
          'FedRAMP and FISMA compliance engineering',
          'Secure inter-agency data exchange platforms',
        ],
      },
    ],
    complianceTitle: 'Security & Compliance at Every Layer',
    complianceDesc: 'We understand the non-negotiable compliance requirements of government IT. Every system we architect follows defence-in-depth principles, undergoes rigorous security testing, and is documented for full audit readiness — from access controls to data residency.',
    complianceImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Government Agencies',
    benefitsBg: '#1A2F4A',
    benefits: [
      'Faster digital service delivery to citizens',
      'Full compliance with FedRAMP, FISMA, and ISO standards',
      'Reduced operational costs through cloud migration',
      'Improved inter-agency data sharing and collaboration',
      'Robust cybersecurity protecting national infrastructure',
      'Accessible systems serving all citizen demographics',
      'Transparent audit trails and governance reporting',
      'Scalable architecture for growing service demands',
    ],
    ctaTitle: 'Modernize Public Sector IT with Confidence',
    ctaDesc: 'Partner with a technology firm that understands the security, compliance, and citizen service demands unique to government and public sector organizations.',
  },

  /* ── EDUCATION & EDTECH ── */
  {
    slug: 'education',
    name: 'Education & EdTech',
    tag: 'Education & EdTech Solutions',
    accentColor: '#3D52A0',
    heroTitle: 'Smarter Technology for',
    heroTitleBlue: 'Education & EdTech',
    heroDesc: 'Empower educators, students, and institutions with scalable learning platforms, AI-driven personalisation, and secure campus infrastructure — built to transform how the world learns.',
    stats: [
      { value: '1M+',   label: 'Students Supported' },
      { value: '99.9%', label: 'Platform Uptime' },
      { value: 'FERPA', label: 'Compliant Systems' },
      { value: '24/7',  label: 'Student Support' },
      { value: 'AI',    label: 'Personalised Learning' },
    ],
    challengeTitle: 'Technology Challenges in Education',
    challengeDesc: 'Educational institutions must manage complex IT ecosystems that serve students, faculty, and administrators across physical and virtual environments. From LMS platforms to campus network security, the demands on education IT are growing faster than ever.',
    challenges: [
      'Scaling learning platforms for remote and hybrid learning',
      'Protecting student data under FERPA and GDPR',
      'Integrating LMS, SIS, and communication tools seamlessly',
      'Supporting diverse device types across campus networks',
    ],
    featureImage: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Learning Management & Student Platforms',
    featureDesc: 'Design and deploy scalable LMS platforms, student information systems, and virtual classroom environments that support synchronous, asynchronous, and hybrid learning for any institution size.',
    specializedTitle: 'Specialized EdTech Solutions',
    specializations: [
      {
        icon: '📚',
        title: 'Learning Platforms',
        points: [
          'Custom LMS development and integration',
          'Virtual classroom and live-streaming infrastructure',
          'AI-powered adaptive learning pathways',
        ],
      },
      {
        icon: '🔒',
        title: 'Campus Cybersecurity',
        points: [
          'Network segmentation for student and staff',
          'FERPA-compliant data storage and access controls',
          'Identity management and SSO implementation',
        ],
      },
      {
        icon: '📊',
        title: 'Analytics & Outcomes',
        points: [
          'Student performance and engagement analytics',
          'Predictive at-risk student identification',
          'Institutional reporting and accreditation support',
        ],
      },
    ],
    complianceTitle: 'Student Data Privacy & FERPA Compliance',
    complianceDesc: 'Student data is among the most sensitive information an institution holds. We design every system with privacy-first principles — strict access controls, encrypted storage, automated data retention policies, and full FERPA audit trails to protect every learner.',
    complianceImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Educational Institutions',
    benefitsBg: '#1A3A6E',
    benefits: [
      'Seamless hybrid and remote learning experiences',
      'Full FERPA and GDPR student data compliance',
      'Reduced IT overhead with cloud-managed infrastructure',
      'AI-driven insights improving student outcomes',
      'Scalable platforms growing with enrolment',
      'Integrated tools reducing administrative burden',
      '24/7 student support and platform monitoring',
      'Accessibility compliance for all learner needs',
    ],
    ctaTitle: 'Build the Future of Learning Today',
    ctaDesc: 'Partner with technology specialists who understand the unique demands of education — from K-12 to higher education and EdTech startups.',
  },

  /* ── LOGISTICS & SUPPLY CHAIN ── */
  {
    slug: 'logistics',
    name: 'Logistics & Supply Chain',
    tag: 'Logistics & Supply Chain Technology',
    accentColor: '#3D52A0',
    heroTitle: 'End-to-End Technology for',
    heroTitleBlue: 'Logistics & Supply Chain',
    heroDesc: 'Optimize every link in your supply chain with real-time tracking, AI-driven demand forecasting, warehouse automation, and carrier integrations that eliminate delays and reduce costs.',
    stats: [
      { value: '35%',   label: 'Reduction in Delays' },
      { value: 'Real-time', label: 'Shipment Tracking' },
      { value: '99.9%', label: 'Order Accuracy' },
      { value: '24/7',  label: 'Operations Monitoring' },
      { value: 'AI',    label: 'Demand Forecasting' },
    ],
    challengeTitle: 'Technology Challenges in Logistics',
    challengeDesc: 'Global supply chains are under constant pressure from demand volatility, carrier disruptions, regulatory complexity, and rising customer expectations for real-time visibility. Modern logistics operations need intelligent systems that connect every node — from supplier to doorstep — in real time.',
    challenges: [
      'Gaining real-time visibility across multi-carrier networks',
      'Reducing manual errors in warehouse and order management',
      'Adapting to demand fluctuations with accurate forecasting',
      'Integrating disparate ERP, WMS, and TMS platforms',
    ],
    featureImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
    featureTitle: 'Real-Time Tracking & Visibility Platforms',
    featureDesc: 'Build end-to-end shipment tracking systems that give your operations team and customers live visibility into every order — from warehouse departure to last-mile delivery confirmation.',
    specializedTitle: 'Specialized Logistics IT Solutions',
    specializations: [
      {
        icon: '📦',
        title: 'Warehouse Management',
        points: [
          'WMS implementation and custom development',
          'Barcode, RFID, and IoT sensor integration',
          'Automated pick-pack-ship workflow systems',
        ],
      },
      {
        icon: '🚚',
        title: 'Transport & Fleet',
        points: [
          'TMS and carrier API integrations',
          'Route optimization and fleet tracking',
          'Freight cost and carrier performance analytics',
        ],
      },
      {
        icon: '🤖',
        title: 'AI & Forecasting',
        points: [
          'Demand forecasting and inventory optimization',
          'Predictive maintenance for fleet and equipment',
          'Automated procurement and replenishment systems',
        ],
      },
    ],
    complianceTitle: 'Supply Chain Resilience & Risk Management',
    complianceDesc: 'We build intelligent risk monitoring into your supply chain — tracking supplier performance, flagging disruption risks, and triggering automated contingency workflows so your operations continue even when the unexpected happens.',
    complianceImage: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=700&q=80',
    benefitsTitle: 'Key Benefits for Logistics Companies',
    benefitsBg: '#1A3520',
    benefits: [
      'Real-time shipment visibility reducing customer queries',
      '35% reduction in delivery delays through route optimization',
      'Automated warehouse operations cutting labour costs',
      'AI forecasting reducing overstock and stockouts',
      'Seamless ERP, WMS, and TMS system integration',
      'Reduced carrier costs through data-driven negotiations',
      'Proactive risk alerts preventing supply chain disruptions',
      'Scalable architecture handling peak season volumes',
    ],
    ctaTitle: 'Optimize Your Supply Chain with Smart Technology',
    ctaDesc: 'Work with engineers who understand the end-to-end complexity of modern logistics and can build the visibility, automation, and intelligence your operations need.',
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug)
}
