import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs"

export default function TabsVariantsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Tabs defaultValue="account">
          <TabsList variant="default">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Pills</h3>
        <Tabs defaultValue="account">
          <TabsList variant="pills">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Underlined</h3>
        <Tabs defaultValue="account">
          <TabsList variant="underlined">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
} 