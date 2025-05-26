"use client"

import * as React from "react"
import { Index } from "@/__registry__/index"

const demoKeys = Object.keys(Index).filter(
  (key) => Index[key].type === "registry:block" || Index[key].type === "registry:component"
)

export default function ShowcaseClient() {
  const [selected, setSelected] = React.useState(demoKeys[0] || "")
  const [showSelect, setShowSelect] = React.useState(true)
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
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showSelect])

  const DemoComponent = selected ? Index[selected]?.component : null

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-2">Component Showcase</h1>
      {showSelect && (
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
        </label>
      )}
      <div className="w-full flex items-center justify-center min-h-[300px]">
        {DemoComponent ? (
          <React.Suspense fallback={<div className="text-center">Loading…</div>}>
            <DemoComponent />
          </React.Suspense>
        ) : (
          <div className="text-muted-foreground">No demo selected</div>
        )}
      </div>
    </div>
  )
} 