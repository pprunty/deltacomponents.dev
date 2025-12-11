"use client"

import Link from "next/link"

import { Announcement } from "@/components/announcement"
import { useThemeConfig } from "@/components/active-theme"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { ThemeGrid } from "@/components/themes/theme-grid"
import { Button } from "@/registry/delta-ui/ui/button"

export function ThemesPageClient() {
  const { setActiveTheme } = useThemeConfig()

  const handleResetToDefault = () => {
    setActiveTheme("default")
  }

  return (
    <>
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>
          Beautiful Themes for Modern UIs
        </PageHeaderHeading>
        <PageHeaderDescription>
          Carefully crafted color schemes for Delta and shadcn/ui components.
          Preview, customize, and apply with a single click. Built with{" "}
          <a href="https://tweakcn.com" className="underline">
            tweakcn
          </a>
          . Open Source. Free forever.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#themes">Browse Themes</a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <a href="https://tweakcn.com/" target="_blank" rel="noopener noreferrer">
              Create a Theme
            </a>
          </Button>
        </PageActions>
      </PageHeader>
      <div id="themes" className="container-wrapper flex-1 md:py-12">
        <div className="container">
          <div className="mb-6 flex items-center justify-end">
            <Button onClick={handleResetToDefault} variant="outline" size="sm">
              Reset to Default Theme
            </Button>
          </div>
          <ThemeGrid />
        </div>
      </div>
    </>
  )
}