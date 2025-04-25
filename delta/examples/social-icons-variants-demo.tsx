"use client"

import { SocialIcons } from "@/delta/components/social-icons"

// Complete URL mapping for all platforms
const customUrlMapping = {
  github: "https://github.com/pprunty",
  twitter: "https://x.com/pprunty_",
  linkedin: "https://www.linkedin.com/in/patrickprunty/",
  reddit: "https://reddit.com/user/pprunty",
  strava: "https://www.strava.com/athletes/72636452",
  tiktok: "https://tiktok.com/@pprunty",
  email: "mailto:patrickprunty.business@gmail.com",
  instagram: "https://www.instagram.com/pprunty97/",
  youtube: "https://youtube.com/@pprunty"
}

export default function SocialIconsVariantsDemo() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Default Style */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Style</h3>
        <SocialIcons
          platforms={["github", "twitter", "linkedin", "reddit", "strava", "tiktok", "email", "instagram", "youtube"]}
          containerClassName="flex items-center justify-center gap-4 flex-wrap"
          linkClassName="text-muted-foreground hover:text-foreground transition-colors"
          urlMapping={customUrlMapping}
        />
      </div>

      {/* Animated Pill Style */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Animated Pill Style</h3>
        <SocialIcons
          platforms={["github", "twitter", "linkedin", "reddit", "strava", "tiktok", "email", "instagram", "youtube"]}
          containerClassName="flex items-center justify-center gap-2 flex-wrap"
          linkClassName="p-2 rounded-md bg-muted text-muted hover:bg-muted/80 hover:text-foreground transition-colors [&>svg]:w-6 [&>svg]:h-6 [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:scale-105"
          urlMapping={customUrlMapping}
        />
      </div>
    </div>
  )
}
