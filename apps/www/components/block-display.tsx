import * as React from "react"
import { registryItemFileSchema } from "shadcn/schema"
import { z } from "zod"

import { highlightCode } from "@/lib/highlight-code"
import {
  createFileTreeForRegistryItemFiles,
  getRegistryItem,
} from "@/lib/registry"
import { cn } from "@/lib/utils"
import { BlockViewer } from "@/components/block-viewer"
import { ComponentPreview } from "@/components/component-preview"

export async function BlockDisplay({
  name,
  defaultViewSize,
}: {
  name: string
  defaultViewSize?: "100" | "60" | "30"
}) {
  const item = await getCachedRegistryItem(name)

  if (!item?.files) {
    return null
  }

  const [tree, highlightedFiles] = await Promise.all([
    getCachedFileTree(item.files),
    getCachedHighlightedFiles(item.files),
  ])

  return (
    <BlockViewer
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      defaultViewSize={defaultViewSize}
    >
      <ComponentPreview
        name={item.name}
        hideCode
        marginOff={true}
        className={cn(item.meta?.containerClassName)}
      />
    </BlockViewer>
  )
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name)
})

const getCachedFileTree = React.cache(
  async (files: Array<{ path: string; target?: string }>) => {
    if (!files) {
      return null
    }

    return await createFileTreeForRegistryItemFiles(files)
  }
)

const getCachedHighlightedFiles = React.cache(
  async (files: z.infer<typeof registryItemFileSchema>[]) => {
    return await Promise.all(
      files.map(async (file) => {
        const typedFile = file as z.infer<typeof registryItemFileSchema>
        return {
          // @ts-expect-error - zod inferred type spreading issue
          ...typedFile,
          // @ts-expect-error - zod inferred type content access
          highlightedContent: await highlightCode(typedFile.content ?? ""),
        }
      })
    )
  }
)
