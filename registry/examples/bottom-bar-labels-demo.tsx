"use client"

import React from "react"
import BottomBar from "@/delta/bottom-bar"

export default function BottomBarLabelsDemo() {
  const handleCenterAction = () => {
    console.log("New item created!")
  }

  return (
    <div className="relative h-96 bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 h-full flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Bottom bar with labels enabled
          <br />
          <span className="text-xs">Shows text labels below each icon</span>
        </p>
      </div>
      <BottomBar
        showLabels={true}
        centerButton={{
          onClick: handleCenterAction,
          label: "Create",
        }}
      />
    </div>
  )
}
