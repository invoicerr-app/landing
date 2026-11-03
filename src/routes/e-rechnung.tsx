import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { EInvoicingGuideDe } from '@/components/e-invoicing-guide-de'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/e-rechnung')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('de'),
    component: ERechnungRoute,
})

function ERechnungRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main id="main" tabIndex={-1} lang="de">
                    <EInvoicingGuideDe />
                    <GuideLinks current="/e-rechnung" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
