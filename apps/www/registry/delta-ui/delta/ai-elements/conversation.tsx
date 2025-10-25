"use client";

import { Button } from "@/registry/delta-ui/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useCallback } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

export type ConversationProps = ComponentProps<typeof StickToBottom> & {
  messages?: any[];
  isLoading?: boolean;
  userAvatar?: string;
  onScrollStateChange?: (state: { isAtBottom: boolean }) => void;
  style?: React.CSSProperties;
};

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
    className={cn(
      "relative flex-1 overflow-y-auto",
      "[scrollbar-width:thin]",
      "[scrollbar-color:#b6b6b6_transparent]", 
      "[&::-webkit-scrollbar]:w-[2px]",
      "[&::-webkit-scrollbar-track]:bg-transparent",
      "[&::-webkit-scrollbar-thumb]:bg-muted",
      "[&::-webkit-scrollbar-thumb]:rounded-full",
      "[&::-webkit-scrollbar-thumb:hover]:bg-muted/80",
      className
    )}
    style={{
      scrollbarWidth: 'thin',
      scrollbarColor: 'hsl(var(--border)) transparent',
      ...style,
    }}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content className={cn("p-4", className)} {...props} />
);

export type ConversationEmptyStateProps = ComponentProps<"div"> & {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

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
          <h3 className="font-medium text-sm">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      </>
    )}
  </div>
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button> & {
  show?: boolean;
  onScrollToBottom?: () => void;
};

export const ConversationScrollButton = ({
  className,
  show = true,
  onScrollToBottom,
  ...props
}: ConversationScrollButtonProps) => {
  // Try to use context if available, otherwise use props
  const context = (() => {
    try {
      return useStickToBottomContext();
    } catch {
      return null;
    }
  })();

  const isAtBottom = context?.isAtBottom ?? !show;
  const scrollToBottom = context?.scrollToBottom ?? onScrollToBottom;

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom?.();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full bg-background border-border shadow-md hover:shadow-lg hover:bg-accent transition-all duration-200",
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className="size-4" />
      </Button>
    )
  );
};
