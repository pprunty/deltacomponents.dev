"use client"

import * as React from "react"

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
} from "@/registry/components/drawer"

export default function DrawerDemo() {
  return (
    <div className="flex flex-col items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent className="bg-background flex flex-col rounded-t-[10px] fixed inset-x-0 bottom-0 border-t max-h-[40%] z-50">
            <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
            <DrawerHeader>
              <DrawerTitle>Basic Drawer</DrawerTitle>
              <DrawerDescription>
                This is a basic bottom drawer with a handle, title, and content.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="p-4">
              <p className="text-muted-foreground mb-4">
                Basic drawers are perfect for simple interactions or information
                display.
              </p>
              <div className="space-y-2">
                <p className="text-sm">Some example content:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Quick actions</li>
                  <li>• Form inputs</li>
                  <li>• Information display</li>
                </ul>
              </div>
            </DrawerBody>
            <DrawerFooter className="border-t border-border p-4">
              <div className="flex gap-2 justify-end">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button>Save</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}
