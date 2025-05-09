"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Drawer as VaulDrawer } from "vaul"

import { cn } from "@/lib/utils"

const contentVariants = cva(
  "flex flex-col outline-none",
  {
    variants: {
      position: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    defaultVariants: {
      position: "bottom",
      size: "default",
    },
  }
)

interface DrawerOptions {
  shouldScaleBackground?: boolean
  container?: HTMLElement | null
  direction?: "top" | "bottom" | "left" | "right"
  scrollable?: boolean
  size?: "sm" | "default" | "lg" | "xl" | "full" 
  closeOnClickOutside?: boolean
  hasOverlay?: boolean
  overlayClassName?: string
  initialHeight?: number
  initialTransform?: string
  nested?: boolean
}

const Drawer = ({ 
  shouldScaleBackground = true, 
  container,
  direction = "bottom",
  scrollable = false,
  size = "default",
  closeOnClickOutside = true,
  hasOverlay = true,
  overlayClassName,
  initialHeight,
  initialTransform,
  nested = false,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Root> & DrawerOptions) => {
  const DrawerRoot = nested ? VaulDrawer.NestedRoot : VaulDrawer.Root
  
  return (
    <DrawerRoot
      shouldScaleBackground={shouldScaleBackground}
      container={container}
      direction={direction}
      dismissible={closeOnClickOutside}
      {...props}
    />
  )
}
Drawer.displayName = "Drawer"

export interface DrawerTriggerProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Trigger> {}

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Trigger>,
  DrawerTriggerProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Trigger
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
DrawerTrigger.displayName = "DrawerTrigger"

export interface DrawerPortalProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Portal> {}

const DrawerPortal = ({
  ...props
}: DrawerPortalProps) => <VaulDrawer.Portal {...props} />
DrawerPortal.displayName = "DrawerPortal"

export interface DrawerOverlayProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Overlay> {}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/40", className)}
    {...props}
  />
))
DrawerOverlay.displayName = "DrawerOverlay"

export interface DrawerContentProps extends 
  React.ComponentPropsWithoutRef<typeof VaulDrawer.Content>, 
  VariantProps<typeof contentVariants> {
  scrollable?: boolean;
  initialTransform?: string;
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Content>,
  DrawerContentProps
>(({ className, position, size, scrollable = false, style, initialTransform, children, ...props }, ref) => {
  const combinedStyle = initialTransform 
    ? { ...style, '--initial-transform': initialTransform } as React.CSSProperties
    : style;

  return (
    <VaulDrawer.Content
      ref={ref}
      style={combinedStyle}
      className={cn(
        contentVariants({ position, size }), 
        className
      )}
      {...props}
    >
      <VaulDrawer.Title className="sr-only">Drawer Content</VaulDrawer.Title>
      {children}
    </VaulDrawer.Content>
  )
})
DrawerContent.displayName = "DrawerContent"

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
}

const DrawerBody = React.forwardRef<
  HTMLDivElement,
  DrawerBodyProps
>(({ className, scrollable = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1", 
      scrollable && "overflow-y-auto",
      className
    )}
    {...props}
  />
))
DrawerBody.displayName = "DrawerBody"

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = ({
  className,
  ...props
}: DrawerHeaderProps) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = ({
  className,
  ...props
}: DrawerFooterProps) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

export interface DrawerTitleProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Title> {}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

export interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Description> {}

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export interface DrawerCloseProps extends React.ComponentPropsWithoutRef<typeof VaulDrawer.Close> {}

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Close>,
  DrawerCloseProps
>(({ className, ...props }, ref) => (
  <VaulDrawer.Close
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
DrawerClose.displayName = "DrawerClose"

export interface DrawerHandleProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHandle = React.forwardRef<
  HTMLDivElement,
  DrawerHandleProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted", className)}
    {...props}
  />
))
DrawerHandle.displayName = "DrawerHandle"

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHandle,
}
