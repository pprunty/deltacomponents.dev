"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ScrollFadeEffectProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The orientation of the scroll container.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical"
  /**
   * Controls the fade size in pixels.
   * Higher values create a more prominent fade effect.
   * @default 64
   */
  intensity?: number
}

export function ScrollFadeEffect({
  className,
  orientation = "vertical",
  intensity = 64,
  style,
  children,
  ...props
}: ScrollFadeEffectProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const checkScrollable = () => {
      if (orientation === "vertical") {
        setIsScrollable(element.scrollHeight > element.clientHeight)
      } else {
        setIsScrollable(element.scrollWidth > element.clientWidth)
      }
    }

    checkScrollable()

    const resizeObserver = new ResizeObserver(checkScrollable)
    resizeObserver.observe(element)

    // Also observe content changes
    const mutationObserver = new MutationObserver(checkScrollable)
    mutationObserver.observe(element, { childList: true, subtree: true })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [orientation])

  const fadeSize = `${Math.max(intensity, 0)}px`

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      data-scrollable={isScrollable}
      className={cn(
        "data-[orientation=horizontal]:overflow-x-auto data-[orientation=vertical]:overflow-y-auto",
        "data-[scrollable=true]:data-[orientation=horizontal]:scroll-fade-effect-x data-[scrollable=true]:data-[orientation=vertical]:scroll-fade-effect-y",
        className
      )}
      style={
        {
          "--mask-height": fadeSize,
          "--mask-width": fadeSize,
          "--bottom-mask-height": fadeSize,
          "--right-mask-width": fadeSize,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}
