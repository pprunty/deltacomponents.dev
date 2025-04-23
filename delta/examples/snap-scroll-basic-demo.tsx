"use client"

import { useState, useCallback } from "react"
import { SnapScroll, SnapScrollItem, type SnapScrollItem as Item } from "@/delta/components/snap-scroll"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ClipLoader } from "react-spinners"

/**
 * A basic demo of the SnapScroll component
 */
export default function SnapScrollDemo() {
  // Sample data for the demo
  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: `item-${i + 1}`,
      title: `Item ${i + 1}`,
      description: `This is the description for item ${i + 1}`,
      color: getRandomColor(),
    })),
  )

  // Options state
  const [enableRouting, setEnableRouting] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  // Function to fetch more items
  const fetchMoreItems = useCallback(async () => {
    // Set loading state
    setIsFetching(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add 3 more items
    const currentLength = items.length
    const newItems = Array.from({ length: 3 }, (_, i) => ({
      id: `item-${currentLength + i + 1}`,
      title: `Item ${currentLength + i + 1}`,
      description: `This is the description for item ${currentLength + i + 1}`,
      color: getRandomColor(),
    }))

    setItems((prev) => [...prev, ...newItems])
    setIsFetching(false)
  }, [items])

  // Handle item change
  const handleItemChange = useCallback((index: number, item: Item) => {
    console.log(`Active item changed to: ${item.title} (index: ${index})`)
  }, [])

  return (
    <div className="relative">
      {/* Options panel */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <h3 className="font-medium mb-2">Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={enableRouting} onChange={() => setEnableRouting(!enableRouting)} />
            Enable URL Routing
          </label>
        </div>
        <div className="mt-4">
          <p className="text-xs text-muted-foreground">Items: {items.length} | Use keyboard ↑/↓ to navigate</p>
        </div>
      </div>

      {/* Snap Scroll Component */}
      <SnapScroll
        items={items}
        onFetchMore={fetchMoreItems}
        enableDynamicRouting={enableRouting}
        routePrefix="demo"
        position="absolute"
        fetchThreshold={2}
        showProgress={showProgress}
        onItemChange={handleItemChange}
      >
        {items.map((item, index) => (
          <SnapScrollItem key={item.id}>
            <Card
              className="w-[90%] max-w-3xl m-4 shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: item.color }}
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="text-black/70">Scroll to navigate between items</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black/80">{item.description}</p>
                <div className="h-40 flex items-center justify-center mt-4 bg-white/20 rounded-lg">
                  <p className="text-4xl font-bold">{index + 1}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const container = document.querySelector(".snap-y")
                    if (container) {
                      container.scrollBy({
                        top: -window.innerHeight,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const container = document.querySelector(".snap-y")
                    if (container) {
                      container.scrollBy({
                        top: window.innerHeight,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </SnapScrollItem>
        ))}
      </SnapScroll>

      {/* Centered ClipLoader spinner */}
      {isFetching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <ClipLoader size={35} color="#3b82f6" speedMultiplier={0.8} />
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to generate random pastel colors
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 85%)`
}
