import { cn } from '@/lib/utils'

interface WindowFrameProps {
    children: React.ReactNode
    className?: string
}

// Holds a real screenshot of the app: a hairline frame and nothing drawn around it.
export function WindowFrame({ children, className }: WindowFrameProps) {
    return <div className={cn('overflow-hidden rounded-lg border border-border bg-card', className)}>{children}</div>
}
