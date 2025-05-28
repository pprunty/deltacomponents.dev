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
    <Command className="rounded-2xl bg-background [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5 h-full flex flex-col overflow-hidden relative">
      <div className="sr-only">Type a command or search</div>
      <CommandInput
        placeholder="Type a command or search..."
        className="rounded-t-2xl text-sm md:text-sm sm:text-md"
        autoFocus
      />
      <CommandList className="flex-1 rounded-b-2xl pb-12">
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
      <div className="absolute hidden sm:flex items-center justify-start border-t border-border bg-muted w-full bottom-0 px-2 py-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-b-2xl">
        ↑↓ Navigate ⏎ Select
      </div>
    </Command>
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-1.5 size-4 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Use Modal for both mobile and desktop */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-[450px] p-0 min-h-[300px] max-h-[60vh]"
        showCloseButton={false}
        animationType="scale"
        disablePadding
        position={380}
      >
        {commandContent}
      </Modal>
    </>
  )
}
