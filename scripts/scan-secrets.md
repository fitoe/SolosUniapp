# Secret Scan Checklist

## Local pre-commit checks
1. Ensure no real values are present in tracked files:
   - appid
   - private key
   - push token / aes key
   - map provider keys
2. Keep only example env files in git:
   - `env/.env.example`
   - `env/.env.wechat.example`

## Recommended command
Use your preferred scanner before release, for example:

```bash
gitleaks detect --source . --verbose
```

## Block release when
- Any secret is found in tracked files.
- `validate-env.mjs` fails for the target build.
