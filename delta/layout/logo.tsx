"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Hardcoded logo configuration
const DEFAULT_LOGO_CONFIG = {
  src: "/logo.svg",
  fallbackSrc: "/placeholder-logo.svg",
  alt: "Corners Logo",
  width: 40,
  height: 40,
  className: "",
  priority: true,
  showName: true,
  title: "Corners New York",
}

interface LogoProps {
  src?: string
  fallbackSrc?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onClick?: () => void
  showName?: boolean
  title?: string
}

export default function Logo({
  src = DEFAULT_LOGO_CONFIG.src,
  fallbackSrc = DEFAULT_LOGO_CONFIG.fallbackSrc,
  alt = DEFAULT_LOGO_CONFIG.alt,
  width = DEFAULT_LOGO_CONFIG.width,
  height = DEFAULT_LOGO_CONFIG.height,
  className = DEFAULT_LOGO_CONFIG.className,
  priority = DEFAULT_LOGO_CONFIG.priority,
  showName = DEFAULT_LOGO_CONFIG.showName,
  title = DEFAULT_LOGO_CONFIG.title,
  onClick,
}: LogoProps) {
  const [logoError, setLogoError] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
  }

  const handleMouseDown = () => setIsActive(true)
  const handleMouseUp = () => setIsActive(false)
  const handleMouseLeave = () => setIsActive(false)
  const handleTouchStart = () => setIsActive(true)
  const handleTouchEnd = () => setIsActive(false)

  const logoContent = (
    <div
      className={cn(
        "flex items-center gap-2 transition-transform duration-200 ease-in-out",
        isActive ? "scale-95" : "scale-100",
        className
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cn("relative dark:invert", isActive ? "scale-95" : "scale-100")}>
        {logoError ? (
          <Image
            src={fallbackSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            onError={() => setLogoError(true)}
          />
        )}
      </div>
      {showName && (
        <h1 className="hidden md:block text-xl font-semibold transition-transform duration-200 ease-in-out">
          {title}
        </h1>
      )}
    </div>
  )

  return onClick ? logoContent : <Link href="/">{logoContent}</Link>
}
