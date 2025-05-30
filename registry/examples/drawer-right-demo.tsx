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
            position="right"
            className="bg-background flex flex-col rounded-xl fixed inset-y-4 right-4 h-[calc(100vh-32px)] w-3/4 sm:max-w-sm z-50 border shadow-lg hide-vaul-after"
          >
            <DrawerHeader className="border-b border-border p-6">
              <DrawerTitle>Right Side Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer features rounded corners and padding for a more
                card-like appearance, perfect for settings panels and secondary
                content.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Card-like Design</h4>
                  <p className="text-xs text-muted-foreground">
                    This drawer uses rounded corners, padding, and shadow to
                    create a floating card appearance, ideal for settings,
                    preferences, and contextual content that doesn&apos;t
                    require full-screen coverage.
                  </p>
                </div>

                <p className="text-muted-foreground text-sm">
                  Right side drawers with card styling are perfect for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Settings panels</li>
                  <li>• User profiles</li>
                  <li>• Shopping carts</li>
                  <li>• Filters and options</li>
                  <li>• Quick actions</li>
                </ul>

                <div className="mt-6 space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Settings Option 1</h5>
                    <p className="text-xs text-muted-foreground">
                      Configuration setting
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Settings Option 2</h5>
                    <p className="text-xs text-muted-foreground">
                      Another configuration
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium text-sm">Settings Option 3</h5>
                    <p className="text-xs text-muted-foreground">
                      Additional settings
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Implementation</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Uses{" "}
                      <code className="bg-background px-1 rounded">
                        direction="right"
                      </code>{" "}
                      and{" "}
                      <code className="bg-background px-1 rounded">
                        position="right"
                      </code>{" "}
                      for proper Vaul animations.
                    </p>
                    <p>
                      Styled with{" "}
                      <code className="bg-background px-1 rounded">
                        rounded-xl inset-y-4 right-4
                      </code>{" "}
                      for a floating card design with padding and shadow.
                    </p>
                  </div>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter className="border-t border-border p-6">
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
