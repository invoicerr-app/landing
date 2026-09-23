import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// French. The stable URL of this version, linked from the other five as an hreflang alternate and
// served by the Worker when the Referer is the French guide or Accept-Language asks for fr.
export const Route = createFileRoute('/waitlist/fr')({
    component: WaitlistFRRoute,
})

function WaitlistFRRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <WaitlistPage language="fr" />
        </MotionConfig>
    )
}
