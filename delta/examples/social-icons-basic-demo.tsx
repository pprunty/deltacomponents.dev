"use client"

import { SocialIcons, SocialIcon } from "@/delta/components/social-icons"

// Complete URL mapping for all platforms
const customUrlMapping = {
  github: "https://github.com/pprunty",
  twitter: "https://x.com/pprunty_",
  linkedin: "https://www.linkedin.com/in/patrickprunty/",
  reddit: "https://reddit.com/user/pprunty",
  strava: "https://www.strava.com/athletes/72636452",
  tiktok: "https://tiktok.com/@pprunty",
  email: "mailto:hello@deltacomponents.dev",
  instagram: "https://www.instagram.com/pprunty97/",
  youtube: "https://youtube.com/@deltacomponents"
}

export default function SocialIconsBasicDemo() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Multiple Icons */}
      <SocialIcons
        platforms={["github", "twitter", "linkedin", "email"]}
        containerClassName="flex items-center justify-center gap-4"
        linkClassName="text-muted-foreground hover:text-foreground transition-colors"
        urlMapping={customUrlMapping}
      />

      {/* Single Icon */}
      <div className="flex items-center justify-center">
        <a href={customUrlMapping.twitter} target="_blank" rel="noopener noreferrer">
          <SocialIcon platform="twitter" />
        </a>
      </div>
    </div>
  )
}
