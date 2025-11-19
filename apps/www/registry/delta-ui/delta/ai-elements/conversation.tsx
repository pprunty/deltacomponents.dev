"use client"

import type { ComponentProps } from "react"
import { useCallback } from "react"
import { ArrowDownIcon } from "lucide-react"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/delta-ui/ui/button"

export type ConversationProps = ComponentProps<typeof StickToBottom> & {
  messages?: any[]
  isLoading?: boolean
  userAvatar?: string
  onScrollStateChange?: (state: { isAtBottom: boolean }) => void
  style?: React.CSSProperties
}

export const Conversation = ({
  className,
  messages,
  isLoading,
  userAvatar,
  onScrollStateChange,
  style,
  ...props
}: ConversationProps) => (
  <StickToBottom
    className={cn("relative flex-1 overflow-y-auto", className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  >
    {props.children}
    <div className="from-background via-background/70 to-transparent absolute bottom-0 left-0 right-3 z-10 h-12 bg-gradient-to-t pointer-events-none" />
  </StickToBottom>
)

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content className={cn("p-4", className)} {...props} />
)

export type ConversationEmptyStateProps = ComponentProps<"div"> & {
  title?: string
  description?: string
  icon?: React.ReactNode
}

export const ConversationEmptyState = ({
  className,
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      </>
    )}
  </div>
)

export type ConversationScrollButtonProps = ComponentProps<typeof Button> & {
  show?: boolean
  onScrollToBottom?: () => void
}

export const ConversationScrollButton = ({
  className,
  show = true,
  onScrollToBottom,
  ...props
}: ConversationScrollButtonProps) => {
  // Try to use context if available, otherwise use props
  const context = (() => {
    try {
      return useStickToBottomContext()
    } catch {
      return null
    }
  })()

  const isAtBottom = context?.isAtBottom ?? !show
  const scrollToBottom = context?.scrollToBottom ?? onScrollToBottom

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom?.()
  }, [scrollToBottom])

  return (
    !isAtBottom && (
      <Button
        className={cn(
          "bg-background border-border hover:bg-accent absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full shadow-md transition-all duration-200 hover:shadow-lg z-20",
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="h-4 w-4" />
      </Button>
    )
  )
}
