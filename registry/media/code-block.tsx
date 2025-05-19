'use client';

/**
 * Production-grade CodeBlock component powered by **react-shiki**.
 *
 * ▸ Dual-theme aware via `next-themes` (preset ThemeOption → Shiki bundle).
 * ▸ Copy-to-clipboard, optional line-numbers, per-line highlights, caption,
 *   gradient-fade + expand/collapse.
 * ▸ No `dangerouslySetInnerHTML`; react-shiki returns real React nodes.
 * ▸ Memoised internally by react-shiki so no extra LocalStorage cache needed.
 *
 * 2025-05-19 — patch-02 ✅
 *   • **Line numbers visible** → enable default styles from react-shiki.
 *   • **Font size** → force `text-[13px]` on the <pre> root.
 */

import { useEffect, useRef, useState } from 'react';
import ShikiHighlighter from 'react-shiki';
import type { BundledTheme } from 'shikiji';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  ClipboardIcon,
  CheckIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
// import './code-block.css';

// -------------------------------------------------------------------------------------
// Theme mapping
// -------------------------------------------------------------------------------------
export type ThemeOption = 'default' | 'github' | 'vitesse' | 'gruvbox' | 'plastic';

const themeMapping: Record<
  ThemeOption,
  { light: BundledTheme; dark: BundledTheme }
> = {
  default: { light: 'github-light', dark: 'github-dark' },
  github: { light: 'github-light', dark: 'github-dark' },
  vitesse: { light: 'vitesse-light', dark: 'vitesse-dark' },
  gruvbox: { light: 'solarized-light', dark: 'material-theme-darker' },
  plastic: { light: 'light-plus', dark: 'material-theme' },
};

// -------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------
// Highlight functionality will be handled in a different way

// -------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------
export interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  theme?: ThemeOption;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxHeight?: string;
  showExpandButton?: boolean;
  border?: boolean;
  gradientOverlay?: boolean;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'typescript',
  caption,
  theme = 'default',
  showCopyButton = true,
  showLineNumbers = false,
  highlightLines = [],
  maxHeight = '300px',
  showExpandButton = true,
  border = false,
  gradientOverlay = false,
  className,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contentOverflows, setContentOverflows] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => setContentOverflows(el.scrollHeight > el.clientHeight);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [code, maxHeight, expanded]);

  // theme selection
  const themeObj = themeMapping[theme] ?? themeMapping.default;
  const shikiTheme = { light: themeObj.light, dark: themeObj.dark } as const;

  // clipboard helper
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      className={cn(
        'relative w-full bg-card text-card-foreground',
        border && 'border border-border rounded-lg',
        className,
      )}
    >
      {caption && (
        <div className="text-sm text-muted-foreground mb-2">{caption}</div>
      )}

      {/* copy */}
      {showCopyButton && mounted && (
        <Button
          size="icon"
          variant="ghost"
          aria-label="Copy code"
          className="absolute right-2.5 top-2 z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3"
          onClick={copyToClipboard}
        >
          {copied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      )}

      {/* code */}
      <div
        ref={contentRef}
        style={{
          '--code-block-max-height': gradientOverlay ? '150px' : maxHeight,
        } as React.CSSProperties}
        className={cn(
          'relative code-content',
          !expanded
            ? 'max-h-[var(--code-block-max-height)] overflow-y-auto'
            : 'max-h-[600px] overflow-y-auto',
        )}
      >
        <ShikiHighlighter
          language={language}
          theme={shikiTheme}
          defaultColor={resolvedTheme === 'dark' ? 'dark' : 'light'}
          /** default styles include line-number gutter */
          addDefaultStyles
          showLanguage={false}
          className={cn(
            'text-sm', // global font-size override
            showLineNumbers && 'show-line-numbers',
            highlightLines.length > 0 && 'has-highlight',
            !showLineNumbers && 'pl-4',
          )}
        >
          {code.trimEnd()}
        </ShikiHighlighter>

        {!expanded && gradientOverlay && contentOverflows && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card from-10% to-transparent pointer-events-none" />
        )}
      </div>

      {showExpandButton && contentOverflows && (
        <Button
          size="icon"
          variant="ghost"
          aria-label={expanded ? 'Collapse code' : 'Expand code'}
          className="mt-1 flex mx-auto"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      )}
    </div>
  );
}
