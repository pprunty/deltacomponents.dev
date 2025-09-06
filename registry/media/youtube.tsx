"use client"

import React, { useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/registry/hooks/use-mobile"

interface YouTubeProps {
  videoId: string
  className?: string
  autoplay?: boolean
}

export default function YouTube({
  videoId,
  className = "",
  autoplay = false,
}: YouTubeProps) {
  const isMobile = useMobile()
  const [isLoaded, setIsLoaded] = useState(false)

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    controls: "1",
    playsinline: "1",
    ...(autoplay && !isMobile ? { autoplay: "1", mute: "1" } : {}),
  }).toString()

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden ${className}`}
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <iframe
        title="YouTube video"
        src={src}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
