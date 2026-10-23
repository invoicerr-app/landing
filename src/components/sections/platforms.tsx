import { BadgeCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { platformGroups } from '@/data/platforms'

export function Platforms() {
    const [approved, ...others] = platformGroups

    return (
        <section id="platforms" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <Reveal className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Already connected to France's approved platforms.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    In France, invoices between businesses go through a platform approved by the tax administration. Invoicerr is
                    connected to four of them, to Chorus Pro for the public sector, and to the national systems of Italy and Poland.
                    You choose the channel in your company settings.
                </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 space-y-4">
                <div className="rounded-2xl border border-primary/40 bg-card p-6 sm:p-8">
                    <h3 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
                        <BadgeCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        {approved.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{approved.detail}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {approved.names.map((name) => (
                            <li key={name} className="rounded-xl border border-border bg-background px-4 py-4 text-center font-heading text-lg font-semibold tracking-tight">
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {others.map((group) => (
                        <div key={group.id} className="rounded-2xl border border-border bg-card p-5">
                            <p className="text-sm text-muted-foreground">{group.title}</p>
                            <p className="mt-1 font-heading text-xl font-semibold tracking-tight">{group.names.join(', ')}</p>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.detail}</p>
                        </div>
                    ))}
                </div>
            </Reveal>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Invoicerr is invoicing software, not an approved platform itself. The French tax administration calls such software a
                compatible solution and asks that it be connected to at least one approved platform: Invoicerr builds the invoice, the
                platform delivers it.{' '}
                <a
                    href="/facturation-electronique/plateforme-agreee/"
                    lang="fr"
                    hrefLang="fr"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-primary"
                >
                    Choisir sa plateforme agréée
                </a>
            </p>
        </section>
    )
}
