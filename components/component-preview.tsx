"use client"

import * as React from "react"
import { Index } from "@/__registry__"

import { cn } from "@/lib/utils"
import { CodeSnippet } from "@/registry/media/code-snippet"
import { Icons } from "@/components/icons"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { RefreshButton } from "@/components/refresh-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  v0?: boolean
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  v0 = true,
  ...props
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState("demo")
  const [code, setCode] = React.useState<string | null>(null)
  const [filename, setFilename] = React.useState<string | null>(null)
  const [refreshKey, setRefreshKey] = React.useState(0)
  const previewRef = React.useRef<HTMLDivElement>(null)

  // Handle tab switching to reinitialize IntersectionObserver
  React.useEffect(() => {
    if (activeTab === "demo" && previewRef.current) {
      // Force IntersectionObserver to recalculate by triggering a resize event
      window.dispatchEvent(new Event("resize"))
    }
  }, [activeTab])

  // Handle component refresh
  const handleRefresh = React.useCallback(() => {
    setRefreshKey((prev) => prev + 1)
  }, [])

  // Get component and source file from registry
  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component key={refreshKey} />
  }, [name, refreshKey])

  // Load code directly from the file
  React.useEffect(() => {
    async function loadCode() {
      try {
        const component = Index[name]
        if (component) {
          const filePath = component.files[0]?.path
          if (filePath) {
            // Extract filename from path
            const filename = filePath.split("/").pop() || filePath
            setFilename(filename)

            // In the browser, use fetch to get the file content
            const response = await fetch(
              `/api/source?path=${encodeURIComponent(filePath)}`
            )
            if (response.ok) {
              const data = await response.json()
              setCode(data.source)
            }
          }
        }
      } catch (error) {
        console.error("Failed to load source code:", error)
      }
    }

    loadCode()
  }, [name])

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs
        defaultValue="demo"
        value={activeTab}
        onValueChange={setActiveTab}
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
            <TabsTrigger value="demo" className="font-medium">
              Demo
            </TabsTrigger>
            <TabsTrigger value="code" className="font-medium">
              Code
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="demo" className="relative rounded-md border">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <RefreshButton onRefresh={handleRefresh} />
            {v0 && <OpenInV0Button url={`/docs/${name}`} />}
          </div>
          <div
            ref={previewRef}
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10 overflow-x-auto",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md border [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {code ? (
                <CodeSnippet
                  title={filename || undefined}
                  code={code}
                  language="tsx"
                  className="w-full rounded-md"
                  border={false}
                />
              ) : (
                <div className="flex items-center justify-center p-10 text-sm text-muted-foreground">
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                  Loading code...
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
