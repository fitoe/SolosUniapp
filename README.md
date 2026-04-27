# SolosUniapp

`SolosUniapp` 是一个面向 `H5 + 微信小程序` 的 `uni-app` 起步项目。

它适合用来快速开始一个新业务项目：基础结构已经准备好，常用工程能力也已经接入，你可以把注意力更多放在页面、接口和业务流程本身，而不是重复搭建脚手架。

项目默认保持克制，只保留开发中最常用的一组基础能力：

- `Vue 3 + TypeScript + Vite`
- `UnoCSS`
- `Pinia`
- `alova`
- 微信小程序构建与自动化上传

另外，项目已内置自动引入能力。大多数情况下，在页面和组件里不需要手动引入常用依赖与组件，可以直接沿用现有写法开发。
常见的 Vue API、Pinia API、uni-app 生命周期以及已配置的组件，通常都不需要额外手动引入。

样式方面，项目默认采用 `UnoCSS + 局部自定义 class` 的混合方式：

- 布局、间距、对齐、尺寸、常见文本样式优先用 `UnoCSS`
- 语义明确的区块、重复结构、较长的复合样式优先提炼成自定义 class
- 使用 `wot-design-uni` 组件时，外观优先走组件自身属性
- 尽量少用 `px-[25px]`、`bg-[#fff]`、`shadow-[...]` 这类任意值写法，优先内置 utility、设计 token 或局部 class
- 当模板里的 utility class 已明显影响可读性时，应及时提炼为局部 class

不建议为了追求“全都用原子类”而把模板写成过长的 class 串，优先保证可读性和后续维护效率。

如果你希望要的是一个干净、稳定、能直接继续开发的 uni-app 基础仓库，这个项目就是为这个目的准备的。

## 适用平台

- `h5`
- `mp-weixin`

## 快速开始

1. 安装依赖

```bash
pnpm i
```

2. 准备环境变量

- 基础环境变量参考：`env/.env.example`
- 微信小程序相关变量参考：`env/.env.wechat.example`

3. 启动开发

```bash
pnpm dev:h5
pnpm dev:mp-weixin
```

4. 构建产物

```bash
pnpm build
pnpm build:h5
pnpm build:mp-weixin
```

## 常用命令

```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 单元测试
pnpm test:unit

# H5 E2E
pnpm test:e2e

# 微信小程序冒烟测试
pnpm test:mp:smoke

# 全量测试
pnpm test
```

## 微信小程序

### 本地开发

开发微信小程序时，先运行：

```bash
pnpm dev:mp-weixin
```

然后在微信开发者工具中打开：

```text
dist/dev/mp-weixin
```

### 上传

```bash
pnpm upload:mp
```

上传能力基于 `miniprogram-ci`，需要提前准备：

- `VITE_APPID_WEIXIN`
- `VITE_PROJECT_NAME_WEIXIN`
- `WX_PRIVATE_KEY_PATH_WEIXIN`

或：

- `WX_PRIVATE_KEY_WEIXIN_BASE64`
- `WX_PRIVATE_KEY_WEIXIN`

### 自动化调试

仓库内已提供微信开发者工具自动化调试脚本，适合做页面检查、截图和简单冒烟验证。

这组能力默认面向 AI / Agent 使用。
正常开发时，不需要人主动执行这些调试命令；当任务需要连接微信开发者工具、读取页面状态、截图或执行小程序冒烟验证时，AI 应自动启用。

使用前提：

1. 已执行 `pnpm dev:mp-weixin`
2. 微信开发者工具已打开 `dist/dev/mp-weixin`
3. “设置 -> 安全设置” 已开启服务端口

AI / Agent 需要时可自动调用：

```bash
pnpm debug:mp:enable
pnpm debug:mp:inspect
pnpm debug:mp:screenshot
pnpm test:mp:smoke
```

如果连接失败，优先检查：

- 开发者工具是否打开了正确目录
- 服务端口是否已开启

## 环境变量

基础变量：

- `VITE_API_HOST`
- `VITE_API_PATH`
- `VITE_UPLOAD_HOST`
- `VITE_UPLOAD_PATH`

微信小程序变量：

- `VITE_APPID_WEIXIN`
- `VITE_PROJECT_NAME_WEIXIN`

上传凭证：

- `WX_PRIVATE_KEY_PATH_WEIXIN`
- `WX_PRIVATE_KEY_WEIXIN_BASE64`
- `WX_PRIVATE_KEY_WEIXIN`

## 依赖兼容说明

微信小程序样式链路目前固定了一组 `UnoCSS` 兼容版本，用来避免 `mp-weixin` 构建后样式异常。

当前固定版本：

- `@uni-helper/unocss-preset-uni`: `0.2.11`
- `unocss`: `0.65.4`
- `unocss-applet`: `0.9.0`
- `@unocss/preset-icons`: `0.65.4`
- `@unocss/eslint-config`: `0.65.4`

维护建议：

- 不要把这组依赖改回 `^` 范围版本
- 升级前先验证 `pnpm build:mp-weixin`
- 确认 `dist/build/mp-weixin` 仍正常生成 `app.wxss` 和 `pages/*.wxss`

## 目录结构

- `src/`：业务源码
- `config/`：平台目标与环境解析
- `scripts/`：构建、调试、上传脚本
- `tests/`：Vitest、Playwright、小程序冒烟测试
- `.github/workflows/`：CI 工作流

## 开发约定

- 开发阶段默认按风险分层验证，不要求每次修改都跑全量测试
- 关键流程、高风险改动、回归修复或明确要求时，应补测试并提高验证强度
- 发布前建议执行：

```bash
pnpm type-check
pnpm lint
```

详细规则见：`TESTING_POLICY.md`

## AI 协作文件

如果你会让 AI 或自动化 Agent 参与开发，这几个文件有用：

- `AGENTS.md`
- `ai-context.json`
- `TESTING_POLICY.md`

## 其他说明

- 贡献说明：`CONTRIBUTING.md`
- 发布说明：`RELEASE.md`
- 不要提交真实密钥、Token、AppID
- 许可证：`MIT`
