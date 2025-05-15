"use client"

import React from "react"
import { Index } from "@/__registry__"
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
  count = 3,
  useDocsLinks = true,
  showTags = false,
}: SimilarComponentsProps) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [similarComponents, setSimilarComponents] = React.useState<string[]>([])

  React.useEffect(() => {
    // If component name is empty, there's nothing to do
    if (!currentComponent) {
      setIsLoading(false)
      return
    }

    // Check if the component exists in the registry
    if (!Index[currentComponent]) {
      console.warn(`Component "${currentComponent}" not found in registry.`)
      setIsLoading(false)
      return
    }

    // Get the current component's tags and type
    const currentTags = Index[currentComponent]?.tags || []
    const currentType = Index[currentComponent]?.type || ""

    // These are the component-like types we want to include in our comparisons
    const componentTypes = ["registry:component", "registry:block", "registry:hook"]

    // Filter all components that are different from the current one
    // and are of a component-like type
    const otherComponents = Object.keys(Index).filter(
      (key) =>
        key !== currentComponent &&
        componentTypes.includes(Index[key].type) &&
        // Make sure we don't include demo components in the recommendations
        !key.includes("-demo"),
    )

    if (!otherComponents.length) {
      setIsLoading(false)
      return
    }

    // Calculate tag similarity scores for each component (even if current component has no tags)
    const scoredComponents = otherComponents.map((component) => {
      const componentTags = Index[component]?.tags || []
      const componentType = Index[component]?.type || ""

      // Count matching tags (if current component has tags)
      const matchingTags = currentTags.length 
        ? componentTags.filter((tag: string) => currentTags.includes(tag))
        : []

      // Give a type bonus if the types match (e.g., both are components or both are blocks)
      const typeBonus = componentType === currentType ? 1 : 0

      return {
        component,
        score: matchingTags.length + typeBonus,
        matchingTags,
      }
    })

    // Sort by score (highest first)
    const sorted = scoredComponents.sort((a, b) => b.score - a.score)

    // Get top N similar components (based on count prop)
    const topSimilar = sorted.slice(0, count).map((item) => item.component)
    
    const result = [...topSimilar]
    
    // If we need to fill slots with random components
    if (result.length < count) {
      const neededRandomComponents = count - result.length
      
      // Find random components that aren't already in our list
      let remainingComponents = otherComponents.filter((comp) => !result.includes(comp))
      
      // If no remaining components, just use what we have (should never happen but just in case)
      if (remainingComponents.length === 0) {
        remainingComponents = otherComponents
      }
      
      // Add random components to fill the required count
      for (let i = 0; i < neededRandomComponents; i++) {
        if (remainingComponents.length === 0) break
        
        // Select a random component
        const randomIndex = Math.floor(Math.random() * remainingComponents.length)
        const randomComponent = remainingComponents[randomIndex]
        
        // Add it to our result and remove it from remaining components
        result.push(randomComponent)
        remainingComponents.splice(randomIndex, 1)
      }
    }
    
    // Add one extra component for variety if we have the space
    if (count >= 3) {
      // Find a random component that isn't already in our list
      const remainingComponents = otherComponents.filter((comp) => !result.includes(comp))
      
      if (remainingComponents.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingComponents.length)
        const randomComponent = remainingComponents[randomIndex]
        result.push(randomComponent)
      }
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
      <h2 className="text-3xl font-bold font-heading mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">{title}</h2>
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
