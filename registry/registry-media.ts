import type { Registry } from "@/registry/schema"

export const media: Registry = [
  {
    name: "qr-code",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "media/qr-code.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "spotify",
    type: "registry:component",
    tags: ["spotify", "audio", "media", "component"],
    registryDependencies: [],
    files: [
      {
        path: "media/spotify.tsx",
        type: "registry:component",
      },
    ],
  },
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
    name: "code-snippet",
    type: "registry:component",
    dependencies: ["prism-react-renderer", "lucide-react"],
    registryDependencies: ["button"],
    tags: [
      "syntax highlighting",
      "code",
      "copyable",
      "lightweight",
      "developer",
    ],
    files: [
      {
        path: "media/code-snippet.tsx",
        type: "registry:component",
      },
      {
        path: "media/copy-button.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "latex",
    type: "registry:component",
    dependencies: ["react-katex", "katex"],
    registryDependencies: [],
    tags: [
      "latex",
      "math",
      "mathematical",
      "equations",
      "katex",
      "typography",
      "scientific",
      "academic",
    ],
    files: [
      {
        path: "media/latex.tsx",
        type: "registry:component",
      },
    ],
  },
]
