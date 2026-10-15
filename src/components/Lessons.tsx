import { motion, useReducedMotion } from 'motion/react'
import { BookOpenText, ClipboardCheck, GraduationCap, Laptop, MessagesSquare, PencilLine, SpellCheck } from 'lucide-react'
import { useLang } from '../lib/i18n'
import { FloatTitle, Reveal, spotlightMove } from './motion'

const ICONS = [PencilLine, MessagesSquare, GraduationCap, BookOpenText, SpellCheck, Laptop, ClipboardCheck]
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']
const CHIP = [
  'bg-secondary text-secondary-foreground',
  'bg-chart-4/20 text-foreground',
  'bg-primary/10 text-primary',
  'bg-chart-5/20 text-foreground',
  'bg-accent/25 text-accent-foreground',
  'bg-background text-foreground',
  'bg-primary/10 text-primary',
]
const TONE = ['bg-primary border-primary', '', '', '', '', 'bg-secondary border-secondary', '']

function Letters() {
  const reduce = useReducedMotion()
  const letters = ['А', 'Б', 'В', 'Г']
  const colors = ['text-secondary', 'text-accent', 'text-chart-4', 'text-chart-5']
  return (
    <div className="pointer-events-none absolute -bottom-4 right-4 flex select-none gap-1 sm:right-8" aria-hidden>
      {letters.map((l, i) => (
        <motion.span
          key={l}
          className={`font-serif text-7xl font-black sm:text-8xl ${colors[i]} [text-shadow:0_4px_0_rgba(var(--foreground-rgb),.18)]`}
          initial={reduce ? false : { y: 80, rotate: 0 }}
          whileInView={{ y: 0, rotate: [-8, 6, -4, 9][i] }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 + i * 0.1 }}
        >
          {l}
        </motion.span>
      ))}
    </div>
  )
}

export function Lessons() {
  const { t, lang } = useLang()
  return (
    <section id="lessons" className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.lessons.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.lessons.titleBefore} mark={t.lessons.titleMark} className="h2 mt-4" />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {t.lessons.items.map((item, i) => {
            const Icon = ICONS[i]
            const dark = i === 0
            return (
              <Reveal key={i} delay={(i % 3) * 0.08} className={`${SPANS[i]} ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <article
                  onPointerMove={spotlightMove}
                  className={`card spotlight flex h-full flex-col ${TONE[i]} ${i === 0 ? 'min-h-80 pb-28 lg:min-h-0' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`grid size-12 place-items-center rounded-2xl ${CHIP[i]}`}>
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <span
                      className={`badge ${dark ? 'bg-primary-foreground/15 text-primary-foreground' : i === 5 ? 'bg-background/70 text-secondary-foreground' : 'badge-ink'}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <h3
                    className={`mt-6 text-[1.375rem] font-bold leading-snug ${dark ? 'text-[1.75rem] text-primary-foreground sm:text-3xl' : ''} ${i === 5 ? 'text-secondary-foreground' : ''}`}
                  >
                    {item.title}
                  </h3>
                  <p className={`mt-2 max-w-lg ${dark ? 'text-lg text-primary-foreground/85' : i === 5 ? 'text-secondary-foreground/85' : ''}`}>{item.text}</p>
                  {i === 0 && <Letters />}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
