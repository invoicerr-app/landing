import { FIRST_SEAT, FURTHER_SEATS, NEXT_THREE_SEATS, TRIAL_DAYS, YEARLY_MONTHS_CHARGED, monthlyPrice, yearlyPrice } from '@/lib/pricing'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

const SEAT_TABLE_ROWS = [1, 2, 3, 4, 5]

const differences: Array<{ label: string; cloud: string; selfHosted: string }> = [
    {
        label: 'Runs on',
        cloud: 'Our infrastructure, hosted and updated by us',
        selfHosted: 'Your server, with the Docker image or the Helm chart',
    },
    {
        label: 'Price',
        cloud: `Per company: first seat €${FIRST_SEAT} a month, seats 2 to 4 €${NEXT_THREE_SEATS} each, every seat after that €${FURTHER_SEATS}; yearly billing charges ${YEARLY_MONTHS_CHARGED} months for twelve`,
        selfHosted: '€0, for any number of seats and companies',
    },
    {
        label: 'Trial',
        cloud: `A ${TRIAL_DAYS}-day trial when it opens, no limit except sending`,
        selfHosted: 'Not a trial: the whole app is free under AGPL-3.0',
    },
    {
        label: 'Leaving',
        cloud: 'Your data exported if you leave',
        selfHosted: 'Your database, your backups',
    },
    {
        label: 'When',
        cloud: 'On the waiting list now, opening in November 2026',
        selfHosted: 'Available now',
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">The cloud prices per seat. Self-hosting is free.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    Cloud pricing is per company and gets cheaper with every seat. Self-hosting costs nothing and holds nothing back.
                </p>
            </div>

            <div className="mt-12 overflow-x-auto rounded-lg border border-border bg-card">
                <table className="w-full min-w-[46rem] text-left text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6"><span className="sr-only">Difference</span></th>
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">Cloud</th>
                            <th scope="col" className="px-4 py-3 align-bottom font-medium sm:px-6">Self-hosted</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {differences.map((row) => (
                            <tr key={row.label}>
                                <th scope="row" className="px-4 py-3 align-top font-medium sm:px-6">{row.label}</th>
                                <td className="px-4 py-3 align-top sm:px-6">{row.cloud}</td>
                                <td className="px-4 py-3 align-top sm:px-6">{row.selfHosted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* The static seat-to-price note the audit asked for, computed from lib/pricing.ts so it
                cannot drift from the FAQ and the offers block in index.html. */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                    <h3 className="text-base font-medium">How the seat price scales</h3>
                    <div className="mt-3 inline-block min-w-[18rem] rounded-lg border border-border bg-card text-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th scope="col" className="px-4 py-2 font-medium">Seats</th>
                                    <th scope="col" className="px-4 py-2 font-medium">Per month</th>
                                    <th scope="col" className="px-4 py-2 font-medium">Per year ({YEARLY_MONTHS_CHARGED} of 12 months)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {SEAT_TABLE_ROWS.map((seats) => (
                                    <tr key={seats}>
                                        <td className="px-4 py-2">{seats}</td>
                                        <td className="px-4 py-2">€{monthlyPrice(seats).toLocaleString('en-US')}</td>
                                        <td className="px-4 py-2">€{yearlyPrice(seats).toLocaleString('en-US')}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-4 py-2">Every seat after 5</td>
                                    <td className="px-4 py-2">+€{FURTHER_SEATS}</td>
                                    <td className="px-4 py-2">+€{FURTHER_SEATS * YEARLY_MONTHS_CHARGED}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Prices in euros excluding VAT. What happens when a paid company stops paying is described in the FAQ below:
                    read-only first, then a full export before anything is deleted.
                </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
                <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                    <a href={links.app}>Join the waiting list</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                    <a href={links.selfHost}>Read the install guide</a>
                </Button>
            </div>
        </section>
    )
}
