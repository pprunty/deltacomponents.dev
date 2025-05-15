"use client"

import * as React from "react"
import { Highlighter } from "@/registry/landing-page/highlighter"

export default function HighlighterDemo() {
  return (
    <>
      <main className="flex flex-col pt-16 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-6 w-full">
          <h1 className="text-5xl font-bold tracking-tight text-primary lg:text-7xl">
            This works <Highlighter shadowColor="rgb(240,171,252)" darkShadowColor="rgba(245,140,245,0.8)">great</Highlighter> in landing pages.
          </h1>
        </div>
      </main>
    </>
  )
}
