import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export const ROOT_DIR = process.cwd()

export function parseCliArgs() {
  const args = process.argv.slice(2)
  const params = {
    target: '',
    version: '',
    desc: '',
    robot: 1,
  }

  for (const arg of args) {
    if (arg.startsWith('--target=')) {
      params.target = arg.split('=')[1]
    }
    else if (arg.startsWith('--version=')) {
      params.version = arg.split('=')[1]
    }
    else if (arg.startsWith('--desc=')) {
      params.desc = arg.split('=')[1]
    }
    else if (arg.startsWith('--robot=')) {
      params.robot = Number.parseInt(arg.split('=')[1], 10)
    }
  }

  return params
}

export function readPackageVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, 'package.json'), 'utf-8'))
  return pkg.version || '0.1.0'
}

export function readGitCommitDesc() {
  try {
    return execSync('git log -1 --pretty="%an: %s"', { cwd: ROOT_DIR, encoding: 'utf-8' }).trim()
  }
  catch {
    return ''
  }
}

export function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const env = {}
  const content = fs.readFileSync(filePath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }
    const [key, ...rest] = trimmed.split('=')
    const value = rest.join('=').trim().replace(/^['"]|['"]$/g, '')
    env[key.trim()] = value
  }
  return env
}

export function loadUploadEnv() {
  const rootEnv = parseEnvFile(path.resolve(ROOT_DIR, '.env'))
  const baseEnv = parseEnvFile(path.resolve(ROOT_DIR, 'env', '.env'))
  const wechatEnv = parseEnvFile(path.resolve(ROOT_DIR, 'env', '.env.wechat'))
  return { ...baseEnv, ...rootEnv, ...wechatEnv, ...process.env }
}

export function computeUploadMeta(params) {
  const version = params.version || readPackageVersion()
  const desc = params.desc || readGitCommitDesc() || `upload ${new Date().toISOString()}`
  return { version, desc }
}

export function ensureBuildOutput(projectPath) {
  if (!fs.existsSync(projectPath)) {
    throw new Error(`Build output not found: ${projectPath}`)
  }
}
