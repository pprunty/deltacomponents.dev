import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { themeEffect } from "@/components/theme-effect"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "pprunty",
      url: "https://patrickprunty.com",
    },
  ],
  creator: "pprunty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
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
    images: [siteConfig.ogImage],
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

export const viewport: Viewport = {
  themeColor: "#fcfcfc",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="10114de9-fbcb-417d-89a2-7ff4ac30db2d"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})('claude');`,
          }}
        />
      </head>
      <body
        className={cn(
          "flex items-center justify-center w-full text-foreground antialiased [font-synthesis-weight:none]",
          fontSans.variable,
          fontMono.variable
        )}
        suppressHydrationWarning
      >
        <main className="h-full w-full max-w-[96rem] flex flex-col items-center justify-center">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
