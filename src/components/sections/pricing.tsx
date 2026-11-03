import { Check, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { useHome } from '@/i18n/home/context'
import { fmt } from '@/i18n/home/format'
import { links, waitlistHref } from '@/lib/links'
import { formatLocal, useLocalPrice } from '@/lib/local-price'
import { useLocale } from '@/lib/today'
import { TRIAL_DAYS, YEARLY_DISCOUNT, YEARLY_MONTHS_CHARGED, monthlyPrice, seatBands, yearlyPrice } from '@/lib/pricing'
import { cn } from '@/lib/utils'

const MAX_SEATS = 99

// The two-card presentation, the Cloud card with a seat counter and the monthly/yearly switch; the
// seat maths stays in lib/pricing.ts (also quoted by the FAQ and the offers block in index.html).

/** €15, €19.17: whole euros without decimals, the rest to the cent, in the page's locale. */
function euros(value: number, locale: string) {
    const whole = Math.abs(value - Math.round(value)) < 0.005
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(value)
}

export function Pricing() {
    const { lang, copy, locale } = useHome()
    const t = copy.pricing
    const eur = (value: number) => euros(value, locale)
    // −17 %: what yearly saves, with a real minus sign, spaced the way the locale spaces a percentage.
    const discount = `−${new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }).format(YEARLY_DISCOUNT)}`
    // The local amount in the visitor's own locale when they read the page in their own language
    // ($27 for a reader in the United States, not the US$27 of British English), in the page's
    // locale otherwise.
    const visitor = useLocale()
    const localeFor = () => (visitor.split('-')[0] === locale.split('-')[0] ? visitor : locale)
    const [seats, setSeats] = useState(3)
    const [yearly, setYearly] = useState(false)
    const local = useLocalPrice()
    const month = monthlyPrice(seats)
    const year = yearlyPrice(seats)
    // The figure that leads is always a month, so the two periods compare at a glance.
    const lead = yearly ? year / 12 : month

    return (
        <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
            <div className="max-w-3xl">
                <Eyebrow number="04">{t.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {t.lead}
                </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[7fr_5fr] lg:items-start">
                <div className="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-[0_0_0_1px_var(--border),0_18px_36px_rgb(10_40_60/0.08)] sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold">{t.cloud}</h3>
                        <div role="group" aria-label={t.period} className="flex gap-1 rounded-[10px] bg-secondary p-1">
                            {[false, true].map((value) => (
                                <button
                                    key={String(value)}
                                    type="button"
                                    aria-pressed={yearly === value}
                                    onClick={() => setYearly(value)}
                                    className={cn(
                                        'flex h-10 items-center gap-2 rounded-[7px] px-4 text-sm font-medium transition-colors',
                                        yearly === value ? 'bg-card text-foreground shadow-[0_1px_3px_rgb(10_40_60/0.18)]' : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {value ? t.yearly : t.monthly}
                                    {value && (
                                        <span dir="ltr" className="rounded-md bg-[oklch(0.9_0.07_160)] px-1.5 py-1 font-mono text-xs leading-none text-[oklch(0.36_0.08_160)] dark:bg-[oklch(0.36_0.06_160)] dark:text-[oklch(0.9_0.07_160)]">
                                            {discount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        {/* In the visitor's currency when there is one to convert to, with one line saying
                            it is an approximation from the euro; the bill below stays in euros. Euros
                            alone for the euro area, and before the rate arrives (the prerendered page). */}
                        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            {local && <span className="font-heading text-4xl font-medium leading-none text-muted-foreground">≈</span>}
                            <span className="font-heading text-6xl font-medium leading-none tracking-[-0.03em] tabular-nums">{local ? formatLocal(lead, local, localeFor()) : eur(lead)}</span>
                            <span className="text-lg text-muted-foreground">{t.perMonth}</span>
                            {yearly && (
                                <s className="font-heading text-2xl text-muted-foreground tabular-nums decoration-[1.5px]">{local ? formatLocal(month, local, localeFor()) : eur(month)}</s>
                            )}
                        </p>
                        {local && <p className="mt-3 text-[15px] text-muted-foreground">{fmt(t.local, { source: t.sources[local.source] })}</p>}
                    </div>

                    <div className="rounded-xl bg-secondary px-4 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <span id="seat-label" className="text-[15px] font-medium">
                                {t.seatQuestion}
                            </span>
                            <div role="group" aria-labelledby="seat-label" className="flex items-center gap-1.5">
                                <Button variant="outline" size="icon" onClick={() => setSeats((current) => Math.max(1, current - 1))} aria-disabled={seats <= 1} aria-label={t.removeSeat} className="size-11 rounded-lg aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                    <Minus />
                                </Button>
                                <output aria-live="polite" className="min-w-11 text-center font-mono text-xl tabular-nums">
                                    {seats}
                                </output>
                                <Button variant="outline" size="icon" onClick={() => setSeats((current) => Math.min(MAX_SEATS, current + 1))} aria-disabled={seats >= MAX_SEATS} aria-label={t.addSeat} className="size-11 rounded-lg aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        {/* The bill, line by line: which band each seat falls in and what it adds. */}
                        <dl className="mt-4 border-t border-dashed border-border pt-3 font-mono text-sm tabular-nums">
                            {seatBands(seats).map((band) => (
                                <div key={band.band} className={cn('flex items-baseline gap-2 py-1', band.count === 0 && 'text-muted-foreground')}>
                                    {/* The dotted leader is the term's own ::after: nothing but dt and dd may sit in a dl's group. */}
                                    <dt className="flex flex-1 items-baseline font-sans after:ms-2 after:min-w-4 after:flex-1 after:translate-y-[-3px] after:border-b after:border-dotted after:border-border after:content-['']">
                                        {t.bands[band.band]}
                                    </dt>
                                    <dd className="shrink-0 text-muted-foreground">
                                        {band.count} × {eur(band.unit)}
                                    </dd>
                                    <dd className="w-20 shrink-0 text-end">{eur(band.count * band.unit)}</dd>
                                </div>
                            ))}
                            <div className="mt-2 flex items-baseline gap-2 border-t border-border pt-2 font-medium">
                                <dt className="flex-1 font-sans">{t.totalMonth}</dt>
                                <dd className="w-20 shrink-0 text-end">{eur(month)}</dd>
                            </div>
                            {yearly && (
                                <div className="flex items-baseline gap-2 py-1 font-medium">
                                    <dt className="flex-1 font-sans">{fmt(t.totalYear, { charged: YEARLY_MONTHS_CHARGED, free: 12 - YEARLY_MONTHS_CHARGED })}</dt>
                                    <dd className="w-20 shrink-0 text-end">{eur(year)}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <ul className="grid gap-x-5 gap-y-2.5 text-[15px] sm:grid-cols-2">
                        {t.cloudItems.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[oklch(0.55_0.12_230)] dark:text-primary" strokeWidth={2.5} />
                                {fmt(item, { days: TRIAL_DAYS })}
                            </li>
                        ))}
                    </ul>
                    <Button asChild className="mt-auto h-12 self-start rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={waitlistHref(lang)}>{copy.header.joinWaitlist}</a>
                    </Button>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl bg-ink p-6 text-[oklch(0.95_0.006_230)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_18px_36px_rgb(10_40_60/0.16)] sm:p-8">
                    <h3 className="text-2xl font-semibold">{t.selfHosted}</h3>
                    <p className="flex items-baseline gap-3">
                        <span className="font-heading text-6xl font-medium leading-none tracking-[-0.03em] tabular-nums">{eur(0)}</span>
                        <span className="text-lg text-[oklch(0.68_0.02_230)]">{t.forever}</span>
                    </p>
                    <ul className="space-y-3 text-[15px]">
                        {t.selfItems.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-azure-light" strokeWidth={2.5} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Button variant="desk" asChild className="mt-auto h-12 self-start rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={links.selfHost}>{copy.hosting.installGuide}</a>
                    </Button>
                </div>
            </div>

            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
                {fmt(t.footnote, { charged: YEARLY_MONTHS_CHARGED })}
            </p>
        </section>
    )
}
