import * as React from "react"

import { docsConfig } from "@/config/docs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocsNav } from "@/components/docs-nav"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative w-full">
      <SiteHeader />
      <div className="px-4 md:px-4">
        <div className="items-start xl:grid xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-4 justify-center">
          <aside className="sticky top-4 pb-5 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 lg:block mt-4">
            <div className="rounded-2xl bg-background h-full border-border border">
              <ScrollArea className="h-full">
                <DocsNav config={docsConfig} />
              </ScrollArea>
            </div>
          </aside>

          <div className="p-2 xl:py-0 xl:px-0 xl:pb-5 mt-16 xl:mt-4">
            {children}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
