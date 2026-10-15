import { motion, useReducedMotion } from 'motion/react'
import { CalendarHeart, MapPin, Moon, Sun, Sunrise } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cities, config, type City } from '../content'
import { useLang } from '../lib/i18n'
import { convertWindow, detectTimeZone, formatHour, hourNow, hourShift, type Converted } from '../lib/time'
import { FloatTitle, Reveal } from './motion'

const pct = (h: number) => `${(h / 24) * 100}%`

function Track({ free, busy, now, label, icon: Icon }: { free: Converted; busy?: Converted; now: number; label: string; icon: typeof Sun }) {
  const reduce = useReducedMotion()
  const t = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 160, damping: 22 }
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden />
        {label}
      </div>
      <div className="relative h-12 overflow-hidden rounded-xl bg-muted ring-1 ring-border">
        {/* night shading */}
        <div className="absolute inset-y-0 left-0 bg-foreground/[0.06]" style={{ width: pct(7) }} />
        <div className="absolute inset-y-0 right-0 bg-foreground/[0.06]" style={{ width: pct(3) }} />
        {/* hour ticks */}
        {Array.from({ length: 23 }, (_, i) => (
          <div key={i} className="absolute inset-y-0 w-px bg-background/80" style={{ left: pct(i + 1) }} />
        ))}
        {busy?.segments.map((s, i) => (
          <motion.div
            key={`busy${i}`}
            className="stripes absolute inset-y-0"
            initial={false}
            animate={{ left: pct(s.from), width: pct(s.to - s.from) }}
            transition={t}
          />
        ))}
        {free.segments.map((s, i) => (
          <motion.div
            key={`free${i}`}
            className="absolute inset-y-1.5 rounded-lg bg-accent shadow-[inset_0_-3px_0_rgba(var(--foreground-rgb),.12)]"
            initial={false}
            animate={{ left: pct(s.from), width: pct(s.to - s.from) }}
            transition={t}
          />
        ))}
        <div className="absolute inset-y-0 z-10 w-0.5 bg-chart-4" style={{ left: pct(now) }}>
          <span className="pulse absolute -top-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-chart-4" />
        </div>
      </div>
      <div className="relative mt-1.5 h-4 text-[0.7rem] font-bold text-muted-foreground">
        {[0, 6, 12, 18, 24].map((h) => (
          <span key={h} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: pct(h) }}>
            {String(h).padStart(2, '0')}:00
          </span>
        ))}
      </div>
    </div>
  )
}

export function Planner() {
  const { t, lang } = useLang()
  const viewerTz = useMemo(detectTimeZone, [])
  const viewerCity = cities.find((c) => c.tz === viewerTz)
  const autoCity: City | null = viewerCity
    ? null
    : { id: 'auto', tz: viewerTz, en: viewerTz.split('/').pop()!.replace(/_/g, ' '), bg: viewerTz.split('/').pop()!.replace(/_/g, ' ') }
  const options = autoCity ? [autoCity, ...cities] : cities
  const [selected, setSelected] = useState<City>(viewerCity ?? autoCity ?? cities[0])

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const shift = hourShift(selected.tz, now)
  const weekday = convertWindow(config.schedule.weekday, shift)
  const weekend = convertWindow(config.schedule.weekend, shift)
  const busy = convertWindow(config.schedule.weekdayBusy, shift)
  const localNow = hourNow(selected.tz, now)
  const clock = new Intl.DateTimeFormat(lang === 'bg' ? 'bg-BG' : 'en-GB', {
    timeZone: selected.tz,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  // After-school sweet spot: overlaps 14:00–20:00 local by at least two hours.
  const overlap = Math.max(...weekday.segments.map((s) => Math.min(s.to, 20) - Math.max(s.from, 14)))
  const comfy = overlap >= 2

  const dayNote = (c: Converted) => (c.dayShift === 1 ? t.planner.nextDay : c.dayShift === -1 ? t.planner.prevDay : '')

  const rows = [
    { key: 'wd', label: t.planner.weekdays, conv: weekday, raw: config.schedule.weekday, busy, icon: Sun },
    { key: 'we', label: t.planner.weekend, conv: weekend, raw: config.schedule.weekend, busy: undefined, icon: Sunrise },
  ]

  return (
    <section id="times" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">{t.planner.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.planner.titleBefore} mark={t.planner.titleMark} className="h2 mt-4" />
          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-lg">{t.planner.lead}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2.5" role="radiogroup" aria-label={t.planner.eyebrow}>
              {options.map((c) => {
                const isSel = c.id === selected.id
                const isMe = c.tz === viewerTz
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => setSelected(c)}
                    className={`relative inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 px-4 text-[0.95rem] font-bold transition-all focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 ${
                      isSel
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border bg-background text-body hover:-translate-y-0.5 hover:border-line hover:text-foreground'
                    }`}
                  >
                    {isMe && <MapPin className="size-4" aria-hidden />}
                    {c[lang]}
                    {isMe && <span className="sr-only">({t.planner.yourLocation})</span>}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-[1.75rem] border-2 border-border bg-background p-5 shadow-xl sm:p-8">
            <span className="tape" style={{ ['--tape-tilt' as string]: '2deg' }} aria-hidden />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{selected[lang]}</p>
                <motion.p
                  key={selected.id}
                  className="font-serif text-5xl font-black tabular-nums text-foreground sm:text-6xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {clock}
                </motion.p>
              </div>
              {comfy ? (
                <span className="badge badge-leaf">
                  <Sun className="size-4" aria-hidden />
                  {t.planner.greatFit}
                </span>
              ) : (
                <span className="badge badge-sun max-w-64 text-left">
                  <Moon className="size-4 shrink-0" aria-hidden />
                  {t.planner.earlyFit}
                </span>
              )}
            </div>

            <div className="mt-8 space-y-7">
              {rows.map((r) => (
                <div key={r.key}>
                  <Track free={r.conv} busy={r.busy} now={localNow} label={r.label} icon={r.icon} />
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 text-foreground">
                    <span className="font-bold">{t.planner.lessonsFrom}</span>
                    <motion.span
                      key={`${selected.id}${r.key}`}
                      className="font-serif text-2xl font-black tabular-nums text-primary"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {formatHour(r.conv.from)} – {formatHour(r.conv.to)}
                    </motion.span>
                    <span className="font-semibold text-body">{t.planner.inYourTime}</span>
                    {dayNote(r.conv) && <span className="badge badge-ink">{dayNote(r.conv)}</span>}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {formatHour(r.raw.from)} – {formatHour(r.raw.to)} {t.planner.herTime}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-border pt-6">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-body">
                <li className="flex items-center gap-2">
                  <span className="size-3.5 rounded bg-accent" aria-hidden />
                  {t.planner.free}
                </li>
                <li className="flex items-center gap-2">
                  <span className="stripes size-3.5 rounded ring-1 ring-border" aria-hidden />
                  {t.planner.busy}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3.5 w-0.5 bg-chart-4" aria-hidden />
                  {t.planner.now}
                </li>
              </ul>
              <a href={config.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <CalendarHeart className="size-4.5" aria-hidden />
                {t.planner.cta}
              </a>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">{t.planner.footnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
