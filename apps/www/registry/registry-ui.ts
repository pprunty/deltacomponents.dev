import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "code-block",
    type: "registry:ui",
    dependencies: ["lucide-react", "prism-react-renderer"],
    registryDependencies: ["copy-button"],
    files: [
      {
        path: "ui/code-block.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "tooltip"],
    files: [
      {
        path: "ui/copy-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "cambio-image",
    type: "registry:ui",
    dependencies: ["lucide-react", "cambio"],
    files: [
      {
        path: "ui/cambio-image.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card-deck",
    type: "registry:ui",
    dependencies: ["lucide-react", "framer-motion", "swiper"],
    files: [
      {
        path: "ui/card-deck.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "admonition",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "ui/admonition.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "x-scrollable",
    type: "registry:ui",
    files: [
      {
        path: "ui/x-scrollable.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    registryDependencies: ["x-scrollable"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "qrcode",
    type: "registry:ui",
    dependencies: ["qr-code-styling"],
    files: [
      {
        path: "components/qrcode.tsx",
        type: "registry:ui",
      },
    ],
  },
]
