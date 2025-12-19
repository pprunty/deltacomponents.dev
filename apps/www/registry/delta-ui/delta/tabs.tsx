"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type TabVariant = "default" | "underline" | "ghost"
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
  variant: TabVariant
  size: TabSize
  indicatorThickness?: string
  indicatorClassName?: string
  concentric?: boolean
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  activeIndex: number
  setActiveIndex: (index: number) => void
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
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
  /** Override the active indicator className (e.g. "bg-muted") */
  indicatorClassName?: string
  /** Use concentric border radius (outer = inner + padding) for default variant */
  concentric?: boolean
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
  indicatorClassName,
  concentric = false,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

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

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        variant,
        size,
        indicatorThickness,
        indicatorClassName,
        concentric,
        hoveredIndex,
        setHoveredIndex,
        activeIndex,
        setActiveIndex,
        tabRefs,
      }}
    >
      <div
        data-slot="animated-tabs"
        className={cn("flex flex-col gap-2", className)}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

function TabsList({ children, className }: TabsListProps) {
  const {
    variant,
    size,
    hoveredIndex,
    activeIndex,
    tabRefs,
    concentric,
    indicatorThickness,
    indicatorClassName,
  } = useTabs()
  const [hoverStyle, setHoverStyle] = React.useState({
    left: "0px",
    width: "0px",
  })
  const [activeStyle, setActiveStyle] = React.useState({
    left: "0px",
    width: "0px",
  })
  const [isInitialized, setIsInitialized] = React.useState(false)

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

  const underlineThicknessClasses = {
    sm: "h-[2px]",
    default: "h-[3px]",
    lg: "h-[4px]",
  }

  const defaultIndicatorHeightClasses = {
    sm: "h-6",
    default: "h-8",
    lg: "h-10",
  }

  const concentricRadii = {
    sm: { outer: "8px", inner: "4px" },
    default: { outer: "10px", inner: "6px" },
    lg: { outer: "12px", inner: "8px" },
  }

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
  }, [hoveredIndex, variant, tabRefs])

  const updateActiveIndicator = React.useCallback(() => {
    if (activeIndex >= 0) {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [activeIndex, tabRefs])

  React.useEffect(() => {
    updateActiveIndicator()
  }, [activeIndex, updateActiveIndicator])

  React.useEffect(() => {
    requestAnimationFrame(() => {
      updateActiveIndicator()
      requestAnimationFrame(() => {
        setIsInitialized(true)
      })
    })
  }, [updateActiveIndicator])

  return (
    <div
      data-slot="animated-tabs-list"
      role="tablist"
      className={cn(
        "text-muted-foreground relative inline-flex items-center",
        listHeightClasses[normalizedSize],
        variant === "default" && [
          "bg-muted w-fit justify-center p-1",
          !concentric && "rounded-lg",
        ],
        variant === "ghost" && "w-fit justify-center gap-1 bg-transparent p-0",
        variant === "underline" &&
          "border-border w-full justify-start gap-0 border-b",
        className
      )}
      style={
        variant === "default" && concentric
          ? { borderRadius: concentricRadii[normalizedSize].outer }
          : undefined
      }
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

      {(variant === "default" || variant === "ghost") && (
        <div
          className={cn(
            "absolute z-0",
            indicatorClassName ||
              (variant === "ghost" ? "bg-muted" : "bg-background"),
            defaultIndicatorHeightClasses[normalizedSize],
            !concentric && "rounded-md",
            isInitialized && "transition-all duration-300 ease-out",
            variant === "default" && "shadow-sm"
          )}
          style={{
            ...activeStyle,
            borderRadius: concentric
              ? concentricRadii[normalizedSize].inner
              : undefined,
          }}
          aria-hidden="true"
        />
      )}

      {variant === "underline" && (
        <div
          className={cn(
            "bg-foreground absolute bottom-0 z-10",
            !indicatorThickness && underlineThicknessClasses[normalizedSize],
            isInitialized && "transition-all duration-300 ease-out"
          )}
          style={{
            ...activeStyle,
            height: indicatorThickness || undefined,
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

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className, disabled = false, icon }, forwardedRef) => {
    const {
      activeTab,
      setActiveTab,
      variant,
      size,
      concentric,
      setHoveredIndex,
      setActiveIndex,
      tabRefs,
    } = useTabs()
    const isActive = activeTab === value
    const indexRef = React.useRef<number>(-1)

    const normalizedSize =
      size === "small" ? "sm" : size === "large" ? "lg" : size

    const defaultSizeClasses = {
      sm: "h-7 px-2.5 py-1 text-sm",
      default: "h-8 px-2.5 py-1.5 text-sm",
      lg: "h-10 px-3 py-2 text-base",
    }

    const underlineSizeClasses = {
      sm: "h-9 px-2.5 pb-2.5 pt-2 text-sm",
      default: "h-10 px-3 pb-3 pt-2 text-sm",
      lg: "h-12 px-4 pb-4 pt-2.5 text-base",
    }

    const concentricInnerRadii = {
      sm: "4px",
      default: "6px",
      lg: "8px",
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

        if (typeof forwardedRef === "function") {
          forwardedRef(el)
        } else if (forwardedRef) {
          forwardedRef.current = el
        }
      },
      [tabRefs, forwardedRef]
    )

    React.useEffect(() => {
      if (isActive && indexRef.current >= 0) {
        setActiveIndex(indexRef.current)
      }
    }, [isActive, setActiveIndex])

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
        data-value={value}
        onClick={() => {
          if (!disabled) {
            setActiveTab(value)
            setActiveIndex(indexRef.current)
          }
        }}
        onMouseEnter={() =>
          variant === "underline" && setHoveredIndex(indexRef.current)
        }
        onMouseLeave={() => variant === "underline" && setHoveredIndex(null)}
        className={cn(
          "ring-offset-background relative z-10 inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap",
          "transition-colors duration-200",
          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          (variant === "default" || variant === "ghost") && [
            !concentric && "rounded-md",
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
        style={
          (variant === "default" || variant === "ghost") && concentric
            ? { borderRadius: concentricInnerRadii[normalizedSize] }
            : undefined
        }
      >
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
)

TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
  forceMount?: boolean
  /** Enable default opacity animation with ease in/out (default: false) */
  animate?: boolean
  /** Set Y translation offset in pixels for entrance animation (default: no animation) */
  animateY?: number
  /** Set opacity animation - overrides animate when explicitly set (default: false) */
  animateOpacity?: boolean
  /** Animation duration in ms (default: 250) */
  animationDuration?: number
  /** Animation easing function (default: "ease-out" for animateY, "ease-in-out" for animate) */
  animationEasing?:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear"
    | string
}

function TabsContent({
  value,
  children,
  className,
  forceMount = false,
  animate = false,
  animateY,
  animateOpacity,
  animationDuration = 250,
  animationEasing,
}: TabsContentProps) {
  const { activeTab } = useTabs()
  const isActive = activeTab === value
  const [shouldRender, setShouldRender] = React.useState(isActive)
  const [hasEntered, setHasEntered] = React.useState(false)

  const shouldAnimateOpacity = animateOpacity ?? animate
  const hasAnimation = animateY !== undefined || shouldAnimateOpacity

  const resolvedEasing =
    animationEasing ??
    (animateY !== undefined ? "cubic-bezier(0.16, 1, 0.3, 1)" : "ease-in-out")

  React.useEffect(() => {
    if (isActive) {
      setShouldRender(true)
      setHasEntered(false)
      if (hasAnimation) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHasEntered(true)
          })
        })
      } else {
        setHasEntered(true)
      }
    } else {
      setHasEntered(false)
      if (!forceMount) {
        if (hasAnimation) {
          const timer = setTimeout(
            () => setShouldRender(false),
            animationDuration
          )
          return () => clearTimeout(timer)
        } else {
          setShouldRender(false)
        }
      }
    }
  }, [isActive, forceMount, animationDuration, hasAnimation])

  if (!forceMount && !shouldRender) {
    return null
  }

  const showContent = isActive && hasEntered

  return (
    <div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      data-slot="animated-tabs-content"
      className={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        !isActive && forceMount && "hidden",
        className
      )}
      style={{
        transition: hasAnimation
          ? `opacity ${animationDuration}ms ${resolvedEasing}, transform ${animationDuration}ms ${resolvedEasing}`
          : undefined,
        opacity: shouldAnimateOpacity ? (showContent ? 1 : 0) : undefined,
        transform:
          animateY !== undefined
            ? `translateY(${showContent ? 0 : animateY}px)`
            : undefined,
      }}
      tabIndex={0}
    >
      {children}
    </div>
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
