import { config } from '../content'

type Window = { from: number; to: number }

/** Minutes the zone is ahead of UTC at the given instant (handles summer/winter time). */
export function tzOffsetMinutes(timeZone: string, at: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(at)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return Math.round((asUtc - Math.floor(at.getTime() / 1000) * 1000) / 60000)
}

export function detectTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || config.teacherTimeZone
  } catch {
    return config.teacherTimeZone
  }
}

/** Hours between the teacher's clock and the viewer's clock (viewer − teacher). */
export function hourShift(viewerTz: string, at: Date = new Date()): number {
  return (tzOffsetMinutes(viewerTz, at) - tzOffsetMinutes(config.teacherTimeZone, at)) / 60
}

export type Converted = {
  from: number // viewer-local hour, normalised to 0–24
  to: number
  dayShift: -1 | 0 | 1 // relative to the teacher's day, for the start time
  segments: Window[] // pieces that fit on a 0–24 track
}

export function convertWindow(w: Window, shift: number): Converted {
  const rawFrom = w.from + shift
  const rawTo = w.to + shift
  const dayShift = rawFrom < 0 ? -1 : rawFrom >= 24 ? 1 : 0
  const from = ((rawFrom % 24) + 24) % 24
  const len = rawTo - rawFrom
  const to = from + len
  const segments = to <= 24 ? [{ from, to }] : [{ from, to: 24 }, { from: 0, to: to - 24 }]
  return { from, to: ((rawTo % 24) + 24) % 24 || 24, dayShift, segments }
}

export function formatHour(h: number): string {
  const total = Math.round(h * 60)
  const hh = Math.floor(total / 60) % 24
  const mm = ((total % 60) + 60) % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

/** Current local hour (fractional) in a zone. */
export function hourNow(timeZone: string, at: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hourCycle: 'h23', hour: '2-digit', minute: '2-digit' }).formatToParts(at)
  const h = Number(parts.find((p) => p.type === 'hour')?.value)
  const m = Number(parts.find((p) => p.type === 'minute')?.value)
  return h + m / 60
}

function teacherClock(at: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: config.teacherTimeZone,
    hourCycle: 'h23',
    weekday: 'short',
    hour: '2-digit',
  }).formatToParts(at)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const hour = Number(parts.find((p) => p.type === 'hour')?.value)
  return { weekend: weekday === 'Sat' || weekday === 'Sun', hour }
}

/** The next full hour (at least 2h from now) when she is free to teach. */
export function nextFreeSlot(now: Date = new Date()): Date | null {
  const start = new Date(Math.ceil((now.getTime() + 2 * 3600_000) / 3600_000) * 3600_000)
  for (let i = 0; i < 24 * 8; i++) {
    const t = new Date(start.getTime() + i * 3600_000)
    const { weekend, hour } = teacherClock(t)
    const w = weekend ? config.schedule.weekend : config.schedule.weekday
    if (hour >= w.from && hour < w.to) return t
  }
  return null
}

/** Calendar-day difference between two instants as seen in `timeZone`. */
export function dayDiff(a: Date, b: Date, timeZone: string): number {
  const key = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
  const da = Date.parse(key(a))
  const db = Date.parse(key(b))
  return Math.round((db - da) / 86400_000)
}
