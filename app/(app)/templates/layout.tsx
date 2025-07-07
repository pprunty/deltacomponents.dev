import * as React from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface TemplatesLayoutProps {
  children: React.ReactNode
}

export default function TemplatesLayout({ children }: TemplatesLayoutProps) {
  return (
    <div className="relative w-full">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
