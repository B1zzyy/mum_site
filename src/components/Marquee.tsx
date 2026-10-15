import { Sparkle } from 'lucide-react'
import { marqueeWords } from '../content'

function Track({ reverse = false, tone }: { reverse?: boolean; tone: 'ink' | 'sun' }) {
  const items = [...marqueeWords, ...marqueeWords]
  return (
    <div className="marquee overflow-hidden">
      <ul className="marquee-track" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {items.map(([bg, en], i) => (
          <li key={i} className="flex shrink-0 items-center gap-4 px-6 py-4" aria-hidden={i >= marqueeWords.length}>
            <span lang="bg" className={`font-serif text-3xl font-black sm:text-4xl ${tone === 'ink' ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
              {bg}
            </span>
            <span className={`hand text-2xl ${tone === 'ink' ? 'text-secondary' : 'text-primary'}`}>{en}</span>
            <Sparkle className={`ml-4 size-5 ${tone === 'ink' ? 'fill-accent text-accent' : 'fill-chart-4 text-chart-4'}`} aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Two crossing ribbons of Bulgarian words, like tape across the notebook. */
export function Marquee() {
  return (
    <section aria-label="Bulgarian words" className="relative z-10 -my-4 overflow-x-clip py-20">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3.5deg] bg-secondary shadow-md">
        <Track reverse tone="sun" />
      </div>
      <div className="relative -rotate-[2.5deg] bg-primary shadow-xl" style={{ marginInline: '-5%' }}>
        <Track tone="ink" />
      </div>
    </section>
  )
}
