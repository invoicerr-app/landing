import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { KsefGuidePl } from '@/components/ksef-guide-pl'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/ksef')({
    component: KsefRoute,
})

function KsefRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="pl">
                <KsefGuidePl />
                <GuideLinks current="/ksef" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
