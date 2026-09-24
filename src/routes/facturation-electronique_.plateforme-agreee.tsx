import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { PlateformeAgreeeGuideFr } from '@/components/plateforme-agreee-guide-fr'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/facturation-electronique_/plateforme-agreee')({
    component: PlateformeAgreeeRoute,
})

function PlateformeAgreeeRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main lang="fr">
                <PlateformeAgreeeGuideFr />
                <GuideLinks current="/facturation-electronique/plateforme-agreee" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
