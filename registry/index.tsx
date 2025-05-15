import { examples } from "@/registry/registry-examples"
import { inputs }   from "@/registry/registry-inputs"
import type { Registry } from "@/registry/schema"
import { media } from "@/registry/registry-media"
import { landingPage } from "@/registry/registry-landing-page"
import { blocks } from "@/registry/registry-blocks"
import { components } from "@/registry/registry-components"
import { animations } from "@/registry/registry-animations"

export const registry: Registry = [
  ...inputs,
  ...examples,
  ...components,
  ...blocks,
  ...animations,
  ...landingPage
]