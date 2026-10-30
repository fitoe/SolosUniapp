# SolosUniapp

## 基于模板开始新项目

1. 确认目标平台、页面和接口契约，参考 `env/.env.example` 和 `env/.env.wechat.example` 配置本地环境。不要提交真实凭证。
2. 在 `manifest.config.ts`、`pages.config.ts` 和页面的 `definePage` 中调整应用信息与路由。修改路由后检查生成的 `src/pages.json` 并提交它。
3. 从 `src/pages/index.vue`、`src/pages/mine.vue` 和 `src/pages/chart/index.vue` 的示例出发，按业务替换页面；请求入口在 `src/core/request/`。`src/features/` 存放示例状态、登录与本地列表数据，`src/pages/examples/` 展示列表、详情及加载、空数据、错误状态；它们可随对应页面一起替换或删除。
4. **示例登录不是生产鉴权**：`src/features/demo-auth/service.ts` 生成演示会话。上线前必须对接服务端登录、令牌校验和权限控制，前端路由守卫不能代替服务端权限检查。列表数据同样是本地演示，不会访问后端。
5. 按改动风险运行 `pnpm check` 和相关测试；涉及平台构建链时顺序运行 `pnpm build:h5`、`pnpm build:mp-weixin`，避免生成文件写入冲突。

### 给 AI 的任务说明

先让 AI 阅读 `AGENTS.md`、本节和相关代码，再提供业务目标、目标平台、接口契约、验收条件以及不能修改的范围。对于新页面，说明加载、空数据、失败和权限状态；对于接口，提供字段、错误码和认证方式。要求 AI 说明实际修改与验证结果，避免把示例数据或演示登录当作真实业务实现。

```text
基于本仓库实现 [业务目标]，目标平台是 [H5/微信小程序]。
接口契约：[地址、字段、认证和错误处理]。
验收条件：[主要流程、空/错误状态]。
请遵循 AGENTS.md，先检查现有实现，完成后报告修改和验证结果。
```

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

## H5 路由与原生 TabBar 发布注意

本模板使用 `@uni-helper/vite-plugin-uni-pages` 从 `pages.config.ts` 和页面 `definePage` 生成 `src/pages.json`。当前模板没有配置原生 TabBar；以下检查适用于后续添加 TabBar 的项目。

`src/pages.json` 必须作为模板源文件保留并提交到 Git，不能放回 `.gitignore`。原因是 H5 的原生 `tabBar` 运行时代码依赖构建时可读到完整 `pages.json`：

- 本地开发/手动上传时，工作区里常常残留 `src/pages.json`，所以 TabBar 看起来正常；
- Cloudflare Pages、GitHub Actions 等 clean checkout 自动构建只会拿 Git 中已提交的文件；
- 如果 `src/pages.json` 被忽略未提交，自动构建产物可能只保留 TabBar 文案配置，却缺少真正的 `uni-tabbar` runtime，导致发布后底部 TabBar 不显示。

涉及 H5 原生 TabBar、页面路由、`pages.config.ts`、`definePage` 或 uni-pages 插件配置时，发布前至少检查：

```bash
git ls-files src/pages.json
git check-ignore -v src/pages.json || true
pnpm build:h5
grep -R "uni-tabbar" dist/build/h5/assets/*.js
```

如果自动构建发布后 TabBar 消失，优先比较本地和线上入口 JS bundle 是否都包含 `uni-tabbar`，不要先从 CSS 遮挡或页面实现小修入手。

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
只有用户在当前轮明确要求操作微信开发者工具时，AI 才可启动或连接它。仅询问意外启动的原因时，只进行只读系统诊断。

使用前提：

1. 已执行 `pnpm dev:mp-weixin`
2. 微信开发者工具已打开 `dist/dev/mp-weixin`
3. “设置 -> 安全设置” 已开启服务端口

获得上述明确要求后，AI / Agent 可调用：

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

uni-app 核心包需要保持同一版本，当前使用 Vue 3 发布通道的 `3.0.0-5030420261029001`；该版本的 Vite 插件要求 `vite@5.2.8`。不要单独升级其中一个核心包或直接按 npm 的 `latest` 标签选择 uni-app 版本。升级时应先检查对应 `vue3` 标签及其 peer 依赖，并顺序验证两个目标的构建。

Vue 和 VueUse 分别固定到与 uni-app 编译器匹配的 3.4.21、11.3.0。`pnpm-workspace.yaml` 将 lint 插件固定到兼容 TypeScript 5 的版本，并将微信上传工具使用的 Babel ESLint 解析器更新到支持 ESLint 9 的版本。升级相应上游依赖时应复查并移除不再需要的覆盖。

仍有一个开发工具 peer 警告：UnoCSS 0.65.4 的 inspector 间接依赖 `vue-flow-layout`，要求 Vue 3.4.37 以上，与 uni-app 固定的 Vue 3.4.21 不一致。构建与测试通过不代表 inspector 本身已验证；升级 UnoCSS 兼容组时应重新检查。

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
- `src/features/`：按能力组织的示例模块，作为新业务的参考而非生产实现
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

`AGENTS.md` 是 AI 工作规则的唯一来源，`ai-context.json` 只记录项目事实、入口和命令。请求层默认给 API 和上传请求附加有效会话的 Bearer token；对接后端时应根据接口要求调整。`getBusiness` / `postBusiness` 使用示例的 `code` 响应约定，普通请求不强制该格式。

图表示例使用仓库内的 `src/components/qiun-*` 封装与 `@qiun/ucharts`；它是可选示例，移除时需同时删除图表页面、组件、依赖和相应测试。上游来源、版本核对结果及许可证见 `third-party/ucharts/`。

## 其他说明

- 贡献说明：`CONTRIBUTING.md`
- 发布说明：`RELEASE.md`
- 不要提交真实密钥、Token、AppID
- 许可证：`MIT`
