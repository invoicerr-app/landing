import { motion, useMotionTemplate, useMotionValue } from 'motion/react'

import { cn } from '@/lib/utils'

interface SpotlightCardProps {
    children: React.ReactNode
    className?: string
}

// A card whose border and surface pick up a soft azure light under the pointer. The position lives
// in motion values, so moving the mouse never re-renders React.
export function SpotlightCard({ children, className }: SpotlightCardProps) {
    const x = useMotionValue(-400)
    const y = useMotionValue(-400)
    const light = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)`
    const edge = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, color-mix(in oklab, var(--primary) 70%, transparent), transparent 70%)`

    return (
        <div
            onPointerMove={(event) => {
                const box = event.currentTarget.getBoundingClientRect()
                x.set(event.clientX - box.left)
                y.set(event.clientY - box.top)
            }}
            onPointerLeave={() => {
                x.set(-400)
                y.set(-400)
            }}
            className={cn('group relative rounded-2xl bg-border p-px', className)}
        >
            <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: edge }} />
            <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-card">
                <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: light }} />
                <div className="relative h-full">{children}</div>
            </div>
        </div>
    )
}
