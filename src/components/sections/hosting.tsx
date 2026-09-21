import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

const IMAGE = 'ghcr.io/invoicerr-app/invoicerr:latest'

const facts = [
    { title: 'One image, three architectures', body: 'Built for amd64, arm64 and arm/v7. It runs on a VPS, a NAS or a Raspberry Pi.' },
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
                <Reveal className="min-w-0">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Your server or ours. It is the same app.</h2>
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
                </Reveal>

                <Reveal delay={0.1} className="min-w-0">
                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                            <code className="truncate font-mono text-sm">{IMAGE}</code>
                            <Button variant="ghost" size="sm" onClick={copy} aria-label="Copy the image name">
                                {copied ? <Check /> : <Copy />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        </div>
                        <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-7">
                            <code>
                                <span className="text-muted-foreground"># docker-compose.yml with invoicerr and postgres</span>
                                {'\n'}
                                <span className="text-primary">$</span> docker compose up -d{'\n'}
                                <span className="text-primary">$</span> open http://localhost
                            </code>
                        </pre>
                    </div>
                    <dl className="mt-8 space-y-5">
                        {facts.map((fact) => (
                            <div key={fact.title} className="flex gap-3">
                                <Check className="mt-1 size-4 shrink-0 text-primary" />
                                <div>
                                    <dt className="font-medium">{fact.title}</dt>
                                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{fact.body}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    )
}
