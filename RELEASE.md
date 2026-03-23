# 发布说明

本项目面向多端小程序，发布分为“质量校验”和“目标平台上传”两步。

## 1. 发布前校验

```bash
pnpm release:check
```

该命令会依次执行：

1. `pnpm clean`
2. `pnpm type-check`
3. `pnpm lint`
4. `pnpm test`
5. `pnpm build:all-mini`
6. `pnpm smoke:build-mini`

## 2. 平台上传

```bash
# 微信
pnpm upload:mp

# 抖音
pnpm upload:douyin

# 快手
pnpm upload:kuaishou

# 小红书
pnpm upload:xhs

# 一次上传四端
pnpm upload:all
```

## 3. 必要环境变量

- 基础：`VITE_API_HOST`、`VITE_API_PATH`、`VITE_UPLOAD_HOST`、`VITE_UPLOAD_PATH`
- 平台：`VITE_APPID_WEIXIN`、`VITE_APPID_TOUTIAO`、`VITE_APPID_KUAISHOU`、`VITE_APPID_XHS`
- 上传密钥/Token：
  - 微信：`WX_PRIVATE_KEY_PATH_WEIXIN` / `WX_PRIVATE_KEY_WEIXIN_BASE64` / `WX_PRIVATE_KEY_WEIXIN`
  - 抖音：`DOUYIN_TOKEN`
  - 快手：`KS_PRIVATE_KEY_PATH` / `KS_PRIVATE_KEY_BASE64` / `KS_PRIVATE_KEY`
  - 小红书：`XHS_TOKEN`

## 4. 安全要求

- 不提交真实密钥和 Token
- 发布前执行敏感信息扫描（`scripts/scan-secrets.md`）
