'use client';

import * as React from 'react';
import {
  useEditor,
  EditorContent,
  type Editor as EditorType,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ListBullets,
  ListNumbers,
  Link as LinkIcon,
  TextB,
  TextItalic,
} from '@phosphor-icons/react';

export interface TextEditorProps {
  /**
   * The initial content of the editor
   */
  initialContent?: string;
  /**
   * Callback function that is called when the editor content changes
   */
  onChange?: (html: string) => void;
  /**
   * Additional CSS class names to apply to the editor container
   */
  className?: string;
  /**
   * Whether the editor is disabled
   */
  disabled?: boolean;
  /**
   * The placeholder text to display when the editor is empty
   */
  placeholder?: string;
  /**
   * The maximum height of the editor
   */
  maxHeight?: string;
  /**
   * Whether to show the toolbar
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Additional CSS class names to apply to the toolbar
   */
  toolbarClassName?: string;
  /**
   * Additional CSS class names to apply to the editor content
   */
  contentClassName?: string;
  /**
   * Controls which formatting options are available in the toolbar
   * @default { bold: true, italic: true, bulletList: true, orderedList: true, link: true }
   */
  controls?: {
    bold?: boolean;
    italic?: boolean;
    bulletList?: boolean;
    orderedList?: boolean;
    link?: boolean;
  };
}

export function TextEditor({
  initialContent = '',
  onChange,
  className,
  disabled = false,
  placeholder = 'Start typing...',
  maxHeight = 'none',
  showToolbar = true,
  toolbarClassName,
  contentClassName,
  controls = {
    bold: true,
    italic: true,
    bulletList: true,
    orderedList: true,
    link: true,
  },
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-4',
        },
      }),
      ListItem,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline underline-offset-4',
        },
      }),
    ],
    content: initialContent,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none',
        placeholder,
      },
    },
  });

  return (
    <div
      className={cn(
        'rounded-md border bg-background text-foreground',
        className,
      )}
    >
      {showToolbar && (
        <Toolbar
          editor={editor}
          className={toolbarClassName}
          controls={controls}
        />
      )}
      <EditorContent
        editor={editor}
        className={cn(
          'prose prose-sm dark:prose-invert max-w-none p-4',
          'prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5',
          {
            'opacity-50 cursor-not-allowed': disabled,
          },
          contentClassName,
        )}
        style={{ maxHeight }}
      />
    </div>
  );
}

interface ToolbarProps {
  editor: EditorType | null;
  className?: string;
  controls?: TextEditorProps['controls'];
}

function Toolbar({ editor, className, controls }: ToolbarProps) {
  const setLinkRef = React.useRef((url: string = '') => {
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  });

  const unsetLinkRef = React.useRef(() => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run();
  });

  const handleSetLink = React.useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      unsetLinkRef.current();
      return;
    }

    // update link
    setLinkRef.current(url);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 border-b bg-muted/40 px-2 py-1',
        className,
      )}
    >
      {controls?.bold !== false && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn('h-8 w-8', {
            'bg-accent text-accent-foreground': editor.isActive('bold'),
          })}
          aria-label="Bold"
        >
          <TextB className="h-4 w-4" weight="bold" />
        </Button>
      )}
      {controls?.italic !== false && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn('h-8 w-8', {
            'bg-accent text-accent-foreground': editor.isActive('italic'),
          })}
          aria-label="Italic"
        >
          <TextItalic className="h-4 w-4" weight="bold" />
        </Button>
      )}
      {controls?.bulletList !== false && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn('h-8 w-8', {
            'bg-accent text-accent-foreground': editor.isActive('bulletList'),
          })}
          aria-label="Bullet List"
        >
          <ListBullets className="h-4 w-4" weight="bold" />
        </Button>
      )}
      {controls?.orderedList !== false && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn('h-8 w-8', {
            'bg-accent text-accent-foreground': editor.isActive('orderedList'),
          })}
          aria-label="Ordered List"
        >
          <ListNumbers className="h-4 w-4" weight="bold" />
        </Button>
      )}
      {controls?.link !== false && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleSetLink}
          className={cn('h-8 w-8', {
            'bg-accent text-accent-foreground': editor.isActive('link'),
          })}
          aria-label="Link"
        >
          <LinkIcon className="h-4 w-4" weight="bold" />
        </Button>
      )}
    </div>
  );
}
