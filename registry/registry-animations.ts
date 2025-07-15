import type { Registry } from "@/registry/schema"

export const animations: Registry = [
  {
    name: "animate-in",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "animations/animate-in.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "font-transform",
    type: "registry:component",
    dependencies: ["motion"],
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
    dependencies: ["motion"],
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
