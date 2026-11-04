import { useEffect, useState, type ComponentType } from 'react'

/* Route-level code splitting without a Suspense fallback. Each page ships in
   its own chunk; main.tsx preloads the current route's chunk before the first
   render, so the prerendered HTML stays on screen until the real page can
   replace it in one step — never a blank frame. Other routes are fetched in
   the background shortly after load, so in-app navigation stays instant. */
export type LazyPage = ComponentType & { preload: () => Promise<void> }

const RELOAD_KEY = 'synerax-chunk-reload'

export function lazyPage(load: () => Promise<{ default: ComponentType }>): LazyPage {
  let Loaded: ComponentType | null = null
  let pending: Promise<void> | null = null

  const preload = () =>
    (pending ??= load().then(
      m => { Loaded = m.default },
      err => { pending = null; throw err },
    ))

  function Page() {
    const [, setReady] = useState(Loaded !== null)

    useEffect(() => {
      if (Loaded) return
      preload().then(
        () => setReady(true),
        // a deploy replaced the chunk names this tab knows about — fetch the
        // new build once rather than leaving the page blank
        () => {
          try {
            if (sessionStorage.getItem(RELOAD_KEY)) return
            sessionStorage.setItem(RELOAD_KEY, '1')
          } catch { /* ignore */ }
          window.location.reload()
        },
      )
    }, [])

    return Loaded ? <Loaded /> : null
  }

  return Object.assign(Page, { preload })
}
