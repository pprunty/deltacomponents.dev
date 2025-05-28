"use client"

import React, { useEffect, useRef, useState } from "react"
import { ExternalLink, Loader2, RefreshCw } from "lucide-react"

interface EmbedProps {
  src: string
  title?: string
  height?: number | string
  width?: number | string
  allowFullScreen?: boolean
  sandbox?: string
  className?: string
  loading?: "eager" | "lazy"
  allow?: string
}

export function Embed({
  src,
  title = "Embedded content",
  height = 500,
  width = "100%",
  allowFullScreen = true,
  sandbox = "allow-scripts allow-same-origin allow-forms allow-popups",
  className = "",
  loading = "lazy",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
}: EmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Extract domain name for the banner
  const getDomainName = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "")
      return domain
    } catch (error) {
      return url
    }
  }

  const siteDomain = getDomainName(src)

  // Handle iframe load events
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    iframe.addEventListener("load", handleLoad)
    iframe.addEventListener("error", handleError)

    return () => {
      iframe.removeEventListener("load", handleLoad)
      iframe.removeEventListener("error", handleError)
    }
  }, [refreshKey])

  // Set a loading timeout (if iframe takes too long)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) setIsLoading(false)
    }, 10000) // 10 seconds timeout

    return () => clearTimeout(timeout)
  }, [isLoading, refreshKey])

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="relative w-full mb-8 overflow-hidden rounded-lg border border-border">
      {/* Site Banner */}
      <div className="flex items-center justify-between px-3 py-1 bg-muted text-muted-foreground text-sm border-b border-border">
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${siteDomain}&sz=32`}
            alt={`${siteDomain} favicon`}
            width={18}
            height={18}
            className="rounded-[4px]"
          />
          <span>{siteDomain}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-1 rounded-[4px] cursor-pointer hover:bg-background transition-colors"
            title="Refresh embed"
            aria-label="Refresh embed"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-[4px] no-after cursor-pointer hover:bg-background transition-colors"
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading embed...
          </span>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 z-10 p-4">
          <p className="text-destructive font-medium">
            Failed to load embedded content
          </p>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {src.length > 50 ? `${src.substring(0, 50)}...` : src}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-sm text-sm flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" /> Retry
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> Open in new tab
            </a>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        key={refreshKey}
        ref={iframeRef}
        src={src}
        title={title}
        height={height}
        width={width}
        allowFullScreen={allowFullScreen}
        sandbox={sandbox}
        loading={loading}
        allow={allow}
        className={`border-0 ${className}`}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  )
}
