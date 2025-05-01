import type { MDXComponents } from "mdx/types"
import { ComponentTabs } from "@/components/component-tabs"
import { InstallationInstructions } from "@/components/installation-instructions"
import { cn } from "@/lib/utils"
import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MDXComponents as DocsComponents } from "./app/(main)/docs/components"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use our custom components for basic HTML elements
    ...DocsComponents,
    
    // Pass through the shadcn/ui table components
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    // Additional components
    ComponentTabs,
    InstallationInstructions,
    ...components,
  }
}
