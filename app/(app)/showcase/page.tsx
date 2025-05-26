"use client"

import * as React from "react"
import { Index } from "@/__registry__/index"

const demoKeys = Object.keys(Index).filter(
  (key) => key.endsWith("-demo")
)

export default function ShowcasePage() {
  const [selected, setSelected] = React.useState(demoKeys[0] || "")
  const [showSelect, setShowSelect] = React.useState(true)
  const [refreshKey, setRefreshKey] = React.useState(0)
  const selectRef = React.useRef<HTMLSelectElement>(null)

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Ctrl+K to toggle select visibility
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setShowSelect((v) => !v)
        setTimeout(() => {
          if (showSelect && selectRef.current) selectRef.current.focus()
        }, 100)
      }
      // 'r' to refresh/replay the component
      if (e.key.toLowerCase() === "r" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        setRefreshKey((k) => k + 1)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showSelect])

  const DemoComponent = selected ? Index[selected]?.component : null

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {showSelect && (
        <div className="fixed top-0 left-0 w-full flex flex-col items-center z-20 bg-background/80 py-4">
          <label className="w-full max-w-xs flex flex-col gap-2">
            <span className="text-sm font-medium">Select a component</span>
            <select
              ref={selectRef}
              className="border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              aria-label="Select a component demo"
            >
              {demoKeys.map((key) => (
                <option key={key} value={key}>
                  {Index[key].name || key}
                </option>
              ))}
            </select>
            <span className="text-xs text-muted-foreground">Press Ctrl+K (or Cmd+K) to hide/show this select</span>
            <span className="text-xs text-muted-foreground">Press &quot;R&quot; to replay the component</span>
          </label>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg flex items-center justify-center">
          {DemoComponent ? (
            <React.Suspense fallback={<div className="text-center">Loading…</div>}>
              <DemoComponent key={refreshKey} />
            </React.Suspense>
          ) : (
            <div className="text-muted-foreground">No demo selected</div>
          )}
        </div>
      </div>
    </div>
  )
}