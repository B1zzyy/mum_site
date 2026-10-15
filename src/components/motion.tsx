/**
 * Small motion toolkit. Effects inspired by react-bits (DavidHDev, MIT):
 * SplitText, ScrollFloat, ScrollReveal, Magnet, CountUp, SpotlightCard.
 */
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type PointerEvent, type ReactNode } from 'react'

const spring = { type: 'spring', stiffness: 140, damping: 18 } as const

/* ───────────── Highlighter mark (wraps across lines) ───────────── */

function Mark({ children, play, delay = 0 }: { children: ReactNode; play: boolean; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="rounded-md px-[0.08em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
      style={{
        backgroundImage:
          'linear-gradient(176deg, transparent 52%, rgba(var(--secondary-rgb), 0.9) 52%, rgba(var(--secondary-rgb), 0.9) 86%, transparent 86%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0',
      }}
      initial={{ backgroundSize: reduce ? '100% 100%' : '0% 100%' }}
      animate={play ? { backgroundSize: '100% 100%' } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  )
}

/* ───────────── Hero H1: SplitText (word stagger) ───────────── */

export function SplitTitle({
  before,
  mark,
  after = '',
  className = '',
}: {
  before: string
  mark: string
  after?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const words = (s: string) => s.split(' ').filter(Boolean)
  const all = [...words(before), ...words(mark)]
  let i = 0

  const word = (w: string) => {
    const idx = i++
    return (
      <span className="inline-block overflow-clip pb-[0.08em] align-bottom">
        <motion.span
          className="inline-block origin-bottom-left"
          initial={reduce ? false : { y: '105%', rotate: 7, opacity: 0 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.15 + idx * 0.07 }}
        >
          {w}
        </motion.span>
      </span>
    )
  }

  return (
    <h1 className={className}>
      {words(before).map((w, k) => (
        <span key={`b${k}`}>
          {word(w)}{' '}
        </span>
      ))}
      <Mark play delay={0.25 + all.length * 0.07}>
        {words(mark).map((w, k, arr) => (
          <span key={`m${k}`}>
            {word(w)}
            {k < arr.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Mark>
      {after}
    </h1>
  )
}

/* ───────────── Section H2: ScrollFloat (characters float in) ───────────── */

export function FloatTitle({
  before,
  mark,
  as: Tag = 'h2',
  className = 'h2',
}: {
  before: string
  mark?: string
  as?: ElementType
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()
  let i = 0

  const renderWords = (text: string) =>
    text
      .split(' ')
      .filter(Boolean)
      .map((word, wi, arr) => (
        <span key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const idx = i++
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: '0.6em', scaleY: 1.3 }}
                  animate={inView ? { opacity: 1, y: 0, scaleY: 1 } : undefined}
                  transition={{ ...spring, delay: idx * 0.022 }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))

  const beforeNodes = renderWords(before)
  const markCount = i
  return (
    <Tag ref={ref} className={className}>
      {beforeNodes}
      {mark && (
        <>
          {' '}
          <Mark play={inView} delay={0.3 + markCount * 0.022}>
            {renderWords(mark)}
          </Mark>
        </>
      )}
    </Tag>
  )
}

/* ───────────── Body: ScrollReveal (words brighten with scroll) ───────────── */

function RevealWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 50%'] })
  const words = text.split(' ')
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className}>
      {words.map((w, k) => (
        <RevealWord key={k} word={w} progress={scrollYProgress} range={[k / words.length, (k + 1) / words.length]} />
      ))}
    </p>
  )
}

/* ───────────── Reveal (generic fade-up) ───────────── */

export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 28,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()
  const C = as === 'li' ? motion.li : motion.div
  return (
    <C
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </C>
  )
}

/* ───────────── Magnet (pointer-pulled CTA) ───────────── */

export function Magnet({ children, strength = 10, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    const onMove = (e: globalThis.PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const near = Math.abs(dx) < r.width / 2 + 80 && Math.abs(dy) < r.height / 2 + 80
        x.set(near ? (dx / (r.width / 2 + 80)) * strength : 0)
        y.set(near ? (dy / (r.height / 2 + 80)) * strength : 0)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduce, strength, x, y])

  return (
    <motion.div ref={ref} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/* ───────────── CountUp ───────────── */

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  )
}

/* ───────────── Spotlight pointer tracking ───────────── */

export function spotlightMove(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const mx = e.clientX - r.left
  const my = e.clientY - r.top
  requestAnimationFrame(() => {
    el.style.setProperty('--mx', `${mx}px`)
    el.style.setProperty('--my', `${my}px`)
  })
}
