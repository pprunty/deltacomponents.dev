"use client"

import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import {
  ArrowUp,
  Bot,
  ChevronDown,
  FileText,
  Paperclip,
  User,
  X,
} from "lucide-react"
import { motion, useInView, UseInViewOptions } from "motion/react"
import { Streamdown } from "streamdown"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/shadcn/avatar"
import { Button } from "@/registry/shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/shadcn/dropdown-menu"
import { Textarea } from "@/registry/shadcn/textarea"

// Response Component
type ResponseProps = ComponentProps<typeof Streamdown>

export const ChatResponse = memo(
  ({ className, children, ...props }: ResponseProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    >
      {children}
    </Streamdown>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
)

ChatResponse.displayName = "ChatResponse"

// Streaming Response Component
interface StreamingResponseProps {
  content: string
  streamDelay?: number
  className?: string
}

export function ChatStreamingResponse({
  content,
  streamDelay = 20,
  className,
}: StreamingResponseProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isMounted) return

    setDisplayedContent("")
    setIsComplete(false)

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        setDisplayedContent(content.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, streamDelay)

    return () => clearInterval(interval)
  }, [content, streamDelay, isMounted])

  if (!isMounted) {
    return <ChatResponse className={className}>{content}</ChatResponse>
  }

  return (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
    >
      <Streamdown>{displayedContent}</Streamdown>
      {!isComplete && <span className="animate-pulse">▊</span>}
    </div>
  )
}

// Shimmering Text Component for Reasoning
interface ShimmeringTextProps {
  text: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  className?: string
  startOnView?: boolean
  once?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  spread?: number
  color?: string
  shimmerColor?: string
}

export function ChatReasoning({
  text,
  duration = 2,
  delay = 0,
  repeat = true,
  repeatDelay = 0.5,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  spread = 2,
  color,
  shimmerColor,
}: ShimmeringTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const isInView = useInView(ref, { once, margin: inViewMargin })

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const dynamicSpread = useMemo(() => {
    return text.length * spread
  }, [text, spread])

  const shouldAnimate = isMounted && (!startOnView || isInView)

  if (!isMounted) {
    return (
      <span
        ref={ref}
        className={cn("text-muted-foreground relative inline-block", className)}
      >
        {text}
      </span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        "[--base-color:var(--muted-foreground)] [--shimmer-color:var(--foreground)]",
        "[background-repeat:no-repeat,padding-box]",
        "[--shimmer-bg:linear-gradient(90deg,transparent_calc(50%-var(--spread)),var(--shimmer-color),transparent_calc(50%+var(--spread)))]",
        "dark:[--base-color:var(--muted-foreground)] dark:[--shimmer-color:var(--foreground)]",
        className
      )}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          ...(color && { "--base-color": color }),
          ...(shimmerColor && { "--shimmer-color": shimmerColor }),
          backgroundImage: `var(--shimmer-bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
      initial={{
        backgroundPosition: "100% center",
        opacity: 0,
      }}
      animate={
        shouldAnimate
          ? {
              backgroundPosition: "0% center",
              opacity: 1,
            }
          : {}
      }
      transition={{
        backgroundPosition: {
          repeat: repeat ? Infinity : 0,
          duration,
          delay,
          repeatDelay,
          ease: "linear",
        },
        opacity: {
          duration: 0.3,
          delay,
        },
      }}
    >
      {text}
    </motion.span>
  )
}

// Model Interface
interface Model {
  id: string
  name: string
  model: string
}

// Data attributes for targeting components with CSS
// Use these data attributes to style components:
// [data-chat="send-button"] - Send button
// [data-chat="model-selector"] - Model selector dropdown
// [data-chat="options"] - Options container
// [data-chat="prompt-input"] - Prompt input container
// [data-chat="textarea"] - Textarea element

// ChatSendButton Component
interface ChatSendButtonProps {
  isDisabled: boolean
  isLoading: boolean
  className?: string
}

export function ChatSendButton({
  isDisabled,
  isLoading,
  className,
}: ChatSendButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isDisabled}
      size="icon"
      data-chat="send-button"
      className={cn(
        "bg-primary hover:bg-primary/90 h-8 w-8 rounded-full",
        isDisabled && "cursor-not-allowed",
        className
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
}

// ChatModelSelector Component
interface ChatModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
  models: Model[]
  className?: string
}

export function ChatModelSelector({
  selectedModel,
  onModelChange,
  models,
  className,
}: ChatModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:text-accent-foreground dark:hover:bg-accent/50 text-muted-foreground/60 hover:bg-muted flex h-6 shrink-0 items-center justify-center gap-1 rounded-md bg-transparent px-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          data-chat="model-selector"
          data-slot="popover-trigger"
          type="button"
          aria-haspopup="dialog"
        >
          <span>
            {models.find((model) => model.id === selectedModel)?.name ||
              "Select Model"}
          </span>
          <ChevronDown className="text-muted-foreground h-3 w-3 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className="cursor-pointer"
          >
            <div className="flex flex-col items-start">
              <span>{model.name}</span>
              <span className="text-muted-foreground text-xs">
                {model.model}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ChatOptions Component
interface ChatOptionsProps {
  children?: React.ReactNode
  className?: string
}

export function ChatOptions({ children, className }: ChatOptionsProps) {
  if (!children) return null

  return (
    <div className={cn("mb-3", className)} data-chat="options">
      {children}
    </div>
  )
}

// Message Interface
export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
  reasoning?: boolean
}

// User Message Component
interface ChatUserMessageProps {
  message: ChatMessage
  userAvatar?: string
  className?: string
}

export function ChatUserMessage({
  message,
  userAvatar = "https://patrickprunty.com/icon.webp",
  className,
}: ChatUserMessageProps) {
  return (
    <div className={cn("flex flex-row-reverse gap-3", className)}>
      <Avatar className="h-8 w-8 rounded-sm">
        <AvatarImage src={userAvatar} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-primary text-primary-foreground ml-auto max-w-[80%] rounded-lg px-3 py-2">
        <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
      </div>
    </div>
  )
}

// Assistant Message Component
interface ChatAssistantMessageProps {
  message: ChatMessage
  className?: string
}

export function ChatAssistantMessage({
  message,
  className,
}: ChatAssistantMessageProps) {
  return (
    <div className={cn("flex flex-row gap-3", className)}>
      <div className="bg-background w-full rounded-lg border px-3 py-2">
        <div className="[&>code]:bg-muted [&_div[data-streamdown='code-block']]:!bg-muted [&_div[data-streamdown='code-block']>pre]:!bg-muted text-sm [&>*]:my-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>code]:rounded [&>code]:px-1">
          {message?.reasoning && (
            <div className="text-muted-foreground mb-2">
              <ChatReasoning text="Thinking..." className="text-xs" />
            </div>
          )}
          {message?.isStreaming ? (
            <ChatStreamingResponse content={message.content} />
          ) : (
            <ChatResponse>{message?.content || ""}</ChatResponse>
          )}
        </div>
      </div>
    </div>
  )
}

// Messages Container Component
interface ChatMessagesProps {
  messages: ChatMessage[]
  isLoading: boolean
  userAvatar?: string
  className?: string
}

export function ChatMessages({
  messages,
  isLoading,
  userAvatar = "https://patrickprunty.com/icon.webp",
  className,
}: ChatMessagesProps) {
  return (
    <div
      className={cn(
        "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/60 flex-1 space-y-4 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent",
        className
      )}
    >
      {messages.length === 0 && (
        <div className="text-foreground py-8 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Bot className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold">What&apos;s new?</h2>
        </div>
      )}

      {messages.map((message) =>
        message.role === "user" ? (
          <ChatUserMessage
            key={message.id}
            message={message}
            userAvatar={userAvatar}
          />
        ) : (
          <ChatAssistantMessage key={message.id} message={message} />
        )
      )}

      {isLoading && (
        <div className="flex gap-3">
          <div className="bg-background w-full rounded-lg border px-3 py-2">
            <div className="flex items-center gap-1">
              <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full" />
              <div
                className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Prompt Input Component
interface ChatPromptInputProps {
  input: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  selectedModel: string
  onModelChange: (modelId: string) => void
  models: Model[]
  className?: string
  allowFileUpload?: boolean
  onFileUpload?: (file: File) => void
  children?: React.ReactNode
}

export function ChatPromptInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  selectedModel,
  onModelChange,
  models,
  className,
  allowFileUpload = false,
  onFileUpload,
  children,
}: ChatPromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (input.trim() && !isLoading) {
          onSubmit(e as React.FormEvent<HTMLTextAreaElement>)
        }
        return
      }
    },
    [input, isLoading, onSubmit]
  )

  const handleFileSelect = useCallback(
    (file: File) => {
      setAttachedFile(file)

      // Create preview URL for images and PDFs
      if (file.type.startsWith("image/") || file.type === "application/pdf") {
        const url = URL.createObjectURL(file)
        setFilePreviewUrl(url)
      } else {
        setFilePreviewUrl(null)
      }

      onFileUpload?.(file)
    },
    [onFileUpload]
  )

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect]
  )

  const handleRemoveFile = useCallback(() => {
    // Clean up preview URL to prevent memory leaks
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl)
      setFilePreviewUrl(null)
    }

    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [filePreviewUrl])

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (allowFileUpload) {
        setIsDragOver(true)
      }
    },
    [allowFileUpload]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (!allowFileUpload) return

      const files = Array.from(e.dataTransfer.files)
      const file = files[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [allowFileUpload, handleFileSelect]
  )

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl)
      }
    }
  }, [filePreviewUrl])

  return (
    <div className={cn("p-4", className)} data-chat="prompt-input">
      <form onSubmit={onSubmit} className="space-y-3">
        <div
          className={cn(
            "relative",
            isDragOver && "ring-primary rounded-xl ring-2 ring-offset-2"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {attachedFile && (
            <div className="mb-2 w-fit max-w-[200px]">
              <div className="group relative">
                {filePreviewUrl && attachedFile.type.startsWith("image/") ? (
                  // Image preview
                  <div className="relative">
                    <img
                      src={filePreviewUrl}
                      alt={attachedFile.name}
                      className="h-20 w-20 rounded-lg border object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="bg-background hover:bg-muted absolute -top-2 -right-2 h-6 w-6 rounded-full border shadow-sm"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : filePreviewUrl &&
                  attachedFile.type === "application/pdf" ? (
                  // PDF preview
                  <div className="relative">
                    <div className="bg-muted/50 flex h-20 w-20 items-center justify-center rounded-lg border">
                      <FileText className="text-muted-foreground h-8 w-8" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="bg-background hover:bg-muted absolute -top-2 -right-2 h-6 w-6 rounded-full border shadow-sm"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  // Other file types
                  <div className="relative">
                    <div className="bg-muted/50 flex h-20 w-20 items-center justify-center rounded-lg border">
                      <FileText className="text-muted-foreground h-8 w-8" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="bg-background hover:bg-muted absolute -top-2 -right-2 h-6 w-6 rounded-full border shadow-sm"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <p className="text-muted-foreground mt-1 max-w-[80px] truncate text-xs">
                  {attachedFile.name}
                </p>
              </div>
            </div>
          )}

          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              attachedFile
                ? "Describe what you'd like to do with this file..."
                : "How can I help today?"
            }
            className={cn(
              "bg-surface border-input focus:bg-surface min-h-[140px] resize-none rounded-xl",
              allowFileUpload ? "pr-20 pb-10" : "pr-12 pb-10"
            )}
            data-chat="textarea"
            rows={5}
          />

          {allowFileUpload && (
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept="*/*"
            />
          )}

          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-3">
            <ChatModelSelector
              selectedModel={selectedModel}
              onModelChange={onModelChange}
              models={models}
            />
            {children && (
              <div className="flex items-center gap-2">
                {React.Children.map(children, (child) => {
                  // If it's a ChatOptions component, extract its children
                  if (React.isValidElement(child) && child.type === ChatOptions) {
                    return (child.props as any).children
                  }
                  return child
                })}
              </div>
            )}
          </div>

          <div className="absolute right-2 bottom-2 z-10 flex items-center gap-1">
            {allowFileUpload && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:bg-muted h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors" />
              </Button>
            )}
            <ChatSendButton
              isDisabled={!input.trim() || isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
