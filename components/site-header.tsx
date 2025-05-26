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
    <header
      className={
        cn(
          // Header should be at the very top so it covers the banner on scroll
          "border-grid sticky top-0 z-50 w-full border-b bg-background",
          // "bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/90", // TODO: Restore this after banner is removed
        )
      }
    >
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <nav className="flex items-center">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-8 px-0"
                )}
              >
                <Icons.gitHub className="size-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ThemeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
