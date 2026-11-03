import { useId } from 'react'

import { BrandMark } from '@/components/brand-mark'
import { cn } from '@/lib/utils'

// The small things on the desk that are drawn in code rather than rendered: they carry text, or are
// cheaper as a few gradients than as an image. All of them are decoration, hidden from assistive
// technology. The rendered objects (cup, pen, phone…) are in ./objects.tsx.

/**
 * A light azure sticky note with a handwritten line. The glue strip along the top keeps it flat
 * there, the bottom edge lifts a little: a darker band under the glue, a highlight where the paper
 * curls, and a shadow that is deeper under the free corner than under the glued edge.
 */
export function StickyNote({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div aria-hidden="true" className={cn('relative box-border w-44', className)}>
            <div className="absolute inset-x-3 bottom-0 top-6 rounded-[40%_40%_6px_6px/12%_12%_6px_6px] bg-[rgb(3_12_18/0.5)] blur-[10px] [transform:translate(6px,10px)_skewX(-2deg)]" />
            <div
                className="relative size-full whitespace-pre-line px-4 pb-3 pt-7 font-hand text-2xl leading-[1.05] font-semibold text-[#14303f] [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%,0_96%)]"
                style={{
                    // The paper's colour under the gradients, so the ink stays legible without them (RGAA 10.5).
                    backgroundColor: '#bfe6f9',
                    backgroundImage: [
                        // the curl of the free bottom edge
                        'linear-gradient(to top, rgb(255 255 255 / 0.35), rgb(255 255 255 / 0) 9%)',
                        // the glued strip, a touch darker and flatter than the rest
                        'linear-gradient(to bottom, rgb(0 80 120 / 0.1) 0, rgb(0 80 120 / 0.1) 22px, rgb(0 80 120 / 0) 23px)',
                        // light from the top left, falling off across the note
                        'linear-gradient(160deg, rgb(255 255 255 / 0.45), rgb(255 255 255 / 0) 55%)',
                        // paper fibre
                        'repeating-linear-gradient(92deg, rgb(255 255 255 / 0) 0 3px, rgb(255 255 255 / 0.06) 3px 4px)',
                        'linear-gradient(175deg, #d4f0fd, #a9dcf5)',
                    ].join(', '),
                }}
            >
                {children}
            </div>
        </div>
    )
}

/** The steel clip at the head of a clipboard: a pressed plate, a hinge, two rivets and a lever. */
export function ClipboardClip({ className }: { className?: string }) {
    const id = useId()
    return (
        <svg aria-hidden="true" width="176" height="70" viewBox="0 0 176 70" className={cn('drop-shadow-[0_8px_8px_rgb(3_12_18/0.35)]', className)}>
            <defs>
                <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f7f9fa" />
                    <stop offset=".18" stopColor="#dfe5e8" />
                    <stop offset=".55" stopColor="#a8b2b7" />
                    <stop offset=".8" stopColor="#c9d1d5" />
                    <stop offset="1" stopColor="#8d989e" />
                </linearGradient>
                <linearGradient id={`${id}l`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#eef2f4" />
                    <stop offset=".5" stopColor="#9aa5ab" />
                    <stop offset="1" stopColor="#6f7b82" />
                </linearGradient>
                <radialGradient id={`${id}r`} cx=".35" cy=".3" r=".7">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset=".6" stopColor="#b9c3c8" />
                    <stop offset="1" stopColor="#6f7b82" />
                </radialGradient>
            </defs>
            {/* the base plate, riveted to the board */}
            <path d="M14 22 Q14 12 26 12 H150 Q162 12 162 22 V52 Q162 62 150 62 H26 Q14 62 14 52 Z" fill={`url(#${id}p)`} stroke="rgb(15 31 42 / 0.35)" strokeWidth="1" />
            <path d="M22 16 H154" stroke="rgb(255 255 255 / 0.9)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="30" cy="46" r="5" fill={`url(#${id}r)`} stroke="rgb(15 31 42 / 0.4)" strokeWidth="0.8" />
            <circle cx="146" cy="46" r="5" fill={`url(#${id}r)`} stroke="rgb(15 31 42 / 0.4)" strokeWidth="0.8" />
            {/* the hinge roll and the lever that opens the clip */}
            <rect x="40" y="26" width="96" height="12" rx="6" fill={`url(#${id}l)`} stroke="rgb(15 31 42 / 0.35)" strokeWidth="0.8" />
            <path d="M58 32 H118" stroke="rgb(255 255 255 / 0.7)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M64 38 Q64 54 74 56 H102 Q112 54 112 38" fill="none" stroke={`url(#${id}l)`} strokeWidth="5" strokeLinecap="round" />
            <path d="M66 40 Q66 52 75 54 H101 Q110 52 110 40" fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    )
}

/** A perforated postage stamp bearing the mark, as on the envelope rendered in the hero. */
export function Stamp({ className }: { className?: string }) {
    const id = useId()
    const holes = []
    for (let x = 0; x <= 78; x += 7.8) holes.push([x, 0], [x, 92])
    for (let y = 0; y <= 92; y += 7.6) holes.push([0, y], [78, y])
    return (
        <div aria-hidden="true" className={cn('relative h-[92px] w-[78px] drop-shadow-[0_2px_2px_rgb(3_12_18/0.2)]', className)}>
            <svg width="78" height="92" viewBox="0 0 78 92" className="absolute inset-0">
                <defs>
                    <mask id={`${id}m`}>
                        <rect width="78" height="92" fill="#fff" />
                        {holes.map(([x, y]) => (
                            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#000" />
                        ))}
                    </mask>
                    <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#0aa3d6" />
                        <stop offset="1" stopColor="#0089b8" />
                    </linearGradient>
                </defs>
                <rect width="78" height="92" fill="#fff" mask={`url(#${id}m)`} />
                <rect x="7" y="7" width="64" height="78" fill={`url(#${id}g)`} />
                <text x="39" y="76" textAnchor="middle" fontFamily="Space Mono, monospace" fontSize="8.5" fontWeight="700" letterSpacing="1" fill="#ffffff">
                    EUR 1,96
                </text>
            </svg>
            <BrandMark variant="mono" className="absolute left-1/2 top-[18px] h-9 -translate-x-1/2 text-ink [&_g:last-of-type_path]:fill-white" />
        </div>
    )
}
