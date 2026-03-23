import process from 'node:process'

const REQUIRED_ENV_KEYS = [
  'VITE_API_HOST',
  'VITE_API_PATH',
  'VITE_UPLOAD_HOST',
  'VITE_UPLOAD_PATH',
]

const REQUIRED_MINI_ENV_KEYS = [
  'VITE_APPID_WEIXIN',
  'VITE_PROJECT_NAME_WEIXIN',
  'VITE_APPID_TOUTIAO',
  'VITE_PROJECT_NAME_TOUTIAO',
  'VITE_APPID_KUAISHOU',
  'VITE_PROJECT_NAME_KUAISHOU',
  'VITE_APPID_XHS',
  'VITE_PROJECT_NAME_XHS',
]

function getMissingKeys(keys) {
  return keys.filter(key => !process.env[key] || `${process.env[key]}`.trim().length === 0)
}

function main() {
  const lifecycleEvent = process.env.npm_lifecycle_event || ''
  const isMiniBuild = lifecycleEvent.includes('mp-')

  const missingBase = getMissingKeys(REQUIRED_ENV_KEYS)
  const missingMini = isMiniBuild ? getMissingKeys(REQUIRED_MINI_ENV_KEYS) : []
  const missing = [...missingBase, ...missingMini]

  if (missing.length > 0) {
    console.error('[validate-env] Missing required environment variables:')
    for (const key of missing) {
      console.error(`- ${key}`)
    }
    process.exit(1)
  }

  console.log('[validate-env] OK')
}

main()
