"use client"

import React, { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

// Card components for reuse
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-sm border bg-background text-card-foreground",
      className
    )}
    {...props}
  />
)

// Constants for paths
const PLACEHOLDER_IMAGE = "/images/placeholder.png"
const IMAGE_PATH = "/og/images/"
const VIDEO_PATH = "/og/videos/"

// Simple cache for video availability checks
const videoCache = new Map<string, boolean>()

// Format component name from kebab-case to Title Case
export function formatComponentName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

interface ComponentPreviewCardProps {
  name: string
  category: string
  tags?: string[]
  showTags?: boolean
  useDocsLink?: boolean
}

export function ComponentPreviewCard({
  name,
  category,
  tags = [],
  showTags = false,
  useDocsLink = true,
}: ComponentPreviewCardProps) {
  // States to track resource loading
  const [imageError, setImageError] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Memoize paths to avoid recalculation
  const videoPath = useMemo(() => `${VIDEO_PATH}${name}.mp4`, [name])
  const imagePath = useMemo(
    () => (imageError ? PLACEHOLDER_IMAGE : `${IMAGE_PATH}${name}.png`),
    [name, imageError]
  )

  // Memoize the link URL
  const linkUrl = useMemo(
    () => (useDocsLink ? `/docs/${category}/${name}` : `/${category}/${name}`),
    [useDocsLink, category, name]
  )

  // Check if video exists by attempting to fetch it with caching
  useEffect(() => {
    // Check cache first
    if (videoCache.has(videoPath)) {
      const cachedResult = videoCache.get(videoPath)!
      if (cachedResult) {
        setVideoLoaded(true)
      } else {
        setVideoError(true)
      }
      return
    }

    // Only check if we haven't already determined video status
    if (!videoLoaded && !videoError) {
      const checkVideo = async () => {
        try {
          const response = await fetch(videoPath, { method: "HEAD" })
          if (response.ok) {
            setVideoLoaded(true)
            videoCache.set(videoPath, true)
          } else {
            setVideoError(true)
            videoCache.set(videoPath, false)
          }
        } catch {
          setVideoError(true)
          videoCache.set(videoPath, false)
        }
      }

      checkVideo()
    }
  }, [videoPath, videoLoaded, videoError])

  // Memoize the media element to prevent unnecessary re-renders
  const mediaElement = useMemo(() => {
    if (!videoError && videoLoaded) {
      return (
        <video
          src={videoPath}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full rounded-t-sm"
          onError={() => setVideoError(true)}
        />
      )
    } else {
      return (
        <Image
          src={imagePath}
          alt={`${name} component`}
          width={400}
          height={225}
          className="object-cover w-full h-full rounded-t-sm"
          priority={false}
          unoptimized={true}
          onError={() => setImageError(true)}
        />
      )
    }
  }, [videoError, videoLoaded, videoPath, imagePath, name])

  return (
    <Link
      href={linkUrl}
      className="block transition-all hover:border-primary/50"
    >
      <Card className="overflow-hidden h-full w-full border hover:border-primary/20 transition-colors duration-200">
        <div className="flex flex-col h-full">
          <div className="relative w-full aspect-video bg-muted overflow-hidden rounded-t-sm">
            {mediaElement}
          </div>

          <div className="flex-1 p-5 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="mb-3">
                <h3 className="text-2xl font-medium font-heading leading-tight truncate">
                  {formatComponentName(name)}
                </h3>
              </div>

              {showTags && tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
