import { DeskObject } from '@/components/desk/objects'
import { Phone } from '@/components/desk/phone'
import { StickyNote } from '@/components/desk/props'
import { Button } from '@/components/ui/button'
import { sampleStory } from '@/components/desk/sample'
import { links } from '@/lib/links'
import { monthName, shortDate, stampDate, useNow } from '@/lib/today'

// The sample invoice lying on the desk. Illustrative, not a customer's: the totals add up (20 % VAT on
// €2,460.00), the archive line quotes the same French article the countries section cites, and the
// dates follow today (components/desk/sample.ts).
function SampleInvoice() {
    const story = sampleStory(useNow())
    const lines = [
        { label: 'Brand identity, phase 2', quantity: '1', amount: '€1,800.00' },
        { label: 'Website copy review', quantity: '6 h', amount: '€360.00' },
        { label: `Hosting, ${monthName(story.issued)}`, quantity: '1', amount: '€300.00' },
    ]
    return (
        <div
            role="img"
            aria-label="A sample invoice, paid: three lines, €2,952.00 including VAT, validated as Factur-X, sent through an approved platform and archived for ten years."
            className="relative -rotate-1 rounded-md bg-paper px-6 pb-8 pt-9 text-left text-ink shadow-desk sm:px-10"
        >
            <div aria-hidden="true">
                <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="flex flex-col gap-1">
                        <span className="font-heading text-lg font-semibold">Atelier Rivière SARL</span>
                        <span className="text-[13px] text-[oklch(0.47_0.02_230)]">12 quai Saint-Vincent, 69001 Lyon</span>
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right">
                        <span className="font-mono text-xs font-bold tracking-[0.14em] text-[oklch(0.45_0.11_230)]">INVOICE</span>
                        <span className="font-mono text-xl">{story.invoice}</span>
                        <span className="text-[13px] text-[oklch(0.47_0.02_230)]">
                            Issued {shortDate(story.issued)}, due {shortDate(story.due)}
                        </span>
                    </div>
                </div>

                <div className="mt-6 border-t border-[oklch(0.89_0.01_230)]">
                    <div className="grid grid-cols-[minmax(0,1fr)_7.5rem] gap-4 py-2.5 font-mono text-xs uppercase tracking-[0.06em] text-[oklch(0.47_0.02_230)] sm:grid-cols-[minmax(0,1fr)_5.5rem_7.5rem]">
                        <span>Description</span>
                        <span className="hidden text-right sm:block">Qty</span>
                        <span className="text-right">Amount</span>
                    </div>
                    {lines.map((line) => (
                        <div
                            key={line.label}
                            className="grid grid-cols-[minmax(0,1fr)_7.5rem] gap-4 border-t border-dashed border-[oklch(0.89_0.01_230)] py-3 text-[15px] sm:grid-cols-[minmax(0,1fr)_5.5rem_7.5rem]"
                        >
                            <span>{line.label}</span>
                            <span className="hidden text-right text-[oklch(0.47_0.02_230)] sm:block">{line.quantity}</span>
                            <span className="text-right font-mono">{line.amount}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-2 flex justify-end">
                    <div className="flex w-72 max-w-full flex-col gap-2 border-t border-[oklch(0.89_0.01_230)] pt-3.5 text-sm">
                        <div className="flex justify-between text-[oklch(0.47_0.02_230)]">
                            <span>Total excl. VAT</span>
                            <span className="font-mono">€2,460.00</span>
                        </div>
                        <div className="flex justify-between text-[oklch(0.47_0.02_230)]">
                            <span>VAT 20%</span>
                            <span className="font-mono">€492.00</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span className="font-mono font-bold">€2,952.00</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-[13px] font-medium">
                    <span className="rounded-md bg-[oklch(0.92_0.06_145)] px-2.5 py-1.5 text-[oklch(0.3_0.11_145)]">Factur-X validated</span>
                    <span className="rounded-md bg-[oklch(0.92_0.045_210)] px-2.5 py-1.5 text-[oklch(0.3_0.08_225)]">Sent through PDP</span>
                    <span className="rounded-md bg-[oklch(0.94_0.008_230)] px-2.5 py-1.5 text-[oklch(0.28_0.03_230)]">
                        Archived 10 years, C. com. art. L123-22
                    </span>
                </div>

                <div className="absolute bottom-24 left-[30%] -rotate-[13deg] rounded-[10px] border-4 border-[#0a7fae] px-4 pb-1.5 pt-2 text-center text-[#0a7fae] opacity-80 mix-blend-multiply max-sm:hidden">
                    <div className="font-mono text-3xl font-bold leading-none tracking-[0.2em]">PAID</div>
                    <div className="font-mono text-[11px] font-bold tracking-[0.14em]">{stampDate(story.paid)}</div>
                </div>
            </div>
        </div>
    )
}

// The entrances below are the `enter` classes from src/index.css rather than animation-library
// props: the library writes its first frame into the markup as `style="opacity:0"`, and this
// block holds the page's headline, which has to be legible in the HTML a crawler receives.
export function Hero() {
    return (
        <section className="desk relative overflow-hidden pb-40 pt-32 text-white sm:pt-40">
            <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-[52%] h-[360px] w-[520px] rounded-full bg-[rgb(151_216_248/0.22)] blur-[60px]" />

            {/* The desk's objects, wide screens only: on a narrow one they would sit on the text. */}
            <div aria-hidden="true" className="hidden xl:block">
                <DeskObject name="envelope" eager className="absolute -left-16 top-28 z-[3]" />
                <DeskObject name="pen" eager className="absolute -left-16 top-[520px] z-[3]" />
                <DeskObject name="cup" eager className="absolute -right-12 top-24 z-[3]" />
                <StickyNote className="absolute right-[7%] top-[380px] z-[3] h-[166px] rotate-[5deg]">{'Factur-X ok!\nsend via PDP\nbefore Friday'}</StickyNote>
                <Phone className="absolute -bottom-28 -right-10 z-[6]" />
                <DeskObject name="coins" eager className="absolute bottom-12 left-[18%] z-[5]" />
            </div>

            <div className="relative z-[4] mx-auto max-w-6xl px-5 text-center">
                <p className="enter inline-flex items-center gap-2.5 rounded-[10px] bg-[rgb(10_30_42/0.35)] py-1.5 pl-3.5 pr-1.5 text-sm text-[#ebeff2] shadow-[inset_0_0_0_1px_rgb(151_216_248/0.3)]">
                    Cloud opens November 2026
                    <span className="rounded-md bg-[oklch(0.76_0.136_230)] px-2 py-1.5 font-mono text-xs font-bold leading-none text-[oklch(0.16_0.024_230)]">
                        WAITLIST OPEN
                    </span>
                </p>
                <h1 className="enter mx-auto mt-7 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.035em] [text-shadow:0_2px_24px_rgb(3_20_30/0.3)] sm:text-6xl lg:text-[80px] lg:leading-[1.02]">
                    The invoicing app that keeps up with you.
                </h1>
                <p className="enter mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[rgb(235_239_242/0.84)] sm:text-xl">
                    Quotes, invoices, payments and e-invoicing to the tax office, in one open-source app. Host it yourself today, or
                    join the waiting list for our cloud, which opens in November 2026.
                </p>
                <div className="enter mt-9 flex flex-wrap justify-center gap-3">
                    <Button size="lg" variant="desk" asChild className="h-12 rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={links.app}>Join the waiting list</a>
                    </Button>
                    <Button size="lg" variant="glass" asChild className="h-12 rounded-[10px] px-6 text-base active:scale-[0.98]">
                        <a href={links.demo}>Try the live demo</a>
                    </Button>
                </div>
                <p className="enter mt-4 text-[15px] text-[rgb(235_239_242/0.78)]">
                    Or{' '}
                    <a href="#hosting" className="text-white underline underline-offset-4">
                        self-host it free
                    </a>{' '}
                    with Docker.
                </p>

                <div className="enter relative mx-auto mt-16 max-w-3xl">
                    {/* The clip holds the sheet by its top edge: its outer loop passes under the paper, its
                        inner loop lies on it. Both halves share one frame and one position. */}
                    <DeskObject name="paperclip-back" eager className="absolute -top-[30px] left-1/2 z-0 hidden sm:block" />
                    <div className="relative z-[1]">
                        <SampleInvoice />
                    </div>
                    <DeskObject name="paperclip-front" eager className="absolute -top-[30px] left-1/2 z-[2] hidden sm:block" />
                </div>
            </div>
        </section>
    )
}
