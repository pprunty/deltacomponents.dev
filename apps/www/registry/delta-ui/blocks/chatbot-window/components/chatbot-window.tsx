"use client"

import { useState } from "react"
import { Globe, MessageSquare, PanelRightOpen, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ChatMessage,
  Conversation,
  ModelSelector,
  PromptInput,
} from "@/registry/delta-ui/delta/ai-elements"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/delta-ui/ui/resizable"

// Mock data for demonstration
const mockModels = [
  {
    id: "gpt-4",
    name: "GPT-4",
    model: "GPT-4o",
  },
  {
    id: "claude",
    name: "Claude",
    model: "Claude 3.5",
  },
]

// Mock streaming response with streamdown content
const mockStreamingResponses = [
  "I'd be happy to help you with that! Let me break this down:\n\n## Key Points\n\n1. **First Point**: This is an important consideration when working with React components.\n\n2. **Second Point**: Here's some `code` example:\n\n```javascript\nconst example = () => {\n  return 'Hello World';\n};\n```\n\n3. **Third Point**: You can also use **bold text** and *italic text* for emphasis.\n\n### Additional Resources\n\n- [React Documentation](https://react.dev)\n- [TypeScript Guide](https://typescriptlang.org)\n\nLet me know if you need any clarification on these concepts!",

  "Great question! Here's a comprehensive answer:\n\n## Understanding the Concept\n\nThis is a fundamental concept in modern development. Let me explain:\n\n### Code Example\n\n```typescript\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nconst createUser = (data: User): Promise<User> => {\n  return fetch('/api/users', {\n    method: 'POST',\n    body: JSON.stringify(data)\n  }).then(res => res.json());\n};\n```\n\n### Best Practices\n\n1. Always validate your inputs\n2. Handle errors gracefully\n3. Use TypeScript for better type safety\n\n> **Note**: Remember to always sanitize user input before processing!\n\nIs there anything specific you'd like me to elaborate on?",

  "Here's a detailed explanation:\n\n## Overview\n\nThis topic involves several important concepts:\n\n### Implementation Steps\n\n1. **Setup**: First, initialize your project\n2. **Configuration**: Configure your settings\n3. **Implementation**: Write the actual code\n\n```bash\nnpm install your-package\nnpm run build\nnpm start\n```\n\n### Common Patterns\n\n- Use **hooks** for state management\n- Implement `error boundaries` for better UX\n- Consider *performance optimization*\n\n| Feature | Benefit | Usage |\n|---------|---------|-------|\n| Hooks | State management | `useState`, `useEffect` |\n| Context | Global state | `createContext` |\n| Suspense | Loading states | `<Suspense>` |\n\nLet me know if you need more specific examples!",
]

// Mock API call that simulates streaming
async function mockStreamingAPI(
  message: string,
  modelId: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return a random mock response
  const randomIndex = Math.floor(Math.random() * mockStreamingResponses.length)
  return mockStreamingResponses[randomIndex]
}

interface ChatbotProps {
  onClose?: () => void
}

function Chatbot({}: ChatbotProps) {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    try {
      // Call mock streaming API
      const response = await mockStreamingAPI(currentInput, selectedModel)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    } catch (error) {
      console.error("Error getting response:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Conversation
        messages={messages}
        isLoading={isLoading}
        className="flex-1"
        userAvatar="https://patrickprunty.com/icon.webp"
      />

      <PromptInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        models={mockModels}
        allowFileUpload={false}
      />
    </div>
  )
}

interface ChatbotWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
}

export function ChatbotWindow({
  className,
  defaultOpen = false,
  ...props
}: ChatbotWindowProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("h-screen w-full", className)} {...props}>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Main content area */}
        <ResizablePanel defaultSize={isOpen ? 70 : 100} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Application</h1>
                {!isOpen && (
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    size="sm"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Open Chat
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center p-8">
              <div className="space-y-4 text-center">
                <h2 className="text-muted-foreground text-xl font-semibold">
                  Welcome to your app
                </h2>
                <p className="text-muted-foreground">
                  {isOpen
                    ? "Chat with the AI assistant on the right"
                    : "Click 'Open Chat' to start a conversation with the AI assistant"}
                </p>
              </div>
            </div>
          </div>
        </ResizablePanel>

        {isOpen && (
          <>
            <ResizableHandle
              className="group bg-border hover:bg-muted-foreground/20 relative transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <X className="text-foreground hover:text-primary h-3 w-3 cursor-pointer transition-colors" />
              </div>
            </ResizableHandle>
            <ResizablePanel defaultSize={30} minSize={25} maxSize={60}>
              <div className="bg-muted h-full border-l">
                <Chatbot onClose={() => setIsOpen(false)} />
              </div>
            </ResizablePanel>
          </>
        )}

        {/* Collapsed sidebar toggle */}
        {!isOpen && (
          <div
            className="border-border relative h-full border-l transition-all duration-200 ease-in-out"
            style={{ width: "40px" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Button
                onClick={() => setIsOpen(true)}
                variant="ghost"
                size="icon"
                className="bg-background hover:bg-muted text-foreground h-8 w-8 border"
                type="button"
                title="Expand Chat Sidebar"
              >
                <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </ResizablePanelGroup>
    </div>
  )
}
