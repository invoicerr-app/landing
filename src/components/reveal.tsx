import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface RevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

// Fades its children up the first time they scroll into view. The hidden state lives in CSS
// (`.reveal` in src/index.css) rather than in an inline style, so the build-time render in
// scripts/prerender.mjs emits plain readable markup and a reader without JavaScript sees the text.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [shown, setShown] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node || shown) return
        if (typeof IntersectionObserver === 'undefined') {
            setShown(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return
                setShown(true)
                observer.disconnect()
            },
            // Waits until the element is 80px inside the viewport, the way it did before.
            { rootMargin: '0px 0px -80px 0px' },
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [shown])

    return (
        <div
            ref={ref}
            className={cn('reveal', shown && 'reveal-in', className)}
            style={delay ? { transitionDelay: `${delay}s` } : undefined}
        >
            {children}
        </div>
    )
}
