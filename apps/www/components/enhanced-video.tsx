"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function EnhancedVideo({ 
  className, 
  ...props 
}: React.ComponentProps<"video">) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [aspectRatio, setAspectRatio] = React.useState<number | null>(null)

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    const ratio = video.videoWidth / video.videoHeight
    setAspectRatio(ratio)
    setIsLoading(false)
    if (props.onLoadedMetadata) {
      props.onLoadedMetadata(e)
    }
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true)
    setIsLoading(false)
    if (props.onError) {
      props.onError(e)
    }
  }

  return (
    <div className="my-6">
      <div 
        className="relative w-full overflow-hidden rounded-md bg-muted"
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : '16/9'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span className="text-sm">Loading video...</span>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mb-2 text-lg">⚠️</div>
              <p className="text-sm">Failed to load video</p>
            </div>
          </div>
        )}

        <video
          className={cn(
            "absolute inset-0 h-full w-full object-contain",
            isLoading && "opacity-0",
            hasError && "opacity-0",
            className
          )}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          {...props}
        />
      </div>
    </div>
  )
}

export function EnhancedVideoLarge({ 
  className, 
  ...props 
}: React.ComponentProps<"video">) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasError, setHasError] = React.useState(false)
  const [aspectRatio, setAspectRatio] = React.useState<number | null>(null)

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    const ratio = video.videoWidth / video.videoHeight
    setAspectRatio(ratio)
    setIsLoading(false)
    if (props.onLoadedMetadata) {
      props.onLoadedMetadata(e)
    }
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setHasError(true)
    setIsLoading(false)
    if (props.onError) {
      props.onError(e)
    }
  }

  return (
    <div className="my-6">
      <div 
        className="relative w-full overflow-hidden rounded-md bg-muted shadow-lg"
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : '16/9'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span className="text-sm font-medium">Loading video...</span>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="mb-2 text-2xl">⚠️</div>
              <p className="text-sm font-medium">Failed to load video</p>
              <p className="text-xs opacity-75">Please check the video source</p>
            </div>
          </div>
        )}

        <video
          className={cn(
            "absolute inset-0 h-full w-full object-contain transition-opacity duration-200",
            isLoading && "opacity-0",
            hasError && "opacity-0",
            className
          )}
          controls
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          {...props}
        />
      </div>
    </div>
  )
}