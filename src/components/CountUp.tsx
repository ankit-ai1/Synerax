import { useLayoutEffect, useRef } from 'react'
import { prefersReduced, countUp, parseMetric } from '../lib/motion'

const format = (v: number, decimals: number) =>
  v.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/** Counts up to `to` when it scrolls into view (GSAP + ScrollTrigger). */
export function CountUp({
  to, decimals = 0, prefix = '', suffix = '', duration = 1.5, delay = 0, loop = false,
}: {
  to: number; decimals?: number; prefix?: string; suffix?: string
  duration?: number; delay?: number
  /** Re-counts from zero on a cycle instead of settling after one pass. */
  loop?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)

  /* `duration` and `delay` are SECONDS. The tween writes textContent, which
     gsap.revert() cannot undo — so cleanup kills it and stamps the final value
     instead. The number can never be left sitting at 0. */
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const el = ref.current
    if (!el) return

    const tween = countUp(el, to, {
      decimals, prefix, suffix, duration, delay,
      repeat: loop ? -1 : 0,
      repeatDelay: loop ? 4.5 : 0,
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      el.textContent = prefix + format(to, decimals) + suffix
    }
  }, [to, decimals, prefix, suffix, duration, delay, loop])

  // rendered value is the final one, so reduced-motion and no-JS both read right
  return <span ref={ref}>{prefix}{format(to, decimals)}{suffix}</span>
}

/**
 * Animates the numeric part of a label like "99.8%", "5+" or "60%" while
 * reproducing the original string exactly at rest.
 */
export function CountUpText({ value, duration, delay, loop }:
  { value: string; duration?: number; delay?: number; loop?: boolean }) {
  const parts = parseMetric(value)
  if (!parts) return <>{value}</>
  return (
    <CountUp
      to={parts.num} decimals={parts.decimals}
      prefix={parts.prefix} suffix={parts.suffix}
      duration={duration} delay={delay} loop={loop}
    />
  )
}
