import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { XRechnungGuideDe } from '@/components/xrechnung-guide-de'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/e-rechnung_/xrechnung')({
    component: XRechnungRoute,
})

function XRechnungRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="de">
                <XRechnungGuideDe />
                <GuideLinks current="/e-rechnung/xrechnung" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
