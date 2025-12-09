"use client"

import { useEffect, useRef, useState } from "react"
import { Cambio } from "cambio"

import { cn } from "@/lib/utils"

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
}: CambioImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
      { threshold: 0.1 },
    )
    if (ref.current) {
      io.observe(ref.current)
    }
    return () => io.disconnect()
  }, [enableInitialAnimation])

  useEffect(() => {
    if (!dismissOnScroll || !open) return

    const handleScroll = () => {
      setOpen(false)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleScroll, { passive: true })
    window.addEventListener("touchmove", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("touchmove", handleScroll)
    }
  }, [dismissOnScroll, open])

  const zIndex = open ? 50 : 10 + index

  return (
    <span
      ref={ref}
      className={cn("relative inline-block w-full transition-all duration-500 ease-out", className)}
      style={{
        opacity: enableInitialAnimation ? (isVisible ? 1 : 0) : 1,
        filter: enableInitialAnimation ? (isVisible ? "blur(0)" : "blur(4px)") : "blur(0)",
        zIndex,
      }}
    >
      {/* @ts-ignore */}
      <Cambio.Root motion={motion} dismissible={dismissible} open={open} onOpenChange={setOpen}>
        {/* @ts-ignore */}
        <Cambio.Trigger
          className={cn("relative w-full overflow-hidden", !open && "cursor-zoom-in")}
          style={{ pointerEvents: open ? "none" : "auto" }}
        >
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            draggable={draggable}
            className={cn("h-auto w-full", className)}
            style={{ pointerEvents: "none" }}
          />
        </Cambio.Trigger>

        {/* @ts-ignore */}
        <Cambio.Portal>
          {/* @ts-ignore */}
          <Cambio.Backdrop motion="reduced" className="fixed inset-0 z-[100] bg-black/40" />
          {/* @ts-ignore */}
          <Cambio.Popup className="z-[101] w-full overflow-hidden md:w-[70%]">
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              width={width}
              height={height}
              loading="eager"
              draggable={draggable}
              className={cn("h-auto w-full object-contain", dismissOnImageClick && "cursor-zoom-out")}
              style={{ pointerEvents: dismissOnImageClick ? "auto" : "none" }}
              onClick={dismissOnImageClick ? () => setOpen(false) : undefined}
            />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </span>
  )
}
