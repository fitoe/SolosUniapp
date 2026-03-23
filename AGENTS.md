# Starter AI Context

This file is the primary bootstrap context for AI agents working on this repository.

## Project Identity
- Name: `uniapp-starter-v1`
- Stack: `uni-app + Vue 3 + TypeScript + Vite + Uni Helper + UnoCSS`
- UI library: `uni-ui`
- Request library: `alova`
- Built-in features: `auth`, `chart`

## Architecture Map
- Entry: `src/main.ts`
- App shell: `src/App.vue`
- Layout: `src/layouts/default.vue`
- Auth:
  - `src/core/auth/constants.ts`
  - `src/core/auth/store.ts`
  - `src/core/auth/guard.ts`
- Request:
  - `src/core/request/alova.ts`
  - `src/core/request/http.ts`
- Pages:
  - `src/pages/index.vue`
  - `src/pages/login.vue`
  - `src/pages/me.vue`
  - `src/pages/chart/index.vue`
- Config:
  - `vite.config.ts`
  - `pages.config.ts`
  - `manifest.config.ts`
  - `config/targets.ts`
  - `config/targets-resolver.ts`

## Platform Targets
- `h5`
- `mp-weixin`
- `mp-toutiao`
- `mp-kuaishou`
- `mp-xhs`

## Core Commands
- Install: `pnpm i`
- Clean artifacts: `pnpm clean`
- Type check: `pnpm type-check`
- Lint: `pnpm lint`
- Unit test: `pnpm test:unit`
- E2E test: `pnpm test:e2e`
- Release check: `pnpm release:check`
- Dev:
  - `pnpm dev:h5`
  - `pnpm dev:mp-weixin`
  - `pnpm dev:mp-toutiao`
  - `pnpm dev:mp-kuaishou`
  - `pnpm dev:mp-xhs`
- Build:
  - `pnpm build:h5`
  - `pnpm build:all-mini`
  - `pnpm smoke:build-mini`
- Upload:
  - `pnpm upload:mp`
  - `pnpm upload:douyin`
  - `pnpm upload:kuaishou`
  - `pnpm upload:xhs`
  - `pnpm upload:all`

## Upload Tooling
- Weixin: `miniprogram-ci`
- Douyin: `tt-ide-cli`
- Kuaishou: `ks-miniprogram-ci`
- Xiaohongshu: `xhs-mp-cli`

## Environment Contracts
- Base env examples:
  - `env/.env.example`
  - `env/.env.wechat.example`
- Required base:
  - `VITE_API_HOST`
  - `VITE_API_PATH`
  - `VITE_UPLOAD_HOST`
  - `VITE_UPLOAD_PATH`
- Required app ids:
  - `VITE_APPID_WEIXIN`
  - `VITE_PROJECT_NAME_WEIXIN`
  - `VITE_APPID_TOUTIAO`
  - `VITE_PROJECT_NAME_TOUTIAO`
  - `VITE_APPID_KUAISHOU`
  - `VITE_PROJECT_NAME_KUAISHOU`
  - `VITE_APPID_XHS`
  - `VITE_PROJECT_NAME_XHS`
- Upload secrets:
  - Weixin: `WX_PRIVATE_KEY_PATH_WEIXIN` or `WX_PRIVATE_KEY_WEIXIN_BASE64` or `WX_PRIVATE_KEY_WEIXIN`
  - Douyin: `DOUYIN_TOKEN`
  - Kuaishou: `KS_PRIVATE_KEY_PATH` or `KS_PRIVATE_KEY_BASE64` or `KS_PRIVATE_KEY`
  - Xiaohongshu: `XHS_TOKEN`

## CI Workflows
- Build matrix: `.github/workflows/mini-build.yml`
- Manual upload (weixin): `.github/workflows/upload-weixin.yml`
- Manual upload (all): `.github/workflows/upload-all-mini.yml`

## Security Rules
- Never commit real keys/tokens/appids.
- Keep only example env files in git.
- Run secret scan guidance from `scripts/scan-secrets.md`.
- Validate env before build via `scripts/validate-env.mjs`.

## AI Bootstrap Procedure
1. Read this file.
2. Read `ai-context.json`.
3. Run `pnpm i`.
4. Run `pnpm type-check`.
5. Run `pnpm lint`.
6. Run `pnpm release:check` before release/upload actions.
7. If target changes are requested, update `config/targets.ts`, `manifest.config.ts`, scripts, and README together.
8. If upload flow changes are requested, update scripts plus workflow files plus env docs together.

## Mandatory Testing Rule
- Every component or page change must include tests.
- For component-only changes: add/update Vitest unit tests.
- For page-level changes: add/update both Vitest unit tests and Playwright E2E tests.
- Reference policy: `TESTING_POLICY.md`.
