import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { EInvoicingGuidePt } from '@/components/e-invoicing-guide-pt'
import Footer from '@/components/footer'
import Header from '@/components/header'

export const Route = createFileRoute('/faturacao-eletronica')({
    component: FaturacaoEletronicaRoute,
})

function FaturacaoEletronicaRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="pt">
                <EInvoicingGuidePt />
            </main>
            <Footer />
        </MotionConfig>
    )
}
