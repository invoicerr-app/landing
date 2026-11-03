import { Lock } from 'lucide-react'

import { sampleStory } from '@/components/desk/sample'
import { Eyebrow } from '@/components/desk/tear'
import { useHome } from '@/i18n/home/context'
import { fmt } from '@/i18n/home/format'
import { amount, isoDate, useNow } from '@/lib/today'

// The four steps as four folders, from the lightest to the brand ink, each holding the sheet that
// step produces. The sheets are drawn, not screenshots, and hidden from assistive technology: the
// step's title and text carry everything they show. Their numbers follow the sample invoice in the
// hero, which is not a customer's.

const paper = 'flex min-h-[150px] flex-col gap-2.5 rounded bg-paper p-4 text-ink shadow-[0_6px_14px_rgb(10_50_75/0.12)]'
const muted = 'text-[oklch(0.47_0.02_230)]'

function QuoteSheet() {
    const { copy } = useHome()
    const story = sampleStory(useNow())
    return (
        <div aria-hidden="true" className={`${paper} -rotate-[1.2deg]`}>
            <span className="font-mono text-[11px] font-bold uppercase text-[oklch(0.45_0.11_230)]">{copy.flow.sheets.quote} {story.quote}</span>
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
    const { copy, locale } = useHome()
    const t = copy.flow.sheets
    const story = sampleStory(useNow())
    return (
        <div aria-hidden="true" className={`${paper} rotate-[0.8deg] gap-2 font-mono text-[11px] leading-tight`}>
            <span className="font-bold uppercase text-[oklch(0.45_0.11_230)]">{t.invoice} {story.invoice}</span>
            <div className="flex justify-between"><span>{t.identity}</span><span>{amount(1800, locale)}</span></div>
            <div className="flex justify-between"><span>{t.review}</span><span>{amount(360, locale)}</span></div>
            <div className="flex justify-between"><span>{t.hosting}</span><span>{amount(300, locale)}</span></div>
            <div className="mt-auto flex items-center justify-between border-t border-[oklch(0.85_0.01_230)] pt-2">
                <span className="rounded bg-[oklch(0.92_0.06_145)] px-1.5 py-0.5 text-[oklch(0.3_0.11_145)]">Factur-X</span>
                <span className="font-bold">{amount(2952, locale)}</span>
            </div>
        </div>
    )
}

function StatementSheet() {
    const { copy, locale } = useHome()
    const t = copy.flow.sheets
    const story = sampleStory(useNow())
    return (
        <div aria-hidden="true" className={`${paper} -rotate-[0.6deg] font-mono text-[11px] leading-snug`}>
            <span className="font-bold uppercase text-[oklch(0.45_0.11_230)]">{t.statement}</span>
            <div className="flex justify-between gap-2 rounded-md bg-[oklch(0.94_0.008_230)] p-2">
                <span>VIR ATELIER RIVIERE {story.invoice}</span>
                <span className="whitespace-nowrap font-bold">+{amount(2952, locale, 0)}</span>
            </div>
            <span className="text-[oklch(0.3_0.11_145)]">✓ {t.matched}</span>
            <span className="mt-auto h-1.5 w-[70%] rounded-sm bg-[oklch(0.92_0.008_230)]" />
        </div>
    )
}

function ArchiveSheet() {
    const { copy } = useHome()
    const t = copy.flow.sheets
    const story = sampleStory(useNow())
    return (
        <div aria-hidden="true" className="flex min-h-[150px] rotate-1 flex-col gap-2.5 rounded bg-[oklch(0.225_0.016_230)] p-4 font-mono text-[11px] leading-snug text-[#c6d3d9] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
            <span className="font-bold uppercase text-azure-pale">{t.archive}</span>
            <span>sha256 9f2c 81d0 ... e41a</span>
            <span>{fmt(t.keptUntil, { date: isoDate(story.archivedUntil) })}</span>
            <span className="mt-auto flex items-center gap-2">
                <Lock className="size-4 text-azure-light" />
                {t.sealed}
            </span>
        </div>
    )
}

const steps = [
    { key: 'quote', sheet: <QuoteSheet />, folder: 'bg-[oklch(0.91_0.03_230)] text-[oklch(0.28_0.05_230)]', text: 'text-[oklch(0.38_0.025_230)]' },
    { key: 'invoice', sheet: <InvoiceSheet />, folder: 'bg-[oklch(0.86_0.06_230)] text-[oklch(0.25_0.06_230)]', text: 'text-[oklch(0.32_0.03_230)]' },
    { key: 'paid', sheet: <StatementSheet />, folder: 'bg-[oklch(0.78_0.1_230)] text-[oklch(0.2_0.05_230)]', text: 'text-[oklch(0.25_0.04_230)]' },
    {
        key: 'archived',
        sheet: <ArchiveSheet />,
        folder: 'bg-ink text-azure-pale dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]',
        text: 'text-[oklch(0.8_0.02_230)]',
    },
] as const

export function Flow() {
    const { copy } = useHome()
    const t = copy.flow
    return (
        <section id="product" className="mx-auto max-w-6xl px-5 py-24">
            <div className="max-w-3xl">
                <Eyebrow number="02">{t.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {t.lead}
                </p>
            </div>

            <ol className="mt-[72px] grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => (
                    <li key={step.key} className="relative flex flex-col">
                        <span aria-hidden="true" className={`absolute -top-[26px] start-0 flex h-[30px] items-center rounded-t-[10px] px-3 font-mono text-xs font-bold ${step.folder}`}>
                            {String(index + 1).padStart(2, '0')} {t.steps[step.key].tab}
                        </span>
                        <div className={`flex flex-1 flex-col gap-5 rounded-[14px] rounded-ss-none p-[18px] pb-6 ${step.folder}`}>
                            {step.sheet}
                            <div>
                                <h3 className={`text-[21px] font-semibold ${step.folder.includes('bg-ink') ? 'text-white' : 'text-ink'}`}>{t.steps[step.key].title}</h3>
                                <p className={`mt-2 text-[15px] leading-relaxed ${step.text}`}>{t.steps[step.key].body}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}
