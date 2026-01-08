"use client"

import { SiteLayout } from "./components/site-layout"

export default function HomePage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl space-y-4 px-6 py-6">
        {/* Hero Section */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />

        {/* Features */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="bg-muted/50 aspect-square rounded-xl" />
          <div className="bg-muted/50 aspect-square rounded-xl" />
        </div>
        <div className="bg-muted/50 h-[400px] rounded-xl" />
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 h-[600px] rounded-xl" />
      </div>
    </SiteLayout>
  )
}
