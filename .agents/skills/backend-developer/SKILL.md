---
name: backend-developer
description: Build or refactor TypeScript backend services and APIs using TDD, Hexagonal Architecture and SOLID. Use for use cases, ports/adapters, REST/GraphQL/event handlers, persistence and backend tests.
---

# Backend Developer

Framework-agnostic: adapt to the runtime, libraries, persistence and package manager already in the repository.

## Package manager

- Use what the repo already uses (`bun.lock`/`bun.lockb`/`bunfig.toml` → Bun, `package-lock.json` → npm).
- No lockfile: Bun if installed, otherwise npm.
- Never swap lockfiles or migrate package managers silently.

## Workflow

1. **Detect** runtime, framework, TypeScript config, test runner, service boundaries.
2. **Analyze** requirements into observable behaviors, failure modes, acceptance criteria.
3. **Define boundaries**: entities, value objects, use cases, inbound/outbound ports, adapters, composition root.
4. **Red**: write the smallest failing test for one behavior (domain/use case first, then adapter/contract).
5. **Green**: simplest code that passes, dependencies pointing inward.
6. **Refactor** with tests green.
7. **Validate**: focused tests, then full tests, type-check, lint, build using the project's scripts.
8. **Document** changed API contracts and non-obvious decisions.

Never write tests after the implementation or weaken assertions to make them pass.

## Architecture

- **Domain**: entities, value objects, domain services/errors. No framework, DB, DTO or env imports.
- **Application**: use cases, ports, command/query models, orchestration.
- **Adapters**: HTTP, messaging, persistence, external clients, serializers.
- **Infrastructure**: config, drivers, logging, composition root.
- Dependencies point inward; external concerns go through narrow, role-specific ports.
- Add an abstraction only for a real boundary, test benefit or domain reason.

```text
src/{domain,application/{ports,use-cases,dto},adapters/*,infrastructure}
test/{unit,integration,contract,e2e}
```

Adapt names to the repo; keep the dependency direction.

## Standards

- Handlers/controllers stay thin: parse, call use case, present.
- Business rules live in domain/application, never in adapters.
- Explicit request/response DTOs; validate untrusted input at the boundary.
- Intentional error types, mapped to stable transport responses; no swallowed errors or success-shaped fallbacks.
- Make transactions, retries, timeouts, cancellation and idempotency explicit.
- Inject dependencies at the composition root; no service locators or global mutable state.
- Strict typing, no unsafe casts. Never log secrets or personal data.

## Testing

- Domain tests: fast, deterministic, no I/O. Use cases: fake/in-memory ports.
- Adapters: test against real boundary contracts (serialization, error mapping); integration tests when a DB/queue/service matters.
- E2E for critical journeys. Mock only at architectural boundaries.
- Cover success, validation, rule violations, dependency failure, timeout, authorization and boundaries as applicable.
- Aim for ≥80% coverage when configured, prioritizing risk over the metric.

See `test-validation`, `readability-standards` and `code-review` for shared rules.

## Definition of done

- Acceptance criteria covered by tests written first.
- Domain stays framework-free; ports and wiring are explicit.
- Type-check, tests, lint and build pass via project commands.
- Docs and API contracts match behavior.
