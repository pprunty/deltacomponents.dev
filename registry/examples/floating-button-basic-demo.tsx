"use client"

import { Plus } from "lucide-react"
import FloatingButton from "@/registry/ui/floating-button"

export default function FloatingButtonBasicDemo() {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg relative h-48">
      <FloatingButton.FloatingButton
        icon={Plus}
        text="Add Item"
        position="absolute"
        placement="bottom-right"
        offset={16}
      />
    </div>
  )
}
