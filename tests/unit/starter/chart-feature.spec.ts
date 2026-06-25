import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(resolve(projectRoot, path), 'utf8')) as T
}

describe('starter chart feature', () => {
  it('keeps the optional chart playground available', () => {
    const packageJson = readJson<{
      dependencies?: Record<string, string>
      starter_contract?: {
        features?: string[]
      }
    }>('package.json')

    expect(packageJson.dependencies).toHaveProperty('@qiun/ucharts')
    expect(packageJson.starter_contract?.features).toContain('chart')
    expect(existsSync(resolve(projectRoot, 'src/pages/chart/index.vue'))).toBe(true)
  })
})
