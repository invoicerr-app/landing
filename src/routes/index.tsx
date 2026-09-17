import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

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

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Proof />
        <Countries />
        <Flow />
        <Bento />
        <Hosting />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </MotionConfig>
  )
}
