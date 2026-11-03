import { useSyncExternalStore } from 'react'

/**
 * "Now", for the sample documents of the home page: the invoice on the desk, the phone's lock screen,
 * the folders of the flow and the postmark. They are dated relative to the day the page is read, so
 * the page never shows a paid invoice from a month ago.
 *
 * The page is prerendered (scripts/prerender.mjs), so the HTML a crawler or a reader without
 * JavaScript receives carries the build day, at 09:41. The browser hydrates with that same value,
 * then switches to its own clock and keeps it current, minute by minute.
 */
const BUILD_NOW = new Date(`${__BUILD_DAY__}T09:41:00`).getTime()

const MINUTE = 60_000

function currentMinute() {
    return Math.floor(Date.now() / MINUTE) * MINUTE
}

function subscribe(onChange: () => void) {
    let timer = 0
    const tick = () => {
        onChange()
        timer = window.setTimeout(tick, MINUTE - (Date.now() % MINUTE) + 50)
    }
    timer = window.setTimeout(tick, MINUTE - (Date.now() % MINUTE) + 50)
    return () => window.clearTimeout(timer)
}

/** The current date and time, to the minute. */
export function useNow(): Date {
    const time = useSyncExternalStore(subscribe, currentMinute, () => BUILD_NOW)
    return new Date(time)
}

export function addDays(date: Date, days: number) {
    const next = new Date(date)
    next.setDate(next.getDate() + days)
    return next
}

export function addYears(date: Date, years: number) {
    const next = new Date(date)
    next.setFullYear(next.getFullYear() + years)
    return next
}

const pad = (value: number) => String(value).padStart(2, '0')

/** 2 Nov 2026 */
export const shortDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/** 02 NOV 2026, as a date stamp prints it. */
export const stampDate = (date: Date) => `${pad(date.getDate())} ${date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase().slice(0, 3)} ${date.getFullYear()}`

/** NOV 2026 */
export const monthYear = (date: Date) => `${date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase().slice(0, 3)} ${date.getFullYear()}`

/** November */
export const monthName = (date: Date) => date.toLocaleDateString('en-GB', { month: 'long' })

/** Monday 2 November */
export const lockScreenDate = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '')

const noop = () => () => {}

/**
 * The visitor's locale, for the phone's clock: 24-hour in France, 12-hour in the United States. The
 * prerendered HTML and the hydration use a fixed 24-hour locale, so they match; the browser's own
 * locale takes over right after.
 */
export function useLocale(): string {
    return useSyncExternalStore(noop, () => navigator.language || 'en-GB', () => 'en-GB')
}

/**
 * The time in the visitor's locale, split so the AM/PM can be set smaller: { time: '09:41',
 * period: '' } where the clock runs on 24 hours, { time: '9:41', period: 'AM' } where it runs on 12.
 */
export function clock(date: Date, locale: string): { time: string; period: string } {
    try {
        const parts = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).formatToParts(date)
        const period = parts.find((part) => part.type === 'dayPeriod')?.value ?? ''
        const time = parts
            .filter((part) => part.type === 'hour' || part.type === 'minute' || (part.type === 'literal' && part.value.trim()))
            .map((part) => (period && part.type === 'hour' ? String(Number(part.value)) : part.value))
            .join('')
        return { time, period }
    } catch {
        return { time: `${pad(date.getHours())}:${pad(date.getMinutes())}`, period: '' }
    }
}

/** 2036-11-02 */
export const isoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
