import { cn } from '@/lib/utils'

const languages = ['English', 'Français', 'Deutsch', 'Italiano', 'Polski', 'Português', 'Español', 'Nederlands', 'Svenska', 'Dansk', 'Čeština', 'Українська', 'Русский', '日本語', '한국어', '简体中文', 'العربية', 'עברית']

function Cell({ className, title, body, children }: { className?: string; title: string; body: string; children?: React.ReactNode }) {
    return (
        <div className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>
            <div className="flex h-full flex-col gap-6 p-6 sm:p-7">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
                {children && <div className="mt-auto">{children}</div>}
            </div>
        </div>
    )
}

function Shot({ src, alt, height, className }: { src: string; alt: string; height: number; className?: string }) {
    return (
        <div className={cn('-mb-7 -mr-7 overflow-hidden rounded-tl-lg border-l border-t border-border', className)}>
            <img src={src} alt={alt} width={1440} height={height} loading="lazy" className="block w-[135%] max-w-none dark:brightness-90" />
        </div>
    )
}

export function Bento() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">The work around the invoice, handled too.</h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
                <Cell
                    className="md:col-span-4"
                    title="Hours turn into invoice lines"
                    body="Track time per project, billable or not. When the month ends, the unbilled hours become an invoice in one step. Try it."
                >
                    <Shot src="/screens/time-tracking.webp" height={900} alt="The time tracking screen: hours logged per project, with the unbilled hours shown as billable." />
                </Cell>

                <Cell
                    className="md:col-span-2"
                    title="It clears the tax office"
                    body="Where a country runs a national platform, Invoicerr sends the invoice through it and tracks the answer."
                >
                    <Shot src="/screens/e-invoicing-channels.webp" height={900} alt="The e-invoicing channels screen: one row per country, with the format and the channel it sends through." />
                </Cell>

                <Cell
                    className="md:col-span-3"
                    title="Clients get their own portal"
                    body="Their documents, their balance, PDFs, online payment and quote decisions. No more statement requests by e-mail."
                >
                    <Shot src="/screens/client-portal.webp" height={600} alt="The client portal: a client's own documents and outstanding balance." />
                </Cell>

                <Cell
                    className="md:col-span-3"
                    title="Supplier invoices, read for you"
                    body="Drop a received invoice. Self-hosted OCR reads it into an editable proposal that you approve or reject."
                >
                    <Shot src="/screens/received-invoices.webp" height={900} alt="Received invoices waiting for review, with OCR-read amounts." className="max-h-56" />
                </Cell>

                <Cell
                    className="md:col-span-2"
                    title="Ask your AI assistant"
                    body="A built-in MCP server, a REST API and 18 webhook events, all scoped by API key: the assistant calls the same tools a user can, through one key."
                />

                <Cell
                    className="md:col-span-4"
                    title="Speaks your language, and your client's"
                    body="18 interface languages, a document language per recipient, and multi-currency with rate history."
                >
                    <div className="flex flex-wrap gap-1.5">
                        {languages.map((language) => (
                            <span key={language} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                                {language}
                            </span>
                        ))}
                    </div>
                </Cell>
            </div>
        </section>
    )
}
