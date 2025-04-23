"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { CaretDown, Plus, Minus } from "@phosphor-icons/react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-2",
      bordered: "space-y-2 border border-border rounded-lg p-2",
      ghost: "space-y-2",
      neobrutalist: "border-4 border-black dark:border-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

type AccordionVariant = "default" | "bordered" | "ghost" | "neobrutalist"
type AccordionSize = "sm" | "md" | "lg"

// Define the common properties
interface AccordionBaseProps {
  variant?: AccordionVariant
  size?: AccordionSize
  defaultOpen?: boolean
  className?: string
}

// Specific props for single type
interface AccordionSingleProps extends AccordionBaseProps, Omit<AccordionPrimitive.AccordionSingleProps, "type"> {
  type?: "single"
}

// Specific props for multiple type
interface AccordionMultipleProps extends AccordionBaseProps, Omit<AccordionPrimitive.AccordionMultipleProps, "type"> {
  type: "multiple"
}

// Union type
type AccordionProps = AccordionSingleProps | AccordionMultipleProps

const AccordionContext = React.createContext<{ variant?: AccordionVariant }>({})

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  const { className, variant, size, defaultOpen, type, ...rest } = props
  
  if (type === "multiple") {
    const { defaultValue, ...otherProps } = rest as Omit<AccordionMultipleProps, "type">
    return (
      <AccordionContext.Provider value={{ variant }}>
        <AccordionPrimitive.Root
          ref={ref}
          type="multiple"
          className={cn(accordionVariants({ variant, size }), className)}
          defaultValue={defaultValue}
          {...otherProps}
        />
      </AccordionContext.Provider>
    )
  } else {
    const { defaultValue, ...otherProps } = rest as Omit<AccordionSingleProps, "type">
    // If defaultOpen is true and no defaultValue is provided, use "item-1" as default
    const computedDefaultValue = defaultOpen && !defaultValue ? "item-1" : defaultValue

    return (
      <AccordionContext.Provider value={{ variant }}>
        <AccordionPrimitive.Root
          ref={ref}
          type="single"
          className={cn(accordionVariants({ variant, size }), className)}
          defaultValue={computedDefaultValue}
          collapsible={true}
          {...otherProps}
        />
      </AccordionContext.Provider>
    )
  }
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "last:border-0",
        variant === "neobrutalist" ? "border-b-4 border-black dark:border-white" : "border-b border-border",
        className,
      )}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    chevronPosition?: "left" | "right"
    chevronVariant?: "down" | "right"
    iconVariant?: "chevron" | "plus-minus"
  }
>(
  (
    { className, children, chevronPosition = "right", chevronVariant = "down", iconVariant = "chevron", ...props },
    ref,
  ) => {
    const { variant } = React.useContext(AccordionContext)
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline group",
            chevronPosition === "left" && "flex-row-reverse",
            variant === "neobrutalist" && "px-4",
            className,
          )}
          {...props}
        >
          {chevronPosition === "left" &&
            (iconVariant === "chevron" ? (
              <CaretDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  chevronVariant === "right" && "rotate-90",
                )}
                weight="bold"
              />
            ) : (
              <div className="relative h-4 w-4">
                <Plus
                  className="absolute h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden"
                  weight="bold"
                />
                <Minus
                  className="absolute h-4 w-4 shrink-0 transition-transform duration-200 hidden group-data-[state=open]:block"
                  weight="bold"
                />
              </div>
            ))}
          {children}
          {chevronPosition === "right" &&
            (iconVariant === "chevron" ? (
              <CaretDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  chevronVariant === "right" && "rotate-90",
                )}
                weight="bold"
              />
            ) : (
              <div className="relative h-4 w-4">
                <Plus
                  className="absolute h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:hidden"
                  weight="bold"
                />
                <Minus
                  className="absolute h-4 w-4 shrink-0 transition-transform duration-200 hidden group-data-[state=open]:block"
                  weight="bold"
                />
              </div>
            ))}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  },
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        variant === "neobrutalist" && "px-4",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
