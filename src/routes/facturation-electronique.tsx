import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuideFr } from '@/components/e-invoicing-guide-fr'
import Footer from '@/components/footer'
import Header from '@/components/header'

export const Route = createFileRoute('/facturation-electronique')({
    component: FactureElectroniqueRoute,
})

function FactureElectroniqueRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="fr">
                <EInvoicingGuideFr />
            </main>
            <Footer />
        </MotionConfig>
    )
}
