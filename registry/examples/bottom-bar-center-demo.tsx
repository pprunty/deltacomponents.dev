"use client"

import React from "react"

import BottomBar from "@/registry/layout/bottom-bar"

export default function BottomBarCenterDemo() {
  const handleCenterAction = () => {
    alert("Center action triggered!")
  }

  return (
    <div className="relative h-96 bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 h-full flex items-center justify-center">
        <p className="text-muted-foreground text-center">
          Bottom bar with center action button
          <br />
          <span className="text-xs">
            Tap the center button to trigger an action
          </span>
        </p>
      </div>
      <BottomBar
        centerButton={{
          onClick: handleCenterAction,
          label: "Add",
        }}
      />
    </div>
  )
}
