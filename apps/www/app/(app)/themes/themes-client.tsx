"use client"

import { useThemeConfig } from "@/components/active-theme"
import {
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
        <PageHeaderHeading>Themes</PageHeaderHeading>
        <PageHeaderDescription>
          Beautiful themes and color schemes for Delta and{" "}
          <a href="https://ui.shadcn.com" className="underline">
            shadcn
          </a>{" "}
          components, created using{" "}
          <a href="https://tweakcn.com" className="underline">
            tweakcn
          </a>
          . Customize your app&apos;s appearance.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper section-soft flex-1 md:py-12">
        <div className="container">
          <div className="mb-6">
            <Button onClick={handleResetToDefault} variant="outline">
              Reset to Default Theme
            </Button>
          </div>
          <ThemeGrid />
        </div>
      </div>
    </>
  )
}