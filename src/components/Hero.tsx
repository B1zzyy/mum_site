import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, CalendarHeart, Clock3, Heart, Star, Video } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { config, magnets } from '../content'
import { useLang } from '../lib/i18n'
import { dayDiff, detectTimeZone, nextFreeSlot } from '../lib/time'
import { Magnet, SplitTitle } from './motion'

const MAGNET_COLORS = ['var(--primary)', 'var(--chart-5)', 'var(--accent)', 'var(--chart-4)', 'var(--secondary)']

/** Where each magnet starts. `wide` ones only show on large screens; `hint` sits under the "drag the letters" arrow. */
const SPOTS: { top: string; left: string; size: string; rot: number; wide?: boolean; hint?: boolean }[] = [
  { top: '-4%', left: '-8%', size: 'text-6xl sm:text-7xl', rot: -12 },
  { top: '22%', left: '-12%', size: 'text-5xl sm:text-6xl', rot: 10 },
  { top: '46%', left: '92%', size: 'text-6xl sm:text-7xl', rot: -6 },
  { top: '82%', left: '-10%', size: 'text-5xl sm:text-6xl', rot: 8 },
  { top: '92%', left: '78%', size: 'text-5xl sm:text-6xl', rot: -14 },
  { top: '58%', left: '-14%', size: 'text-4xl sm:text-5xl', rot: 14 },
  { top: '-4%', left: '31%', size: 'text-5xl', rot: 4, hint: true },
  { top: '104%', left: '30%', size: 'text-5xl', rot: -8, wide: true },
  { top: '4%', left: '-30%', size: 'text-4xl', rot: -4, wide: true },
]

function MagnetLetter({
  index,
  bounds,
  active,
  onTap,
}: {
  index: number
  bounds: RefObject<HTMLElement | null>
  active: boolean
  onTap: () => void
}) {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const m = magnets[index]
  const spot = SPOTS[index]
  return (
    <motion.div
      className={`absolute z-20 ${spot.wide ? 'hidden lg:block' : ''}`}
      style={{ top: spot.top, left: spot.left }}
      initial={reduce ? false : { opacity: 0, scale: 0.2, rotate: spot.rot - 40 }}
      animate={{ opacity: 1, scale: 1, rotate: spot.rot }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.6 + index * 0.08 }}
      drag={!reduce}
      dragConstraints={bounds}
      dragElastic={0.25}
      dragMomentum
      whileHover={{ scale: 1.08 }}
      whileDrag={{ scale: 1.18, rotate: 0, zIndex: 40 }}
    >
      <motion.button
        type="button"
        onTap={onTap}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onTap())}
        className={`magnet block p-1 ${spot.size}`}
        style={{ ['--m-color' as string]: MAGNET_COLORS[index % MAGNET_COLORS.length] }}
        aria-label={`${m.letter}: ${m.word}, ${m.en}`}
      >
        {m.letter}
      </motion.button>
      <AnimatePresence>
        {active && (
          <motion.div
            role="status"
            className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max -translate-x-1/2 rounded-2xl border-2 border-border bg-background px-4 py-2.5 text-center shadow-xl"
            style={{ rotate: -spot.rot }}
            initial={{ opacity: 0, y: -8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <p className="font-serif text-2xl font-black leading-none text-foreground">{m.word}</p>
            <p className="mt-1 text-sm font-bold text-muted-foreground">
              {t.hero.letterTip} <span className="text-primary">{m.en}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CircleBadge({ text }: { text: string }) {
  const reduce = useReducedMotion()
  // Short labels go round twice; long ones (e.g. Bulgarian) once.
  const label = text.length > 16 ? `${text} · ` : `${text} · ${text} · `
  return (
    <div className="absolute -right-5 -top-8 z-30 size-28 sm:-right-8 sm:size-32">
      <motion.svg
        viewBox="0 0 120 120"
        className="size-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        aria-hidden
      >
        <circle cx="60" cy="60" r="58" fill="var(--secondary)" />
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fill="var(--secondary-foreground)" fontSize="11.5" fontWeight="800" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>
          <textPath href="#badge-circle" textLength="272">
            {label}
          </textPath>
        </text>
      </motion.svg>
      <Heart className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 fill-chart-4 text-chart-4" aria-hidden />
      <span className="sr-only">{text}</span>
    </div>
  )
}

function NextSlotCard() {
  const { t, lang } = useLang()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const label = useMemo(() => {
    const slot = nextFreeSlot(now)
    if (!slot) return null
    const tz = detectTimeZone()
    const locale = lang === 'bg' ? 'bg-BG' : 'en-GB'
    const time = new Intl.DateTimeFormat(locale, { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(slot)
    const diff = dayDiff(now, slot, tz)
    const day =
      diff === 0
        ? t.hero.today
        : diff === 1
          ? t.hero.tomorrow
          : new Intl.DateTimeFormat(locale, { timeZone: tz, weekday: 'long' }).format(slot)
    return `${day.charAt(0).toUpperCase()}${day.slice(1)}, ${time}`
  }, [now, lang, t])

  if (!label) return null
  return (
    <motion.a
      href="#times"
      className="absolute -bottom-20 -left-2 z-30 sm:-left-8 flex items-center gap-3 rounded-2xl border-2 border-border bg-background py-3 pl-3 pr-5 shadow-xl transition-colors hover:border-accent focus-visible:outline-3 focus-visible:outline-ring sm:-left-12"
      initial={{ opacity: 0, y: 20, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 1.3 }}
    >
      <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-accent/25 text-accent-foreground">
        <Clock3 className="size-5" aria-hidden />
        <span className="pulse absolute right-0.5 top-0.5 size-2 rounded-full bg-accent" />
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.hero.nextSlot}</span>
        <span className="block font-bold text-foreground">{label}</span>
        <span className="block text-xs font-semibold text-muted-foreground">{t.hero.yourTime}</span>
      </span>
    </motion.a>
  )
}

export function Hero() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)

  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -60])
  const blobY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120])

  useEffect(() => {
    if (active === null) return
    const id = setTimeout(() => setActive(null), 3200)
    return () => clearTimeout(id)
  }, [active])

  const trustIcons = [Star, Heart, Video]

  return (
    <section ref={sectionRef} id="top" className="relative overflow-x-clip pt-28 pb-32 sm:pt-36 lg:pb-32">
      {/* atmosphere */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ y: blobY }}>
        <div className="blob left-[-10%] top-[-10%] size-[46rem]" style={{ background: 'radial-gradient(closest-side, rgba(var(--secondary-rgb), .45), transparent)' }} />
        <div
          className="blob right-[-15%] top-[10%] size-[40rem]"
          style={{ background: 'radial-gradient(closest-side, rgba(var(--primary-rgb), .28), transparent)', animationDelay: '-8s' }}
        />
        <div
          className="blob bottom-[-20%] left-[30%] size-[36rem]"
          style={{ background: 'radial-gradient(closest-side, rgba(var(--pink-rgb), .25), transparent)', animationDelay: '-14s' }}
        />
        <div className="grain" />
      </motion.div>

      <div className="container-page grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="relative z-10 min-w-0">
          <motion.span
            className="badge badge-ink"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {t.hero.eyebrow}
          </motion.span>

          <SplitTitle
            key={lang}
            before={t.hero.titleBefore}
            mark={t.hero.titleMark}
            after={t.hero.titleAfter}
            className="mt-6 text-[clamp(2.6rem,6.4vw,5.25rem)] font-black leading-[1.05] tracking-[-0.02em] [text-shadow:0_2px_8px_rgba(var(--foreground-rgb),.06)]"
          />

          <motion.p
            className="lead mt-7 max-w-xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 18 }}
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, type: 'spring', stiffness: 120, damping: 18 }}
          >
            <Magnet>
              <a href={config.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-primary min-h-14 px-7 text-lg">
                <CalendarHeart className="size-5" aria-hidden />
                {t.hero.cta}
              </a>
            </Magnet>
            <a href="#times" className="btn btn-ghost min-h-14 px-6">
              {t.hero.ctaSecondary}
              <ArrowDown className="size-4.5" aria-hidden />
            </a>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-bold text-muted-foreground"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
          >
            {t.hero.trust.map((item, i) => {
              const Icon = trustIcons[i]
              return (
                <li key={item} className="flex items-center gap-2">
                  <Icon className="size-4 text-primary" aria-hidden />
                  {item}
                </li>
              )
            })}
          </motion.ul>
        </div>

        {/* Photo + magnets */}
        <div className="relative mx-auto w-[min(78vw,24rem)] lg:mr-6">
          <motion.figure
            style={{ y: photoY }}
            className="relative"
            initial={reduce ? false : { opacity: 0, rotate: 8, y: 40 }}
            animate={{ opacity: 1, rotate: 3, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.3 }}
          >
            <div className="rotate-3 rounded-md bg-background p-3 pb-16 shadow-2xl ring-1 ring-border">
              <span className="tape" aria-hidden />
              <img
                src={config.photo}
                alt={t.hero.photoAlt}
                className="aspect-[4/5] w-full rounded-sm object-cover"
                width={720}
                height={900}
                fetchPriority="high"
              />
              <figcaption className="hand absolute inset-x-0 bottom-3 text-center text-[1.65rem] text-foreground">{t.hero.photoCaption}</figcaption>
            </div>
            <CircleBadge text={t.hero.trialBadge} />
          </motion.figure>

          <NextSlotCard />

          {magnets.map((_, i) => (
            <MagnetLetter key={i} index={i} bounds={sectionRef} active={active === i} onTap={() => setActive(active === i ? null : i)} />
          ))}

          <motion.p
            className="hand pointer-events-none absolute -top-16 left-6 -rotate-6 text-2xl text-chart-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            aria-hidden
          >
            <span className="hidden sm:inline">{t.hero.dragHint}</span>
            <span className="sm:hidden">{t.hero.dragHintShort}</span>
            <svg viewBox="0 0 60 40" className="ml-14 mt-1 h-8 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 4 C 20 10, 30 22, 44 32" />
              <path d="M34 33 L 45 33 L 42 22" />
            </svg>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
