import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/delta/components/tabs"

export default function TabsSizesDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small (Default)</h3>
        <Tabs defaultValue="account">
          <TabsList size="sm">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Tabs defaultValue="account">
          <TabsList size="md">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Tabs defaultValue="account">
          <TabsList size="lg">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
} 