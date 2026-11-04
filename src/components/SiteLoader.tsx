import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

/* First-visit loader. The overlay and its timeline live in index.html as
   plain HTML + an inline script, so it plays from the first frame and the
   prerendered page paints underneath it (LCP stays on the real page).
   While it is up, <html> carries `sx-loading` and native scroll is locked
   by CSS; this component pauses Lenis too and resumes it when the class
   goes. */
export default function SiteLoader() {
  const lenis = useLenis()

  useEffect(() => {
    const html = document.documentElement
    if (!lenis || !html.classList.contains('sx-loading')) return
    lenis.stop()
    const watch = new MutationObserver(() => {
      if (html.classList.contains('sx-loading')) return
      lenis.start()
      watch.disconnect()
    })
    watch.observe(html, { attributes: true, attributeFilter: ['class'] })
    return () => { watch.disconnect(); lenis.start() }
  }, [lenis])

  return null
}
