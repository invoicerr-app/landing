import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { EInvoicingGuideIt } from '@/components/e-invoicing-guide-it'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/fatturazione-elettronica')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('it'),
    component: FatturazioneElettronicaRoute,
})

function FatturazioneElettronicaRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main lang="it">
                    <EInvoicingGuideIt />
                    <GuideLinks current="/fatturazione-elettronica" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
