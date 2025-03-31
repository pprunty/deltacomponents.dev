# Contributing

Hi! Thanks for your interest in contributing to deltacomponents.dev! 🎉

## Stack

- Next.js 15 for the website
- React 19
- Tailwind CSS for styling
- shadcn/ui for base components
- Framer Motion for animations
- TypeScript for type safety

## Project Structure

```
.
├── app/                    # Next.js app directory
├── delta/                  # Component library
│   ├── components/        # Base components
│   ├── forms/            # Form components
│   ├── inputs/           # Input components
│   ├── layout/           # Layout components
│   ├── hooks/            # Custom hooks
│   └── blocks/           # Complex components
└── public/               # Static assets
```

## Development Setup

- [ ] Fork the repository
- [ ] Clone your fork: `git clone https://github.com/your-username/deltacomponents.dev`
- [ ] Create a new branch: `git checkout -b feature/your-feature`
- [ ] Install dependencies: `npm install`
- [ ] Start the development server: `npm run dev`

## Adding a New Component

### 1. Component Source

The easiest way to add a new component is using the registry commands:

```bash
# Add a new component
npm run registry:add:component <component_name> <category>

# Add a new page
npm run registry:add:page <page_name> <category>

# Add a new library
npm run registry:add:lib <lib_name> <category>

# Add a new hook
npm run registry:add:hook <hook_name> <category>

# Remove a component
npm run registry:remove <component_name>
```

Available categories:

- `components` - Base components
- `forms` - Form components
- `inputs` - Input components
- `layout` - Layout components
- `hooks` - Custom hooks
- `blocks` - Complex components

These commands will:

- Create the necessary files in the correct directory
- Add the component to `registry.json`
- Set up the basic component structure
- Add the required imports and exports

After running the command, you'll need to:

- [ ] Implement your component logic
- [ ] Add component demo file with `-demo` suffix
- [ ] Add author comment in component file
- [ ] Add any new dependencies to `package.json`

### 2. Registry

- [ ] Run `npm run registry:build` to update registry
- [ ] Test component installation: `npx shadcn@latest add "https://deltacomponents.dev/r/your-component.json"`

### 3. Documentation

<!-- Documentation section will be added later -->

## Commit Convention

Please follow the convention `category(scope): message`:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

Example: `feat(button): add new variant`

## Pull Request Process

- [ ] Update documentation if needed
- [ ] Add tests for new features
- [ ] Ensure all tests pass
- [ ] Update the README if needed
- [ ] Add a description of your changes
- [ ] Include screenshots or recordings of your work

## Need Help?

Feel free to:

- Open an issue for bugs or feature requests
- Start a discussion for questions
- Reach out to [Patrick](https://github.com/pprunty) directly

Thanks for contributing! 🚀
