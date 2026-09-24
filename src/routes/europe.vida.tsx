import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { VidaGuide } from '@/components/vida-guide'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/europe/vida')({
    component: VidaRoute,
})

function VidaRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main>
                <VidaGuide />
                <GuideLinks current="/europe/vida" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
