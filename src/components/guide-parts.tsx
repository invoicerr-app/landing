import { ArrowRight, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// The pieces the guides written after the first five are built from. The first five spell the same
// markup out inline; these give the later pages the same look without repeating every class string.

const linkClass = 'underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary'

export function GuideHero({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
            <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">{title}</h1>
            <p className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">{children}</p>
        </section>
    )
}

export function GuideSection({ icon: Icon, title, id, children }: { icon?: LucideIcon; title: string; id?: string; children: React.ReactNode }) {
    return (
        <section id={id} className="mx-auto max-w-3xl scroll-mt-24 px-5 py-12">
            <Reveal>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                    {Icon ? <Icon className="size-6 shrink-0 text-primary" aria-hidden="true" /> : null}
                    {title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
            </Reveal>
        </section>
    )
}

export function H3({ children }: { children: React.ReactNode }) {
    return <h3 className="!mt-8 text-lg font-semibold tracking-tight text-foreground">{children}</h3>
}

export function Quote({ children, cite }: { children: React.ReactNode; cite: React.ReactNode }) {
    return (
        <figure className="space-y-2">
            <blockquote className="border-l-2 border-primary/40 pl-4 text-foreground/90 italic">{children}</blockquote>
            <figcaption className="text-sm">{cite}</figcaption>
        </figure>
    )
}

export function List({ children }: { children: React.ReactNode }) {
    return <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">{children}</ul>
}

export function Strong({ children }: { children: React.ReactNode }) {
    return <strong className="font-medium text-foreground">{children}</strong>
}

export function A({ href, children, lang }: { href: string; children: React.ReactNode; lang?: string }) {
    return (
        <a href={href} className={linkClass} lang={lang} hrefLang={lang}>
            {children}
        </a>
    )
}

export function Table({ head, rows, minWidth = 560 }: { head: React.ReactNode[]; rows: React.ReactNode[][]; minWidth?: number }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full border-collapse text-left text-sm" style={{ minWidth }}>
                <thead>
                    <tr className="border-b border-border bg-muted/50">
                        {head.map((cell, index) => (
                            <th key={index} scope="col" className="px-4 py-3 font-medium text-foreground sm:px-6">
                                {cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) =>
                                cellIndex === 0 ? (
                                    <th key={cellIndex} scope="row" className="px-4 py-4 align-top font-medium text-foreground sm:px-6">
                                        {cell}
                                    </th>
                                ) : (
                                    <td key={cellIndex} className="px-4 py-4 align-top leading-relaxed text-muted-foreground sm:px-6">
                                        {cell}
                                    </td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function Closing({
    icon: Icon,
    title,
    children,
    cta,
    selfHost,
}: {
    icon: LucideIcon
    title: string
    children: React.ReactNode
    cta: string
    selfHost: string
}) {
    return (
        <section className="mx-auto max-w-3xl px-5 py-12">
            <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 sm:px-10 sm:py-14">
                <div className="relative">
                    <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
                        <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        {title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{children}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.app}>
                                {cta}
                                <ArrowRight />
                            </a>
                        </Button>
                        <a href={links.selfHost} className={`text-sm font-medium text-muted-foreground ${linkClass}`}>
                            {selfHost}
                        </a>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}

export interface Source {
    claim: string
    reference: string
    href: string
}

export function Sources({ title, intro, sources }: { title: string; intro: string; sources: Source[] }) {
    return (
        <section className="mx-auto max-w-3xl px-5 pb-12">
            <Reveal>
                <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{intro}</p>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    {sources.map((source) => (
                        <div key={source.claim}>
                            <dt className="font-medium text-foreground">{source.claim}</dt>
                            <dd>
                                {source.reference}{' '}
                                <a href={source.href} className={linkClass}>
                                    {new URL(source.href).hostname.replace(/^www\./, '')}
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </section>
    )
}
