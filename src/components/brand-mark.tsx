import { useId } from 'react'

import { cn } from '@/lib/utils'

const SQUARE = 'M168 96H344A72 72 0 0 1 416 168V344A72 72 0 0 1 344 416H168A72 72 0 0 1 96 344V168A72 72 0 0 1 168 96Z'

interface BrandMarkProps {
    className?: string
    /** `duo` paints the right half in the brand azure, `mono` keeps both halves in currentColor. */
    variant?: 'duo' | 'mono'
}

// Same geometry as the app's brand/logo-mark.svg: one rounded square, cut along a 19.3 degree slash,
// the right half lifted. The viewBox is cropped to the mark's own bounds.
export function BrandMark({ className, variant = 'duo' }: BrandMarkProps) {
    const id = useId()
    return (
        <svg viewBox="92 40 348 380" fill="none" aria-hidden="true" className={cn('h-6 w-auto', className)}>
            <defs>
                <clipPath id={`${id}a`}>
                    <path d="M533.494 -600.41 L-61.136 1098.535 L-910.609 801.22 L-315.978 -897.725 Z" />
                </clipPath>
                <clipPath id={`${id}b`}>
                    <path d="M573.136 -586.535 L-21.494 1112.41 L827.978 1409.725 L1422.609 -289.22 Z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}a)`}>
                <path d={SQUARE} fill="currentColor" />
            </g>
            <g transform="translate(18.5 -52.856)" clipPath={`url(#${id}b)`}>
                <path d={SQUARE} className={variant === 'duo' ? 'fill-primary' : undefined} fill={variant === 'mono' ? 'currentColor' : undefined} />
            </g>
        </svg>
    )
}
