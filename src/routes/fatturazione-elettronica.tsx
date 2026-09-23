import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuideIt } from '@/components/e-invoicing-guide-it'
import Footer from '@/components/footer'
import Header from '@/components/header'

export const Route = createFileRoute('/fatturazione-elettronica')({
    component: FatturazioneElettronicaRoute,
})

function FatturazioneElettronicaRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="it">
                <EInvoicingGuideIt />
            </main>
            <Footer />
        </MotionConfig>
    )
}
