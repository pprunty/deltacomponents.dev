"use client"

import { useState } from "react"

import {
  ChatMessage,
  ChatMessages,
  ChatOptions,
  ChatPromptInput,
} from "@/registry/delta-ui/delta/chat"

const tokens = [
  "### Welcome",
  "\n\n",
  "This",
  " is",
  " a",
  " **rich",
  " markdown",
  "**",
  " showcase",
  " with",
  " multiple",
  " features.",
  "\n\n",
  "---",
  "\n\n",
  "## Data Table",
  "\n\n",
  "| Name",
  " | Role",
  " | Status",
  " |",
  "\n",
  "|------|------|--------|",
  "\n",
  "| Alice",
  " | Engineer",
  " | Active",
  " |",
  "\n",
  "| Bob",
  " | Designer",
  " | Active",
  " |",
  "\n",
  "| Carol",
  " | PM",
  " | Active",
  " |",
  "\n\n",
  "## Inspiration",
  "\n\n",
  "> *Simplicity",
  " is",
  " the",
  " ultimate",
  " sophistication.*",
  "\n",
  "> —",
  " Leonardo",
  " da",
  " Vinci",
  "\n\n",
  "## Inline",
  " and",
  " Block",
  " Code",
  "\n\n",
  "Use",
  " `let",
  " total",
  " =",
  " items.length`",
  " to",
  " count",
  " elements.",
  "\n\n",
  "```",
  "python",
  "\n",
  "def",
  " greet(name):",
  "\n",
  "    return",
  ' f"Hello, {name}!"',
  "\n",
  'print(greet("World"))',
  "\n",
  "```",
  "\n\n",
  "## Math",
  "\n\n",
  "Inline",
  " math:",
  " $a^2",
  " +",
  " b^2",
  " =",
  " c^2$",
  ".",
  "\n\n",
  "Displayed",
  " equation:",
  "\n\n",
  "$",
  "\n",
  "\\int_0^1",
  " x^2",
  " dx",
  " =",
  " \\frac{1}{3}",
  "\n",
  "$",
  "\n\n",
]

const models = [
  { id: "gpt-4", name: "GPT-4", model: "GPT-4o" },
  { id: "claude", name: "Claude", model: "Claude 3.5 Sonnet" },
  { id: "gemini", name: "Gemini", model: "Gemini Pro" },
]

export default function ChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>(
    models[0]?.id || "gpt-4"
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return the complete markdown response without streaming
      const fullContent = tokens.join("")
      const response = `> **Note**: This is a demo response showing rich markdown rendering with Streamdown.\n\n${fullContent}`

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        role: "assistant",
        content: response,
        isStreaming: false,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    } catch (error) {
      console.error("Error getting response:", error)
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file)
    
    // Add file message to chat
    const fileMessage: ChatMessage = {
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      role: "user",
      content: `Uploaded: ${file.name}`,
      file: {
        name: file.name,
        type: file.type,
        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        size: file.size,
      },
    }
    
    setMessages((prev) => [...prev, fileMessage])
  }

  return (
    <div className="max-w-xl min-w-xl">
      <div className="bg-background flex h-[600px] w-full flex-col rounded-lg border">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          className="flex-1 w-full"
          userAvatar="https://patrickprunty.com/icon.webp"
        />

        <ChatPromptInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          models={models}
          allowFileUpload={true}
          onFileUpload={(file) => console.log("File uploaded:", file)}
        >
          <ChatOptions>
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
              <span className="text-sm text-muted-foreground">
                Advanced Chat Demo
              </span>
              <span className="text-xs text-primary">With Rich Markdown</span>
            </div>
          </ChatOptions>
        </ChatPromptInput>
      </div>
    </div>
  )
}
