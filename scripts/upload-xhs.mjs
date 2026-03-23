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
const xmc = require('xhs-mp-cli')

async function main() {
  const args = parseCliArgs()
  const env = loadUploadEnv()
  const appid = env.VITE_APPID_XHS
  const token = env.XHS_TOKEN
  const projectPath = `${ROOT_DIR}/dist/build/mp-xhs`
  const { version, desc } = computeUploadMeta(args)

  if (!appid) {
    throw new Error('Missing VITE_APPID_XHS')
  }

  console.log('\n[upload-xhs] building...')
  execSync('pnpm build:mp-xhs', { cwd: ROOT_DIR, stdio: 'inherit' })
  ensureBuildOutput(projectPath)

  if (token && typeof xmc.setAppConfig === 'function') {
    await xmc.setAppConfig({ appid, config: { token } })
  }

  console.log('[upload-xhs] uploading...')
  await xmc.upload({
    project: {
      projectPath,
    },
    version,
    desc,
  })

  console.log('[upload-xhs] success')
}

main().catch((error) => {
  console.error('\n[upload-xhs] failed:', error.message)
  process.exit(1)
})
