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
    <div className="flex w-full max-w-lg flex-col gap-8">
      {/* Default variant with icons */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">
          Default variant with icons
        </p>
        <Tabs defaultValue="account" variant="default">
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
      </div>

      {/* Underline variant with icons */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">
          Underline variant with icons (large size)
        </p>
        <Tabs defaultValue="account" variant="underline" size="lg">
          <TabsList className="w-fit">
            <TabsTrigger value="account">
              <User className="h-5 w-5" />
              Account
            </TabsTrigger>
            <TabsTrigger value="password">
              <Lock className="h-5 w-5" />
              Password
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-5 w-5" />
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
      </div>
    </div>
  )
}
