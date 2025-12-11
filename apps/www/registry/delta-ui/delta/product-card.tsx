"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------
 * Context for sharing state between compound components
 * ------------------------------------------------------------------ */

type ProductCardVariant = "default" | "inner"
type ProductCardSize = "default" | "sm" | "small" | "lg" | "large"

interface ProductCardContextValue {
  variant: ProductCardVariant
  size: ProductCardSize
  animated: boolean
}

const ProductCardContext = React.createContext<ProductCardContextValue | null>(
  null
)

function useProductCardContext() {
  const context = React.useContext(ProductCardContext)
  if (!context) {
    throw new Error(
      "ProductCard compound components must be used within <ProductCard>"
    )
  }
  return context
}

function normalizeSize(size: ProductCardSize): "default" | "sm" | "lg" {
  if (size === "small") return "sm"
  if (size === "large") return "lg"
  return size as "default" | "sm" | "lg"
}

/* ------------------------------------------------------------------
 * ProductCard (root)
 * ------------------------------------------------------------------ */

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant - "default" shows content below image, "inner" shows content inside */
  variant?: ProductCardVariant
  /** Card size - "sm" | "small", "default", or "lg" | "large" */
  size?: ProductCardSize
  /** Enable hover/active animation on image - defaults to true */
  animated?: boolean
  /** Callback when the card is clicked */
  onCardClick?: () => void
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      animated = true,
      onCardClick,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <ProductCardContext.Provider value={{ variant, size, animated }}>
        <div
          ref={ref}
          className={cn("cursor-pointer overflow-hidden rounded-lg", className)}
          onClick={onCardClick}
          {...props}
        >
          {children}
        </div>
      </ProductCardContext.Provider>
    )
  }
)
ProductCard.displayName = "ProductCard"

/* ------------------------------------------------------------------
 * ProductCardImage
 * ------------------------------------------------------------------ */

interface ProductCardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src: string
  /** Image alt text for accessibility */
  alt: string
  /** Custom class for the image element itself */
  imageClassName?: string
}

const ProductCardImage = React.forwardRef<
  HTMLDivElement,
  ProductCardImageProps
>(({ className, src, alt, imageClassName, children, ...props }, ref) => {
  const { size, animated } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-lg transition-colors duration-150",
        "bg-muted",
        "[&:hover]:bg-muted/80 [&:active]:bg-muted/80",
        animated &&
          "[&:active>img]:-translate-y-1 [&:hover>img]:-translate-y-1",
        className
      )}
      {...props}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-contain",
          animated && "transition-transform duration-200 ease-in-out",
          normalizedSize === "sm" && "p-4",
          normalizedSize === "default" && "p-8",
          normalizedSize === "lg" && "p-12",
          imageClassName
        )}
      />
      {children}
    </div>
  )
})
ProductCardImage.displayName = "ProductCardImage"

/* ------------------------------------------------------------------
 * ProductCardBadge
 * ------------------------------------------------------------------ */

interface ProductCardBadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the badge is in active/selected state */
  isActive?: boolean
  /** Icon to display before label */
  icon?: React.ReactNode
}

const ProductCardBadge = React.forwardRef<
  HTMLButtonElement,
  ProductCardBadgeProps
>(({ className, isActive = false, icon, children, onClick, ...props }, ref) => {
  const { size } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      className={cn(
        "absolute flex items-center gap-1 rounded font-medium transition-colors",
        normalizedSize === "sm" &&
          "top-1.5 right-1.5 px-1.5 py-0.5 text-[10px]",
        normalizedSize === "default" && "top-2 right-2 px-2 py-1 text-xs",
        normalizedSize === "lg" && "top-3 right-3 px-3 py-1.5 text-sm",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-popover text-popover-foreground hover:bg-accent",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
})
ProductCardBadge.displayName = "ProductCardBadge"

/* ------------------------------------------------------------------
 * ProductCardContent (container for title, subtitle, metric)
 * ------------------------------------------------------------------ */

interface ProductCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ProductCardContent = React.forwardRef<
  HTMLDivElement,
  ProductCardContentProps
>(({ className, children, ...props }, ref) => {
  const { variant, size } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-2",
        variant === "default" && normalizedSize === "sm" && "px-0.5 py-2",
        variant === "default" && normalizedSize === "default" && "px-1 py-3",
        variant === "default" && normalizedSize === "lg" && "px-2 py-4",
        variant === "inner" &&
          normalizedSize === "sm" &&
          "absolute inset-x-0 bottom-0 items-end p-2",
        variant === "inner" &&
          normalizedSize === "default" &&
          "absolute inset-x-0 bottom-0 items-end p-3",
        variant === "inner" &&
          normalizedSize === "lg" &&
          "absolute inset-x-0 bottom-0 items-end p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ProductCardContent.displayName = "ProductCardContent"

/* ------------------------------------------------------------------
 * ProductCardHeader (wrapper for title + subtitle)
 * ------------------------------------------------------------------ */

interface ProductCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProductCardHeader = React.forwardRef<
  HTMLDivElement,
  ProductCardHeaderProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props}>
      {children}
    </div>
  )
})
ProductCardHeader.displayName = "ProductCardHeader"

/* ------------------------------------------------------------------
 * ProductCardTitle
 * ------------------------------------------------------------------ */

interface ProductCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const ProductCardTitle = React.forwardRef<
  HTMLHeadingElement,
  ProductCardTitleProps
>(({ className, children, ...props }, ref) => {
  const { size } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <h3
      ref={ref}
      className={cn(
        "text-foreground truncate font-medium",
        normalizedSize === "sm" && "text-xs",
        normalizedSize === "default" && "text-sm",
        normalizedSize === "lg" && "text-base",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
})
ProductCardTitle.displayName = "ProductCardTitle"

/* ------------------------------------------------------------------
 * ProductCardSubtitle
 * ------------------------------------------------------------------ */

interface ProductCardSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const ProductCardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  ProductCardSubtitleProps
>(({ className, children, ...props }, ref) => {
  const { size } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <p
      ref={ref}
      className={cn(
        "text-muted-foreground",
        normalizedSize === "sm" && "text-[10px]",
        normalizedSize === "default" && "text-sm",
        normalizedSize === "lg" && "text-base",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})
ProductCardSubtitle.displayName = "ProductCardSubtitle"

/* ------------------------------------------------------------------
 * ProductCardMetric
 * ------------------------------------------------------------------ */

interface ProductCardMetricProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ProductCardMetric = React.forwardRef<
  HTMLSpanElement,
  ProductCardMetricProps
>(({ className, children, ...props }, ref) => {
  const { size } = useProductCardContext()
  const normalizedSize = normalizeSize(size)

  return (
    <span
      ref={ref}
      className={cn(
        "text-foreground shrink-0 font-medium",
        normalizedSize === "sm" && "text-xs",
        normalizedSize === "default" && "text-sm",
        normalizedSize === "lg" && "text-base",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})
ProductCardMetric.displayName = "ProductCardMetric"

/* ------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------ */

export {
  ProductCard,
  ProductCardImage,
  ProductCardBadge,
  ProductCardContent,
  ProductCardHeader,
  ProductCardTitle,
  ProductCardSubtitle,
  ProductCardMetric,
  type ProductCardProps,
  type ProductCardImageProps,
  type ProductCardBadgeProps,
  type ProductCardContentProps,
  type ProductCardHeaderProps,
  type ProductCardTitleProps,
  type ProductCardSubtitleProps,
  type ProductCardMetricProps,
  type ProductCardSize,
}
