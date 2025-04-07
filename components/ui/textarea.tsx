import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-resize function
    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Get the max height based on size
      const maxHeight = {
        sm: '120px',
        md: '200px',
        lg: '300px',
      }[size];

      // Set the new height, but don't exceed maxHeight
      const newHeight = Math.min(textarea.scrollHeight, parseInt(maxHeight));
      textarea.style.height = `${newHeight}px`;
    }, [size]);

    // Handle input changes
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      props.onInput?.(e);
    };

    // Initial height adjustment
    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    return (
      <textarea
        className={cn(
          'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          // Size-specific styles
          size === 'sm' && 'min-h-[60px]',
          size === 'md' && 'min-h-[80px]',
          size === 'lg' && 'min-h-[100px]',
          className,
        )}
        ref={(node) => {
          // Handle both refs
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          textareaRef.current = node;
        }}
        onInput={handleInput}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
