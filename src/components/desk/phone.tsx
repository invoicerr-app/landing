import { BrandMark } from '@/components/brand-mark'
import { sampleStory } from '@/components/desk/sample'
import { cn } from '@/lib/utils'
import { clock, lockScreenDate, useNow } from '@/lib/today'

import { DeskObject } from './objects'

/**
 * The phone on the desk: the Blender render (screen off) with its lock screen laid over it in HTML,
 * so the date, the time and the invoice number follow today. The screen's place was measured on the
 * render (PHONE_SCREEN=marker in scripts/desk-renders/desk.py): a 196 × 406 px rounded rectangle,
 * centred 167.8 px from the left and 241.8 px from the top of the 360 × 520 image, turned by -14°,
 * the angle the phone is rendered at. Decoration only, like the rest of the desk.
 */
export function Phone({ className }: { className?: string }) {
    const now = useNow()
    const story = sampleStory(now)
    return (
        <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
            <div className="relative h-[520px] w-[360px]">
                <DeskObject name="phone" eager className="absolute inset-0" />
                <div
                    className="absolute h-[406px] w-[196px] -rotate-[14deg] overflow-hidden rounded-[29px] font-sans text-[#ebeff2]"
                    style={{
                        left: 167.8 - 98,
                        top: 241.8 - 203,
                        backgroundImage:
                            'radial-gradient(70% 45% at 80% 8%, #2b6f8f 0%, rgb(43 111 143 / 0) 70%), radial-gradient(60% 40% at 10% 90%, #0b3346, rgb(11 51 70 / 0) 70%), linear-gradient(170deg, #17465c, #0c1d26 70%)',
                    }}
                >
                    <div className="absolute left-1/2 top-[9px] h-[17px] w-[59px] -translate-x-1/2 rounded-full bg-black" />
                    <div className="absolute inset-x-4 top-[13px] flex justify-between text-[8px] font-semibold leading-none">
                        <span>{clock(now)}</span>
                        <span>5G</span>
                    </div>
                    <p className="absolute inset-x-0 top-[42px] text-center text-[10px] font-medium text-[rgb(235_239_242/0.85)]">{lockScreenDate(now)}</p>
                    <p className="absolute inset-x-0 top-[52px] text-center font-heading text-[47px] font-medium leading-none tracking-[-1.2px]">{clock(now)}</p>

                    <Notification top={198} when="now" title={`${story.invoice} paid`} body="€2,952.00 matched to the bank statement" />
                    <Notification top={282} when="12 min" title={`Quote ${story.quote} signed`} body="Deposit of 30% requested" faint />

                    <div className="absolute bottom-[9px] left-1/2 h-[3px] w-[59px] -translate-x-1/2 rounded-full bg-white/75" />
                    {/* The glass: the window's reflection across the top of the screen. */}
                    <div className="absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/0.16),rgb(255_255_255/0)_38%,rgb(255_255_255/0)_70%,rgb(255_255_255/0.05))]" />
                </div>
            </div>
        </div>
    )
}

function Notification({ top, when, title, body, faint = false }: { top: number; when: string; title: string; body: string; faint?: boolean }) {
    return (
        <div className={cn('absolute inset-x-[11px] rounded-[13px] px-[9px] py-2', faint ? 'bg-[rgb(235_239_242/0.11)]' : 'bg-[rgb(235_239_242/0.16)]')} style={{ top }}>
            <div className="flex items-center gap-1.5 text-[7.5px] font-semibold leading-none text-[rgb(235_239_242/0.9)]">
                <span className="flex size-4 items-center justify-center rounded-[4px] bg-ink">
                    <BrandMark className="h-2.5 [&_path.fill-primary]:fill-azure-light text-white" />
                </span>
                Invoicerr
                <span className="ml-auto font-normal text-[rgb(235_239_242/0.6)]">{when}</span>
            </div>
            <p className="mt-1.5 text-[9px] font-semibold leading-tight">{title}</p>
            <p className="mt-0.5 text-[8px] leading-snug text-[rgb(235_239_242/0.78)]">{body}</p>
        </div>
    )
}
