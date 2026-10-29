import { cn } from '@/lib/utils'

interface WindowFrameProps {
    children: React.ReactNode
    className?: string
    /** Renders the windowed terminal chrome: three dots and a plain title label. Used only where
        the content is a real command the reader can run (the hosting panel); the screenshot frames
        stay unadorned, and no address pill ever comes back here. */
    title?: string
}

// Holds a real screenshot of the app, or a real terminal block: hairline frame, no fake address.
export function WindowFrame({ children, className, title }: WindowFrameProps) {
    return (
        <div className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>
            {title && (
                <div aria-hidden="true" className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-[#f87171]/70" />
                    <span className="size-2.5 rounded-full bg-[#fbbf24]/70" />
                    <span className="size-2.5 rounded-full bg-[#34d399]/70" />
                    <span className="ml-2 text-xs text-muted-foreground">{title}</span>
                </div>
            )}
            {children}
        </div>
    )
}
