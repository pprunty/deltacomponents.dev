"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  marginOff = false,
  height = "450px",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
  marginOff?: boolean
  height?: string | number
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        defaultValue="preview"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        {!hideCode && (
          <TabsList
            variant="underlined"
            showBottomBorder
            showActiveIndicator
            className="mb-4 w-full"
            size="md"
          >
            <TabsTrigger value="preview" className="font-medium">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="font-medium">
              Code
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent
          value="preview"
          className="relative overflow-hidden rounded-lg border"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex [height:var(--preview-height)] w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
              marginOff ? "p-0" : "p-4 sm:p-6 md:p-10"
            )}
            style={
              {
                "--preview-height":
                  typeof height === "number" ? `${height}px` : height,
              } as React.CSSProperties & { "--preview-height": string }
            }
          >
            {component}
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          className="relative overflow-hidden rounded-lg border"
        >
          <div
            className="**:button:!z-[5] [height:var(--code-height)] overflow-hidden **:[figure]:!m-0 **:[pre]:relative **:[pre]:z-0 **:[pre]:[height:var(--code-height)]"
            style={
              {
                "--code-height":
                  typeof height === "number" ? `${height}px` : height,
              } as React.CSSProperties & { "--code-height": string }
            }
          >
            {source}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
