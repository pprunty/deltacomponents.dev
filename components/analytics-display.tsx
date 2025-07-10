"use client"

import * as React from "react"
import { Download, Eye } from "@phosphor-icons/react"

interface AnalyticsDisplayProps {
  component: string
  className?: string
  initialAnalytics?: AnalyticsData | null
}

interface AnalyticsData {
  views: number
  downloads: number
}

export function AnalyticsDisplay({
  component,
  className,
  initialAnalytics,
}: AnalyticsDisplayProps) {
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(
    initialAnalytics || null
  )
  const [loading, setLoading] = React.useState(!initialAnalytics)
  const [error, setError] = React.useState<string | null>(null)
  const [viewTracked, setViewTracked] = React.useState(false)

  const fetchAnalytics = React.useCallback(async () => {
    try {
      // Only show loading if we don't have initial data
      if (!initialAnalytics) {
        setLoading(true)
      }
      setError(null)

      const response = await fetch(`/api/analytics/${component}`)

      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }

      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("Error fetching analytics:", err)
    } finally {
      setLoading(false)
    }
  }, [component, initialAnalytics])

  const trackView = React.useCallback(async () => {
    if (viewTracked) {
      return // Prevent multiple view tracking in the same session
    }

    try {
      const response = await fetch("/api/analytics/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ component }),
      })

      if (response.ok) {
        setViewTracked(true)
        // Refresh analytics after tracking view
        await fetchAnalytics()
      }
    } catch (err) {
      console.error("Error tracking view:", err)
    }
  }, [component, viewTracked, fetchAnalytics])

  // Use ref to ensure tracking only happens once even in Strict Mode
  const trackingRef = React.useRef(false)

  React.useEffect(() => {
    if (component && !trackingRef.current) {
      trackingRef.current = true
      // Track view first, then fetch analytics
      trackView()
    }
  }, [component, trackView])

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (loading) {
    return (
      <div
        className={`flex items-center gap-4 text-sm text-muted-foreground ${className || ""}`}
      >
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>--</span>
        </div>
        <div className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>--</span>
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return null // Fail silently to not disrupt the page
  }

  return (
    <div
      className={`flex items-center gap-4 text-sm text-muted-foreground ${className || ""}`}
    >
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{formatNumber(analytics.views)} views</span>
      </div>
      <div className="flex items-center gap-1">
        <Download className="h-4 w-4" />
        <span>{formatNumber(analytics.downloads)} downloads</span>
      </div>
    </div>
  )
}
