# Project Standards

## Folder Structure

Every component and page must live in its own folder with co-located files:

```
ComponentName/
  index.ts                  — barrel export
  ComponentName.tsx         — component implementation
  ComponentName.module.scss — scoped styles (SCSS Modules)
  ComponentName.test.tsx    — tests (when added)
```

- Components go in `src/components/`
- Pages go in `src/pages/`
- Each folder must have an `index.ts` that re-exports the default: `export { default } from "./ComponentName";`
- All imports must use the short barrel path: `import Foo from "../../components/Foo"` (not `../../components/Foo/Foo`)

## Styling

- Use SCSS Modules (`.module.scss`) for all component/page styles
- Shared SCSS variables live in `src/styles/_variables.scss`
- Every SCSS module must import variables: `@use "../../styles/variables" as *;`
- Use SCSS variables (`$accent`, `$spacing-4`, etc.) instead of hardcoded values
- Use the numeric spacing scale (`$spacing-1` through `$spacing-20`) for all spacing
- Use `$radius-sm`, `$radius-md`, `$radius-lg`, `$radius-full` for border radius
- Use `$font-xs` through `$font-6xl` for font sizes
- Use `$font-medium`, `$font-semibold`, `$font-bold`, `$font-extrabold` for font weights
- Global styles (reset, shared button classes, shared tags) stay in `src/index.scss`
- No inline styles
- No hardcoded colors, spacing, or font sizes — always use variables
- Before adding any style value, check `_variables.scss` for an existing variable first
- If no suitable variable exists, add one to `_variables.scss` with careful consideration — it must fit the existing scale and naming convention
- Never introduce one-off magic numbers; every value should trace back to a variable

## TypeScript

- All shared types and constants live in `src/types.ts`
- Use `import type` for type-only imports
- Use `as const` for constant arrays to get literal types

## State Management

- Each domain gets its own React Context (e.g. `ProjectContext`, `CommentContext`, `AuthContext`)
- Contexts live in `src/context/`
- Don't mix unrelated state in a single context

## Utilities

- Shared utility functions go in `src/utils/`
- One function per file when possible

## Routing

- Pages are lazy-loaded via `React.lazy` in `App.tsx`
- `ScrollToTop` component ensures scroll resets on navigation
- Route paths use kebab-case

## Code Style

- Functional components only
- Default exports for components and pages
- Named exports for hooks and utilities
