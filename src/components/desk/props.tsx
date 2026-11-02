import { useId } from 'react'

import { cn } from '@/lib/utils'

// The objects lying on the home page's desk, drawn from above. All of them are decoration: each one
// is aria-hidden and carries no text a reader would miss. They are SVG rather than images so they
// stay sharp at any size and add nothing to the page weight.

const SQUARE = 'M168 96H344A72 72 0 0 1 416 168V344A72 72 0 0 1 344 416H168A72 72 0 0 1 96 344V168A72 72 0 0 1 168 96Z'

/** The brand mark as an <svg> to nest inside another <svg> (BrandMark is a standalone element). */
function MarkGlyph({ x, y, width, height, left, right }: { x: number; y: number; width: number; height: number; left: string; right: string }) {
    const id = useId()
    return (
        <svg x={x} y={y} width={width} height={height} viewBox="86 36 344 390">
            <defs>
                <clipPath id={`${id}a`}>
                    <path d="M533.494 -600.41 L-61.136 1098.535 L-910.609 801.22 L-315.978 -897.725 Z" />
                </clipPath>
                <clipPath id={`${id}b`}>
                    <path d="M573.136 -586.535 L-21.494 1112.41 L827.978 1409.725 L1422.609 -289.22 Z" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}a)`}>
                <path d={SQUARE} fill={left} />
            </g>
            <g transform="translate(18.5 -52.856)" clipPath={`url(#${id}b)`}>
                <path d={SQUARE} fill={right} />
            </g>
        </svg>
    )
}

interface PropProps {
    className?: string
}

const shadow = 'drop-shadow-[10px_18px_14px_rgb(3_12_18/0.45)]'

/** An envelope with a stamp bearing the mark, and a postmark. */
export function Envelope({ className }: PropProps) {
    return (
        <svg aria-hidden="true" width="300" height="190" viewBox="0 0 300 190" className={cn(shadow, className)}>
            <rect width="300" height="190" rx="6" fill="#f5f7f8" />
            <path d="M0 2 L150 104 L300 2" fill="none" stroke="rgb(15 31 42 / 0.13)" strokeWidth="2" />
            <path d="M0 190 L122 92 M300 190 L178 92" stroke="rgb(15 31 42 / 0.07)" strokeWidth="2" />
            <rect x="214" y="14" width="68" height="80" fill="#fff" stroke="#e1e7ea" />
            <rect x="220" y="20" width="56" height="68" fill="#0099cb" />
            <MarkGlyph x={234} y={34} width={28} height={32} left="#0f1f2a" right="#fff" />
            <circle cx="208" cy="58" r="28" fill="none" stroke="rgb(15 31 42 / 0.5)" strokeWidth="2" />
            <circle cx="208" cy="58" r="21" fill="none" stroke="rgb(15 31 42 / 0.35)" />
            <text x="208" y="62" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="9" fontWeight="700" fill="rgb(15 31 42 / 0.6)">
                FRANCE
            </text>
            <path
                d="M150 46 q8 -5 16 0 t16 0 t16 0 M150 58 q8 -5 16 0 t16 0 t16 0 M150 70 q8 -5 16 0 t16 0 t16 0"
                fill="none"
                stroke="rgb(15 31 42 / 0.35)"
                strokeWidth="1.6"
            />
            <rect x="96" y="128" width="130" height="7" rx="3.5" fill="#cfd8dd" />
            <rect x="96" y="144" width="96" height="7" rx="3.5" fill="#dde4e8" />
            <rect x="96" y="160" width="110" height="7" rx="3.5" fill="#dde4e8" />
        </svg>
    )
}

/** A fountain pen in the brand ink. */
export function FountainPen({ className }: PropProps) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="330" height="30" viewBox="0 0 330 30" className={cn(shadow, className)}>
            <defs>
                <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#456273" />
                    <stop offset=".45" stopColor="#0f1f2a" />
                    <stop offset="1" stopColor="#050b0f" />
                </linearGradient>
                <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f3f6f7" />
                    <stop offset=".5" stopColor="#a7b1b6" />
                    <stop offset="1" stopColor="#6c767b" />
                </linearGradient>
            </defs>
            <rect x="0" y="5" width="40" height="20" rx="10" fill={`url(#${id}b)`} />
            <rect x="20" y="4" width="160" height="22" rx="6" fill={`url(#${id}b)`} />
            <rect x="34" y="12" width="110" height="5" rx="2.5" fill={`url(#${id}s)`} />
            <rect x="176" y="3" width="9" height="24" fill={`url(#${id}s)`} />
            <path d="M185 6 H266 L282 10 V20 L266 24 H185 Z" fill={`url(#${id}b)`} />
            <path d="M282 9 L318 14.2 Q323 15 318 15.8 L282 21 Z" fill={`url(#${id}s)`} />
            <line x1="290" y1="15" x2="318" y2="15" stroke="#5b656a" />
        </svg>
    )
}

/** A cup of coffee on its saucer. */
export function CoffeeCup({ className }: PropProps) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="230" height="200" viewBox="0 0 230 200" className={cn(shadow, className)}>
            <defs>
                <radialGradient id={`${id}s`} cx=".45" cy=".4" r=".65">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset=".85" stopColor="#e6ecef" />
                    <stop offset="1" stopColor="#c7d2d8" />
                </radialGradient>
                <radialGradient id={`${id}c`} cx=".45" cy=".42" r=".6">
                    <stop offset="0" stopColor="#8a5a34" />
                    <stop offset=".6" stopColor="#4a2a15" />
                    <stop offset="1" stopColor="#26150a" />
                </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="94" fill={`url(#${id}s)`} />
            <circle cx="100" cy="100" r="72" fill="none" stroke="rgb(15 31 42 / 0.06)" strokeWidth="2" />
            <rect x="148" y="88" width="62" height="24" rx="12" fill="#f4f7f8" stroke="rgb(15 31 42 / 0.1)" />
            <circle cx="100" cy="100" r="61" fill="#fbfcfc" stroke="rgb(15 31 42 / 0.1)" strokeWidth="2" />
            <circle cx="100" cy="100" r="51" fill={`url(#${id}c)`} />
            <ellipse cx="86" cy="84" rx="18" ry="8" fill="rgb(255 230 200 / 0.2)" />
        </svg>
    )
}

/**
 * A phone face up, showing two notifications. Illustrative only: the numbers match the sample
 * invoice in the hero, which is not a real customer's.
 */
export function Phone({ className }: PropProps) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="210" height="420" viewBox="0 0 210 420" className={cn('drop-shadow-[18px_26px_18px_rgb(3_12_18/0.5)]', className)}>
            <defs>
                <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4a5b66" />
                    <stop offset="1" stopColor="#0b1318" />
                </linearGradient>
                <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#17394a" />
                    <stop offset="1" stopColor="#0c171d" />
                </linearGradient>
            </defs>
            <rect width="210" height="420" rx="36" fill={`url(#${id}b)`} />
            <rect x="8" y="8" width="194" height="404" rx="29" fill={`url(#${id}s)`} />
            <rect x="80" y="18" width="50" height="14" rx="7" fill="#05090c" />
            <text x="105" y="102" textAnchor="middle" fontFamily="Space Grotesk Variable, sans-serif" fontSize="46" fontWeight="500" fill="#ebeff2">
                14:32
            </text>
            <text x="105" y="124" textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontSize="12" fill="#8c9ba2">
                Monday 2 November
            </text>
            <rect x="18" y="156" width="174" height="80" rx="16" fill="rgb(235 239 242 / 0.13)" />
            <rect x="28" y="168" width="22" height="22" rx="6" fill="#0f1f2a" />
            <MarkGlyph x={31} y={170} width={16} height={18} left="#fff" right="#39c0f6" />
            <text x="58" y="183" fontFamily="Inter Variable, sans-serif" fontSize="11" fontWeight="600" fill="#ebeff2">
                Invoicerr
            </text>
            <text x="28" y="208" fontFamily="Inter Variable, sans-serif" fontSize="12" fontWeight="600" fill="#ebeff2">
                F-2026-0142 paid
            </text>
            <text x="28" y="225" fontFamily="Inter Variable, sans-serif" fontSize="11" fill="#a9b7be">
                €2,952.00 matched to bank
            </text>
            <rect x="18" y="246" width="174" height="62" rx="16" fill="rgb(235 239 242 / 0.09)" />
            <text x="28" y="272" fontFamily="Inter Variable, sans-serif" fontSize="12" fontWeight="600" fill="#ebeff2">
                Quote D-2026-031 signed
            </text>
            <text x="28" y="290" fontFamily="Inter Variable, sans-serif" fontSize="11" fill="#a9b7be">
                Deposit 30% requested
            </text>
            <rect x="75" y="396" width="60" height="4" rx="2" fill="rgb(255 255 255 / 0.5)" />
        </svg>
    )
}

/** Two euro coins. */
export function Coins({ className }: PropProps) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="120" height="90" viewBox="0 0 120 90" className={cn('drop-shadow-[6px_10px_6px_rgb(3_12_18/0.4)]', className)}>
            <defs>
                <radialGradient id={`${id}g`} cx=".4" cy=".35" r=".7">
                    <stop offset="0" stopColor="#f6e2a0" />
                    <stop offset="1" stopColor="#b98e2c" />
                </radialGradient>
                <radialGradient id={`${id}s`} cx=".4" cy=".35" r=".7">
                    <stop offset="0" stopColor="#f1f3f2" />
                    <stop offset="1" stopColor="#8f9692" />
                </radialGradient>
            </defs>
            <circle cx="38" cy="50" r="32" fill={`url(#${id}g)`} />
            <circle cx="38" cy="50" r="21" fill={`url(#${id}s)`} />
            <text x="38" y="58" textAnchor="middle" fontFamily="Space Grotesk Variable, sans-serif" fontSize="22" fontWeight="700" fill="#6f746f">
                €
            </text>
            <circle cx="90" cy="34" r="25" fill={`url(#${id}s)`} />
            <circle cx="90" cy="34" r="16" fill={`url(#${id}g)`} />
        </svg>
    )
}

/** A steel paperclip. */
export function Paperclip({ className }: PropProps) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="42" height="124" viewBox="0 0 42 124" className={cn('drop-shadow-[3px_6px_3px_rgb(3_12_18/0.3)]', className)}>
            <defs>
                <linearGradient id={id} x1="0" x2="1">
                    <stop offset="0" stopColor="#7f868a" />
                    <stop offset=".5" stopColor="#f3f5f6" />
                    <stop offset="1" stopColor="#737a7e" />
                </linearGradient>
            </defs>
            <path
                d="M18 42 V98 A6 6 0 0 0 30 98 V18 A12 12 0 0 0 6 18 V104 A15 15 0 0 0 36 104 V46"
                fill="none"
                stroke={`url(#${id})`}
                strokeWidth="4.5"
                strokeLinecap="round"
            />
        </svg>
    )
}

/** A light azure sticky note with a handwritten line. */
export function StickyNote({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'box-border w-44 whitespace-pre-line bg-gradient-to-b from-[#d9f2fe] to-[#b4e2f8] px-4 pb-3 pt-6 font-hand text-2xl leading-[1.05] font-semibold text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.6),4px_14px_18px_rgb(3_12_18/0.4)]',
                className,
            )}
        >
            {children}
        </div>
    )
}
