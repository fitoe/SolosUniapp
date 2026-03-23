import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import process from 'node:process'
import {
  computeUploadMeta,
  ensureBuildOutput,
  loadUploadEnv,
  parseCliArgs,
  ROOT_DIR,
} from './upload-shared.mjs'

const require = createRequire(import.meta.url)
const tma = require('tt-ide-cli')

async function main() {
  const args = parseCliArgs()
  const env = loadUploadEnv()
  const appid = env.VITE_APPID_TOUTIAO
  const token = env.DOUYIN_TOKEN

  if (!appid) {
    throw new Error('Missing VITE_APPID_TOUTIAO')
  }

  const projectPath = `${ROOT_DIR}/dist/build/mp-toutiao`
  const { version, desc } = computeUploadMeta(args)

  console.log('\n[upload-douyin] building...')
  execSync('pnpm build:mp-toutiao', { cwd: ROOT_DIR, stdio: 'inherit' })
  ensureBuildOutput(projectPath)

  if (token && typeof tma.setAppConfig === 'function') {
    await tma.setAppConfig({ appid, config: { token } })
  }

  console.log('[upload-douyin] uploading...')
  await tma.upload({
    project: {
      path: projectPath,
    },
    appVersion: version,
    appChangelog: desc,
    channel: env.DOUYIN_CHANNEL || 'stable',
  })

  console.log('[upload-douyin] success')
}

main().catch((error) => {
  console.error('\n[upload-douyin] failed:', error.message)
  process.exit(1)
})
