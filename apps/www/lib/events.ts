import { z } from "zod"

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
    "copy_chunk_code",
    "enable_lift_mode",
    "copy_chart_code",
    "copy_chart_theme",
    "copy_chart_data",
    "copy_color",
    "set_layout",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
})

export type Event = z.infer<typeof eventSchema>

export function trackEvent(input: Event): void {
  try {
    // Only track in browser environment
    if (typeof window === "undefined") {
      return
    }

    const event = eventSchema.parse(input)
    if (event) {
      // Dynamically import Vercel Analytics to avoid SSR issues
      import("@vercel/analytics")
        .then(({ track }) => {
          track(
            event.name,
            event.properties as Record<
              string,
              string | number | boolean | null
            >
          )
        })
        .catch(() => {
          // Silently fail if analytics is not available
        })
    }
  } catch (error) {
    // Silently fail if tracking doesn't work
    console.warn("Failed to track event:", error)
  }
}
