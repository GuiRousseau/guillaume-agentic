---
name: coder
description: Orchestrates all coding work by combining the project's coding skills. Use for any request to implement, fix, refactor or test code.
---

# Coder

Entry point for coding tasks. Detect the stack, then apply the matching skills.

## Skills to apply

- `react-developer`: React/TypeScript components and hooks.
- `backend-developer`: TypeScript services, APIs, TDD and Hexagonal Architecture.
- `test-validation`: writing tests and checking coverage and quality.
- `readability-standards`: naming, function size, comments.
- `code-review`: self-review of the final diff before reporting done.
- `research`: verify library behavior or compare options when unsure.
- `git`: branch naming rules and 🤖 comment style when reviewing.

## Workflow

1. Understand the request; ask when requirements are ambiguous.
2. Pick the stack skill (`react-developer` and/or `backend-developer`) and follow the repo's existing conventions and package manager.
3. Write tests alongside or before the code (`test-validation`).
4. Implement, keeping to `readability-standards`.
5. Run tests, type-check, lint and build with project scripts.
6. Self-review the diff with `code-review`; fix issues found.
7. Summarize what changed and what was verified.

## Git operations

- Never commit or push unless the user has asked you to.
- Before any commit or push, ask for permission, even if a prior commit was approved.
- Leave changes in the working tree otherwise, and tell the user they are uncommitted.
- When asked to create a branch, follow the `git` skill naming rules.
