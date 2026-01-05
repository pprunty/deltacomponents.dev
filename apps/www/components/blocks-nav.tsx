"use client"

import { useCallback, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/registry/delta-ui/delta/tabs"
import { ScrollArea, ScrollBar } from "@/registry/delta-ui/ui/scroll-area"
import { registryCategories } from "@/registry/registry-categories"

export function BlocksNav() {
  const router = useRouter()
  const pathname = usePathname()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  // Determine current value based on pathname
  const currentValue =
    pathname === "/blocks"
      ? "featured"
      : pathname.startsWith("/blocks/")
        ? pathname.split("/blocks/")[1]
        : "featured"

  const handleValueChange = (value: string) => {
    const href = value === "featured" ? "/blocks" : `/blocks/${value}`
    router.push(href)
  }

  // Show all categories in blocks nav (including Featured)
  const visibleCategories = registryCategories

  // Find active tab index
  const activeIndex = visibleCategories.findIndex(
    (category) => category.slug === currentValue
  )

  // Function to scroll active tab to center
  const scrollTabToCenter = useCallback((index: number) => {
    const tabElement = tabRefs.current[index]
    const scrollContainer = scrollContainerRef.current

    if (tabElement && scrollContainer) {
      const containerWidth = scrollContainer.offsetWidth
      const tabWidth = tabElement.offsetWidth
      const tabLeft = tabElement.offsetLeft

      // Calculate position to center the tab
      const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2

      // Smooth scroll to the target position
      scrollContainer.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      })
    }
  }, [])

  // Center the active tab when it changes
  useEffect(() => {
    if (activeIndex >= 0) {
      const timer = setTimeout(() => {
        scrollTabToCenter(activeIndex)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [activeIndex, scrollTabToCenter])

  return (
    <>
      {/* Mobile: Full-bleed with left padding to show overflow */}
      <div className="relative w-full md:hidden">
        <div
          className="relative overflow-hidden pl-6"
          style={{
            width: "100vw",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Tabs
            value={currentValue}
            onValueChange={handleValueChange}
            variant="ghost"
            size="lg"
          >
            <ScrollArea className="w-full [&>div]:[-ms-overflow-style:none] [&>div]:[scrollbar-width:none] [&>div::-webkit-scrollbar]:hidden">
              <div
                ref={(node) => {
                  if (node) {
                    // Get the actual scrollable viewport
                    const viewport = node.querySelector(
                      "[data-radix-scroll-area-viewport]"
                    )
                    if (viewport) {
                      scrollContainerRef.current = viewport as HTMLDivElement
                    }
                  }
                }}
              >
                <TabsList>
                  {visibleCategories.map((category, index) => (
                    <TabsTrigger
                      key={category.slug}
                      value={category.slug}
                      ref={(el) => {
                        tabRefs.current[index] = el
                      }}
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {/* Desktop: Normal container */}
      <div className="hidden w-full md:block">
        <Tabs
          value={currentValue}
          onValueChange={handleValueChange}
          variant="ghost"
          size="lg"
        >
          <ScrollArea className="w-full [&>div]:[-ms-overflow-style:none] [&>div]:[scrollbar-width:none] [&>div::-webkit-scrollbar]:hidden">
            <div
              ref={(node) => {
                if (node) {
                  // Get the actual scrollable viewport
                  const viewport = node.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  )
                  if (viewport) {
                    scrollContainerRef.current = viewport as HTMLDivElement
                  }
                }
              }}
            >
              <TabsList>
                {visibleCategories.map((category, index) => (
                  <TabsTrigger
                    key={category.slug}
                    value={category.slug}
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </Tabs>
      </div>
    </>
  )
}
