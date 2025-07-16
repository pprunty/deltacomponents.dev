"use client"

import * as React from "react"
import { toast } from "@/delta/toast"
import { Toaster } from "sonner"

import { Button } from "@/components/ui/button"

export default function ToastActionsDemo() {
  const [loading, setLoading] = React.useState(false)

  const handlePromiseToast = async () => {
    setLoading(true)

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("success")
        } else {
          reject("error")
        }
      }, 2000)
    })

    toast.promise(promise, {
      loading: "Loading...",
      success: "Data saved successfully!",
      error: "Failed to save data",
    })

    try {
      await promise
    } catch {
      // Handle error
    } finally {
      setLoading(false)
    }
  }

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
            toast.success("File uploaded!", {
              action: {
                label: "Undo",
                onClick: () => toast.info("Upload cancelled"),
              },
            })
          }
        >
          With Action
        </Button>
        <Button
          onClick={() =>
            toast.info("Changes saved", {
              description: "Your changes have been saved to the cloud.",
            })
          }
        >
          With Description
        </Button>
        <Button onClick={handlePromiseToast} disabled={loading}>
          Promise Toast
        </Button>
        <Button
          onClick={() =>
            toast.error("Connection failed", {
              action: {
                label: "Retry",
                onClick: () => toast.info("Retrying..."),
              },
            })
          }
        >
          Error with Retry
        </Button>
      </div>
    </div>
  )
}
