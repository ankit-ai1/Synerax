import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo, SITE_NAME, SITE_URL } from '../seo'

/* Keeps <head> in step with the route during client-side navigation. The
   first page load already carries the same tags in its static HTML
   (scripts/prerender.mjs); this only takes over once the app is running. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeo(pathname)
    const url = SITE_URL + seo.path

    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:type', seo.type)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', seo.image)
    setMeta('name', 'twitter:card', seo.image.includes('/icons/') ? 'summary' : 'summary_large_image')
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    document.getElementById('route-jsonld')?.remove()
    if (seo.jsonLd.length) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'route-jsonld'
      script.textContent = JSON.stringify(seo.jsonLd)
      document.head.appendChild(script)
    }
  }, [pathname])

  return null
}
