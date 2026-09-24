import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { PeppolGuide } from '@/components/peppol-guide'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/e-invoicing/peppol')({
    component: PeppolRoute,
})

function PeppolRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main>
                <PeppolGuide />
                <GuideLinks current="/e-invoicing/peppol" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
