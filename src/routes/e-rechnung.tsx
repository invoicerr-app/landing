import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuideDe } from '@/components/e-invoicing-guide-de'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/e-rechnung')({
    component: ERechnungRoute,
})

function ERechnungRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="de">
                <EInvoicingGuideDe />
                <GuideLinks current="/e-rechnung" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
