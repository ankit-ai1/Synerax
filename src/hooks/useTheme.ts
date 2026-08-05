import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'synerax-theme'

/* The same resolution the inline script in index.html runs before paint —
   kept in sync so the first React render never disagrees with the DOM. */
export function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* private mode — fall through to the OS preference */ }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/* Module-level store. The toggle is mounted twice (desktop bar + mobile
   sheet); without a shared source of truth the two copies drift apart and
   one of them renders the wrong knob position. */
let current: Theme =
  typeof document === 'undefined'
    ? 'dark'
    : ((document.documentElement.dataset.theme as Theme) || 'dark')

const listeners = new Set<(t: Theme) => void>()

function apply(next: Theme, persist: boolean) {
  current = next
  document.documentElement.dataset.theme = next
  document.documentElement.style.colorScheme = next
  if (persist) {
    try { localStorage.setItem(KEY, next) } catch { /* ignore */ }
  }
  listeners.forEach(fn => fn(next))
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    listeners.add(setTheme)
    /* Re-sync in case the pre-paint script resolved after this module's
       initialiser ran. */
    if (theme !== current) setTheme(current)
    return () => { listeners.delete(setTheme) }
  }, [theme])

  /* Follow the OS, but only while the visitor has made no explicit choice. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e: MediaQueryListEvent) => {
      let chosen: string | null = null
      try { chosen = localStorage.getItem(KEY) } catch { /* ignore */ }
      if (!chosen) apply(e.matches ? 'light' : 'dark', false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    apply(current === 'dark' ? 'light' : 'dark', true)
  }, [])

  return { theme, toggle }
}
