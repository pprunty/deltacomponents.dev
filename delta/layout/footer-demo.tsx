"use client"

import { useState } from "react"
import Footer from "./footer"

export default function FooterDemo() {
  // State for customization options
  const [showHeader, setShowHeader] = useState(true)
  const [showCopyright, setShowCopyright] = useState(true)
  const [layout, setLayout] = useState<"3-column" | "2-column" | "stacked">("3-column")
  const [spacing, setSpacing] = useState<"default" | "compact" | "spacious">("default")
  const [fontWeight, setFontWeight] = useState<"normal" | "medium" | "semibold" | "bold">("semibold")

  // Store info matches the screenshot
  const customStoreInfo = {
    name: "Corners New York",
    description: "An Art & Design store in the Catskills, upstate New York.",
    address: {
      street: "49 Main St.",
      city: "Livingston Manor",
      state: "NY",
      zip: "12758",
      country: "USA",
    },
  }

  // Reset to default settings
  const resetToDefault = () => {
    setShowHeader(true)
    setShowCopyright(true)
    setLayout("3-column")
    setSpacing("default")
    setFontWeight("semibold")
  }

  // Reset to match screenshot exactly
  const matchScreenshot = () => {
    setShowHeader(true)
    setShowCopyright(true)
    setLayout("3-column")
    setSpacing("default")
    setFontWeight("semibold")
  }

  return (
    <div className="space-y-4">

      {/* Footer Preview */}
      <div className="rounded-lg overflow-hidden">
        <Footer
          storeInfo={customStoreInfo}
          headerText="( THINK WITH YOUR EYES )"
          fontWeight="semibold"
          layout="3-column"
          spacing="default"
        />
      </div>

    </div>
  )
}

