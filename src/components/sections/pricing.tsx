import { Check, Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { FIRST_SEAT, FURTHER_SEATS, NEXT_THREE_SEATS, TRIAL_DAYS, YEARLY_MONTHS_CHARGED, monthlyPrice, yearlyPrice } from '@/lib/pricing'
import { cn } from '@/lib/utils'

const MAX_SEATS = 99

// The two-card presentation, the Cloud card with a seat counter and the monthly/yearly switch; the
// seat maths stays in lib/pricing.ts (also quoted by the FAQ and the offers block in index.html).
const cloud = [
    'Opens in November 2026',
    'Hosted and updated by us',
    'Every feature of the app',
    `${TRIAL_DAYS}-day trial when it opens, no limit except sending`,
    'Your data exported if you leave',
]
const selfHosted = ['Every feature of the app', 'Unlimited seats and companies', 'Docker image and Helm chart', 'AGPL-3.0, community support']

const euros = (value: number) => `€${Number.isInteger(value) ? value.toLocaleString('en-US') : value.toFixed(2)}`

export function Pricing() {
    const [seats, setSeats] = useState(3)
    const [yearly, setYearly] = useState(false)
    const price = yearly ? yearlyPrice(seats) : monthlyPrice(seats)
    const seatWord = seats === 1 ? 'seat' : 'seats'
    const monthsOff = 12 - YEARLY_MONTHS_CHARGED

    return (
        <section id="pricing" className="mx-auto max-w-6xl px-5 py-24">
            <div className="max-w-3xl">
                <Eyebrow number="04">Pricing</Eyebrow>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">The cloud prices per seat. Self-hosting is free.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    Cloud pricing is per company and gets cheaper with every seat. Self-hosting costs nothing and holds nothing back.
                </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[7fr_5fr]">
                <div className="flex flex-col gap-6 rounded-2xl bg-card p-6 shadow-[0_0_0_1px_var(--border),0_18px_36px_rgb(10_40_60/0.08)] sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-2xl font-semibold">Cloud</h3>
                        <div role="group" aria-label="Billing period" className="flex gap-1 rounded-[10px] bg-secondary p-1">
                            {[
                                { label: 'Monthly', value: false },
                                { label: `Yearly, ${monthsOff} months off`, value: true },
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    aria-pressed={yearly === option.value}
                                    onClick={() => setYearly(option.value)}
                                    className={cn(
                                        'h-[38px] rounded-[7px] px-3.5 text-sm font-medium transition-colors',
                                        yearly === option.value ? 'bg-card text-foreground shadow-[0_1px_3px_rgb(10_40_60/0.18)]' : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="flex flex-wrap items-baseline gap-3">
                            <span className="font-mono text-6xl font-bold leading-none tracking-[-0.03em]">{euros(price)}</span>
                            <span className="text-muted-foreground">
                                excl. VAT per {yearly ? 'year' : 'month'}, for {seats} {seatWord}
                            </span>
                        </p>
                        <p className="mt-2.5 text-sm text-muted-foreground">
                            {yearly
                                ? `That is ${euros(yearlyPrice(seats) / 12)} a month: ${YEARLY_MONTHS_CHARGED} months charged for twelve.`
                                : `Switch to yearly and pay ${euros(yearlyPrice(seats))} for twelve months.`}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary px-4 py-3.5">
                        <span id="seat-label" className="text-[15px] font-medium">
                            How many people work in your company's account?
                        </span>
                        <div role="group" aria-labelledby="seat-label" className="flex items-center gap-1.5">
                            <Button variant="outline" size="icon" onClick={() => setSeats((current) => Math.max(1, current - 1))} disabled={seats <= 1} aria-label="Remove a seat" className="size-11 rounded-lg">
                                <Minus />
                            </Button>
                            <output aria-live="polite" className="min-w-11 text-center font-mono text-xl font-bold">
                                {seats}
                            </output>
                            <Button variant="outline" size="icon" onClick={() => setSeats((current) => Math.min(MAX_SEATS, current + 1))} disabled={seats >= MAX_SEATS} aria-label="Add a seat" className="size-11 rounded-lg">
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        First seat €{FIRST_SEAT}, seats 2 to 4 €{NEXT_THREE_SEATS} each, every seat after that €{FURTHER_SEATS}. Per month, in
                        euros, excluding VAT.
                    </p>

                    <ul className="grid gap-x-5 gap-y-2.5 text-[15px] sm:grid-cols-2">
                        {cloud.map((item) => (
                            <li key={item} className="flex items-center gap-2.5">
                                <Check aria-hidden="true" className="size-4 shrink-0 text-[oklch(0.55_0.12_230)] dark:text-primary" strokeWidth={3} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Button asChild className="mt-auto h-12 self-start rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={links.app}>Join the waiting list</a>
                    </Button>
                </div>

                <div className="flex flex-col gap-6 rounded-2xl bg-ink p-6 text-[oklch(0.95_0.006_230)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06),0_18px_36px_rgb(10_40_60/0.16)] sm:p-8">
                    <h3 className="text-2xl font-semibold">Self-hosted</h3>
                    <p className="flex items-baseline gap-3">
                        <span className="font-mono text-6xl font-bold leading-none tracking-[-0.03em]">€0</span>
                        <span className="text-[oklch(0.68_0.02_230)]">forever</span>
                    </p>
                    <ul className="space-y-3 text-[15px]">
                        {selfHosted.map((item) => (
                            <li key={item} className="flex items-center gap-2.5">
                                <Check aria-hidden="true" className="size-4 shrink-0 text-azure-light" strokeWidth={3} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Button variant="desk" asChild className="mt-auto h-12 self-start rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={links.selfHost}>Read the install guide</a>
                    </Button>
                </div>
            </div>

            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
                Prices in euros excluding VAT. Yearly billing charges {YEARLY_MONTHS_CHARGED} months for twelve. Past the prices, the
                real difference is who runs it: the cloud runs on our infrastructure, self-hosting runs on yours.
            </p>
        </section>
    )
}
