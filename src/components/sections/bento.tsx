// The 19 locale directories under frontend/src/locales/ on the app's `dev`, in their own names.
// Several catalogs are still partial; see the app's i18n module for the list of stubs.
const languages = ['English', 'Français', 'Deutsch', 'Italiano', 'Polski', 'Español', 'Nederlands', 'Português (BR)', 'Čeština', 'Svenska', 'Dansk', 'Українська', 'Русский', '日本語', '한국어', '简体中文', 'العربية', 'עברית', 'Kabyle']

function Shot({ src, alt, height }: { src: string; alt: string; height: number }) {
    return (
        <img src={src} alt={alt} width={1440} height={height} loading="lazy" className="block w-full rounded-lg border border-border bg-card" />
    )
}

function Item({ title, body, media }: { title: string; body: string; media?: React.ReactNode }) {
    return (
        <li className="border-t border-border py-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                <div className="min-w-0 shrink-0 md:w-56 lg:w-64">
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
                {media && <div className="w-full min-w-0 md:flex-1">{media}</div>}
            </div>
        </li>
    )
}

export function Bento() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">The work around the invoice, handled too.</h2>
            </div>

            {/* One lead feature, then the rest as a plain list: the importance order the audit asked
                for, with the app's own screenshots as the only evidence. */}
            <article className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">It clears the tax office</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Where a country runs a national platform, Invoicerr sends the invoice through it and tracks the answer. The
                        channel per country is picked once, in the company settings.
                    </p>
                </div>
                <div className="min-w-0">
                    <Shot src="/screens/e-invoicing-channels.webp" height={900} alt="The e-invoicing channels screen: one row per country, with the format and the channel it sends through." />
                </div>
            </article>

            <ul className="mt-10">
                <Item
                    title="Hours turn into invoice lines"
                    body="Track time per project, billable or not. When the month ends, the unbilled hours become an invoice in one step."
                    media={<Shot src="/screens/time-tracking.webp" height={900} alt="The time tracking screen: hours logged per project, with the unbilled hours shown as billable." />}
                />
                <Item
                    title="Clients get their own portal"
                    body="Their documents, their balance, PDFs, online payment and quote decisions. No more statement requests by e-mail."
                    media={<Shot src="/screens/client-portal.webp" height={600} alt="The client portal: a client's own documents and outstanding balance." />}
                />
                <Item
                    title="Supplier invoices, read for you"
                    body="Drop a received invoice. Self-hosted OCR reads it into an editable proposal that you approve or reject."
                    media={<Shot src="/screens/received-invoices.webp" height={900} alt="Received invoices waiting for review, with OCR-read amounts." />}
                />
                <Item
                    title="An MCP server and an API, scoped by key"
                    body="A built-in MCP server, a REST API and 18 webhook events, all scoped by API key: the assistant calls the same tools a user can, through one key."
                />
                <li className="border-t border-border py-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                        <div className="min-w-0 shrink-0 md:w-56 lg:w-64">
                            <h3 className="text-lg font-semibold tracking-tight">Speaks your language, and your client's</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">19 language catalogs, a document language per recipient, and multi-currency with rate history.</p>
                        </div>
                        <div className="w-full min-w-0 md:flex-1">
                            <div className="flex flex-wrap gap-1.5">
                                {languages.map((language) => (
                                    <span key={language} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                                        {language}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    )
}
