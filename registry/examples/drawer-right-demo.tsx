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
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/components/drawer"

export default function DrawerRightDemo() {
  return (
    <div className="flex flex-col items-center">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button>Open Right Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent
            className="bg-background flex flex-col rounded-xl fixed inset-y-4 right-4 h-[calc(100vh-32px)] w-3/4 sm:max-w-sm z-50 border p-4 hide-vaul-after"
            initialTransform="calc(100% + 8px)"
          >
            <DrawerHeader>
              <DrawerTitle>Right Side Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides in from the right side of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="overflow-y-auto p-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Right side drawers are perfect for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Navigation menus</li>
                  <li>• Settings panels</li>
                  <li>• User profiles</li>
                  <li>• Shopping carts</li>
                  <li>• Filters and options</li>
                </ul>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Configuration</h4>
                  <p className="text-sm text-muted-foreground">
                    Use{" "}
                    <code className="bg-background px-1 rounded">
                      direction="right"
                    </code>{" "}
                    and
                    <code className="bg-background px-1 rounded ml-1">
                      initialTransform="calc(100% + 8px)"
                    </code>
                    to create a right-sliding drawer.
                  </p>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}
