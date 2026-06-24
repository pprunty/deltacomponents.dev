"use client"

import { useEffect, useRef, useState } from "react"
import { Cambio } from "cambio"
import { Maximize2, X } from "lucide-react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/registry/delta-ui/ui/skeleton"

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
   * Optional CSS `aspect-ratio` (e.g. `1`, `"4 / 5"`, `"16 / 9"`) for the
   * thumbnail. When set, the thumbnail is cropped to this ratio with
   * `object-cover`; the zoomed popup still shows the full, uncropped image.
   * Give two grid images the same `aspect` to make them equal height.
   */
  aspect?: number | string
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
  motion = "reduced",
  dismissible = true,
  className,
  draggable = false,
  enableInitialAnimation = false,
  dismissOnImageClick = false,
  dismissOnScroll = false,
  showExpandIcon = false,
  iconsOnlyMode = false,
  aspect,
  controls = false,
}: CambioImageProps) {
  const effectiveDraggable = controls ? false : draggable
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [naturalAspect, setNaturalAspect] = useState<number>(
    height > 0 ? width / height : 1
  )
  const [pinchScale, setPinchScale] = useState(1)
  const [pinchTx, setPinchTx] = useState(0)
  const [pinchTy, setPinchTy] = useState(0)
  // Disables Cambio's swipe-to-dismiss (framer-motion `drag`) while a pinch
  // gesture is in progress. Aggressive pinches otherwise accumulate enough
  // velocity on framer-motion's tracked finger to satisfy its dismiss
  // condition (`speed > 300 px/s OR dist > 60 px`) and close the popup.
  const [isPinching, setIsPinching] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerImgRef = useRef<HTMLImageElement>(null)
  const isFirstOpenChange = useRef(true)
  // Re-enable timer for `isPinching`: we keep dismiss disabled briefly
  // after the gesture ends so the trailing pointerup doesn't fire a
  // framer-motion `onDragEnd` that still dismisses.
  const pinchReenableTimerRef = useRef<number | null>(null)
  const pinchRef = useRef({
    initialDistance: 0,
    initialScale: 1,
    initialTx: 0,
    initialTy: 0,
    initialMidX: 0,
    initialMidY: 0,
    isPinching: false,
    isPanning: false,
    panStartX: 0,
    panStartY: 0,
    panStartTx: 0,
    panStartTy: 0,
    didPinch: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNaturalSize = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const next = img.naturalWidth / img.naturalHeight
      setNaturalAspect((prev) => (Math.abs(prev - next) > 0.001 ? next : prev))
    }
  }

  // Clear the skeleton for images already decoded from cache, which may not
  // fire a fresh `load` event after mount.
  useEffect(() => {
    const img = triggerImgRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      setIsLoaded(true)
    }
  }, [])

  const motionPreset =
    typeof motion === "string"
      ? motion
      : motion?.popup ?? motion?.trigger ?? "smooth"
  const animationLockMs =
    motionPreset === "reduced" ? 50 : motionPreset === "snappy" ? 350 : 500

  useEffect(() => {
    if (isFirstOpenChange.current) {
      isFirstOpenChange.current = false
      return
    }
    setIsAnimating(true)
    const t = window.setTimeout(() => setIsAnimating(false), animationLockMs)
    return () => window.clearTimeout(t)
  }, [open, animationLockMs])

  useEffect(() => {
    if (!open) {
      setPinchScale(1)
      setPinchTx(0)
      setPinchTy(0)
      pinchRef.current.isPinching = false
      pinchRef.current.isPanning = false
      pinchRef.current.didPinch = false
      // Cancel any pending pinch-reenable timer and clear the flag so
      // the next open doesn't start with dismiss disabled.
      if (pinchReenableTimerRef.current !== null) {
        window.clearTimeout(pinchReenableTimerRef.current)
        pinchReenableTimerRef.current = null
      }
      setIsPinching(false)
    }
  }, [open])

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
      // Multi-touch (pinch) should not trigger dismiss-on-scroll.
      if (e.touches.length > 1) return
      // If a pinch is (or just was) in progress, the touchStartY captured
      // before the pinch is meaningless against the current single-finger
      // position — a finger lifting mid-pinch would otherwise yield a huge
      // deltaY and falsely dismiss. didPinch stays true through the 200ms
      // re-enable hold in handlePopupTouchEnd.
      if (pinchRef.current.didPinch) return
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

  const getDistance = (t1: React.Touch, t2: React.Touch) => {
    const dx = t2.clientX - t1.clientX
    const dy = t2.clientY - t1.clientY
    return Math.hypot(dx, dy)
  }

  const handlePopupTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      // Cancel any pending re-enable so a second pinch in quick succession
      // doesn't end up with dismiss re-enabled mid-gesture.
      if (pinchReenableTimerRef.current !== null) {
        window.clearTimeout(pinchReenableTimerRef.current)
        pinchReenableTimerRef.current = null
      }
      // Flip Cambio's dismiss off before the pinch progresses — see the
      // comment on `isPinching` for why this is necessary.
      setIsPinching(true)
      // Belt-and-braces: keep the touch event from bubbling to any future
      // ancestor handlers. Doesn't affect framer-motion (pointer events),
      // but cheap insurance.
      e.stopPropagation()
      const [t1, t2] = [e.touches[0], e.touches[1]]
      pinchRef.current.initialDistance = getDistance(t1, t2)
      pinchRef.current.initialScale = pinchScale
      pinchRef.current.initialTx = pinchTx
      pinchRef.current.initialTy = pinchTy
      pinchRef.current.initialMidX = (t1.clientX + t2.clientX) / 2
      pinchRef.current.initialMidY = (t1.clientY + t2.clientY) / 2
      pinchRef.current.isPinching = true
      pinchRef.current.isPanning = false
      pinchRef.current.didPinch = true
    } else if (e.touches.length === 1 && pinchScale > 1) {
      pinchRef.current.isPanning = true
      pinchRef.current.panStartX = e.touches[0].clientX
      pinchRef.current.panStartY = e.touches[0].clientY
      pinchRef.current.panStartTx = pinchTx
      pinchRef.current.panStartTy = pinchTy
    }
  }

  const handlePopupTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length >= 2 && pinchRef.current.isPinching) {
      e.preventDefault()
      e.stopPropagation()
      const [t1, t2] = [e.touches[0], e.touches[1]]
      const newDist = getDistance(t1, t2)
      if (pinchRef.current.initialDistance <= 0) return
      const ratio = newDist / pinchRef.current.initialDistance
      const next = Math.max(
        1,
        Math.min(5, pinchRef.current.initialScale * ratio)
      )
      const midX = (t1.clientX + t2.clientX) / 2
      const midY = (t1.clientY + t2.clientY) / 2
      const dx = midX - pinchRef.current.initialMidX
      const dy = midY - pinchRef.current.initialMidY
      setPinchScale(next)
      setPinchTx(pinchRef.current.initialTx + dx)
      setPinchTy(pinchRef.current.initialTy + dy)
    } else if (e.touches.length === 1 && pinchRef.current.isPanning) {
      e.preventDefault()
      e.stopPropagation()
      const t = e.touches[0]
      setPinchTx(
        pinchRef.current.panStartTx + (t.clientX - pinchRef.current.panStartX)
      )
      setPinchTy(
        pinchRef.current.panStartTy + (t.clientY - pinchRef.current.panStartY)
      )
    }
  }

  const handlePopupTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length < 2) {
      pinchRef.current.isPinching = false
    }
    if (e.touches.length === 0) {
      pinchRef.current.isPanning = false
      if (pinchScale < 1.05) {
        setPinchScale(1)
        setPinchTx(0)
        setPinchTy(0)
      }
      // Defer clearing didPinch / isPinching until after framer-motion's
      // pointerup-triggered onDragEnd has had a chance to run. With drag
      // already disabled (isPinching=true), there's no onDragEnd handler
      // to call, but holding the flag for ~200ms also defends against
      // the dismissOnScroll window listener seeing the final single-touch
      // movement as a swipe.
      if (pinchRef.current.didPinch) {
        if (pinchReenableTimerRef.current !== null) {
          window.clearTimeout(pinchReenableTimerRef.current)
        }
        pinchReenableTimerRef.current = window.setTimeout(() => {
          pinchRef.current.didPinch = false
          setIsPinching(false)
          pinchReenableTimerRef.current = null
        }, 200)
      }
    }
  }

  const zIndex = open ? 50 : 10 + index

  return (
    <span
      ref={ref}
      className={cn(
        "relative block w-full transition-all duration-500 ease-out",
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
        // While pinching, force dismissible=false so Cambio's
        // framer-motion `drag` is dropped from the popup. This cancels
        // the in-flight drag that finger 1 started and removes the
        // onDragEnd handler that would otherwise dismiss on lift.
        dismissible={iconsOnlyMode || isPinching ? false : dismissible}
        open={open}
        onOpenChange={setOpen}
      >
        {/* @ts-ignore */}
        <Cambio.Trigger
          className={cn(
            "group relative w-full overflow-hidden",
            !open && !isAnimating && !showExpandIcon && "cursor-zoom-in"
          )}
          style={{
            pointerEvents: open || isAnimating ? "none" : "auto",
            // When `aspect` is set, the trigger defines the box and the image
            // crops to fill it; otherwise the image's intrinsic ratio drives
            // the height.
            ...(aspect != null ? { aspectRatio: aspect } : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Skeleton occupies the box the image will fill — the trigger is
              `relative` and either `aspect` or the `<img>`'s width/height
              attributes reserve the height, so an `inset-0` overlay matches
              the eventual image exactly. */}
          {!isLoaded && (
            <Skeleton className="pointer-events-none absolute inset-0 h-full w-full rounded-none" />
          )}
          <img
            ref={triggerImgRef}
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            draggable={effectiveDraggable}
            onDragStart={
              effectiveDraggable ? undefined : (e) => e.preventDefault()
            }
            onLoad={(e) => {
              handleNaturalSize(e)
              setIsLoaded(true)
            }}
            onError={() => setIsLoaded(true)}
            className={cn(
              "block w-full select-none transition-opacity duration-200 ease-out group-hover:opacity-90 group-active:opacity-90",
              aspect != null ? "h-full object-cover" : "h-auto",
              !isLoaded && "opacity-0",
              className
            )}
            style={{
              pointerEvents: "none",
              // When draggable is false (the default), block iOS
              // long-press save/share callout and native image drag
              // so they can't interfere with touch interaction.
              ...(effectiveDraggable
                ? null
                : {
                    ["WebkitUserDrag" as string]: "none",
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                  }),
            }}
          />

          {showExpandIcon && (
            // Rendered as a <span> (not a <button>): Cambio.Trigger is a
            // Radix Dialog trigger button, and a nested <button> is invalid
            // HTML that trips React's hydration nesting check. The trigger
            // button already provides click + keyboard activation; this icon
            // is the visual affordance.
            <span
              aria-hidden="true"
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
            </span>
          )}
        </Cambio.Trigger>

        {/* @ts-ignore */}
        <Cambio.Portal>
          {/* @ts-ignore */}
          <Cambio.Backdrop
            motion="reduced"
            // iOS 26 Safari clips `position: fixed` elements to the inner
            // viewport (under the URL bar + above the home indicator) even
            // with negative insets — see Devon Govett's PSA and the open
            // issues against MUI #46953, shadcn/ui #8471, fancyapps #804.
            // Workaround:
            //   1. `viewport-fit=cover` in the viewport meta (set in
            //      app/layout.tsx) so the layout viewport includes safe
            //      areas and `env(safe-area-inset-*)` returns non-zero.
            //   2. Size the backdrop to `100lvh` (largest viewport) +
            //      offset by negative safe-area insets so the box
            //      extends behind the status bar / URL bar / home
            //      indicator, defeating the iOS 26 clip.
            // Use `lvh` over `dvh` because the modal is non-scrollable
            // and `dvh` would re-flow on every URL bar animation.
            className="z-[100] bg-black/40"
            style={{
              position: "fixed",
              top: "calc(env(safe-area-inset-top, 0px) * -1)",
              left: "calc(env(safe-area-inset-left, 0px) * -1)",
              right: "calc(env(safe-area-inset-right, 0px) * -1)",
              bottom: "calc(env(safe-area-inset-bottom, 0px) * -1)",
              width:
                "calc(100vw + env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px))",
              height:
                "calc(100lvh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px))",
            }}
          />
          {/* @ts-ignore */}
          <Cambio.Popup className="relative z-[101] w-screen md:w-auto md:overflow-hidden">
            <div className="relative">
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
                // Force-disable drag on the popup image: HTML5 drag (desktop)
                // and iOS long-press callout/drag both fight pinch + pan.
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onLoad={handleNaturalSize}
                className={cn(
                  // Mobile: fill the w-screen popup, height scales naturally
                  "h-auto w-full select-none",
                  // Desktop: width = min(100vw, 100vh × aspect) so the image
                  // scales to fill the viewport while preserving its natural
                  // aspect ratio. height: auto follows from the img's own
                  // intrinsic ratio, so the element box matches the displayed
                  // pixels exactly — close animation scales uniformly.
                  "md:h-auto md:max-h-[100vh] md:w-[min(100vw,calc(100vh*var(--popup-ar)))] md:max-w-[100vw]",
                  !iconsOnlyMode &&
                    dismissOnImageClick &&
                    pinchScale === 1 &&
                    "cursor-zoom-out"
                )}
                style={{
                  ["--popup-ar" as string]: naturalAspect,
                  pointerEvents:
                    !iconsOnlyMode && dismissOnImageClick ? "auto" : "none",
                  // Pinch-zoom + pan transform. On desktop pinchScale stays at 1,
                  // so this is a no-op there. translate(...) before scale(...) so
                  // the translation reads in pre-scale (CSS-pixel) space.
                  transform: `translate(${pinchTx}px, ${pinchTy}px) scale(${pinchScale})`,
                  transformOrigin: "center center",
                  // Disable browser pinch-zoom + pan defaults on the image so we
                  // can drive the gesture ourselves; this also prevents the page
                  // body from being zoomed.
                  touchAction: "none",
                  // Suppress iOS long-press save/share callout and any
                  // residual native image-drag affordance that would
                  // interrupt pinch/pan gestures. WebkitUserDrag isn't
                  // in CSSProperties' type, so it's set via string key.
                  ["WebkitUserDrag" as string]: "none",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                  // Smooth out programmatic snap-back when pinch ends near 1×.
                  transition:
                    pinchRef.current.isPinching || pinchRef.current.isPanning
                      ? "none"
                      : "transform 150ms ease-out",
                  willChange: "transform",
                }}
                onTouchStart={handlePopupTouchStart}
                onTouchMove={handlePopupTouchMove}
                onTouchEnd={handlePopupTouchEnd}
                onTouchCancel={handlePopupTouchEnd}
                onClick={
                  !iconsOnlyMode && dismissOnImageClick
                    ? () => {
                        // Swallow tap-to-close while zoomed; user must pinch
                        // back to 1× (or release a near-1× pinch which snaps
                        // back) before a tap will dismiss.
                        if (pinchScale > 1) return
                        setOpen(false)
                      }
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
