# Contributing

> 🎉 **Recognition for Contributors!** deltacomponents.dev receives regular traffic, and as a contributor, your work will be recognized as yours by providing a link to your personal website or social media profile of choice in the component's page you contribute (i.e deltacomponents.dev/docs/admonition), GitHub README.md and contributors page.

Thank you for your interest in contributing to Delta Components! This document provides guidelines and instructions to help you get started.

## Stack

Delta Components is built with the following technologies:

- **Next.js 15**: React framework for production
- **React 19**: UI library
- **TypeScript**: Static type checking
- **Tailwind CSS 4**: Utility-first CSS framework
- **Contentlayer2**: Content SDK for MDX documentation
- **Shadcn UI**: Component base with integration
- **Radix UI**: Headless UI components
- **Framer Motion**: Animation library
- **PNPM**: Package manager

## Structure

The repository is organized as follows:

```
deltacomponents.dev/
├── .github/              # GitHub workflows and templates
├── .husky/               # Git hooks for linting and formatting
├── app/                  # Next.js app directory
├── components/           # React components for the website
├── config/               # Configuration files
│   └── docs.ts           # Documentation navigation configuration
├── content/              # Content files
│   └── docs/             # Documentation MDX files
├── lib/                  # Utility functions
├── public/               # Static assets
│   └── r/                # Registry output directory
├── registry/             # Component registry
│   ├── animations/       # Animation components
│   ├── blocks/           # Block components
│   ├── components/       # UI components
│   ├── examples/         # Component demos
│   ├── hooks/            # React hooks
│   ├── inputs/           # Form input components
│   ├── landing-page/     # Landing page components
│   └── media/            # Media components
├── scripts/              # Utility scripts
│   ├── build-registry.mts # Script to build component registry
│   ├── create-component.mts # Script to create new components
│   └── create-demo.mjs   # Script to create component demos
├── styles/               # Global styles
├── Makefile              # Makefile with development commands
├── package.json          # Dependencies and scripts
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Development

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/pprunty/deltacomponents.dev.git
   cd deltacomponents.dev
   ```

2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Build the component registry**

   ```bash
   make registry
   ```

   This is an alias for `pnpm build:registry` which compiles the component registry.

5. **Start the development server**

   ```bash
   make dev
   ```

   The site should now be running at http://localhost:3000.

### Creating a New Component

To create a new component, use the `make component` command:

```bash
make component name=component-name category=components
```

Available categories include:

- `components` - UI components
- `blocks` - Larger UI blocks
- `animations` - Animation components
- `hooks` - React hooks
- `inputs` - Form input components
- `landing-page` - Landing page components
- `media` - Media components

After creating a component, you'll need to:

1. Update the documentation navigation in `config/docs.ts`:

   ```typescript
   // Add to the appropriate section in sidebarNav
   {
     title: "Components",
     items: [
       // ... other components
       {
         title: "Component Name",
         href: "/docs/components/component-name",
       },
     ],
   },
   ```

2. Build the registry:
   ```bash
   make registry
   ```

### Creating a Component Demo

To create a new demo for an existing component:

```bash
make demo component=component-name name=demo-name
```

This will:

1. Create a new demo file in `registry/examples/`
2. Add the demo to the examples registry
3. Update the component's documentation to include the demo

### Code Style and Formatting

The project uses ESLint and Prettier for code linting and formatting. You can run:

```bash
# Format code
make format

# Check formatting
make format-check

# Run linting
make lint
```

### Submitting a Pull Request

1. Commit your changes with a descriptive message

   ```bash
   git commit -m "feat: add new component"
   ```

2. Push your branch to GitHub

   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a pull request on GitHub

   - Provide a clear description of the changes with label 'new component'
   - Reference any related issues
   - Include screenshots or videos if applicable

4. Wait for a review from the maintainers

#### Acceptance Criteria

For your component to be merged to the default main branch, it must meet some of the following criteria:

1. Be unique. If not, the component should perform better or offer something another component seen out in the wild doesn't. If possible,
   the contributor should reference said component they outperform and the how and why.
2. Be applicable to modern application usage, i.e in LLM interfaces, etc.
3. Should consider backend integration if applicable. For example, in an infinite vertical snap scroll component, like used by TikTok, it should
   adequately consider integration with backend fetching for new items.

## License

By contributing to Delta Components, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
