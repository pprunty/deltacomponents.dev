import Image from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"
import CodeBlock from "@/delta/components/code-block"
import { ComponentTabs } from "@/components/component-tabs"
import { InstallationInstructions } from "@/components/installation-instructions"
import { cn } from "@/lib/utils"
import React, { type ReactNode, Children } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { slugify, extractTextFromChildren } from "@/lib/slugify"

// This function still supports manual IDs with [#id] syntax
export function withHeadingId(children: ReactNode): { content: ReactNode; id: string } {
  // Check for manual ID specification with [#id] pattern
  const childrenArray = Children.toArray(children)
  let id = ""
  let content = children

  // Check the last child for [#id] pattern if it's a string
  const lastChild = childrenArray[childrenArray.length - 1]
  if (typeof lastChild === "string") {
    const re = /\[#([^\]]+)\]\s*$/m
    const match = lastChild.match(re)

    if (match && match[1]?.length) {
      // Use the manually specified ID
      id = match[1]

      // Remove the [#id] part from the content
      const newChildren = [...childrenArray]
      newChildren[newChildren.length - 1] = lastChild.substring(0, match.index)
      content = newChildren
    }
  }

  // If no manual ID was found, generate one from the text content
  if (!id) {
    const textContent = extractTextFromChildren(children)
    id = slugify(textContent)
  }

  return { content, id }
}

// Heading component that adds anchor links
function HeadingWithAnchor({
  as: Component,
  children,
  className,
}: {
  as: React.ElementType
  children: ReactNode
  className?: string
}) {
  const { content, id } = withHeadingId(children)

  return (
    <Component id={id} className={cn("group flex", className)}>
      <span className="relative">
        {content}
        <a
          href={`#${id}`}
          className="absolute -left-6 top-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </a>
      </span>
    </Component>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use the HeadingWithAnchor component for headings
    h1: ({ children }) => (
      <HeadingWithAnchor as="h1" className="scroll-m-20 text-4xl font-bold tracking-tight">
        {children}
      </HeadingWithAnchor>
    ),
    h2: ({ children }) => (
      <HeadingWithAnchor as="h2" className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </HeadingWithAnchor>
    ),
    h3: ({ children }) => (
      <HeadingWithAnchor as="h3" className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </HeadingWithAnchor>
    ),
    h4: ({ children }) => (
      <HeadingWithAnchor as="h4" className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </HeadingWithAnchor>
    ),
    p: ({ children }) => <p className="my-4 text-muted-foreground">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({ children }) => <li className="mt-1">{children}</li>,
    a: ({ href, children }) => (
      <Link href={href || "#"} className="text-primary hover:underline">
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-muted-foreground pl-4 my-4 italic">{children}</blockquote>
    ),
    code: ({ children, className }) => {
      const language = className?.replace(/language-/, "")

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
        )
      }

      return <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono">{children}</code>
    },
    pre: ({ children }) => {
      const codeElement = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.type === "code",
      )

      if (!React.isValidElement(codeElement)) {
        return <pre>{children}</pre>
      }

      return codeElement
    },
    img: ({ src, alt }) => (
      <Image src={src || ""} alt={alt || ""} width={800} height={400} className="rounded-lg my-4" />
    ),
    // Pass through the shadcn/ui table components
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    // Legacy table components for compatibility
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <Table {...props} className={cn(className)} />
      </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <TableRow className={cn(className)} {...props} />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableHead className={cn(className)} {...props} />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableCell className={cn(className)} {...props} />
    ),
    thead: ({ className, ...props }) => <TableHeader {...props} className={cn(className)} />,
    tbody: ({ className, ...props }) => <TableBody {...props} className={cn(className)} />,
    // Additional components
    ComponentTabs,
    InstallationInstructions,
    ...components,
  }
}
