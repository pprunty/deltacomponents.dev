import type { Registry } from "@/registry/schema"

export const media: Registry = [
  {
    name: "backdrop-gradient",
    type: "registry:component",
    dependencies: ["tailwindcss"],
    registryDependencies: [],
    tags: ["effect", "image", "blur", "gradient", "background", "filter"],
    files: [
      {
        path: "media/backdrop-gradient.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "retro-video-player",
    type: "registry:component",
    dependencies: ["react-rnd", "@phosphor-icons/react"],
    registryDependencies: [],
    tags: ["video", "player", "draggable", "resizable", "retro", "ui", "media"],
    files: [
      {
        path: "media/retro-video-player.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "code-block",
    type: "registry:component",
    dependencies: [
      "shikiji",
      "next-themes",
      "@phosphor-icons/react",
      "lucide-react",
    ],
    registryDependencies: ["button"],
    tags: [
      "syntax highlighting",
      "code",
      "copyable",
      "expandable",
      "theme-aware",
      "developer",
    ],
    files: [
      {
        path: "media/code-block.tsx",
        type: "registry:component",
      },
      {
        path: "media/code-block.css",
        type: "registry:component",
      },
    ],
  },
]
