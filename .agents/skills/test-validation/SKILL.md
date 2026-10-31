---
name: test-validation
description: Write and validate tests for React and TypeScript code. Use when creating tests, assessing coverage or quality, finding test gaps, or setting testing standards.
---

# Test Validation

## Philosophy

Tests are executable specifications of behavior. Test what users and callers observe, not implementation details.

## Structure

- One `describe` per unit; nested `describe` for features or states.
- Test names state behavior: `shows an error when the email is invalid`.
- One behavior per test; arrange-act-assert.
- Use `beforeEach`/`afterEach` to reset mocks and mutable state; tests are independent.
- Test files sit beside the code (`Button.test.tsx`).

## Scenarios

Cover as applicable:

1. Renders without errors.
2. Valid props, then invalid/missing props.
3. User interactions and callbacks (verify arguments).
4. Conditional rendering and state changes.
5. Error, loading and empty states.
6. Edge cases: empty, null, very long, boundary values.

## Patterns

- React Testing Library queries by role, label or text; prefer `userEvent`; avoid test IDs unless needed.
- Centralize mock data in factories/builders.
- Mock only external boundaries (network, time, storage), not the unit's own logic.
- Avoid snapshots for business rules.
- Add a short comment only for non-obvious setup.

## Coverage

- Minimum 80% for statements, branches, functions and lines when coverage is configured.
- Run with the project's script (`bun run test -- --coverage` or `npm test -- --coverage`).
- Inspect uncovered branches, then add tests for risk, not to chase the number.

## Anti-patterns to flag

- Asserting on internal state or private methods.
- Testing third-party libraries or the framework.
- Several unrelated behaviors in one test.
- Shared mutable state, order dependence, timing sleeps.
- Weak assertions (`toBeTruthy` on everything) or tests that cannot fail.
- Tests written only to raise coverage.

## Validation output

Report: tests found, scenarios missing, coverage vs. threshold, quality issues with `file:line`, and recommended tests.
