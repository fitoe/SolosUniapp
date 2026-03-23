import { execSync } from 'node:child_process'
import process from 'node:process'

const args = process.argv.slice(2).join(' ')
const commands = [
  `node ./scripts/upload-weixin.mjs --target=weixin ${args}`.trim(),
  `node ./scripts/upload-douyin.mjs ${args}`.trim(),
  `node ./scripts/upload-kuaishou.mjs ${args}`.trim(),
  `node ./scripts/upload-xhs.mjs ${args}`.trim(),
]

for (const command of commands) {
  console.log(`\n[upload-all] running: ${command}`)
  execSync(command, { stdio: 'inherit' })
}

console.log('\n[upload-all] success')
