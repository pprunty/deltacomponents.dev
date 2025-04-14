#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Get component name from command line argument
const componentName = process.argv[2];
if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Convert component name to proper case
const componentNamePascal = componentName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

// Define paths
const paths = {
  ui: path.join(process.cwd(), 'delta/components'),
  examples: path.join(process.cwd(), 'delta/examples'),
  demos: path.join(process.cwd(), 'delta/demos.ts'),
  mapping: path.join(process.cwd(), 'delta/mapping.ts'),
  page: path.join(process.cwd(), 'app/docs/[[...slug]]/page.tsx'),
  docs: path.join(process.cwd(), 'content/docs'),
};

// Files to delete
const filesToDelete = [
  path.join(paths.ui, `${componentName}.tsx`),
  path.join(paths.examples, `${componentName}-basic-demo.tsx`),
  path.join(paths.docs, `${componentName}.mdx`),
];

// Delete files
filesToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted ${file}`);
  } else {
    console.log(`File ${file} does not exist`);
  }
});

// Update demos.ts
let demosContent = fs.readFileSync(paths.demos, 'utf8');

// Remove import statement
const importPattern = new RegExp(`import\\s*{\\s*${componentNamePascal}BasicDemo\\s*}\\s*from\\s*"@/delta/examples/${componentName}-basic-demo".*\n`, 'g');
demosContent = demosContent.replace(importPattern, '');

// Remove component from demoComponents object
const exportPattern = new RegExp(`\\s*${componentNamePascal}BasicDemo,.*\n`, 'g');
demosContent = demosContent.replace(exportPattern, '');

fs.writeFileSync(paths.demos, demosContent);
console.log('Updated demos.ts');

// Update mapping.ts
let mappingContent = fs.readFileSync(paths.mapping, 'utf8');

// Remove import statement
const mappingImportPattern = new RegExp(`import\\s*\\*\\s*as\\s*${componentNamePascal}Doc\\s*from\\s*"@/content/docs/${componentName}.mdx".*\n`, 'g');
mappingContent = mappingContent.replace(mappingImportPattern, '');

// Remove component from componentRegistry object
const mappingExportPattern = new RegExp(`\\s*"${componentName}":\\s*${componentNamePascal}Doc,.*\n`, 'g');
mappingContent = mappingContent.replace(mappingExportPattern, '');

fs.writeFileSync(paths.mapping, mappingContent);
console.log('Updated mapping.ts');

// Update page.tsx
let pageContent = fs.readFileSync(paths.page, 'utf8');

// Remove import statement
const pageImportPattern = new RegExp(`import\\s*\\*\\s*as\\s*${componentNamePascal}Doc\\s*from\\s*"@/content/docs/${componentName}.mdx".*\n`, 'g');
pageContent = pageContent.replace(pageImportPattern, '');

fs.writeFileSync(paths.page, pageContent);
console.log('Updated page.tsx');

console.log(`Successfully deleted ${componentName} component and all associated files!`); 