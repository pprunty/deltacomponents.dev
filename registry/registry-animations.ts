import type { Registry } from "@/registry/schema"

export const animations: Registry = [
  {
    name: "scramble-text",
    type: "registry:component",
    dependencies: ["use-scramble"],
    registryDependencies: [],
    tags: ["animation", "text", "scramble", "effect", "motion", "interaction", "reveal"],
    files: [
      {
        path: "animations/scramble-text.tsx",
        type: "registry:component",
      },
    ],
  },
]
