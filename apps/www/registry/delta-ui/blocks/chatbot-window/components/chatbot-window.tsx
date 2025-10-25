"use client"

import { useState, useCallback, useRef } from "react"
import { GlobeIcon, PanelRightOpen, PanelRightClose, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react"
import { toast } from "sonner"
import type { ToolUIPart, FileUIPart } from "ai"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Branch,
  BranchMessages,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "@/registry/delta-ui/delta/ai-elements/branch"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/registry/delta-ui/delta/ai-elements/conversation"
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
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/registry/delta-ui/delta/ai-elements/prompt-input"
import {
  Message,
  MessageContent,
} from "@/registry/delta-ui/delta/ai-elements/message"
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/registry/delta-ui/delta/ai-elements/reasoning"
import {
  Actions,
  Action,
  CopyAction,
} from "@/registry/delta-ui/delta/ai-elements/actions"
import { Loader } from "@/registry/delta-ui/delta/ai-elements/loader"
import { Response } from "@/registry/delta-ui/delta/ai-elements/response"
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/registry/delta-ui/delta/ai-elements/sources"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/delta-ui/ui/resizable"

type MessageType = {
  key: string;
  from: 'user' | 'assistant';
  sources?: { href: string; title: string }[];
  versions: {
    id: string;
    content: string;
  }[];
  reasoning?: {
    content: string;
    duration: number;
  };
  tools?: {
    name: string;
    description: string;
    status: ToolUIPart['state'];
    parameters: Record<string, unknown>;
    result: string | undefined;
    error: string | undefined;
  }[];
  files?: { name: string; url: string; type: string }[];
  avatar: string;
  name: string;
};

const initialMessages: MessageType[] = [];

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'claude-instant', name: 'Claude Instant' },
  { id: 'palm-2', name: 'PaLM 2' },
  { id: 'llama-2-70b', name: 'Llama 2 70B' },
  { id: 'llama-2-13b', name: 'Llama 2 13B' },
  { id: 'cohere-command', name: 'Command' },
  { id: 'mistral-7b', name: 'Mistral 7B' },
];

const mockResponses = [
  "Hello! I'm an AI assistant built with Delta Components. I can help you with coding questions, explain concepts, or just have a conversation. What would you like to talk about?",
  "That's a great question! Let me help you understand this concept better. The key thing to remember is that proper implementation requires careful consideration of the underlying principles and best practices in the field.",
  "I'd be happy to explain this topic in detail. From my understanding, there are several important factors to consider when approaching this problem. Let me break it down step by step for you.",
  "This is an interesting topic that comes up frequently. The solution typically involves understanding the core concepts and applying them in the right context. Here's what I recommend...",
  "Great choice of topic! This is something that many developers encounter. The approach I'd suggest is to start with the fundamentals and then build up to more complex scenarios.",
];

interface ChatbotProps {
  onClose?: () => void
}

function Chatbot({}: ChatbotProps) {
  const [model, setModel] = useState<string>(models[0].id);
  const [text, setText] = useState<string>('');
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const [touchedMessages, setTouchedMessages] = useState<Set<string>>(new Set());
  const shouldCancelRef = useRef<boolean>(false);
  const addMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stop = useCallback(() => {
    console.log('Stopping generation...');

    // Set cancellation flag
    shouldCancelRef.current = true;

    // Clear timeout for adding assistant message
    if (addMessageTimeoutRef.current) {
      clearTimeout(addMessageTimeoutRef.current);
      addMessageTimeoutRef.current = null;
    }

    setStatus('ready');
    setStreamingMessageId(null);
  }, []);

  const streamResponse = useCallback(
    async (messageId: string, content: string) => {
      setStatus('streaming');
      setStreamingMessageId(messageId);
      shouldCancelRef.current = false;

      const words = content.split(' ');
      let currentContent = '';

      for (let i = 0; i < words.length; i++) {
        // Check if streaming should be cancelled
        if (shouldCancelRef.current) {
          setStatus('ready');
          setStreamingMessageId(null);
          return;
        }

        currentContent += (i > 0 ? ' ' : '') + words[i];

        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.versions.some((v) => v.id === messageId)) {
              return {
                ...msg,
                versions: msg.versions.map((v) =>
                  v.id === messageId ? { ...v, content: currentContent } : v,
                ),
              };
            }
            return msg;
          }),
        );

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 100 + 50),
        );
      }

      setStatus('ready');
      setStreamingMessageId(null);
    },
    [],
  );

  const handleMessageTouch = useCallback((messageKey: string) => {
    setTouchedMessages(prev => new Set(prev).add(messageKey));
  }, []);

  const addUserMessage = useCallback(
    (content: string, files?: { name: string; url: string; type: string }[]) => {
      const userMessage: MessageType = {
        key: `user-${Date.now()}`,
        from: 'user',
        versions: [
          {
            id: `user-${Date.now()}`,
            content,
          },
        ],
        files,
        avatar: 'https://patrickprunty.com/icon.webp',
        name: 'User',
      };

      setMessages((prev) => [...prev, userMessage]);

      addMessageTimeoutRef.current = setTimeout(() => {
        const assistantMessageId = `assistant-${Date.now()}`;
        const randomResponse =
          mockResponses[Math.floor(Math.random() * mockResponses.length)];

        const assistantMessage: MessageType = {
          key: `assistant-${Date.now()}`,
          from: 'assistant',
          versions: [
            {
              id: assistantMessageId,
              content: '',
            },
          ],
          avatar: 'https://github.com/openai.png',
          name: 'Assistant',
        };

        setMessages((prev) => [...prev, assistantMessage]);
        streamResponse(assistantMessageId, randomResponse);
        addMessageTimeoutRef.current = null;
      }, 500);
    },
    [streamResponse],
  );

  const handleSubmit = (message: PromptInputMessage) => {
    // If currently streaming or submitted, stop instead of submitting
    if (status === 'streaming' || status === 'submitted') {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus('submitted');

    let processedFiles: { name: string; url: string; type: string }[] | undefined;
    
    if (message.files?.length) {
      processedFiles = message.files.map(file => ({
        name: 'name' in file ? (file as any).name : 'Unknown file',
        url: 'url' in file ? (file as any).url : '',
        type: 'type' in file ? (file as any).type : 'application/octet-stream'
      }));
      
      toast.success('Files attached', {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    addUserMessage(message.text || '', processedFiles);
    setText('');
  };

  return (
    <div className="flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.map(({ versions, ...message }) => {
            const assistantMessages = messages.filter(m => m.from === 'assistant');
            const isLastAssistantMessage = message.from === 'assistant' && 
              assistantMessages.length > 0 && 
              assistantMessages[assistantMessages.length - 1].key === message.key;

            return (
            <Branch defaultBranch={0} key={message.key}>
              <BranchMessages>
                {versions.map((version) => (
                  <Message
                    from={message.from}
                    key={`${message.key}-${version.id}`}
                    className={cn(
                      message.from === 'user' ? 'justify-end items-end' : undefined,
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
                          message.from === 'assistant' ? 'max-w-full' : '',
                          message.from === 'user' && 'w-fit ml-auto'
                        )}
                      >
                        {message.files?.length && (
                          <div className="mb-3 space-y-2">
                            {message.files.map((file, index) => (
                              <div key={index} className="max-w-sm">
                                {file.type.startsWith('image/') ? (
                                  <div className="relative">
                                    <img
                                      src={file.url}
                                      alt={file.name}
                                      className="rounded-lg max-w-full h-auto"
                                      style={{ maxHeight: '300px' }}
                                    />
                                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                      {file.name}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                    <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                      📄
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm font-medium truncate">{file.name}</div>
                                      <div className="text-xs text-muted-foreground">{file.type}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {version.content && (
                          <div className="leading-[1.65rem] text-base">
                            <Response>{version.content}</Response>
                          </div>
                        )}
                      </MessageContent>
                      {message.from === 'assistant' && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {status === 'streaming' && streamingMessageId === version.id && (
                              <Loader size={16} className="text-muted-foreground ml-1" />
                            )}
                          </div>
                          {status !== 'streaming' && streamingMessageId !== version.id && (
                            <Actions className={cn(
                              "justify-end",
                              isLastAssistantMessage || touchedMessages.has(message.key)
                                ? "opacity-100" 
                                : "opacity-0 group-hover/message:opacity-100"
                            )}>
                              <CopyAction
                                value={version.content}
                                tooltip="Copy message"
                              />
                              <Action
                                tooltip="Good response"
                                onClick={() => toast.success('Feedback recorded')}
                              >
                                <ThumbsUpIcon className="h-4 w-4" />
                              </Action>
                              <Action
                                tooltip="Poor response"
                                onClick={() => toast.success('Feedback recorded')}
                              >
                                <ThumbsDownIcon className="h-4 w-4" />
                              </Action>
                              <Action
                                tooltip="Regenerate response"
                                onClick={() => toast.info('Regenerating response...')}
                                className="relative size-9 p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 text-sm font-medium px-2 min-w-0 h-9 w-auto"
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
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="grid shrink-0 gap-4">
        <div className="w-full px-4 pb-4">
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment: any) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea
                onChange={(event: any) => setText(event.target.value)}
                ref={textareaRef}
                value={text}
                className="leading-[1.65rem] text-base"
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
                  variant={useWebSearch ? 'default' : 'ghost'}
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
                  disabled={(!text.trim() && !status) || status === 'streaming'}
                  status={status}
                />
              </PromptInputTools>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  )
}

interface ChatbotWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  children?: React.ReactNode
}

export function ChatbotWindow({
  className,
  defaultOpen = false,
  children,
  ...props
}: ChatbotWindowProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn("h-screen w-full flex flex-col", className)} {...props}>
      {/* Header */}
      <div className="border-b p-4 shrink-0">
        <div className="flex items-center">
          <Icons.logo className="size-5" />
        </div>
      </div>

      {/* Content area with sidebar */}
      <div className="flex-1 flex min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Main content area */}
          <ResizablePanel defaultSize={isOpen ? 70 : 100} minSize={30}>
            <div className="h-full overflow-auto no-scrollbar">
              <div className="p-8 pt-16 pb-16">
                {children}
              </div>
            </div>
          </ResizablePanel>

          {isOpen && (
            <>
              <ResizableHandle
                className="group bg-border hover:bg-muted-foreground/20 relative transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:text-accent-foreground dark:hover:bg-accent/50 gap-1 rounded-md has-[>svg]:px-1.5 bg-background border-border hover:bg-muted size-8 border p-0 shadow-sm"
                    data-slot="button"
                    type="button"
                    title="Toggle Chat Sidebar"
                    onClick={() => setIsOpen(false)}
                  >
                    <PanelRightClose className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </ResizableHandle>
              <ResizablePanel defaultSize={30} minSize={20} maxSize={80}>
                <aside className="bg-muted h-full min-w-0 overflow-hidden">
                  <Chatbot onClose={() => setIsOpen(false)} />
                </aside>
              </ResizablePanel>
            </>
          )}

          {/* Collapsed sidebar toggle */}
          {!isOpen && (
            <div className="w-10 shrink-0 border-l border-border relative flex items-center justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:text-accent-foreground dark:hover:bg-accent/50 gap-1 rounded-md has-[>svg]:px-1.5 bg-background hover:bg-muted h-8 w-8 p-0"
                data-slot="button"
                type="button"
                title="Expand Chat Sidebar"
              >
                <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
