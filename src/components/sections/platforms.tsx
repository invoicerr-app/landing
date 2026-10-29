import { platformGroups } from '@/data/platforms'

// One row per country the app sends through today, straight from data/platforms.ts (nothing
// beyond it: no Portugal, no Germany Peppol row). Country name as a small heading, the channels
// as pills that wrap, so the row never grows wider than its container and nothing scrolls
// sideways at 390 px.
export function Platforms() {
    return (
        <section id="platforms" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Already connected to France's approved platforms.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    In France, invoices between businesses go through a platform approved by the tax administration. Invoicerr is
                    connected to four of them, to Chorus Pro for the public sector, and to the national systems of Italy and Poland.
                    You choose the channel in your company settings.
                </p>
            </div>

            <div className="mt-12 max-w-full space-y-8 overflow-x-hidden">
                {platformGroups.map((group) => (
                    <div key={group.id}>
                        <h3 className="text-sm font-medium text-muted-foreground">{group.title}</h3>
                        <div className="mt-3 flex max-w-full flex-wrap gap-2">
                            {group.names.map((name) => (
                                <span
                                    key={name}
                                    className="max-w-full break-words rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{group.detail}</p>
                    </div>
                ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
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
