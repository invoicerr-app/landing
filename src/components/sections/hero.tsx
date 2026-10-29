import { Button } from '@/components/ui/button'
import { WindowFrame } from '@/components/window-frame'
import { links } from '@/lib/links'

// The entrances below are the `enter` classes from src/index.css rather than animation-library
// props: the library writes its first frame into the markup as `style="opacity:0"`, and this
// block holds the page's headline, which has to be legible in the HTML a crawler receives.
export function Hero() {
    return (
        <section className="relative pt-28 sm:pt-36">
            <div className="mx-auto max-w-6xl px-5">
                <div className="max-w-3xl">
                    <h1 className="enter text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                        The invoicing app that keeps up with you.
                    </h1>
                    <p className="enter mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                        Quotes, invoices, payments and e-invoicing to the tax office, in one open-source app. Host it
                        yourself today, or join the waiting list for our cloud, which opens in November 2026.
                    </p>
                    <div className="enter mt-9 flex flex-wrap items-center gap-3">
                        <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.demo}>Try the live demo</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href="#hosting">Self-host it</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.app}>Join the waiting list</a>
                        </Button>
                    </div>
                </div>

                <div className="enter mt-16 pb-24 sm:mt-20">
                    <WindowFrame>
                        <img
                            src="/screens/dashboard.webp"
                            width={1440}
                            height={900}
                            alt="The Invoicerr dashboard: open quotes, invoiced and overdue totals, pending invoices and a revenue chart."
                            className="block w-full dark:hidden"
                            fetchPriority="high"
                            decoding="async"
                        />
                        <img
                            src="/screens/dashboard-dark.webp"
                            width={1440}
                            height={900}
                            alt="The Invoicerr dashboard in its dark theme."
                            className="hidden w-full dark:block"
                            decoding="async"
                        />
                    </WindowFrame>
                </div>
            </div>
        </section>
    )
}
