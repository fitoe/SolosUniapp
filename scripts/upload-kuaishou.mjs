import { Buffer } from 'node:buffer'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import ksCI from 'ks-miniprogram-ci'
import {
  computeUploadMeta,
  ensureBuildOutput,
  loadUploadEnv,
  parseCliArgs,
  ROOT_DIR,
} from './upload-shared.mjs'

function resolvePrivateKeyFile(appid, env) {
  const pathEnv = env.KS_PRIVATE_KEY_PATH
  const base64Env = env.KS_PRIVATE_KEY_BASE64
  const rawEnv = env.KS_PRIVATE_KEY

  if (pathEnv && fs.existsSync(path.resolve(ROOT_DIR, pathEnv))) {
    return path.resolve(ROOT_DIR, pathEnv)
  }

  if (base64Env) {
    const content = Buffer.from(base64Env, 'base64').toString('utf-8')
    const tempPath = path.join(os.tmpdir(), `ks-mini-upload-${appid}.key`)
    fs.writeFileSync(tempPath, content, 'utf-8')
    return tempPath
  }

  if (rawEnv) {
    const content = rawEnv.replace(/\\n/g, '\n')
    const tempPath = path.join(os.tmpdir(), `ks-mini-upload-${appid}.key`)
    fs.writeFileSync(tempPath, content, 'utf-8')
    return tempPath
  }

  const defaultPath = path.resolve(ROOT_DIR, `private.${appid}.key`)
  if (fs.existsSync(defaultPath)) {
    return defaultPath
  }

  throw new Error(`Kuaishou private key not found for appid ${appid}`)
}

async function main() {
  const args = parseCliArgs()
  const env = loadUploadEnv()

  const appid = env.VITE_APPID_KUAISHOU
  if (!appid) {
    throw new Error('Missing VITE_APPID_KUAISHOU')
  }

  const projectPath = path.resolve(ROOT_DIR, 'dist', 'build', 'mp-kuaishou')
  const privateKeyPath = resolvePrivateKeyFile(appid, env)
  const { version, desc } = computeUploadMeta(args)

  console.log('\n[upload-kuaishou] building...')
  execSync('pnpm build:mp-kuaishou', { cwd: ROOT_DIR, stdio: 'inherit' })

  ensureBuildOutput(projectPath)
  console.log('[upload-kuaishou] uploading...')

  const project = new ksCI.Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
    ignores: ['node_modules/**/*'],
  })

  await ksCI.upload({
    project,
    version,
    desc,
    setting: {
      minify: true,
      minifyJS: true,
      minifyCSS: true,
    },
  })

  console.log('[upload-kuaishou] success')
}

main().catch((error) => {
  console.error('\n[upload-kuaishou] failed:', error.message)
  process.exit(1)
})
