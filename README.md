# deltacomponents.dev

A collection of modern, accessible, and customizable React components built on top of shadcn/ui. Free & Open Source.

## Documentation

Visit [deltacomponents.dev](https://deltacomponents.dev) to view the full documentation.

## Getting Started

You can add components to your project using the `shadcn` CLI:

```bash
npx shadcn@latest add "https://deltacomponents.dev/r/admonition.json"
```

## Customize with v0

Every component in this library can be opened and customized using [v0](https://v0.dev/chat), an AI-powered design tool that helps you create beautiful UI components. Simply click the "Open in v0" button on any component to:

- Modify the component's design and layout
- Generate variations of the component
- Export the customized code
- Create new components inspired by existing ones

## Contributing

Please read the [contribution guidelines](./CONTRIBUTING.md).

### Development Scripts

#### Creating Component Demos

You can easily create new demo/example files for existing components using the `create-demo.mjs` script:

```bash
# Usage: node scripts/create-demo.mjs <component-name> <demo-suffix>
# Example:
node scripts/create-demo.mjs tabs spotify
```

This script will:
1. Create a new demo file in the `registry/examples` directory
2. Update the registry entries in `registry/registry-examples.ts`
3. Add the demo to the component's documentation MDX file

## Acknowledgments

Huge thanks to [shadcn](https://github.com/shadcn-ui/ui), as many parts of this repository—documentation page, structure, registry system, guides, and many more—is built upon it.

## License

Licensed under the [MIT license](LICENSE).
