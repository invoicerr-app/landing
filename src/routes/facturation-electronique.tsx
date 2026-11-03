import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { EInvoicingGuideFr } from '@/components/e-invoicing-guide-fr'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/facturation-electronique')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('fr'),
    component: FactureElectroniqueRoute,
})

function FactureElectroniqueRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main id="main" tabIndex={-1} lang="fr">
                    <EInvoicingGuideFr />
                    <GuideLinks current="/facturation-electronique" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
