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

export default function DrawerLeftDemo() {
  return (
    <div className="flex flex-col items-center">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button>Open Left Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent
            className="bg-background flex flex-col rounded-xl fixed inset-y-4 left-4 h-[calc(100vh-32px)] w-3/4 sm:max-w-sm z-50 border p-4 hide-vaul-after"
            initialTransform="calc(-100% - 8px)"
          >
            <DrawerHeader>
              <DrawerTitle>Left Side Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer slides in from the left side of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="overflow-y-auto p-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Left side drawers are commonly used for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Main navigation menus</li>
                  <li>• Sidebar content</li>
                  <li>• Category filters</li>
                  <li>• Table of contents</li>
                  <li>• Secondary actions</li>
                </ul>

                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Menu Item 1</h5>
                    <p className="text-xs text-muted-foreground">
                      Example navigation item
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Menu Item 2</h5>
                    <p className="text-xs text-muted-foreground">
                      Another navigation option
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Menu Item 3</h5>
                    <p className="text-xs text-muted-foreground">
                      Additional content
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Configuration</h4>
                  <p className="text-sm text-muted-foreground">
                    Use{" "}
                    <code className="bg-background px-1 rounded">
                      direction="left"
                    </code>{" "}
                    and
                    <code className="bg-background px-1 rounded ml-1">
                      initialTransform="calc(-100% - 8px)"
                    </code>
                    to create a left-sliding drawer.
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
