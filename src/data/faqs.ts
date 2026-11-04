/* FAQ copy — rendered on the page by <FaqSection> and emitted as FAQPage
   JSON-LD by src/seo.ts, so the markup and the visible answers can never
   disagree. Keep answers factual and in line with the rest of the site. */
export interface Faq {
  q: string
  a: string
}

export const homeFaqs: Faq[] = [
  { q: 'What does Synerax Cloud Technologies do?', a: 'Synerax is a senior engineering company that designs, builds and runs cloud platforms, agentic AI systems, contact centers and enterprise applications, from code to cloud.' },
  { q: 'Which services does Synerax offer?', a: 'Seven practices: Web & Enterprise Applications, Cloud Engineering & Migration, Agentic AI, DevSecOps & FinOps, Observability & SRE, Application Modernization, and IT Service Management.' },
  { q: 'Which industries do you work with?', a: 'Healthcare, financial services, retail and e-commerce, government, education and EdTech, and logistics and supply chain. Compliance such as HIPAA, PCI-DSS and SOC 2 is designed in from day one.' },
  { q: 'Where is Synerax based?', a: 'Synerax is headquartered in Noida, India, and serves clients globally with a remote-first team of senior engineers.' },
  { q: 'How do I start a project with Synerax?', a: 'Send us a brief through the contact page. A senior specialist replies within 24 hours to schedule a 30-minute discovery call, and a detailed proposal follows within 48 hours of that call.' },
]

export const solutionsFaqs: Faq[] = [
  { q: 'Which cloud platforms do you work with?', a: 'We design, migrate and run workloads on AWS, Microsoft Azure and Google Cloud, using infrastructure as code (Terraform), containers (Docker, Kubernetes) and zero-downtime, wave-based migrations.' },
  { q: 'What engagement models do you offer?', a: 'Fixed-Price for well-defined scopes, Time & Materials for evolving requirements, and a Dedicated Team for long-term development. We recommend the model that suits your situation.' },
  { q: 'How does a typical engagement run?', a: 'Four stages: Assess & Discover, Design & Prototype, Implement & Build in two-week sprints with weekly demos, then Operate & Optimise with 24/7 monitoring and SLA-backed uptime.' },
  { q: 'Can you work with our existing team and codebase?', a: 'Yes. Many engagements augment an in-house team or inherit a legacy codebase. We start with a technical audit and share a transparent assessment before any build work begins.' },
  { q: 'Do you provide support after launch?', a: 'Every project includes 30 days of free post-launch support. After that we offer maintenance plans ranging from bug fixes to fully managed services with 24/7 monitoring.' },
]

export const aboutFaqs: Faq[] = [
  { q: 'Who is Synerax Cloud Technologies?', a: 'Synerax is an engineering company of senior specialists in cloud, AI and enterprise software. We take products from code to cloud and stay on to run them.' },
  { q: 'Where is the team located?', a: 'Our headquarters is in Noida, India. The team is remote-first and works with clients around the world.' },
  { q: 'What makes Synerax different?', a: 'Senior engineers only, honest timelines and transparent pricing, and ownership of outcomes through to resolution, not just delivery of tickets.' },
  { q: 'Do you sign NDAs?', a: 'Yes. We sign an NDA at any stage, even before the first call if you prefer. Your ideas and business information stay confidential.' },
]

export const careersFaqs: Faq[] = [
  { q: 'Is Synerax a remote company?', a: 'Yes. Synerax is remote-first. Most roles are fully remote, and some are based in Hyderabad, Delhi or Mumbai, as listed on each opening.' },
  { q: 'Which teams are hiring?', a: 'We hire across Engineering, AI & Research, Infrastructure, Design and Sales. Current openings are listed on this page with location, experience and type.' },
  { q: 'What benefits do you offer?', a: 'Competitive pay in your local currency, health coverage, a $2,000 yearly learning budget, 20% R&D time, unlimited PTO and fast career progression.' },
  { q: 'How do I apply?', a: 'Use the Apply button on any opening, or email careers@synerax.in with your CV and the role you are interested in.' },
]

export const contactFaqs: Faq[] = [
  { q: 'How long does a typical project take?', a: 'Timelines vary by scope: a landing page takes 1–2 weeks; a full web/mobile app MVP takes 6–10 weeks; an enterprise platform with AI integrations typically takes 3–6 months. We provide a detailed timeline in every proposal.' },
  { q: 'What engagement models do you offer?', a: 'We work on Fixed-Price (best for well-defined scopes), Time & Materials (best for evolving requirements), and Dedicated Team (best for long-term development). We\'ll recommend the best model for your situation.' },
  { q: 'Do you sign NDAs before sharing project details?', a: 'Absolutely. We sign an NDA at any stage, even before the initial call if you prefer. Your ideas and business information are completely confidential.' },
  { q: 'What happens after I submit this form?', a: 'You\'ll receive a confirmation email immediately. Within 24 hours, a senior specialist will reach out to schedule a 30-minute discovery call. After the call, we\'ll prepare a detailed proposal within 48 hours.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. All projects include a 30-day free support period post-launch. After that, we offer flexible maintenance plans from basic bug fixes to full managed services with 24/7 monitoring and SLA-backed uptime.' },
  { q: 'Can you work with our existing team and codebase?', a: 'Absolutely. Many engagements involve augmenting existing teams or inheriting legacy codebases. We conduct a thorough technical audit first, then provide a transparent assessment before we begin.' },
]

/** Pages that carry a visible FAQ block, keyed by route. */
export const faqsByPath: Record<string, Faq[]> = {
  '/': homeFaqs,
  '/solutions': solutionsFaqs,
  '/services': solutionsFaqs,
  '/about': aboutFaqs,
  '/careers': careersFaqs,
  '/contact': contactFaqs,
}
