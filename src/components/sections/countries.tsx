import { Archive, FileCode2, Send } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import { type CountryFacts, countries } from '@/data/countries'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

function factsFor(country: CountryFacts) {
    return [
        country.format && { icon: FileCode2, label: 'E-invoice format', value: country.format, detail: 'Generated next to the PDF, validated before it leaves.' },
        { icon: Send, label: 'Sent through', value: country.channel.name, detail: country.channel.detail },
        country.retention && {
            icon: Archive,
            label: 'Legal archive',
            value: `${country.retention.years} years`,
            detail: `Kept and hashed for as long as ${country.retention.source} asks.`,
        },
    ].filter((fact) => !!fact)
}

export function Countries() {
    const [code, setCode] = useState(countries[0].code)

    return (
        <section id="countries" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <Reveal className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Most tools hardcode one country. Invoicerr reads the rules from data.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    Pick where your company bills from. The identifiers, the VAT rates, the e-invoice format and the way it reaches the
                    tax office all follow, each one tied to the legal text it comes from.
                </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[14rem_minmax(0,1fr)]">
                <div role="tablist" aria-label="Country" className="flex min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                    {countries.map((entry) => {
                        const active = entry.code === code
                        return (
                            <button
                                key={entry.code}
                                id={`country-tab-${entry.code}`}
                                role="tab"
                                type="button"
                                aria-selected={active}
                                aria-controls={`country-panel-${entry.code}`}
                                onClick={() => setCode(entry.code)}
                                className={cn(
                                    'relative flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                                    active ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                {active && <motion.span layoutId="country-pill" className="absolute inset-0 rounded-lg bg-accent" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                                <span className="relative font-mono text-xs opacity-70">{entry.code}</span>
                                <span className="relative">{entry.name}</span>
                            </button>
                        )
                    })}
                </div>

                {/*
                    All five panels stay in the markup, the inactive ones collapsed by `hidden`. Only the
                    selected country used to be rendered, which left four fifths of this section — the
                    formats, the channels, the retention citations — out of the HTML a reader or a crawler
                    receives. It also gives the tablist above the tabpanels it was already claiming to
                    control. The swap animation moved to `.panel-swap` in src/index.css, which restarts on
                    its own each time `hidden` flips.
                */}
                <div className="min-w-0">
                    {countries.map((country) => (
                        <div
                            key={country.code}
                            id={`country-panel-${country.code}`}
                            role="tabpanel"
                            aria-labelledby={`country-tab-${country.code}`}
                            hidden={country.code !== code}
                        >
                            <div className="panel-swap grid min-w-0 gap-4 rounded-2xl border border-border bg-card p-5 sm:p-8 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium">Company settings</p>
                                    <p className="mt-1 text-sm text-muted-foreground">What the app asks a company in {country.name}.</p>
                                    <div className="mt-6 space-y-4">
                                        {country.identifiers.map((identifier) => (
                                            <div key={identifier.label}>
                                                <p className="mb-1.5 text-sm font-medium">
                                                    {identifier.label}
                                                    {identifier.required && <span className="ml-1 text-destructive">*</span>}
                                                </p>
                                                <div className="flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm text-muted-foreground/70">
                                                    {identifier.hint}
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <p className="mb-1.5 text-sm font-medium">VAT rates on a new line</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {country.vatRates.map((rate) => (
                                                    <span key={rate} className="rounded-md bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground">
                                                        {rate}%
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <dl className="space-y-3 md:border-l md:border-border md:pl-8">
                                    {factsFor(country).map((fact) => (
                                        <div key={fact.label} className="flex gap-4 rounded-xl bg-muted/50 p-4">
                                            <fact.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                                            <div>
                                                <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                                                <dd className="mt-0.5 font-heading text-xl font-semibold tracking-tight">{fact.value}</dd>
                                                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{fact.detail}</dd>
                                            </div>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>

            <p className="mt-6 text-sm text-muted-foreground">
                Five countries ship today. A new one is a set of data files, not a fork.{' '}
                <a href={links.countries} className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                    See the country support matrix
                </a>
            </p>
        </section>
    )
}
