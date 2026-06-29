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
  /**
   * Always apply the edge fade, bypassing scroll-overflow detection.
   *
   * Use this to fade content that overflows without a native scroll
   * container — e.g. a transform-animated marquee, whose track is clipped
   * by `overflow: hidden` so `scrollWidth` never exceeds `clientWidth`.
   * When set, the component does not impose its own `overflow` so it won't
   * introduce a scrollbar over such content.
   * @default false
   */
  force?: boolean
}

export function ScrollFadeEffect({
  className,
  orientation = "vertical",
  intensity = 64,
  force = false,
  style,
  children,
  ...props
}: ScrollFadeEffectProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = React.useState(false)

  React.useEffect(() => {
    if (force) return
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
  }, [orientation, force])

  const fadeSize = `${Math.max(intensity, 0)}px`
  // When forced, mark as scrollable so the mask applies, and skip the
  // overflow utilities so we don't add a scrollbar over already-clipped
  // content (e.g. a marquee).
  const scrollable = force || isScrollable

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      data-scrollable={scrollable}
      className={cn(
        !force &&
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
