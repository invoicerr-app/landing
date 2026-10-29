import { platformGroups } from '@/data/platforms'

const [approved, ...others] = platformGroups

// One row per channel, in the shape the audit asked for: country, channel, how it is reached,
// what it returns. The France cells repeat on purpose: the four approved platforms are four
// interchangeable alternatives, picked once in the company settings.
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

            <div className="mt-12 overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full min-w-[48rem] text-left text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">Country</th>
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">Channel</th>
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">How it is reached</th>
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">What it returns</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {approved.names.map((name) => (
                            <tr key={name}>
                                <td className="px-4 py-3 align-top sm:px-6">France, between businesses</td>
                                <td className="px-4 py-3 align-top font-medium sm:px-6">{name}</td>
                                <td className="px-4 py-3 align-top text-muted-foreground sm:px-6">The platform's API, with the credentials from your account on it</td>
                                <td className="px-4 py-3 align-top text-muted-foreground sm:px-6">A transmission status for each invoice</td>
                            </tr>
                        ))}
                        {others.map((group) => (
                            <tr key={group.id}>
                                <td className="px-4 py-3 align-top sm:px-6">{countryLabel(group.id)}</td>
                                <td className="px-4 py-3 align-top font-medium sm:px-6">{group.names.join(', ')}</td>
                                <td className="px-4 py-3 align-top text-muted-foreground sm:px-6">{reached(group.id)}</td>
                                <td className="px-4 py-3 align-top text-muted-foreground sm:px-6">{returns(group.id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

function countryLabel(id: string): string {
    switch (id) {
        case 'fr-public':
            return 'France, public bodies'
        case 'it':
            return 'Italy'
        case 'pl':
            return 'Poland'
        default:
            return 'Everywhere'
    }
}

function reached(id: string): string {
    switch (id) {
        case 'fr-public':
            return "The portal's own API, with your Chorus Pro credentials"
        case 'it':
            return 'The invoice file in a certified e-mail (PEC) message; no accreditation needed'
        case 'pl':
            return "The national system's API, with a token from the e-Tax portal"
        default:
            return 'The mail server you configure in the app'
    }
}

function returns(id: string): string {
    switch (id) {
        case 'fr-public':
            return 'The statuses the portal publishes for each invoice'
        case 'it':
            return 'The receipts of the Sistema di Interscambio for each invoice'
        case 'pl':
            return 'The number it assigns to each invoice, and its status'
        default:
            return 'A delivery status from the mail server itself'
    }
}
