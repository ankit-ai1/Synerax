import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'synerax-theme'

/* The same resolution the inline script in index.html runs before paint —
   kept in sync so the first React render never disagrees with the DOM.
   Every first visit opens in light mode; dark is only ever the visitor's
   own choice via the toggle. */
export function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* private mode — fall through to the default */ }
  return 'light'
}

/* Module-level store. The toggle is mounted twice (desktop bar + mobile
   sheet); without a shared source of truth the two copies drift apart and
   one of them renders the wrong knob position. */
let current: Theme =
  typeof document === 'undefined'
    ? 'light'
    : ((document.documentElement.dataset.theme as Theme) || 'light')

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

  const toggle = useCallback(() => {
    apply(current === 'dark' ? 'light' : 'dark', true)
  }, [])

  return { theme, toggle }
}
