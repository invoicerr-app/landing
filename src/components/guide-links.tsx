import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { CONTENT_PAGES, type ContentLanguage, type ContentPage } from '@/content/pages'

// The block at the foot of every guide that links it to all the others, so that none of them is
// reachable only from the sitemap. Its own heading and the group names are written in the language of
// the page it sits on; each link keeps the language of the page it points to, and says so with
// `hrefLang` and `lang`, because a French reader should know before clicking that the German guide
// is in German.

const COPY: Record<ContentLanguage, { heading: string; note: string; groups: Record<ContentPage['group'], string> }> = {
    en: {
        heading: 'The other guides',
        note: 'Each country guide is written in the language of the country it describes.',
        groups: { europe: 'Across the five countries', country: 'By country', topic: 'In more depth' },
    },
    fr: {
        heading: 'Les autres guides',
        note: 'Chaque guide national est écrit dans la langue du pays qu’il décrit.',
        groups: { europe: 'Pour les cinq pays', country: 'Par pays', topic: 'Pour aller plus loin' },
    },
    de: {
        heading: 'Die anderen Leitfäden',
        note: 'Jeder Länderleitfaden ist in der Sprache des Landes geschrieben, das er beschreibt.',
        groups: { europe: 'Für alle fünf Länder', country: 'Nach Land', topic: 'Im Detail' },
    },
    it: {
        heading: 'Le altre guide',
        note: 'Ogni guida nazionale è scritta nella lingua del paese che descrive.',
        groups: { europe: 'Per i cinque paesi', country: 'Per paese', topic: 'Per approfondire' },
    },
    pl: {
        heading: 'Pozostałe przewodniki',
        note: 'Każdy przewodnik krajowy jest napisany w języku kraju, który opisuje.',
        groups: { europe: 'Dla pięciu krajów', country: 'Według kraju', topic: 'Szczegółowo' },
    },
    pt: {
        heading: 'Os outros guias',
        note: 'Cada guia nacional está escrito na língua do país que descreve.',
        groups: { europe: 'Para os cinco países', country: 'Por país', topic: 'Em pormenor' },
    },
}

const GROUP_ORDER: ContentPage['group'][] = ['europe', 'country', 'topic']

export function GuideLinks({ current }: { current: string }) {
    const page = CONTENT_PAGES.find((entry) => entry.path === current)
    if (!page) throw new Error(`GuideLinks: no content page is registered at ${current}.`)
    const copy = COPY[page.lang]

    return (
        <section className="mx-auto max-w-3xl px-5 pb-12">
            <Reveal>
                <nav aria-labelledby="guide-links-heading" className="rounded-3xl border border-border px-6 py-8 sm:px-8">
                    <h2 id="guide-links-heading" className="text-lg font-semibold tracking-tight">
                        {copy.heading}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.note}</p>
                    {GROUP_ORDER.map((group) => {
                        const entries = CONTENT_PAGES.filter((entry) => entry.group === group && entry.path !== current)
                        return (
                            <div key={group} className="mt-6">
                                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{copy.groups[group]}</h3>
                                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {entries.map((entry) => (
                                        <li key={entry.path}>
                                            <a
                                                href={`${entry.path}/`}
                                                hrefLang={entry.lang}
                                                lang={entry.lang}
                                                className="group block rounded-xl px-3 py-2 -mx-3 transition-colors hover:bg-muted/60"
                                            >
                                                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                                    {entry.label}
                                                    <span className="rounded border border-border px-1 text-[10px] font-normal uppercase text-muted-foreground">
                                                        {entry.lang}
                                                    </span>
                                                    <ArrowUpRight
                                                        className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                                <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{entry.blurb}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </nav>
            </Reveal>
        </section>
    )
}
