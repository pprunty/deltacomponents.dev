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
      <Card className="hover:hover:bg-accent/50 border-border relative h-48 overflow-hidden border p-0 shadow-none transition-colors md:h-40">
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
            src="/placeholder.jpeg"
            alt={String(component.name) || "Component"}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-2 right-2 rounded-md bg-black/40 px-2 py-1">
          <span className="text-[13px] font-medium text-white">
            {component.name}
          </span>
        </div>
      </Card>
    </Link>
  )
}
