import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import CodeBlock from '@/delta/components/code-block';
import { ComponentTabs } from '@/components/component-tabs';
import { InstallationInstructions } from '@/components/installation-instructions';
import { cn } from "@/lib/utils"
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Heading } from './app/docs/[[...slug]]/heading';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use the custom heading components with anchor links
    h1: ({ children }) => <Heading level={1}>{children}</Heading>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    p: ({ children }) => <p className="my-4 text-muted-foreground">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({ children }) => <li className="mt-1">{children}</li>,
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-primary hover:underline">
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-muted-foreground pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const language = className?.replace(/language-/, '');
      
      if (language) {
        return (
          <CodeBlock
            code={children as string}
            language={language}
            showLineNumbers={true}
            showCopyButton={true}
            showExpandButton={true}
            theme="default"
            maxHeight="400px"
            border={true}
          />
        );
      }
      
      return <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono">{children}</code>;
    },
    pre: ({ children }) => {
      const codeElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === 'code'
      );

      if (!React.isValidElement(codeElement)) {
        return <pre>{children}</pre>;
      }

      return codeElement;
    },
    img: ({ src, alt }) => (
      <Image 
        src={src || ''} 
        alt={alt || ''} 
        width={800} 
        height={400} 
        className="rounded-lg my-4" 
      />
    ),
    // Pass through the shadcn/ui table components
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    // Legacy table components for compatibility
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <Table {...props} className={cn(className)} />
      </div>
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <TableRow
        className={cn(className)}
        {...props}
      />
    ),
    th: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableHead
        className={cn(className)}
        {...props}
      />
    ),
    td: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableCell
        className={cn(className)}
        {...props}
      />
    ),
    thead: ({ className, ...props }) => (
      <TableHeader {...props} className={cn(className)} />
    ),
    tbody: ({ className, ...props }) => (
      <TableBody {...props} className={cn(className)} />
    ),
    // Additional components
    ComponentTabs,
    InstallationInstructions,
    ...components,
  };
} 