import { Metadata } from "next"

import { ComponentsShowcase } from "@/components/components-showcase"

export const metadata: Metadata = {
  title: "Components",
  description: "Jump in and choose the component that catches your eye",
}

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="sm:py-4">
        <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-medium scroll-m-20 text-4xl lg:text-3xl font-bold tracking-tight text-pretty">
            Components
          </h1>
          <p className="text-base text-muted-foreground text-pretty">
            Jump in and choose the component that catches your eye
          </p>
        </div>
        <div className="pt-4">
          <ComponentsShowcase />
        </div>
      </div>
    </div>
  )
}
