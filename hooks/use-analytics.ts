"use client"

import * as React from "react"

interface AnalyticsData {
  views: number
  downloads: number
}

interface UseAnalyticsReturn {
  analytics: AnalyticsData | null
  loading: boolean
  error: string | null
  trackView: () => Promise<void>
}

export function useAnalytics(component: string): UseAnalyticsReturn {
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [viewTracked, setViewTracked] = React.useState(false)

  const fetchAnalytics = React.useCallback(async () => {
    try {
      setLoading(true)
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
  }, [component])

  const trackView = React.useCallback(async () => {
    if (viewTracked) return // Prevent multiple view tracking in the same session

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

  React.useEffect(() => {
    if (component) {
      fetchAnalytics()

      // Track view on component mount
      trackView()
    }
  }, [component, fetchAnalytics, trackView])

  return {
    analytics,
    loading,
    error,
    trackView,
  }
}
