"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

export default function TabsBackgroundDemo() {
  return (
    <div className="relative flex size-full flex-col overflow-hidden">
      <Tabs defaultValue="overview" className="w-full overflow-hidden">
        <TabsList 
          variant="active-animated"
          className="w-full h-12"
        >
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="reports"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Overview</h3>
            <p className="text-muted-foreground text-sm">
              Get a comprehensive view of your application's performance and key metrics.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Analytics</h3>
            <p className="text-muted-foreground text-sm">
              Dive deep into user behavior, traffic patterns, and conversion rates.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Reports</h3>
            <p className="text-muted-foreground text-sm">
              Generate detailed reports and export data for further analysis.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}