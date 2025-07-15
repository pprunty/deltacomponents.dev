"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster } from "sonner"

import { Button } from "@/components/ui/button"
import { toast } from "@/delta/toast"

export default function ToastColorsDemo() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-4">
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          className:
            "group toast border rounded-lg p-4 shadow-md bg-background text-foreground",
        }}
      />

      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Toggle Theme
        </Button>
        <span className="text-sm text-muted-foreground">Current: {theme}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => toast.success("Emerald success colors")}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Success Toast
        </Button>
        <Button
          onClick={() => toast.error("Red error colors")}
          className="bg-red-600 hover:bg-red-700"
        >
          Error Toast
        </Button>
        <Button
          onClick={() => toast.warning("Amber warning colors")}
          className="bg-amber-600 hover:bg-amber-700"
        >
          Warning Toast
        </Button>
        <Button
          onClick={() => toast.info("Blue info colors")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Info Toast
        </Button>
        <Button
          onClick={() => toast.default("Gray default colors")}
          className="bg-gray-600 hover:bg-gray-700"
        >
          Default Toast
        </Button>
        <Button
          onClick={() => {
            toast.success("Light theme colors")
            setTimeout(() => {
              setTheme("dark")
              toast.success("Dark theme colors")
            }, 1000)
          }}
          variant="outline"
        >
          Theme Transition
        </Button>
      </div>
    </div>
  )
}
