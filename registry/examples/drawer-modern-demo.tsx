"use client"

import React from "react";
import { Button } from "@/components/ui/button";
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
} from "@/registry/components/drawer";

export default function DrawerModernDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-center text-lg font-medium mb-4">Modern Drawer</h3>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Modern Drawer</Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent className="bg-background flex flex-col rounded-t-[10px] fixed inset-x-0 bottom-0 border-t max-h-[60%] z-50">
            <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
            <DrawerHeader>
              <DrawerTitle>Modern Drawer Example</DrawerTitle>
              <DrawerDescription>
                This is a modern style drawer demonstration with customized appearance.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody className="p-4">
              <p className="text-muted-foreground mb-2">
                The modern drawer style offers a unique look and feel suitable for specific design needs.
                This can be customized further to match any branding requirements.
              </p>
            </DrawerBody>
            <DrawerFooter className="border-t border-border p-4">
              <div className="flex gap-6 justify-end">
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
                <Button>Save</Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
