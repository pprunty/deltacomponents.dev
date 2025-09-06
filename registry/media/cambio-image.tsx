"use client"

import { useEffect, useRef, useState } from "react"
import { Cambio } from "cambio"

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
}

export default function CambioImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  index = 0,
  motion = "smooth",
  dismissible = true,
}: CambioImageProps) {
  const [isVisible, setIsVisible] = useState(false)

  /* NEW — track the zoom state */
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  /* Grace-period so the close animation can finish on top */
  const handleOpenChange = (o: boolean) => {
    setOpen(true) // keep it on top immediately
    if (!o) setTimeout(() => setOpen(false), 400) // default "smooth" preset ≈ 300 ms
  }

  useEffect(() => {
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
  }, [])

  /* Massive z-index only while the item is zooming/closing */
  const zIndex = open ? 999 : 10 + index

  return (
    <div
      ref={ref}
      className="relative transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0)" : "blur(4px)",
        zIndex,
      }}
    >
      {/* @ts-ignore */}
      <Cambio.Root
        motion={motion}
        dismissible={dismissible}
        open={open}
        onOpenChange={handleOpenChange}
      >
        {/* @ts-ignore */}
        <Cambio.Trigger className="relative w-full cursor-zoom-in overflow-hidden">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            className="w-full h-auto"
            style={{ pointerEvents: "none" }}
          />
        </Cambio.Trigger>

        {/* @ts-ignore */}
        <Cambio.Portal>
          {/* @ts-ignore */}
          <Cambio.Backdrop className="fixed inset-0 bg-black/40 z-[100]" />
          {/* @ts-ignore */}
          <Cambio.Popup className="w-full md:w-[70%] overflow-hidden z-[101]">
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading="eager"
              className="w-full h-auto object-contain"
              style={{ pointerEvents: "none" }}
            />
          </Cambio.Popup>
        </Cambio.Portal>
      </Cambio.Root>
    </div>
  )
}
