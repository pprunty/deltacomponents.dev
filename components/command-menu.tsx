"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Modal from "@/registry/components/modal"

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Simpler command execution to avoid issues with keyboard navigation
  const runCommand = React.useCallback((action: () => void) => {
    setOpen(false)
    setTimeout(() => {
      action()
    }, 10)
  }, [])

  // The command content with matching rounded corners
  const commandContent = (
    <Command className="rounded-md bg-background [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-4 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5 w-full flex flex-col overflow-hidden relative">
      <div className="sr-only">Type a command or search</div>
      <CommandInput
        placeholder="Type a command or search..."
        className="rounded-t-md text-sm [&::placeholder]:text-[15px]"
        autoFocus
      />
      <CommandList className="flex-1 rounded-b-md pb-2">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Links">
          {docsConfig.mainNav
            .filter((navitem) => !navitem.external && !navitem.hide)
            .map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() =>
                  runCommand(() => router.push(navItem.href as string))
                }
              >
                <FileIcon className="mr-2 h-4 w-4" />
                <span>{navItem.title}</span>
              </CommandItem>
            ))}
        </CommandGroup>
        {docsConfig.sidebarNav.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.items
              .filter((navItem) => !navItem.hide)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() =>
                    runCommand(() => router.push(navItem.href as string))
                  }
                >
                  <div className="mr-2 flex size-4 items-center justify-center">
                    <CircleIcon className="size-3" />
                  </div>
                  <span>{navItem.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <SunIcon className="mr-2 h-4 w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <MoonIcon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
            <LaptopIcon className="mr-2 h-4 w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* Keyboard navigation help - desktop only */}
      <div className="absolute hidden sm:flex items-center justify-start border-t border-border bg-muted w-full bottom-0 px-2 py-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-b-sm">
        ↑↓ Navigate ⏎ Select
      </div>
    </Command>
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 md:h-9 w-full justify-start rounded-sm bg-muted text-sm font-normal text-muted-foreground shadow-none sm:pr-12 lg:w-56 xl:w-64 px-2"
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="ml-[-4px] mr-1 size-3.5 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex text-sm">Search docs...</span>
        <span className="inline-flex lg:hidden text-sm">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] md:top-[0.5rem] hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-[90vw] sm:max-w-[600px] max-h-[70vh] p-0 overflow-hidden rounded-md border-border"
        showCloseButton={false}
        showEscText={false}
        borderBottom={false}
        animationType="scale"
        position={350}
        disablePadding={true}
      >
        {commandContent}
      </Modal>
    </>
  )
}
