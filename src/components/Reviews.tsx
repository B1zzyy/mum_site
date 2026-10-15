import { Quote, Star, TriangleAlert } from 'lucide-react'
import { useLang } from '../lib/i18n'
import { FloatTitle, Reveal } from './motion'

const TILTS = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.8deg', '1deg']
const PAPER = ['bg-background', 'bg-[color-mix(in_oklab,var(--secondary)_18%,var(--background))]', 'bg-[color-mix(in_oklab,var(--chart-4)_12%,var(--background))]', 'bg-[color-mix(in_oklab,var(--accent)_16%,var(--background))]']

export function Reviews() {
  const { t, lang } = useLang()
  return (
    <section id="reviews" className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{t.reviews.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={t.reviews.titleBefore} mark={t.reviews.titleMark} className="h2 mt-4" />
          {import.meta.env.DEV && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-destructive px-3 py-2 text-sm font-bold text-destructive">
              <TriangleAlert className="size-4 shrink-0" aria-hidden />
              {t.reviews.devNote}
            </p>
          )}
        </div>

        <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {t.reviews.items.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1} className="mb-10 break-inside-avoid pt-3">
              <figure
                className={`note p-7 ${PAPER[i % PAPER.length]}`}
                style={{ ['--tilt' as string]: TILTS[i % TILTS.length], ['--tape-tilt' as string]: i % 2 ? '4deg' : '-3deg' }}
              >
                <span className="tape" aria-hidden />
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label="5 / 5">
                    {Array.from({ length: 5 }, (_, k) => (
                      <Star key={k} className="size-4.5 fill-secondary text-secondary" aria-hidden />
                    ))}
                  </div>
                  <Quote className="size-7 fill-primary/15 text-primary/40" aria-hidden />
                </div>
                <blockquote className="mt-4 font-serif text-[1.08rem] leading-relaxed text-foreground">“{r.quote}”</blockquote>
                <figcaption className="mt-5 flex items-baseline gap-2">
                  <span className="hand text-2xl text-primary">{r.name}</span>
                  <span className="text-sm font-bold text-muted-foreground">· {r.place}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
