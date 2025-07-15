"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/delta/drawer"

export default function DrawerScrollableDemo() {
  return (
    <div className="flex flex-col items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Scrollable Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent className="bg-background flex flex-col rounded-t-[10px] mt-24 h-[70vh] fixed bottom-0 left-0 right-0 z-50 border-t">
            <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
            <DrawerHeader className="border-b border-border">
              <DrawerTitle>Scrollable Content</DrawerTitle>
              <DrawerDescription>
                This drawer has a fixed height with scrollable content.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">
                    Scrollable Drawer Features
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect for content that exceeds the viewport height.
                  </p>
                </div>

                {/* Generate content to demonstrate scrolling */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Item {i + 1}</h5>
                    <p className="text-sm text-muted-foreground">
                      This is example content item {i + 1}. The drawer maintains
                      a fixed height while allowing the content inside to
                      scroll. This is useful for long lists, forms, or detailed
                      information that needs to be accessible without taking up
                      the entire screen.
                    </p>
                  </div>
                ))}

                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium mb-2">Implementation Note</h4>
                  <p className="text-sm text-muted-foreground">
                    Use{" "}
                    <code className="bg-background px-1 rounded">h-[70vh]</code>{" "}
                    or similar fixed height classes and{" "}
                    <code className="bg-background px-1 rounded">
                      overflow-y-auto
                    </code>
                    on the DrawerBody to enable scrolling.
                  </p>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter className="border-t border-border p-4">
              <div className="flex gap-2 justify-end">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button>Confirm</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}
