import { useEffect, useState } from 'react'

import { useHome } from '@/i18n/home/context'
import { links } from '@/lib/links'

const REPO_API = 'https://api.github.com/repos/invoicerr-app/invoicerr'

export function Proof() {
    const { copy, locale } = useHome()
    const t = copy.proof
    // Falls back to a rounded-down figure when the GitHub API is unreachable or rate limited.
    const [stars, setStars] = useState('700+')

    useEffect(() => {
        const controller = new AbortController()
        fetch(REPO_API, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((repo) => {
                if (typeof repo?.stargazers_count === 'number') setStars(repo.stargazers_count.toLocaleString(locale))
            })
            .catch(() => undefined)
        return () => controller.abort()
    }, [locale])

    // Recounted 2026-10-29: the contributors API lists 25 accounts; 4 are bots and the `claude`
    // account is excluded, which leaves 20. The locale directories on the app's `dev` are 19, one
    // of them Kabyle; several catalogs are still partial, so the label is kept literal.
    const facts = [
        { value: stars, label: t.stars, href: links.github },
        { value: '20', label: t.contributors },
        { value: '19', label: t.catalogs },
        { value: 'AGPL-3.0', label: t.license, href: links.license },
    ]

    // Laid out as a ticket with its stub, left to right in every language since its notches are cut
    // at a fixed distance from the left edge: the stub names what the four figures are about, the dashed
    // line is where it would tear off, and the two notches are cut out of the ticket on that line (a
    // mask, so the page shows through them), top and bottom. The four figures share one top line and
    // the labels hang under them, however many lines a label takes.
    return (
        <section aria-label={t.label} className="mx-auto max-w-6xl px-5 pb-20 pt-16">
            <div className="ticket-shadow mx-auto max-w-5xl">
                <div dir="ltr" className="ticket grid grid-cols-2 rounded-[14px] bg-card md:grid-cols-[208px_repeat(3,minmax(0,1fr))_minmax(0,1.3fr)]">
                    <div className="col-span-2 flex flex-col justify-center gap-1.5 border-b-2 border-dashed border-border px-6 py-5 md:col-span-1 md:border-b-0 md:border-e-2">
                        <span className="font-mono text-[13px] text-[oklch(0.45_0.11_230)] dark:text-primary" dir="auto">{t.stub}</span>
                        <span dir="auto" className="font-heading text-[15px] font-medium leading-snug">{t.stubText}</span>
                    </div>
                    <dl className="contents">
                        {facts.map((fact, index) => (
                            <div key={fact.label} className={index > 0 ? 'flex flex-col-reverse justify-end gap-2 px-6 py-5 md:border-s md:border-border' : 'flex flex-col-reverse justify-end gap-2 px-6 py-5'}>
                                <dt dir="auto" className="text-sm leading-snug text-muted-foreground">{fact.label}</dt>
                                <dd className="whitespace-nowrap font-mono text-2xl leading-none tabular-nums lg:text-[26px]">
                                    {fact.href ? (
                                        <a href={fact.href} className="underline decoration-muted-foreground underline-offset-4 transition-colors hover:decoration-primary">
                                            {fact.value}
                                        </a>
                                    ) : (
                                        fact.value
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
