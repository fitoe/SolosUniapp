import { Buffer } from 'node:buffer'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import ci from 'miniprogram-ci'
import {
  computeUploadMeta,
  ensureBuildOutput,
  loadUploadEnv,
  parseCliArgs,
  ROOT_DIR,
} from './upload-shared.mjs'

function resolveTargetConfig(target, env) {
  if (target === 'weixin') {
    return {
      appid: env.VITE_APPID_WEIXIN,
      projectName: env.VITE_PROJECT_NAME_WEIXIN || 'weixin-project',
      buildCmd: 'pnpm build:mp-weixin',
      projectPath: path.resolve(ROOT_DIR, 'dist', 'build', 'mp-weixin'),
      privateKeyPathEnv: env.WX_PRIVATE_KEY_PATH_WEIXIN,
      privateKeyBase64Env: env.WX_PRIVATE_KEY_WEIXIN_BASE64,
      privateKeyRawEnv: env.WX_PRIVATE_KEY_WEIXIN,
    }
  }
  throw new Error('Unsupported target: use --target=weixin')
}

function resolvePrivateKeyFile(config) {
  if (config.privateKeyPathEnv && fs.existsSync(path.resolve(ROOT_DIR, config.privateKeyPathEnv))) {
    return path.resolve(ROOT_DIR, config.privateKeyPathEnv)
  }

  if (config.privateKeyBase64Env) {
    const content = Buffer.from(config.privateKeyBase64Env, 'base64').toString('utf-8')
    const tempPath = path.join(os.tmpdir(), `mini-upload-${config.appid}.key`)
    fs.writeFileSync(tempPath, content, 'utf-8')
    return tempPath
  }

  if (config.privateKeyRawEnv) {
    const content = config.privateKeyRawEnv.replace(/\\n/g, '\n')
    const tempPath = path.join(os.tmpdir(), `mini-upload-${config.appid}.key`)
    fs.writeFileSync(tempPath, content, 'utf-8')
    return tempPath
  }

  const defaultKeyPath = path.resolve(ROOT_DIR, `private.${config.appid}.key`)
  if (fs.existsSync(defaultKeyPath)) {
    return defaultKeyPath
  }

  throw new Error(`Private key not found for appid ${config.appid}`)
}

async function uploadMiniProgram({ appid, projectPath, privateKeyPath, version, desc, robot }) {
  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath,
    ignores: ['node_modules/**/*'],
  })

  await ci.upload({
    project,
    version,
    desc,
    robot,
    setting: {
      es6: true,
      es7: true,
      minify: true,
      autoPrefixWXSS: true,
      minifyWXML: true,
      minifyWXSS: true,
      minifyJS: true,
    },
    onProgressUpdate(task) {
      if (task._status === 'done') {
        console.log(`  ${task._msg}`)
      }
    },
  })
}

async function main() {
  const args = parseCliArgs()
  const env = loadUploadEnv()
  const config = resolveTargetConfig(args.target, env)

  if (!config.appid) {
    throw new Error(`Missing appid for target ${args.target}`)
  }

  const { version, desc } = computeUploadMeta(args)
  const privateKeyPath = resolvePrivateKeyFile(config)

  console.log(`\n[upload] target: ${args.target}`)
  console.log(`[upload] appid: ${config.appid}`)
  console.log(`[upload] project: ${config.projectName}`)
  console.log(`[upload] version: ${version}`)
  console.log(`[upload] desc: ${desc}`)
  console.log(`[upload] robot: ${args.robot}`)
  console.log(`[upload] private key: ${privateKeyPath}`)

  console.log('\n[upload] building...')
  execSync(config.buildCmd, { cwd: ROOT_DIR, stdio: 'inherit' })

  ensureBuildOutput(config.projectPath)
  console.log('\n[upload] uploading...')
  await uploadMiniProgram({
    appid: config.appid,
    projectPath: config.projectPath,
    privateKeyPath,
    version,
    desc,
    robot: args.robot,
  })

  console.log('\n[upload] success')
}

main().catch((error) => {
  console.error('\n[upload] failed:', error.message)
  process.exit(1)
})
