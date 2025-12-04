import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "navigation-menu",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "delta/navigation-menu.tsx",
        type: "registry:ui",
      },
    ],
    meta: {
      badge: "coming soon",
      hide: false,
    },
  },
  {
    name: "code-block",
    type: "registry:ui",
    dependencies: ["lucide-react", "prism-react-renderer", "prismjs"],
    registryDependencies: ["copy-button", "tabs"],
    files: [
      {
        path: "delta/code-block.tsx",
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
        path: "delta/copy-button.tsx",
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
        path: "delta/cambio-image.tsx",
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
        path: "delta/card-deck.tsx",
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
        path: "delta/admonition.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "x-scrollable",
    type: "registry:ui",
    files: [
      {
        path: "delta/x-scrollable.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-tabs"],
    files: [
      {
        path: "delta/tabs.tsx",
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
        path: "delta/qrcode.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "chat",
    type: "registry:ui",
    dependencies: ["lucide-react", "streamdown", "motion"],
    registryDependencies: ["button", "avatar", "textarea", "select"],
    files: [
      {
        path: "examples/chat-demo.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "mapbox-pointer",
    type: "registry:ui",
    files: [
      {
        path: "delta/mapbox-pointer.tsx",
        type: "registry:ui",
      },
    ],
    meta: {
      badge: "coming soon",
      hide: false,
    },
  },
  {
    name: "x-card",
    type: "registry:ui",
    dependencies: ["react-tweet"],
    files: [
      {
        path: "delta/x-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "marquee",
    type: "registry:ui",
    files: [
      {
        path: "delta/marquee.tsx",
        type: "registry:ui",
      },
    ],
    meta: {
      badge: "coming soon",
      hide: false,
    },
  },
]
