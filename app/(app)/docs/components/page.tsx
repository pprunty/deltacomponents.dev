"use client"

import React from "react"
import { Index } from "@/__registry__"
import { ChevronRightIcon } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import { cn, getComponentCategory } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ComponentPreviewCard } from "@/components/component-preview-card"
import ScrambleText from "@/registry/animations/scramble-text"

// Define types for our registry items
interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  tags?: string[]
  files?: Array<{
    path: string
    type: string
  }>
}

// Filter out components that are not example components
function getComponents(): RegistryItem[] {
  return Object.entries(Index)
    .filter(([, component]) => {
      return (
        (component.type === "registry:component" ||
          component.type === "registry:block") &&
        !component.name.includes("-demo")
      )
    })
    .map(([name, component]) => ({
      name,
      ...component,
    }))
}

function ComponentsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="border rounded-xl overflow-hidden w-full">
          <div className="flex flex-col h-full">
            <Skeleton className="w-full aspect-video rounded-t-xl rounded-b-none" />
            <div className="p-5 w-full">
              <Skeleton className="h-8 w-3/4 mb-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ComponentsPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [components, setComponents] = React.useState<RegistryItem[]>([])

  React.useEffect(() => {
    // Simulate loading time and get components
    const loadComponents = async () => {
      // Add a small delay to show the skeleton
      await new Promise((resolve) => setTimeout(resolve, 100))
      const loadedComponents = getComponents()
      setComponents(loadedComponents)
      setIsLoading(false)
    }

    loadComponents()
  }, [])

  return (
    <main className="relative">
      <div className="w-full min-w-0 px-8 p-6">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-3.5" />
          <div className="text-foreground">Components Showcase</div>
        </div>
        <div className="space-y-2">
          <ScrambleText
            text={"Components Showcase"}
            className={cn(
              "h-10 w-fit scroll-m-20 text-3xl font-bold tracking-tight"
            )}
            //scrambleSpeed={80}
            //useIntersectionObserver
            //retriggerOnIntersection
          />
          <p className="text-base text-muted-foreground">
            <Balancer>
              Jump in and choose the component that catches your eye.
            </Balancer>
          </p>
        </div>
        <div className="pt-8">
          {isLoading ? (
            <ComponentsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {components.map((component) => {
                const category = getComponentCategory(component.name)

                return (
                  <ComponentPreviewCard
                    key={component.name}
                    name={component.name}
                    category={category}
                    tags={component.tags}
                    showTags={false}
                    useDocsLink={true}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
