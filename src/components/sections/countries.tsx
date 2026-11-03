import { useState } from 'react'

import { ClipboardClip } from '@/components/desk/props'
import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { type CountryFacts, countries } from '@/data/countries'
import { platformGroups } from '@/data/platforms'
import type { HomeCopy } from '@/i18n/home/en'
import { useHome } from '@/i18n/home/context'
import { fmt, plural } from '@/i18n/home/format'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

// The fields of the settings sheet, read from data/countries.ts. A field is only shown when the
// catalogue holds it, so Italy has no archive line and Portugal no format: the uneven shape is the
// point, and no placeholder stands in for a value the app does not have.
function fieldsFor(country: CountryFacts, t: HomeCopy['countries']) {
    return [
        ...country.identifiers.map((identifier) => ({
            label: identifier.required ? t.identifierRequired : t.identifier,
            value: identifier.label,
            detail: identifier.hint && t.hints[identifier.hint],
            key: identifier.label,
        })),
        country.format && { label: t.format, value: country.format, detail: t.formatDetail, key: 'format' },
        { label: t.sentThrough, value: country.channel.name === 'E-mail' ? t.email : country.channel.name, detail: t.channels[country.code], key: 'channel' },
    ].filter((field) => !!field)
}

/** France, Frankreich, フランス: the country's name in the page's language. */
function countryName(code: string, locale: string) {
    try {
        return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code
    } catch {
        return code
    }
}

// Every approved platform the app sends through, with the "everywhere else" e-mail left out: the
// box is about the platforms, and e-mail is said once, in the countries that use it.
const platformNames = platformGroups.filter((group) => group.id !== 'email').flatMap((group) => group.names)

const label = 'font-mono text-xs text-[oklch(0.47_0.02_230)]'

export function Countries() {
    const { copy, locale } = useHome()
    const t = copy.countries
    const [code, setCode] = useState(countries[0].code)
    const percent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 })

    return (
        <section id="countries" className="mx-auto max-w-6xl px-5 pb-24 pt-6">
            <div className="flex flex-wrap items-end justify-between gap-7">
                <div className="max-w-3xl">
                    <Eyebrow number="01">{t.eyebrow}</Eyebrow>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        {t.lead}
                    </p>
                </div>
                <Button variant="secondary" asChild className="h-11 rounded-[10px] px-5">
                    <a href={links.countries}>{t.matrix}</a>
                </Button>
            </div>

            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
                <div className="flex flex-col gap-6">
                    <div role="tablist" aria-label={t.tablist} className="flex flex-wrap gap-2">
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
                                    {countryName(entry.code, locale)}
                                </button>
                            )
                        })}
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                        {t.shipping}
                    </p>

                    <div id="platforms" className="scroll-mt-24 rounded-[14px] bg-secondary p-6 shadow-[inset_0_0_0_1px_var(--border)]">
                        <h3 className="text-[17px] font-semibold">{t.platformsTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {t.platformsBody}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {platformNames.map((name) => (
                                <li key={name} className="rounded-md bg-card px-2.5 py-2 font-mono text-[13px] leading-none shadow-[0_0_0_1px_var(--border)]">
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                            {t.platformsNote}{' '}
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
                    <ClipboardClip className="absolute -top-5 left-1/2 z-[2] -translate-x-1/2" />
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
                                    <p className="font-heading text-[19px] font-semibold">{t.sheetTitle}</p>
                                    <p className="text-sm text-[oklch(0.47_0.02_230)]">{fmt(t.sheetAsks, { country: countryName(country.code, locale) })}</p>
                                </div>
                                <dl className="grid sm:grid-cols-2">
                                    {fieldsFor(country, t).map((field) => (
                                        <div key={field.key} className="border-b border-dashed border-[oklch(0.89_0.01_230)] py-4 sm:odd:pe-4 sm:even:ps-4">
                                            <dt className={label}>{field.label}</dt>
                                            <dd className="mt-2 font-semibold">{field.value}</dd>
                                            {field.detail && <dd className="mt-1 text-[13px] leading-snug text-[oklch(0.47_0.02_230)]">{field.detail}</dd>}
                                        </div>
                                    ))}
                                    <div className="border-b border-dashed border-[oklch(0.89_0.01_230)] py-4 sm:odd:pe-4 sm:even:ps-4">
                                        <dt className={label}>{t.vatRates}</dt>
                                        <dd className="mt-2.5 flex flex-wrap gap-1.5">
                                            {country.vatRates.map((rate) => (
                                                <span key={rate} className="rounded-md bg-[oklch(0.91_0.03_230)] px-2 py-1.5 font-mono text-[13px] leading-none text-[oklch(0.28_0.05_230)]">
                                                    {percent.format(rate / 100)}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                </dl>
                                {country.retention && (
                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                                        <div>
                                            <p className={label}>{t.archive}</p>
                                            <p className="mt-2 font-semibold">{plural(t.years, country.retention.years, locale)}</p>
                                        </div>
                                        <p className="rounded-lg bg-[oklch(0.94_0.008_230)] px-2.5 py-2 text-[13px] text-[oklch(0.28_0.03_230)]">
                                            {fmt(t.keptFor, { source: country.retention.source })}
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
