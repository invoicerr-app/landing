import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import { Tear } from '@/components/desk/tear'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Bento } from '@/components/sections/bento'
import { Countries } from '@/components/sections/countries'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Flow } from '@/components/sections/flow'
import { Hero } from '@/components/sections/hero'
import { Hosting } from '@/components/sections/hosting'
import { Pricing } from '@/components/sections/pricing'
import { Proof } from '@/components/sections/proof'

export const Route = createFileRoute('/')({
  component: Index,
})

// The home page is a desk seen from above: the hero is laid on it, the sections below are one long
// sheet of paper on top of it (punched along its top edge), and the footer is the desk again. The
// approved platforms, which had a section of their own, now sit in the countries section, under the
// same #platforms anchor.
function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Header overDesk />
      <main>
        <Hero />
        <div className="relative z-[7] -mt-16 bg-background">
          <div aria-hidden="true" className="perforation-desk absolute inset-x-0 -top-[9px] h-[18px]" />
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
      </main>
      <Footer variant="desk">
        <FinalCta />
      </Footer>
    </MotionConfig>
  )
}
