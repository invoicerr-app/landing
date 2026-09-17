import { cn } from '@/lib/utils'

interface WindowFrameProps {
    children: React.ReactNode
    className?: string
    /** Shown in the address pill. Omit for a bare frame. */
    address?: string
}

// Holds a real screenshot of the app. The chrome is the only drawn part.
export function WindowFrame({ children, className, address }: WindowFrameProps) {
    return (
        <div className={cn('overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-foreground/10 dark:shadow-black/40', className)}>
            <div className="flex h-9 items-center gap-1.5 border-b border-border bg-muted/60 px-3.5">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                {address && (
                    <span className="mx-auto -translate-x-5 rounded-md bg-background/70 px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {address}
                    </span>
                )}
            </div>
            {children}
        </div>
    )
}
