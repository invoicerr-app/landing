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

    const facts = [
        { value: stars, label: 'stars on GitHub', href: links.github },
        { value: '18', label: 'contributors, plus translators' },
        { value: '18', label: 'interface languages' },
        { value: 'AGPL-3.0', label: 'open-source license', href: links.license },
    ]

    return (
        <section aria-label="Project facts" className="mx-auto max-w-6xl px-5">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 md:grid-cols-4">
                {facts.map((fact) => (
                    <div key={fact.label}>
                        <dd className="font-heading text-2xl font-semibold tracking-tight">
                            {fact.href ? (
                                <a href={fact.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-primary">
                                    {fact.value}
                                </a>
                            ) : (
                                fact.value
                            )}
                        </dd>
                        <dt className="mt-1 text-sm text-muted-foreground">{fact.label}</dt>
                    </div>
                ))}
            </dl>
        </section>
    )
}
