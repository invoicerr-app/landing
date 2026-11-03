import { cn } from '@/lib/utils'

// The objects lying on the home page's desk: renders made in Blender, seen from above under the same
// light as the desk (a soft window up and to the left), with their shadow in the alpha channel so
// they sit on any colour of desk. Each one is rendered at the angle it is shown at, because turning
// the image in CSS would turn its shadow with it. Sizes are the CSS size, the files are 2x.
//
// All of them are decoration: empty alt, hidden from assistive technology, no text a reader would
// miss. The phone's notifications and the envelope's address follow the sample invoice in the hero,
// which is not a customer's.
const objects = {
    cup: { src: '/desk/cup.webp', width: 280, height: 260 },
    envelope: { src: '/desk/envelope.webp', width: 359, height: 280 },
    pen: { src: '/desk/pen.webp', width: 379, height: 239 },
    'pen-footer': { src: '/desk/pen-footer.webp', width: 378, height: 239 },
    phone: { src: '/desk/phone.webp', width: 359, height: 520 },
    coins: { src: '/desk/coins.webp', width: 169, height: 130 },
    paperclip: { src: '/desk/paperclip.webp', width: 89, height: 150 },
    'paperclip-host': { src: '/desk/paperclip-host.webp', width: 89, height: 149 },
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
