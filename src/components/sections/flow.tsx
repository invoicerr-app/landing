import { Lock } from 'lucide-react'

import { Eyebrow } from '@/components/desk/tear'

// The four steps as four folders, from the lightest to the brand ink, each holding the sheet that
// step produces. The sheets are drawn, not screenshots, and hidden from assistive technology: the
// step's title and text carry everything they show. Their numbers follow the sample invoice in the
// hero, which is not a customer's.

const paper = 'flex min-h-[150px] flex-col gap-2.5 rounded bg-paper p-4 text-ink shadow-[0_6px_14px_rgb(10_50_75/0.12)]'
const muted = 'text-[oklch(0.47_0.02_230)]'

function QuoteSheet() {
    return (
        <div aria-hidden="true" className={`${paper} -rotate-[1.2deg]`}>
            <span className="font-mono text-[11px] font-bold text-[oklch(0.45_0.11_230)]">QUOTE D-2026-031</span>
            <span className="h-1.5 w-4/5 rounded-sm bg-[oklch(0.92_0.008_230)]" />
            <span className="h-1.5 w-3/5 rounded-sm bg-[oklch(0.92_0.008_230)]" />
            <div className="mt-auto flex items-end justify-between border-t border-[oklch(0.85_0.01_230)] pt-1.5">
                <span className="font-hand text-[26px] leading-none font-semibold">S. Lune</span>
                <span className={`font-mono text-[10px] ${muted}`}>OTP 482 911</span>
            </div>
        </div>
    )
}

function InvoiceSheet() {
    return (
        <div aria-hidden="true" className={`${paper} rotate-[0.8deg] gap-2 font-mono text-[11px] leading-tight`}>
            <span className="font-bold text-[oklch(0.45_0.11_230)]">INVOICE F-2026-0142</span>
            <div className="flex justify-between"><span>Identity</span><span>1,800.00</span></div>
            <div className="flex justify-between"><span>Review</span><span>360.00</span></div>
            <div className="flex justify-between"><span>Hosting</span><span>300.00</span></div>
            <div className="mt-auto flex items-center justify-between border-t border-[oklch(0.85_0.01_230)] pt-2">
                <span className="rounded bg-[oklch(0.92_0.06_145)] px-1.5 py-0.5 text-[oklch(0.3_0.11_145)]">Factur-X</span>
                <span className="font-bold">2,952.00</span>
            </div>
        </div>
    )
}

function StatementSheet() {
    return (
        <div aria-hidden="true" className={`${paper} -rotate-[0.6deg] font-mono text-[11px] leading-snug`}>
            <span className="font-bold text-[oklch(0.45_0.11_230)]">BANK STATEMENT</span>
            <div className="flex justify-between gap-2 rounded-md bg-[oklch(0.94_0.008_230)] p-2">
                <span>VIR ATELIER RIVIERE F-2026-0142</span>
                <span className="whitespace-nowrap font-bold">+2,952</span>
            </div>
            <span className="text-[oklch(0.3_0.11_145)]">✓ Matched by reference and amount</span>
            <span className="mt-auto h-1.5 w-[70%] rounded-sm bg-[oklch(0.92_0.008_230)]" />
        </div>
    )
}

function ArchiveSheet() {
    return (
        <div aria-hidden="true" className="flex min-h-[150px] rotate-1 flex-col gap-2.5 rounded bg-[oklch(0.225_0.016_230)] p-4 font-mono text-[11px] leading-snug text-[#c6d3d9] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
            <span className="font-bold text-azure-pale">LEGAL ARCHIVE</span>
            <span>sha256 9f2c 81d0 ... e41a</span>
            <span>kept until 2036-11-02</span>
            <span className="mt-auto flex items-center gap-2">
                <Lock className="size-4 text-azure-light" />
                sealed
            </span>
        </div>
    )
}

const steps = [
    {
        tab: '01 QUOTE',
        title: 'Quote it',
        body: 'Send a quote your client signs online with a one-time code. Ask for a deposit or split it into instalments.',
        sheet: <QuoteSheet />,
        folder: 'bg-[oklch(0.91_0.03_230)] text-[oklch(0.28_0.05_230)]',
        text: 'text-[oklch(0.38_0.025_230)]',
    },
    {
        tab: '02 INVOICE',
        title: 'Invoice it',
        body: 'Turn the signed quote into an invoice in one click. Lines come from your catalogue, VAT rates from your country.',
        sheet: <InvoiceSheet />,
        folder: 'bg-[oklch(0.86_0.06_230)] text-[oklch(0.25_0.06_230)]',
        text: 'text-[oklch(0.32_0.03_230)]',
    },
    {
        tab: '03 PAID',
        title: 'Get paid',
        body: 'Import a bank statement. Invoicerr matches each line by reference and amount, then records the payment for you.',
        sheet: <StatementSheet />,
        folder: 'bg-[oklch(0.78_0.1_230)] text-[oklch(0.2_0.05_230)]',
        text: 'text-[oklch(0.25_0.04_230)]',
    },
    {
        tab: '04 ARCHIVED',
        title: 'Keep the record',
        body: 'Every sent invoice lands in a hashed legal archive, kept for exactly as long as your country asks.',
        sheet: <ArchiveSheet />,
        folder: 'bg-ink text-azure-pale dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]',
        text: 'text-[oklch(0.8_0.02_230)]',
    },
]

export function Flow() {
    return (
        <section id="product" className="mx-auto max-w-6xl px-5 py-24">
            <div className="max-w-3xl">
                <Eyebrow number="02">The flow</Eyebrow>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">From first quote to money in the bank.</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    One document engine runs quotes, invoices, credit notes, purchase orders and expenses. Nothing gets retyped between
                    them.
                </p>
            </div>

            <ol className="mt-[72px] grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                    <li key={step.title} className="relative flex flex-col">
                        <span aria-hidden="true" className={`absolute -top-[26px] left-0 flex h-[30px] items-center rounded-t-[10px] px-3 font-mono text-xs font-bold ${step.folder}`}>
                            {step.tab}
                        </span>
                        <div className={`flex flex-1 flex-col gap-5 rounded-[14px] rounded-tl-none p-[18px] pb-6 ${step.folder}`}>
                            {step.sheet}
                            <div>
                                <h3 className={`text-[21px] font-semibold ${step.folder.includes('bg-ink') ? 'text-white' : 'text-ink'}`}>{step.title}</h3>
                                <p className={`mt-2 text-[15px] leading-relaxed ${step.text}`}>{step.body}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}
