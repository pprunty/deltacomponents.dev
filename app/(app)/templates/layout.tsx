import * as React from "react"

import { SiteFooter } from "@/components/site-footer"

interface TemplatesLayoutProps {
  children: React.ReactNode
}

export default function TemplatesLayout({ children }: TemplatesLayoutProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <main className="h-full w-full max-w-[96rem] flex flex-col items-center justify-center">
        <div className="relative w-full">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </main>
    </div>
  )
}
