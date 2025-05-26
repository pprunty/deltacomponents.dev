"use client"

import React, { useEffect, useState } from "react"
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
      "rounded-xl border bg-background text-card-foreground",
      className
    )}
    {...props}
  />
)

// Constants for paths
const PLACEHOLDER_IMAGE = "/images/placeholder.png"
const IMAGE_PATH = "/og/images/"
const VIDEO_PATH = "/og/videos/"

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

  // Generate paths
  const videoPath = `${VIDEO_PATH}${name}.mp4`
  const imagePath = imageError ? PLACEHOLDER_IMAGE : `${IMAGE_PATH}${name}.png`

  // Create the link URL
  const linkUrl = useDocsLink
    ? `/docs/${category}/${name}`
    : `/${category}/${name}`

  // Check if video exists by attempting to fetch it
  useEffect(() => {
    // Only check if we haven't already determined video status
    if (!videoLoaded && !videoError) {
      const checkVideo = async () => {
        try {
          const response = await fetch(videoPath, { method: "HEAD" })
          if (response.ok) {
            setVideoLoaded(true)
          } else {
            setVideoError(true)
          }
        } catch {
          setVideoError(true)
        }
      }

      checkVideo()
    }
  }, [videoPath, videoLoaded, videoError])

  return (
    <Link
      href={linkUrl}
      className="block transition-all hover:border-primary/50"
    >
      <Card className="overflow-hidden h-full w-full border hover:border-primary/20 transition-colors duration-200 hover:shadow-sm">
        <div className="flex flex-col h-full">
          <div className="relative w-full aspect-video bg-muted overflow-hidden">
            {!videoError && videoLoaded ? (
              <video
                src={videoPath}
                autoPlay
                muted
                loop
                playsInline
                className="object-cover w-full h-full"
                onError={() => setVideoError(true)}
              />
            ) : (
              <Image
                src={imagePath}
                alt={`${name} component`}
                width={400}
                height={225}
                className="object-cover w-full h-full"
                priority={false}
                unoptimized={true}
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="flex-1 p-5 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="mb-3">
                <h3 className="text-2xl font-semibold leading-tight truncate">
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
