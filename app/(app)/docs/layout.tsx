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
      <div className="">
        <div className="items-start lg:grid lg:grid-cols-[340px_minmax(0,1fr)] justify-center">
          <aside className="sticky top-2 pb-5 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 lg:block pl-4 pt-6">
            <div className="rounded-2xl bg-background h-full border-border border">
              <ScrollArea className="h-full">
                <DocsNav config={docsConfig} />
              </ScrollArea>
            </div>
          </aside>

          <div className="p-2 p-6 lg:px-5 mt-16 lg:p-6 lg:mt-0">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
