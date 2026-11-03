import { type DeskObjectName, DeskObject } from '@/components/desk/objects'
import { Eyebrow } from '@/components/desk/tear'
import { Button } from '@/components/ui/button'
import { useHome } from '@/i18n/home/context'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

// The app ships no screenshot of its MCP server, so its card hangs on the app's own developer
// documentation: the endpoint below is resolved verbatim from
// documentation/docs/developer-guide/mcp-server.md on the app's dev branch.
const MCP_REFERENCE = 'https://docs.invoicerr.app/docs/developer-guide/mcp-server/'

// Each card holds an object from the desk that is the thing it talks about: the tax office's
// stamp, a stopwatch for the hours, the client's keys, a magnifier on a supplier's receipt, the
// cable the API plugs in with, banknotes in three currencies. Renders from
// scripts/desk-renders/desk.py, like the hero's objects. The grid runs on six columns, two wide
// cards and two narrow ones, then two halves, so the six never read as one repeated tile.
const features: { key: keyof ReturnType<typeof useHome>['copy']['bento']['features']; object: DeskObjectName; span: string; wide: boolean }[] = [
    { key: 'clearance', object: 'stamp', span: 'lg:col-span-4', wide: true },
    { key: 'time', object: 'stopwatch', span: 'lg:col-span-2', wide: false },
    { key: 'portal', object: 'keys', span: 'lg:col-span-2', wide: false },
    { key: 'ocr', object: 'magnifier', span: 'lg:col-span-4', wide: true },
    { key: 'api', object: 'cable', span: 'lg:col-span-3', wide: true },
    { key: 'languages', object: 'notes', span: 'lg:col-span-3', wide: true },
]

export function Bento() {
    const { copy } = useHome()
    const t = copy.bento
    return (
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-24">
            <div className="flex flex-wrap items-end justify-between gap-7">
                <div className="max-w-2xl">
                    <Eyebrow number="03">{t.eyebrow}</Eyebrow>
                    <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    <Button asChild className="h-11 rounded-[10px] px-5">
                        <a href={links.demo}>{t.tryDemo}</a>
                    </Button>
                    <Button variant="secondary" asChild className="h-11 rounded-[10px] px-5">
                        <a href={links.docs}>{t.readDocs}</a>
                    </Button>
                </div>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                {features.map((feature) => {
                    const text = t.features[feature.key]
                    return (
                        <li
                            key={feature.key}
                            className={cn(
                                'flex flex-col gap-6 overflow-hidden rounded-2xl bg-card p-7 shadow-[0_0_0_1px_var(--border),0_6px_16px_rgb(10_40_60/0.05)]',
                                feature.span,
                                feature.wide && 'sm:col-span-2 lg:flex-row lg:items-center',
                            )}
                        >
                            <div className={cn('flex shrink-0 items-center justify-center', feature.wide ? 'h-44 lg:order-2 lg:h-48 lg:w-[44%]' : 'h-44')}>
                                <DeskObject name={feature.object} className="h-full w-auto max-w-full object-contain" />
                            </div>
                            <div className="flex flex-1 flex-col gap-3">
                                <h3 className="text-xl font-semibold leading-snug">{text.title}</h3>
                                <p className="text-[15px] leading-relaxed text-muted-foreground">{text.body}</p>
                                {feature.key === 'api' && (
                                    <p className="mt-1 flex flex-wrap items-center gap-3">
                                        <code dir="ltr" className="rounded-md bg-ink px-2.5 py-1.5 font-mono text-[13px] text-azure-pale">
                                            POST /api/mcp
                                        </code>
                                        <a href={MCP_REFERENCE} className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-primary">
                                            {t.readGuide}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
