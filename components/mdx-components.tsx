"use client"

import * as React from "react"
import { Children } from "react"
import Image from "next/image"
import Link from "next/link"
import { useMDXComponent } from "next-contentlayer2/hooks"

import type { NpmCommands } from "@/types/unist"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Callout } from "@/components/callout"
import { CodeBlockCommand } from "@/components/code-block-command"
import { CodeBlockWrapper } from "@/components/code-block-wrapper"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentSource } from "@/components/component-source"
import { ComponentsShowcase } from "@/components/components-showcase"
import { CopyButton } from "@/components/copy-button"
import { Discover } from "@/components/discover"
import Admonition from "@/registry/components/admonition"
import { CodeSnippet } from "@/registry/media/code-snippet"
import CambioImage from "@/registry/media/cambio-image"

interface MdxProps {
  code: string
}

// Helper function to extract text content from MDX children
function extractTextContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractTextContent(child)).join("")
  }

  if (
    React.isValidElement(children) &&
    children.props &&
    typeof children.props === "object" &&
    children.props !== null &&
    "children" in children.props
  ) {
    return extractTextContent(children.props.children as React.ReactNode)
  }

  return ""
}

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  ComponentSource,
  ComponentPreview,
  ComponentsShowcase,
  Discover,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border" {...props} />
  ),
  CodeSnippet: ({
    title,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & {
    title?: string
  }) => {
    // Extract code content and language from children
    const preElement = Children.toArray(children)[0] as React.ReactElement

    //@ts-expect-error - accessing nested props from MDX parsed children
    const codeElement = preElement?.props?.children as React.ReactElement<{
      className?: string
      children?: string
    }>

    if (!codeElement) return null

    const code = codeElement.props.children || ""
    const language =
      codeElement.props.className?.replace("language-", "") || "typescript"

    return (
      <CodeSnippet title={title} code={code} language={language} {...props} />
    )
  },
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading font-medium mt-2 scroll-m-20 text-3xl tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading font-medium mt-12 scroll-m-20 pb-2 text-xl tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-lg tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-base tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-base tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-sm tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium text-primary underline decoration-primary decoration-wavy underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary/80",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("leading-7 not-first:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    src,
    width,
    height,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // Return the CambioImage directly as an inline-block element
    // This avoids wrapping in any block element that could cause nesting issues
    return (
      <CambioImage
        src={typeof src === "string" ? src : ""}
        alt={alt || ""}
        width={typeof width === "string" ? parseInt(width) : width || 800}
        height={typeof height === "string" ? parseInt(height) : height || 600}
        motion="snappy"
        className={cn("rounded-lg my-6 block", className)}
      />
    )
  },
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="relative w-full overflow-auto border border-border rounded-sm my-6">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn("[&_tr]:border-b", className)} {...props} />
  ),
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
  tfoot: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 !py-4 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground bg-secondary [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  caption: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableCaptionElement>) => (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
  pre: ({
    className,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __rawstring__,
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawstring__?: string
    __withMeta__?: boolean
  } & NpmCommands) => {
    const isNpmCommand =
      __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__

    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __npmCommand__={__npmCommand__}
          __yarnCommand__={__yarnCommand__}
          __pnpmCommand__={__pnpmCommand__}
          __bunCommand__={__bunCommand__}
        />
      )
    }

    // Extract code content and language from children for CodeSnippet
    const codeElement = Children.toArray(children)[0] as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>

    if (codeElement && codeElement.props) {
      // Use robust text extraction to handle complex MDX children
      const code = extractTextContent(codeElement.props.children)

      if (code.trim()) {
        const language =
          codeElement.props.className?.replace("language-", "") || "typescript"

        return <CodeSnippet code={code} language={language} className="mt-6" />
      }
    }

    // Fallback to original pre element if no code content
    return (
      <>
        <pre
          className={cn(
            "mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 py-4 dark:bg-zinc-900",
            className
          )}
          {...props}
        />
        {__rawstring__ && (
          <CopyButton
            value={__rawstring__}
            className="absolute right-4 top-4"
          />
        )}
      </>
    )
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "font-mono text-xs md:text-sm px-0.5 py-px md:px-1 md:py-0.5 border border-border rounded-md leading-6 bg-muted sm:whitespace-pre box-decoration-clone",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading font-medium mt-8 scroll-m-20 text-lg tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className
      )}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-muted/50 sm:p-10",
        className
      )}
      {...props}
    />
  ),
  Admonition,
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
