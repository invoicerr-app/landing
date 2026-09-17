import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const stages = [
    { label: 'Queued', tone: 'bg-secondary text-secondary-foreground' },
    { label: 'Sent to KSeF', tone: 'bg-info text-info-foreground' },
    { label: 'Cleared', tone: 'bg-success text-success-foreground' },
]

// Walks one invoice through a national clearance round-trip while the card is on screen.
export function ClearanceStatus() {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { margin: '-20%' })
    const reduced = useReducedMotion()
    const [stage, setStage] = useState(0)

    useEffect(() => {
        if (!inView || reduced) return
        const timer = setInterval(() => setStage((current) => (current + 1) % stages.length), 1800)
        return () => clearInterval(timer)
    }, [inView, reduced])

    const current = stages[reduced ? stages.length - 1 : stage]

    return (
        <div ref={ref} className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted-foreground">INVOICE-2026-0006</span>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={current.label}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', current.tone)}
                    >
                        {current.label}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {['PDP', 'Chorus Pro', 'KSeF', 'SdI', 'SdI over PEC', 'E-mail'].map((channel) => (
                    <span
                        key={channel}
                        className={cn(
                            'rounded-md border px-2 py-1 text-xs transition-colors',
                            channel === 'KSeF' ? 'border-primary/50 bg-accent text-accent-foreground' : 'border-border text-muted-foreground',
                        )}
                    >
                        {channel}
                    </span>
                ))}
            </div>
        </div>
    )
}
