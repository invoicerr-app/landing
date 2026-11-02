import { useState } from 'react'

import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { type CountryFacts, countries } from '@/data/countries'
import { platformGroups } from '@/data/platforms'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

// The fields of the settings sheet, read from data/countries.ts. A field is only shown when the
// catalogue holds it, so Italy has no archive line and Portugal no format: the uneven shape is the
// point, and no placeholder stands in for a value the app does not have.
function fieldsFor(country: CountryFacts) {
    return [
        ...country.identifiers.map((identifier) => ({
            label: identifier.required ? 'Identifier, required' : 'Identifier',
            value: identifier.label,
            detail: identifier.hint,
            key: identifier.label,
        })),
        country.format && { label: 'E-invoice format', value: country.format, detail: 'Generated next to the PDF, validated before it leaves.', key: 'format' },
        { label: 'Sent through', value: country.channel.name, detail: country.channel.detail, key: 'channel' },
    ].filter((field) => !!field)
}

// Every approved platform the app sends through, with the "everywhere else" e-mail left out: the
// box is about the platforms, and e-mail is said once, in the countries that use it.
const platformNames = platformGroups.filter((group) => group.id !== 'email').flatMap((group) => group.names)

const label = 'font-mono text-xs uppercase tracking-[0.06em] text-[oklch(0.47_0.02_230)]'

export function Countries() {
    const [code, setCode] = useState(countries[0].code)

    return (
        <section id="countries" className="mx-auto max-w-6xl px-5 pb-24 pt-6">
            <div className="flex flex-wrap items-end justify-between gap-7">
                <div className="max-w-3xl">
                    <Eyebrow number="01">Countries</Eyebrow>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Five countries' invoicing rules, built in.</h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        Pick where your company bills from. The identifiers, the VAT rates, the e-invoice format and the way it reaches the
                        tax office all follow, each one tied to the legal text it comes from.
                    </p>
                </div>
                <Button variant="secondary" asChild className="h-11 rounded-[10px] px-5">
                    <a href={links.countries}>Country support matrix</a>
                </Button>
            </div>

            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
                <div className="flex flex-col gap-6">
                    <div role="tablist" aria-label="Country" className="flex flex-wrap gap-2">
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
                                        'h-11 rounded-lg border px-4 text-[15px] font-medium transition-colors',
                                        active ? 'border-ink bg-ink text-white dark:border-primary dark:bg-primary dark:text-primary-foreground' : 'border-border bg-card text-secondary-foreground hover:bg-accent',
                                    )}
                                >
                                    {entry.name}
                                </button>
                            )
                        })}
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                        Five countries ship today. A new one adds its data files in the same shape, and the app reads them.
                    </p>

                    <div id="platforms" className="scroll-mt-24 rounded-[14px] bg-secondary p-6 shadow-[inset_0_0_0_1px_var(--border)]">
                        <h3 className="text-[17px] font-semibold">Already connected to France's approved platforms.</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            Four approved platforms and Chorus Pro in France, the SdI in Italy and KSeF in Poland. You choose the channel in
                            your company settings.
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {platformNames.map((name) => (
                                <li key={name} className="rounded-md bg-card px-2.5 py-2 font-mono text-[13px] leading-none shadow-[0_0_0_1px_var(--border)]">
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                            Invoicerr is invoicing software, not an approved platform itself: it builds the invoice, the platform delivers it.{' '}
                            <a
                                href="/facturation-electronique/plateforme-agreee/"
                                lang="fr"
                                hrefLang="fr"
                                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
                            >
                                Choisir sa plateforme agréée
                            </a>
                        </p>
                    </div>
                </div>

                {/* A clipboard: the settings sheet held under a steel clip. All five sheets stay in
                    the markup, the inactive ones collapsed by `hidden`, so a crawler reads every
                    country's formats, channels and retention citations. */}
                <div className="relative rotate-[0.6deg] rounded-[20px] bg-gradient-to-br from-[rgb(57_192_246/0.55)] to-[rgb(0_153_203/0.75)] px-4 pb-4 pt-12 shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_0_0_1px_rgb(255_255_255/0.2),0_24px_40px_rgb(0_80_120/0.22)]">
                    <div aria-hidden="true" className="absolute -top-3.5 left-1/2 h-[54px] w-40 -translate-x-1/2 rounded-xl bg-gradient-to-b from-[#f2f4f4] via-[#a9afb2] to-[#d7dbdc] shadow-[inset_0_1px_0_#fff,0_6px_10px_rgb(3_12_18/0.3)]">
                        <div className="absolute left-1/2 top-3 h-3 w-11 -translate-x-1/2 rounded-md bg-[#6d7376] shadow-[inset_0_2px_3px_rgb(0_0_0/0.5)]" />
                    </div>
                    {countries.map((country) => (
                        <div
                            key={country.code}
                            id={`country-panel-${country.code}`}
                            role="tabpanel"
                            aria-labelledby={`country-tab-${country.code}`}
                            hidden={country.code !== code}
                        >
                            <div className="panel-swap rounded bg-paper px-6 pb-6 pt-7 text-ink shadow-[0_2px_4px_rgb(3_30_45/0.2)] sm:px-7">
                                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[oklch(0.89_0.01_230)] pb-4">
                                    <p className="font-heading text-[19px] font-semibold">Company settings</p>
                                    <p className="text-sm text-[oklch(0.47_0.02_230)]">What the app asks a company in {country.name}.</p>
                                </div>
                                <dl className="grid sm:grid-cols-2">
                                    {fieldsFor(country).map((field) => (
                                        <div key={field.key} className="border-b border-dashed border-[oklch(0.89_0.01_230)] py-4 sm:odd:pr-4 sm:even:pl-4">
                                            <dt className={label}>{field.label}</dt>
                                            <dd className="mt-2 font-semibold">{field.value}</dd>
                                            {field.detail && <dd className="mt-1 text-[13px] leading-snug text-[oklch(0.47_0.02_230)]">{field.detail}</dd>}
                                        </div>
                                    ))}
                                    <div className="border-b border-dashed border-[oklch(0.89_0.01_230)] py-4 sm:odd:pr-4 sm:even:pl-4">
                                        <dt className={label}>VAT rates on a new line</dt>
                                        <dd className="mt-2.5 flex flex-wrap gap-1.5">
                                            {country.vatRates.map((rate) => (
                                                <span key={rate} className="rounded-md bg-[oklch(0.91_0.03_230)] px-2 py-1.5 font-mono text-[13px] font-bold leading-none text-[oklch(0.28_0.05_230)]">
                                                    {rate}%
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                </dl>
                                {country.retention && (
                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                                        <div>
                                            <p className={label}>Legal archive</p>
                                            <p className="mt-2 font-semibold">{country.retention.years} years</p>
                                        </div>
                                        <p className="rounded-lg bg-[oklch(0.94_0.008_230)] px-2.5 py-2 text-[13px] text-[oklch(0.28_0.03_230)]">
                                            Kept and hashed for as long as {country.retention.source} asks.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
