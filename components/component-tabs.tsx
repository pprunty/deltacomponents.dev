"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import CodeBlock from "@/registry/ui/code-block"
import { cn } from "@/lib/utils"
import { ClipLoader } from "react-spinners"
import { OpenInV0Button } from "./open-in-v0-button"

interface ComponentTabsProps {
  name: string
  className?: string
}

async function getExampleCode(name: string) {
  try {
    const response = await fetch(`/api/code?name=${name}`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch code')
    }
    
    return data.code
  } catch (error) {
    console.error(`Error fetching example code for ${name}:`, error)
    return null
  }
}

export function ComponentTabs({ name, className }: ComponentTabsProps) {
  const [code, setCode] = React.useState<string | null>(null)
  const [Demo, setDemo] = React.useState<React.ComponentType | null>(null)

  // Define a consistent height for both preview and code sections
  const contentHeight = "500px"

  React.useEffect(() => {
    // Dynamically import the demo component
    import(`@/registry/examples/${name}-demo`)
      .then((module) => {
        setDemo(() => module.default)
      })
      .catch((error) => {
        console.error(`Error loading demo for ${name}:`, error)
      })

    // Get the example code
    getExampleCode(name)
      .then(setCode)
      .catch((error) => {
        console.error(`Error loading code for ${name}:`, error)
      })
  }, [name])

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <ClipLoader size={20} color="var(--foreground)" />
    </div>
  )

  const tabContentClasses = "relative rounded-xl border border-border bg-card text-card-foreground shadow-sm mt-6"

  return (
    <div className={cn("relative mt-6", className)}>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList
          variant="underlined"
          showBottomBorder
          className="w-full"
          size="md"
        >
          <TabsTrigger
            value="preview"
            className="font-semibold"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="font-semibold"
          >
            Code
          </TabsTrigger>
        </TabsList>
        {/* Preview Tab Content */}
        <TabsContent value="preview" className={tabContentClasses}>
          <div className="absolute top-2 right-2 z-10">
            <OpenInV0Button url={`/components/${name}`} />
          </div>
          <div className="p-6 flex items-center justify-center w-full" style={{ minHeight: contentHeight }}>
            <div className="w-full max-w-4xl mx-auto">
              {Demo ? <Demo /> : <LoadingSpinner />}
            </div>
          </div>
        </TabsContent>
        {/* Code Tab Content */}
        <TabsContent value="code" className={tabContentClasses}>
          {code ? (
            <CodeBlock
              code={code}
              language="tsx"
              showLineNumbers
              showCopyButton
              showExpandButton
              theme="default"
              maxHeight={contentHeight}
              border={false}
            />
          ) : (
            <LoadingSpinner />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}