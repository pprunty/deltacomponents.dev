"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card } from "@/registry/delta-ui/ui/card"

interface ComponentCardProps {
  component: {
    $id: string
    name: string
    url: string
  }
}

export function ComponentCard({ component }: ComponentCardProps) {
  const [useVideo, setUseVideo] = useState(true)
  // Extract just the filename without path and extension
  const componentName =
    component.$id.split("/").pop()?.replace(".mdx", "") || component.$id
  const videoSrc = `/videos/${componentName}-demo.mp4`

  const handleVideoError = () => {
    setUseVideo(false)
  }

  return (
    <Link href={component.url} className="group">
      <Card className="hover:bg-accent/20 active:bg-accent/30 border-border relative h-48 overflow-hidden border p-0 shadow-none md:h-40">
        {useVideo ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
            onError={handleVideoError}
          />
        ) : (
          <Image
            src="/placeholder.svg"
            alt={String(component.name) || "Component"}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              // Ensure we always show the placeholder
              const img = e.target as HTMLImageElement
              if (img.src !== "/placeholder.svg") {
                img.src = "/placeholder.svg"
              }
            }}
          />
        )}
        <div className="absolute top-2 right-2 flex items-center rounded-md bg-black/40 px-2 py-1.5">
          <span className="text-[13px] leading-none font-medium text-white">
            {component.name}
          </span>
        </div>
      </Card>
    </Link>
  )
}
