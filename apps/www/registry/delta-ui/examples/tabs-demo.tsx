"use client"

import { useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList showBottomBorder>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Overview</h3>
            <p className="text-muted-foreground text-sm">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Analytics</h3>
            <p className="text-muted-foreground text-sm">
              View your analytics data and performance metrics.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Reports</h3>
            <p className="text-muted-foreground text-sm">
              Generate and download detailed reports.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-2 rounded-lg border p-6">
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-muted-foreground text-sm">
              Manage your notification preferences.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
