"use client"

import * as React from "react"
import { Toaster, type ToasterProps } from "sonner"

import { Button } from "@/components/ui/button"
import { toast } from "@/registry/components/toast"

type Position = ToasterProps["position"]

export default function ToastPositionsDemo() {
  const [currentPosition, setCurrentPosition] =
    React.useState<Position>("bottom-right")

  const showToastAtPosition = (position: Position, message: string) => {
    // Dismiss any existing toasts
    toast.dismiss()

    // Update position
    setCurrentPosition(position)

    // Show toast after position update
    setTimeout(() => {
      toast.success(message, {
        duration: 3000,
      })
    }, 50)
  }

  return (
    <div className="space-y-4">
      {/* Single dynamic toaster */}
      <Toaster
        position={currentPosition}
        richColors
        visibleToasts={1}
        toastOptions={{
          className:
            "group toast border rounded-lg p-4 shadow-md bg-background text-foreground",
        }}
      />

      {/* Button grid */}
      <div className="grid grid-cols-3 gap-2 max-w-md">
        <Button
          variant="outline"
          size="sm"
          onClick={() => showToastAtPosition("top-left", "Top Left position")}
        >
          Top Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            showToastAtPosition("top-center", "Top Center position")
          }
        >
          Top Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => showToastAtPosition("top-right", "Top Right position")}
        >
          Top Right
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            showToastAtPosition("bottom-left", "Bottom Left position")
          }
        >
          Bottom Left
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            showToastAtPosition("bottom-center", "Bottom Center position")
          }
        >
          Bottom Center
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            showToastAtPosition("bottom-right", "Bottom Right position")
          }
        >
          Bottom Right
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Current position: <span className="font-mono">{currentPosition}</span>
      </div>
    </div>
  )
}
