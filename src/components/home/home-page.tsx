import { MotionConfig } from 'motion/react'

import { Tear } from '@/components/desk/tear'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { LanguageSuggestion } from '@/components/home/language-suggestion'
import { Bento } from '@/components/sections/bento'
import { Countries } from '@/components/sections/countries'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Flow } from '@/components/sections/flow'
import { Hero } from '@/components/sections/hero'
import { Hosting } from '@/components/sections/hosting'
import { Pricing } from '@/components/sections/pricing'
import { Proof } from '@/components/sections/proof'
import { type HomeLocale, HomeLocaleProvider } from '@/i18n/home/context'

// The home page is a desk seen from above: the hero is laid on it, the sections below are one long
// sheet of paper on top of it (punched along its top edge), and the footer is the desk again. The
// approved platforms, which had a section of their own, now sit in the countries section, under the
// same #platforms anchor. The same page in every language: "/" in English, "/<code>/" otherwise.
export function HomePage({ locale }: { locale: HomeLocale }) {
    return (
        <HomeLocaleProvider value={locale}>
            <MotionConfig reducedMotion="user">
                <div dir={locale.dir}>
                    <Header overDesk />
                    <LanguageSuggestion />
                    <main id="main" tabIndex={-1}>
                        <Hero />
                        {/* The sheet: perforated along its top edge, where it lies on the hero's desk, and along its
                            bottom edge, where the footer's desk runs under it. */}
                        <div className="relative z-[7] -mt-16">
                            <div aria-hidden="true" className="sheet-edge-shadow">
                                <div className="sheet-edge-top" />
                            </div>
                            <div className="bg-background">
                                <Proof />
                                <Countries />
                                <Tear />
                                <Flow />
                                <Tear />
                                <Bento />
                                <Hosting />
                                <Pricing />
                                <Tear />
                                <Faq />
                            </div>
                            <div aria-hidden="true" className="sheet-edge-shadow-bottom">
                                <div className="sheet-edge-bottom" />
                            </div>
                        </div>
                    </main>
                    <Footer variant="desk">
                        <FinalCta />
                    </Footer>
                </div>
            </MotionConfig>
        </HomeLocaleProvider>
    )
}
