"use client"

import { ChatbotWindow } from "@/registry/delta-ui/blocks/chatbot-window/components/chatbot-window"

export default function ChatbotWindowPage() {
  return (
    <div className="bg-background h-screen w-full">
      <ChatbotWindow defaultOpen={true} />
    </div>
  )
}
