import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Shared motion language for the whole page. */
export const EASE = 'power3.out'
export const DUR = 0.7
export const STAGGER = 0.08

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

gsap.defaults({ ease: EASE, duration: DUR })

/**
 * Runs `build` inside a gsap.context scoped to `scope`, so every tween and
 * ScrollTrigger created in it is reverted on unmount. When the user prefers
 * reduced motion the callback never runs — markup keeps its final state.
 */
export function useGsap(
  build: (ctx: { self: gsap.Context }) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(self => build({ self }), scope)
    // layout settles after first paint, then again once fonts/images land —
    // otherwise pinned triggers measure against a stale page height
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('load', onLoad)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}

/** Fade + rise, the default entrance for any element or group. */
export function revealFrom(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: { y?: number; stagger?: number; start?: string; delay?: number } = {},
) {
  return gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? 20,
    duration: DUR,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? STAGGER,
    scrollTrigger: { trigger, start: opts.start ?? 'top 82%', once: true },
  })
}

/**
 * Counts an element's text up to `to`, formatted like the original label.
 * `duration` and `delay` are SECONDS (GSAP units), not milliseconds.
 */
export function countUp(
  el: Element,
  to: number,
  {
    decimals = 0, prefix = '', suffix = '', trigger = el,
    duration = 1.6, delay = 0,
    /* `repeat: -1` keeps the figure counting up from zero on a loop —
       used by the stat row, which reads as static otherwise. */
    repeat = 0, repeatDelay = 0,
  } = {},
) {
  const fmt = (n: number) =>
    prefix +
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix

  const obj = { v: 0 }
  return gsap.to(obj, {
    v: to,
    duration,
    delay,
    repeat,
    repeatDelay,
    ease: 'power2.out',
    /* a looping tween must not be pinned to a one-shot trigger */
    scrollTrigger: { trigger, start: 'top 90%', once: repeat === 0 },
    onUpdate() { el.textContent = fmt(obj.v) },
    onRepeat() { obj.v = 0 },
    onComplete() { el.textContent = fmt(to) },
  })
}

/** Splits "99.8%" / "5+" / "10,000+" into prefix, number, decimals, suffix. */
export function parseMetric(value: string) {
  const m = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/)
  if (!m) return null
  const [, prefix, raw, suffix] = m
  return {
    prefix,
    suffix,
    num: parseFloat(raw.replace(/,/g, '')),
    decimals: raw.includes('.') ? raw.split('.')[1].length : 0,
  }
}

export { gsap, ScrollTrigger }
