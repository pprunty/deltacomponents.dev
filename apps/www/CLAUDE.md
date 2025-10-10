# Delta Components Registry - Claude Guide

## Project Overview
This is a Delta Components UI documentation site built with Next.js 15.3.1, featuring a custom component registry system based on shadcn/ui. The registry allows users to copy and install reusable React components for building multimodal agentic experiences.

## Development Commands

**IMPORTANT: ALWAYS use pnpm for package management, never npm or yarn.**

```bash
# Start development server
pnpm dev

# Build the project
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm typecheck

# Install dependencies
pnpm install

# Add new dependencies
pnpm add <package-name>

# Add dev dependencies
pnpm add -D <package-name>
```

## Component Registry Structure

### Registry Directory Structure
```
registry/
├── delta-ui/
│   ├── ui/           # Base UI components (buttons, inputs, etc.)
│   ├── components/   # Complex components (voice-button, waveform, etc.)
│   └── blocks/       # Pre-built page sections or layouts
└── __index__.tsx     # Registry index file (auto-generated)
```

### Adding New Components

**IMPORTANT: ALWAYS use the create component script to create new components.**

When adding new components to the registry:

1. **Use the Creation Script**: NEVER create components manually. Always use:
   ```bash
   node scripts/create-component.js <component-name> [ui|components|blocks]
   ```
   
   Examples:
   - `node scripts/create-component.js button ui`
   - `node scripts/create-component.js voice-recorder components`
   - `node scripts/create-component.js hero-section blocks`

2. **Script Benefits**: The script automatically:
   - Creates the component file in the correct directory
   - Generates proper TypeScript interfaces
   - Creates MDX documentation with proper structure
   - Generates example and demo files
   - Updates registry files automatically
   - Follows naming conventions consistently

3. **Component Directories**: The script places files in:
   - Simple UI components → `registry/delta-ui/ui/`
   - Complex components → `registry/delta-ui/components/`
   - Layout blocks → `registry/delta-ui/blocks/`

4. **After Script Creation**: Then customize the generated files:
   - Update the component implementation
   - Modify the demo to showcase real functionality
   - Update documentation with proper API reference
   - Test the component in the documentation site

### Component Categories

**Voice & Audio Components:**
- voice-button, voice-picker, conversation-bar
- audio-player, waveform, live-waveform, bar-visualizer, orb

**Conversation & Messaging:**
- message, conversation, response

**Utility Components:**
- shimmering-text

## Documentation System

Uses Fumadocs for documentation with MDX files:
- Configuration in `source.config.ts`
- Pages organized in `content/docs/`
- Navigation controlled by `meta.json` files
- Filter function excludes certain pages from pagination

## Key Configuration Files

- `components.json` - Registry configuration and import aliases
- `lib/config.ts` - Site configuration and branding
- `source.config.ts` - Documentation system configuration
- `lib/registry.ts` - Component registry logic

## Component Development Guidelines

1. **TypeScript**: All components must be fully typed
2. **Styling**: Use Tailwind CSS with consistent design tokens
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Documentation**: Provide comprehensive examples and API documentation
5. **Dependencies**: List all required dependencies in component metadata

## Testing & Quality

- Run `npm run lint` before committing
- Run `npm run typecheck` to verify TypeScript
- Test components in isolation and within documentation examples

## Registry Scripts Location

Component and block generation scripts should be created in:
- `scripts/create-component.js` - For new UI/components
- `scripts/create-block.js` - For new blocks/layouts

These scripts should:
1. Create component files with proper structure
2. Generate MDX documentation templates
3. Update registry index if needed
4. Follow naming conventions and directory structure

## Adding New Component Demos

When adding new demos for existing components:

1. **Create Demo File**: Place in `registry/delta-ui/examples/`
   - Use descriptive naming: `[component]-[variant]-demo.tsx`
   - Example: `card-stack-yugioh-demo.tsx`

2. **Update Registry Examples**: Add entry to `registry/registry-examples.ts`
   ```typescript
   {
     name: "demo-name",
     type: "registry:example", 
     registryDependencies: ["component-name"], // or URL for external deps
     files: [
       {
         path: "examples/demo-name.tsx",
         type: "registry:example",
       },
     ],
   }
   ```

3. **Create Registry JSON**: Manual entry in `public/r/demo-name.json`
   - Copy structure from existing demo JSON files
   - Include the full component code as content string

4. **Update Documentation**: Add to component's MDX file
   ```mdx
   ## Examples
   
   ### Demo Name
   
   <ComponentPreview name="demo-name" />
   ```

5. **Rebuild Registry**: Run `cd apps/www && npx tsx scripts/build-registry.mts`
   - May have prettier warnings but should still generate files
   - Verify new demo appears in `public/r/` directory

6. **Test Demo**: Verify the demo renders correctly in documentation
   - Check component preview loads without errors
   - Ensure all dependencies are properly referenced