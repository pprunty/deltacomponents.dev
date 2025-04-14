"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const backButtonVariants = cva(
  "inline-flex p-2 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover border-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover border-secondary",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive",
      },
      size: {
        sm: "h-8 rounded-md",
        md: "h-10 rounded-md",
        lg: "h-12 rounded-md",
        icon: "h-9 w-9 rounded-md",
      },
      hasText: {
        true: "px-3 gap-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "icon",
      hasText: false,
    },
    compoundVariants: [
      {
        hasText: true,
        size: "sm",
        class: "px-3",
      },
      {
        hasText: true,
        size: "md",
        class: "px-4",
      },
      {
        hasText: true,
        size: "lg",
        class: "px-5",
      },
    ],
  },
)

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof backButtonVariants>, "hasText"> {
  fallbackRoute?: string
  iconProps?: React.ComponentProps<typeof ArrowLeft>
  pulse?: boolean
  text?: string
}

const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, variant, size, fallbackRoute = "/", iconProps, pulse = false, text, ...props }, ref) => {
    const router = useRouter()
    const [isPulsing, setIsPulsing] = React.useState(false)
    // Calculate hasText internally, don't expose it as a prop
    const hasText = Boolean(text)

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (pulse) {
        setIsPulsing(true)
        setTimeout(() => setIsPulsing(false), 200) // Match animation duration
      }

      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back()
      } else {
        router.push(fallbackRoute)
      }

      props.onClick?.(e)
    }

    return (
      <button
        className={cn(backButtonVariants({ variant, size, hasText, className }))}
        ref={ref}
        onClick={handleBack}
        aria-label={text || "Back"}
        {...props}
      >
        <span className={cn("icon-container", isPulsing && "icon-pulse")}>
          <ArrowLeft size="1.2em" weight="regular" {...iconProps} />
        </span>
        {text && <span>{text}</span>}
      </button>
    )
  },
)

BackButton.displayName = "BackButton"

export { BackButton, backButtonVariants }
