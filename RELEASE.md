# 发布说明

本项目面向 `h5 + 微信小程序`，发布分为“质量校验”和“微信小程序上传”两步。

## 1. 发布前校验

```bash
pnpm type-check && pnpm lint && pnpm test && pnpm build
```

该命令会依次执行：

1. `pnpm type-check`
2. `pnpm lint`
3. `pnpm test`
4. `pnpm build`

## 2. 平台上传

```bash
# 微信小程序
pnpm upload:mp
```

## 3. 必要环境变量

- 基础：`VITE_API_HOST`、`VITE_API_PATH`、`VITE_UPLOAD_HOST`、`VITE_UPLOAD_PATH`
- 平台：`VITE_APPID_WEIXIN`
- 上传密钥/Token：
  - 微信：`WX_PRIVATE_KEY_PATH_WEIXIN` / `WX_PRIVATE_KEY_WEIXIN_BASE64` / `WX_PRIVATE_KEY_WEIXIN`

## 4. 安全要求

- 不提交真实密钥和 Token
- 发布前执行敏感信息扫描（`scripts/scan-secrets.md`）
