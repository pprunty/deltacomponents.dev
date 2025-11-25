"use client"

import { useCallback, useRef, useState } from "react"
import type { ToolUIPart } from "ai"
import { GlobeIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
import { nanoid } from "nanoid"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  Action,
  Actions,
  CopyAction,
} from "@/registry/delta-ui/delta/ai-elements/actions"
import {
  Branch,
  BranchMessages,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "@/registry/delta-ui/delta/ai-elements/branch"
import { ChatContainer } from "@/registry/delta-ui/delta/ai-elements/chat-container"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/delta-ui/delta/ai-elements/conversation"
import { Loader } from "@/registry/delta-ui/delta/ai-elements/loader"
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
  PromptInputButton,
  PromptInputFooter,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/registry/delta-ui/delta/ai-elements/prompt-input"
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/registry/delta-ui/delta/ai-elements/reasoning"
import { Response } from "@/registry/delta-ui/delta/ai-elements/response"
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/registry/delta-ui/delta/ai-elements/sources"

type MessageType = {
  key: string
  from: "user" | "assistant"
  sources?: { href: string; title: string }[]
  versions: {
    id: string
    content: string
  }[]
  reasoning?: {
    content: string
    duration: number
  }
  tools?: {
    name: string
    description: string
    status: ToolUIPart["state"]
    parameters: Record<string, unknown>
    result: string | undefined
    error: string | undefined
  }[]
  avatar: string
  name: string
}

const initialMessages: MessageType[] = [
  {
    key: nanoid(),
    from: "user",
    versions: [
      {
        id: nanoid(),
        content: "Can you explain how to use React hooks effectively?",
      },
    ],
    avatar: "https://patrickprunty.com/icon.webp",
    name: "Hayden Bleasel",
  },
  {
    key: nanoid(),
    from: "assistant",
    sources: [
      {
        href: "https://react.dev/reference/react",
        title: "React Documentation",
      },
      {
        href: "https://react.dev/reference/react-dom",
        title: "React DOM Documentation",
      },
    ],
    tools: [
      {
        name: "mcp",
        description: "Searching React documentation",
        status: "input-available",
        parameters: {
          query: "React hooks best practices",
          source: "react.dev",
        },
        result: `{
  "query": "React hooks best practices",
  "results": [
    {
      "title": "Rules of Hooks",
      "url": "https://react.dev/warnings/invalid-hook-call-warning",
      "snippet": "Hooks must be called at the top level of your React function components or custom hooks. Don't call hooks inside loops, conditions, or nested functions."
    },
    {
      "title": "useState Hook",
      "url": "https://react.dev/reference/react/useState",
      "snippet": "useState is a React Hook that lets you add state to your function components. It returns an array with two values: the current state and a function to update it."
    },
    {
      "title": "useEffect Hook",
      "url": "https://react.dev/reference/react/useEffect",
      "snippet": "useEffect lets you synchronize a component with external systems. It runs after render and can be used to perform side effects like data fetching."
    }
  ]
}`,
        error: undefined,
      },
    ],
    versions: [
      {
        id: nanoid(),
        content: `# React Hooks Best Practices

React hooks are a powerful feature that let you use state and other React features without writing classes. Here are some tips for using them effectively:

## Rules of Hooks

1. **Only call hooks at the top level** of your component or custom hooks
2. **Don't call hooks inside loops, conditions, or nested functions**

## Common Hooks

- **useState**: For local component state
- **useEffect**: For side effects like data fetching
- **useContext**: For consuming context
- **useReducer**: For complex state logic
- **useCallback**: For memoizing functions
- **useMemo**: For memoizing values

## Example of useState and useEffect

\`\`\`jsx
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // This runs after render and when userId changes
    fetchUser(userId).then(userData => {
      setUser(userData);
    });
  }, [userId]);
  
  return user ? <Profile user={user} /> : <Loading />;
}
\`\`\`

Would you like me to explain any specific hook in more detail?`,
      },
    ],
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    key: nanoid(),
    from: "user",
    versions: [
      {
        id: nanoid(),
        content:
          "Yes, could you explain useCallback and useMemo in more detail? When should I use one over the other?",
      },
      {
        id: nanoid(),
        content:
          "I'm particularly interested in understanding the performance implications of useCallback and useMemo. Could you break down when each is most appropriate?",
      },
      {
        id: nanoid(),
        content:
          "Thanks for the overview! Could you dive deeper into the specific use cases where useCallback and useMemo make the biggest difference in React applications?",
      },
    ],
    avatar: "https://patrickprunty.com/icon.webp",
    name: "Hayden Bleasel",
  },
  {
    key: nanoid(),
    from: "assistant",
    reasoning: {
      content: `The user is asking for a detailed explanation of useCallback and useMemo. I should provide a clear and concise explanation of each hook's purpose and how they differ.
      
The useCallback hook is used to memoize functions to prevent unnecessary re-renders of child components that receive functions as props.

The useMemo hook is used to memoize values to avoid expensive recalculations on every render.

Both hooks help with performance optimization, but they serve different purposes.`,
      duration: 10,
    },
    versions: [
      {
        id: nanoid(),
        content: `## useCallback vs useMemo

Both hooks help with performance optimization, but they serve different purposes:

### useCallback

\`useCallback\` memoizes **functions** to prevent unnecessary re-renders of child components that receive functions as props.

\`\`\`jsx
// Without useCallback - a new function is created on every render
const handleClick = () => {
  console.log(count);
};

// With useCallback - the function is only recreated when dependencies change
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
\`\`\`

### useMemo

\`useMemo\` memoizes **values** to avoid expensive recalculations on every render.

\`\`\`jsx
// Without useMemo - expensive calculation runs on every render
const sortedList = expensiveSort(items);

// With useMemo - calculation only runs when items change
const sortedList = useMemo(() => expensiveSort(items), [items]);
\`\`\`

### When to use which?

- Use **useCallback** when:
  - Passing callbacks to optimized child components that rely on reference equality
  - Working with event handlers that you pass to child components

- Use **useMemo** when:
  - You have computationally expensive calculations
  - You want to avoid recreating objects that are used as dependencies for other hooks

### Performance Note

Don't overuse these hooks! They come with their own overhead. Only use them when you have identified a genuine performance issue.`,
      },
    ],
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
]

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "cohere-command", name: "Command" },
  { id: "mistral-7b", name: "Mistral 7B" },
]

const mockResponses = [
  "That's a great question! Let me help you understand this concept better. The key thing to remember is that proper implementation requires careful consideration of the underlying principles and best practices in the field.",
  "I'd be happy to explain this topic in detail. From my understanding, there are several important factors to consider when approaching this problem. Let me break it down step by step for you.",
  "This is an interesting topic that comes up frequently. The solution typically involves understanding the core concepts and applying them in the right context. Here's what I recommend...",
  "Great choice of topic! This is something that many developers encounter. The approach I'd suggest is to start with the fundamentals and then build up to more complex scenarios.",
  "That's definitely worth exploring. From what I can see, the best way to handle this is to consider both the theoretical aspects and practical implementation details.",
]

const Example = () => {
  const [model, setModel] = useState<string>(models[0].id)
  const [text, setText] = useState<string>("")
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false)
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready")
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  )
  const [touchedMessages, setTouchedMessages] = useState<Set<string>>(new Set())
  const shouldCancelRef = useRef<boolean>(false)
  const addMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const stop = useCallback(() => {
    console.log("Stopping generation...")

    // Set cancellation flag
    shouldCancelRef.current = true

    // Clear timeout for adding assistant message
    if (addMessageTimeoutRef.current) {
      clearTimeout(addMessageTimeoutRef.current)
      addMessageTimeoutRef.current = null
    }

    setStatus("ready")
    setStreamingMessageId(null)
  }, [])

  const streamResponse = useCallback(
    async (messageId: string, content: string) => {
      setStatus("streaming")
      setStreamingMessageId(messageId)
      shouldCancelRef.current = false

      const words = content.split(" ")
      let currentContent = ""

      for (let i = 0; i < words.length; i++) {
        // Check if streaming should be cancelled
        if (shouldCancelRef.current) {
          setStatus("ready")
          setStreamingMessageId(null)
          return
        }

        currentContent += (i > 0 ? " " : "") + words[i]

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.versions.some((v) => v.id === messageId)) {
              return {
                ...msg,
                versions: msg.versions.map((v) =>
                  v.id === messageId ? { ...v, content: currentContent } : v
                ),
              }
            }
            return msg
          })
        )

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 100 + 50)
        )
      }

      setStatus("ready")
      setStreamingMessageId(null)
    },
    []
  )

  const handleMessageTouch = useCallback((messageKey: string) => {
    setTouchedMessages((prev) => new Set(prev).add(messageKey))
  }, [])

  const addUserMessage = useCallback(
    (content: string) => {
      const userMessage: MessageType = {
        key: `user-${Date.now()}`,
        from: "user",
        versions: [
          {
            id: `user-${Date.now()}`,
            content,
          },
        ],
        avatar: "https://patrickprunty.com/icon.webp",
        name: "User",
      }

      setMessages((prev) => [...prev, userMessage])

      addMessageTimeoutRef.current = setTimeout(() => {
        const assistantMessageId = `assistant-${Date.now()}`
        const randomResponse =
          mockResponses[Math.floor(Math.random() * mockResponses.length)]

        const assistantMessage: MessageType = {
          key: `assistant-${Date.now()}`,
          from: "assistant",
          versions: [
            {
              id: assistantMessageId,
              content: "",
            },
          ],
          avatar: "https://github.com/openai.png",
          name: "Assistant",
        }

        setMessages((prev) => [...prev, assistantMessage])
        streamResponse(assistantMessageId, randomResponse)
        addMessageTimeoutRef.current = null
      }, 500)
    },
    [streamResponse]
  )

  const handleSubmit = (message: PromptInputMessage) => {
    // If currently streaming or submitted, stop instead of submitting
    if (status === "streaming" || status === "submitted") {
      stop()
      return
    }

    const hasText = Boolean(message.text)
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    setStatus("submitted")

    if (message.files?.length) {
      toast.success("Files attached", {
        description: `${message.files.length} file(s) attached to message`,
      })
    }

    addUserMessage(message.text || "Sent with attachments")
    setText("")
  }

  return (
    <ChatContainer>
      <Conversation>
        <ConversationContent>
          {messages.map(({ versions, ...message }) => {
            const assistantMessages = messages.filter(
              (m) => m.from === "assistant"
            )
            const isLastAssistantMessage =
              message.from === "assistant" &&
              assistantMessages.length > 0 &&
              assistantMessages[assistantMessages.length - 1].key ===
                message.key

            return (
              <Branch defaultBranch={0} key={message.key}>
                <BranchMessages>
                  {versions.map((version) => (
                    <Message
                      from={message.from}
                      key={`${message.key}-${version.id}`}
                      className={cn(
                        message.from === "user"
                          ? "items-end justify-end"
                          : undefined,
                        "group/message"
                      )}
                      onTouchStart={() => handleMessageTouch(message.key)}
                    >
                      <div>
                        {message.sources?.length && (
                          <Sources>
                            <SourcesTrigger count={message.sources.length} />
                            <SourcesContent>
                              {message.sources.map((source) => (
                                <Source
                                  href={source.href}
                                  key={source.href}
                                  title={source.title}
                                />
                              ))}
                            </SourcesContent>
                          </Sources>
                        )}
                        {message.reasoning && (
                          <Reasoning duration={message.reasoning.duration}>
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {message.reasoning.content}
                            </ReasoningContent>
                          </Reasoning>
                        )}
                        <MessageContent
                          className={cn(
                            message.from === "assistant" ? "max-w-full" : "",
                            message.from === "user" && "ml-auto w-fit"
                          )}
                        >
                          <div className="text-base leading-[1.65rem]">
                            <Response>{version.content}</Response>
                          </div>
                        </MessageContent>
                        {message.from === "assistant" && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {status === "streaming" &&
                                streamingMessageId === version.id && (
                                  <Loader
                                    size={16}
                                    className="text-muted-foreground ml-1"
                                  />
                                )}
                            </div>
                            {status !== "streaming" &&
                              streamingMessageId !== version.id && (
                                <Actions
                                  position="right"
                                  className={cn(
                                    isLastAssistantMessage ||
                                      touchedMessages.has(message.key)
                                      ? "opacity-100"
                                      : "opacity-0 group-hover/message:opacity-100"
                                  )}
                                >
                                  <CopyAction
                                    value={version.content}
                                    tooltip="Copy message"
                                  />
                                  <Action
                                    tooltip="Good response"
                                    onClick={() =>
                                      toast.success("Feedback recorded")
                                    }
                                  >
                                    <ThumbsUpIcon className="h-4 w-4" />
                                  </Action>
                                  <Action
                                    tooltip="Poor response"
                                    onClick={() =>
                                      toast.success("Feedback recorded")
                                    }
                                  >
                                    <ThumbsDownIcon className="h-4 w-4" />
                                  </Action>
                                  <Action
                                    tooltip="Regenerate response"
                                    onClick={() =>
                                      toast.info("Regenerating response...")
                                    }
                                    className="text-muted-foreground hover:text-foreground hover:bg-accent relative size-9 h-9 w-auto min-w-0 rounded-md p-1.5 px-2 text-sm font-medium transition-colors duration-200"
                                  >
                                    Retry
                                  </Action>
                                </Actions>
                              )}
                          </div>
                        )}
                      </div>
                    </Message>
                  ))}
                </BranchMessages>
                {versions.length > 1 && (
                  <BranchSelector from={message.from}>
                    <BranchPrevious />
                    <BranchPage />
                    <BranchNext />
                  </BranchSelector>
                )}
              </Branch>
            )
          })}
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
                <PromptInputSpeechButton
                  onTranscriptionChange={setText}
                  textareaRef={textareaRef}
                />
                <PromptInputButton
                  onClick={() => setUseWebSearch(!useWebSearch)}
                  variant={useWebSearch ? "default" : "ghost"}
                >
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
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
