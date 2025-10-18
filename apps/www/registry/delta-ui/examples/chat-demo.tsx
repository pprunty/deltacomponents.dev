'use client';

import { cn } from '@/lib/utils';
import {
  Branch,
  BranchMessages,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from '@/registry/delta-ui/delta/ai-elements/branch';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/registry/delta-ui/delta/ai-elements/conversation';
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
} from '@/registry/delta-ui/delta/ai-elements/prompt-input';
import {
  Message,
  MessageContent,
} from '@/registry/delta-ui/delta/ai-elements/message';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/registry/delta-ui/delta/ai-elements/reasoning';
import {
  Actions,
  Action,
} from '@/registry/delta-ui/delta/ai-elements/actions';
import { Loader } from '@/registry/delta-ui/delta/ai-elements/loader';
import { Response } from '@/registry/delta-ui/delta/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/registry/delta-ui/delta/ai-elements/sources';
import { GlobeIcon, CopyIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { ToolUIPart } from 'ai';
import { nanoid } from 'nanoid';

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

const Example = () => {
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

  const addUserMessage = useCallback(
    (content: string) => {
      const userMessage: MessageType = {
        key: `user-${Date.now()}`,
        from: 'user',
        versions: [
          {
            id: `user-${Date.now()}`,
            content,
          },
        ],
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

    if (message.files?.length) {
      toast.success('Files attached', {
        description: `${message.files.length} file(s) attached to message`,
      });
    }

    addUserMessage(message.text || 'Sent with attachments');
    setText('');
  };


  return (
    <div className="relative flex size-full flex-col overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          div[style*="height: 100%; width: 100%; overflow: auto"] {
            scrollbar-width: thin;
            scrollbar-color: #b6b6b6 transparent;
          }
          div[style*="height: 100%; width: 100%; overflow: auto"]::-webkit-scrollbar {
            width: 4px;
          }
          div[style*="height: 100%; width: 100%; overflow: auto"]::-webkit-scrollbar-track {
            background: transparent;
          }
          div[style*="height: 100%; width: 100%; overflow: auto"]::-webkit-scrollbar-thumb {
            background: #b6b6b6;
            border-radius: 9999px;
          }
          div[style*="height: 100%; width: 100%; overflow: auto"]::-webkit-scrollbar-thumb:hover {
            background: rgba(182, 182, 182, 0.8);
          }
        `
      }} />
      <Conversation
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--border)) transparent',
        } as React.CSSProperties}
      >
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
                        <div className="leading-[1.65rem] text-base">
                          <Response>{version.content}</Response>
                        </div>
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
                              isLastAssistantMessage ? "opacity-100" : "opacity-0 group-hover/message:opacity-100"
                            )}>
                              <Action
                                tooltip="Copy message"
                                onClick={() => {
                                  navigator.clipboard.writeText(version.content);
                                  toast.success('Copied to clipboard');
                                }}
                              >
                                <CopyIcon className="h-4 w-4" />
                              </Action>
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
  );
};

export default Example;