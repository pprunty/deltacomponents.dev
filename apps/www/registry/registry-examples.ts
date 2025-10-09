import { type Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
  {
    name: "card-deck-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/card-deck.json"],
    files: [
      {
        path: "examples/card-deck-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "card-deck-demo-interactive",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/card-deck.json"],
    files: [
      {
        path: "examples/card-deck-demo-interactive.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "admonition-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/admonition.json"],
    files: [
      {
        path: "examples/admonition-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "admonition-demo-interactive",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/admonition.json"],
    files: [
      {
        path: "examples/admonition-demo-interactive.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "examples/tabs-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
