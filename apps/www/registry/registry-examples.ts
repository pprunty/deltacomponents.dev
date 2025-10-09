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
    name: "audio-player-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/audio-player.json",
      "button",
      "card",
      "scroll-area",
    ],
    files: [
      {
        path: "examples/audio-player-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "orb-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/orb.json", "button"],
    files: [
      {
        path: "examples/orb-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "waveform-demo",
    type: "registry:example",
    registryDependencies: ["waveform"],
    files: [
      {
        path: "examples/waveform-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "live-waveform-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/live-waveform.json",
      "button",
    ],
    files: [
      {
        path: "examples/live-waveform-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "bar-visualizer-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/bar-visualizer.json",
      "button",
    ],
    files: [
      {
        path: "examples/bar-visualizer-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/message.json",
      "https://deltacomponents.dev/r/response.json",
    ],
    files: [
      {
        path: "examples/message-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "response-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/response.json"],
    files: [
      {
        path: "examples/response-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "shimmering-text-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/shimmering-text.json",
    ],
    files: [
      {
        path: "examples/shimmering-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "voice-picker-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/voice-picker.json",
      "https://deltacomponents.dev/r/audio-player.json",
    ],
    files: [
      {
        path: "examples/voice-picker-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "voice-button-demo",
    type: "registry:example",
    registryDependencies: ["https://deltacomponents.dev/r/voice-button.json"],
    files: [
      {
        path: "examples/voice-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "conversation-bar-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/conversation-bar.json",
    ],
    files: [
      {
        path: "examples/conversation-bar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "conversation-demo",
    type: "registry:example",
    registryDependencies: [
      "https://deltacomponents.dev/r/message.json",
      "https://deltacomponents.dev/r/response.json",
      "https://deltacomponents.dev/r/conversation.json",
    ],
    files: [
      {
        path: "examples/conversation-demo.tsx",
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
