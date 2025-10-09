"use client"

import { useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/ui/tabs"

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState("features")

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Interactive Tabs Demo</h2>
          <p className="text-muted-foreground">
            Explore different tab variants and features with live controls.
          </p>
        </div>

        {/* Main Demo */}
        <div className="rounded-lg border p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList showBottomBorder>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="docs" disabled>
                Docs
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-lg font-semibold">Product Features</h3>
                <div className="grid gap-4">
                  <div className="rounded border p-4">
                    <h4 className="font-medium">Advanced Analytics</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Get detailed insights into your application performance.
                    </p>
                  </div>
                  <div className="rounded border p-4">
                    <h4 className="font-medium">Real-time Updates</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Stay updated with live data synchronization.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <h3 className="text-lg font-semibold">Pricing Plans</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded border p-4">
                    <h4 className="font-medium">Starter</h4>
                    <p className="mt-2 text-2xl font-bold">
                      $9<span className="text-sm font-normal">/month</span>
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      Perfect for small projects
                    </p>
                  </div>
                  <div className="rounded border p-4">
                    <h4 className="font-medium">Pro</h4>
                    <p className="mt-2 text-2xl font-bold">
                      $29<span className="text-sm font-normal">/month</span>
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      For growing businesses
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="support" className="space-y-4">
                <h3 className="text-lg font-semibold">Get Support</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">24/7 Live Chat Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Email Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Community Forums</span>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Pills Variant Demo */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Pills Variant</h3>
          <Tabs defaultValue="dashboard">
            <TabsList variant="pills" size="md">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="dashboard">
                <div className="py-8 text-center">
                  <h4 className="font-medium">Dashboard Overview</h4>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Welcome to your main dashboard
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <div className="py-8 text-center">
                  <h4 className="font-medium">Analytics Report</h4>
                  <p className="text-muted-foreground mt-2 text-sm">
                    View your detailed analytics
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="py-8 text-center">
                  <h4 className="font-medium">Application Settings</h4>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Configure your preferences
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Scrollable Tabs Demo */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-4 text-lg font-semibold">Scrollable Tabs</h3>
          <div className="max-w-md">
            <Tabs defaultValue="item3">
              <TabsList>
                <TabsTrigger value="item1">First Item</TabsTrigger>
                <TabsTrigger value="item2">Second Item</TabsTrigger>
                <TabsTrigger value="item3">Third Item (Active)</TabsTrigger>
                <TabsTrigger value="item4">Fourth Item</TabsTrigger>
                <TabsTrigger value="item5">Fifth Item</TabsTrigger>
                <TabsTrigger value="item6">Sixth Item</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="item3">
                  <div className="py-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      The active tab is automatically centered when the tabs
                      overflow. Try clicking on other tabs to see the smooth
                      scrolling behavior.
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
