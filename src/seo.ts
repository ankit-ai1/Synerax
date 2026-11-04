import { solutions } from './data/solutions'
import { industries } from './data/industryMeta'
import { posts } from './data/posts'
import { faqsByPath } from './data/faqs'

/* Per-route search and share metadata — one source for both sides:
     · build time: scripts/prerender.mjs writes these tags into each page's
       static HTML, so crawlers and answer engines get them without JS
     · run time:   <Seo /> (components/Seo.tsx) updates them on navigation
   The canonical host is www — the bare domain redirects there. */
export const SITE_URL = 'https://www.synerax.in'
export const SITE_NAME = 'Synerax Cloud Technologies'
/* Shown when a page has no image of its own. A 1200×630 card would render
   larger in link previews — swap it in here when one exists. */
export const DEFAULT_IMAGE = `${SITE_URL}/icons/icon-512.png`

export interface RouteSeo {
  path: string
  title: string
  description: string
  image: string
  type: 'website' | 'article'
  noindex?: boolean
  jsonLd: object[]
}

const clip = (s: string, max = 158) => {
  const flat = s.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : flat.slice(0, flat.lastIndexOf(' ', max - 1)).replace(/[,;:—–-]+$/, '') + '…'
}

const pageTitle = (name: string) => `${name} | Synerax`

const STATIC: Record<string, { title: string; description: string; crumb?: string }> = {
  '/': {
    title: 'Synerax Cloud Technologies | Cloud & AI Engineering',
    description: 'Synerax engineers cloud platforms, agentic AI, contact centers and enterprise applications, from code to cloud.',
  },
  '/solutions': {
    title: pageTitle('Solutions: Cloud, AI, DevSecOps & Enterprise Apps'),
    description: 'Seven engineering practices under one senior team: enterprise apps, cloud migration, agentic AI, DevSecOps & FinOps, observability & SRE, modernization and ITSM.',
    crumb: 'Solutions',
  },
  '/about': {
    title: pageTitle('About Us: Senior Cloud & AI Engineering Team'),
    description: 'Meet Synerax Cloud Technologies: a senior engineering team in Noida, India, building and running cloud, AI and enterprise platforms for clients worldwide.',
    crumb: 'About',
  },
  '/contact': {
    title: pageTitle('Contact Us: Start a Project'),
    description: 'Tell us about your project. A senior specialist replies within 24 hours with a free, no-obligation scoping call and a detailed proposal. NDA available.',
    crumb: 'Contact',
  },
  '/blog': {
    title: pageTitle('Blog & Insights: AI, Cloud and Engineering'),
    description: 'Field-tested playbooks from the Synerax engineering floor on agentic AI, AWS architecture, DevOps, security and digital transformation.',
    crumb: 'Blog',
  },
  '/careers': {
    title: pageTitle('Careers: Remote Engineering, AI & Design Jobs'),
    description: 'Join a remote-first senior team at Synerax. Open roles in engineering, AI & research, infrastructure, design and sales, with a learning budget and 20% R&D time.',
    crumb: 'Careers',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'How Synerax Cloud Technologies collects, uses and protects personal information shared through this website and our services.',
    crumb: 'Privacy Policy',
  },
  '/terms-of-service': {
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'The terms that govern use of the Synerax Cloud Technologies website and our engineering services.',
    crumb: 'Terms of Service',
  },
}
STATIC['/services'] = STATIC['/solutions']

const crumbs = (trail: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: SITE_URL + (path === '/' ? '/' : path),
  })),
})

const faqLd = (path: string) => {
  const faqs = faqsByPath[path]
  if (!faqs) return []
  return [{
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }]
}

const toIsoDate = (d: string) => {
  const t = Date.parse(d)
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().slice(0, 10)
}

export function getSeo(rawPath: string): RouteSeo {
  const path = (rawPath.split(/[?#]/)[0].replace(/\/+$/, '') || '/').toLowerCase()
  const base = { path, image: DEFAULT_IMAGE, type: 'website' as const }

  const fixed = STATIC[path]
  if (fixed) {
    const canonical = path === '/services' ? '/solutions' : path
    return {
      ...base,
      path: canonical,
      title: fixed.title,
      description: fixed.description,
      jsonLd: [...(fixed.crumb ? [crumbs([[fixed.crumb, canonical]])] : []), ...faqLd(path)],
    }
  }

  const [, section, slug] = path.split('/')

  if (section === 'solutions') {
    const s = solutions.find(x => x.slug === slug)
    if (s) return {
      ...base,
      title: pageTitle(s.name),
      description: clip(s.heroDesc),
      jsonLd: [
        crumbs([['Solutions', '/solutions'], [s.name, path]]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.name,
          description: clip(s.heroDesc, 300),
          url: SITE_URL + path,
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL + '/' },
        },
      ],
    }
  }

  if (section === 'industries') {
    const ind = industries.find(x => x.slug === slug)
    if (ind) return {
      ...base,
      title: pageTitle(`${ind.name} IT & Cloud Solutions`),
      description: clip(ind.heroDesc),
      jsonLd: [crumbs([[ind.name, path]])],
    }
  }

  if (section === 'blog') {
    const post = posts.find(p => p.slug === slug)
    if (post) return {
      ...base,
      type: 'article',
      // seoTitle keeps the <title> under 60 characters; the full headline
      // stays on the page and in the BlogPosting schema
      title: pageTitle(post.seoTitle),
      description: clip(post.desc),
      image: post.image,
      jsonLd: [
        crumbs([['Blog', '/blog'], [post.title, path]]),
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.desc,
          image: post.image,
          datePublished: toIsoDate(post.date),
          mainEntityOfPage: SITE_URL + path,
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        },
      ],
    }
  }

  // Admin and anything the router redirects — keep it out of the index.
  return { ...STATIC['/'], ...base, path: '/', noindex: path !== '/', jsonLd: [] }
}

/** Every indexable route — the prerender list. Mirrors public/sitemap.xml. */
export const prerenderRoutes: string[] = [
  '/', '/solutions', '/blog', '/careers', '/about', '/contact',
  ...solutions.map(s => `/solutions/${s.slug}`),
  ...industries.map(i => `/industries/${i.slug}`),
  ...posts.map(p => `/blog/${p.slug}`),
  '/privacy-policy', '/terms-of-service',
]
