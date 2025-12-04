"use client"

import * as React from "react"
import { LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"

type TabVariant = "default" | "underline"
type TabSize = "sm" | "small" | "default" | "lg" | "large"

interface TabItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  layoutId: string
  variant: TabVariant
  size: TabSize
  indicatorThickness?: string
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  hoverStyle: { left: string; width: string }
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("useTabs must be used within an Tabs component")
  }
  return context
}

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
  variant?: TabVariant
  size?: TabSize
  /** Override the underline indicator thickness (e.g. "2px", "4px") */
  indicatorThickness?: string
}

function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  variant = "default",
  size = "default",
  indicatorThickness,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = React.useState({
    left: "0px",
    width: "0px",
  })
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const layoutId = React.useId()

  const activeTab = value ?? internalValue
  const setActiveTab = React.useCallback(
    (id: string) => {
      if (value === undefined) {
        setInternalValue(id)
      }
      onValueChange?.(id)
    },
    [value, onValueChange]
  )

  React.useEffect(() => {
    if (hoveredIndex !== null && variant === "underline") {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex, variant])

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        layoutId,
        variant,
        size,
        indicatorThickness,
        hoveredIndex,
        setHoveredIndex,
        tabRefs,
        hoverStyle,
      }}
    >
      <LayoutGroup>
        <div
          data-slot="animated-tabs"
          className={cn("flex flex-col gap-2", className)}
        >
          {children}
        </div>
      </LayoutGroup>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

function TabsList({ children, className }: TabsListProps) {
  const { variant, size, hoveredIndex, hoverStyle } = useTabs()

  const normalizedSize =
    size === "small" ? "sm" : size === "large" ? "lg" : size

  const listHeightClasses = {
    sm: variant === "default" ? "h-8" : "h-8",
    default: variant === "default" ? "h-10" : "h-10",
    lg: variant === "default" ? "h-12" : "h-12",
  }

  const hoverHeightClasses = {
    sm: "h-6",
    default: "h-7",
    lg: "h-9",
  }

  const hoverOffsetMap = {
    sm: "-1px",
    default: "-2px",
    lg: "-3px",
  }

  return (
    <div
      data-slot="animated-tabs-list"
      role="tablist"
      className={cn(
        "text-muted-foreground relative inline-flex items-center",
        listHeightClasses[normalizedSize],
        variant === "default" &&
          "bg-muted w-fit justify-center rounded-[10px] p-1",
        variant === "underline" &&
          "border-border w-full justify-start gap-0 border-b",
        className
      )}
    >
      {variant === "underline" && (
        <div
          className={cn(
            "bg-muted absolute z-0 rounded-sm transition-all duration-300 ease-out",
            hoverHeightClasses[normalizedSize]
          )}
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null ? 1 : 0,
            top: `calc(50% + ${hoverOffsetMap[normalizedSize]})`,
            transform: "translateY(-50%)",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

function TabsTrigger({
  value,
  children,
  className,
  disabled = false,
  icon,
}: TabsTriggerProps) {
  const {
    activeTab,
    setActiveTab,
    layoutId,
    variant,
    size,
    indicatorThickness,
    hoveredIndex,
    setHoveredIndex,
    tabRefs,
  } = useTabs()
  const isActive = activeTab === value
  const indexRef = React.useRef<number>(-1)

  const normalizedSize =
    size === "small" ? "sm" : size === "large" ? "lg" : size

  const defaultSizeClasses = {
    sm: "h-6 px-2 py-1 text-xs",
    default: "h-8 px-2.5 py-1.5 text-sm",
    lg: "h-10 px-3 py-2 text-base",
  }

  const underlineSizeClasses = {
    sm: "h-8 px-2 pb-2 pt-1.5 text-xs",
    default: "h-10 px-3 pb-3 pt-2 text-sm",
    lg: "h-12 px-4 pb-4 pt-2.5 text-base",
  }

  const setTabRef = React.useCallback(
    (el: HTMLButtonElement | null) => {
      if (el) {
        const currentIndex = tabRefs.current.indexOf(el)
        if (currentIndex === -1) {
          indexRef.current = tabRefs.current.length
          tabRefs.current.push(el)
        } else {
          indexRef.current = currentIndex
        }
      }
    },
    [tabRefs]
  )

  const underlineThicknessClasses = {
    sm: "h-[2px]",
    default: "h-[3px]",
    lg: "h-[4px]",
  }

  return (
    <button
      ref={setTabRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      data-state={isActive ? "active" : "inactive"}
      data-slot="animated-tabs-trigger"
      onClick={() => !disabled && setActiveTab(value)}
      onMouseEnter={() =>
        variant === "underline" && setHoveredIndex(indexRef.current)
      }
      onMouseLeave={() => variant === "underline" && setHoveredIndex(null)}
      className={cn(
        "ring-offset-background relative z-10 inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap",
        "transition-all duration-200",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && [
          "rounded-md",
          defaultSizeClasses[normalizedSize],
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80",
        ],
        variant === "underline" && [
          "rounded-md",
          underlineSizeClasses[normalizedSize],
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        ],
        className
      )}
    >
      {isActive && variant === "default" && (
        <motion.div
          layoutId={`${layoutId}-tab-indicator`}
          initial={false}
          className="bg-background absolute inset-0 rounded-md"
          transition={{
            type: "spring",
            duration: 0.4,
            bounce: 0,
          }}
        />
      )}
      {isActive && variant === "underline" && (
        <motion.div
          layoutId={`${layoutId}-tab-indicator`}
          initial={false}
          className={cn(
            "bg-foreground absolute inset-x-0 bottom-0",
            !indicatorThickness && underlineThicknessClasses[normalizedSize]
          )}
          style={
            indicatorThickness ? { height: indicatorThickness } : undefined
          }
          transition={{
            type: "spring",
            duration: 0.4,
            bounce: 0,
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {icon && (
          <span className="shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
  forceMount?: boolean
  animateY?: number
  animationDuration?: number
}

function TabsContent({
  value,
  children,
  className,
  forceMount = false,
  animateY,
  animationDuration = 0.25,
}: TabsContentProps) {
  const { activeTab } = useTabs()
  const isActive = activeTab === value

  if (!forceMount && !isActive) {
    return null
  }

  return (
    <motion.div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      data-slot="animated-tabs-content"
      initial={{ opacity: 0, ...(animateY !== undefined && { y: animateY }) }}
      animate={{
        opacity: isActive ? 1 : 0,
        ...(animateY !== undefined && { y: isActive ? 0 : animateY }),
      }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut",
      }}
      className={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        !isActive && forceMount && "hidden",
        className
      )}
      tabIndex={0}
    >
      {children}
    </motion.div>
  )
}

interface TabsFromArrayProps {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  listClassName?: string
  triggerClassName?: string
  contentClassName?: string
  children?: (tab: TabItem) => React.ReactNode
}

function TabsFromArray({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  children,
}: TabsFromArrayProps) {
  const initialValue = defaultValue ?? tabs[0]?.id

  return (
    <Tabs
      defaultValue={initialValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList className={listClassName}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            icon={tab.icon}
            className={triggerClassName}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children &&
        tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className={contentClassName}>
            {children(tab)}
          </TabsContent>
        ))}
    </Tabs>
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsFromArray,
  type TabItem,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsFromArrayProps,
}
