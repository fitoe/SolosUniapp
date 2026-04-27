import { spawn } from 'node:child_process'
import process from 'node:process'

const args = process.argv.slice(2)
const forwardArgs = args.some(arg => arg.startsWith('--target='))
  ? args
  : ['--target=weixin', ...args]

const child = spawn(process.execPath, ['./scripts/upload-weixin.mjs', ...forwardArgs], {
  stdio: 'inherit',
  shell: false,
})

child.on('exit', (code) => {
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  console.error('[upload-all] failed to start:', error.message)
  process.exit(1)
})
