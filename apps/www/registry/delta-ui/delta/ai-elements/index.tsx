"use client"

// Types
export type Model = {
  id: string
  name: string
  model: string
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

// Components from conversation.tsx
export {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  type ConversationProps,
  type ConversationContentProps,
  type ConversationEmptyStateProps,
  type ConversationScrollButtonProps,
} from "./conversation"

// Components from message.tsx
export {
  Message,
  MessageContent,
  MessageAvatar,
  type MessageProps,
  type MessageContentProps,
  type MessageAvatarProps,
} from "./message"

// Components from prompt-input.tsx
export {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputSubmit,
  PromptInputSpeechButton,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue,
  PromptInputHoverCard,
  PromptInputHoverCardTrigger,
  PromptInputHoverCardContent,
  PromptInputTabsList,
  PromptInputTab,
  PromptInputTabLabel,
  PromptInputTabBody,
  PromptInputTabItem,
  PromptInputCommand,
  PromptInputCommandInput,
  PromptInputCommandList,
  PromptInputCommandEmpty,
  PromptInputCommandGroup,
  PromptInputCommandItem,
  PromptInputCommandSeparator,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputActionAddAttachments,
  usePromptInputController,
  useProviderAttachments,
  usePromptInputAttachments,
  type PromptInputControllerProps,
  type AttachmentsContext,
  type TextInputContext,
  type PromptInputProviderProps,
  type PromptInputMessage,
  type PromptInputProps,
  type PromptInputBodyProps,
  type PromptInputTextareaProps,
  type PromptInputHeaderProps,
  type PromptInputFooterProps,
  type PromptInputToolsProps,
  type PromptInputButtonProps,
  type PromptInputActionMenuProps,
  type PromptInputActionMenuTriggerProps,
  type PromptInputActionMenuContentProps,
  type PromptInputActionMenuItemProps,
  type PromptInputSubmitProps,
  type PromptInputSpeechButtonProps,
  type PromptInputModelSelectProps,
  type PromptInputModelSelectTriggerProps,
  type PromptInputModelSelectContentProps,
  type PromptInputModelSelectItemProps,
  type PromptInputModelSelectValueProps,
  type PromptInputHoverCardProps,
  type PromptInputHoverCardTriggerProps,
  type PromptInputHoverCardContentProps,
  type PromptInputTabsListProps,
  type PromptInputTabProps,
  type PromptInputTabLabelProps,
  type PromptInputTabBodyProps,
  type PromptInputTabItemProps,
  type PromptInputCommandProps,
  type PromptInputCommandInputProps,
  type PromptInputCommandListProps,
  type PromptInputCommandEmptyProps,
  type PromptInputCommandGroupProps,
  type PromptInputCommandItemProps,
  type PromptInputCommandSeparatorProps,
  type PromptInputAttachmentProps,
  type PromptInputAttachmentsProps,
  type PromptInputActionAddAttachmentsProps,
} from "./prompt-input"

// Aliases for simpler imports
export { PromptInputModelSelect as ModelSelector } from "./prompt-input"
export { PromptInputSubmit as SendButton } from "./prompt-input"
export { Message as UserMessage } from "./message"
export { Message as AssistantMessage } from "./message"
export { Message as FileMessage } from "./message"
export { ConversationScrollButton as ScrollToBottomButton } from "./conversation"

// Components from response.tsx
export { Response } from "./response"
