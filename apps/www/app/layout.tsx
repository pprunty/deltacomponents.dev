import type { Metadata } from "next"

import { META_THEME_COLORS, siteConfig } from "@/lib/config"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LayoutProvider } from "@/hooks/use-layout"
import { ActiveThemeProvider } from "@/components/active-theme"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/registry/shadcn/sonner"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og/og.webp`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og/1200x6238-twitter.png"],
    creator: "@pprunty_",
  },
  icons: {
    icon: [
      { url: "/icons/16x16.png", sizes: "16x16" },
      { url: "/icons/32x32.png", sizes: "32x32" },
      { url: "/icons/96x96.png", sizes: "96x96" },
      { url: "/icons/128x128.png", sizes: "128x128" },
      { url: "/icons/192x192.png", sizes: "192x192" },
      { url: "/icons/512x512.png", sizes: "512x512" },
    ],
    shortcut: "/icons/16x16.png",
    apple: [
      { url: "/icons/120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        url: "/icons/120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        url: "/icons/152x152.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/icons/180x180.png",
      },
      {
        rel: "mask-icon",
        url: "/icons/512x512.png",
        color: "#09090b",
      },
    ],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
                if (localStorage['active-theme']) {
                  document.documentElement.setAttribute('data-theme', localStorage['active-theme'])
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn(
          "bg-background text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              {children}
              <TailwindIndicator />
              <Toaster position="top-center" />
              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
