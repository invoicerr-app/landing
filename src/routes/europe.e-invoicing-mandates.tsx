import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingMandatesEu } from '@/components/e-invoicing-mandates-eu'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/europe/e-invoicing-mandates')({
    component: EInvoicingMandatesEuRoute,
})

function EInvoicingMandatesEuRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main>
                <EInvoicingMandatesEu />
                <GuideLinks current="/europe/e-invoicing-mandates" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
