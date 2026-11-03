import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { KsefGuidePl } from '@/components/ksef-guide-pl'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/ksef')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('pl'),
    component: KsefRoute,
})

function KsefRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main id="main" tabIndex={-1} lang="pl">
                    <KsefGuidePl />
                    <GuideLinks current="/ksef" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
