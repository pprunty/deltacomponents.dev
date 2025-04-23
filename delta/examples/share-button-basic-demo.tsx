"use client"

import ShareButton from "@/delta/components/share-button"

export default function ShareButtonBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <ShareButton 
        tooltip="Share this content"
        size="md"
        nativeShareOnDesktop={false}
        url="https://deltacomponents.dev"
        message="Check out Delta Components, a modern React UI library: "
      />
    </div>
  )
}
