import { AnimatePresence, motion } from 'motion/react'
import { CalendarHeart, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { config } from '../content'
import { useLang } from '../lib/i18n'

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className={`relative inline-flex rounded-full border-2 border-border bg-background p-1 ${className}`}
    >
      {(['bg', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 min-h-9 min-w-11 rounded-full px-3 text-sm font-bold uppercase transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring ${
            lang === l ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-thumb"
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {l === 'bg' ? 'БГ' : 'EN'}
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    ['#times', t.nav.times],
    ['#about', t.nav.about],
    ['#lessons', t.nav.lessons],
    ['#reviews', t.nav.reviews],
    ['#faq', t.nav.faq],
  ] as const

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow] duration-300 data-[scrolled=true]:bg-background/85 data-[scrolled=true]:shadow-[0_1px_0_var(--border)] data-[scrolled=true]:backdrop-blur-md"
    >
      <nav className="container-page flex h-18 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 rounded-xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring">
          <span className="grid size-10 place-items-center rounded-xl bg-primary font-serif text-xl font-black text-secondary shadow-md transition-transform duration-300 group-hover:-rotate-6">
            Б
          </span>
          <span className="font-serif text-lg font-black text-foreground">{t.teacher.name}</span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-full px-3.5 py-2 text-[0.95rem] font-bold text-body transition-colors hover:bg-muted hover:text-primary focus-visible:outline-3 focus-visible:outline-ring"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:inline-flex" />
          <a href={config.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-primary hidden min-h-11 md:inline-flex">
            <CalendarHeart className="size-4.5" aria-hidden />
            {t.nav.book}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn btn-ghost size-12 p-0 xl:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background px-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] xl:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
          >
            <div className="flex items-center justify-between">
              <LangToggle />
              <button type="button" onClick={() => setOpen(false)} className="btn btn-ghost size-12 p-0" aria-label={t.nav.close}>
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {links.map(([href, label], i) => (
                <motion.li key={href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-2 py-3 font-serif text-3xl font-black text-foreground transition-colors hover:text-primary focus-visible:outline-3 focus-visible:outline-ring"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={config.calendlyUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-auto w-full">
              <CalendarHeart className="size-5" aria-hidden />
              {t.nav.book}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
