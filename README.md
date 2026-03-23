# uniapp-starter-v1

一个面向多端小程序发布的 `uni-app` 起步模板。  
模板以 `uni-ui + alova + auth + chart` 为固定能力基线，默认支持微信、抖音、快手、小红书四端构建与上传。

## 项目特色

- 固定技术栈：`uni-app + Vue3 + TypeScript + Vite + UnoCSS`
- 固定 UI 组件库：`uni-ui`（兼容主流小程序平台）
- 固定请求方案：`alova`
- 内置业务基础能力：登录鉴权（`auth`）+ 图表页面（`chart`）
- 多端目标映射：统一管理环境与平台参数
- 自动化上传：支持微信、抖音、快手、小红书
- AI 友好：提供 `AGENTS.md`、`ai-context.json`、`TESTING_POLICY.md`

## 支持平台

- `h5`
- `mp-weixin`
- `mp-toutiao`
- `mp-kuaishou`
- `mp-xhs`

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
pnpm dev:mp-toutiao
pnpm dev:mp-kuaishou
pnpm dev:mp-xhs
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
pnpm build:h5
pnpm build:mp-weixin
pnpm build:mp-toutiao
pnpm build:mp-kuaishou
pnpm build:mp-xhs
pnpm build:all-mini
pnpm smoke:build-mini

# 发布前检查（推荐）
pnpm release:check

# 清理产物
pnpm clean
```

## 自动化上传

```bash
# 微信
pnpm upload:mp

# 抖音
pnpm upload:douyin

# 快手
pnpm upload:kuaishou

# 小红书
pnpm upload:xhs

# 四端顺序上传
pnpm upload:all
```

## 必需环境变量

基础变量：

- `VITE_API_HOST`
- `VITE_API_PATH`
- `VITE_UPLOAD_HOST`
- `VITE_UPLOAD_PATH`

平台标识：

- `VITE_APPID_WEIXIN`
- `VITE_PROJECT_NAME_WEIXIN`
- `VITE_APPID_TOUTIAO`
- `VITE_PROJECT_NAME_TOUTIAO`
- `VITE_APPID_KUAISHOU`
- `VITE_PROJECT_NAME_KUAISHOU`
- `VITE_APPID_XHS`
- `VITE_PROJECT_NAME_XHS`

上传凭证：

- 微信：`WX_PRIVATE_KEY_PATH_WEIXIN` 或 `WX_PRIVATE_KEY_WEIXIN_BASE64` 或 `WX_PRIVATE_KEY_WEIXIN`
- 抖音：`DOUYIN_TOKEN`
- 快手：`KS_PRIVATE_KEY_PATH` 或 `KS_PRIVATE_KEY_BASE64` 或 `KS_PRIVATE_KEY`
- 小红书：`XHS_TOKEN`

## 发布流程（建议）

1. 填写环境变量和各平台上传凭证  
2. 执行 `pnpm release:check`  
3. 执行目标上传命令（`pnpm upload:mp` 或 `pnpm upload:all`）

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

建议新会话开始时优先读取这两个文件，以便快速进入可执行状态。

## 安全说明

- 不要提交真实密钥、Token、AppID 机密信息
- 仅提交示例环境文件
- 发布前执行密钥扫描（见 `scripts/scan-secrets.md`）

## 开源协作

- 贡献指南：`CONTRIBUTING.md`
- 发布说明：`RELEASE.md`
- 许可证：`LICENSE`（MIT）
