import { ArrowRight } from 'lucide-react'

import { BrandMark } from '@/components/brand-mark'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/lib/links'

export function FinalCta() {
    return (
        <section className="mx-auto max-w-6xl px-5 pb-24">
            <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 sm:px-16 sm:py-20">
                <BrandMark variant="mono" className="pointer-events-none absolute -right-16 -top-10 h-[26rem] text-primary/10" />
                <div className="relative max-w-xl">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Send your next invoice from Invoicerr.</h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        Our cloud opens in November 2026 and the waiting list is open now. Or pull the image and have
                        Invoicerr running on your own server tonight.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.app}>
                                Join the waiting list
                                <ArrowRight />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.selfHost}>Read the install guide</a>
                        </Button>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
