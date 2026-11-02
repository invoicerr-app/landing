import { CircleUserRound, Clock, Code, Globe, ScanText, Send } from 'lucide-react'

import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

// The app ships no screenshot of its MCP server, so its card hangs on the app's own developer
// documentation: the endpoint below is resolved verbatim from
// documentation/docs/developer-guide/mcp-server.md on the app's dev branch.
const MCP_REFERENCE = 'https://docs.invoicerr.app/docs/developer-guide/mcp-server/'

const features = [
    {
        icon: Send,
        title: 'It clears the tax office',
        body: 'Where a country runs a national platform, Invoicerr sends the invoice through it and tracks the answer. The channel per country is picked once, in the company settings.',
    },
    {
        icon: Clock,
        title: 'Hours turn into invoice lines',
        body: 'Track time per project, billable or not. When the month ends, the unbilled hours become an invoice in one step.',
    },
    {
        icon: CircleUserRound,
        title: 'Clients get their own portal',
        body: 'Their documents, their balance, PDFs, online payment and quote decisions. No more statement requests by e-mail.',
    },
    {
        icon: ScanText,
        title: 'Supplier invoices, read for you',
        body: 'Drop a received invoice. Self-hosted OCR reads it into an editable proposal that you approve or reject.',
    },
    {
        icon: Code,
        title: 'An MCP server and an API, scoped by key',
        body: 'A built-in MCP server, a REST API and 18 webhook events, all scoped by API key: the assistant calls the same tools a user can, through one key.',
        code: 'POST /api/mcp',
    },
    {
        icon: Globe,
        title: "Speaks your language, and your client's",
        body: '19 language catalogs, a document language per recipient, and multi-currency with rate history.',
    },
]

export function Bento() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-24">
            <div className="flex flex-wrap items-end justify-between gap-7">
                <div className="max-w-2xl">
                    <Eyebrow number="03">Around the invoice</Eyebrow>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">The work around the invoice, handled too.</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    <Button asChild className="h-11 rounded-[10px] px-5">
                        <a href={links.demo}>Try the live demo</a>
                    </Button>
                    <Button variant="secondary" asChild className="h-11 rounded-[10px] px-5">
                        <a href={links.docs}>Read the docs</a>
                    </Button>
                </div>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <li key={feature.title} className="flex flex-col gap-3 rounded-[14px] bg-card p-7 shadow-[0_0_0_1px_var(--border),0_6px_16px_rgb(10_40_60/0.05)]">
                        <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-[10px] bg-accent text-[oklch(0.45_0.11_230)] dark:text-primary">
                            <feature.icon className="size-[22px]" strokeWidth={1.8} />
                        </span>
                        <h3 className="mt-1.5 text-[19px] font-semibold leading-snug">{feature.title}</h3>
                        <p className="text-[15px] leading-relaxed text-muted-foreground">{feature.body}</p>
                        {feature.code && (
                            <p className="mt-1 flex flex-wrap items-center gap-3">
                                <code className="rounded-md bg-ink px-2.5 py-1.5 font-mono text-[13px] text-azure-pale">{feature.code}</code>
                                <a href={MCP_REFERENCE} className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-primary">
                                    Read the guide
                                </a>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
