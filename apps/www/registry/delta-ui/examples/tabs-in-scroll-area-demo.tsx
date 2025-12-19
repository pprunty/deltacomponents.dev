"use client"

import { useEffect, useRef } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"
import { ScrollArea, ScrollBar } from "@/registry/delta-ui/ui/scroll-area"

export function TabsInScrollAreaDemo() {
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const scrollTabToCenter = (tabValue: string) => {
    const tabElement = tabRefs.current.get(tabValue)
    const scrollContainer = scrollViewportRef.current

    if (tabElement && scrollContainer) {
      const containerWidth = scrollContainer.offsetWidth
      const tabWidth = tabElement.offsetWidth
      const tabLeft = tabElement.offsetLeft

      const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2

      scrollContainer.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const viewport = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement
    if (viewport) {
      scrollViewportRef.current = viewport
    }
  }, [])

  return (
    <Tabs
      defaultValue="tab1"
      onValueChange={(value) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollTabToCenter(value))
        })
      }}
      variant="underline"
      className="w-[400px]"
    >
      <ScrollArea className="w-full [&>div]:[-ms-overflow-style:none] [&>div]:[scrollbar-width:none] [&>div::-webkit-scrollbar]:hidden">
        <TabsList className="w-max">
          {Array.from({ length: 12 }, (_, i) => {
            const tabValue = `tab${i + 1}`
            return (
              <TabsTrigger
                key={tabValue}
                value={tabValue}
                ref={(el) => {
                  if (el) {
                    tabRefs.current.set(tabValue, el)
                  }
                }}
              >
                Tab {i + 1}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      {Array.from({ length: 12 }, (_, i) => {
        const tabValue = `tab${i + 1}`
        return (
          <TabsContent key={tabValue} value={tabValue}>
            <div className="rounded-lg border p-6">
              <p className="text-muted-foreground text-sm">
                Content for Tab {i + 1}. Click different tabs to see the active
                tab scroll into view automatically.
              </p>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
