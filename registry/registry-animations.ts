import type { Registry } from "@/registry/schema"

export const animations: Registry = [
  {
    name: "font-transform",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "animations/font-transform.tsx",
        type: "registry:component",
      },
      {
        path: "animations/font-transform.css",
        type: "registry:component",
      },
    ],
  },
  {
    name: "floating-object",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "animations/floating-object.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scramble-text",
    type: "registry:component",
    dependencies: ["use-scramble"],
    registryDependencies: [],
    tags: [
      "animation",
      "text",
      "scramble",
      "effect",
      "motion",
      "interaction",
      "reveal",
    ],
    files: [
      {
        path: "animations/scramble-text.tsx",
        type: "registry:component",
      },
    ],
  },
]
