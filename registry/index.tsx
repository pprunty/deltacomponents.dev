import { examples } from "@/registry/registry-examples"
import { inputs }   from "@/registry/registry-inputs"
import type { Registry } from "@/registry/schema"
import { blocks } from "@/registry/registry-blocks"
import { components } from "@/registry/registry-components"
import { animations } from "@/registry/registry-animations"

export const registry: Registry = [
  ...inputs,
  ...examples,
  ...components,
  ...blocks,
  ...animations,
]