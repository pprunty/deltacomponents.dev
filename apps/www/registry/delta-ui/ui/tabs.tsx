"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  variant: "default" | "underline"
  size: "sm" | "default" | "lg"
} | null>(null)

function Tabs({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & {
  variant?: "default" | "underline"
  size?: "sm" | "default" | "lg"
}) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        data-size={size}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const parentVariant = React.useContext(TabsContext)?.variant || "default"
  const parentSize = React.useContext(TabsContext)?.size || "default"

  const [activeStyle, setActiveStyle] = React.useState({
    left: "0px",
    width: "0px",
  })
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  // Update active indicator position
  const updateActiveIndicator = React.useCallback(() => {
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
  }, [])

  // Observe active state changes
  React.useEffect(() => {
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
  }, [updateActiveIndicator])

  const sizeClasses = {
    sm: "h-8",
    default: "h-9",
    lg: "h-11",
  }

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex w-fit items-center justify-center",
        parentVariant === "default" &&
          "bg-muted text-muted-foreground rounded-[--radius] p-[3px]",
        parentVariant === "underline" && "border-b",
        sizeClasses[parentSize],
        className
      )}
      {...props}
    >
      {parentVariant === "default" && (
        <div
          className="bg-background absolute z-0 rounded-[calc(var(--radius)-2px)] transition-all duration-300 ease-out"
          style={{
            ...activeStyle,
            height: "calc(100% - 6px)",
            top: "3px",
          }}
        />
      )}
      {parentVariant === "underline" && (
        <div
          className="bg-primary absolute bottom-0 z-0 h-0.5 transition-all duration-300 ease-out"
          style={activeStyle}
        />
      )}
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
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
  const parentVariant = React.useContext(TabsContext)?.variant || "default"
  const parentSize = React.useContext(TabsContext)?.size || "default"

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        parentVariant === "default" &&
          "data-[state=active]:bg-background dark:data-[state=active]:text-foreground text-foreground dark:text-muted-foreground rounded-[calc(var(--radius)-2px)] border border-transparent data-[state=active]:shadow-sm",
        parentVariant === "underline" &&
          "data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent pb-2",
        sizeClasses[parentSize],
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
      className={cn(
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 mt-2 outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
