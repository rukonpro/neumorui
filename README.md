# NeumorUI

Neumorphic UI component library for React — TypeScript, Tailwind CSS, Radix primitives.

## Packages

- [`neumorui`](packages/core) — Core component library (34 components)
- [`storybook`](apps/storybook) — Interactive component playground

## Quick start

```bash
pnpm install
pnpm build
pnpm --filter storybook dev
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests across the monorepo |
| `pnpm lint` | Lint all packages |
| `pnpm dev` | Watch mode (all packages) |
| `pnpm --filter storybook dev` | Start Storybook at http://localhost:6006 |
| `pnpm changeset` | Create a new changeset for release |

## Tech

pnpm · turborepo · vite · react 18 · typescript · tailwindcss · radix-ui · vitest · storybook · changesets

## License

MIT
