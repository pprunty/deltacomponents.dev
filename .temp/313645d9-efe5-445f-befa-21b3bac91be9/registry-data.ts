
    // Simplified module
    export const inputs = [  {
    name: "checkbox-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "checkbox", "input", "validation", "selection", "toggle", "accessible"],
    files: [
      {
        path: "inputs/checkbox-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "radio-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "radio", "input", "selection", "options", "accessible", "multiple choice"],
    files: [
      {
        path: "inputs/radio-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "date-input",
    type: "registry:component",
    dependencies: ["zod", "date-fns"],
    registryDependencies: [],
    tags: ["form", "date", "input", "calendar", "time", "datepicker", "validation"],
    files: [
      {
        path: "inputs/date-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "switch-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "switch", "input", "toggle", "on-off", "boolean", "accessible"],
    files: [
      {
        path: "inputs/switch-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "select-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "select", "dropdown", "options", "input", "validation", "choice"],
    files: [
      {
        path: "inputs/select-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "tags-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "tags", "input", "multiple", "chips", "keywords", "interactive"],
    files: [
      {
        path: "inputs/tags-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "textarea-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "textarea", "multiline", "input", "text", "validation", "large text"],
    files: [
      {
        path: "inputs/textarea-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "file-input",
    type: "registry:component",
    dependencies: ["zod", "lucide-react"],
    registryDependencies: [],
    tags: ["form", "file", "upload", "input", "attachment", "drag-and-drop", "validation"],
    files: [
      {
        path: "inputs/file-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "otp-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "otp", "verification", "code", "input", "auth", "secure"],
    files: [
      {
        path: "inputs/otp-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "text-input",
    type: "registry:component",
    dependencies: ["zod"],
    registryDependencies: [],
    tags: ["form", "text", "input", "validation", "single-line", "accessible", "field"],
    files: [
      {
        path: "inputs/text-input.tsx",
        type: "registry:component",
      },
    ],
  }
]
    export default inputs;
    