import * as React from "react"

import { docsConfig } from "@/config/docs"
import { DocsNav } from "@/components/docs-nav"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-grid flex flex-1 flex-col">
      <div className="fixed top-0 left-0 w-full z-30 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white text-center font-medium text-sm flex items-center justify-center py-2 px-2 md:py-2 md:px-4 md:text-[15px]">
        <span className="block md:hidden">⚠️ The registry is in development and not yet released.</span>
        <span className="hidden md:block">⚠️ This component registry is in development and has not yet been formally released.</span>
      </div>
      <div className="pt-10">
        <SiteHeader />
        <div className="container-wrapper flex flex-1 flex-col">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="border-grid fixed top-14 z-30 hidden size-full max-h-[calc(100vh-3.5rem)] shrink-0 border-r md:sticky md:block">
              <div className="h-full overflow-auto py-6 pr-4 lg:py-8">
                <DocsNav config={docsConfig} />
              </div>
            </aside>
            {children}
          </div>
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
