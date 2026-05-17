# SolosUniapp AI 协作规则

本文件用于约束 AI / Agent 在本仓库中的默认工作方式。

## 1. 项目概况

- 项目名：`SolosUniapp`
- 技术栈：`uni-app + Vue 3 + TypeScript + Vite + UnoCSS`
- UI 库：`wot-design-uni`
- 请求方案：`alova`
- 当前首页能力：`home-playground`
- 目标平台：`h5`、`mp-weixin`

核心文件：

- 入口：`src/main.ts`
- 首页：`src/pages/index.vue`
- Layout：`src/layouts/default.vue`
- 请求层：`src/core/request/alova.ts`、`src/core/request/http.ts`
- 配置：`vite.config.ts`、`pages.config.ts`、`manifest.config.ts`

自动引入约定：

- 仓库已内置自动引入能力。
- 大多数情况下不需要在页面或组件中手动引入常用依赖与组件。
- 修改页面或组件时，优先遵循现有自动引入方式，不要无必要补手动 import。
- 对于 `computed`、`ref`、`defineStore`、常用 `uni-app` 生命周期、已注册组件等，默认先假设自动引入可用，不要因为个人习惯补手动 import。

H5 路由 / 原生 TabBar 约定：

- `src/pages.json` 是 uni-pages 生成但必须提交的模板源文件，不得加入 `.gitignore`。
- 原因：Cloudflare Pages / GitHub Actions 等 clean checkout 构建只读取 Git 中的文件；如果 `src/pages.json` 未提交，本地构建可能正常，但自动构建的 H5 包可能缺少 `uni-tabbar` runtime，导致发布后原生 TabBar 不显示。
- 修改 `pages.config.ts`、页面 `definePage`、TabBar 或 uni-pages 插件配置后，应重新生成/检查 `src/pages.json`，并确认 `git ls-files src/pages.json` 有输出。
- 发布前如涉及 H5 TabBar，至少执行 `pnpm build:h5` 并检查 `dist/build/h5/assets/*.js` 中包含 `uni-tabbar`；线上异常时优先比对本地/线上 bundle marker，而不是先做 CSS 小修。

样式约定：

- 项目已接入 `UnoCSS`，默认优先使用其能力处理布局、间距、对齐、尺寸、常见文本样式和一次性视觉修饰。
- 遇到语义明确的区块、重复结构或较长的复合样式时，优先提炼为自定义 class，不要把模板堆成过长的原子类串。
- 使用 `wot-design-uni` 组件时，外观优先使用组件自身提供的 `type`、`size`、`plain`、`block` 等能力，再考虑用 UnoCSS 或局部 class 补充。
- 避免大量使用 `px-[25px]`、`bg-[#fff]`、`shadow-[...]` 这类任意值写法；优先使用内置 token、内置 utility 或提炼为局部 class。
- 不追求“全都用原子类”，应优先保证可读性、可维护性和后续修改效率。
- 当一组 utility class 明显影响模板可读性，或同一组样式重复出现时，应优先提炼为局部 class。

## 2. 默认执行风格

- 默认先做后报。
- 需求明确且风险不高时，直接执行，不先征求确认。
- 过程汇报保持少量高信号，只在以下时机简短同步：
  - 开始执行
  - 关键发现
  - 准备修改
  - 完成验证

以下情况才应阻断并提问：

- 删改范围大
- 涉及数据或不可逆风险
- 目标行为不明确
- 与现有未提交改动冲突

## 3. 测试与验证规则

- 默认采用按风险分层的验证策略，不要求每次修改都跑测试。
- 小改动默认只做最小必要验证。
- 日常开发中不强制每次补测试。
- 日常开发中不强制每次跑 `pnpm test` 或 `pnpm build`。

交付前默认检查：

- `pnpm type-check`
- `pnpm lint`
- 根据改动范围按需运行相关测试

以下情况才强制补测试或提高验证强度：

- 高风险逻辑改动
- 回归修复
- 关键页面流程改动
- 用户明确要求补测试

只有在明确需要时才跑全量测试或完整构建。

## 4. 代码修改边界

- 默认保持严格最小改动。
- 允许提升一致性，但范围只限当前触及区域。
- 可以整理当前改动附近或直接接触到的代码。
- 不主动扩散到其它模块。
- 不做跨模块顺手重构。
- 对于已由自动引入覆盖的依赖或组件，不要因为个人习惯改回手动引入。
- 对于样式实现，遵循“布局与一次性样式优先 UnoCSS，语义块与重复结构优先自定义 class”的边界。
- 对于不适合用内置 utility 表达的样式，优先提炼局部 class，而不是堆叠大量任意值 utility。
- 对于组件库组件，先用组件自身 props 完成外观配置，不要优先通过包裹层样式或覆写样式强行改外观。

发现历史问题或第三方库问题时：

- 只在与当前任务直接相关时作为阻断项
- 无关问题只简短说明，不阻止推进

## 5. 微信小程序调试规则

当任务涉及 `mp-weixin` 的页面调试、页面栈检查、截图、元素交互或冒烟验证时：

- 不要让用户手动执行调试命令。
- 应自动启用微信开发者工具自动化能力。

执行规则：

1. 先确认 `dist/dev/mp-weixin` 是否存在。
2. 如果不存在，提示用户先运行 `pnpm dev:mp-weixin`。
3. 在 Windows 上优先使用 `scripts/wechat-devtools-enable.mjs`。
4. 需要页面状态时使用 `node ./scripts/wechat-devtools.mjs inspect`。
5. 需要截图时使用 `node ./scripts/wechat-devtools.mjs screenshot`。
6. 需要冒烟验证时使用 `pnpm test:mp:smoke`。

如果连接失败，应明确提示用户检查：

- 微信开发者工具是否已打开 `dist/dev/mp-weixin`
- “设置 -> 安全设置 -> 服务端口”是否已开启

## 6. Windows Shell 规则

- 在 Windows 上，优先使用 Git Bash 执行 shell 风格命令。
- 含 `&&`、`||`、管道、重定向、glob、内联环境变量、`.sh` 脚本时，优先 Git Bash。
- PowerShell 仅用于 Windows 原生命令，如：
  - `Get-ChildItem`
  - `Get-Process`
  - `Get-NetTCPConnection`
- Git Bash 默认路径：`C:\Program Files\Git\bin\bash.exe`
- 如有配置，可回退到环境变量 `GIT_BASH_PATH`

## 7. 文档、提交与工作区规则

- 文档默认只在外部可见变化时同步更新：
  - 命令变了
  - 配置方式变了
  - 使用流程变了
  - 对外行为变了
- 不要求内部实现小改动都同步 README。
- 当用户要求提交时，默认尽量拆成小提交。
- 默认继续在当前分支开发，不主动新建分支或工作树，除非用户明确要求。

## 8. 常用命令

- 安装依赖：`pnpm i`
- H5 开发：`pnpm dev:h5`
- 小程序开发：`pnpm dev:mp-weixin`
- 类型检查：`pnpm type-check`
- 代码检查：`pnpm lint`
- 单元测试：`pnpm test:unit`
- H5 E2E：`pnpm test:e2e`
- 小程序冒烟测试：`pnpm test:mp:smoke`
- 构建：`pnpm build`、`pnpm build:h5`、`pnpm build:mp-weixin`
- 上传微信小程序：`pnpm upload:mp`

## 9. 环境变量

基础变量：

- `VITE_API_HOST`
- `VITE_API_PATH`
- `VITE_UPLOAD_HOST`
- `VITE_UPLOAD_PATH`

微信小程序变量：

- `VITE_APPID_WEIXIN`
- `VITE_PROJECT_NAME_WEIXIN`

上传密钥：

- `WX_PRIVATE_KEY_PATH_WEIXIN`
- `WX_PRIVATE_KEY_WEIXIN_BASE64`
- `WX_PRIVATE_KEY_WEIXIN`

示例文件：

- `env/.env.example`
- `env/.env.wechat.example`

## 10. 安全与维护

- 不要提交真实密钥、Token 或 AppID。
- 只保留示例环境文件。
- 发布前按 `scripts/scan-secrets.md` 做敏感信息检查。
- 如果调整平台目标、上传流程或关键脚本，记得同时更新 README、相关配置和工作流文件。
