import { motion, useReducedMotion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useLang } from '../lib/i18n'

const WORD = 'БЛАГОДАРЯ'
const COLORS = ['var(--primary)', 'var(--chart-5)', 'var(--accent)', 'var(--chart-4)', 'var(--secondary)']

/** Footer easter egg: magnet letters fall onto the page and spell "thank you". */
export function Footer() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  return (
    <footer className="relative overflow-hidden border-t-2 border-border bg-background pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] pt-20">
      <div className="container-page text-center">
        <p className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2" lang="bg" aria-label={WORD}>
          {Array.from(WORD).map((ch, i) => (
            <motion.span
              key={i}
              className="magnet cursor-default text-[clamp(2.6rem,9vw,6.5rem)]"
              style={{ ['--m-color' as string]: COLORS[i % COLORS.length] }}
              initial={reduce ? false : { y: -260, opacity: 0, rotate: (i % 2 ? 1 : -1) * 30 }}
              whileInView={{ y: 0, opacity: 1, rotate: [-6, 5, -3, 7, -5, 4, -7, 3, 6][i] }}
              whileHover={{ y: -10, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 11, delay: i * 0.07 }}
              aria-hidden
            >
              {ch}
            </motion.span>
          ))}
        </p>
        <p className="hand mt-4 text-3xl text-foreground">{t.footer.thanks}</p>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t-2 border-dashed border-border pt-8 text-sm font-semibold text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t.teacher.name} · {t.footer.tagline}
          </p>
          <a href="#top" className="btn btn-ghost min-h-11 text-sm">
            <ArrowUp className="size-4" aria-hidden />
            {t.footer.top}
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Motion effects inspired by{' '}
          <a className="link" href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
            react-bits
          </a>{' '}
          by DavidHDev (MIT).
        </p>
      </div>
    </footer>
  )
}
