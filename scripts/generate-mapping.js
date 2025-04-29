#!/usr/bin/env node

/**
 * This script generates the mapping.ts file that imports all MDX files from content/docs
 * and content/docs/ui, making it easier to maintain as new documentation is added.
 * 
 * Run this script before building the application.
 */

const fs = require('fs');
const path = require('path');

// Paths
const docsDir = path.join(process.cwd(), 'content', 'docs');
const uiDocsDir = path.join(process.cwd(), 'content', 'docs', 'ui');
const outputFile = path.join(process.cwd(), 'delta', 'mapping.ts');

// Generate imports and registry entries
function generateMappingFile() {
  try {
    // Read regular doc files
    const docFiles = fs.readdirSync(docsDir)
      .filter(file => file.endsWith('.mdx') && !file.includes('index.mdx'))
      .filter(file => !file.includes('.tsx.mdx') && file !== 'ui');

    // Read UI component doc files
    const uiDocFiles = fs.readdirSync(uiDocsDir)
      .filter(file => file.endsWith('.mdx'))
      .filter(file => !file.includes('.tsx.mdx') && file.trim() !== '');

    // Generate imports
    let imports = '// Generated file - do not edit directly\n\n';
    imports += '// Regular documentation\n';
    
    docFiles.forEach(file => {
      const componentName = file.replace('.mdx', '');
      const varName = componentName
        .split('-')
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
        
      imports += `import * as ${varName} from '@/content/docs/${file}';\n`;
    });
    
    imports += '\n// UI Components\n';
    
    uiDocFiles.forEach(file => {
      const componentName = file.replace('.mdx', '');
      const varName = componentName
        .split('-')
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'Doc';
        
      imports += `import * as ${varName} from '@/content/docs/ui/${file}';\n`;
    });
    
    // Generate registry object
    imports += '\n// Registry of all components and documentation\n';
    imports += 'export const componentRegistry = {\n';
    
    // Add regular docs
    imports += '  // Regular documentation\n';
    docFiles.forEach(file => {
      const componentName = file.replace('.mdx', '');
      const varName = componentName
        .split('-')
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
        
      imports += `  "${componentName}": ${varName},\n`;
    });
    
    // Add UI components
    imports += '\n  // UI Components\n';
    uiDocFiles.forEach(file => {
      const componentName = file.replace('.mdx', '');
      const varName = componentName
        .split('-')
        .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
        .join('') + 'Doc';
        
      imports += `  "${componentName}": ${varName},\n`;
    });
    
    imports += '};\n\n';
    imports += 'export type ComponentName = keyof typeof componentRegistry;\n';
    
    // Write the file
    fs.writeFileSync(outputFile, imports, 'utf8');
    console.log(`✅ Successfully generated ${outputFile}`);
  } catch (error) {
    console.error('Error generating mapping file:', error);
    process.exit(1);
  }
}

generateMappingFile(); 