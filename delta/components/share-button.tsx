"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Export, Check } from "@phosphor-icons/react"

export interface ShareButtonProps {
  /**
   * Optional custom message for sharing
   */
  message?: string
  /**
   * Optional title override for share dialog
   */
  title?: string
  /**
   * Optional URL to share (defaults to current URL)
   */
  url?: string
  /**
   * Optional tooltip text
   */
  tooltip?: string
  /**
   * Optional additional CSS classes
   */
  className?: string
  /**
   * Optional icon to use instead of default
   * @deprecated Use children instead for custom icons and styling
   */
  icon?: React.ReactNode
  /**
   * Optional variant style
   */
  variant?: "default" | "outline" | "ghost"
  /**
   * Optional size
   */
  size?: "sm" | "md" | "lg"
  /**
   * Optional notification position
   */
  notificationPosition?: "top" | "bottom"
  /**
   * Optional notification duration in ms
   */
  notificationDuration?: number
  /**
   * Use native share API on desktop instead of clipboard popup
   * @default true
   */
  nativeShareOnDesktop?: boolean
  /**
   * Optional children to render inside the button
   */
  children?: React.ReactNode
}

export default function ShareButton({
  message = "Check out this page: ",
  title,
  url,
  tooltip = "Share this page",
  className,
  icon,
  variant = "default",
  size = "md",
  notificationPosition = "top",
  notificationDuration = 2000,
  nativeShareOnDesktop = true,
  children,
}: ShareButtonProps) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [pageUrl, setPageUrl] = useState("")
  const [pageTitle, setPageTitle] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setPageUrl(url || window.location.href)
    setPageTitle(title || document.title)
  }, [url, title])

  const isDesktopDevice = () => window.innerWidth >= 1024

  const handleShare = async () => {
    if (!isMounted) return

    const shareData = {
      title: pageTitle,
      text: message,
      url: pageUrl,
    }

    // Use native share if available and either not desktop or nativeShareOnDesktop is true
    if (navigator.share && (!isDesktopDevice() || nativeShareOnDesktop)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
          // Fallback to clipboard if native share fails
          await copyToClipboard()
        }
      }
    } else {
      // Fallback to copying the URL
      await copyToClipboard()
    }
  }

  // Extract clipboard copy logic to separate function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setIsNotificationVisible(true)
      setTimeout(() => setIsNotificationVisible(false), notificationDuration)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  // Styles based on size
  const sizeStyles = {
    sm: "p-1.5 text-sm",
    md: "p-2 text-base",
    lg: "p-2.5 text-lg",
  }

  // Styles based on variant
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  // Icon size based on button size
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  if (!isMounted) {
    return null // Prevent SSR issues
  }

  return (
    <>
      <button
        onClick={handleShare}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        aria-label={tooltip}
        title={tooltip}
      >
        {isNotificationVisible ? (
          <Check weight="bold" size={iconSize[size]} />
        ) : children ? (
          children
        ) : (
          icon || <Export weight="bold" size={iconSize[size]} />
        )}
      </button>

      {/* Toast notification with improved animations and contrasting colors */}
      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 transform z-50 transition-all duration-300 ease-in-out",
          "w-[300px] sm:w-[700px]",
          "flex items-center justify-center",
          "bg-foreground text-background",
          "px-4 py-3",
          notificationPosition === "top" 
            ? "top-4 animate-in fade-in slide-in-from-top-5" 
            : "bottom-4 animate-in fade-in slide-in-from-bottom-5",
          isNotificationVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95 pointer-events-none"
        )}
        role="alert"
        aria-live="polite"
      >
        <Check weight="bold" className="mr-2 h-4 w-4 text-background" />
        <p className="text-sm font-medium">Link copied to clipboard</p>
      </div>
    </>
  )
}
