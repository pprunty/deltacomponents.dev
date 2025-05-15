"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocks = void 0;
// Simplified module
exports.blocks = [
    {
        name: "smart-form",
        type: "registry:block",
        dependencies: ["zod", "utils"],
        registryDependencies: [
            "text-input",
            "checkbox-input",
            "select-input",
            "radio-input",
            "switch-input",
            "textarea-input",
            "date-input",
            "file-input",
            "otp-input",
            "tags-input"
        ],
        tags: ["form", "dynamic", "smart", "validation", "reactive", "data collection", "AI"],
        files: [
            {
                path: "blocks/smart-form.tsx",
                type: "registry:block",
            },
        ],
    },
];
exports.default = exports.blocks;
