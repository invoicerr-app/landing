import { ArrowRight, CheckCircle2, Landmark } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

import { BrandMark } from '@/components/brand-mark'
import { Button } from '@/components/ui/button'
import { WindowFrame } from '@/components/window-frame'
import { links } from '@/lib/links'

export function Hero() {
    const stage = useRef<HTMLDivElement>(null)
    const reduced = useReducedMotion()

    // Pointer position over the stage, -0.5 to 0.5 on each axis, smoothed by a spring.
    const pointerX = useMotionValue(0)
    const pointerY = useMotionValue(0)
    const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20 })
    const smoothY = useSpring(pointerY, { stiffness: 90, damping: 20 })

    // The window starts tipped back and settles flat as the page scrolls.
    const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center center'] })
    const settle = useTransform(scrollYProgress, [0.35, 1], reduced ? [0, 0] : [16, 0])
    const scale = useTransform(scrollYProgress, [0.35, 1], reduced ? [1, 1] : [0.94, 1])
    const tiltX = useTransform([settle, smoothY], ([base, y]: number[]) => base - y * 5)
    const tiltY = useTransform(smoothX, (x) => x * 7)

    const nearX = useTransform(smoothX, (x) => x * -38)
    const nearY = useTransform(smoothY, (y) => y * -26)
    const farX = useTransform(smoothX, (x) => x * 24)
    const farY = useTransform(smoothY, (y) => y * 18)

    // The entrances below are the `enter*` classes from src/index.css rather than animation-library
    // props: the library writes its first frame into the markup as `style="opacity:0"`, and this
    // block holds the page's headline, which has to be legible in the HTML a crawler receives.
    return (
        <section className="relative overflow-hidden pt-28 sm:pt-36">
            <BrandMark
                variant="mono"
                className="pointer-events-none absolute -right-24 top-20 h-[38rem] text-foreground/[0.03] max-lg:hidden"
            />

            <div className="relative mx-auto max-w-6xl px-5">
                <div className="max-w-3xl">
                    <p className="enter mb-6 inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1 text-sm text-muted-foreground">
                        Open source. Hosted by us, or by you.
                    </p>
                    <h1 className="enter text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                        The invoicing app that keeps up with you.
                    </h1>
                    <p className="enter mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]">
                        Quotes, invoices, payments and e-invoicing to the tax office, in one open-source app. Host it
                        yourself today, or join the waiting list for our cloud, which opens in November 2026.
                    </p>
                    <div className="enter mt-9 flex flex-wrap items-center gap-3 [animation-delay:270ms]">
                        <Button size="lg" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href={links.app}>
                                Join the waiting list
                                <ArrowRight />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-11 px-6 text-base active:scale-[0.98]">
                            <a href="#hosting">Self-host it</a>
                        </Button>
                    </div>
                </div>

                <div
                    ref={stage}
                    onPointerMove={(event) => {
                        if (reduced || event.pointerType !== 'mouse') return
                        const box = event.currentTarget.getBoundingClientRect()
                        pointerX.set((event.clientX - box.left) / box.width - 0.5)
                        pointerY.set((event.clientY - box.top) / box.height - 0.5)
                    }}
                    onPointerLeave={() => {
                        pointerX.set(0)
                        pointerY.set(0)
                    }}
                    className="enter-stage relative mt-16 pb-24 [perspective:1600px] sm:mt-20"
                >
                    <motion.div style={{ rotateX: tiltX, rotateY: tiltY, scale, transformOrigin: '50% 0%' }}>
                        <WindowFrame address="my.invoicerr.app">
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
                    </motion.div>

                    <motion.div
                        style={{ x: nearX, y: nearY }}
                        className="enter-pop absolute -left-3 bottom-40 hidden w-64 rounded-xl border border-border bg-popover p-4 shadow-xl shadow-foreground/10 [animation-delay:1.1s] lg:-left-10 lg:block dark:shadow-black/40"
                    >
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Landmark className="size-4 text-primary" />
                            Payment matched
                        </div>
                        <p className="mt-2 font-mono text-2xl font-bold tracking-tight">3,800.00 EUR</p>
                        <p className="mt-1 text-xs text-muted-foreground">Bank line reconciled with INVOICE-2026-0005</p>
                    </motion.div>

                    <motion.div
                        style={{ x: farX, y: farY }}
                        className="enter-pop absolute -right-3 top-24 hidden w-72 rounded-xl border border-border bg-popover p-4 shadow-xl shadow-foreground/10 [animation-delay:1.3s] lg:-right-8 lg:block dark:shadow-black/40"
                    >
                        <p className="font-mono text-xs text-muted-foreground">INVOICE-2026-0006</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium">Sent through KSeF</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">
                                <CheckCircle2 className="size-3" />
                                Cleared
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
