import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

const IMAGE = 'ghcr.io/invoicerr-app/invoicerr:latest'

const facts = [
    { title: 'One image, two architectures', body: 'Built for amd64 and arm64. It runs on a VPS, a NAS or a 64-bit Raspberry Pi (3 and newer).' },
    { title: 'A Helm chart when one host is not enough', body: 'Separate API and worker roles, your own PostgreSQL and Redis, your own ingress.' },
    { title: 'Every feature, no seat count', body: 'The self-hosted app is the whole app. Billing code stays switched off.' },
]

export function Hosting() {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(IMAGE)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            /* clipboard blocked: the image name stays selectable */
        }
    }

    return (
        <section id="hosting" className="border-y border-border bg-muted/30">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 sm:py-32 lg:grid-cols-2 lg:gap-16">
                <div className="min-w-0">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Self-host it today, free under AGPL-3.0.</h2>
                    <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                        Invoicerr started as a self-hosted project and still is one. Run it with Docker on your own machine, free,
                        forever. Or let us run it for you and skip the upkeep.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.selfHost}>Read the install guide</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.github}>View the source</a>
                        </Button>
                    </div>
                </div>

                <div className="min-w-0">
                    <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                            <code className="truncate font-mono text-sm">{IMAGE}</code>
                            <Button variant="ghost" size="sm" onClick={copy} aria-label="Copy the image name">
                                {copied ? <Check /> : <Copy />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        </div>
                        <p className="px-5 py-5 text-sm leading-relaxed text-muted-foreground">
                            The install guide has the compose file that runs it with PostgreSQL. It needs Redis too:
                            add a Redis service, point REDIS_URL at it, then <code className="font-mono not-italic">docker compose up -d</code>.
                        </p>
                    </div>
                    <dl className="mt-8 space-y-5">
                        {facts.map((fact) => (
                            <div key={fact.title}>
                                <dt className="font-medium">{fact.title}</dt>
                                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{fact.body}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
