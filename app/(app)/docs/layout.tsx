import * as React from "react"

import { docsConfig } from "@/config/docs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocsNav } from "@/components/docs-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative w-full flex">
      <aside className="sticky top-12 pb-5 z-30 hidden h-[calc(100vh-3rem)] w-72 shrink-0 lg:block bg-muted dark:bg-popover border-r border-border">
        <ScrollArea className="h-full">
          <DocsNav config={docsConfig} />
        </ScrollArea>
      </aside>

      <div className="w-full lg:flex-1 lg:flex lg:flex-col">
        <div className="px-2 md:px-4">
          <div className="xl:py-0 xl:px-0 xl:pb-5 mt-16 xl:mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
