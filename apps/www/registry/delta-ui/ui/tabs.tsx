"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "default" | "active-animated"
}) {
  const [activeStyle, setActiveStyle] = React.useState({
    left: "0px",
    width: "0px",
  })
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  // Update active indicator position
  const updateActiveIndicator = React.useCallback(() => {
    if (variant === "active-animated") {
      const activeElement = tabRefs.current.find(
        (el) => el?.getAttribute("data-state") === "active"
      )
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [variant])

  // Observe active state changes
  React.useEffect(() => {
    if (variant === "active-animated") {
      const observer = new MutationObserver(() => {
        updateActiveIndicator()
      })

      tabRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref, {
            attributes: true,
            attributeFilter: ["data-state"],
          })
        }
      })

      // Initial position
      updateActiveIndicator()

      return () => observer.disconnect()
    }
  }, [variant, updateActiveIndicator])

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-[--radius] p-[3px]",
        variant === "active-animated" && "relative",
        className
      )}
      {...props}
    >
      {variant === "active-animated" && (
        <div
          className="bg-background absolute z-0 rounded-[calc(var(--radius)-2px)] transition-all duration-300 ease-out"
          style={{
            ...activeStyle,
            height: "calc(100% - 6px)",
            top: "3px",
          }}
        />
      )}
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child) && variant === "active-animated") {
          return React.cloneElement(child as React.ReactElement, {
            ref: (el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el
            },
            className: cn(child.props.className, "relative z-10"),
          })
        }
        return child
      })}
    </TabsPrimitive.List>
  )
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[calc(var(--radius)-2px)] border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
