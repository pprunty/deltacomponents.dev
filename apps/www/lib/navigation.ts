import { Index } from "@/registry/__index__"

export const BLOCKS_NAV_ITEMS = [
  { name: "Testimonials", href: "/blocks/landing-page#testimonials" },
  {
    name: "Video Card Grid",
    href: "/blocks/landing-page#interactive-feature-showcase",
  },
  {
    name: "LLM Chat Window",
    href: "/blocks/ai-elements#chatbot-window",
  },
  {
    name: "AI Chat Sidebar",
    href: "/blocks/ai-elements#ai-chat-sidebar",
  },
  {
    name: "Perspective Carousel",
    href: "/blocks/featured#perspective-carousel",
  },
  {
    name: "Bottom Mobile Nav Layout",
    href: "/blocks/layout#bottom-mobile-nav",
  },
]

/**
 * Check if a component should be hidden in production
 * @param url - The component URL (e.g., "/docs/components/mapbox-pointer")
 * @returns true if the component should be hidden in production
 */
export function shouldHideComponent(url?: string): boolean {
  if (!url) return false

  const isProduction = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production"

  // Extract component name from URL
  const componentName = url.split('/').pop()
  const componentMeta = componentName ? Index[componentName]?.meta : null

  return componentMeta?.hide === true && isProduction
}
