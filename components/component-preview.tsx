"use client"

import * as React from "react"
import { Index } from "@/__registry__"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/components/tabs"
import { CopyButton } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import CodeBlock from "@/registry/media/code-block"

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
  const [activeTab, setActiveTab] = React.useState("preview")
  const [code, setCode] = React.useState<string | null>(null)
  
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

    return <Component />
  }, [name])

  // Load code directly from the file
  React.useEffect(() => {
    async function loadCode() {
      try {
        const component = Index[name]
        if (component) {
          const filePath = component.files[0]?.path
          if (filePath) {
            // In the browser, use fetch to get the file content
            const response = await fetch(`/api/source?path=${encodeURIComponent(filePath)}`)
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
        defaultValue="preview"
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
            <TabsTrigger
              value="preview"
              className="font-medium"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="font-medium"
            >
              Code
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {v0 && <OpenInV0Button url={`/docs/${name}`} />}
            {code && <CopyButton value={code} />}
          </div>
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
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
                <CodeBlock 
                  code={code} 
                  language="tsx" 
                  showLineNumbers 
                  showCopyButton 
                  showExpandButton
                  maxHeight="350px"
                  border={false}
                  className="w-full rounded-md"
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
