import { motion, useReducedMotion } from 'motion/react'
import { CalendarHeart, Smile, Sprout } from 'lucide-react'
import { useLang } from '../lib/i18n'
import { FloatTitle, Reveal } from './motion'

const ICONS = [CalendarHeart, Smile, Sprout]
const NUM_TONE = ['bg-primary text-primary-foreground', 'bg-chart-4 text-primary-foreground', 'bg-accent text-accent-foreground']

export function Steps() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  return (
    <section className="section bg-muted/60">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.steps.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.steps.titleBefore} mark={t.steps.titleMark} className="h2 mt-4" />
        </div>

        <div className="relative mt-16">
          {/* hand-drawn connecting line (desktop) */}
          <svg className="absolute left-[16%] top-8 hidden h-24 w-[68%] text-line md:block" viewBox="0 0 600 80" fill="none" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M0 30 C 90 -10, 160 70, 300 34 S 500 -6, 600 32"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="2 12"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {t.steps.items.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <Reveal key={i} as="li" delay={i * 0.15} className="flex flex-col items-center text-center">
                    <motion.span
                      className={`relative grid size-16 place-items-center rounded-full font-serif text-2xl font-black shadow-lg ring-8 ring-background ${NUM_TONE[i]}`}
                      whileHover={{ rotate: [0, -12, 10, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    >
                      {i + 1}
                    </motion.span>
                    <div className="card mt-6 w-full flex-1">
                      <Icon className="mx-auto size-7 text-primary" aria-hidden />
                      <h3 className="mt-3 text-[1.375rem] font-bold">{s.title}</h3>
                      <p className="mt-2">{s.text}</p>
                    </div>
                </Reveal>
              )
            })}
          </ol>
          <p className="hand mt-10 rotate-[-3deg] text-center text-3xl text-chart-4" aria-hidden>
            {t.steps.handNote}
          </p>
        </div>
      </div>
    </section>
  )
}
