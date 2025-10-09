#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)
const componentName = args[0]

if (!componentName) {
  console.error('Usage: node scripts/delete-component.js <component-name>')
  process.exit(1)
}

const kebabCase = componentName.toLowerCase().replace(/\s+/g, '-')

// Files to delete
const filesToDelete = [
  // Component files in all possible directories
  path.join(__dirname, '..', 'registry', 'delta-ui', 'ui', `${kebabCase}.tsx`),
  path.join(__dirname, '..', 'registry', 'delta-ui', 'components', `${kebabCase}.tsx`),
  path.join(__dirname, '..', 'registry', 'delta-ui', 'blocks', `${kebabCase}.tsx`),
  
  // Documentation file
  path.join(__dirname, '..', 'content', 'docs', 'components', `${kebabCase}.mdx`),
  
  // Example file
  path.join(__dirname, '..', 'registry', 'delta-ui', 'examples', `${kebabCase}.tsx`),
  
  // Demo file
  path.join(__dirname, '..', 'registry', 'delta-ui', 'examples', `${kebabCase}-demo.tsx`),
]

// Find additional demo files that start with componentName
const examplesDir = path.join(__dirname, '..', 'registry', 'delta-ui', 'examples')
if (fs.existsSync(examplesDir)) {
  try {
    const files = fs.readdirSync(examplesDir)
    const demoFiles = files.filter(file => {
      // Match files that start with kebabCase and contain "demo"
      // Examples: button-demo.tsx, button-demo-advanced.tsx, button-special-demo.tsx
      return file.startsWith(`${kebabCase}-`) && 
             file.includes('demo') && 
             file.endsWith('.tsx')
    })
    
    // Add found demo files to deletion list
    demoFiles.forEach(file => {
      filesToDelete.push(path.join(examplesDir, file))
    })
  } catch (error) {
    console.warn(`⚠️  Could not scan examples directory: ${error.message}`)
  }
}

let deletedFiles = []
let notFoundFiles = []

filesToDelete.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath)
      deletedFiles.push(filePath)
      console.log(`🗑️  Deleted: ${path.relative(__dirname, filePath)}`)
    } catch (error) {
      console.error(`❌ Error deleting ${filePath}:`, error.message)
    }
  } else {
    notFoundFiles.push(filePath)
  }
})

if (deletedFiles.length === 0) {
  console.error(`❌ No files found for component "${kebabCase}"`)
  console.log('\nLooked for files in:')
  filesToDelete.forEach(filePath => {
    console.log(`  - ${path.relative(__dirname, filePath)}`)
  })
  process.exit(1)
}

console.log(`\n✅ Successfully deleted ${deletedFiles.length} file(s) for component "${kebabCase}"`)

if (notFoundFiles.length > 0) {
  console.log(`\n⚠️  Files not found (skipped):`)
  notFoundFiles.forEach(filePath => {
    console.log(`  - ${path.relative(__dirname, filePath)}`)
  })
}

// Check if we should update registry index
// Function to remove component from registry files
function cleanupRegistryReferences(componentName) {
  const registryFiles = [
    path.join(__dirname, '../registry/registry-ui.ts'),
    path.join(__dirname, '../registry/registry-examples.ts'),
    path.join(__dirname, '../registry/registry-blocks.ts')
  ]

  console.log(`\n🧹 Cleaning up registry references for "${componentName}"...`)

  registryFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      try {
        let content = fs.readFileSync(filePath, 'utf-8')
        let modified = false

        // Remove component entry and its demo
        const componentPattern = new RegExp(`\\s*{[^}]*name:\\s*["']${componentName}["'][^}]*},?\\s*`, 'gm')
        const demoPattern = new RegExp(`\\s*{[^}]*name:\\s*["']${componentName}-demo["'][^}]*},?\\s*`, 'gm')
        
        if (componentPattern.test(content)) {
          content = content.replace(componentPattern, '')
          modified = true
          console.log(`   Removed ${componentName} from ${path.basename(filePath)}`)
        }
        
        if (demoPattern.test(content)) {
          content = content.replace(demoPattern, '')
          modified = true
          console.log(`   Removed ${componentName}-demo from ${path.basename(filePath)}`)
        }

        // Remove component.json references from registryDependencies
        const componentJsonPattern = new RegExp(`\\s*["']https://ui\\.elevenlabs\\.io/r/${componentName}\\.json["'],?\\s*`, 'gm')
        if (componentJsonPattern.test(content)) {
          content = content.replace(componentJsonPattern, '')
          modified = true
          console.log(`   Removed ${componentName}.json dependency references`)
        }

        if (modified) {
          fs.writeFileSync(filePath, content)
        }
      } catch (error) {
        console.warn(`   ⚠️  Error cleaning ${path.basename(filePath)}: ${error.message}`)
      }
    }
  })
}

// Function to rebuild registry
function rebuildRegistry() {
  console.log(`\n🔄 Rebuilding registry...`)
  try {
    const { execSync } = require('child_process')
    execSync('npm run registry:build', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log(`✅ Registry rebuild completed`)
    
    // Clean up any remaining JSON files
    const publicDir = path.join(__dirname, '../public/r')
    const jsonFiles = [`${kebabCase}.json`, `${kebabCase}-demo.json`]
    
    jsonFiles.forEach(fileName => {
      const filePath = path.join(publicDir, fileName)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log(`🗑️  Removed: public/r/${fileName}`)
      }
    })
    
  } catch (error) {
    console.error(`❌ Registry rebuild failed:`, error.message)
  }
}

// Clean up registry references
cleanupRegistryReferences(kebabCase)

// Rebuild registry
rebuildRegistry()

console.log(`\n🎉 Component "${kebabCase}" deletion completed!`)
console.log(`\nNext steps:`)
console.log(`1. Check if any other files reference this component`)
console.log(`2. Update imports in other components if needed`)
console.log(`3. Run: npm run dev to verify everything still works`)