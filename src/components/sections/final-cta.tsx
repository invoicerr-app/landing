import { Stamp } from '@/components/desk/props'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'
import { monthYear, useNow } from '@/lib/today'

// The last call, written on an envelope lying on the desk: addressed, stamped with the mark and
// postmarked. It sits inside the desk footer (Footer's `desk` variant, home page only).
export function FinalCta() {
    const now = useNow()
    return (
        <section className="relative mx-auto max-w-[980px] px-5 pt-24">
            <div className="relative -rotate-[0.8deg] overflow-hidden rounded-lg bg-[oklch(0.985_0.004_230)] px-6 pb-12 pt-14 text-ink shadow-desk sm:px-16 sm:pt-16">
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
                    <path d="M0 0 L50 46 L100 0" fill="none" stroke="rgb(15 31 42 / 0.08)" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
                    <path d="M0 100 L40 52 M100 100 L60 52" fill="none" stroke="rgb(15 31 42 / 0.05)" strokeWidth="0.25" vectorEffect="non-scaling-stroke" />
                </svg>

                <div aria-hidden="true" className="absolute right-8 top-7 hidden items-center sm:flex">
                    <svg width="120" height="80" viewBox="0 0 120 80">
                        <circle cx="40" cy="40" r="30" fill="none" stroke="rgb(15 31 42 / 0.45)" strokeWidth="2" />
                        <circle cx="40" cy="40" r="23" fill="none" stroke="rgb(15 31 42 / 0.3)" />
                        <text x="40" y="37" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8" fontWeight="700" fill="rgb(15 31 42 / 0.6)">
                            FRANCE
                        </text>
                        <text x="40" y="48" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8" fill="rgb(15 31 42 / 0.55)">
                            {monthYear(now)}
                        </text>
                        <path
                            d="M66 26 q7 -5 14 0 t14 0 t14 0 M66 40 q7 -5 14 0 t14 0 t14 0 M66 54 q7 -5 14 0 t14 0 t14 0"
                            fill="none"
                            stroke="rgb(15 31 42 / 0.32)"
                            strokeWidth="1.6"
                        />
                    </svg>
                    <Stamp className="-ml-4 rotate-[4deg]" />
                </div>

                <div className="relative max-w-[620px]">
                    <p className="font-hand text-3xl font-semibold text-[oklch(0.45_0.11_230)]">To: your next client</p>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Send your next invoice from Invoicerr.</h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-[oklch(0.47_0.02_230)]">
                        Our cloud opens in November 2026 and the waiting list is open now. Or pull the image and have Invoicerr running on
                        your own server tonight.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                        <Button asChild className="h-12 rounded-[10px] bg-[oklch(0.64_0.13_230)] px-5 text-[oklch(0.18_0.028_230)] hover:bg-[oklch(0.68_0.13_230)]">
                            <a href={links.app}>Join the waiting list</a>
                        </Button>
                        <Button asChild className="h-12 rounded-[10px] bg-[oklch(0.94_0.012_230)] px-5 text-[oklch(0.28_0.03_230)] shadow-[inset_0_0_0_1px_oklch(0.89_0.01_230)] hover:bg-[oklch(0.91_0.03_230)]">
                            <a href={links.selfHost}>Read the install guide</a>
                        </Button>
                        <Button asChild className="h-12 rounded-[10px] bg-[oklch(0.94_0.012_230)] px-5 text-[oklch(0.28_0.03_230)] shadow-[inset_0_0_0_1px_oklch(0.89_0.01_230)] hover:bg-[oklch(0.91_0.03_230)]">
                            <a href={links.demo}>Try the live demo</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
