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
    <div className="flex flex-col items-center gap-8">
      {/* Basic Drawer Example */}
      <div>
        <h3 className="text-center text-lg font-medium mb-4">Basic Drawer</h3>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Basic Drawer</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className="bg-background flex flex-col rounded-t-[10px] fixed inset-x-0 bottom-0 border-t max-h-[40%] z-50">
              <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
              <DrawerHeader>
                <DrawerTitle>Basic Drawer Example</DrawerTitle>
                <DrawerDescription>
                  This is the most basic drawer setup. It shows a simple bottom
                  drawer with a handle, title, and content.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="p-4">
                <p className="text-muted-foreground mb-2">
                  Basic drawers are perfect for simple interactions or
                  information display that don't require complex layouts.
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

      {/* Scrollable Drawer Example */}
      <div>
        <h3 className="text-center text-lg font-medium mb-4">Scrollable Drawer</h3>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Scrollable Drawer</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className="bg-background flex flex-col rounded-t-[10px] mt-24 h-[80%] fixed bottom-0 left-0 right-0 z-50">
              <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
              <DrawerHeader className="border-b border-border">
                <DrawerTitle>Scrollable Content</DrawerTitle>
                <DrawerDescription>
                  This drawer contains scrollable content that extends beyond
                  the visible area.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Generate multiple paragraphs to demonstrate scrolling */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <p key={i} className="text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod, urna eu tincidunt consectetur, nisi nunc
                      pretium nunc, eget tincidunt nisl nunc eget diam. Nulla
                      facilisi. Donec euismod, urna eu tincidunt consectetur,
                      nisi nunc pretium nunc, eget tincidunt nisl nunc eget
                      diam. Nulla facilisi.
                    </p>
                  ))}
                </div>
              </DrawerBody>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>

      {/* Right Side Drawer Example */}
      <div>
        <h3 className="text-center text-lg font-medium mb-4">
          Right Side Drawer
        </h3>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button>Open Right Side Drawer</Button>
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
                  This is a right side drawer that slides in from the edge of
                  the screen.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="overflow-y-auto p-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The drawer uses initialTransform to set the starting
                    position and slides in from the right side of the screen.
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>

      {/* Custom Height Drawer Example */}
      <div>
        <h3 className="text-center text-lg font-medium mb-4">
          Custom Height Drawer
        </h3>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Custom Height Drawer</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent className="bg-background flex flex-col rounded-t-[10px] h-[550px] fixed inset-x-0 bottom-0 z-50 border-t">
              <DrawerHandle className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
              <DrawerHeader>
                <DrawerTitle>Custom Height Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer has a fixed height of exactly 550 pixels,
                  regardless of screen size.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="p-4">
                <p className="text-muted-foreground mb-2">
                  Setting a specific height can be useful when you need
                  consistent spacing or when the content requires a specific
                  amount of vertical space.
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

      {/* Full Height Left Side Drawer Example */}
      <div>
        <h3 className="text-center text-lg font-medium mb-4">
          Full Height Left Side Drawer
        </h3>
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button>Open Full Height Left Drawer</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent
              className="bg-background flex flex-col rounded-xl fixed inset-y-4 left-4 h-[calc(100vh-32px)] w-3/4 sm:max-w-sm z-50 border p-4 hide-vaul-after"
              initialTransform="calc(-100% - 8px)"
            >
              <DrawerHeader>
                <DrawerTitle>Full Height Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer takes up the full height of the screen and slides in from the left.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody className="overflow-y-auto p-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    For a full height drawer, use h-[calc(100vh-32px)] and inset-y-4 classes to ensure it spans the entire height of the viewport. This one slides in from the left and matches the right drawer's style.
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </div>
    </div>
  )
}
