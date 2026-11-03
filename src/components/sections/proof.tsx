import { useEffect, useState } from 'react'

import { links } from '@/lib/links'

const REPO_API = 'https://api.github.com/repos/invoicerr-app/invoicerr'

export function Proof() {
    // Falls back to a rounded-down figure when the GitHub API is unreachable or rate limited.
    const [stars, setStars] = useState('700+')

    useEffect(() => {
        const controller = new AbortController()
        fetch(REPO_API, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((repo) => {
                if (typeof repo?.stargazers_count === 'number') setStars(repo.stargazers_count.toLocaleString('en-US'))
            })
            .catch(() => undefined)
        return () => controller.abort()
    }, [])

    // Recounted 2026-10-29: the contributors API lists 25 accounts; 4 are bots and the `claude`
    // account is excluded, which leaves 20. The locale directories on the app's `dev` are 19, one
    // of them Kabyle; several catalogs are still partial, so the label is kept literal.
    const facts = [
        { value: stars, label: 'stars on GitHub', href: links.github },
        { value: '20', label: 'contributors, plus translators' },
        { value: '19', label: 'language catalogs' },
        { value: 'AGPL-3.0', label: 'open-source license', href: links.license },
    ]

    // Laid out as a ticket with its stub: the stub names what the four figures are about, the
    // dashed line is where it would tear off, and the two notches are cut on either side of it.
    return (
        <section aria-label="Project facts" className="mx-auto max-w-6xl px-5 pb-20 pt-16">
            <div className="relative mx-auto grid max-w-5xl grid-cols-2 rounded-[14px] bg-card shadow-[0_0_0_1px_var(--border),0_14px_30px_rgb(10_40_60/0.08)] md:grid-cols-[200px_repeat(4,minmax(0,1fr))]">
                <span aria-hidden="true" className="absolute -left-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full bg-background shadow-[inset_-1px_0_0_var(--border)] md:block" />
                <span aria-hidden="true" className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 rounded-full bg-background shadow-[inset_1px_0_0_var(--border)] md:block" />
                <div className="col-span-2 flex flex-col justify-center gap-1.5 border-b-2 border-dashed border-border px-6 py-5 md:col-span-1 md:border-b-0 md:border-r-2">
                    <span className="font-mono text-xs font-bold tracking-[0.1em] text-[oklch(0.45_0.11_230)] dark:text-primary">OPEN SOURCE</span>
                    <span className="font-heading text-[15px] font-medium leading-snug">Built in the open, with its community</span>
                </div>
                <dl className="contents">
                    {facts.map((fact, index) => (
                        <div key={fact.label} className={index > 0 ? 'flex flex-col-reverse gap-1.5 px-6 py-5 md:border-l md:border-border' : 'flex flex-col-reverse gap-1.5 px-6 py-5'}>
                            <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                            <dd className="whitespace-nowrap font-mono text-2xl font-bold leading-none sm:text-[28px]">
                                {fact.href ? (
                                    <a href={fact.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-primary">
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
        </section>
    )
}
