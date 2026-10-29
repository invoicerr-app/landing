import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { FIRST_SEAT, FURTHER_SEATS, NEXT_THREE_SEATS, TRIAL_DAYS, YEARLY_MONTHS_CHARGED, monthlyPrice, yearlyPrice } from '@/lib/pricing'
import { cn } from '@/lib/utils'

const MAX_SEATS = 25

// Roméo's revision: the two-card presentation, the Cloud card with the seat slider and the
// monthly/yearly switch; the seat maths stays in lib/pricing.ts (also quoted by the FAQ and the
// offers block in index.html). No count-up, no featured border, no seat-price table.
const cloud = [
    'Opens in November 2026',
    'Hosted and updated by us',
    'Every feature of the app',
    `${TRIAL_DAYS}-day trial when it opens, no limit except sending`,
    'Your data exported if you leave',
]
const selfHosted = ['Every feature of the app', 'Unlimited seats and companies', 'Docker image and Helm chart', 'AGPL-3.0, community support']

export function Pricing() {
    const [seats, setSeats] = useState(3)
    const [yearly, setYearly] = useState(false)
    const price = yearly ? yearlyPrice(seats) : monthlyPrice(seats)

    return (
        <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">The cloud prices per seat. Self-hosting is free.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    Cloud pricing is per company and gets cheaper with every seat. Self-hosting costs nothing and holds nothing back.
                </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-[3fr_2fr]">
                <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold tracking-tight">Cloud</h3>
                        <div role="group" aria-label="Billing period" className="flex rounded-md bg-muted p-1 text-sm">
                            {[
                                { label: 'Monthly', value: false },
                                { label: 'Yearly', value: true },
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    aria-pressed={yearly === option.value}
                                    onClick={() => setYearly(option.value)}
                                    className={cn(
                                        'rounded-sm px-3 py-1.5 font-medium transition-colors',
                                        yearly === option.value ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="mt-8 flex items-baseline gap-2">
                        <span className="font-heading text-5xl font-semibold tracking-tight">
                            €{price.toLocaleString('en-US')}
                        </span>
                        <span className="text-muted-foreground">
                            excl. VAT per {yearly ? 'year' : 'month'}, for {seats} {seats === 1 ? 'seat' : 'seats'}
                        </span>
                    </p>

                    <label htmlFor="seats" className="mt-8 block text-sm font-medium">
                        How many people work in your company's account?
                    </label>
                    <input
                        id="seats"
                        type="range"
                        min={1}
                        max={MAX_SEATS}
                        value={seats}
                        onChange={(event) => setSeats(Number(event.target.value))}
                        className="mt-4 w-full accent-primary"
                    />
                    <p className="mt-3 text-sm text-muted-foreground">
                        First seat €{FIRST_SEAT}, seats 2 to 4 €{NEXT_THREE_SEATS} each, every seat after that €{FURTHER_SEATS}. Per month,
                        in euros, excluding VAT{yearly ? `; the year is charged as ${YEARLY_MONTHS_CHARGED} months` : ''}.
                    </p>

                    <div className="mt-8 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
                        <ul className="space-y-2.5 text-sm">
                            {cloud.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <Button size="lg" asChild className="h-11 shrink-0 px-6 text-base active:scale-[0.98]">
                            <a href={links.app}>Join the waiting list</a>
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg border border-border bg-card p-6 sm:p-8">
                    <h3 className="text-xl font-semibold tracking-tight">Self-hosted</h3>
                    <p className="mt-8 flex items-baseline gap-2">
                        <span className="font-heading text-5xl font-semibold tracking-tight">€0</span>
                        <span className="text-muted-foreground">forever</span>
                    </p>
                    <ul className="mt-8 space-y-2.5 text-sm">
                        {selfHosted.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <div className="mt-auto pt-8">
                        <Button size="lg" variant="outline" asChild className="h-11 w-full px-6 text-base active:scale-[0.98]">
                            <a href={links.selfHost}>Read the install guide</a>
                        </Button>
                    </div>
                </div>
            </div>

            <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
                Prices in euros excluding VAT. Yearly billing charges {YEARLY_MONTHS_CHARGED} months for twelve. Past the prices, the
                real difference is who runs it: the cloud runs on our infrastructure, self-hosting runs on yours.
            </p>
        </section>
    )
}
