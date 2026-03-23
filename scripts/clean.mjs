import { rm } from 'node:fs/promises'

const targets = [
  'dist',
  'test-results',
  'playwright-report',
  'coverage',
  '.vite',
]

for (const target of targets) {
  await rm(target, { recursive: true, force: true })
  console.log(`[clean] removed: ${target}`)
}

console.log('[clean] done')
