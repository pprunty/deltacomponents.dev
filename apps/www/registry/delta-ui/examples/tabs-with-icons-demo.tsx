"use client"

import { Lock, Settings, User } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsWithIconsDemo() {
  return (
    <Tabs defaultValue="account" variant="default" size="default">
      <TabsList>
        <TabsTrigger value="account">
          <User className="h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="password">
          <Lock className="h-4 w-4" />
          Password
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <div className="relative min-h-[60px]">
        <TabsContent value="account" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Change your password here.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="absolute inset-x-0 top-0">
          <p className="text-muted-foreground text-sm">
            Configure your application settings.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  )
}
