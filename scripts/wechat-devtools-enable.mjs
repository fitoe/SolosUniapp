import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_WINDOWS_CLI = 'C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat'
const DEFAULT_MAC_CLI = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
const DEFAULT_DIST_DIR = path.resolve(process.cwd(), 'dist/dev/mp-weixin')
const DEFAULT_AUTO_PORT = process.env.WECHAT_AUTO_PORT || '9420'
const SCRIPT_PATH = path.resolve(process.cwd(), 'scripts/wechat-devtools-enable.sh')

function resolveCliPath() {
  return process.env.WECHAT_DEVTOOLS_CLI || (process.platform === 'win32' ? DEFAULT_WINDOWS_CLI : DEFAULT_MAC_CLI)
}

function resolveProjectPath() {
  return path.resolve(process.env.WECHAT_MINIPROGRAM_PROJECT_PATH || DEFAULT_DIST_DIR)
}

function ensureExists(filePath, label) {
  if (!fs.existsSync(filePath))
    throw new Error(`${label} not found: ${filePath}`)
}

function resolveGitBashPath() {
  const candidates = [
    process.env.GIT_BASH_PATH,
    'C:\\Program Files\\Git\\bin\\bash.exe',
    'C:\\Program Files\\Git\\usr\\bin\\bash.exe',
    'C:\\Program Files (x86)\\Git\\bin\\bash.exe',
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (fs.existsSync(candidate))
      return candidate
  }

  throw new Error('Git Bash not found. Set GIT_BASH_PATH or install Git for Windows.')
}

function resolveShellCommand() {
  if (process.platform === 'win32')
    return { command: resolveGitBashPath(), args: [SCRIPT_PATH] }

  return { command: 'bash', args: [SCRIPT_PATH] }
}

function main() {
  const cliPath = resolveCliPath()
  const projectPath = resolveProjectPath()
  ensureExists(cliPath, 'Wechat DevTools CLI')
  ensureExists(projectPath, 'Mini program project')
  ensureExists(SCRIPT_PATH, 'Enable script')

  const { command, args } = resolveShellCommand()
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      WECHAT_DEVTOOLS_CLI: cliPath,
      WECHAT_MINIPROGRAM_PROJECT_PATH: projectPath,
      WECHAT_AUTO_PORT: DEFAULT_AUTO_PORT,
    },
    timeout: 30000,
  })

  const output = `${result.stdout || ''}${result.stderr || ''}`.trim()
  if (result.error)
    throw result.error

  if (result.status !== 0)
    throw new Error(output || `Failed to enable Wechat DevTools automation (exit ${result.status ?? 'unknown'})`)

  console.log(JSON.stringify({
    ok: true,
    mode: 'enable',
    shell: command,
    cliPath,
    projectPath,
    autoPort: Number(DEFAULT_AUTO_PORT),
    httpPort: process.env.WECHAT_DEVTOOLS_HTTP_PORT || null,
    output,
  }, null, 2))
}

try {
  main()
}
catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
