"use client"

import { useEffect, useRef, useState } from "react"
import { Cambio } from "cambio"
import { Maximize2, X } from "lucide-react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

const closeButtonClasses = cn(
  "inline-flex size-9 items-center justify-center rounded-full",
  "bg-secondary text-secondary-foreground shadow-xs transition-colors",
  "hover:bg-secondary/80 active:bg-secondary/70",
  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  "disabled:pointer-events-none disabled:opacity-50",
  "cursor-pointer"
)

type MotionPreset = "snappy" | "smooth" | "bouncy" | "reduced"

interface CambioImageProps {
  src: string
  alt: string
  width: number
  height: number
  loading?: "lazy" | "eager"
  index?: number
  motion?:
    | MotionPreset
    | {
        trigger?: MotionPreset
        popup?: MotionPreset
        backdrop?: MotionPreset
      }
  dismissible?: boolean
  className?: string
  draggable?: boolean
  enableInitialAnimation?: boolean
  dismissOnImageClick?: boolean
  dismissOnScroll?: boolean
  showExpandIcon?: boolean
  iconsOnlyMode?: boolean
  /**
   * Renders a close button when the image is focused. On desktop the button
   * sits in the top-right of the image; on mobile it floats at the viewport's
   * top-right (outside the image).
   *
   * When enabled, `draggable` is coerced to `false` so mobile users can pinch
   * to zoom the focused image.
   */
  controls?: boolean
}

export function CambioImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  index = 0,
  motion = "snappy",
  dismissible = true,
  className,
  draggable = false,
  enableInitialAnimation = true,
  dismissOnImageClick = false,
  dismissOnScroll = false,
  showExpandIcon = false,
  iconsOnlyMode = false,
  controls = false,
}: CambioImageProps) {
  const effectiveDraggable = controls ? false : draggable
  const [isVisible, setIsVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!enableInitialAnimation) {
      setIsVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) {
      io.observe(ref.current)
    }
    return () => io.disconnect()
  }, [enableInitialAnimation])

  useEffect(() => {
    if (!dismissOnScroll || !open) return

    let hasDismissed = false
    let touchStartY = 0

    const handleScroll = () => {
      if (hasDismissed) return
      hasDismissed = true
      setOpen(false)
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (hasDismissed) return
      const touchCurrentY = e.touches[0].clientY
      const deltaY = touchStartY - touchCurrentY

      hasDismissed = true
      setOpen(false)

      requestAnimationFrame(() => {
        window.scrollBy({ top: deltaY, behavior: "instant" })
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleScroll, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [dismissOnScroll, open])

  const zIndex = open ? 50 : 10 + index

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block w-full transition-all duration-500 ease-out",
        className
      )}
      style={{
        opacity: enableInitialAnimation ? (isVisible ? 1 : 0) : 1,
        filter: enableInitialAnimation
          ? isVisible
            ? "blur(0)"
            : "blur(4px)"
          : "blur(0)",
        zIndex,
      }}
    >
      {/* @ts-ignore */}
      <Cambio.Root
        motion={motion}
        dismissible={iconsOnlyMode ? false : dismissible}
        open={open}
        onOpenChange={setOpen}
      >
        {/* @ts-ignore */}
        <Cambio.Trigger
          className={cn(
            "relative w-full overflow-hidden",
            !open && !showExpandIcon && "cursor-zoom-in"
          )}
          style={{ pointerEvents: open ? "none" : "auto" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            draggable={effectiveDraggable}
            className={cn("h-auto w-full", className)}
            style={{ pointerEvents: "none" }}
          />

          {showExpandIcon && (
            <div
              className={cn(
                "absolute top-2 left-2 flex h-10 w-10 items-center justify-center rounded-full",
                "border border-white/30 bg-white/25 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/35",
                "dark:border-black/50 dark:bg-black/75 dark:hover:bg-black/85",
                "cursor-pointer transition-all duration-200 ease-out md:scale-0 md:opacity-0",
                isHovered && "md:scale-100 md:opacity-100"
              )}
              onClick={() => setOpen(true)}
            >
              <Maximize2 className="size-4 stroke-white" strokeWidth={2} />
            </div>
          )}
        </Cambio.Trigger>

        {/* @ts-ignore */}
        <Cambio.Portal>
          {/* @ts-ignore */}
          <Cambio.Backdrop
            motion="reduced"
            className="fixed inset-0 z-[100] bg-black/40"
          />
          {/* @ts-ignore */}
          <Cambio.Popup className="relative z-[101] flex w-full items-center justify-center overflow-hidden md:w-auto">
            <div className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center">
              {showExpandIcon && !controls && (
                <button
                  onClick={() => setOpen(false)}
                  className={cn(
                    "absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full",
                    "border border-white/30 bg-white/25 p-2 backdrop-blur-lg transition-colors duration-150 ease-out hover:bg-white/35",
                    "dark:border-black/50 dark:bg-black/75 dark:hover:bg-black/85",
                    "cursor-pointer focus:outline-hidden"
                  )}
                  aria-label="Close expanded view"
                >
                  <X className="size-4 stroke-white" strokeWidth={2} />
                </button>
              )}

              {controls && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className={cn(
                    closeButtonClasses,
                    "absolute top-2 right-2 z-10 hidden md:inline-flex"
                  )}
                >
                  <CloseIcon />
                </button>
              )}

              <img
                src={src || "/placeholder.svg"}
                alt={alt}
                width={width}
                height={height}
                loading="eager"
                draggable={effectiveDraggable}
                className={cn(
                  "h-auto max-h-[90vh] w-full max-w-[90vw] object-contain",
                  !iconsOnlyMode && dismissOnImageClick && "cursor-zoom-out"
                )}
                style={{
                  pointerEvents:
                    !iconsOnlyMode && dismissOnImageClick ? "auto" : "none",
                }}
                onClick={
                  !iconsOnlyMode && dismissOnImageClick
                    ? () => setOpen(false)
                    : undefined
                }
              />
            </div>
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
      {controls &&
        open &&
        mounted &&
        createPortal(
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className={cn(
              closeButtonClasses,
              "fixed top-3 right-3 z-[9999] md:hidden"
            )}
          >
            <CloseIcon />
          </button>,
          document.body
        )}
    </span>
  )
}
