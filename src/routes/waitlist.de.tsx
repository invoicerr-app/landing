import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// German. The stable URL of this version, linked from the other five as an hreflang alternate and
// served by the Worker when the Referer is the German guide or Accept-Language asks for de.
export const Route = createFileRoute('/waitlist/de')({
    component: WaitlistDERoute,
})

function WaitlistDERoute() {
    return (
        <MotionConfig reducedMotion="user">
            <WaitlistPage language="de" />
        </MotionConfig>
    )
}
