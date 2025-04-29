"use client"

import { useState } from "react"
import Drawer from "@/delta/components/drawer"
import { Button } from "@/delta/components/button"

export default function DrawerBasicDemo() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="flex items-center justify-center p-4 border rounded-lg">
      <Drawer 
        trigger={<Button variant="outline">Open Drawer</Button>}
        title="Basic Drawer Example"
        description="This is a simple drawer component that can be used for navigation, settings, or other content."
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This drawer component is built with Vaul and styled to match the Shadcn/Tailwind theme system.
          </p>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => setIsOpen(false)}>Close Drawer</Button>
            <Button className="w-full" variant="outline">Another Action</Button>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
