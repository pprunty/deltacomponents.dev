"use client"

import * as React from "react"
import { Toaster } from "sonner"

import { Button } from "@/components/ui/button"
import { toast } from "@/registry/components/toast"

export default function ToastCustomDemo() {
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
        <Button
          onClick={() =>
            toast.success("Custom success with icon", {
              duration: 3000,
            })
          }
        >
          Custom Success
        </Button>
        <Button
          onClick={() =>
            toast.error("Custom error message", {
              duration: 4000,
            })
          }
        >
          Custom Error
        </Button>
        <Button
          onClick={() =>
            toast.warning("Custom warning", {
              duration: 6000,
            })
          }
        >
          Custom Warning
        </Button>
        <Button
          onClick={() =>
            toast.info(
              "Update Available - Version 2.0.0 is now available for download",
              {
                duration: 8000,
                action: {
                  label: "Update",
                  onClick: () => toast.success("Starting update..."),
                },
              }
            )
          }
        >
          Rich Content
        </Button>
      </div>
    </div>
  )
}
