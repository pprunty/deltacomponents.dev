"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
// Simplified module
exports.components = [
    {
        name: "backdrop-gradient",
        type: "registry:component",
        dependencies: ["tailwindcss"],
        registryDependencies: [],
        tags: ["effect", "image", "blur", "gradient", "background", "filter"],
        files: [
            {
                path: "components/backdrop-gradient.tsx",
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
                path: "components/retro-video-player.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "code-block",
        type: "registry:component",
        dependencies: ["shikiji", "next-themes", "@phosphor-icons/react", "lucide-react"],
        registryDependencies: ["button"],
        tags: ["syntax highlighting", "code", "copyable", "expandable", "theme-aware", "developer"],
        files: [
            {
                path: "components/code-block.tsx",
                type: "registry:component",
            },
            {
                path: "components/code-block.css",
                type: "registry:component",
            },
        ],
    },
    {
        name: "drawer",
        type: "registry:component",
        dependencies: ["vaul", "class-variance-authority"],
        registryDependencies: [],
        tags: ["overlay", "panel", "slide", "bottom sheet", "dialog", "mobile", "responsive"],
        files: [
            {
                path: "components/drawer.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "modal",
        type: "registry:component",
        dependencies: ["framer-motion", "@phosphor-icons/react"],
        registryDependencies: [],
        tags: ["dialog", "popup", "overlay", "animated", "accessible", "responsive"],
        files: [
            {
                path: "components/modal.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "tabs",
        type: "registry:component",
        dependencies: [],
        registryDependencies: ["x-scrollable"],
        tags: ["navigation", "tabs", "interactive", "animated", "scrollable", "content switcher"],
        files: [
            {
                path: "components/tabs.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "x-scrollable",
        type: "registry:component",
        dependencies: [],
        registryDependencies: [],
        tags: ["scroll", "horizontal", "container", "utility", "overflow", "layout"],
        files: [
            {
                path: "components/x-scrollable.tsx",
                type: "registry:component",
            },
        ],
    },
];
exports.default = exports.components;
