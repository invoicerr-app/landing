import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { EInvoicingGuidePt } from '@/components/e-invoicing-guide-pt'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/faturacao-eletronica')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('pt'),
    component: FaturacaoEletronicaRoute,
})

function FaturacaoEletronicaRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main lang="pt">
                    <EInvoicingGuidePt />
                    <GuideLinks current="/faturacao-eletronica" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
