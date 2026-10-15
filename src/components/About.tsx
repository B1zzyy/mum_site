import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useLang } from '../lib/i18n'
import { CountUp, FloatTitle, Reveal, ScrollRevealText } from './motion'

const STAT_TONES = ['bg-primary text-primary-foreground', 'bg-secondary text-secondary-foreground', 'bg-accent text-accent-foreground']

export function About() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section id="about" className="section bg-muted/60">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div ref={ref} className="relative mx-auto w-full max-w-md">
          <motion.div style={{ y: imgY }} className="relative -rotate-2 rounded-md bg-background p-3 shadow-2xl ring-1 ring-border">
            <span className="tape" aria-hidden />
            <img src="/img/books.jpg" alt={t.about.booksAlt} loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover" width={900} height={1100} />
          </motion.div>
          <p className="hand absolute -bottom-6 -right-2 rotate-[-5deg] rounded-xl bg-secondary px-4 py-1.5 text-3xl text-secondary-foreground shadow-lg sm:-right-8" aria-hidden>
            {t.about.signature}
          </p>
        </div>

        <div>
          <Reveal>
            <span className="eyebrow">{t.about.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.about.titleBefore} mark={t.about.titleMark} className="h2 mt-4" />
          <ScrollRevealText
            key={`story-${lang}`}
            text={t.about.story}
            className="mt-8 font-serif text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.65] text-foreground"
          />

          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-5">
            {t.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="card h-full p-4 text-center sm:p-6">
                  <p className={`mx-auto inline-block rounded-2xl px-3 py-1 font-serif text-3xl font-black sm:text-4xl ${STAT_TONES[i]}`}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-bold leading-snug text-body sm:text-base">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
