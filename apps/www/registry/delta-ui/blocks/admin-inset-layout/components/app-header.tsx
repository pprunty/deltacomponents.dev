"use client"

import { Button } from "@/registry/delta-ui/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/delta-ui/ui/dropdown-menu"

export function AppHeader() {
  return (
    <header className="bg-sidebar fixed top-0 z-50 w-full">
      <div className="flex h-14 w-full items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold sm:pl-2">Delta UI Platform</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              API reference
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"></path>
                  </svg>
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuItem>Pricing</DropdownMenuItem>
                <DropdownMenuItem>Manage cookies</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
