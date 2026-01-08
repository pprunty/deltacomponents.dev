# Delta Components Registry - Gemini Guide

## Project Overview
This is a Delta Components UI documentation site built with Next.js, featuring a custom component registry system based on shadcn/ui. The registry allows users to copy and install reusable React components.

## AI Assistant Guidelines

### 1. Git & Version Control
- **Command:** Always use `gacp` (alias for `git add . && git commit -m "..." && git push`) with `--no-verify`.
- **Constraint:** Do not `git add` or `build` unless explicitly instructed by the user.

### 2. Package Management
- **Tool:** ALWAYS use `bun`. Never use `pnpm`, `npm` or `yarn`.
  - Install: `bun install`
  - Add: `bun add <package>`
  - Dev: `bun add -d <package>`
  - Run scripts: `bun run <script>`

### 3. Registry Structure & Locations
- **Root:** `apps/www/registry/delta-ui/`
- **UI Components:** `apps/www/registry/delta-ui/ui/` (Base Shadcn UI components)
- **Registry Components:** `apps/www/registry/delta-ui/delta/` (Complex/Custom components)
- **Blocks:** `apps/www/registry/delta-ui/blocks/` (Page sections/layouts)
- **Examples/Demos:** `apps/www/registry/delta-ui/examples/`

**Import Convention:**
- Import shadcn/base components from: `@/registry/delta-ui/ui/**` (NOT `components/ui`)
- Import registry components from: `@/registry/delta-ui/delta/**`

### 4. Creating New Components
**NEVER create components manually.** Use the provided scripts to ensure proper registration and file generation.

**Command:**
```bash
bun apps/www/scripts/create-component.js <component-name> [ui|components|blocks]
```
*   `ui`: For base UI components (buttons, inputs).
*   `components`: For complex/registry components (voice-recorder, audio-player).
*   `blocks`: For larger page sections.

**What the script does:**
1.  Creates component file in the appropriate registry subfolder.
2.  Generates an MDX documentation file in `content/docs/components/`.
3.  Creates an example/demo file in `registry/delta-ui/examples/`.
4.  Updates `registry-ui.ts`, `registry-examples.ts` or `registry-blocks.ts`.

**Post-Creation Steps:**
1.  Edit the generated component file.
2.  Update the documentation MDX.
3.  Refine the demo/example.
4.  Run `bun run registry:build` to update the registry index (only if instructed).

### 5. Creating New Blocks
**Command:**
```bash
bun apps/www/scripts/create-block.js <block-name> [category]
```
*   `category`: `featured`, `agents`, `audio`, `landing-page` (Default: `featured`).

**What the script does:**
1.  Creates a directory `registry/delta-ui/blocks/<block-name>/`.
2.  Creates `page.tsx` and `components/<block-name>.tsx`.
3.  Updates `registry-blocks.ts`.

### 6. Development & Verification
- **Start Server:** `bun dev`
- **Rebuild Registry:** `bun run registry:build` (Use this script from `apps/www/package.json` when asked to rebuild).
- **Lint:** `bun run lint`
- **Typecheck:** `bun run typecheck`

## Theme System
- Themes are defined in `apps/www/lib/theme-data.ts`.
- CSS variables are in `apps/www/styles/themes/[theme-name].css`.
- When creating a new theme, follow the steps in `CLAUDE.md` / `GEMINI.md` to add CSS, import it, and update theme data.

## Documentation (Fumadocs)
- Documentation pages are MDX files in `apps/www/content/docs/`.
- Navigation is controlled by `meta.json` files in the docs directories.
- Component docs should include `<Installation />` and `<ComponentPreview />` components.

## Important Reminders for Gemini
- This is a **custom shadcn registry** (forked).
- Always verify file paths before editing.
- When fixing bugs or refactoring, check `registry/delta-ui` paths first.
- Refer to `apps/www/scripts/` for any automation tasks.
