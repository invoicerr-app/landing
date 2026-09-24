import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuideIt } from '@/components/e-invoicing-guide-it'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
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
                <GuideLinks current="/fatturazione-elettronica" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
