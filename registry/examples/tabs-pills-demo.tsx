"use client"

import React from "react"
import { Bell, Settings, User } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs"

export default function TabsPillsDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Basic Pills Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pills Variant</h3>
        <Tabs defaultValue="overview">
          <TabsList variant="pills" className="w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-4">
              <h4 className="text-md font-medium">Dashboard Overview</h4>
              <p className="text-muted-foreground">
                Welcome to your dashboard. Here you can view key metrics and
                recent activity.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">2,345</p>
                </div>
                <div className="p-4 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$45,231</p>
                </div>
                <div className="p-4 bg-card border rounded-lg">
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <p className="text-2xl font-bold">+12%</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <h4 className="text-md font-medium">Analytics Dashboard</h4>
              <p className="text-muted-foreground">
                Detailed analytics and insights about your application
                performance.
              </p>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Analytics Chart Placeholder
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <h4 className="text-md font-medium">Reports</h4>
              <p className="text-muted-foreground">
                Generate and view detailed reports for your business.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-card border rounded-lg flex justify-between items-center">
                  <span>Monthly Report - March 2024</span>
                  <span className="text-sm text-muted-foreground">Ready</span>
                </div>
                <div className="p-3 bg-card border rounded-lg flex justify-between items-center">
                  <span>Quarterly Report - Q1 2024</span>
                  <span className="text-sm text-muted-foreground">
                    Processing
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h4 className="text-md font-medium">Settings</h4>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <span>Email Notifications</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <span>Dark Mode</span>
                  <input type="checkbox" />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Pills with Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pills with Icons</h3>
        <Tabs defaultValue="profile">
          <TabsList variant="pills" className="w-fit">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Preferences
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="profile">
              <h4 className="text-md font-medium mb-4">Profile Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Display Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <h4 className="text-md font-medium mb-4">
                Notification Preferences
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Updates</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Alerts</span>
                  <input type="checkbox" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <h4 className="text-md font-medium mb-4">App Preferences</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-md">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Time Zone</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-md">
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC-8 (Pacific)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
