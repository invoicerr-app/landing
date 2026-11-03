import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { HomeLocaleProvider, loadHomeLocale } from '@/i18n/home/context'
import { PlateformeAgreeeGuideFr } from '@/components/plateforme-agreee-guide-fr'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/facturation-electronique_/plateforme-agreee')({
    // The header and the footer in the page's language, like the page itself.
    loader: () => loadHomeLocale('fr'),
    component: PlateformeAgreeeRoute,
})

function PlateformeAgreeeRoute() {
    return (
        <HomeLocaleProvider value={Route.useLoaderData()}>
            <MotionConfig reducedMotion="user">
                <Header />
                <main lang="fr">
                    <PlateformeAgreeeGuideFr />
                    <GuideLinks current="/facturation-electronique/plateforme-agreee" />
                </main>
                <Footer />
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
