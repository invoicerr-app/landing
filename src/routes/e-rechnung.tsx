import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuideDe } from '@/components/e-invoicing-guide-de'
import Footer from '@/components/footer'
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
            </main>
            <Footer />
        </MotionConfig>
    )
}
