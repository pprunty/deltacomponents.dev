"use client"

import React from "react"

import { SocialIcons } from "@/delta/social-icons"

export default function SocialIconsMonochromeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <SocialIcons
        icons={[
          { platform: "github", href: "https://github.com" },
          { platform: "x", href: "https://x.com" },
          { platform: "linkedin", href: "https://linkedin.com" },
          { platform: "instagram", href: "https://instagram.com" },
          { platform: "tiktok", href: "https://tiktok.com" },
        ]}
        variant="monochrome"
        size={32}
        gap={20}
      />
    </div>
  )
}
