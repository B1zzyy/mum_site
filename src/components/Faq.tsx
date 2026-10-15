import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { useLang } from '../lib/i18n'
import { FloatTitle, Reveal } from './motion'

export function Faq() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <section id="faq" className="section bg-muted/60">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow">{t.faq.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.faq.titleBefore} mark={t.faq.titleMark} className="h2 mt-4" />
        </div>

        <ul className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            const id = `${base}-${i}`
            return (
              <Reveal key={i} as="li" delay={i * 0.05}>
                <div className={`rounded-2xl border-2 bg-background transition-colors ${isOpen ? 'border-primary shadow-md' : 'border-border hover:border-line'}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-lg font-bold text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {item.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className={`grid size-9 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                      >
                        <Plus className="size-5" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={id}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
