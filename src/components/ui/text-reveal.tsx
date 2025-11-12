"use client"

import { type ComponentPropsWithoutRef, type FC, type ReactNode, useRef } from "react"
import { motion, type MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  description?: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, description, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  const descriptionOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1])
  const descriptionLines = description ? description.split("\\n") : []

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className={"sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20"}>
        <div className="flex flex-col gap-2">
          <span
            className={
              "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20"
            }
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </span>
          {description && (
            <motion.p
              style={{ opacity: descriptionOpacity }}
              className="text-start whitespace-pre-line px-5 text-base text-muted-foreground md:px-8 md:text-lg lg:px-10"
            >
              {descriptionLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < descriptionLines.length - 1 && <br />}
                </span>
              ))}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-black dark:text-white"}>
        {children}
      </motion.span>
    </span>
  )
}
