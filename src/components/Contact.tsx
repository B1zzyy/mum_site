import { ArrowUpRight, CalendarHeart, Check, MessageCircle, Phone } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { config } from '../content'
import { useLang } from '../lib/i18n'
import { detectTimeZone } from '../lib/time'
import { FloatTitle, Magnet, Reveal } from './motion'

const waLink = (text?: string) => `https://wa.me/${config.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`
const viberLink = `viber://chat?number=${encodeURIComponent(config.viberNumber)}`

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-foreground">{label}</span>
      {children}
    </label>
  )
}

export function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const defaultLocation = useMemo(() => detectTimeZone().split('/').pop()!.replace(/_/g, ' '), [])
  const [form, setForm] = useState({ parent: '', child: '', age: '', level: '', location: defaultLocation, times: '', message: '' })
  const [viberCopied, setViberCopied] = useState(false)
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = [
      c.waGreeting,
      '',
      `${c.msg.parentName}: ${form.parent}`,
      form.child && `${c.msg.childName}: ${form.child}`,
      form.age && `${c.msg.childAge}: ${form.age}`,
      form.level && `${c.msg.level}: ${form.level}`,
      form.location && `${c.msg.location}: ${form.location} (${detectTimeZone()})`,
      form.times && `${c.msg.times}: ${form.times}`,
      form.message && `\n${form.message}`,
    ].filter(Boolean)
    const text = lines.join('\n')

    // Viber can't open a chat with a message already typed, so copy it for the parent to paste.
    if ((e.nativeEvent as SubmitEvent).submitter?.dataset.app === 'viber') {
      try {
        await navigator.clipboard.writeText(text)
        setViberCopied(true)
      } catch {
        // Clipboard blocked: still open Viber so they can type it themselves.
      }
      window.location.href = viberLink
      return
    }
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <section id="book" className="section overflow-x-clip">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{c.eyebrow}</span>
          </Reveal>
          <FloatTitle key={lang} before={c.titleBefore} mark={c.titleMark} className="h2 mt-4" />
          <Reveal delay={0.1}>
            <p className="lead mt-6">{c.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="h-full">
            <div className="card relative flex h-full flex-col justify-center overflow-hidden border-primary bg-primary p-8 text-primary-foreground hover:border-primary sm:p-10">
              <span
                className="pointer-events-none absolute -right-6 -top-10 select-none font-serif text-[11rem] font-black leading-none text-primary-foreground/10"
                aria-hidden
              >
                Ю
              </span>
              <CalendarHeart className="size-10 text-secondary" aria-hidden />
              <h3 className="mt-5 text-3xl font-black text-primary-foreground">{c.calendarTitle}</h3>
              <p className="mt-2 max-w-sm text-lg text-primary-foreground/85">{c.calendarText}</p>
              <Magnet className="mt-7">
                <a
                  href={config.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn min-h-14 bg-secondary px-7 text-lg text-secondary-foreground shadow-[0_4px_0_0_var(--secondary-foreground)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
                >
                  {c.calendarCta}
                  <ArrowUpRight className="size-5" aria-hidden />
                </a>
              </Magnet>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="card relative h-full p-6 sm:p-8">
              <span className="tape" aria-hidden />
              <h3 className="text-2xl font-black">{c.messageTitle}</h3>
              <p className="mt-2">{c.messageText}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label={c.parentName}>
                  <input className="input" required autoComplete="name" value={form.parent} onChange={set('parent')} />
                </Field>
                <Field label={c.childName}>
                  <input className="input" value={form.child} onChange={set('child')} />
                </Field>
                <Field label={c.childAge}>
                  <select className="input" value={form.age} onChange={set('age')}>
                    <option value="">—</option>
                    {Array.from({ length: 11 }, (_, i) => i + 4).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={c.location}>
                  <input className="input" value={form.location} onChange={set('location')} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label={c.level}>
                    <select className="input" value={form.level} onChange={set('level')}>
                      <option value="">—</option>
                      {c.levels.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label={c.times}>
                    <input className="input" placeholder={c.timesPlaceholder} value={form.times} onChange={set('times')} />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label={c.message}>
                    <textarea className="input min-h-24 resize-y" rows={3} required value={form.message} onChange={set('message')} />
                  </Field>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="submit" data-app="whatsapp" className="btn btn-whatsapp w-full">
                  <MessageCircle className="size-5" aria-hidden />
                  {c.submit}
                </button>
                <button type="submit" data-app="viber" className="btn btn-viber w-full">
                  <Phone className="size-5" aria-hidden />
                  {c.submitViber}
                </button>
              </div>
              {viberCopied && (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm font-bold text-foreground" role="status">
                  <Check className="size-4 text-viber" aria-hidden />
                  {c.viberCopied}
                </p>
              )}
              <p className="mt-3 text-center text-sm font-semibold text-muted-foreground">{c.formNote}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
