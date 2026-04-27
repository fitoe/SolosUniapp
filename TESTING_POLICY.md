# Testing Policy (Mandatory)

## Principle
For every new or changed UI unit:
- Component changes must include/adjust unit tests (`Vitest`).
- Page changes must include/adjust both:
  - unit tests (`Vitest`)
  - end-to-end coverage (`Playwright`)

## Required Locations
- Unit tests: `tests/unit/**`
- E2E tests: `tests/e2e/**`

## Required Commands
- `pnpm test`
- `pnpm test:unit`
- `pnpm test:e2e`

## Definition of Done
A UI-related task is not complete until:
1. Unit tests are added/updated.
2. E2E tests are added/updated for user-facing page flows.
3. `pnpm type-check` and `pnpm lint` pass.
