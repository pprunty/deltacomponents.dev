import type React from "react"

import { SiteHeader } from "./site-header"

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      <main className="pt-16">{children}</main>
    </div>
  )
}
