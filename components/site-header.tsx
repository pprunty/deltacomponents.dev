// TODO: Temporary adjustments for fixed banner. Restore original SiteHeader styles and top offset after banner is removed.

"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import ThemeSwitcher from "@/components/theme-switcher"

export function SiteHeader() {
  return (
    <div className="px-4 pt-4 pb-2 md:px-4 md:pt-6 md:pb-2">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 border-b border-border md:static md:rounded-2xl md:bg-background md:border md:backdrop-blur-none">
        <div className="flex h-14 md:h-20 items-center px-4 md:px-4">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:space-x-4 md:justify-end">
            <div className="w-full flex-1 lg:w-auto lg:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center space-x-2 md:space-x-3">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "p-2"
                )}
              >
                <Icons.gitHub className="size-4 md:size-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ThemeSwitcher />
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}
