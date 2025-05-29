import { animations } from "@/registry/registry-animations"
import { blocks } from "@/registry/registry-blocks"
import { components } from "@/registry/registry-components"
import { examples } from "@/registry/registry-examples"
import { inputs } from "@/registry/registry-inputs"
import { landingPage } from "@/registry/registry-landing-page"
import { media } from "@/registry/registry-media"
import type { Registry } from "@/registry/schema"

export const registry: Registry = [
  ...inputs,
  ...examples,
  ...components,
  ...blocks,
  ...animations,
  ...landingPage,
  ...media,
]
