# Migrate Install Commands to Short `@delta-components/…` Form

Plan for what to change on `deltacomponents.dev` once the draft PR
[shadcn-ui/ui#10476](https://github.com/shadcn-ui/ui/pull/10476) is merged and
`@delta-components` is listed in the official shadcn registries index.

## Context

Today every install command on the site uses the full URL form:

```bash
npx shadcn@latest add https://deltacomponents.dev/r/cambio-image.json
```

Once `@delta-components` ships in the official
[`registries.json`](https://ui.shadcn.com/r/registries.json), the shadcn CLI
resolves the namespace automatically and users can install with the short form:

```bash
npx shadcn@latest add @delta-components/cambio-image
```

Shorter copy-paste, less visual noise, same behaviour. Below is every source
file that needs updating, grouped by concern.

## Do not migrate until the PR is merged

The short form **will fail** for end users until `@delta-components` is
present in `https://ui.shadcn.com/r/registries.json`. Keep the full URL in
production until the merge lands. Once merged, deploy the switch in a single
release to avoid a mixed state.

## Migration map

### 1. Install-command UI components

These render the install tabs (npm / pnpm / yarn / bun) on every component,
block, and theme page.

- **`apps/www/components/installation-tabs.tsx`** (component installs, 4 lines):
  ```diff
  - npm: `npx shadcn@latest add https://deltacomponents.dev/r/${name}.json`,
  - yarn: `npx shadcn@latest add https://deltacomponents.dev/r/${name}.json`,
  - pnpm: `pnpm dlx shadcn@latest add https://deltacomponents.dev/r/${name}.json`,
  - bun: `bunx --bun shadcn@latest add https://deltacomponents.dev/r/${name}.json`,
  + npm: `npx shadcn@latest add @delta-components/${name}`,
  + yarn: `npx shadcn@latest add @delta-components/${name}`,
  + pnpm: `pnpm dlx shadcn@latest add @delta-components/${name}`,
  + bun: `bunx --bun shadcn@latest add @delta-components/${name}`,
  ```

- **`apps/www/components/themes/theme-code-dialog.tsx`** (theme installs):
  ```diff
  - `npx shadcn@latest add https://deltacomponents.dev/r/themes/${themeValue}.json`
  + `npx shadcn@latest add @delta-components/themes/${themeValue}`
  ```
  (Apply to npm / yarn / pnpm / bun props — 4 lines.)

- **`apps/www/components/block-viewer.tsx`** (block installs):
  - Lines 258, 264, 443–446. Switch every occurrence of
    `https://deltacomponents.dev/r/${item.name}.json` to
    `@delta-components/${item.name}`.

### 2. Docs MDX

These are copy-pasteable examples in prose — keep them in sync so the page
text matches the tab output.

- **`apps/www/content/docs/(root)/installation.mdx`**:
  ```diff
  - npx shadcn@latest add https://deltacomponents.dev/r/<component>.json
  + npx shadcn@latest add @delta-components/<component>
  ```
  Consider adding a one-line note: *"Need the full URL form? See the
  [registry JSON](https://deltacomponents.dev/r/registry.json)."*

- **`apps/www/content/docs/(root)/theming.mdx`**:
  ```diff
  - npx shadcn@latest add https://deltacomponents.dev/r/themes/[theme-name].json
  + npx shadcn@latest add @delta-components/themes/[theme-name]
  ```

- **`apps/www/content/learning/index.mdx`** and
  **`apps/www/content/learning/using-delta-components-ui-templates.mdx`** —
  grep for `deltacomponents.dev/r/` and replace inline.

### 3. `llms.txt`

- **`apps/www/app/llms.txt/route.ts`**:
  ```diff
  - pnpm dlx shadcn@latest add https://deltacomponents.dev/r/<component-name>.json
  + pnpm dlx shadcn@latest add @delta-components/<component-name>
  ```

### 4. Inter-registry dependencies (`registryDependencies`)

Delta's own items reference each other with full URLs inside
`registry-blocks.ts` and `registry-examples.ts`. The shadcn CLI already
accepts the short `@delta-components/<name>` form in
`registryDependencies`, so switching them has two wins: (1) shorter generated
JSON, (2) the registry becomes more portable if the domain ever changes.

- **`apps/www/registry/registry-blocks.ts`** — every
  `"https://deltacomponents.dev/r/<name>.json"` in a `registryDependencies`
  array becomes `"@delta-components/<name>"`. Examples:
  ```diff
  - "https://deltacomponents.dev/r/scroll-fade-effect.json",
  + "@delta-components/scroll-fade-effect",
  ```
- **`apps/www/registry/registry-examples.ts`** — same pattern (most demos
  depend on a single Delta component).
- **`apps/www/scripts/build-registry.mts`** — the auto-dependency detector
  (look for `extractDeltaImports` / `deltaUrls`) currently emits full URLs.
  Update the line building the URL:
  ```diff
  - const deltaUrls = Array.from(deltaImports).map(
  -   name => `https://deltacomponents.dev/r/${name}.json`
  - )
  + const deltaUrls = Array.from(deltaImports).map(
  +   name => `@delta-components/${name}`
  + )
  ```
  Rename the variable to `deltaDeps` for accuracy.

### 5. Generated artefacts

After the source edits, rebuild the registry to regenerate every
`public/r/*.json`:

```bash
bun run registry:build
```

`public/r/registry.json` and every per-item JSON will then emit short
`registryDependencies` too.

## Post-merge rollout sequence

1. Confirm `@delta-components` appears in
   `https://ui.shadcn.com/r/registries.json`.
2. Cut a branch `chore/migrate-to-official-registry`.
3. Apply edits in sections 1 → 4 above.
4. Rebuild registry (section 5).
5. Manual smoke test in a scratch Next.js app:
   ```bash
   pnpm create next-app@latest scratch --ts --tailwind
   cd scratch && npx shadcn@latest init
   npx shadcn@latest add @delta-components/cambio-image
   npx shadcn@latest add @delta-components/chatbot-window   # block with deps
   npx shadcn@latest add @delta-components/themes/dublin    # theme
   ```
   Each command should succeed and install the code into `components/ui/`.
6. Deploy. Update
   [changelog](https://deltacomponents.dev/docs/changelog) with a
   short entry: *"Install commands now support the shorter
   `@delta-components/<name>` form."*

## Fallback

Keep a short note on
[`/docs/installation`](https://deltacomponents.dev/docs/installation) that the
full URL form **still works** — nothing is removed, only augmented. Users who
pinned to the URL in CI pipelines won't break.

## Ownership

Single-session migration (~30 min of edits + rebuild + smoke test). Only
touches files already enumerated — no schema, hook, or architectural changes.
