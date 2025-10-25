'use client';

import { cn } from '@/lib/utils';
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
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
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
import { Response } from '@/registry/delta-ui/delta/ai-elements/response';
import { useState, useCallback, useRef } from 'react';

type MessageType = {
  key: string;
  from: 'user' | 'assistant';
  content: string;
  reasoning?: {
    content: string;
    isStreaming?: boolean;
  };
  avatar: string;
  name: string;
};

const initialMessages: MessageType[] = [];

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'palm-2', name: 'PaLM 2' },
];

const reasoningTexts = [
  "The user is asking about implementing a complex feature. Let me break this down systematically:\n\n1. First, I need to understand the technical requirements and constraints\n2. Consider the existing architecture and how this fits in\n3. Think about potential edge cases and error handling\n4. Evaluate different implementation approaches\n5. Consider performance implications and scalability\n\nBased on the context, I should provide a comprehensive solution that addresses both the immediate need and long-term maintainability. I'll structure my response to include code examples, best practices, and potential pitfalls to avoid.",
  
  "This is an interesting technical question that requires careful analysis. Let me think through this step by step:\n\n• The user seems to be dealing with a state management issue\n• There are multiple approaches we could take here\n• I need to consider the trade-offs between different solutions\n• Performance and user experience are key factors\n• Code maintainability is also important\n\nI should recommend the most appropriate solution based on their specific use case, while also explaining why other approaches might not be optimal. I'll provide practical examples and explain the reasoning behind my recommendations.",

  "This question touches on several important concepts in modern web development. Let me organize my thoughts:\n\n**Key considerations:**\n- Browser compatibility and progressive enhancement\n- Accessibility requirements and WCAG guidelines\n- Performance optimization strategies\n- Security implications and best practices\n- Testing approaches for robustness\n\nI need to provide a balanced answer that considers both the technical implementation details and the broader implications for user experience. I'll include specific code examples and explain the rationale behind each recommendation.",

  "The user is asking about a common development challenge. Let me approach this methodically:\n\n1. **Problem Analysis**: Understanding the root cause and requirements\n2. **Solution Design**: Evaluating different architectural patterns\n3. **Implementation Strategy**: Breaking down the work into manageable steps\n4. **Risk Assessment**: Identifying potential issues and mitigation strategies\n5. **Testing Plan**: Ensuring reliability and edge case coverage\n\nI should provide a comprehensive response that not only solves their immediate problem but also helps them understand the underlying principles so they can apply this knowledge to similar challenges in the future.",

  "This is a nuanced question that requires me to consider multiple factors:\n\n• **Technical feasibility**: What's possible with current technologies\n• **Performance implications**: How will this affect application speed and responsiveness\n• **User experience**: How will users interact with this feature\n• **Maintenance overhead**: Long-term code sustainability\n• **Team considerations**: Skill level and development workflow\n\nI need to balance these competing concerns and provide a recommendation that's both technically sound and practically implementable. I'll explain my reasoning process so the user understands not just what to do, but why it's the best approach for their situation.",
];

const responses = [
  "Based on my analysis, here's the approach I'd recommend:\n\n```typescript\n// Example implementation\nconst useFeature = () => {\n  const [state, setState] = useState(initialState);\n  \n  const handleUpdate = useCallback((data) => {\n    // Validate input\n    if (!data || typeof data !== 'object') {\n      throw new Error('Invalid data provided');\n    }\n    \n    // Update state with proper error handling\n    setState(prev => ({ ...prev, ...data }));\n  }, []);\n  \n  return { state, handleUpdate };\n};\n```\n\n**Key considerations:**\n- Type safety with TypeScript for better developer experience\n- Proper error handling to prevent crashes\n- Performance optimization with useCallback\n- Immutable state updates for predictable behavior\n\nThis pattern scales well and provides a solid foundation for future enhancements.",

  "Here's a comprehensive solution that addresses your requirements:\n\n## Implementation Strategy\n\n1. **Component Architecture**\n   ```jsx\n   // Main component structure\n   const MyComponent = ({ data, onUpdate }) => {\n     return (\n       <div className=\"container\">\n         <Header data={data} />\n         <Content onUpdate={onUpdate} />\n         <Footer />\n       </div>\n     );\n   };\n   ```\n\n2. **State Management**\n   - Use React Context for global state\n   - Local state for component-specific data\n   - Custom hooks for reusable logic\n\n3. **Performance Optimizations**\n   - Implement proper memoization\n   - Use lazy loading for heavy components\n   - Optimize bundle size with code splitting\n\nThis approach provides excellent maintainability while keeping performance optimal.",

  "After analyzing the requirements, here's my recommended solution:\n\n## Technical Implementation\n\n```javascript\n// Core functionality\nclass DataProcessor {\n  constructor(options = {}) {\n    this.options = { timeout: 5000, ...options };\n    this.cache = new Map();\n  }\n  \n  async process(input) {\n    const cacheKey = this.generateKey(input);\n    \n    if (this.cache.has(cacheKey)) {\n      return this.cache.get(cacheKey);\n    }\n    \n    const result = await this.performProcessing(input);\n    this.cache.set(cacheKey, result);\n    \n    return result;\n  }\n}\n```\n\n## Best Practices Applied\n\n- **Caching**: Improves performance for repeated operations\n- **Error Handling**: Robust error management throughout\n- **Modularity**: Clean separation of concerns\n- **Testing**: Easy to unit test each component\n\nThis solution handles edge cases gracefully and provides excellent performance characteristics.",

  "Here's a complete implementation that follows modern best practices:\n\n## Solution Overview\n\n```typescript\ninterface Config {\n  apiUrl: string;\n  timeout: number;\n  retryAttempts: number;\n}\n\nclass ApiClient {\n  private config: Config;\n  \n  constructor(config: Config) {\n    this.config = config;\n  }\n  \n  async makeRequest<T>(endpoint: string, options?: RequestOptions): Promise<T> {\n    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {\n      try {\n        const response = await fetch(`${this.config.apiUrl}${endpoint}`, {\n          ...options,\n          signal: AbortSignal.timeout(this.config.timeout)\n        });\n        \n        if (!response.ok) {\n          throw new Error(`HTTP ${response.status}: ${response.statusText}`);\n        }\n        \n        return await response.json();\n      } catch (error) {\n        if (attempt === this.config.retryAttempts) {\n          throw error;\n        }\n        await this.delay(1000 * attempt); // Exponential backoff\n      }\n    }\n  }\n}\n```\n\n## Key Features\n\n- **Type Safety**: Full TypeScript support\n- **Error Handling**: Comprehensive error management\n- **Retry Logic**: Automatic retry with exponential backoff\n- **Timeout Handling**: Prevents hanging requests\n- **Extensibility**: Easy to extend for additional features\n\nThis implementation is production-ready and handles real-world scenarios effectively.",

  "Based on my analysis, here's a robust solution:\n\n## Architecture Decision\n\nI recommend using a **microservices approach** with the following structure:\n\n```yaml\n# docker-compose.yml\nversion: '3.8'\nservices:\n  api:\n    build: ./api\n    ports:\n      - \"3001:3001\"\n    environment:\n      - NODE_ENV=production\n      - DB_HOST=database\n    depends_on:\n      - database\n      - redis\n  \n  frontend:\n    build: ./frontend\n    ports:\n      - \"3000:3000\"\n    depends_on:\n      - api\n  \n  database:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n  \n  redis:\n    image: redis:7-alpine\n```\n\n## Implementation Benefits\n\n- **Scalability**: Each service can scale independently\n- **Maintainability**: Clear separation of concerns\n- **Reliability**: Fault isolation between services\n- **Development**: Teams can work on services independently\n- **Deployment**: Independent deployment pipelines\n\nThis architecture supports your current needs while providing room for future growth and complexity.",
];

const Example = () => {
  const [model, setModel] = useState<string>(models[0].id);
  const [text, setText] = useState<string>('');
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const shouldCancelRef = useRef<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stop = useCallback(() => {
    shouldCancelRef.current = true;
    setStatus('ready');
  }, []);

  const streamReasoningText = useCallback(
    async (messageKey: string, reasoningContent: string) => {
      const words = reasoningContent.split(' ');
      let currentContent = '';

      for (let i = 0; i < words.length; i++) {
        if (shouldCancelRef.current) {
          return;
        }

        currentContent += (i > 0 ? ' ' : '') + words[i];

        setMessages((prev) =>
          prev.map((msg) =>
            msg.key === messageKey
              ? {
                  ...msg,
                  reasoning: {
                    ...msg.reasoning!,
                    content: currentContent,
                  },
                }
              : msg
          )
        );

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 80 + 40),
        );
      }
    },
    []
  );

  const streamResponseText = useCallback(
    async (messageKey: string, responseContent: string) => {
      const words = responseContent.split(' ');
      let currentContent = '';

      for (let i = 0; i < words.length; i++) {
        if (shouldCancelRef.current) {
          return;
        }

        currentContent += (i > 0 ? ' ' : '') + words[i];

        setMessages((prev) =>
          prev.map((msg) =>
            msg.key === messageKey ? { ...msg, content: currentContent } : msg
          )
        );

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 100 + 50),
        );
      }
    },
    []
  );

  const addUserMessage = useCallback(
    async (content: string) => {
      const userMessage: MessageType = {
        key: `user-${Date.now()}`,
        from: 'user',
        content,
        avatar: 'https://patrickprunty.com/icon.webp',
        name: 'User',
      };

      setMessages((prev) => [...prev, userMessage]);

      // Add assistant message with empty reasoning
      const assistantMessage: MessageType = {
        key: `assistant-${Date.now()}`,
        from: 'assistant',
        content: '',
        reasoning: {
          content: '',
          isStreaming: true,
        },
        avatar: 'https://github.com/openai.png',
        name: 'Assistant',
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStatus('streaming');

      // Stream reasoning text
      const selectedReasoningText = reasoningTexts[Math.floor(Math.random() * reasoningTexts.length)];
      await streamReasoningText(assistantMessage.key, selectedReasoningText);

      if (!shouldCancelRef.current) {
        // Mark reasoning as complete
        setMessages((prev) =>
          prev.map((msg) =>
            msg.key === assistantMessage.key
              ? {
                  ...msg,
                  reasoning: {
                    ...msg.reasoning!,
                    isStreaming: false,
                  },
                }
              : msg
          )
        );

        // Wait a moment then start streaming response
        setTimeout(async () => {
          if (!shouldCancelRef.current) {
            const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
            await streamResponseText(assistantMessage.key, selectedResponse);
            setStatus('ready');
          }
        }, 500);
      }
    },
    [streamReasoningText, streamResponseText]
  );

  const handleSubmit = (message: PromptInputMessage) => {
    if (status === 'streaming') {
      stop();
      return;
    }

    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus('submitted');
    addUserMessage(message.text || 'Sent with attachments');
    setText('');
  };

  return (
    <div className="relative flex size-full flex-col overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message
              from={message.from}
              key={message.key}
              className={cn(
                message.from === 'user' ? 'justify-end items-end' : undefined,
                "group/message"
              )}
            >
              <div>
                {message.reasoning && (
                  <Reasoning 
                    isStreaming={message.reasoning.isStreaming}
                    defaultOpen={true}
                  >
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
                    {message.content && <Response>{message.content}</Response>}
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
                {(attachment: any) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea
                onChange={(event: any) => setText(event.target.value)}
                ref={textareaRef}
                value={text}
                className="leading-[1.65rem] text-base"
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