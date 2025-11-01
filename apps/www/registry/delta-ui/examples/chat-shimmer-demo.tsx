"use client"

import { useCallback, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { ChatContainer } from "@/registry/delta-ui/delta/ai-elements/chat-container"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/delta-ui/delta/ai-elements/conversation"
import {
  Message,
  MessageContent,
} from "@/registry/delta-ui/delta/ai-elements/message"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/registry/delta-ui/delta/ai-elements/prompt-input"
import { Response } from "@/registry/delta-ui/delta/ai-elements/response"
import { Shimmer } from "@/registry/delta-ui/delta/ai-elements/shimmer"

type MessageType = {
  key: string
  from: "user" | "assistant"
  content: string
  isShimmering?: boolean
  avatar: string
  name: string
}

const initialMessages: MessageType[] = []

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "claude-2", name: "Claude 2" },
  { id: "palm-2", name: "PaLM 2" },
]

const Example = () => {
  const [model, setModel] = useState<string>(models[0].id)
  const [text, setText] = useState<string>("")
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready")
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const shouldCancelRef = useRef<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const stop = useCallback(() => {
    shouldCancelRef.current = true
    setStatus("ready")
  }, [])

  const addUserMessage = useCallback((content: string) => {
    const userMessage: MessageType = {
      key: `user-${Date.now()}`,
      from: "user",
      content,
      avatar: "https://patrickprunty.com/icon.webp",
      name: "User",
    }

    setMessages((prev) => [...prev, userMessage])

    // Add shimmer message immediately
    const shimmerMessage: MessageType = {
      key: `assistant-${Date.now()}`,
      from: "assistant",
      content: "Processing your request...",
      isShimmering: true,
      avatar: "https://github.com/openai.png",
      name: "Assistant",
    }

    setMessages((prev) => [...prev, shimmerMessage])
    setStatus("streaming")

    // Simulate processing time then replace with actual response
    setTimeout(() => {
      if (!shouldCancelRef.current) {
        const responseMessage: MessageType = {
          key: shimmerMessage.key,
          from: "assistant",
          content: `I received your message: "${content}". This demonstrates the shimmer effect which is useful for showing loading states while AI processes requests.`,
          isShimmering: false,
          avatar: "https://github.com/openai.png",
          name: "Assistant",
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.key === shimmerMessage.key ? responseMessage : msg
          )
        )
        setStatus("ready")
      }
    }, 3000)
  }, [])

  const handleSubmit = (message: PromptInputMessage) => {
    if (status === "streaming") {
      stop()
      return
    }

    const hasText = Boolean(message.text)
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    setStatus("submitted")
    addUserMessage(message.text || "Sent with attachments")
    setText("")
  }

  return (
    <ChatContainer>
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message
              from={message.from}
              key={message.key}
              className={cn(
                message.from === "user" ? "items-end justify-end" : undefined,
                "group/message"
              )}
            >
              <div>
                <MessageContent
                  className={cn(
                    message.from === "assistant" ? "max-w-full" : "",
                    message.from === "user" && "ml-auto w-fit"
                  )}
                >
                  <div className="text-base leading-[1.65rem]">
                    {message.isShimmering ? (
                      <Shimmer duration={2} spread={3}>
                        {message.content}
                      </Shimmer>
                    ) : (
                      <Response>{message.content}</Response>
                    )}
                  </div>
                </MessageContent>
              </div>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="grid shrink-0 gap-4">
        <div className="w-full px-4 pb-4">
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment: any) => (
                  <PromptInputAttachment data={attachment} />
                )}
              </PromptInputAttachments>
              <PromptInputTextarea
                onChange={(event: any) => setText(event.target.value)}
                ref={textareaRef}
                value={text}
                className="text-base leading-[1.65rem]"
                placeholder="Ask anything..."
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>
              <PromptInputTools>
                <PromptInputModelSelect onValueChange={setModel} value={model}>
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    {models.map((model: any) => (
                      <PromptInputModelSelectItem
                        key={model.id || model.name}
                        value={model.id || model.name}
                      >
                        {model.name || model.id}
                      </PromptInputModelSelectItem>
                    ))}
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
                <PromptInputSubmit
                  disabled={(!text.trim() && !status) || status === "streaming"}
                  status={status}
                />
              </PromptInputTools>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </ChatContainer>
  )
}

export default Example
