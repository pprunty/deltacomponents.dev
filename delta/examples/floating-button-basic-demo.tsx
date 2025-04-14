"use client"

import { Plus } from "lucide-react"
import FloatingButton from "@/delta/components/floating-button"

export default function FloatingButtonBasicDemo() {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg relative h-48">
      <FloatingButton.FloatingButton
        icon={Plus}
        text="Add Item"
        position="absolute"
        placement="bottom-right"
        variant={"outline"}
        offset={16}
      />
    </div>
  )
}
