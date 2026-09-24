import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// Portuguese. The stable URL of this version, linked from the other five as an hreflang alternate and
// served by the Worker when the Referer is the Portuguese guide or Accept-Language asks for pt.
export const Route = createFileRoute('/waitlist/pt')({
    component: WaitlistPTRoute,
})

function WaitlistPTRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <WaitlistPage language="pt" />
        </MotionConfig>
    )
}
