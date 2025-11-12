import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

interface Item {
  name: string
  description: string
  icon: React.ReactNode
  color: string
  time: string
}

export const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-300 ease-in-out hover:scale-[102%]",
        // liquid glass effect - light mode
        "bg-white backdrop-blur-2xl backdrop-saturate-150",
        // borders and shadows for liquid glass
        "border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
        // inner glow
        "before:absolute before:inset-0 before:rounded-2xl before:bg-linear-to-br before:from-white/60 before:to-transparent before:opacity-50 before:pointer-events-none",
        // shimmer effect
        "after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-br after:from-transparent after:via-white/10 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:pointer-events-none",
        // dark mode liquid glass
        "dark:bg-black/20 dark:backdrop-blur-2xl dark:backdrop-saturate-150",
        "dark:border-white/10 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
        "dark:before:from-white/10 dark:before:to-transparent"
      )}
    >
      <div className="flex items-center flex-row gap-3 relative z-10">
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            backgroundColor: color,
            width: "32px",
            height: "32px",
          }}
        >
          <span className="text-xl">{icon}</span>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <figcaption className="text-sm font-semibold text-gray-900 dark:text-white truncate drop-shadow-sm">
              {name}
            </figcaption>
            <span className="text-xs text-gray-600 dark:text-gray-300 shrink-0 mt-0.5 drop-shadow-sm">
              {time}
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)
        }, delay)

        return () => clearTimeout(timeout)
      }
    }, [index, delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse()
      return result
    }, [index, childrenArray])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
