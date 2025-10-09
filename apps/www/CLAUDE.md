# Delta Components Registry - Claude Guide

## Project Overview
This is a Delta Components UI documentation site built with Next.js 15.3.1, featuring a custom component registry system based on shadcn/ui. The registry allows users to copy and install reusable React components for building multimodal agentic experiences.

## Development Commands
```bash
# Start development server
npm run dev

# Build the project
npm run build

# Run linting
npm run lint

# Type checking
npm run typecheck
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

When adding new components to the registry:

1. **Component Files**: Place in appropriate directory:
   - Simple UI components → `registry/delta-ui/ui/`
   - Complex components → `registry/delta-ui/components/`
   - Layout blocks → `registry/delta-ui/blocks/`

2. **Documentation**: Add MDX documentation in:
   - UI components → `content/docs/components/[component-name].mdx`
   - Include usage examples, props, and installation instructions

3. **Registry Updates**: The `registry/__index__.tsx` file is auto-generated but may need manual updates for complex components with dependencies.

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