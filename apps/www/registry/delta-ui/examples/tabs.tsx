"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsExample() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Basic Tabs */}
      <div className="w-[400px]">
        <h3 className="mb-4 text-lg font-semibold">Basic Tabs</h3>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4 space-y-2">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Account Settings</h4>
              <p className="text-muted-foreground text-sm">
                Make changes to your account here. Click save when you're done.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password" className="mt-4 space-y-2">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Password Settings</h4>
              <p className="text-muted-foreground text-sm">
                Change your password here. After saving, you'll be logged out.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-4 space-y-2">
            <div className="space-y-1">
              <h4 className="text-sm font-medium">General Settings</h4>
              <p className="text-muted-foreground text-sm">
                Configure your general preferences and application settings.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Pills Variant */}
      <div className="w-[400px]">
        <h3 className="mb-4 text-lg font-semibold">Pills Variant</h3>
        <Tabs defaultValue="overview">
          <TabsList variant="pills">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <p className="text-muted-foreground text-sm">
              Overview content with pills-style tabs.
            </p>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <p className="text-muted-foreground text-sm">
              Analytics dashboard content.
            </p>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <p className="text-muted-foreground text-sm">
              Reports and data insights.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Scrollable Tabs */}
      <div className="w-[300px]">
        <h3 className="mb-4 text-lg font-semibold">Scrollable Tabs</h3>
        <Tabs defaultValue="tab3">
          <TabsList>
            <TabsTrigger value="tab1">Very Long Tab Name 1</TabsTrigger>
            <TabsTrigger value="tab2">Another Long Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Extended Tab Title 3</TabsTrigger>
            <TabsTrigger value="tab4">Long Description Tab 4</TabsTrigger>
            <TabsTrigger value="tab5">Final Tab Number 5</TabsTrigger>
          </TabsList>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-muted-foreground text-sm">
              Content for the selected tab. The tabs automatically scroll to
              center the active tab.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
