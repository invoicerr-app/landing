import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// English, and the x-default of the hreflang set: the version a reader gets when neither the guide
// they came from nor their Accept-Language names one of the other five.
export const Route = createFileRoute('/waitlist/')({
    component: WaitlistEnRoute,
})

function WaitlistEnRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <WaitlistPage language="en" />
        </MotionConfig>
    )
}
