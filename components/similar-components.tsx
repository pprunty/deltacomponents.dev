"use client"

import React from "react"
import { Index } from "@/__registry__"

import { docsConfig } from "@/config/docs"
import { cn, getComponentCategory } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ComponentPreviewCard } from "@/components/component-preview-card"

interface SimilarComponentsProps {
  /**
   * The current component's name/slug
   */
  currentComponent: string
  /**
   * Optional className to apply to the container
   */
  className?: string
  /**
   * Optional title for the section
   */
  title?: string
  /**
   * Number of similar components to show (excluding the random one)
   */
  count?: number
  /**
   * If set to true, will use docs path for links
   */
  useDocsLinks?: boolean
  /**
   * Whether to show tags on cards
   */
  showTags?: boolean
}

/**
 * Component to display similar components based on tag matching
 */
export function SimilarComponents({
  currentComponent,
  className,
  title = "Similar Components:",
  count = 4,
  useDocsLinks = true,
  showTags = false,
}: SimilarComponentsProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [similarComponents, setSimilarComponents] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!currentComponent) {
      setIsLoading(false)
      return
    }

    if (!Index[currentComponent]) {
      console.warn(`Component "${currentComponent}" not found in registry.`)
      setIsLoading(false)
      return
    }

    // Get current component's tags and category
    const currentTags = Index[currentComponent]?.tags || []
    // Get category from docsConfig
    let currentCategory: string | null = null
    docsConfig.sidebarNav.forEach((section) => {
      section.items.forEach((item) => {
        if (item.href && item.href.endsWith(`/${currentComponent}`)) {
          currentCategory = section.title
        }
      })
    })
    const currentType = Index[currentComponent]?.type || ""

    // Build eligible pool
    const hiddenComponents = new Set<string>()
    docsConfig.sidebarNav.forEach((section) => {
      section.items.forEach((item) => {
        if (item.hide && item.href) {
          const parts = item.href.split("/")
          const componentName = parts[parts.length - 1]
          hiddenComponents.add(componentName)
        }
      })
    })
    const eligibleComponents = Object.keys(Index).filter(
      (key) =>
        key !== currentComponent &&
        !key.includes("-demo") &&
        !hiddenComponents.has(key)
    )

    if (!eligibleComponents.length) {
      setIsLoading(false)
      return
    }

    // Score eligible components
    const scored = eligibleComponents.map((comp) => {
      // Get category for this comp
      let compCategory: string | null = null
      docsConfig.sidebarNav.forEach((section) => {
        section.items.forEach((item) => {
          if (item.href && item.href.endsWith(`/${comp}`)) {
            compCategory = section.title
          }
        })
      })
      const compTags = Index[comp]?.tags || []
      const compType = Index[comp]?.type || ""
      let score = 0
      if (compCategory && currentCategory && compCategory === currentCategory)
        score += 3
      if (currentTags.length && compTags.length) {
        score +=
          compTags.filter((tag: string) => currentTags.includes(tag)).length * 2
      }
      if (compType === currentType) score += 1
      return { comp, score, compCategory, compTags }
    })

    // Sort by score, descending
    scored.sort((a, b) => b.score - a.score)

    // Build result list
    const result: string[] = []
    for (let i = 0; i < scored.length && result.length <= count; i++) {
      result.push(scored[i].comp)
    }

    // Fill up to count with random eligible components (allowing duplicates only if needed)
    while (result.length <= count) {
      // Try to pick a random component from eligibleComponents
      const randomComponent =
        eligibleComponents[
          Math.floor(Math.random() * eligibleComponents.length)
        ]
      result.push(randomComponent)
    }

    setSimilarComponents(result)
    setIsLoading(false)
  }, [currentComponent, count])

  if (isLoading) {
    return <LoadingSkeleton count={count + 1} />
  }

  // Always show components even if none were found through tag matching
  // (we'll be filling with random components)
  if (!similarComponents.length) {
    return null
  }

  return (
    <div className={cn("space-y-8", className)}>
      <h2 className="text-3xl font-bold font-heading mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {similarComponents.map((component) => {
          const category = getComponentCategory(component)
          const tags = Index[component]?.tags || []

          return (
            <ComponentPreviewCard
              key={component}
              name={component}
              category={category}
              tags={tags}
              showTags={showTags}
              useDocsLink={useDocsLinks}
            />
          )
        })}
      </div>
    </div>
  )
}

interface LoadingSkeletonProps {
  count?: number
}

function LoadingSkeleton({ count = 4 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border rounded-xl overflow-hidden w-full">
            <div className="flex flex-col h-full">
              <Skeleton className="w-full aspect-video m-2 rounded-xl" />
              <div className="p-5 w-full">
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-5 w-1/2 mb-3" />
                <Skeleton className="h-5 w-full mb-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
