---
name: code-review
description: Review React/TypeScript changes for correctness, architecture, readability, accessibility, test quality and library compatibility. Use for PR or diff reviews and quality audits.
---

# Code Review

Report only actionable, evidence-based findings. Do not modify code unless asked to fix.

## Principles

- Correctness and regression risk before style.
- Review the whole behavior path, not just changed lines; use repo conventions as context.
- Explain impact and give a minimal remediation.
- Verify library behavior against the installed version or official docs when a finding depends on it.

## Scope

- React: components, hooks, state, forms, routing, rendering.
- TypeScript: types, API contracts, async code, module boundaries, error handling.
- Architecture: coupling, dependency direction, composition, separation of concerns.
- Third-party libraries: version compatibility, deprecated APIs, lifecycle needs.
- Accessibility: semantics, keyboard/focus, user-visible states.
- Readability and maintainability: see `readability-standards`.
- Tests: coverage gaps, flaky patterns, brittle mocks, missing failure cases (see `test-validation`).
- Backend code: also check inward dependency direction, thin adapters, validation at boundaries (see `backend-developer`).

## Checklist

- Tests exist, cover main and failure paths, and assert behavior.
- Names are descriptive; functions under 50 lines; complex logic explained.
- No swallowed errors, unsafe casts, broad catches or hidden global state.
- No premature optimization; no duplicated logic worth extracting.
- Security: input validation, secrets, injection, unsafe rendering.
- Project scripts and package manager are respected.

## Publishing

- Put findings tied to a line or range in inline comments when the platform supports it; otherwise cite `file:line` in the main comment.
- The main comment holds overall recommendation, cross-cutting feedback, strengths and limitations.
- State that the review was written by AI and name the model, taken from runtime metadata. If unavailable, say so; never guess.

## Output per finding

`severity | file:line | problem | impact | suggested fix`

Severities: blocker, major, minor, nit.

## Session behavior

Once requested, stay in review mode for the conversation until told otherwise. Use `research` to verify library claims.
