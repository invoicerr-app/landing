import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { DeskObject } from '@/components/desk/objects'
import { StickyNote } from '@/components/desk/props'
import { Button } from '@/components/ui/button'
import { useHome } from '@/i18n/home/context'
import { links } from '@/lib/links'

const IMAGE = 'ghcr.io/invoicerr-app/invoicerr:latest'

export function Hosting() {
    const { copy: text } = useHome()
    const t = text.hosting
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(IMAGE)
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
        } catch {
            /* clipboard blocked: the image name stays selectable */
        }
    }

    // A second piece of the desk inside the page, holding the terminal: the commands are the two the
    // install guide itself runs, and its compose file brings PostgreSQL and Redis along.
    return (
        <section id="hosting" className="scroll-mt-20 px-5 py-24">
            <div className="desk relative mx-auto max-w-6xl overflow-hidden rounded-3xl text-white shadow-[0_24px_50px_rgb(10_40_60/0.22)]">
                <DeskObject name="paperclip-host" className="absolute right-8 top-5 hidden xl:block" />
                <div className="relative grid gap-12 px-6 py-16 sm:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:px-16 lg:py-[72px]">
                    <div>
                        <p className="inline-flex items-center gap-2.5 rounded-[10px] bg-[rgb(10_30_42/0.35)] py-1.5 ps-3 pe-1.5 text-sm shadow-[inset_0_0_0_1px_rgb(151_216_248/0.3)]">
                            {t.badge}
                            <span className="rounded-md bg-[oklch(0.76_0.136_230)] px-2 py-1.5 font-mono text-xs leading-none text-[oklch(0.16_0.024_230)]">{t.badgeStatus}</span>
                        </p>
                        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[42px]">{t.title}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-[rgb(235_239_242/0.84)]">
                            {t.lead}
                        </p>
                        <ul className="mt-7 space-y-4">
                            {t.facts.map((fact) => (
                                <li key={fact.title} className="flex gap-3.5">
                                    <span aria-hidden="true" className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-md bg-[rgb(151_216_248/0.2)]">
                                        <Check className="size-3 text-azure-pale" strokeWidth={3.4} />
                                    </span>
                                    <span className="leading-relaxed text-[rgb(235_239_242/0.86)]">
                                        <strong className="font-semibold text-white">{fact.title}</strong> {fact.body}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button variant="desk" asChild className="h-12 rounded-[10px] px-5">
                                <a href={links.selfHost}>{t.installGuide}</a>
                            </Button>
                            <Button variant="glass" asChild className="h-12 rounded-[10px] px-5">
                                <a href={links.github}>{t.source}</a>
                            </Button>
                        </div>
                    </div>

                    <div className="relative md:pb-44">
                        <div className="rotate-[1.5deg] overflow-hidden rounded-[14px] bg-[oklch(0.175_0.014_230)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1),0_30px_50px_rgb(3_12_18/0.45)]">
                            <div className="flex items-center gap-2 border-b border-white/10 bg-[oklch(0.225_0.016_230)] py-2.5 ps-4 pe-2">
                                <span aria-hidden="true" className="size-3 rounded-full bg-[oklch(0.32_0.045_230)]" />
                                <span aria-hidden="true" className="size-3 rounded-full bg-[oklch(0.32_0.045_230)]" />
                                <span aria-hidden="true" className="size-3 rounded-full bg-[oklch(0.32_0.045_230)]" />
                                <span className="ms-2.5 font-mono text-[13px] text-[oklch(0.68_0.02_230)]">{t.terminal}</span>
                                <Button variant="glass" size="sm" onClick={copy} aria-label={t.copyLabel} className="ms-auto h-8 rounded-md px-2.5 text-xs">
                                    {copied ? <Check /> : <Copy />}
                                    {copied ? t.copied : t.copy}
                                </Button>
                            </div>
                            <div dir="ltr" className="space-y-1 px-6 py-6 font-mono text-sm leading-[1.9] text-[oklch(0.95_0.006_230)]">
                                {/* One line wherever it fits; on a phone it breaks after a slash, never inside a word. */}
                                <p className="break-words lg:whitespace-nowrap">
                                    <span className="text-azure-light">$</span> docker pull ghcr.io/
                                    <wbr />
                                    invoicerr-app/
                                    <wbr />
                                    invoicerr:latest
                                </p>
                                <p>
                                    <span className="text-azure-light">$</span> docker compose up -d
                                </p>
                            </div>
                        </div>
                        <StickyNote className="absolute bottom-0 end-12 hidden h-[150px] w-[168px] -rotate-[6deg] text-2xl md:block">{t.stickyNote}</StickyNote>
                    </div>
                </div>
            </div>
        </section>
    )
}
