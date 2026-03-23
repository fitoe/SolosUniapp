import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const REQUIRED_OUTPUTS = [
  'dist/build/mp-weixin',
  'dist/build/mp-toutiao',
  'dist/build/mp-kuaishou',
  'dist/build/mp-xhs',
]

function existsNonEmptyDir(relativePath) {
  const fullPath = path.resolve(process.cwd(), relativePath)
  if (!fs.existsSync(fullPath)) {
    return false
  }
  const stat = fs.statSync(fullPath)
  if (!stat.isDirectory()) {
    return false
  }
  const children = fs.readdirSync(fullPath)
  return children.length > 0
}

function main() {
  const failed = []

  for (const dir of REQUIRED_OUTPUTS) {
    if (!existsNonEmptyDir(dir)) {
      failed.push(dir)
    }
  }

  if (failed.length > 0) {
    console.error('[smoke] build outputs missing:')
    for (const dir of failed) {
      console.error(`- ${dir}`)
    }
    process.exit(1)
  }

  console.log('[smoke] all mini build outputs exist')
}

main()
