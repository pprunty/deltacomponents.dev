"use client"

import React from "react"
import { Index } from "@/__registry__"
import { ChevronRightIcon } from "lucide-react"
import { Balancer } from "react-wrap-balancer"

import { cn, getComponentCategory } from "@/lib/utils"
import { ComponentPreviewCard } from "@/components/component-preview-card"
import AnimateIn from "@/registry/animations/animate-in"
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

export default function ComponentsPage() {
  const components = getComponents()

  return (
    <main className="relative">
      <div className="w-full min-w-0 md:px-8 md:p-6">
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
          />
          <p className="text-base text-muted-foreground">
            <Balancer>
              Jump in and choose the component that catches your eye.
            </Balancer>
          </p>
        </div>
        <div className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {components.map((component, index) => {
              const category = getComponentCategory(component.name)

              return (
                <AnimateIn
                  key={component.name}
                  useIntersectionObserver
                  threshold={0.1}
                  triggerOnce={true}
                  direction="fade"
                  delay={index * 100}
                >
                  <ComponentPreviewCard
                    name={component.name}
                    category={category}
                    tags={component.tags}
                    showTags={false}
                    useDocsLink={true}
                  />
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
