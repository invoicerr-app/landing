import { cn } from '@/lib/utils'

// The objects lying on the home page's desk: renders made in Blender, seen from above under the same
// light as the desk (a soft window up and to the left), with their shadow in the alpha channel so
// they sit on any colour of desk. Each one is rendered at the angle it is shown at, because turning
// the image in CSS would turn its shadow with it. Sizes are the CSS size, the files are 2x.
//
// All of them are decoration: empty alt, hidden from assistive technology, no text a reader would
// miss. The envelope's address follows the sample invoice in the hero, which is not a customer's.
const objects = {
    cup: { src: '/desk/cup.webp', width: 280, height: 260 },
    envelope: { src: '/desk/envelope.webp', width: 359, height: 280 },
    pen: { src: '/desk/pen.webp', width: 379, height: 239 },
    'pen-footer': { src: '/desk/pen-footer.webp', width: 378, height: 239 },
    // Screen off: components/desk/phone.tsx lays the lock screen over it.
    phone: { src: '/desk/phone.webp', width: 360, height: 520 },
    coins: { src: '/desk/coins.webp', width: 169, height: 130 },
    // The clip on the hero's invoice, in two halves: the back goes under the sheet, the front over it.
    'paperclip-back': { src: '/desk/paperclip-back.webp', width: 90, height: 150 },
    'paperclip-front': { src: '/desk/paperclip-front.webp', width: 90, height: 150 },
    'paperclip-host': { src: '/desk/paperclip-host.webp', width: 89, height: 149 },
    // The bento's six, one per card, trimmed by scripts/desk-renders/trim.py.
    stamp: { src: '/desk/stamp.webp', width: 238, height: 210 },
    stopwatch: { src: '/desk/stopwatch.webp', width: 204, height: 239 },
    keys: { src: '/desk/keys.webp', width: 238, height: 200 },
    magnifier: { src: '/desk/magnifier.webp', width: 254, height: 277 },
    cable: { src: '/desk/cable.webp', width: 276, height: 138 },
    notes: { src: '/desk/notes.webp', width: 211, height: 164 },
} as const

export type DeskObjectName = keyof typeof objects

interface DeskObjectProps {
    name: DeskObjectName
    className?: string
    /** The hero's objects are on screen at load; the others wait until they are scrolled to. */
    eager?: boolean
}

export function DeskObject({ name, className, eager = false }: DeskObjectProps) {
    const object = objects[name]
    return (
        <img
            src={object.src}
            width={object.width}
            height={object.height}
            alt=""
            aria-hidden="true"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className={cn('pointer-events-none max-w-none select-none', className)}
        />
    )
}
