# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Delta Components is a custom shadcn/ui registry for React components. It's a Next.js application that provides a collection of modern, accessible, and customizable components with v0 integration. Components are organized into categories (animations, blocks, components, inputs, etc.) and include demos, documentation, and installation instructions.

## Development Commands

**Core development workflow:**

```bash
# Start development server
pnpm dev

# Build application (includes formatting)
pnpm build

# Build registry files
pnpm build:registry
make registry  # Alternative with colors

# Format code
pnpm format
pnpm format:check

# Lint code
pnpm lint
```

**Component creation:**

```bash
# Create new component (preferred with Makefile colors)
make component name=ComponentName category=inputs
# or: pnpm create-component ComponentName inputs

# Create demo for existing component
make demo component=tabs name=spotify
# or: pnpm create-demo tabs spotify
```

## Architecture

### Registry System

- Components live in `registry/{category}/{component-name}.tsx`
- Each category has a `registry-{category}.ts` file defining metadata
- Registry files are generated from TypeScript source analysis
- All registry items follow zod schema defined in `registry/schema.ts`

### Documentation Structure

- MDX docs in `content/docs/{category}/{component-name}.mdx`
- Navigation configured in `config/docs.ts`
- Component states indicated by `label` field: "new", "beta", "updated", "experimental", "deprecated"

### Component Organization

```
registry/
├── animations/     # Animation components
├── blocks/         # Complex UI blocks
├── components/     # General UI components
├── examples/       # Demo files (*-demo.tsx)
├── hooks/          # React hooks
├── inputs/         # Form inputs
├── landing-page/   # Landing/hero components
├── layout/         # Layout components
└── media/          # Media-related components
```

## Component Development Guidelines

### Creating Components

1. **Use Makefile/scripts**: Always use `make component` or `pnpm create-component` to scaffold new components
2. **Follow naming**: Use PascalCase for component names, kebab-case for file names
3. **Export format**: All components must be `export default function` components
4. **Update navigation**: Add new components to `config/docs.ts` → sidebarNav
5. **Registry sync**: Run `make registry` after creating components

### Component States & Visibility

- Add `label: "new"/"beta"/"updated"/"experimental"/"deprecated"` to `config/docs.ts` for badges
- Hide components from production: `hide: process.env.NODE_ENV === "production"`
- Component filtering handled in `components/docs-nav.tsx` via `!item.hide`

### Documentation Standards

Every component must include:

1. **Front-matter** with title and description
2. **ComponentPreview** for main demo
3. **Overview** section (no TODOs)
4. **Installation** with CLI and manual tabs
5. **Usage** with runnable TSX example
6. **API Reference** table with all props
7. **Examples** section with all demo variants

### Dependencies & Registry

- **npm dependencies**: External packages go in `dependencies` field
- **shadcn core**: Components from `@/components/ui/*` → `registryDependencies`
- **internal deps**: Other registry components → `registryDependencies`
- Use `@refresh-registry` to auto-update dependency analysis

## UI/UX Guidelines

- Follow shadcn/ui design patterns and accessibility standards
- Use Tailwind CSS with design tokens from `styles/themes.css`
- Components should be responsive and support dark/light themes
- Include proper keyboard navigation and ARIA attributes
- Follow the pill/rounded variant pattern established in existing components

## Technical Writing Standards

Documentation must be:

- **Clear and concise**: No jargon or unnecessary complexity
- **Complete**: All props documented with types and descriptions
- **Consistent**: Follow established patterns across all docs
- **Professional**: Production-grade technical writing
- **Actionable**: Include working code examples

## Common Workflows

**Adding a new component:**

1. `make component name=MyComponent category=inputs`
2. Update `config/docs.ts` navigation
3. `make registry` to sync dependencies
4. Develop component with proper TypeScript types
5. Create demos: `make demo component=my-component name=variant`
6. Complete documentation following MDX standards

**Hiding components:**
Add `hide: process.env.NODE_ENV === "production"` to config entry

**Documentation updates:**
Use the structured format enforced by `.cursor/rules/32-delta-docs-update.mdc`

## Registry Dependencies

The system automatically analyzes and manages:

- External npm packages
- shadcn/ui core components
- Internal component dependencies
- Appropriate tags for searchability

Registry files are generated, not manually maintained.
