# 贡献指南

感谢你为 `uniapp-starter-v1` 做贡献。

## 基本要求

- Node.js 20+
- pnpm 10+
- 提交前通过：`pnpm type-check`、`pnpm lint`、`pnpm test`

## 开发流程

1. Fork 并创建分支（建议：`feat/*`、`fix/*`、`docs/*`）
2. 完成开发与测试
3. 提交 PR，说明变更动机、实现方案、影响范围

## 代码与测试约定

- 使用 TypeScript，保持类型安全
- 新增或修改组件时，必须补充 Vitest 单元测试
- 新增或修改页面时，必须补充 Vitest + Playwright 测试
- 不提交真实密钥与敏感环境变量

## 提交信息建议

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `test: ...`
- `chore: ...`

## PR 检查清单

- [ ] 代码通过 `pnpm type-check`
- [ ] 代码通过 `pnpm lint`
- [ ] 代码通过 `pnpm test`
- [ ] 文档已同步更新（README/AGENTS/ai-context 等）
