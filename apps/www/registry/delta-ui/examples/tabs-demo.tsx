"use client"

import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsDemo() {
  const [activeTab, setActiveTab] = React.useState("overview")

  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Underline variant (default size)
        </p>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          variant="underline"
        >
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <div className="relative min-h-[80px]">
            <TabsContent
              value="overview"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                View your dashboard overview.
              </p>
            </TabsContent>

            <TabsContent
              value="analytics"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Analyze your metrics.
              </p>
            </TabsContent>

            <TabsContent
              value="reports"
              className="bg-card absolute inset-x-0 top-0 rounded-lg border p-4"
            >
              <p className="text-muted-foreground text-sm">
                Generate and view reports.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground text-xs">Size variants</p>

        <div>
          <p className="text-muted-foreground mb-2 text-xs">Small (sm)</p>
          <Tabs defaultValue="tab1" variant="underline" size="sm">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
              <TabsTrigger value="tab3">Third</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div>
          <p className="text-muted-foreground mb-2 text-xs">Large (lg)</p>
          <Tabs defaultValue="tab1" variant="underline" size="lg">
            <TabsList>
              <TabsTrigger value="tab1">First</TabsTrigger>
              <TabsTrigger value="tab2">Second</TabsTrigger>
              <TabsTrigger value="tab3">Third</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
