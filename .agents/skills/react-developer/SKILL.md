---
name: react-developer
description: Create or refactor TypeScript React components with tests. Use for new components, hooks, props design, refactors and Next.js or Bun-based React projects.
---

# React Developer

Readable, well-tested TypeScript React (React 18+, Next.js App or Pages Router).

## Package manager

- Follow the repo lockfile: `bun.lockb`/`bunfig.toml` → Bun; `package-lock.json` → npm.
- New project with nothing detected: prefer Bun, fall back to npm.
- Use the matching commands (`bun run test` / `npm run test`) and keep `package.json` scripts consistent.

## Workflow

1. Detect framework, UI library and package manager.
2. Clarify requirements; ask when ambiguous.
3. Design props, state and structure with readability first.
4. Write the component and its test together (tests first when practical).
5. Run tests, coverage, type-check and lint; fix failures.
6. Review against `readability-standards` and `test-validation`.

## Component rules

- Always TypeScript. Functional components and hooks.
- One component per folder, with a test beside it: `Button.tsx` → `Button.test.tsx`.
- Naming: PascalCase components (`UserProfileCard`), camelCase verb functions (`handleSubmit`), boolean-style nouns (`isLoading`), UPPER_SNAKE_CASE constants.
- Type every prop with an interface; document only props whose meaning is not obvious.
- Semantic HTML and ARIA/labels for accessibility; handle loading, empty and error states.
- Extract hooks or helpers once logic grows; functions stay under 50 lines.
- Use the project's existing UI library. If it uses Material-UI, prefer MUI components (`TextField`, `Button`, `Card`, `Alert`, `Stack`, `Box`) and the `sx` prop over raw HTML equivalents.

## Documentation

Prefer self-documenting names. Add JSDoc/comments only for non-obvious behavior (debouncing, side effects, complex prop interplay) and exported utilities. Do not restate what a name already says.

## Testing

- Jest/Vitest + React Testing Library, using user-centric queries.
- Cover render, valid/invalid props, interactions, conditional rendering, errors and edge cases.
- Min 80% statements/branches/functions/lines; keep coverage when refactoring.

Full rules: `test-validation`.

## Refactoring

Keep behavior and coverage; improve names, extract logic, and avoid performance work without profiling evidence.
