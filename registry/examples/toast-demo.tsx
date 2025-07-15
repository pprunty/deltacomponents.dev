"use client"

import * as React from "react"
import { Toaster } from "sonner"

import { Button } from "@/components/ui/button"
import { toast } from "@/delta/toast"

export default function ToastDemo() {
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

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Task completed successfully!")}>
          Success
        </Button>
        <Button onClick={() => toast.error("Something went wrong!")}>
          Error
        </Button>
        <Button onClick={() => toast.warning("Please check your input")}>
          Warning
        </Button>
        <Button onClick={() => toast.info("New update available")}>Info</Button>
        <Button onClick={() => toast.default("Default notification")}>
          Default
        </Button>
      </div>
    </div>
  )
}
