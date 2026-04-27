# Starter AI Context

This file is the primary bootstrap context for AI agents working on this repository.

## Project Identity
- Name: `SolosUniapp`
- Stack: `uni-app + Vue 3 + TypeScript + Vite + Uni Helper + UnoCSS`
- UI library: `none`
- Request library: `alova`
- Built-in features: `basic-home`

## Architecture Map
- Entry: `src/main.ts`
- App shell: `src/App.vue`
- Layout: `src/layouts/default.vue`
- Request:
  - `src/core/request/alova.ts`
  - `src/core/request/http.ts`
- Pages:
  - `src/pages/index.vue`
- Config:
  - `vite.config.ts`
  - `pages.config.ts`
  - `manifest.config.ts`
  - `config/targets.ts`
  - `config/targets-resolver.ts`

## Platform Targets
- `h5`
- `mp-weixin`

## Core Commands
- Install: `pnpm i`
- Type check: `pnpm type-check`
- Lint: `pnpm lint`
- Unit test: `pnpm test:unit`
- E2E test: `pnpm test:e2e`
 - MP smoke test: `pnpm test:mp:smoke`
- Dev:
  - `pnpm dev:h5`
  - `pnpm dev:mp-weixin`
- Build:
  - `pnpm build`
  - `pnpm build:h5`
- Upload:
  - `pnpm upload:mp`

## Upload Tooling
- Weixin: `miniprogram-ci`

## Wechat Devtools Automation
- CLI command: `cli auto --project <path> --auto-port <port>`
- SDK: `miniprogram-automator`
- Windows shell: Git Bash preferred
- Wrapper script: `scripts/wechat-devtools.mjs`
- Enable script: `scripts/wechat-devtools-enable.mjs` + `scripts/wechat-devtools-enable.sh`
- Smoke script: `scripts/mp-weixin-smoke.mjs`
- Default project path: `dist/dev/mp-weixin`
- Agent rule:
  - When the task involves `mp-weixin` page debugging, page stack inspection, screenshots, or element interaction in Wechat DevTools, enable automation automatically instead of asking the user to run an npm command.
  - Before enabling, confirm `dist/dev/mp-weixin` exists. If it does not, tell the user to run `pnpm dev:mp-weixin` first.
  - On Windows, prefer `scripts/wechat-devtools-enable.mjs`, which routes through Git Bash.
  - For inspection, use `node ./scripts/wechat-devtools.mjs inspect`.
  - For screenshots, use `node ./scripts/wechat-devtools.mjs screenshot`.
  - For smoke validation, use `pnpm test:mp:smoke`.
  - If the automation port cannot be reached, clearly tell the user to check that Wechat DevTools has opened `dist/dev/mp-weixin` and that “设置 -> 安全设置 -> 服务端口” is enabled.

## Shell Execution Rule
- On Windows, prefer Git Bash for shell-style commands instead of direct PowerShell composition.
- Use Git Bash especially when commands include `&&`, `||`, inline env vars, shell pipes, globbing, redirection, or `.sh` scripts.
- Keep PowerShell only for PowerShell-native commands such as `Get-ChildItem`, `Get-Process`, `Get-NetTCPConnection`, and other Windows-native inspection tasks.
- If Git Bash is needed, prefer `C:\Program Files\Git\bin\bash.exe` and fall back to `GIT_BASH_PATH` when configured.
- Avoid long multi-step PowerShell command strings when the same operation can be expressed more simply through Git Bash or a dedicated script file.

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
- Upload secrets:
  - Weixin: `WX_PRIVATE_KEY_PATH_WEIXIN` or `WX_PRIVATE_KEY_WEIXIN_BASE64` or `WX_PRIVATE_KEY_WEIXIN`

## CI Workflows
- Build matrix: `.github/workflows/mini-build.yml`
- Manual upload (weixin): `.github/workflows/upload-weixin.yml`
- Manual upload (all): `.github/workflows/upload-all-mini.yml`

## Security Rules
- Never commit real keys/tokens/appids.
- Keep only example env files in git.
- Run secret scan guidance from `scripts/scan-secrets.md`.

## AI Bootstrap Procedure
1. Read this file.
2. Read `ai-context.json`.
3. Run `pnpm i`.
4. Run `pnpm type-check`.
5. Run `pnpm lint`.
6. Run `pnpm test` and `pnpm build` before release/upload actions.
7. If target changes are requested, update `config/targets.ts`, `manifest.config.ts`, scripts, and README together.
8. If upload flow changes are requested, update scripts plus workflow files plus env docs together.

## Mandatory Testing Rule
- Every component or page change must include tests.
- For component-only changes: add/update Vitest unit tests.
- For page-level changes: add/update both Vitest unit tests and Playwright E2E tests.
- Reference policy: `TESTING_POLICY.md`.
