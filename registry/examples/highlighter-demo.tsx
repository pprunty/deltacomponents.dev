"use client"

import { Highlighter } from "@/delta/highlighter"

export default function HighlighterDemo() {
  return (
    <main className="flex flex-col space-y-12 py-12">
      <div className="max-w-3xl mx-auto text-center w-full">
        <h1 className="text-5xl font-bold tracking-tight lg:text-7xl text-foreground">
          Make your{" "}
          <Highlighter
            text="idea"
            animate={true}
            shadowColor="rgb(240,171,252)"
            darkShadowColor="rgba(245,140,245,0.8)"
          />{" "}
          stand out.
        </h1>
      </div>
    </main>
  )
}
