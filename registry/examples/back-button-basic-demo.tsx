"use client"

import { BackButton } from "@/registry/ui/back-button"

export default function BackButtonBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <BackButton variant="ghost" size="md" />
    </div>
  )
}
