import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { WaitlistPage } from '@/components/waitlist/waitlist-page'

// Polish. The stable URL of this version, linked from the other five as an hreflang alternate and
// served by the Worker when the Referer is the Polish guide or Accept-Language asks for pl.
export const Route = createFileRoute('/waitlist/pl')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('pl'),
    component: WaitlistPLRoute,
})

function WaitlistPLRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <WaitlistPage language="pl" />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
