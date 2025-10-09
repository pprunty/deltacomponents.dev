import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
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
    name: "orb",
    type: "registry:ui",
    dependencies: [
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "@types/three",
    ],
    files: [
      {
        path: "ui/orb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "waveform",
    type: "registry:ui",
    files: [
      {
        path: "ui/waveform.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "live-waveform",
    type: "registry:ui",
    files: [
      {
        path: "ui/live-waveform.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shimmering-text",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/shimmering-text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "audio-player",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slider"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/audio-player.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "message",
    type: "registry:ui",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["avatar"],
    files: [
      {
        path: "ui/message.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "conversation",
    type: "registry:ui",
    dependencies: ["use-stick-to-bottom"],
    registryDependencies: ["button"],
    files: [
      {
        path: "ui/conversation.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "response",
    type: "registry:ui",
    dependencies: ["streamdown"],
    files: [
      {
        path: "ui/response.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "bar-visualizer",
    type: "registry:ui",
    files: [
      {
        path: "ui/bar-visualizer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "voice-picker",
    type: "registry:ui",
    dependencies: ["@elevenlabs/elevenlabs-js"],
    registryDependencies: [
      "button",
      "badge",
      "command",
      "popover",
      "https://deltacomponents.dev/r/orb.json",
      "https://deltacomponents.dev/r/audio-player.json",
    ],
    files: [
      {
        path: "ui/voice-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "voice-button",
    type: "registry:ui",
    registryDependencies: [
      "button",
      "https://deltacomponents.dev/r/live-waveform.json",
    ],
    files: [
      {
        path: "ui/voice-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "conversation-bar",
    type: "registry:ui",
    registryDependencies: [
      "button",
      "https://deltacomponents.dev/r/live-waveform.json",
      "card",
      "separator",
      "textarea",
    ],
    dependencies: ["@elevenlabs/react"],
    files: [
      {
        path: "ui/conversation-bar.tsx",
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
]
