"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { toast } from "@/registry/components/toast"

export default function ToastPositionsDemo() {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-md">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Top Left position")}
      >
        Top Left
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Top Center position")}
      >
        Top Center
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Top Right position")}
      >
        Top Right
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Bottom Left position")}
      >
        Bottom Left
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Bottom Center position")}
      >
        Bottom Center
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.success("Bottom Right position")}
      >
        Bottom Right
      </Button>
    </div>
  )
}
