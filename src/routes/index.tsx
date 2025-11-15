import { createFileRoute } from '@tanstack/react-router'
import { AnimatedPdf } from '@/components/animated-pdf'
import ContentSections from '@/components/content-sections'
import Header from '@/components/header'
import Home from '@/components/home'
import Phone from '@/components/phone'
import { PostIt } from '@/components/post-it'
import type { PostItData } from '@/types'
import { Ripple } from '@/components/ui/ripple'
import { getDocumentBoxes } from '@/data/documents'
import { postItData } from '@/data/post-its'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useScroll } from 'motion/react'
import { useRef } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const windowSize = useWindowSize()
  const scaleFactor = (windowSize.height / 885) * 1.1
  const height = 566 * scaleFactor
  const width = 400 * scaleFactor
  const documentBoxes = getDocumentBoxes({ ...windowSize, documentHeight: height, documentWidth: width })
  const mainRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()

  return (
    <main ref={mainRef} className='min-h-screen h-[calc(12*100dvh)]'>
      <Header />
      <Home />
      <Ripple className='-z-10' />

      <section className='fixed w-screen h-screen'>
        {documentBoxes.map((box, index) => (
          <AnimatedPdf
            key={index}
            width={width}
            height={height}
            scrollXValues={box.scrollXValues}
            scrollXSteps={box.scrollXSteps}
            scrollYValues={box.scrollYValues}
            scrollYSteps={box.scrollYSteps}
            rotateSteps={box.rotateSteps}
            rotateValues={box.rotateValues}
            asset={box.asset}
            assetAlt={`Document ${index + 1}`}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <Phone scrollYProgress={scrollYProgress} />
      </section>

      <section id='content-overlay'>
        {postItData.map((postIt: PostItData, index: number) => (
          <PostIt
            key={index}
            left={postIt.left}
            top={postIt.top}
            color={postIt.color}
            rotation={postIt.rotation}
            className={postIt.className}
          >
            <img
              src={postIt.src}
              alt={postIt.alt}
              className={postIt.imgClassName}
            />
          </PostIt>
        ))}
      </section>

      <ContentSections scrollYProgress={scrollYProgress} />
    </main>
  )
}
