# Testing Policy (Risk-Based)

## Principle
Testing follows risk, not a fixed all-or-nothing rule.

The goal is to keep daily development efficient while still requiring stronger verification for risky changes.

## Risk Levels

### Low Risk

Examples:

- 文案调整
- 样式微调
- 低影响结构调整
- 不改变核心行为的小改动

Rules:

- 不强制新增测试
- 只做最小必要验证
- 不要求默认跑全量测试

### Medium Risk

Examples:

- 普通交互调整
- 组件行为改动
- 一般页面逻辑调整
- 配置改动但影响面有限

Rules:

- 建议补相关测试
- 优先运行与改动直接相关的检查或测试
- 不要求默认跑全量测试，除非验证结果不足以覆盖风险

### High Risk

Examples:

- 关键逻辑改动
- 回归修复
- 关键页面流程改动
- 影响上传、平台行为、构建链路的改动
- 用户明确要求补测试

Rules:

- 必须补充或更新相应测试
- 必须运行与该风险匹配的测试
- 必要时扩大到页面流程验证、完整构建或更完整的测试集

## Recommended Checks

### Daily Development

- 默认先做最小必要验证
- 不要求每次修改都跑 `pnpm test`
- 不要求每次修改都跑 `pnpm build`

### Before Handoff

默认至少执行：

- `pnpm type-check`
- `pnpm lint`
- 根据改动范围按需运行相关测试

只有在明确需要时，才执行：

- `pnpm test`
- `pnpm build`

## Test Locations

- Unit tests: `tests/unit/**`
- E2E tests: `tests/e2e/**`

## Definition of Done

A task is complete when verification matches its risk level:

1. 低风险改动完成最小必要验证。
2. 中风险改动完成相关检查，必要时补相关测试。
3. 高风险改动完成相应测试补充与验证。
4. 交付前默认完成 `pnpm type-check`、`pnpm lint` 和按需测试。
