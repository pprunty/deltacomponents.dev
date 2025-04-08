#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Get component type, name and category from command line arguments
const componentType = process.argv[2]; // component, block, page, lib, hook, demo
const componentName = process.argv[3];
const demoName = componentType === 'demo' ? process.argv[4] : null; // Only used for demo type
const category = componentType === 'demo'
  ? (process.argv[5] || 'components')
  : (process.argv[4] || 'components'); // Default to "components" if no category provided

// Validate arguments
if (!componentType || !componentName || (componentType === 'demo' && !demoName)) {
  console.error(
    'Usage: node add.js [component|block|page|lib|hook|demo] [name] [demo-name (if type is demo)] [category]',
  );
  console.error('Example: node add.js component button custom-theme');
  console.error('Example: node add.js demo button variant-primary custom-theme');
  console.error('If category is omitted, "components" will be used as default');
  process.exit(1);
}

// Validate component type
const validTypes = ['component', 'block', 'page', 'lib', 'hook', 'demo'];
if (!validTypes.includes(componentType)) {
  console.error(`Invalid type. Choose from: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Convert component name to proper case
const componentNamePascal = componentName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

// Define registry type based on component type
const getRegistryType = (type) => {
  const typeMappings = {
    'component': 'registry:component',
    'block': 'registry:block',
    'page': 'registry:page',
    'lib': 'registry:lib',
    'hook': 'registry:hook'
  };
  return typeMappings[type] || `registry:${type}`;
};

const registryType = getRegistryType(componentType);

// Define paths
const paths = {
  ui: path.join(process.cwd(), 'registry/ui'),
  delta: path.join(process.cwd(), 'delta'),
  examples: path.join(process.cwd(), 'registry/examples'),
  demos: path.join(process.cwd(), 'registry/demos.ts'),
  mapping: path.join(process.cwd(), 'registry/mapping.ts'),
  page: path.join(process.cwd(), 'app/docs/[[...slug]]/page.tsx'),
  docs: path.join(process.cwd(), 'content/docs'),
  registryJson: path.join(process.cwd(), 'registry.json'),
  components: path.join(process.cwd(), 'components.json'),
  registryComponents: path.join(process.cwd(), 'lib/registry-components.tsx'),
};

// Handle creating a demo file for an existing component
if (componentType === 'demo') {
  // Convert component name to proper case
  const componentNamePascal = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Convert demo name to proper case
  const demoNamePascal = demoName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Check if component exists in the specified category
  let componentPath = '';

  if (category === 'components') {
    componentPath = path.join(paths.ui, `${componentName}.tsx`);
  } else {
    componentPath = path.join(paths.delta, category, `${componentName}.tsx`);
  }

  if (!fs.existsSync(componentPath)) {
    console.error(`Component ${componentName} does not exist in category ${category}`);
    console.error(`Looking for component at: ${componentPath}`);
    process.exit(1);
  }

  console.log(`Creating demo "${demoName}" for existing component "${componentName}" in category "${category}"`);

  // Create demo file path and content
  let demoFilePath = '';
  let demoFileContent = '';

  if (category === 'components') {
    // Make sure the examples directory exists
    fs.mkdirSync(paths.examples, { recursive: true });

    // For standard components
    demoFilePath = path.join(paths.examples, `${componentName}-${demoName}-demo.tsx`);
    demoFileContent = `"use client"

import ${componentNamePascal} from "@/registry/ui/${componentName}"

export default function ${componentNamePascal}${demoNamePascal}Demo() {
  return (
    <div className="flex items-center justify-center p-4 border rounded-lg">
      <${componentNamePascal} variant="${demoName}">
        ${componentNamePascal} with ${demoNamePascal} variant
      </${componentNamePascal}>
    </div>
  )
}
`;
  } else {
    // Make sure the category directory exists
    fs.mkdirSync(path.join(paths.delta, category), { recursive: true });

    // For custom category components
    demoFilePath = path.join(paths.delta, category, `${componentName}-${demoName}-demo.tsx`);
    demoFileContent = `import ${componentNamePascal} from "./${componentName}";

export default function ${componentNamePascal}${demoNamePascal}Demo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: ${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} (${demoName})</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <${componentNamePascal} variant="${demoName}">
          ${componentNamePascal} with ${demoNamePascal} variant
        </${componentNamePascal}>
      </div>
    </div>
  );
}
`;
  }

  console.log(`Writing demo file to: ${demoFilePath}`);

  // Write demo file
  fs.writeFileSync(demoFilePath, demoFileContent);
  console.log(`Created: ${demoFilePath}`);

  // Update demos.ts for standard components
  if (category === 'components' && fs.existsSync(paths.demos)) {
    const demosContent = fs.readFileSync(paths.demos, 'utf8');

    // Check if the demo already exists in demos.ts
    if (demosContent.includes(`${componentNamePascal}${demoNamePascal}Demo`)) {
      console.log(`Demo ${demoName} for component ${componentName} already exists in demos.ts`);
    } else {
      const [importSection, exportSection] = demosContent.split('export const demoComponents = {');

      // Clean up any extra newlines in the import section
      const cleanImportSection = importSection.trim() + '\n';
      const newImportSection = `${cleanImportSection}import ${componentNamePascal}${demoNamePascal}Demo from "@/registry/examples/${componentName}-${demoName}-demo"\n`;

      const exportLines = exportSection.split('\n');
      const lastExportLine = exportLines.findIndex(line => line.includes('} as const'));
      // Add a comma to the previous line if it doesn't have one
      if (!exportLines[lastExportLine - 1].trim().endsWith(',')) {
        exportLines[lastExportLine - 1] = exportLines[lastExportLine - 1].trim() + ',';
      }
      // Add the new component with a comma
      exportLines.splice(lastExportLine, 0, `  ${componentNamePascal}${demoNamePascal}Demo,`);
      const newExportSection = exportLines.join('\n');

      // Ensure the last line before "} as const" has a comma
      const finalExportLines = newExportSection.split('\n');
      const lastLineIndex = finalExportLines.findIndex(line => line.includes('} as const'));
      if (lastLineIndex > 0 && !finalExportLines[lastLineIndex - 1].trim().endsWith(',')) {
        finalExportLines[lastLineIndex - 1] = finalExportLines[lastLineIndex - 1].trim() + ',';
      }
      const finalExportSection = finalExportLines.join('\n');

      const newDemosContent = newImportSection + '\nexport const demoComponents = {' + finalExportSection;
      fs.writeFileSync(paths.demos, newDemosContent);
      console.log(`Updated demos.ts with new demo: ${componentName}-${demoName}-demo`);
    }
  }

  // Update registry.json to include the demo file
  if (fs.existsSync(paths.registryJson)) {
    try {
      const registry = JSON.parse(fs.readFileSync(paths.registryJson, 'utf8'));

      // Find the component in the registry
      const existingItemIndex = registry.items.findIndex(item => item.name === componentName);

      if (existingItemIndex >= 0) {
        // Add the demo file to the component's files array if it doesn't already exist
        const demoFilePath = category === 'components'
          ? `registry/examples/${componentName}-${demoName}-demo.tsx`
          : `delta/${category}/${componentName}-${demoName}-demo.tsx`;

        const demoFileExists = registry.items[existingItemIndex].files.some(
          file => file.path === demoFilePath
        );

        if (!demoFileExists) {
          registry.items[existingItemIndex].files.push({
            path: demoFilePath,
            type: registry.items[existingItemIndex].type,
            target: demoFilePath
          });

          fs.writeFileSync(paths.registryJson, JSON.stringify(registry, null, 2));
          console.log(`Updated registry.json with new demo file: ${demoFilePath}`);
        }
      } else {
        console.warn(`Component ${componentName} not found in registry.json`);
      }
    } catch (error) {
      console.error('Error updating registry.json:', error);
    }
  }

  // Update registry-components.tsx to include the demo
  if (fs.existsSync(paths.registryComponents)) {
    const importStatement = category === 'components'
      ? `import ${componentNamePascal}${demoNamePascal}Demo from "@/registry/examples/${componentName}-${demoName}-demo"`
      : `import ${componentNamePascal}${demoNamePascal}Demo from "@/delta/${category}/${componentName}-${demoName}-demo"`;

    const componentEntry = `  "${componentName}-${demoName}": {\n    component: ${componentNamePascal}${demoNamePascal}Demo,\n  },`;

    const content = fs.readFileSync(paths.registryComponents, 'utf8');

    // Check if the demo already exists
    if (content.includes(`"${componentName}-${demoName}"`)) {
      console.log(`Demo ${demoName} for component ${componentName} already exists in registry-components.tsx`);
    } else {
      // Add import at the appropriate location (after the last import)
      let updatedContent = content;
      const lastImportIndex = content.lastIndexOf('import');
      const lastImportEndIndex = content.indexOf('\n', lastImportIndex);

      if (lastImportIndex !== -1) {
        updatedContent =
          content.slice(0, lastImportEndIndex + 1) +
          importStatement +
          '\n' +
          content.slice(lastImportEndIndex + 1);
      }

      // Add component to registry object
      const registryStartIndex = updatedContent.indexOf('export const registry');
      const registryOpenBraceIndex = updatedContent.indexOf(
        '{',
        registryStartIndex,
      );
      const registryCloseBraceIndex = updatedContent.lastIndexOf('}');

      if (
        registryStartIndex !== -1 &&
        registryOpenBraceIndex !== -1 &&
        registryCloseBraceIndex !== -1
      ) {
        // Check if registry is empty
        const isEmptyRegistry =
          updatedContent
            .substring(registryOpenBraceIndex + 1, registryCloseBraceIndex)
            .trim() === '';

        if (isEmptyRegistry) {
          updatedContent =
            updatedContent.slice(0, registryOpenBraceIndex + 1) +
            '\n' +
            componentEntry +
            '\n' +
            updatedContent.slice(registryCloseBraceIndex);
        } else {
          updatedContent =
            updatedContent.slice(0, registryCloseBraceIndex) +
            (updatedContent[registryCloseBraceIndex - 1] === ',' ? '' : ',') +
            '\n' +
            componentEntry +
            updatedContent.slice(registryCloseBraceIndex);
        }
      }

      fs.writeFileSync(paths.registryComponents, updatedContent);
      console.log(`Updated: ${paths.registryComponents} with demo: ${componentName}-${demoName}`);
    }
  }

  console.log(`
Demo "${demoName}" has been added for component "${componentName}" in category "${category}"!

Next steps:
1. Edit the demo file: ${category === 'components'
  ? `registry/examples/${componentName}-${demoName}-demo.tsx`
  : `delta/${category}/${componentName}-${demoName}-demo.tsx`}
2. Make sure your component supports the "${demoName}" variant or props
`);
  process.exit(0);
}

// Create category directory path
const categoryPath = path.join(paths.delta, category);
fs.mkdirSync(categoryPath, { recursive: true });
console.log(`Using category: ${category}`);

// Determine file paths based on component type
let filePath = '';
let demoFilePath = '';
let fileContent = '';
let demoFileContent = '';

// Generate file content based on component type
switch (componentType) {
  case 'component':
    filePath = path.join(categoryPath, `${componentName}.tsx`);
    demoFilePath = path.join(categoryPath, `${componentName}-demo.tsx`);
    fileContent = `export default function ${componentNamePascal}() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-medium">${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}</h2>
      <p>Your component content here</p>
    </div>
  );
}
`;
    demoFileContent = `import ${componentNamePascal} from "./${componentName}";

export default function ${componentNamePascal}Demo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: ${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')}</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <${componentNamePascal} />
      </div>
    </div>
  );
}
`;
    break;
  case 'block':
    filePath = path.join(categoryPath, `${componentName}-block.tsx`);
    demoFilePath = path.join(categoryPath, `${componentName}-block-demo.tsx`);
    fileContent = `export default function ${componentNamePascal}Block() {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} Block</h2>
      <div className="grid gap-4">
        <p>Your block content here</p>
      </div>
    </div>
  );
}
`;
    demoFileContent = `import ${componentNamePascal}Block from "./${componentName}-block";

export default function ${componentNamePascal}BlockDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: ${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} Block</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <${componentNamePascal}Block />
      </div>
    </div>
  );
}
`;
    break;
  case 'page':
    filePath = path.join(categoryPath, `${componentName}-page.tsx`);
    fileContent = `export default function ${componentNamePascal}Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">${componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')} Page</h1>
      <div className="p-4 border rounded">
        <p>Your page content here</p>
      </div>
    </div>
  );
}
`;
    break;
  case 'lib':
    filePath = path.join(categoryPath, `${componentName}.ts`);
    fileContent = `// Utility functions for ${componentName}

export default function sampleFunction() {
  return 'Sample return value';
}

export function anotherFunction(param: string) {
  return \`Processed: \${param}\`;
}
`;
    break;
  case 'hook':
    filePath = path.join(categoryPath, `use-${componentName}.ts`);
    fileContent = `"use client"

import { useState, useEffect } from 'react';

export default function use${componentNamePascal}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Add your hook logic here
    console.log('Hook initialized');
  }, []);

  return state;
}
`;
    break;
}

// Write files
fs.writeFileSync(filePath, fileContent);
console.log(`Created: ${filePath}`);

// Create demo file for components and blocks
if (componentType === 'component' || componentType === 'block') {
  fs.writeFileSync(demoFilePath, demoFileContent);
  console.log(`Created: ${demoFilePath}`);
}

// For classic components, also update the shadcn registry
if (componentType === 'component' && category === 'components') {
  // Create MDX file for documentation
  const mdxContent = `# ${componentNamePascal}

A ${componentName} component.

## Basic Usage

<ComponentTabs name="${componentName}-basic" />

## Installation

\`\`\`bash
npx shadcn@latest add "${componentName}"
\`\`\`

## Props

<div className="my-6 w-full overflow-y-auto">
  <table className="w-full">
    <thead>
      <tr className="m-0 border-t p-0 even:bg-muted">
        <th className="border px-4 py-2 text-left font-bold">Prop</th>
        <th className="border px-4 py-2 text-left font-bold">Type</th>
        <th className="border px-4 py-2 text-left font-bold">Default</th>
        <th className="border px-4 py-2 text-left font-bold">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr className="m-0 border-t p-0 even:bg-muted">
        <td className="border px-4 py-2 text-left">\`children\`</td>
        <td className="border px-4 py-2 text-left">\`ReactNode\`</td>
        <td className="border px-4 py-2 text-left">-</td>
        <td className="border px-4 py-2 text-left">The content to display</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  // Create the standard shadcn files
  const uiComponentContent = `"use client"

export default function ${componentNamePascal}() {
  return (
    <div>
      <div>
        ${componentNamePascal} Component
      </div>
    </div>
  )
}
`;

  const exampleComponentContent = `"use client"

import ${componentNamePascal} from "@/registry/ui/${componentName}"

export default function ${componentNamePascal}BasicDemo() {
  return (
    <div className="flex items-center justify-center p-4 border rounded-lg">
      <${componentNamePascal} />
    </div>
  )
}
`;

  // Create directories if they don't exist
  fs.mkdirSync(paths.ui, { recursive: true });
  fs.mkdirSync(paths.examples, { recursive: true });
  fs.mkdirSync(paths.docs, { recursive: true });

  // Write shadcn structure files
  fs.writeFileSync(path.join(paths.ui, `${componentName}.tsx`), uiComponentContent);
  fs.writeFileSync(path.join(paths.examples, `${componentName}-basic-demo.tsx`), exampleComponentContent);
  fs.writeFileSync(path.join(paths.docs, `${componentName}.mdx`), mdxContent);

  // Update demos.ts if it exists
  if (fs.existsSync(paths.demos)) {
    const demosContent = fs.readFileSync(paths.demos, 'utf8');

    // Check if the component already exists in demos.ts
    if (demosContent.includes(`${componentNamePascal}BasicDemo`)) {
      console.log(`Component ${componentName} demo already exists in demos.ts`);
    } else {
      const [importSection, exportSection] = demosContent.split('export const demoComponents = {');

      // Clean up any extra newlines in the import section
      const cleanImportSection = importSection.trim() + '\n';
      const newImportSection = `${cleanImportSection}import ${componentNamePascal}BasicDemo from "@/registry/examples/${componentName}-basic-demo"\n`;

      const exportLines = exportSection.split('\n');
      const lastExportLine = exportLines.findIndex(line => line.includes('} as const'));
      // Add a comma to the previous line if it doesn't have one
      if (!exportLines[lastExportLine - 1].trim().endsWith(',')) {
        exportLines[lastExportLine - 1] = exportLines[lastExportLine - 1].trim() + ',';
      }
      // Add the new component with a comma
      exportLines.splice(lastExportLine, 0, `  ${componentNamePascal}BasicDemo,`);
      const newExportSection = exportLines.join('\n');

      // Ensure the last line before "} as const" has a comma
      const finalExportLines = newExportSection.split('\n');
      const lastLineIndex = finalExportLines.findIndex(line => line.includes('} as const'));
      if (lastLineIndex > 0 && !finalExportLines[lastLineIndex - 1].trim().endsWith(',')) {
        finalExportLines[lastLineIndex - 1] = finalExportLines[lastLineIndex - 1].trim() + ',';
      }
      const finalExportSection = finalExportLines.join('\n');

      const newDemosContent = newImportSection + '\nexport const demoComponents = {' + finalExportSection;
      fs.writeFileSync(paths.demos, newDemosContent);
    }

    // Update mapping.ts if it exists
    if (fs.existsSync(paths.mapping)) {
      const mappingContent = fs.readFileSync(paths.mapping, 'utf8');

      // First, check if the file already has the component
      if (mappingContent.includes(`"${componentName}": ${componentNamePascal}Doc`)) {
        console.log(`Component ${componentName} already exists in mapping.ts`);
      } else {
        // Add the import
        let updatedContent = mappingContent;

        // Add the import at the end of imports section
        const importEndIndex = mappingContent.indexOf('export const componentRegistry');
        if (importEndIndex !== -1) {
          const beforeImports = mappingContent.substring(0, importEndIndex).trim();
          const afterImports = mappingContent.substring(importEndIndex);

          updatedContent = `${beforeImports}\nimport * as ${componentNamePascal}Doc from "@/content/docs/${componentName}.mdx"\n\n${afterImports}`;
        }

        // Add the component to the registry
        const registryEndIndex = updatedContent.lastIndexOf('}');
        if (registryEndIndex !== -1) {
          // Check if the last entry in the registry has a comma
          const beforeRegistryEnd = updatedContent.substring(0, registryEndIndex).trim();
          const afterRegistryEnd = updatedContent.substring(registryEndIndex);

          // If the last line doesn't end with a comma, add one
          const lastLineBeforeEnd = beforeRegistryEnd.split('\n').pop();
          let newComponentEntry = `  "${componentName}": ${componentNamePascal}Doc,`;

          if (lastLineBeforeEnd && !lastLineBeforeEnd.trim().endsWith(',')) {
            newComponentEntry = `,\n${newComponentEntry}`;
          } else {
            newComponentEntry = `\n${newComponentEntry}`;
          }

          updatedContent = `${beforeRegistryEnd}${newComponentEntry}${afterRegistryEnd}`;
        }

        fs.writeFileSync(paths.mapping, updatedContent);
      }
    }

    // Update page.tsx if it exists
    if (fs.existsSync(paths.page)) {
      const pageContent = fs.readFileSync(paths.page, 'utf8');
      if (!pageContent.includes(`import * as ${componentNamePascal}Doc from "@/content/docs/${componentName}.mdx"`)) {
        const newPageContent = pageContent.replace(
          'import * as ButtonDoc from "@/content/docs/button.mdx"',
          `import * as ButtonDoc from "@/content/docs/button.mdx"\nimport * as ${componentNamePascal}Doc from "@/content/docs/${componentName}.mdx"`
        );
        fs.writeFileSync(paths.page, newPageContent);
      }
    }
  }
}

// Update registry.json
if (fs.existsSync(paths.registryJson)) {
  try {
    const registry = JSON.parse(fs.readFileSync(paths.registryJson, 'utf8'));

    // Check if component already exists in registry
    const existingItemIndex = registry.items.findIndex(item => item.name === componentName);

    // Create files array for registry based on component type
    let files = [];

    if (componentType === 'component') {
      if (category === 'components') {
        // For standard components in the components category
        files = [
          {
            path: `registry/ui/${componentName}.tsx`,
            type: registryType,
            target: `registry/ui/${componentName}.tsx`
          },
          {
            path: `registry/examples/${componentName}-basic-demo.tsx`,
            type: registryType,
            target: `registry/examples/${componentName}-basic-demo.tsx`
          },
          {
            path: `content/docs/${componentName}.mdx`,
            type: registryType,
            target: `content/docs/${componentName}.mdx`
          }
        ];
      } else {
        // For custom category components
        files = [
          {
            path: `delta/${category}/${componentName}.tsx`,
            type: registryType,
            target: `delta/${category}/${componentName}.tsx`
          },
          {
            path: `delta/${category}/${componentName}-demo.tsx`,
            type: registryType,
            target: `delta/${category}/${componentName}-demo.tsx`
          }
        ];
      }
    } else if (componentType === 'block') {
      files = [
        {
          path: `delta/${category}/${componentName}-block.tsx`,
          type: registryType,
          target: `delta/${category}/${componentName}-block.tsx`
        },
        {
          path: `delta/${category}/${componentName}-block-demo.tsx`,
          type: registryType,
          target: `delta/${category}/${componentName}-block-demo.tsx`
        }
      ];
    } else if (componentType === 'page') {
      files = [
        {
          path: `delta/${category}/${componentName}-page.tsx`,
          type: registryType,
          target: `delta/${category}/${componentName}-page.tsx`
        }
      ];
    } else if (componentType === 'lib') {
      files = [
        {
          path: `delta/${category}/${componentName}.ts`,
          type: registryType,
          target: `delta/${category}/${componentName}.ts`
        }
      ];
    } else if (componentType === 'hook') {
      files = [
        {
          path: `delta/${category}/use-${componentName}.ts`,
          type: registryType,
          target: `delta/${category}/use-${componentName}.ts`
        }
      ];
    }

    // Create new registry item
    const newItem = {
      name: componentName,
      type: registryType,
      title: componentName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      description: `A ${componentType} for ${componentName}`,
      dependencies: [],
      registryDependencies: [],
      files: files
    };

    if (existingItemIndex >= 0) {
      // Update existing item
      registry.items[existingItemIndex] = newItem;
      console.log(`Updated existing ${componentType} in registry.json: ${componentName}`);
    } else {
      // Add new item
      registry.items.push(newItem);
      console.log(`Added ${componentType} to registry.json: ${componentName}`);
    }

    // Write updated registry
    fs.writeFileSync(paths.registryJson, JSON.stringify(registry, null, 2));
  } catch (error) {
    console.error('Error updating registry.json:', error);
  }
} else {
  console.log('registry.json not found. Creating a new one.');

  // Create a new registry.json with this component
  let files = [];

 if (componentType === 'component') {
     if (category === 'components') {
       // For standard components in the components category
       files = [
         {
           path: `registry/ui/${componentName}.tsx`,
           type: registryType,
           target: `registry/ui/${componentName}.tsx`
         },
         {
           path: `registry/examples/${componentName}-basic-demo.tsx`,
           type: registryType,
           target: `registry/examples/${componentName}-basic-demo.tsx`
         },
         {
           path: `content/docs/${componentName}.mdx`,
           type: registryType,
           target: `content/docs/${componentName}.mdx`
         }
       ];
     } else {
       // For custom category components
       files = [
         {
           path: `delta/${category}/${componentName}.tsx`,
           type: registryType,
           target: `delta/${category}/${componentName}.tsx`
         },
         {
           path: `delta/${category}/${componentName}-demo.tsx`,
           type: registryType,
           target: `delta/${category}/${componentName}-demo.tsx`
         }
       ];
     }
   } else if (componentType === 'block') {
     files = [
       {
         path: `delta/${category}/${componentName}-block.tsx`,
         type: registryType,
         target: `delta/${category}/${componentName}-block.tsx`
       },
       {
         path: `delta/${category}/${componentName}-block-demo.tsx`,
         type: registryType,
         target: `delta/${category}/${componentName}-block-demo.tsx`
       }
     ];
   } else if (componentType === 'page') {
     files = [
       {
         path: `delta/${category}/${componentName}-page.tsx`,
         type: registryType,
         target: `delta/${category}/${componentName}-page.tsx`
       }
     ];
   } else if (componentType === 'lib') {
     files = [
       {
         path: `delta/${category}/${componentName}.ts`,
         type: registryType,
         target: `delta/${category}/${componentName}.ts`
       }
     ];
   } else if (componentType === 'hook') {
     files = [
       {
         path: `delta/${category}/use-${componentName}.ts`,
         type: registryType,
         target: `delta/${category}/use-${componentName}.ts`
       }
     ];
   }

   const registry = {
     items: [
       {
         name: componentName,
         type: registryType,
         title: componentName
           .split('-')
           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
           .join(' '),
         description: `A ${componentType} for ${componentName}`,
         dependencies: [],
         registryDependencies: [],
         files: files
       }
     ]
   };

   fs.writeFileSync(paths.registryJson, JSON.stringify(registry, null, 2));
   console.log(`Created new registry.json with ${componentType}: ${componentName}`);
 }

 // Update components.json for shadcn (only for regular components in components category)
 if (componentType === 'component' && category === 'components') {
   if (fs.existsSync(paths.components)) {
     try {
       const components = JSON.parse(fs.readFileSync(paths.components, 'utf8'));

       // Add the component to components.json if it doesn't exist
       if (!components.components.includes(componentName)) {
         components.components.push(componentName);
         fs.writeFileSync(paths.components, JSON.stringify(components, null, 2));
         console.log(`Added ${componentName} to components.json`);
       }
     } catch (error) {
       console.error('Error updating components.json:', error);
     }
   } else {
     // Create a basic components.json if it doesn't exist
     const components = {
       "$schema": "https://ui.shadcn.com/schema.json",
       "style": "default",
       "rsc": true,
       "tsx": true,
       "tailwind": {
         "config": "tailwind.config.js",
         "css": "app/globals.css",
         "baseColor": "slate",
         "cssVariables": true
       },
       "aliases": {
         "components": "@/components",
         "utils": "@/lib/utils"
       },
       "components": [componentName]
     };

     fs.writeFileSync(paths.components, JSON.stringify(components, null, 2));
     console.log(`Created components.json with component: ${componentName}`);
   }
 }

 // Update registry-components.tsx
 if (fs.existsSync(paths.registryComponents)) {
   let importStatement = '';
   let componentEntry = '';

   // Different handling based on component type
   if (componentType === 'component') {
     importStatement = `import ${componentNamePascal}Demo from "@/delta/${category}/${componentName}-demo"`;
     componentEntry = `  "${componentName}": {\n    component: ${componentNamePascal}Demo,\n  },`;
   } else if (componentType === 'block') {
     importStatement = `import ${componentNamePascal}BlockDemo from "@/delta/${category}/${componentName}-block-demo"`;
     componentEntry = `  "${componentName}-block": {\n    component: ${componentNamePascal}BlockDemo,\n  },`;
   } else if (componentType === 'page') {
     importStatement = `import ${componentNamePascal}Page from "@/delta/${category}/${componentName}-page"`;
     componentEntry = `  "${componentName}-page": {\n    component: ${componentNamePascal}Page,\n  },`;
   } else if (componentType === 'lib' || componentType === 'hook') {
     // For libs and hooks, we don't add to registry components
     console.log(`Note: ${componentType}s are not added to registry-components.tsx`);
   }

   if ((componentType === 'component' || componentType === 'block' || componentType === 'page') &&
       importStatement && componentEntry) {
     const content = fs.readFileSync(paths.registryComponents, 'utf8');

     // Add import at the appropriate location (after the last import)
     let updatedContent = content;
     const lastImportIndex = content.lastIndexOf('import');
     const lastImportEndIndex = content.indexOf('\n', lastImportIndex);

     if (lastImportIndex !== -1) {
       updatedContent =
         content.slice(0, lastImportEndIndex + 1) +
         importStatement +
         '\n' +
         content.slice(lastImportEndIndex + 1);
     }

     // Add component to registry object
     const registryStartIndex = updatedContent.indexOf('export const registry');
     const registryOpenBraceIndex = updatedContent.indexOf(
       '{',
       registryStartIndex,
     );
     const registryCloseBraceIndex = updatedContent.lastIndexOf('}');

     if (
       registryStartIndex !== -1 &&
       registryOpenBraceIndex !== -1 &&
       registryCloseBraceIndex !== -1
     ) {
       // Check if registry is empty
       const isEmptyRegistry =
         updatedContent
           .substring(registryOpenBraceIndex + 1, registryCloseBraceIndex)
           .trim() === '';

       if (isEmptyRegistry) {
         updatedContent =
           updatedContent.slice(0, registryOpenBraceIndex + 1) +
           '\n' +
           componentEntry +
           '\n' +
           updatedContent.slice(registryCloseBraceIndex);
       } else {
         updatedContent =
           updatedContent.slice(0, registryCloseBraceIndex) +
           (updatedContent[registryCloseBraceIndex - 1] === ',' ? '' : ',') +
           '\n' +
           componentEntry +
           updatedContent.slice(registryCloseBraceIndex);
       }
     }

     fs.writeFileSync(paths.registryComponents, updatedContent);
     console.log(`Updated: ${paths.registryComponents}`);
   }
 } else if ((componentType === 'component' || componentType === 'block' || componentType === 'page') &&
            (componentType !== 'lib' && componentType !== 'hook')) {
   // If registry-components.tsx doesn't exist, create it
   let importStatement = '';
   let componentEntry = '';

   if (componentType === 'component') {
     importStatement = `import ${componentNamePascal}Demo from "@/delta/${category}/${componentName}-demo"`;
     componentEntry = `  "${componentName}": {\n    component: ${componentNamePascal}Demo,\n  },`;
   } else if (componentType === 'block') {
     importStatement = `import ${componentNamePascal}BlockDemo from "@/delta/${category}/${componentName}-block-demo"`;
     componentEntry = `  "${componentName}-block": {\n    component: ${componentNamePascal}BlockDemo,\n  },`;
   } else if (componentType === 'page') {
     importStatement = `import ${componentNamePascal}Page from "@/delta/${category}/${componentName}-page"`;
     componentEntry = `  "${componentName}-page": {\n    component: ${componentNamePascal}Page,\n  },`;
   }

   const registryComponentsContent = `import type React from "react"
 // This file will serve as our component registry

 // Import components directly
 ${importStatement}

 // Create a registry object that maps component names to their implementations
 export const registry: Record<string, { component: React.ComponentType }> = {
 ${componentEntry}
 }
 `;

   // Create lib directory if it doesn't exist
   fs.mkdirSync(path.dirname(paths.registryComponents), { recursive: true });

   fs.writeFileSync(paths.registryComponents, registryComponentsContent);
   console.log(`Created: ${paths.registryComponents}`);
 }

 // Run shadcn build command if available
 try {
   console.log('Building registry with shadcn...');
   execSync('npx shadcn build', { stdio: 'inherit' });
 } catch (error) {
   console.warn('Warning: Could not run shadcn build. You may need to run it manually.');
 }

 console.log(`
 ${componentType} "${componentName}" has been added to the registry in category "${category}"!

 Next steps:`);

 if (componentType === 'component') {
   if (category === 'components') {
     console.log(`1. Edit the component file: registry/ui/${componentName}.tsx`);
     console.log(`2. Edit the demo file: registry/examples/${componentName}-basic-demo.tsx`);
     console.log(`3. Edit the docs file: content/docs/${componentName}.mdx`);
   } else {
     console.log(`1. Edit the component file: delta/${category}/${componentName}.tsx`);
     console.log(`2. Edit the demo file: delta/${category}/${componentName}-demo.tsx`);
   }
 } else if (componentType === 'block') {
   console.log(`1. Edit the block file: delta/${category}/${componentName}-block.tsx`);
   console.log(`2. Edit the demo file: delta/${category}/${componentName}-block-demo.tsx`);
 } else if (componentType === 'page') {
   console.log(`1. Edit the page file: delta/${category}/${componentName}-page.tsx`);
 } else if (componentType === 'lib') {
   console.log(`1. Edit the lib file: delta/${category}/${componentName}.ts`);
 } else if (componentType === 'hook') {
   console.log(`1. Edit the hook file: delta/${category}/use-${componentName}.ts`);
 }
