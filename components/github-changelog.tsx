"use client"

import { useEffect, useState, useCallback } from "react"
import * as React from "react"

import { cn } from "@/lib/utils"

interface Release {
  version: string
  date: string
  title: string
  body: string
  url: string
}

// Cache duration in milliseconds (2 days)
const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000

interface CacheData {
  releases: Release[]
  timestamp: number
}

export function GitHubChangelog() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChangelog = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Check cache first
      const cachedReleases = getCachedReleases()
      if (cachedReleases) {
        setReleases(cachedReleases)
        setLoading(false)
        return
      }

      const response = await fetch(
        "https://api.github.com/repos/pprunty/deltacomponents.dev/releases"
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const formattedReleases: Release[] = data.map((release: any) => ({
        version: release.tag_name,
        date: new Date(release.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        title: release.name || release.tag_name,
        body: release.body || "",
        url: release.html_url,
      }))

      setReleases(formattedReleases)
      cacheReleases(formattedReleases)
    } catch (error) {
      console.error("Error fetching changelog:", error)
      setError("Failed to load changelog. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchChangelog()
  }, [fetchChangelog])

  function getCachedReleases(): Release[] | null {
    try {
      // Only run on client side
      if (typeof window === "undefined") return null

      const cachedData = localStorage.getItem("github-changelog")
      if (!cachedData) return null

      const parsedData: CacheData = JSON.parse(cachedData)

      // Check if cache is expired
      const now = Date.now()
      if (now - parsedData.timestamp > CACHE_DURATION) {
        // Cache expired
        localStorage.removeItem("github-changelog")
        return null
      }

      return parsedData.releases
    } catch (error) {
      console.error("Error reading from cache:", error)
      return null
    }
  }

  function cacheReleases(releases: Release[]): void {
    try {
      // Only run on client side
      if (typeof window === "undefined") return

      const cacheData: CacheData = {
        releases,
        timestamp: Date.now(),
      }

      localStorage.setItem("github-changelog", JSON.stringify(cacheData))
    } catch (error) {
      console.error("Error caching releases:", error)
    }
  }

  if (loading) {
    return (
      <div className="py-4 text-muted-foreground">Loading changelog...</div>
    )
  }

  if (error) {
    return <div className="py-4 text-destructive">{error}</div>
  }

  if (releases.length === 0) {
    return (
      <div className="py-4 text-muted-foreground">
        No releases found. Check back later for updates.
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      <h1 className={cn("font-heading scroll-m-20 text-3xl font-bold")}>
        Latest Releases
      </h1>

      {releases.map((release) => (
        <div key={release.version} className="pb-8 pt-2">
          <h2
            className={cn(
              "font-heading mt-8 scroll-m-20 border-b pb-2 text-2xl font-extrabold tracking-tight first:mt-0",
              "flex items-center gap-2"
            )}
          >
            <a
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary no-underline hover:text-primary/80"
            >
              {release.title}
            </a>
          </h2>
          <p className="text-md text-muted-foreground font-bold mt-2">
            Released: {release.date}
          </p>
          <div className="mt-4">{formatReleaseBody(release.body)}</div>
        </div>
      ))}
    </div>
  )
}

// Process lines to handle multi-line list items correctly
function processLines(lines: string[]): string[] {
  const processedLines: string[] = []
  let currentListItem = ""
  let inListItem = false

  for (const line of lines) {
    if (line.startsWith("- ")) {
      // If we were already in a list item, push it and start a new one
      if (inListItem) {
        processedLines.push(currentListItem)
      }
      currentListItem = line
      inListItem = true
    } else if (inListItem && line.trim() !== "" && !line.startsWith("#")) {
      // If line is indented or is continuing a list item
      currentListItem += " " + line.trim()
    } else {
      // Not a list item continuation
      if (inListItem) {
        processedLines.push(currentListItem)
        inListItem = false
      }
      processedLines.push(line)
    }
  }

  // Add the last list item if there is one
  if (inListItem) {
    processedLines.push(currentListItem)
  }

  return processedLines
}

// Helper function to format GitHub markdown content
function formatReleaseBody(body: string) {
  // Split the markdown into lines and process multi-line list items
  const lines = processLines(body.split("\n"))

  // Group consecutive list items into a single ul element
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []

  lines.forEach((line, index) => {
    if (line.startsWith("- ")) {
      // Add to current list
      listItems.push(
        <li key={`item-${index}`} className={cn("mt-2")}>
          {line.substring(2)}
        </li>
      )
    } else {
      // If we have list items, add the ul and clear
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className={cn("my-6 ml-6 list-disc")}>
            {listItems}
          </ul>
        )
        listItems = []
      }

      // Handle headings
      if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className={cn(
              "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
            )}
          >
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className={cn(
              "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
            )}
          >
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={index}
            className={cn("font-heading mt-2 scroll-m-20 text-4xl font-bold")}
          >
            {line.substring(2)}
          </h1>
        )
        // Handle paragraphs (non-empty lines)
      } else if (line.trim() !== "") {
        elements.push(
          <p key={index} className={cn("leading-7 not-first:mt-6")}>
            {line}
          </p>
        )
      }
    }
  })

  // Add any remaining list items
  if (listItems.length > 0) {
    elements.push(
      <ul key="list-final" className={cn("my-6 ml-6 list-disc")}>
        {listItems}
      </ul>
    )
  }

  return <div className="space-y-4">{elements}</div>
}
