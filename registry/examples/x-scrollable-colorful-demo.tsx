"use client"

import React from "react"

import { XScrollable } from "@/delta/x-scrollable"

export default function XScrollableColorfulDemo() {
  // Generate some demo items
  const demoItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is a sample item ${i + 1} for the colorful demo`,
  }))

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Colorful XScrollable</h3>

      <XScrollable className="colorful-style">
        {demoItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-64 p-4 border rounded-md mr-4 bg-card"
          >
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </XScrollable>
    </div>
  )
}
