import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { En16931Guide } from '@/components/en-16931-guide'
import Footer from '@/components/footer'
import { GuideLinks } from '@/components/guide-links'
import Header from '@/components/header'

export const Route = createFileRoute('/e-invoicing/en-16931')({
    component: En16931Route,
})

function En16931Route() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main>
                <En16931Guide />
                <GuideLinks current="/e-invoicing/en-16931" />
            </main>
            <Footer />
        </MotionConfig>
    )
}
