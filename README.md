# uniapp-starter-v1

一个面向 `h5 + 微信小程序` 的 `uni-app` 起步模板。
模板以 `alova + 基础首页` 为默认基线，支持 `h5` 与微信小程序构建，并提供微信小程序上传。

## 项目特色

- 固定技术栈：`uni-app + Vue3 + TypeScript + Vite + UnoCSS`
- 固定请求方案：`alova`
- 默认只保留一个基础首页，便于继续开发
- 双端目标映射：统一管理环境与平台参数
- 自动化上传：支持微信小程序
- AI 友好：提供 `AGENTS.md`、`ai-context.json`、`TESTING_POLICY.md`

## 支持平台

- `h5`
- `mp-weixin`

## 快速开始

1. 安装依赖

```bash
pnpm i
```

2. 准备环境变量

- 复制并填写：`env/.env.example`
- 微信上传场景可额外参考：`env/.env.wechat.example`

3. 本地开发

```bash
pnpm dev:h5
pnpm dev:mp-weixin
```

## 常用命令

```bash
# 质量检查
pnpm type-check
pnpm lint

# 测试
pnpm test:unit
pnpm test:e2e
pnpm test

# 构建
pnpm build
pnpm build:h5
pnpm build:mp-weixin
```

## 自动化上传

```bash
# 微信小程序
pnpm upload:mp
```

## 微信开发者工具自动化调试

这套能力走微信官方自动化链路：

- `cli auto --auto-port`
- `miniprogram-automator`

适合在开发时做这些事：

- 连接开发者工具中的小程序
- 输出当前页面和页面栈
- 截图

使用前提：

1. 先运行 `pnpm dev:mp-weixin`
2. 在微信开发者工具里打开 `dist/dev/mp-weixin`
3. 在“设置 -> 安全设置”里开启服务端口

这套能力默认给 AI/Agent 使用，不再暴露 npm 命令入口。
当任务涉及微信小程序页面调试、页面栈、截图、元素交互时，Agent 应自动执行：

1. 确认 `dist/dev/mp-weixin` 已存在，否则提示先运行 `pnpm dev:mp-weixin`
2. 执行 `scripts/wechat-devtools-enable.mjs`
3. 需要读取状态时执行 `scripts/wechat-devtools.mjs inspect`
4. 需要截图时执行 `scripts/wechat-devtools.mjs screenshot`

如果自动化端口连接失败，应明确提示：

- 先确认微信开发者工具已打开 `dist/dev/mp-weixin`
- 确认“设置 -> 安全设置”已开启服务端口
- 再重试自动启用和连接

可选环境变量：

- `GIT_BASH_PATH`：Windows 下自定义 Git Bash 路径
- `WECHAT_DEVTOOLS_CLI`：自定义微信开发者工具 `cli` 路径
- `WECHAT_DEVTOOLS_HTTP_PORT`：开发者工具当前 HTTP 服务端口
- `WECHAT_AUTO_PORT`：自动化 WebSocket 端口，默认 `9420`
- `WECHAT_MINIPROGRAM_PROJECT_PATH`：要连接的小程序项目目录，默认 `dist/dev/mp-weixin`

调试产物约定：

- Playwright 输出：`.tmp/playwright/test-results`
- Automator 默认截图：`.tmp/automator/`
- 以上目录已加入 `.gitignore`

## 必需环境变量

基础变量：

- `VITE_API_HOST`
- `VITE_API_PATH`
- `VITE_UPLOAD_HOST`
- `VITE_UPLOAD_PATH`

平台标识：

- `VITE_APPID_WEIXIN`
- `VITE_PROJECT_NAME_WEIXIN`

上传凭证：

- 微信：`WX_PRIVATE_KEY_PATH_WEIXIN` 或 `WX_PRIVATE_KEY_WEIXIN_BASE64` 或 `WX_PRIVATE_KEY_WEIXIN`

## 发布流程（建议）

1. 填写环境变量和微信上传凭证
2. 执行 `pnpm type-check && pnpm lint && pnpm test`
3. 执行 `pnpm build` 或 `pnpm build:h5`
4. 执行上传命令（`pnpm upload:mp`）

## 目录说明

- `src/`：业务源码
- `config/`：目标平台映射与解析
- `scripts/`：环境校验、构建检查、上传脚本
- `tests/`：Vitest + Playwright 测试
- `.github/workflows/`：CI 工作流

## 测试原则

本模板将测试作为默认开发原则：

- 组件修改必须补充或更新单元测试（Vitest）
- 页面修改必须同时补充或更新单元测试与 E2E 测试（Playwright）

详情见：`TESTING_POLICY.md`

## AI 协作说明

- `AGENTS.md`：给 AI/开发者的架构与工作约束
- `ai-context.json`：给自动化 Agent 的结构化上下文
- 微信小程序开发者工具自动化优先按 `AGENTS.md` 中的规则自动启用

建议新会话开始时优先读取这两个文件，以便快速进入可执行状态。

## 安全说明

- 不要提交真实密钥、Token、AppID 机密信息
- 仅提交示例环境文件
- 发布前执行密钥扫描（见 `scripts/scan-secrets.md`）

## 开源协作

- 贡献指南：`CONTRIBUTING.md`
- 发布说明：`RELEASE.md`
- 许可证：`LICENSE`（MIT）
