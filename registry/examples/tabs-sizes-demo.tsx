"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/delta/tabs"

export default function TabsSizesDemo() {
  return (
    <div className="space-y-8 w-full">
      {/* Small Size */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList size="sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4 text-sm">Small size tabs content</div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="p-4 text-sm">Analytics data</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 text-sm">Settings options</div>
        </TabsContent>
      </Tabs>

      {/* Medium Size */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList size="md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4">Medium size tabs content</div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="p-4">Analytics data</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4">Settings options</div>
        </TabsContent>
      </Tabs>

      {/* Large Size */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList size="lg">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4 text-lg">Large size tabs content</div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="p-4 text-lg">Analytics data</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 text-lg">Settings options</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
