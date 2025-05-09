
    const fs = require('fs');
    const path = require('path');
    
    // Evaluate the file content in an isolated context
    const registryFile = `import type { Registry } from "@/registry/schema"

export const inputs: Registry = [  {
    name: "file-input",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "inputs/file-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "otp-input",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "inputs/otp-input.tsx",
        type: "registry:component",
      },
    ],
  },  {
    name: "text-input",
    type: "registry:component",
    registryDependencies: [],
    files: [
      {
        path: "inputs/text-input.tsx",
        type: "registry:component",
      },
    ],
  }
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
      const inputs = ${jsContent.split('=')[1]};
      fs.writeFileSync(path.join(process.cwd(), 'result.json'), JSON.stringify(inputs));
    `;
    
    // Execute the isolated code
    eval(isolatedCode);
    