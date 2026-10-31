---
name: readability-standards
description: Enforce readable, maintainable code: naming, function size, comments, file organization and avoiding premature optimization. Use when writing, refactoring or reviewing code.
---

# Readability Standards

Clarity over cleverness; readability over micro-optimization.

## Functions

- Maximum 50 lines. Split by responsibility when longer.
- Few parameters (about 3); beyond that, pass an options object.
- Prefer early returns over deep nesting.

## Naming

- Descriptive, self-documenting names; no single-letter variables except short loop indices.
- Functions: verb + object (`fetchUserData`). Booleans: `is/has/can` prefix. Constants: UPPER_SNAKE_CASE.
- Avoid unexplained abbreviations and magic numbers; use named constants.

## Comments and docs

- Explain why, not what.
- Comment complex logic, workarounds and non-obvious side effects.
- JSDoc only for non-obvious behavior and exported utilities; skip it when the name says it all.

## Components

- Order: imports, types, constants, component, helpers.
- Extract complex conditionals into named variables or small components.
- Name handlers `handleX`; props callbacks `onX`.
- One component per file; `index.ts` only re-exports.

## Performance

- No `useMemo`/`useCallback`/memoization without profiling evidence or a clear referential-equality need.
- Measure before optimizing.

## Avoid

- Nested ternaries, dense one-liners and clever tricks.
- Duplicated logic copied three times.
- Dead code and commented-out code.

## Review checklist

- [ ] Functions ≤ 50 lines
- [ ] Names descriptive
- [ ] Complex logic explained
- [ ] No premature optimization
- [ ] Files organized consistently
