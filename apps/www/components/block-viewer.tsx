"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Check,
  ChevronRight,
  Clipboard,
  Expand,
  File,
  Folder,
  Fullscreen,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react"
import { ImperativePanelHandle } from "react-resizable-panels"
import { registryItemFileSchema, registryItemSchema } from "@/lib/schema"
import { z } from "zod"

import { trackEvent } from "@/lib/events"
import { createFileTreeForRegistryItemFiles, FileTree } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { CodeBlock } from "@/registry/delta-ui/delta/code-block"
import { Tabs, TabsList, TabsTrigger } from "@/registry/delta-ui/delta/tabs"
import { Button } from "@/registry/delta-ui/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/delta-ui/ui/collapsible"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/delta-ui/ui/resizable"
import { Separator } from "@/registry/delta-ui/ui/separator"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/registry/delta-ui/ui/sidebar"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/delta-ui/ui/toggle-group"

type BlockViewerContext = {
  item: z.infer<typeof registryItemSchema>
  view: "code" | "preview"
  setView: (view: "code" | "preview") => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null> | null
  tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null
  highlightedFiles:
  | (z.infer<typeof registryItemFileSchema> & {
    highlightedContent: string
  })[]
  | null
  iframeKey?: number
  setIframeKey?: React.Dispatch<React.SetStateAction<number>>
  defaultViewSize: "100" | "60" | "30"
  currentViewSize: "100" | "60" | "30"
  setCurrentViewSize: (size: "100" | "60" | "30") => void
}

const BlockViewerContext = React.createContext<BlockViewerContext | null>(null)

function useBlockViewer() {
  const context = React.useContext(BlockViewerContext)
  if (!context) {
    throw new Error("useBlockViewer must be used within a BlockViewerProvider.")
  }
  return context
}

function BlockViewerProvider({
  item,
  tree,
  highlightedFiles,
  children,
  defaultViewSize = "100",
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode
  defaultViewSize?: "100" | "60" | "30"
}) {
  const [view, setView] = React.useState<BlockViewerContext["view"]>("preview")
  const [activeFile, setActiveFile] = React.useState<
    BlockViewerContext["activeFile"]
  >(highlightedFiles?.[0].target ?? null)
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null)
  const [iframeKey, setIframeKey] = React.useState(0)
  const [currentViewSize, setCurrentViewSize] = React.useState<
    "100" | "60" | "30"
  >(defaultViewSize)


  // Initialize ResizablePanel with the correct default size after mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (resizablePanelRef.current) {
        resizablePanelRef.current.resize(parseInt(currentViewSize))
      }
    }, 100) // Small delay to ensure ref is ready

    return () => clearTimeout(timer)
  }, [currentViewSize])

  return (
    <BlockViewerContext.Provider
      value={{
        item,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
        tree,
        highlightedFiles,
        iframeKey,
        setIframeKey,
        defaultViewSize,
        currentViewSize,
        setCurrentViewSize,
      }}
    >
      <div
        id={item.name}
        data-view={view}
        className="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
        style={
          {
            "--height": item.meta?.iframeHeight ?? "1200px",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </BlockViewerContext.Provider>
  )
}

function BlockViewerToolbar() {
  const {
    setView,
    view,
    item,
    resizablePanelRef,
    setIframeKey,
    currentViewSize,
    setCurrentViewSize,
  } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <div className="hidden w-full items-center gap-2 overflow-x-hidden md:pr-4 lg:flex">
      <Tabs
        value={view}
        onValueChange={(value) => setView(value as "preview" | "code")}
        variant="default"
        size="sm"
      >
        <TabsList className="h-auto">
          <TabsTrigger
            value="preview"
            className="min-w-[70px] justify-center text-center"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="min-w-[70px] justify-center text-center"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator orientation="vertical" className="mx-2 !h-4" />
      <a
        href={`#${item.name}`}
        className="flex-1 text-center text-sm font-medium underline-offset-2 hover:underline md:flex-auto md:text-left"
      >
        {item.description?.replace(/\.$/, "")}
      </a>
      <div className="ml-auto flex items-center gap-2">
        <div className="h-8 items-center gap-1.5 rounded-md border p-1 shadow-none">
          <ToggleGroup
            type="single"
            value={currentViewSize}
            onValueChange={(value) => {
              if (value) {
                setCurrentViewSize(value as "100" | "60" | "30")
                setView("preview")
                if (resizablePanelRef?.current) {
                  resizablePanelRef.current.resize(parseInt(value))
                }
              }
            }}
            className="gap-1 *:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm"
          >
            <ToggleGroupItem value="100" title="Desktop">
              <Monitor />
            </ToggleGroupItem>
            <ToggleGroupItem value="60" title="Tablet">
              <Tablet />
            </ToggleGroupItem>
            <ToggleGroupItem value="30" title="Mobile">
              <Smartphone />
            </ToggleGroupItem>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              asChild
              title="Open in New Tab"
            >
              <Link href={`/view/${item.name}`} target="_blank">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen />
              </Link>
            </Button>
            <Separator orientation="vertical" className="!h-4" />
            <Button
              size="icon"
              variant="ghost"
              className="size-6 rounded-sm p-0"
              title="Refresh Preview"
              onClick={() => {
                if (setIframeKey) {
                  setIframeKey((k) => k + 1)
                }
              }}
            >
              <RotateCw />
              <span className="sr-only">Refresh Preview</span>
            </Button>
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" className="mx-1 !h-4" />
        <Button
          variant="outline"
          className="w-fit gap-1 px-2 shadow-none"
          size="sm"
          onClick={() => {
            copyToClipboard(
              `npx shadcn@latest add "https://deltacomponents.dev/r/${item.name}.json"`
            )
          }}
        >
          {isCopied ? <Check /> : <Terminal />}
          <span>
            npx shadcn@latest add https://deltacomponents.dev/r/{item.name}.json
          </span>
        </Button>
        <Separator orientation="vertical" className="mx-1 !h-4" />
        <OpenInV0Button name={item.name} />
      </div>
    </div>
  )
}

function BlockViewerIframe({ className }: { className?: string }) {
  const { item, iframeKey } = useBlockViewer()

  return (
    <iframe
      key={iframeKey}
      src={`/view/${item.name}`}
      height={item.meta?.iframeHeight ?? 1200}
      loading="lazy"
      className={cn(
        "bg-background no-scrollbar relative z-20 w-full",
        className
      )}
    />
  )
}

function BlockViewerView() {
  const { resizablePanelRef, currentViewSize } = useBlockViewer()

  return (
    <div className="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex">
      <div className="relative grid w-full gap-4">
        <div className="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"></div>
        <ResizablePanelGroup
          direction="horizontal"
          className="after:bg-surface/50 relative z-10 after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-xl"
          key={currentViewSize} // Force re-mount when size changes
        >
          <ResizablePanel
            ref={resizablePanelRef}
            className="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
            defaultSize={parseInt(currentViewSize)}
            minSize={30}
          >
            <BlockViewerIframe />
          </ResizablePanel>
          <ResizableHandle className="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function BlockViewerMobile({ children }: { children: React.ReactNode }) {
  const { item } = useBlockViewer()
  const [videoError, setVideoError] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  // Format component name from kebab-case to Title Case
  const formatComponentName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handlePreviewClick = () => {
    window.open(`/view/${item.name}`, "_blank")
  }

  const renderPreview = () => {
    // Always try to render video first, then images, then placeholder
    if (!videoError) {
      return (
        <div
          className="relative cursor-pointer overflow-hidden rounded-xl border"
          onClick={handlePreviewClick}
        >
          <video
            src={`/videos/${item.name}-demo.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            onError={() => setVideoError(true)}
          />
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="ghost"
              className="size-8 bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
              onClick={(e) => {
                e.stopPropagation()
                handlePreviewClick()
              }}
            >
              <Expand className="size-4" />
            </Button>
          </div>
        </div>
      )
    }

    // If video failed, show placeholder image directly to avoid 404s
    return (
      <div
        className="relative cursor-pointer overflow-hidden rounded-xl border"
        onClick={handlePreviewClick}
      >
        <Image
          src="/placeholder.svg"
          alt={`${item.name} preview`}
          width={1440}
          height={900}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            className="size-8 bg-black/20 text-white backdrop-blur-sm hover:bg-black/30"
            onClick={(e) => {
              e.stopPropagation()
              handlePreviewClick()
            }}
          >
            <Expand className="size-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 lg:hidden">
      {/* Component title (mobile only) */}
      <h2 className="font-heading text-2xl font-medium">
        {formatComponentName(item.name)}
      </h2>

      {/* Install command with package manager tabs (mobile only) */}
      <CodeBlock
        npm={`npx shadcn@latest add "https://deltacomponents.dev/r/${item.name}.json"`}
        pnpm={`pnpm dlx shadcn@latest add "https://deltacomponents.dev/r/${item.name}.json"`}
        yarn={`npx shadcn@latest add "https://deltacomponents.dev/r/${item.name}.json"`}
        bun={`bunx shadcn@latest add "https://deltacomponents.dev/r/${item.name}.json"`}
        defaultPackageManager="npm"
        className="text-sm"
      />

      {/* Preview content */}
      {renderPreview()}
    </div>
  )
}

function BlockViewerCode() {
  const { activeFile, highlightedFiles } = useBlockViewer()

  const file = React.useMemo(() => {
    return highlightedFiles?.find((file) => file.target === activeFile)
  }, [highlightedFiles, activeFile])

  if (!file) {
    return null
  }

  const language = file.path.split(".").pop() ?? "tsx"

  return (
    <div className="bg-code text-code-foreground mr-[14px] flex overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
      <div className="w-72">
        <BlockViewerFileTree />
      </div>
      <figure
        data-rehype-pretty-code-figure=""
        className="!mx-0 mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none"
      >
        <figcaption
          className="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          <File className="size-4" />
          {file.target}
          <div className="ml-auto flex items-center gap-2">
            <BlockCopyCodeButton />
          </div>
        </figcaption>
        <div
          key={file?.path}
          dangerouslySetInnerHTML={{ __html: file?.highlightedContent ?? "" }}
          className="no-scrollbar overflow-y-auto"
        />
      </figure>
    </div>
  )
}

export function BlockViewerFileTree() {
  const { tree } = useBlockViewer()

  if (!tree) {
    return null
  }

  return (
    <SidebarProvider className="flex !min-h-full flex-col border-r">
      <Sidebar collapsible="none" className="w-full flex-1">
        <SidebarGroupLabel className="h-12 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="translate-x-0 gap-1.5">
              {tree.map((file, index) => (
                <Tree key={index} item={file} index={1} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  )
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useBlockViewer()

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
          data-index={index}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
            style={
              {
                "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full translate-x-0 border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree key={key} item={subItem} index={index + 1} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function BlockCopyCodeButton() {
  const { activeFile, item } = useBlockViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const file = React.useMemo(() => {
    return item.files?.find((file) => file.target === activeFile)
  }, [activeFile, item.files])

  const content = file?.content

  if (!content) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => {
        copyToClipboard(content)
        trackEvent({
          name: "copy_block_code",
          properties: {
            name: item.name,
            file: file.path,
          },
        })
      }}
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  )
}

function BlockViewer({
  item,
  tree,
  highlightedFiles,
  children,
  defaultViewSize,
  ...props
}: Pick<BlockViewerContext, "item" | "tree" | "highlightedFiles"> & {
  children: React.ReactNode
  defaultViewSize?: "100" | "60" | "30"
}) {
  return (
    <BlockViewerProvider
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      defaultViewSize={defaultViewSize}
      {...props}
    >
      <BlockViewerToolbar />
      <BlockViewerView />
      <BlockViewerCode />
      <BlockViewerMobile>{children}</BlockViewerMobile>
    </BlockViewerProvider>
  )
}

export { BlockViewer }
