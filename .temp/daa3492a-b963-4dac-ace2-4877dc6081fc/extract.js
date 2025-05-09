
    const fs = require('fs');
    const path = require('path');
    
    // Evaluate the file content in an isolated context
    const registryFile = `import type { Registry } from "@/registry/schema"

export const examples: Registry = [
  {
    name: "use-copy-to-clipboard-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/use-copy-to-clipboard-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "use-interval-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/use-interval-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "use-timeout-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/use-timeout-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "use-document-title-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/use-document-title-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "use-mouse-position-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/use-mouse-position-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
      name: "otp-input-demo",
      type: "registry:example",
      files: [
        {
          path: "examples/otp-input-demo.tsx",
          type: "registry:example",
        },
      ],
    },
    {
        name: "text-input-demo",
        type: "registry:example",
        files: [
          {
            path: "examples/text-input-demo.tsx",
            type: "registry:example",
          },
        ],
      },
          {
              name: "file-input-demo",
              type: "registry:example",
              files: [
                {
                  path: "examples/file-input-demo.tsx",
                  type: "registry:example",
                },
              ],
            },
]
`;
    
    // Replace TypeScript specific syntax
    const jsContent = registryFile
      .replace(/import[^;]*;/g, '')
      .replace(/export /g, '')
      .replace(/: Registry/g, '')
      .replace(/: [a-zA-Z<>[]|]*([])?/g, '');
    
    // Create a context with just the array
    const isolatedCode = `
      const examples = ${jsContent.split('=')[1]};
      fs.writeFileSync(path.join(process.cwd(), 'result.json'), JSON.stringify(examples));
    `;
    
    // Execute the isolated code
    eval(isolatedCode);
    