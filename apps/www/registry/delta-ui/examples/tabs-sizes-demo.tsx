"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/delta-ui/delta/tabs"

export default function TabsSizesDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-8">
      {/* Large size */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">Large (lg)</p>
        <Tabs defaultValue="account" variant="default" size="lg">
          <TabsList className="w-fit">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="relative min-h-[60px]">
            <TabsContent value="account" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Large size tabs for prominent navigation.
              </p>
            </TabsContent>
            <TabsContent value="password" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Change your password here.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="absolute inset-x-0 top-0">
              <p className="text-muted-foreground text-sm">
                Configure your settings.
              </p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
