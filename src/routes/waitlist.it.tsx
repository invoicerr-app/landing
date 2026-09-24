import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// Italian. The stable URL of this version, linked from the other five as an hreflang alternate and
// served by the Worker when the Referer is the Italian guide or Accept-Language asks for it.
export const Route = createFileRoute('/waitlist/it')({
    component: WaitlistITRoute,
})

function WaitlistITRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <WaitlistPage language="it" />
        </MotionConfig>
    )
}
